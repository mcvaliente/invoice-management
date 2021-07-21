import React from "react";
import InvoiceInfo from "../invoice/InvoiceInfo";
import Layout from "../shared/Layout";

export default function Home(props) {
  return (
    <>
      <Layout
        metamaskConnected={props.metamaskConnected}
        clicked={props.clicked}
        hideGeneralSearch={props.hideGeneralSearch}
      >
        <InvoiceInfo metamaskConnected={props.metamaskConnected} />
      </Layout>
    </>
  );
}
