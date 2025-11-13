import { inject, Injectable, signal } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";

import { SongPlayListRow } from "../../song-playlist.interface";
import { Http } from "../../../../http/http";

const SONGS: SongPlayListRow[] = [
	{
		song_id: 1,
		song_title: "Sample - Type - Rap Beat",
		song_artist: "Aliabbas Abasov",
		song_duration: 221000, // 3.41,
		song_url: "mock/sample-type-rap-beat-lucky-night-193659.mp3",
	},
	{
		song_id: 2,
		song_title: "Old Party",
		song_artist: "Geronic",
		song_duration: 500,
		song_url: "mock/old-party-425839.mp3",
	},
	{
		song_id: 3,
		song_title: "Rick Ross x Nas - Type - Sample Beat - 2024",
		song_artist: "5XBeats",
		song_duration: 3000,
		song_url: "mock/rick-ross-x-nas-type-sample-beat-2024-193647.mp3",
	},
	{
		song_id: 4,
		song_title: "Beautiful Loop",
		song_artist: "Davejf",
		song_duration: 3000,
		song_url: "mock/beautiful-loop-253269.mp3",
	},
	{
		song_id: 5,
		song_title: "Flute Melody",
		song_artist: "Adinkra_Audio",
		song_duration: 3000,
		song_url: "mock/flute-melody-315241.mp3",
	},
	{
		song_id: 6,
		song_title: "Ocean Breeze Beat by JTWAYNE",
		song_artist: "JTWAYNE",
		song_duration: 3000,
		song_url: "mock/ocean-breeze-beat-by-jtwayne-213318.mp3",
	},
];

@Injectable({
	providedIn: "root",
})
export class SongPlaylistService {
	private readonly _http = inject(Http);

	readonly shuffle = signal<boolean>(false);

	readonly songs$ = this._http.getSongs(); // of<SongPlayListRow[]>(SONGS);

	readonly currentIndex$ = new BehaviorSubject<number>(0);
}
