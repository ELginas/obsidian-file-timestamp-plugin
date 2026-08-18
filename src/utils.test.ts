import { expect, test } from 'vitest';
import { getFormattedDate, joinPath } from './utils';

test.for([
	{ input: new Date(2026, 1, 2, 5, 2, 1), expected: '2026-02-02 05.02.01' },
	{
		input: new Date(2026, 7, 18, 14, 51, 31),
		expected: '2026-08-18 14.51.31',
	},
	{
		input: new Date(1999, 0, 1, 0, 0, 0),
		expected: '1999-01-01 00.00.00',
	},
])('getFormattedDate($input) -> $expected', ({ input, expected }) => {
	expect(getFormattedDate(input)).toBe(expected);
});

test.for([
	{ directory: '', filename: '', expected: '' },
	{ directory: '', filename: 'test.md', expected: 'test.md' },
	{ directory: '/', filename: 'test.md', expected: '/test.md' },
	{ directory: 'test', filename: 'test.md', expected: 'test/test.md' },
	{ directory: '/test', filename: 'test.md', expected: '/test/test.md' },
])('joinPath($input) -> $expected', ({ directory, filename, expected }) => {
	expect(joinPath(directory, filename)).toBe(expected);
});
