import { Injectable, computed, effect, inject, signal, untracked } from '@angular/core';
import { HTML_LANG, I18nService } from './i18n.service';
import { PageStateService } from './page-state.service';
import { ThemeService } from './theme.service';

export type NodeKind = 'signal' | 'computed' | 'effect';

export interface GraphNode {
  id: string;
  kind: NodeKind;
  /** Ids of the nodes this one reads. */
  deps: string[];
  /** Current value, read reactively so the panel stays live. */
  value: () => string;
}

export interface LogEntry {
  at: number;
  id: string;
  from: string;
  to: string;
  /** Computeds and effects that re-ran because of this change. */
  affected: string[];
}

const fmt = (v: unknown): string => (typeof v === 'string' ? `'${v}'` : String(v));

/**
 * A tiny, honest version of a signal inspector: it describes the real signal graph
 * that drives this page and records every change to a source signal, together with
 * the computeds and effects that depend on it.
 */
@Injectable({ providedIn: 'root' })
export class DevtoolsService {
  private readonly i18n = inject(I18nService);
  private readonly theme = inject(ThemeService);
  private readonly page = inject(PageStateService);

  readonly nodes: GraphNode[] = [
    { id: 'lang', kind: 'signal', deps: [], value: () => fmt(this.i18n.lang()) },
    { id: 'theme', kind: 'signal', deps: [], value: () => fmt(this.theme.theme()) },
    { id: 'motion', kind: 'signal', deps: [], value: () => fmt(this.theme.motion()) },
    { id: 'section', kind: 'signal', deps: [], value: () => fmt(this.page.section()) },
    { id: 'activeCase', kind: 'signal', deps: [], value: () => fmt(this.page.activeCase()) },
    { id: 'shape', kind: 'computed', deps: ['section'], value: () => fmt(this.page.shape()) },
    { id: 'title', kind: 'computed', deps: ['lang'], value: () => fmt(this.i18n.title()) },
    { id: 'caseView', kind: 'computed', deps: ['activeCase', 'lang'], value: () => fmt(this.page.caseView()) },
    { id: 'particles.morph', kind: 'effect', deps: ['shape'], value: () => this.page.shape() },
    { id: 'particles.palette', kind: 'effect', deps: ['theme'], value: () => this.theme.theme() },
    { id: 'html[lang]', kind: 'effect', deps: ['lang'], value: () => HTML_LANG[this.i18n.lang()] },
    { id: 'document.title', kind: 'effect', deps: ['title'], value: () => 'updated' },
    { id: 'html[data-theme]', kind: 'effect', deps: ['theme'], value: () => this.theme.theme() },
  ];

  readonly log = signal<LogEntry[]>([]);
  /** Bumped per node on every update, so the panel can replay its highlight. */
  readonly pulses = signal<Record<string, number>>({});
  readonly changeCount = computed(() => this.log().length);

  constructor() {
    this.watch('lang', () => this.i18n.lang());
    this.watch('theme', () => this.theme.theme());
    this.watch('motion', () => this.theme.motion());
    this.watch('activeCase', () => this.page.activeCase());
    this.watch('section', () => this.page.section());
  }

  dependents(id: string): string[] {
    const out: string[] = [];
    const visit = (source: string) => {
      for (const n of this.nodes) {
        if (n.deps.includes(source) && !out.includes(n.id)) {
          out.push(n.id);
          visit(n.id);
        }
      }
    };
    visit(id);
    return out;
  }

  private watch(id: string, read: () => unknown): void {
    let previous: string | undefined;
    effect(() => {
      const value = fmt(read());
      untracked(() => {
        if (previous !== undefined && previous !== value) {
          const affected = this.dependents(id);
          this.log.update((l) => [{ at: Date.now(), id, from: previous!, to: value, affected }, ...l].slice(0, 6));
          this.pulses.update((p) => {
            const next = { ...p };
            for (const n of [id, ...affected]) next[n] = (next[n] ?? 0) + 1;
            return next;
          });
        }
        previous = value;
      });
    });
  }
}
