import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { SongPlaylistService } from '../pages/song-playlist/services/song-playlist/song-playlist.service';
import { SongPlayListRow } from '../pages/song-playlist/song-playlist.interface';

export const songPlaylistResolver: ResolveFn<SongPlayListRow[]> = () => {
  const songPlaylistService = inject(SongPlaylistService);

  return songPlaylistService.songs$
};
