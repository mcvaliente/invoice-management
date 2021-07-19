import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function MetaMaskConnectionDialog(props) {
  const [openConnectionDialog, setOpenConnectionDialog] = useState(true);

  const connectionDialogCloseHandler = () => {
    setOpenConnectionDialog(false);
    props.metamaskConnDialogHandler();
  };

  return (
    <>
      <Dialog
        open={openConnectionDialog}
        onClose={connectionDialogCloseHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"MetaMask Account Connection Error"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.errorMessage}
            <br />
            <br />
            Please, check your MetaMask browser extension.
            <br />
            Then close this dialog try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={connectionDialogCloseHandler}
            color="primary"
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
