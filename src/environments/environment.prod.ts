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
		url: 'url',
		key: 'key',
	},
};
