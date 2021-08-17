import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import database from "../firebase/Database"

export default function MRIDiseasePredictorSection() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [MRI, setMRI] = useState({});
  const [MRIURL, setMRIURL] = useState({})

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
      <div className="textSubSection">
        <h3>MRI Disease Predictor</h3>
      </div>
      <div onSubmit={handleSubmit} className="w-75">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <>
            <Row>
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
