import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "@material-ui/core";

export default (props) => {
  return (
    <Container>
      <Header
        metamaskConnected={props.metaMaskConnected}
        clicked={props.clicked}
      />
      {props.children}
      <Footer />
    </Container>
  );
};
