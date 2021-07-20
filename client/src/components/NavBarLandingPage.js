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

  return (
    <div>
      <>
        <Navbar className="fullNavbar" bg="dark" variant="dark">
          <div className="brandName">
            <Navbar.Brand href="#home">HealthCare Analyser & ChatBot</Navbar.Brand>
          </div>
          <Nav className="navbarLinks mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#purpose">About</Nav.Link>
            <Nav.Link href="#apply">Contributors</Nav.Link>

            <Button
              variant="primary"
              onClick={() => {
                history.push("/dashboard");
              }}
            >
              Login
            </Button>
          </Nav>
        </Navbar>
      </>
    </div>
  );
}