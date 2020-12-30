import { MsalAuthProvider, LoginType } from 'react-aad-msal';

let redirectUri;

if (process.env.NODE_ENV === 'development') {
  redirectUri = 'http://localhost:3000/';
}
if (process.env.NODE_ENV === 'production') {
  redirectUri = 'https://gappi.herokuapp.com';
}

// Msal Configurations
const config = {
  auth: {
    clientId: '718a3839-33ac-4bc4-bd75-6831419126e4',
    authority:
      'https://login.microsoftonline.com/fbedf638-3b69-42dd-9391-4e789848f191',
    redirectUri: redirectUri,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

// Authentication Parameters
const authenticationParameters = {
  scopes: ['user.read', 'openid', 'profile'],
};

// Options
const options = {
  loginType: LoginType.Redirect,
  tokenRefreshUri: window.location.origin + '/auth.html',
};

export const authProvider = new MsalAuthProvider(
  config,
  authenticationParameters,
  options
);
