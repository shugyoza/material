import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LocalStorage {
	private readonly localStorage = inject(DOCUMENT).defaultView?.localStorage;

	get<T>(key: string): T | null {
		const value = this.localStorage?.getItem(key);

		if (!value) {
			return null;
		}

		const isValidJSON = this.isValidJSON(value);

		if (!isValidJSON) {
			return null;
		}

		return JSON.parse(value);
	}

	set(key: string, value: unknown): void {
		this.localStorage?.setItem(key, JSON.stringify(value));
	}

	remove(key: string): void {
		this.localStorage?.removeItem(key);
	}

	removeKeys(keys: string[]): void {
		keys.forEach(key => this.remove(key));
	}

	clear(): void {
		this.localStorage?.clear();
	}

	private isValidJSON(value: string): boolean {
		try {
			JSON.parse(value);

			return true;
		} catch {
			return false;
		}
	}
}
