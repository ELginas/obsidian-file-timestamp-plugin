export function getFormattedDate(date: Date): string {
	return (
		date.getFullYear() +
		'-' +
		String(date.getMonth() + 1).padStart(2, '0') +
		'-' +
		String(date.getDate()).padStart(2, '0') +
		' ' +
		String(date.getHours()).padStart(2, '0') +
		'.' +
		String(date.getMinutes()).padStart(2, '0') +
		'.' +
		String(date.getSeconds()).padStart(2, '0')
	);
}

export function joinPath(directory: string, filename: string): string {
	let dir = directory;
	if (directory === '') {
		dir = '/';
	}
	return `${dir}/${filename}`;
}
