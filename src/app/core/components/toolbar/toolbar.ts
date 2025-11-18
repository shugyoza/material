import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { StoreService } from '../../services/store.service/store.service';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-toolbar',
	imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule, RouterLink],
	templateUrl: './toolbar.html',
	styleUrl: './toolbar.scss',
})
export class Toolbar {
	private readonly _storeService = inject(StoreService);

	toggleMenu(): void {
		this._storeService.sidenav.opened.update(({ start, end }) => ({
			start: !start,
			end,
		}));
	}
}
