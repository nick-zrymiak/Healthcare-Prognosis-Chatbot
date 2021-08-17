import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import database from "../firebase/Database"

export default function ChatBotSection() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [symptomDescription, setSymptomDescription] = useState("");

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
      <div className="textSubSection">
        <h3>Symptom Chatbot Tool</h3>
      </div>
      <div onSubmit={handleSubmit} className="w-75">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group as={Row} className="mb-3 mt-2">
            <Form.Label as="legend" column sm={2}>
              Please describe your symptoms.
            </Form.Label>
            <Col sm={20}>
              <Form.Control
                type="String"
                placeholder={"ex. My Chest and stomach hurt. My throat is dry and my nose is runny. I can't sleep at night"}
                onChange={(e) => {
                  setSymptomDescription(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          {/* ***********HANDLE SUBMIT*********** */}
          <Button disabled={loading} variant="primary" value="submit" type="submit">
            Submit
          </Button>
          <div className="mt-3">
            <Link to="/dashboard">Back To Dashboard</Link>
          </div>
        </Form>
      </div>
    </section>
  );
}
