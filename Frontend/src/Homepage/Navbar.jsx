import React, { useEffect, useState } from 'react';
import logoImg from '../assets/logo.png';
import stack from '../assets/stack.svg';
import cross from '../assets/cross.svg';
import './Homepage.css'
import { NavLink } from 'react-router-dom';   //better than using "Link" as we can add class in NavLink tag
import axios from 'axios';
import { useContext } from "react";
import  LoginContext  from "../context/LoginContext";
import UserContext from "../context/UserContext.js";

export default function Navbar() {
    let globalIsLoggedIn = useContext(LoginContext)
    let globalUser = useContext(UserContext);

    const checkCookiesPresence = async ()=>{
        try{
            let response = await axios.post("http://localhost:3000/authenticate/is-logged-in" , {} , { withCredentials: true })
            // localStorage.setItem("isLoggedIn" , true)
            // localStorage.setItem("loggedInUser" , response.data.user)
            globalIsLoggedIn.updateIsLoggedIn(true);
            globalUser.updateUser(response.data.user)


        } catch(error){
            console.log(error)
            localStorage.setItem("isLoggedIn" , false)
            localStorage.setItem("loggedInUser" , "")
            globalIsLoggedIn.updateIsLoggedIn(false);
        }
    }

    useEffect(() => {
       checkCookiesPresence();
    } , [])

    let [search , setSearch] = useState("");
    let [dropdown , setDropdown] = useState(false);

    

    let handleSearch = (event)=>{
        setSearch(event.target.value);
    }
    let clickSearch = (event)=>{
        event.preventDefault();
        
    }

    let handleDropdown = ()=>{
        setDropdown(!dropdown);
    }

    let handleLogout =async ()=>{
        try{
            console.log("mmmmmmm")
            let ack = await axios.post(
                "http://localhost:3000/authenticate/logout",
                {},  // Empty request body
                { withCredentials: true } // Move withCredentials here
            );
            console.log(ack.data.success)
            localStorage.setItem("loggedInUser", "");
            globalIsLoggedIn.updateIsLoggedIn(false);

        } catch (error){
            console.log("error")
            console.log(error)
        }
    }
    let handleRenewTokens =async ()=>{
        try{
            let ack = await axios.post(
                "http://localhost:3000/authenticate/renewAccessToken",
                {},  // Empty request body
                { withCredentials: true } // Move withCredentials here
            );
            console.log(ack.data.success)
        } catch (error){
            console.log(error)
        }
    }
    
    return (
        <>
            <nav className="navbar">
                <div className='left-area'>
                    <img className='logoImage' src={logoImg} alt="logo" />
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/explore">Explore</NavLink>
                    <NavLink to="/aboutus">About Us</NavLink>
                    <NavLink to="/customer">Customers</NavLink>
                    <NavLink to="/history">History</NavLink>
                    <NavLink to="/personal">Personal</NavLink>
                    <div className="drop-down" >
                        <img className='stack' src={dropdown == false ? stack : cross} alt="stack" onClick={handleDropdown}/>
                    </div>
                    <div className={dropdown == false ? "drop-down-closed" : "drop-down-open"}>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/explore">Explore</NavLink>
                        <NavLink to="/aboutus">About Us</NavLink>
                        <NavLink to="/customer">Customers</NavLink>
                        <NavLink to="/history">History</NavLink>
                        <NavLink to="/login">Log in</NavLink>
                        <NavLink to="/personal">Personal</NavLink>
                        <button onClick={handleLogout}>Log Out</button>
                        <NavLink to="/signup">Sign up</NavLink>
                    </div>
                </div>
                <div className="center-area">
                    <input className="search-area" placeholder="Search" value={search} onChange={handleSearch}/>
                    <button className="search-btn" type="submit" onClick={clickSearch}>Search</button>
                </div>
                <div className="right-area">
                    {!globalIsLoggedIn.isLoggedIn && <NavLink to="/login">Log in</NavLink>}
                    {globalIsLoggedIn.isLoggedIn && <button onClick={handleLogout}>Log Out</button>}
                    {/* <button onClick={handleLogout}>Log Out</button> */}
                    {globalIsLoggedIn.isLoggedIn && <button onClick={handleRenewTokens}>Renew</button>}
                    {/* <button onClick={handleRenewTokens}>Renew</button> */}
                    {!globalIsLoggedIn.isLoggedIn && <NavLink to="/signup">Sign up</NavLink> }
                    

                </div>
            </nav>
        </>
    );
}
