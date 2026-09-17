import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const root = process.cwd();
const langs = ['en', 'ru'];
const outDir = path.join(root, 'src', 'generated');
const publicDir = path.join(root, 'public');

marked.setOptions({ gfm: true, breaks: false });

const ruShortWords = ['в', 'и', 'с', 'к', 'у', 'о', 'а', 'но', 'на', 'по', 'за', 'из', 'от', 'до', 'для'];
const ruShortWordPattern = new RegExp(`(^|[\\s(])(${ruShortWords.join('|')})\\s+`, 'giu');
const safetyForbiddenTerms = [
  'iptables -A',
  'nft add rule',
  'chain input',
  'fail2ban jail',
  'hostile subnet',
  'private key',
  'password',
  'token=',
];
const allowedCaseUrls = new Set([
  'https://github.com/Chest3rf1eld/HestiaCP_scripts',
  'https://nikchester.ru',
]);

function applyRussianTypography(html) {
  const parts = html.split(/(<[^>]+>)/g);
  const stack = [];

  return parts.map((part) => {
    if (!part) return part;
    if (part.startsWith('<')) {
      const close = part.match(/^<\/(pre|code|a)>/i);
      const open = part.match(/^<(pre|code|a)(\s|>)/i);
      if (close) stack.pop();
      else if (open) stack.push(open[1].toLowerCase());
      return part;
    }
    if (stack.length > 0) return part;
    return part.replace(ruShortWordPattern, (_match, prefix, word) => `${prefix}${word}\u00a0`);
  }).join('');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function validateCaseSafety(slug, raw) {
  const failures = [];
  const ipPattern = /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)(?:\/\d{1,2})?\b/g;
  const privateHostnamePattern = /\b(?:[a-z0-9-]+\.)+(?:local|internal|lan|corp|home|private)\b/gi;
  const secretPattern = /\b(?:AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9_]{20,}|xox[baprs]-[A-Za-z0-9-]+)\b/g;
  const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
  const urlPattern = /https?:\/\/[^\s)"'<>]+/g;

  for (const match of raw.matchAll(ipPattern)) failures.push(`IP/CIDR-like value: ${match[0]}`);
  for (const match of raw.matchAll(privateHostnamePattern)) failures.push(`private hostname: ${match[0]}`);
  for (const match of raw.matchAll(secretPattern)) failures.push(`secret-like value: ${match[0]}`);
  for (const match of raw.matchAll(emailPattern)) {
    if (match[0].toLowerCase() !== 'nikchester01@gmail.com') failures.push(`non-allowlisted email: ${match[0]}`);
  }
  for (const term of safetyForbiddenTerms) {
    if (raw.toLowerCase().includes(term.toLowerCase())) failures.push(`forbidden term: ${term}`);
  }
  for (const match of raw.matchAll(urlPattern)) {
    const url = match[0].replace(/[),.]+$/, '');
    if (!allowedCaseUrls.has(url)) failures.push(`non-allowlisted case URL: ${url}`);
  }

  if (failures.length > 0) {
    throw new Error(`Unsafe case content in ${slug}:\n${failures.join('\n')}`);
  }
}

async function readMarkdown(filePath) {
  const raw = await readFile(filePath, 'utf8');
  const parsed = matter(raw);
  const lang = filePath.includes(`${path.sep}ru${path.sep}`) ? 'ru' : 'en';
  const html = marked.parse(parsed.content).trim();
  return {
    meta: parsed.data,
    html: lang === 'ru' ? applyRussianTypography(html) : html,
    text: parsed.content.trim(),
    raw,
  };
}

async function readWork(lang) {
  const workDir = path.join(root, 'content', lang, 'work');
  const files = (await readdir(workDir)).filter((file) => file.endsWith('.md')).sort();
  const priority = { primary: 0, supporting: 1 };
  const items = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, '');
      const item = await readMarkdown(path.join(workDir, file));
      return {
        slug,
        title: String(item.meta.title ?? slug),
        priority: String(item.meta.priority ?? 'supporting'),
        order: Number(item.meta.order ?? 50),
        url: String(item.meta.url ?? ''),
        caseUrl: item.meta.caseUrl ? String(item.meta.caseUrl) : '',
        redditUrl: item.meta.redditUrl ? String(item.meta.redditUrl) : '',
        stack: String(item.meta.stack ?? ''),
        html: item.html,
      };
    }),
  );

  return items.sort((a, b) => {
    const priorityDelta = (priority[a.priority] ?? 9) - (priority[b.priority] ?? 9);
    return priorityDelta || a.order - b.order || a.title.localeCompare(b.title);
  });
}

async function readCases(lang) {
  const casesDir = path.join(root, 'content', lang, 'cases');
  const files = (await readdir(casesDir)).filter((file) => file.endsWith('.md')).sort();
  const cases = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, '');
      const filePath = path.join(casesDir, file);
      const item = await readMarkdown(filePath);
      validateCaseSafety(`${lang}/${slug}`, item.raw);
      return {
        slug,
        title: String(item.meta.title ?? slug),
        summary: String(item.meta.summary ?? ''),
        relatedWorkSlug: String(item.meta.relatedWorkSlug ?? ''),
        stack: String(item.meta.stack ?? ''),
        html: item.html,
      };
    }),
  );

  return cases;
}

function renderCasePage(lang, caseItem) {
  const backLabel = lang === 'ru' ? 'Назад к портфолио' : 'Back to portfolio';
  const langLabel = lang.toUpperCase();
  const title = escapeHtml(caseItem.title);
  const summary = escapeHtml(caseItem.summary);
  const stack = escapeHtml(caseItem.stack);

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${summary}" />
    <meta name="theme-color" content="#050807" />
    <link rel="canonical" href="https://nikchester.ru/${lang}/cases/${caseItem.slug}/" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${summary}" />
    <meta property="og:url" content="https://nikchester.ru/${lang}/cases/${caseItem.slug}/" />
    <meta property="og:image" content="https://nikchester.ru/og-image.svg" />
    <title>${title} - Nikita Chaturov</title>
    <style>
      :root { color: #e6edf3; background: #0b0e13; font-family: Inter, Segoe UI, Arial, sans-serif; --terminal: #05070b; --panel: #131720; --line: #2a3342; --green: #4ade80; --amber: #e3b341; --muted: #9aa4b2; --mono: "JetBrains Mono", Consolas, monospace; }
      * { box-sizing: border-box; }
      body { margin: 0; min-width: 320px; background: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px), #0b0e13; background-size: 32px 32px; }
      main { width: min(920px, calc(100% - 28px)); margin: 0 auto; padding: 28px 0 40px; }
      article { background: var(--panel); border: 1px solid var(--line); box-shadow: 3px 3px 0 #000; }
      header { border-bottom: 1px solid var(--line); padding: clamp(18px, 4vw, 34px); }
      .prompt, pre, code { font-family: var(--mono); }
      .prompt { color: var(--green); font-size: .85rem; margin-bottom: 14px; }
      h1 { font-size: clamp(2rem, 6vw, 4rem); line-height: .95; letter-spacing: -.06em; margin: 0 0 12px; }
      .summary { color: var(--muted); font-size: 1.05rem; max-width: 70ch; }
      .stack { color: var(--amber); font-family: var(--mono); font-size: .82rem; margin-top: 18px; overflow-wrap: anywhere; }
      .body { padding: clamp(18px, 4vw, 34px); }
      h2 { color: var(--green); font-family: var(--mono); font-size: 1rem; margin-top: 28px; }
      p, li { line-height: 1.55; }
      pre { background: var(--terminal); border: 1px solid var(--line); color: var(--green); overflow-x: auto; padding: 16px; }
      a { color: #6ea8fe; font-weight: 700; }
      .back { display: inline-flex; margin-bottom: 12px; text-decoration: none; }
      .badge { color: var(--amber); font-family: var(--mono); font-size: .78rem; }
    </style>
  </head>
  <body>
    <main>
      <a class="back" href="/#work">&lt; ${escapeHtml(backLabel)}</a>
      <article>
        <header>
          <div class="prompt">${langLabel} case :: ${escapeHtml(caseItem.slug)}</div>
          <h1>${title}</h1>
          <p class="summary">${summary}</p>
          <div class="stack">stack: ${stack}</div>
        </header>
        <div class="body">${caseItem.html}</div>
      </article>
    </main>
  </body>
</html>`;
}

async function writeCasePages(lang, cases) {
  await Promise.all(cases.map(async (caseItem) => {
    const caseDir = path.join(publicDir, lang, 'cases', caseItem.slug);
    await mkdir(caseDir, { recursive: true });
    await writeFile(path.join(caseDir, 'index.html'), renderCasePage(lang, caseItem), 'utf8');
  }));
}

const content = {};

for (const lang of langs) {
  const hero = await readMarkdown(path.join(root, 'content', lang, 'hero.md'));
  const proof = await readMarkdown(path.join(root, 'content', lang, 'proof.md'));
  const freelance = await readMarkdown(path.join(root, 'content', lang, 'freelance.md'));
  const stack = await readMarkdown(path.join(root, 'content', lang, 'stack.md'));
  const contact = await readMarkdown(path.join(root, 'content', lang, 'contact.md'));
  const work = await readWork(lang);
  const cases = await readCases(lang);
  await writeCasePages(lang, cases);

  content[lang] = {
    hero: { ...hero.meta, html: hero.html },
    proof: { ...proof.meta, html: proof.html },
    freelance: { ...freelance.meta, html: freelance.html },
    stack: { ...stack.meta, html: stack.html },
    contact: { ...contact.meta, html: contact.html },
    work,
    cases,
  };
}

const moduleText = `// Generated by scripts/build-content.mjs. Do not edit manually.\n\nexport const siteContent = ${JSON.stringify(content, null, 2)} as const;\n`;

await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, 'content.ts'), moduleText, 'utf8');
