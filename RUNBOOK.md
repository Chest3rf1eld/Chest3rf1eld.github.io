# Portfolio Runbook

Operational notes for running, checking, and deploying the portfolio site.

## Local Development

Install dependencies once:

```bash
npm install
```

Start the dev server:

```bash
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Open:

```text
http://127.0.0.1:5173/
```

The dev server uses the generated content module in `src/generated/content.ts`. If Markdown content was changed and the dev server does not reflect it, rebuild generated content:

```bash
npm run content:build
```

## Stop Local Server

On Windows PowerShell, stop project Vite processes:

```powershell
Get-CimInstance Win32_Process -Filter "name = 'node.exe'" |
  Where-Object { $_.CommandLine -like '*vite*' -and $_.CommandLine -like '*site-portfolio*' } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
```

## Local Quality Checks

Run fast checks:

```bash
npm run lint
npm run typecheck
```

Run a production build locally:

```bash
CI=true NODE_ENV=production VITE_GA_MEASUREMENT_ID=G-XWTKZN2DQL npm run build
```

On Windows PowerShell:

```powershell
$env:CI="true"
$env:NODE_ENV="production"
$env:VITE_GA_MEASUREMENT_ID="G-XWTKZN2DQL"
npm run build
```

Run browser smoke tests:

```bash
npm run test:e2e
```

Run Lighthouse:

```bash
npm run lighthouse
```

Expected targets:

- Playwright: all tests pass.
- Lighthouse: Performance, Accessibility, Best Practices, and SEO are all `>= 90`.
- Link validation: real broken links fail the build; protected hosts may warn.

## Branch Workflow

Use `dev` for development work.

```bash
git switch dev
```

Pushes to `dev` run the same CI checks as `main`, but the deploy job is skipped.

Use `main` only for production deploys.

```bash
git switch main
git merge dev
git push origin main
```

Pushes to `main` run CI and deploy to GitHub Pages.

## Production

Production repository:

```text
https://github.com/Chest3rf1eld/Chest3rf1eld.github.io
```

Production domain:

```text
https://nikchester.ru/
```

GitHub Pages is configured for workflow deployment. The production build requires GitHub Secret:

```text
GA_MEASUREMENT_ID
```

The workflow maps it to:

```text
VITE_GA_MEASUREMENT_ID
```

## HTTPS Check

Check Pages state:

```bash
gh api repos/Chest3rf1eld/Chest3rf1eld.github.io/pages
gh api repos/Chest3rf1eld/Chest3rf1eld.github.io/pages/health
```

When GitHub Pages certificate exists, enforce HTTPS:

```bash
gh api --method PUT repos/Chest3rf1eld/Chest3rf1eld.github.io/pages -f build_type=workflow -f cname=nikchester.ru -F https_enforced=true
```

## Sensitive Files

Do not commit:

- `my-cv/`
- `.env*`
- private screenshots/reference captures
- generated test reports

Generated CV PDFs may change after `npm run build` because `cv:build` runs in `prebuild`. Commit them only when CV content changes intentionally.
