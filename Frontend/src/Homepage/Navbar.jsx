// import React, { useEffect, useState } from 'react';
// import logoImg from '../assets/logo.png';
// import stack from '../assets/stack.svg';
// import cross from '../assets/cross.svg';
// import './Homepage.css'
// import { NavLink } from 'react-router-dom';   //better than using "Link" as we can add class in NavLink tag
// import axios from 'axios';
// import { useContext } from "react";
// import  LoginContext  from "../context/LoginContext";
// import UserContext from "../context/UserContext.js";

// export default function Navbar() {
//     let globalIsLoggedIn = useContext(LoginContext)
//     let globalUser = useContext(UserContext);

//     const checkCookiesPresence = async ()=>{
//         try{
//             let response = await axios.post("http://localhost:3000/authenticate/is-logged-in" , {} , { withCredentials: true })
//             // localStorage.setItem("isLoggedIn" , true)
//             // localStorage.setItem("loggedInUser" , response.data.user)
//             globalIsLoggedIn.updateIsLoggedIn(true);
//             globalUser.updateUser(response.data.user)


//         } catch(error){
//             console.log(error)
//             localStorage.setItem("isLoggedIn" , false)
//             localStorage.setItem("loggedInUser" , "")
//             globalIsLoggedIn.updateIsLoggedIn(false);
//         }
//     }

//     useEffect(() => {
//        checkCookiesPresence();
//     } , [])

//     let [search , setSearch] = useState("");
//     let [dropdown , setDropdown] = useState(false);

    

//     let handleSearch = (event)=>{
//         setSearch(event.target.value);
//     }
//     let clickSearch = (event)=>{
//         event.preventDefault();
        
//     }

//     let handleDropdown = ()=>{
//         setDropdown(!dropdown);
//     }

//     let handleLogout =async ()=>{
//         try{
//             console.log("mmmmmmm")
//             let ack = await axios.post(
//                 "http://localhost:3000/authenticate/logout",
//                 {},  // Empty request body
//                 { withCredentials: true } // Move withCredentials here
//             );
//             console.log(ack.data.success)
//             localStorage.setItem("loggedInUser", "");
//             globalIsLoggedIn.updateIsLoggedIn(false);

//         } catch (error){
//             console.log("error")
//             console.log(error)
//         }
//     }
//     let handleRenewTokens =async ()=>{
//         try{
//             let ack = await axios.post(
//                 "http://localhost:3000/authenticate/renewAccessToken",
//                 {},  // Empty request body
//                 { withCredentials: true } // Move withCredentials here
//             );
//             console.log(ack.data.success)
//         } catch (error){
//             console.log(error)
//         }
//     }
    
//     return (
//         <>
//             <nav className="navbar">
//                 <div className='left-area'>
//                     <img className='logoImage' src={logoImg} alt="logo" />
//                     <NavLink to="/">Home</NavLink>
//                     <NavLink to="/explore">Explore</NavLink>
//                     <NavLink to="/aboutus">About Us</NavLink>
//                     <NavLink to="/customer">Customers</NavLink>
//                     <NavLink to="/history">History</NavLink>
//                     <NavLink to="/personal">Personal</NavLink>
//                     <div className="drop-down" >
//                         <img className='stack' src={dropdown == false ? stack : cross} alt="stack" onClick={handleDropdown}/>
//                     </div>
//                     <div className={dropdown == false ? "drop-down-closed" : "drop-down-open"}>
//                         <NavLink to="/">Home</NavLink>
//                         <NavLink to="/explore">Explore</NavLink>
//                         <NavLink to="/aboutus">About Us</NavLink>
//                         <NavLink to="/customer">Customers</NavLink>
//                         <NavLink to="/history">History</NavLink>
//                         <NavLink to="/login">Log in</NavLink>
//                         <NavLink to="/personal">Personal</NavLink>
//                         <button onClick={handleLogout}>Log Out</button>
//                         <NavLink to="/signup">Sign up</NavLink>
//                     </div>
//                 </div>
//                 <div className="center-area">
//                     <input className="search-area" placeholder="Search" value={search} onChange={handleSearch}/>
//                     <button className="search-btn" type="submit" onClick={clickSearch}>Search</button>
//                 </div>
//                 <div className="right-area">
//                     {!globalIsLoggedIn.isLoggedIn && <NavLink to="/login">Log in</NavLink>}
//                     {globalIsLoggedIn.isLoggedIn && <button onClick={handleLogout}>Log Out</button>}
//                     {/* <button onClick={handleLogout}>Log Out</button> */}
//                     {globalIsLoggedIn.isLoggedIn && <button onClick={handleRenewTokens}>Renew</button>}
//                     {/* <button onClick={handleRenewTokens}>Renew</button> */}
//                     {!globalIsLoggedIn.isLoggedIn && <NavLink to="/signup">Sign up</NavLink> }
                    

//                 </div>
//             </nav>
//         </>
//     );
// }






import React, { useEffect, useState } from 'react';
import logoImg from '../assets/logo.png';
import logoSvg from '../assets/icons/logo.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, LogOut, RefreshCw, User } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useContext } from "react";
import LoginContext from "../context/LoginContext";
import UserContext from "../context/UserContext.js";
import './Navbar.css';
const backendURL = import.meta.env.VITE_BackendURL;

export default function Navbar() {
    let globalIsLoggedIn = useContext(LoginContext)
    let globalUser = useContext(UserContext);
    const location = useLocation();
    
    const [search, setSearch] = useState("");
    const [dropdown, setDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    let handleLogout = async () => {
        try {
            let ack = await axios.post(
                `${backendURL}/authenticate/logout`,
                {},
                { withCredentials: true }
            );
            globalIsLoggedIn.updateIsLoggedIn(false);
            globalUser.updateUser(null);
            setDropdown(false);
        } catch (error) {
            console.log(error);
        }
    }

    // Check auth on mount
    const checkCookiesPresence = async () => {
        try {
            let response = await axios.post(`${backendURL}/authenticate/is-logged-in`, {}, { withCredentials: true })
            globalIsLoggedIn.updateIsLoggedIn(true);
            globalUser.updateUser(response.data.user)
        } catch(error) {
            console.log(error)
            globalIsLoggedIn.updateIsLoggedIn(false);
            globalUser.updateUser(null);
        }
    }

    useEffect(() => {
        checkCookiesPresence();
        
        // Handle scroll effect
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle search
    let handleSearch = (event) => {
        setSearch(event.target.value);
    }

    let handleSearchSubmit = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log("Searching for:", search);
            // Add your search logic here
        }
    }

    // Toggle mobile menu
    let handleDropdown = () => {
        setDropdown(!dropdown);
    }

    // Logout function
    // let handleLogout = async () => {
    //     try {
    //         let ack = await axios.post(
    //             `${backendURL}/authenticate/logout`,
    //             {},
    //             { withCredentials: true }
    //         );
    //         globalIsLoggedIn.updateIsLoggedIn(false);
    //         globalUser.updateUser(null);
    //         setDropdown(false);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // Renew tokens
    let handleRenewTokens = async () => {
        try {
            let ack = await axios.post(
                `${backendURL}/authenticate/renewAccessToken`,
                {},
                { withCredentials: true }
            );
            console.log(ack.data.success);
        } catch (error) {
            console.log(error);
        }
    }

    const navItems = [
        { path: "/", label: "Home" },
        { path: "/explore", label: "Explore" },
        { path: "/aboutus", label: "About Us" },
        { path: "/customer", label: "Customers" },
        { path: "/history", label: "History" },
        { path: "/personal", label: "Personal" },
    ];

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
                <div className='left-area'>
                    <NavLink to="/" className="navbar-brand" title="Prestige Car Dealership">
                        <div className="logo-badge">
                            <img 
                                className='logoImage' 
                                src={logoSvg} 
                                alt="PCD Logo" 
                                onError={(e) => { e.target.src = logoImg; }} 
                            />
                        </div>
                        <div className="brand-text-container">
                            <span className="brand-title">Prestige</span>
                            <span className="brand-subtitle">Dealership</span>
                        </div>
                    </NavLink>
                    
                    {/* Desktop Navigation */}
                    <div className="desktop-nav">
                        {navItems.map((item) => (
                            <NavLink 
                                key={item.path}
                                to={item.path} 
                                className={({ isActive }) => 
                                    `nav-link ${isActive ? 'nav-link-active' : ''}`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="center-area">
                    <div className="search-wrapper">
                        <Search className="search-icon" size={18} />
                        <input 
                            className="search-area" 
                            placeholder="Search vehicles, models..." 
                            value={search}
                            onChange={handleSearch}
                            onKeyDown={handleSearchSubmit}
                        />
                    </div>
                </div>

                {/* Right Area - Auth Buttons & Mobile Toggle */}
                <div className="right-area">
                    {!globalIsLoggedIn.isLoggedIn ? (
                        <div className="auth-buttons">
                            <NavLink to="/login" className="login-btn">
                                <User size={16} />
                                <span>Log In</span>
                            </NavLink>
                            <NavLink to="/signup" className="signup-btn">
                                <span>Sign Up</span>
                            </NavLink>
                        </div>
                    ) : (
                        <div className="user-buttons">
                            <button onClick={handleLogout} className="logout-btn" title="Log Out">
                                <LogOut size={16} />
                                <span>Log Out</span>
                            </button>
                            <button onClick={handleRenewTokens} className="renew-btn" title="Refresh Session">
                                <RefreshCw size={16} />
                            </button>
                        </div>
                    )}

                    {/* Mobile Menu Toggle Button */}
                    <div className="mobile-menu-toggle">
                        <button onClick={handleDropdown} className="menu-btn" aria-label="Toggle Navigation">
                            {dropdown ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {dropdown && (
                    <div className="mobile-dropdown">
                        <div className="mobile-dropdown-content">
                            <div className="mobile-search">
                                <div className="search-wrapper">
                                    <Search className="mobile-search-icon" size={18} />
                                    <input 
                                        className="mobile-search-input"
                                        placeholder="Search vehicles..." 
                                        value={search}
                                        onChange={handleSearch}
                                        onKeyDown={handleSearchSubmit}
                                    />
                                </div>
                            </div>
                            
                            {navItems.map((item) => (
                                <NavLink 
                                    key={item.path}
                                    to={item.path} 
                                    className="mobile-nav-link"
                                    onClick={() => setDropdown(false)}
                                >
                                    {item.label}
                                </NavLink>
                            ))}

                            <div className="mobile-auth">
                                {!globalIsLoggedIn.isLoggedIn ? (
                                    <>
                                        <NavLink to="/login" className="mobile-login" onClick={() => setDropdown(false)}>
                                            Log In
                                        </NavLink>
                                        <NavLink to="/signup" className="mobile-signup" onClick={() => setDropdown(false)}>
                                            Sign Up
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={handleLogout} className="mobile-logout">
                                            Log Out
                                        </button>
                                        <button onClick={handleRenewTokens} className="mobile-renew">
                                            Renew Session
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}