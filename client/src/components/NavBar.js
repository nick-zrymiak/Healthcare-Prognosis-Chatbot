import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "./LandingPage.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { currentUser, logout } = useAuth();
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => checkIfLoggedIn(), [isLoggedIn]);

  const checkIfLoggedIn = () => {
    // renderAuthButton();
    console.log("isLoggedIn:", isLoggedIn);
    console.log("current user", currentUser);
    if (currentUser != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    console.log("logging out...");
    setError("");
    try {
      logout();
      history.push("/landingPage");
      setRefresh(!refresh);
    } catch {
      setError("Failed to log out");
    }
    checkIfLoggedIn();
    history.push("/landingPage");
    console.log("current user now:", currentUser);
  };

  return (
    <div>
      <>
        <Navbar className="fullNavbar" bg="dark" variant="dark">
          <div className="brandName">
            <Navbar.Brand href="#home">HealthCare</Navbar.Brand>
          </div>
          <Nav className="navbarLinks mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#purpose">Purpose</Nav.Link>
            <Nav.Link href="#apply">Apply</Nav.Link>

            {isLoggedIn ? (
              <Button
                variant="primary"
                onClick={() => {
                  handleLogout();
                }}
              >
                LogOut
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  history.push("/login");
                }}
              >
                Login
              </Button>
            )}
          </Nav>
        </Navbar>
      </>
    </div>
  );
}
