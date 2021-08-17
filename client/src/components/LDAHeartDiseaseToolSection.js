import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import database from "../firebase/Database";
import axios from "axios";

export default function LDAHeartDiseaseSection() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // 0 represents female, 1 represents male
  const [age, setAge] = useState(20);
  const [gender, setGender] = useState(1);
  //0: typical angina, 1: atypical angina, 2: non-anginal pain, 3: no pain
  const [chestPain, setChestPain] = useState(3);
  const [restingBloodPressure, setRestingBloodPressure] = useState(140);
  const [serumCholestoral, setSerumCholestoral] = useState(230);
  const [lowBloodSugar, setLowBloodSugar] = useState(0);
  const [electrocardiograph, setElectrocardiograph] = useState(0);
  const [maxHeartRate, setMaxHeartRate] = useState(0);
  const [exerciseInducedAngina, setExerciseInducedAngina] = useState(0);
  const [STDepresionDifference, setSTDepresionDifference] = useState(0.1);
  const [STSegmentSlope, setSTSegmentSlope] = useState(0);
  const [majorVesselsColored, setMajorVesselsColored] = useState(0);
  const [thal, setThal] = useState(0);

  const history = useHistory();
  const [data, updateData] = useState();

  //Data to be sent to backend for processing
  const sendData = {
    A:age,
    B:gender,
    C:chestPain,
    D:restingBloodPressure,
    E:serumCholestoral,
    F:lowBloodSugar,
    G:electrocardiograph,
    H:maxHeartRate, //done
    I:exerciseInducedAngina,
    J:STDepresionDifference,
    K:STSegmentSlope,
    L:majorVesselsColored,
    M:thal,
  };

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
      console.log(chestPain)
      console.log(STDepresionDifference)
      console.log(thal)


      //make the post request
     
      axios.
      post('http://localhost:8000/api/lda',  sendData)
      .then(response =>{
        console.log('\tserver responded with:')
        console.log(response.data);
        // setChatData(response.data);
      })
      .catch( error=>{
        console.log('baal error:', error);
      })

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
        <h3>LDA Heart Disease Tool</h3>
      </div>
      <div onSubmit={handleSubmit} className="w-75">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group as={Row} className="mb-3 mt-2">
            <Form.Label as="legend" column sm={2}>
              Chest Pain (0: typical angina, 1: atypical angina, 2: non-anginal pain, 3: no pain)
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                type="number"
                placeholder={"ex. 3"}
                onChange={(e) => {
                  setChestPain(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Age of the patient in years</Form.Label>
            <Form.Control
              type="text"
              placeholder={data && data.age || "ex. 28"}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group as={Row} className="mb-3 mt-2">
            <Form.Label as="legend" column sm={2}>
              Sex
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Male"
                value="Male"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                onChange={(e) => {
                  setGender(1);
                }}
              //   checked="Male"
              />
              <Form.Check
                type="radio"
                label="Female"
                value="Female"
                name="formHorizontalRadios"
                onChange={(e) => {
                  setGender(0);
                }}
                id="formHorizontalRadios2"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 mt-2">
            <Form.Label as="legend" column sm={2}>
              Chest Pain (0: typical angina; 1: atypical angina; 2: non-anginal pain; 3: no pain)
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                type="number"
                placeholder={"ex. 3"}
                onChange={(e) => {
                  setChestPain(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 mt-2">
            <Form.Label as="legend" column sm={2}>
              trestbps: Resting blood pressure
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                type="number"
                placeholder={"ex. 140"}
                onChange={(e) => {
                  setRestingBloodPressure(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 mt-2">
            <Form.Label as="legend" column sm={2}>
              chol: Serum cholestoral in mg/dl,
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                type="number"
                placeholder={"ex. 230"}
                onChange={(e) => {
                  setSerumCholestoral(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 mt-2">
            <Form.Label as="legend" column sm={2}>
              Blood sugar below 120 mg/dl (1: true; 0: false)
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                type="number"
                placeholder={"ex. 0"}
                onChange={(e) => {
                  setLowBloodSugar(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          resting electrocardiographic results(0: normal 1: having ST - T wave abnormality

          <Form.Group as={Row} className="mb-3 mt-2">
            <Form.Label as="legend" column sm={2}>
              Resting electrocardiographic results(0: normal; 1: ST - T wave abnormality)
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                type="number"
                placeholder={"ex. 0"}
                onChange={(e) => {
                  setElectrocardiograph(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 mt-2">
            <Form.Label as="legend" column sm={2}>
              Maximum heart rate (beats per minute)
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                type="number"
                placeholder={"ex. 151"}
                onChange={(e) => {
                  setMaxHeartRate(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 mt-2">
            <Form.Label as="legend" column sm={2}>
              Exercise induced angina(1: yes; 0: no)
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                type="number"
                placeholder={"ex. 0"}
                onChange={(e) => {
                  setExerciseInducedAngina(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 mt-2">
            <Form.Label as="legend" column sm={2}>
              ST depression induced by exercise relative to rest
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                type="float"
                placeholder={"ex. 0.1"}
                onChange={(e) => {
                  setSTDepresionDifference(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 mt-2">
            <Form.Label as="legend" column sm={2}>
              Slope of peak exercise ST segment(0: upsloping 1: flat 2: downsloping)
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                type="number"
                placeholder={"ex. 0"}
                onChange={(e) => {
                  setSTSegmentSlope(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 mt-2">
            <Form.Label as="legend" column sm={2}>
              Major vessels(0 - 3) colored by flourosopy
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                type="number"
                placeholder={"ex. 0"}
                onChange={(e) => {
                  setMajorVesselsColored(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 mt-2">
            <Form.Label as="legend" column sm={2}>
              thal(0: normal; 1: fixed defect; 2: reversable defect)
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                type="number"
                placeholder={"ex. 0"}
                onChange={(e) => {
                  setThal(e.target.value);
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
