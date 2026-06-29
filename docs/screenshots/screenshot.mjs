import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await page.goto('http://localhost:5500');
await page.waitForLoadState('networkidle');
await page.waitForTimeout(2000);

// Close overlay
const overlay = page.locator('#welcome-overlay');
if (await overlay.count() > 0) {
  await overlay.locator('button').first().click();
  await page.waitForTimeout(300);
}

// Screenshot 1: Desktop completo
await page.screenshot({ path: 'screenshot-desktop.png' });
console.log('✅ Screenshot 1: Desktop');

// Scroll e ver cards
await page.evaluate(() => window.scrollBy(0, 200));
await page.waitForTimeout(500);
await page.screenshot({ path: 'screenshot-cards.png' });
console.log('✅ Screenshot 2: Cards');

// Abrir um card
const firstCard = page.locator('[id^="card-"]').first();
if (await firstCard.count() > 0) {
  await firstCard.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshot-modal.png' });
  console.log('✅ Screenshot 3: Modal de detalhe');
}

await browser.close();
