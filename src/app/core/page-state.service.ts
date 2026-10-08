import { Injectable, computed, inject, signal } from '@angular/core';
import { CASES } from '../data/portfolio.data';
import { I18nService } from './i18n.service';

/** UI state shared across sections: which case study is open, and the inspector. */
@Injectable({ providedIn: 'root' })
export class PageStateService {
  private readonly i18n = inject(I18nService);
  readonly activeCase = signal<string | null>(CASES[0].id);
  readonly inspectorOpen = signal(false);

  /** The open case, already resolved to the current language. */
  readonly caseView = computed(() => {
    const c = CASES.find((x) => x.id === this.activeCase());
    return c ? `${c.name[this.i18n.lang()]}, ${c.sections.length} sections` : 'none';
  });

  toggleCase(id: string): void {
    this.activeCase.update((current) => (current === id ? null : id));
  }
}
