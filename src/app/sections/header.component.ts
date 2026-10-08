import { Component, inject, signal } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { PROFILE, UI } from '../data/portfolio.data';
import { A11yPanelComponent } from './a11y-panel.component';

@Component({
  selector: 'app-header',
  imports: [A11yPanelComponent],
  template: `
    <header class="masthead">
      <div class="wrap masthead__inner">
        <a class="masthead__name" href="#top">{{ profile.shortName }}</a>

        <nav class="masthead__nav" [class.is-open]="menuOpen()" aria-label="Primary">
          @for (link of links; track link.id) {
            <a [href]="'#' + link.id" (click)="menuOpen.set(false)">{{ i18n.t(link.label) }}</a>
          }
        </nav>

        <div class="masthead__tools">
          <div class="langs" role="group" [attr.aria-label]="i18n.t(ui.langPicker)">
            @for (l of i18n.langs; track l) {
              <button
                type="button"
                [class.is-active]="i18n.lang() === l"
                [attr.aria-pressed]="i18n.lang() === l"
                [attr.title]="ui.langNames[l].en"
                [attr.lang]="l"
                (click)="i18n.lang.set(l)"
              >{{ l }}</button>
            }
          </div>
          <app-a11y-panel />
          <button
            type="button"
            class="masthead__menu"
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
  protected readonly profile = PROFILE;
  protected readonly menuOpen = signal(false);
  protected readonly links = [
    { id: 'work', label: UI.nav.work },
    { id: 'experience', label: UI.nav.experience },
    { id: 'skills', label: UI.nav.skills },
    { id: 'contact', label: UI.nav.contact },
  ];
}
