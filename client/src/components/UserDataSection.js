import React, { useRef, useState, useEffect } from "react";
import database from "../firebase/Database";
import { useAuth } from "../contexts/AuthContext";
import { Button, Form, Container } from "react-bootstrap";

export default function UserDataSection() {
  const [data, updateData] = useState();
  //   const { currentUser } = useAuth();
  const [userData, updateUser] = useState();
  //   const[uid = updateUid] = useState();

  const { currentUser, logout } = useAuth();
  const message = currentUser.email + " successfully logged in";
  //   console.log ( message);

  console.log("Current user:");
  console.log(currentUser);

  // console.log("uid is now: \t" + uid);
  // console.log(typeof currentUser )

  //   function displayUserData(params) {
  //       console.log('nothing yet')
  //   }

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const db = new database();
    const getData = async () => {
      const json = await db.getUserInfo(currentUser.uid);

      updateData(json);
      console.log("user data:" + json);
    };
    getData();
  };

  async function handleEditUserData() {}
  return (
    <section className="introSection d-flex flex-column">
      <div className="textSubSection">
        <h3>Input User Data</h3>
      </div>

      <div className='w-75'>
        <Container >
          <Form>
            <Form.Group className=" d-flex flex-row" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </section>
  );
}
