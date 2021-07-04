import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import './LandingPage.css';


export default function NavBar() {
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
        </Nav>
        </Navbar>
      </>
    </div>
  );
}
