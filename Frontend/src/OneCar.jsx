import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom'
import axios from 'axios'
import UserContext from "./context/UserContext.js"
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'
import carImage from './assets/car_image.jpeg'
import './CSSFiles/OneCar.css'
import {
    Car,
    Fuel,
    Gauge,
    Palette,
    Calendar,
    Hash,
    ShieldCheck,
    AlertTriangle,
    Tag,
    User,
    Phone,
    Mail,
    Edit3,
    Trash2,
    ShoppingBag,
    ArrowLeft,
    CheckCircle2,
    FileText,
    ChevronRight,
    MapPin,
    Clock
} from 'lucide-react'

// User SVGs
import verifiedBadgeSvg from './assets/icons/verified-badge.svg'
import speedometerSvg from './assets/icons/speedometer.svg'
import engineSvg from './assets/icons/engine.svg'
import gasPumpSvg from './assets/icons/gas-pump.svg'
import steeringWheelSvg from './assets/icons/steering-wheel.svg'
import keySvg from './assets/icons/key.svg'

const backendURL = import.meta.env.VITE_BackendURL;

export default function OneCar() {
    const { id } = useParams()
    const navigate = useNavigate()
    const globalUser = useContext(UserContext)
    const [data, setData] = useState({})
    const [notOwner, setNotOwner] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const isOwner = data.Car_Owner === globalUser.loggedInUser

    const getData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${backendURL}/car/${id}`, {
                withCredentials: true
            })
            setData(response.data)
            setError(null)
        } catch (err) {
            console.error('Error fetching car data:', err)
            setError(err.response?.data?.error || 'Failed to load vehicle details')
            if (err.response?.status === 401) {
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
        if (!window.confirm('Are you sure you want to permanently delete this vehicle listing?')) {
            return
        }

        try {
            setIsDeleting(true)
            await axios.delete(`${backendURL}/car/delete/${id}`, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
            })
            navigate('/explore')
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/login')
            } else if (err.response?.status === 403) {
                handleNotOwner()
            } else {
                console.error("Delete error:", err)
                setError('Failed to delete car listing')
            }
        } finally {
            setIsDeleting(false)
        }
    }

    const formatPrice = (price) => {
        if (!price && price !== 0) return 'N/A'
        return Number(price).toLocaleString('en-PK')
    }

    if (loading) {
        return (
            <div className='one-car-container'>
                <Navbar />
                <div className='one-car-loading-state'>
                    <div className="one-car-spinner"></div>
                    <h2>Loading Vehicle Information</h2>
                    <p>Retrieving verified vehicle specifications...</p>
                </div>
                <Footer />
            </div>
        )
    }

    if (error && !data._id) {
        return (
            <div className='one-car-container'>
                <Navbar />
                <div className='one-car-error-state'>
                    <div className="error-icon-box">
                        <AlertTriangle size={36} />
                    </div>
                    <h2>Vehicle Listing Not Found</h2>
                    <p>{error}</p>
                    <button className="btn-back-explore" onClick={() => navigate('/explore')}>
                        <ArrowLeft size={18} />
                        <span>Return to Inventory</span>
                    </button>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className='one-car-container'>
            <Navbar />
            
            <main className='one-car-main'>
                {/* Minimalist Top Breadcrumbs */}
                <nav className='one-car-breadcrumb' aria-label="Breadcrumb">
                    <NavLink to="/">Home</NavLink>
                    <ChevronRight size={14} className="breadcrumb-separator" />
                    <NavLink to="/explore">Inventory</NavLink>
                    <ChevronRight size={14} className="breadcrumb-separator" />
                    <span className="breadcrumb-current">{data.Car_Name || 'Vehicle Profile'}</span>
                </nav>

                <div className='one-car-layout'>
                    {/* Left Column: Visual Showcase & Ownership Actions */}
                    <section className='one-car-media-col'>
                        <div className='car-gallery-card'>
                            <div className='car-image-frame'>
                                <img 
                                    src={data.Image?.url || carImage} 
                                    alt={`${data.Manufacturer || ''} ${data.Car_Name || 'Vehicle'}`} 
                                    className='car-hero-img'
                                    onError={(e) => {
                                        e.target.src = carImage
                                    }}
                                />
                                <div className='car-badge-overlay'>
                                    {data.Accidental ? (
                                        <span className='condition-badge accidental'>
                                            <AlertTriangle size={15} />
                                            <span>Restored / Accidental</span>
                                        </span>
                                    ) : (
                                        <span className='condition-badge clean'>
                                            <img src={verifiedBadgeSvg} alt="Verified" className="condition-svg-badge" />
                                            <span>Certified Clean Title</span>
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Owner Control Console */}
                        {isOwner && (
                            <div className='owner-console-card'>
                                <div className='owner-console-header'>
                                    <User size={18} className="console-icon" />
                                    <h4>Listing Management</h4>
                                </div>
                                <p className='console-desc'>You are the registered owner of this listing.</p>
                                <div className='owner-console-actions'>
                                    <NavLink to={`/car/update/${data._id}`} className="btn-manage-edit">
                                        <Edit3 size={16} />
                                        <span>Update Vehicle</span>
                                    </NavLink>
                                    <button 
                                        onClick={deleteCar} 
                                        className="btn-manage-delete" 
                                        disabled={isDeleting}
                                    >
                                        <Trash2 size={16} />
                                        <span>{isDeleting ? 'Removing...' : 'Delete Listing'}</span>
                                    </button>
                                </div>
                                {notOwner && (
                                    <p className='owner-warning'>
                                        Access denied: You do not have permissions to modify this listing.
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Dealership Assurance Card */}
                        <div className='assurance-card'>
                            <h4>Prestige Assurance Standard</h4>
                            <ul className='assurance-list'>
                                <li>
                                    <CheckCircle2 size={16} className="assurance-check" />
                                    <span>Comprehensive 150-Point Technical Inspection</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={16} className="assurance-check" />
                                    <span>Verified Ownership & Encumbrance Clearance</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={16} className="assurance-check" />
                                    <span>Complimentary 12-Month Roadside Assistance</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Right Column: Key Details & Purchasing */}
                    <section className='one-car-info-col'>
                        <div className='vehicle-header-card'>
                            <div className='vehicle-title-wrap'>
                                <div className='vehicle-meta-tags'>
                                    <span className='meta-tag brand-tag'>{data.Manufacturer || 'Manufacturer'}</span>
                                    <span className='meta-tag year-tag'>Model {data.Model_Number || 'N/A'}</span>
                                    <span className='meta-tag type-tag'>{data.Car_Type || 'Vehicle'}</span>
                                </div>
                                <h1 className='vehicle-heading'>{data.Car_Name || 'Vehicle Profile'}</h1>
                            </div>

                            <div className='price-display-box'>
                                <div className='price-label'>Official Price</div>
                                <div className='price-value'>
                                    <span className='currency'>PKR</span>
                                    <span className='amount'>{formatPrice(data.Price)}</span>
                                </div>
                                <div className='price-subtext'>Exclusive of applicable government taxes & transfer fees</div>
                            </div>
                        </div>

                        {/* Key Spec Highlights Bar with User SVGs */}
                        <div className='key-highlights-grid'>
                            <div className='highlight-tile'>
                                <div className='spec-icon-box'>
                                    <img src={speedometerSvg} alt="Mileage" className='spec-svg-icon' />
                                </div>
                                <div className='highlight-text'>
                                    <span className='highlight-label'>Mileage</span>
                                    <span className='highlight-val'>{data.Mileage ? `${data.Mileage} km` : 'N/A'}</span>
                                </div>
                            </div>
                            <div className='highlight-tile'>
                                <div className='spec-icon-box'>
                                    <img src={gasPumpSvg} alt="Fuel" className='spec-svg-icon' />
                                </div>
                                <div className='highlight-text'>
                                    <span className='highlight-label'>Fuel Type</span>
                                    <span className='highlight-val'>{data.Engine_Type || 'N/A'}</span>
                                </div>
                            </div>
                            <div className='highlight-tile'>
                                <div className='spec-icon-box'>
                                    <img src={steeringWheelSvg} alt="Transmission" className='spec-svg-icon' />
                                </div>
                                <div className='highlight-text'>
                                    <span className='highlight-label'>Body / Drive</span>
                                    <span className='highlight-val'>{data.Car_Type || 'N/A'}</span>
                                </div>
                            </div>
                            <div className='highlight-tile'>
                                <div className='spec-icon-box'>
                                    <img src={engineSvg} alt="Engine" className='spec-svg-icon' />
                                </div>
                                <div className='highlight-text'>
                                    <span className='highlight-label'>Powertrain</span>
                                    <span className='highlight-val'>{data.Engine_Number ? 'Verified' : 'Certified'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Specification Table */}
                        <div className='specs-table-card'>
                            <h3 className='specs-card-title'>
                                <FileText size={18} />
                                <span>Technical Specifications</span>
                            </h3>

                            <div className='specs-row-grid'>
                                <div className='specs-row-item'>
                                    <span className='spec-k'>Engine Number</span>
                                    <span className='spec-v'>{data.Engine_Number || 'Available upon inspection'}</span>
                                </div>
                                <div className='specs-row-item'>
                                    <span className='spec-k'>Model Year</span>
                                    <span className='spec-v'>{data.Model_Number || 'N/A'}</span>
                                </div>
                                <div className='specs-row-item'>
                                    <span className='spec-k'>Fuel / Powertrain</span>
                                    <span className='spec-v'>{data.Engine_Type || 'N/A'}</span>
                                </div>
                                <div className='specs-row-item'>
                                    <span className='spec-k'>Exterior Finish</span>
                                    <span className='spec-v'>{data.Color || 'N/A'}</span>
                                </div>
                                <div className='specs-row-item'>
                                    <span className='spec-k'>Vehicle Class</span>
                                    <span className='spec-v'>{data.Car_Type || 'Standard'}</span>
                                </div>
                                <div className='specs-row-item'>
                                    <span className='spec-k'>Accidental History</span>
                                    <span className={`spec-v ${data.Accidental ? 'text-accidental' : 'text-clean'}`}>
                                        {data.Accidental ? 'Accidental Record' : 'Clean / Non-Accidental'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Seller & Purchasing Action */}
                        <div className='purchase-action-card'>
                            <div className='dealer-contact-info'>
                                <div className='dealer-avatar'>
                                    <User size={20} />
                                </div>
                                <div className='dealer-meta'>
                                    <span className='dealer-label'>Listing Representative / Owner</span>
                                    <span className='dealer-name'>{data.Car_Owner || 'Prestige Motors Inventory'}</span>
                                </div>
                            </div>

                            {!isOwner && (
                                <div className='buyer-cta-section'>
                                    <NavLink to={`/car/buy/${data._id}`} className="btn-primary-purchase">
                                        <img src={keySvg} alt="Purchase Key" className="btn-key-icon" />
                                        <span>Proceed to Purchase</span>
                                    </NavLink>
                                    <p className='purchase-guarantee-note'>
                                        Direct transparent transaction through verified escrow & dealership contract.
                                    </p>
                                </div>
                            )}

                            {/* Direct Inquiries Contacts - Zero Emojis */}
                            <div className='dealership-inquiry-bar'>
                                <a href="tel:+923001234567" className="inquiry-btn">
                                    <Phone size={15} />
                                    <span>Call Sales Desk</span>
                                </a>
                                <a href="mailto:info@prestigecars.com" className="inquiry-btn">
                                    <Mail size={15} />
                                    <span>Email Inquiry</span>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}