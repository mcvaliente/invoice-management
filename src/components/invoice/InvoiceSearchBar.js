import React, { useState, useRef } from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const InvoiceSearchBar = (props) => {
  const [invoiceValue, setInvoiceValue] = useState(props.defaultValue);

  const inputInvoiceIdRef = useRef();

  const invoiceHandler = (invoiceId) => {
    props.invoiceValueHandler(invoiceId);
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      //Check if we have this member Id in the blockchain.
      invoiceHandler(e.target.value);
    }
  };

  const mouseClickHandler = () => {
    if (invoiceValue !== "") {
      //Check if we have this member Id in the blockchain.
      invoiceHandler(invoiceValue);
    } else {
      inputInvoiceIdRef.current.focus();
    }
  };

  return (
    <>
      <TextField
        id="txtInvoiceId"
        label="Invoice"
        placeholder="Invoice document number"
        type="text"
        variant="outlined"
        width="20ch"
        value={invoiceValue}
        onChange={(event) => setInvoiceValue(event.target.value)}
        onKeyPress={keyPressHandler}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start" onClick={mouseClickHandler}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default InvoiceSearchBar;
