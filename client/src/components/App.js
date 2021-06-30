import React from "react"
import Signup from "./Signup"
import Login from "./Login"
import Dashboard from "./Dashboard"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import RecoverPassword from "./RecoverPassword"
import LandingPage from "./LandingPage"

function App() {
  return (
    <Container
		className="d-flex align-items-center justify-content-center"
		style={{ minHeight: "100vh" }}
    >
		<div className="w-100" style={{ maxWidth: "400px" }}>
			<Router>
				<AuthProvider>
					<Switch>
						<Route path="/landingPage" component={LandingPage} />

						<Route path="/signup" component={Signup} />
						<Route path="/login" component={Login} />
						<Route path="/recover-password" component={RecoverPassword} />
						<PrivateRoute exact path="/" component={Dashboard}/>
					</Switch>
				</AuthProvider>
			</Router>
		</div>
    </Container>
  )
}

export default App;
