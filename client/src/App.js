import './bootstrap.min.css';
import "./App.css";
import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainGaming from "./components/MainGame";
import Login from "./components/LoginComponent"
import Register from "./components/Register";


function App() {
  return (
    <div className="App">
      <div className="game">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <MainGaming />
            </Route>
            <Route exact path="/api/signup">
              <Register />
            </Route>
            <Route exact path="/api/login">
              <Login />
            </Route>
          </Switch>
        </BrowserRouter>
      </div >
    </div >
  );
}

export default App;
