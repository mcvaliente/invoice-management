import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./App";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  </HashRouter>,
  document.getElementById("root")
);
