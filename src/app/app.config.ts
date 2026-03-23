import {
	ApplicationConfig,
	inject,
	provideAppInitializer,
	provideBrowserGlobalErrorListeners,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { StoreService } from './core/services/store.service/store.service';
import { Global } from './core/services/global/global';
import { IndexedDbService } from './core/services/indexed-db.service/indexed-db.service';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		StoreService,
		Global,
		provideHttpClient(),
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: { hasBackdrop: true },
		},
		provideAppInitializer(() => {
			inject(IndexedDbService).initDb(); // initialize DB before bootstrapping
		}),
	],
};
