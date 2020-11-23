import React, { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import {  
  Switch, Route
} from "react-router-dom"

import "semantic-ui-css/semantic.min.css";
import "./styles/main.css";

import Login from "./components/Login";
import Navbar from "./components/navbar/Navbar";
import SubscriptionMain from "./components/subscriptions/SubscriptionMain";
import AdminMain from "./components/admin/AdminMain";
import ShoppingCart from "./components/shoppingcart/ShoppingCart";

const App = () => {
  const [token, setToken] = useState(null);  
  const [activePage, setActivePage] = useState("Puheliittymät");
  const [shoppingCart, setShoppingCart] = useState([])
  const client = useApolloClient();

  useEffect(() => {
    const localStorageToken = localStorage.getItem("g-app-user-token");
    localStorageToken && setToken(localStorageToken);
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const handleShoppingCart = (action, item) => {
    if(action === 'ADD'){
      setShoppingCart([...shoppingCart, item])
    } else if (action === 'DELETE'){
      setShoppingCart([...shoppingCart.filter(itemRef => itemRef.id !== item.id)])
    } else {
      console.log('Wrong parameter to handleShoppingCart');
    }
    console.log(shoppingCart);

  }

  if (!token) {
    return (
      <>
        <Login setToken={setToken} />
      </>
    );
  }

  return (
    <>
      {token && <Navbar activePage={activePage} setActivePage={setActivePage} logout={logout}/>}
      {activePage !== 'admin' && <ShoppingCart shoppingCart={shoppingCart} handleShoppingCart={handleShoppingCart} />}
      <Switch>
        <Route path='/puheliittymat'>
            <SubscriptionMain handleShoppingCart={handleShoppingCart} />
        </Route>
        <Route path='/admin'>
            <AdminMain />
        </Route>
        <Route path='/'>
          hello world
        </Route>
      </Switch>
    </>
  );
};

export default App;
