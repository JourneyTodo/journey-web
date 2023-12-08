import { describe, it, expect } from 'vitest';
import { getDayToNumber, parseTimestamp, setTitle, titleCase, toPastTense } from './utils';
import { DaysOfWeek } from '../constants/DaysOfWeek.enum';

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

describe('toPastTense tests', () => {
	it('should past tense delete', () => {
		expect(toPastTense('delete')).toBe('deleted');
	});

	it('should past tense add to added', () => {
		expect(toPastTense('add')).toBe('added');
	});
});

describe('parseTimestamp tests', () => {
	it('should return valid number', () => {
		expect(parseTimestamp('05/06/1999')).toBeGreaterThan(-1);
	});

	it('should return -1', () => {
		expect(parseTimestamp('foobar')).toBe(-1);
	});
});

describe('getDayToNumber', () => {
	it('should return a valid enum value', () => {
		expect(getDayToNumber('Monday')).toBe(DaysOfWeek.Monday);
	});
});
