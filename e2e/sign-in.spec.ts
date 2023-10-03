import { expect, test } from '@playwright/test';

test('index redirect to sign in when no session', async ({ page }) => {
	await page.goto('/');
	await page.waitForURL('**/signin');
	expect(page.url().split('/').pop()).toBe('signin');
});

test('sign in page has form', async ({ page }) => {
	await page.goto('/signin');
	expect(await page.isVisible('form')).toBeTruthy();
	expect(await page.isVisible('input[name="email"]')).toBeTruthy();
	expect(await page.isVisible('input[name="password"]')).toBeTruthy();
	expect(await page.getByTestId('signin-btn').isVisible()).toBeTruthy();
});

test('form requires valid username & email', async ({ page }) => {
	await page.goto('/signin');
	await page.fill('input[name="email"]', 'invalid@invalid.com');
	await page.fill('input[name="password"]', 'invalid123');
	await page.getByTestId('signin-btn').click();

	await page.waitForTimeout(500);

	expect(await page.locator('.form-error').isVisible()).toBeTruthy();
});
