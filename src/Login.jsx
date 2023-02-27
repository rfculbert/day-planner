import React, { useState } from "react"
import axios from "axios";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        axios.post("/api/login", {username: email, pass}).then(res => {
            console.log(res.data)
            props.setUserId(res.data.user_id)
            props.setIsLoggedIn(true);
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label>username</label>
            <input value={email}  onChange={(e) => setEmail(e.target.value)}  placeholder="username" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}