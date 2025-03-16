import axios from 'axios';
import { useEffect, useState } from 'react';
import EmployeeCard from './EmployeeCard.jsx';
import './CSSFiles/Aboutus.css'
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'

export default function Aboutus(){

    const [data , setdata] = useState([]);

    const getData = async ()=>{
        try {
            let response = await axios.get("http://localhost:3000/aboutus" , {
                withCredentials: true
            });
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
            <div className='aboutus_page'>
                {data.length > 0 ? (
                    data.map((employee, index) => (
                        <EmployeeCard key={index} employee={employee} />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Footer/>

        </>
    )
}