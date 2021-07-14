import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function ConfirmDialog(props) {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(true);

  const confirmPrimaryDialogCloseHandler = () => {
    setOpenConfirmDialog(false);
    props.confirmPrimaryDialogHandler();
  };

  const confirmSecondaryDialogCloseHandler = () => {
    setOpenConfirmDialog(false);
    props.confirmSecondaryDialogHandler();
  };

  return (
    <>
      <Dialog
        open={openConfirmDialog}
        onClose={confirmSecondaryDialogCloseHandler}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            {props.dialogDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={confirmPrimaryDialogCloseHandler}
            color="primary"
            variant="contained"
            autoFocus
          >
            {props.primaryButton}
          </Button>
          <Button
            onClick={confirmSecondaryDialogCloseHandler}
            color="primary"
            variant="contained"
          >
            {props.secondaryButton}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
