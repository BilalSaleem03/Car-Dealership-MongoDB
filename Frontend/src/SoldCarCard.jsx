
// import carImage from './assets/car_image.jpeg'
// import { NavLink } from 'react-router-dom';
// import axios from 'axios';
// import './CSSFiles/SoldCarCard.css'
// import { useState , useEffect } from 'react';
// export default function Card({car}){
//     let [carData , setCarData] = useState({});
//     let [customerData , setCUstomerData] = useState({});
//     let [salesPersonData , setSalesPersonData] = useState({});

//     const getCarData = async ()=>{
//         try {
//             let response = await axios.get(`http://localhost:3000/car/${car.Car_Id}` , {withCredentials : true ,headers: { "Content-Type": "multipart/form-data" }});
//             setCarData(response.data);
//         } catch (error) {
//             console.log(error.response.data.error)
//             console.log(error.response.status)
//         }
//     }
//     const getCustomerData = async ()=>{
//         try {
//             let response = await axios.get(`http://localhost:3000/customer/${car.Customer_Id}` , {withCredentials : true ,headers: { "Content-Type": "multipart/form-data" }});
//             setCUstomerData(response.data);
//         } catch (error) {
//             console.log(error.response.data.error)
//             console.log(error.response.status)
//         }
//     }
//     const getSalesPersonData = async ()=>{
//         try {
//             let response = await axios.get(`http://localhost:3000/aboutus/${car.Employee_Id}` , {withCredentials : true ,headers: { "Content-Type": "multipart/form-data" }});
//             setSalesPersonData(response.data);
//         } catch (error) {
//             console.log(error.response.data.error)
//             console.log(error.response.status)
//         }
//     }
//     useEffect(()=>{
//         getCarData();
//         getCustomerData();
//         getSalesPersonData();
//     } , [])



//     return(
//         <div className='card'>
//             <img className='card_img' src={carData.Image?.url || carImage} alt="car Image" />
//             <h3 className='car_name'>{carData.Car_Name}</h3>
//             <ul>
//                 <li>Car Type: {carData.Car_Type}</li>
//                 <li>Car Color: {carData.Color}</li>
//                 <li>Sold To: {customerData.First_Name} {customerData.Last_Name}</li>
//                 <li>SalesPerson: {salesPersonData.First_Name} {salesPersonData.Last_Name}</li>
//                 <li>Asked Amount {car.Asked_Amount}</li>
//                 <li>Given Amount {car.Given_Amount}</li>
//                 <li>Date: {car.Sale_Date}</li>
//                 <li>Payment Method: {car.Payment_Method}</li>
                
//             </ul>
            
//         </div>
//     )
// }












import { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import carImage from './assets/car_image.jpeg'
import personImage from './assets/human_image.jpeg'
import './CSSFiles/SoldCarCard.css'

export default function SoldCarCard({ sale }) {
    const [carData, setCarData] = useState({})
    const [customerData, setCustomerData] = useState({})
    const [salesPersonData, setSalesPersonData] = useState({})
    const [loading, setLoading] = useState(true)

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const formatCurrency = (amount) => {
        if (!amount && amount !== 0) return '$0'
        return `$${amount.toLocaleString()}`
    }

    const calculateProfit = () => {
        if (sale.Asked_Amount && sale.Given_Amount) {
            const profit = sale.Given_Amount - sale.Asked_Amount
            const percentage = ((profit / sale.Asked_Amount) * 100).toFixed(1)
            return { profit, percentage }
        }
        return { profit: 0, percentage: 0 }
    }

    const getCarData = async () => {
        try {
            let response = await axios.get(`http://localhost:3000/car/${sale.Car_Id}`, {
                withCredentials: true
            })
            setCarData(response.data)
        } catch (error) {
            console.error('Error fetching car data:', error)
        }
    }

    const getCustomerData = async () => {
        try {
            let response = await axios.get(`http://localhost:3000/customer/${sale.Customer_Id}`, {
                withCredentials: true
            })
            setCustomerData(response.data)
        } catch (error) {
            console.error('Error fetching customer data:', error)
        }
    }

    const getSalesPersonData = async () => {
        try {
            let response = await axios.get(`http://localhost:3000/aboutus/${sale.Employee_Id}`, {
                withCredentials: true
            })
            setSalesPersonData(response.data)
        } catch (error) {
            console.error('Error fetching salesperson data:', error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await Promise.all([
                getCarData(),
                getCustomerData(),
                getSalesPersonData()
            ])
            setLoading(false)
        }
        fetchData()
    }, [sale])

    const profitInfo = calculateProfit()

    if (loading) {
        return (
            <div className='sale-card loading'>
                <div className="card-skeleton">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-content">
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='sale-card'>
            <div className='sale-header'>
                <div className='sale-badge'>
                    <span className='badge-sold'>✅ SOLD</span>
                    <span className='sale-date'>{formatDate(sale.Sale_Date)}</span>
                </div>
                <div className='sale-price'>
                    {formatCurrency(sale.Given_Amount)}
                </div>
            </div>

            <div className='sale-content'>
                <div className='sale-image-section'>
                    <img 
                        className='sale-image' 
                        src={carData.Image?.url || carImage} 
                        alt={carData.Car_Name || 'Car'} 
                    />
                    <div className='image-overlay'>
                        <div className='car-info'>
                            <h3>{carData.Car_Name || 'Unknown Vehicle'}</h3>
                            <p>{carData.Manufacturer || ''} • {carData.Car_Type || ''}</p>
                        </div>
                    </div>
                </div>

                <div className='sale-details'>
                    <div className='detail-section'>
                        <h4>📊 Sale Details</h4>
                        <div className='detail-grid'>
                            <div className='detail-item'>
                                <span className='detail-label'>Asked Amount:</span>
                                <span className='detail-value'>{formatCurrency(sale.Asked_Amount)}</span>
                            </div>
                            <div className='detail-item'>
                                <span className='detail-label'>Sold For:</span>
                                <span className='detail-value highlight'>{formatCurrency(sale.Given_Amount)}</span>
                            </div>
                            <div className='detail-item'>
                                <span className='detail-label'>Profit:</span>
                                <span className={`detail-value ${profitInfo.profit >= 0 ? 'profit-positive' : 'profit-negative'}`}>
                                    {formatCurrency(profitInfo.profit)} ({profitInfo.percentage}%)
                                </span>
                            </div>
                            <div className='detail-item'>
                                <span className='detail-label'>Payment Method:</span>
                                <span className='detail-value badge-payment'>
                                    {sale.Payment_Method || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='participants-section'>
                        <div className='participant-card'>
                            <div className='participant-header'>
                                <span className='participant-icon'>👤</span>
                                <h5>Customer</h5>
                            </div>
                            <div className='participant-info'>
                                <p className='participant-name'>
                                    {customerData.First_Name} {customerData.Last_Name}
                                </p>
                                <p className='participant-contact'>
                                    {customerData.Phone_Number || 'No contact'}
                                </p>
                            </div>
                        </div>

                        <div className='participant-card'>
                            <div className='participant-header'>
                                <span className='participant-icon'>👔</span>
                                <h5>Salesperson</h5>
                            </div>
                            <div className='participant-info'>
                                <p className='participant-name'>
                                    {salesPersonData.First_Name} {salesPersonData.Last_Name}
                                </p>
                                <p className='participant-role'>
                                    {salesPersonData.Designation || 'Sales Representative'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='sale-footer'>
                    <div className='car-specs'>
                        <span className='spec-tag'>{carData.Color || 'N/A'}</span>
                        <span className='spec-tag'>{carData.Engine_Type || 'N/A'}</span>
                        <span className='spec-tag'>{carData.Mileage || 'N/A'} mi</span>
                    </div>
                    <div className='sale-actions'>
                        <NavLink to={`/car/${carData._id}`} className='btn-view'>
                            View Car Details →
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}