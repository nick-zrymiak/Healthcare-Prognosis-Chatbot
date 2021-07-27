import React from "react";
import { useAuth } from "../contexts/AuthContext";
import UserDataRegister from "./UserDataRegister";

export default function UserDataSection() {;

  const { currentUser, logout } = useAuth();

  console.log("Current user:");
  console.log(currentUser);

  return (
    <section className="editDataSection d-flex flex-column">
      <div className="textSubSection">
        <h3>Input User Data</h3>
      </div>
      <UserDataRegister />
    </section>
  );
}
