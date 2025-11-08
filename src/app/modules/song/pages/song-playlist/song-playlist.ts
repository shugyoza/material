import { CdkTableModule } from '@angular/cdk/table';
import { AfterViewInit, Component, computed, ElementRef, HostListener, inject, OnDestroy, signal, TemplateRef, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CdkMenu, CdkMenuTrigger } from '@angular/cdk/menu';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { interval, map, of, startWith, switchMap, takeWhile, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSliderModule } from '@angular/material/slider';

import { Global } from '../../../../core/services/global/global';
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
    MatTooltipModule,
    MatSliderModule,
  ],
  providers: [SongPlaylistService],
  templateUrl: './song-playlist.html',
  styleUrl: './song-playlist.scss',
})
export class SongPlaylist implements AfterViewInit, OnDestroy {
  private readonly _snackBar = inject(MatSnackBar);

  readonly global = inject(Global);

  readonly playlistService = inject(SongPlaylistService);

  readonly audioElement = viewChild<ElementRef<HTMLMediaElement>>('audioRef');

  readonly audioTemplate = viewChild<TemplateRef<unknown>>('audioTemplate');

  readonly search = new FormControl<null | string>(null);
  
  readonly filteredSongs$ = this.search.valueChanges.pipe(
    startWith(null),
    switchMap(value => this.playlistService.songs$.pipe(
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

  readonly shuffle = computed<boolean>(() => this.playlistService.shuffle());

  readonly paused = signal<boolean>(true);

  progress$ = of(0);
  
  readonly dimension = signal({
    height: '0px',
    width: '0px'
  });
  
  ngAfterViewInit(): void {
    this._snackBar.openFromTemplate(this.audioTemplate()!, { });
  }

  ngOnDestroy(): void {
    this._snackBar.dismiss();
  }
  
  onSongClick(song: SongPlayListRow, songs: SongPlayListRow[] | null): void {
    if (!songs?.length || !song) {

      return;
    }

    const playlist = this.playlistService;
    const selectedIndex = songs.findIndex(({ song_id }) => song_id === song.song_id);

    const audio = this.audioElement()!.nativeElement;

    playlist.currentIndex$.next(selectedIndex);

    audio.play().then(() => {

      this.setProgress();
      this.paused.set(false);

    }).catch(error => {
      console.log(150, error)
    })
  }

  onPlay(audio = this.audioElement()!.nativeElement): void {

    if (audio.paused) {
      audio.play().then(() => {
        this.setProgress();
        this.paused.set(false);
      });
    
      return;
    }

      audio.pause();
      this.paused.set(true);
  }

  onEnded(currentIndex: number, songs: SongPlayListRow[]): void {
    const shuffle = this.shuffle();
    const maxIndex = songs.length - 1;

    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * maxIndex)
      console.log(169, randomIndex);

      return;
    }

    const audio = this.audioElement()!.nativeElement;

    this.progress$ = of(0);

    const nextIndex = (currentIndex + 1) % songs.length;
    this.playlistService.currentIndex$.next(nextIndex);

    audio.pause();
    this.paused.set(true);

    audio.play().then(() => {

      this.setProgress();
      this.paused.set(false);

    }).catch(() => {
      // retry playing
      this.onPlay()
    })
  }

  onReplay10(seconds: number = 10): void {
    const audio = this.audioElement()?.nativeElement;

    if (audio) {
      audio.currentTime -= seconds;
    }
  }


  onFastForward(seconds: number = 10): void {
    const audio = this.audioElement()?.nativeElement;

    if (audio) {
      audio.currentTime += seconds;
    }
  }
  
  onMute(): void {
    const audio = this.audioElement()?.nativeElement;

    if (audio) {      
      const volume = audio.volume;
      audio.volume = [1, 0][volume];
    }
  }

  formatVolumeSliderLabel(value: number): string {
    return (value * 100).toString();
  }

  setProgress(): void {
    const audio = this.audioElement()!.nativeElement!;

    if (audio.paused) {
      this.progress$ = of(audio.currentTime);
    }

    const sec = 1000;
    this.progress$ = interval(sec).pipe(
      startWith(Math.round(audio.currentTime)),
      takeWhile(() => audio.duration - audio.currentTime >= audio.played.length),
      map(() => Math.round(audio.currentTime)),
    )
  }

  onProgressChange(currentTime: number) {
    const audio = this.audioElement()!.nativeElement!;

    audio.currentTime = currentTime;
    this.setProgress();
  } 

  @HostListener('window:resize', ['$event'])
  onResize($event: Event) {
    console.log(262, event)
  }
}
