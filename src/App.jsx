import React, { useState } from "react";
import Login from "./components/Login";
import "semantic-ui-css/semantic.min.css";
import "./styles/main.css";

const App = () => {
  const [token, setToken] = useState(null);

  if (!token) {
    return (
      <>
        <Login setToken={setToken} />
      </>
    );
  }

  return (
    <>
      <Login />
    </>
  );
};

export default App;
