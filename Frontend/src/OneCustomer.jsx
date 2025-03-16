import axios from 'axios';
import personImage from './assets/human_image.jpeg'
import { useParams ,useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './CSSFiles/OneCustomer.css'
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'

export default function OneEmployee(){
    let { id } = useParams();
    const [data , setdata] = useState([]);
    const navigate = useNavigate();

    const getData = async ()=>{
        try {
            let response = await axios.get(`http://localhost:3000/customer/${id}` , {withCredentials : true});
            // console.log(response.request.status);     --->To get status code
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

    // const updateCustomer =async ()=>{
    //     try {
    //         let response = await axios.put(`http://localhost:3000/customer/update/${id}` ,{} , {withCredentials : true});
    //         navigate('/customer')
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    return(
        <div className='one_customer_window'>
            <Navbar/>
            <div className='one_customer'>
                <img src={personImage} alt="person Image" />
                <h3>{data.First_Name} {data.Last_Name}</h3>
                <ul>
                    <li>CNIC# {data.CNIC}</li>
                    <li>Date of Birth: {formatDate(data.Date_of_Birth)}</li>
                    <li>Email Address: {data.Email_Address}</li>
                    <li>Gender: {data.Gender}</li>
                    <li>Phone# {data.Phone_Number}</li>
                    <li>Telephone# {data.Telephone}</li>
                    <li>Address: {data.Address}</li>
                </ul>
                <NavLink to={`/customer/update/${data._id}`}><button>Update Info</button></NavLink>
            </div>
            <Footer/>
        </div>
    )
}