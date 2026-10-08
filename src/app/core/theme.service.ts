import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'contrast';
export type Motion = 'full' | 'reduced';

const THEME_KEY = 'portfolio.theme';
const MOTION_KEY = 'portfolio.motion';
const THEMES: Theme[] = ['dark', 'light', 'contrast'];
const THEME_COLOR: Record<Theme, string> = { light: '#f1f4f2', dark: '#0f1e17', contrast: '#000000' };

/**
 * Accessibility preferences, stored per visitor.
 * Dark is the default; a first visit still honours OS high contrast and reduced motion.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly themes = THEMES;
  readonly theme = signal<Theme>(this.initialTheme());
  readonly motion = signal<Motion>(this.initialMotion());

  constructor() {
    effect(() => {
      const theme = this.theme();
      this.doc.documentElement.dataset['theme'] = theme;
      this.doc.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
      this.save(THEME_KEY, theme);
    });
    effect(() => {
      const motion = this.motion();
      this.doc.documentElement.dataset['motion'] = motion;
      this.save(MOTION_KEY, motion);
    });
  }

  next(): void {
    const i = THEMES.indexOf(this.theme());
    this.theme.set(THEMES[(i + 1) % THEMES.length]);
  }

  toggleMotion(): void {
    this.motion.update((m) => (m === 'full' ? 'reduced' : 'full'));
  }

  private initialTheme(): Theme {
    const saved = this.read(THEME_KEY);
    if (THEMES.includes(saved as Theme)) return saved as Theme;
    if (matchMedia('(prefers-contrast: more)').matches) return 'contrast';
    return 'dark';
  }

  private initialMotion(): Motion {
    const saved = this.read(MOTION_KEY);
    if (saved === 'full' || saved === 'reduced') return saved;
    return matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'full';
  }

  private read(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private save(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* storage unavailable */
    }
  }
}
