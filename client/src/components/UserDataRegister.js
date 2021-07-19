import React, { useState } from "react";
import { Button, Form, Container, Row } from "react-bootstrap";

export default function UserDataRegister() {

    const [firstName, setFirstName] = useState('');

  const [user, setUser] = useState({
    firstName: "Awshaf",
    lastName: "Ishtiaque",
    telephone: "33333333",
    age: 28,
    email: "test@gmail.com",
    state: "xxxxx",
    country: "adafafafa",
    address: "Home",
    address1: "adsfasdfasd adsf sad f",
    address2: "ads fasd fasdf asdf ",
    interests: [],
    subscribenewsletter: false,
  });

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log('clicked on submit');
      console.log(firstName);
    //   console.log(firstName);
  }

  return (
    <div  onSubmit={handleSubmit} className="w-75">
      <Form >
          <Form.Label>FIRST NAME</Form.Label>
          <input
            type="text"
            value={firstName}
            name="firstName"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            className="form-control"
            placeholder="First Name"
          />

        {/* ***********HANDLE SUBMIT*********** */}
        <Button variant="primary" value='submit' type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
