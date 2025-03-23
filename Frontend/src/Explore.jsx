
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from './Card.jsx';
import './CSSFiles/Explore.css'
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'

export default function Explore(){

    const [data , setdata] = useState([]);

    const getData = async ()=>{
        try {
            let response = await axios.get("http://localhost:3000/explore" , {withCredentials : true});
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

    return(
        <>
            <Navbar/>
            <div className='explore_page'>
                {data.length > 0 ? (
                    data.map((car, index) => (
                        <Card key={index} car={car} />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Footer/>
           

        </>
    )
}