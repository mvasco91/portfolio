import { Component, DestroyRef, HostListener, afterNextRender, inject } from '@angular/core';
import { DevtoolsService } from './core/devtools.service';
import { I18nService } from './core/i18n.service';
import { PageStateService, SECTIONS, SectionId } from './core/page-state.service';
import { ParticleCanvasComponent } from './particles/particle-canvas.component';
import { ThemeService } from './core/theme.service';
import { CasesComponent } from './sections/cases.component';
import { ContactComponent } from './sections/contact.component';
import { ExperienceComponent } from './sections/experience.component';
import { HeaderComponent } from './sections/header.component';
import { HeroComponent } from './sections/hero.component';
import { InspectorComponent } from './sections/inspector.component';
import { SkillsComponent } from './sections/skills.component';
import { QuoteComponent } from './sections/quote.component';

@Component({
  selector: 'app-root',
  imports: [ParticleCanvasComponent, HeaderComponent, HeroComponent, CasesComponent, ExperienceComponent, SkillsComponent, QuoteComponent, ContactComponent, InspectorComponent],
  template: `
    <app-particle-canvas />
    <a class="skip-link" href="#work">Skip to content</a>
    <app-header />
    <main>
      <app-hero />
      <app-cases />
      <app-experience />
      <app-skills />
      <app-quote />
      <app-contact />
    </main>
    <app-inspector />
  `,
})
export class App {
  private readonly i18n = inject(I18nService);
  private readonly theme = inject(ThemeService);
  private readonly page = inject(PageStateService);
  /** Created at startup so the graph records changes from the first interaction. */
  private readonly devtools = inject(DevtoolsService);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      // The section crossing the middle of the viewport becomes the active one.
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) this.page.section.set(entry.target.id as SectionId);
          }
        },
        { rootMargin: '-50% 0px -50% 0px' },
      );
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  /** Single-key shortcuts: L language, T theme, S signal inspector. */
  @HostListener('document:keydown', ['$event'])
  onKey(event: KeyboardEvent): void {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const target = event.target as HTMLElement;
    if (target.closest('input, textarea, select, [contenteditable="true"]')) return;
    const key = event.key.toLowerCase();
    if (key === 'l') this.i18n.next();
    else if (key === 't') this.theme.next();
    else if (key === 's') this.page.inspectorOpen.update((v) => !v);
    else if (key === 'escape') this.page.inspectorOpen.set(false);
  }
}
