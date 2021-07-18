import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase/Firebase"
import database from "../firebase/Database"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const db = new database()

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password).then(credential => {
            db.addUserInfo(credential.user.uid, credential.email, null, null);
            return credential
        })
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        logout,
        resetPassword,
        signup,
        updateEmail,
        updatePassword
    }

    return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
    )
}