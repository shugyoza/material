import { PATH } from './url-path';

export const ENVIRONMENT = {
	name: 'dev',
	production: false,
	api: {
		root: 'https://api.dev.whatever.com',
		path: PATH,
	},
	supabase: {
		url: 'url',
		key: 'key',
	},
};
