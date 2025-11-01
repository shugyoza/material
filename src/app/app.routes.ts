import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./core/components/login/login').then(m => m.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./core/components/register/register').then(m => m.Register),
  },
  {
    path: 'client-search',
    loadComponent: () =>
      import('./modules/client/client-search/client-search').then(
        m => m.ClientSearch
      ),
  },
  {
    path: 'client-general',
    loadComponent: () =>
      import('./modules/client/client-general/client-general').then(
        m => m.ClientGeneral
      ),
  },
  {
    path: 'admin',
    loadComponent: () => import('./modules/admin/admin').then(m => m.Admin),
  },
  {
    path: 'song',
    loadChildren: () =>
      import('./modules/song/song.routes').then(m => m.SONG_ROUTES),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/login',
  },
];
