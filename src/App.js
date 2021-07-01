import React from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import Footer from "./components/shared/Footer";
import Home from "./components/home/Home";
import { Switch, Route } from "react-router-dom";
import Error404 from "./components/error/Error404";

function App() {
  return (
    <>
      <Container>
        <Switch>
          {/* The Switch decides which component to show based on the current URL.*/}
          <Route exact path="/" component={() => <Home />} />
          {/* Redirect user to a specific page if the route does not exist. */}
          <Route component={Error404} />
        </Switch>
        <Footer />
      </Container>
    </>
  );
}

export default App;
