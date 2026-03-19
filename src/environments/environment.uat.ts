import { PATH } from './url-path';

export const ENVIRONMENT = {
	name: 'uat',
	production: false,
	api: {
		root: 'https://api.uat.whatever.com',
		path: PATH,
	},
	supabase: {
		url: 'https://dgwvrdwgdevdvjqcjnzi.supabase.co',
		key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnd3ZyZHdnZGV2ZHZqcWNqbnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MzIzNTcsImV4cCI6MjA3NTIwODM1N30.Bgv0gKybCtl1AJSnAHieIcQ3PcmAMaMMwWLNYSxBmIU',
	},
};
