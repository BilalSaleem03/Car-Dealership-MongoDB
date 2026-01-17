// import mini_car from '../assets/mini-car.jpg'
// import sadan_car from '../assets/sadan-car.jpg'
// import suv_car from '../assets/suv-car.jpg'
// import family_car from '../assets/family-car.jpg'
// import van_car from '../assets/van-car.jpg'
// import './Homepage.css'
// import { NavLink } from 'react-router-dom';

// export default function Screen2(){
//     return(
//         <>
//             <div className='catagoriesScreen'>
//                 <div className="vehicle-container">
//                     <img className='vehicle' src={mini_car} alt="mini_car" />
//                     <NavLink to="/car/category/:Mini"><button>MINI</button></NavLink>
//                 </div>
//                 <div className="vehicle-container">
//                     <img className='vehicle' src={sadan_car} alt="sadan_car" />
//                     <NavLink to="/car/category/:Sedan"><button>SEDAN</button></NavLink>
//                 </div>
//                 <div className="vehicle-container">
//                     <img className='vehicle' src={suv_car} alt="suv_car" />
//                     <NavLink to="/car/category/:SUV"><button>SUV</button></NavLink>
//                 </div>
//                 <div className="vehicle-container">
//                     <img className='vehicle' src={family_car} alt="family_car" />
//                     <NavLink to="/car/category/:Hatchback"><button>Hatchback</button></NavLink>
//                 </div>
//                 <div className="vehicle-container">
//                     <img className='vehicle' src={van_car} alt="van_car" />
//                     <NavLink to="/car/category/:Van"><button>VAN</button></NavLink>
//                 </div>
//             </div>
//             <div className='forms'>
                
//                 <NavLink className='NavLink' to="/employeeForm">Employee Form</NavLink>
//                 <NavLink className='NavLink' to="/customerForm">Customer Form</NavLink>
//                 <NavLink className='NavLink' to="/carForm">Car Form</NavLink>
//             </div>
//         </>
//     )
// }




import { motion } from 'framer-motion';
import { ArrowRight, Users, Car, Truck } from 'lucide-react';
import mini_car from '../assets/mini-car.jpg';
import sadan_car from '../assets/sadan-car.jpg';
import suv_car from '../assets/suv-car.jpg';
import family_car from '../assets/family-car.jpg';
import van_car from '../assets/van-car.jpg';
import './Screen2.css';
import { NavLink } from 'react-router-dom';

const categories = [
    { 
        image: mini_car, 
        label: "MINI", 
        path: "/car/category/:Mini",
        icon: <Car size={20} />,
        description: "Compact & Efficient"
    },
    { 
        image: sadan_car, 
        label: "SEDAN", 
        path: "/car/category/:Sedan",
        icon: <Car size={20} />,
        description: "Luxury & Comfort"
    },
    { 
        image: suv_car, 
        label: "SUV", 
        path: "/car/category/:SUV",
        icon: <Car size={20} />,
        description: "Adventure Ready"
    },
    { 
        image: family_car, 
        label: "HATCHBACK", 
        path: "/car/category/:Hatchback",
        icon: <Users size={20} />,
        description: "Family Friendly"
    },
    { 
        image: van_car, 
        label: "VAN", 
        path: "/car/category/:Van",
        icon: <Truck size={20} />,
        description: "Spacious & Versatile"
    },
];

export default function Screen2() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <section className="categories-section">
                <div className="section-header">
                    <motion.h2 
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Browse by Category
                    </motion.h2>
                    <motion.p 
                        className="section-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Find your perfect vehicle from our curated categories
                    </motion.p>
                </div>

                <motion.div 
                    className='categories-container'
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {categories.map((category, index) => (
                        <motion.div 
                            key={category.label} 
                            className="category-card-wrapper"
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                        >
                            <NavLink to={category.path} className="category-link">
                                <motion.div 
                                    className="category-card"
                                    whileHover={{ 
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                                    }}
                                >
                                    <div className="category-image-container">
                                        <motion.img 
                                            className='category-image' 
                                            src={category.image} 
                                            alt={category.label}
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                        />
                                        <div className="category-overlay" />
                                    </div>
                                    
                                    <div className="category-content">
                                        <div className="category-icon">
                                            {category.icon}
                                        </div>
                                        <h3 className="category-label">{category.label}</h3>
                                        <p className="category-description">{category.description}</p>
                                        
                                        <motion.div 
                                            className="category-cta"
                                            whileHover={{ x: 5 }}
                                        >
                                            <span>Explore</span>
                                            <ArrowRight size={16} />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </NavLink>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Forms Section */}
                <motion.div 
                    className='forms-section'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="forms-header">
                        <h3>Quick Access</h3>
                        <p>Direct links to important forms</p>
                    </div>
                    
                    <div className="forms-grid">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <NavLink className='form-link employee-form' to="/employeeForm">
                                <span>Employee Form</span>
                                <ArrowRight size={18} />
                            </NavLink>
                        </motion.div>
                        
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <NavLink className='form-link customer-form' to="/customerForm">
                                <span>Customer Form</span>
                                <ArrowRight size={18} />
                            </NavLink>
                        </motion.div>
                        
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <NavLink className='form-link car-form' to="/carForm">
                                <span>Car Form</span>
                                <ArrowRight size={18} />
                            </NavLink>
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </>
    );
}