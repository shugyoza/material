import { CdkTableModule, DataSource } from '@angular/cdk/table';
import { Component, signal, viewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSort, MatSortModule } from '@angular/material/sort';

const JOB_DATA: JobRow[] = [{
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
}
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
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    MatSortModule,
],
  templateUrl: './job-tracker.html',
  styleUrl: './job-tracker.scss',
})
export class JobTracker {
  readonly sortList = viewChildren(MatSort);

  readonly stars = signal<(0 | 0.5 | 1)[]>([0, 0, 0, 0, 0])

  readonly dataSource = new MyDataSource();

  readonly columns = signal<string[]>([
  'job_position',
  'company',
  'max_salary',
  'job_location',
  'application_status',
  'save_date',
  'deadline_date',
  'applied_date',
  'follow_up_date',
  'excitement'
]);

}

export class MyDataSource extends DataSource<JobRow> {
  data = new BehaviorSubject<JobRow[]>(JOB_DATA);

  connect(): Observable<JobRow[]> {
    return this.data;
  }

  disconnect() {}
}
