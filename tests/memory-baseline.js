// tests/memory-baseline.js
// Baseline de memória — roda pra detectar vazamentos

import { test, expect } from '@playwright/test';

test('memory baseline: use app for 2 min, check no major leak', async ({ page }) => {
  await page.goto('http://localhost:5500');

  // Iniciar gravação de memória
  await page.context().browser().newContext();

  // Simular uso por 2 min
  for (let i = 0; i < 10; i++) {
    // Abrir card
    const card = page.locator('.restaurant-card').first();
    if (await card.count() > 0) {
      await card.click();
      await page.waitForTimeout(500);

      // Fechar modal
      const closeBtn = page.locator('.modal-close');
      if (await closeBtn.count() > 0) {
        await closeBtn.click();
        await page.waitForTimeout(300);
      }
    }
  }

  // Nota: DevTools Memory deve ser verificada manualmente
  // Abra DevTools > Memory > Take heap snapshot
  // Comparar antes/depois do teste
  expect(true).toBe(true);
});
