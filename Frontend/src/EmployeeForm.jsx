import {useEffect , useState } from "react"
import {useParams , useNavigate } from 'react-router-dom'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import "./CSSFiles/EmployeeForm.css"
import logo from "./assets/logo.png"
import Navbar from "./Homepage/Navbar"
export default function EmployeeForm(){
    let [employeeForm , setEmployeeForm] = useState({
        firstName:"",
        lastName:"",
        cnic:3310200000000,
        gender:"",
        DOB:"",
        phone:"",
        telephone:"",
        email:"",
        address:"",
        hireDate:"",
        designation:"",
        salary:1000,
        commessionRate:0
    })
    const navigate = useNavigate();

    let handleEmployeeForm = (event)=>{
        let field = event.target.name;
        let newValue = event.target.value;
        employeeForm[field] = newValue;
        setEmployeeForm((currValues)=>{
            return({...currValues , [field]:newValue})
        })

    }

    let {id} = useParams();

    let setPreviousData = ()=>{
        let showPreviousData = async (id)=>{
            let previousData = await axios.get(`http://localhost:3000/aboutus/${id}` , {withCredentials : true});
            // console.log(previousData);  
            setEmployeeForm({
                firstName : previousData.data.First_Name,
                lastName : previousData.data.Last_Name,
                DOB : previousData.data.Date_of_Birth.split('T')[0],
                gender : previousData.data.Gender,
                cnic : previousData.data.CNIC,
                phone : previousData.data.Phone_Number,
                telephone : previousData.data.Telephone,
                email : previousData.data.Email_Address,
                address : previousData.data.Address,
                hireDate : previousData.data.Hire_Date.split('T')[0],
                designation : previousData.data.Designation,
                salary : previousData.data.Salary,
                commessionRate : previousData.data.Commission_Rate
            })
    
        }
        if(id){
            showPreviousData(id);
        }
    }   
    useEffect(()=>{
        setPreviousData();
    } , [])

    let handleSubmit =async (event)=>{
        event.preventDefault();
        console.log(employeeForm)
        setEmployeeForm({
            firstName:"",
            lastName:"",
            cnic:3310200000000,
            gender:"",
            DOB:"",
            phone:"",
            telephone:"",
            email:"",
            address:"",
            hireDate:"",
            designation:"",
            salary:1000,
            commessionRate:0
        })

        if(id){
            try {
                let respose = await axios.post(`http://localhost:3000/aboutus/update/${id}`, employeeForm , {withCredentials : true})
                navigate('/aboutus')
            } catch (error) {
                console.log(error)
            }
            return;
        }

        try {
            // Send form data to the backend
            console.log("Sending data................")
            const response = await axios.post('http://localhost:3000/aboutus/addemployee', employeeForm , {withCredentials : true});
            console.log('Data submitted successfully:', response.data);
            navigate('/aboutus')
        }
        catch (error) {

            console.error('Error submitting data:', error);
        }
    }
    return(
        <div className="FormPage">
            <Navbar/>
          
            <h3>Employee Registration Form</h3>

            <form action="" className="EmployeeForm" onSubmit={handleSubmit}>
                <div className="primaryInfo">
                    {/* <div></div> */}
                    {/* <label htmlFor="emplyeeID">Enter Employee Id</label> 
                    <input type="text" id="emplyeeID" placeholder="Employee ID" name="employeeID" onChange={handleEmployeeForm} value={employeeForm.employeeID} required/> */}
                    <label htmlFor="designation">Enter Designation</label>
                    <input type="text" id="designation" placeholder="Designation" name="designation" onChange={handleEmployeeForm} value={employeeForm.designation} required/>
                </div>
                <div className="name">
                    <label htmlFor="firstName">Enter First Name</label>
                    <input type="text" id="firstName" placeholder="First Name" name="firstName" onChange={handleEmployeeForm} value={employeeForm.firstName} required/>
                    <label htmlFor="lastName">Enter Last Name</label>
                    <input type="text" id="lastName" placeholder="Last Name" name="lastName" onChange={handleEmployeeForm} value={employeeForm.lastName} required/>
                </div>
                <div className="identity">
                    <label htmlFor="cnic">Enter CNIC # </label>
                    <input type="number" id="cnic" placeholder="Enter CNIC" name="cnic" onChange={handleEmployeeForm} value={employeeForm.cnic} required/>
                    <label htmlFor="gender">Enter Gender</label>
                    <input type="text" id="gender" placeholder="Gender" name="gender" onChange={handleEmployeeForm} value={employeeForm.gender} required/>
                </div>
                <div className="contact">
                    <label htmlFor="phone">Enter Phone#</label>
                    <input type="number" id="phone" placeholder="Phone#" name="phone" onChange={handleEmployeeForm} value={employeeForm.phone} required/>
                    <label htmlFor="email">Enter E-Mail Address</label>
                    <input type="email" id="email" placeholder="E-mail" name="email" onChange={handleEmployeeForm} value={employeeForm.email} required/>
                </div>
                <div className="dates">
                    <label htmlFor="DOB">Enter Date of Birth</label>
                    <input type="date" id="DOB" placeholder="Date of Birth" name="DOB" onChange={handleEmployeeForm} value={employeeForm.DOB} required/>
                    <label htmlFor="hireDate">Enter Hiring Date</label>
                    <input type="date" id="hireDate" placeholder="Hire Date" name="hireDate" onChange={handleEmployeeForm} value={employeeForm.hireDate} required/>
                </div>
                <div className="salaryInfo">
                    <label htmlFor="salary">Enter Salary</label>
                    <input type="number" id="salary" placeholder="Salary" name="salary" onChange={handleEmployeeForm} value={employeeForm.salary} required/>
                    <label htmlFor="commessionRate">Commesssion Rate</label>
                    <input type="number" id="commessionRate" placeholder="Commession Rate" name="commessionRate" onChange={handleEmployeeForm} value={employeeForm.commessionRate} required/>
                </div>
                <div className="telephone">
                    <label htmlFor="telephone">Enter Telephone</label>
                    <input type="number" id="telephone" placeholder="Telephone" name="telephone" onChange={handleEmployeeForm} value={employeeForm.telephone} required/>
                </div>
                <div className="address">
                    <label htmlFor="address">Enter Address</label>
                    <input type="text" id="address" placeholder="Address" name="address" onChange={handleEmployeeForm} value={employeeForm.address} required/>
                </div>
                <button type="submit">{id ? "Update" : "Add Employee"}</button>
            </form>
        </div>
    )
}