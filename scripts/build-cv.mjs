import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { chromium } from 'playwright';

const root = process.cwd();
const cvDir = path.join(root, 'content', 'cv');
const outDir = path.join(root, 'public', 'assets', 'cv');
const files = [
  { lang: 'en', source: 'nikita-chaturov-cv.en.md', output: 'nikita-chaturov-cv.en.pdf' },
  { lang: 'ru', source: 'nikita-chaturov-cv.ru.md', output: 'nikita-chaturov-cv.ru.pdf' },
];

marked.setOptions({ gfm: true });

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

try {
  for (const file of files) {
    const raw = await readFile(path.join(cvDir, file.source), 'utf8');
    if (/\+7|905\)|0259047/i.test(raw)) {
      throw new Error(`${file.source} appears to contain a phone number`);
    }

    const parsed = matter(raw);
    const body = marked.parse(parsed.content);
    const html = `<!doctype html>
<html lang="${file.lang}">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(parsed.data.name)} - ${escapeHtml(parsed.data.title)}</title>
  <style>
    @page { size: A4; margin: 15mm; }
    body { color: #111; font-family: Arial, sans-serif; font-size: 11px; line-height: 1.45; }
    h1, h2, h3 { margin: 0 0 6px; line-height: 1.2; }
    h1 { font-size: 24px; }
    h2 { border-bottom: 1px solid #999; font-size: 15px; margin-top: 16px; padding-bottom: 3px; }
    h3 { font-size: 12px; margin-top: 10px; }
    p { margin: 0 0 7px; }
    ul { margin: 4px 0 8px 18px; padding: 0; }
    li { margin: 0 0 3px; }
    .meta { color: #333; display: flex; flex-wrap: wrap; gap: 8px; margin: 6px 0 14px; }
    .meta span::after { content: '·'; margin-left: 8px; }
    .meta span:last-child::after { content: ''; }
  </style>
</head>
<body>
  <h1>${escapeHtml(parsed.data.name)}</h1>
  <p><strong>${escapeHtml(parsed.data.title)}</strong></p>
  <div class="meta">
    <span>${escapeHtml(parsed.data.location)}</span>
    <span>${escapeHtml(parsed.data.email)}</span>
    <span>${escapeHtml(parsed.data.telegram)}</span>
    <span>${escapeHtml(parsed.data.github)}</span>
    <span>${escapeHtml(parsed.data.linkedin)}</span>
  </div>
  ${body}
</body>
</html>`;

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.pdf({ path: path.join(outDir, file.output), format: 'A4', printBackground: true });
    await page.close();
  }
} finally {
  await browser.close();
}
