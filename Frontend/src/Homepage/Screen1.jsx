import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Screen1Image from '../assets/newScreen4.jpg';
import Screen1Image2 from '../assets/newScreen6.jpg';

// User-provided vector SVGs
import verifiedBadgeIcon from '../assets/icons/verified-badge.svg';
import contractIcon from '../assets/icons/contract.svg';
import keyIcon from '../assets/icons/key.svg';

import './Screen1.css';
import Navbar from './Navbar';

export default function Screen1() {
    const scrollToShowroom = () => {
        const nextSection = document.querySelector('.categories-section') || document.querySelector('.screen2');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className='screen1'>
            <Navbar />
            
            {/* Background Images with Depth */}
            <div className="hero-background">
                <motion.img 
                    className='screen1Image' 
                    src={Screen1Image} 
                    alt="Luxury automotive flagship"
                    initial={{ scale: 1.06, opacity: 0.9 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                
                <motion.img 
                    className='screen1Image2' 
                    src={Screen1Image2} 
                    alt="Precision automotive interior"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                />
            </div>

            {/* Gradient Overlays for Readability and Mood */}
            <div className="hero-overlay" />
            <div className="hero-vignette" />

            {/* Hero Main Content - Clean, Uncluttered, Pure Elegance */}
            <div className="hero-content">
                {/* Prestige Marque Pill */}
                <motion.div 
                    className="hero-badge-pill"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="badge-pulse-indicator" />
                    <span className="badge-label">PRESTIGE AUTOMOTIVE COLLECTION • EST. 2014</span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1 
                    className="hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                >
                    Drive The Exceptional
                </motion.h1>
                
                {/* Refined Descriptive Tagline */}
                <motion.p 
                    className='hero-tagline'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    “Passion in every turn, precision in every mile.”
                    <span className="hero-tagline-sub">
                        Curating certified supercars, executive sedans, and bespoke luxury automobiles for discerning drivers.
                    </span>
                </motion.p>

                {/* Floating Prestige Trust Highlights Ribbon - Zero Cluttered Buttons */}
                <motion.div 
                    className="hero-highlights-ribbon"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.45 }}
                >
                    <div className="highlight-card">
                        <div className="highlight-icon-wrap">
                            <img src={verifiedBadgeIcon} alt="Verified Inspection" className="highlight-svg" />
                        </div>
                        <div className="highlight-details">
                            <div className="highlight-headline">150-Point Certified</div>
                            <div className="highlight-sub">Multi-point technical & diagnostic assessment</div>
                        </div>
                    </div>

                    <div className="highlight-divider" />

                    <div className="highlight-card">
                        <div className="highlight-icon-wrap">
                            <img src={contractIcon} alt="Verified Provenance" className="highlight-svg" />
                        </div>
                        <div className="highlight-details">
                            <div className="highlight-headline">100% Provenance</div>
                            <div className="highlight-sub">Clear titles & verified ownership history</div>
                        </div>
                    </div>

                    <div className="highlight-divider" />

                    <div className="highlight-card">
                        <div className="highlight-icon-wrap">
                            <img src={keyIcon} alt="Immediate Handover" className="highlight-svg" />
                        </div>
                        <div className="highlight-details">
                            <div className="highlight-headline">White-Glove Handover</div>
                            <div className="highlight-sub">Seamless transfer & private showroom delivery</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Elegant Showroom Scroll Indicator Pointing Directly to Categories Below */}
            <div 
                className="scroll-indicator" 
                onClick={scrollToShowroom}
                role="button"
                tabIndex={0}
                aria-label="Scroll to vehicle showroom"
            >
                <span className="scroll-caption">EXPLORE SHOWROOM</span>
                <ChevronDown className="scroll-arrow" size={20} />
            </div>
        </section>
    );
}