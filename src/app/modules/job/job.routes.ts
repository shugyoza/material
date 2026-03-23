import { Routes } from '@angular/router';

export const JOB_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () => import('./job.component').then(m => m.JobComponent),
		children: [
			{
				path: 'job-tracker',
				loadComponent: () =>
					import('./pages/job-tracker/job-tracker').then(m => m.JobTracker),
			},
		],
	},
];
