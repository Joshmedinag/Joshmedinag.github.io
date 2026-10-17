/* Integration checks for the static portfolio. Start a local server first.
   PORTFOLIO_BASE_URL, PORTFOLIO_PLAYWRIGHT_PATH and PORTFOLIO_BROWSER_PATH are optional.
   No email is sent and clipboard writes are replaced with an isolated test stub. */
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const root = path.resolve(__dirname, '..');
const bundled = 'C:/Users/josha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright';
let playwright;
try { playwright = require(process.env.PORTFOLIO_PLAYWRIGHT_PATH || 'playwright'); }
catch { playwright = require(bundled); }
const base = new URL(process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4183/');
const output = path.join(root, '.verification/20261017-audit');
fs.mkdirSync(output, { recursive: true });
const edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const executablePath = process.env.PORTFOLIO_BROWSER_PATH || (fs.existsSync(edge) ? edge : undefined);
const pages = ['index.html', ...fs.readdirSync(path.join(root, 'projects')).filter(f => f.endsWith('.html')).map(f => `projects/${f}`), '404.html'];
const report = { time: new Date().toISOString(), base: base.href, conditions: 'Playwright; Edge Chromium headless; reduced motion; no throttling. External media blocked except a mocked Vimeo SDK. Mobile viewport emulation, not a physical device. No field performance or full WCAG claim.', checks: [], layouts: [], pageErrors: [], missingResources: [], engines: {}, screenshots: [] };
const check = async (name, operation) => {
  if (process.env.PORTFOLIO_CHECK_PATTERN && !new RegExp(process.env.PORTFOLIO_CHECK_PATTERN).test(name)) return;
  try { await operation(); report.checks.push({ name, status: 'PASS' }); } catch (e) { report.checks.push({ name, status: 'FAIL', detail: e.message }); }
};
const screenshot = async (page, name) => { const file = path.join(output, name); await page.screenshot({ path: file }); report.screenshots.push(file); };
const settle = async page => {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all([...document.images].filter(img => { const r = img.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; }).map(img => img.decode().catch(() => {}))));
};
const prepare = async context => {
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    return url.protocol === 'https:' || /\.mp4$/i.test(url.pathname) ? route.abort() : route.continue();
  });
  await context.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: async value => { if (window.__denyCopy) throw new Error('Test denial'); window.__copied = value; } } }));
  context.on('page', page => {
    page.setDefaultTimeout(12000);
    page.on('pageerror', e => report.pageErrors.push({ url: page.url(), message: e.message }));
    page.on('response', response => { if (response.url().startsWith(base.origin) && response.status() >= 400) report.missingResources.push({ url: response.url(), status: response.status() }); });
  });
};

(async () => {
  const browser = await playwright.chromium.launch({ headless: true, executablePath });
  try {
    const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
    await prepare(context);
    const page = await context.newPage();
    await page.goto(base.href, { waitUntil: 'domcontentloaded' }); await settle(page);
    await check('Four specialties and completed MSc are explicit', async () => {
      const hero = await page.locator('.hero').innerText();
      for (const title of ['Lighting TD', 'Compositor', 'Technical Artist', 'Pipeline TD']) assert(hero.includes(title));
      assert.match(await page.locator('#education').innerText(), /Completed/);
      assert.doesNotMatch(await page.locator('.site-header').innerText(), /Available/);
    });
    await check('Visual and technical routes are visible together', async () => {
      assert.equal(await page.locator('#project-grid .project-card:visible').count(), 4);
      assert.equal(await page.locator('.technical-grid .project-card:visible').count(), 2);
      for (const href of ['aovguard.html', 'farmflow.html']) assert.equal(await page.locator(`.technical-grid a[href$="${href}"]`).count(), 1);
      assert.equal(await page.locator('#more-work').getAttribute('open'), null);
    });
    await check('Hero is manual initially; metadata follows Next', async () => {
      assert.equal(await page.locator('[data-carousel-pause]').getAttribute('aria-pressed'), 'true');
      await page.locator('[data-carousel-next]').click();
      await page.waitForFunction(() => document.querySelector('.hero-image.is-active')?.dataset.scene === 'ORBITAL STATION');
      assert.match(await page.locator('[data-carousel-scene]').textContent(), /ORBITAL STATION/);
      await page.locator('[data-carousel-prev]').click();
    });
    await check('Project arrows and Enter open the selected case study', async () => {
      await page.locator('#project-grid .project-card').first().focus();
      await page.keyboard.press('ArrowRight');
      assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), 'projects/spaceship.html');
      await Promise.all([page.waitForURL('**/projects/spaceship.html'), page.keyboard.press('Enter')]);
      await page.locator('.back-link').first().click();
      await page.waitForURL('**/index.html#work');
    });
    await check('More Work opens with Enter and filters do not hide featured work', async () => {
      const summary = page.locator('#more-work > summary'); await summary.focus(); await page.keyboard.press('Enter');
      assert.equal(await page.locator('#more-work').evaluate(e => e.open), true);
      assert.equal(await page.locator('#more-work .project-card:visible').count(), 6);
      await page.locator('#more-work [data-filter="lighting"]').click();
      assert.equal(await page.locator('#project-grid .project-card:visible').count(), 4);
      assert.equal(await page.locator('.technical-grid .project-card:visible').count(), 2);
      assert.equal(await page.locator('#more-work .project-card:visible').count(), 2);
      await page.locator('#more-work [data-filter="all"]').click();
    });
    await check('Legacy category URL exposes the same technical projects', async () => {
      await page.goto(new URL('index.html?category=pipeline#home', base).href, { waitUntil: 'domcontentloaded' }); await settle(page);
      assert.equal(await page.locator('.technical-grid .project-card:visible').count(), 2);
    });
    await check('Comparators offer keyboard, presets and mobile vertical scrolling', async () => {
      for (const slider of await page.locator('[data-compare]').all()) {
        await slider.focus(); await page.keyboard.press('Home'); assert.equal(await slider.getAttribute('aria-valuenow'), '4');
        await page.keyboard.press('End'); assert.equal(await slider.getAttribute('aria-valuenow'), '96');
        assert.match(await slider.evaluate(e => getComputedStyle(e).touchAction), /pan-y/);
        const presets = slider.locator('..').locator('[data-compare-preset]');
        assert((await presets.count()) >= 2); await presets.first().click();
      }
    });
    await check('Contact email and clipboard controls have different actions', async () => {
      const area = page.locator('#contact');
      assert.match(await area.locator('a[data-email-link]').getAttribute('href'), /^mailto:Joshalexmedina@hotmail.com$/i);
      assert.equal(await area.locator('.contact-address').innerText(), 'Joshalexmedina@hotmail.com');
      const button = area.locator('[data-copy-email]'); await button.click();
      assert.equal(await page.evaluate(() => window.__copied), 'Joshalexmedina@hotmail.com');
      assert.match(await button.innerText(), /COPIED TO CLIPBOARD/);
      await page.waitForTimeout(1900); assert.equal(await button.innerText(), 'Copy email');
      await page.evaluate(() => window.__denyCopy = true); await button.click();
      assert.equal(await button.innerText(), 'Copy email'); assert.match(await page.locator('[data-copy-toast]').innerText(), /unavailable/i);
    });
    await check('Gallery keyboard close restores focus and scroll', async () => {
      await page.goto(new URL('projects/venator.html', base).href, { waitUntil: 'domcontentloaded' }); await settle(page);
      const link = page.locator('.image-detail-link').first(); await link.scrollIntoViewIfNeeded(); const before = await page.evaluate(() => scrollY); await link.click();
      const dialog = page.locator('.gallery-viewer'); assert.equal(await dialog.evaluate(e => e.open), true); assert.equal(await dialog.getAttribute('aria-label'), 'Project image gallery');
      const initial = await dialog.locator('[data-viewer-count]').innerText(); await page.keyboard.press('ArrowRight'); assert.notEqual(await dialog.locator('[data-viewer-count]').innerText(), initial);
      await page.keyboard.press('Escape'); assert.equal(await link.evaluate(e => e === document.activeElement), true); assert(Math.abs(await page.evaluate(() => scrollY) - before) < 3);
    });
    await check('Every page has working local assets, links, CV and contact', async () => {
      const resources = new Set(); const ids = new Map(); const links = [];
      for (const name of pages) {
        await page.goto(new URL(name, base).href, { waitUntil: 'domcontentloaded' });
        const data = await page.evaluate(() => ({ h1: document.querySelectorAll('h1').length, lang: document.documentElement.lang, title: document.title, ids: [...document.querySelectorAll('[id]')].map(e => e.id), urls: [...document.querySelectorAll('[href],[src],[poster]')].flatMap(e => ['href', 'src', 'poster'].map(k => e.getAttribute(k)).filter(Boolean)), cv: [...document.querySelectorAll('a[href$=".pdf"]')].map(e => e.href), mailto: !!document.querySelector('a[href^="mailto:"]'), roles: document.querySelector('.site-footer')?.innerText || '' }));
        assert.equal(data.h1, 1, `${name} h1 count`); assert.equal(data.lang, 'en', `${name} lang`); assert.equal(new Set(data.ids).size, data.ids.length, `${name} duplicate IDs`); assert(data.cv.length, `${name} CV`); assert(data.mailto, `${name} mailto`);
        for (const title of ['Lighting TD', 'Compositor', 'Technical Artist', 'Pipeline TD']) assert(data.roles.includes(title), `${name} footer ${title}`);
        ids.set(new URL(name, base).pathname, new Set(data.ids));
        for (const raw of data.urls) { const u = new URL(raw, new URL(name, base)); if (u.origin === base.origin) { links.push(new URL(u)); u.hash = ''; resources.add(u.href); } }
      }
      for (const u of links) if (u.hash && ids.has(u.pathname)) assert(ids.get(u.pathname).has(decodeURIComponent(u.hash.slice(1))), `Missing anchor ${u.href}`);
      const results = []; const urls = [...resources];
      // Check sequentially: Python's small local-server backlog can refuse bursts of HEAD requests.
      for (const url of urls) {
        try { const response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(15000) }); results.push({ url, status: response.status }); }
        catch (error) { results.push({ url, status: 'request failed', detail: String(error.cause || error) }); }
      }
      report.resourceResults = results;
      assert.equal(results.filter(r => r.status !== 200).length, 0, JSON.stringify(results.filter(r => r.status !== 200))); report.resourceCount = results.length;
    });
    await check('No horizontal overflow at representative widths', async () => {
      for (const width of [320, 360, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
        for (const name of pages) {
          await page.goto(new URL(name, base).href, { waitUntil: 'domcontentloaded' }); await settle(page);
          const layout = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, overflow: document.documentElement.scrollWidth > innerWidth + 1 }));
          report.layouts.push({ page: name, ...layout });
          if ((width === 1440 || width === 390) && ['index.html', 'projects/venator.html', 'projects/aovguard.html', 'projects/farmflow.html'].includes(name)) await screenshot(page, `after-${path.basename(name, '.html')}-${width}.png`);
        }
      }
      const failed = report.layouts.filter(r => r.overflow); assert.equal(failed.length, 0, JSON.stringify(failed));
    });
    await check('200% reflow equivalent at 720 CSS px', async () => {
      await page.setViewportSize({ width: 720, height: 900 }); await page.goto(base.href, { waitUntil: 'domcontentloaded' }); await settle(page);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      report.zoom = '1440px window at 200% corresponds to 720 CSS px; tested reflow equivalent, not browser UI zoom.';
    });
    await check('Mobile menu opens, closes with Escape and returns focus', async () => {
      await page.setViewportSize({ width: 390, height: 844 }); await page.goto(base.href, { waitUntil: 'domcontentloaded' }); await settle(page);
      const button = page.locator('.menu-toggle'); await button.focus(); await page.keyboard.press('Enter'); assert.equal(await button.getAttribute('aria-expanded'), 'true');
      await page.keyboard.press('Escape'); assert.equal(await button.getAttribute('aria-expanded'), 'false'); assert.equal(await button.evaluate(e => e === document.activeElement), true);
    });
    await check('Vimeo blocked: clear fallback and an external link', async () => {
      const stage = page.locator('[data-vimeo-stage]').first(); assert.equal(await stage.locator('iframe').count(), 0);
      await stage.locator('[data-reel-play]').click(); await page.waitForFunction(() => document.querySelector('[data-vimeo-stage]').dataset.vimeoStatus === 'unavailable', null, { timeout: 20000 });
      assert.equal(await stage.locator('[data-vimeo-fallback]').isVisible(), true); assert.match(await stage.locator('[data-vimeo-fallback] a').getAttribute('href'), /^https:\/\/vimeo.com\//);
      assert.equal(await stage.locator('iframe').count(), 1); await screenshot(page, 'after-vimeo-blocked-390.png');
    });
    await check('Vimeo mocked handshake: one player, poster until ready', async () => {
      const mock = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); await prepare(mock);
      await mock.route('https://player.vimeo.com/api/player.js', route => route.fulfill({ contentType: 'application/javascript', body: 'window.Vimeo={Player:class{on(){}ready(){return new Promise(r=>setTimeout(r,500))}getVideoTitle(){return Promise.resolve("Test reel")}play(){return Promise.resolve()}pause(){return Promise.resolve()}getPaused(){return Promise.resolve(true)}getCurrentTime(){return Promise.resolve(0)}setCurrentTime(){return Promise.resolve()}requestFullscreen(){return Promise.resolve()}}};' }));
      await mock.route('https://player.vimeo.com/video/**', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>Mock player</title><p>Test player</p>' }));
      const p = await mock.newPage(); let requests = 0; p.on('request', r => { if (r.url().includes('vimeo.com')) requests++; });
      await p.goto(base.href, { waitUntil: 'domcontentloaded' }); await settle(p); const stage = p.locator('[data-vimeo-stage]').first(); await stage.scrollIntoViewIfNeeded(); assert.equal(requests, 0);
      await stage.locator('[data-reel-play]').click(); assert.equal(await stage.locator('[data-reel-poster]').isVisible(), true);
      await p.waitForFunction(() => document.querySelector('[data-vimeo-stage]').dataset.vimeoStatus === 'ready'); assert.equal(await stage.locator('iframe').count(), 1); assert.equal(await stage.locator('[data-reel-poster]').isVisible(), false);
      assert.equal(await p.locator('script[src*="player.vimeo.com/api/player.js"]').count(), 1); await mock.close();
    });
    await check('Essential content and native More Work work without JavaScript', async () => {
      const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } }); await prepare(nojs); const p = await nojs.newPage();
      await p.goto(base.href, { waitUntil: 'domcontentloaded' }); await settle(p);
      assert.equal(await p.locator('#project-grid .project-card:visible').count(), 4); assert.equal(await p.locator('.technical-grid .project-card:visible').count(), 2);
      await p.locator('#more-work > summary').click(); assert.equal(await p.locator('#more-work .project-card:visible').count(), 6);
      assert(await p.locator('a[href^="mailto:"]:visible').count()); assert.equal(await p.locator('[data-copy-email]').isVisible(), false); assert(await p.locator('a[data-reel-link]:visible').count());
      await screenshot(p, 'after-nojs-390.png'); await nojs.close();
    });
    await context.close();
    for (const name of ['firefox', 'webkit']) { try { const extra = await playwright[name].launch({ headless: true }); report.engines[name] = 'Available (not full regression)'; await extra.close(); } catch (e) { report.engines[name] = `Unavailable: ${e.message.split('\n')[0]}`; } }
    report.engines.chromium = executablePath || 'Bundled Chromium';
    await check('No new own JavaScript exceptions or missing local resources', async () => { assert.equal(report.pageErrors.length, 0, JSON.stringify(report.pageErrors)); assert.equal(report.missingResources.length, 0, JSON.stringify(report.missingResources)); });
  } finally { await browser.close(); fs.writeFileSync(path.join(output, 'verification-report.json'), JSON.stringify(report, null, 2)); }
  console.log(JSON.stringify({ checks: report.checks, layouts: report.layouts.length, resources: report.resourceCount, engines: report.engines, screenshots: report.screenshots.length }, null, 2));
  process.exitCode = report.checks.some(c => c.status === 'FAIL') ? 1 : 0;
})().catch(error => { fs.writeFileSync(path.join(output, 'verification-report.json'), JSON.stringify({ ...report, fatal: error.message }, null, 2)); console.error(error); process.exitCode = 1; });
