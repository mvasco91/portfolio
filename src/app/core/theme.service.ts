import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

export type Theme = 'dark' | 'light' | 'contrast';
export type Motion = 'full' | 'reduced';

const THEME_KEY = 'portfolio.theme';
const MOTION_KEY = 'portfolio.motion';
const THEME_COLOR: Record<Theme, string> = { dark: '#090d0b', light: '#f5f6f2', contrast: '#000000' };

/**
 * Accessibility preferences, stored per visitor.
 * Defaults follow the OS: prefers-contrast → high contrast, prefers-reduced-motion → reduced.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly themes: Theme[] = ['dark', 'light', 'contrast'];
  readonly theme = signal<Theme>(this.initialTheme());
  readonly motion = signal<Motion>(this.initialMotion());

  constructor() {
    effect(() => {
      const theme = this.theme();
      const root = this.doc.documentElement;
      root.dataset['theme'] = theme;
      this.doc.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
      this.save(THEME_KEY, theme);
    });
    effect(() => {
      const motion = this.motion();
      this.doc.documentElement.dataset['motion'] = motion;
      this.save(MOTION_KEY, motion);
    });
  }

  toggleMotion(): void {
    this.motion.update((m) => (m === 'full' ? 'reduced' : 'full'));
  }

  private initialTheme(): Theme {
    const saved = this.read(THEME_KEY);
    if (saved === 'dark' || saved === 'light' || saved === 'contrast') return saved;
    return matchMedia('(prefers-contrast: more)').matches ? 'contrast' : 'dark';
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
      /* storage unavailable: ignore */
    }
  }
}
