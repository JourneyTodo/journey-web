import { expect, test } from '@playwright/test';

test('create account link on sign in page', async ({ page }) => {
	await page.goto('/signin');

	expect(await page.locator('a[href="/register"]').isVisible()).toBeTruthy();
});

test('register page has form', async ({ page }) => {
	await page.goto('/register');

	expect(await page.isVisible('form')).toBeTruthy();
	expect(await page.isVisible('input[name="name"]')).toBeTruthy();
	expect(await page.isVisible('input[name="email"]')).toBeTruthy();
	expect(await page.isVisible('input[name="password"]')).toBeTruthy();
	expect(await page.getByTestId('register-btn').isVisible()).toBeTruthy();
});
