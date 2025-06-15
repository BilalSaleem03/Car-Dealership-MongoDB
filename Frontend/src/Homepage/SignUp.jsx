import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../CSSFiles/SignUp.css'
import axios from 'axios';
import bgVideo from '../videos/signup_bg.mp4'
import Navbar from './Navbar.jsx'

export default function Login(){
    let [signupInfo , setSignupInfo] = useState({
        username : "",
        email : "",
        password : ""
    })
    let [message , setMessage] = useState(false)
    const navigate = useNavigate();
    let handleForm = (event)=>{
        let field = event.target.name;
        let newValue = event.target.value;
        signupInfo[field] = newValue;
        setSignupInfo((currValues)=>{
            return({...currValues , [field]:newValue})
        })
    }
    let handleSubmit = async (event)=>{
        event.preventDefault();
        setSignupInfo({
            username : "",
            email : "",
            password : ""
        })
        try {
            const ack = await axios.post("http://localhost:3000/authenticate/signup", signupInfo , {
                withCredentials: true,
            })
            console.log(ack.data.success)
            setMessage(false)
            navigate("/")
        } catch (error) {
            console.log(error.message)
            setMessage(true)
        }
    }
    return(
        <form className="signup" onSubmit={handleSubmit}> 
            <Navbar/>
            <video src={bgVideo} autoPlay loop muted></video> 
            <div className="content">
                <h3>SIGN UP</h3>
                <div className="username">
                    <label className='username-label' htmlFor="username">Enter Username</label>
                    <input type="text" name="username" id="username" value={signupInfo.username} onChange={handleForm} required/>
                </div>
                <div className="email">
                    <label className='email-label' htmlFor="email">Enter Email</label>
                    <input type="email" name="email" id="email" value={signupInfo.email} onChange={handleForm} required/>
                </div>
                <div className="password">
                    <label className='password-label' htmlFor="password">Enter Password</label>
                    <input type="password" name="password" id="password" value={signupInfo.password} onChange={handleForm} required/>
                </div>
                <p>{message && "Failed to Sign Up"}</p>
                <button type="submit">Sign Up</button>
            </div>
        </form>
    )
}