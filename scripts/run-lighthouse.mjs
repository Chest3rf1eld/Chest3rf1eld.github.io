import { mkdir, readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import net from 'node:net';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const outputDir = path.join(root, '.lighthouseci');
const reportJson = path.join(outputDir, 'report.json');
const host = '127.0.0.1';

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', reject);
    server.listen(0, host, () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        reject(new Error('Could not allocate a free port.'));
        return;
      }
      const { port } = address;
      server.close(() => resolve(port));
    });
  });
}

function commandName(name) {
  return process.platform === 'win32' ? `${name}.cmd` : name;
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(commandName(command), args, {
      cwd: root,
      stdio: 'inherit',
      shell: process.platform === 'win32',
      ...options,
    });
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(' ')} exited with ${code}`));
    });
  });
}

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Retry until Vite preview is ready.
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error('Preview server did not become ready in time.');
}

async function runLighthouse(url, output, outputPath, port) {
  await run('npx', [
    'lighthouse',
    url,
    '--quiet',
    `--port=${port}`,
    '--preset=desktop',
    '--only-categories=performance,accessibility,best-practices,seo',
    `--output=${output}`,
    `--output-path=${outputPath}`,
  ]);
}

function stopProcessTree(child) {
  if (!child.pid) return;

  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    return;
  }

  child.kill('SIGTERM');
}

await mkdir(outputDir, { recursive: true });

const port = await getFreePort();
const chromeDebugPort = await getFreePort();
const url = `http://${host}:${port}`;
const chromeProfile = path.join(outputDir, `chrome-profile-${chromeDebugPort}`);

const server = spawn(`npm run preview -- --host ${host} --port ${port} --strictPort`, {
  cwd: root,
  stdio: 'inherit',
  shell: true,
});

const chrome = spawn(chromium.executablePath(), [
  '--headless=new',
  '--no-sandbox',
  '--disable-dev-shm-usage',
  `--remote-debugging-port=${chromeDebugPort}`,
  `--user-data-dir=${chromeProfile}`,
  'about:blank',
], { stdio: 'ignore' });

try {
  await waitForServer(url);
  await runLighthouse(url, 'json', reportJson, chromeDebugPort);

  const report = JSON.parse(await readFile(reportJson, 'utf8'));
  const scores = Object.fromEntries(
    Object.entries(report.categories).map(([key, value]) => [key, Math.round(value.score * 100)]),
  );
  const failed = Object.entries(scores).filter(([, score]) => score < 90);

  console.log('Lighthouse scores:', scores);

  if (failed.length > 0) {
    throw new Error(`Lighthouse scores below 90: ${failed.map(([key, score]) => `${key}=${score}`).join(', ')}`);
  }
} finally {
  stopProcessTree(server);
  stopProcessTree(chrome);
}
