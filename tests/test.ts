import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:4173';

test('index redirect to signin when no session', async ({ page }) => {
	await page.goto('/');
	await page.waitForURL('**/signin');
	expect(page.url()).toBe(baseUrl + '/signin');
});
