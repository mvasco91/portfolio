# Mauricio Vasco | Portfolio (EN / FR / ES)

Personal portfolio built with **Angular 21** (standalone components, Signals, zoneless), SCSS and a tiny signal-based i18n layer. Deployed to **GitHub Pages** automatically on every push to `main`.

## Edit the content
Everything (text in English, French and Spanish, experience, projects, skills) lives in one file:

```
src/app/data/portfolio.data.ts
```

- **GitHub link:** set `PROFILE.github` to your profile URL (empty hides it).
- **Résumé download:** drop the PDFs into `public/` and set `PROFILE.resume` to e.g. `{ en: 'resume-en.pdf', fr: 'resume-fr.pdf', es: 'resume-es.pdf' }` (empty hides the button).

## Language
- English is the primary language: the site always opens in English unless the visitor picked another language before.
- EN · FR · ES picker in the header; the visitor's choice is remembered.
- Direct links per language: `…/?lang=fr` or `…/?lang=es` (handy for French- or Spanish-language applications).

## Run locally
```bash
npm install
npm start        # http://localhost:4200
```

## Publish on GitHub Pages
1. Create a repo on GitHub. Name it `<your-username>.github.io` to get the short URL `https://<your-username>.github.io/`, or any name (e.g. `portfolio`) to get `https://<your-username>.github.io/portfolio/`.
2. Push this project:
   ```bash
   git init && git add . && git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The **Deploy to GitHub Pages** workflow builds and publishes the site (base path is detected automatically). The URL appears in the workflow run.

## Structure
```
src/app/
  core/i18n.service.ts      signal-based EN/FR/ES switch (+ <html lang>, title, ?lang=)
  core/reveal.directive.ts  reveal-on-scroll with IntersectionObserver
  data/portfolio.data.ts    all content
  sections/                 header, hero, about (bento), experience (tabs), work, skills, contact
src/styles.scss             design tokens and styles
```
