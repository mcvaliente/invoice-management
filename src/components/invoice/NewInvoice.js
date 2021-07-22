import React, { useState, useRef } from "react";
import {
  checkTextField,
  checkDateField,
  greaterThanCurrentDate,
  greaterThanFirstDate,
  checkNumberField,
  checkListField,
  getPercentageAmount,
} from "../../utils/InvoiceFieldsValidation";
import {
  cooperatives,
  countries,
  offices,
  occupationCategories,
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
  Button,
  FormHelperText,
  Divider,
  Switch,
  Radio,
  RadioGroup,
  FormLabel,
  CircularProgress,
  MenuItem,
  IconButton,
  Tooltip,
  Fab,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";
import styles from "../../assets/css/NewInvoice.module.css";
import InvoiceOccupations from "./InvoiceOccupations";
import { getWeb3, getCurrentAccount } from "../../utils/web3";
import invoice from "../../contracts/invoice";
import ConfirmDialog from "../shared/ConfirmDialog";
import MetaMaskConnectionDialog from "../wallet/MetaMaskConnectionDialog";

function NewInvoice(props) {
  const [paidInvoice, setPaidInvoice] = useState(false);
  const [docNumber, setDocNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [vatBase, setVatBase] = useState("");
  const [validVatBase, setValidVatBase] = useState(false);
  const [vatPercentage, setVatPercentage] = useState("");
  const [validVatPercentage, setValidVatPercentage] = useState(false);
  const [vatTotal, setVatTotal] = useState("0.00");
  const [eurTotalAmount, setEurTotalAmount] = useState("0.00");
  const [usdExchangeRate, setUsdExchangeRate] = useState("");
  const [validUsdExchangeRate, setValidUsdExchangeRate] = useState(false);
  const [usdTotalAmount, setUsdTotalAmount] = useState("0.00");
  const [currentCategory, setCurrentCategory] = useState("category00");
  const [currentOccupation, setCurrentOccupation] = useState("occupation00");
  const [selectedOccupations, setSelectedOccupations] = useState([]);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [currentCooperative, setCurrentCooperative] = useState("cooperative00");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState("country00");
  const [currentOffice, setCurrentOffice] = useState("office00");
  const [saveBlockchain, setSaveBlockchain] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [connectionErrorMessage, setConnectionErrorMessage] = useState("");
  const [successNewInvoice, setSuccessNewInvoice] = useState(false);

  const inputDocNumberRef = useRef();
  const inputInvoiceDateRef = useRef();
  const inputDueDateRef = useRef();
  const inputVatBaseRef = useRef();
  const inputVatPercentageRef = useRef();
  const inputUsdExchangeRateRef = useRef();
  const inputCategoryRef = useRef();
  const inputOccupationRef = useRef();
  const inputAgeRef = useRef();
  const inputCooperativeRef = useRef();
  const inputCountryRef = useRef();
  const inputOfficeRef = useRef();
  const generalErrorRef = useRef();

  const web3 = getWeb3();

  const GreenSwitch = withStyles({
    switchBase: {
      color: "#aa4994",
      "&$checked": {
        color: green[700],
      },
      "&$checked + $track": {
        backgroundColor: green[700],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const cooperativeSelectHandler = (e) => {
    //Reset the errors.
    setErrorMessages({});
    if (e.target.value !== "cooperative00") {
      setCurrentCooperative(e.target.value);
      const selectedcooperative = cooperatives.find(
        (option) => option.id === e.target.value
      );
      setSelectedCountries(selectedcooperative.countries);
      //console.log("selected countries: ", selectedcooperative.countries);
    }
  };

  const countrySelectHandler = (e) => {
    setErrorMessages({});
    if (e.target.value !== "country00") {
      setCurrentCountry(e.target.value);
    }
  };

  const officeSelectHandler = (e) => {
    setErrorMessages({});
    if (e.target.value !== "office00") {
      setCurrentOffice(e.target.value);
    }
  };

  const categorySelectHandler = (e) => {
    setErrorMessages({});
    if (e.target.value !== "category00") {
      setCurrentCategory(e.target.value);
    }
  };

  const occupationSelectHandler = (e) => {
    let newOccupationId = e.target.value;
    let newOccupationName = e.currentTarget.getAttribute("data-name");
    if (newOccupationId !== "occupation00") {
      let occupationsList = [...selectedOccupations];
      setCurrentOccupation("occupation00");
      //Check if the occupation is in the list yet.
      var occupationIndex = occupationsList
        .map((item) => {
          return item.id;
        })
        .indexOf(newOccupationId);
      //console.log("Occupation index: ", occupationIndex);
      if (occupationIndex === -1) {
        const newOccupation = { id: newOccupationId, name: newOccupationName };
        occupationsList.push(newOccupation);
        setSelectedOccupations(occupationsList);
      }
    }
  };

  const deleteMemberOccupationHandler = (occupationIndex) => {
    let occupationList = [...selectedOccupations];
    occupationList.splice(occupationIndex, 1);
    setSelectedOccupations(occupationList);
  };

  const paidInvoiceHandler = (e) => {
    const value = e.target.checked;
    setPaidInvoice(value);
  };

  const docNumberHandler = (e) => {
    const value = e.target.value;
    setDocNumber(value);
  };

  const invoiceDateHandler = (e) => {
    const value = e.target.value;
    setInvoiceDate(value);
  };

  const dueDateHandler = (e) => {
    const value = e.target.value;
    setDueDate(value);
  };

  const vatBaseHandler = (e) => {
    const value = e.target.value;
    const newValue = value.replace(",", ".");
    setVatBase(newValue);
  };

  const vatBaseValidationHandler = (e) => {
    const value = e.target.value;
    let errors = {};
    setErrorMessages({});
    let validField = checkNumberField(value);
    if (!validField) {
      errors.vatBase = "Please enter a valid amount with 2 decimal places";
    } else if (!/^\d*(\.\d{2})$/.test(value)) {
      validField = false;
      errors.vatBase = "Please enter to 2 decimal places";
    }
    if (validField) {
      setValidVatBase(true);
    } else {
      setErrorMessages(errors);
      inputVatBaseRef.current.focus();
    }
  };

  const vatPercentageHandler = (e) => {
    const value = e.target.value;
    const newValue = value.replace(",", ".");
    setVatPercentage(newValue);
  };

  const vatPercentageValidationHandler = (e) => {
    const value = e.target.value;
    let errors = {};
    setErrorMessages({});
    let validField = checkNumberField(value);
    if (!validField) {
      errors.vatPercentage =
        "Please enter a valid percentage with 2 decimal places";
    } else if (!/^\d*(\.\d{2})$/.test(value)) {
      validField = false;
      errors.vatPercentage = "Please enter to 2 decimal places";
    }
    if (validField) {
      setValidVatPercentage(true);
      if (validVatBase) {
        const percentageAmount = getPercentageAmount(vatBase, value);
        //console.log("VAT Base: ", vatBase);
        //console.log("VAT Percentage: ", value);
        //console.log("Percentage amount: ", percentageAmount);
        const eurAmount = Number(
          parseFloat(vatBase) + parseFloat(percentageAmount)
        ).toFixed(2);
        setVatTotal(percentageAmount);
        setEurTotalAmount(eurAmount);
      }
    } else {
      setErrorMessages(errors);
      inputVatPercentageRef.current.focus();
    }
  };

  const usdExchangeRateHandler = (e) => {
    const value = e.target.value;
    const newValue = value.replace(",", ".");
    setUsdExchangeRate(newValue);
  };

  const usdExchangeRateValidationHandler = (e) => {
    const value = e.target.value;
    //Check if the value is a number.
    let errors = {};
    setErrorMessages({});
    let validField = checkNumberField(value);
    if (!validField) {
      errors.usdExchangeRate =
        "Please enter a valid rate with 6 decimal places";
    } else if (!/^\d*(\.\d{6})$/.test(value)) {
      validField = false;
      errors.usdExchangeRate = "Please enter to 6 decimal places";
    }
    if (validField) {
      setValidUsdExchangeRate(true);
      const usdAmount = Number(eurTotalAmount * value).toFixed(2);
      setUsdTotalAmount(usdAmount);
    } else {
      setErrorMessages(errors);
      inputUsdExchangeRateRef.current.focus();
    }
  };

  const ageHandler = (e) => {
    const value = e.target.value;
    setAge(value);
  };

  const genderHandler = (e) => {
    const value = e.target.value;
    setGender(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let validInvoice = true;
    let errors = {};
    let previousError = false;

    try {
      setErrorMessages({});

      //FIELD VALIDATION (ONLY FIELDS THAT REQUIRE IT)

      //Check Invoice paid
      //console.log("Paid invoice:", paidInvoice);

      //Check invoice document number
      //console.log("Invoice number: ", docNumber);
      validInvoice = checkTextField(docNumber);
      if (!validInvoice) {
        errors.docNumber = "Please enter the invoice document number";
        setErrorMessages(errors);
        previousError = true;
        inputDocNumberRef.current.focus();
      }

      //Check invoice date
      //console.log("Invoice date: ", invoiceDate);
      validInvoice = checkDateField(invoiceDate);
      if (!validInvoice) {
        errors.invoiceDate = "Please enter a date";
        setErrorMessages(errors);
      } else {
        validInvoice = greaterThanCurrentDate(invoiceDate);
        if (!validInvoice) {
          errors.invoiceDate = "The invoice date is greater that current date";
          setErrorMessages(errors);
        }
      }
      if (!validInvoice && !previousError) {
        previousError = true;
        inputInvoiceDateRef.current.focus();
      }

      //Check due date
      //console.log("Due date: ", dueDate);
      validInvoice = checkDateField(dueDate);
      if (!validInvoice) {
        errors.dueDate = "Please enter a date";
        setErrorMessages(errors);
      } else if (invoiceDate !== "") {
        validInvoice = greaterThanFirstDate(dueDate, invoiceDate);
        if (!validInvoice) {
          errors.dueDate = "The invoice date is greater than the due date";
          setErrorMessages(errors);
        }
      }
      if (!validInvoice && !previousError) {
        previousError = true;
        inputDueDateRef.current.focus();
      }

      //Check VAT Base
      //console.log("VAT Base: ", vatBase);
      validInvoice = checkTextField(vatBase);
      if (!validInvoice || !validVatBase) {
        errors.vatBase = "Please enter a valid amount";
        setErrorMessages(errors);
        if (!previousError) {
          previousError = true;
          inputVatBaseRef.current.focus();
        }
      }

      //Check VAT Percentage
      //console.log("VAT Percentage: ", vatPercentage);
      validInvoice = checkTextField(vatPercentage);
      if (!validInvoice || !validVatPercentage) {
        errors.vatPercentage = "Please enter a valid percentage";
        setErrorMessages(errors);
        if (!previousError) {
          previousError = true;
          inputVatPercentageRef.current.focus();
        }
      }

      //Check VAT Total
      //console.log("VAT Total: ", vatTotal);

      //Check EUR Total amount
      //console.log("EUR Total amount: ", eurTotalAmount);

      //Check USD Exchange rate
      //console.log("USD Exchange rate: ", usdExchangeRate);
      validInvoice = checkTextField(usdExchangeRate);
      if (!validInvoice || !validUsdExchangeRate) {
        errors.usdExchangeRate = "Please enter a valid rate";
        setErrorMessages(errors);
        if (!previousError) {
          previousError = true;
          inputUsdExchangeRateRef.current.focus();
        }
      }
      //Check USD Total amount
      //console.log("USD Total amount: ", usdTotalAmount);

      //Check occupations
      //console.log("Occupations: ", selectedOccupations);
      validInvoice = checkListField(selectedOccupations);
      if (!validInvoice) {
        if (currentCategory === "category00") {
          errors.category =
            "Please select a category associated with the invoice";
          if (!previousError) {
            previousError = true;
            inputCategoryRef.current.focus();
          }
        } else {
          errors.occupations = "Please select an occupation for the category";
          if (!previousError) {
            previousError = true;
            inputOccupationRef.current.focus();
          }
        }
      }

      //Check Age
      //console.log("Age: ", age);
      validInvoice = checkTextField(age);
      if (!validInvoice) {
        errors.age = "Please enter member age";
        setErrorMessages(errors);
        if (!previousError) {
          previousError = true;
          inputAgeRef.current.focus();
        }
      }

      //Check Gender
      //console.log("Gender: ", gender);

      //Check Cooperative
      //console.log("Cooperative: ", currentCooperative);
      validInvoice = checkTextField(currentCooperative);
      if (!validInvoice || currentCooperative === "cooperative00") {
        errors.cooperative = "Please select a cooperative";
        setErrorMessages(errors);
        if (!previousError) {
          previousError = true;
          inputCooperativeRef.current.focus();
        }
      }

      //Check Country
      //console.log("Country: ", currentCountry);
      validInvoice = checkTextField(currentCountry);
      if (
        !validInvoice ||
        (currentCountry === "country00" &&
          currentCooperative !== "cooperative00")
      ) {
        errors.country = "Please select a country";
        setErrorMessages(errors);
        if (!previousError) {
          previousError = true;
          inputCountryRef.current.focus();
        }
      }

      //Check Office
      //console.log("Office: ", currentOffice);
      validInvoice = checkTextField(currentOffice);
      if (
        !validInvoice ||
        (currentOffice === "office00" && currentCountry !== "country00")
      ) {
        errors.office = "Please select an office";
        setErrorMessages(errors);
        if (!previousError) {
          previousError = true;
          inputOfficeRef.current.focus();
        }
      }

      setErrorMessages(errors);

      //Check for errors.
      if (Object.keys(errors).length === 0) {
        setSaveBlockchain(true);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessages({});
      errors.general =
        "EXCEPTION ERROR - New invoice (onSubmit): " + error.message;
      generalErrorRef.current.focus();
      setErrorMessages(errors);
    }
  };

  const saveInvoiceOKDialogHandler = async () => {
    //The new invoice can be stored in the Blockchain.
    setSaveBlockchain(false);
    setConnectionErrorMessage("");
    setErrorMessages({});
    setSuccessNewInvoice(false);
    setLoading(true);
    let errors = {};
    try {
      if (props.metamaskConnected) {
        console.log("saveInvoiceOKDialogHandler - MetaMask connected.");
        //First, check that the invoice number is not included in the blockchain.
        const bytes32InvoiceId = web3.utils.fromAscii(docNumber.toUpperCase());
        const existingInvoice = await invoice.methods
          .invoiceExists(bytes32InvoiceId)
          .call();
        if (existingInvoice) {
          errors.docNumber =
            "There is an existing invoice with the same doc number. Please enter a new invoice document number";
          setErrorMessages(errors);
          inputDocNumberRef.current.focus();
          setLoading(false);
        } else {
          //Fields to store in the blockchain
          console.log(">>> FIELDS TO STORE IN THE BLOCKCHAIN");
          console.log("Paid invoice:", paidInvoice);
          console.log("Invoice number: ", docNumber);
          console.log("Invoice date: ", invoiceDate);
          console.log("Due date: ", dueDate);
          console.log("VAT Base: ", vatBase);
          console.log("VAT Percentage: ", vatPercentage);
          console.log("USD Exchange rate: ", usdExchangeRate);
          //Save only the ids of the occupation(s) associated with the invoice.
          const occupationIds = selectedOccupations.map((occupation) => {
            return occupation.id;
          });
          console.log("Occupation Ids: ", occupationIds);
          console.log("Age: ", age);
          console.log("Gender: ", gender);
          console.log("Cooperative: ", currentCooperative);
          console.log("Country: ", currentCountry);
          console.log("Office: ", currentOffice);

          //Adapt fields in order to store them in the blockchain
          const bytes16MemberCooperative =
            web3.utils.fromAscii(currentCooperative);
          const bytes16MemberCountry = web3.utils.fromAscii(currentCountry);
          const bytes16MemberOffice = web3.utils.fromAscii(currentOffice);
          const bytes16MemberLocation = [
            bytes16MemberCooperative,
            bytes16MemberCountry,
            bytes16MemberOffice,
          ];
          const bytes16Invoicedate = web3.utils.fromAscii(invoiceDate);
          const bytes16DueDate = web3.utils.fromAscii(dueDate);
          const bytes16InvoiceDates = [bytes16Invoicedate, bytes16DueDate];
          const bytes16VatBase = web3.utils.fromAscii(vatBase);
          const bytes16VatPercentage = web3.utils.fromAscii(vatPercentage);
          const bytes16UsdExchangeRate = web3.utils.fromAscii(usdExchangeRate);
          const bytes16CostData = [
            bytes16VatBase,
            bytes16VatPercentage,
            bytes16UsdExchangeRate,
          ];
          const bytes16Occupations = occupationIds.map((occupation) => {
            return web3.utils.fromAscii(occupation);
          });
          const bytes16Gender = web3.utils.fromAscii(gender);
          const uint256Age = age;
          //Get the current account.
          const currentAccount = getCurrentAccount();
          console.log("Current account: ", currentAccount);
          await invoice.methods
            .createInvoice(
              paidInvoice,
              bytes32InvoiceId,
              bytes16MemberLocation,
              bytes16InvoiceDates,
              bytes16CostData,
              bytes16Occupations,
              bytes16Gender,
              uint256Age
            )
            .send({
              from: currentAccount,
              gas: "2000000",
            });

          //Checking the blockchain
          //const totalInvoices = await invoice.methods.getInvoiceCount().call();
          //console.log("Total invoices: ", totalInvoices);

          setLoading(false);
          setSuccessNewInvoice(true);
          generalErrorRef.current.focus();
        }
      } else {
        console.log("New invoice - MetaMask is unavailable.");
        setLoading(false);
        setSuccessNewInvoice(false);
        setConnectionErrorMessage("MetaMask is unavailable.");
      }
    } catch (error) {
      setLoading(false);
      console.error(
        "EXCEPTION ERROR - New invoice MetaMask Error (saveInvoiceOKDialogHandler): " +
          error.message
      );
      setConnectionErrorMessage("EXCEPTION ERROR: " + error.message);
    }
  };

  const resetNewInvoiceFormFields = () => {
    setPaidInvoice(false);
    setDocNumber("");
    setInvoiceDate("");
    setDueDate("");
    setVatBase("");
    setVatPercentage("");
    setVatTotal("");
    setEurTotalAmount("");
    setUsdExchangeRate("");
    setUsdTotalAmount("");
    setCurrentCategory("category00");
    setCurrentOccupation("occupation00");
    setSelectedOccupations([]);
    setAge("");
    setGender("female");
    setCurrentCooperative("cooperative00");
    setSelectedCountries([]);
    setCurrentCountry("country00");
    setCurrentOffice("office00");
    setSuccessNewInvoice(false);
  };

  const saveInvoiceCancelDialogHandler = () => {
    setSaveBlockchain(false);
    setConnectionErrorMessage("");
    setErrorMessages({});
    setSuccessNewInvoice(false);
    console.log("The invoice will not be stored in the blockchain.");
  };

  const metamaskConnectionDialogHandler = () => {
    setConnectionErrorMessage("");
  };

  const addInvoiceButtonHandler = () => {
    setSuccessNewInvoice(false);
    resetNewInvoiceFormFields();
    inputDocNumberRef.current.focus();
  };

  return (
    <>
      <div style={{ marginTop: "30px", marginBottom: "30px", float: "right" }}>
        <Tooltip title="Add a new invoice" arrow>
          <span>
            <Fab
              color="primary"
              aria-label="add"
              disabled={!successNewInvoice}
              onClick={addInvoiceButtonHandler}
            >
              <AddIcon />
            </Fab>
          </span>
        </Tooltip>
      </div>
      <Typography variant="h5" className={styles.title} noWrap>
        Add a new invoice
      </Typography>
      <form className={styles.newInvoice} onSubmit={onSubmit}>
        <Typography variant="h6" className={styles.title} noWrap>
          Invoice details
        </Typography>
        <br />
        <div className={styles.divForm}>
          <FormControlLabel
            control={
              <GreenSwitch
                id="swithPaid"
                checked={paidInvoice}
                onChange={paidInvoiceHandler}
                name="checkedPaidInvoice"
              />
            }
            label="Paid"
          />
        </div>
        <div className={styles.divForm}>
          <FormControl
            variant="outlined"
            style={{ width: "40%", marginRight: "50px" }}
            error={!!errorMessages.docNumber}
          >
            <InputLabel htmlFor="inputInvoiceId">Invoice</InputLabel>
            <OutlinedInput
              id="inputInvoiceId"
              labelWidth={50}
              placeholder="Invoice document number"
              error={!!errorMessages.docNumber}
              value={docNumber}
              onChange={docNumberHandler}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              inputRef={inputDocNumberRef}
            />
            {!!errorMessages.docNumber ? (
              <FormHelperText id="docNumberErrorMessage">
                {errorMessages.docNumber}
              </FormHelperText>
            ) : null}
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
            error={!!errorMessages.invoiceDate}
            helperText={errorMessages.invoiceDate}
            value={invoiceDate}
            onChange={invoiceDateHandler}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            inputRef={inputInvoiceDateRef}
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
            error={!!errorMessages.dueDate}
            helperText={errorMessages.dueDate}
            value={dueDate}
            onChange={dueDateHandler}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            inputRef={inputDueDateRef}
          />{" "}
        </div>
        <div className={styles.divForm}>
          <FormControl
            variant="outlined"
            style={{ marginRight: "15px" }}
            error={!!errorMessages.vatBase}
          >
            <InputLabel htmlFor="inputVatBase">VAT base</InputLabel>
            <OutlinedInput
              id="inputVatBase"
              placeholder="0.00"
              startAdornment={
                <InputAdornment position="start">€</InputAdornment>
              }
              labelWidth={70}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              value={vatBase}
              onChange={vatBaseHandler}
              onBlur={vatBaseValidationHandler}
              error={!!errorMessages.vatBase}
              inputRef={inputVatBaseRef}
            />
            {!!errorMessages.vatBase ? (
              <FormHelperText id="vatBaseErrorMessage">
                {errorMessages.vatBase}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            variant="outlined"
            style={{ marginRight: "15px", width: "15%" }}
            error={!!errorMessages.vatPercentage}
          >
            <InputLabel htmlFor="inputVatPercentage">VAT percentage</InputLabel>
            <OutlinedInput
              id="inputVatPercentage"
              placeholder="0.00"
              startAdornment={
                <InputAdornment position="start">%</InputAdornment>
              }
              labelWidth={115}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              value={vatPercentage}
              onChange={vatPercentageHandler}
              onBlur={vatPercentageValidationHandler}
              error={!!errorMessages.vatPercentage}
              inputRef={inputVatPercentageRef}
            />
            {!!errorMessages.vatPercentage ? (
              <FormHelperText id="vatPercentageErrorMessage">
                {errorMessages.vatPercentage}
              </FormHelperText>
            ) : null}
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
            error={!!errorMessages.usdExchangeRate}
          >
            <InputLabel htmlFor="inputUsdExchangeRate">
              USD Exchange rate
            </InputLabel>
            <OutlinedInput
              id="inputUsdExchangeRate"
              placeholder="0.000000"
              startAdornment={
                <InputAdornment position="start">#</InputAdornment>
              }
              labelWidth={145}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              value={usdExchangeRate}
              onChange={usdExchangeRateHandler}
              onBlur={usdExchangeRateValidationHandler}
              error={!!errorMessages.usdExchangeRate}
              inputRef={inputUsdExchangeRateRef}
            />
            {!!errorMessages.usdExchangeRate ? (
              <FormHelperText id="usdExchangeRateErrorMessage">
                {errorMessages.usdExchangeRate}
              </FormHelperText>
            ) : null}
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
          <TextField
            id="selectCategory"
            select
            label="Category"
            variant="outlined"
            style={{ marginRight: "15px" }}
            value={currentCategory}
            onChange={categorySelectHandler}
            error={!!errorMessages.category}
            helperText={errorMessages.category}
            inputRef={inputCategoryRef}
          >
            <MenuItem key="category00" value="category00">
              Select a category...
            </MenuItem>
            {occupationCategories.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="selectOccupation"
            select
            label="Occupation"
            variant="outlined"
            value={currentOccupation}
            onChange={occupationSelectHandler}
            disabled={currentCategory === "category00"}
            error={!!errorMessages.occupations}
            helperText={errorMessages.occupations}
            inputRef={inputOccupationRef}
          >
            <MenuItem key="occupation00" value="occupation00">
              Select an occupation...
            </MenuItem>
            {occupations.map((option) =>
              option.category === currentCategory ? (
                <MenuItem
                  key={option.id}
                  value={option.id}
                  data-name={option.name}
                >
                  {option.name}
                </MenuItem>
              ) : null
            )}
          </TextField>
        </div>
        <div>
          <InvoiceOccupations
            occupations={selectedOccupations}
            clicked={deleteMemberOccupationHandler}
            canDelete={true}
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
            error={!!errorMessages.age}
          >
            <InputLabel htmlFor="inputAge">Age</InputLabel>
            <OutlinedInput
              id="inputAge"
              labelWidth={30}
              error={!!errorMessages.age}
              value={age}
              onChange={ageHandler}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              inputProps={{
                type: "number",
                min: 18,
                max: 99,
              }}
              inputRef={inputAgeRef}
            />
            {!!errorMessages.age ? (
              <FormHelperText id="ageErrorMessage">
                {errorMessages.age}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="memberGender"
              value={gender}
              onChange={genderHandler}
              row
            >
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
            onChange={cooperativeSelectHandler}
            error={!!errorMessages.cooperative}
            helperText={errorMessages.cooperative}
            inputRef={inputCooperativeRef}
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
            onChange={countrySelectHandler}
            disabled={currentCooperative === "cooperative00"}
            error={!!errorMessages.country}
            helperText={errorMessages.country}
            inputRef={inputCountryRef}
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
            disabled={
              currentCooperative === "cooperative00" ||
              currentCountry === "country00"
            }
            value={currentOffice}
            onChange={officeSelectHandler}
            error={!!errorMessages.office}
            helperText={errorMessages.office}
            inputRef={inputOfficeRef}
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
        {!!errorMessages.general ? (
          <Alert variant="filled" severity="error">
            {errorMessages.general}
          </Alert>
        ) : null}
        {successNewInvoice ? (
          <div style={{ marginTop: "20px" }}>
            <Alert
              severity="success"
              variant="filled"
              action={
                <Tooltip title="Close if you want to add a new invoice." arrow>
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setSuccessNewInvoice(false);
                      resetNewInvoiceFormFields();
                      inputDocNumberRef.current.focus();
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              }
            >
              The invoice has beed added successfully!
            </Alert>
          </div>
        ) : null}
        <div
          className={styles.divButtonForm}
          ref={generalErrorRef}
          tabIndex={-1}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={loading ? null : <SaveIcon />}
            type="submit"
            disabled={loading || successNewInvoice}
          >
            {loading ? (
              <CircularProgress style={{ color: "white" }} size="30px" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
        <div className={styles.spacer}> </div>
      </form>{" "}
      {saveBlockchain ? (
        <ConfirmDialog
          confirmPrimaryDialogHandler={saveInvoiceOKDialogHandler}
          confirmSecondaryDialogHandler={saveInvoiceCancelDialogHandler}
          dialogTitle="Proceed?"
          dialogDescription="The invoice will be stored in the Ethereum's Rinkeby Test Network."
          primaryButton="Save"
          secondaryButton="Cancel"
        />
      ) : null}
      {!!connectionErrorMessage ? (
        <MetaMaskConnectionDialog
          metamaskConnDialogHandler={metamaskConnectionDialogHandler}
          errorMessage={connectionErrorMessage}
        />
      ) : null}
    </>
  );
}

export default NewInvoice;
