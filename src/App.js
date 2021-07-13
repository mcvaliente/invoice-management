import React, { useState } from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import Home from "./components/home/Home";
import { Switch, Route } from "react-router-dom";
import Error404 from "./components/error/Error404";
import InvoiceInfo from "./components/invoice/InvoiceInfo";
import MetaMaskWallet from "./components/wallet/MetaMaskWallet";

function App() {
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [connectionWallet, setConnectionWallet] = useState(false);

  const metamaskConnectionHandler = () => {
    setConnectionWallet(true);
  };

  const walletConnectionHandler = (walletConnected) => {
    setConnectionWallet(false);
    setIsMetaMaskConnected(walletConnected);
  };

  return (
    <>
      <Container>
        <Switch>
          {/* The Switch decides which component to show based on the current URL.*/}
          <Route
            exact
            path="/"
            component={() => (
              <Home
                metamaskConnected={isMetaMaskConnected}
                clicked={metamaskConnectionHandler}
              />
            )}
          />
          <Route
            exact
            path="/invoice/:id"
            component={() => (
              <InvoiceInfo metaMaskConnected={isMetaMaskConnected} />
            )}
          />
          {/* Redirect user to a specific page if the route does not exist. */}
          <Route component={Error404} />
        </Switch>
        {connectionWallet ? (
          <MetaMaskWallet connectionHandler={walletConnectionHandler} />
        ) : null}
      </Container>
    </>
  );
}

export default App;
