import { Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { RevealDirective } from '../core/reveal.directive';
import { PROJECTS, UI } from '../data/portfolio.data';

@Component({
  selector: 'app-work',
  imports: [RevealDirective],
  template: `
    <section class="section" id="work">
      <div class="container">
        <h2 class="section__title" appReveal><span class="section__num">03</span>{{ i18n.t(ui.work.title) }}</h2>
        <p class="section__note" appReveal="60">{{ i18n.t(ui.work.note) }}</p>

        <div class="work">
          @for (p of projects; track p.company; let i = $index) {
            <article
              class="card"
              [class.card--featured]="p.featured"
              [appReveal]="60 * i"
              (pointermove)="glow($event)"
            >
              <div class="card__top">
                <span class="card__kind">{{ i18n.t(p.kind) }}</span>
                <span class="card__company">{{ p.company }}</span>
              </div>
              <h3 class="card__name">{{ i18n.t(p.name) }}</h3>
              <p class="card__summary">{{ i18n.t(p.summary) }}</p>
              <ul class="card__highlights">
                @for (h of p.highlights; track $index) {
                  <li>{{ i18n.t(h) }}</li>
                }
              </ul>
              <ul class="chips" aria-label="Stack">
                @for (s of p.stack; track s) {
                  <li class="chip">{{ s }}</li>
                }
              </ul>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class WorkComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly ui = UI;
  protected readonly projects = PROJECTS;

  /** Moves the card's radial highlight to follow the pointer. */
  protected glow(event: PointerEvent): void {
    const el = event.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - r.left}px`);
    el.style.setProperty('--my', `${event.clientY - r.top}px`);
  }
}
