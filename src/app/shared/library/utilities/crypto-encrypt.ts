import * as CryptoJS from 'crypto-js';
import { isString } from '../type-guards/is-string';
import { isPlainObject } from '../type-guards/is-object';

export function encrypt(value: unknown, key: string): string | null {
	if (isString(value)) {
		return CryptoJS.AES.encrypt(value, key).toString();
	}

	if (isPlainObject(value)) {
		const _string = JSON.stringify(value);

		return CryptoJS.AES.encrypt(_string, key).toString();
	}

	return null;
}
