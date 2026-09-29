import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import personImage from './assets/human_image.jpeg'
import verifiedBadgeSvg from './assets/icons/verified-badge.svg'
import './CSSFiles/OneCustomer.css'
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'
import {
    User,
    Mail,
    Phone,
    MapPin,
    CreditCard,
    Calendar,
    ShieldCheck,
    Briefcase,
    TrendingUp,
    Edit3,
    ChevronRight,
    ArrowLeft,
    AlertCircle,
    Clock,
    PhoneCall
} from 'lucide-react'

const backendURL = import.meta.env.VITE_BackendURL;

export default function OneCustomer() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${backendURL}/customer/${id}`, {
                withCredentials: true
            })
            setData(response.data)
            setError(null)
        } catch (err) {
            console.error('Error fetching customer data:', err)
            setError('Failed to load customer profile')
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
            <div className='one-customer-container'>
                <Navbar />
                <div className='one-customer-loading-state'>
                    <div className="one-customer-spinner"></div>
                    <h2>Loading Customer Record</h2>
                    <p>Accessing verified client database...</p>
                </div>
                <Footer />
            </div>
        )
    }

    if (error) {
        return (
            <div className='one-customer-container'>
                <Navbar />
                <div className='one-customer-error-state'>
                    <div className="error-icon-box">
                        <AlertCircle size={36} />
                    </div>
                    <h2>Customer Profile Unavailable</h2>
                    <p>{error}</p>
                    <button className="btn-back-customers" onClick={() => navigate('/customer')}>
                        <ArrowLeft size={16} />
                        <span>Return to Directory</span>
                    </button>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className='one-customer-container'>
            <Navbar />
            
            <main className='one-customer-main'>
                {/* Clean Breadcrumb */}
                <nav className='one-customer-breadcrumb' aria-label="Breadcrumb">
                    <NavLink to="/">Home</NavLink>
                    <ChevronRight size={14} className="breadcrumb-separator" />
                    <NavLink to="/customer">Customer Directory</NavLink>
                    <ChevronRight size={14} className="breadcrumb-separator" />
                    <span className="breadcrumb-current">
                        {data.First_Name} {data.Last_Name}
                    </span>
                </nav>

                <div className='one-customer-layout'>
                    {/* Left Column: Client Identity Summary */}
                    <aside className='customer-summary-card'>
                        <div className='avatar-container'>
                            <img 
                                src={data.Image?.url || personImage} 
                                alt={`${data.First_Name} ${data.Last_Name}`}
                                className='customer-avatar-img'
                                onError={(e) => {
                                    e.target.src = personImage
                                }}
                            />
                            <div className='client-status-badge'>
                                <img src={verifiedBadgeSvg} alt="Verified" style={{ width: '13px', height: '13px', filter: 'brightness(0) invert(1)' }} />
                                <span>Verified Client</span>
                            </div>
                        </div>

                        <div className='summary-bio'>
                            <h2 className='customer-full-name'>
                                {data.First_Name} {data.Last_Name}
                            </h2>
                            <p className='customer-reg-date'>
                                Registered client since {data.createdAt ? new Date(data.createdAt).getFullYear() : '2024'}
                            </p>
                        </div>

                        <div className='quick-metrics-row'>
                            <div className='quick-metric-item'>
                                <span className='metric-label'>Age</span>
                                <span className='metric-val'>{calculateAge(data.Date_of_Birth)}</span>
                            </div>
                            <div className='metric-divider'></div>
                            <div className='quick-metric-item'>
                                <span className='metric-label'>Gender</span>
                                <span className='metric-val'>{data.Gender || 'N/A'}</span>
                            </div>
                        </div>

                        <div className='summary-actions-block'>
                            <NavLink to={`/customer/update/${data._id}`} className="btn-edit-profile">
                                <Edit3 size={16} />
                                <span>Update Profile</span>
                            </NavLink>
                            {data.Phone_Number && (
                                <a href={`tel:${data.Phone_Number}`} className="btn-quick-contact">
                                    <PhoneCall size={16} />
                                    <span>Direct Call</span>
                                </a>
                            )}
                        </div>

                        <div className='client-id-bar'>
                            <span className='id-label'>Account Reference</span>
                            <span className='id-code'>{data._id}</span>
                        </div>
                    </aside>

                    {/* Right Column: Structured Record Dossier */}
                    <section className='customer-records-col'>
                        <div className='dossier-header-bar'>
                            <div>
                                <h1 className='dossier-heading'>Client Dossier</h1>
                                <p className='dossier-sub'>Confidential customer account and contact file</p>
                            </div>
                        </div>

                        <div className='dossier-grid'>
                            {/* Card 1: Official Identification */}
                            <div className='dossier-card'>
                                <div className='dossier-card-header'>
                                    <CreditCard size={18} className="dossier-header-icon" />
                                    <h3>National Identity</h3>
                                </div>
                                <div className='dossier-data-list'>
                                    <div className='dossier-data-item'>
                                        <span className='data-label'>CNIC Number</span>
                                        <span className='data-value mono'>{formatCNIC(data.CNIC)}</span>
                                    </div>
                                    <div className='dossier-data-item'>
                                        <span className='data-label'>Full Legal Name</span>
                                        <span className='data-value'>{data.First_Name} {data.Last_Name}</span>
                                    </div>
                                    <div className='dossier-data-item'>
                                        <span className='data-label'>Date of Birth</span>
                                        <span className='data-value'>{formatDate(data.Date_of_Birth)}</span>
                                    </div>
                                    <div className='dossier-data-item'>
                                        <span className='data-label'>Age Calculation</span>
                                        <span className='data-value'>{calculateAge(data.Date_of_Birth)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Contact Channels */}
                            <div className='dossier-card'>
                                <div className='dossier-card-header'>
                                    <Phone size={18} className="dossier-header-icon" />
                                    <h3>Contact Channels</h3>
                                </div>
                                <div className='dossier-data-list'>
                                    <div className='dossier-data-item'>
                                        <span className='data-label'>Primary Mobile</span>
                                        <span className='data-value'>
                                            {data.Phone_Number ? (
                                                <a href={`tel:${data.Phone_Number}`} className="data-link">
                                                    {formatPhone(data.Phone_Number)}
                                                </a>
                                            ) : 'Not specified'}
                                        </span>
                                    </div>
                                    <div className='dossier-data-item'>
                                        <span className='data-label'>Telephone / Landline</span>
                                        <span className='data-value'>{data.Telephone || 'N/A'}</span>
                                    </div>
                                    <div className='dossier-data-item'>
                                        <span className='data-label'>Email Address</span>
                                        <span className='data-value'>
                                            {data.Email_Address ? (
                                                <a href={`mailto:${data.Email_Address}`} className="data-link">
                                                    {data.Email_Address}
                                                </a>
                                            ) : 'Not specified'}
                                        </span>
                                    </div>
                                    <div className='dossier-data-item'>
                                        <span className='data-label'>Preferred Channel</span>
                                        <span className='data-value'>{data.Preferred_Contact || 'Phone Call'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: Residential Address */}
                            <div className='dossier-card'>
                                <div className='dossier-card-header'>
                                    <MapPin size={18} className="dossier-header-icon" />
                                    <h3>Address & Residence</h3>
                                </div>
                                <div className='dossier-data-list'>
                                    <div className='dossier-data-item full'>
                                        <span className='data-label'>Street Address</span>
                                        <span className='data-value'>{data.Address || 'No address registered on file'}</span>
                                    </div>
                                    <div className='dossier-data-item'>
                                        <span className='data-label'>Country</span>
                                        <span className='data-value'>{data.Country || 'Pakistan'}</span>
                                    </div>
                                    <div className='dossier-data-item'>
                                        <span className='data-label'>Jurisdiction Status</span>
                                        <span className='data-value'>Domestic Resident</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card 4: Employment & Financial */}
                            <div className='dossier-card'>
                                <div className='dossier-card-header'>
                                    <Briefcase size={18} className="dossier-header-icon" />
                                    <h3>Financial & Profile Details</h3>
                                </div>
                                <div className='dossier-data-list'>
                                    <div className='dossier-data-item'>
                                        <span className='data-label'>Occupation</span>
                                        <span className='data-value'>{data.Occupation || 'Client'}</span>
                                    </div>
                                    <div className='dossier-data-item'>
                                        <span className='data-label'>Income Classification</span>
                                        <span className='data-value'>{data.Income_Level || 'Standard Verified'}</span>
                                    </div>
                                    <div className='dossier-data-item'>
                                        <span className='data-label'>Gender Specification</span>
                                        <span className='data-value'>{data.Gender || 'Unspecified'}</span>
                                    </div>
                                    <div className='dossier-data-item'>
                                        <span className='data-label'>Membership Tier</span>
                                        <span className='data-value badge-tier'>Prime Member</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}