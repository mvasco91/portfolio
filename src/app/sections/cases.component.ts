import { Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { PageStateService } from '../core/page-state.service';
import { CASES, UI } from '../data/portfolio.data';

@Component({
  selector: 'app-cases',
  template: `
    <section class="section wrap" id="work" aria-labelledby="work-title">
      <div class="section__head">
        <h2 id="work-title">{{ i18n.t(ui.cases.title) }}</h2>
        <p class="section__note">{{ i18n.t(ui.cases.note) }}</p>
      </div>

      <div class="cases">
        @for (c of cases; track c.id) {
          @let open = page.activeCase() === c.id;
          <article class="case" [class.is-open]="open">
            <div class="case__main">
              <p class="case__where">{{ c.company }}, {{ i18n.t(c.period) }}</p>
              <h3 class="case__name">
                <button
                  type="button"
                  class="case__toggle"
                  [attr.aria-expanded]="open"
                  [attr.aria-controls]="'case-' + c.id"
                  (click)="page.toggleCase(c.id)"
                >
                  <span>{{ i18n.t(c.name) }}</span>
                  <span class="case__icon" aria-hidden="true"></span>
                  <span class="visually-hidden">{{ open ? i18n.t(ui.cases.close) : i18n.t(ui.cases.open) }}</span>
                </button>
              </h3>
              <p class="case__summary">{{ i18n.t(c.summary) }}</p>

              <div class="case__drawer" [id]="'case-' + c.id" [attr.inert]="open ? null : ''">
                <div class="case__drawer-inner">
                  <div class="case__detail">
                    <div class="case__story">
                      <p>{{ i18n.t(c.context) }}</p>
                      @for (sec of c.sections; track $index) {
                        <h4>{{ i18n.t(sec.title) }}</h4>
                        <ul>
                          @for (d of sec.items; track $index) {
                            <li>{{ i18n.t(d) }}</li>
                          }
                        </ul>
                      }
                      <h4>{{ i18n.t(ui.cases.outcome) }}</h4>
                      <p>{{ i18n.t(c.outcome) }}</p>
                    </div>
                    <dl class="case__facts">
                      <div><dt>{{ i18n.t(ui.cases.facts.role) }}</dt><dd>{{ i18n.t(c.role) }}</dd></div>
                      <div><dt>{{ i18n.t(ui.cases.facts.period) }}</dt><dd>{{ i18n.t(c.period) }}</dd></div>
                      @if (c.team) {
                        <div><dt>{{ i18n.t(ui.cases.facts.team) }}</dt><dd>{{ i18n.t(c.team) }}</dd></div>
                      }
                      <div><dt>{{ i18n.t(ui.cases.facts.stack) }}</dt><dd>{{ c.stack }}</dd></div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class CasesComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly page = inject(PageStateService);
  protected readonly ui = UI;
  protected readonly cases = CASES;
}
