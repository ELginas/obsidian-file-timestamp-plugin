import { App, PluginSettingTab, SettingDefinitionItem } from 'obsidian';
import FileTimestampPlugin from './main';
import { validateFolderStr } from './utils';

export interface FileTimestampSettings {
	directory: string;
}

export const DEFAULT_SETTINGS: FileTimestampSettings = {
	directory: '',
};

export class FileTimestampSettingTab extends PluginSettingTab {
	plugin: FileTimestampPlugin;

	constructor(app: App, plugin: FileTimestampPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	getSettingDefinitions(): SettingDefinitionItem<string>[] {
		return [
			{
				name: 'Directory',
				desc: 'A destination where newly created file timestamps are saved.',
				control: {
					type: 'folder',
					key: 'directory',
					includeRoot: true,
					placeholder: '/',
					validate: (value: string) => validateFolderStr(value),
				},
			},
		];
	}
}
