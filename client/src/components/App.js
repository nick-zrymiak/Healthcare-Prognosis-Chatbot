import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import RecoverPassword from "./RecoverPassword";
import LandingPage from "./LandingPage";

function App() {
  return (

    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={Signup} />

          <Route path="/login" component={Login} />
          <Route path="/recover-password" component={RecoverPassword} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/landingPage" component={LandingPage} />

		  compnent xx
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
