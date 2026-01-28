// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import Card from './Card.jsx';
// import { useParams } from 'react-router-dom';
// import './CSSFiles/ShowSpecificCatagory.css'
// import Navbar from './Homepage/Navbar.jsx'
// import Footer from './Homepage/Footer.jsx'

// export default function ShowSpecificCategory(){
//     let { type } = useParams();
//     const [data , setdata] = useState([]);
//     type = type.replace(":", "");
   

//     const getData = async ()=>{
//         try {
//             let response = await axios.get(`http://localhost:3000/car/category/${type}` , {withCredentials : true});
//             setdata(response.data);
            
//         } catch (error) {
//             console.log(error.response.data.error)
//             console.log(error.response.status) 
//         }
//     }
//     useEffect(()=>{
//         getData();
//     } , [])

//     return(
//         <>
//             <Navbar/>
//             <div className='show_specific_car_catgory'>
//                 {data.length > 0 ? (
//                     data.map((car, index) => (
//                         <Card key={index} car={car} />
//                     ))
//                 ) : (
//                     <p>Loading...</p>
//                 )}
//             </div>
//            <Footer/>

//         </>
//     )
// }





import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, NavLink } from 'react-router-dom'
import Card from './Card.jsx'
import './CSSFiles/ShowSpecificCategory.css'
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'

export default function ShowSpecificCategory() {
    let { type } = useParams()
    // remove colon fron start if present
    type = type.startsWith(':') ? type.substring(1) : type

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState({
        minPrice: '',
        maxPrice: '',
        color: '',
        manufacturer: ''
    })

    const categoryNames = {
        'sedan': 'Sedan',
        'suv': 'SUV',
        'hatchback': 'Hatchback',
        'mini': 'Mini',
        'van': 'Van'
    }

    const getData = async () => {
        try {
            setLoading(true)
            let response = await axios.get(`http://localhost:3000/car/category/${type}`, {
                withCredentials: true
            })
            console.log(response.data)
            setData(response.data)
            setError(null)
        } catch (error) {
            console.error('Error fetching category data:', error)
            setError(`Failed to load ${categoryNames[type] || type} vehicles`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [type])

    // Filter cars based on filter criteria
    const filteredCars = data.filter(car => {
        const matchesMinPrice = !filter.minPrice || car.Price >= parseInt(filter.minPrice)
        const matchesMaxPrice = !filter.maxPrice || car.Price <= parseInt(filter.maxPrice)
        const matchesColor = !filter.color || car.Color?.toLowerCase().includes(filter.color.toLowerCase())
        const matchesManufacturer = !filter.manufacturer || car.Manufacturer?.toLowerCase().includes(filter.manufacturer.toLowerCase())
        
        return matchesMinPrice && matchesMaxPrice && matchesColor && matchesManufacturer
    })

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilter(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const clearFilters = () => {
        setFilter({
            minPrice: '',
            maxPrice: '',
            color: '',
            manufacturer: ''
        })
    }

    const categoryName = categoryNames[type] || type
    const categoryIcon = {
        'sedan': '🚗',
        'suv': '🚙',
        'hatchback': '🚘',
        'mini': '🚗',
        'van': '🚐'
    }[type] || '🚗'

    return (
        <div className='category-container'>
            <Navbar />
            
            <div className='category-content'>
                {/* Hero Section */}
                <div className='category-hero'>
                    <div className='hero-icon'>{categoryIcon}</div>
                    <h1>{categoryName} Vehicles</h1>
                    <p className='hero-subtitle'>
                        Browse our curated selection of {categoryName.toLowerCase()} vehicles. 
                        Find the perfect car that matches your style and needs.
                    </p>
                </div>

                {/* Category Stats */}
                <div className='category-stats'>
                    <div className='stat-card'>
                        <div className='stat-number'>{data.length}</div>
                        <div className='stat-label'>Available {categoryName}s</div>
                    </div>
                    <div className='stat-card'>
                        <div className='stat-number'>
                            ${data.length > 0 ? 
                                Math.min(...data.map(car => car.Price || 0)).toLocaleString() 
                                : '0'}
                        </div>
                        <div className='stat-label'>Starting From</div>
                    </div>
                    <div className='stat-card'>
                        <div className='stat-number'>
                            {new Set(data.map(car => car.Manufacturer)).size}
                        </div>
                        <div className='stat-label'>Brands</div>
                    </div>
                    <div className='stat-card'>
                        <div className='stat-number'>
                            {new Set(data.map(car => car.Color)).size}
                        </div>
                        <div className='stat-label'>Colors</div>
                    </div>
                </div>

                {/* Filters */}
                <div className='category-filters'>
                    <h3>Filter Options</h3>
                    <div className='filter-grid'>
                        <div className='filter-group'>
                            <label>Min Price</label>
                            <input
                                type="number"
                                name="minPrice"
                                placeholder="Min Price"
                                value={filter.minPrice}
                                onChange={handleFilterChange}
                                className='filter-input'
                            />
                        </div>
                        <div className='filter-group'>
                            <label>Max Price</label>
                            <input
                                type="number"
                                name="maxPrice"
                                placeholder="Max Price"
                                value={filter.maxPrice}
                                onChange={handleFilterChange}
                                className='filter-input'
                            />
                        </div>
                        <div className='filter-group'>
                            <label>Color</label>
                            <input
                                type="text"
                                name="color"
                                placeholder="Color"
                                value={filter.color}
                                onChange={handleFilterChange}
                                className='filter-input'
                            />
                        </div>
                        <div className='filter-group'>
                            <label>Manufacturer</label>
                            <input
                                type="text"
                                name="manufacturer"
                                placeholder="Manufacturer"
                                value={filter.manufacturer}
                                onChange={handleFilterChange}
                                className='filter-input'
                            />
                        </div>
                    </div>
                    <div className='filter-actions'>
                        <button onClick={clearFilters} className='btn-clear'>
                            ✕ Clear Filters
                        </button>
                        <div className='filter-results'>
                            Showing {filteredCars.length} of {data.length} vehicles
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className='loading-state'>
                        <div className="loading-spinner"></div>
                        <p>Loading {categoryName} vehicles...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className='error-state'>
                        <p className='error-message'>{error}</p>
                        <button onClick={getData} className='retry-btn'>
                            Try Again
                        </button>
                    </div>
                )}

                {/* Cars Grid */}
                {!loading && !error && (
                    <>
                        <div className='category-header'>
                            <h2>Available {categoryName}s</h2>
                            <p className='category-description'>
                                Explore our selection of premium {categoryName.toLowerCase()} vehicles with various options.
                            </p>
                        </div>

                        {filteredCars.length > 0 ? (
                            <div className='cars-grid'>
                                {filteredCars.map((car) => (
                                    <Card key={car._id} car={car} />
                                ))}
                            </div>
                        ) : (
                            <div className='no-cars'>
                                <div className='no-cars-icon'>🚗</div>
                                <h3>No vehicles found</h3>
                                <p>
                                    {Object.values(filter).some(val => val) ? 
                                        'No vehicles match your filters. Try adjusting your criteria.' :
                                        `No ${categoryName.toLowerCase()} vehicles available at the moment.`
                                    }
                                </p>
                                {Object.values(filter).some(val => val) && (
                                    <button onClick={clearFilters} className='btn-primary'>
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Category Info */}
                        <div className='category-info'>
                            <h3>About {categoryName}s</h3>
                            <div className='info-content'>
                                <div className='info-text'>
                                    <p>
                                        {categoryName}s are known for their {
                                            type === 'sedan' ? 'comfort, luxury, and spacious interiors.' :
                                            type === 'suv' ? 'versatility, off-road capability, and family-friendly features.' :
                                            type === 'hatchback' ? 'practicality, fuel efficiency, and compact design.' :
                                            type === 'mini' ? 'compact size, excellent maneuverability, and city-friendly features.' :
                                            type === 'van' ? 'spacious interiors, versatility, and family-oriented design.' :
                                            'unique features and benefits.'
                                        }
                                    </p>
                                    <p>
                                        Our {categoryName.toLowerCase()} selection includes vehicles from top manufacturers, 
                                        ensuring quality, reliability, and performance for every need.
                                    </p>
                                </div>
                                <div className='info-features'>
                                    <div className='feature'>
                                        <span className='feature-icon'>⭐</span>
                                        <h4>Quality Assurance</h4>
                                        <p>Thoroughly inspected vehicles</p>
                                    </div>
                                    <div className='feature'>
                                        <span className='feature-icon'>🛡️</span>
                                        <h4>Warranty</h4>
                                        <p>Comprehensive warranty options</p>
                                    </div>
                                    <div className='feature'>
                                        <span className='feature-icon'>💰</span>
                                        <h4>Financing</h4>
                                        <p>Flexible payment plans available</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Back to Explore */}
                        <div className='back-to-explore'>
                            <NavLink to="/explore" className='btn-explore'>
                                ← Back to All Categories
                            </NavLink>
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </div>
    )
}