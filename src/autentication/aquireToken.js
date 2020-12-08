import { authProvider } from './authProvider';

export const getAccessToken = async (scope) => {
  if (!scope) {
    throw new Error('No valid scope provided');
  }

  const accessTokenRequest = {
    scopes: [scope],
  };

  try {
    const accessToken = await (
      await authProvider.acquireTokenSilent(accessTokenRequest)
    ).accessToken;

    return accessToken;
  } catch (error) {
    if (error.errorMessage.indexOf('interaction_required') !== -1) {
      try {
        const accessToken = await authProvider.aacquireTokenPopup(scope)
          .accessToken;
        return accessToken;
      } catch (error) {
        throw new Error(error.message);
      }
    }
    throw new Error('error');
  }
};
