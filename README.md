# Nikita Chaturov Portfolio

Production-ready personal portfolio for `nikchester.ru`.

The project is intentionally static and zero-cost to host: Vite builds the site, GitHub Actions verifies it, and GitHub Pages publishes it.

## Proof Points

- Bilingual EN/RU content sourced from Markdown.
- Public CV PDFs generated from Markdown.
- Production config validation for required environment values.
- Public link validation during build.
- Playwright smoke tests across Chromium, Firefox, and WebKit.
- Responsive checks for `360`, `768`, `1366`, and `1920` px widths.
- Lighthouse quality gate for Performance, Accessibility, Best Practices, and SEO.
- GitHub Pages deployment with custom domain support.

## Stack

- Vite
- React
- TypeScript
- Markdown content pipeline
- GitHub Actions
- GitHub Pages
- Playwright
- Lighthouse

## Local Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npm run lighthouse
```

For production builds, set `VITE_GA_MEASUREMENT_ID`.

## Deployment

Pushes to `main` run the GitHub Actions workflow:

1. Install dependencies.
2. Build generated content and CV PDFs.
3. Run lint, typecheck, production build, link validation, Playwright, and Lighthouse.
4. Upload the static artifact.
5. Deploy to GitHub Pages.

Target domain: `nikchester.ru`.

## Privacy

- No phone number is published.
- Private CV source material under `my-cv/` is ignored and must not be committed.
- Public work content must stay sanitized: no secrets, private IPs, internal hostnames, customer data, or sensitive infrastructure details.
