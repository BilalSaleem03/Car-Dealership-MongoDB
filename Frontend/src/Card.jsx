
// import carImage from './assets/car_image.jpeg'
// import { NavLink } from 'react-router-dom';
// import './CSSFiles/Card.css'
// export default function Card({car}){
//     return(
//         <NavLink to={`/category/car/${car._id}`}><div className='card'>
//             <img className='card_img' src={car.Image?.url || carImage} alt="car Image" />
//             <h3 className='car_name'>{car.Car_Name}</h3>
//             <ul>
//                 <li>Manufacturer: {car.Manufacturer}</li>
//                 <li>Colour: {car.Colour}</li>
//                 <li>Model: {car.Model_Number}</li>
//                 <li>Car Type: {car.Car_Type}</li>
//                 <li>Engine: {car.Engine_Type}</li>
//                 <li>Price: PKR{car.Price}/-</li>
//                 <li>Post Owner: {car.Car_Owner}/-</li>
//             </ul>
            
//         </div></NavLink>
//     )
// }

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
    Car, Fuel, Users, Settings, Calendar, 
    MapPin, DollarSign, ChevronRight, Heart, Eye
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import carImage from './assets/car_image.jpeg'
import './CSSFiles/Card.css'

export default function Card({ car, viewMode = 'grid' }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    const formatPrice = (price) => {
        if (!price) return 'Price on request'
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: 'PKR',
            maximumFractionDigits: 0
        }).format(price)
    }

    const getYearFromDate = (dateString) => {
        if (!dateString) return 'N/A'
        return new Date(dateString).getFullYear()
    }

    const handleFavoriteClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsFavorite(!isFavorite)
        // TODO: Add to favorites API call
    }

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                duration: 0.4,
                type: "spring",
                stiffness: 100
            }
        },
        hover: {
            y: -10,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            transition: {
                duration: 0.3,
                type: "spring",
                stiffness: 200
            }
        }
    }

    const imageVariants = {
        hidden: { scale: 1.1, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.4
            }
        }
    }

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.4,
                delay: 0.1
            }
        }
    }

    const features = [
        { icon: <Fuel size={16} />, text: car.Engine_Type || 'Petrol' },
        { icon: <Users size={16} />, text: `${car.Seats || 5} Seats` },
        { icon: <Settings size={16} />, text: car.Transmission || 'Automatic' },
        { icon: <Calendar size={16} />, text: getYearFromDate(car.Model_Year || car.createdAt) }
    ]

    const isGridView = viewMode === 'grid'

    return (
        <NavLink to={`/category/car/${car._id}`} className="card-link">
            <motion.div 
                className={`card ${isGridView ? 'card-grid' : 'card-list'}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container */}
                <div className="card-image-container">
                    {/* Image Loading Placeholder */}
                    {!imageLoaded && (
                        <div className="image-placeholder">
                            <div className="placeholder-spinner"></div>
                        </div>
                    )}

                    {/* Main Image */}
                    <motion.img 
                        className={`card-image ${imageLoaded ? 'loaded' : 'loading'}`}
                        src={car.Image?.url || carImage}
                        alt={car.Car_Name || 'Car Image'}
                        variants={imageVariants}
                        onLoad={() => setImageLoaded(true)}
                    />

                    {/* Overlay on Hover */}
                    {isHovered && (
                        <motion.div 
                            className="image-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="overlay-content">
                                <motion.button 
                                    className="quick-view-btn"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Eye size={18} />
                                    <span>Quick View</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Badges */}
                    <div className="card-badges">
                        {car.Car_Type && (
                            <motion.span 
                                className="type-badge"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {car.Car_Type}
                            </motion.span>
                        )}
                        
                        {car.Price && (
                            <motion.span 
                                className="price-badge"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {formatPrice(car.Price).replace('PKR', 'PKR ')}
                            </motion.span>
                        )}
                    </div>

                    {/* Favorite Button */}
                    <motion.button 
                        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                        onClick={handleFavoriteClick}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                    </motion.button>
                </div>

                {/* Content */}
                <motion.div 
                    className="card-content"
                    variants={contentVariants}
                >
                    {/* Header */}
                    <div className="card-header">
                        <motion.div 
                            className="manufacturer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Car size={16} />
                            <span>{car.Manufacturer || 'Unknown Brand'}</span>
                        </motion.div>
                        <h3 className="car-name">
                            {car.Car_Name || 'Unnamed Vehicle'}
                        </h3>
                    </div>

                    {/* Features Grid */}
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <motion.div 
                                key={index}
                                className="feature-item"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 * (index + 1) }}
                                whileHover={{ scale: 1.05 }}
                            >
                                {feature.icon}
                                <span>{feature.text}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Details List - Only in Grid View */}
                    {isGridView && (
                        <motion.div 
                            className="details-list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="detail-item">
                                <MapPin size={14} />
                                <span>Color: {car.Colour || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                                <DollarSign size={14} />
                                <span>Model: {car.Model_Number || 'N/A'}</span>
                            </div>
                        </motion.div>
                    )}

                    {/* Owner Info - Only in List View */}
                    {!isGridView && car.Car_Owner && (
                        <motion.div 
                            className="owner-info"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="owner-label">Posted by:</div>
                            <div className="owner-name">{car.Car_Owner}</div>
                        </motion.div>
                    )}

                    {/* Footer */}
                    <div className="card-footer">
                        <motion.div 
                            className="view-details"
                            whileHover={{ x: 5 }}
                        >
                            <span>View Details</span>
                            <ChevronRight size={16} />
                        </motion.div>
                        
                        {isGridView && car.Car_Owner && (
                            <div className="owner-tag">
                                <span>Posted by {car.Car_Owner}</span>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Gradient Border Effect */}
                <div className="card-gradient-border"></div>
            </motion.div>
        </NavLink>
    )
}