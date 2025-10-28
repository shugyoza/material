import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login'
    },
    {
        path: 'login',
        loadComponent: () => import('../app/login/login').then(m => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('../app/register/register').then(m => m.Register)
    }
];
