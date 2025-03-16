
import personImage from './assets/human_image.jpeg'
import { NavLink } from 'react-router-dom';
import './CSSFiles/EmployeeCard.css'
export default function EmployeeCard({employee}){
    // console.log(employee._id);
    return(
        <NavLink to={`/aboutus/${employee._id}`}><div className='employee_card'>
            <img className='card_img' src={personImage} alt="person Image" />
            <h3>{employee.First_Name} {employee.Last_Name}</h3>
            <h4>{employee.Designation}</h4>
            
        </div></NavLink>
    )
}