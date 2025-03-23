import axios from 'axios';
import personImage from './assets/human_image.jpeg'
import { useParams , useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './CSSFiles/OneEmployee.css'
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'

export default function OneEmployee(){
    let { id } = useParams();
    const [data , setdata] = useState([]);
    // id = id.replace(":", "");
    const navigate = useNavigate();
    const getData = async ()=>{
        try {
            let response = await axios.get(`http://localhost:3000/aboutus/${id}` , {withCredentials : true});
            setdata(response.data);
        } catch (error) {
            console.log(error.response.data.error)
            console.log(error.response.status)
        }
    }
    useEffect(()=>{
        getData();
    } , [])
    
    const formatDate = (dateString) => {
        return dateString ? dateString.split('T')[0] : 'N/A';
    };

    return(
        <div className='one_employee_window'>
            <Navbar/>
            <div className='one_employee'>
                <img src={data.Image?.url || personImage} alt="car Image" />
                <h3>{data.First_Name} {data.Last_Name}</h3>
                <ul>
                    <li>Designation: {data.Designation}</li>
                    <li>Date of Birth: {formatDate(data.Date_of_Birth)}</li>
                    <li>Email Address: {data.Email_Address}</li>
                    <li>Gender: {data.Gender}</li>
                    <li>Phone# {data.Phone_Number}</li>
                    <li>Telephone# {data.Telephone}</li>
                    <li>Hire Date: {formatDate(data.Hire_Date)}</li>
                    <li>Salary: PKR {data.Salary}/-</li>
                    <li>Commession Rate: {data.Commission_Rate}%</li>
                    <li>Address: {data.Address}</li>
                </ul>
                <NavLink  to={`/employee/update/${data._id}`}><button>Update</button></NavLink>
            </div>
            <Footer/>
        </div>
    )
}