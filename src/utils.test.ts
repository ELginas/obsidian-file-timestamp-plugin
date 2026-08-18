import { expect, test } from 'vitest';
import { getFormattedDate, joinPath, validateFolderStr } from './utils';

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
	{ directory: 'test/', filename: 'test.md', expected: 'test/test.md' },
	{ directory: '/test', filename: 'test.md', expected: '/test/test.md' },
	{ directory: '/test/', filename: 'test.md', expected: '/test/test.md' },
	{ directory: '/a/b', filename: 'test.md', expected: '/a/b/test.md' },
	{ directory: '/a/b/', filename: 'test.md', expected: '/a/b/test.md' },
])(
	'joinPath($directory, $filename) -> $expected',
	({ directory, filename, expected }) => {
		expect(joinPath(directory, filename)).toBe(expected);
	},
);

test.for([
	{ input: '', expected: undefined },
	{ input: '/', expected: undefined },
	{ input: 'a', expected: undefined },
	{ input: 'a/', expected: 'Folder cannot end with "/"' },
	{ input: '/a', expected: 'Folder cannot start with "/"' },
	{ input: '/a/', expected: 'Folder cannot start with "/"' },
	{ input: 'a/b', expected: undefined },
	{ input: 'a//b', expected: 'Folder part cannot be empty' },
	{ input: '/a//b', expected: 'Folder cannot start with "/"' },
])('validateFolderStr($input) -> $expected', ({ input, expected }) => {
	expect(validateFolderStr(input)).toBe(expected);
});
