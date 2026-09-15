# Implementation Plan

Goal: ship a production-ready one-page portfolio for `nikchester.ru` on GitHub Pages.

Source spec: `SPEC.md`.

## 0. Current Decisions

- Positioning: `Infrastructure Engineer`.
- Primary audience: employers, recruiters, technical leads.
- Stack: Vite + React + TypeScript + npm.
- Content source: Markdown at build time.
- CV source: Markdown, generated to RU and EN PDF.
- Hosting: GitHub Pages.
- Repository: `Chest3rf1eld.github.io`.
- Domain: `nikchester.ru`.
- Analytics: Google Analytics through GitHub Secret.
- Main CTA: `https://t.me/Chesterf1ld`.
- Design: minimal Windows 95/98 desktop language, strict hero, more retro character below.

## 1. Preflight

### 1.1 Check Local Tooling

Verify:
- `node`
- `npm`
- `git`
- `gh`

Target commands:

```powershell
node --version
npm --version
git --version
gh --version
gh auth status
```

### 1.2 Check GitHub State

Verify whether `Chest3rf1eld.github.io` already exists.

Target command:

```powershell
gh repo view Chest3rf1eld/Chest3rf1eld.github.io
```

Decision:
- If it does not exist, create it with `gh repo create`.
- If it exists, inspect before pushing.

## 2. Project Scaffold

Create Vite React TypeScript app in the current workspace.

Target result:
- `package.json`
- `index.html`
- `src/`
- `public/`
- `vite.config.ts`
- TypeScript config
- ESLint config

Implementation notes:
- Use `npm`.
- Keep dependencies small.
- Avoid UI frameworks.
- Prefer plain CSS or CSS modules.
- Do not add backend, CMS, database, or contact form.

Required scripts:

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "typecheck": "tsc -b --noEmit",
  "test:e2e": "playwright test",
  "lighthouse": "lhci autorun",
  "cv:build": "node scripts/build-cv.mjs",
  "validate:links": "node scripts/validate-links.mjs"
}
```

## 3. Content Architecture

Use Markdown as the content source.

Proposed structure:

```text
content/
  en/
    hero.md
    proof.md
    work/
      monitoring-stack.md
      hestiacp-automation.md
      linux-troubleshooting.md
      i3-dotfiles.md
    stack.md
    contact.md
  ru/
    hero.md
    proof.md
    work/
      monitoring-stack.md
      hestiacp-automation.md
      linux-troubleshooting.md
      i3-dotfiles.md
    stack.md
    contact.md
  cv/
    nikita-chaturov-cv.en.md
    nikita-chaturov-cv.ru.md
```

Build-time content pipeline:
- Read Markdown files during build.
- Parse frontmatter and Markdown body.
- Convert to typed content objects.
- Render content in React components.

Recommended libraries:
- `gray-matter` for frontmatter.
- `marked` or `remark` for Markdown conversion.

Keep Markdown simple. No runtime CMS.

## 4. Content Drafting

### 4.1 Hero

English default.

Core message:
- Name: Nikita Chaturov.
- Role: Infrastructure Engineer.
- Angle: owns and improves Linux production infrastructure.
- CTA: Telegram.

Avoid:
- overclaiming Kubernetes/Terraform/SRE maturity.
- long personal biography in hero.

### 4.2 Proof Metrics

Use safe metrics:
- `15+ servers and VMs`
- `170+ websites`
- `4 infrastructure providers`
- `Proxmox VE environment`
- `Recovery in hours, not days`

### 4.3 Work Cards

MVP cards:
- Monitoring Stack as Code: `grafana-prometheus-loki-ansible`.
- Bulk Web Infrastructure Automation: `HestiaCP_scripts`.
- Linux Troubleshooting Runbook: `pi-linux-troubleshooting`.
- Linux Desktop / Dotfiles: `my-i3-dotfiles`.

Each card must include:
- problem
- action
- result
- stack
- public link

Do not include:
- `k8s-study-project` as production proof.
- `proxmox migrations` until a stronger public/sanitized story exists.
- `web cluster` until user provides sanitized architecture details.

## 5. UI Implementation

### 5.1 Components

Suggested components:
- `App`
- `PageShell`
- `DesktopWindow`
- `TitleBar`
- `LanguageSwitch`
- `Hero`
- `ProofGrid`
- `WorkGrid`
- `StackPanel`
- `CvPanel`
- `ContactPanel`
- `SystemDialog`

### 5.2 Design Rules

- Use the old Windows visual language from `DESIGN_REFERENCE.md`.
- Keep the hero strict and readable.
- Use grey windows, blue title bars, teal/dark desktop background.
- Avoid full fake desktop behavior.
- No drag/drop in MVP.
- Moderate interactions only: tabs, dialogs, hover/focus states, language switch.

### 5.3 Responsive Rules

- Desktop can use arranged panels/windows.
- Mobile stacks all windows in one column.
- No horizontal overflow.
- Required widths: `360`, `768`, `1366`, `1920`.

## 6. CV Generation

Generate two PDFs:
- English CV.
- Russian CV.

Rules:
- Source is Markdown.
- Phone number must not be included.
- PDFs must be linked from the CV section.
- Missing PDFs block release.

Implementation options:
- Markdown -> HTML -> PDF using Playwright.
- Keep a print stylesheet for CV output.

Preferred path:
- Generate CV PDFs with Playwright from local HTML templates.
- Output to `public/assets/cv/`.

## 7. SEO And Analytics

### 7.1 SEO

Implement:
- `title`
- `description`
- canonical URL
- `html lang`
- Open Graph tags
- Twitter card tags
- JSON-LD `Person`
- `sitemap.xml`
- `robots.txt`
- favicon

Default URL:
- `https://nikchester.ru`

### 7.2 Google Analytics

GA Measurement ID:
- `G-XWTKZN2DQL`

Production rules:
- GA ID must come from GitHub Secret.
- Production build fails if GA ID is missing.
- GA script failure must not break the site.

Local development:
- GA can be disabled unless explicitly configured.

## 8. Testing And Quality Gates

Required before release:
- `npm run lint`
- `npm run typecheck`
- `npm run cv:build`
- `npm run build`
- `npm run test:e2e`
- `npm run validate:links`
- `npm run lighthouse`

Playwright must cover:
- page loads
- EN content visible by default
- RU switch works
- all six sections exist
- Telegram CTA exists
- GitHub, LinkedIn, email, CV links exist
- public project links exist
- mobile width does not overflow
- browser coverage: Chromium, WebKit, Firefox

Lighthouse targets:
- Performance >= 90
- Accessibility >= 90
- Best Practices >= 90
- SEO >= 90

## 9. GitHub Pages And CI/CD

### 9.1 Repository

Target repository:

```text
Chest3rf1eld.github.io
```

Use `gh` CLI for GitHub operations whenever possible.

### 9.2 GitHub Secrets

Required secret:

```text
GA_MEASUREMENT_ID=G-XWTKZN2DQL
```

Target command:

```powershell
gh secret set GA_MEASUREMENT_ID --repo Chest3rf1eld/Chest3rf1eld.github.io
```

### 9.3 GitHub Actions

Workflow steps:
- checkout
- setup node
- `npm ci`
- lint
- typecheck
- build CV PDFs
- validate links
- build site
- run Playwright smoke where feasible
- run Lighthouse where feasible
- upload Pages artifact
- deploy Pages

### 9.4 Custom Domain

Domain:

```text
nikchester.ru
```

User-owned task:
- Configure DNS records at the domain provider.

Assistant-owned tasks:
- Configure Pages custom domain with `gh` where possible.
- Add `CNAME` if required.
- Provide exact DNS records after Pages setup.

## 10. Repository Cleanup Before Public Release

Selected public repos should be improved enough for recruiter/technical review.

Minimum prep:
- add or confirm README quality
- add repository descriptions
- add topics
- check for secrets/private data
- add licenses where appropriate

Priority order:
1. `grafana-prometheus-loki-ansible`
2. `HestiaCP_scripts`
3. `pi-linux-troubleshooting`
4. `my-i3-dotfiles`

Suggested topics:
- `linux`
- `ansible`
- `bash`
- `prometheus`
- `grafana`
- `loki`
- `monitoring`
- `sre`
- `devops`
- `hestiacp`
- `automation`
- `troubleshooting`

## 11. Implementation Order

1. Preflight tooling and GitHub auth check.
2. Scaffold Vite React TypeScript app.
3. Add base layout and retro UI primitives.
4. Add Markdown content pipeline.
5. Draft EN/RU content for hero, proof, work, stack, contact.
6. Implement language switch.
7. Implement responsive layout.
8. Implement CV Markdown sources and PDF generation.
9. Add SEO, sitemap, robots, JSON-LD, favicon.
10. Add GA integration with production secret validation.
11. Add Playwright smoke tests and responsive checks.
12. Add link validation.
13. Add Lighthouse config.
14. Add GitHub Actions deploy workflow.
15. Create/configure `Chest3rf1eld.github.io` through `gh`.
16. Configure Pages and custom domain where possible.
17. Provide DNS instructions for `nikchester.ru`.
18. Run full verification.
19. Fix release blockers.
20. Push to `main` for deploy.

## 12. Release Blockers

Release must not happen if:
- build fails
- lint/typecheck fails
- CV PDFs are missing
- phone number appears in public site or CV PDFs
- GA secret is missing in production
- any public link is broken
- Lighthouse score is below 90 in any category
- Playwright smoke fails in Chromium, WebKit, or Firefox
- private infrastructure details are present in public content

## 13. User-Owned Inputs

Needed from the user before or during implementation:
- hero photo, if it should be used instead of placeholder
- final approval of public CV content
- DNS record changes for `nikchester.ru`
- sanitized details for `proverka-cheka.ru`, if expanding beyond short card
- sanitized details for web cluster case, if adding it later

## 14. Definition Of Done

MVP is done when:
- site is published through GitHub Pages
- `nikchester.ru` opens the portfolio after DNS propagation
- EN is default and RU is available
- all six sections are implemented
- four selected public GitHub projects are shown safely
- RU and EN CV PDFs download correctly
- Telegram CTA works
- public links validate
- tests and quality gates pass
- no phone number or private infrastructure data is published
