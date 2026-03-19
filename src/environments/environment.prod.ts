import { PATH } from './url-path';

// TODO: All PROD values need to be added/adjusted once the environment is developed
export const ENVIRONMENT = {
	name: 'prod',
	production: true,
	api: {
		root: 'https://api.prod.whatever.com',
		path: PATH,
	},
	supabase: {
		url: 'https://dgwvrdwgdevdvjqcjnzi.supabase.co',
		key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnd3ZyZHdnZGV2ZHZqcWNqbnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MzIzNTcsImV4cCI6MjA3NTIwODM1N30.Bgv0gKybCtl1AJSnAHieIcQ3PcmAMaMMwWLNYSxBmIU',
	},
};
