import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TabNavBar } from '../../shared/library/tab-nav-bar/tab-nav-bar';
import { Tab } from '../../shared/library/tab-nav-bar/tab.interface';

@Component({
	selector: 'app-job',
	imports: [TabNavBar, RouterOutlet],
	templateUrl: './job.html',
	styleUrl: './job.scss',
})
export class Job {
	readonly tabs = signal<Tab[]>([
		{ label: 'Job Tracker', path: '/job/job-tracker' },
	]);
}
