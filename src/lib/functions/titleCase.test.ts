import { describe, it, expect } from 'vitest';
import { titleCase } from './titleCase';

describe('titleCase tests', () => {
	it('should title case string', () => {
		expect(titleCase('hello world')).toBe('Hello World');
	});
});
