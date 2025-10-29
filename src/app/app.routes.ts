import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('../app/login/login').then(m => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('../app/register/register').then(m => m.Register)
    },
    {
        path: 'client-search',
        loadComponent: () => import('../app/client-search/client-search').then(m => m.ClientSearch)
    },
    {
        path: 'client-general',
        loadComponent: () => import('../app/client-general/client-general').then(m => m.ClientGeneral)
    },
    {
        path: 'admin',
        loadComponent: () => import('../app/admin/admin').then(m => m.Admin)
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'client-search'
    }
];
