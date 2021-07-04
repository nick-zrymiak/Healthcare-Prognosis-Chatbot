import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import './LandingPage.css';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function NavBar() {
    const[refresh,setRefresh] = useState(false);
    const history = useHistory();
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { currentUser, logout } = useAuth();

    useEffect(() => checkIfLoggedIn(), []);
    
    const checkIfLoggedIn = () => {
        console.log('current user', currentUser);
        if( currentUser !=null){
            setIsLoggedIn(true);
        }
        else
            setIsLoggedIn(false);
    }

    const handleLogout = () => {
        console.log('logging out');
        console.log('current user now:', currentUser)
        setError("");
        try {
          logout();
        //   history.push("/login");
            setRefresh(!refresh);
        } catch {
          setError("Failed to log out");
        }
      }
    
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

            {isLoggedIn
                ?<Button variant="primary" onClick={()=>{handleLogout()}}>LogOut</Button>
                :<Button variant="primary" onClick={()=>{history.push("/login")}}>Login</Button>
            }
        </Nav>
        </Navbar>
      </>
    </div>
  );
}
