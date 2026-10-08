import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { Theme, ThemeService } from '../core/theme.service';
import { UI } from '../data/portfolio.data';

/** Header button + popover: colour theme (dark / light / high contrast) and reduce motion. */
@Component({
  selector: 'app-a11y-panel',
  template: `
    <div class="a11y">
      <button
        type="button"
        class="icon-btn"
        [class.is-open]="open()"
        (click)="open.update((v) => !v)"
        [attr.aria-expanded]="open()"
        aria-controls="a11y-panel"
        [attr.aria-label]="i18n.t(ui.a11y.open)"
        [attr.title]="i18n.t(ui.a11y.open)"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" />
          <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
        </svg>
      </button>

      @if (open()) {
        <div class="a11y__panel" id="a11y-panel" role="dialog" [attr.aria-label]="i18n.t(ui.a11y.title)">
          <p class="a11y__label" id="a11y-theme">{{ i18n.t(ui.a11y.theme) }}</p>
          <div class="a11y__themes" role="radiogroup" aria-labelledby="a11y-theme">
            @for (t of theme.themes; track t) {
              <button
                type="button"
                role="radio"
                class="a11y__theme"
                [class.is-active]="theme.theme() === t"
                [attr.aria-checked]="theme.theme() === t"
                [attr.data-swatch]="t"
                (click)="theme.theme.set(t)"
              >
                <span class="a11y__swatch" aria-hidden="true"></span>
                {{ i18n.t(label(t)) }}
              </button>
            }
          </div>

          <button
            type="button"
            role="switch"
            class="a11y__switch"
            [attr.aria-checked]="theme.motion() === 'reduced'"
            (click)="theme.toggleMotion()"
          >
            <span>{{ i18n.t(ui.a11y.motion) }}</span>
            <span class="a11y__track" aria-hidden="true"><span class="a11y__thumb"></span></span>
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
    if (this.open()) {
      this.open.set(false);
      (this.host.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.icon-btn')?.focus();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent): void {
    if (this.open() && !(this.host.nativeElement as HTMLElement).contains(event.target as Node)) {
      this.open.set(false);
    }
  }
}
