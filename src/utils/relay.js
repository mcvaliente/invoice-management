const Web3 = require("web3");
const ForwarderAddress = process.env.APP_FORWARDER_CONTRACT_ADDRESS;
//const Forwarder = require("../../artifacts/Forwarder.json");
//const RelayerApiKey = process.env.APP_API_KEY;
//const RelayerSecretKey = process.env.APP_SECRET_KEY;
//const { Relayer } = require('defender-relay-client');

/**const { TypedDataUtils } = require("eth-sig-util");
const { bufferToHex } = require("ethereumjs-util");

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
    name: "Relayer",
    version: "1",
    chainId: process.env.APP_CHAIN_ID,
    verifyingContract: ForwarderAddress,
  },
  primaryType: "ForwardRequest",
  types: {
    EIP712Domain: EIP712DomainType,
    ForwardRequest: ForwardRequestType,
  },
  message: {},
};

const GenericParams =
  "address from,address to,uint256 value,uint256 gas,uint256 nonce,bytes data";
const TypeName = `ForwardRequest(${GenericParams})`;
console.log("TypeName: ", TypeName);

const DomainSeparator = bufferToHex(
  TypedDataUtils.hashStruct("EIP712Domain", TypedData.domain, TypedData.types)
);
console.log("DomainSeparator: ", DomainSeparator);
const SuffixData = "0x";**/

async function relay(request) {
  console.log("Relay - Forwarder address: ", ForwarderAddress);
  console.log("Relay - Chain id: ", process.env.APP_CHAIN_ID);
  // Unpack request
  const { from, to, value, gas, nonce, data, signature } = request;
  console.log("From: ", from);
  console.log("To: ", to);
  console.log("Value: ", value);
  console.log("Gas: ", gas);
  console.log("Nonce: ", nonce);
  console.log("Data: ", data);
  console.log("Signature: ", signature);

  // Validate request
  //let web3;
  //if (!web3) {
  //web3 = new Web3(Web3.givenProvider);
  //if (typeof window.ethereum !== "undefined") {
  //In  order to silence a console warning when page inspection.
  //window.ethereum.autoRefreshOnNetworkChange = false;
  //}
  //}
  //console.log ("Relay - web3: ", web3);

  //let forwarder;
  //if (web3) {
  //forwarder = new web3.eth.Contract(
  //Forwarder.abi,
  //process.env.REACT_APP_FORWARDER_CONTRACT_ADDRESS
  //);
  //}

  //console.log("Relay - forwarder: ", forwarder);

  //Get user account hash for the signer.
  //const TypeHash = await forwarder.methods
  //.getHash(from)
  //.call();
  //console.log ("User account hash:", usrHash);
  //const args = [
  //  { from, to, value, gas, nonce, data },
  //  DomainSeparator,
  //  TypeHash,
  //  SuffixData,
  //  signature
  //];
  //console.log("args: ", ...args);

  //  await forwarder.methods
  //          .verify(...args)
  //          .send({
  //            from: from,
  //            gas: "2000000",
  //          });

  // Send meta-tx through Defender
  //const forwardData = forwarder.interface.encodeFunctionData('execute', args);
  //const relayer = new Relayer(RelayerApiKey, RelayerSecretKey);
  //const tx = await relayer.sendTransaction({
  //speed: 'fast',
  //to: ForwarderAddress,
  //gasLimit: gas,
  //data: forwardData,
  //});

  const tx = {
    hash: "0x00000",
    error: "",
  };

  console.log(`Sent meta-tx: ${tx.hash}`);

  return tx;
}

// Handler for lambda function
exports.handler = async function (event, context, callback) {
  try {
    const data = JSON.parse(event.body);
    const response = await relay(data);
    callback(null, { statusCode: 200, body: JSON.stringify(response) });
  } catch (err) {
    callback(err);
  }
};