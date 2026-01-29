// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import CustomerCard from './CustomerCard.jsx';
// import './CSSFiles/Customers.css'
// import Navbar from './Homepage/Navbar.jsx'
// import Footer from './Homepage/Footer.jsx'

// export default function Aboutus(){

//     const [data , setdata] = useState([]);

//     const getData = async ()=>{
//         try {
//             let response = await axios.get("http://localhost:3000/customer" , {withCredentials : true});
//             setdata(response.data);
//         } catch (error) {
//             console.log(error.response.data.error)
//             console.log(error.response.status)
//         }
//     }
//     useEffect(()=>{
//         getData();
//     } , [])

//     return(
//         <>
//         <Navbar/>
//             <div className='customers'>
//                 {data.length > 0 ? (
//                     data.map((customer, index) => (
//                         <CustomerCard key={index} customer={customer} />
//                     ))
//                 ) : (
//                     <p>Loading...</p>
//                 )}
//             </div>
//         <Footer/>

//         </>
//     )
// }




import { useEffect, useState } from 'react'
import axios from 'axios'
import CustomerCard from './CustomerCard.jsx'
import './CSSFiles/Customers.css'
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'
const backendURL = import.meta.env.VITE_BackendURL;

export default function Customers() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    const getData = async () => {
        try {
            setLoading(true)
            let response = await axios.get(`${backendURL}/customer`, {
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
    }, [])

    // Filter customers based on search term
    const filteredCustomers = data.filter(customer => {
        const fullName = `${customer.First_Name} ${customer.Last_Name}`.toLowerCase()
        const phone = customer.Phone_Number?.toLowerCase() || ''
        const email = customer.Email_Address?.toLowerCase() || ''
        const search = searchTerm.toLowerCase()
        
        return fullName.includes(search) || 
               phone.includes(search) || 
               email.includes(search)
    })

    return (
        <div className='customers-container'>
            <Navbar />
            
            <div className='customers-content'>
                {/* Hero Section */}
                <div className='customers-hero'>
                    <h1>Our Valued Customers</h1>
                    <p className='hero-subtitle'>
                        Meet our community of satisfied customers who trust us for their automotive needs.
                        We're proud to serve each and every one of them.
                    </p>
                </div>

                {/* Search Bar */}
                <div className='customers-search'>
                    <div className='search-container'>
                        <span className='search-icon'>🔍</span>
                        <input
                            type="text"
                            placeholder="Search customers by name, phone, or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='search-input'
                        />
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm('')}
                                className='clear-search'
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    <div className='search-stats'>
                        Showing {filteredCustomers.length} of {data.length} customers
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className='loading-state'>
                        <div className="loading-spinner"></div>
                        <p>Loading customer information...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className='error-state'>
                        <p className='error-message'>{error}</p>
                        <button onClick={getData} className='retry-btn'>
                            Try Again
                        </button>
                    </div>
                )}

                {/* Customers Grid */}
                {!loading && !error && (
                    <>
                        <div className='customers-header'>
                            <h2>Customer Directory</h2>
                            <p className='customers-description'>
                                Browse through our customer profiles to see the diverse community we serve.
                            </p>
                        </div>

                        {filteredCustomers.length > 0 ? (
                            <div className='customers-grid'>
                                {filteredCustomers.map((customer) => (
                                    <CustomerCard key={customer._id} customer={customer} />
                                ))}
                            </div>
                        ) : (
                            <div className='no-customers'>
                                <div className='no-customers-icon'>👥</div>
                                <h3>No customers found</h3>
                                <p>
                                    {searchTerm ? 
                                        `No customers match "${searchTerm}". Try a different search.` :
                                        'No customer data available.'
                                    }
                                </p>
                                {searchTerm && (
                                    <button 
                                        onClick={() => setSearchTerm('')}
                                        className='btn-primary'
                                    >
                                        Clear Search
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Customer Stats */}
                        <div className='customer-stats-section'>
                            <h3>Customer Insights</h3>
                            <div className='stats-grid'>
                                <div className='insight-card'>
                                    <div className='insight-icon'>👥</div>
                                    <div className='insight-content'>
                                        <div className='insight-number'>{data.length}</div>
                                        <div className='insight-label'>Total Customers</div>
                                    </div>
                                </div>
                                <div className='insight-card'>
                                    <div className='insight-icon'>⭐</div>
                                    <div className='insight-content'>
                                        <div className='insight-number'>98%</div>
                                        <div className='insight-label'>Satisfaction Rate</div>
                                    </div>
                                </div>
                                <div className='insight-card'>
                                    <div className='insight-icon'>🔄</div>
                                    <div className='insight-content'>
                                        <div className='insight-number'>75%</div>
                                        <div className='insight-label'>Return Customers</div>
                                    </div>
                                </div>
                                <div className='insight-card'>
                                    <div className='insight-icon'>📞</div>
                                    <div className='insight-content'>
                                        <div className='insight-number'>24/7</div>
                                        <div className='insight-label'>Support Available</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Customer Service Info */}
                        <div className='service-info'>
                            <h3>Customer Service Commitment</h3>
                            <p>
                                We are committed to providing exceptional service to all our customers.
                                Our team is dedicated to ensuring your complete satisfaction with every interaction.
                            </p>
                            <div className='service-features'>
                                <div className='feature'>
                                    <span className='feature-icon'>🎯</span>
                                    <h4>Personalized Service</h4>
                                    <p>Tailored solutions for your specific needs</p>
                                </div>
                                <div className='feature'>
                                    <span className='feature-icon'>🛡️</span>
                                    <h4>Trust & Transparency</h4>
                                    <p>Honest dealings and clear communication</p>
                                </div>
                                <div className='feature'>
                                    <span className='feature-icon'>⚡</span>
                                    <h4>Quick Response</h4>
                                    <p>Fast and efficient service delivery</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </div>
    )
}