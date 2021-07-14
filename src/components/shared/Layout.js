import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default (props) => {
  return (
    <>
      <Header
        metamaskConnected={props.metamaskConnected}
        clicked={props.clicked}
      />
      {props.children}
      <Footer />
    </>
  );
};
