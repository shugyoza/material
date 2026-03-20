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

	/**
	 * The Object constructor creates an object wrapper for the given value.
	 * If the value is null or undefined, it will create and return an empty object,
	 * otherwise, it will return an object of a type that corresponds to the given value.
	 * If the value is an object already, it will return the value.
	 */
	const isObject = typeof value === 'object' && value === Object(value);

	return (
		not.null && not.array && not.string && not.number && not.date && isObject
	);
}
