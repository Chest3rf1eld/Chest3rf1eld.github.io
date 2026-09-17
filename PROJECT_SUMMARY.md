# Portfolio Site Summary

## GitHub Repository
https://github.com/Chest3rf1eld/Chest3rf1eld.github.io

## Hosting
- GitHub Pages with custom domain `nikchester.ru`
- Deployed via GitHub Actions workflow (build_type: `workflow`)
- Most recent deployment: Actions run `35019893713`

## Technical Stack
- **Framework**: React + Vite
- **Styling**: CSS with custom properties (terminal-primary palette)
- **Component model**: Custom `Window`/`Hero`/`WorkGrid`/`CvPanel`/`ContactPanel` components in `src/App.tsx`
- **Build**: `vite build` → `dist/` folder served by GitHub Pages

## Visual Direction
- **Terminal engineer-native aesthetic** (replaced initial Windows 95/98 concept)
- Dark background (graphite/black), green `[OK]` accents, amber warnings
- System-like window chrome, thin borders, bevel effects
- Compact system typography, restrained decorative elements
- Only Hero window retains full menu-bar with section anchors and shell commands
- Proof/Stack/Work windows: no toolbars, clean content-only panels

## Key Decisions
1. **No-dead-controls rule**: Engineer-native language allowed in labels/statuses, but headings/CTAs must stay human-readable for recruiters/non-technical visitors
2. **Toolbar removal**: Navigation buttons only in Hero window; Proof, Stack, and Work windows have no toolbars (per user directive "Кнопки навигации должны быть только в первом блоке (окне), остальные убери")
3. **Lighthouse**: `100 / 98 / 100 / 100` all categories
4. **Playwright**: 18 tests passed across Chromium/Firefox/WebKit at widths 360/768/1366/1920
5. **Hero photo**: `public/assets/hero-photo.jpg` (86KB) with bilingual alt text (EN/RU)

## Content
- **Profile**: Name, role, photo, bilingual summary
- **Proof**: Log-style health events with `[OK]` prefixes
- **Work**: YAML/service manifests (`problem/action/result/stack/repo/status`)
- **Stack**: System properties (`cat stack.md`)
- **CV**: Two public PDFs (EN/RU via `/assets/cv/`), no phone number
- **Contact**: Telegram (primary CTA), GitHub, LinkedIn, email

## DNS
- Custom domain `nikchester.ru` - A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (pending user confirmation of propagation)

## Remaining Tasks
- DNS propagation confirmation for `nikchester.ru` (issue #2)
- CV content review/approval (issue #3)
- Sanitized web cluster case details (issue #4)
- Sanitized proverka-cheka.ru case details (issue #5)
- Licenses for public proof repositories (issue #6)