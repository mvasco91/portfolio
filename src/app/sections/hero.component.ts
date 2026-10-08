import { Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { PROFILE, UI } from '../data/portfolio.data';

@Component({
  selector: 'app-hero',
  template: `
    <section class="hero" id="top">
      <div class="container hero__grid">
        <div class="hero__copy">
          <p class="pill hero__status">
            <span class="dot" aria-hidden="true"></span>{{ i18n.t(ui.hero.available) }}
          </p>
          <p class="hero__eyebrow">{{ i18n.t(ui.hero.eyebrow) }} <strong>{{ profile.name }}</strong></p>
          <h1 class="hero__title">{{ i18n.t(ui.hero.headline) }}</h1>
          <p class="hero__intro">{{ i18n.t(ui.hero.intro) }}</p>

          <div class="hero__ctas">
            <a class="btn btn--primary" href="#work">{{ i18n.t(ui.hero.ctaWork) }}</a>
            <a class="btn btn--ghost" href="#contact">{{ i18n.t(ui.hero.ctaContact) }}</a>
            @if (profile.resume[i18n.lang()]; as resume) {
              <a class="btn btn--ghost" [href]="resume" download="Mauricio-Vasco-Resume.pdf">{{ i18n.t(ui.hero.resume) }} ↓</a>
            }
          </div>
        </div>

        <figure class="code-card" aria-hidden="true">
          <div class="code-card__bar">
            <span></span><span></span><span></span>
            <em>mauricio.ts</em>
          </div>
          <pre class="code-card__body"><code><span class="k">export const</span> <span class="v">mauricio</span> = &#123;
  <span class="p">role</span>: <span class="s">'{{ i18n.t(profile.role) }}'</span>,
  <span class="p">based</span>: <span class="s">'Toronto, ON 🇨🇦'</span>,
  <span class="p">years</span>: <span class="n">10</span>,
  <span class="p">stack</span>: [<span class="s">'Angular'</span>, <span class="s">'Signals'</span>, <span class="s">'NgRx'</span>, <span class="s">'Nx'</span>],
  <span class="p">ledTeamOf</span>: <span class="n">11</span>,
  <span class="p">ships</span>: <span class="k">signal</span>(<span class="s">'secure SaaS'</span>),
&#125;;<span class="caret"></span></code></pre>
        </figure>
      </div>
    </section>
  `,
})
export class HeroComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly ui = UI;
  protected readonly profile = PROFILE;
}
