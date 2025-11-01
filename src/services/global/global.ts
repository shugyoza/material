import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { map, share } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Global {
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  // Create a map to display breakpoint names for demonstration purposes.
  private readonly _displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  private readonly _gridColMap = new Map([
    ['XSmall', 4],
    ['Small', 4],
    ['Medium', 8],
    ['Large', 12],
    ['XLarge', 12],
  ]);


  readonly breakpoint$ = this._breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
  ]).pipe(
    map(value => {
      const breakpoints = Object.entries(value.breakpoints);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [width] = breakpoints.filter(([_, value]) => value === true).map(([key, _]) => key);
      const breakpoint = this._displayNameMap.get(width) ?? 'Unknown';

      console.log(42, breakpoints, breakpoint)
      return breakpoint;
    }),
    share()
  )

  readonly gridCols$ = this.breakpoint$.pipe(map(breakpoint => this._gridColMap.get(breakpoint) ?? 0), share())
}
