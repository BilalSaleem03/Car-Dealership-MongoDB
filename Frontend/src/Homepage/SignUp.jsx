// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import '../CSSFiles/SignUp.css'
// import axios from 'axios';
// import bgVideo from '../videos/signup_bg.mp4'
// import Navbar from './Navbar.jsx'

// export default function Login(){
//     let [signupInfo , setSignupInfo] = useState({
//         username : "",
//         email : "",
//         password : ""
//     })
//     let [message , setMessage] = useState(false)
//     const navigate = useNavigate();
//     let handleForm = (event)=>{
//         let field = event.target.name;
//         let newValue = event.target.value;
//         signupInfo[field] = newValue;
//         setSignupInfo((currValues)=>{
//             return({...currValues , [field]:newValue})
//         })
//     }
//     let handleSubmit = async (event)=>{
//         event.preventDefault();
//         setSignupInfo({
//             username : "",
//             email : "",
//             password : ""
//         })
//         try {
//             const ack = await axios.post("http://localhost:3000/authenticate/signup", signupInfo , {
//                 withCredentials: true,
//             })
//             console.log(ack.data.success)
//             setMessage(false)
//             navigate("/")
//         } catch (error) {
//             console.log(error.message)
//             setMessage(true)
//         }
//     }
//     return(
//         <form className="signup" onSubmit={handleSubmit}> 
//             <Navbar/>
//             <video src={bgVideo} autoPlay loop muted></video> 
//             <div className="content">
//                 <h3>SIGN UP</h3>
//                 <div className="username">
//                     <label className='username-label' htmlFor="username">Enter Username</label>
//                     <input type="text" name="username" id="username" value={signupInfo.username} onChange={handleForm} required/>
//                 </div>
//                 <div className="email">
//                     <label className='email-label' htmlFor="email">Enter Email</label>
//                     <input type="email" name="email" id="email" value={signupInfo.email} onChange={handleForm} required/>
//                 </div>
//                 <div className="password">
//                     <label className='password-label' htmlFor="password">Enter Password</label>
//                     <input type="password" name="password" id="password" value={signupInfo.password} onChange={handleForm} required/>
//                 </div>
//                 <p>{message && "Failed to Sign Up"}</p>
//                 <button type="submit">Sign Up</button>
//             </div>
//         </form>
//     )
// }




import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Lock, CheckCircle, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react'
import axios from 'axios'
import bgVideo from '../videos/signup_bg.mp4'
import Navbar from './Navbar.jsx'
import './SignUp.css'
const backendURL = import.meta.env.VITE_BackendURL;

export default function SignUp() {
    const [signupInfo, setSignupInfo] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [message, setMessage] = useState({ text: "", type: "" }) // success/error
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formValidations, setFormValidations] = useState({
        username: { valid: false, message: "" },
        email: { valid: false, message: "" },
        password: { valid: false, message: "" }
    })
    const navigate = useNavigate()

    // Validate form fields in real-time
    useEffect(() => {
        validateUsername(signupInfo.username)
        validateEmail(signupInfo.email)
        validatePassword(signupInfo.password)
    }, [signupInfo])

    const validateUsername = (username) => {
        if (username.length < 3) {
            setFormValidations(prev => ({
                ...prev,
                username: { valid: false, message: "Username must be at least 3 characters" }
            }))
        } else if (username.length > 20) {
            setFormValidations(prev => ({
                ...prev,
                username: { valid: false, message: "Username must be less than 20 characters" }
            }))
        } else {
            setFormValidations(prev => ({
                ...prev,
                username: { valid: true, message: "Username available" }
            }))
        }
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email) {
            setFormValidations(prev => ({
                ...prev,
                email: { valid: false, message: "" }
            }))
        } else if (!emailRegex.test(email)) {
            setFormValidations(prev => ({
                ...prev,
                email: { valid: false, message: "Please enter a valid email" }
            }))
        } else {
            setFormValidations(prev => ({
                ...prev,
                email: { valid: true, message: "Email format is valid" }
            }))
        }
    }

    const validatePassword = (password) => {
        if (password.length < 6) {
            setFormValidations(prev => ({
                ...prev,
                password: { valid: false, message: "Password must be at least 6 characters" }
            }))
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            setFormValidations(prev => ({
                ...prev,
                password: { valid: false, message: "Include uppercase, lowercase & number" }
            }))
        } else {
            setFormValidations(prev => ({
                ...prev,
                password: { valid: true, message: "Strong password" }
            }))
        }
    }

    const handleForm = (event) => {
        const { name, value } = event.target
        setSignupInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        // Check if all fields are valid
        if (!formValidations.username.valid || !formValidations.email.valid || !formValidations.password.valid) {
            setMessage({ text: "Please fix the validation errors", type: "error" })
            setIsLoading(false)
            return
        }

        try {
            const ack = await axios.post(`${backendURL}/authenticate/signup`, signupInfo, {
                withCredentials: true,
            })
            
            setMessage({ text: "Account created successfully!", type: "success" })
            
            // Clear form
            setSignupInfo({
                username: "",
                email: "",
                password: ""
            })

            // Redirect after success
            setTimeout(() => {
                navigate("/")
            }, 1500)

        } catch (error) {
            console.log(error.message)
            setMessage({ 
                text: error.response?.data?.error || "Failed to create account. Please try again.", 
                type: "error" 
            })
        } finally {
            setIsLoading(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

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
        <div className="signup-container">
            <Navbar/>
            
            {/* Background Video */}
            <div className="video-background">
                <video src={bgVideo} autoPlay loop muted playsInline></video>
                <div className="video-overlay"></div>
            </div>

            <motion.div 
                className="signup-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.form 
                    className="signup-form" 
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
                            <User size={28} />
                        </motion.div>
                        <h2>Create Account</h2>
                        <p>Join our community and explore amazing vehicles</p>
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
                                value={signupInfo.username}
                                onChange={handleForm}
                                required
                                className={formValidations.username.valid ? 'valid' : signupInfo.username ? 'invalid' : ''}
                                placeholder="Enter your username"
                            />
                            <AnimatePresence>
                                {signupInfo.username && (
                                    <motion.div 
                                        className="validation-icon"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        {formValidations.username.valid ? 
                                            <CheckCircle size={18} className="valid-icon" /> : 
                                            <AlertCircle size={18} className="invalid-icon" />
                                        }
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <AnimatePresence>
                            {signupInfo.username && formValidations.username.message && (
                                <motion.div 
                                    className={`validation-message ${formValidations.username.valid ? 'valid' : 'invalid'}`}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    {formValidations.username.message}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Email Field */}
                    <motion.div className="form-group" variants={inputVariants}>
                        <label htmlFor="email" className="form-label">
                            <Mail size={18} />
                            <span>Email Address</span>
                        </label>
                        <div className="input-wrapper">
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                value={signupInfo.email}
                                onChange={handleForm}
                                required
                                className={formValidations.email.valid ? 'valid' : signupInfo.email ? 'invalid' : ''}
                                placeholder="Enter your email"
                            />
                            <AnimatePresence>
                                {signupInfo.email && (
                                    <motion.div 
                                        className="validation-icon"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        {formValidations.email.valid ? 
                                            <CheckCircle size={18} className="valid-icon" /> : 
                                            <AlertCircle size={18} className="invalid-icon" />
                                        }
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <AnimatePresence>
                            {signupInfo.email && formValidations.email.message && (
                                <motion.div 
                                    className={`validation-message ${formValidations.email.valid ? 'valid' : 'invalid'}`}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    {formValidations.email.message}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Password Field */}
                    <motion.div className="form-group" variants={inputVariants}>
                        <label htmlFor="password" className="form-label">
                            <Lock size={18} />
                            <span>Password</span>
                        </label>
                        <div className="input-wrapper">
                            <input 
                                type={showPassword ? "text" : "password"}
                                name="password" 
                                id="password" 
                                value={signupInfo.password}
                                onChange={handleForm}
                                required
                                className={formValidations.password.valid ? 'valid' : signupInfo.password ? 'invalid' : ''}
                                placeholder="Create a strong password"
                            />
                            <div className="password-actions">
                                <button 
                                    type="button" 
                                    className="toggle-password"
                                    onClick={togglePasswordVisibility}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                <AnimatePresence>
                                    {signupInfo.password && (
                                        <motion.div 
                                            className="validation-icon"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                        >
                                            {formValidations.password.valid ? 
                                                <CheckCircle size={18} className="valid-icon" /> : 
                                                <AlertCircle size={18} className="invalid-icon" />
                                            }
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                        <AnimatePresence>
                            {signupInfo.password && formValidations.password.message && (
                                <motion.div 
                                    className={`validation-message ${formValidations.password.valid ? 'valid' : 'invalid'}`}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    {formValidations.password.message}
                                </motion.div>
                            )}
                        </AnimatePresence>
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
                                {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
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
                                    <span>Create Account</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </motion.button>
                    </motion.div>

                    {/* Login Link */}
                    <motion.div className="form-footer" variants={inputVariants}>
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="login-link">
                                Sign in here
                            </Link>
                        </p>
                    </motion.div>

                    {/* Terms */}
                    <motion.div className="form-terms" variants={inputVariants}>
                        <p className="terms-text">
                            By creating an account, you agree to our{' '}
                            <Link to="/terms" className="terms-link">Terms of Service</Link>
                            {' '}and{' '}
                            <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                        </p>
                    </motion.div>
                </motion.form>
            </motion.div>
        </div>
    )
}