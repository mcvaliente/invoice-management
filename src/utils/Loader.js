import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

//Loader to use when the user is waiting for the execution of an operation.
export const Loader = () => {
  return (
    <div className="loaderStyle">
      <CircularProgress style={{ marginTop: 150, color: "#aa4994" }} />
    </div>
  );
};
