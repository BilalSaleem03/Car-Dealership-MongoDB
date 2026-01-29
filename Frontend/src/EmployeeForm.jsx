// import {useEffect , useState } from "react"
// import {useParams , useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';
// import "./CSSFiles/EmployeeForm.css"
// import logo from "./assets/logo.png"
// import Navbar from "./Homepage/Navbar"
// export default function EmployeeForm(){
//     let [employeeForm , setEmployeeForm] = useState({
//         employeeImage:null,
//         firstName:"",
//         lastName:"",
//         cnic:3310200000000,
//         gender:"",
//         DOB:"",
//         phone:"",
//         telephone:"",
//         email:"",
//         address:"",
//         hireDate:"",
//         designation:"",
//         salary:1000,
//         commissionRate:0
//     })
//     const navigate = useNavigate();

//     let handleEmployeeForm = (event)=>{
//         let field = event.target.name;
//         let newValue = event.target.value;
//         if (field === "employeeImage") {
//             setEmployeeForm((preValues) => ({
//                 ...preValues,
//                 [field]: event.target.files[0], // Store the file object
//             }));
//         } else {
        
//         employeeForm[field] = newValue;
//         setEmployeeForm((currValues)=>{
//             return({...currValues , [field]:newValue})
//         })}
//     }

//     let {id} = useParams();

//     let setPreviousData = ()=>{
//         let showPreviousData = async (id)=>{
//             let previousData = await axios.get(`http://localhost:3000/aboutus/${id}` , {withCredentials : true ,headers: { "Content-Type": "multipart/form-data" } });
//             // console.log(previousData);  
//             setEmployeeForm({
//                 carImage:null,
//                 firstName : previousData.data.First_Name,
//                 lastName : previousData.data.Last_Name,
//                 DOB : previousData.data.Date_of_Birth.split('T')[0],
//                 gender : previousData.data.Gender,
//                 cnic : previousData.data.CNIC,
//                 phone : previousData.data.Phone_Number,
//                 telephone : previousData.data.Telephone,
//                 email : previousData.data.Email_Address,
//                 address : previousData.data.Address,
//                 hireDate : previousData.data.Hire_Date.split('T')[0],
//                 designation : previousData.data.Designation,
//                 salary : previousData.data.Salary,
//                 commessionRate : previousData.data.Commission_Rate
//             })
    
//         }
//         if(id){
//             showPreviousData(id);
//         }
//     }   
//     useEffect(()=>{
//         setPreviousData();
//     } , [])

//     let handleSubmit =async (event)=>{
//         event.preventDefault();
//         console.log(employeeForm)
//         const formData = new FormData();
//         formData.append("employeeImage", employeeForm.employeeImage); // Append image file
//         formData.append("firstName", employeeForm.firstName);
//         formData.append("lastName", employeeForm.lastName);
//         formData.append("DOB", employeeForm.DOB);
//         formData.append("gender", employeeForm.gender);
//         formData.append("cnic", employeeForm.cnic);
//         formData.append("phone", employeeForm.phone);
//         formData.append("telephone", employeeForm.telephone);
//         formData.append("email", employeeForm.email);
//         formData.append("address", employeeForm.address);
//         formData.append("hireDate", employeeForm.hireDate);
//         formData.append("designation", employeeForm.designation);
//         formData.append("salary", employeeForm.salary);
//         formData.append("commissionRate", employeeForm.commissionRate);
//         setEmployeeForm({
//             employeeImage:null,
//             firstName:"",
//             lastName:"",
//             cnic:3310200000000,
//             gender:"",
//             DOB:"",
//             phone:"",
//             telephone:"",
//             email:"",
//             address:"",
//             hireDate:"",
//             designation:"",
//             salary:1000,
//             commissionRate:0
//         })

//         if(id){
//             try {
//                 let respose = await axios.post(`http://localhost:3000/aboutus/update/${id}`, employeeForm , {withCredentials : true ,headers: { "Content-Type": "multipart/form-data" }})
//                 navigate('/aboutus')
//             } catch (error) {
//                 console.log(error)
//             }
//             return;
//         }

//         try {
//             // Send form data to the backend
//             console.log("Sending data................")
//             const response = await axios.post('http://localhost:3000/aboutus/addemployee', employeeForm , {withCredentials : true ,headers: { "Content-Type": "multipart/form-data" }});
//             console.log('Data submitted successfully:', response.data);
//             navigate('/aboutus')
//         }
//         catch (error) {

//             console.error('Error submitting data:', error);
//         }
//     }
//     return(
//         <div className="FormPage">
//             <Navbar/>
          
//             <h3>Employee Registration Form</h3>

//             <form action="" className="EmployeeForm" onSubmit={handleSubmit} encType="multipart/form-data">
//                 <div className="primaryInfo">
//                     {/* <div></div> */}
//                     <label htmlFor="emplyeeImage">Enter Employee Image</label> 
//                     <input type="file" id="emplyeeImage" placeholder="Employee Image" name="employeeImage" onChange={handleEmployeeForm}/>
//                     <label htmlFor="designation">Enter Designation</label>
//                     <input type="text" id="designation" placeholder="Designation" name="designation" onChange={handleEmployeeForm} value={employeeForm.designation} required/>
//                 </div>
//                 <div className="name">
//                     <label htmlFor="firstName">Enter First Name</label>
//                     <input type="text" id="firstName" placeholder="First Name" name="firstName" onChange={handleEmployeeForm} value={employeeForm.firstName} required/>
//                     <label htmlFor="lastName">Enter Last Name</label>
//                     <input type="text" id="lastName" placeholder="Last Name" name="lastName" onChange={handleEmployeeForm} value={employeeForm.lastName} required/>
//                 </div>
//                 <div className="identity">
//                     <label htmlFor="cnic">Enter CNIC # </label>
//                     <input type="number" id="cnic" placeholder="Enter CNIC" name="cnic" onChange={handleEmployeeForm} value={employeeForm.cnic} required/>
//                     <label htmlFor="gender">Enter Gender</label>
//                     <input type="text" id="gender" placeholder="Gender" name="gender" onChange={handleEmployeeForm} value={employeeForm.gender} required/>
//                 </div>
//                 <div className="contact">
//                     <label htmlFor="phone">Enter Phone#</label>
//                     <input type="number" id="phone" placeholder="Phone#" name="phone" onChange={handleEmployeeForm} value={employeeForm.phone} required/>
//                     <label htmlFor="email">Enter E-Mail Address</label>
//                     <input type="email" id="email" placeholder="E-mail" name="email" onChange={handleEmployeeForm} value={employeeForm.email} required/>
//                 </div>
//                 <div className="dates">
//                     <label htmlFor="DOB">Enter Date of Birth</label>
//                     <input type="date" id="DOB" placeholder="Date of Birth" name="DOB" onChange={handleEmployeeForm} value={employeeForm.DOB} required/>
//                     <label htmlFor="hireDate">Enter Hiring Date</label>
//                     <input type="date" id="hireDate" placeholder="Hire Date" name="hireDate" onChange={handleEmployeeForm} value={employeeForm.hireDate} required/>
//                 </div>
//                 <div className="salaryInfo">
//                     <label htmlFor="salary">Enter Salary</label>
//                     <input type="number" id="salary" placeholder="Salary" name="salary" onChange={handleEmployeeForm} value={employeeForm.salary} required/>
//                     <label htmlFor="commissionRate">Commesssion Rate</label>
//                     <input type="number" id="commissionRate" placeholder="Commission Rate" name="commissionRate" onChange={handleEmployeeForm} value={employeeForm.commissionRate} required/>
//                 </div>
//                 <div className="telephone">
//                     <label htmlFor="telephone">Enter Telephone</label>
//                     <input type="number" id="telephone" placeholder="Telephone" name="telephone" onChange={handleEmployeeForm} value={employeeForm.telephone} required/>
//                 </div>
//                 <div className="address">
//                     <label htmlFor="address">Enter Address</label>
//                     <input type="text" id="address" placeholder="Address" name="address" onChange={handleEmployeeForm} value={employeeForm.address} required/>
//                 </div>
//                 <button type="submit">{id ? "Update" : "Add Employee"}</button>
//             </form>
//         </div>
//     )
// }







import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import "./CSSFiles/EmployeeForm.css"
import "./CSSFiles/FormStyles.css"
import Navbar from "./Homepage/Navbar"
const backendURL = import.meta.env.VITE_BackendURL;

export default function EmployeeForm() {
    let [employeeForm, setEmployeeForm] = useState({
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
    })
    const navigate = useNavigate();

    let handleEmployeeForm = (event) => {
        let field = event.target.name;
        let newValue = event.target.value;
        if (field === "employeeImage") {
            setEmployeeForm((preValues) => ({
                ...preValues,
                [field]: event.target.files[0],
            }));
        } else {
            setEmployeeForm((currValues) => {
                return ({ ...currValues, [field]: newValue })
            })
        }
    }

    let { id } = useParams();

    let setPreviousData = () => {
        let showPreviousData = async (id) => {
            let previousData = await axios.get(`${backendURL}/aboutus/${id}`, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } });
            setEmployeeForm({
                employeeImage: null,
                firstName: previousData.data.First_Name,
                lastName: previousData.data.Last_Name,
                DOB: previousData.data.Date_of_Birth.split('T')[0],
                gender: previousData.data.Gender,
                cnic: previousData.data.CNIC,
                phone: previousData.data.Phone_Number,
                telephone: previousData.data.Telephone,
                email: previousData.data.Email_Address,
                address: previousData.data.Address,
                hireDate: previousData.data.Hire_Date.split('T')[0],
                designation: previousData.data.Designation,
                salary: previousData.data.Salary,
                commissionRate: previousData.data.Commission_Rate
            })
        
        }
        if (id) {
            showPreviousData(id);
        }
    }
    useEffect(() => {
        setPreviousData();
    }, [])

    let handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("employeeImage", employeeForm.employeeImage);
        formData.append("firstName", employeeForm.firstName);
        formData.append("lastName", employeeForm.lastName);
        formData.append("DOB", employeeForm.DOB);
        formData.append("gender", employeeForm.gender);
        formData.append("cnic", employeeForm.cnic);
        formData.append("phone", employeeForm.phone);
        formData.append("telephone", employeeForm.telephone);
        formData.append("email", employeeForm.email);
        formData.append("address", employeeForm.address);
        formData.append("hireDate", employeeForm.hireDate);
        formData.append("designation", employeeForm.designation);
        formData.append("salary", employeeForm.salary);
        formData.append("commissionRate", employeeForm.commissionRate);

        if (id) {
            try {
                let response = await axios.post(`${backendURL}/aboutus/update/${id}`, employeeForm, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
                navigate('/aboutus')
            } catch (error) {
                console.log(error)
            }
            return;
        }

        try {
            const response = await axios.post(`${backendURL}/aboutus/addemployee`, employeeForm, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } });
            navigate('/aboutus')
        }
        catch (error) {
            console.error('Error submitting data:', error);
        }
    }
    return (
        <div className="FormPage">
            <Navbar />

            <h3>{id ? "Update Employee" : "Register New Employee"}</h3>

            <form className="EmployeeForm" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-row">
                    <div className="form-group full-width">
                        <label htmlFor="employeeImage" className="required">
                            {id ? "Update Employee Photo" : "Upload Employee Photo"}
                        </label>
                        <input 
                            type="file" 
                            id="employeeImage" 
                            accept="image/*" 
                            name="employeeImage" 
                            onChange={handleEmployeeForm} 
                        />
                        <small className="file-hint">Recommended: Square image, max 5MB</small>
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
                        <label htmlFor="cnic" className="required">CNIC Number</label>
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

                <div className="form-row">
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
                    <div className="form-group">
                        <label htmlFor="hireDate" className="required">Hire Date</label>
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
                        <label htmlFor="designation" className="required">Designation</label>
                        <select 
                            name="designation" 
                            id="designation" 
                            value={employeeForm.designation} 
                            onChange={handleEmployeeForm} 
                            required
                        >
                            <option value="">Select Designation</option>
                            <option value="Sales Person">Sales Person</option>
                            <option value="Manager">Manager</option>
                            <option value="Finance Officer">Finance Officer</option>
                            <option value="Customer Service">Customer Service</option>
                            <option value="Mechanic">Mechanic</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="required">Phone Number</label>
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
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email" className="required">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="employee@dealership.com" 
                            name="email" 
                            onChange={handleEmployeeForm} 
                            value={employeeForm.email} 
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
                            onChange={handleEmployeeForm} 
                            value={employeeForm.telephone} 
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="salary" className="required">Monthly Salary (PKR)</label>
                        <input 
                            type="number" 
                            id="salary" 
                            placeholder="Enter monthly salary" 
                            name="salary" 
                            onChange={handleEmployeeForm} 
                            value={employeeForm.salary} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="commissionRate">Commission Rate (%)</label>
                        <input 
                            type="number" 
                            id="commissionRate" 
                            placeholder="0-100" 
                            name="commissionRate" 
                            min="0" 
                            max="100" 
                            onChange={handleEmployeeForm} 
                            value={employeeForm.commissionRate} 
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group full-width">
                        <label htmlFor="address" className="required">Address</label>
                        <textarea 
                            id="address" 
                            placeholder="Enter complete address" 
                            name="address" 
                            rows="3"
                            onChange={handleEmployeeForm} 
                            value={employeeForm.address} 
                            required 
                        />
                    </div>
                </div>

                <button type="submit">{id ? "Update Employee" : "Register Employee"}</button>
            </form>
        </div>
    )
}