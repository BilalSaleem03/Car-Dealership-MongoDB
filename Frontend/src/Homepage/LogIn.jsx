import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../CSSFiles/LogIn.css'
import axios from 'axios';
import Navbar from './Navbar.jsx'
import bgVideo from '../videos/login_bg.mp4'
import '../CSSFiles/login.css'
import { useContext } from "react";
import UserContext from "../context/UserContext.js";
// import { useContext } from "react";
import  LoginContext  from "../context/LoginContext";

export default function Login(){
    let globalUser = useContext(UserContext);   //context
    let globalIsLoggedIn = useContext(LoginContext);
    // console.log(globalIsLoggedIn.isLoggedIn)

    let [loginInfo , setLoginInfo] = useState({
        username : "",
        password : ""
    })

    let [message , setMessage] = useState(false)

    const navigate = useNavigate();
    let handleForm = (event)=>{
        let field = event.target.name;
        let newValue = event.target.value;
        loginInfo[field] = newValue;
        setLoginInfo((currValues)=>{
            return({...currValues , [field]:newValue})
        })
    }
    let handleSubmit = async (event)=>{
        event.preventDefault();
        setLoginInfo({
            username : "",
            password : ""
        })
        try {
            const ack = await axios.post("http://localhost:3000/authenticate/login", loginInfo, {
                withCredentials: true,
            });
            setMessage(false)
            globalUser.updateUser(loginInfo.username);
            console.log(globalUser.loggedInUser);
            globalIsLoggedIn.updateIsLoggedIn(true);
            navigate("/")
        } catch (error) {           
            console.log(error.response.data.error)
            console.log(error.response.status)
            if(error.response.status === 403){
                navigate("/")
            }
            setMessage(true)
        }
    }
    return(
        <form className="login" onSubmit={handleSubmit}>  
        <Navbar/>
            <video src={bgVideo} autoPlay loop muted></video>
            <div className="content">
            <h3>Log In</h3>
                <div className="username">
                    <label className='username-lable' htmlFor="username">Enter Username</label>
                    <input type="text" name="username" id="username" value={loginInfo.username} onChange={handleForm} required/>
                </div>
                <div className="password">
                    <label className='password-lable' htmlFor="password">Enter Password</label>
                    <input type="password" name="password" id="password" value={loginInfo.password} onChange={handleForm} required/>
                </div>
                <p>{message && "Incorrect Username or Password"}</p>
                <button type="submit">Log in</button>
            </div>
        </form>
    )
}