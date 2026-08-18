import { Notice, Plugin } from 'obsidian';
import {
	DEFAULT_SETTINGS,
	FileTimestampSettings,
	FileTimestampSettingTab,
} from './settings';
import { getFormattedDate, joinPath, validatedFolder } from './utils';

export default class FileTimestampPlugin extends Plugin {
	settings!: FileTimestampSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: 'create-file-timestamp',
			name: 'Create new file with timestamp',
			callback: async () => this.actionCreateNewFileTimestamp(),
		});

		this.addRibbonIcon(
			'dice',
			'Create new file with timestamp',
			async (_evt: MouseEvent) => this.actionCreateNewFileTimestamp(),
		);

		this.addSettingTab(new FileTimestampSettingTab(this.app, this));
	}

	onunload() {}

	async actionCreateNewFileTimestamp() {
		try {
			await this.createNewFileTimestamp();
		} catch (error) {
			console.error(error);
			new Notice(error);
		}
	}

	async createNewFileTimestamp() {
		const date = new Date();
		const formattedDate = getFormattedDate(date);
		const filename = `${formattedDate}.md`;

		let directory = validatedFolder(this.settings.directory);
		if (!this.app.vault.getFolderByPath(directory)) {
			await this.app.vault.createFolder(directory);
		}

		const filepath = joinPath(directory, filename);
		const file = await this.app.vault.create(filepath, '');

		const leaf = this.app.workspace.getLeaf();
		await leaf.openFile(file);
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<FileTimestampSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
