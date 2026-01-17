// // import Screen1Image from '../assets/screen1image.jpg'
// // import Screen1Image2 from '../assets/screen1image2.jpg'
// import Screen1Image from '../assets/newScreen4.jpg'
// import Screen1Image2 from '../assets/newScreen6.jpg'
// import './Homepage.css'
// import Navbar from './Navbar'
// import personalPageBg from '../videos/personal_Page_bg.mp4'

// export default function Screen1(){
//     return(
//         <>
//             <div className='screen1'>
//                 <Navbar/>
//                 {/* <video className='screen1Image' src={personalPageBg} autoPlay></video> */}
//                 <img className='screen1Image' src={Screen1Image} alt="screen" />
//                 <img className='screen1Image2' src={Screen1Image2} alt="screen" />
//                 <p className='screenText'>“Passion in every turn, precision in every mile.”</p>
//             </div>
//         </>
        
//     )
// }




import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Screen1Image from '../assets/newScreen4.jpg';
import Screen1Image2 from '../assets/newScreen6.jpg';
import './Screen1.css';
import Navbar from './Navbar';

export default function Screen1() {
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 }
    };

    return (
        <>
            <section className='screen1'>
                <Navbar />
                
                {/* Background Images with Parallax */}
                <div className="hero-background">
                    <motion.img 
                        className='screen1Image' 
                        src={Screen1Image} 
                        alt="luxury car background"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                    />
                    
                    <motion.img 
                        className='screen1Image2' 
                        src={Screen1Image2} 
                        alt="car interior"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                </div>

                {/* Gradient Overlay */}
                <div className="hero-overlay" />

                {/* Hero Content */}
                <div className="hero-content">
                    <motion.h1 
                        className="hero-title"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Drive Your Dream
                    </motion.h1>
                    
                    <motion.p 
                        className='screenText'
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        "Passion in every turn, precision in every mile."
                    </motion.p>

                    <motion.div 
                        className="hero-buttons"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.button 
                            className="primary-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Explore Inventory
                        </motion.button>
                        <motion.button 
                            className="secondary-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Book Test Drive
                        </motion.button>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div 
                    className="scroll-indicator"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <ChevronDown className="scroll-icon" size={24} />
                </motion.div>
            </section>
        </>
    );
}