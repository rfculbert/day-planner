
import React, { useState } from "react";
import './App.css'
import { Login } from "../Login"
import { Register } from "../Register"

function LogRegi({setIsLoggedIn, setUserId}) {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return (
        <div className="App">
            {
                currentForm === "login" ? <Login onFormSwitch={toggleForm} setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} /> : <Register onFormSwitch={toggleForm} setIsLoggedIn={setIsLoggedIn} setUserId={setUserId}/>
            }
        </div>
    )
}
export default LogRegi;