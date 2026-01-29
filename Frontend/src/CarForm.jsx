// import {useEffect , useState } from "react"
// import {useParams , useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';
// import "./CSSFiles/CarForm.css"
// import logo from "./assets/logo.png"
// import Navbar from "./Homepage/Navbar"


// export default function CarForm(){
//     let [carForm , setCarForm] = useState({
//         carImage:null,
//         manufacturer:"",
//         carName:"",
//         model:2024,
//         color:"",
//         engineType:"",    
//         engineNumber:"",    
//         milage:1000,
//         carType:"",          
//         accidental:false,     
//         price:10000,
//         availability:true
//     })
//     const navigate = useNavigate();

//     let {id} = useParams();

//     let setPreviousData = ()=>{
//         let showPreviousData = async (id)=>{
//             let previousData = await axios.get(`http://localhost:3000/car/${id}` , {withCredentials : true});  
//             setCarForm({
//                 carImage:null,
//                 manufacturer : previousData.data.Manufacturer,
//                 carName : previousData.data.Car_Name,
//                 model : previousData.data.Model_Number,
//                 color : previousData.data.Color,
//                 engineType : previousData.data.Engine_Type,    
//                 engineNumber : previousData.data.Engine_Number,    
//                 milage : previousData.data.Mileage,
//                 carType : previousData.data.Car_Type,          
//                 accidental : previousData.data.Accidental,     
//                 price : previousData.data.Price,
//                 availability : true
//             })
    
//         }
//         if(id){
//             showPreviousData(id);
//         }
//     }   
//     useEffect(()=>{
//         setPreviousData();
//     } , [])


//     let handleCarForm = (event)=>{
//         let field = event.target.name;
//         let newValue;
//         if (field === "carImage") {
//             setCarForm((preValues) => ({
//                 ...preValues,
//                 [field]: event.target.files[0], // Store the file object
//             }));
//         } else {
//             if(field === "accidental"){
//             newValue = event.target.value === "true" ? true : event.target.value === "false" ? false : event.target.value;
//             }else{

//                 newValue = event.target.value;
//             }
//             carForm[field] = newValue;
//             setCarForm((currValues)=>{
//                 return({...currValues , [field]:newValue})
//             })
//         }
//     }
//     let handleSubmit =async (event)=>{
//         event.preventDefault();
//         console.log(carForm);
//         const formData = new FormData();
//         formData.append("carImage", carForm.carImage); // Append image file
//         formData.append("manufacturer", carForm.manufacturer);
//         formData.append("carName", carForm.carName);
//         formData.append("model", carForm.model);
//         formData.append("color", carForm.color);
//         formData.append("engineType", carForm.engineType);
//         formData.append("engineNumber", carForm.engineNumber);
//         formData.append("mileage", carForm.mileage);
//         formData.append("carType", carForm.carType);
//         formData.append("accidental", carForm.accidental);
//         formData.append("price", carForm.price);
//         formData.append("availability", carForm.availability);

//         setCarForm({
//             carImage: null,
//             manufacturer: "",
//             carName: "",
//             model: 2024,
//             color: "",
//             engineType: "",   
//             engineNumber: "",   
//             mileage: 1000,
//             carType: "",            
//             accidental: false,     
//             price: 10000,
//             availability: true
//         });
//         console.log(carForm);
//         //updating
//         if(id){
//             try {
//                 let respose = await axios.post(`http://localhost:3000/car/update/${id}`, carForm , {withCredentials : true ,headers: { "Content-Type": "multipart/form-data" }})
//                 navigate('/explore')
//             } catch (error) {
//                 console.log(error)
//                 if(error.response.status == 401){
//                     navigate('/login')
//                 }else if(error.response.status == 403){
//                     navigate(`/category/car/${id}`)
//                 } else{
//                     console.log("some other error3")
//                 }

//             }
//             return;
//         }
//         //new Addition
//         try {
//             // Send form data to the backend
//             const response = await axios.post('http://localhost:3000/car/addcar', carForm , {withCredentials : true ,headers: { "Content-Type": "multipart/form-data" }});
//             navigate('/explore')
//         }
//         catch (error) {
//             console.error('Error submitting data:', error);
//             if(error.response.status == 401){
//                 navigate('/login')
//             } else{
//                 console.log("some other error")
//                 console.log(error)
//             }
//         }
//     }


//     return(
//         <div className="FormPage">
//             <Navbar/>
            
//             <h3>Car Registration Form</h3>

//             <form action="" className="CarForm" onSubmit={handleSubmit} encType="multipart/form-data">
//                 <div className="primaryInfo">
//                     <label htmlFor="EngineNumber">Enter Engine Number</label> 
//                     <input type="text" id="EngineNumber" placeholder="Engine # " name="engineNumber" onChange={handleCarForm} value={carForm.engineNumber} required/>
//                     <label htmlFor="manufacturer">Enter Manufacturer</label>
//                     <input type="text" id="manufacturer" placeholder="Manufacturer" name="manufacturer" onChange={handleCarForm} value={carForm.manufacturer} required/>
//                 </div>
//                 <div className="name">
//                     <label htmlFor="carName">Enter Car Name</label>
//                     <input type="text" id="carName" placeholder="Car Name" name="carName" onChange={handleCarForm} value={carForm.carName} required/>
//                     <label htmlFor="model">Enter Car Model</label>
//                     <input type="number" id="model" placeholder="Car Model" name="model" onChange={handleCarForm} value={carForm.model} required/>
//                 </div>
//                 <div className="engine">
//                     <label htmlFor="carImage">Choose Image</label>
//                     <input type="file" id="carImage" placeholder="Image" name="carImage" onChange={handleCarForm} />
//                     <label htmlFor="milage">Enter Milage</label>
//                     <input type="number" id="milage" placeholder="Milage" name="milage" onChange={handleCarForm} value={carForm.milage} required/>
//                 </div>
//                 <div className="type">
//                     <label htmlFor="carType">Enter Car Type</label>
//                     <select name="carType" id="carType" value={carForm.carType} onChange={handleCarForm} required>
//                         <option value="">Select</option>
//                         <option value="Sedan">Sedan</option>
//                         <option value="SUV">SUV</option>
//                         <option value="Hatchback">Hatchback</option>
//                         <option value="Mini">Mini</option>
//                         <option value="Van">Van</option>
//                     </select>
//                     <label htmlFor="color">Enter Color</label>
//                     <input type="text" id="color" placeholder="Car Color" name="color" onChange={handleCarForm} value={carForm.color} required/>
//                 </div>
//                 <div className="condition">
//                     <label htmlFor="engineType">Enter Engine Type</label>
//                     <input type="text" id="engineType" placeholder="Engine Type" name="engineType" onChange={handleCarForm} value={carForm.engineType} required/>
//                     <label className="radioTag"><input type="radio" name="accidental" value="true" onChange={handleCarForm} ></input>Accidental</label>
//                     <label className="radioTag"><input type='radio' name="accidental" value="false" onChange={handleCarForm} ></input>Not Accidental</label>
//                 </div>
//                 <div className="pricing">
                    
//                     <label htmlFor="price">Enter Price</label>
//                     <input type="number" id="price" placeholder="Price in Dollars" name="price" onChange={handleCarForm} value={carForm.price} required/>
//                 </div>
//                 <button type="submit">{id ? "Update" : "Add Car"}</button>
//             </form>
//         </div>
//     )
// }



import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import "./CSSFiles/CarForm.css"
import "./CSSFiles/FormStyles.css"
import Navbar from "./Homepage/Navbar"

export default function CarForm() {
    let [carForm, setCarForm] = useState({
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
    })
    const navigate = useNavigate();

    let { id } = useParams();

    let setPreviousData = () => {
        let showPreviousData = async (id) => {
            let previousData = await axios.get(`http://localhost:3000/car/${id}`, { withCredentials: true });
            setCarForm({
                carImage: null,
                manufacturer: previousData.data.Manufacturer,
                carName: previousData.data.Car_Name,
                model: previousData.data.Model_Number,
                color: previousData.data.Color,
                engineType: previousData.data.Engine_Type,
                engineNumber: previousData.data.Engine_Number,
                mileage: previousData.data.Mileage,
                carType: previousData.data.Car_Type,
                accidental: previousData.data.Accidental.toString(),
                price: previousData.data.Price,
                availability: previousData.data.Availability.toString()
            })
        }
        if (id) {
            showPreviousData(id);
        }
    }
    useEffect(() => {
        setPreviousData();
    }, [])

    let handleCarForm = (event) => {
        let field = event.target.name;
        let newValue;
        if (field === "carImage") {
            setCarForm((preValues) => ({
                ...preValues,
                [field]: event.target.files[0],
            }));
        } else {
            newValue = event.target.value;
            setCarForm((currValues) => {
                return ({ ...currValues, [field]: newValue })
            })
        }
    }

    let handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("carImage", carForm.carImage);
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

        if (id) {
            try {
                let response = await axios.post(`http://localhost:3000/car/update/${id}`, carForm, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
                navigate('/explore')
            } catch (error) {
                console.log(error)
                if (error.response.status == 401) {
                    navigate('/login')
                } else if (error.response.status == 403) {
                    navigate(`/category/car/${id}`)
                } else {
                    console.log("some other error3")
                }
            }
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/car/addcar', carForm, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } });
            navigate('/explore')
        }
        catch (error) {
            console.error('Error submitting data:', error);
            if (error.response.status == 401) {
                navigate('/login')
            } else {
                console.log("some other error")
                console.log(error)
            }
        }
    }

    return (
        <div className="FormPage">
            <Navbar />

            <h3>{id ? "Update Vehicle" : "Register New Vehicle"}</h3>

            <form className="CarForm" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-row">
                    <div className="form-group full-width">
                        <label htmlFor="carImage" className="required">
                            {id ? "Update Vehicle Images" : "Upload Vehicle Images"}
                        </label>
                        <input 
                            type="file" 
                            id="carImage" 
                            accept="image/*" 
                            multiple
                            name="carImage" 
                            onChange={handleCarForm} 
                        />
                        <small className="file-hint">Upload multiple images showing different angles</small>
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
                            <option value="Mercedes">Mercedes</option>
                            <option value="Audi">Audi</option>
                            <option value="Kia">Kia</option>
                            <option value="Chingan">Chingan</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="carName" className="required">Vehicle Name</label>
                        <input 
                            type="text" 
                            id="carName" 
                            placeholder="e.g., Corolla, City, Civic" 
                            name="carName" 
                            onChange={handleCarForm} 
                            value={carForm.carName} 
                            required 
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="model" className="required">Model Year</label>
                        <select 
                            name="model" 
                            id="model" 
                            value={carForm.model} 
                            onChange={handleCarForm} 
                            required
                        >
                            <option value="">Select Year</option>
                            {Array.from({ length: 30 }, (_, i) => {
                                const year = new Date().getFullYear() - i;
                                return <option key={year} value={year}>{year}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="carType" className="required">Vehicle Type</label>
                        <select 
                            name="carType" 
                            id="carType" 
                            value={carForm.carType} 
                            onChange={handleCarForm} 
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Hatchback">Hatchback</option>
                            <option value="Mini">Mini</option>
                            <option value="Van">Van</option>
                            <option value="Pickup">Pickup</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="engineNumber" className="required">Engine Number</label>
                        <input 
                            type="text" 
                            id="engineNumber" 
                            placeholder="Enter engine number" 
                            name="engineNumber" 
                            onChange={handleCarForm} 
                            value={carForm.engineNumber} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="engineType" className="required">Engine Type</label>
                        <select 
                            name="engineType" 
                            id="engineType" 
                            value={carForm.engineType} 
                            onChange={handleCarForm} 
                            required
                        >
                            <option value="">Select Engine Type</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Electric">Electric</option>
                            <option value="CNG">CNG</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="color" className="required">Color</label>
                        <select 
                            name="color" 
                            id="color" 
                            value={carForm.color} 
                            onChange={handleCarForm} 
                            required
                        >
                            <option value="">Select Color</option>
                            <option value="White">White</option>
                            <option value="Black">Black</option>
                            <option value="Silver">Silver</option>
                            <option value="Gray">Gray</option>
                            <option value="Blue">Blue</option>
                            <option value="Red">Red</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="mileage" className="required">Mileage (km)</label>
                        <input 
                            type="number" 
                            id="mileage" 
                            placeholder="Current mileage" 
                            name="mileage" 
                            onChange={handleCarForm} 
                            value={carForm.mileage} 
                            required 
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="price" className="required">Price (PKR)</label>
                        <input 
                            type="number" 
                            id="price" 
                            placeholder="Enter price" 
                            name="price" 
                            onChange={handleCarForm} 
                            value={carForm.price} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label className="required">Accidental History</label>
                        <div className="radio-group">
                            <label className="radio-option">
                                <input 
                                    type="radio" 
                                    name="accidental" 
                                    value="true" 
                                    onChange={handleCarForm} 
                                    checked={carForm.accidental === "true"}
                                />
                                Yes
                            </label>
                            <label className="radio-option">
                                <input 
                                    type="radio" 
                                    name="accidental" 
                                    value="false" 
                                    onChange={handleCarForm} 
                                    checked={carForm.accidental === "false"}
                                />
                                No
                            </label>
                        </div>
                    </div>
                </div>

                {/* <div className="form-row">
                    <div className="form-group">
                        <label className="required">Availability</label>
                        <div className="radio-group">
                            <label className="radio-option">
                                <input 
                                    type="radio" 
                                    name="availability" 
                                    value="true" 
                                    onChange={handleCarForm} 
                                    checked={carForm.availability === "true"}
                                />
                                Available
                            </label>
                            <label className="radio-option">
                                <input 
                                    type="radio" 
                                    name="availability" 
                                    value="false" 
                                    onChange={handleCarForm} 
                                    checked={carForm.availability === "false"}
                                />
                                Sold
                            </label>
                        </div>
                    </div>
                </div> */}

                {/* <div className="form-row">
                    <div className="form-group full-width">
                        <label htmlFor="description">Additional Description</label>
                        <textarea 
                            id="description" 
                            placeholder="Describe vehicle condition, features, special modifications, etc." 
                            name="description" 
                            rows="4"
                        />
                    </div>
                </div> */}

                <button type="submit">{id ? "Update Vehicle" : "Register Vehicle"}</button>
            </form>
        </div>
    )
}