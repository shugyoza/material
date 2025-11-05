import { Routes } from '@angular/router';

export const SONG_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./song/song').then(m => m.Song),
    children: [
      {
        path: 'song-playlist',
        loadComponent: () =>
        import('./pages/song-playlist/song-playlist').then(m => m.SongPlaylist),
      },
      { 
        path: 'song-search',
        loadComponent: () => import('./song-search/song-search').then(m => m.SongSearch)
      },
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'song-search',
  },
];
