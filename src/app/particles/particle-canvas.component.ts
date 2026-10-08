import { Component, DestroyRef, ElementRef, Injector, afterNextRender, effect, inject, signal, viewChild } from '@angular/core';
import { PageStateService } from '../core/page-state.service';
import { Theme, ThemeService } from '../core/theme.service';
import type { FieldPalette, ParticleField } from './particle-field';

const hex = (h: string): [number, number, number] => {
  const n = parseInt(h.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const PALETTES: Record<Theme, FieldPalette> = {
  dark: { colors: ['#86d4ad', '#4fb388', '#2f8f68', '#c9f0dc', '#f0bb5a'].map(hex), additive: true, size: 3.4, opacity: 0.95 },
  light: { colors: ['#1d6b49', '#2a8a60', '#154f36', '#3f9d74', '#b8760f'].map(hex), additive: false, size: 3.2, opacity: 0.85 },
  contrast: { colors: ['#7dffb5', '#7dffb5', '#ffffff', '#7dffb5', '#ffd84d'].map(hex), additive: true, size: 3.6, opacity: 1 },
};

/** Full-screen WebGL layer behind the page. Driven entirely by signals. */
@Component({
  selector: 'app-particle-canvas',
  template: `<canvas #canvas class="particles" [class.is-off]="!wide()" aria-hidden="true"></canvas>`,
})
export class ParticleCanvasComponent {
  private readonly page = inject(PageStateService);
  private readonly theme = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private field?: ParticleField;
  private loading = false;

  /** Particles only run on wide screens; on phones and tablets they would sit behind the text. */
  private readonly media = matchMedia('(min-width: 1080px)');
  protected readonly wide = signal(this.media.matches);

  constructor() {
    const onMedia = (e: MediaQueryListEvent) => this.wide.set(e.matches);
    this.media.addEventListener('change', onMedia);
    this.destroyRef.onDestroy(() => this.media.removeEventListener('change', onMedia));

    afterNextRender(() => {
      // Start when the screen is wide enough, and pause when it becomes narrow.
      // Three.js is never downloaded on a phone.
      effect(
        () => {
          const wide = this.wide();
          if (wide && !this.field && !this.loading) void this.init();
          else if (wide) this.field?.play();
          else this.field?.pause();
        },
        { injector: this.injector },
      );
    });

    // Each effect reads its signal first, then talks to the field. Reading after
    // `this.field?.` would skip the read while the field is still loading, and the
    // effect would never subscribe.
    effect(() => {
      const shape = this.page.shape();
      this.field?.setShape(shape);
    });
    effect(() => {
      const palette = PALETTES[this.theme.theme()];
      this.field?.setPalette(palette);
    });
    effect(() => {
      const animate = this.theme.motion() === 'full';
      this.field?.setAnimate(animate);
    });
    effect(() => {
      // Hidden on the hero; the field appears with the case studies.
      const opacity = this.page.section() === 'top' ? 0 : 1;
      this.field?.setOpacity(opacity);
    });
  }

  private async init(): Promise<void> {
    this.loading = true;
    const canvas = this.canvas().nativeElement;
    const probe = document.createElement('canvas');
    if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) {
      this.page.webgl.set(false);
      return;
    }
    // Three.js is loaded lazily so the text of the page never waits for WebGL.
    const { ParticleField: Field } = await import('./particle-field');
    this.loading = false;
    const field = new Field(canvas, this.theme.motion() === 'full');
    this.field = field;
    field.resize(window.innerWidth, window.innerHeight);
    field.setPalette(PALETTES[this.theme.theme()]);
    field.setShape(this.page.shape());
    const section = this.page.section();
    field.setOpacity(section === 'top' ? 0 : 1);
    if (this.wide()) field.play();

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!this.wide()) return;
        field.resize(window.innerWidth, window.innerHeight);
      }, 150);
    };
    const onMove = (e: PointerEvent) => field.pointer(e.clientX, e.clientY, window.innerWidth, window.innerHeight);
    const onLeave = () => field.pointerLeave();
    const onVisibility = () => (document.hidden || !this.wide() ? field.pause() : field.play());

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('touchend', onLeave, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('touchend', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      field.dispose();
    });
  }
}
