import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Dashboard() {
    const { currentUser, logout } = useAuth()
    const [ error, setError ] = useState("")
    const history = useHistory()
    const message = currentUser.email + " successfully logged in"

    async function handleLogout() {
        setError("")
        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <>
        <Card>
            <Card.Body>
                {currentUser && <Alert variant="success">{message}</Alert>}
                <h3>Dashboard</h3>
            </Card.Body>
        </Card>
        <Button variant="link" onClick={handleLogout}>
            Log Out
        </Button>
        </>
    )
}
