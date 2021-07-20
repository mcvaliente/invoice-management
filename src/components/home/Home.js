import React from "react";
import NewInvoice from "../invoice/NewInvoice";

export default function Home(props) {
  return (
    <>
      <NewInvoice metaMaskConnected={props.metaMaskConnected} />
    </>
  );
}
