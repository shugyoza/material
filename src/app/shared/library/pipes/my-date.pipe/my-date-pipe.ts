import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
	name: 'myDate',
})
export class MyDatePipe implements PipeTransform {
	private _locale = inject(LOCALE_ID);

	transform(
		value: string,
		options?: { format: string; locale: string }
	): string {
		if (!value) {
			return '';
		}

		const format = options?.format ?? 'yyyy-MMM-dd';
		const locale = options?.locale ?? this._locale;

		return formatDate(value, format, locale);
	}
}
