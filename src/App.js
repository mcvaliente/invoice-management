import React, { useEffect, useState } from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import Home from "./components/home/Home";
import { Switch, Route } from "react-router-dom";
import Error404 from "./components/error/Error404";
import { checkMetaMask, checkNetwork, enableMetaMask } from "./utils/web3";
import MetaMaskInstallationDialog from "./components/wallet/MetaMaskInstallationDialog";
import MetaMaskNetworkDialog from "./components/wallet/MetaMaskNetworkDialog";
import MetaMaskConnectionDialog from "./components/wallet/MetaMaskConnectionDialog";
import InvoiceSearch from "./components/invoice/InvoiceSearch";

function App() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);
  const [isValidNetwork, setIsValidNetwork] = useState(true);
  const [networkName, setNetworkName] = useState("");
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [connectionErrorMessage, setConnectionErrorMessage] = useState("");
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    if (!isMetaMaskConnected) {
      setConnectionErrorMessage(
        "A MetaMask connection with the Rinkeby Test Network is required to use this application."
      );
    }
  }, [isMetaMaskConnected]);

  const metamaskConnectionHandler = async () => {
    //User clicked on the "Connect with MetaMask" button.
    //First, check if MetaMask is installed.
    const validWallet = checkMetaMask();
    setIsMetaMaskInstalled(validWallet);
    if (validWallet) {
      //Check if MetaMask is connected using the valid Ethereum network.
      console.log("Checking network...");
      let validNetwork = false;
      const networkId = await checkNetwork();
      if (networkId === "0x4") {
        validNetwork = true;
      }
      if (!validNetwork) {
        let networkName = "";
        //More info: https://docs.metamask.io/guide/ethereum-provider.html#chain-ids
        switch (networkId) {
          case "0x1":
            networkName = "Mainnet";
            break;
          case "0x3":
            networkName = "Ropsten";
            break;
          case "0x5":
            networkName = "Goerli";
            break;
          case "0x2a":
            networkName = "Kovan";
            break;
          default:
            networkName = "Unknown Ethereum network";
        }
        setNetworkName(networkName);
        setIsValidNetwork(validNetwork);
        console.log("Current network: ", networkName);
      } else {
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
            setConnectionErrorMessage("Unknown MetaMask connection error.");
        }
        setIsMetaMaskConnected(validConnection);
      }
    }
  };

  const metamaskInstallationDialogHandler = () => {
    console.log(
      "App.js - Reload the page in order to test if MetaMask is installed now."
    );
    setReloadPage(true);
  };

  const metamaskNetworkDialogHandler = () => {
    console.log(
      "App.js - Reload the page in order to test if Rinkeby Test Network is selected now."
    );
    setReloadPage(true);
  };

  const metamaskConnectionDialogHandler = () => {
    console.log("Reset the state of the connection.");
    setConnectionErrorMessage("");
  };

  if (reloadPage) {
    return window.location.reload();
  }

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
                hideGeneralSearch={false}
              />
            )}
          />
          <Route
            exact
            path="/invoice/:id"
            component={() => (
              <InvoiceSearch
                metamaskConnected={isMetaMaskConnected}
                clicked={metamaskConnectionHandler}
                hideGeneralSearch={true}
              />
            )}
          />
          {/* Redirect user to a specific page if the route does not exist. */}
          <Route component={Error404} />
        </Switch>
        {isMetaMaskInstalled ? null : (
          <MetaMaskInstallationDialog
            metamaskDialogHandler={metamaskInstallationDialogHandler}
          />
        )}
        {isValidNetwork ? null : (
          <MetaMaskNetworkDialog
            metamaskNetDialogHandler={metamaskNetworkDialogHandler}
            currentNetwork={networkName}
          />
        )}
        {!!connectionErrorMessage ? (
          <MetaMaskConnectionDialog
            metamaskConnDialogHandler={metamaskConnectionDialogHandler}
            errorMessage={connectionErrorMessage}
          />
        ) : null}
      </Container>
    </>
  );
}

export default App;
