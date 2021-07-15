import Web3 from "web3";

let web3;

export function getWeb3() {
  if (!web3) {
    web3 = new Web3(Web3.givenProvider);
  }
  return web3;
}

export function checkMetaMask() {
  try {
    //Check if the browser is running MetaMask and differentiate MetaMask from other
    //ethereum-compatible browsers.
    //If you want to differentiate MetaMask from other ethereum-compatible browsers,
    //you can detect MetaMask using ethereum.isMetaMask.
    //Ref: https://docs.metamask.io/guide/getting-started.html#basic-considerations
    //If true => MetaMask is installed.
    if (
      typeof window?.ethereum !== "undefined" &&
      window?.ethereum.isMetaMask
    ) {
      console.log("MetaMask is installed!");
      return true;
    } else {
      console.log("MetaMask is not installed.");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function checkNetwork() {
  try {
    if (
      typeof window?.ethereum !== "undefined" &&
      window?.ethereum.isMetaMask
    ) {
      //More info: https://docs.metamask.io/guide/ethereum-provider.html#chain-ids
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      console.log("Network selected: ", chainId);
      return chainId;
    } else {
      return "0x00";
    }
  } catch (error) {
    console.error(error);
    return "0x00";
  }
}

export async function enableMetaMask() {
  try {
    if (
      typeof window?.ethereum !== "undefined" &&
      window?.ethereum.isMetaMask
    ) {
      //MetaMask is installed.
      //Launch the plugin:
      await window.ethereum.request({ method: "eth_requestAccounts" });
      //Network version: 4 (Rinkeby).
      console.log("Network version: ", window.ethereum.networkVersion);
      console.log(
        "Ethereum selected address: ",
        window.ethereum.selectedAddress
      );
      console.log("SUCCESS - MetaMask is connected to the application.");
      return 0;
    } else {
      console.log("ERROR - MetaMask is not connected to the application.");
      return -1;
    }
  } catch (error) {
    console.error(error);
    return error.code;
  }
}

export function getCurrentAccount() {
  try {
    if (typeof window.ethereum !== "undefined") {
      //Returns null if an account is not selected.
      const currentAccount = window.ethereum.selectedAddress;
      console.log("Current address: " + currentAccount);
      return currentAccount;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
