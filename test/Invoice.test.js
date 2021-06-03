const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);
//compiled versions of the contracts
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
  //console.log(JSON.stringify(compiledFactory.abi));
  invoiceId = await web3.utils.fromAscii("INV-2021-05-001");
  issueDate = await web3.utils.fromAscii("11/03/2021");
  expiryDate = await web3.utils.fromAscii("17/05/2021");
  invoiceDates = [issueDate, expiryDate];
  categoryId = await web3.utils.fromAscii("CATEGORY-01");
  memberId = await web3.utils.fromAscii("70006672P");
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
    invoice = await new web3.eth.Contract(compiledInstance.abi)
      .deploy({ data: "0x" + compiledFactory.evm.bytecode.object })
      .send({ from: accounts[0], gas: "2000000" });

    /*
      await invoice.methods
      .createMember(
        memberId,
        memberDates,
        "Sofía",
        "Fernández Alonso",
        "sofiaf@ccc.es",
        location,
        occupations
      )
      .send({
        from: accounts[0],
        gas: "2000000",
      });

    //MEMBER
    const addresses = await factory.methods.getDeployedMembers().call();
    memberAddress = addresses[0];
    console.log("Member address from deployed members: ", memberAddress);
    //Javascript representation of the Member instance that we have created through the member contract address.
    member = await new web3.eth.Contract(compiledMember.abi, memberAddress);

    //Member from the mapping id => address
    const mappingMemberAddress = await factory.methods
      .getMemberAddress(memberId)
      .call();
    console.log("Member address from mapping: ", mappingMemberAddress);
    factory.setProvider(provider);
    member.setProvider(provider);*/
  } catch (err) {
    console.log("Catched exception: ", err);
    assert.ok(err);
  }
});

describe("Invoices", () => {
  it("deploys an invoice", () => {
    assert.ok(invoice.options.address);
    console.log(
      "=================================================================="
    );
    console.log("Invoice address: " + invoice.options.address);
    console.log(
      "=================================================================="
    );
    assert.ok(invoice.options.address);
  });

  /*
  it("gets the basic information of a new member", async () => {
    try {
      const memberInfo = await member.methods.getMemberSummary().call();
      console.log("Member info", memberInfo);
      const output = "[" + JSON.stringify(memberInfo) + "]";
      const jsonOutput = JSON.parse(output);
      for (var i = 0; i < jsonOutput.length; i++) {
        console.log("NIF/NIE: ", web3.utils.toAscii(jsonOutput[i]["0"]));
      }
      assert(web3.utils.fromAscii("70006672P"), memberInfo.memberId);
    } catch (err) {
      console.log("Catched exception: ", err);
      assert.ok(err);
    }
  });

  it("gets the occupations of a new member", async () => {
    try {
      const memberOccupations = await member.methods
        .getMemberOccupations()
        .call();
      console.log("Member occupations: ", memberOccupations);
      for (var i = 0; i < memberOccupations.length; i++) {
        console.log(
          "Occupation (",
          i,
          "): ",
          web3.utils.toAscii(memberOccupations[i]).replace(/\u0000/g, "")
        );
      }
      assert(
        web3.utils.fromAscii("Actor/Actriz"),
        web3.utils.toAscii(memberOccupations[0]).replace(/\u0000/g, "")
      );
    } catch (err) {
      console.log("Catched exception: ", err);
      assert.ok(err);
    }
  });*/
});
