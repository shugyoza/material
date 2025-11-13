import { PATH } from './url-path';

export const ENVIRONMENT = {
	name: 'uat',
	production: false,
	api: {
		root: 'https://api.uat.whatever.com',
		path: PATH,
	},
	supabase: {
		url: 'XXXXXXXXXXXXXXXXXXXXXXX',
		key: 'xxx',
	},
};
