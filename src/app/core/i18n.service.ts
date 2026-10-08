import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';
import { DEFAULT_LANG, LANGS, Lang, PROFILE, Text } from '../data/portfolio.data';

const STORAGE_KEY = 'portfolio.lang';
const HTML_LANG: Record<Lang, string> = { en: 'en-CA', fr: 'fr-CA', es: 'es' };

const isLang = (v: unknown): v is Lang => LANGS.includes(v as Lang);

/**
 * Tiny signal-based i18n: the whole UI re-renders when `lang` changes.
 * English is the primary language. Initial language: ?lang= param → visitor's saved choice → English.
 */
@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly doc = inject(DOCUMENT);
  readonly langs = LANGS;
  readonly lang = signal<Lang>(this.detect());

  constructor() {
    effect(() => {
      const lang = this.lang();
      this.doc.documentElement.lang = HTML_LANG[lang];
      this.doc.title = `${PROFILE.shortName} | ${PROFILE.role[lang]}`;
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        /* storage unavailable: ignore */
      }
      // Keep the URL clean for English; share ?lang=fr / ?lang=es for the others.
      const url = new URL(this.doc.location.href);
      if (lang === DEFAULT_LANG) url.searchParams.delete('lang');
      else url.searchParams.set('lang', lang);
      history.replaceState(history.state, '', url);
    });
  }

  t(text: Text): string {
    return text[this.lang()];
  }

  set(lang: Lang): void {
    this.lang.set(lang);
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
