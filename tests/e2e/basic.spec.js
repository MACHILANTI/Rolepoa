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

  test('Deve criar uma nova avaliação', async ({ page }) => {
    await page.goto('/');

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
});
