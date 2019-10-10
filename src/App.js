import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import NotFound404 from "./components/NotFound404";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />
            <div>
              <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route component={NotFound404} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
