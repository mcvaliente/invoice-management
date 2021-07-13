import React, { useState } from "react";
import styles from "../../assets/css/Header.module.css";
import {
  AppBar,
  Toolbar,
  Link,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import HelpIcon from "@material-ui/icons/Help";
import { MetaMaskButton } from "rimble-ui";
import InvoiceSearchDialog from "../invoice/InvoiceSearchDialog";
import { Redirect } from "react-router-dom";

const Header = (props) => {
  const srcP2PModelsLogo = "/images/logo-p2pmodels.png";

  const [invoiceSearch, setInvoiceSearch] = useState(false);
  const [docNumber, setDocNumber] = useState("");
  const [invoiceInfoRedirect, setInvoiceInfoRedirect] = useState(false);

  const invoiceSearchHandler = () => {
    setInvoiceSearch(true);
  };

  const okInvoiceSearchHandler = (invoiceId) => {
    console.log("Document number: ", invoiceId);
    setInvoiceSearch(false);
    setDocNumber(invoiceId);
    setInvoiceInfoRedirect(true);
  };

  const cancelInvoiceSearchHandler = () => {
    console.log("Cancel searching proces...");
    setInvoiceSearch(false);
  };

  if (invoiceInfoRedirect) {
    return <Redirect to={`/invoice/${docNumber}`}></Redirect>;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <img
            src={srcP2PModelsLogo}
            alt="P2P Models"
            width="70"
            height="70"
            className={styles.logo}
          />
          <Typography className={styles.title} variant="h5" noWrap>
            P2P Models
          </Typography>
          <Tooltip title="Search for an invoice by doc number" arrow>
            <IconButton
              aria-label="search"
              color="inherit"
              style={{ marginRight: 20 }}
              onClick={invoiceSearchHandler}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="What is a wallet?" arrow>
            <Link
              color="inherit"
              href="https://ethereum.org/en/wallets/"
              target="_blank"
              style={{ marginRight: 5 }}
            >
              <HelpIcon style={{ color: "#565956", fontSize: 25 }} />
            </Link>
          </Tooltip>
          <MetaMaskButton
            onClick={props.clicked}
            className={styles.metaMaskButton}
            disabled={props.metamaskConnected}
          >
            {props.metamaskConnected
              ? "Connected with MetaMask"
              : "Connect with MetaMask"}
          </MetaMaskButton>
        </Toolbar>
      </AppBar>
      {invoiceSearch ? (
        <InvoiceSearchDialog
          invoiceSearchCancelDialogHandler={cancelInvoiceSearchHandler}
          invoiceSearchOKDialogHandler={okInvoiceSearchHandler}
        />
      ) : null}
    </>
  );
};

export default Header;
