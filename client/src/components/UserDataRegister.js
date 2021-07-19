import React, { useState } from "react";
import { Button, Form, Container, Row , Col} from "react-bootstrap";

export default function UserDataRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked on submit");
    console.log(firstName);
    console.log(lastName)
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
            <Form.Control placeholder="First name" onChange={(e) => {
            setFirstName(e.target.value);
          }}/>
            </Col>
            <Col>
            <Form.Control placeholder="Last name" onChange={(e) => {
            setLastName(e.target.value);
          }}/>
            </Col>
        </Row>

        {/* ***********HANDLE SUBMIT*********** */}
        <Button variant="primary" value="submit" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
