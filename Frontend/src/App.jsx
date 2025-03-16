
import Screen1 from './Homepage/Screen1.jsx'
import Screen2 from './Homepage/Screen2.jsx'
import Footer from './Homepage/Footer.jsx'
import EmployeeForm from './EmployeeForm.jsx'
import CarForm from './CarForm.jsx'
import CustomerForm from './CustomerForm.jsx'
import Explore from './Explore.jsx'
import ShowSpecificCategory from './ShowSpecificCategory.jsx'
import OneCar from './OneCar.jsx'
import Aboutus from './Aboutus.jsx'
import OneEmployee from './OneEmployee.jsx'
import Customers from './Customers.jsx'
import OneCustomer from './OneCustomer.jsx'
import BuyCar from './BuyCar.jsx'
import History from './History.jsx'
import LogIn from './Homepage/LogIn.jsx'
import SignUp from './Homepage/SignUp.jsx'
import PersonalPage from './PersonalPage.jsx'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

export default function App(){
    const router = createBrowserRouter([
        {
            path:'/',    
            
            element:<><Screen1/>
            <Screen2/>
            <Footer/></>
        },
        {
            path:'/explore',     
            element:<><Explore/>
            </>
        },
        {
            path:'/car/category/:type',   
            element:<><ShowSpecificCategory/>
            </>
        },
        {
            path:'/category/car/:id',   
            element:<><OneCar/>
            </>
        },
        {
            path:'/car/buy/:id',       
            element:<><BuyCar/>
            </>
        },
        {
            path:'/aboutus',                   
            element:<Aboutus/>
        },
        {
            path:'/aboutus/:id',             
            element:<OneEmployee/>
        },
        {
            path:'/customer',               
            element:<Customers/>
        },
        {
            path:'/customer/:id',           
            element:<OneCustomer/>
        },
        {
            path:'/history',             
            element:<History/>
        },
        {
            path : '/employeeform',    
            element:<EmployeeForm/>
        },
        {
            path : '/carform',         
            element:<CarForm/>
        },
        {
            path : '/customerform',       
            element:<CustomerForm/>
        },
        {
            path : '/customer/update/:id',        
            element:<CustomerForm/>
        },
        {
            path : '/employee/update/:id',        
            element:<EmployeeForm/>
        },
        {
            path : '/car/update/:id',            
            element:<CarForm/>
        },
        {
            path : "/login",
            element:<LogIn/>
        },
        {
            path : "/signup",
            element : <SignUp/>
        },
        {
            path: "/personal",
            element: <PersonalPage/>
        }

    ])
    return(
        <>
            
            <RouterProvider router={router}/>

        </>
    )
}