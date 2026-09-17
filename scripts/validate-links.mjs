import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const files = [path.join(root, 'src', 'generated', 'content.ts'), path.join(root, 'src', 'siteConfig.ts')];
const urls = new Set();

for (const file of files) {
  const text = await readFile(file, 'utf8');
  for (const match of text.matchAll(/https?:\/\/[^\s"'`<>]+/g)) {
    urls.add(match[0].replace(/[),.]+$/, ''));
  }
  for (const match of text.matchAll(/mailto:[^\s"'`<>]+/g)) {
    urls.add(match[0].replace(/[),.]+$/, ''));
  }
}

const failures = [];
const warnings = [];

for (const cvPath of ['public/assets/cv/nikita-chaturov-cv.en.pdf', 'public/assets/cv/nikita-chaturov-cv.ru.pdf']) {
  try {
    await access(path.join(root, cvPath));
  } catch {
    failures.push(`${cvPath} -> missing`);
  }
}

for (const url of urls) {
  if (url.startsWith('mailto:')) continue;
  if (url === 'https://nikchester.ru') continue;
  const protectedHost = /https:\/\/(t\.me|www\.linkedin\.com|kwork\.ru|www\.reddit\.com)\//.test(url);

  try {
    let response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    if (response.status === 405 || response.status === 403) {
      response = await fetch(url, { method: 'GET', redirect: 'follow' });
    }
    if (!response.ok && protectedHost) {
      warnings.push(`${url} -> network/protection warning (${response.status})`);
    } else if (!response.ok) {
      failures.push(`${url} -> ${response.status}`);
    }
  } catch (error) {
    if (protectedHost) {
      warnings.push(`${url} -> network/protection warning (${error.message})`);
    } else {
      failures.push(`${url} -> ${error.message}`);
    }
  }
}

if (failures.length > 0) {
  throw new Error(`Broken public links:\n${failures.join('\n')}`);
}

if (warnings.length > 0) {
  console.warn(`Link validation warnings:\n${warnings.join('\n')}`);
}

console.log(`Validated ${urls.size} public links.`);
