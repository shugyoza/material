import { isNumber } from './is-number';
import { isString } from './is-string';

export function isPlainObject(value: unknown): value is object {
	const not = {
		null: value !== null,
		array: !Array.isArray(value),
		string: !isString(value),
		number: !isNumber(value),
		date: !(value instanceof Date),
	};

	return (
		not.null &&
		not.array &&
		not.string &&
		not.number &&
		not.date &&
		typeof value === 'object' &&
		value === Object(value)
	);
}
