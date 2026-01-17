
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import Card from './Card.jsx';
// import './CSSFiles/Explore.css'
// import Navbar from './Homepage/Navbar.jsx'
// import Footer from './Homepage/Footer.jsx'

// export default function Explore(){

//     const [data , setdata] = useState([]);

//     const getData = async ()=>{
//         try {
//             let response = await axios.get("http://localhost:3000/explore" , {withCredentials : true});
//             setdata(response.data);
//             // console.log(response)
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
//             <div className='explore_page'>
//                 {data.length > 0 ? (
//                     data.map((car, index) => (
//                         <Card key={index} car={car} />
//                     ))
//                 ) : (
//                     <p>Loading...</p>
//                 )}
//             </div>
//             <Footer/>
           

//         </>
//     )
// }




import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, Car, RefreshCw } from 'lucide-react'
import Card from './Card.jsx'
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'
import './CSSFiles/Explore.css'

export default function Explore() {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedFilters, setSelectedFilters] = useState({
        manufacturer: 'all',
        carType: 'all',
        priceRange: 'all',
        sortBy: 'newest'
    })
    const [viewMode, setViewMode] = useState('grid')
    const [showFilters, setShowFilters] = useState(false)

    const manufacturers = ['Toyota', 'Honda', 'Suzuki', 'BMW', 'Mercedes', 'Audi', 'Hyundai', 'Kia']
    const carTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Van', 'Truck']
    const priceRanges = [
        { label: 'All Prices', value: 'all' },
        { label: 'Under 20L', value: 'under20' },
        { label: '20L - 50L', value: '20to50' },
        { label: '50L - 1Cr', value: '50to100' },
        { label: 'Above 1Cr', value: 'above100' }
    ]
    const sortOptions = [
        { label: 'Newest First', value: 'newest' },
        { label: 'Price: Low to High', value: 'priceLow' },
        { label: 'Price: High to Low', value: 'priceHigh' },
        { label: 'Name: A to Z', value: 'nameAsc' },
        { label: 'Name: Z to A', value: 'nameDesc' }
    ]

    const getData = async () => {
        setLoading(true)
        setError(null)
        try {
            let response = await axios.get("http://localhost:3000/explore", {
                withCredentials: true,
            })
            
            setData(response.data)
            setFilteredData(response.data)
            
        } catch (error) {
            console.log(error.response?.data?.error || error.message)
            setError('Failed to load vehicles. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    // Filter and sort data when filters change
    useEffect(() => {
        let result = [...data]
        
        // Apply search filter
        if (searchQuery) {
            result = result.filter(car =>
                car.Car_Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                car.Manufacturer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                car.Car_Type?.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }
        
        // Apply manufacturer filter
        if (selectedFilters.manufacturer !== 'all') {
            result = result.filter(car => 
                car.Manufacturer?.toLowerCase() === selectedFilters.manufacturer.toLowerCase()
            )
        }
        
        // Apply car type filter
        if (selectedFilters.carType !== 'all') {
            result = result.filter(car => 
                car.Car_Type?.toLowerCase() === selectedFilters.carType.toLowerCase()
            )
        }
        
        // Apply price range filter
        if (selectedFilters.priceRange !== 'all') {
            result = result.filter(car => {
                const price = car.Price || 0
                switch(selectedFilters.priceRange) {
                    case 'under20': return price < 2000000
                    case '20to50': return price >= 2000000 && price < 5000000
                    case '50to100': return price >= 5000000 && price < 10000000
                    case 'above100': return price >= 10000000
                    default: return true
                }
            })
        }
        
        // Apply sorting
        result.sort((a, b) => {
            switch(selectedFilters.sortBy) {
                case 'priceLow':
                    return (a.Price || 0) - (b.Price || 0)
                case 'priceHigh':
                    return (b.Price || 0) - (a.Price || 0)
                case 'nameAsc':
                    return (a.Car_Name || '').localeCompare(b.Car_Name || '')
                case 'nameDesc':
                    return (b.Car_Name || '').localeCompare(a.Car_Name || '')
                case 'newest':
                default:
                    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
            }
        })
        
        setFilteredData(result)
    }, [data, searchQuery, selectedFilters])

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: value
        }))
    }

    const clearFilters = () => {
        setSelectedFilters({
            manufacturer: 'all',
            carType: 'all',
            priceRange: 'all',
            sortBy: 'newest'
        })
        setSearchQuery('')
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <div className="explore-container">
            <Navbar />
            
            {/* Hero Section */}
            <motion.div 
                className="explore-hero"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="hero-content">
                    <motion.h1 
                        className="hero-title"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Discover Your Perfect Vehicle
                    </motion.h1>
                    <motion.p 
                        className="hero-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Browse our collection of {data.length} premium vehicles
                    </motion.p>
                </div>
                <motion.div 
                    className="hero-stats"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="stat-item">
                        <Car size={24} />
                        <span>{data.length} Vehicles</span>
                    </div>
                    <div className="stat-item">
                        <span>Premium Selection</span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div 
                className="explore-controls"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="controls-top">
                    {/* Search Bar */}
                    <div className="search-container">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, manufacturer, or type..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        {searchQuery && (
                            <button 
                                className="clear-search"
                                onClick={() => setSearchQuery('')}
                                aria-label="Clear search"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    {/* View Toggle */}
                    <div className="view-toggle">
                        <button
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                            aria-label="Grid view"
                        >
                            <Grid size={20} />
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                            aria-label="List view"
                        >
                            <List size={20} />
                        </button>
                    </div>

                    {/* Filter Toggle */}
                    <button
                        className="filter-toggle"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter size={20} />
                        <span>Filters</span>
                    </button>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <motion.div 
                        className="filter-panel"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div className="filter-grid">
                            {/* Manufacturer Filter */}
                            <div className="filter-group">
                                <label className="filter-label">Manufacturer</label>
                                <div className="filter-options">
                                    <button
                                        className={`filter-option ${selectedFilters.manufacturer === 'all' ? 'active' : ''}`}
                                        onClick={() => handleFilterChange('manufacturer', 'all')}
                                    >
                                        All Brands
                                    </button>
                                    {manufacturers.map(brand => (
                                        <button
                                            key={brand}
                                            className={`filter-option ${selectedFilters.manufacturer === brand ? 'active' : ''}`}
                                            onClick={() => handleFilterChange('manufacturer', brand)}
                                        >
                                            {brand}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Car Type Filter */}
                            <div className="filter-group">
                                <label className="filter-label">Car Type</label>
                                <div className="filter-options">
                                    <button
                                        className={`filter-option ${selectedFilters.carType === 'all' ? 'active' : ''}`}
                                        onClick={() => handleFilterChange('carType', 'all')}
                                    >
                                        All Types
                                    </button>
                                    {carTypes.map(type => (
                                        <button
                                            key={type}
                                            className={`filter-option ${selectedFilters.carType === type ? 'active' : ''}`}
                                            onClick={() => handleFilterChange('carType', type)}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range Filter */}
                            <div className="filter-group">
                                <label className="filter-label">Price Range</label>
                                <div className="filter-options">
                                    {priceRanges.map(range => (
                                        <button
                                            key={range.value}
                                            className={`filter-option ${selectedFilters.priceRange === range.value ? 'active' : ''}`}
                                            onClick={() => handleFilterChange('priceRange', range.value)}
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sort Options */}
                            <div className="filter-group">
                                <label className="filter-label">Sort By</label>
                                <div className="filter-options">
                                    {sortOptions.map(option => (
                                        <button
                                            key={option.value}
                                            className={`filter-option ${selectedFilters.sortBy === option.value ? 'active' : ''}`}
                                            onClick={() => handleFilterChange('sortBy', option.value)}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Clear Filters */}
                        <div className="filter-actions">
                            <button
                                className="clear-filters-btn"
                                onClick={clearFilters}
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Main Content */}
            <div className="explore-content">
                {/* Results Count and Stats */}
                <motion.div 
                    className="results-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="results-count">
                        <span className="count-number">{filteredData.length}</span>
                        <span className="count-text">vehicles found</span>
                    </div>
                    {(selectedFilters.manufacturer !== 'all' || selectedFilters.carType !== 'all') && (
                        <div className="active-filters">
                            {selectedFilters.manufacturer !== 'all' && (
                                <span className="active-filter">Manufacturer: {selectedFilters.manufacturer}</span>
                            )}
                            {selectedFilters.carType !== 'all' && (
                                <span className="active-filter">Type: {selectedFilters.carType}</span>
                            )}
                        </div>
                    )}
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading vehicles...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="error-container">
                        <div className="error-icon">⚠️</div>
                        <h3>Something went wrong</h3>
                        <p>{error}</p>
                        <button
                            className="retry-btn"
                            onClick={getData}
                        >
                            <RefreshCw size={16} />
                            <span>Retry</span>
                        </button>
                    </div>
                )}

                {/* No Results */}
                {!loading && !error && filteredData.length === 0 && (
                    <div className="no-results">
                        <Car size={48} className="no-results-icon" />
                        <h3>No vehicles found</h3>
                        <p>Try adjusting your search or filters</p>
                        <button
                            className="clear-filters-btn"
                            onClick={clearFilters}
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}

                {/* Cards Grid/List */}
                {!loading && !error && filteredData.length > 0 && (
                    <motion.div 
                        className={`cards-container ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredData.map((car, index) => (
                            <motion.div
                                key={car._id || index}
                                variants={itemVariants}
                                layout
                            >
                                <Card car={car} viewMode={viewMode} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            <Footer />
        </div>
    )
}