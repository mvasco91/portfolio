import { Component, inject, signal } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { RevealDirective } from '../core/reveal.directive';
import { PROFILE, UI } from '../data/portfolio.data';

@Component({
  selector: 'app-contact',
  imports: [RevealDirective],
  template: `
    <section class="section contact" id="contact">
      <div class="container contact__inner" appReveal>
        <span class="section__num">05 · {{ i18n.t(ui.nav.contact) }}</span>
        <h2 class="contact__title">{{ i18n.t(ui.contact.title) }}</h2>
        <p class="contact__body">{{ i18n.t(ui.contact.body) }}</p>

        <div class="contact__actions">
          <a class="btn btn--primary btn--lg" [href]="'mailto:' + profile.email">{{ i18n.t(ui.contact.email) }} →</a>
          @if (profile.resume[i18n.lang()]; as resume) {
            <a class="btn btn--ghost btn--lg" [href]="resume" download="Mauricio-Vasco-Resume.pdf">{{ i18n.t(ui.contact.resume) }} ↓</a>
          }
          <button type="button" class="btn btn--ghost btn--lg" (click)="copy()">
            {{ copied() ? i18n.t(ui.contact.copied) : i18n.t(ui.contact.copy) }}
          </button>
        </div>

        <ul class="contact__links">
          <li><a [href]="profile.linkedin" target="_blank" rel="noopener">LinkedIn ↗</a></li>
          @if (profile.github) {
            <li><a [href]="profile.github" target="_blank" rel="noopener">GitHub ↗</a></li>
          }
          <li><a [href]="'mailto:' + profile.email">{{ profile.email }}</a></li>
        </ul>
      </div>
    </section>

    <footer class="footer">
      <div class="container footer__inner">
        <span>© {{ year }} {{ profile.name }} · {{ i18n.t(profile.location) }}</span>
        <span>{{ i18n.t(ui.footer.built) }}</span>
      </div>
    </footer>
  `,
})
export class ContactComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly ui = UI;
  protected readonly profile = PROFILE;
  protected readonly copied = signal(false);
  protected readonly year = new Date().getFullYear();

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.profile.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      window.location.href = 'mailto:' + this.profile.email;
    }
  }
}
