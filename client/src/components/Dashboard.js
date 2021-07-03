import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();
  const message = currentUser.email + " successfully logged in";

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  console.log(currentUser);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <>
          <Card>
            <Card.Body>
              {currentUser && <Alert variant="success">{message}</Alert>}
              <h3>Dashboard</h3>
            </Card.Body>
          </Card>
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
          <Button
            variant="link"
            onClick={() => {
              history.push("/landingPage");
            }}
          >
            <h3>RE-DIRECT</h3>
          </Button>
        </>
      </div>
    </Container>
  );
}
