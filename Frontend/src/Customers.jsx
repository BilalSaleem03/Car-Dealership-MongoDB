import axios from 'axios';
import { useEffect, useState } from 'react';
import CustomerCard from './CustomerCard.jsx';
import './CSSFiles/Customers.css'
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'

export default function Aboutus(){

    const [data , setdata] = useState([]);

    const getData = async ()=>{
        try {
            let response = await axios.get("http://localhost:3000/customer" , {withCredentials : true});
            setdata(response.data);
        } catch (error) {
            console.log(error.response.data.error)
            console.log(error.response.status)
        }
    }
    useEffect(()=>{
        getData();
    } , [])

    return(
        <>
        <Navbar/>
            <div className='customers'>
                {data.length > 0 ? (
                    data.map((customer, index) => (
                        <CustomerCard key={index} customer={customer} />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        <Footer/>

        </>
    )
}