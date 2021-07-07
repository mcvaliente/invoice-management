import React, { useState, useRef } from "react";
import {
  checkTextField,
  checkDateField,
  greaterThanCurrentDate,
  greaterThanFirstDate,
  checkNumberField,
  checkAgefield,
} from "../../utils/FormFieldsValidation";
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
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import SaveIcon from "@material-ui/icons/Save";
import styles from "../../assets/css/NewInvoice.module.css";

function NewInvoice() {
  const [paidInvoice, setPaidInvoice] = useState(false);
  const [docNumber, setDocNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [vatBase, setVatBase] = useState("");
  const [vatPercentage, setVatPercentage] = useState("");
  const [vatTotal, setVatTotal] = useState("");
  const [eurTotalAmount, setEurTotalAmount] = useState("");
  const [usdExchangeRate, setUsdExchangeRate] = useState("");
  const [usdTotalAmount, setUsdTotalAmount] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  const inputVatBaseRef = useRef();
  const inputVatPercentageRef = useRef();
  const inputUsdExchangeRateRef = useRef();

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

  const paidInvoiceHandler = (e) => {
    const value = e.target.checked;
    setPaidInvoice(value);
  };

  const docNumberHandler = (e) => {
    const value = e.target.value;
    console.log("Invoice doc number: ", value);
    setDocNumber(value);
  };

  const issueDateHandler = (e) => {
    const value = e.target.value;
    console.log("Issue date: ", value);
    setIssueDate(value);
  };

  const expiryDateHandler = (e) => {
    const value = e.target.value;
    console.log("Expiry date: ", value);
    setExpiryDate(value);
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
    console.log("Gender: ", value);
    setGender(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let validInvoice = true;
    let errors = {};
    setErrorMessages({});

    try {
      //FIELD VALIDATION

      //Check invoice document number
      validInvoice = checkTextField(docNumber);
      if (!validInvoice) {
        errors.docNumber = "Please enter the invoice document number";
        setErrorMessages(errors);
      }

      //Check issue date
      validInvoice = checkDateField(issueDate);
      if (!validInvoice) {
        errors.issueDate = "Please enter a valid date";
        setErrorMessages(errors);
      } else {
        validInvoice = greaterThanCurrentDate(issueDate);
        if (!validInvoice) {
          errors.issueDate = "The issue date is greater that current date";
          setErrorMessages(errors);
        }
      }

      //Check expiry date
      validInvoice = checkDateField(expiryDate);
      if (!validInvoice) {
        errors.expiryDate = "Please enter a valid date";
        setErrorMessages(errors);
      } else if (issueDate !== "") {
        validInvoice = greaterThanFirstDate(expiryDate, issueDate);
        if (!validInvoice) {
          errors.expiryDate = "The issue date is greater than expiry date";
          setErrorMessages(errors);
        }
      }

      //Check VAT Base
      console.log("VAT Base: ", vatBase);
      validInvoice = checkTextField(vatBase);
      if (!validInvoice) {
        errors.vatBase = "Please enter a valid amount";
        setErrorMessages(errors);
      }
      //Check VAT Percentage
      console.log("VAT Percentage: ", vatPercentage);
      validInvoice = checkTextField(vatPercentage);
      if (!validInvoice) {
        errors.vatPercentage = "Please enter a valid percentage";
        setErrorMessages(errors);
      }
      //Check VAT Total
      console.log("VAT Total: ", vatTotal);

      //Check EUR Total amount
      console.log("EUR Total amount: ", eurTotalAmount);

      //Check USD Exchange rate
      console.log("USD Exchange rate: ", usdExchangeRate);
      validInvoice = checkTextField(usdExchangeRate);
      if (!validInvoice) {
        errors.usdExchangeRate = "Please enter a valid exchange rate";
        setErrorMessages(errors);
      }
      //Check USD Total amount
      console.log("USD Total amount: ", usdTotalAmount);

      //Check Age
      validInvoice = checkTextField(age);
      if (!validInvoice) {
        errors.age = "Please enter a valid age (18-99)";
        setErrorMessages(errors);
      } else {
        validInvoice = checkAgefield(age);
        if (!validInvoice) {
          errors.age = "Please enter a valid age (18-99)";
          setErrorMessages(errors);
        }
      }

      //Check for errors.
      if (Object.keys(errors).length === 0) {
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
    <>
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
            <InputLabel htmlFor="inputInvoiceId">Number</InputLabel>
            <OutlinedInput
              id="inputInvoiceId"
              labelWidth={60}
              placeholder="Document number"
              error={!!errorMessages.docNumber}
              value={docNumber}
              onChange={docNumberHandler}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
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
            id="txtIssueDate"
            label="Issue date"
            type="date"
            format=""
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            style={{ marginRight: "15px" }}
            width="20ch"
            error={!!errorMessages.issueDate}
            helperText={errorMessages.issueDate}
            value={issueDate}
            onChange={issueDateHandler}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
          />
          <TextField
            id="txtExpiryDate"
            label="Expiry date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            width="20ch"
            error={!!errorMessages.expiryDate}
            helperText={errorMessages.expiryDate}
            value={expiryDate}
            onChange={expiryDateHandler}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
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
            id="selectCategory"
            select
            label="Category"
            helperText="Please select the category associated with the invoice"
            variant="outlined"
            style={{ marginRight: "15px" }}
          >
            {/**{currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}**/}
          </TextField>
          <TextField
            id="selectOccupation"
            select
            label="Occupation"
            helperText="Please select the occupation(s) associated with the invoice"
            variant="outlined"
          >
            {/**{currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}**/}
          </TextField>
        </div>
        <div className={styles.divForm}>
          <TextField
            id="selectCountry"
            select
            label="Country"
            helperText="Please select the country"
            variant="outlined"
            style={{ marginRight: "15px" }}
          >
            {/**{currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}**/}
          </TextField>
          <TextField
            id="selectOffice"
            select
            label="Office"
            helperText="Please select the office"
            variant="outlined"
          >
            {/**{currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}**/}
          </TextField>
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
    </>
  );
}

export default NewInvoice;
