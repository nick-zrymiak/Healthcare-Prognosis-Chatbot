import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import database from "../firebase/Database"

export default function UserDataRegister() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState(20);
  const [diabetic, setDiabetic] = useState(19);
  const [profilePicture, setProfilePicture] = useState({ img: "", imgUrl: "" });
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

    console.log(firstName);
    console.log(lastName);
    console.log(gender);
    console.log(age);
    console.log(diabetic);
    console.log(profilePicture);

    const userId = currentUser.uid;
    const db = new database()
    const editData = async () => {
      const json =  await db.editUserInfo(currentUser.uid, firstName, lastName, gender, age, diabetic, profilePicture);
      history.push("/dashboard");
    }
    try {
      editData();
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div onSubmit={handleSubmit} className="w-75">
      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder= {data && data.firstName || "John"}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={data && data.lastName || "Smith"}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Form.Group>
        </Row>

        <Form.Group as={Row} className="mb-3 mt-2">
          <Form.Label as="legend" column sm={2}>
            Gender
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Male"
              value="Male"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
              onChange={(e) => {
                setGender("Male");
              }}
              //   checked="Male"
            />
            <Form.Check
              type="radio"
              label="Female"
              value="Female"
              name="formHorizontalRadios"
              onChange={(e) => {
                setGender("Female");
              }}
              id="formHorizontalRadios2"
            />
            <Form.Check
              type="radio"
              label="Other"
              name="formHorizontalRadios"
              value="Other"
              onChange={(e) => {
                setGender("Other");
              }}
              id="formHorizontalRadios3"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 mt-2">
          <Form.Label as="legend" column sm={2}>
            Age
          </Form.Label>
          <Col sm={2}>
            <Form.Control
              type="number"
              placeholder={data && data.age || "27"}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 mt-2">
          <Form.Label as="legend" column sm={2}>
            Diabetic Reading:
          </Form.Label>
          <Col sm={2}>
            <Form.Control
              type="float"
              placeholder={data && data.diabetic || "22.1"}
              onChange={(e) => {
                setDiabetic(e.target.value);
              }}
            />
          </Col>
        </Form.Group>

        {/* ******adding image buttons***** */}
        <>
          <Row>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Profile Picture</Form.Label>
              <Form.Control
                className="ms-3"
                type="file"
                name="sdf"
                placeholder={data && data.profilePicture}
                onChange={(e) => {
                  setProfilePicture({img:e.target.files[0]});
                  let displayImage = URL.createObjectURL(e.target.files[0]);
                //   console.log(displayImage);
                //   setImgSrc(displayImage);
                    setProfilePicture({imgUrl:displayImage});
                }}
              />

              {profilePicture.imgUrl && <div className="display-img">
                <img
                  src={profilePicture.imgUrl}
                  style={{
                    margin: "10px",
                    width: "250px",
                    height: "200px",
                  }}
                />
              </div>}
            </Form.Group>
          </Row>

          {/* <Form.Group as={Row}>
              <Form.File
                type="file"
                className="custom-file-label"
                id="inputGroupFile01"
                label={profilePicture}
                onChange={(e) => setProfilePicture(e.target.files[0].name)}
                custom
              />
            </Form.Group> */}
          {/* <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Multiple files input example</Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Small file input example</Form.Label>
              <Form.Control type="file" size="sm" />
            </Form.Group>
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Large file input example</Form.Label>
              <Form.Control type="file" size="lg" />
            </Form.Group> */}
        </>

        {/* ***********HANDLE SUBMIT*********** */}
        <Button disabled={loading} variant="primary" value="submit" type="submit">
          Submit
        </Button>
        <div className="mt-3">
          <Link to="/dashboard">Cancel</Link>
        </div>
      </Form>
    </div>
  );
}
