// import carImage from './assets/car_image.jpeg'
// import './CSSFiles/OwnedCar.css'
// import { NavLink } from 'react-router-dom';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'

// export default function OwnedCar({car}){
//     let navigate = useNavigate();
//     const deleteCar =async ()=>{
//         try {
//             let response = await axios.delete(`http://localhost:3000/car/delete/${car._id}` , {withCredentials : true})
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
//         <div className="one-car">
//             <img className='card_img' src={car.Image?.url || carImage} alt="car Image" />
//             <ul className='list'>
//                 <li>Car name: {car.Car_Name}</li>
//                 <li>Manufacturer: {car.Manufacturer}</li>
//                 <li>Color: {car.Color}</li>
//                 <li>Model: {car.Model_Number}</li>
//                 <li>Car Type: {car.Car_Type}</li>
//                 <li>Engine: {car.Engine_Type}</li>
//                 <li>Mileage: {car.Mileage}</li>
//                 <li>Engine# {car.Engine_Number}</li>
//                 <li>Condition: {car.Accidental?"Accidental" : "Not Accidental"}</li>
//                 <li>PKR {car.Price}/-</li>
//                 <li>Post Owner: {car.Car_Owner}</li>
//             </ul>
//             <div className="btns">
//                 <NavLink className="navlink" to={`/car/buy/${car._id}`}><button className='buy_btn'>Buy Car</button></NavLink>
//                 <NavLink className="navlink" to={`/car/update/${car._id}`}><button className='buy_btn'>Update Info</button></NavLink>
//                 <button onClick={deleteCar}>Delete</button>
//             </div>
//         </div>
//     )
// }








import { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import carImage from './assets/car_image.jpeg'
import './CSSFiles/OwnedCar.css'
const backendURL = import.meta.env.VITE_BackendURL;

export default function OwnedCar({ car }) {
    const navigate = useNavigate()
    const [isDeleting, setIsDeleting] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const formatPrice = (price) => {
        if (!price && price !== 0) return 'PKR 0'
        return `PKR ${price.toLocaleString()}`
    }

    const deleteCar = async () => {
        try {
            setIsDeleting(true)
            await axios.delete(`${backendURL}/car/delete/${car._id}`, {
                withCredentials: true
            })
            navigate('/explore')
        } catch (error) {
            if (error.response?.status === 401) {
                navigate('/login')
            } else if (error.response?.status === 403) {
                alert('You are not authorized to delete this car')
            } else {
                console.error("Delete error:", error)
                alert('Failed to delete car listing')
            }
        } finally {
            setIsDeleting(false)
            setShowConfirm(false)
        }
    }

    const handleDeleteClick = () => {
        setShowConfirm(true)
    }

    const cancelDelete = () => {
        setShowConfirm(false)
    }

    return (
        <div className="owned-car-card">
            <div className='car-image-container'>
                <img 
                    className='car-image' 
                    src={car.Image?.url || carImage} 
                    alt={car.Car_Name || 'Car'} 
                />
                <div className='car-status'>
                    <span className={`status-badge ${car.Accidental ? 'status-accidental' : 'status-clean'}`}>
                        {car.Accidental ? '⚠️ Accidental' : '✅ Clean'}
                    </span>
                </div>
            </div>

            <div className='car-content'>
                <div className='car-header'>
                    <h3 className='car-name'>{car.Car_Name || 'Unnamed Vehicle'}</h3>
                    <div className='car-price'>{formatPrice(car.Price)}</div>
                </div>

                <div className='car-specs'>
                    <div className='spec-row'>
                        <div className='spec-item'>
                            <span className='spec-icon'>🏭</span>
                            <div>
                                <span className='spec-label'>Manufacturer</span>
                                <span className='spec-value'>{car.Manufacturer || 'N/A'}</span>
                            </div>
                        </div>
                        <div className='spec-item'>
                            <span className='spec-icon'>🎨</span>
                            <div>
                                <span className='spec-label'>Color</span>
                                <span className='spec-value'>{car.Color || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div className='spec-row'>
                        <div className='spec-item'>
                            <span className='spec-icon'>🔢</span>
                            <div>
                                <span className='spec-label'>Model</span>
                                <span className='spec-value'>{car.Model_Number || 'N/A'}</span>
                            </div>
                        </div>
                        <div className='spec-item'>
                            <span className='spec-icon'>🚗</span>
                            <div>
                                <span className='spec-label'>Type</span>
                                <span className='spec-value'>{car.Car_Type || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div className='spec-row'>
                        <div className='spec-item'>
                            <span className='spec-icon'>⚙️</span>
                            <div>
                                <span className='spec-label'>Engine</span>
                                <span className='spec-value'>{car.Engine_Type || 'N/A'}</span>
                            </div>
                        </div>
                        <div className='spec-item'>
                            <span className='spec-icon'>📊</span>
                            <div>
                                <span className='spec-label'>Mileage</span>
                                <span className='spec-value'>{car.Mileage || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div className='spec-row'>
                        <div className='spec-item'>
                            <span className='spec-icon'>🔑</span>
                            <div>
                                <span className='spec-label'>Engine #</span>
                                <span className='spec-value'>{car.Engine_Number || 'N/A'}</span>
                            </div>
                        </div>
                        <div className='spec-item'>
                            <span className='spec-icon'>👤</span>
                            <div>
                                <span className='spec-label'>Owner</span>
                                <span className='spec-value'>{car.Car_Owner || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='car-actions'>
                    {showConfirm ? (
                        <div className='delete-confirmation'>
                            <p>Are you sure you want to delete this listing?</p>
                            <div className='confirmation-buttons'>
                                <button 
                                    onClick={deleteCar} 
                                    className='btn-confirm-delete'
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                                </button>
                                <button 
                                    onClick={cancelDelete} 
                                    className='btn-cancel-delete'
                                    disabled={isDeleting}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <NavLink to={`/car/buy/${car._id}`} className="btn-action btn-buy">
                                🛒 Buy Car
                            </NavLink>
                            <NavLink to={`/car/update/${car._id}`} className="btn-action btn-update">
                                ✏️ Update Info
                            </NavLink>
                            <button 
                                onClick={handleDeleteClick} 
                                className="btn-action-delete btn-delete"
                                disabled={isDeleting}
                            >
                                🗑️ {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}