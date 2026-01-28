// import axios from 'axios';
// import personImage from './assets/human_image.jpeg'
// import { useParams ,useNavigate, NavLink } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import './CSSFiles/OneCustomer.css'
// import Navbar from './Homepage/Navbar.jsx'
// import Footer from './Homepage/Footer.jsx'

// export default function OneEmployee(){
//     let { id } = useParams();
//     const [data , setdata] = useState([]);
//     const navigate = useNavigate();

//     const getData = async ()=>{
//         try {
//             let response = await axios.get(`http://localhost:3000/customer/${id}` , {withCredentials : true});
//             // console.log(response.data);    
//             setdata(response.data);
//         } catch (error) {
//             console.log(error.response.data.error)
//             console.log(error.response.status)
//         }
//     }
//     useEffect(()=>{
//         getData();
//     } , [])
//     const formatDate = (dateString) => {
//         return dateString ? dateString.split('T')[0] : 'N/A';
//     };

//     return(
//         <div className='one_customer_window'>
//             <Navbar/>
//             <div className='one_customer'>
//                 <img src={data.Image?.url || personImage} alt="person Image" />
//                 <h3>{data.First_Name} {data.Last_Name}</h3>
//                 <ul>
//                     <li>CNIC# {data.CNIC}</li>
//                     <li>Date of Birth: {formatDate(data.Date_of_Birth)}</li>
//                     <li>Email Address: {data.Email_Address}</li>
//                     <li>Gender: {data.Gender}</li>
//                     <li>Phone# {data.Phone_Number}</li>
//                     <li>Telephone# {data.Telephone}</li>
//                     <li>Address: {data.Address}</li>
//                 </ul>
//                 <NavLink to={`/customer/update/${data._id}`}><button>Update Info</button></NavLink>
//             </div>
//             <Footer/>
//         </div>
//     )
// }




import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import personImage from './assets/human_image.jpeg'
import './CSSFiles/OneCustomer.css'
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'

export default function OneCustomer() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getData = async () => {
        try {
            setLoading(true)
            let response = await axios.get(`http://localhost:3000/customer/${id}`, {
                withCredentials: true
            })
            setData(response.data)
            setError(null)
        } catch (error) {
            console.error('Error fetching customer data:', error)
            setError('Failed to load customer information')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [id])

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const formatPhone = (phone) => {
        if (!phone) return 'N/A'
        const phoneStr = String(phone)
        if (phoneStr.length === 10) {
            return phoneStr.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
        }
        return phoneStr
    }

    // Update this function in OneCustomer.jsx:
    const formatCNIC = (cnic) => {
        if (!cnic) return 'N/A'
        const cnicStr = String(cnic)
        if (cnicStr.length === 13) {
            return cnicStr.replace(/(\d{5})(\d{7})(\d{1})/, '$1-$2-$3')
        }
        return cnicStr
    }

    const calculateAge = (dob) => {
        if (!dob) return 'N/A'
        const birthDate = new Date(dob)
        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return `${age} years`
    }

    if (loading) {
        return (
            <div className='customer-container'>
                <Navbar />
                <div className='customer-loading'>
                    <div className="loading-spinner"></div>
                    <h2>Loading Customer Profile...</h2>
                    <p>Please wait while we fetch customer information</p>
                </div>
                <Footer />
            </div>
        )
    }

    if (error) {
        return (
            <div className='customer-container'>
                <Navbar />
                <div className='customer-error'>
                    <div className="error-icon">!</div>
                    <h2>Profile Not Found</h2>
                    <p>{error}</p>
                    <button className="btn-primary" onClick={() => navigate('/customers')}>
                        ← Back to Customers
                    </button>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className='customer-container'>
            <Navbar />
            
            <div className='customer-content'>
                <div className='customer-breadcrumb'>
                    <NavLink to="/">Home</NavLink> / 
                    <NavLink to="/customers">Customers</NavLink> / 
                    <span>{data.First_Name} {data.Last_Name}</span>
                </div>

                <div className='customer-grid'>
                    {/* Left Column - Customer Profile */}
                    <div className='customer-profile-section'>
                        <div className='profile-image-container'>
                            <img 
                                src={data.Image?.url || personImage} 
                                alt={`${data.First_Name} ${data.Last_Name}`}
                                className='profile-image'
                                onError={(e) => {
                                    e.target.src = personImage
                                }}
                            />
                            <div className='profile-status'>
                                <span className='status-badge status-vip'>
                                    👑 Valued Customer
                                </span>
                            </div>
                        </div>

                        <div className='profile-summary'>
                            <h2>{data.First_Name} {data.Last_Name}</h2>
                            <div className='profile-details'>
                                <div className='detail-item'>
                                    <span className='detail-label'>Age</span>
                                    <span className='detail-value'>{calculateAge(data.Date_of_Birth)}</span>
                                </div>
                                <div className='detail-item'>
                                    <span className='detail-label'>Gender</span>
                                    <span className='detail-value'>{data.Gender || 'N/A'}</span>
                                </div>
                                <div className='detail-item'>
                                    <span className='detail-label'>Member Since</span>
                                    <span className='detail-value'>{formatDate(data.createdAt)}</span>
                                </div>
                            </div>
                            
                            {/* <div className='contact-buttons'>
                                <a href={`tel:${data.Phone_Number}`} className='contact-btn phone-btn'>
                                    📞 Call Customer
                                </a>
                                <a href={`mailto:${data.Email_Address}`} className='contact-btn email-btn'>
                                    📧 Send Email
                                </a>
                            </div> */}
                            
                            <NavLink to={`/customer/update/${data._id}`} className="btn-update-customer-profile">
                                ✏️ Update Profile
                            </NavLink>
                        </div>
                    </div>

                    {/* Right Column - Customer Details */}
                    <div className='customer-details-section'>
                        <div className='details-header'>
                            <h1>Customer Profile</h1>
                            <div className='customer-id'>
                                🆔 ID: {data._id?.substring(0, 8)}...
                            </div>
                        </div>

                        <div className='details-grid'>
                            <div className='detail-card'>
                                <div className='detail-icon'>🆔</div>
                                <div className='detail-content'>
                                    <h4>Identification</h4>
                                    <ul>
                                        <li><strong>CNIC:</strong> {formatCNIC(data.CNIC)}</li>
                                        <li><strong>Full Name:</strong> {data.First_Name} {data.Last_Name}</li>
                                        <li><strong>Date of Birth:</strong> {formatDate(data.Date_of_Birth)}</li>
                                        <li><strong>Age:</strong> {calculateAge(data.Date_of_Birth)}</li>
                                    </ul>
                                </div>
                            </div>

                            <div className='detail-card'>
                                <div className='detail-icon'>📍</div>
                                <div className='detail-content'>
                                    <h4>Address & Location</h4>
                                    <ul>
                                        <li><strong>Address:</strong> {data.Address || 'N/A'}</li>
                                        {/* <li><strong>City:</strong> {data.City || 'N/A'}</li> */}
                                        <li><strong>Country:</strong> {data.Country || 'Pakistan'}</li>
                                        {/* <li><strong>Postal Code:</strong> {data.Postal_Code || 'N/A'}</li> */}
                                    </ul>
                                </div>
                            </div>

                            <div className='detail-card'>
                                <div className='detail-icon'>📞</div>
                                <div className='detail-content'>
                                    <h4>Contact Information</h4>
                                    <ul>
                                        <li><strong>Mobile:</strong> {formatPhone(data.Phone_Number)}</li>
                                        <li><strong>Telephone:</strong> {data.Telephone || 'N/A'}</li>
                                        <li><strong>Email:</strong> {data.Email_Address || 'N/A'}</li>
                                        <li><strong>Preferred Contact:</strong> {data.Preferred_Contact || 'Phone'}</li>
                                    </ul>
                                </div>
                            </div>

                            <div className='detail-card'>
                                <div className='detail-icon'>📊</div>
                                <div className='detail-content'>
                                    <h4>Additional Information</h4>
                                    <ul>
                                        <li><strong>Gender:</strong> {data.Gender || 'N/A'}</li>
                                        <li><strong>Occupation:</strong> {data.Occupation || 'N/A'}</li>
                                        <li><strong>Income Level:</strong> {data.Income_Level || 'N/A'}</li>
                                        {/* <li><strong>Customer Type:</strong> {data.Customer_Type || 'Regular'}</li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Purchase History (if available)
                        <div className='purchase-history'>
                            <h3>Customer History</h3>
                            <div className='history-placeholder'>
                                <div className='placeholder-icon'>📋</div>
                                <p>Purchase history and transaction records would appear here</p>
                                <small>Integrated with your transaction system</small>
                            </div>
                        </div> */}

                        {/* Notes Section */}
                        {/* <div className='customer-notes'>
                            <h3>Customer Notes</h3>
                            <div className='notes-editor'>
                                <textarea 
                                    placeholder="Add notes about this customer (preferences, special requirements, etc.)..."
                                    className='notes-textarea'
                                />
                                <button className='save-notes-btn'>
                                    💾 Save Notes
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}