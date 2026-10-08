import { Component, HostListener, inject, signal } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { A11yPanelComponent } from './a11y-panel.component';
import { UI } from '../data/portfolio.data';

@Component({
  selector: 'app-header',
  imports: [A11yPanelComponent],
  template: `
    <header class="header" [class.header--scrolled]="scrolled()">
      <div class="container header__inner">
        <a class="header__logo" href="#top" aria-label="Mauricio Vasco, home">
          <span class="header__mono">MV</span>
        </a>

        <nav class="header__nav" [class.is-open]="menuOpen()" aria-label="Primary">
          @for (link of links; track link.id) {
            <a [href]="'#' + link.id" (click)="menuOpen.set(false)">{{ i18n.t(link.label) }}</a>
          }
        </nav>

        <div class="header__actions">
          <div class="lang-toggle" role="group" [attr.aria-label]="i18n.t(ui.langPicker)">
            @for (l of i18n.langs; track l) {
              <button
                type="button"
                [class.is-active]="i18n.lang() === l"
                [attr.aria-pressed]="i18n.lang() === l"
                [attr.title]="ui.langNames[l].en"
                [attr.lang]="l"
                (click)="i18n.set(l)"
              >{{ l.toUpperCase() }}</button>
            }
          </div>
          <app-a11y-panel />
          <button
            type="button"
            class="header__burger"
            [class.is-open]="menuOpen()"
            (click)="menuOpen.update((v) => !v)"
            [attr.aria-expanded]="menuOpen()"
            aria-label="Menu"
          >
            <span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly ui = UI;
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly links = [
    { id: 'about', label: UI.nav.about },
    { id: 'experience', label: UI.nav.experience },
    { id: 'work', label: UI.nav.work },
    { id: 'skills', label: UI.nav.skills },
    { id: 'contact', label: UI.nav.contact },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 12);
  }
}
