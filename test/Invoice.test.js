const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);
//Compiled versions of the contracts
const compiledInvoice = require("../src/contracts/build/Invoice.json");

let accounts; //List of 10 accounts provided by Ganache.
let invoice; //our contract: Invoice
let paid; //bool
let invoiceId; //bytes32
let office; //bytes32
let cooperative; //bytes32
let country; //bytes32
let location; //bytes32[]
let invoiceDate; //bytes16
let dueDate; //bytes16
let invoiceDates; //bytes16[]
let gender; //bytes16
let occupations; //bytes16[]
let occupationId01; //bytes16
let occupationId02; //bytes16
let occupationId03; //bytes16
let vatBase; //bytes16
let vatPercentage; //bytes16
let usdExchangeRate; //bytes16
let costInfo; //bytes16[]
let age; //uint256

beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  console.log("Available accounts: " + accounts);
  //console.log(JSON.stringify(compiledInvoice.abi));
  paid = true;
  invoiceId = await web3.utils.fromAscii("INV-2021-05-001");
  office = await web3.utils.fromAscii("es02");
  cooperative = await web3.utils.fromAscii("coop01");
  country = await web3.utils.fromAscii("es");
  location = [cooperative, country, office];
  invoiceDate = await web3.utils.fromAscii("2021-03-11");
  dueDate = await web3.utils.fromAscii("2021-05-17");
  invoiceDates = [invoiceDate, dueDate];
  vatBase = await web3.utils.fromAscii("400.00");
  vatPercentage = await web3.utils.fromAscii("21.00");
  usdExchangeRate = await web3.utils.fromAscii("1.092881");
  costInfo = [vatBase, vatPercentage, usdExchangeRate];
  occupationId01 = await web3.utils.fromAscii("occ04007");
  occupationId02 = await web3.utils.fromAscii("occ02006");
  occupationId03 = await web3.utils.fromAscii("occ07005");
  occupations = [occupationId01, occupationId02, occupationId03];
  gender = await web3.utils.fromAscii("female");
  age = 34;

  //INVOICE
  //Use one of those accounts to deploy the Invoice contract and get the instance.
  //In order to deploy we must take into account the gas that we are using.
  //In this case we need 200000 instead of 1000000 as in the CampaignFactory example.
  try {
    invoice = await new web3.eth.Contract(compiledInvoice.abi)
      .deploy({ data: "0x" + compiledInvoice.evm.bytecode.object })
      .send({ from: accounts[0], gas: "2000000" });

    await invoice.methods
      .createInvoice(
        paid,
        invoiceId,
        location,
        invoiceDates,
        costInfo,
        occupations,
        gender,
        age
      )
      .send({
        from: accounts[0],
        gas: "2000000",
      });

    invoice.setProvider(provider);
  } catch (err) {
    console.log("Catched exception: ", err);
    assert.ok(err);
  }
});

describe("Invoices", () => {
  it("deploys an invoice", async () => {
    assert.ok(invoice.options.address);
    console.log(
      "=================================================================="
    );
    console.log("Invoice address: " + invoice.options.address);
    console.log(
      "=================================================================="
    );
    assert.ok(invoice.options.address);
    const totalInvoices = await invoice.methods.getInvoiceCount().call();
    console.log("Total invoices: ", totalInvoices);
    assert(1, totalInvoices);
  });

  it("gets the basic information of a specific invoice", async () => {
    try {
      const invoiceInfo = await invoice.methods
        .getInvoiceSummary(invoiceId)
        .call();
      console.log("Invoice info: ", invoiceInfo);
      const output = "[" + JSON.stringify(invoiceInfo) + "]";
      const jsonOutput = JSON.parse(output);
      for (var i = 0; i < jsonOutput.length; i++) {
        console.log("Invoice date: ", web3.utils.toAscii(jsonOutput[i]["1"]));
      }
      assert.strictEqual(
        web3.utils.toAscii(jsonOutput[0]["1"]).replace(/\u0000/g, ""),
        "2021-03-11"
      );
    } catch (err) {
      console.log("Basic information catched exception: ", err);
      assert.ok(err);
    }
  });

  it("gets the location of the member associated with a specific invoice", async () => {
    try {
      const memberLocation = await invoice.methods
        .getMemberLocation(invoiceId)
        .call();
      console.log("Member location: ", memberLocation);
      const output = "[" + JSON.stringify(memberLocation) + "]";
      const jsonOutput = JSON.parse(output);
      for (var i = 0; i < jsonOutput.length; i++) {
        console.log(
          "Cooperative: ",
          web3.utils.toAscii(jsonOutput[i]["0"]).replace(/\u0000/g, "")
        );
        console.log(
          "Country: ",
          web3.utils.toAscii(jsonOutput[i]["1"]).replace(/\u0000/g, "")
        );
        console.log(
          "Office: ",
          web3.utils.toAscii(jsonOutput[i]["2"]).replace(/\u0000/g, "")
        );
      }
      assert.strictEqual(
        web3.utils.toAscii(jsonOutput[0]["0"]).replace(/\u0000/g, ""),
        "coop01"
      );
    } catch (err) {
      console.log("Member location catched exception: ", err);
      assert.ok(err);
    }
  });

  it("gets the cost info of the invoice", async () => {
    try {
      const costInfo = await invoice.methods.getInvoicingInfo(invoiceId).call();
      console.log("Invoicing info: ", costInfo);
      const output = "[" + JSON.stringify(costInfo) + "]";
      const jsonOutput = JSON.parse(output);
      for (var i = 0; i < jsonOutput.length; i++) {
        console.log(
          "VAT Base: ",
          web3.utils.toAscii(jsonOutput[i]["0"]).replace(/\u0000/g, "")
        );
        console.log(
          "VAT Percentage: ",
          web3.utils.toAscii(jsonOutput[i]["1"]).replace(/\u0000/g, "")
        );
        console.log(
          "USD Exchange rate: ",
          web3.utils.toAscii(jsonOutput[i]["2"]).replace(/\u0000/g, "")
        );
      }
      assert.strictEqual(
        web3.utils.toAscii(jsonOutput[0]["0"]).replace(/\u0000/g, ""),
        "400.00"
      );
    } catch (err) {
      console.log("Cost info catched exception: ", err);
      assert.ok(err);
    }
  });

  it("gets the occupations info of the invoice", async () => {
    try {
      const occupationInfo = await invoice.methods
        .getOccupationsInfo(invoiceId)
        .call();
      console.log("Occupations info: ", occupationInfo);
      for (var i = 0; i < occupationInfo.length; i++) {
        console.log(
          "Occupation (",
          i,
          "): ",
          web3.utils.toAscii(occupationInfo[i]).replace(/\u0000/g, "")
        );
      }
      assert.strictEqual(
        web3.utils.toAscii(occupationInfo[0]).replace(/\u0000/g, ""),
        "occ04007"
      );
    } catch (err) {
      console.log("Occupations info catched exception: ", err);
      assert.ok(err);
    }
  });

  it("checks if a specific invoice exists", async () => {
    try {
      const validInvoice = await invoice.methods
        .invoiceExists(invoiceId) //true
        //.invoiceExists(web3.utils.fromAscii("INV-2021-05-000")) //false: throws an exception
        .call();
      console.log("Valid invoice: ", validInvoice);
      assert.ok(validInvoice);
    } catch (err) {
      console.log("Valid invoice catched exception: ", err);
      assert.ok(err);
    }
  });
});
