import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBarDashboard from "./NavBarDashboard";
import database from "../firebase/Database";
import UserDataSection from "./UserDataSection";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const [data, updateData] = useState();
  const history = useHistory();
  const message = currentUser.email + " successfully logged in";
  console.log(message);

  const loadUserData = () => {
    const db = new database();
    const getData = async () => {
      const json = await db.getUserInfo(currentUser.uid);
      updateData(json);
    };
    getData();
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log('submit button clicked')
    
  }

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <div>
      <NavBarDashboard expand="lg"></NavBarDashboard>
      <Container
        // className="d-flex align-items-center justify-content-sr"
        style={{ minHeight: "100vh", paddingTop:'250px' }}
      >
        {/* <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              {currentUser && <Alert variant="success">{message}</Alert>}
              {data && data.firstName && "Hello " + data.firstName}
            </Card.Body>
          </Card>
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
          <Button
            variant="link"
            onClick={() => {
              history.push("/");
            }}
          >
            <h3>Go Back To Landing Page</h3>
          </Button>
        </div> */}
        {/* <h3>Go Back To Landing Page</h3> */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Type in your symptoms:</Form.Label>
            <Form.Control as="textarea" rows={1} placeholder='weakness fever cold' />
           
          </Form.Group>
          <Button variant="link" type="submit">
            SUBMIT
          </Button>
        </Form>
      </Container>

      <UserDataSection></UserDataSection>
    </div>
  );
}
