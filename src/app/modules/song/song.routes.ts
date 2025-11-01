import { Routes } from '@angular/router';

export const SONG_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./song/song').then(m => m.Song),
  },
  {
    path: 'song-playlist',
    loadComponent: () =>
      import('./song-playlist/song-playlist').then(m => m.SongPlaylist),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/',
  },
];
