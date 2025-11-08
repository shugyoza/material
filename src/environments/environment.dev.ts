import { PATH } from './url-path';

export const ENVIRONMENT = {
  name: 'dev',
  production: false,
  api: {
    root: 'https://api.dev.harmony.csmedley.net',
    path: PATH,
  },
  customAuthProvider: 'AzureAD',
  amplifyConfig: {
    Auth: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_RE15IrUhX',
      userPoolWebClientId: '56lb5p74nujp8gi3gmfl7vb4u7',
      mandatorySignIn: true,
      oauth: {
        domain: 'smp-auth-dev.auth.us-east-1.amazoncognito.com',
        scope: ['email', 'openid', 'profile'],
        redirectSignIn: 'https://dev.harmony.csmedley.net/login-callback',
        redirectSignOut: 'https://dev.harmony.csmedley.net/logout-callback',
        responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
      },
    },
  },
};
