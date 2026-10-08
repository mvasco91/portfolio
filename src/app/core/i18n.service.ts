import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { DEFAULT_LANG, LANGS, Lang, PROFILE, Text } from '../data/portfolio.data';

const STORAGE_KEY = 'portfolio.lang';
export const HTML_LANG: Record<Lang, string> = { en: 'en-CA', fr: 'fr-CA', es: 'es' };
const isLang = (v: unknown): v is Lang => LANGS.includes(v as Lang);

/**
 * Signal-based i18n. English is the primary language.
 * Initial language: ?lang= param, then the visitor's saved choice, then English.
 */
@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly doc = inject(DOCUMENT);
  readonly langs = LANGS;
  readonly lang = signal<Lang>(this.detect());
  readonly title = computed(() => `${PROFILE.shortName} | ${PROFILE.role[this.lang()]}`);

  constructor() {
    effect(() => {
      this.doc.documentElement.lang = HTML_LANG[this.lang()];
    });
    effect(() => {
      this.doc.title = this.title();
    });
    effect(() => {
      const lang = this.lang();
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        /* storage unavailable */
      }
      const url = new URL(this.doc.location.href);
      if (lang === DEFAULT_LANG) url.searchParams.delete('lang');
      else url.searchParams.set('lang', lang);
      history.replaceState(history.state, '', url);
    });
  }

  t(text: Text): string {
    return text[this.lang()];
  }

  next(): void {
    const i = LANGS.indexOf(this.lang());
    this.lang.set(LANGS[(i + 1) % LANGS.length]);
  }

  private detect(): Lang {
    const param = new URLSearchParams(this.doc.location.search).get('lang');
    if (isLang(param)) return param;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isLang(saved)) return saved;
    } catch {
      /* ignore */
    }
    return DEFAULT_LANG;
  }
}
