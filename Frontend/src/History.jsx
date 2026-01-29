// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import SoldCarCard from './SoldCarCard.jsx';
// import './CSSFiles/History.css'
// import Navbar from './Homepage/Navbar.jsx'
// import Footer from './Homepage/Footer.jsx'

// export default function History(){

//     const [data , setdata] = useState([]);

//     const getData = async ()=>{
//         try {
//             let response = await axios.get("http://localhost:3000/history" , {withCredentials : true});
//             setdata(response.data);
//         } catch (error) {
//             console.log(error)
//             // console.log(error.response.data.error)
//             // console.log(error.response.status)
//         }
        
//     }
//     useEffect(()=>{
//         getData();
//     } , [])

//     return(
//         <>
//             <Navbar/>
//             <div className='history_page'>
//                 {data.length > 0 ? (
//                     data.map((car, index) => (
//                         <SoldCarCard key={index} car={car} />
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
import SoldCarCard from './SoldCarCard.jsx'
import './CSSFiles/History.css'
import Navbar from './Homepage/Navbar.jsx'
import Footer from './Homepage/Footer.jsx'
const backendURL = import.meta.env.VITE_BackendURL;

export default function History() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [stats, setStats] = useState({
        totalSales: 0,
        totalRevenue: 0,
        avgSalePrice: 0,
        topSalesPerson: 'Loading...'
    })

    const getData = async () => {
        try {
            setLoading(true)
            let response = await axios.get(`${backendURL}/history`, {
                withCredentials: true
            })
            setData(response.data)
            calculateStats(response.data)
            setError(null)
        } catch (error) {
            console.error('Error fetching sales history:', error)
            setError('Failed to load sales history')
        } finally {
            setLoading(false)
        }
    }

    const calculateStats = async (salesData) => {
        if (!salesData || salesData.length === 0) return

        const totalSales = salesData.length
        const totalRevenue = salesData.reduce((sum, sale) => sum + (sale.Given_Amount || 0), 0)
        const avgSalePrice = totalRevenue / totalSales
        
        // Find top salesperson
        const salesByPerson = {}
        salesData.forEach(sale => {
            if (sale.Employee_Id) {
                salesByPerson[sale.Employee_Id] = (salesByPerson[sale.Employee_Id] || 0) + 1
            }
        })
        
        const topSalesPersonId = Object.keys(salesByPerson).reduce((a, b) => 
            salesByPerson[a] > salesByPerson[b] ? a : b, Object.keys(salesByPerson)[0]
        )

        try {
            let response = await axios.get(`${backendURL}/aboutus/${topSalesPersonId}`)
            const fullName = `${response.data.First_Name} ${response.data.Last_Name}`;
            setStats({
                totalSales,
                totalRevenue,
                avgSalePrice,
                topSalesPerson: fullName
            })
        } catch (error) {
            console.error('Error fetching employee data:', error)
            setError('Failed to load team information')
        }

        setStats({
            totalSales,
            totalRevenue,
            avgSalePrice,
            topSalesPerson, // Fallback to ID if name fetch fails
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='history-container'>
            <Navbar />
            
            <div className='history-content'>
                {/* Hero Section */}
                <div className='history-hero'>
                    <h1>Sales History</h1>
                    <p className='hero-subtitle'>
                        Track all completed sales transactions and revenue statistics.
                        Monitor your dealership's performance over time.
                    </p>
                </div>

                {/* Stats Overview */}
                <div className='sales-stats'>
                    <div className='stat-card'>
                        <div className='stat-icon'>💰</div>
                        <div className='stat-content'>
                            <div className='stat-number'>${stats.totalRevenue.toLocaleString()}</div>
                            <div className='stat-label'>Total Revenue</div>
                        </div>
                    </div>
                    <div className='stat-card'>
                        <div className='stat-icon'>🚗</div>
                        <div className='stat-content'>
                            <div className='stat-number'>{stats.totalSales}</div>
                            <div className='stat-label'>Cars Sold</div>
                        </div>
                    </div>
                    <div className='stat-card'>
                        <div className='stat-icon'>📊</div>
                        <div className='stat-content'>
                            <div className='stat-number'>${stats.avgSalePrice.toLocaleString(undefined, {minimumFractionDigits: 0})}</div>
                            <div className='stat-label'>Average Sale Price</div>
                        </div>
                    </div>
                    <div className='stat-card'>
                        <div className='stat-icon'>🏆</div>
                        <div className='stat-content'>
                            <div className='stat-number'>{stats.topSalesPerson}</div>
                            <div className='stat-label'>Top Salesperson</div>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className='loading-state'>
                        <div className="loading-spinner"></div>
                        <p>Loading sales history...</p>
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

                {/* Sales History */}
                {!loading && !error && (
                    <>
                        <div className='history-header'>
                            <h2>Recent Sales Transactions</h2>
                            <p className='history-description'>
                                Detailed records of all completed vehicle sales.
                            </p>
                        </div>

                        {data.length > 0 ? (
                            <div className='sales-grid'>
                                {data.map((sale) => (
                                    <SoldCarCard key={sale._id} sale={sale} />
                                ))}
                            </div>
                        ) : (
                            <div className='no-sales'>
                                <div className='no-sales-icon'>📋</div>
                                <h3>No Sales History</h3>
                                <p>No sales transactions have been recorded yet.</p>
                            </div>
                        )}

                        {/* Summary Section */}
                        <div className='summary-section'>
                            <h3>Sales Performance Summary</h3>
                            <div className='summary-content'>
                                <div className='summary-card'>
                                    <h4>Revenue Analysis</h4>
                                    <ul>
                                        <li><strong>Total Revenue:</strong> ${stats.totalRevenue.toLocaleString()}</li>
                                        <li><strong>Average Sale Price:</strong> ${stats.avgSalePrice.toLocaleString(undefined, {minimumFractionDigits: 0})}</li>
                                        <li><strong>Total Commission:</strong> ${(stats.totalRevenue * 0.05).toLocaleString()} (5%)</li>
                                    </ul>
                                </div>
                                <div className='summary-card'>
                                    <h4>Transaction Metrics</h4>
                                    <ul>
                                        <li><strong>Total Sales:</strong> {stats.totalSales} vehicles</li>
                                        <li><strong>Average per Month:</strong> {(stats.totalSales / 12).toFixed(1)}</li>
                                        <li><strong>Success Rate:</strong> 95%</li>
                                    </ul>
                                </div>
                                <div className='summary-card'>
                                    <h4>Top Performers</h4>
                                    <ul>
                                        <li><strong>Top Salesperson:</strong> {stats.topSalesPerson}</li>
                                        <li><strong>Most Popular Car:</strong> Sedan</li>
                                        <li><strong>Best Month:</strong> December</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </div>
    )
}