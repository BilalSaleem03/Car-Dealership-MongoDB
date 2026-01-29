// import {useEffect ,  useState } from "react"
// import "./CSSFiles/CustomerForm.css"
// import {useParams ,  useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';
// import Navbar from "./Homepage/Navbar"
// import logo from "./assets/logo.png"
// export default function CustomerForm(){
//     let [customerForm , setCustomerForm] = useState({
//         customerImage: null,
//         firstName:"",
//         lastName:"",
//         DOB:"",
//         gender:"",
//         cnic:3301200000000,
//         phone:"",
//         telephone:"",
//         email:"",
//         address:"",
//     })
//     let {id} = useParams(); 

//     const navigate = useNavigate();
    

//     let setPreviousData = ()=>{
//         let showPreviousData = async (id)=>{
//             let previousData = await axios.get(`http://localhost:3000/customer/${id}` ,  {withCredentials : true});  
//             setCustomerForm({
//                 customerImage:null,
//                 firstName : previousData.data.First_Name,
//                 lastName : previousData.data.Last_Name,
//                 DOB : previousData.data.Date_of_Birth.split("T")[0],
//                 gender : previousData.data.Gender,
//                 cnic : previousData.data.CNIC,
//                 phone : previousData.data.Phone_Number,
//                 telephone : previousData.data.Telephone,
//                 email : previousData.data.Email_Address,
//                 address : previousData.data.Address,
//             })
    
//         }
//         if(id){
//             showPreviousData(id);
//         }
//     }   
//     useEffect(()=>{
//         setPreviousData();
//     } , [])
    
//     let handleCustomerForm = (event)=>{
//         let field = event.target.name;
//         let newValue = event.target.value;
//         if (field === "customerImage") {
//             setCustomerForm((preValues) => ({
//                 ...preValues,
//                 [field]: event.target.files[0], // Store the file object
//             }));
//         } else {
        
//         customerForm[field] = newValue;
//         setCustomerForm((currValues)=>{
//             return({...currValues , [field]:newValue})
//         })}
//     }
//     let handleSubmit = async (event)=>{
//         event.preventDefault();
//         console.log(customerForm);
//         const formData = new FormData();
//         formData.append("customerImage", customerForm.customerImage); // Append image file
//         formData.append("firstName", customerForm.firstName);
//         formData.append("lastName", customerForm.lastName);
//         formData.append("DOB", customerForm.DOB);
//         formData.append("gender", customerForm.gender);
//         formData.append("cnic", customerForm.cnic);
//         formData.append("phone", customerForm.phone);
//         formData.append("telephone", customerForm.telephone);
//         formData.append("email", customerForm.email);
//         formData.append("address", customerForm.address);
//         setCustomerForm({
//             customerImage: null,
//             firstName:"",
//             lastName:"",
//             DOB:"",
//             gender:"",
//             cnic:3310200000000,
//             phone:"",
//             telephone:"",
//             email:"",
//             address:"",
//         })
//         if(id){
//             try {
//                 let response = await axios.post(`http://localhost:3000/customer/update/${id}`, customerForm , {withCredentials : true , headers: { "Content-Type": "multipart/form-data" }})
//                 // console.log("response" , response)
//                 navigate('/customer')
//             } catch (error) {
//                 console.log("error   ",error)
//             }
//             return;
//         }
        
//         try {
//             let response = await axios.post('http://localhost:3000/customer/addcustomer', customerForm , {withCredentials : true ,headers: { "Content-Type": "multipart/form-data" } })
//             // console.log("response" , response)
//             // console.log("Successfully submited")
//             navigate('/customer')
//         } catch (error) {
            
//             console.log("Not   Successfully submited")
//             console.log(error)
//         }
//     }
//     return(
//         <div className="FormPage">
//             <Navbar/>
//             <h3>Customer Registration Form</h3>

//             <form action="" className="CustomerForm" onSubmit={handleSubmit} encType="multipart/form-data">
//                 <div className="primaryInfo">
//                     <label htmlFor="customerImage">{id ?"Upload New Image" :"Upload Image"}</label> 
//                     <input type="file" id="customerImage" placeholder="Customer Image" name="customerImage" onChange={handleCustomerForm} />
//                     <label htmlFor="cnic">Enter CNIC #</label>
//                     <input type="number" id="cnic" placeholder="CNIC#" name="cnic" onChange={handleCustomerForm} value={customerForm.cnic} required/>
//                 </div>
//                 <div className="name">
//                     <label htmlFor="firstName">Enter First Name</label>
//                     <input type="text" id="firstName" placeholder="First Name" name="firstName" onChange={handleCustomerForm} value={customerForm.firstName} required/>
//                     <label htmlFor="lastName">Enter Last Name</label>
//                     <input type="text" id="lastName" placeholder="Last Name" name="lastName" onChange={handleCustomerForm} value={customerForm.lastName} required/>
//                 </div>
//                 <div className="contact">
//                     <label htmlFor="phone">Enter Phone#</label>
//                     <input type="number" id="phone" placeholder="Phone#" name="phone" onChange={handleCustomerForm} value={customerForm.phone} required/>
//                     <label htmlFor="email">Enter E-Mail Address</label>
//                     <input type="email" id="email" placeholder="E-mail" name="email" onChange={handleCustomerForm} value={customerForm.email} required/>
//                 </div>
//                 <div className="dates">
//                     <label htmlFor="DOB">Enter Date of Birth</label>
//                     <input type="date" id="DOB" placeholder="Date of Birth" name="DOB" onChange={handleCustomerForm} value={customerForm.DOB} required/>
//                     <label htmlFor="gender">Enter Gender</label>
//                     <input type="text" id="gender" placeholder="Gender" name="gender" onChange={handleCustomerForm} value={customerForm.gender} required/>
//                 </div>
//                 <div className="telephone">
//                     <label htmlFor="telephone">Enter Telephone</label>
//                     <input type="text" id="telephone" placeholder="Telephone" name="telephone" onChange={handleCustomerForm} value={customerForm.telephone} required/>
//                 </div>
//                 <div className="address">
//                     <label htmlFor="address">Enter Address</label>
//                     <input type="text" id="address" placeholder="Address" name="address" onChange={handleCustomerForm} value={customerForm.address} required/>
//                 </div>
//                 <button type="submit">{id ? "Update" : "Add Customer"}</button>
//             </form>
//         </div>
//     )
// }









import { useEffect, useState } from "react"
import "./CSSFiles/CustomerForm.css"
import "./CSSFiles/FormStyles.css"
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
const backendURL = import.meta.env.VITE_BackendURL;
import Navbar from "./Homepage/Navbar"

export default function CustomerForm() {
    let [customerForm, setCustomerForm] = useState({
        customerImage: null,
        firstName: "",
        lastName: "",
        DOB: "",
        gender: "",
        cnic: "",
        phone: "",
        telephone: "",
        email: "",
        address: "",
    })
    let { id } = useParams();

    const navigate = useNavigate();

    let setPreviousData = () => {
        let showPreviousData = async (id) => {
            let previousData = await axios.get(`${backendURL}/customer/${id}`, { withCredentials: true });
            setCustomerForm({
                customerImage: null,
                firstName: previousData.data.First_Name,
                lastName: previousData.data.Last_Name,
                DOB: previousData.data.Date_of_Birth.split("T")[0],
                gender: previousData.data.Gender,
                cnic: previousData.data.CNIC,
                phone: previousData.data.Phone_Number,
                telephone: previousData.data.Telephone,
                email: previousData.data.Email_Address,
                address: previousData.data.Address,
            })
        }
        if (id) {
            showPreviousData(id);
        }
    }
    useEffect(() => {
        setPreviousData();
    }, [])

    let handleCustomerForm = (event) => {
        let field = event.target.name;
        let newValue = event.target.value;
        if (field === "customerImage") {
            setCustomerForm((preValues) => ({
                ...preValues,
                [field]: event.target.files[0],
            }));
        } else {
            setCustomerForm((currValues) => {
                return ({ ...currValues, [field]: newValue })
            })
        }
    }

    let handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("customerImage", customerForm.customerImage);
        formData.append("firstName", customerForm.firstName);
        formData.append("lastName", customerForm.lastName);
        formData.append("DOB", customerForm.DOB);
        formData.append("gender", customerForm.gender);
        formData.append("cnic", customerForm.cnic);
        formData.append("phone", customerForm.phone);
        formData.append("telephone", customerForm.telephone);
        formData.append("email", customerForm.email);
        formData.append("address", customerForm.address);

        if (id) {
            try {
                let response = await axios.post(`${backendURL}/customer/update/${id}`, customerForm, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
                navigate('/customer')
            } catch (error) {
                console.log("error   ", error)
            }
            return;
        }

        try {
            let response = await axios.post(`${backendURL}/customer/addcustomer`, customerForm, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
            navigate('/customer')
        } catch (error) {
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
            <h3>{id ? "Update Customer" : "Register New Customer"}</h3>

            <form className="CustomerForm" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-row">
                    <div className="form-group full-width">
                        <label htmlFor="customerImage">
                            {id ? "Update Customer Photo" : "Upload Customer Photo"}
                        </label>
                        <input 
                            type="file" 
                            id="customerImage" 
                            accept="image/*" 
                            name="customerImage" 
                            onChange={handleCustomerForm} 
                        />
                        <small className="file-hint">Optional: Profile photo, max 5MB</small>
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
                        <label htmlFor="cnic" className="required">CNIC Number</label>
                        <input 
                            type="text" 
                            id="cnic" 
                            placeholder="00000-0000000-0" 
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
                    <div className="form-group">
                        <label htmlFor="phone" className="required">Phone Number</label>
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
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email" className="required">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="customer@example.com" 
                            name="email" 
                            onChange={handleCustomerForm} 
                            value={customerForm.email} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telephone">Telephone</label>
                        <input 
                            type="tel" 
                            id="telephone" 
                            placeholder="(042) 1234567" 
                            name="telephone" 
                            onChange={handleCustomerForm} 
                            value={customerForm.telephone} 
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group full-width">
                        <label htmlFor="address" className="required">Address</label>
                        <textarea 
                            id="address" 
                            placeholder="House #, Street, City, Province" 
                            name="address" 
                            rows="3"
                            onChange={handleCustomerForm} 
                            value={customerForm.address} 
                            required 
                        />
                    </div>
                </div>

                {/* <div className="customer-type">
                    <label className="required">Customer Type</label>
                    <div className="radio-group">
                        <label className="radio-option">
                            <input 
                                type="radio" 
                                name="customerType" 
                                value="individual" 
                                defaultChecked 
                            />
                            Individual
                        </label>
                        <label className="radio-option">
                            <input 
                                type="radio" 
                                name="customerType" 
                                value="corporate" 
                            />
                            Corporate
                        </label>
                        <label className="radio-option">
                            <input 
                                type="radio" 
                                name="customerType" 
                                value="fleet" 
                            />
                            Fleet
                        </label>
                    </div>
                </div> */}

                <button type="submit">{id ? "Update Customer" : "Register Customer"}</button>
            </form>
        </div>
    )
}