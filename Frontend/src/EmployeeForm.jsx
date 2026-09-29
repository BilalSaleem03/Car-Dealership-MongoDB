import React, { useEffect, useState } from "react"
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import "./CSSFiles/EmployeeForm.css"
import "./CSSFiles/FormStyles.css"
import Navbar from "./Homepage/Navbar"
import Footer from "./Homepage/Footer"
import {
    User,
    CreditCard,
    Phone,
    MapPin,
    Briefcase,
    DollarSign,
    Percent,
    Calendar,
    ChevronRight,
    CheckCircle2,
    AlertCircle
} from 'lucide-react'

const backendURL = import.meta.env.VITE_BackendURL;

export default function EmployeeForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [employeeForm, setEmployeeForm] = useState({
        employeeImage: null,
        firstName: "",
        lastName: "",
        cnic: "",
        gender: "",
        DOB: "",
        phone: "",
        telephone: "",
        email: "",
        address: "",
        hireDate: "",
        designation: "",
        salary: "",
        commissionRate: 0
    });

    useEffect(() => {
        if (id) {
            const fetchPreviousData = async () => {
                try {
                    const res = await axios.get(`${backendURL}/aboutus/${id}`, { withCredentials: true });
                    const emp = res.data;
                    setEmployeeForm({
                        employeeImage: null,
                        firstName: emp.First_Name || "",
                        lastName: emp.Last_Name || "",
                        cnic: emp.CNIC || "",
                        gender: emp.Gender || "",
                        DOB: emp.Date_of_Birth ? emp.Date_of_Birth.split("T")[0] : "",
                        phone: emp.Phone_Number || "",
                        telephone: emp.Telephone || "",
                        email: emp.Email_Address || "",
                        address: emp.Address || "",
                        hireDate: emp.Hire_Date ? emp.Hire_Date.split("T")[0] : "",
                        designation: emp.Designation || "",
                        salary: emp.Salary || "",
                        commissionRate: emp.Commission_Rate || 0
                    });
                } catch (err) {
                    console.error("Failed to load employee record:", err);
                    setErrorMsg("Unable to retrieve staff record.");
                }
            };
            fetchPreviousData();
        }
    }, [id]);

    const handleEmployeeForm = (event) => {
        const { name, value, files } = event.target;
        if (name === "employeeImage") {
            setEmployeeForm((prev) => ({
                ...prev,
                employeeImage: files[0] || null
            }));
        } else {
            setEmployeeForm((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setErrorMsg("");

        const formData = new FormData();
        if (employeeForm.employeeImage) formData.append("employeeImage", employeeForm.employeeImage);
        formData.append("firstName", employeeForm.firstName);
        formData.append("lastName", employeeForm.lastName);
        formData.append("cnic", employeeForm.cnic);
        formData.append("gender", employeeForm.gender);
        formData.append("DOB", employeeForm.DOB);
        formData.append("phone", employeeForm.phone);
        formData.append("telephone", employeeForm.telephone);
        formData.append("email", employeeForm.email);
        formData.append("address", employeeForm.address);
        formData.append("hireDate", employeeForm.hireDate);
        formData.append("designation", employeeForm.designation);
        formData.append("salary", employeeForm.salary);
        formData.append("commissionRate", employeeForm.commissionRate);

        try {
            if (id) {
                await axios.post(`${backendURL}/aboutus/update/${id}`, employeeForm, {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" }
                });
            } else {
                await axios.post(`${backendURL}/aboutus/addemployee`, employeeForm, {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }
            navigate('/aboutus');
        } catch (err) {
            console.error("Error submitting employee data:", err);
            if (err.response?.status === 401) {
                navigate('/login');
            } else {
                setErrorMsg(err.response?.data?.error || "Error saving employee record. Please verify entries.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="FormPage">
            <Navbar />

            <div className="form-page-container">
                {/* Breadcrumbs */}
                <nav className="one-employee-breadcrumb" aria-label="Breadcrumb">
                    <NavLink to="/">Home</NavLink>
                    <ChevronRight size={14} className="breadcrumb-separator" />
                    <NavLink to="/aboutus">Leadership & Team</NavLink>
                    <ChevronRight size={14} className="breadcrumb-separator" />
                    <span className="breadcrumb-current">
                        {id ? "Edit Staff Record" : "Enroll Personnel"}
                    </span>
                </nav>

                <div className="form-header-box">
                    <span className="form-header-badge">Human Resources</span>
                    <h1 className="form-title">{id ? "Update Staff Profile" : "Register New Team Member"}</h1>
                    <p className="form-subtitle">Maintain corporate credentials, roles, and compensation structure.</p>
                </div>

                {errorMsg && (
                    <div className="error-message">
                        <AlertCircle size={18} />
                        <span>{errorMsg}</span>
                    </div>
                )}

                <form className="EmployeeForm" onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Section 1: Staff Identity */}
                    <div className="form-section-header">
                        <User size={18} className="form-section-icon" />
                        <span>Personnel Identification</span>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label htmlFor="employeeImage">
                                {id ? "Update Headshot Photo" : "Official Staff Photography"}
                            </label>
                            <input 
                                type="file" 
                                id="employeeImage" 
                                accept="image/*" 
                                name="employeeImage" 
                                onChange={handleEmployeeForm} 
                            />
                            <small className="file-hint">Corporate portrait or official ID photo (JPG, PNG)</small>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName" className="required">First Name</label>
                            <input 
                                type="text" 
                                id="firstName" 
                                placeholder="Enter first name" 
                                name="firstName" 
                                onChange={handleEmployeeForm} 
                                value={employeeForm.firstName} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName" className="required">Last Name</label>
                            <input 
                                type="text" 
                                id="lastName" 
                                placeholder="Enter last name" 
                                name="lastName" 
                                onChange={handleEmployeeForm} 
                                value={employeeForm.lastName} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="cnic" className="required">National Identity (CNIC)</label>
                            <input 
                                type="text" 
                                id="cnic" 
                                placeholder="00000-0000000-0" 
                                name="cnic" 
                                onChange={handleEmployeeForm} 
                                value={employeeForm.cnic} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="DOB" className="required">Date of Birth</label>
                            <input 
                                type="date" 
                                id="DOB" 
                                name="DOB" 
                                onChange={handleEmployeeForm} 
                                value={employeeForm.DOB} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="gender" className="required">Gender</label>
                            <select 
                                name="gender" 
                                id="gender" 
                                value={employeeForm.gender} 
                                onChange={handleEmployeeForm} 
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Section 2: Role & Employment */}
                    <div className="form-section-header">
                        <Briefcase size={18} className="form-section-icon" />
                        <span>Designation & Contract Terms</span>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="designation" className="required">Official Designation / Title</label>
                            <input 
                                type="text" 
                                id="designation" 
                                placeholder="e.g., General Manager, Senior Sales Executive" 
                                name="designation" 
                                onChange={handleEmployeeForm} 
                                value={employeeForm.designation} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="hireDate" className="required">Commencement Date</label>
                            <input 
                                type="date" 
                                id="hireDate" 
                                name="hireDate" 
                                onChange={handleEmployeeForm} 
                                value={employeeForm.hireDate} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="salary" className="required">Monthly Base Salary (PKR)</label>
                            <input 
                                type="number" 
                                id="salary" 
                                placeholder="Monthly base compensation" 
                                name="salary" 
                                onChange={handleEmployeeForm} 
                                value={employeeForm.salary} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="commissionRate" className="required">Commission Percentage (%)</label>
                            <input 
                                type="number" 
                                id="commissionRate" 
                                placeholder="e.g., 2.5" 
                                name="commissionRate" 
                                step="0.1"
                                onChange={handleEmployeeForm} 
                                value={employeeForm.commissionRate} 
                                required 
                            />
                        </div>
                    </div>

                    {/* Section 3: Contact & Address */}
                    <div className="form-section-header">
                        <Phone size={18} className="form-section-icon" />
                        <span>Corporate Communications & Address</span>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="phone" className="required">Primary Mobile Number</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                placeholder="+92 300 1234567" 
                                name="phone" 
                                onChange={handleEmployeeForm} 
                                value={employeeForm.phone} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="telephone">Office Extension / Landline</label>
                            <input 
                                type="tel" 
                                id="telephone" 
                                placeholder="Extension or phone" 
                                name="telephone" 
                                onChange={handleEmployeeForm} 
                                value={employeeForm.telephone} 
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label htmlFor="email" className="required">Corporate Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="staff@prestigecars.com" 
                                name="email" 
                                onChange={handleEmployeeForm} 
                                value={employeeForm.email} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label htmlFor="address" className="required">Residential Address</label>
                            <textarea 
                                id="address" 
                                placeholder="Permanent residence address" 
                                name="address" 
                                rows="3"
                                onChange={handleEmployeeForm} 
                                value={employeeForm.address} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-actions-wrap">
                        <button type="submit" disabled={submitting}>
                            <CheckCircle2 size={18} />
                            <span>{submitting ? "Saving Record..." : id ? "Update Personnel Record" : "Enroll Staff Member"}</span>
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    )
}