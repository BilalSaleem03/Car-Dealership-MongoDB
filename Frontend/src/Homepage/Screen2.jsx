import mini_car from '../assets/mini-car.jpg'
import sadan_car from '../assets/sadan-car.jpg'
import suv_car from '../assets/suv-car.jpg'
import family_car from '../assets/family-car.jpg'
import van_car from '../assets/van-car.jpg'
import './Homepage.css'
import { NavLink } from 'react-router-dom';

export default function Screen2(){
    return(
        <>
            <div className='catagoriesScreen'>
                <div className="vehicle-container">
                    <img className='vehicle' src={mini_car} alt="mini_car" />
                    <NavLink to="/car/category/:Mini"><button>MINI</button></NavLink>
                </div>
                <div className="vehicle-container">
                    <img className='vehicle' src={sadan_car} alt="sadan_car" />
                    <NavLink to="/car/category/:Sedan"><button>SEDAN</button></NavLink>
                </div>
                <div className="vehicle-container">
                    <img className='vehicle' src={suv_car} alt="suv_car" />
                    <NavLink to="/car/category/:SUV"><button>SUV</button></NavLink>
                </div>
                <div className="vehicle-container">
                    <img className='vehicle' src={family_car} alt="family_car" />
                    <NavLink to="/car/category/:Hatchback"><button>Hatchback</button></NavLink>
                </div>
                <div className="vehicle-container">
                    <img className='vehicle' src={van_car} alt="van_car" />
                    <NavLink to="/car/category/:Van"><button>VAN</button></NavLink>
                </div>
            </div>
            <div className='forms'>
                
                <NavLink className='NavLink' to="/employeeForm">Employee Form</NavLink>
                <NavLink className='NavLink' to="/customerForm">Customer Form</NavLink>
                <NavLink className='NavLink' to="/carForm">Car Form</NavLink>
            </div>
        </>
    )
}