import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'app-add-new-job',
	imports: [
		MatDialogModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
	],
	templateUrl: './add-new-job.html',
	styleUrl: './add-new-job.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewJob {
	readonly newJob = new FormGroup({
		job_position: new FormControl<null | string>(null),
		url: new FormControl<null | string>(null),
		company: new FormControl<null | string>(null),
		job_location: new FormControl<null | string>(null),
		description: new FormControl<null | string>(null),
		application_status: new FormControl<null | string>('Bookmarked'),
		min_salary: new FormControl<null | number>(null),
		max_salary: new FormControl<null | number>(null),
		save_date: new FormControl<null | string>(null),
		deadline_date: new FormControl<null | string>(null),
		applied_date: new FormControl<null | string>(null),
		follow_up_date: new FormControl<null | string[]>(null),
		excitement: new FormControl<null | number>(0),
	});
}
