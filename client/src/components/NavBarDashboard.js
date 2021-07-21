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

  const handleLogout = () => {
    console.log("logging out...");
    setError("");
    try {
      logout();
      history.push("/dashboard");
      setRefresh(!refresh);
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <div>
      <>
        <Navbar className="fullNavbar" bg="dark" variant="dark">
          <div className="brandName">
            <Navbar.Brand href="./LandingPage.js">HealthCare Analyser & ChatBot</Navbar.Brand>
          </div>
          <Nav className="navbarLinks mr-auto">
            <Nav.Link href="#bot">Chat Bot</Nav.Link>
            <Nav.Link href="#heart">Heart Disease Tool</Nav.Link>
            <Nav.Link href="#mri">MRI Analysis Tool</Nav.Link>
            <Nav.Link href="#audio">Audio Analysis Tool</Nav.Link>

            <Button
              variant="primary"
              onClick={() => {
                handleLogout();
              }}
            >
              LogOut
            </Button>
          </Nav>
        </Navbar>
      </>
    </div>
  );
}
