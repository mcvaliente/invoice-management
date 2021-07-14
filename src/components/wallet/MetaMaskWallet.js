import React, { useState, useEffect, useCallback } from "react";
import {
  checkMetaMask,
  checkNetwork,
  getNetwork,
  enableMetaMask,
} from "../../utils/web3";
import MetaMaskInstallationDialog from "./MetaMaskInstallationDialog";
import MetaMaskNetworkDialog from "./MetaMaskNetworkDialog";
import MetaMaskConnectionDialog from "./MetaMaskConnectionDialog";

export default function MetaMaskWallet(props) {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);
  const [isValidNetwork, setIsValidNetwork] = useState(true);
  const [networkName, setNetworkName] = useState("");
  const [reloadPage, setReloadPage] = useState(false);
  const [connectionErrorMessage, setConnectionErrorMessage] = useState("");

  const metamaskInstallationDialogHandler = () => {
    console.log(
      "metamaskInstallationDialogHandler - Reload the page in order to test if MetaMask is installed now."
    );
    setReloadPage(true);
  };

  const metamaskNetworkDialogHandler = () => {
    console.log(
      "metamaskNetworkDialogHandler - Reload the page in order to test if Rinkeby Test Network is selected now."
    );
    setReloadPage(true);
  };

  const metamaskConnectionDialogHandler = () => {
    console.log("Reset the state of the connection.");
    setConnectionErrorMessage("");
    metamaskConnectionHandler(false);
  };

  const metamaskConnectionHandler = useCallback(
    (validConnection) => {
      console.log(
        "metaMaskConnectionHandler -- validConnection: ",
        validConnection
      );
      props.connectionHandler(validConnection);
    },
    [props]
  );

  useEffect(() => {
    //async function inside useEffect since we cannot declare useEffect as "async".
    async function checkWallet() {
      //First, check if MetaMask is installed.
      const validWallet = checkMetaMask();
      setIsMetaMaskInstalled(validWallet);
      if (validWallet) {
        //Check if MetaMask is connected using the valid Ethereum network.
        console.log("Checking network...");
        const validNetwork = await checkNetwork();
        if (!validNetwork) {
          const chainName = await getNetwork();
          setNetworkName(chainName);
          setIsValidNetwork(validNetwork);
          console.log("Current network: ", chainName);
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
              setConnectionErrorMessage("Unknown error");
          }
          metamaskConnectionHandler(validConnection);
        }
      }
    }

    //Check if MetaMask is installed and the Rinkeby test network is selected.
    checkWallet();
  }, [metamaskConnectionHandler]);

  if (reloadPage) {
    window.location.reload();
  }

  return (
    <>
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
    </>
  );
}
