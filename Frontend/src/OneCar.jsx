
// import { useNavigate } from 'react-router-dom'
// import Navbar from './Homepage/Navbar.jsx'
// import Footer from './Homepage/Footer.jsx'
// import axios from 'axios';
// import carImage from './assets/car_image.jpeg'
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import './CSSFiles/OneCar.css'

// import { useContext } from "react";
// import UserContext from "./context/UserContext.js";


// export default function OneCar(){

//     let globalUser = useContext(UserContext);
//     console.log(globalUser.loggedInUser)

//     let { id } = useParams();
//     const [data , setdata] = useState([]);
//     const [notOwner , setNotOwner] = useState(false);
//     const navigate = useNavigate();
//     const getData = async ()=>{
//         try {
            
//             let response = await axios.get(`http://localhost:3000/car/${id}` , {withCredentials : true});
//             setdata(response.data);
//             // console.log(response)
//         } catch (error) {
//             console.log(error.response.data.error)
//             console.log(error.response.status)
//         }
//     }
//     useEffect(()=>{
//         getData();
//     } , [])

//     const handleNotOwner = ()=>{
//         setNotOwner(true)
//     }

//     const deleteCar =async ()=>{
//         try {
//             let response = await axios.delete(`http://localhost:3000/car/delete/${id}` , {withCredentials : true ,headers: { "Content-Type": "multipart/form-data" }})
//             navigate('/explore')
//         } catch (error) {
//             if(error.response.status == 401){
//                 navigate('/login')
//             } else if(error.response.status == 403){
//                 handleNotOwner()
//             }
//              else{
//                 console.log("some other error")
//                 console.log(error)
//             }
//         }
//     }

//     return(
//         <div className='one_car_window'>
//             <Navbar/>
//             <div className='one_car'>
//                 <img src={data.Image?.url || carImage} alt="car Image" />
//                 <h3>{data.Car_Name}</h3>
//                 <ul>
//                     <li>Manufacturer: {data.Manufacturer}</li>
//                     <li>Color: {data.Color}</li>
//                     <li>Model: {data.Model_Number}</li>
//                     <li>Car Type: {data.Car_Type}</li>
//                     <li>Engine: {data.Engine_Type}</li>
//                     <li>Mileage: {data.Mileage}</li>
//                     <li>Engine# {data.Engine_Number}</li>
//                     <li>Condition: {data.Accidental?"Accidental" : "Not Accidental"}</li>
//                     <li>PKR {data.Price}/-</li>
//                     <li>Post Owner: {data.Car_Owner}/-</li>
//                     <p className='owner-message'>{notOwner && "You Are Not The Owner"}</p>
//                 </ul>
//                 <NavLink to={`/car/update/${data._id}`}>{data.Car_Owner === globalUser.loggedInUser && <button className='buy_btn'>Update Info</button>}</NavLink>
//                 {data.Car_Owner === globalUser.loggedInUser && <button onClick={deleteCar}>Delete</button>}
//                 <NavLink to={`/car/buy/${data._id}`}>{data.Car_Owner === globalUser.loggedInUser && <button className='buy_btn'>Buy Car</button>}</NavLink>

//             </div>
//             <Footer/>
//         </div>
//     )
// }




import { useNavigate, useParams, NavLink } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import UserContext from "./context/UserContext.js"
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'
import carImage from './assets/car_image.jpeg'
import './CSSFiles/OneCar.css'
import { FaCar, FaPalette, FaCogs, FaGasPump, FaTachometerAlt, FaKey, FaExclamationTriangle, FaTag, FaUser, FaEdit, FaTrash, FaShoppingCart } from 'react-icons/fa'

export default function OneCar() {
    const { id } = useParams()
    const navigate = useNavigate()
    const globalUser = useContext(UserContext)
    const [data, setData] = useState({})
    const [notOwner, setNotOwner] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const isOwner = data.Car_Owner === globalUser.loggedInUser

    const getData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:3000/car/${id}`, {
                withCredentials: true
            })
            setData(response.data)
            setError(null)
        } catch (error) {
            console.error('Error fetching car data:', error)
            setError(error.response?.data?.error || 'Failed to load car details')
            
            if (error.response?.status === 401) {
                navigate('/login')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [id])

    const handleNotOwner = () => {
        setNotOwner(true)
        setTimeout(() => setNotOwner(false), 3000)
    }

    const deleteCar = async () => {
        if (!window.confirm('Are you sure you want to delete this car listing?')) {
            return
        }

        try {
            await axios.delete(`http://localhost:3000/car/delete/${id}`, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
            })
            navigate('/explore')
        } catch (error) {
            if (error.response?.status === 401) {
                navigate('/login')
            } else if (error.response?.status === 403) {
                handleNotOwner()
            } else {
                console.error("Delete error:", error)
                setError('Failed to delete car listing')
            }
        }
    }

    if (loading) {
        return (
            <div className='one-car-container'>
                <Navbar />
                <div className='one-car-loading'>
                    <div className="loading-spinner"></div>
                    <h2>Loading Car Details...</h2>
                    <p>Please wait while we fetch the vehicle information</p>
                </div>
                <Footer />
            </div>
        )
    }

    if (error && !data._id) {
        return (
            <div className='one-car-container'>
                <Navbar />
                <div className='one-car-error'>
                    <div className="error-icon">!</div>
                    <h2>Oops! Something went wrong</h2>
                    <p>{error}</p>
                    <button className="btn-primary" onClick={() => navigate('/explore')}>
                        ← Back to Explore
                    </button>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className='one-car-container'>
            <Navbar />
            
            <div className='one-car-content'>
                <div className='one-car-breadcrumb'>
                    <NavLink to="/">Home</NavLink> / 
                    <NavLink to="/explore">Explore</NavLink> / 
                    <span>{data.Car_Name || 'Car Details'}</span>
                </div>

                <div className='one-car-grid'>
                    {/* Left Column - Car Image */}
                    <div className='one-car-image-section'>
                        <div className='car-image-container'>
                            <img 
                                src={data.Image?.url || carImage} 
                                alt={data.Car_Name || 'Car'} 
                                className='car-main-image'
                                onError={(e) => {
                                    e.target.src = carImage
                                }}
                            />
                            <div className='car-status-badge'>
                                {data.Accidental ? (
                                    <span className='badge-accidental'>
                                        <FaExclamationTriangle /> Accidental
                                    </span>
                                ) : (
                                    <span className='badge-clean'>
                                        <FaCar /> Clean History
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        {isOwner && (
                            <div className='owner-actions'>
                                <h3><FaUser /> Owner Actions</h3>
                                <div className='owner-buttons'>
                                    <NavLink to={`/car/update/${data._id}`} className="btn-update">
                                        <FaEdit /> Update Listing
                                    </NavLink>
                                    <button onClick={deleteCar} className="btn-delete">
                                        <FaTrash /> Delete Listing
                                    </button>
                                </div>
                                {notOwner && (
                                    <p className='owner-message error'>
                                        You are not the owner of this car
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Column - Car Details */}
                    <div className='one-car-details'>
                        <div className='car-header'>
                            <h1>{data.Car_Name || 'Unnamed Vehicle'}</h1>
                            <div className='car-price'>
                                <FaTag /> PKR {data.Price?.toLocaleString() || '0'}
                            </div>
                        </div>

                        <div className='car-basic-info'>
                            <div className='info-item'>
                                <FaCar />
                                <div>
                                    <span className='info-label'>Manufacturer</span>
                                    <span className='info-value'>{data.Manufacturer || 'N/A'}</span>
                                </div>
                            </div>
                            <div className='info-item'>
                                <FaPalette />
                                <div>
                                    <span className='info-label'>Color</span>
                                    <span className='info-value'>{data.Color || 'N/A'}</span>
                                </div>
                            </div>
                            <div className='info-item'>
                                <FaCogs />
                                <div>
                                    <span className='info-label'>Model</span>
                                    <span className='info-value'>{data.Model_Number || 'N/A'}</span>
                                </div>
                            </div>
                            <div className='info-item'>
                                <FaCar />
                                <div>
                                    <span className='info-label'>Type</span>
                                    <span className='info-value'>{data.Car_Type || 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        <div className='car-specs-grid'>
                            <div className='spec-card'>
                                <FaGasPump className='spec-icon' />
                                <h4>Engine Type</h4>
                                <p>{data.Engine_Type || 'N/A'}</p>
                            </div>
                            <div className='spec-card'>
                                <FaTachometerAlt className='spec-icon' />
                                <h4>Mileage</h4>
                                <p>{data.Mileage || 'N/A'}</p>
                            </div>
                            <div className='spec-card'>
                                <FaKey className='spec-icon' />
                                <h4>Engine Number</h4>
                                <p>{data.Engine_Number || 'N/A'}</p>
                            </div>
                            <div className='spec-card'>
                                <FaExclamationTriangle className='spec-icon' />
                                <h4>Condition</h4>
                                <p>{data.Accidental ? "Accidental" : "Excellent"}</p>
                            </div>
                        </div>

                        <div className='car-owner-info'>
                            <h3><FaUser /> Owner Information</h3>
                            <div className='owner-details'>
                                <p>Posted by: <strong>{data.Car_Owner || 'Unknown'}</strong></p>
                                <p>Member since: {/* You might want to add owner join date */}</p>
                            </div>
                        </div>

                        {!isOwner && (
                            <div className='buyer-action'>
                                <NavLink to={`/car/buy/${data._id}`} className="btn-buy">
                                    <FaShoppingCart /> Buy This Car
                                </NavLink>
                                <p className='action-note'>Contact us for test drive arrangements</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Additional Information */}
                <div className='additional-info'>
                    <h2>Vehicle Description</h2>
                    <p>
                        This {data.Manufacturer || ''} {data.Car_Name || 'vehicle'} is in {data.Accidental ? 'accidental but restored' : 'excellent'} condition. 
                        With a powerful {data.Engine_Type || ''} engine and comfortable interior, 
                        it offers the perfect blend of performance and comfort. 
                        {data.Mileage && ` The vehicle has a mileage of ${data.Mileage}, ensuring reliable performance for years to come.`}
                    </p>
                    
                    <div className='contact-info-box'>
                        <h3>Interested in this vehicle?</h3>
                        <p>Contact our sales team for more information or to schedule a test drive.</p>
                        <div className='contact-details'>
                            <p>📞 +92 300 1234567</p>
                            <p>📧 info@dealership.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}