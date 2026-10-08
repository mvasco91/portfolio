import { Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { PROFILE, UI } from '../data/portfolio.data';

@Component({
  selector: 'app-hero',
  template: `
    <section class="hero wrap" id="top">
      <p class="hero__name">{{ profile.name }}</p>
      <h1 class="hero__headline">{{ i18n.t(ui.hero.headline) }}</h1>
      <div class="hero__body">
        <p class="hero__intro">{{ i18n.t(ui.hero.intro) }}</p>
        <p class="hero__available"><span class="live" aria-hidden="true"></span>{{ i18n.t(ui.hero.available) }}</p>
        <div class="hero__links">
          <a class="button" [href]="'mailto:' + profile.email">{{ i18n.t(ui.hero.email) }}</a>
          <a class="link" [href]="profile.resume" download="Mauricio-Vasco-Resume.pdf">{{ i18n.t(ui.hero.resume) }}</a>
          <a class="link" [href]="profile.linkedin" target="_blank" rel="noopener">LinkedIn</a>
          <a class="link" [href]="profile.github" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly ui = UI;
  protected readonly profile = PROFILE;
}
