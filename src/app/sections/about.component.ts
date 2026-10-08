import { Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { RevealDirective } from '../core/reveal.directive';
import { METRICS, UI } from '../data/portfolio.data';

@Component({
  selector: 'app-about',
  imports: [RevealDirective],
  template: `
    <section class="section" id="about">
      <div class="container">
        <h2 class="section__title" appReveal><span class="section__num">01</span>{{ i18n.t(ui.about.title) }}</h2>

        <div class="bento">
          <article class="tile tile--story" appReveal>
            <p>{{ i18n.t(ui.about.body) }}</p>
          </article>

          @for (m of metrics; track $index; let i = $index) {
            <article class="tile tile--metric" [class.tile--wide]="m.wide" [appReveal]="80 * (i + 1)">
              <span class="metric__value">{{ i18n.t(m.value) }}</span>
              <span class="metric__label">{{ i18n.t(m.label) }}</span>
            </article>
          }

          <article class="tile tile--focus" appReveal="120">
            <h3>{{ i18n.t(ui.about.focusTitle) }}</h3>
            <ul>
              @for (f of ui.about.focus; track $index) {
                <li>{{ i18n.t(f) }}</li>
              }
            </ul>
          </article>

          <article class="tile tile--award" appReveal="200">
            <span class="award__icon" aria-hidden="true">★</span>
            <span>{{ i18n.t(ui.about.award) }}</span>
          </article>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly ui = UI;
  protected readonly metrics = METRICS;
}
