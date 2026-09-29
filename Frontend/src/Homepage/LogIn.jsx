// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import '../CSSFiles/LogIn.css'
// import axios from 'axios';
// import Navbar from './Navbar.jsx'
// import bgVideo from '../videos/login_bg.mp4'
// import '../CSSFiles/login.css'
// import { useContext } from "react";
// import UserContext from "../context/UserContext.js";
// // import { useContext } from "react";
// import  LoginContext  from "../context/LoginContext";

// export default function Login(){
//     let globalUser = useContext(UserContext);   //context
//     let globalIsLoggedIn = useContext(LoginContext);
//     // console.log(globalIsLoggedIn.isLoggedIn)

//     let [loginInfo , setLoginInfo] = useState({
//         username : "",
//         password : ""
//     })

//     let [message , setMessage] = useState(false)

//     const navigate = useNavigate();
//     let handleForm = (event)=>{
//         let field = event.target.name;
//         let newValue = event.target.value;
//         loginInfo[field] = newValue;
//         setLoginInfo((currValues)=>{
//             return({...currValues , [field]:newValue})
//         })
//     }
//     let handleSubmit = async (event)=>{
//         event.preventDefault();
//         setLoginInfo({
//             username : "",
//             password : ""
//         })
//         try {
//             const ack = await axios.post("http://localhost:3000/authenticate/login", loginInfo, {
//                 withCredentials: true,
//             });
//             setMessage(false)
//             globalUser.updateUser(loginInfo.username);
//             console.log(globalUser.loggedInUser);
//             globalIsLoggedIn.updateIsLoggedIn(true);
//             navigate("/")
//         } catch (error) {           
//             console.log(error.response.data.error)
//             console.log(error.response.status)
//             if(error.response.status === 403){
//                 navigate("/")
//             }
//             setMessage(true)
//         }
//     }
//     return(
//         <form className="login" onSubmit={handleSubmit}>  
//         <Navbar/>
//             <video src={bgVideo} autoPlay loop muted></video>
//             <div className="content">
//                 <h3>Log In</h3>
//                 <div className="username">
//                     <label className='username-lable' htmlFor="username">Enter Username</label>
//                     <input type="text" name="username" id="username" value={loginInfo.username} onChange={handleForm} required/>
//                 </div>
//                 <div className="password">
//                     <label className='password-lable' htmlFor="password">Enter Password</label>
//                     <input type="password" name="password" id="password" value={loginInfo.password} onChange={handleForm} required/>
//                 </div>
//                 <p>{message && "Incorrect Username or Password"}</p>
//                 <button type="submit">Log in</button>
//             </div>
//         </form>
//     )
// }




import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Lock, LogIn, AlertCircle, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react'
import axios from 'axios'
import Navbar from './Navbar.jsx'
import bgVideo from '../videos/login_bg.mp4'
import { useContext } from "react"
import UserContext from "../context/UserContext.js"
import LoginContext from "../context/LoginContext"
import './LogIn.css'
const backendURL = import.meta.env.VITE_BackendURL;

export default function Login() {
    const globalUser = useContext(UserContext)
    const globalIsLoggedIn = useContext(LoginContext)

    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: ""
    })
    const [message, setMessage] = useState({ text: "", type: "" })
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const navigate = useNavigate()

    const handleForm = (event) => {
        const { name, value } = event.target
        setLoginInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        setMessage({ text: "", type: "" })

        try {
            
            const ack = await axios.post(`${backendURL}/authenticate/login`, loginInfo, {
                withCredentials: true,
            })
            
            // Update context
            globalUser.updateUser(loginInfo.username)
            globalIsLoggedIn.updateIsLoggedIn(true)
            
            setMessage({ text: "Login successful! Redirecting...", type: "success" })
            
            // Store remember me preference
            if (rememberMe) {
                localStorage.setItem('rememberedUser', loginInfo.username)
            } else {
                localStorage.removeItem('rememberedUser')
            }

            // Clear form
            setLoginInfo({
                username: "",
                password: ""
            })

            // Redirect after success
            setTimeout(() => {
                navigate("/")
            }, 1500)



            //ngfhgf

        } catch (error) {
            console.log(error.response?.data?.error || error.message)
            
            if (error.response?.status === 403) {
                navigate("/")
                return
            }

            setMessage({ 
                text: error.response?.data?.error || "Incorrect username or password", 
                type: "error" 
            })
        } finally {
            setIsLoading(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
    }

    // Check for remembered user on component mount
    useState(() => {
        const rememberedUser = localStorage.getItem('rememberedUser')
        if (rememberedUser) {
            setLoginInfo(prev => ({ ...prev, username: rememberedUser }))
            setRememberMe(true)
        }
    }, [])

    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    }

    const inputVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    }

    return (
        <div className="login-container">
            <Navbar/>
            
            {/* Background Video */}
            <div className="video-background">
                <video src={bgVideo} autoPlay loop muted playsInline></video>
                <div className="video-overlay"></div>
            </div>

            <motion.div 
                className="login-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.form 
                    className="login-form" 
                    onSubmit={handleSubmit}
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header */}
                    <motion.div className="form-header" variants={inputVariants}>
                        <motion.div 
                            className="logo-circle"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                        >
                            <LogIn size={28} />
                        </motion.div>
                        <h2>Welcome Back</h2>
                        <p>Sign in to access your account and continue exploring</p>
                    </motion.div>

                    {/* Username Field */}
                    <motion.div className="form-group" variants={inputVariants}>
                        <label htmlFor="username" className="form-label">
                            <User size={18} />
                            <span>Username</span>
                        </label>
                        <div className="input-wrapper">
                            <input 
                                type="text" 
                                name="username" 
                                id="username" 
                                value={loginInfo.username}
                                onChange={handleForm}
                                required
                                className={loginInfo.username ? 'filled' : ''}
                                placeholder="Enter your username"
                            />
                        </div>
                    </motion.div>

                    {/* Password Field */}
                    <motion.div className="form-group" variants={inputVariants}>
                        <div className="password-header">
                            <label htmlFor="password" className="form-label">
                                <Lock size={18} />
                                <span>Password</span>
                            </label>
                            <Link to="/forgot-password" className="forgot-password">
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="input-wrapper">
                            <input 
                                type={showPassword ? "text" : "password"}
                                name="password" 
                                id="password" 
                                value={loginInfo.password}
                                onChange={handleForm}
                                required
                                className={loginInfo.password ? 'filled' : ''}
                                placeholder="Enter your password"
                            />
                            <button 
                                type="button" 
                                className="toggle-password"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </motion.div>

                    {/* Remember Me & Forgot Password */}
                    <motion.div className="form-options" variants={inputVariants}>
                        <label className="checkbox-label">
                            <input 
                                type="checkbox" 
                                checked={rememberMe}
                                onChange={handleRememberMe}
                                className="checkbox-input"
                            />
                            <span className="checkbox-custom"></span>
                            <span className="checkbox-text">Remember me</span>
                        </label>
                    </motion.div>

                    {/* Message Alert */}
                    <AnimatePresence>
                        {message.text && (
                            <motion.div 
                                className={`alert alert-${message.type}`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                {message.type === 'success' ? 
                                    <CheckCircle2 size={18} /> : 
                                    <AlertCircle size={18} />
                                }
                                <span>{message.text}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <motion.div className="form-actions" variants={inputVariants}>
                        <motion.button 
                            type="submit" 
                            className="submit-btn"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isLoading ? (
                                <span className="loading">
                                    <span className="loading-dot"></span>
                                    <span className="loading-dot"></span>
                                    <span className="loading-dot"></span>
                                </span>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </motion.button>
                    </motion.div>
                    {/* Signup Link */}
                    <motion.div className="form-footer" variants={inputVariants}>
                        <p>
                            Don't have an account?{' '}
                            <Link to="/signup" className="signup-link">
                                Create one now
                            </Link>
                        </p>
                    </motion.div>
                </motion.form>
            </motion.div>
        </div>
    )
}