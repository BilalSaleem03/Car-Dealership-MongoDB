import axios from 'axios';
import { useEffect, useState } from 'react';
import SoldCarCard from './SoldCarCard.jsx';
import './CSSFiles/History.css'
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'

export default function History(){

    const [data , setdata] = useState([]);

    const getData = async ()=>{
        try {
            let response = await axios.get("http://localhost:3000/history" , {withCredentials : true});
            setdata(response.data);
        } catch (error) {
            console.log(error)
            // console.log(error.response.data.error)
            // console.log(error.response.status)
        }
        
    }
    useEffect(()=>{
        getData();
    } , [])

    return(
        <>
            <Navbar/>
            <div className='history_page'>
                {data.length > 0 ? (
                    data.map((car, index) => (
                        <SoldCarCard key={index} car={car} />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Footer/>
           

        </>
    )
}