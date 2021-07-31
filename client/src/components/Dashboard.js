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
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              {currentUser && <Alert variant="success">{message}</Alert>}
              {data && data.firstName && "Hello " + data.firstName}
            </Card.Body>
          </Card>
        </div>
      </Container>
      <UserDataSection></UserDataSection>

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
    </div>
  );
}
