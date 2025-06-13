
import carImage from './assets/car_image.jpeg'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './CSSFiles/SoldCarCard.css'
import { useState , useEffect } from 'react';
export default function Card({car}){
    let [carData , setCarData] = useState({});
    let [customerData , setCUstomerData] = useState({});
    let [salesPersonData , setSalesPersonData] = useState({});

    const getCarData = async ()=>{
        try {
            let response = await axios.get(`http://localhost:3000/car/${car.Car_Id}` , {withCredentials : true ,headers: { "Content-Type": "multipart/form-data" }});
            setCarData(response.data);
        } catch (error) {
            console.log(error.response.data.error)
            console.log(error.response.status)
        }
    }
    const getCustomerData = async ()=>{
        try {
            let response = await axios.get(`http://localhost:3000/customer/${car.Customer_Id}` , {withCredentials : true ,headers: { "Content-Type": "multipart/form-data" }});
            setCUstomerData(response.data);
        } catch (error) {
            console.log(error.response.data.error)
            console.log(error.response.status)
        }
    }
    const getSalesPersonData = async ()=>{
        try {
            let response = await axios.get(`http://localhost:3000/aboutus/${car.Employee_Id}` , {withCredentials : true ,headers: { "Content-Type": "multipart/form-data" }});
            setSalesPersonData(response.data);
        } catch (error) {
            console.log(error.response.data.error)
            console.log(error.response.status)
        }
    }
    useEffect(()=>{
        getCarData();
        getCustomerData();
        getSalesPersonData();
    } , [])



    return(
        <div className='card'>
            <img className='card_img' src={carData.Image?.url || carImage} alt="car Image" />
            <h3 className='car_name'>{carData.Car_Name}</h3>
            <ul>
                <li>Car Type: {carData.Car_Type}</li>
                <li>Car Color: {carData.Color}</li>
                <li>Sold To: {customerData.First_Name} {customerData.Last_Name}</li>
                <li>SalesPerson: {salesPersonData.First_Name} {salesPersonData.Last_Name}</li>
                <li>Asked Amount {car.Asked_Amount}</li>
                <li>Given Amount {car.Given_Amount}</li>
                <li>Date: {car.Sale_Date}</li>
                <li>Payment Method: {car.Payment_Method}</li>
                
            </ul>
            
        </div>
    )
}