import React, { useEffect, useState } from "react";
import { getWeb3 } from "../../utils/web3";
import invoice from "../../contracts/invoice";
import { useParams, NavLink } from "react-router-dom";
import {
  cooperatives,
  countries,
  offices,
  occupations,
} from "../../utils/invoiceconfig";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  TextField,
  Typography,
  InputAdornment,
  OutlinedInput,
  Divider,
  Radio,
  RadioGroup,
  FormLabel,
  MenuItem,
  Fab,
  Tooltip,
  IconButton,
  Chip,
} from "@material-ui/core";
import styles from "../../assets/css/InvoiceInfo.module.css";
import { Loader } from "../../utils/Loader";
import InvoiceOccupations from "./InvoiceOccupations";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Alert from "@material-ui/lab/Alert";
import InvoiceSearchBar from "./InvoiceSearchBar";
import AlertDialog from "../shared/AlertDialog";
import { getPercentageAmount } from "../../utils/InvoiceFieldsValidation";

//Using Hooks.
export default function InvoiceInfo(props) {
  const { id } = useParams();

  const [paidInvoice, setPaidInvoice] = useState(false);
  const [docNumber, setDocNumber] = useState(id.toUpperCase());
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [vatBase, setVatBase] = useState("");
  const [vatPercentage, setVatPercentage] = useState("");
  const [vatTotal, setVatTotal] = useState("");
  const [eurTotalAmount, setEurTotalAmount] = useState("");
  const [usdExchangeRate, setUsdExchangeRate] = useState("");
  const [usdTotalAmount, setUsdTotalAmount] = useState("");
  const [selectedOccupations, setSelectedOccupations] = useState([]);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [currentCooperative, setCurrentCooperative] = useState("cooperative00");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState("country00");
  const [currentOffice, setCurrentOffice] = useState("office00");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMetaMaskMessage, setErrorMetaMaskMessage] = useState("");
  const [validInvoice, setValidInvoice] = useState(false);

  useEffect(() => {
    async function getInvoiceInfo() {
      const web3 = getWeb3();
      setLoading(true);
      try {
        console.log("Parameter id: ", docNumber);
        if (props.metamaskConnected) {
          //Check if the invoice is stored in the blockchain.
          const bytes32InvoiceId = web3.utils.fromAscii(docNumber);
          const existingInvoice = await invoice.methods
            .invoiceExists(bytes32InvoiceId)
            .call();
          console.log("Existing invoice: ", existingInvoice);
          if (existingInvoice) {
            //Get the details of the invoice.
            const invoiceBasicData = await invoice.methods
              .getInvoiceSummary(bytes32InvoiceId)
              .call();
            const invoiceSummaryResult = JSON.stringify(invoiceBasicData);
            ReadInvoiceSummaryFields(web3, invoiceSummaryResult);
            //Get invoice cost data
            const invoiceCostData = await invoice.methods
              .getInvoicingInfo(bytes32InvoiceId)
              .call();
            const invoiceCostSummaryResult = JSON.stringify(invoiceCostData);
            ReadInvoicingInfo(web3, invoiceCostSummaryResult);
            //Get the occupation(s) associated with this invoice.
            const invoiceOccupationsData = await invoice.methods
              .getOccupationsInfo(bytes32InvoiceId)
              .call();
            ReadInvoiceOccupations(web3, invoiceOccupationsData);
            //Get the invoice member location.
            const memberLocationData = await invoice.methods
              .getMemberLocation(bytes32InvoiceId)
              .call();
            const locationResult = JSON.stringify(memberLocationData);
            ReadMemberLocation(web3, locationResult);
            setValidInvoice(true);
          } else {
            setErrorMessage(
              "The invoice '" +
                docNumber +
                "' cannot be found. Please enter a new invoice document number."
            );
            setValidInvoice(false);
          }
          setLoading(false);
        } else {
          console.log("Invoice Info - MetaMask is unavailable.");
          setErrorMetaMaskMessage(
            "MetaMask is unavailable. A MetaMask connection with the Rinkeby Test Network is required to use this application."
          );
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error(
          "EXCEPTION ERROR - Invoice info MetaMask Error (useEffect): " +
            error.message
        );
        setErrorMetaMaskMessage(
          "EXCEPTION ERROR: " +
            error.message +
            " Remember that a metaMask connection with the Rinkeby Test Network is required to use this application."
        );
      }
    }

    getInvoiceInfo();
  }, [props.metamaskConnected, docNumber]);

  const invoiceIdSearchHandler = (invoiceValue) => {
    setDocNumber(invoiceValue);
  };

  const alertDialogHandler = () => {
    setErrorMessage("");
  };

  function ReadInvoiceSummaryFields(web3, invoiceData) {
    /* eslint-disable no-control-regex*/
    console.log("Invoice info: ", invoiceData);
    const jsonOutput = JSON.parse(invoiceData);
    console.log("Json parse: ", jsonOutput);
    setPaidInvoice(jsonOutput["0"]);
    setInvoiceDate(web3.utils.toAscii(jsonOutput["1"]).replace(/\u0000/g, ""));
    setDueDate(web3.utils.toAscii(jsonOutput["2"]).replace(/\u0000/g, ""));
    setGender(web3.utils.toAscii(jsonOutput["3"]).replace(/\u0000/g, ""));
    setAge(jsonOutput["4"]);
  }

  function ReadInvoicingInfo(web3, invoiceCostData) {
    /* eslint-disable no-control-regex*/
    console.log("Invoicing info: ", invoiceCostData);
    const jsonOutput = JSON.parse(invoiceCostData);
    console.log("Json parse: ", jsonOutput);
    const vatBaseField = web3.utils
      .toAscii(jsonOutput["0"])
      .replace(/\u0000/g, "");
    setVatBase(vatBaseField);
    const vatPercentageField = web3.utils
      .toAscii(jsonOutput["1"])
      .replace(/\u0000/g, "");
    setVatPercentage(vatPercentageField);
    const percentageAmount = getPercentageAmount(
      vatBaseField,
      vatPercentageField
    );
    const eurAmount = Number(
      parseFloat(vatBaseField) + parseFloat(percentageAmount)
    ).toFixed(2);
    setVatTotal(percentageAmount);
    setEurTotalAmount(eurAmount);
    const usdExchangeRateField = web3.utils
      .toAscii(jsonOutput["2"])
      .replace(/\u0000/g, "");
    setUsdExchangeRate(usdExchangeRateField);
    const usdAmount = Number(eurAmount * usdExchangeRateField).toFixed(2);
    setUsdTotalAmount(usdAmount);
  }

  function ReadInvoiceOccupations(web3, occupationsData) {
    /* eslint-disable no-control-regex*/
    console.log("Invoice occupations: ", occupationsData);
    const invOccupations = [];
    for (var i = 0; i < occupationsData.length; i++) {
      invOccupations.push(
        web3.utils.toAscii(occupationsData[i]).replace(/\u0000/g, "")
      );
    }
    console.log("Selected occupations ids: ", invOccupations);
    //Get the complete element from occupations.
    //let invOccupationsTotal = occupations.filter((option) => {
    //  if (invOccupations.includes(option.id)) {
    //    return option;
    //  }
    //});
    //console.log(
    //  "Total info of the selected occupations: ",
    //  invOccupationsTotal
    //);
    //Get the name of the occupations.
    //let invOccupationsNames = [];
    //occupations.map((option) => {
    //  if (invOccupations.includes(option.id)) {
    //    invOccupationsNames.push(option.name);
    //  }
    //  return true;
    //});
    //console.log("Selected occupations names: ", invOccupationsNames);
    //Get the selected occupations for the select component.
    const invOccupationsList = [];
    occupations.map((option) => {
      if (invOccupations.includes(option.id)) {
        invOccupationsList.push({ id: option.id, name: option.name });
      }
      return true;
    });
    console.log("Occupations list: ", invOccupationsList);
    setSelectedOccupations(invOccupationsList);
  }

  function ReadMemberLocation(web3, memberData) {
    /* eslint-disable no-control-regex*/
    //console.log("Member location: ", memberData);
    const jsonOutput = JSON.parse(memberData);
    const cooperative = web3.utils
      .toAscii(jsonOutput["0"])
      .replace(/\u0000/g, "");
    setCurrentCooperative(cooperative);
    const selectedcooperative = cooperatives.find(
      (option) => option.id === cooperative
    );
    setSelectedCountries(selectedcooperative.countries);
    const country = web3.utils.toAscii(jsonOutput["1"]).replace(/\u0000/g, "");
    setCurrentCountry(country);
    setCurrentOffice(
      web3.utils.toAscii(jsonOutput["2"]).replace(/\u0000/g, "")
    );
  }

  return (
    <>
      <div style={{ marginTop: "30px", marginBottom: "30px", float: "right" }}>
        <Tooltip title="Add a new invoice" arrow>
          <NavLink to="/" alt="">
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </NavLink>
        </Tooltip>
      </div>
      <div style={{ marginTop: "30px" }}>
        <Tooltip title="Return to homepage" arrow>
          <NavLink to="/">
            {" "}
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </NavLink>
        </Tooltip>
      </div>
      <div style={{ marginTop: "30px", marginBottom: "30px" }}>
        <InvoiceSearchBar
          defaultValue={docNumber}
          invoiceValueHandler={invoiceIdSearchHandler}
        />
      </div>
      {!!errorMetaMaskMessage ? (
        <Alert variant="filled" severity="error">
          {errorMetaMaskMessage}
        </Alert>
      ) : null}
      {validInvoice ? (
        <form className={styles.invoiceInfo}>
          <Typography variant="h6" className={styles.title} noWrap>
            Invoice details
          </Typography>
          <br />
          <div className={styles.divForm}>
            {paidInvoice ? (
              <Chip
                label="PAID"
                style={{
                  backgroundColor: "green",
                  color: "white",
                }}
              />
            ) : (
              <Chip
                label="UNPAID"
                style={{
                  backgroundColor: "#f50057",
                  color: "white",
                }}
                size="medium"
              />
            )}
          </div>
          <br />
          <div className={styles.divForm}>
            <FormControl
              variant="outlined"
              style={{ width: "40%", marginRight: "50px" }}
            >
              <InputLabel htmlFor="inputInvoiceId">Invoice</InputLabel>
              <OutlinedInput
                id="inputInvoiceId"
                labelWidth={50}
                value={docNumber}
                readOnly
              />
            </FormControl>
          </div>
          <div className={styles.divForm}>
            <TextField
              id="txtInvoiceDate"
              label="Invoice date"
              type="date"
              format=""
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              style={{ marginRight: "15px" }}
              width="20ch"
              value={invoiceDate}
              readOnly
            />
            <TextField
              id="txtDueDate"
              label="Due date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              width="20ch"
              value={dueDate}
              readOnly
            />{" "}
          </div>
          <div className={styles.divForm}>
            <FormControl variant="outlined" style={{ marginRight: "15px" }}>
              <InputLabel htmlFor="inputVatBase">VAT base</InputLabel>
              <OutlinedInput
                id="inputVatBase"
                startAdornment={
                  <InputAdornment position="start">€</InputAdornment>
                }
                labelWidth={70}
                onKeyPress={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
                value={vatBase}
                readOnly
              />
            </FormControl>
            <FormControl
              variant="outlined"
              style={{ marginRight: "15px", width: "15%" }}
            >
              <InputLabel htmlFor="inputVatPercentage">
                VAT percentage
              </InputLabel>
              <OutlinedInput
                id="inputVatPercentage"
                startAdornment={
                  <InputAdornment position="start">%</InputAdornment>
                }
                labelWidth={115}
                value={vatPercentage}
                readOnly
              />
            </FormControl>
            <FormControl
              variant="outlined"
              style={{ backgroundColor: "#E9EDF6" }}
            >
              <InputLabel htmlFor="inputVatTotal">VAT total</InputLabel>
              <OutlinedInput
                id="inputVatTotal"
                startAdornment={
                  <InputAdornment position="start">€</InputAdornment>
                }
                labelWidth={70}
                readOnly
                disabled
                value={vatTotal}
              />
            </FormControl>
          </div>
          <div className={styles.divForm}>
            <FormControl
              variant="outlined"
              style={{ marginRight: "15px", backgroundColor: "#E9EDF6" }}
            >
              <InputLabel htmlFor="inputTotalAmountEUR">
                EUR Total amount
              </InputLabel>
              <OutlinedInput
                id="inputTotalAmountEUR"
                startAdornment={
                  <InputAdornment position="start">€</InputAdornment>
                }
                labelWidth={130}
                readOnly
                disabled
                value={eurTotalAmount}
              />
            </FormControl>
            <FormControl
              variant="outlined"
              style={{ marginRight: "15px", width: "15%" }}
            >
              <InputLabel htmlFor="inputUsdExchangeRate">
                USD Exchange rate
              </InputLabel>
              <OutlinedInput
                id="inputUsdExchangeRate"
                startAdornment={
                  <InputAdornment position="start">#</InputAdornment>
                }
                labelWidth={145}
                value={usdExchangeRate}
                readOnly
              />
            </FormControl>
            <FormControl
              variant="outlined"
              style={{ backgroundColor: "#E9EDF6" }}
            >
              <InputLabel htmlFor="inputTotalAmountUSD">
                USD Total amount
              </InputLabel>
              <OutlinedInput
                id="inputTotalAmountUSD"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                labelWidth={130}
                readOnly
                disabled
                value={usdTotalAmount}
              />
            </FormControl>
          </div>
          <div className={styles.divForm}>
            <Typography variant="subtitle2" className={styles.title} noWrap>
              Occupation(s)
            </Typography>
            <InvoiceOccupations
              occupations={selectedOccupations}
              canDelete={false}
            />
          </div>
          <br />
          <Divider />
          <Typography variant="h6" className={styles.title} noWrap>
            Member details
          </Typography>
          <br />
          <div className={styles.divForm}>
            <FormControl
              variant="outlined"
              style={{ width: "15%", marginRight: "15px" }}
            >
              <InputLabel htmlFor="inputAge">Age</InputLabel>
              <OutlinedInput
                id="inputAge"
                labelWidth={30}
                value={age}
                readOnly
              />
            </FormControl>
            <FormControl component="fieldset" disabled>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" value={gender} row>
                <FormControlLabel
                  value="female"
                  control={<Radio style={{ color: "#aa4994" }} />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio style={{ color: "#aa4994" }} />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio style={{ color: "#aa4994" }} />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>{" "}
          </div>
          <div className={styles.divForm}>
            <TextField
              id="selectCooperative"
              select
              label="Cooperative"
              variant="outlined"
              style={{ marginRight: "15px" }}
              value={currentCooperative}
              readOnly
            >
              <MenuItem key="cooperative00" value="cooperative00">
                Select a cooperative...
              </MenuItem>
              {cooperatives.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="selectCountry"
              select
              label="Country"
              variant="outlined"
              style={{ marginRight: "15px" }}
              value={currentCountry}
              readOnly
            >
              <MenuItem key="country00" value="country00">
                Select a country...
              </MenuItem>
              {countries.map((option) =>
                selectedCountries.includes(option.id) ? (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ) : null
              )}
            </TextField>
            <TextField
              id="selectOffice"
              select
              label="Office"
              variant="outlined"
              value={currentOffice}
              readOnly
            >
              <MenuItem key="office00" value="office00">
                Select an office...
              </MenuItem>
              {offices.map((option) =>
                option.cooperative === currentCooperative &&
                option.country === currentCountry ? (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ) : null
              )}
            </TextField>
          </div>
          <div className={styles.spacer}> </div>
        </form>
      ) : null}
      {!!errorMessage ? (
        <AlertDialog
          alertDialogHandler={alertDialogHandler}
          title={"Invoice information"}
          errorMessage={errorMessage}
        />
      ) : null}
      {loading ? <Loader /> : null}
    </>
  );
}
