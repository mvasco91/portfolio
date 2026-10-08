import { Component, inject, signal } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { PROFILE, UI } from '../data/portfolio.data';

@Component({
  selector: 'app-contact',
  template: `
    <section class="contact wrap" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" class="contact__title">{{ i18n.t(ui.contact.title) }}</h2>
      <div class="contact__body">
        <p>{{ i18n.t(ui.contact.body) }}</p>
        <p class="contact__email">
          <a [href]="'mailto:' + profile.email">{{ profile.email }}</a>
          <button type="button" class="link link--quiet" (click)="copy()" aria-live="polite">
            {{ copied() ? i18n.t(ui.contact.copied) : i18n.t(ui.contact.copy) }}
          </button>
        </p>
        <p class="contact__links">
          <a class="link" [href]="profile.resume" download="Mauricio-Vasco-Resume.pdf">{{ i18n.t(ui.hero.resume) }}</a>
          <a class="link" [href]="profile.linkedin" target="_blank" rel="noopener">LinkedIn</a>
          <a class="link" [href]="profile.github" target="_blank" rel="noopener">GitHub</a>
        </p>
      </div>
    </section>

    <footer class="footer wrap">
      <p>{{ i18n.t(ui.footer.built) }} <a class="link" [href]="profile.source" target="_blank" rel="noopener">{{ i18n.t(ui.footer.source) }}</a></p>
      <p>© {{ year }} {{ profile.name }}, {{ i18n.t(profile.location) }}</p>
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
