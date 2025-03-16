import axios from "axios";
import { useEffect, useState } from "react"
import OwnedCar from "./OwnedCar";
import { useNavigate } from 'react-router-dom'
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'
import personalPageBg from './videos/personal_Page_bg.mp4'
import './CSSFiles/PersonalPage.css'
export default function PersonalPage(){

    let [data , setData] = useState([]);
    const navigate = useNavigate();
    const getData = async () => {
        try{
            let response =await axios.get("http://localhost:3000/personalPosts" , {withCredentials : true})
            setData(response.data);
            console.log(response)
        } catch(error){
            if(error.response.status === 401){
                navigate("/login")
            }
            console.log(error)
        }
    }
    useEffect(()=>{
        getData();
    } , [])
    
    return(
        <div className="main-page">
            <Navbar/>
            <video autoPlay loop muted  className="bg-video" src={personalPageBg} ></video>

            <div className="owned-car-container">
                {data.length > 0 ? (
                    data.map((post , index)=>(
                        <OwnedCar key={index} car={post}/>))) : 
                        (<p>loading...</p>)
                    }
            </div>

            {/* <Footer/> */}
        </div>

    )
}