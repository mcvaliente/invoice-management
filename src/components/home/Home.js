import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Header";
import { checkMetaMask } from "../../contracts/web3";
import MetaMaskInstallationDialog from "../../components/shared/MetaMaskInstallationDialog";

//Using Hooks.
function Home() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);

  const metamaskInstallationDialogHandler = () => {
    console.log(
      "We reload the page in order to test if MetaMask is installed now."
    );
    setReloadPage(true);
  };

  useEffect(() => {
    //async function inside useEffect since we cannot declare useEffect as "async".
    async function checkWallet() {
      const validWallet = checkMetaMask();
      setIsMetaMaskInstalled(validWallet);
    }

    //Check if MetaMask is installed.
    checkWallet();
  }, []);

  if (reloadPage) {
    window.location.reload();
  }

  return (
    <>
      <Header metamaskInstalled={isMetaMaskInstalled} />
      {isMetaMaskInstalled ? (
        <h1>This is home</h1>
      ) : (
        <MetaMaskInstallationDialog
          metamaskDialogHandler={metamaskInstallationDialogHandler}
        />
      )}
    </>
  );
}

export default Home;
