// src/sections/Hero.jsx - COMPLETE
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.css';

// Import video from assets folder
import homeherovid from '../assets/homeherovid.mp4';

export default function Hero() {
  const [isHoveringViewProjects, setIsHoveringViewProjects] = useState(false);

  return (
    <section className="hero-section">
      {/* Video Background */}
      <div className="hero-video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
          preload="auto"
          style={{ filter: 'none', WebkitFilter: 'none' }}
        >
          <source src={homeherovid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Bottom Container for Project Info and Button */}
      <div className="hero-bottom-container">
        {/* Left - Project Info */}
        <motion.div 
          className="hero-project-info"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span className="project-name">RESIDENTIAL COMPLEX IN ESTEPONA</span>
          <span className="project-location">ESTEPONA, SPAIN</span>
        </motion.div>

        {/* Right - Enhanced View Project Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Link 
            to="/projects" 
            className={`hero-view-project-btn ${isHoveringViewProjects ? "hover" : ""}`}
            onMouseEnter={() => setIsHoveringViewProjects(true)}
            onMouseLeave={() => setIsHoveringViewProjects(false)}
          >
            <div className="hero-view-project-content">
              <div className="hero-plus-container">
                <span className="hero-plus-icon">+</span>
              </div>
              <div className="hero-view-project-text-container">
                <span className="hero-view-project-text">View Projects</span>
                <span className="hero-explore-text">Explore</span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}