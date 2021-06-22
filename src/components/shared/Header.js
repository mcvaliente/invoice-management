import React from "react";
import styles from "../../assets/css/Header.module.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { MetaMaskButton } from "rimble-ui";

const srcP2PModelsLogo = "/images/logo-p2pmodels.png";

const invoiceSearchHandler = (invoiceId) => {
  console.log("New invoice id to search");
  alert("New invoice Search");
};

const connectMetaMaskHandler = () => {
  alert("Connect MetaMask");
};

const Header = (props) => {
  return (
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
        {props.metamaskInstalled && props.validNetwork ? (
          <>
            <IconButton
              aria-label="search"
              color="inherit"
              title="Search invoice"
              style={{ marginRight: 20 }}
              onClick={invoiceSearchHandler}
            >
              <SearchIcon />
            </IconButton>
            <MetaMaskButton
              onClick={connectMetaMaskHandler}
              className={styles.metaMaskButton}
            >
              Connect with MetaMask
            </MetaMaskButton>
          </>
        ) : (
          <>
            <IconButton
              aria-label="search"
              color="inherit"
              title="Search invoice"
              style={{ marginRight: 20 }}
              disabled
            >
              <SearchIcon />
            </IconButton>
            <MetaMaskButton disabled className={styles.metaMaskButton}>
              Connect with MetaMask
            </MetaMaskButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
