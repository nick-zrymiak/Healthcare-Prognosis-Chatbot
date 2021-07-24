import React, { useRef, useState, useEffect } from "react";
import database from "../firebase/Database";
import { useAuth } from "../contexts/AuthContext";
import UserDataRegister from "./UserDataRegister";

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

  async function handleEditUserData() {}
  return (
    <section className="introSection d-flex flex-column">
      <div className="textSubSection">
        <h3>Input User Data</h3>
      </div>
      <UserDataRegister />
    </section>
  );
}
