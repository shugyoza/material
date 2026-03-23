import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AsyncPipe } from '@angular/common';

import { JobService } from './services/job.service/job.service';
import { TabNavBar } from '../../shared/library/tab-nav-bar/tab-nav-bar';
import { Tab } from '../../shared/library/tab-nav-bar/tab.interface';

@Component({
	selector: 'app-job',
	imports: [
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		AsyncPipe,
		TabNavBar,
		RouterOutlet,
	],
	templateUrl: './job.component.html',
	styleUrl: './job.component.scss',
})
export class JobComponent {
	private readonly _jobService = inject(JobService);

	readonly online$ = this._jobService.online$;

	readonly tabs = signal<Tab[]>([
		{ label: 'Job Tracker', path: '/job/job-tracker' },
	]);

	toggleDbConnection(): void {
		const online = this._jobService.online.value;

		this._jobService.online.setValue(!online);
	}
}
