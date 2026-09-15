# Personal Portfolio Specification

> Generated via spec-interview on 2026-09-15  
> Status: APPROVED FOR MVP IMPLEMENTATION

---

## 1. Overview

### 1.1 Problem Statement

The owner needs a public, professional portfolio site that can be sent to employers, recruiters, technical leads, clients, and professional contacts.

The site must quickly explain who the owner is, what infrastructure problems he solves, what proof exists, and how to contact him. It must be hosted for free on GitHub Pages.

### 1.2 Solution Summary

Build a bilingual one-page portfolio for Nikita Chaturov, positioned as an `Infrastructure Engineer` with strong Linux production ownership, system administration, DevOps, and SRE-adjacent experience.

The visual style should combine a strict, readable first screen with a minimal retro Windows 95/98 desktop aesthetic in lower sections. Content must be short, high-signal, and based on real experience.

### 1.3 Success Metrics

- Site readiness: portfolio can be confidently shared with employers and professional contacts.
- Hiring usefulness: site supports job applications and increases trust before interviews.
- Proof quality: selected work and GitHub links demonstrate real infrastructure experience.
- Technical quality: production build passes lint, build, Playwright smoke tests, and Lighthouse targets.
- Cost: hosting remains free through GitHub Pages.

### 1.4 Non-Goals

MVP explicitly excludes:
- blog
- CMS
- backend
- contact form
- database
- drag-and-drop windows
- complex desktop simulation
- deep case-study pages
- private/internal infrastructure details
- publishing a phone number

---

## 2. Users & Use Cases

### 2.1 Target Users

| User Type | Description | Technical Level | Usage Frequency |
|-----------|-------------|-----------------|-----------------|
| Recruiter / hiring manager | Evaluates fit, stack, experience, contacts, CV | Medium | During sourcing/application review |
| Technical lead | Checks engineering credibility, production experience, tooling, project proof | High | During technical screening |
| Freelance client | Looks for reliability, infrastructure capability, contact path | Low-Medium | Occasional |
| Professional contact | Needs a concise public profile link | Mixed | Occasional |

### 2.2 Primary Use Cases

1. **Employer screening**: visitor opens the site, understands the role, scans proof metrics, checks selected work, downloads CV, contacts via Telegram/email/LinkedIn.
2. **Technical validation**: visitor reviews project cards, stack, GitHub links, and sanitized case descriptions.
3. **Professional intro**: owner sends one link instead of multiple scattered profiles.

### 2.3 User Journey

```text
Open site -> Hero -> Proof metrics -> Selected work -> Stack -> CV download -> Contact
                |                                           |
                v                                           v
          Language switch                              External profile links
```

### 2.4 Adoption Blockers

- Too much text.
- Overly playful retro UI that reduces trust.
- Missing CV download.
- Broken public links.
- Unclear distinction between production experience and lab/learning experience.
- Public content exposing private company infrastructure details.

---

## 3. Functional Requirements

### 3.1 Core Features (MVP)

| Feature | Description | Priority | Acceptance Criteria |
|---------|-------------|----------|---------------------|
| One-page portfolio | Single landing page with all core sections | P0 | User can understand role, proof, work, stack, CV, contact without navigating away |
| Bilingual content | English default, Russian alternative | P0 | English is default; Russian is accessible through a visible EN/RU switch |
| Retro UI system | Minimal Windows 95/98-inspired interface | P0 | Hero stays clear and strict; lower sections use system windows, title bars, borders, bevels |
| Markdown content | Site content is sourced from Markdown at build time | P0 | Core copy and work entries are editable as Markdown, not hardcoded JSON |
| Selected work | Short sanitized project cards | P0 | Cards include problem, action, stack, result, and safe links when available |
| CV downloads | RU and EN PDF CV downloads generated from Markdown | P0 | Both PDFs exist before public release; phone number is not included |
| Contact CTA | Primary CTA opens Telegram directly | P0 | CTA links to `https://t.me/Chesterf1ld` |
| Full SEO | Metadata, language, Open Graph, JSON-LD, sitemap, robots | P0 | Lighthouse SEO score >= 90 |
| Google Analytics | GA loaded only in production when ID exists | P0 | Production build fails if GA secret is missing |
| GitHub Pages deploy | Deploy via GitHub Actions | P0 | Push to `main` builds and deploys to Pages |

### 3.2 Selected Public Projects For MVP

The Work section should use these public repositories as concrete proof. Keep copy short and practical. Do not overstate project scope.

| Priority | Project | URL | Portfolio Role | Card Angle |
|----------|---------|-----|----------------|------------|
| Primary | Monitoring Stack as Code | `https://github.com/Chest3rf1eld/grafana-prometheus-loki-ansible` | Main infrastructure/SRE proof | Ansible-based distributed monitoring stack with Grafana, Prometheus, Loki, blackbox checks, TLS, and firewall rules |
| Primary | Bulk Web Infrastructure Automation | `https://github.com/Chest3rf1eld/HestiaCP_scripts` | Main automation proof for 170+ site operations | Bash tooling for HestiaCP/WordPress operations: SSL, migrations, redirects, permissions, backups, cache/plugin maintenance |
| Supporting | Linux Troubleshooting Runbook | `https://github.com/Chest3rf1eld/pi-linux-troubleshooting` | Reliability/troubleshooting/process proof | Safety-first Linux incident triage workflow for load, memory, disk, network, DNS, systemd, SSH, and post-incident notes |
| Supporting | Linux Desktop / Dotfiles | `https://github.com/Chest3rf1eld/my-i3-dotfiles` | Personal Linux/open-source signal | i3/X11 desktop environment managed with GNU Stow, shell scripts, tmux, rofi, polybar, and user systemd services |

Do not include these repositories in the primary MVP Work section unless they are improved first:
- `https://github.com/Chest3rf1eld/k8s-study-project` - currently a study project; may be mentioned as Kubernetes lab/study level, not production proof.
- `https://github.com/Chest3rf1eld/backup_yandex_objective_storage` - useful but better folded into the HestiaCP/backups automation story.
- `https://github.com/Chest3rf1eld/nikchester.ansible-role.hestiacp` - fork; only show later if improvements are documented clearly.
- `https://github.com/Chest3rf1eld/kwork-jobs-parser` - useful automation but less aligned with Infrastructure Engineer positioning.
- `https://github.com/Chest3rf1eld/Spotify-Likes-Downloader` - personal utility, not relevant enough for the main professional proof.
- `https://github.com/Chest3rf1eld/nikchester-blog` - can be linked separately later, not as project proof.

### 3.3 Project Repository Preparation Checklist

Before release, prepare the selected public repositories enough that a recruiter or technical lead can open them without confusion.

Required for selected repos:
- README has a clear purpose statement.
- README explains what problem the project solves.
- README has safe usage or architecture notes.
- No secrets, real private IPs, private domains, tokens, credentials, or customer data are committed.
- Repository description is filled in GitHub.
- Topics are added where useful.

Recommended topics:
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

Recommended license work:
- Add a license to `grafana-prometheus-loki-ansible`.
- Add a license to `HestiaCP_scripts`.
- Add a license to `pi-linux-troubleshooting`.

### 3.4 Phase 2 Features

- Detailed case pages after sanitized materials are available.
- More project links and diagrams.
- GitHub issues for iterative improvements.
- Optional privacy-friendly analytics replacement if needed.
- Better accessibility pass.
- Optional blog only if it supports hiring or proof.

### 3.5 Future Considerations

- Add Kubernetes/Terraform/SRE lab project once real proof exists.
- Add web cluster case when architecture details are provided and sanitized.
- Add hero photo when suitable image is available.
- Add Open Graph preview image matching the retro desktop aesthetic.

---

## 4. Technical Architecture

### 4.1 System Overview

```text
Markdown content + assets + CV source
              |
              v
      Vite React TypeScript build
              |
              v
      Static HTML/CSS/JS/PDF assets
              |
              v
      GitHub Actions -> GitHub Pages -> nikchester.ru
```

No backend, no server-side runtime, no database.

### 4.2 Data Model

Core content entities are static and build-time only.

```text
Profile
- name
- headline
- location
- email
- telegramUrl
- githubUrl
- linkedinUrl
- primaryRole
- summary

ProofMetric
- label
- value
- description

WorkItem
- title
- slug
- language
- problem
- action
- result
- stack[]
- liveUrl?
- githubUrl?
- visible

SkillGroup
- title
- skills[]

CV
- language
- sourceMarkdownPath
- outputPdfPath
```

### 4.3 API Design

No application API is required.

External links are static URLs only.

### 4.4 State Management

- Client state: selected language, open fallback dialog, optional UI tab/window states.
- Server state: none.
- Persistent state: none in app runtime.
- Source of truth: Markdown content files and static config committed to the repository.

### 4.5 Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Vite + React + TypeScript | Fast static build, typed components, good GitHub Pages support |
| Styling | CSS modules or plain CSS | Small site, no heavy UI framework needed |
| Content | Markdown at build time | Human-editable content, better than JSON for portfolio copy |
| CV | Markdown to PDF | Single source for RU/EN CV content and downloadable PDFs |
| Testing | ESLint, Playwright, Lighthouse | Required quality gates |
| Deployment | GitHub Actions + GitHub Pages | Free hosting and automated deploy |
| Analytics | Google Analytics | User-selected analytics tool |

### 4.6 Known Technical Tradeoffs

- Vite React is heavier than plain HTML/CSS, but gives better component structure and future flexibility.
- Markdown at build time adds tooling, but keeps content maintainable.
- GA via GitHub Secret improves config control, but can block deploy if the secret is missing.
- Minimal accessibility is accepted for MVP, but must not break keyboard navigation or readability.

---

## 5. UI/UX Design

### 5.1 Key Screens/Views

The MVP is a single page with these sections:

1. **Hero**: name, `Infrastructure Engineer`, concise Linux production ownership statement, primary Telegram CTA, secondary links.
2. **Proof**: short metrics: `15 servers`, `170+ sites`, `4 providers`, `Proxmox`, `recovery hours not days`.
3. **Work**: selected sanitized work cards.
4. **Stack**: grouped technologies and confidence level by real experience.
5. **CV**: RU and EN PDF download buttons.
6. **Contact**: Telegram, email, GitHub, LinkedIn.

### 5.2 Navigation Flow

- Main navigation is minimal and can use a retro menu/titlebar pattern.
- Language switch is visible as EN/RU titlebar-style buttons.
- Primary CTA goes directly to Telegram.
- External profile/project links open normally and must be valid before release.

### 5.3 Visual Direction

Use the reference in `DESIGN_REFERENCE.md`.

Required traits:
- strict, clear first screen
- teal/dark desktop-like background
- grey system-window panels
- blue active title bars
- thin borders and bevel effects
- compact system typography
- restrained pixel/toolbar/icon details

Do not copy the reference's full visual clutter. The portfolio must remain readable and professional.

### 5.4 Empty States

- Missing hero photo: show a retro placeholder/system dialog style area, not a broken image.
- Missing project details: hide unavailable details rather than using `TBD` or `coming soon`.
- Missing project links: hide link buttons until real URLs exist.
- Missing CV PDFs: block release; CV is P0.

### 5.5 Error States

Errors should use a small retro system dialog pattern when user interaction fails.

Examples:
- asset unavailable
- external link failed validation before release
- CV file missing during build
- GA secret missing during production build

Runtime link failures cannot always be detected in the browser, so release-time link validation is required.

### 5.6 Responsive Behavior

- Desktop: sections may look like arranged desktop windows, but without drag/drop.
- Mobile: windows stack in one readable column.
- Required viewports: `360`, `768`, `1366`, `1920` px widths.
- No horizontal scrolling for normal content.

### 5.7 Accessibility Requirements

MVP accessibility target is minimal but responsible:
- semantic HTML landmarks
- readable contrast
- keyboard-accessible links/buttons
- visible focus states
- alt text for meaningful images
- language attributes for EN/RU content
- no content hidden only by hover

---

## 6. Integration & Dependencies

### 6.1 External Systems

| System | Purpose | Protocol | Owner |
|--------|---------|----------|-------|
| GitHub Pages | Static hosting | GitHub Actions/Pages | Owner + GitHub |
| GitHub CLI | Repo and Pages operations | `gh` CLI | Owner environment |
| Custom domain `nikchester.ru` | Public domain | DNS | User-owned DNS |
| Google Analytics | Traffic analytics | JS tag | Google / Owner |
| Telegram | Primary contact CTA | External URL | Telegram / Owner |
| GitHub profile | Proof and source links | External URL | GitHub / Owner |
| LinkedIn | Professional profile | External URL | LinkedIn / Owner |

### 6.2 Data Flows

```text
Markdown content -> Vite build -> static site -> GitHub Pages
CV Markdown -> PDF generation -> public downloadable PDF assets
Visitor browser -> GA script -> Google Analytics
Visitor click -> Telegram/GitHub/LinkedIn/email/project links
```

### 6.3 Failure Handling

| Dependency | Failure Mode | Handling Strategy |
|------------|--------------|-------------------|
| GitHub Actions | Build fails | Do not deploy; inspect logs |
| GitHub Pages | Deployment delayed | Accept up to normal Pages propagation delay |
| DNS | Domain not pointing to Pages | User updates DNS; site can still be checked through GitHub Pages URL if enabled |
| GA Secret | Missing in production | Production build fails |
| GA script | Blocked by browser/adblock | Site remains fully usable |
| Hero photo | Missing/unavailable | Show system-dialog style fallback |
| Public link | Broken during validation | Release is blocked or link is hidden before release |

---

## 7. Error Handling & Edge Cases

### 7.1 Error Taxonomy

| Error Type | User Message | Technical Detail | Recovery |
|------------|--------------|------------------|----------|
| Missing required build config | Production config incomplete | GA secret or domain config missing | Fail build and fix CI config |
| Missing CV PDF | CV file unavailable | PDF generation failed or file missing | Fail release until generated |
| Missing optional content | Section unavailable | Optional Markdown/assets absent | Hide block or use fallback UI |
| Broken external link | Link unavailable | Link check failed | Fix or remove link before release |
| Image load failure | File unavailable | Image request failed | Show retro fallback dialog |

### 7.2 Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| User switches language repeatedly | UI updates without layout break |
| Browser has JS disabled | Critical content should degrade as much as possible; site is primarily static but React JS is expected |
| GA blocked by adblock | No visible error; site remains usable |
| Hero photo not added yet | Placeholder/fallback shown |
| Only one public GitHub project is available | Work section remains compact and honest |
| Project code cannot be shown | Show sanitized case card without code link |
| Very small mobile viewport | Window panels stack vertically; no content overflow |

### 7.3 Partial Failure Handling

The site is static. Partial failures are mostly missing assets or blocked external scripts.

Required assets/config must fail build. Optional assets must degrade visually through fallback UI or be hidden.

---

## 8. Security & Privacy

### 8.1 Authentication

No user authentication.

### 8.2 Authorization

No runtime authorization. Repository write access is controlled by GitHub permissions.

### 8.3 Data Classification

| Data Type | Classification | Encryption | Retention |
|-----------|----------------|------------|-----------|
| Name | Public | HTTPS in transit | Until removed from site |
| Nickname | Public | HTTPS in transit | Until removed from site |
| Telegram URL | Public | HTTPS in transit | Until removed from site |
| Email | Public | HTTPS in transit | Until removed from site |
| GitHub URL | Public | HTTPS in transit | Until removed from site |
| LinkedIn URL | Public | HTTPS in transit | Until removed from site |
| Phone number | Sensitive personal | Not published | Must not be committed to public site |
| CV PDF | Public professional | HTTPS in transit | Until replaced/removed |
| Hero photo | Public personal | HTTPS in transit | Until replaced/removed |
| Work case details | Public sanitized | HTTPS in transit | Until replaced/removed |

### 8.4 Compliance Requirements

No formal compliance requirement is defined for MVP.

Privacy implications:
- Google Analytics is included without consent banner by user decision.
- Do not publish phone number.
- Sanitize all work content before commit.

### 8.5 Audit Trail

Git history is the audit trail for site content and config changes.

### 8.6 Content Sanitization Rules

Before committing public case content, remove:
- IP addresses
- secrets/tokens/passwords
- internal hostnames
- private diagrams that reveal sensitive topology
- customer/private company data
- non-public incident details that could help attackers

---

## 9. Performance & Reliability

### 9.1 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance | >= 90 | Lighthouse against production-like build |
| Lighthouse Accessibility | >= 90 | Lighthouse against production-like build |
| Lighthouse Best Practices | >= 90 | Lighthouse against production-like build |
| Lighthouse SEO | >= 90 | Lighthouse against production-like build |
| Broken public links | 0 | Link checker or Playwright smoke |

### 9.2 Availability Target

Availability is best-effort based on GitHub Pages. No separate SLA is owned by the project.

### 9.3 Scalability Plan

Static GitHub Pages hosting is sufficient for expected portfolio traffic.

### 9.4 Graceful Degradation

- GA failure must not affect UI.
- Optional image/content failure shows fallback or hides block.
- Required build assets fail CI before deploy.

---

## 10. Operations

### 10.1 Deployment

Target repository: `Chest3rf1eld.github.io`.

Deployment model:
- Use `gh` CLI for GitHub operations whenever possible.
- Push to `main` triggers GitHub Actions.
- GitHub Actions installs dependencies, builds the Vite app, runs quality gates, and deploys to GitHub Pages.
- Custom domain: `nikchester.ru`.

DNS is user-owned. The user will configure required DNS records manually.

### 10.2 Monitoring & Alerting

| Metric | Threshold | Alert | Response |
|--------|-----------|-------|----------|
| GitHub Actions build | Any failure | GitHub checks | Fix failed step before deploy |
| Pages deployment | Failed deployment | GitHub checks | Inspect Pages/Actions logs |
| GA visits | Informational | GA dashboard | No operational alert in MVP |

### 10.3 Debugging

Debugging sources:
- local `npm run dev`
- local `npm run build`
- local preview server
- Playwright traces/screenshots if configured
- Lighthouse report
- GitHub Actions logs
- browser devtools

### 10.4 Rollback Plan

Rollback by reverting the bad commit and pushing to `main`, or by restoring a previously known-good commit.

Do not use destructive git operations unless explicitly approved.

### 10.5 Configuration Management

- Domain config should be represented through Pages settings and `CNAME` if required.
- GA Measurement ID should come from GitHub Secrets for production build.
- Public non-secret site config can live in a static config file.
- Content lives in Markdown files.

---

## 11. Testing Strategy

### 11.1 Test Levels

| Level | Scope | Tooling | Coverage Target |
|-------|-------|---------|-----------------|
| Lint | TypeScript/React/CSS where configured | ESLint | No errors before deploy |
| Build | Production bundle and required config | Vite build | Must pass |
| E2E smoke | Page loads, language switch works, core sections visible, links present | Playwright | Chromium, WebKit, Firefox |
| Responsive smoke | Required viewports | Playwright or manual browser check | `360`, `768`, `1366`, `1920` |
| Lighthouse | Performance, Accessibility, Best Practices, SEO | Lighthouse CLI or equivalent | >= 90 each |
| Link validation | All public links | Playwright/link checker | 0 broken links |

### 11.2 Test Data Strategy

Use real sanitized portfolio content from Markdown files.

Test fixtures should not include private infrastructure details or phone number.

### 11.3 Acceptance Criteria

MVP is done when:
- site builds successfully
- GitHub Actions deploys to Pages
- `nikchester.ru` is configured in Pages and DNS instructions are provided to the user
- EN default and RU alternative work
- all six sections are present
- Telegram CTA works
- GitHub, LinkedIn, email, and public project links work
- RU and EN CV PDFs exist and contain no phone number
- Lighthouse scores are >= 90 for Performance, Accessibility, Best Practices, SEO
- Playwright smoke passes in Chromium, WebKit, Firefox
- required responsive widths are usable
- no private infrastructure data is committed

---

## 12. Verification Environment

### 12.1 Dev Server

- Start command: `npm run dev`
- Expected local URL: `http://localhost:5173`
- Preview command: `npm run preview`
- Health endpoint: none

### 12.2 Database

- Type: none
- ORM/Migration tool: none
- Migration command: none
- Direct query command: none

### 12.3 Test Runners

| Type | Tool | Command |
|------|------|---------|
| Lint | ESLint | `npm run lint` |
| E2E smoke | Playwright | `npm run test:e2e` |
| Typecheck | TypeScript | `npm run typecheck` |
| Build | Vite | `npm run build` |
| Preview | Vite preview | `npm run preview` |
| Lighthouse | Lighthouse CLI or equivalent | `npm run lighthouse` |
| CV generation | Markdown-to-PDF tooling | `npm run cv:build` |

Commands are target commands for implementation. They must be created during project setup.

### 12.4 Verification Patterns

- UI verification: Playwright checks page content, language switch, links, responsive viewports.
- SEO verification: inspect built HTML and Lighthouse report.
- Link verification: automated check for all public links before deploy.
- CI checks: lint, typecheck, CV build, production build, Playwright smoke, Lighthouse where feasible.

---

## 13. Implementation Plan

### 13.1 Phases

| Phase | Scope | Milestone |
|-------|-------|-----------|
| 1 | Scaffold Vite React TS app, npm scripts, baseline CSS | Local app starts |
| 2 | Markdown content pipeline and bilingual content structure | EN/RU content renders |
| 3 | Retro UI components and one-page layout | MVP page usable on desktop/mobile |
| 4 | Work cards, stack, contact, SEO metadata, GA integration | Feature-complete content |
| 5 | CV Markdown and RU/EN PDF generation | CV downloads available |
| 6 | Tests, Lighthouse, link validation, GitHub Actions deploy | Production-ready release |
| 7 | GitHub repo and Pages setup through `gh` CLI | Published site workflow ready |

### 13.2 Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Retro UI hurts clarity | Medium | High | Keep hero strict; use retro style as structure, not clutter |
| CV generation takes too long | Medium | Medium | Keep CV Markdown simple; use manual PDF fallback only if needed before deadline |
| Missing GA secret blocks deploy | Medium | Medium | Document required GitHub Secret clearly and set it via `gh` if possible |
| Custom domain DNS delay | Medium | Medium | Provide exact DNS instructions; GitHub Pages URL remains fallback for verification |
| Case details expose sensitive data | Medium | High | Sanitize all case Markdown before commit |
| Lighthouse 90+ conflicts with design | Low-Medium | Medium | Avoid heavy images, animations, and unnecessary JS |
| Public links break | Medium | Medium | Link validation blocks release |

### 13.3 Open Questions

- [ ] User must add hero photo later, or approve placeholder for MVP.
- [ ] User must provide sanitized details for web cluster case before it can become a strong project card.
- [ ] User must provide sanitized details for `proverka-cheka.ru` internals before expanding beyond short card.
- [ ] User must configure DNS records for `nikchester.ru` manually.
- [ ] CV content must be finalized and generated in RU and EN before release.

---

## 14. Appendix

### 14.1 Glossary

| Term | Definition |
|------|------------|
| MVP | First production-ready version with only required portfolio functionality |
| Proof | Metrics, links, case summaries, and CV that support professional claims |
| Sanitized case | Project description with sensitive infrastructure details removed |
| GitHub Pages | Free static hosting provided by GitHub |
| GA | Google Analytics |
| SRE | Site Reliability Engineering |

### 14.2 References

- `AGENTS.md`
- `DESIGN_REFERENCE.md`
- `my-cv/hh-1-devops-инженер.md`
- `my-cv/hh-6-sre-инженер.md`
- `my-cv/linkedin-system-administrator.md`
- `my-cv/market-analysis-devops-sre-rf.md`
- GitHub profile: `https://github.com/Chest3rf1eld`
- Target Pages repository: `Chest3rf1eld.github.io`
- Custom domain: `nikchester.ru`
- Monitoring repository: `https://github.com/Chest3rf1eld/grafana-prometheus-loki-ansible`
- HestiaCP scripts repository: `https://github.com/Chest3rf1eld/HestiaCP_scripts`
- Linux troubleshooting repository: `https://github.com/Chest3rf1eld/pi-linux-troubleshooting`
- i3 dotfiles repository: `https://github.com/Chest3rf1eld/my-i3-dotfiles`
- Primary CTA: `https://t.me/Chesterf1ld`
- LinkedIn: `https://www.linkedin.com/in/nikita-chaturov-8625a5281/`

### 14.3 Change Log

| Date | Author | Change |
|------|--------|--------|
| 2026-09-15 | OpenCode | Initial MVP specification from interview |
