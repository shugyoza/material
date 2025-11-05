import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, concatMap, delay, from, map, of, switchMap, tap, timer } from 'rxjs';

import { SongPlayListRow } from '../../song-playlist.interface';

const SONGS: SongPlayListRow[] = [
  { song_id: 1, song_title: 'Intro', song_artist: 'Sevdaliza', duration: 300 },
  { song_id: 2, song_title: 'On My Own', song_artist: 'Sevdaliza', duration: 500 },
  { song_id: 3, song_title: 'Heroina', song_artist: 'La Joaqui, Sevdaliza', duration: 3000 },
  {
    song_id: 4,
    song_title: 'Alibi',
    song_artist: 'Sevdaliza (feat. Pabllo Vittar & Yseult',
    duration: 3000
  },
  {
    song_id: 5,
    song_title: 'Ride or Die, p2',
    song_artist: 'Sevdaliza, Tokischa, Villano Antillano',
    duration: 3000
  },
  { song_id: 6, song_title: 'Messiah', song_artist: 'Sevdaliza', duration: 3000 },
  {
    song_id: 7,
    song_title: 'No Me Cansare',
    song_artist: 'Karol G, Sevdaliza',
    duration: 3000
  },
  { song_id: 8, song_title: 'Stripper', song_artist: 'Kenia OZ, Sevdaliza', duration: 3000 },
  {
    song_id: 9,
    song_title: 'Maria Magdalena',
    song_artist: 'Irmas de Pau, Sevdaliza',
    duration: 3000
  },
  { song_id: 10, song_title: 'Oxytocina', song_artist: 'Sevdaliza', duration: 3000 },
];

@Injectable({
  providedIn: 'root',
})
export class SongPlaylistService {
  readonly audioContext = signal<AudioContext>(new AudioContext());

  readonly audioElement = signal<HTMLAudioElement | null>(null)

  readonly track = computed<MediaElementAudioSourceNode | null>(() => {
    const audioElement = this.audioElement();
    
    if (audioElement) {
      return this.audioContext().createMediaElementSource(audioElement)
    }

    return null;
  })

  readonly toggle = {
    shuffle$: new BehaviorSubject<boolean>(false),
    play$: new BehaviorSubject<boolean>(false),
  }

  readonly songs$ = of<SongPlayListRow[]>(SONGS);

  readonly selectedIndex$ = new BehaviorSubject<number>(0);

  readonly playlist$ = combineLatest([
    this.toggle.shuffle$,
    this.songs$,
    this.selectedIndex$
  ]).pipe(
    map(([
      shuffle,
      songs,
      selectedIndex
    ]) => {
      if (!shuffle) {

        return selectedIndex ? [
        ...songs.slice(selectedIndex), 
        ...songs.slice(0, selectedIndex - 1)
        ] : songs;
      }
      
      const shuffled = [...songs];
      const selectedSong = shuffled.splice(selectedIndex, 1);

      // shuffle _songs using Durstenfeld: optimized from Fisher-Yates (aka Knuth) shuffle algorithm
      for (let i = 0; i < shuffled.length; i++) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        // swap
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]]
      }

      return selectedSong.concat(shuffled);
    }),
  )

  readonly play$ = combineLatest([
    this.toggle.play$,
    this.playlist$
  ]).pipe(
    switchMap(values => {
      const [
        play,
        playlist
      ] = values;

      if (!play) {

        return of(null)
      }

      return from(playlist).pipe(
        concatMap(song => timer(song.duration).pipe(
          map(() => song)
        )
      ))
    }),

  )
}
