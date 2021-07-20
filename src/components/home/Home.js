import React from "react";
import NewInvoice from "../invoice/NewInvoice";
import Layout from "../shared/Layout";

export default function Home(props) {
  return (
    <>
      <Layout
        metaMaskConnected={props.metaMaskConnected}
        clicked={props.clicked}
      >
        <NewInvoice metaMaskConnected={props.metaMaskConnected} />
      </Layout>
    </>
  );
}
