import { describe, it, expect } from 'vitest';
import { setTitle, titleCase } from './utils';

describe('titleCase tests', () => {
	it('should title case string', () => {
		expect(titleCase('hello world')).toBe('Hello World');
	});
});

describe('setTitle tests', () => {
	it('should set title', () => {
		expect(setTitle('hello world')).toBe('hello world – Journey');
	});
});
