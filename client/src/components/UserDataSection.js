import React, { useRef, useState, useEffect } from "react";
import database from "../firebase/Database"
import { useAuth } from "../contexts/AuthContext";
import { Button } from "react-bootstrap";

export default function UserDataSection() {
    const [data, updateData] = useState();
    const { currentUser } = useAuth();

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = () => {
        const db = new database()
        const getData = async () => {
          const json =  await db.getUserInfo(currentUser.uid);
          updateData(json);
        }
        getData();
    };

    async function handleEditUserData() {

    }

    return ( 
        <section className="introSection">
            <div className="textSubSection">
                <h3>Profile</h3>
                <h5>
                    Your Data:
                    <ol>
                        <li>First Name: {data && data.firstName}</li>
                        <li>Last Name: {data && data.lastName}</li>
                        <li>Age: {data && data.age}</li>
                        <li>Sex: {data && data.sex}</li>
                        <li>Diabetic: {data && data.diabetic}</li>
                        <li>Email: {currentUser && currentUser.email}</li>
                    </ol>
                    <Button variant="link" onClick={handleEditUserData}>
                        Edit
                    </Button>
                </h5>
            </div>
        </section>
    )
}
