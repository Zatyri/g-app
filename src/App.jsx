import React, { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import {  
  Switch, Route
} from "react-router-dom"

import "semantic-ui-css/semantic.min.css";
import "./styles/main.css";

import Login from "./components/Login";
import Navbar from "./components/navbar/Navbar";
import SubscriptMain from "./components/subscriptions/SubscriptMain";
import AdminMain from "./components/admin/AdminMain";

const App = () => {
  const [token, setToken] = useState(null);  
  const [activePage, setActivePage] = useState("Puheliittymät");
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
      <Switch>
        <Route path='/puheliittymat'>
            <SubscriptMain />
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
