import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { Switch, Route } from 'react-router-dom';
import { authProvider } from './authentication/authProvider';

import 'semantic-ui-css/semantic.min.css';
import './styles/main.css';

import Navbar from './components/navbar/Navbar';
import SubscriptionMain from './components/subscriptions/SubscriptionMain';
import AdminMain from './components/admin/AdminMain';
import ShoppingCart from './components/shoppingcart/ShoppingCart';
import { getUserRole } from './authentication/accessValidation';
import NetSubMain from './components/netsubscriptions/NetSubMain';
import SAMain from './components/serviceAgreement/SAMain';

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [activePage, setActivePage] = useState('Puheliittymät');
  const [shoppingCart, setShoppingCart] = useState([]);
  const client = useApolloClient();

  const identifyUser = async () => {
    const idToken = await authProvider.getIdToken();
    setUserRole(getUserRole(idToken.idToken.rawIdToken));
  };

  useEffect(() => {
    identifyUser();    
  }, []);

  const logout = () => {
    setUserRole(null);
    localStorage.clear();
    authProvider.logout();
    client.resetStore();
  };



  const handleShoppingCart = (action, item) => {
    if (action === 'ADD') {
      if (shoppingCart.find((itemRef) => item.id === itemRef.id)) {
        return null;
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
        <Route path="/nettiliittymat">
          <NetSubMain handleShoppingCart={handleShoppingCart} />
        </Route>
        <Route path="/tietoturva">
          <SAMain handleShoppingCart={handleShoppingCart} />
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
