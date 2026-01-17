// import personImage from './assets/human_image.jpeg'
// import { NavLink } from 'react-router-dom';
// import './CSSFiles/CustomerCard.css'
// export default function CustomerCard({customer}){
//     // console.log(employee.Employee_id);
//     return(
//         <NavLink to={`/customer/${customer._id}`} className="navlink">
//             <div className='customer_card'>
//                 <img src={customer.Image?.url || personImage} alt="person Image" />
//                 <h3>{customer.First_Name} {customer.Last_Name}</h3>
//                 <h4>Contact: {customer.Phone_Number}</h4>
//             </div>
//         </NavLink>
//     )
// }



import personImage from './assets/human_image.jpeg'
import { NavLink } from 'react-router-dom'
import './CSSFiles/CustomerCard.css'

export default function CustomerCard({ customer }) {
    const formatPhone = (phone) => {
        if (!phone) return 'Not provided'
        const phoneStr = String(phone)
        return phoneStr.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    }

    const formatCNIC = (cnic) => {
        if (!cnic) return 'Not provided'
        const cnicStr = String(cnic)
        return cnicStr.length > 5 ? `${cnicStr.substring(0, 5)}...` : cnicStr
    }

    const formatAddress = (address) => {
        if (!address) return ''
        const addressStr = String(address)
        return addressStr.length > 20 ? `${addressStr.substring(0, 20)}...` : addressStr
    }

    return (
        <NavLink to={`/customer/${customer._id}`} className="customer-card-link">
            <div className='customer-card'>
                <div className='customer-image-container'>
                    <img 
                        src={customer.Image?.url || personImage} 
                        alt={`${customer.First_Name} ${customer.Last_Name}`}
                        className='customer-image'
                        onError={(e) => {
                            e.target.src = personImage
                        }}
                    />
                    <div className='customer-overlay'>
                        <span className='view-profile'>View Details →</span>
                    </div>
                </div>
                
                <div className='customer-info'>
                    <h3 className='customer-name'>
                        {customer.First_Name} {customer.Last_Name}
                    </h3>
                    
                    <div className='customer-contact'>
                        <div className='contact-item'>
                            <span className='contact-icon'>📱</span>
                            <span className='contact-text'>{formatPhone(customer.Phone_Number)}</span>
                        </div>
                        <div className='contact-item'>
                            <span className='contact-icon'>📧</span>
                            <span className='contact-text'>{customer.Email_Address || 'No email'}</span>
                        </div>
                    </div>

                    <div className='customer-meta'>
                        <span className='meta-item'>
                            <span className='meta-icon'>🆔</span>
                            <span className='meta-text'>CNIC: {formatCNIC(customer.CNIC)}</span>
                        </span>
                        {customer.Address && (
                            <span className='meta-item'>
                                <span className='meta-icon'>📍</span>
                                <span className='meta-text'>{formatAddress(customer.Address)}</span>
                            </span>
                        )}
                    </div>
                </div>

                <div className='customer-cta'>
                    <span className='cta-text'>View Full Profile</span>
                </div>
            </div>
        </NavLink>
    )
}