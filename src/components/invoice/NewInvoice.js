import React, { useState, useEffect, useRef } from "react";
import {
  checkTextField,
  checkDateField,
  greaterThanCurrentDate,
  greaterThanFirstDate,
  checkNumberField,
  checkListField,
} from "../../utils/FormFieldsValidation";
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
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import SaveIcon from "@material-ui/icons/Save";
import styles from "../../assets/css/NewInvoice.module.css";
import InvoiceOccupations from "./InvoiceOccupations";

function NewInvoice() {
  const [paidInvoice, setPaidInvoice] = useState(false);
  const [docNumber, setDocNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [vatBase, setVatBase] = useState("");
  const [vatPercentage, setVatPercentage] = useState("");
  const [vatTotal, setVatTotal] = useState("");
  const [eurTotalAmount, setEurTotalAmount] = useState("");
  const [usdExchangeRate, setUsdExchangeRate] = useState("");
  const [usdTotalAmount, setUsdTotalAmount] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [currentCooperative, setCurrentCooperative] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState("");
  const [currentOffice, setCurrentOffice] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentOccupation, setCurrentOccupation] = useState("");
  const [selectedOccupations, setSelectedOccupations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  const inputDocNumberRef = useRef();
  const inputInvoiceDateRef = useRef();
  const inputDueDateRef = useRef();
  const inputVatBaseRef = useRef();
  const inputVatPercentageRef = useRef();
  const inputUsdExchangeRateRef = useRef();
  const inputAgeRef = useRef();
  const inputCooperativeRef = useRef();
  const inputCountryRef = useRef();
  const inputOfficeRef = useRef();
  const inputCategoryRef = useRef();
  const inputOccupationRef = useRef();

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

  //useEffect executes only when the memberID state changes.
  useEffect(() => {
    //Set the initial values of the Select controls for
    //Cooperatives, Countries, Offices, Categories and
    //Occupations.

    //Cooperatives
    setCurrentCooperative("cooperative00");

    //Countries
    setCurrentCountry("country00");

    //Offices
    setCurrentOffice("office00");

    //Categories
    setCurrentCategory("category00");

    //Occupations
    setCurrentOccupation("occupation00");
    //We must to include [] in order to execute this only on Mount.
  }, []);

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
    setErrorMessages(errors);
    let validField = checkNumberField(value);
    if (!validField) {
      errors.vatBase = "Please enter a valid amount";
    } else if (!/^\d*(\.\d{2})$/.test(value)) {
      validField = false;
      errors.vatBase = "Please enter to 2 decimal places";
    }
    if (!validField) {
      setErrorMessages(errors);
      inputVatBaseRef.current.focus();
    }
    setVatBase(value);
  };

  const vatPercentageHandler = (e) => {
    const value = e.target.value;
    const newValue = value.replace(",", ".");
    setVatPercentage(newValue);
  };

  const vatPercentageValidationHandler = (e) => {
    const value = e.target.value;
    let errors = {};
    setErrorMessages(errors);
    //First check if we have a valid value in the VAT base field.
    let validField = checkNumberField(vatBase);
    if (!validField) {
      inputVatBaseRef.current.focus();
      errors.vatBase = "Please first enter invoice total amount";
      setErrorMessages(errors);
      setVatPercentage("");
    } else {
      validField = checkNumberField(value);
      if (!validField) {
        errors.vatPercentage = "Please enter a valid percentage";
      } else if (!/^\d*(\.\d{2})$/.test(value)) {
        validField = false;
        errors.vatPercentage = "Please enter to 2 decimal places";
      }
      if (validField) {
        const percentageAmount = Number(vatBase * (value / 100)).toFixed(2);
        let eurAmount = Number(
          parseFloat(vatBase) + parseFloat(percentageAmount)
        ).toFixed(2);
        setVatTotal(percentageAmount);
        setEurTotalAmount(eurAmount);
      } else {
        setErrorMessages(errors);
        inputVatPercentageRef.current.focus();
      }
      setVatPercentage(value);
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
    setErrorMessages(errors);
    //First check if we have a valid value in the VAT base field and in the VAT percentage.
    let validField = checkNumberField(vatBase);
    if (!validField) {
      inputVatBaseRef.current.focus();
      errors.vatBase = "Please first enter invoice total amount";
      setErrorMessages(errors);
      setUsdExchangeRate("");
    } else {
      validField = checkNumberField(vatPercentage);
      if (!validField) {
        inputVatPercentageRef.current.focus();
        errors.vatPercentage = "Please first enter a percentage";
        setErrorMessages(errors);
        setUsdExchangeRate("");
      } else {
        validField = checkNumberField(value);
        if (!validField) {
          validField = false;
          errors.usdExchangeRate = "Please enter a valid rate";
        } else if (!/^\d*(\.\d{6})$/.test(value)) {
          validField = false;
          errors.usdExchangeRate = "Please enter to 6 decimal places";
        }
        if (validField) {
          const usdAmount = Number(eurTotalAmount * value).toFixed(2);
          setUsdTotalAmount(usdAmount);
        } else {
          setErrorMessages(errors);
          inputUsdExchangeRateRef.current.focus();
        }
        setUsdExchangeRate(value);
      }
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
    let occupationIds = [];
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
      if (!validInvoice) {
        errors.vatBase = "Please enter an amount";
        setErrorMessages(errors);
        if (!previousError) {
          previousError = true;
          inputVatBaseRef.current.focus();
        }
      }

      //Check VAT Percentage
      //console.log("VAT Percentage: ", vatPercentage);
      validInvoice = checkTextField(vatPercentage);
      if (!validInvoice) {
        errors.vatPercentage = "Please enter a percentage";
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
      if (!validInvoice) {
        errors.usdExchangeRate = "Please enter a rate";
        setErrorMessages(errors);
        if (!previousError) {
          previousError = true;
          inputUsdExchangeRateRef.current.focus();
        }
      }
      //Check USD Total amount
      //console.log("USD Total amount: ", usdTotalAmount);

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

      //Check occupations
      console.log("Occupations: ", selectedOccupations);
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
        setErrorMessages(errors);
      } else {
        //We store only occupation ids.
        occupationIds = selectedOccupations.map((occupation) => {
          return occupation.id;
        });
      }

      //Check for errors.
      if (Object.keys(errors).length === 0) {
        //Fields to store in the blockchain
        console.log("Paid invoice:", paidInvoice);
        console.log("Invoice number: ", docNumber);
        console.log("Invoice date: ", invoiceDate);
        console.log("Due date: ", dueDate);
        console.log("VAT Base: ", vatBase);
        console.log("VAT Percentage: ", vatPercentage);
        console.log("USD Exchange rate: ", usdExchangeRate);
        console.log("Age: ", age);
        console.log("Gender: ", gender);
        console.log("Cooperative: ", currentCooperative);
        console.log("Country: ", currentCountry);
        console.log("Office: ", currentOffice);
        console.log("Occupation Ids: ", occupationIds);

        setLoading(true);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessages({});
      errors.general = error.message;
      setErrorMessages(errors);
    }
  };

  return (
    <div>
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
              name="gender1"
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
        <div className={styles.divButtonForm}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={loading ? null : <SaveIcon />}
            type="submit"
            disabled={loading}
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
    </div>
  );
}

export default NewInvoice;
