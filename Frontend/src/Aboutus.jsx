// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import EmployeeCard from './EmployeeCard.jsx';
// import './CSSFiles/Aboutus.css'
// import Navbar from './Homepage/Navbar.jsx'
// import Footer from './Homepage/Footer.jsx'

// export default function Aboutus(){

//     const [data , setdata] = useState([]);

//     const getData = async ()=>{
//         try {
//             let response = await axios.get("http://localhost:3000/aboutus" , {
//                 withCredentials: true
//             });
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
//             <Navbar/>
//             <div className='aboutus_page'>
//                 {data.length > 0 ? (
//                     data.map((employee, index) => (
//                         <EmployeeCard key={index} employee={employee} />
//                     ))
//                 ) : (
//                     <p>Loading...</p>
//                 )}
//             </div>
//             <Footer/>

//         </>
//     )
// }



import { useEffect, useState } from 'react'
import axios from 'axios'
import EmployeeCard from './EmployeeCard.jsx'
import './CSSFiles/Aboutus.css'
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'

export default function Aboutus() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getData = async () => {
        try {
            setLoading(true)
            let response = await axios.get("http://localhost:3000/aboutus", {
                withCredentials: true
            })
            setData(response.data)
            setError(null)
        } catch (error) {
            console.error('Error fetching employee data:', error)
            setError('Failed to load team information')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='aboutus-container'>
            <Navbar />
            
            <div className='aboutus-content'>
                {/* Hero Section */}
                <div className='aboutus-hero'>
                    <h1>Meet Our Team</h1>
                    <p className='hero-subtitle'>
                        Dedicated professionals committed to providing you with the best car buying experience.
                        Our team combines expertise with passion to serve your automotive needs.
                    </p>
                </div>

                {/* Team Stats */}
                <div className='team-stats'>
                    <div className='stat-card'>
                        <div className='stat-number'>{data.length}</div>
                        <div className='stat-label'>Team Members</div>
                    </div>
                    <div className='stat-card'>
                        <div className='stat-number'>24/7</div>
                        <div className='stat-label'>Support Available</div>
                    </div>
                    <div className='stat-card'>
                        <div className='stat-number'>100%</div>
                        <div className='stat-label'>Customer Satisfaction</div>
                    </div>
                    <div className='stat-card'>
                        <div className='stat-number'>10+</div>
                        <div className='stat-label'>Years Experience</div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className='loading-state'>
                        <div className="loading-spinner"></div>
                        <p>Loading our team...</p>
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

                {/* Team Grid */}
                {!loading && !error && (
                    <>
                        <div className='team-header'>
                            <h2>Our Expert Team</h2>
                            <p className='team-description'>
                                Each member of our team brings unique skills and experience to ensure 
                                you find the perfect vehicle for your needs.
                            </p>
                        </div>

                        <div className='team-grid'>
                            {data.length > 0 ? (
                                data.map((employee, index) => (
                                    <EmployeeCard key={employee._id || index} employee={employee} />
                                ))
                            ) : (
                                <div className='no-employees'>
                                    <p>No team members found</p>
                                </div>
                            )}
                        </div>

                        {/* Company Info */}
                        <div className='company-info'>
                            <div className='company-details'>
                                <h3>About Our Dealership</h3>
                                <p>
                                    With over a decade of experience in the automotive industry, 
                                    we pride ourselves on transparency, integrity, and exceptional 
                                    customer service. Our team is here to guide you through every 
                                    step of your car buying journey.
                                </p>
                                <div className='company-values'>
                                    <div className='value-item'>
                                        <span className='value-icon'>🏆</span>
                                        <h4>Excellence</h4>
                                        <p>Striving for the best in everything we do</p>
                                    </div>
                                    <div className='value-item'>
                                        <span className='value-icon'>🤝</span>
                                        <h4>Integrity</h4>
                                        <p>Honest and transparent dealings</p>
                                    </div>
                                    <div className='value-item'>
                                        <span className='value-icon'>❤️</span>
                                        <h4>Customer Care</h4>
                                        <p>Putting our customers first</p>
                                    </div>
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