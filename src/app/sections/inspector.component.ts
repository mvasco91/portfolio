import { Component, inject } from '@angular/core';
import { DevtoolsService } from '../core/devtools.service';
import { I18nService } from '../core/i18n.service';
import { PageStateService } from '../core/page-state.service';
import { PROFILE, UI } from '../data/portfolio.data';

/** Live view of the signal graph behind this page. */
@Component({
  selector: 'app-inspector',
  template: `
    <aside class="inspector" [class.is-open]="page.inspectorOpen()" [attr.aria-label]="i18n.t(ui.inspector.title)">
      @if (page.inspectorOpen()) {
        <div class="inspector__panel" id="inspector-panel">
          <div class="inspector__head">
            <h2>{{ i18n.t(ui.inspector.title) }}</h2>
            <button type="button" class="tool tool--small" (click)="page.inspectorOpen.set(false)" [attr.aria-label]="i18n.t(ui.inspector.close)">
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.5" /></svg>
            </button>
          </div>
          <p class="inspector__intro">{{ i18n.t(ui.inspector.intro) }}</p>

          <table class="graph">
            <tbody>
              @for (n of devtools.nodes; track n.id + ':' + (devtools.pulses()[n.id] ?? 0)) {
                <tr [class.is-pulsing]="devtools.pulses()[n.id]" [attr.data-kind]="n.kind">
                  <td class="graph__kind">{{ n.kind }}</td>
                  <td class="graph__id">
                    {{ n.id }}
                    @if (n.deps.length) {
                      <span class="graph__deps">&larr; {{ n.deps.join(', ') }}</span>
                    }
                  </td>
                  <td class="graph__value">{{ n.value() }}</td>
                </tr>
              }
            </tbody>
          </table>

          <h3>{{ i18n.t(ui.inspector.log) }}</h3>
          @if (devtools.log().length) {
            <ol class="log" aria-live="polite">
              @for (e of devtools.log(); track e.at + e.id) {
                <li>
                  <code>{{ e.id }}</code> {{ e.from }} &rarr; {{ e.to }}
                  @if (e.affected.length) {
                    <span class="log__affected">{{ e.affected.join(', ') }}</span>
                  }
                </li>
              }
            </ol>
          } @else {
            <p class="log__empty">{{ i18n.t(ui.inspector.empty) }}</p>
          }

          <p class="inspector__foot">
            {{ i18n.t(ui.inspector.shortcuts) }}.
            <a class="link" [href]="source" target="_blank" rel="noopener">{{ i18n.t(ui.inspector.how) }}</a>
          </p>
        </div>
      }
      <button
        type="button"
        class="inspector__toggle"
        (click)="page.inspectorOpen.update((v) => !v)"
        [attr.aria-expanded]="page.inspectorOpen()"
        aria-controls="inspector-panel"
      >
        <span class="inspector__dot" aria-hidden="true"></span>
        {{ i18n.t(ui.inspector.toggle) }}
        @if (devtools.changeCount()) {
          <span class="inspector__count">{{ devtools.changeCount() }}</span>
        }
      </button>
    </aside>
  `,
})
export class InspectorComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly page = inject(PageStateService);
  protected readonly devtools = inject(DevtoolsService);
  protected readonly ui = UI;
  protected readonly source = `${PROFILE.source}/blob/main/src/app/core/devtools.service.ts`;
}
