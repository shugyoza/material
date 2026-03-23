import { DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';

import { IndexedDbConfig } from './indexed-db.model';
import { MyHttpResponse } from '../../../shared/library/models/my-http-response.model';

@Injectable({
	providedIn: 'root',
})
export class IndexedDbService {
	private readonly _document = inject(DOCUMENT);

	private readonly _window = this._document.defaultView;

	readonly dbConfig: IndexedDbConfig = {
		name: 'material', // database name
		version: 1,
		stores: {
			jobs: {
				// equal to table name in RDBMS
				name: 'jobs', // store (or table) name
				keyPath: 'job_id', // primary key of row in the table
				columns: [
					{ key: 'job_id', name: 'job_id', options: { unique: true } },
					{
						key: 'job_position',
						name: 'job_position',
						options: { unique: false },
					},
					{ key: 'company', name: 'company', options: { unique: false } },
					{
						key: 'max_salary',
						name: 'max_salary',
						options: { unique: false },
					},
					{
						key: 'job_location',
						name: 'job_location',
						options: { unique: false },
					},
					{
						key: 'application_status',
						name: 'application_status',
						options: { unique: false },
					},
					{ key: 'save_date', name: 'save_date', options: { unique: false } },
					{
						key: 'deadline_date',
						name: 'deadline_date',
						options: { unique: false },
					},
					{
						key: 'applied_date',
						name: 'applied_date',
						options: { unique: false },
					},
					{
						key: 'follow_up_date',
						name: 'follow_up_date',
						options: { unique: false },
					},
					{
						key: 'excitement',
						name: 'excitement',
						options: { unique: false },
					},
					{ key: 'url', name: 'url', options: { unique: false } },
					{
						key: 'description',
						name: 'description',
						options: { unique: false },
					},
				],
			},
		},
	};

	readonly dbOpenRequest = signal<IDBOpenDBRequest | null>(null);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly db = signal<IDBDatabase | null>(null);

	initDb(dbConfig: IndexedDbConfig = this.dbConfig): IDBOpenDBRequest {
		const { name, stores, version } = dbConfig;

		// open the database
		const dbOpenRequest = this._window!.indexedDB.open(name, version);

		// register two event handlers to act on the database being opened successfully, or not
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		dbOpenRequest.onerror = ($event: Event) => {
			console.error(
				'Error initializing database: ',
				($event?.target as IDBOpenDBRequest)?.error
			);
		};

		dbOpenRequest.onsuccess = ($event: Event) => {
			console.log('Database initialized.');

			// store the result of opening the database in the db variable
			const db = ($event?.target as IDBOpenDBRequest).result;
			this.db.set(db);
		};

		dbOpenRequest.onupgradeneeded = ($event: IDBVersionChangeEvent) => {
			this.db.update(db => {
				// store the result of opening the database in the db variable
				db = ($event?.target as IDBOpenDBRequest).result;

				db.onerror = ($event: Event) => {
					console.error(
						'Error initializing database: ',
						($event?.target as IDBOpenDBRequest)?.error
					);
				};

				for (const moduleName in stores) {
					const { name, keyPath } = stores[moduleName];
					const storeNameInDb = db.objectStoreNames.contains(name);

					if (!storeNameInDb) {
						// create a new store (table)
						db.createObjectStore(name, {
							keyPath,
							autoIncrement: true,
						});
					}
				}

				return db;
			});
		};

		this.dbOpenRequest.set(dbOpenRequest);

		return this.dbOpenRequest()!;
	}

	fetchData<ROWS>(storeName: string): Promise<MyHttpResponse<ROWS>> {
		const db = this.db()!;
		console.log({ db });

		return new Promise<MyHttpResponse<ROWS>>((resolve, reject) => {
			// Open our object store and then get a cursor list of all the different data items in the IDB to iterate through
			const transaction = db.transaction(storeName, 'readonly');
			const store = transaction.objectStore(storeName);
			const request = store.getAll();

			request.onsuccess = (): void => {
				const response: MyHttpResponse<ROWS> = {
					status: {
						ok: true,
						code: HttpStatusCode.Ok,
						message: 'success',
					},
					body: {
						count: request.result.length,
						data: request.result as ROWS,
					},
				};

				resolve(response);
			};
			request.onerror = (): void => {
				const response = {
					status: {
						ok: false,
						code: HttpStatusCode.InternalServerError,
						message: 'error',
					},
					error: request.error,
				};

				reject(response);
			};
		});
	}

	/**
	 *
	 * @param storeName the table/store within the database where row will be added
	 * @param row the new row to be added into the table/store in the database
	 */
	addOne<ROW>(
		storeName: string,
		row: ROW
	): null | Promise<MyHttpResponse<{ job_id: IDBValidKey }>> {
		const db = this.db();
		if (!db) {
			return null;
		}

		return new Promise((resolve, reject) => {
			// open a read/write DB transaction, ready for adding the row
			const transaction = db.transaction([storeName], 'readwrite');

			// report on the success of the transaction completing, when everything is done
			transaction.oncomplete = () => {
				console.log('Transaction completed: database modification finished.');
			};

			transaction.onerror = () => {
				console.log(
					`Transaction not opened due to error: ${transaction.error}`
				);
			};

			// call an object store that has been added to the database
			const store: IDBObjectStore = transaction.objectStore(storeName);

			console.log({
				indexNames: store.indexNames,
				keyPath: store.keyPath,
				name: store.name,
				transaction: store.transaction,
				autoIncrement: store.autoIncrement,
			});

			// make a request to add a new row to the store
			const request = store.add(row);

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			request.onsuccess = ($event: Event) => {
				// report the success request
				console.log('addOne request successful.');
				const response: MyHttpResponse<{ job_id: IDBValidKey }> = {
					status: {
						ok: true,
						code: HttpStatusCode.Created,
						message: 'success',
					},
					body: {
						count: 1,
						data: { job_id: request.result },
					},
				};

				resolve(response);
			};

			request.onerror = () => {
				const response = {
					status: {
						ok: false,
						code: HttpStatusCode.InternalServerError,
						message: 'error',
					},
					error: request.error,
				};

				reject(response);
			};
		});
	}

	updateOne<ROW>(storeName: string, row: ROW): Promise<unknown> | null {
		const db = this.db();
		if (!db) {
			return null;
		}

		return new Promise((resolve, reject) => {
			// open a read/write DB transaction, ready for adding the row
			const transaction = db.transaction(storeName, 'readwrite');

			// report on the success of the transaction completing, when everything is done
			transaction.oncomplete = () => {
				console.log('Transaction completed: database modification finished.');
			};

			transaction.onerror = () => {
				console.log(
					`Transaction not opened due to error: ${transaction.error}`
				);
			};

			// call an object store that has been added to the database
			const store: IDBObjectStore = transaction.objectStore(storeName);

			console.log({
				indexNames: store.indexNames,
				keyPath: store.keyPath,
				name: store.name,
				transaction: store.transaction,
				autoIncrement: store.autoIncrement,
			});

			// make a request to update row to the store
			const request = store.put(row);

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			request.onsuccess = ($event: Event) => {
				// report the success request
				console.log('Update one request successful.', request.result);

				return resolve(request.result);
			};

			request.onerror = () => reject(request.error);
		});
	}

	deleteOne<ID>(storeName: string, id: ID) {
		const db = this.db();
		if (!db) {
			return null;
		}

		return new Promise((resolve, reject) => {
			// open a read/write DB transaction, ready for adding the row
			const transaction = db.transaction(storeName, 'readwrite');

			// report on the success of the transaction completing, when everything is done
			transaction.oncomplete = () => {
				console.log('Transaction completed: database modification finished.');
			};

			transaction.onerror = () => {
				console.log(
					`Transaction not opened due to error: ${transaction.error}`
				);
			};

			// call an object store that has been added to the database
			const store: IDBObjectStore = transaction.objectStore(storeName);

			// make a request to update row to the store
			const request = store.delete(id as IDBValidKey);

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			request.onsuccess = ($event: Event) => {
				// report the success request
				console.log('Update one request successful.', request.result);

				return resolve(request.result);
			};

			request.onerror = () => reject(request.error);
		});
	}
}
