import React from "react";
import InvoiceInfo from "../invoice/InvoiceInfo";
import Layout from "../shared/Layout";

export default function Home(props) {
  return (
    <>
      <Layout
        metaMaskConnected={props.metaMaskConnected}
        clicked={props.clicked}
      >
        <InvoiceInfo metaMaskConnected={props.metaMaskConnected} />
      </Layout>
    </>
  );
}
