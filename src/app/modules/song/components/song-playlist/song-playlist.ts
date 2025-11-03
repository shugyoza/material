import { CdkTableModule } from '@angular/cdk/table';
import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { Global } from '../../../../core/services/global/global';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SongPlayingSnackbar } from './song-playing-snackbar/song-playing-snackbar';

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
    MatListModule,
  ],
  templateUrl: './song-playlist.html',
  styleUrl: './song-playlist.scss',
})
export class SongPlaylist {
  private readonly _snackBar = inject(MatSnackBar);

  readonly global = inject(Global);

  readonly songs = signal<SongPlayListRow[]>(SONGS);

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
  
}
