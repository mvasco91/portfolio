import { Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { PROFILE, UI } from '../data/portfolio.data';

@Component({
  selector: 'app-quote',
  template: `
    <section class="quote wrap" id="learning">
      <figure>
        <blockquote class="quote__text" [attr.lang]="i18n.lang()">
          <p>{{ i18n.t(ui.quote.text) }}</p>
        </blockquote>
        <figcaption class="quote__by">{{ profile.name }}</figcaption>
      </figure>
    </section>
  `,
})
export class QuoteComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly ui = UI;
  protected readonly profile = PROFILE;
}
