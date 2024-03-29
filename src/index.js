import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import Home from "./pages/Home";
import { createUseStyles } from "react-jss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const useStyles = createUseStyles({
  "@global": {
    "*": {
      margin: 0,
      padding: 0,
      border: "none",
      fontFamily: "'Montserrat', sans-serif",
      listStyle: "none",
      textDecoration: "none",
    },
  },
});

const App = () => {
  useStyles();

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
