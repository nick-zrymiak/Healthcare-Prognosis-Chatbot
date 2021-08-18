import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBarDashboard from "./NavBarDashboard";
import database from "../firebase/Database";
import UserDataSection from "./UserDataSection";
import axios from 'axios';

import dummpyPicture from '../'

export default function Dashboard() {
  const [chatData, setChatData] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // setChatData('chatData changed');

    // make an axios call
    const article = { title: 'React Hooks POST Request Example' };
    axios.
      post('http://localhost:8000/api/lda', article)
      .then(response => {
        console.log(response.data);
        setChatData(response.data);
      })
      .catch(error => {
        console.log('baal error:', error);
      })
    // fetch data from post
    // render response

    if (chatData.length < 1) {
      setChatData('no response from backend yet');
    }


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
      <Card>
        <Card.Body>
          {currentUser && <Alert variant="success">{message}! {data && data.firstName && "Hello " + data.firstName}!</Alert>}
        </Card.Body>
      </Card>

      <UserDataSection></UserDataSection>

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
