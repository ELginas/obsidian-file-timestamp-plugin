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

// This function does not validate that the directory or filename are valid.
export function joinPath(directory: string, filename: string): string {
	if (directory === '') {
		return filename;
	}
	if (directory === '/') {
		return `/${filename}`;
	}

	let dir = directory;
	if (dir.endsWith('/')) {
		dir = dir.substring(0, dir.length - 1);
	}
	return `${dir}/${filename}`;
}

export function validateFolderStr(folder: string): string | undefined {
	if (folder === '/') {
		return;
	}
	if (folder.startsWith('/')) {
		return 'Folder cannot start with "/"';
	}
	if (folder.endsWith('/')) {
		return 'Folder cannot end with "/"';
	}

	const parts = folder.split('/');
	for (let i = 0; i < parts.length; i++) {
		const part = parts[i]!;
		if (part.length === 0 && i === 0) {
			continue;
		}
		if (part.length === 0) {
			return 'Folder part cannot be empty';
		}
	}
	return;
}

export function validateFolderException(folder: string) {
	const error = validateFolderStr(folder);
	if (error !== undefined) {
		throw new Error(error);
	}
}

export function validatedFolder(folder: string): string {
	let newFolder = folder;
	newFolder = newFolder.trim();
	if (newFolder === '') {
		newFolder = '/';
	}

	validateFolderException(folder);
	return newFolder;
}
