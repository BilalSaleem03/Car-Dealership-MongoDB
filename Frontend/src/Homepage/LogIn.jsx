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
import { User, Lock, LogIn, AlertCircle, Eye, EyeOff, ArrowRight } from 'lucide-react'
import axios from 'axios'
import Navbar from './Navbar.jsx'
import bgVideo from '../videos/login_bg.mp4'
import { useContext } from "react"
import UserContext from "../context/UserContext.js"
import LoginContext from "../context/LoginContext"
import './LogIn.css'

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
            const ack = await axios.post("http://localhost:3000/authenticate/login", loginInfo, {
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
                                    <span className="alert-icon">✓</span> : 
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

                    {/* Divider */}
                    <motion.div className="form-divider" variants={inputVariants}>
                        <span className="divider-line"></span>
                        <span className="divider-text">or continue with</span>
                        <span className="divider-line"></span>
                    </motion.div>

                    {/* Social Login Options (Optional) */}
                    <motion.div className="social-login" variants={inputVariants}>
                        <button type="button" className="social-btn google-btn">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <span>Google</span>
                        </button>
                        <button type="button" className="social-btn github-btn">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path fill="#333" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            <span>GitHub</span>
                        </button>
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