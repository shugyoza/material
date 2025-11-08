import { PATH } from './url-path';

// TODO: All PROD values need to be added/adjusted once the environment is developed
export const ENVIRONMENT = {
  name: 'prod',
  production: true,
  api: {
    root: 'https://api.prod.harmony.csmedley.net',
    path: PATH,
  },
  customAuthProvider: 'OKTASaml',
  amplifyConfig: {
    Auth: {
      region: 'us-east-1',
      userPoolId: '',
      userPoolWebClientId: '',
      mandatorySignIn: true,
      oauth: {
        domain: '',
        scope: ['email', 'openid', 'profile'],
        redirectSignIn: 'https://prod.harmony.csmedley.net/login-callback',
        redirectSignOut: 'https://prod.harmony.csmedley.net/logout-callback',
        responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
      },
    },
  },
};
