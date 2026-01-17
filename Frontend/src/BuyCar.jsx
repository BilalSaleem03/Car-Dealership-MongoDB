
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'
// import { useEffect, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios';
// import './CSSFiles/BuyCar.css'
// import Navbar from "./Homepage/Navbar"
// import Footer from "./Homepage/Footer"
// export default function BuyCar(){
//     let { id } = useParams();
//     id = id.replace(":", "");
//     const navigate = useNavigate();
//     const [notOwner , setNotOwner] = useState(false);
//     const [incorrectDataVariable , setIncorrectDataVariable] = useState(false);
//     const [incorrectData , setIncorrectData] = useState("");
//     const [salesForm , setSalesForm] = useState({
//         car_ID:id,
//         customer_cnic:3310200000000,
//         salesperson_cnic:3310200000000,
//         payment_method:"",
//         asked_amount:100000,
//         given_amount:100000,
//         sales_date:"",
        
//     });

//     const handleNotOwner = ()=>{
//         setNotOwner(true)
//     }
   
    
//     let handleSalesForm = (event)=>{
//         let field = event.target.name;
//         let newValue  = event.target.value;;
//         salesForm[field] = newValue;
//         setSalesForm((currValues)=>{
//             return({...currValues , [field]:newValue})
//         })

//     }

//     let handleSubmit =async (event)=>{       
//         event.preventDefault();      
//         setSalesForm({
//             car_ID:id,
//             customer_cnic:3310200000000,
//             salesperson_cnic:3310200000000,
//             payment_method:"",
//             asked_amount:100000,
//             given_amount:100000,
//             sales_date:"",
//         })
//         try {
//             // Send form data to the backend
//             const response = await axios.post(`http://localhost:3000/addsales/${id}`, salesForm , {withCredentials : true});
//             navigate('/');
//         }
//         catch (error) {
//             if(error.response.status === 401){
//                 navigate('/login');
//             } else if(error.response.status === 403){
//                 handleNotOwner();
//             } else if(error.response.status === 404){
//                 handleInCorrectData(error.response.data.error);
//             } else{
//                 console.error('Error submitting data:', error);
//             }
//         }
//     }

//     const handleInCorrectData = (incorrecterrorMessage)=>{
//         setIncorrectDataVariable(true)
//         setIncorrectData(incorrecterrorMessage)
//     }


//     return(
//         <div className='FormPage'>
//             <Navbar/>
//             <h3>Sales Form</h3>

//             <form action="" className="SalesForm" onSubmit={handleSubmit}>
//                 <div className="primaryInfo">
//                     <label htmlFor="car_ID">Enter Car_ID</label>
//                     <input type="text" id="car_ID" placeholder="car_id" name="car_ID" onChange={handleSalesForm} value={salesForm.car_ID} required/>
//                 </div>
//                 <div className="info">
//                     <label htmlFor="customer_cnic">Enter Customer CNIC</label>
//                     <input type="number" id="customer_cnic" placeholder="Customer CNIC" name="customer_cnic" onChange={handleSalesForm} value={salesForm.customer_cnic} required/>
//                     <label htmlFor="salesperson_cnic">Enter Salesperson CNIC</label>
//                     <input type="number" id="salesperson_cnic" placeholder="Last Name" name="salesperson_cnic" onChange={handleSalesForm} value={salesForm.salesperson_cnic} required/>
//                 </div>
//                 <div className="amount">
//                     <label htmlFor="asked_amount">Enter Asked Amount</label>
//                     <input type="number" id="asked_amount" placeholder="Asked Amount" name="asked_amount" onChange={handleSalesForm} value={salesForm.asked_amount} required/>
//                     <label htmlFor="given_amount">Enter Given Amount</label>
//                     <input type="number" id="given_amount" placeholder="Given Amount" name="given_amount" onChange={handleSalesForm} value={salesForm.given_amount} required/>
//                 </div>
//                 <div className="method">
//                     <label htmlFor="payment_method">Select Payment Method</label>
//                     <select name="payment_method" id="payment_method" value={salesForm.payment_method} onChange={handleSalesForm} required>
//                         <option value="">Select</option>
//                         <option value="Card">Card</option>
//                         <option value="Cash">Cash</option>
//                         <option value="Check">Check</option>
//                     </select>
//                     <label htmlFor="sales_date">Enter Date</label>
//                     <input type="date" id="sales_date" placeholder="Date" name="sales_date" onChange={handleSalesForm} value={salesForm.sales_date} required/>
//                 </div>
//                 <p className='owner-message'>{notOwner && "You Are Not The Owner"}</p>
//                 <p className='owner-message'>{incorrectDataVariable && incorrectData}</p>
//                 <button type="submit">Add Sales</button>
//             </form>
//             <Footer/>
//         </div>
//     )
// }

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './CSSFiles/BuyCar.css'
import Navbar from "./Homepage/Navbar"
import Footer from "./Homepage/Footer"

export default function BuyCar() {
    let { id } = useParams();
    id = id.replace(":", "");
    const navigate = useNavigate();
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
        sales_date: "",
    });

    const handleNotOwner = () => {
        setNotOwner(true)
    }

    let handleSalesForm = (event) => {
        let field = event.target.name;
        let newValue = event.target.value;
        setSalesForm((currValues) => {
            return ({ ...currValues, [field]: newValue })
        })
    }

    let handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/addsales/${id}`, salesForm, { withCredentials: true });
            navigate('/');
        }
        catch (error) {
            if (error.response.status === 401) {
                navigate('/login');
            } else if (error.response.status === 403) {
                handleNotOwner();
            } else if (error.response.status === 404) {
                handleInCorrectData(error.response.data.error);
            } else {
                console.error('Error submitting data:', error);
            }
        }
    }

    const handleInCorrectData = (incorrecterrorMessage) => {
        setIncorrectDataVariable(true)
        setIncorrectData(incorrecterrorMessage)
    }

    return (
        <div className='FormPage'>
            <Navbar />
            <h3>Complete Purchase</h3>

            <form className="SalesForm" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="car_ID" className="required">Car ID</label>
                        <input 
                            type="text" 
                            id="car_ID" 
                            placeholder="Enter Car ID" 
                            name="car_ID" 
                            onChange={handleSalesForm} 
                            value={salesForm.car_ID} 
                            required 
                            disabled
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="customer_cnic" className="required">Customer CNIC</label>
                        <input 
                            type="number" 
                            id="customer_cnic" 
                            placeholder="Enter Customer CNIC" 
                            name="customer_cnic" 
                            onChange={handleSalesForm} 
                            value={salesForm.customer_cnic} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="salesperson_cnic" className="required">Salesperson CNIC</label>
                        <input 
                            type="number" 
                            id="salesperson_cnic" 
                            placeholder="Enter Salesperson CNIC" 
                            name="salesperson_cnic" 
                            onChange={handleSalesForm} 
                            value={salesForm.salesperson_cnic} 
                            required 
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="asked_amount" className="required">Asked Amount ($)</label>
                        <input 
                            type="number" 
                            id="asked_amount" 
                            placeholder="Enter Asked Amount" 
                            name="asked_amount" 
                            onChange={handleSalesForm} 
                            value={salesForm.asked_amount} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="given_amount" className="required">Given Amount ($)</label>
                        <input 
                            type="number" 
                            id="given_amount" 
                            placeholder="Enter Given Amount" 
                            name="given_amount" 
                            onChange={handleSalesForm} 
                            value={salesForm.given_amount} 
                            required 
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="payment_method" className="required">Payment Method</label>
                        <select 
                            name="payment_method" 
                            id="payment_method" 
                            value={salesForm.payment_method} 
                            onChange={handleSalesForm} 
                            required
                        >
                            <option value="">Select Payment Method</option>
                            <option value="Card">Credit/Debit Card</option>
                            <option value="Cash">Cash</option>
                            <option value="Check">Bank Check</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="sales_date" className="required">Sale Date</label>
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

                {notOwner && <div className="error-message">You are not authorized to complete this sale.</div>}
                {incorrectDataVariable && <div className="error-message">{incorrectData}</div>}

                <button type="submit">Complete Sale</button>
            </form>
            <Footer />
        </div>
    )
}