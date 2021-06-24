import React from 'react'
import { useAuth } from "../contexts/AuthContext"
import { Redirect, Route } from 'react-router-dom'

export default function PrivateRoute ({ component: Component, ...rest }) {
    const { currentUser } = useAuth()

    return (
        <Route
            {...rest}
            render={props =>
                currentUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    )
}