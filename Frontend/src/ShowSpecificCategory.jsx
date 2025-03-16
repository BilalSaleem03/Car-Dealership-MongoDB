import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from './Card.jsx';
import { useParams } from 'react-router-dom';
import './CSSFiles/ShowSpecificCatagory.css'
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'

export default function ShowSpecificCategory(){
    let { type } = useParams();
    const [data , setdata] = useState([]);
    type = type.replace(":", "");
   

    const getData = async ()=>{
        try {
            let response = await axios.get(`http://localhost:3000/car/category/${type}` , {withCredentials : true});
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
            <div className='show_specific_car_catgory'>
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