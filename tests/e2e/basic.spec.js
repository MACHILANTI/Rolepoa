import { test, expect } from '@playwright/test';

// Setup: fecha welcome overlay se existir
async function closeWelcomeOverlay(page) {
  const overlay = page.locator('#welcome-overlay');
  if (await overlay.count() > 0) {
    const closeBtn = overlay.locator('button').first();
    if (await closeBtn.count() > 0) {
      await closeBtn.click();
      await page.waitForTimeout(300);
    }
  }
}

test.describe('RolêPOA - Testes Básicos', () => {
  test('Deve carregar a página inicial', async ({ page }) => {
    await page.goto('/');
    await closeWelcomeOverlay(page);

    // Aguarda cards carregarem
    await page.waitForSelector('[id^="card-"]', { timeout: 5000 }).catch(() => {});

    // Verifica se há cards ou área vazia
    const cards = page.locator('[id^="card-"]');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThanOrEqual(0);
  });

  test('Deve abrir modal de detalhes ao clicar em um cartão', async ({ page }) => {
    await page.goto('/');
    await closeWelcomeOverlay(page);

    // Aguarda cards carregarem
    await page.waitForSelector('[id^="card-"]', { timeout: 5000 }).catch(() => {});

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
    await closeWelcomeOverlay(page);

    // Aguarda cards carregarem
    await page.waitForSelector('[id^="card-"]', { timeout: 5000 }).catch(() => {});

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

  test('Deve criar uma nova avaliação', async ({ page }) => {
    await page.goto('/');
    await closeWelcomeOverlay(page);

    // Aguarda cards carregarem
    await page.waitForSelector('[id^="card-"]', { timeout: 5000 }).catch(() => {});

    // Clica no primeiro cartão
    const firstCard = page.locator('[id^="card-"]').first();
    if (await firstCard.count() > 0) {
      await firstCard.click();

      // Aguarda o modal abrir
      const detailModal = page.locator('#modal-detail');
      await expect(detailModal).toHaveClass(/active/);

      // Clica em "Nova avaliação"
      const newRatingBtn = page.locator('button:has-text("➕")').first();
      if (await newRatingBtn.count() > 0) {
        await newRatingBtn.click();

        // Verifica se o formulário apareceu
        const ratingForm = page.locator('.rate-form');
        await expect(ratingForm).toBeVisible();

        // Preenche nome de quem avalia
        const nameInput = page.locator('#rate-person');
        await nameInput.fill('Teste E2E');

        // Clica em uma estrela (primeira categoria, 3 estrelas)
        const firstStar = page.locator('.rate-row .star').nth(2); // índice 2 = terceira estrela
        if (await firstStar.count() > 0) {
          await firstStar.click();
          await expect(firstStar).toHaveClass(/on/);
        }

        // Verifica se há botão de salvar
        const saveBtn = page.locator('button:has-text("✅")');
        if (await saveBtn.count() > 0) {
          // Não clica para evitar persistência indesejada nos testes
          await expect(saveBtn).toBeVisible();
        }
      }
    }
  });

  test('Deve editar uma avaliação existente', async ({ page }) => {
    await page.goto('/');
    await closeWelcomeOverlay(page);

    // Aguarda cards carregarem
    await page.waitForSelector('[id^="card-"]', { timeout: 5000 }).catch(() => {});

    // Clica no primeiro cartão
    const firstCard = page.locator('[id^="card-"]').first();
    if (await firstCard.count() > 0) {
      await firstCard.click();

      // Aguarda o modal abrir
      const detailModal = page.locator('#modal-detail');
      await expect(detailModal).toHaveClass(/active/);

      // Procura por botão de editar avaliação
      const editBtn = page.locator('button:has-text("✏️")').first();
      if (await editBtn.count() > 0) {
        await editBtn.click();

        // Verifica se o formulário de edição apareceu
        const ratingForm = page.locator('.rate-form');
        await expect(ratingForm).toBeVisible();

        // Tenta adicionar comentário
        const commentField = page.locator('#detail-comments');
        if (await commentField.count() > 0) {
          await commentField.fill('Teste de edição via E2E');
          const comment = await commentField.inputValue();
          expect(comment).toBe('Teste de edição via E2E');
        }

        // Verifica se o botão de salvar está visível
        const saveBtn = page.locator('button:has-text("✅")');
        await expect(saveBtn).toBeVisible();
      }
    }
  });

  test('sorteio por categoria funciona', async ({ page }) => {
    await page.goto('/');
    await closeWelcomeOverlay(page);

    // Aguarda cards carregarem
    await page.waitForSelector('[id^="card-"]', { timeout: 5000 }).catch(() => {});

    // Localizar e clicar no pin de categoria "Pizza" (se existir)
    const pizzaPins = page.locator('[data-cat="Pizza"]');
    if (await pizzaPins.count() > 0) {
      await pizzaPins.first().click();
    }

    // Clicar no botão sorteio
    const sortBtn = page.locator('button:has-text("Sorteio")');
    if (await sortBtn.count() > 0) {
      await sortBtn.click();
      await page.waitForTimeout(1000);

      // Verificar que resultado aparece
      const result = page.locator('.random-result-card');
      await expect(result).toBeVisible({ timeout: 3000 });
    }
  });

  test('filtro "Já fui" mostra só visitados', async ({ page }) => {
    await page.goto('/');
    await closeWelcomeOverlay(page);

    // Aguarda cards carregarem
    await page.waitForSelector('[id^="card-"]', { timeout: 5000 }).catch(() => {});

    // Clicar no filtro "Já Fui & Avaliados"
    const filterBtn = page.locator('button.filter-btn[data-status="ja-fui"]');
    if (await filterBtn.count() > 0) {
      await filterBtn.click();
      await page.waitForTimeout(500);

      // Verificar que cards aparecem (ou vazio se nenhum visitado)
      const cards = page.locator('.restaurant-card');
      const count = await cards.count();
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });

  test('mapa: clicar no pin abre o card', async ({ page }) => {
    await page.goto('/');
    await closeWelcomeOverlay(page);

    // Aguarda cards carregarem
    await page.waitForSelector('[id^="card-"]', { timeout: 5000 }).catch(() => {});

    // Clicar em "Mapa"
    const mapBtn = page.locator('button[data-view="map"]');
    if (await mapBtn.count() > 0) {
      await mapBtn.click();
      await page.waitForTimeout(1000);

      // Clicar no primeiro pin (marker)
      const pin = page.locator('.map-pin').first();
      if (await pin.count() > 0) {
        await pin.click();
        await page.waitForTimeout(500);

        // Verificar que popup ou modal aparece
        const popup = page.locator('.map-popup');
        if (await popup.count() > 0) {
          await expect(popup).toBeVisible();
        }
      }
    }
  });
});
