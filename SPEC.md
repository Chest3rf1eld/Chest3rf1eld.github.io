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
| Supporting | Portfolio Delivery Pipeline | `https://github.com/Chest3rf1eld/Chest3rf1eld.github.io` | Delivery/CI proof for this portfolio | Static bilingual portfolio with Markdown content, generated CV PDFs, production config validation, link checks, Playwright, Lighthouse, GitHub Actions, GitHub Pages, and custom domain deployment |
| Supporting | Freelance Email-to-Telegram Monitor | `https://github.com/Chest3rf1eld/kwork-jobs-parser` | Lightweight automation proof | Google Apps Script workflow that parses labeled Kwork emails in Gmail, filters by budget and keywords, sends Telegram digests, marks processed messages, and handles Telegram rate-limit retries |
| Supporting | Linux Troubleshooting Runbook | `https://github.com/Chest3rf1eld/pi-linux-troubleshooting` | Reliability/troubleshooting/process proof | Safety-first Linux incident triage workflow for load, memory, disk, network, DNS, systemd, SSH, and post-incident notes |
| Supporting | Linux Desktop / Dotfiles | `https://github.com/Chest3rf1eld/my-i3-dotfiles` | Personal Linux/open-source signal | i3/X11 desktop environment managed with GNU Stow, shell scripts, tmux, rofi, polybar, and user systemd services |

Do not include these repositories in the primary MVP Work section unless they are improved first:
- `https://github.com/Chest3rf1eld/k8s-study-project` - currently a study project; may be mentioned as Kubernetes lab/study level, not production proof.
- `https://github.com/Chest3rf1eld/backup_yandex_objective_storage` - useful but better folded into the HestiaCP/backups automation story.
- `https://github.com/Chest3rf1eld/nikchester.ansible-role.hestiacp` - fork; only show later if improvements are documented clearly.
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

For `Portfolio Delivery Pipeline`, the Work card must stay supporting, not primary. It proves delivery discipline and CI/CD quality gates, but must not displace stronger infrastructure proof projects.

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
- Freelance availability block after Work for scoped ops tasks, with Kwork and Telegram CTAs.
- More project links and diagrams.
- GitHub issues for iterative improvements.
- Optional privacy-friendly analytics replacement if needed.
- Better accessibility pass.
- Optional blog only if it supports hiring or proof.

### 3.4.1 Planned Feature: Freelance Availability Block

Goal: add a secondary, hiring-safe block that signals the owner is available for scoped freelance ops work without turning the portfolio into a sales page.

Positioning decisions:
- Hiring remains the primary site purpose. The freelance block must not overtake the hero, proof, or selected work.
- The block appears after Work and before the later supporting sections.
- The block is included in hero navigation as `Freelance` / `Фриланс`, but the first screen must remain compact.
- The block title should be `Available for ops work` in English and a concise Russian equivalent such as `Доступен для ops-задач`.
- Tone is client-friendly: understandable to non-technical freelance clients while still credible to technical leads.

Content requirements:
- Explain in 1 short paragraph that the owner takes scoped ops/infrastructure tasks as freelance work.
- Present the work as problem-solving, not as generic outsourcing.
- Cover these safe service categories: Linux troubleshooting, monitoring setup, automation scripts, and web infrastructure operations.
- Use an incident-intake style UI pattern: symptoms/scope/channel/next step, adapted to the existing Hybrid Ops Desk visual language.
- Do not publish prices, SLA promises, 24/7 support claims, emergency rescue claims, private client details, private infrastructure details, or fixed availability guarantees.

CTA requirements:
- Include two visually equal CTAs: `Contact via Kwork` and Telegram.
- Kwork URL is `https://kwork.ru/user/nikchester`.
- Telegram URL remains `https://t.me/Chesterf1ld`.
- Kwork click-through is the primary success signal, even though Telegram remains an equal visible option.

Technical requirements:
- Source EN/RU copy from Markdown files, not hardcoded React copy.
- Extend the build-time content pipeline with a `freelance` section.
- Add Playwright coverage for the new section anchor, Kwork CTA, Telegram CTA, and bilingual visible copy.
- Link validation must include the Kwork URL, accepting known marketplace bot/protection behavior as a warning rather than a false broken-link failure.

### 3.4.2 Planned Feature: Terminal Identity Hero And Desktop Side Navigation

Goal: make the first screen more memorable as an engineer-native terminal identity without sacrificing contact clarity.

Hero decisions:
- Use a command-shell profile diagnostic metaphor.
- The hero should start with command/output language such as `./whoami`, `cat role.txt`, or `./healthcheck --contact`.
- Name, role, short value statement, and real CTA buttons must remain visible in the first screen on normal desktop widths.
- Remove the phrase `Linux production infrastructure` from the hero copy specifically; the hero may still communicate infrastructure ownership through clearer wording such as administration, automation, monitoring, incidents, or infrastructure design.
- Do not make the terminal interface purely decorative. Command-like items should support understanding or map to real navigation/contact actions.
- Avoid a fake boot sequence, fake loading delays, sound, draggable windows, modal terminal traps, or anything that slows reading.

Desktop navigation decisions:
- Replace or supplement the compact hero navigation with a fixed left navigation rail on desktop only.
- On mobile and narrow tablet widths, use the existing compact/wrapped navigation pattern rather than a left rail.
- Desktop rail links must be real anchors to page sections.
- Active-section highlighting should be implemented with `IntersectionObserver` where available.
- If `IntersectionObserver` is unavailable or not initialized, links remain fixed and usable without active highlighting.
- The side navigation must not cover content, create horizontal scrolling, or reduce the hero CTA visibility.

### 3.4.3 Planned Feature: Personal Links In Contact

Goal: add personal creative links without diluting the hiring-first portfolio flow.

Decisions:
- Do not create a separate Hobbies section.
- Add Unsplash and YouTube as a separate `Personal` / `Личное` row inside Contact, below professional contact channels.
- Professional contact links remain primary: Telegram, email, GitHub, LinkedIn, Kwork.
- Personal links use these URLs:
  - `https://unsplash.com/@nikchester`
  - `https://www.youtube.com/@Chesterf1eld`
- Personal links should be visually quieter than primary contact channels.

### 3.4.4 Planned Feature: Russian Typography Guardrails

Goal: reduce hanging short Russian prepositions/conjunctions without manually editing every content line.

Decisions:
- Implement a build-time transform for Russian Markdown content only: `content/ru/**/*.md` after Markdown parsing or during HTML generation.
- Do not transform TypeScript labels, URLs, HTML attributes, code spans, fenced code, or non-Russian content.
- Apply non-breaking spaces after short Russian prepositions/conjunctions: `в`, `и`, `с`, `к`, `у`, `о`, `а`, `но`, `на`, `по`, `за`, `из`, `от`, `до`, `для`.
- The transform must preserve generated HTML validity and link behavior.
- Add tests or e2e assertions sufficient to catch obvious regressions in Russian rendering.

### 3.4.5 Planned Feature: ANSI Portrait Interaction

Goal: add a memorable terminal-native interaction to the hero photo without hurting performance or accessibility.

Decisions:
- Use a static ASCII/ANSI portrait asset rather than runtime canvas generation.
- On desktop, hovering or focusing the photo area reveals the ASCII/ANSI version.
- On touch/mobile, tapping or focusing the photo area toggles the ASCII/ANSI version.
- The ASCII/ANSI layer is decorative and must be hidden from screen readers; the original photo remains the meaningful image with alt text.
- The interaction must not shift layout, block CTA visibility, or reduce Lighthouse scores below target.
- If the ASCII asset is missing, fall back to the normal photo without broken UI.

### 3.4.6 Planned Feature: Sanitized Production Case Pages

Goal: turn the two blocked production proof items into public, sanitized Work cards with static EN/RU case pages.

Scope for nearest implementation:
- Implement both cases in the same release.
- Add Work cards and static case pages for both `#4` web infrastructure case and `#5` `proverka-cheka.ru` abuse mitigation case.
- Definition of done: Work cards, EN/RU case pages, case links, automated safety checks, e2e coverage, production build, link validation, and Lighthouse pass.

Routing decisions:
- Use language-prefixed static routes generated at build time.
- Use short slugs:
  - `/en/cases/web-cluster`
  - `/ru/cases/web-cluster`
  - `/en/cases/proverka-cheka`
  - `/ru/cases/proverka-cheka`
- Case page source of truth is Markdown: `content/{en,ru}/cases/*.md` with frontmatter.
- Generate static HTML files for direct links and SEO rather than relying on SPA fallback.

Case page content shape:
- Each case page uses a `Diagram + brief` format.
- The diagram is a sanitized text/TUI-style diagram rendered with HTML/CSS, not Mermaid/canvas/runtime generation.
- The brief includes short sections: context, constraints, architecture summary, actions, results, stack, and safety note.
- Keep pages concise and proof-oriented; avoid blog-style long-form writing.

Work section decisions:
- After adding both cases, promote the strongest incident/security proof first.
- Top Work priority should favor incident and production resilience signals.
- The `#4` web-cluster card can include two CTAs: GitHub repository and case details.
- The `#5` `proverka-cheka.ru` card links only to the case page, not to code.

`#4` Web infrastructure / web cluster public scope:
- Primary proof angle: architecture resilience and automation depth.
- Publicly safe components: Nginx/HAProxy, HestiaCP, WordPress/PHP-FPM, MySQL/MariaDB, DNS, backups/Object Storage, Bash/Ansible/WP-CLI where applicable.
- Publicly safe results: faster and more predictable routine operations, reduced manual risk, recovery/redeploy workflows measured in hours instead of days, easier scaling of new sites/domains/backups through a standard process.
- Do not publish private topology, exact provider setup, IPs, hostnames, customer names, private diagrams, credentials, allowlists, or operational logs.

`#5` `proverka-cheka.ru` public scope:
- The domain `proverka-cheka.ru` may be named publicly.
- Primary proof angle: incident mitigation, defense-in-depth, and improved diagnostics clarity.
- Publicly safe content: high-level architecture/components, incident symptoms, general mitigation layers, safe stack names, and result claims.
- Publicly safe results: abuse stopped or was strongly reduced, external API limit usage was controlled, manual blocking decreased, diagnostics became clearer.
- Do not publish IPs, providers, topology, firewall rules, nftables expressions, thresholds, regexes, fail2ban jail internals, allowlists, hostile subnet labels, logs, private service details, or exact defensive configuration.

Automated safety checks:
- Add build-time checks for case Markdown before publishing.
- Fail build on forbidden patterns such as public/private IP-like literals, exact CIDR examples where not explicitly allowed, obvious token/secret formats, internal hostnames, non-allowlisted emails, and private domains.
- Maintain a forbidden-terms list for sensitive internal/provider/service names, exact firewall chains/jails/rules, hostile subnet labels, and other project-specific terms.
- Maintain a case allowlist for public links/domains and safe stack terms.
- Automated checks reduce risk but do not permit publishing private details if a check misses them.

### 3.5 Future Considerations

- Add Kubernetes/Terraform/SRE lab project once real proof exists.
- Add web cluster case when architecture details are provided and sanitized.
- Add Open Graph preview image matching the current dark terminal / engineer-native aesthetic.

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
- caseUrl?
- visible

CasePage
- slug
- language
- title
- summary
- context
- constraints
- textDiagram
- architectureSummary
- actions[]
- results[]
- stack[]
- safetyNote
- relatedWorkSlug

FreelanceSection
- language
- title
- summary
- workTypes[]
- intakeLabels[]
- kworkUrl
- telegramUrl
- boundaries[] (implementation guardrails, not necessarily shown verbatim in UI)

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
| Case pages | Markdown to static HTML | Direct links, SEO, and public-safe production proof |
| Testing | ESLint, Playwright, Lighthouse | Required quality gates |
| Deployment | GitHub Actions + GitHub Pages | Free hosting and automated deploy |
| Analytics | Google Analytics | User-selected analytics tool |

### 4.6 Known Technical Tradeoffs

- Vite React is heavier than plain HTML/CSS, but gives better component structure and future flexibility.
- Markdown at build time adds tooling, but keeps content maintainable.
- Static generated case pages add build complexity, but provide direct SEO-friendly URLs and keep public proof separate from the main one-page flow.
- GA via GitHub Secret improves config control, but can block deploy if the secret is missing.
- Minimal accessibility is accepted for MVP, but must not break keyboard navigation or readability.

---

## 5. UI/UX Design

### 5.1 Key Screens/Views

The MVP is a single page with these sections:

1. **Hero**: name, `Infrastructure Engineer`, concise Linux production ownership statement, primary Telegram CTA, secondary links.
2. **Proof**: short metrics: `15 servers`, `170+ sites`, `4 providers`, `Proxmox`, `recovery hours not days`.
3. **Work**: selected sanitized work cards.
4. **Freelance**: secondary availability block for scoped ops work, with Kwork and Telegram CTAs.
5. **Stack**: grouped technologies and confidence level by real experience.
6. **CV**: RU and EN PDF download buttons.
7. **Contact**: Telegram, email, GitHub, LinkedIn, Kwork.

### 5.2 Navigation Flow

- Main navigation is minimal and can use a retro menu/titlebar pattern.
- Add a real `Freelance` / `Фриланс` anchor link once the freelance availability block exists.
- Language switch is visible as EN/RU titlebar-style buttons.
- Primary CTA goes directly to Telegram.
- External profile/project links open normally and must be valid before release.

### 5.3 Visual Direction

Use the reference in `DESIGN_REFERENCE.md`.

Required traits (terminal-primary, decided):
- dark terminal-first background: graphite/black, not teal desktop
- green OK accents, amber warning highlights, restrained blue links
- monospace accents for commands, metrics, and manifests
- thin borders and minimal window chrome
- compact system typography
- sparse status lines, badges, and file metadata instead of decorative controls

Win95/98 traits (teal desktop, grey panels, blue title bars) are secondary chrome only and must not override the terminal palette. Where the older mixed-app mapping below conflicts with the terminal direction, the terminal direction wins.

Do not copy the reference's full visual clutter. The portfolio must remain readable and professional.

Approved redesign direction after MVP review:
- The first screen stays strict and hiring-oriented: name, role, short value statement, primary CTA, and core links must be immediately clear.
- Below the hero, the site may use a mixed classic-system-app metaphor rather than identical generic windows.
- The proof/metrics section should feel like technical output: terminal/status/diagnostics language is appropriate for infrastructure credibility.
- Project cards are the main visual upgrade target and should feel like distinct project windows, files, or system panels rather than plain cards.
- Supporting sections can borrow from classic system apps: Control Panel/System Properties for stack, Notepad/PDF dialog for CV, and system dialog/address-book patterns for contact.
- Interaction level should be light: tabs, active/focused window states, hover/focus affordances, toolbar-like language buttons, and status bars are allowed.
- Do not add draggable windows, fake OS boot flows, modal traps, sound effects, or interactions that slow down reading.
- Visual density should stay sparse: each section gets a few strong retro details, not a dense desktop simulation.
- No dead controls: any UI element that looks like a button, menu item, tab, toolbar action, or selectable file must perform a real action such as navigating to a section, switching language, opening a repository/profile link, or downloading a file.
- Purely decorative chrome is allowed only when it clearly reads as non-interactive framing, not as a clickable control.

Recommended section mapping (terminal/session style, supersedes the older app-window mapping):
- Hero: command-shell profile diagnostic presentation (`./whoami` / role/status output), but name, role, value statement, and primary CTAs stay visible in the first screen.
- Hero photo: may include a static ANSI portrait hover/focus/tap interaction as decorative terminal-native detail.
- Proof: log-style health events with `[OK]`/status patterns.
- Work: readable YAML/service manifests with `problem`, `action`, `result`, and `stack` keys. Do not show duplicated `repo` fields or repeated `status: ok` metadata if the same meaning is already conveyed by card status and CTA buttons.
- Freelance: incident-intake style panel that communicates scoped ops help without emergency/SLA promises.
- Stack: capability manifest / config-style block.
- CV: file-listing style download block with EN/RU PDFs.
- Contact: escalation-channel style endpoint list with Telegram as primary action and a separate quieter personal-links row for Unsplash/YouTube.

Log prefix location:
- `[OK]`/status prefixes live in the UI render layer, not in Markdown content, so content files stay clean and bilingual.

Engineer-native language guardrail (decided):
- Labels, statuses, and section chrome may use engineer-native CLI/log language.
- Headings, value statements, and CTAs must stay human-readable so recruiters and non-technical visitors understand the page without terminal knowledge.
- Primary CTA (Telegram) must remain obvious regardless of terminal styling.

Control rules:
- Main menu items should be real anchor links to page sections.
- Toolbar-like items should be real links or removed.
- Project cards should emphasize metadata and proof rather than fake window buttons.
- Avoid close/minimize/maximize icons unless they perform real actions; prefer status text, badges, or file metadata instead.

Primary tradeoff:
- Optimize for memorability in the lower sections while preserving recruiter/technical-lead trust on the first screen.
- If design work must be cut, prioritize stronger Work/project-window treatment before decorative app details elsewhere.

Updated terminal/infrastructure direction:
- The preferred visual language is `Hybrid Ops Desk`: terminal session, infrastructure diagnostics, service records, and runbook/status patterns.
- The hero uses a full shell-session presentation, but primary CTAs must remain obvious and real.
- The hero must not use `Linux production infrastructure` as the visible value phrase; use clearer short wording around infrastructure administration, automation, monitoring, incidents, or design.
- Command-like controls must be real anchors or real outbound/download links.
- Proof metrics read like log output or health events, using concise `[OK]`/status patterns (no dynamic timestamps, to keep builds deterministic and tests stable).
- Work cards should move toward readable YAML/service manifests with clear keys such as `problem`, `action`, `result`, `stack`, `repo`, and `status`.
- Work cards must avoid redundant labels: remove `repo` when an `Open project` button already provides the repository action, and remove `status: ok` when it does not add meaningful proof.
- Palette should be dark terminal first: graphite/black background, green OK accents, amber warning highlights, and restrained blue links. Avoid cyberpunk neon density.
- Mobile must wrap cleanly with no horizontal scrolling; code/manifest styling should adapt to readable blocks instead of forcing side-scroll.
- First terminal pass should prioritize Hero, Proof, and Work; Stack, CV, and Contact can be lightly adapted until a later pass.

Desktop side navigation direction:
- On desktop, use a fixed left navigation rail with real anchors and active-section highlighting.
- On mobile, do not force a left rail; keep navigation compact and readable.
- Active highlighting gracefully degrades to plain links when browser support or JS timing prevents section tracking.

### 5.4 Empty States

- Missing hero photo: show a retro placeholder/system dialog style area, not a broken image.
- Missing project details: hide unavailable details rather than using `TBD` or `coming soon`.
- Missing project links: hide link buttons until real URLs exist.
- Missing CV PDFs: block release; CV is P0.
- Personal links unavailable: keep professional contact links; hide or fix the failed personal link before release.

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
| Kwork | Freelance profile and scoped task intake | External URL | Kwork / Owner |
| Unsplash | Personal photography profile | External URL | Unsplash / Owner |
| YouTube | Personal music/covers profile | External URL | YouTube / Owner |

### 6.2 Data Flows

```text
Markdown content -> Vite build -> static site -> GitHub Pages
CV Markdown -> PDF generation -> public downloadable PDF assets
Visitor browser -> GA script -> Google Analytics
Visitor click -> Telegram/GitHub/LinkedIn/Kwork/email/project links
Visitor click -> Unsplash/YouTube personal links
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
| Kwork | Marketplace blocks CI/browser bot checks | Treat known protection as link-validation warning; UI link remains usable |
| Unsplash/YouTube | External profile unavailable or protected | Treat as normal public links; if validation fails persistently, fix or hide before release |

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
| Fixed desktop side nav is unsupported or JS fails | Anchor links remain usable; active-section highlighting is simply absent |
| Browser has JS disabled | Critical content should degrade as much as possible; site is primarily static but React JS is expected |
| GA blocked by adblock | No visible error; site remains usable |
| Hero photo not added yet | Placeholder/fallback shown |
| Only one public GitHub project is available | Work section remains compact and honest |
| Project code cannot be shown | Show sanitized case card without code link |
| Freelance client wants emergency/24/7 support | UI must not imply SLA or emergency availability; Kwork/Telegram conversation defines scope |
| Very small mobile viewport | Window panels stack vertically; no content overflow |
| Russian typography transform encounters code/link content | Code, URLs, and attributes are preserved; only visible Russian prose is transformed |
| ANSI portrait asset missing | Normal hero photo remains visible; no broken image or layout shift |

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
| Kwork URL | Public | HTTPS in transit | Until removed from site |
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
- Case page Markdown must pass automated safety checks before build/deploy.

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

Additional case-page safety rules:
- Case pages may name `proverka-cheka.ru`, but must not expose exact defensive configuration.
- Do not publish nftables expressions, firewall chain names, fail2ban jail internals, thresholds, regexes, hostile subnet labels, or operational logs.
- Do not publish exact topology, provider mapping, private diagrams, customer data, private hostnames, IPs, or allowlists.
- Case page build checks must include forbidden patterns, forbidden terms, and public allowlists.

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
| Typography transform | Russian Markdown rendering | Build/e2e assertion | Short Russian prepositions/conjunctions receive non-breaking spacing without corrupting links/code |
| Case safety | Case Markdown and generated pages | Build-time safety checker | Forbidden patterns/terms fail build; public links/domains must be allowlisted |
| Case routes | Static EN/RU case pages | Playwright | `/en/cases/web-cluster`, `/ru/cases/web-cluster`, `/en/cases/proverka-cheka`, `/ru/cases/proverka-cheka` load directly |

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
- Kwork links work or are handled as known protected-host warnings in automated link validation
- Unsplash and YouTube personal links are present in Contact only if valid
- Case cards link to their static case pages; direct case URLs load without SPA fallback failure
- Case pages contain no forbidden sensitive patterns or terms
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
