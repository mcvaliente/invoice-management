import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MetaMaskButton, Link } from "rimble-ui";

export default function MetaMaskInstallationDialog(props) {
  const [open, setOpen] = useState(true);

  const closeInstallationDialogHandler = () => {
    setOpen(false);
    props.metamaskDialogHandler();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={closeInstallationDialogHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">MetaMask installation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please, install the MetaMask browser extension to use our dapp's
            blockchain features in your current browser.
            <br />
            Then close this dialog in order to reload the page and try again.
            <br />
            <br />
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
            <MetaMaskButton size="small" className="metamaskButton">
              Get MetaMask Browser Extension
            </MetaMaskButton>
          </Link>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeInstallationDialogHandler}
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
