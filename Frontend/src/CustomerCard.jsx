import personImage from './assets/human_image.jpeg'
import { NavLink } from 'react-router-dom';
import './CSSFiles/CustomerCard.css'
export default function CustomerCard({customer}){
    // console.log(employee.Employee_id);
    return(
        <NavLink to={`/customer/${customer._id}`} className="navlink">
            <div className='customer_card'>
                <img src={customer.Image?.url || personImage} alt="person Image" />
                <h3>{customer.First_Name} {customer.Last_Name}</h3>
                <h4>Contact: {customer.Phone_Number}</h4>
            </div>
        </NavLink>
    )
}