/* Local image-body measurement, not a field or Lighthouse benchmark.
   Start a local server, then: node tools/measure_portfolio.cjs label [page1,page2]
   Optional: PORTFOLIO_BASE_URL, PORTFOLIO_PLAYWRIGHT_PATH, PORTFOLIO_BROWSER_PATH.
   Each run uses a fresh context, DPR 1, reduced motion and no network/CPU throttle.
   External traffic and MP4s are blocked identically to isolate local images. */
const fs = require('fs');
const path = require('path');
const { createHash } = require('crypto');
const { execFileSync } = require('child_process');
const root = path.resolve(__dirname, '..');
let playwright;
try { playwright = require(process.env.PORTFOLIO_PLAYWRIGHT_PATH || 'playwright'); }
catch { playwright = require('C:/Users/josha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'); }
const edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const executablePath = process.env.PORTFOLIO_BROWSER_PATH || (fs.existsSync(edge) ? edge : undefined);
const base = new URL(process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4183/');
const label = (process.argv[2] || 'local').replace(/[^a-z0-9_-]/gi, '_');
const pages = process.argv[3]?.split(',') || ['index.html', 'projects/farmflow.html', 'projects/spaceship.html'];
const output = path.join(root, '.verification/20261017-audit');
fs.mkdirSync(output, { recursive: true });
const fingerprint = () => {
  const names = ['index.html', ...['css', 'js', 'projects'].flatMap(d => fs.readdirSync(path.join(root, d)).filter(f => /\.(?:html|css|js)$/.test(f)).map(f => d + '/' + f))];
  return createHash('sha256').update(names.map(n => fs.readFileSync(path.join(root, n), 'utf8')).join('\n')).digest('hex');
};
(async () => {
  const browser = await playwright.chromium.launch({ headless: true, executablePath });
  let repositoryCommit;
  try { repositoryCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(); } catch { repositoryCommit = null; }
  const report = { label, base: base.href, date: new Date().toISOString(), browser: await browser.version(), repositoryCommit, sourcesAtStart: fingerprint(), conditions: '3 runs per viewport/page; headless; DPR1; reduced motion; fresh contexts; routing disables HTTP cache; localhost without CPU/network throttle; external requests and MP4 blocked; wait fonts + 900ms, scroll 720px every 45ms, then wait 600ms. No More work/filter/video interactions. Counts are local image response bodies, not headers, field metrics, LCP, CLS or INP.', runs: [] };
  for (const target of pages) for (const width of [390, 1440]) for (let run = 1; run <= 3; run++) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const responses = [], errors = [];
    await page.route('**/*', route => { const url = new URL(route.request().url()); return url.origin !== base.origin || /\.mp4$/i.test(url.pathname) ? route.abort() : route.continue(); });
    page.on('response', response => { if (response.request().resourceType() === 'image' && response.ok()) responses.push(response); });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(new URL(target, base).href, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(900);
    const initialImageCount = responses.length;
    for (let y = 0; y < await page.evaluate(() => document.documentElement.scrollHeight); y += 720) {
      await page.evaluate(position => scrollTo(0, position), y);
      await page.waitForTimeout(45);
    }
    await page.waitForTimeout(600);
    const files = [];
    for (const response of responses) {
      try { files.push({ url: new URL(response.url()).pathname, bytes: (await response.body()).length }); }
      catch (error) { files.push({ url: new URL(response.url()).pathname, bytes: null, error: error.message }); }
    }
    const item = { target, width, run, initialImageCount, totalImageCount: files.length, totalImageBytes: files.reduce((sum, f) => sum + (f.bytes || 0), 0), unreadableBodies: files.filter(f => f.bytes === null).length, files, errors };
    report.runs.push(item);
    console.log(JSON.stringify({ target, width, run, totalImageCount: item.totalImageCount, totalImageBytes: item.totalImageBytes }));
    await context.close();
  }
  report.sourcesAtEnd = fingerprint();
  report.sourcesStable = report.sourcesAtEnd === report.sourcesAtStart;
  fs.writeFileSync(path.join(output, `${label}-image-measurement.json`), JSON.stringify(report, null, 2));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
