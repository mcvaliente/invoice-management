import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default (props) => {
  return (
    <>
      <Header
        metamaskInstalled={props.metamaskInstalled}
        validNetwork={props.validNetwork}
        metamaskConnected={props.metamaskConnected}
        clicked={props.clicked}
      />
      {props.children}
      <Footer />
    </>
  );
};
