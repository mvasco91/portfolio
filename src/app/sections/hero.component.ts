import { Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { PageStateService } from '../core/page-state.service';
import { PROFILE, UI } from '../data/portfolio.data';

@Component({
  selector: 'app-hero',
  template: `
    <section class="hero" id="top">
      <!-- The particle field draws the name; this text version is for screen readers and no-WebGL browsers. -->
      <p class="hero__name" [class.is-fallback]="!page.webgl()">{{ profile.name }}</p>
      <div class="hero__content wrap">
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
      </div>
      @if (page.webgl()) {
        <p class="hero__hint wrap" aria-hidden="true">
          <span class="hero__hint-line"></span>{{ i18n.t(touch ? ui.hero.hintTouch : ui.hero.hint) }}
        </p>
      }
    </section>
  `,
})
export class HeroComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly page = inject(PageStateService);
  protected readonly ui = UI;
  protected readonly profile = PROFILE;
  protected readonly touch = matchMedia('(hover: none)').matches;
}
