const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);
//Compiled versions of the contracts
const compiledInvoice = require("../src/contracts/build/Invoice.json");

let accounts; //List of 10 accounts provided by Ganache.
let invoice; //our contract: Invoice
let invoiceId; //bytes32
let issueDate; //bytes16
let expiryDate; //bytes16
let invoiceDates;
let categoryId; //bytes16
let memberId; //bytes32
let gender; //bytes16
let age; //uint256
let office;
let county;
let country;
let location;
let occupationId; //bytes16

beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  console.log("Available accounts: " + accounts);
  //console.log(JSON.stringify(compiledInvoice.abi));
  invoiceId = await web3.utils.fromAscii("INV-2021-05-001");
  issueDate = await web3.utils.fromAscii("11/03/2021");
  expiryDate = await web3.utils.fromAscii("17/05/2021");
  invoiceDates = [issueDate, expiryDate];
  categoryId = await web3.utils.fromAscii("CATEGORY-01");
  memberId = await web3.utils.fromAscii("ZZZ-70006672-111");
  gender = await web3.utils.fromAscii("F");
  age = 34;
  office = await web3.utils.fromAscii("Barcelona");
  county = await web3.utils.fromAscii("Álava");
  country = await web3.utils.fromAscii("España");
  location = [office, county, country];
  occupationId = await web3.utils.fromAscii("OCC-01-01");

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
        invoiceId,
        invoiceDates,
        categoryId,
        memberId,
        gender,
        age,
        location,
        occupationId
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
        console.log("Member ID: ", web3.utils.toAscii(jsonOutput[i]["0"]));
      }
      assert.strictEqual(
        web3.utils.toAscii(jsonOutput[0]["0"]).replace(/\u0000/g, ""),
        "ZZZ-70006672-111"
      );
    } catch (err) {
      console.log("Catched exception: ", err);
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
          "Office: ",
          web3.utils.toAscii(jsonOutput[i]["0"]).replace(/\u0000/g, "")
        );
        console.log(
          "County: ",
          web3.utils.toAscii(jsonOutput[i]["1"]).replace(/\u0000/g, "")
        );
        console.log(
          "Country: ",
          web3.utils.toAscii(jsonOutput[i]["2"]).replace(/\u0000/g, "")
        );
      }
      assert.strictEqual(
        web3.utils.toAscii(jsonOutput[0]["0"]).replace(/\u0000/g, ""),
        "Barcelona"
      );
    } catch (err) {
      console.log("Catched exception: ", err);
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
      console.log("Catched exception: ", err);
      assert.ok(err);
    }
  });
});
