import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function UserDataRegister() {
  const { currentUser, logout } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState(20);
  const [diabetic, setDiabetic] = useState(19);
  const [profilePicture, setProfilePicture] = useState();

  const [imgSrc, setImgSrc] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked on submit");
    console.log(firstName);
    console.log(lastName);
    console.log(gender);
    console.log(age);
    console.log(diabetic);
    // console.log(currentUser);

    //profile picture
    console.log(profilePicture);
  };

  return (
    <div onSubmit={handleSubmit} className="w-75">
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Smith"
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
              placeholder="27"
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
              placeholder="22.1"
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
                // id="inputGroupFile01dd"
                onChange={(e) => {
                  setProfilePicture(e.target.files[0]);
                  //dsafds
                  let displayImage = URL.createObjectURL(e.target.files[0]);
                  console.log(displayImage);
                  setImgSrc(displayImage);
                }}
              />

<div className="display-img">
              <img src={imgSrc} style={{
                      margin: "10px",
                      width: "250px",
                      height: "200px"
                    }}/>
            </div>
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
        <Button variant="primary" value="submit" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
