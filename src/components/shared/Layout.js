import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "@material-ui/core";

function Layout(props) {
  return (
    <Container>
      <Header
        metamaskConnected={props.metamaskConnected}
        clicked={props.clicked}
        hideGeneralSearch={props.hideGeneralSearch}
        width="xs"
      />
      {props.children}
      <Footer />
    </Container>
  );
}

export default Layout;
