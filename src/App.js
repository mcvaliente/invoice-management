import React, { useState, useEffect } from "react";
import "./App.css";
import {
  checkMetaMask,
  checkNetwork,
  getNetwork,
  getCurrentAccount,
  enableMetaMask,
} from "./components/wallet/web3";
import { Container } from "@material-ui/core";
import Home from "./components/home/Home";
import { Switch, Route } from "react-router-dom";
import Error404 from "./components/error/Error404";
import MetaMaskInstallationDialog from "./components/wallet/MetaMaskInstallationDialog";
import MetaMaskNetworkDialog from "./components/wallet/MetaMaskNetworkDialog";
import MetaMaskConnectionDialog from "./components/wallet/MetaMaskConnectionDialog";

function App() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);
  const [isValidNetwork, setIsValidNetwork] = useState(true);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(true);
  const [networkName, setNetworkName] = useState("");
  const [reloadPage, setReloadPage] = useState(false);
  const [connectionErrorMessage, setConnectionErrorMessage] = useState("");

  const metamaskInstallationDialogHandler = () => {
    console.log(
      "We reload the page in order to test if MetaMask is installed now."
    );
    setReloadPage(true);
  };

  const metamaskNetworkDialogHandler = () => {
    console.log(
      "We reload the page in order to test if Rinkeby Test Network is selected now."
    );
    setReloadPage(true);
  };

  const metamaskConnectionHandler = async () => {
    const errorCode = await enableMetaMask();
    console.log("Error code: ", errorCode);
    let validConnection = false;
    switch (errorCode) {
      case 0:
        validConnection = true;
        break;
      case -32002:
        setConnectionErrorMessage(
          "RPC Error: Request of type 'wallet_requestPermissions' already pending for this dapp."
        );
        break;
      case 4001:
        setConnectionErrorMessage("Unable to connect with MetaMask.");
        break;
      default:
        setConnectionErrorMessage("Unknown error");
    }
    setIsMetaMaskConnected(validConnection);
  };

  const metamaskConnectionDialogHandler = () => {
    console.log("Reset the state of the connection.");
    setConnectionErrorMessage("");
    setIsMetaMaskConnected(false);
  };

  useEffect(() => {
    //async function inside useEffect since we cannot declare useEffect as "async".
    async function checkWallet() {
      const validWallet = checkMetaMask();
      setIsMetaMaskInstalled(validWallet);
      if (validWallet) {
        console.log("Checking network...");
        const validNetwork = await checkNetwork();
        setIsValidNetwork(validNetwork);
        if (!validNetwork) {
          const chainName = await getNetwork();
          setNetworkName(chainName);
          console.log("Current network: ", chainName);
        } else {
          console.log("Checking current account...");
          const currentAccount = getCurrentAccount();
          if (currentAccount !== null) {
            //MetaMask is connected.
            setIsMetaMaskConnected(true);
          } else {
            setIsMetaMaskConnected(false);
          }
        }
      }
    }

    //Check if MetaMask is installed and the Rinkeby test network is selected.
    checkWallet();

    //Listen if the network id changes. Reload the page for security.
    //See "chainChainged" section in https://docs.metamask.io/guide/ethereum-provider.html#events
    //First we check that the user has not uninstalled MetaMask (typeof window.ethereum !== "undefined").
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("chainChanged", handleChainChanged);
    }

    function handleChainChanged(_chainId) {
      window.location.reload();
    }
  }, []);

  if (reloadPage) {
    window.location.reload();
  }

  return (
    <>
      <Container>
        {isMetaMaskInstalled ? (
          isValidNetwork ? null : (
            <MetaMaskNetworkDialog
              metamaskNetDialogHandler={metamaskNetworkDialogHandler}
              currentNetwork={networkName}
            />
          )
        ) : (
          <MetaMaskInstallationDialog
            metamaskDialogHandler={metamaskInstallationDialogHandler}
          />
        )}
        {!!connectionErrorMessage ? (
          <MetaMaskConnectionDialog
            metamaskConnDialogHandler={metamaskConnectionDialogHandler}
            errorMessage={connectionErrorMessage}
          />
        ) : null}
        <Switch>
          {/* The Switch decides which component to show based on the current URL.*/}
          <Route
            exact
            path="/"
            component={() => (
              <Home
                metamaskInstalled={isMetaMaskInstalled}
                validNetwork={isValidNetwork}
                metamaskConnected={isMetaMaskConnected}
                clicked={metamaskConnectionHandler}
              />
            )}
          />
          {/* Redirect user to a specific page if the route does not exist. */}
          <Route component={Error404} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
