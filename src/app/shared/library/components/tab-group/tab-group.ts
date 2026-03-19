import { Component, input, output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-tab-group',
	imports: [MatButtonModule, MatBadgeModule],
	templateUrl: './tab-group.html',
	styleUrl: './tab-group.scss',
})
export class TabGroup {
	readonly tabs = input<{ badge?: number; label: string }[]>([]);

	readonly tabClick = output<string>();
}
