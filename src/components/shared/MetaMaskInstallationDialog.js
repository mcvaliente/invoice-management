import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MetaMaskButton, Link } from "rimble-ui";

export default function AlertDialog(props) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    props.metamaskDialogHandler();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"MetaMask installation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Install the MetaMask browser extension to user our blockchain
            features in your current browser and then close this dialog.
            Supported Browsers:{" "}
            <Link
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
              target="_blank"
            >
              Chrome
            </Link>
            ,{" "}
            <Link
              href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/"
              target="_blank"
            >
              Firefox
            </Link>
            ,{" "}
            <Link
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
              target="_blank"
            >
              Brave
            </Link>
            ,{" "}
            <Link
              href="https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm?hl=en-US"
              target="_blank"
            >
              Edge
            </Link>
          </DialogContentText>
          <Link href="https://metamask.io/download.html" target="_blank">
            <MetaMaskButton size="small">
              Get MetaMask Browser Extension
            </MetaMaskButton>
          </Link>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
