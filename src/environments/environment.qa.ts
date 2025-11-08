import { PATH } from './url-path';

export const ENVIRONMENT = {
  name: 'qa',
  production: false,
  api: {
    root: 'https://api.qa.harmony.csmedley.net',
    path: PATH,
  },
  customAuthProvider: 'AzureAD',
  amplifyConfig: {
    Auth: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_ILd3W8cgK',
      userPoolWebClientId: '4n093j635gpmhn2f62u5khjqnv',
      mandatorySignIn: true,
      oauth: {
        domain: 'smp-auth-qa.auth.us-east-1.amazoncognito.com',
        scope: ['email', 'openid', 'profile'],
        redirectSignIn: 'https://qa.harmony.csmedley.net/login-callback',
        redirectSignOut: 'https://qa.harmony.csmedley.net/logout-callback',
        responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
      },
    },
  },
};
