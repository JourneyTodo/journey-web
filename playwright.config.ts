import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'e2e',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	use: {
		baseURL: 'http://localhost:4173'
	},
	projects: [
		{
			name: 'setup',
			testMatch: 'e2e/auth-setup.spec.ts'
		},
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				storageState: 'e2e/.auth/storageState.json'
			},
			dependencies: ['setup']
		},
		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox'],
				storageState: 'e2e/.auth/storageState.json'
			},
			dependencies: ['setup']
		},
		{
			name: 'safari',
			use: {
				...devices['Desktop Safari'],
				storageState: 'e2e/.auth/storageState.json'
			}
		}
	]
};

export default config;
