import React from "react";
import styles from "../../assets/css/Header.module.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";

const srcP2PModelsLogo = "/images/logo-p2pmodels.png";

const Header = () => {
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
        <IconButton aria-label="search" color="inherit" title="Buscar factura">
          <SearchIcon />
        </IconButton>
        <Button
          variant="contained"
          color="secondary"
          title="Iniciar sesión con MetaMask"
        >
          MetaMask
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
