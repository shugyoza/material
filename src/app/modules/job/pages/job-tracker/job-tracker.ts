import { CdkTableModule } from '@angular/cdk/table';
import {
	AfterViewInit,
	Component,
	computed,
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

import { MyDatePipe } from '../../../../shared/library/pipes/my-date.pipe/my-date-pipe';
import { TabGroup } from '../../../../shared/library/components/tab-group/tab-group';
import { MatSelectModule } from '@angular/material/select';

const JOB_DATA: JobRow[] = [
	{
		job_id: 1,
		job_position: 'Software Engineer',
		company: 'Google',
		max_salary: 100000,
		job_location: 'Mountain View, CA',
		application_status: 'Applied',
		save_date: new Date('2021-01-01'),
		deadline_date: new Date('2021-01-01'),
		applied_date: new Date('2021-01-01'),
		follow_up_date: [new Date('2021-01-01')],
		excitement: 3.5,
	},
	{
		job_id: 2,
		job_position: 'Software Engineer',
		company: 'Meta',
		max_salary: 100000,
		job_location: 'Menlo Park, CA',
		application_status: 'Interviewing',
		save_date: new Date('2021-01-01'),
		deadline_date: new Date('2021-01-01'),
		applied_date: new Date('2021-01-01'),
		follow_up_date: [new Date('2021-01-01')],
		excitement: 3.5,
	},
	{
		job_id: 3,
		job_position: 'Software Engineer',
		company: 'Netflix',
		max_salary: 100000,
		job_location: 'San Jose, CA',
		application_status: 'Applying',
		save_date: new Date('2021-01-01'),
		deadline_date: new Date('2021-01-01'),
		applied_date: new Date('2021-01-01'),
		follow_up_date: [new Date('2021-01-01')],
		excitement: 3.5,
	},
	{
		job_id: 4,
		job_position: 'Software Engineer',
		company: 'Yahoo',
		max_salary: 100000,
		job_location: 'Menlo Park, CA',
		application_status: 'Interviewing',
		save_date: new Date('2021-01-01'),
		deadline_date: new Date('2021-01-01'),
		applied_date: new Date('2021-01-01'),
		follow_up_date: [new Date('2021-01-01')],
		excitement: 3.5,
	},
	{
		job_id: 5,
		job_position: 'Software Engineer',
		company: 'Linkedin',
		max_salary: 100000,
		job_location: 'San Jose, CA',
		application_status: 'Applying',
		save_date: new Date('2021-01-01'),
		deadline_date: new Date('2021-01-01'),
		applied_date: new Date('2021-01-01'),
		follow_up_date: [new Date('2021-01-01')],
		excitement: 3.5,
	},
	{
		job_id: 6,
		job_position: 'Software Engineer',
		company: 'Adobe',
		max_salary: 100000,
		job_location: 'San Jose, CA',
		application_status: 'Negotiating',
		save_date: new Date('2021-01-01'),
		deadline_date: new Date('2021-01-01'),
		applied_date: new Date('2021-01-01'),
		follow_up_date: [new Date('2021-01-01')],
		excitement: 3.5,
	},
];

interface JobRow {
	job_id: number;
	job_position: string;
	company: string;
	max_salary?: number;
	job_location?: string;
	application_status?: string;
	save_date?: string | Date;
	deadline_date?: string | Date;
	applied_date?: string | Date;
	follow_up_date?: string[] | Date[];
	excitement?: number;
}

@Component({
	selector: 'app-job-tracker',
	imports: [
		CdkTableModule,
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatFormFieldModule,
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
	readonly sort = viewChild(MatSort);

	readonly stars = signal<(0 | 0.5 | 1)[]>([0, 0, 0, 0, 0]);

	readonly dataSource = new MatTableDataSource<JobRow>();

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

	readonly stepLabels = signal([
		{ badge: 0, label: 'Bookmarked' },
		{ badge: 0, label: 'Applying' },
		{ badge: 4, label: 'Applied' },
		{ badge: 99, label: 'Interviewing' },
		{ badge: 88, label: 'Negotiating' },
		{ badge: 7, label: 'Accepted' },
	]);

	readonly groupBy = signal<null | 'Status'>(null);

	ngAfterViewInit(): void {
		this.dataSource.data = JOB_DATA;
		this.dataSource.sort = this.sort();
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
}
