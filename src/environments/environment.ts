import { PATH } from './url-path';

import { ENVIRONMENT as dev } from './environment.dev';
import { ENVIRONMENT as qa } from './environment.qa';
import { ENVIRONMENT as uat } from './environment.uat';

/**
 * CHANGE to 'uat' to run against UAT environment API endpoints, OR 'qa' to run against QA environment API endpoints, THEN
 * CANCEL existing localhost running, AND
 * RE-DO another npm start.
 *
 * WARNING! For localhost use only. Please use with caution when interacting with:
 * QA environment data, since they might be used for QA Testing;
 * UAT environment data, since they might be used for business User Acceptance Testing.
 */
const proxyEnv: 'dev' | 'qa' | 'uat' = 'dev';
const env = {
	dev,
	qa,
	uat,
};

export const ENVIRONMENT = {
	...env[proxyEnv],
	name: 'local',
	api: {
		root: `http://localhost:4200/api/${proxyEnv}`,
		path: PATH,
	},
	supabase: {
		url: 'https://dgwvrdwgdevdvjqcjnzi.supabase.co',
		key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnd3ZyZHdnZGV2ZHZqcWNqbnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MzIzNTcsImV4cCI6MjA3NTIwODM1N30.Bgv0gKybCtl1AJSnAHieIcQ3PcmAMaMMwWLNYSxBmIU',
	},
};
