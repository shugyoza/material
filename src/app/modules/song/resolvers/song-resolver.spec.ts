import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { songPlaylistResolver } from './song-resolver';
import { SongPlayListRow } from '../pages/song-playlist/song-playlist.interface';

describe('songPlaylistResolver', () => {
  const executeResolver: ResolveFn<SongPlayListRow[]> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      songPlaylistResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
