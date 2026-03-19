export interface JobRow {
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
	url?: string;
	description?: string
}