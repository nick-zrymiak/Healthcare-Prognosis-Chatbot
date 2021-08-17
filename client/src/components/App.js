import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import EditUserData from "./EditUserData.js"
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import RecoverPassword from "./RecoverPassword";
import LandingPage from "./LandingPage";
import LDAHeartDiseaseSection from "./LDAHeartDiseaseToolSection";
import ChatBotSection from "./ChatBotSection";
import MRIDiseasePredictorSection from "./MRIDiseasePredictorSection";

function App() {
  return (

    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/recover-password" component={RecoverPassword} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/editUserData" component={EditUserData} />
          <PrivateRoute exact path="/LDAHeartDisease" component={LDAHeartDiseaseSection} />
          <PrivateRoute exact path="/ChatBot" component={ChatBotSection} />
          <PrivateRoute exact path="/mri" component={MRIDiseasePredictorSection} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
