import React from "react";
import Layout from "../shared/Layout";
import NewInvoice from "../invoice/NewInvoice";

export function Home(props) {
  return (
    <>
      <Layout
        metamaskInstalled={props.metamaskInstalled}
        validNetwork={props.validNetwork}
        metamaskConnected={props.metamaskConnected}
        clicked={props.clicked}
      >
        <NewInvoice />
      </Layout>
    </>
  );
}

export default Home;
