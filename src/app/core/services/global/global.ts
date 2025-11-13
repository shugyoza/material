import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { map, share, startWith } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class Global {
	private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

	// Create a map to display breakpoint names for demonstration purposes.
	private readonly _displayNameMap = new Map([
		[Breakpoints.XSmall, 'xs'],
		[Breakpoints.Small, 's'],
		[Breakpoints.Medium, 'm'],
		[Breakpoints.Large, 'l'],
		[Breakpoints.XLarge, 'xl'],
	]);

	private readonly _gridColMap = new Map([
		['xs', 4],
		['s', 4],
		['m', 8],
		['l', 12],
		['xl', 12],
	]);

	readonly breakpoint$ = this._breakpointObserver
		.observe([
			Breakpoints.XSmall,
			Breakpoints.Small,
			Breakpoints.Medium,
			Breakpoints.Large,
			Breakpoints.XLarge,
		])
		.pipe(
			startWith({
				matches: true,
				breakpoints: {
					'(max-width: 599.98px)': false,
					'(min-width: 600px) and (max-width: 959.98px)': false,
					'(min-width: 960px) and (max-width: 1279.98px)': false,
					'(min-width: 1280px) and (max-width: 1919.98px)': true,
					'(min-width: 1920px)': false,
				},
			}),
			map(value => {
				const breakpoints = Object.entries(value.breakpoints);
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const [width] = breakpoints
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.filter(([_, value]) => value === true)
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.map(([key, _]) => key);
				const breakpoint = this._displayNameMap.get(width) ?? 'Unknown';

				return breakpoint;
			}),
			share()
		);

	readonly gridCols$ = this.breakpoint$.pipe(
		map(breakpoint => this._gridColMap.get(breakpoint) ?? 0),
		share()
	);
}
