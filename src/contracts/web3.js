import Web3 from "web3";

let web3;

export function getWeb3() {
  if (!web3) {
    web3 = new Web3(Web3.givenProvider);
  }
  return web3;
}

export function checkMetaMask() {
  //Check if the browser is running MetaMask and differentiate MetaMask from other
  //ethereum-compatible browsers.
  //Ref: https://docs.metamask.io/guide/getting-started.html#basic-considerations
  //If true => MetaMask is installed.
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    return true;
  } else {
    console.log("MetaMask is not installed.");
    return false;
  }
}

export async function checkNetwork() {
  try {
    if (typeof window.ethereum !== "undefined") {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      console.log("Network selected: ", chainId);
      //Check that chainId is the Rinkeby Test Network.
      if (chainId === "0x4") {
        console.log("Rinkeby Test Network selected!");
        return true;
      } else {
        console.log("Please, select the Rinkeby Test Network.");
        return false;
      }
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getNetwork() {
  try {
    if (typeof window.ethereum !== "undefined") {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      //More info: https://chainid.network/
      //More info: https://chainid.network/chains.json
      switch (chainId) {
        case "0x1":
          return "Mainnet";
        case "0x3":
          return "Ropsten";
        case "0x4":
          return "Rinkeby";
        case "0x5":
          return "Goerli";
        case "0x2a":
          return "Kovan";
        default:
          return "Unknown Ethereum network";
      }
    }
  } catch (error) {
    console.error(error);
    return "Unable to retrieve chain id.";
  }
}

export async function enableMetaMask() {
  try {
    if (typeof window.ethereum !== "undefined") {
      //MetaMask is installed.
      //Launch the plugin:
      await window.ethereum.request({ method: "eth_requestAccounts" });
      //Network version: 4 (Rinkeby).
      console.log("Network version: ", window.ethereum.networkVersion);
      console.log(
        "Ethereum selected address: ",
        window.ethereum.selectedAddress
      );
      console.log("MetaMask is connected to the application.");
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
  if (typeof window.ethereum !== "undefined") {
    const currentAccount = window.ethereum.selectedAddress;
    console.log("Current address: " + currentAccount);
    return currentAccount;
  }
}
