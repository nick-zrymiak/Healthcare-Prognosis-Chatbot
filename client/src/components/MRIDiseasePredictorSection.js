import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import database from "../firebase/Database"
import NavBarDashboard from "./NavBarDashboard";

export default function MRIDiseasePredictorSection() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [MRI, setMRI] = useState({});
  const [MRIURL, setMRIURL] = useState({})
  const [MRIResults, setMRIResults] = useState("")

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
      console.log(MRI)
      //code here
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
      <div className="textSubSection" className="mt-5 mb-5">
        <h1 className="mt-5 mb-5">MRI Disease Predictor</h1>
      </div>
      <div onSubmit={handleSubmit} className="w-75">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <>
            <Row className="mt-5 mb-5">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload MRI</Form.Label>
                <Form.Control
                  className="ms-3"
                  type="file"
                  name="sdf"
                  onChange={(e) => {
                    setMRI({ img: e.target.files[0] });
                    let displayImage = URL.createObjectURL(e.target.files[0]);
                    //   console.log(displayImage);
                    //   setImgSrc(displayImage);
                    setMRIURL({ imgUrl: displayImage });
                  }}
                />

                {MRIURL.imgUrl && <div className="display-img">
                  <img
                    src={MRIURL.imgUrl}
                    style={{
                      margin: "10px",
                      width: "250px",
                      height: "200px",
                    }}
                  />
                </div>}
              </Form.Group>
            </Row>
          </>
          <div className="mt-5 mb-5">
            <div>
              *Currently this tool only searches for cancerous results.
            </div>
            <div>
              *Always see a doctor for real screenings.
            </div>
          </div>
          {/* ***********HANDLE SUBMIT*********** */}
          <Button disabled={loading} className="mt-5 mb-5" variant="primary" value="submit" type="submit">
            Submit
          </Button>
          <div className="mt-5 mb-5" />
          {MRIResults.length > 0 ? <h3>{MRIResults}</h3> : <h3>Click SUBMIT button to view analysis result</h3>}
          <div className="mt-5 mb-5">
            <Link to="/dashboard">Back To Dashboard</Link>
          </div>
        </Form>
      </div>
    </section>
  );
}
