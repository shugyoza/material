import { InjectionToken } from '@angular/core';

export const LOCAL_STORAGE = new InjectionToken<Storage>('Local Storage', {
	providedIn: 'root',
	factory: () => localStorage, // the factory provides the actual localStorage instance in the browser
});
