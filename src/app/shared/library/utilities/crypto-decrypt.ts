import * as CryptoJS from 'crypto-js';

import { isString } from '../type-guards/is-string';
import { isValidJSON } from './is-valid-json';

export function decrypt(cipherText: string, key: string): string | null {
	if (!isString(cipherText)) {
		return null;
	}

	const bytes = CryptoJS.AES.decrypt(cipherText, key);
	const decrypted = bytes.toString(CryptoJS.enc.Utf8);

	if (isValidJSON(decrypted)) {
		return JSON.parse(decrypted);
	}

	return null;
}
