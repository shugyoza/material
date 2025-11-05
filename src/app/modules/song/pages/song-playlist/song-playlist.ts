import { CdkTableModule } from '@angular/cdk/table';
import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CdkMenu, CdkMenuTrigger } from '@angular/cdk/menu';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { map, of, startWith, switchMap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

import { Global } from '../../../../core/services/global/global';
import { SongPlayingSnackbar } from './components/song-playing-snackbar/song-playing-snackbar';
import { MatTooltip } from "@angular/material/tooltip";

interface SongPlayListRow {
  song_id: number;
  song_title: string;
  song_artist: string;
  song_waveform?: unknown;
  song_album?: string;
  song_resource_url?: string;
  song_cover_art_url?: string;
}

const SONGS: SongPlayListRow[] = [
  { song_id: 1, song_title: 'Intro', song_artist: 'Sevdaliza' },
  { song_id: 2, song_title: 'On My Own', song_artist: 'Sevdaliza' },
  { song_id: 3, song_title: 'Heroina', song_artist: 'La Joaqui, Sevdaliza' },
  {
    song_id: 4,
    song_title: 'Alibi',
    song_artist: 'Sevdaliza (feat. Pabllo Vittar & Yseult',
  },
  {
    song_id: 5,
    song_title: 'Ride or Die, p2',
    song_artist: 'Sevdaliza, Tokischa, Villano Antillano',
  },
  { song_id: 6, song_title: 'Messiah', song_artist: 'Sevdaliza' },
  {
    song_id: 7,
    song_title: 'No Me Cansare',
    song_artist: 'Karol G, Sevdaliza',
  },
  { song_id: 8, song_title: 'Stripper', song_artist: 'Kenia OZ, Sevdaliza' },
  {
    song_id: 9,
    song_title: 'Maria Magdalena',
    song_artist: 'Irmas de Pau, Sevdaliza',
  },
  { song_id: 10, song_title: 'Oxytocina', song_artist: 'Sevdaliza' },
];

@Component({
  selector: 'app-song-playlist',
  imports: [
    CdkTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    ReactiveFormsModule,
    CdkMenu,
    CdkMenuTrigger,
    AsyncPipe,
    MatTooltip
],
  templateUrl: './song-playlist.html',
  styleUrl: './song-playlist.scss',
})
export class SongPlaylist {
  private readonly _snackBar = inject(MatSnackBar);

  readonly global = inject(Global);

  readonly search = new FormControl<null | string>(null)
  
  readonly toggle = {
    shuffle: signal<boolean>(false),
    play: signal<boolean>(false)
  }

  readonly songs$ = of<SongPlayListRow[]>(SONGS);

  readonly filteredSongs$ = this.search.valueChanges.pipe(
    startWith(null),
    switchMap(value => this.songs$.pipe(
      map(songs => {
        if (value) {

          return songs.filter(song => {
            const filterText = value.toLowerCase();

            return song.song_title.toLowerCase().includes(filterText) || song.song_artist.toLowerCase().includes(filterText)
          })
        }

        return songs;
      })
    )
  ))

  readonly selectedSong = signal<SongPlayListRow | null>(null);

  readonly columns = signal<string[]>([
    'song_cover_art_url',
    'song_title',
    'menu',
  ]);

  readonly snackBarPosition = signal<{ horizontalPosition: MatSnackBarHorizontalPosition; verticalPosition: MatSnackBarVerticalPosition }>({
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  });

  readonly playlistRowMenu = signal<{ icon: string; title: string }[]>([
    {
      icon: 'delete',
      title: 'Delete from Library'
    },
    {
      icon: 'download',
      title: 'Download'
    },
    {
      icon: 'playlist_add',
      title: 'Add to Playlist...'
    },
    { 
      icon: 'queue_play_next',
      title: 'Play Next'
    },
    { 
      icon: 'ios_share',
      title: 'Share Song...'
    },
    { 
      icon: 'album',
      title: 'Go to Album'
    },
    { 
      icon: 'star',
      title: 'Favorite'
    },
    { 
      icon: 'thumb_down',
      title: 'Suggest Less'
    }
  ]);

  constructor() {
    effect(() => {
      if (this.selectedSong()) {
        this._snackBar.openFromComponent(SongPlayingSnackbar, { 
          data: {
            song_title: this.selectedSong()?.song_title }
          })
      } else {
        this._snackBar.dismiss()
      }
    })
  }
  
  onSongClick(song: SongPlayListRow): void {
    this.selectedSong.set(song);
  }

  onPlay(): void {}
}
