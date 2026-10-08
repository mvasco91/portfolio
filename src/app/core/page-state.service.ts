import { Injectable, computed, inject, signal } from '@angular/core';
import { CASES } from '../data/portfolio.data';
import { ShapeName } from '../particles/shapes';
import { I18nService } from './i18n.service';

export type SectionId = 'top' | 'work' | 'experience' | 'skills' | 'learning' | 'contact';
export const SECTIONS: SectionId[] = ['top', 'work', 'experience', 'skills', 'learning', 'contact'];

const SHAPE_FOR: Record<SectionId, ShapeName> = {
  top: 'scatter',
  work: 'network',
  experience: 'shield',
  skills: 'phone',
  learning: 'spiral',
  contact: 'globe',
};

/** UI state shared across sections. */
@Injectable({ providedIn: 'root' })
export class PageStateService {
  private readonly i18n = inject(I18nService);
  readonly activeCase = signal<string | null>(CASES[0].id);
  readonly inspectorOpen = signal(false);
  /** The section in the middle of the viewport, set by an IntersectionObserver. */
  readonly section = signal<SectionId>('top');
  /** What the particle field draws for that section. */
  readonly shape = computed<ShapeName>(() => SHAPE_FOR[this.section()]);
  /** False when WebGL is unavailable, so the page shows a static name instead. */
  readonly webgl = signal(true);

  readonly caseView = computed(() => {
    const c = CASES.find((x) => x.id === this.activeCase());
    return c ? `${c.name[this.i18n.lang()]}, ${c.sections.length} sections` : 'none';
  });

  toggleCase(id: string): void {
    this.activeCase.update((current) => (current === id ? null : id));
  }
}
