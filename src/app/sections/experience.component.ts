import { Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { JOBS, UI } from '../data/portfolio.data';

@Component({
  selector: 'app-experience',
  template: `
    <section class="section wrap" id="experience" aria-labelledby="exp-title">
      <div class="section__head">
        <h2 id="exp-title">{{ i18n.t(ui.experience.title) }}</h2>
      </div>
      <ol class="timeline">
        @for (j of jobs; track j.company) {
          <li class="timeline__item">
            <span class="timeline__years">{{ j.years }}</span>
            <div>
              <p class="timeline__role"><strong>{{ j.company }}</strong>, {{ i18n.t(j.role) }}</p>
              <p class="timeline__note">{{ i18n.t(j.note) }}</p>
            </div>
          </li>
        }
      </ol>
    </section>
  `,
})
export class ExperienceComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly ui = UI;
  protected readonly jobs = JOBS;
}
