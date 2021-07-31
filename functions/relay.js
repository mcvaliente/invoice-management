const forwarderContract = require("../artifacts/Forwarder.json");
const ForwarderAddress = process.env.APP_FORWARDER_CONTRACT_ADDRESS;
const Web3 = require("web3");
//const { Relayer } = require('defender-relay-client');
const { toUtf8Bytes } = require("./utf8.js");

const { TypedDataUtils } = require("eth-sig-util");
const { bufferToHex, keccak256 } = require("ethereumjs-util");

const ZeroAddress = "0x0000000000000000000000000000000000000000";

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
// Convert the string to binary data
const typeNameBytes = toUtf8Bytes(TypeName);
const VerifyHash = keccak256(new Buffer.from(typeNameBytes));
console.log("VerifyHash: ", VerifyHash);

const DomainSeparator = bufferToHex(
  TypedDataUtils.hashStruct("EIP712Domain", TypedData.domain, TypedData.types)
);
console.log("DomainSeparator: ", DomainSeparator);
const SuffixData = "0x";

async function relay(request) {
  console.log("Relay - Forwarder address: ", ForwarderAddress);
  // Unpack request
  const { from, to, value, gas, nonce, data, signature, typeHash } = request;
  console.log("From: ", from);
  console.log("To: ", to);
  console.log("Value: ", value);
  console.log("Gas: ", gas);
  console.log("Nonce: ", nonce);
  console.log("Data: ", data);
  console.log("Signature: ", signature);
  console.log("TypeHash: ", typeHash);

  let tx = {
    hash: typeHash,
    error: "",
  };
  try {
    //Get the provider without credentials.
    //const web3 = new Web3(
    //  new Web3.providers.HttpProvider(
    //    `https://rinkeby.infura.io/v3/${process.env.APP_INFURA_PROJECT_ID}`
    //  )
    //);

    //Get the provider with credentials
    const HDWalletProvider = require("truffle-hdwallet-provider");
    const provider = new HDWalletProvider(
      process.env.APP_MNEMONIC,
      `https://rinkeby.infura.io/v3/${process.env.APP_INFURA_PROJECT_ID}`
    );
    const web3 = new Web3(provider);

    //Get the instance of the Forwarder contract.
    if (web3) {
      const forwarderAbi = forwarderContract.abi;
      const forwarder = new web3.eth.Contract(forwarderAbi, ForwarderAddress);
      //console.log("forwarder: ", forwarder);
      //Check if the Hash is valid in the forwarder.
      //Get user account hash for the signer.
      const userHash = await forwarder.methods.getHash(from).call();
      console.log("UserHash from the forwarder: ", userHash);
      if (typeHash === userHash) {
        // Validate request
        tx.hash = userHash;
        const args = [
          { to, from, value, gas, nonce, data },
          DomainSeparator,
          VerifyHash,
          SuffixData,
          signature,
        ];
        console.log("args: ", ...args);
        await forwarder.methods.verify(...args).send({
          from: from,
          gas: "2000000",
        });

        // Send meta-tx through Defender
        //const forwardData = forwarder.interface.encodeFunctionData('execute', args);
        //const relayer = new Relayer(RelayerApiKey, RelayerSecretKey);
        //const tx = await relayer.sendTransaction({
        //speed: 'fast',
        //to: ForwarderAddress,
        //gasLimit: gas,
        //data: forwardData,
        //});

        tx.error = "Success";
      } else {
        tx.error =
          "The provided hash doesn't math with the hash of the user in the forwarder.";
      }
    }
  } catch (error) {
    console.log("EXCEPTION ERROR (relay.js): ", error);
    tx.hash = ZeroAddress;
    tx.error = error.message;
  }
  console.log(`Sent meta-tx: ${tx.hash}`);

  return tx;
}

// Handler for lambda function
exports.handler = async function (event, context, callback) {
  try {
    const data = JSON.parse(event.body);
    //console.log("BODY: ", data);
    const response = await relay(data);
    callback(null, { statusCode: 200, body: JSON.stringify(response) });
  } catch (err) {
    callback(err);
  }
};
