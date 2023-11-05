import { describe, it, expect } from 'vitest';
import { setTitle, titleCase, toPastTense } from './utils';

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

describe('toPastTens tests', () => {
	it('should past tense delete', () => {
		expect(toPastTense('delete')).toBe('deleted');
	});

	it('should past tense add to added', () => {
		expect(toPastTense('add')).toBe('added');
	});
});
