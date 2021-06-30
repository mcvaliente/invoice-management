import React from "react";
import {
  FormControl,
  InputLabel,
  TextField,
  Typography,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";

import styles from "../../assets/css/NewInvoice.module.css";

function NewInvoice() {
  return (
    <>
      <Typography variant="h5" className={styles.title} noWrap>
        Add a new invoice
      </Typography>
      <form className={styles.newInvoice} noValidate autoComplete="off">
        <Typography variant="h6" className={styles.title} noWrap>
          Invoice details
        </Typography>
        <br />
        <div>
          <FormControl variant="outlined" style={{ width: "50%" }}>
            <InputLabel htmlFor="inputInvoiceId">Number</InputLabel>
            <OutlinedInput
              id="inputInvoiceId"
              labelWidth={60}
              placeholder="Document number"
            />
          </FormControl>
        </div>
        <br />
        <div>
          <TextField
            id="txtIssueDate"
            label="Issue date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            style={{ width: "15%", marginRight: "50px" }}
          />
          <TextField
            id="txtExpiryDate"
            label="Expiry date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            style={{ width: "15%" }}
          />{" "}
        </div>
        <br />
        <div>
          <FormControl
            variant="outlined"
            style={{ width: "40%", marginRight: "25px" }}
          >
            <InputLabel htmlFor="inputVatBase">VAT base</InputLabel>
            <OutlinedInput
              id="inputVatBase"
              startAdornment={
                <InputAdornment position="start">€</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
          <FormControl variant="outlined" style={{ width: "40%" }}>
            <InputLabel htmlFor="inputVatTotal">VAT total</InputLabel>
            <OutlinedInput
              id="inputVatTotal"
              startAdornment={
                <InputAdornment position="start">€</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
        </div>
      </form>{" "}
    </>
  );
}

export default NewInvoice;
