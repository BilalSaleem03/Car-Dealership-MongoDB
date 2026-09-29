import React, { useEffect, useState } from "react"
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import "./CSSFiles/CustomerForm.css"
import "./CSSFiles/FormStyles.css"
import Navbar from "./Homepage/Navbar"
import Footer from "./Homepage/Footer"
import {
    User,
    CreditCard,
    Phone,
    MapPin,
    Calendar,
    ChevronRight,
    CheckCircle2,
    AlertCircle
} from 'lucide-react'

const backendURL = import.meta.env.VITE_BackendURL;

export default function CustomerForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [customerForm, setCustomerForm] = useState({
        customerImage: null,
        firstName: "",
        lastName: "",
        DOB: "",
        gender: "",
        cnic: "",
        phone: "",
        telephone: "",
        email: "",
        address: ""
    });

    useEffect(() => {
        if (id) {
            const fetchPreviousData = async () => {
                try {
                    const res = await axios.get(`${backendURL}/customer/${id}`, { withCredentials: true });
                    const c = res.data;
                    setCustomerForm({
                        customerImage: null,
                        firstName: c.First_Name || "",
                        lastName: c.Last_Name || "",
                        DOB: c.Date_of_Birth ? c.Date_of_Birth.split("T")[0] : "",
                        gender: c.Gender || "",
                        cnic: c.CNIC || "",
                        phone: c.Phone_Number || "",
                        telephone: c.Telephone || "",
                        email: c.Email_Address || "",
                        address: c.Address || ""
                    });
                } catch (err) {
                    console.error("Failed to load customer profile:", err);
                    setErrorMsg("Unable to retrieve customer profile data.");
                }
            };
            fetchPreviousData();
        }
    }, [id]);

    const handleCustomerForm = (event) => {
        const { name, value, files } = event.target;
        if (name === "customerImage") {
            setCustomerForm((prev) => ({
                ...prev,
                customerImage: files[0] || null
            }));
        } else {
            setCustomerForm((prev) => ({
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
        if (customerForm.customerImage) formData.append("customerImage", customerForm.customerImage);
        formData.append("firstName", customerForm.firstName);
        formData.append("lastName", customerForm.lastName);
        formData.append("DOB", customerForm.DOB);
        formData.append("gender", customerForm.gender);
        formData.append("cnic", customerForm.cnic);
        formData.append("phone", customerForm.phone);
        formData.append("telephone", customerForm.telephone);
        formData.append("email", customerForm.email);
        formData.append("address", customerForm.address);

        try {
            if (id) {
                await axios.post(`${backendURL}/customer/update/${id}`, customerForm, {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" }
                });
            } else {
                await axios.post(`${backendURL}/customer/addcustomer`, customerForm, {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }
            navigate('/customer');
        } catch (err) {
            console.error("Error submitting customer data:", err);
            if (err.response?.status === 401) {
                navigate('/login');
            } else {
                setErrorMsg(err.response?.data?.error || "Error saving customer record. Please check the provided information.");
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
                <nav className="one-customer-breadcrumb" aria-label="Breadcrumb">
                    <NavLink to="/">Home</NavLink>
                    <ChevronRight size={14} className="breadcrumb-separator" />
                    <NavLink to="/customer">Customer Directory</NavLink>
                    <ChevronRight size={14} className="breadcrumb-separator" />
                    <span className="breadcrumb-current">
                        {id ? "Edit Customer" : "Register Customer"}
                    </span>
                </nav>

                <div className="form-header-box">
                    <span className="form-header-badge">CRM Client File</span>
                    <h1 className="form-title">{id ? "Update Customer Profile" : "Register New Customer"}</h1>
                    <p className="form-subtitle">Maintain complete client records and contact information.</p>
                </div>

                {errorMsg && (
                    <div className="error-message">
                        <AlertCircle size={18} />
                        <span>{errorMsg}</span>
                    </div>
                )}

                <form className="CustomerForm" onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Section 1: Client Identity */}
                    <div className="form-section-header">
                        <User size={18} className="form-section-icon" />
                        <span>Personal Identity</span>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label htmlFor="customerImage">
                                {id ? "Update Profile Photo" : "Profile Photography"}
                            </label>
                            <input 
                                type="file" 
                                id="customerImage" 
                                accept="image/*" 
                                name="customerImage" 
                                onChange={handleCustomerForm} 
                            />
                            <small className="file-hint">Optional: Formal portrait or photo identification (JPG, PNG)</small>
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
                                onChange={handleCustomerForm} 
                                value={customerForm.firstName} 
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
                                onChange={handleCustomerForm} 
                                value={customerForm.lastName} 
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
                                placeholder="35201-1234567-1 (13 digits)" 
                                name="cnic" 
                                onChange={handleCustomerForm} 
                                value={customerForm.cnic} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="DOB" className="required">Date of Birth</label>
                            <input 
                                type="date" 
                                id="DOB" 
                                name="DOB" 
                                onChange={handleCustomerForm} 
                                value={customerForm.DOB} 
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
                                value={customerForm.gender} 
                                onChange={handleCustomerForm} 
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Section 2: Contact Channels */}
                    <div className="form-section-header">
                        <Phone size={18} className="form-section-icon" />
                        <span>Communication Channels</span>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="phone" className="required">Primary Mobile Number</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                placeholder="+92 300 1234567" 
                                name="phone" 
                                onChange={handleCustomerForm} 
                                value={customerForm.phone} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="telephone">Alternate / Landline Telephone</label>
                            <input 
                                type="tel" 
                                id="telephone" 
                                placeholder="(042) 35789000" 
                                name="telephone" 
                                onChange={handleCustomerForm} 
                                value={customerForm.telephone} 
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label htmlFor="email" className="required">Corporate or Personal Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="client@example.com" 
                                name="email" 
                                onChange={handleCustomerForm} 
                                value={customerForm.email} 
                                required 
                            />
                        </div>
                    </div>

                    {/* Section 3: Physical Residence */}
                    <div className="form-section-header">
                        <MapPin size={18} className="form-section-icon" />
                        <span>Residential & Billing Address</span>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label htmlFor="address" className="required">Full Postal Address</label>
                            <textarea 
                                id="address" 
                                placeholder="House / Suite #, Street address, Sector / Phase, City" 
                                name="address" 
                                rows="3"
                                onChange={handleCustomerForm} 
                                value={customerForm.address} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-actions-wrap">
                        <button type="submit" disabled={submitting}>
                            <CheckCircle2 size={18} />
                            <span>{submitting ? "Saving Client..." : id ? "Update Client Profile" : "Register Customer in Database"}</span>
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    )
}