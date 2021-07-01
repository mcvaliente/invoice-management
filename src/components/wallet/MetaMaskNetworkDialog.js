import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function MetaMaskNetworkDialog(props) {
  const [openNetworDialog, setOpenNetworkDialog] = useState(true);

  const networkDialogCloseHandler = () => {
    setOpenNetworkDialog(false);
    props.metamaskNetDialogHandler();
  };

  return (
    <>
      <Dialog
        open={openNetworDialog}
        onClose={networkDialogCloseHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"MetaMask Network Selection"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Switch to the Rinkeby Test Network in MetaMask.
            <br />
            Please, change your network in your MetaMask extension.
            <br />
            You're currently on: {props.currentNetwork}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={networkDialogCloseHandler} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
