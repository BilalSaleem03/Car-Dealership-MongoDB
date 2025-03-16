
import { useNavigate } from 'react-router-dom'
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'
import axios from 'axios';
import carImage from './assets/car_image.jpeg'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './CSSFiles/OneCar.css'

import { useContext } from "react";
import UserContext from "./context/UserContext.js";


export default function OneCar(){

    let globalUser = useContext(UserContext);
    console.log(globalUser.loggedInUser)

    let { id } = useParams();
    const [data , setdata] = useState([]);
    const [notOwner , setNotOwner] = useState(false);
    const navigate = useNavigate();
    const getData = async ()=>{
        try {
            
            let response = await axios.get(`http://localhost:3000/car/${id}` , {withCredentials : true});
            setdata(response.data);
            // console.log(response)
        } catch (error) {
            console.log(error.response.data.error)
            console.log(error.response.status)
        }
    }
    useEffect(()=>{
        getData();
    } , [])

    const handleNotOwner = ()=>{
        setNotOwner(true)
    }

    const deleteCar =async ()=>{
        try {
            let response = await axios.delete(`http://localhost:3000/car/delete/${id}` , {withCredentials : true})
            navigate('/explore')
        } catch (error) {
            if(error.response.status == 401){
                navigate('/login')
            } else if(error.response.status == 403){
                handleNotOwner()
            }
             else{
                console.log("some other error")
                console.log(error)
            }
        }
    }

    return(
        <div className='one_car_window'>
            <Navbar/>
            <div className='one_car'>
                <img src={carImage} alt="car Image" />
                <h3>{data.Car_Name}</h3>
                <ul>
                    <li>Manufacturer: {data.Manufacturer}</li>
                    <li>Color: {data.Color}</li>
                    <li>Model: {data.Model_Number}</li>
                    <li>Car Type: {data.Car_Type}</li>
                    <li>Engine: {data.Engine_Type}</li>
                    <li>Mileage: {data.Mileage}</li>
                    <li>Engine# {data.Engine_Number}</li>
                    <li>Condition: {data.Accidental?"Accidental" : "Not Accidental"}</li>
                    <li>PKR {data.Price}/-</li>
                    <li>Post Owner: {data.Car_Owner}/-</li>
                    <p className='owner-message'>{notOwner && "You Are Not The Owner"}</p>
                </ul>
                <p>
                    
                {data.Car_Owner !== globalUser.loggedInUser &&  "nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"}
                </p>
                {/* <NavLink to={`/car/buy/${data._id}`}><button className='buy_btn'>Buy Car</button></NavLink>
                <NavLink to={`/car/update/${data._id}`}><button className='buy_btn'>Update Info</button></NavLink>
                <button onClick={deleteCar}>Delete</button> */}
                <NavLink to={`/car/buy/${data._id}`}>{data.Car_Owner === globalUser.loggedInUser && <button className='buy_btn'>Buy Car</button>}</NavLink>
                <p>{globalUser.loggedInUser}</p>

            </div>
            <Footer/>
        </div>
    )
}