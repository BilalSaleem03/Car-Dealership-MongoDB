import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import personImage from './assets/human_image.jpeg'
import './CSSFiles/OneEmployee.css'
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'
import {
    User,
    Mail,
    Phone,
    Briefcase,
    Calendar,
    Award,
    DollarSign,
    Percent,
    Edit3,
    ChevronRight,
    ArrowLeft,
    AlertCircle,
    Building2,
    ShieldCheck
} from 'lucide-react'

const backendURL = import.meta.env.VITE_BackendURL;

export default function OneEmployee() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${backendURL}/aboutus/${id}`, {
                withCredentials: true
            })
            setData(response.data)
            setError(null)
        } catch (err) {
            console.error('Error fetching employee data:', err)
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
        const str = String(phone)
        return str.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    }

    if (loading) {
        return (
            <div className='one-employee-container'>
                <Navbar />
                <div className='one-employee-loading-state'>
                    <div className="one-employee-spinner"></div>
                    <h2>Loading Staff Profile</h2>
                    <p>Accessing verified personnel directory...</p>
                </div>
                <Footer />
            </div>
        )
    }

    if (error) {
        return (
            <div className='one-employee-container'>
                <Navbar />
                <div className='one-employee-error-state'>
                    <div className="error-icon-box">
                        <AlertCircle size={36} />
                    </div>
                    <h2>Staff Profile Unavailable</h2>
                    <p>{error}</p>
                    <button className="btn-back-team" onClick={() => navigate('/aboutus')}>
                        <ArrowLeft size={16} />
                        <span>Return to Team Directory</span>
                    </button>
                </div>
                <Footer />
            </div>
        )
    }

    const isManager = data.Designation?.toLowerCase().includes('manager')

    return (
        <div className='one-employee-container'>
            <Navbar />
            
            <main className='one-employee-main'>
                {/* Clean Breadcrumb */}
                <nav className='one-employee-breadcrumb' aria-label="Breadcrumb">
                    <NavLink to="/">Home</NavLink>
                    <ChevronRight size={14} className="breadcrumb-separator" />
                    <NavLink to="/aboutus">Leadership & Team</NavLink>
                    <ChevronRight size={14} className="breadcrumb-separator" />
                    <span className="breadcrumb-current">
                        {data.First_Name} {data.Last_Name}
                    </span>
                </nav>

                <div className='one-employee-layout'>
                    {/* Left Column: Personnel Identity Summary */}
                    <aside className='employee-summary-card'>
                        <div className='employee-avatar-frame'>
                            <img 
                                src={data.Image?.url || personImage} 
                                alt={`${data.First_Name} ${data.Last_Name}`}
                                className='employee-avatar-img'
                                onError={(e) => {
                                    e.target.src = personImage
                                }}
                            />
                            <div className={`staff-role-badge ${isManager ? 'role-manager' : 'role-staff'}`}>
                                <Award size={14} />
                                <span>{data.Designation || 'Team Member'}</span>
                            </div>
                        </div>

                        <div className='employee-bio-block'>
                            <h2 className='employee-full-name'>
                                {data.First_Name} {data.Last_Name}
                            </h2>
                            <p className='employee-department-label'>
                                Prestige Motors Staff
                            </p>
                        </div>

                        <div className='employee-contact-stack'>
                            <div className='contact-item'>
                                <Mail size={16} className="contact-icon" />
                                <span>{data.Email_Address || 'N/A'}</span>
                            </div>
                            <div className='contact-item'>
                                <Phone size={16} className="contact-icon" />
                                <span>{formatPhone(data.Phone_Number)}</span>
                            </div>
                            <div className='contact-item'>
                                <Calendar size={16} className="contact-icon" />
                                <span>Joined {formatDate(data.Hire_Date)}</span>
                            </div>
                        </div>

                        <div className='employee-actions-row'>
                            <NavLink to={`/employee/update/${data._id}`} className="btn-edit-employee">
                                <Edit3 size={16} />
                                <span>Update Profile</span>
                            </NavLink>
                        </div>
                    </aside>

                    {/* Right Column: Structured Staff Dossier */}
                    <section className='employee-records-col'>
                        <div className='staff-header-banner'>
                            <div>
                                <h1 className='staff-heading'>Personnel Dossier</h1>
                                <p className='staff-sub'>Official dealership employee record and employment credentials</p>
                            </div>
                        </div>

                        <div className='staff-grid'>
                            {/* Card 1: Personal Details */}
                            <div className='staff-card'>
                                <div className='staff-card-header'>
                                    <User size={18} className="staff-header-icon" />
                                    <h3>Personal Information</h3>
                                </div>
                                <div className='staff-data-list'>
                                    <div className='staff-data-item'>
                                        <span className='data-label'>Gender</span>
                                        <span className='data-value'>{data.Gender || 'N/A'}</span>
                                    </div>
                                    <div className='staff-data-item'>
                                        <span className='data-label'>Date of Birth</span>
                                        <span className='data-value'>{formatDate(data.Date_of_Birth)}</span>
                                    </div>
                                    <div className='staff-data-item'>
                                        <span className='data-label'>Address</span>
                                        <span className='data-value'>{data.Address || 'Official dealership location'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Employment Status */}
                            <div className='staff-card'>
                                <div className='staff-card-header'>
                                    <Building2 size={18} className="staff-header-icon" />
                                    <h3>Employment Details</h3>
                                </div>
                                <div className='staff-data-list'>
                                    <div className='staff-data-item'>
                                        <span className='data-label'>Current Designation</span>
                                        <span className='data-value'>{data.Designation || 'Specialist'}</span>
                                    </div>
                                    <div className='staff-data-item'>
                                        <span className='data-label'>Hire Date</span>
                                        <span className='data-value'>{formatDate(data.Hire_Date)}</span>
                                    </div>
                                    <div className='staff-data-item'>
                                        <span className='data-label'>Tenure</span>
                                        <span className='data-value'>
                                            {data.Hire_Date ? 
                                                `${Math.max(1, Math.floor((new Date() - new Date(data.Hire_Date)) / (365 * 24 * 60 * 60 * 1000)))} year(s) with firm` 
                                                : 'Active'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: Compensation Package */}
                            <div className='staff-card'>
                                <div className='staff-card-header'>
                                    <DollarSign size={18} className="staff-header-icon" />
                                    <h3>Compensation & Commission</h3>
                                </div>
                                <div className='staff-data-list'>
                                    <div className='staff-data-item'>
                                        <span className='data-label'>Monthly Base Salary</span>
                                        <span className='data-value'>PKR {data.Salary?.toLocaleString() || '0'} / mo</span>
                                    </div>
                                    <div className='staff-data-item'>
                                        <span className='data-label'>Annualized Package</span>
                                        <span className='data-value'>PKR {(data.Salary * 12)?.toLocaleString() || '0'} / yr</span>
                                    </div>
                                    <div className='staff-data-item'>
                                        <span className='data-label'>Sales Commission Rate</span>
                                        <span className='data-value'>{data.Commission_Rate || '0'}%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card 4: Contact Reach */}
                            <div className='staff-card'>
                                <div className='staff-card-header'>
                                    <Phone size={18} className="staff-header-icon" />
                                    <h3>Direct Communications</h3>
                                </div>
                                <div className='staff-data-list'>
                                    <div className='staff-data-item'>
                                        <span className='data-label'>Direct Line</span>
                                        <span className='data-value'>
                                            {data.Phone_Number ? (
                                                <a href={`tel:${data.Phone_Number}`} className="data-link">
                                                    {formatPhone(data.Phone_Number)}
                                                </a>
                                            ) : 'N/A'}
                                        </span>
                                    </div>
                                    <div className='staff-data-item'>
                                        <span className='data-label'>Internal Telephone</span>
                                        <span className='data-value'>{data.Telephone || 'Extension active'}</span>
                                    </div>
                                    <div className='staff-data-item'>
                                        <span className='data-label'>Corporate Email</span>
                                        <span className='data-value'>
                                            {data.Email_Address ? (
                                                <a href={`mailto:${data.Email_Address}`} className="data-link">
                                                    {data.Email_Address}
                                                </a>
                                            ) : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Card */}
                        <div className='staff-action-box'>
                            <div className='staff-action-text'>
                                <h4>Direct Dealership Communication</h4>
                                <p>Inquiries, vehicle consultations, and official appointments with {data.First_Name}.</p>
                            </div>
                            <div className='staff-action-buttons'>
                                {data.Email_Address && (
                                    <a href={`mailto:${data.Email_Address}`} className="btn-contact-email">
                                        <Mail size={16} />
                                        <span>Send Email</span>
                                    </a>
                                )}
                                {data.Phone_Number && (
                                    <a href={`tel:${data.Phone_Number}`} className="btn-contact-call">
                                        <Phone size={16} />
                                        <span>Call Extension</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}