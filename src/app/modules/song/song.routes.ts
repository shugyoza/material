import { Routes } from '@angular/router';

import { songPlaylistResolver } from './resolvers/song-resolver';

export const SONG_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () => import('./song/song').then(m => m.Song),
		children: [
			{
				path: 'song-playlist',
				loadComponent: () =>
					import('./pages/song-playlist/song-playlist').then(
						m => m.SongPlaylist
					),
				resolve: {
					songs: songPlaylistResolver,
				},
			},
			{
				path: 'song-search',
				loadComponent: () =>
					import('./song-search/song-search').then(m => m.SongSearch),
			},
		],
	},
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: 'song-search',
	},
];
