import { Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { CERTS, EDUCATION, LANGUAGES, SKILLS, UI } from '../data/portfolio.data';

@Component({
  selector: 'app-skills',
  template: `
    <section class="section wrap" id="skills" aria-labelledby="skills-title">
      <div class="section__head">
        <h2 id="skills-title">{{ i18n.t(ui.skills.title) }}</h2>
      </div>
      <div class="section__body">
        <dl class="skills">
          @for (g of skills; track $index) {
            <div><dt>{{ i18n.t(g.title) }}</dt><dd>{{ g.items }}</dd></div>
          }
        </dl>
        <div class="creds">
          <div>
            <h3>{{ i18n.t(ui.skills.certs) }}</h3>
            @for (c of certs; track c.name) {
              <p>{{ c.name }}<br /><span>{{ c.issuer }}, {{ c.year }}</span></p>
            }
          </div>
          <div>
            <h3>{{ i18n.t(ui.skills.education) }}</h3>
            <p>{{ i18n.t(education.degree) }}<br /><span>{{ education.school }}</span></p>
            <p><span>{{ i18n.t(education.wes) }}</span></p>
          </div>
          <div>
            <h3>{{ i18n.t(ui.skills.languages) }}</h3>
            <p>{{ i18n.t(languages) }}</p>
          </div>
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
