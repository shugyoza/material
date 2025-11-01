import { Component, signal } from '@angular/core';

import { TabNavBar } from '../../../shared/library/tab-nav-bar/tab-nav-bar';
import { Tab } from '../../../shared/library/tab-nav-bar/tab.interface';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-song',
  imports: [RouterOutlet, TabNavBar],
  templateUrl: './song.html',
  styleUrl: './song.scss',
})
export class Song {
  readonly tabs = signal<Tab[]>([
    { label: 'Playlist', path: '/song/song-playlist' },
    { label: 'Search', path: '/song-search' },
    { label: 'General', path: '/song-general' },
  ]);
}
