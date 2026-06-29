import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await page.goto('http://localhost:5500');
await page.waitForLoadState('networkidle');
await page.waitForTimeout(1500);

// Screenshot do welcome card completo
await page.screenshot({ path: 'screenshot-welcome.png' });
console.log('✅ Screenshot: Welcome card épico');

// Fechar e ver o app
const overlay = page.locator('#welcome-overlay');
if (await overlay.count() > 0) {
  await overlay.click();
  await page.waitForTimeout(600);
}

await browser.close();
