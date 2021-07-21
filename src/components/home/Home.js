import React from "react";
import NewInvoice from "../invoice/NewInvoice";
import Layout from "../shared/Layout";

export default function Home(props) {
  return (
    <>
      <Layout
        metamaskConnected={props.metamaskConnected}
        clicked={props.clicked}
        hideGeneralSearch={props.hideGeneralSearch}
      >
        <NewInvoice metamaskConnected={props.metamaskConnected} />
      </Layout>
    </>
  );
}
