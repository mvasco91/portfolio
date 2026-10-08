import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { Theme, ThemeService } from '../core/theme.service';
import { UI } from '../data/portfolio.data';

/** Display settings: colour theme and reduced motion. */
@Component({
  selector: 'app-a11y-panel',
  template: `
    <div class="display">
      <button
        type="button"
        class="tool"
        (click)="open.update((v) => !v)"
        [attr.aria-expanded]="open()"
        aria-controls="display-panel"
        [attr.aria-label]="i18n.t(ui.a11y.open)"
        [attr.title]="i18n.t(ui.a11y.open)"
      >
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
          <circle cx="10" cy="10" r="7.25" fill="none" stroke="currentColor" stroke-width="1.5" />
          <path d="M10 2.75a7.25 7.25 0 0 1 0 14.5z" fill="currentColor" />
        </svg>
      </button>

      @if (open()) {
        <div class="display__panel" id="display-panel" role="dialog" [attr.aria-label]="i18n.t(ui.a11y.title)">
          <p class="display__label" id="display-theme">{{ i18n.t(ui.a11y.theme) }}</p>
          <div class="display__themes" role="radiogroup" aria-labelledby="display-theme">
            @for (t of theme.themes; track t) {
              <button
                type="button"
                role="radio"
                class="display__theme"
                [attr.aria-checked]="theme.theme() === t"
                [attr.data-swatch]="t"
                (click)="theme.theme.set(t)"
              >
                <span class="display__swatch" aria-hidden="true"></span>{{ i18n.t(label(t)) }}
              </button>
            }
          </div>
          <button
            type="button"
            role="switch"
            class="display__switch"
            [attr.aria-checked]="theme.motion() === 'reduced'"
            (click)="theme.toggleMotion()"
          >
            <span>{{ i18n.t(ui.a11y.motion) }}</span>
            <span class="display__track" aria-hidden="true"><span></span></span>
          </button>
        </div>
      }
    </div>
  `,
})
export class A11yPanelComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly theme = inject(ThemeService);
  protected readonly ui = UI;
  protected readonly open = signal(false);
  private readonly host = inject(ElementRef<HTMLElement>);

  protected label(t: Theme) {
    return this.ui.a11y[t];
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.open()) return;
    this.open.set(false);
    (this.host.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.tool')?.focus();
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent): void {
    if (this.open() && !(this.host.nativeElement as HTMLElement).contains(event.target as Node)) this.open.set(false);
  }
}
