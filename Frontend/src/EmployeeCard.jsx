
// import personImage from './assets/human_image.jpeg'
// import { NavLink } from 'react-router-dom';
// import './CSSFiles/EmployeeCard.css'
// export default function EmployeeCard({employee}){
//     // console.log(employee._id);
//     return(
//         <NavLink to={`/aboutus/${employee._id}`} className="navlink">
//             <div className='employee_card' >
//                 <img className='card_img' src={employee.Image?.url || personImage} alt="person Image" />
//                 <h3>{employee.First_Name} {employee.Last_Name}</h3>
//                 <h4>{employee.Designation}</h4>
//             </div>
//         </NavLink>
//     )
// }




import personImage from './assets/human_image.jpeg'
import { NavLink } from 'react-router-dom'
import './CSSFiles/EmployeeCard.css'

export default function EmployeeCard({ employee }) {
    return (
        <NavLink to={`/aboutus/${employee._id}`} className="employee-card-link">
            <div className='employee-card'>
                <div className='employee-image-container'>
                    <img 
                        className='employee-image' 
                        src={employee.Image?.url || personImage} 
                        alt={`${employee.First_Name} ${employee.Last_Name}`}
                        onError={(e) => {
                            e.target.src = personImage
                        }}
                    />
                    <div className='employee-overlay'>
                        <span className='view-profile'>View Profile →</span>
                    </div>
                </div>
                
                <div className='employee-info'>
                    <h3 className='employee-name'>
                        {employee.First_Name} {employee.Last_Name}
                    </h3>
                    <h4 className='employee-designation'>
                        {employee.Designation}
                    </h4>
                    <p className='employee-email'>
                        {employee.Email_Address || 'contact@dealership.com'}
                    </p>
                </div>

                <div className='employee-cta'>
                    <span className='cta-text'>Learn More</span>
                </div>
            </div>
        </NavLink>
    )
}