import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import './LandingPage.css';
import { Link, useHistory } from "react-router-dom";


export default function NavBar() {
    const history = useHistory();
    
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
            <Button variant="primary" onClick={()=>{history.push("/login")}}>Login</Button>{''}
        </Nav>
        </Navbar>
      </>
    </div>
  );
}
