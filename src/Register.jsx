import React, { useState } from "react";
import axios from "axios";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        axios.post("/api/register", {username: name, pass}).then(res => {
            console.log(res.data)
            props.setUserId(res.data.user_id)
            props.setIsLoggedIn(true);
        }).catch(err => {
            console.log(err)
        })
    }
console.log(props)
    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">User name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="User Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account?  here.</button>
        </div>
    )
}