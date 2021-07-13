import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//Using Hooks.
const InvoiceInfo = (props) => {
  const { id } = useParams();

  useEffect(() => {
    console.log("InvoiceInfo ::: Invoice id: ", id);
  }, [id]);

  return (
    <div>
      <h1>Invoice info: {id}</h1>
    </div>
  );
};

export default InvoiceInfo;
