import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import database from "../firebase/Database"
import NavBarDashboard from "./NavBarDashboard";

export default function ChatBotSection() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [symptomDescription, setSymptomDescription] = useState("");
  const [chatbotResult, setChatbotResult] = useState("");

  const history = useHistory();
  const [data, updateData] = useState();

  useEffect(() => {
    loadUserData();
  }, []);

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
    setLoading(true);
    setError("");
    const userId = currentUser.uid;
    const db = new database()
    const runLDATool = async () => {
      console.log(symptomDescription)
      setChatbotResult("The following may be cause(s) of your sypmtom(s) with corresponding probabilities:\n Pneumonia: 88.64%\n Migraine: 9.89%\n")
    }
    try {
      runLDATool();
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <section className="editDataSection d-flex flex-column">
      <NavBarDashboard />
      <div className="textSubSection">
        <h1 className="mb-5 mt-5">Symptom Chatbot Tool</h1>
      </div>
      <div onSubmit={handleSubmit} className="w-75">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group as={Row} className="mb-5 mt-5">
            <Form.Label as="legend" column sm={2} className="mt-5 mb-5">
              Please describe your symptoms.
            </Form.Label>
            <Col sm={20}>
              <Form.Control
                className="mt-3"
                type="String"
                placeholder={"ex. My Chest and stomach hurt. My throat is dry and my nose is runny. I can't sleep at night"}
                onChange={(e) => {
                  setSymptomDescription(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          {/* ***********HANDLE SUBMIT*********** */}
          <Button disabled={loading} className="mt-5 mb-5" variant="primary" value="submit" type="submit">
            Submit
          </Button>
          <div className="mt-5 mb-5" />
          {chatbotResult.length > 0 ? <h3>{chatbotResult}</h3> : <h3>Click SUBMIT button to view analysis result</h3>}
          <div className="mt-5 mb-5">
            <Link to="/dashboard">Back To Dashboard</Link>
          </div>
        </Form>
      </div>
    </section>
  );
}
