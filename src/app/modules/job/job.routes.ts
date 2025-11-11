import { Routes } from '@angular/router';

export const JOB_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./job').then(m => m.Job),
        children: [
            {
                path: 'job-tracker',
                loadComponent: () => import('./pages/job-tracker/job-tracker').then(m => m.JobTracker),
            },
        ]
    }
]