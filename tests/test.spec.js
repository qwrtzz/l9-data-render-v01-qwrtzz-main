// @ts-check

import { test, expect } from '@playwright/test';

test('step1', async ({ page }) => {
  await page.goto('http://localhost:8070', {
    waitUntil: 'domcontentloaded',
  });
  await expect(page.getByRole('table')).toBeVisible();
  await expect(page.getByRole('cell', { name: 'id' })).toBeVisible();
  const headerTdCount = await page.locator('thead').locator('td').count();
  await expect(headerTdCount).toBe(6);
});

test('step2', async ({ page }) => {
  await page.goto('http://localhost:8070', {
    waitUntil: 'domcontentloaded',
  });
  await expect(page.getByRole('cell', { name: 'Анна Смирнова' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '+7 (999) 567-89-01' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '2023-05-25T08:00:00Z' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'ivan.ivanov@example.com' })).toBeVisible();
  const headerTdCount = await page.locator('tbody').locator('tr').count();
  const firstRowCell = await page.locator('tbody').locator('tr').locator('td').first()
    .innerText();
  await expect(headerTdCount).toBe(5);
  await expect(firstRowCell).toBe('4');
});

test('step3', async ({ page }) => {
  await page.goto('http://localhost:8070', {
    waitUntil: 'domcontentloaded',
  });
  await expect(page.getByRole('button', { name: 'Sort' })).toBeVisible();
});

test('step4', async ({ page }) => {
  await page.goto('http://localhost:8070', {
    waitUntil: 'domcontentloaded',
  });
  const sortBtn = await page.getByRole('button', { name: 'Sort' });
  await sortBtn.click();
  const firstRowCell = await page.locator('tbody').locator('tr').locator('td').first()
    .innerText();
  await expect(firstRowCell).toBe('3');
  await sortBtn.click();
  const firstRowCellClicked = await page.locator('tbody').locator('tr').locator('td').first()
    .innerText();
  await expect(firstRowCellClicked).toBe('4');
});
