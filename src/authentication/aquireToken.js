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
     
      
      try {        
        const accessToken = await (await authProvider.acquireTokenPopup(accessTokenRequest)
        ).accessToken;
        return accessToken;
      } catch (error) {
        throw new Error(error.message);
      }
    
  
  }
};
