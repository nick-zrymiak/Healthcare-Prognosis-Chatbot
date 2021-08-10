import React, { useRef, useState, useEffect } from "react";
import database from "../firebase/Database";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Dashboard.css";

export default function UserDataSection() {
  const [data, updateData] = useState();
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    loadUserData();
  }, []);

  /*
        Loads userdata in 'data' state object
    */
  const loadUserData = () => {
    const db = new database();
    const getData = async () => {
      const json = await db.getUserInfo(currentUser.uid);
      updateData(json);
    };
    getData();
  };

  async function handleEditUserData() {
    history.push("/editUserData");
  }

  return (
    <section className="displayUserInfo">
      <h3>Personal Information</h3>
      <p>Basic info, like your name photo that is registered with us</p>

      <div className="MainInfoContainer">
        <div className="rowCard">
          <h4>Basic Information</h4>
          <p>Protected user info that you can update anytime</p>
        </div>

        <div className="subInfoContainer">
          <div className="tittleField">
            <p className="fieldText">NAME</p>
          </div>
          <div className="dataField">
            <p>
              {data && data.firstName} {data && data.lastName}
            </p>
          </div>
        </div>
        <div className="subInfoContainer">
          <div className="tittleField">
            <p className="fieldText">AGE</p>
          </div>
          <div className="dataField">
            <p>{data && data.age}</p>
          </div>
        </div>
        <div className="subInfoContainer">
          <div className="tittleField">
            <p className="fieldText">SEX</p>
          </div>
          <div className="dataField">
            <p>{data && data.sex}</p>
          </div>
        </div>
        <div className="subInfoContainer">
          <div className="tittleField">
            <p className="fieldText">DIABETIC</p>
          </div>
          <div className="dataField">
            <p>{data && data.diabetic}</p>
          </div>
        </div>
        <div className="subInfoContainer">
          <div className="tittleField">
            <p className="fieldText">EMAIL</p>
          </div>
          <div className="dataField">
            <p>{currentUser && currentUser.email}</p>
          </div>
        </div>
      </div>

      <Button variant="link" onClick={handleEditUserData}>
        <h3 className='clickToEdit'>Click here to edit personal info</h3>
      </Button>
    </section>

  );
}
