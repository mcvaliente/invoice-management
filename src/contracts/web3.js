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
    return false;
  }
}
