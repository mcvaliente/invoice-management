import React from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import Home from "./home/Home";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Container maxWidth="lg">
      <Header />
      <Switch>
        {/* The Switch decides which component to show based on the current URL.*/}
        <Route exact path="/" component={() => <Home />} />
      </Switch>
      <Footer />
    </Container>
  );
}

export default App;
