import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { Switch, Route } from 'react-router-dom';
import { AzureAD, AuthenticationState } from 'react-aad-msal';
import { authProvider } from './authProvider';


import 'semantic-ui-css/semantic.min.css';
import './styles/main.css';

import Login from './components/Login';
import Navbar from './components/navbar/Navbar';
import SubscriptionMain from './components/subscriptions/SubscriptionMain';
import AdminMain from './components/admin/AdminMain';
import ShoppingCart from './components/shoppingcart/ShoppingCart';
import { getCookie, setCookie } from './components/utils/cookies';
import { getUserRole } from './accessValidation'

const App = () => {
  //const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [activePage, setActivePage] = useState('Puheliittymät');
  const [shoppingCart, setShoppingCart] = useState([]);
  const client = useApolloClient();

  const identifyUser = async () => {
    const idToken = await authProvider.getIdToken()
    setUserRole(getUserRole(idToken.idToken.rawIdToken))
  }



  useEffect(() => {

identifyUser()
/*
    
    if(process.env.NODE_ENV === 'development'){
      const localStorageToken = localStorage.getItem('g-app-user-token');
      localStorageToken && setToken(localStorageToken);
    }
    if(process.env.NODE_ENV === 'production'){
      const cookieToken = getCookie('g-app-user-token');      
      cookieToken && setToken(cookieToken)
    }
*/
  }, []);
  

  const joku = async () => {
    const accessTokenRequest = {
      scopes: ["api://gappi/Subscriptions.Read"]
    }
    /*
    const account = await authProvider;
    // console.log(account);
  
  
    const accesstoken = await authProvider.getAccessToken(accessTokenRequest);
     //console.log(accesstoken);

    const idtoken = await authProvider.getIdToken();
    
    */
    
  

    const silentToken = await (await authProvider.acquireTokenSilent(accessTokenRequest)).accessToken;
    console.log(silentToken);
  }

   joku();


  const logout = () => {
    setUserRole(null);
    if(process.env.NODE_ENV === 'development'){
      localStorage.clear();
      authProvider.logout();
    }
    if(process.env.NODE_ENV === 'production'){
      setCookie('g-app-user-token', '', 0)      
    }    
    client.resetStore();
  };

  const handleShoppingCart = (action, item) => {
    if (action === 'ADD') {
      if(shoppingCart.find(itemRef => item.id === itemRef.id)){
        return null
      }
      setShoppingCart([...shoppingCart, item]);
    } else if (action === 'DELETE') {
      setShoppingCart([
        ...shoppingCart.filter((itemRef) => itemRef.id !== item.id),
      ]);
    } else {
      console.log('Wrong parameter to handleShoppingCart');
    }
  };

  
/*
  if (!token) {
    return (
      <>
        <Login setToken={setToken} />
      </>
    );
  }
  */

  return (
    <>
      
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          userType={userRole}
          logout={logout}
        />
      
      {activePage !== 'admin' && (
        <ShoppingCart
          shoppingCart={shoppingCart}
          setShoppingCart={setShoppingCart}
        />
      )}
      <Switch>
        <Route path="/puheliittymat">
          <SubscriptionMain handleShoppingCart={handleShoppingCart} />
        </Route>
        <Route path="/admin">
          <AdminMain />
        </Route>
        <Route path="/"></Route>
      </Switch>
    </>
  );
};

export default App;
