import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

export default function UserDataRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Male");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked on submit");
    console.log(firstName);
    console.log(lastName);
    console.log(gender);
  };

  return (
    <div onSubmit={handleSubmit} className="w-75">
      <Form>
        {/* <Form.Label>FIRST NAME</Form.Label>
        <input
          type="text"
          value={firstName}
          name="firstName"
          
          className="form-control"
          placeholder="First Name"
        /> */}

        <Row>
          <Col>
            <Form.Control
              placeholder="First name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Last name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Col>
        </Row>

        <Form.Group as={Row} className="mb-3">
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
          onChange={e=>{setGender("Male")}}
        //   checked="Male"
        />
        <Form.Check
          type="radio"
          label="Female"
          value="Female"
          name="formHorizontalRadios"
          onChange={e=>{setGender("Female")}}
          id="formHorizontalRadios2"
        />
        <Form.Check
          type="radio"
          label="Other"
          name="formHorizontalRadios"
          value="Other"
          onChange={ e => {setGender("Other")} }
          id="formHorizontalRadios3"
        />
      </Col>
    </Form.Group>

        {/* ***********HANDLE SUBMIT*********** */}
        <Button variant="primary" value="submit" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
