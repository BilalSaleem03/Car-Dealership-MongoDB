// import Companylogo from '../assets/logo.png'
// import Pakflag from '../assets/PakFlag.jpg'
// import Usaflag from '../assets/UsaFlag.jpg'
// import Youtube from '../assets/youtube.svg'
// import Instagram from '../assets/instagram.svg'
// import Facebook from '../assets/facebook.svg'
// import Twitter from '../assets/twitter.svg'
// import './Homepage.css'

// export default function Footer(){
//     return(
//         <>
//             <div className="footer">
//                 <div className="row1">
//                     {/* <img className='footer-flags' src={Pakflag} alt="PakFlag" /> */}
//                     <img className='footer-flags' src={Companylogo} alt="logo" />
//                     {/* <img className='footer-flags' src={Usaflag} alt="UsaFlag" /> */}
//                 </div>
//                 <div className="row2">
//                     <p>“Innovation that moves you.”</p>
//                 </div>
//                 <div className="row3">
//                     <a href="/about">About</a>
//                     <a href="/privacy">Privacy</a>
//                     <a href="/Terms">Terms & conditions</a>
//                     <a href="/contact">Contact us</a>
//                 </div>
//                 <div className="row4">
//                     <img className='social-media-logo' src={Youtube} alt="Youtube" />
//                     <img className='social-media-logo' src={Instagram} alt="Instagram" />
//                     <img className='social-media-logo' src={Facebook} alt="Facebook" />
//                     <img className='social-media-logo' src={Twitter} alt="Twitter" />
//                 </div>
//             </div>
//         </>
//     )
// }





import { motion } from 'framer-motion';
import { 
    Youtube, 
    Instagram, 
    Facebook, 
    Twitter, 
    Mail, 
    Phone, 
    MapPin,
    ArrowUpRight
} from 'lucide-react';
import Companylogo from '../assets/logo.png';
import YoutubeIcon from '../assets/youtube.svg';
import InstagramIcon from '../assets/instagram.svg';
import FacebookIcon from '../assets/facebook.svg';
import TwitterIcon from '../assets/twitter.svg';
import './Footer.css';

const socialLinks = [
    { icon: <Youtube size={20} />, href: "#", label: "YouTube" },
    { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
    { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
];

const footerLinks = [
    { label: "About", href: "/about" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms & conditions", href: "/terms" },
    { label: "Contact us", href: "/contact" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            {/* Top Section */}
            <div className="footer-top">
                <motion.div 
                    className="footer-logo-container"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <motion.img 
                        className='footer-logo' 
                        src={Companylogo} 
                        alt="Company Logo"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.h3 
                        className="footer-tagline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        "Innovation that moves you."
                    </motion.h3>
                </motion.div>

                {/* Contact Info */}
                <motion.div 
                    className="footer-contact"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    <h4>Contact Information</h4>
                    <div className="contact-items">
                        <motion.div 
                            className="contact-item"
                            whileHover={{ x: 5 }}
                        >
                            <Phone size={16} />
                            <span>+92 300 1234567</span>
                        </motion.div>
                        <motion.div 
                            className="contact-item"
                            whileHover={{ x: 5 }}
                        >
                            <Mail size={16} />
                            <span>info@dealership.com</span>
                        </motion.div>
                        <motion.div 
                            className="contact-item"
                            whileHover={{ x: 5 }}
                        >
                            <MapPin size={16} />
                            <span>123 Auto Street, City, Country</span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Quick Links */}
                <motion.div 
                    className="footer-links"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <h4>Quick Links</h4>
                    <div className="links-grid">
                        {footerLinks.map((link, index) => (
                            <motion.div
                                key={link.label}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <a 
                                    href={link.href} 
                                    className="footer-link"
                                >
                                    {link.label}
                                    <ArrowUpRight size={14} />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Middle Section - Social Media */}
            <motion.div 
                className="footer-social"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
            >
                <h4>Connect With Us</h4>
                <div className="social-icons">
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            className="social-icon"
                            aria-label={social.label}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ 
                                scale: 1.2,
                                rotate: 5,
                                y: -5
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </div>
            </motion.div>

            {/* Bottom Section */}
            <motion.div 
                className="footer-bottom"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
            >
                <div className="footer-copyright">
                    © {currentYear} Auto Dealership. All rights reserved.
                </div>
                
                <motion.button 
                    className="scroll-top-btn"
                    onClick={scrollToTop}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Back to Top ↑
                </motion.button>
            </motion.div>
        </footer>
    );
}