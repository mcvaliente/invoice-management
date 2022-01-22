import invoice from "../contracts/invoice";
import forwarder from "../contracts/forwarder";

const ZeroAddress = "0x0000000000000000000000000000000000000000";
const InvoiceAddress =
  process.env.REACT_APP_INVOICE_CONTRACT_ADDRESS || ZeroAddress;
const ForwarderAddress =
  process.env.REACT_APP_FORWARDER_CONTRACT_ADDRESS || ZeroAddress;
const RelayUrl = process.env.REACT_APP_RELAY_URL || "/relay";

const EIP712DomainType = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
];

const ForwardRequestType = [
  { name: "from", type: "address" },
  { name: "to", type: "address" },
  { name: "value", type: "uint256" },
  { name: "gas", type: "uint256" },
  { name: "nonce", type: "uint256" },
  { name: "data", type: "bytes" },
];

const TypedData = {
  domain: {
    name: "Wallet manager",
    version: "1",
    chainId: process.env.REACT_APP_CHAIN_ID, //4 - Rinkeby
    verifyingContract: ForwarderAddress,
  },
  primaryType: "ForwardRequest",
  types: {
    EIP712Domain: EIP712DomainType,
    ForwardRequest: ForwardRequestType,
  },
  message: {},
};

//Reference: https://github.com/OpenZeppelin/defender-example-metatx-relay/blob/7ae0dc38591f3c2210eb696c18360cde4d391703/app/src/eth/txs.js
export async function sendMetaTx(
  paidInvoice,
  invoiceId,
  memberLocation,
  invoiceDates,
  costData,
  occupations,
  gender,
  age,
  web3,
  from
) {
  let response = {
    hash: ZeroAddress,
    error: "Meta-transaction not processed.",
  };
  try {
    //const network = await web3.eth.net.getId();
    //e.g. (if selected Rinkeby in our MetaMask account) txs network: 4
    //console.log("txs network: ", network);

    // Get nonce for current signer.
    const nonce = await forwarder.methods
      .getNonce(from)
      .call()
      .then((nonce) => nonce.toString());
    console.log("nonce:", nonce);
    console.log("Chain id: ", process.env.REACT_APP_CHAIN_ID);
    console.log("Forwarder contract address: ", ForwarderAddress);

    // Encode meta-tx request
    const data = invoice.methods
      .createInvoice(
        paidInvoice,
        invoiceId,
        memberLocation,
        invoiceDates,
        costData,
        occupations,
        gender,
        age
      )
      .encodeABI();
    console.log("Encode ABI (data): ", data);
    console.log("Account from: ", from);
    console.log("Invoice address: ", InvoiceAddress);
    const request = {
      from,
      to: InvoiceAddress,
      value: 0,
      gas: 2e6,
      nonce,
      data,
    };

    // Get the signature
    const toSign = { ...TypedData, message: request };
    //const signature = await web3.currentProvider.send('eth_signTypedData_v4', [from, JSON.stringify(toSign)]);
    //console.log("Signature: ", signature);
    const params = [from, JSON.stringify(toSign)];
    let signature;
    let validSignature = true;
    await web3.currentProvider
      .request({
        method: "eth_signTypedData_v4",
        params,
      })
      .then((result) => {
        // The result varies by RPC method.
        // For example, this method will return a transaction hash hexadecimal string on success.
        signature = result;
        console.log("Signature: " + signature);
      })
      .catch((error) => {
        // If the request fails, the Promise will reject with an error.
        validSignature = false;
        if (error.code === 4001) {
          //MetaMask Message Signature: User denied message signature
          response.error = "Please, sign the meta-transaction (gasless).";
        } else {
          response.error = error.message;
        }
        console.log("Signature failure: ", error.message);
      });

    if (validSignature) {
      // Send request to the server
      response = await fetch(RelayUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...request, signature }),
      }).then((r) => r.json());
      console.log("Response server: ", JSON.stringify(response));
    }
  } catch (error) {
    response.error = error.message;
  }

  return response;
}
