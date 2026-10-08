import { Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { RevealDirective } from '../core/reveal.directive';
import { JOBS, UI } from '../data/portfolio.data';

@Component({
  selector: 'app-experience',
  imports: [RevealDirective],
  template: `
    <section class="section" id="experience">
      <div class="container">
        <h2 class="section__title" appReveal><span class="section__num">02</span>{{ i18n.t(ui.experience.title) }}</h2>

        <div class="exp" appReveal="100">
          <div class="exp__tabs" role="tablist" aria-label="Companies" (keydown)="onKey($event)">
            @for (job of jobs; track job.id; let i = $index) {
              <button
                type="button"
                role="tab"
                class="exp__tab"
                [id]="'tab-' + job.id"
                [class.is-active]="i === active()"
                [attr.aria-selected]="i === active()"
                [attr.aria-controls]="'panel-' + job.id"
                [attr.tabindex]="i === active() ? 0 : -1"
                (click)="active.set(i)"
              >
                <span class="exp__tab-name">{{ job.company }}</span>
                <span class="exp__tab-year">{{ i18n.t(job.period).split('–')[0].trim() }}</span>
              </button>
            }
          </div>

          @let job = current();
          <div
            class="exp__panel"
            role="tabpanel"
            [id]="'panel-' + job.id"
            [attr.aria-labelledby]="'tab-' + job.id"
          >
            @for (j of [job]; track j.id) {
              <div class="exp__content">
                <h3 class="exp__role">
                  {{ i18n.t(j.role) }} <span class="accent">@ {{ j.company }}</span>
                </h3>
                <p class="exp__meta">
                  <span>{{ i18n.t(j.period) }}</span><span class="sep">·</span><span>{{ i18n.t(j.place) }}</span>
                </p>
                @if (j.client) {
                  <p class="exp__client">{{ i18n.t(j.client) }}</p>
                }
                <ul class="exp__bullets">
                  @for (b of j.bullets; track $index) {
                    <li>{{ i18n.t(b) }}</li>
                  }
                </ul>
                <ul class="chips" aria-label="Stack">
                  @for (s of j.stack; track s) {
                    <li class="chip">{{ s }}</li>
                  }
                </ul>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ExperienceComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly ui = UI;
  protected readonly jobs = JOBS;
  protected readonly active = signal(0);
  protected readonly current = computed(() => this.jobs[this.active()]);

  protected onKey(event: KeyboardEvent): void {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    const step = keys[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (this.active() + step + this.jobs.length) % this.jobs.length;
    this.active.set(next);
    document.getElementById('tab-' + this.jobs[next].id)?.focus();
  }
}
