// taken from: https://timdeschryver.dev/blog/revamped-authentication-with-playwright#configuration-update

import { test } from '@playwright/test';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

// we don't want to store credentials in the repository
dotenv.config({
	path: './e2e/.env.local'
});

const storageState = 'e2e/.auth/storageState.json';

test('authenticate user', async ({ page }) => {
	if (process.env.email === '**REMOVED**') {
		throw new Error('Env file is not correct');
	}

	const stats = fs.existsSync(storageState!.toString())
		? fs.statSync(storageState!.toString())
		: null;
	if (stats && stats.mtimeMs > new Date().getTime() - 600000) {
		console.log(`\x1b[2m\tSign in skipped because token is fresh\x1b[0m`);
		return;
	}

	console.log(`\x1b[2m\tSign in started\x1b[0m`);

	// when we're not authenticated, the app redirects to the login page
	await page.goto('/signin');

	console.log(`\x1b[2m\tSign in as '${process.env.email}'\x1b[0m`);

	await page.getByRole('textbox', { name: /email/i }).fill(process.env.email as string);
	await page.getByRole('textbox', { name: /password/i }).fill(process.env.password as string);

	console.log(`\x1b[2m\tSign in processing\x1b[0m`);

	await page.getByTestId('signin-btn').click();

	console.log(`\x1b[2m\tSign in processed\x1b[0m`);

	await page.context().storageState({ path: storageState });
});
