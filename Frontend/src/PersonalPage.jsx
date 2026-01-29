// import axios from "axios";
// import { useEffect, useState } from "react"
// import OwnedCar from "./OwnedCar";
// import { useNavigate } from 'react-router-dom'
// import Navbar from './Homepage/Navbar.jsx'
// import Footer from './Homepage/Footer.jsx'
// import personalPageBg from './videos/personal_Page_bg.mp4'
// import './CSSFiles/PersonalPage.css'
// export default function PersonalPage(){

//     let [data , setData] = useState([]);
//     const navigate = useNavigate();
//     const getData = async () => {
//         try{
//             let response =await axios.get("http://localhost:3000/personalPosts" , {withCredentials : true})
//             setData(response.data);
//             // console.log(response)
//         } catch(error){
//             if(error.response.status === 401){
//                 navigate("/login")
//             }
//             console.log(error)
//         }
//     }
//     useEffect(()=>{
//         getData();
//     } , [])
    
//     return(
//         <div className="main-page">
//             <Navbar/>
//             <video autoPlay loop muted  className="bg-video" src={personalPageBg} ></video>

//             <div className="owned-car-container">
//                 {data.length > 0 ? (
//                     data.map((post , index)=>(
//                         <OwnedCar key={index} car={post}/>))) : 
//                         (<p>loading...</p>)
//                     }
//             </div>

//             {/* <Footer/> */}
//         </div>

//     )
// }








import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import OwnedCar from "./OwnedCar"
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'
import personalPageBg from './videos/personal_page_bg.mp4'
import './CSSFiles/personalPage.css'                // PersonalPage specific styles
const backendURL = import.meta.env.VITE_BackendURL;

export default function PersonalPage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [stats, setStats] = useState({
        totalCars: 0,
        totalValue: 0,
        avgPrice: 0
    })
    const navigate = useNavigate()

    const getData = async () => {
        try {
            setLoading(true)
            let response = await axios.get(`${backendURL}/personalPosts`, {
                withCredentials: true
            })
            setData(response.data)
            calculateStats(response.data)
            setError(null)
        } catch (error) {
            console.error('Error fetching personal posts:', error)
            if (error.response?.status === 401) {
                navigate("/login")
                return
            }
            setError('Failed to load your car listings')
        } finally {
            setLoading(false)
        }
    }

    const calculateStats = (cars) => {
        const totalCars = cars.length
        const totalValue = cars.reduce((sum, car) => sum + (car.Price || 0), 0)
        const avgPrice = totalCars > 0 ? totalValue / totalCars : 0

        setStats({
            totalCars,
            totalValue,
            avgPrice
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const formatPrice = (price) => {
        return `PKR ${price.toLocaleString()}`
    }

    return (
        <div className="personal-container">
            <Navbar />
            
            {/* Background Video */}
            <div className="video-background">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="bg-video"
                >
                    <source src={personalPageBg} type="video/mp4" />
                </video>
                <div className="video-overlay"></div>
            </div>

            <div className="personal-content">
                {/* Header Section */}
                <div className="personal-header">
                    <h1>My Garage</h1>
                    <p className="header-subtitle">
                        Manage all your car listings in one place. Update, delete, or track your vehicles.
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="garage-stats">
                    <div className="stat-card">
                        <div className="stat-icon">🚗</div>
                        <div className="stat-content">
                            <div className="stat-number">{stats.totalCars}</div>
                            <div className="stat-label">Total Listings</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">💰</div>
                        <div className="stat-content">
                            <div className="stat-number">{formatPrice(stats.totalValue)}</div>
                            <div className="stat-label">Total Value</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">📊</div>
                        <div className="stat-content">
                            <div className="stat-number">{formatPrice(stats.avgPrice)}</div>
                            <div className="stat-label">Average Price</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">📈</div>
                        <div className="stat-content">
                            <div className="stat-number">{data.filter(car => !car.Accidental).length}</div>
                            <div className="stat-label">Clean History</div>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Loading your car listings...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="error-state">
                        <p className="error-message">{error}</p>
                        <button onClick={getData} className="retry-btn">
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && data.length === 0 && (
                    <div className="empty-garage">
                        <div className="empty-icon">🚗</div>
                        <h3>Your Garage is Empty</h3>
                        <p>You haven't listed any cars yet. Start by adding your first vehicle!</p>
                        <button 
                            onClick={() => navigate('/carForm')} 
                            className="btn-add-car"
                        >
                            + Add Your First Car
                        </button>
                    </div>
                )}

                {/* Cars Grid */}
                {!loading && !error && data.length > 0 && (
                    <>
                        <div className="garage-header">
                            <h2>Your Car Listings</h2>
                            <p className="garage-description">
                                Manage all your listed vehicles.
                            </p>
                        </div>

                        <div className="cars-grid">
                            {data.map((car, index) => (
                                <OwnedCar key={car._id || index} car={car} />
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="quick-actions">
                            <h3>Quick Actions</h3>
                            <div className="action-buttons">
                                <button 
                                    onClick={() => navigate('/carForm')} 
                                    className="btn-action-primary"
                                >
                                    🚗 Add New Car
                                </button>
                                <button 
                                    onClick={() => navigate('/explore')} 
                                    className="btn-action-secondary"
                                >
                                    🔍 Browse Marketplace
                                </button>
                                <button 
                                    onClick={() => navigate('/history')} 
                                    className="btn-action-secondary"
                                >
                                    📋 View Sales History
                                </button>
                            </div>
                        </div>

                        {/* Tips Section */}
                        <div className="tips-section">
                            <h3>Selling Tips</h3>
                            <div className="tips-grid">
                                <div className="tip-card">
                                    <div className="tip-icon">📸</div>
                                    <h4>Quality Photos</h4>
                                    <p>Use clear, well-lit photos from multiple angles to attract buyers.</p>
                                </div>
                                <div className="tip-card">
                                    <div className="tip-icon">📝</div>
                                    <h4>Detailed Description</h4>
                                    <p>Include all relevant information and be honest about the condition.</p>
                                </div>
                                <div className="tip-card">
                                    <div className="tip-icon">💰</div>
                                    <h4>Competitive Pricing</h4>
                                    <p>Research similar vehicles to set a fair and competitive price.</p>
                                </div>
                                <div className="tip-card">
                                    <div className="tip-icon">⏰</div>
                                    <h4>Regular Updates</h4>
                                    <p>Keep your listings updated with current information and availability.</p>
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