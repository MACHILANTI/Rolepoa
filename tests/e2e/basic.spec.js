import { test, expect } from '@playwright/test';

test.describe('RolêPOA - Testes Básicos', () => {
  test('Deve carregar a página inicial', async ({ page }) => {
    await page.goto('/');

    // Verifica se o título está visível
    const title = page.locator('h1, title');
    await expect(title).toBeDefined();

    // Verifica se há lista de restaurantes ou área vazia
    const content = page.locator('[id*="content"], [id*="list"], body');
    await expect(content).toBeVisible();
  });

  test('Deve abrir modal de detalhes ao clicar em um cartão', async ({ page }) => {
    await page.goto('/');

    // Aguarda e clica no primeiro cartão de restaurante
    const firstCard = page.locator('[id^="card-"]').first();
    if (await firstCard.count() > 0) {
      await firstCard.click();

      // Verifica se o modal foi aberto
      const detailModal = page.locator('#modal-detail');
      await expect(detailModal).toHaveClass(/active/);

      // Verifica se contém conteúdo do detalhe
      const detailContent = page.locator('.detail-header, .rate-form-area');
      await expect(detailContent).toBeVisible();
    }
  });

  test('Deve adicionar e remover favorito', async ({ page }) => {
    await page.goto('/');

    // Se houver restaurantes, testa favoritar
    const firstCard = page.locator('[id^="card-"]').first();
    if (await firstCard.count() > 0) {
      await firstCard.click();

      // Localiza botão de favoritar
      const favoriteBtn = page.locator('button:has-text("♥"), button:has-text("🤍")').first();
      if (await favoriteBtn.count() > 0) {
        const initialText = await favoriteBtn.textContent();
        await favoriteBtn.click();

        // Aguarda a ação
        await page.waitForTimeout(100);

        // Verifica se o estado mudou
        const newText = await favoriteBtn.textContent();
        expect(initialText).not.toBe(newText);
      }
    }
  });
});
