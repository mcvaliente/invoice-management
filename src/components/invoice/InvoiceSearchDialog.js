import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

export default function InvoiceSearchDialog(props) {
  const [openInvoiceSearchDialog, setOpenInvoiceSearchDialog] = useState(true);
  const [invoiceValue, setInvoiceValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const inputInvoiceIdRef = useRef();

  const invoiceSearchCancelDialogCloseHandler = () => {
    setOpenInvoiceSearchDialog(false);
    setErrorMessage("");
    props.invoiceSearchCancelDialogHandler();
  };

  const invoiceSearchOKDialogCloseHandler = () => {
    setErrorMessage("");
    if (invoiceValue === "") {
      setErrorMessage("Please enter the document number of the invoice");
      inputInvoiceIdRef.current.focus();
    } else {
      setOpenInvoiceSearchDialog(false);
      props.invoiceSearchOKDialogHandler(invoiceValue);
    }
  };

  return (
    <>
      <Dialog
        open={openInvoiceSearchDialog}
        onClose={invoiceSearchCancelDialogCloseHandler}
        aria-labelledby="invoicesearch-dialog-title"
        aria-describedby="invoicesearch-dialog-description"
      >
        <DialogTitle id="invoicesearch-dialog-title">Search</DialogTitle>
        <DialogContent>
          <DialogContentText id="invoicesearch-dialog-description">
            To search for a specific invoice, please enter the document number.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="invoiceSearchId"
            label="# Invoice"
            type="text"
            fullWidth
            value={invoiceValue}
            onChange={(event) => setInvoiceValue(event.target.value)}
            error={!!errorMessage}
            helperText={errorMessage}
            inputRef={inputInvoiceIdRef}
          />{" "}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={invoiceSearchCancelDialogCloseHandler}
            color="primary"
            variant="contained"
            autoFocus
          >
            Cancel
          </Button>
          <Button
            onClick={invoiceSearchOKDialogCloseHandler}
            color="primary"
            variant="contained"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
