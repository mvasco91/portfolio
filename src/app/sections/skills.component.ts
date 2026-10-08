import { Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { RevealDirective } from '../core/reveal.directive';
import { CERTS, EDUCATION, LANGUAGES, SKILLS, UI } from '../data/portfolio.data';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  template: `
    <section class="section" id="skills">
      <div class="container">
        <h2 class="section__title" appReveal><span class="section__num">04</span>{{ i18n.t(ui.skills.title) }}</h2>

        <div class="skills">
          @for (g of skills; track $index; let i = $index) {
            <article class="tile skills__group" [appReveal]="50 * i">
              <h3>{{ i18n.t(g.title) }}</h3>
              <ul class="chips">
                @for (s of g.items; track s) {
                  <li class="chip">{{ s }}</li>
                }
              </ul>
            </article>
          }
        </div>

        <div class="creds">
          <article class="tile" appReveal>
            <h3>{{ i18n.t(ui.skills.certs) }}</h3>
            <ul class="creds__list">
              @for (c of certs; track c.name) {
                <li><strong>{{ c.name }}</strong><span>{{ c.issuer }} · {{ c.year }}</span></li>
              }
            </ul>
          </article>
          <article class="tile" appReveal="80">
            <h3>{{ i18n.t(ui.skills.education) }}</h3>
            <ul class="creds__list">
              <li><strong>{{ i18n.t(education.degree) }}</strong><span>{{ education.school }}</span></li>
              <li><span>{{ i18n.t(education.wes) }}</span></li>
            </ul>
          </article>
          <article class="tile" appReveal="160">
            <h3>{{ i18n.t(ui.skills.languages) }}</h3>
            <ul class="creds__list">
              @for (l of languages; track $index) {
                <li><strong>{{ i18n.t(l) }}</strong></li>
              }
            </ul>
          </article>
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly ui = UI;
  protected readonly skills = SKILLS;
  protected readonly certs = CERTS;
  protected readonly education = EDUCATION;
  protected readonly languages = LANGUAGES;
}
