import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LOCAL_STORAGE } from './local-storage.token';
import { isValidJSON } from '../../utilities/is-valid-json';

@Injectable({
	providedIn: 'root',
})
export class LocalStorage {
	private readonly _storage = inject(LOCAL_STORAGE);

	get<T>(key: string): T | null {
		const item = this._storage.getItem(key);

		if (!item) {
			return null;
		}

		if (isValidJSON(item)) {
			return JSON.parse(item) as T;
		}

		return item as T;
	}

	set(key: string, value: unknown): void {
		this._storage.setItem(key, JSON.stringify(value));
	}

	remove(...keys: string[]): void {
		keys.forEach(key => {
			this._storage.removeItem(key);
		});
	}

	clear(): void {
		this._storage.clear();
	}
}
