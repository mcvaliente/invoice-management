import React from "react";
import Layout from "../shared/Layout";
import NewInvoice from "../invoice/NewInvoice";

export default function Home(props) {
  return (
    <>
      <Layout
        metamaskConnected={props.metaMaskConnected}
        clicked={props.clicked}
      >
        <NewInvoice metaMaskConnected={props.metaMaskConnected} />
      </Layout>
    </>
  );
}
