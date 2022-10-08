import React from "react"
import LoginForm from "../components/LoginForm"
const LoginPage = ({setToken}):JSX.Element => {
    return (
        <div>
            <h1>TeachSpace</h1>
            <LoginForm setToken={setToken}/>
        </div>
    )
}

export default LoginPage

//Plan
// title
// login form - login component
// link to sign up 