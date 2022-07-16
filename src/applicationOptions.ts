type StorageType = 'sync' | 'local';


class ApplicationsOptions {
	name: string;
	properties: Options;
	storageType: StorageType

	constructor(
		{
			name = 'applicationOptions',
			defaults = {},
			storageType = 'local',
		}
	) {
		this.name = name;
		this.properties = defaults as Options;
		this.storageType = storageType as StorageType;
		this.setAll(this.properties)
	}

	get storage(): chrome.storage.StorageArea {
		return chrome.storage[this.storageType];
	}

	async getAll(): Promise<Options> {
		return await this.storage.get(this.name);
	}

	async setAll(options: Options): Promise<void> {
		this.migrate(options)
		await this.storage.set({ [this.name]: this.properties })
	}

	migrate(options: Options) {
		this.properties = this._mergeDeep(this.properties, options)
	}

	_isObject(item: { [x: string]: any; }) {
		return (item && typeof item === 'object' && !Array.isArray(item));
	}

	_mergeDeep(target: { [x: string]: any; }, source: { [x: string]: any; }) {
		let results = Object.assign({}, target);
		if (this._isObject(target) && this._isObject(source)) {
			Object.keys(source).forEach(key => {
				if (this._isObject(source[key])) {
					if (!(key in target))
						Object.assign(results, { [key]: source[key] });
					else
						results[key] = this._mergeDeep(target[key], source[key]);
				} else {
					Object.assign(results, { [key]: source[key] });
				}
			});
		}
		return results;
	}
}


export default ApplicationsOptions;