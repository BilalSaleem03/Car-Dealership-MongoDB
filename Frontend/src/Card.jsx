
import carImage from './assets/car_image.jpeg'
import { NavLink } from 'react-router-dom';
import './CSSFiles/Card.css'
export default function Card({car}){
    return(
        <NavLink to={`/category/car/${car._id}`}><div className='card'>
            <img className='card_img' src={carImage} alt="car Image" />
            <h3 className='car_name'>{car.Car_Name}</h3>
            <ul>
                <li>Manufacturer: {car.Manufacturer}</li>
                <li>Colour: {car.Colour}</li>
                <li>Model: {car.Model_Number}</li>
                <li>Car Type: {car.Car_Type}</li>
                <li>Engine: {car.Engine_Type}</li>
                <li>Price: PKR{car.Price}/-</li>
                <li>Post Owner: {car.Car_Owner}/-</li>
            </ul>
            
        </div></NavLink>
    )
}