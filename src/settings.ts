import { App, PluginSettingTab, Setting } from 'obsidian';
import FileTimestampPlugin from './main';

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

	getSettingDefinitions() {
		return [
			{
				name: 'Directory',
				desc: 'A destination where newly created file timestamps are saved.',
				control: {
					type: 'folder',
					key: 'directory',
					includeRoot: true,
					placeholder: '/',
				},
			},
		];
	}
}
