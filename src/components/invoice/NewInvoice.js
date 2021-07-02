import React, { useState } from "react";
import {
  checkTextField,
  checkDateField,
  greaterThanCurrentDate,
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
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";
import SaveIcon from "@material-ui/icons/Save";
import styles from "../../assets/css/NewInvoice.module.css";

function NewInvoice() {
  const [docNumber, setDocNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [paidInvoice, setPaidInvoice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  const GreenSwitch = withStyles({
    switchBase: {
      color: red[300],
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
          errors.issueDate = "The date is greater that current date";
          setErrorMessages(errors);
        }
      }

      //Check expiry date
      validInvoice = checkDateField(expiryDate);
      if (!validInvoice) {
        errors.issueDate = "Please enter a valid date.";
        setErrorMessages(errors);
      } else {
        validInvoice = greaterThanCurrentDate(expiryDate);
        if (!validInvoice) {
          errors.expiryDate = "The date is greater than current date";
          setErrorMessages(errors);
        }
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
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            style={{ marginRight: "50px" }}
            width="20ch"
            error={!!errorMessages.issueDate}
            helperText={errorMessages.issueDate}
            value={issueDate}
            onChange={issueDateHandler}
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
          />{" "}
        </div>
        <div className={styles.divForm}>
          <TextField
            id="selectCategory"
            select
            label="Category"
            helperText="Please select the invoice category"
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
          <FormControl variant="outlined" style={{ marginRight: "15px" }}>
            <InputLabel htmlFor="inputVatBase">VAT base</InputLabel>
            <OutlinedInput
              id="inputVatBase"
              startAdornment={
                <InputAdornment position="start">€</InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControl
            variant="outlined"
            style={{ marginRight: "50px", width: "10%" }}
          >
            <InputLabel htmlFor="inputVatPercentage">VAT percentage</InputLabel>
            <OutlinedInput
              id="inputVatPercentage"
              startAdornment={
                <InputAdornment position="start">%</InputAdornment>
              }
              labelWidth={115}
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="inputVatTotal">VAT total</InputLabel>
            <OutlinedInput
              id="inputVatTotal"
              startAdornment={
                <InputAdornment position="start">€</InputAdornment>
              }
              labelWidth={70}
              readOnly
              disabled
            />
          </FormControl>
        </div>
        <div className={styles.divForm}>
          <FormControl variant="outlined" style={{ marginRight: "15px" }}>
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
            />
          </FormControl>
          <TextField
            label="USD Exchange rate"
            id="txtUSDExchangerate"
            variant="outlined"
            style={{ marginRight: "15px" }}
          />
          <FormControl variant="outlined" style={{ marginRight: "50px" }}>
            <InputLabel htmlFor="inputTotalAmouNtUSD">
              USD Total amount
            </InputLabel>
            <OutlinedInput
              id="inputTotalAmouNtUSD"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={130}
              readOnly
              disabled
            />
          </FormControl>
        </div>
        <br />
        <Divider />
        <Typography variant="h6" className={styles.title} noWrap>
          Member details
        </Typography>
        <div className={styles.divButtonForm}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            type="submit"
          >
            Save
          </Button>
        </div>
        <div className={styles.spacer}> </div>
      </form>{" "}
    </>
  );
}

export default NewInvoice;