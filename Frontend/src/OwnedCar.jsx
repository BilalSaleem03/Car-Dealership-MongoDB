import carImage from './assets/car_image.jpeg'
import './CSSFiles/OwnedCar.css'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function OwnedCar({car}){
    let navigate = useNavigate();
    const deleteCar =async ()=>{
        try {
            let response = await axios.delete(`http://localhost:3000/car/delete/${car._id}` , {withCredentials : true})
            navigate('/explore')
        } catch (error) {
            if(error.response.status == 401){
                navigate('/login')
            } else if(error.response.status == 403){
                handleNotOwner()
            }
             else{
                console.log("some other error")
                console.log(error)
            }
        }
    }
    return(
        <div className="one-car">
            <img className='card_img' src={car.Image?.url || carImage} alt="car Image" />
            <ul className='list'>
                <li>Car name: {car.Car_Name}</li>
                <li>Manufacturer: {car.Manufacturer}</li>
                <li>Color: {car.Color}</li>
                <li>Model: {car.Model_Number}</li>
                <li>Car Type: {car.Car_Type}</li>
                <li>Engine: {car.Engine_Type}</li>
                <li>Mileage: {car.Mileage}</li>
                <li>Engine# {car.Engine_Number}</li>
                <li>Condition: {car.Accidental?"Accidental" : "Not Accidental"}</li>
                <li>PKR {car.Price}/-</li>
                <li>Post Owner: {car.Car_Owner}</li>
            </ul>
            <div className="btns">
                <NavLink className="navlink" to={`/car/buy/${car._id}`}><button className='buy_btn'>Buy Car</button></NavLink>
                <NavLink className="navlink" to={`/car/update/${car._id}`}><button className='buy_btn'>Update Info</button></NavLink>
                <button onClick={deleteCar}>Delete</button>
            </div>
        </div>
    )
}