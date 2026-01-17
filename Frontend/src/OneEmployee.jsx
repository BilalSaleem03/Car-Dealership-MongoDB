// import axios from 'axios';
// import personImage from './assets/human_image.jpeg'
// import { useParams , useNavigate, NavLink } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import './CSSFiles/OneEmployee.css'
// import Navbar from './Homepage/Navbar.jsx'
// import Footer from './Homepage/Footer.jsx'

// export default function OneEmployee(){
//     let { id } = useParams();
//     const [data , setdata] = useState([]);
//     // id = id.replace(":", "");
//     const navigate = useNavigate();
//     const getData = async ()=>{
//         try {
//             let response = await axios.get(`http://localhost:3000/aboutus/${id}` , {withCredentials : true});
//             setdata(response.data);
//             console.log(response.data)

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
//         <div className='one_employee_window'>
//             <Navbar/>
//             <div className='one_employee'>
//                 <img src={data.Image?.url || personImage} alt="car Image" />
//                 <h3>{data.First_Name} {data.Last_Name}</h3>
//                 <ul>
//                     <li>Designation: {data.Designation}</li>
//                     <li>Date of Birth: {formatDate(data.Date_of_Birth)}</li>
//                     <li>Email Address: {data.Email_Address}</li>
//                     <li>Gender: {data.Gender}</li>
//                     <li>Phone# {data.Phone_Number}</li>
//                     <li>Telephone# {data.Telephone}</li>
//                     <li>Hire Date: {formatDate(data.Hire_Date)}</li>
//                     <li>Salary: PKR {data.Salary}/-</li>
//                     <li>Commession Rate: {data.Commission_Rate}%</li>
//                     <li>Address: {data.Address}</li>
//                 </ul>
//                 <NavLink  to={`/employee/update/${data._id}`}><button>Update</button></NavLink>
//             </div>
//             <Footer/>
//         </div>
//     )
// }







import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import personImage from './assets/human_image.jpeg'
import './CSSFiles/OneEmployee.css'
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'

export default function OneEmployee() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getData = async () => {
        try {
            setLoading(true)
            let response = await axios.get(`http://localhost:3000/aboutus/${id}`, {
                withCredentials: true
            })
            setData(response.data)
            setError(null)
        } catch (error) {
            console.error('Error fetching employee data:', error)
            setError('Failed to load employee information')
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
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    }

    if (loading) {
        return (
            <div className='employee-container'>
                <Navbar />
                <div className='employee-loading'>
                    <div className="loading-spinner"></div>
                    <h2>Loading Profile...</h2>
                    <p>Please wait while we fetch employee information</p>
                </div>
                <Footer />
            </div>
        )
    }

    if (error) {
        return (
            <div className='employee-container'>
                <Navbar />
                <div className='employee-error'>
                    <div className="error-icon">!</div>
                    <h2>Profile Not Found</h2>
                    <p>{error}</p>
                    <button className="btn-primary" onClick={() => navigate('/aboutus')}>
                        ← Back to Team
                    </button>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className='employee-container'>
            <Navbar />
            
            <div className='employee-content'>
                <div className='employee-breadcrumb'>
                    <NavLink to="/">Home</NavLink> / 
                    <NavLink to="/aboutus">Our Team</NavLink> / 
                    <span>{data.First_Name} {data.Last_Name}</span>
                </div>

                <div className='employee-grid'>
                    {/* Left Column - Employee Image & Basic Info */}
                    <div className='employee-profile-section'>
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
                                <span className={`status-badge ${data.Designation?.toLowerCase().includes('manager') ? 'status-manager' : 'status-employee'}`}>
                                    {data.Designation?.toLowerCase().includes('manager') ? '👑 Manager' : '👤 Employee'}
                                </span>
                            </div>
                        </div>

                        <div className='profile-summary'>
                            <h2>{data.First_Name} {data.Last_Name}</h2>
                            <h3 className='profile-designation'>{data.Designation}</h3>
                            <p className='profile-email'>📧 {data.Email_Address || 'N/A'}</p>
                            <p className='profile-phone'>📱 {formatPhone(data.Phone_Number)}</p>
                            
                            <NavLink to={`/employee/update/${data._id}`} className="btn-update-profile">
                                ✏️ Update Profile
                            </NavLink>
                        </div>
                    </div>

                    {/* Right Column - Detailed Information */}
                    <div className='employee-details-section'>
                        <div className='details-header'>
                            <h1>Employee Profile</h1>
                            <div className='hire-date'>
                                🗓️ Joined: {formatDate(data.Hire_Date)}
                            </div>
                        </div>

                        <div className='details-grid'>
                            <div className='detail-card'>
                                <div className='detail-icon'>👤</div>
                                <div className='detail-content'>
                                    <h4>Personal Information</h4>
                                    <ul>
                                        <li><strong>Gender:</strong> {data.Gender || 'N/A'}</li>
                                        <li><strong>Date of Birth:</strong> {formatDate(data.Date_of_Birth)}</li>
                                        <li><strong>Address:</strong> {data.Address || 'N/A'}</li>
                                    </ul>
                                </div>
                            </div>

                            <div className='detail-card'>
                                <div className='detail-icon'>💼</div>
                                <div className='detail-content'>
                                    <h4>Employment Details</h4>
                                    <ul>
                                        <li><strong>Designation:</strong> {data.Designation || 'N/A'}</li>
                                        <li><strong>Hire Date:</strong> {formatDate(data.Hire_Date)}</li>
                                        <li><strong>Years with Company:</strong> 
                                            {data.Hire_Date ? 
                                                Math.floor((new Date() - new Date(data.Hire_Date)) / (365 * 24 * 60 * 60 * 1000)) 
                                                : 'N/A'} years
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className='detail-card'>
                                <div className='detail-icon'>💰</div>
                                <div className='detail-content'>
                                    <h4>Compensation</h4>
                                    <ul>
                                        <li><strong>Salary:</strong> PKR {data.Salary?.toLocaleString() || '0'}/month</li>
                                        <li><strong>Annual Salary:</strong> PKR {(data.Salary * 12)?.toLocaleString() || '0'}</li>
                                        <li><strong>Commission Rate:</strong> {data.Commission_Rate || '0'}%</li>
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
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className='additional-info'>
                            <h3>About {data.First_Name}</h3>
                            <p>
                                {data.First_Name} is a valued member of our team, bringing expertise and dedication 
                                to their role as {data.Designation || 'a team member'}. 
                                {data.Hire_Date && ` They have been with the company since ${formatDate(data.Hire_Date)}`}, 
                                contributing significantly to our success.
                            </p>
                            
                            <div className='contact-box'>
                                <h4>Need to get in touch?</h4>
                                <p>You can reach {data.First_Name} during business hours for any inquiries.</p>
                                <div className='contact-options'>
                                    <a href={`mailto:${data.Email_Address}`} className='contact-btn email-btn'>
                                        📧 Send Email
                                    </a>
                                    <a href={`tel:${data.Phone_Number}`} className='contact-btn phone-btn'>
                                        📞 Call Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}