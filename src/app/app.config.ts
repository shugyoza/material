import {
	ApplicationConfig,
	provideBrowserGlobalErrorListeners,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { StoreService } from './core/services/store.service/store.service';
import { Global } from './core/services/global/global';

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
	],
};
