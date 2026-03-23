import { CdkTableModule } from '@angular/cdk/table';
import {
	AfterViewInit,
	Component,
	computed,
	inject,
	signal,
	viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { HttpStatusCode } from '@angular/common/http';

import { MyDatePipe } from '../../../../shared/library/pipes/my-date.pipe/my-date-pipe';
import { TabGroup } from '../../../../shared/library/components/tab-group/tab-group';
import { JobRow } from '../../models/job-row.model';
import { JobService } from '../../services/job.service/job.service';
import { AddNewJob } from './components/add-new-job/add-new-job';
import { MyDialog } from '../../../../core/services/dialog/dialog';
import { IndexedDbService } from '../../../../core/services/indexed-db.service/indexed-db.service';

@Component({
	selector: 'app-job-tracker',
	imports: [
		CdkTableModule,
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatListModule,
		MatSortModule,
		CdkMenuModule,
		MatCheckboxModule,
		MatSelectModule,
		MyDatePipe,
		TabGroup,
		CdkDropList,
		CdkDrag,
	],
	templateUrl: './job-tracker.html',
	styleUrl: './job-tracker.scss',
})
export class JobTracker implements AfterViewInit {
	private readonly _indexedDbService = inject(IndexedDbService);

	private readonly _jobService = inject(JobService);

	private readonly _dialogService = inject(MyDialog);

	readonly sort = viewChild(MatSort);

	readonly sortedBy = signal<Sort>({
		active: 'job_id',
		direction: 'desc',
	});

	readonly db = computed(() => this._indexedDbService.db());

	readonly online = this._jobService.online;

	readonly edit = signal<boolean>(false);

	readonly stars = signal<(0 | 0.5 | 1)[]>([0, 0, 0, 0, 0]);

	readonly dataSource = new MatTableDataSource<JobRow>();

	jobs$: Observable<JobRow[]> = this._getJobs();

	readonly optionalColumns = signal([
		{ key: 'min_salary', label: 'Min. Salary', selected: false },
		{ key: 'max_salary', label: 'Max. Salary', selected: true },
		{ key: 'job_location', label: 'Location', selected: true },
		{ key: 'application_status', label: 'Status', selected: true },
		{ key: 'posted_date', label: 'Date Posted', selected: false },
		{ key: 'save_date', label: 'Date Saved', selected: true },
		{ key: 'deadline_date', label: 'Deadline', selected: true },
		{ key: 'applied_date', label: 'Date Applied', selected: true },
		{ key: 'follow_up_date', label: 'Follow up', selected: true },
		{ key: 'excitement', label: 'Excitement', selected: true },
	]);

	readonly columns = computed<string[]>(() => {
		const optionalColumns = this.optionalColumns()
			.filter(column => column.selected)
			.map(column => column.key);

		return ['job_position', 'company'].concat(optionalColumns);
	});

	readonly stepLabels$ = this.jobs$.pipe(
		map(jobs => {
			return [
				{
					badge: jobs.filter(job => job.application_status === 'Bookmarked')
						.length,
					label: 'Bookmarked',
				},
				{
					badge: jobs.filter(job => job.application_status === 'Applying')
						.length,
					label: 'Applying',
				},
				{
					badge: jobs.filter(job => job.application_status === 'Applied')
						.length,
					label: 'Applied',
				},
				{
					badge: jobs.filter(job => job.application_status === 'Interviewing')
						.length,
					label: 'Interviewing',
				},
				{
					badge: jobs.filter(job => job.application_status === 'Negotiating')
						.length,
					label: 'Negotiating',
				},
				{
					badge: jobs.filter(job => job.application_status === 'Accepted')
						.length,
					label: 'Accepted',
				},
			];
		})
	);

	readonly groupBy = signal<null | 'Status'>(null);

	private _getJobs(): Observable<JobRow[]> {
		return this._jobService.jobsResponse$.pipe(
			map(response => {
				const data = response?.body.data ?? [];

				this.dataSource.data = data;

				return data;
			})
		);
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort();
		this.dataSource.filterPredicate = (
			row: JobRow,
			filter: string
		): boolean => {
			switch (filter) {
				case 'Bookmarked':
					return row.application_status === 'Bookmarked';
				case 'Applying':
					return row.application_status === 'Applying';
				case 'Applied':
					return row.application_status === 'Applied';
				case 'Interviewing':
					return row.application_status === 'Interviewing';
				case 'Negotiating':
					return row.application_status === 'Negotiating';
				case 'Accepted':
					return row.application_status === 'Accepted';
				default:
					return true;
			}
		};
	}

	onOptionalColumnsChange($index: number, checked: boolean) {
		this.optionalColumns.update(columns => {
			columns[$index].selected = checked;

			return [...columns]; // return a new array copy to trigger change detection
		});
	}

	drop(
		$event: CdkDragDrop<{ key: string; label: string; selected: boolean }[]>
	) {
		const previousIndex = $event.previousIndex;
		const currentIndex = $event.currentIndex;
		const optionalColumns = [...this.optionalColumns()];
		const index = {
			previous: previousIndex,
			current: currentIndex,
			min: Math.min(previousIndex, currentIndex),
			max: Math.max(previousIndex, currentIndex),
		};
		const drag = {
			forward: previousIndex < currentIndex,
			backward: previousIndex > currentIndex,
		};

		const part = {
			first: optionalColumns.slice(0, index.min),
			middle: optionalColumns.slice(index.min, index.max + 1),
			last: optionalColumns.slice(index.max + 1),
		};

		if (drag.forward) {
			const dragged = part.middle.shift();
			if (dragged) {
				part.middle.push(dragged);
			}

			this.optionalColumns.set([...part.first, ...part.middle, ...part.last]);

			return;
		}

		const dragged = part.middle.pop();
		if (dragged) {
			part.middle.unshift(dragged);
		}

		this.optionalColumns.set([...part.first, ...part.middle, ...part.last]);
	}

	onMatSortChange($event: Sort): void {
		const data = {
			original: this.dataSource.data,
			sorted: this.dataSource.sortData(
				this.dataSource.data,
				this.dataSource.sort!
			),
		};

		const result = [data.sorted[0].job_id];
		for (let i = 1; i < data.sorted.length; i++) {
			//
		}
		console.log(229, $event, data);
	}

	onTabClick(label: string): void {
		this.dataSource.filter = label;
	}

	onClick($event: Event): void {
		const target = $event.target as HTMLElement;
		const mode = target.dataset['mode'];

		const is = {
			view: !mode || mode === 'view',
			edit: !!mode && mode === 'edit',
		};

		const toggled = is.view ? 'edit' : 'view';
		target.dataset['mode'] = toggled;
	}

	addAJob(): void {
		const options = {
			panelClass: 'custom-dialog-style',
			autoFocus: true,
			hasBackdrop: true,
			backdropClass: 'translucent-backdrop',
		};
		const storeName = 'jobs';

		// updata jobsResponse$ in service
		this._jobService.jobsResponse$ = this._dialogService
			.openDialog<AddNewJob, typeof options>(AddNewJob, options)
			.pipe(
				filter(response => !!response && response.continue === true),
				map(response => response.data),
				switchMap(job => {
					const added = this._indexedDbService.addOne(storeName, job);

					if (!added) {
						return of(null);
					}

					return from(added);
				}),
				filter(response => {
					return (
						!!response &&
						response.status.ok &&
						response.status.code === HttpStatusCode.Created &&
						!!response.body.data.job_id
					);
				}),
				switchMap(() => this._jobService.getJobs())
			);
		// update jobs$ in this component in reference to the updated jobsResponse$ in the service
		this.jobs$ = this._getJobs();
	}
}
