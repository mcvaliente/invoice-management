import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Header";
import { checkMetaMask, checkNetwork, getNetwork } from "../../contracts/web3";
import MetaMaskInstallationDialog from "../../components/shared/MetaMaskInstallationDialog";
import MetaMaskNetworkDialog from "../../components/shared/MetaMaskNetworkDialog";

//Using Hooks.
function Home() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isValidNetwork, setIsValidNetwork] = useState(false);
  const [networkName, setNetworkName] = useState("");
  const [reloadPage, setReloadPage] = useState(false);

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

  useEffect(() => {
    //Check if MetaMask is installed.
    checkWallet();

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
        }
      }
    }

    //async function checkNetwork() {
    //const validNetwork = await checkRinkebyNetwork();
    //console.log("Valid network : ", validNetwork);
    //setIsRinkebyNetwork(validNetwork);
    //Listen if the network id changes. Reload the page for security.
    //See "chainChainged" section in https://docs.metamask.io/guide/ethereum-provider.html#events
    //window.ethereum.on("chainChanged", (_chainId) =>
    //  window.location.reload()
    //);
    //}
  }, []);

  if (reloadPage) {
    window.location.reload();
  }

  return (
    <>
      <Header
        metamaskInstalled={isMetaMaskInstalled}
        validNetwork={isValidNetwork}
      />
      {isMetaMaskInstalled ? (
        isValidNetwork ? (
          <h1>This is home</h1>
        ) : (
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
    </>
  );
}

export default Home;
