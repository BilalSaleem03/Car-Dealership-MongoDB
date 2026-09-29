import React, { useState } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import './CSSFiles/BuyCar.css'
import './CSSFiles/FormStyles.css'
import contractSvg from './assets/icons/contract.svg'
import Navbar from "./Homepage/Navbar"
import Footer from "./Homepage/Footer"
import {
    ShoppingBag,
    CreditCard,
    DollarSign,
    Calendar,
    ChevronRight,
    CheckCircle2,
    AlertCircle,
    User,
    Car
} from 'lucide-react'

const backendURL = import.meta.env.VITE_BackendURL;

export default function BuyCar() {
    let { id } = useParams();
    id = id ? id.replace(":", "") : "";
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);
    const [notOwner, setNotOwner] = useState(false);
    const [incorrectDataVariable, setIncorrectDataVariable] = useState(false);
    const [incorrectData, setIncorrectData] = useState("");

    const [salesForm, setSalesForm] = useState({
        car_ID: id,
        customer_cnic: "",
        salesperson_cnic: "",
        payment_method: "",
        asked_amount: "",
        given_amount: "",
        sales_date: new Date().toISOString().split("T")[0]
    });

    const handleSalesForm = (event) => {
        const { name, value } = event.target;
        setSalesForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setNotOwner(false);
        setIncorrectDataVariable(false);

        try {
            await axios.post(`${backendURL}/addsales/${id}`, salesForm, { withCredentials: true });
            navigate('/');
        } catch (error) {
            if (error.response?.status === 401) {
                navigate('/login');
            } else if (error.response?.status === 403) {
                setNotOwner(true);
            } else if (error.response?.status === 404) {
                setIncorrectDataVariable(true);
                setIncorrectData(error.response?.data?.error || "Invalid sale details entered.");
            } else {
                console.error('Error submitting sales transaction:', error);
                setIncorrectDataVariable(true);
                setIncorrectData("An unexpected error occurred while processing transaction.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='FormPage'>
            <Navbar />

            <div className="form-page-container">
                {/* Breadcrumbs */}
                <nav className="one-car-breadcrumb" aria-label="Breadcrumb">
                    <NavLink to="/">Home</NavLink>
                    <ChevronRight size={14} className="breadcrumb-separator" />
                    <NavLink to="/explore">Inventory</NavLink>
                    <ChevronRight size={14} className="breadcrumb-separator" />
                    <span className="breadcrumb-current">Execute Acquisition</span>
                </nav>

                <div className="form-header-box">
                    <span className="form-header-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                        <img src={contractSvg} alt="Contract" style={{ width: '14px', height: '14px' }} />
                        <span>Dealership Transaction</span>
                    </span>
                    <h1 className="form-title">Vehicle Sales Contract</h1>
                    <p className="form-subtitle">Finalize client acquisition, contract verification, and payment settlement.</p>
                </div>

                {notOwner && (
                    <div className="error-message">
                        <AlertCircle size={18} />
                        <span>Authorization error: You do not possess seller administrative privileges for this vehicle.</span>
                    </div>
                )}

                {incorrectDataVariable && (
                    <div className="error-message">
                        <AlertCircle size={18} />
                        <span>{incorrectData}</span>
                    </div>
                )}

                <form className="SalesForm" onSubmit={handleSubmit}>
                    {/* Section 1: Transaction Identification */}
                    <div className="form-section-header">
                        <Car size={18} className="form-section-icon" />
                        <span>Inventory Reference & Contracting Parties</span>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label htmlFor="car_ID" className="required">Vehicle Inventory ID</label>
                            <input 
                                type="text" 
                                id="car_ID" 
                                name="car_ID" 
                                value={salesForm.car_ID} 
                                readOnly
                                disabled
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="customer_cnic" className="required">Purchaser National CNIC</label>
                            <input 
                                type="number" 
                                id="customer_cnic" 
                                placeholder="Registered customer CNIC (13 digits)" 
                                name="customer_cnic" 
                                onChange={handleSalesForm} 
                                value={salesForm.customer_cnic} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="salesperson_cnic" className="required">Sales Representative CNIC</label>
                            <input 
                                type="number" 
                                id="salesperson_cnic" 
                                placeholder="Authorized staff CNIC" 
                                name="salesperson_cnic" 
                                onChange={handleSalesForm} 
                                value={salesForm.salesperson_cnic} 
                                required 
                            />
                        </div>
                    </div>

                    {/* Section 2: Financial Terms */}
                    <div className="form-section-header">
                        <DollarSign size={18} className="form-section-icon" />
                        <span>Financial Consideration & Settlement</span>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="asked_amount" className="required">Contract Agreed Price (PKR)</label>
                            <input 
                                type="number" 
                                id="asked_amount" 
                                placeholder="Listing or agreed asking price" 
                                name="asked_amount" 
                                onChange={handleSalesForm} 
                                value={salesForm.asked_amount} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="given_amount" className="required">Settled / Tendered Amount (PKR)</label>
                            <input 
                                type="number" 
                                id="given_amount" 
                                placeholder="Amount received from purchaser" 
                                name="given_amount" 
                                onChange={handleSalesForm} 
                                value={salesForm.given_amount} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="payment_method" className="required">Settlement Instrument</label>
                            <select 
                                name="payment_method" 
                                id="payment_method" 
                                value={salesForm.payment_method} 
                                onChange={handleSalesForm} 
                                required
                            >
                                <option value="">Select Payment Instrument</option>
                                <option value="Bank Transfer">Direct Wire / Online Bank Transfer</option>
                                <option value="Card">Credit / Debit Card Terminal</option>
                                <option value="Check">Certified Pay Order / Banker's Cheque</option>
                                <option value="Cash">Cash Settlement</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="sales_date" className="required">Transaction Execution Date</label>
                            <input 
                                type="date" 
                                id="sales_date" 
                                name="sales_date" 
                                onChange={handleSalesForm} 
                                value={salesForm.sales_date} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-actions-wrap">
                        <button type="submit" disabled={submitting}>
                            <CheckCircle2 size={18} />
                            <span>{submitting ? "Processing Settlement..." : "Complete & Finalize Vehicle Sale"}</span>
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    )
}