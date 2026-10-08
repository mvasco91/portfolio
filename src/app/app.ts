import { Component, inject } from '@angular/core';
import { ThemeService } from './core/theme.service';
import { AboutComponent } from './sections/about.component';
import { ContactComponent } from './sections/contact.component';
import { ExperienceComponent } from './sections/experience.component';
import { HeaderComponent } from './sections/header.component';
import { HeroComponent } from './sections/hero.component';
import { SkillsComponent } from './sections/skills.component';
import { WorkComponent } from './sections/work.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, HeroComponent, AboutComponent, ExperienceComponent, WorkComponent, SkillsComponent, ContactComponent],
  template: `
    <a class="skip-link" href="#about">Skip to content</a>
    <div class="backdrop" aria-hidden="true"></div>
    <app-header />
    <main>
      <app-hero />
      <app-about />
      <app-experience />
      <app-work />
      <app-skills />
      <app-contact />
    </main>
  `,
})
export class App {
  /** Instantiated at startup so the saved theme/motion apply before first paint. */
  private readonly theme = inject(ThemeService);
}
