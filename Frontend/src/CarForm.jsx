import React, { useEffect, useState } from "react"
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import "./CSSFiles/CarForm.css"
import "./CSSFiles/FormStyles.css"
import Navbar from "./Homepage/Navbar"
import Footer from "./Homepage/Footer"
import {
    Car,
    FileText,
    Wrench,
    DollarSign,
    Upload,
    ArrowLeft,
    ChevronRight,
    CheckCircle2,
    AlertCircle
} from 'lucide-react'

const backendURL = import.meta.env.VITE_BackendURL;

export default function CarForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [carForm, setCarForm] = useState({
        carImage: null,
        manufacturer: "",
        carName: "",
        model: new Date().getFullYear(),
        color: "",
        engineType: "",
        engineNumber: "",
        mileage: "",
        carType: "",
        accidental: "false",
        price: "",
        availability: "true"
    });

    useEffect(() => {
        if (id) {
            const fetchPreviousData = async () => {
                try {
                    const res = await axios.get(`${backendURL}/car/${id}`, { withCredentials: true });
                    const car = res.data;
                    setCarForm({
                        carImage: null,
                        manufacturer: car.Manufacturer || "",
                        carName: car.Car_Name || "",
                        model: car.Model_Number || new Date().getFullYear(),
                        color: car.Color || "",
                        engineType: car.Engine_Type || "",
                        engineNumber: car.Engine_Number || "",
                        mileage: car.Mileage || "",
                        carType: car.Car_Type || "",
                        accidental: car.Accidental ? "true" : "false",
                        price: car.Price || "",
                        availability: car.Availability ? "true" : "false"
                    });
                } catch (err) {
                    console.error("Failed to load vehicle data:", err);
                    setErrorMsg("Unable to retrieve vehicle listing information.");
                }
            };
            fetchPreviousData();
        }
    }, [id]);

    const handleCarForm = (event) => {
        const { name, value, files } = event.target;
        if (name === "carImage") {
            setCarForm((prev) => ({
                ...prev,
                carImage: files[0] || null
            }));
        } else {
            setCarForm((prev) => ({
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
        if (carForm.carImage) formData.append("carImage", carForm.carImage);
        formData.append("manufacturer", carForm.manufacturer);
        formData.append("carName", carForm.carName);
        formData.append("model", carForm.model);
        formData.append("color", carForm.color);
        formData.append("engineType", carForm.engineType);
        formData.append("engineNumber", carForm.engineNumber);
        formData.append("mileage", carForm.mileage);
        formData.append("carType", carForm.carType);
        formData.append("accidental", carForm.accidental);
        formData.append("price", carForm.price);
        formData.append("availability", carForm.availability);

        try {
            if (id) {
                await axios.post(`${backendURL}/car/update/${id}`, carForm, {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" }
                });
            } else {
                await axios.post(`${backendURL}/car/addcar`, carForm, {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }
            navigate('/explore');
        } catch (err) {
            console.error("Error submitting vehicle listing:", err);
            if (err.response?.status === 401) {
                navigate('/login');
            } else if (err.response?.status === 403) {
                setErrorMsg("Authorization denied: Only the listing owner may perform edits.");
            } else {
                setErrorMsg(err.response?.data?.error || "Error saving vehicle record. Please verify all fields.");
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
                <nav className="one-car-breadcrumb" aria-label="Breadcrumb">
                    <NavLink to="/">Home</NavLink>
                    <ChevronRight size={14} className="breadcrumb-separator" />
                    <NavLink to="/explore">Inventory</NavLink>
                    <ChevronRight size={14} className="breadcrumb-separator" />
                    <span className="breadcrumb-current">
                        {id ? "Edit Vehicle" : "Register Vehicle"}
                    </span>
                </nav>

                <div className="form-header-box">
                    <span className="form-header-badge">Inventory Management</span>
                    <h1 className="form-title">{id ? "Update Vehicle Listing" : "Register New Vehicle"}</h1>
                    <p className="form-subtitle">Complete the verified dealership specification sheet below.</p>
                </div>

                {errorMsg && (
                    <div className="error-message">
                        <AlertCircle size={18} />
                        <span>{errorMsg}</span>
                    </div>
                )}

                <form className="CarForm" onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Section 1: Vehicle Identity */}
                    <div className="form-section-header">
                        <Car size={18} className="form-section-icon" />
                        <span>Vehicle Identification</span>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label htmlFor="carImage">
                                {id ? "Update Vehicle Cover Image" : "Vehicle Photography"}
                            </label>
                            <input 
                                type="file" 
                                id="carImage" 
                                accept="image/*" 
                                name="carImage" 
                                onChange={handleCarForm} 
                            />
                            <small className="file-hint">Upload high-resolution vehicle photo (JPG, PNG, WebP up to 5MB)</small>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="manufacturer" className="required">Manufacturer</label>
                            <select 
                                name="manufacturer" 
                                id="manufacturer" 
                                value={carForm.manufacturer} 
                                onChange={handleCarForm} 
                                required
                            >
                                <option value="">Select Manufacturer</option>
                                <option value="Toyota">Toyota</option>
                                <option value="Honda">Honda</option>
                                <option value="Suzuki">Suzuki</option>
                                <option value="BMW">BMW</option>
                                <option value="Mercedes">Mercedes-Benz</option>
                                <option value="Audi">Audi</option>
                                <option value="Kia">Kia</option>
                                <option value="Hyundai">Hyundai</option>
                                <option value="Changan">Changan</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="carName" className="required">Model / Variant Name</label>
                            <input 
                                type="text" 
                                id="carName" 
                                placeholder="e.g., Civic Oriel, Corolla Altis, Land Cruiser" 
                                name="carName" 
                                onChange={handleCarForm} 
                                value={carForm.carName} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="model" className="required">Model Production Year</label>
                            <select 
                                name="model" 
                                id="model" 
                                value={carForm.model} 
                                onChange={handleCarForm} 
                                required
                            >
                                <option value="">Select Year</option>
                                {Array.from({ length: 30 }, (_, i) => {
                                    const year = new Date().getFullYear() + 1 - i;
                                    return <option key={year} value={year}>{year}</option>
                                })}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="carType" className="required">Body Classification</label>
                            <select 
                                name="carType" 
                                id="carType" 
                                value={carForm.carType} 
                                onChange={handleCarForm} 
                                required
                            >
                                <option value="">Select Body Style</option>
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Hatchback">Hatchback</option>
                                <option value="Crossover">Crossover</option>
                                <option value="Mini">Mini</option>
                                <option value="Van">Van / MPV</option>
                                <option value="Pickup">Pickup Truck</option>
                            </select>
                        </div>
                    </div>

                    {/* Section 2: Technical Specs */}
                    <div className="form-section-header">
                        <Wrench size={18} className="form-section-icon" />
                        <span>Powertrain & Mechanical Specifications</span>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="engineNumber" className="required">Engine Serial Number</label>
                            <input 
                                type="text" 
                                id="engineNumber" 
                                placeholder="Official engine serial code" 
                                name="engineNumber" 
                                onChange={handleCarForm} 
                                value={carForm.engineNumber} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="engineType" className="required">Powertrain / Fuel Type</label>
                            <select 
                                name="engineType" 
                                id="engineType" 
                                value={carForm.engineType} 
                                onChange={handleCarForm} 
                                required
                            >
                                <option value="">Select Fuel & Engine</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Electric">Electric (EV)</option>
                                <option value="CNG">CNG</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="color" className="required">Exterior Finish</label>
                            <select 
                                name="color" 
                                id="color" 
                                value={carForm.color} 
                                onChange={handleCarForm} 
                                required
                            >
                                <option value="">Select Color</option>
                                <option value="White">White / Pearl White</option>
                                <option value="Black">Black / Metallic Black</option>
                                <option value="Silver">Silver / Metallic Silver</option>
                                <option value="Gray">Gray / Graphite</option>
                                <option value="Blue">Blue / Navy</option>
                                <option value="Red">Red / Maroon</option>
                                <option value="Other">Other Color</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="mileage" className="required">Current Mileage (km)</label>
                            <input 
                                type="number" 
                                id="mileage" 
                                placeholder="e.g., 45000" 
                                name="mileage" 
                                onChange={handleCarForm} 
                                value={carForm.mileage} 
                                required 
                            />
                        </div>
                    </div>

                    {/* Section 3: Financials & History */}
                    <div className="form-section-header">
                        <DollarSign size={18} className="form-section-icon" />
                        <span>Pricing & Vehicle History</span>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="price" className="required">Listing Price (PKR)</label>
                            <input 
                                type="number" 
                                id="price" 
                                placeholder="Price in PKR" 
                                name="price" 
                                onChange={handleCarForm} 
                                value={carForm.price} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label className="required">Accidental Damage Record</label>
                            <div className="radio-group">
                                <label className="radio-option">
                                    <input 
                                        type="radio" 
                                        name="accidental" 
                                        value="false" 
                                        onChange={handleCarForm} 
                                        checked={carForm.accidental === "false"}
                                    />
                                    <span>Clean / Non-Accidental</span>
                                </label>
                                <label className="radio-option">
                                    <input 
                                        type="radio" 
                                        name="accidental" 
                                        value="true" 
                                        onChange={handleCarForm} 
                                        checked={carForm.accidental === "true"}
                                    />
                                    <span>Accidental History</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions-wrap">
                        <button type="submit" disabled={submitting}>
                            <CheckCircle2 size={18} />
                            <span>{submitting ? "Saving Listing..." : id ? "Update Vehicle Record" : "Register Vehicle in Inventory"}</span>
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    )
}