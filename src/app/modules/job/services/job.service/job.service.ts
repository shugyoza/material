import { computed, inject, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	catchError,
	EMPTY,
	from,
	Observable,
	startWith,
	switchMap,
} from 'rxjs';

import { LOCAL_STORAGE } from '../../../../shared/library/services/local-storage/local-storage.token';
import { HttpService } from '../http.service';
import { MyHttpResponse } from '../../../../shared/library/models/my-http-response.model';
import { JobRow } from '../../models/job-row.model';
import { isValidJSON } from '../../../../shared/library/utilities/is-valid-json';
import { IndexedDbService } from '../../../../core/services/indexed-db.service/indexed-db.service';

@Injectable({
	providedIn: 'root',
})
export class JobService {
	private readonly _localStorage = inject(LOCAL_STORAGE);

	private readonly _httpService = inject(HttpService);

	private readonly _indexedDbService = inject(IndexedDbService);

	readonly storeName = 'jobs';

	readonly db = computed<IDBDatabase | null>(() => this._indexedDbService.db());

	readonly online = new FormControl<boolean | null>(false);

	readonly online$ = this.online.valueChanges.pipe(
		startWith(this.online.value)
	);

	jobsResponse$: Observable<MyHttpResponse<JobRow[]> | null> = this.getJobs();

	/** Method that get jobs from remote database or indexedDb depends whether mode is online or not. */
	getJobs(): Observable<MyHttpResponse<JobRow[]> | null> {
		return this.online$.pipe(
			switchMap(online => {
				if (online) {
					return this.fetchJobs();
				}

				return from(this._indexedDbService.fetchData<JobRow[]>(this.storeName));
			}),
			catchError(error => {
				console.error(error);

				return EMPTY;
			})
		);
	}

	/** Method to trigger Http call to get jobs from remote database. */
	fetchJobs(): Observable<MyHttpResponse<JobRow[]>> {
		return this._httpService.fetchJobs();
	}

	getCache(): null | JobRow[] {
		const jobs = this._localStorage.getItem('jobs');

		if (!jobs) {
			return null;
		}

		if (isValidJSON(jobs)) {
			const parsed = JSON.parse(jobs);

			if (Array.isArray(parsed)) {
				return parsed;
			}

			return Object.values(parsed);
		}

		return null;
	}

	setCache(...jobs: JobRow[]) {
		const map = jobs.reduce((acc: Record<number, JobRow>, row) => {
			const key = row.job_id;
			acc[key] = row;

			return acc;
		}, {});

		this._localStorage.setItem('jobs', JSON.stringify(map));
	}
}
