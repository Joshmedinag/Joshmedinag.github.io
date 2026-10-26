/* Focused, local-only regression checks for the bilingual AOVGuard case study.
   Start the static server first. Optional environment variables:
   PORTFOLIO_BASE_URL, PORTFOLIO_VERIFICATION_OUTPUT, PORTFOLIO_PLAYWRIGHT_PATH,
   PORTFOLIO_BROWSER_PATH. No real browser window, email, publication or account
   access is used. Clipboard writes are replaced with an isolated test stub.
   Screenshots document the website, not manual app acceptance. */
'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const root = path.resolve(__dirname, '..');
const bundled = 'C:/Users/josha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright';
let playwright;
try { playwright = require(process.env.PORTFOLIO_PLAYWRIGHT_PATH || 'playwright'); }
catch { playwright = require(bundled); }
const base = new URL(process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4183/');
const output = path.resolve(root, process.env.PORTFOLIO_VERIFICATION_OUTPUT || '.verification/20261019-aovguard');
fs.mkdirSync(output, { recursive: true });
const edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const executablePath = process.env.PORTFOLIO_BROWSER_PATH || (fs.existsSync(edge) ? edge : undefined);
const cases = [
  { lang: 'en', file: 'projects/aovguard.html', other: 'aovguard-es.html', pending: /pending/i },
  { lang: 'es', file: 'projects/aovguard-es.html', other: 'aovguard.html', pending: /pendiente/i }
];
const report = {
  time: new Date().toISOString(), base: base.href,
  conditions: 'Local static website. Playwright, headless Edge/Chromium, reduced motion; no network throttling. All non-local network requests blocked. Clipboard writes use an isolated test stub, not the user clipboard. Viewport emulation and 720 CSS-pixel reflow equivalent are not physical-device tests or browser UI zoom. No full WCAG, native AOVGuard manual review, performance or participant-usability claim.',
  checks: [], layouts: [], pages: [], screenshots: [], pageErrors: [], missingResources: []
};
const check = async (name, operation) => {
  try { await operation(); report.checks.push({ name, status: 'PASS' }); }
  catch (error) { report.checks.push({ name, status: 'FAIL', detail: error.message }); }
};
const prepare = async context => {
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    return ['http:', 'https:'].includes(url.protocol) && url.origin !== base.origin ? route.abort() : route.continue();
  });
  await context.addInitScript(() => Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: async value => {
      if (window.__denyCopy) throw new Error('Isolated clipboard test denial');
      window.__copied = value;
    } }
  }));
  context.on('page', page => {
    page.setDefaultTimeout(12000);
    page.on('pageerror', error => report.pageErrors.push({ url: page.url(), message: error.message }));
    page.on('response', response => {
      if (new URL(response.url()).origin === base.origin && response.status() >= 400) report.missingResources.push({ url: response.url(), status: response.status() });
    });
  });
};
const settle = async page => {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = [...document.querySelectorAll('main img')];
    images.forEach(image => { image.loading = 'eager'; });
    await Promise.all(images.map(image => image.decode().catch(() => {})));
  });
};
const openCase = async (page, item) => {
  await page.goto(new URL(item.file, base).href, { waitUntil: 'domcontentloaded' });
  await settle(page);
};
const takeScreenshot = async (page, name) => {
  const file = path.join(output, name);
  await page.screenshot({ path: file });
  report.screenshots.push(file);
};
const currentImages = page => page.locator('main img[src*="aovguard-rc1-20261019/"]');

(async () => {
  const browser = await playwright.chromium.launch({ headless: true, executablePath });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    await prepare(context);
    const page = await context.newPage();
    for (const item of cases) {
      await openCase(page, item);
      await check(`${item.lang}: current release, test results and honest manual-review status`, async () => {
        const content = await page.locator('main').innerText();
        assert.match(content, /1\.4\.0rc1/);
        const evidence = page.locator('#evidence-title').locator('xpath=ancestor::section[1]');
        const text = await evidence.innerText();
        assert.match(text, /\b1[,.\s]?041\b/, '1041 passing tests must be present');
        assert.match(text, item.lang === 'es' ? /96,34\s*%/ : /96\.34\s*%/, 'Localized 96.34% coverage must be present');
        assert.match(text, item.lang === 'es' ? /\b3\s+(?:pruebas\s+)?(?:omitid[ao]s|saltad[ao]s)|(?:omitid[ao]s|saltad[ao]s)\s+3\b/i : /\b3\s+(?:tests?\s+)?skipped|skipped\s+3\b/i, 'Three skipped tests must be explicit');
        const statistics = await evidence.locator('.evidence-grid').innerText();
        assert.doesNotMatch(statistics, /\b282\b|95[.,]37\s*%|\b302\b/, 'Old snapshot figures must not be current headline statistics');
        const status = page.locator('[data-aovguard-manual-status]');
        assert.equal(await status.count(), 1);
        assert.equal(await status.isVisible(), true);
        assert.match(await status.innerText(), item.pending);
        assert.match(await status.innerText(), /manual/i);
        assert.match(content, /Maya/i);
        assert.match(content, /Venator/i);
        assert.match(text, /\b144\b/, 'Venator acceptance scope must state 144 frames');
        assert.match(text, item.lang === 'es' ? /\b(?:1|un)\s+(?:solo\s+|real\s+)?(?:frame|fotograma)\b/i : /\b(?:1|one)\s+(?:single\s+|real\s+)?(?:Maya\s+)?frame\b|single.frame/i, 'Maya acceptance scope must explicitly identify one frame');
        report.pages.push({ file: item.file, manualStatus: await status.innerText(), statistics });
      });
      await check(`${item.lang}: rendered body copy and pending status have AA text contrast`, async () => {
        const styles = await page.evaluate(() => ['.project-lede', '.story-copy > p', '.aovguard-status', '.aovguard-status strong', '.source-note'].map(selector => {
          const node = document.querySelector(selector);
          const color = getComputedStyle(node).color;
          let backgroundNode = node;
          let background;
          while (backgroundNode) {
            const candidate = getComputedStyle(backgroundNode).backgroundColor;
            if (candidate !== 'transparent' && candidate !== 'rgba(0, 0, 0, 0)') { background = candidate; break; }
            backgroundNode = backgroundNode.parentElement;
          }
          return { selector, color, background };
        }));
        const luminance = css => {
          const rgb = css.match(/[\d.]+/g).slice(0, 3).map(Number).map(channel => {
            const value = channel / 255;
            return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
          });
          return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
        };
        for (const style of styles) {
          assert(style.background, `Solid background required for ${style.selector}`);
          const fg = luminance(style.color), bg = luminance(style.background);
          const contrast = (Math.max(fg, bg) + .05) / (Math.min(fg, bg) + .05);
          assert(contrast >= 4.5, `${style.selector}: ${contrast.toFixed(2)} contrast`);
        }
        report.pages.find(entry => entry.file === item.file).computedTextColors = styles;
      });
      await check(`${item.lang}: semantic language, canonical and reciprocal language links`, async () => {
        assert.equal(await page.locator('html').getAttribute('lang'), item.lang);
        assert.equal(await page.locator('h1').count(), 1);
        const canonical = new URL(await page.locator('link[rel="canonical"]').getAttribute('href'));
        assert.equal(canonical.origin, 'https://joshmedinag.github.io');
        assert.equal(canonical.pathname, `/${item.file}`);
        for (const target of cases) {
          const alternate = page.locator(`link[rel="alternate"][hreflang="${target.lang}"]`);
          assert.equal(await alternate.count(), 1);
          const alternateUrl = new URL(await alternate.getAttribute('href'));
          assert.equal(alternateUrl.origin, canonical.origin);
          assert.equal(alternateUrl.pathname, `/${target.file}`);
          // Compare resolved URLs: both relative and absolute same-site hrefs are valid.
          const matching = await page.locator('.case-language-nav a').evaluateAll((links, pathname) => links.filter(link => new URL(link.href).pathname === pathname).map(link => ({ current: link.getAttribute('aria-current'), text: link.textContent.trim() })), `/${target.file}`);
          assert.equal(matching.length, 1, `${target.lang} visible language link`);
          assert(matching[0].text, 'Language links need visible names');
          if (target.lang === item.lang) assert.equal(matching[0].current, 'page');
        }
        const languages = page.locator('.case-language-nav');
        assert.equal(await languages.isVisible(), true);
        const other = languages.locator(`a[href$="${item.other}"]`);
        await other.click();
        await page.waitForURL(`**/projects/${item.other}`);
        assert.equal(await page.locator('html').getAttribute('lang'), item.lang === 'en' ? 'es' : 'en');
        await openCase(page, item);
      });
      await check(`${item.lang}: five current images, readable captions and local original assets`, async () => {
        const images = currentImages(page);
        assert.equal(await images.count(), 5, 'The five current supplied images must use the dated evidence asset directory');
        const originals = new Set();
        const captions = [];
        for (const image of await images.all()) {
          assert((await image.getAttribute('alt') || '').trim().length >= 15, 'Each evidence image needs meaningful alt text');
          assert.equal(await image.evaluate(img => img.complete && img.naturalWidth > 0), true, await image.getAttribute('src'));
          const figure = image.locator('xpath=ancestor::figure[1]');
          const caption = (await figure.locator('figcaption').innerText()).trim();
          assert(caption.length >= 35, 'Caption must explain the image, not merely name it');
          captions.push(caption);
          const link = image.locator('xpath=ancestor::a[1]');
          const original = new URL(await link.getAttribute('href'), page.url());
          assert.equal(original.origin, base.origin, 'Evidence originals must be included local assets');
          originals.add(original.href);
          const response = await context.request.get(original.href);
          assert.equal(response.status(), 200, original.href);
          assert.match(response.headers()['content-type'] || '', /^image\//, original.href);
        }
        assert.equal(originals.size, 5, 'Five distinct current evidence images are required');
        assert.match(captions.join(' '), item.lang === 'es' ? /automatizad|offscreen|fuera de pantalla/i : /automated|offscreen|off.screen/i, 'Evidence methodology must be visible in captions');
        assert.match(captions.join(' '), item.lang === 'es' ? /reproducci[oó]n|reconstrucci[oó]n|informe/i : /reproduction|reconstruction|report/i, 'Report-derived images must not be passed off as native manual screenshots');
      });
      await check(`${item.lang}: isolated clipboard success, restored label and localized denial`, async () => {
        const button = page.locator('[data-copy-email]').first();
        const toast = page.locator('[data-copy-toast]');
        const original = await button.innerText();
        assert.match(original, item.lang === 'es' ? /copiar/i : /copy/i);
        await button.click();
        await page.waitForFunction(() => typeof window.__copied === 'string');
        assert.equal(await page.evaluate(() => window.__copied), 'Joshalexmedina@hotmail.com');
        assert.match(await button.innerText(), item.lang === 'es' ? /copiado al portapapeles/i : /copied to clipboard/i);
        assert.equal(await toast.isVisible(), true);
        assert.match(await toast.innerText(), item.lang === 'es' ? /correo copiado/i : /email copied/i);
        await page.waitForFunction(text => document.querySelector('[data-copy-email]')?.innerText === text, original, { timeout: 5000 });
        assert.equal(await button.innerText(), original, 'Original label returns after the 1.8-second confirmation');
        assert.equal(await button.evaluate(node => node.classList.contains('is-copied')), false);
        await page.evaluate(() => { window.__denyCopy = true; window.__copied = 'unchanged after denied write'; });
        await button.click();
        assert.equal(await button.innerText(), original);
        assert.equal(await toast.isVisible(), true);
        assert.match(await toast.innerText(), item.lang === 'es' ? /no se pudo copiar.*manualmente/i : /copy unavailable.*manually/i);
        assert.equal(await page.evaluate(() => window.__copied), 'unchanged after denied write');
      });
      await check(`${item.lang}: gallery arrows, Escape, named controls and focus restoration`, async () => {
        const link = currentImages(page).first().locator('xpath=ancestor::a[1]');
        await link.scrollIntoViewIfNeeded();
        await link.focus();
        const before = await page.evaluate(() => scrollY);
        await page.keyboard.press('Enter');
        const dialog = page.locator('.gallery-viewer');
        assert.equal(await dialog.evaluate(node => node.open), true);
        assert.match(await dialog.getAttribute('aria-label'), item.lang === 'es' ? /galer[ií]a/i : /gallery/i);
        assert.match(await dialog.locator('[data-viewer-close]').innerText(), item.lang === 'es' ? /cerrar/i : /close/i);
        assert.match(await dialog.locator('[data-viewer-previous]').getAttribute('aria-label'), item.lang === 'es' ? /anterior/i : /previous/i);
        assert.match(await dialog.locator('[data-viewer-next]').getAttribute('aria-label'), item.lang === 'es' ? /siguiente/i : /next/i);
        assert.match(await dialog.locator('[data-viewer-original]').innerText(), item.lang === 'es' ? /original/i : /original/i);
        if (item.lang === 'es') {
          assert.doesNotMatch(await dialog.locator('[data-viewer-error]').textContent(), /couldn't|below|load this image/i);
          assert.doesNotMatch(await dialog.locator('[data-viewer-original]').innerText(), /opens in a new tab|open original/i);
        }
        const first = await dialog.locator('[data-viewer-count]').innerText();
        await page.keyboard.press('ArrowRight');
        assert.notEqual(await dialog.locator('[data-viewer-count]').innerText(), first);
        await page.keyboard.press('ArrowLeft');
        assert.equal(await dialog.locator('[data-viewer-count]').innerText(), first);
        await page.keyboard.press('Escape');
        await page.waitForFunction(() => !document.querySelector('.gallery-viewer').open);
        await page.waitForFunction(() => document.activeElement?.classList.contains('image-detail-link'));
        assert.equal(await link.evaluate(node => node === document.activeElement), true);
        assert(Math.abs(await page.evaluate(() => scrollY) - before) < 3, 'Gallery close must retain the review position');
      });
      await check(`${item.lang}: mobile navigation Escape and restored focus`, async () => {
        await page.setViewportSize({ width: 390, height: 844 });
        await openCase(page, item);
        const toggle = page.locator('.menu-toggle');
        assert.match(await toggle.getAttribute('aria-label'), item.lang === 'es' ? /abrir/i : /open/i);
        await toggle.focus();
        await page.keyboard.press('Enter');
        assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
        assert.match(await toggle.getAttribute('aria-label'), item.lang === 'es' ? /cerrar/i : /close/i);
        await page.keyboard.press('Escape');
        assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
        assert.equal(await toggle.evaluate(node => node === document.activeElement), true);
      });
    }
    await check('Bilingual responsive layouts and 200% reflow equivalent', async () => {
      for (const width of [320, 390, 768, 1024, 1440, 720]) {
        await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
        for (const item of cases) {
          await openCase(page, item);
          const layout = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, overflow: document.documentElement.scrollWidth > innerWidth + 1, missingImages: [...document.querySelectorAll('main img')].filter(img => !img.complete || !img.naturalWidth).map(img => img.getAttribute('src')), missingAlt: [...document.querySelectorAll('main img')].filter(img => !img.alt.trim()).map(img => img.getAttribute('src')) }));
          report.layouts.push({ file: item.file, ...layout });
          if ([390, 1440].includes(width)) {
            await page.evaluate(() => scrollTo(0, 0));
            await takeScreenshot(page, `aovguard-${item.lang}-${width}-top.png`);
            for (const section of ['evidence-title', 'documentation-title']) {
              await page.evaluate(id => {
                const heading = document.getElementById(id);
                const section = heading.closest('section') || heading;
                const header = document.querySelector('.site-header');
                const offset = (header?.offsetHeight || 80) + 32;
                scrollTo(0, section.getBoundingClientRect().top + scrollY - offset);
              }, section);
              await takeScreenshot(page, `aovguard-${item.lang}-${width}-${section}.png`);
            }
          }
        }
      }
      const failures = report.layouts.filter(layout => layout.overflow || layout.missingImages.length || layout.missingAlt.length);
      assert.equal(failures.length, 0, JSON.stringify(failures));
    });
    await check('Essential bilingual status, links and images remain available without JavaScript', async () => {
      const nojs = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
      await prepare(nojs);
      try {
        const p = await nojs.newPage();
        for (const item of cases) {
          await openCase(p, item);
          assert.match(await p.locator('[data-aovguard-manual-status]').innerText(), item.pending);
          assert.equal(await p.locator('[data-aovguard-manual-status]').isVisible(), true);
          assert.equal(await p.locator('.case-language-nav').isVisible(), true);
          assert.equal(await p.locator('.case-language-nav a').count(), 2);
          assert.equal(await currentImages(p).count(), 5);
          for (const image of await currentImages(p).all()) {
            const link = image.locator('xpath=ancestor::a[1]');
            assert.match(await link.getAttribute('href'), /\.(?:png|jpe?g|webp)$/i);
          }
          await p.locator('.case-language-nav').locator(`a[href$="${item.other}"]`).click();
          await p.waitForURL(`**/projects/${item.other}`);
          assert.equal(await p.locator('html').getAttribute('lang'), item.lang === 'en' ? 'es' : 'en');
        }
      } finally { await nojs.close(); }
    });
    await context.close();
    await check('No local HTTP failures or uncaught website JavaScript exceptions', async () => {
      assert.equal(report.pageErrors.length, 0, JSON.stringify(report.pageErrors));
      assert.equal(report.missingResources.length, 0, JSON.stringify(report.missingResources));
    });
    report.browser = executablePath || 'Bundled Chromium';
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(output, 'aovguard-verification-report.json'), JSON.stringify(report, null, 2));
  }
  console.log(JSON.stringify({ checks: report.checks, layouts: report.layouts.length, screenshots: report.screenshots.length, output }, null, 2));
  process.exitCode = report.checks.some(result => result.status === 'FAIL') ? 1 : 0;
})().catch(error => {
  fs.writeFileSync(path.join(output, 'aovguard-verification-report.json'), JSON.stringify({ ...report, fatal: error.message }, null, 2));
  console.error(error);
  process.exitCode = 1;
});
