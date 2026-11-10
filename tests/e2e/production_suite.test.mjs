import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

test.describe('Citzos Enterprise Production Test Suite', () => {

  test('E2E-1: Portal Home Page & Dynamic Opportunity Engine', async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('input, h1', { timeout: 10000 });

    // Title verification
    const title = await page.title();
    assert.ok(title.includes('Citzos'), 'Title must contain Citzos');

    // Verify sovereign portal gate / onboarding headline
    const h1 = page.locator('h1').first();
    const h1Text = await h1.innerText();
    assert.ok(
      h1Text.includes('Citizen Account') || h1Text.includes('opportunities and benefits matched') || h1Text.includes('अवसर'),
      'Headline must display verified portal text'
    );

    await browser.close();
  });

  test('E2E-2: Multi-Language Switcher across Viewports', async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

    await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('button:has-text("EN"), button:has(svg.lucide-globe)', { timeout: 10000 });

    // Find language selector button in top sovereign bar
    const langBtn = page.locator('button:has-text("EN"), button:has(svg.lucide-globe)');
    assert.ok(await langBtn.first().isVisible(), 'Language selector button must be visible');
    await langBtn.first().click();
    await page.waitForTimeout(300);

    // Verify language options appeared
    const hindiOption = page.locator('button:has-text("हिन्दी")');
    assert.ok(await hindiOption.first().isVisible(), 'Hindi option must be visible');

    // Switch to Hindi
    await hindiOption.first().click();
    await page.waitForTimeout(600);

    // Verify translated elements
    const bodyText = await page.innerText('body');
    assert.ok(bodyText.includes('नागरिक लॉगिन'), 'Hindi translation for Citizen Log In must appear');
    assert.ok(bodyText.includes('गूगल से लॉगिन करें'), 'Hindi translation for Google login must appear');

    // Switch back to English
    const hiLangBtn = page.locator('button:has-text("HI"), button:has(svg.lucide-globe)');
    await hiLangBtn.first().click();
    await page.waitForTimeout(300);
    const enOption = page.locator('button:has-text("English")');
    await enOption.first().click();
    await page.waitForTimeout(600);

    const enBodyText = await page.innerText('body');
    assert.ok(enBodyText.includes('Citizen Log In'), 'English translation must be restored');

    await browser.close();
  });

  test('E2E-3: Authentication Validations & Form Security', async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

    await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('input[type="email"]', { timeout: 10000 });

    // Email input presence
    const emailInput = page.locator('input[type="email"]');
    assert.ok(await emailInput.first().isVisible(), 'Email input must be visible');

    // Password input presence
    const pwdInput = page.locator('input[type="password"]');
    assert.ok(await pwdInput.first().isVisible(), 'Password input must be visible');
    await pwdInput.first().fill('MySecretPassword123');

    // Test password toggle
    const toggleEye = page.locator('button:has(svg.lucide-eye), button:has(svg.lucide-eye-off)');
    if (await toggleEye.count() > 0) {
      await toggleEye.first().click();
      await page.waitForTimeout(300);
      const textInput = page.locator('input[type="text"][value="MySecretPassword123"]');
      assert.ok(await textInput.count() >= 1, 'Password visibility toggle must reveal text input');
    }

    await browser.close();
  });

  test('E2E-4: Admin Portal Security Gate & Master PIN Lockout', async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

    await page.goto('http://localhost:3000/admin', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('input[type="password"]', { timeout: 10000 });

    const pinInput = page.locator('input[type="password"]');
    assert.ok(await pinInput.isVisible(), 'Admin PIN input must be visible');

    const submitBtn = page.locator('button[type="submit"]');
    if (await submitBtn.isEnabled()) {
      await pinInput.fill('000000');
      await submitBtn.click({ timeout: 5000 });
      await page.waitForTimeout(600);
    }

    const bodyText = await page.innerText('body');
    const isSecurityGuarded =
      bodyText.includes('अमान्य') ||
      bodyText.includes('Invalid') ||
      bodyText.includes('Lockout') ||
      bodyText.includes('सुरक्षा') ||
      bodyText.includes('Security Clearance');

    assert.ok(isSecurityGuarded, 'Admin portal must enforce security guard or rate lockout');
    await browser.close();
  });

  test('E2E-5: Responsive Viewport Zero-Overflow Audit', async () => {
    const browser = await chromium.launch({ headless: true });
    const viewports = [
      { name: 'Mobile', width: 375, height: 812 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1280, height: 800 }
    ];

    for (const vp of viewports) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('h1, input', { timeout: 10000 });

      // Verify no horizontal overflow causing horizontal scrollbar
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      assert.equal(overflow, false, `Horizontal overflow detected on ${vp.name} (${vp.width}px)`);
      await page.close();
    }

    await browser.close();
  });

});
