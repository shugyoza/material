import { CdkTableModule } from '@angular/cdk/table';
import { Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CdkMenu, CdkMenuTrigger } from '@angular/cdk/menu';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { map, startWith, switchMap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTooltip } from "@angular/material/tooltip";

import { Global } from '../../../../core/services/global/global';
import { SongPlayingSnackbar } from './components/song-playing-snackbar/song-playing-snackbar';
import { SongPlaylistService } from './services/song-playlist/song-playlist.service';
import { SongPlayListRow } from './song-playlist.interface';

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
  providers: [SongPlaylistService],
  templateUrl: './song-playlist.html',
  styleUrl: './song-playlist.scss',
})
export class SongPlaylist {
  private readonly _snackBar = inject(MatSnackBar);

  readonly global = inject(Global);

  readonly songPlaylistService = inject(SongPlaylistService)

  readonly audioPlayer = viewChild<ElementRef<HTMLMediaElement>>('audioPlayerRef')

  readonly search = new FormControl<null | string>(null);
  
  readonly filteredSongs$ = this.search.valueChanges.pipe(
    startWith(null),
    switchMap(value => this.songPlaylistService.songs$.pipe(
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

  readonly audioContext = signal<AudioContext>(new AudioContext());

  readonly track = computed(() => this.audioContext().createMediaElementSource(this.audioPlayer()!.nativeElement))

  constructor() {
    effect(() => {
      if (this.selectedSong()) {
        this._snackBar.openFromComponent(SongPlayingSnackbar, { 
          data: {
            song_title: this.selectedSong()?.song_title,
            song_url: this.selectedSong()?.song_resource_url
          }
          })
      } else {
        this._snackBar.dismiss()
      }
    });

    effect(() => {
      const audioPlayer = this.audioPlayer();
      if (audioPlayer) {
        this.songPlaylistService.audioElement.set(audioPlayer.nativeElement)
      }
    });
  }
  
  onSongClick(song: SongPlayListRow): void {
    this.selectedSong.set(song);
  }

  onPlay(): void {}
}
