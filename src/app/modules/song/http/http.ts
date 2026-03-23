import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SongPlayListRow } from '../pages/song-playlist/song-playlist.interface';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'any',
})
export class Http {
	private readonly _http = inject(HttpClient);

	getSongs(): Observable<SongPlayListRow[]> {
		return this._http.get<SongPlayListRow[]>('mock/songs.json');
	}

	getTodos() {
		const response$ = this._http.get('api/dev/todos');

		return response$;
	}
}
