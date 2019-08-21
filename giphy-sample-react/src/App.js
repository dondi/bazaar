import React, { useEffect } from "react";

import "./App.css";

import AppHeader from "./AppHeader";
import SearchForm from "./SearchForm";

import { apiHost } from "./api";

const App = () => {
  // Because App is the "uppermost" component (see index.js), code in the useEffect function
  // method is equivalent to an overall initialization routine. Note however that every component
  // can have its own useEffect, and so initialization can be separated on a per-component
  // basis.

  useEffect(() => {
    apiHost("http://api.giphy.com/v1/");
  });

  // This React functional component returns & renders the component’s content
  // in terms of HTML and other components. It must return one and only one top-level element.
  return (
    <div className="App">
      <AppHeader />
      <SearchForm />
    </div>
  );
};

export default App;
