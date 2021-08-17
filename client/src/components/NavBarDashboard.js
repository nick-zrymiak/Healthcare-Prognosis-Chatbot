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
            <Navbar.Brand href="./LandingPage.js">HealthCare Analyser & ChatBot
              <span className='beatingHeart'>
                <svg
                  // width="108px"
                  // height="128px"
                  width="60px"
                  height="35px"
                  viewBox="0 0 54 64"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlnssketch="http://www.bohemiancoding.com/sketch/ns"
                >
                  <defs></defs>
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    sketchtype="MSPage"
                  >
                    <path
                      className="beat-loader"
                      d="M0.5,38.5 L16,38.5 L19,25.5 L24.5,57.5 L31.5,7.5 L37.5,46.5 L43,38.5 L53.5,38.5"
                      id="Path-2"
                      strokeWidth="2"
                      sketchtype="MSShapeGroup"
                    ></path>
                  </g>
                </svg>
              </span>
            </Navbar.Brand>
          </div>

          <Nav className="navbarLinks mr-auto">
            <Nav.Link href="/ChatBot">Chat Bot</Nav.Link>
            <Nav.Link href="/LDAHeartDisease">Heart Disease Tool</Nav.Link>
            <Nav.Link href="/mri">MRI Analysis Tool</Nav.Link>
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
