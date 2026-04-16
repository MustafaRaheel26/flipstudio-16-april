// src/sections/Testimonial.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Testimonial.css'; // We'll create this CSS file

const testimonials = [
  {
    name: "David Smith",
    position: "Marketing Director",
    company: "Detoxy",
    text: "This product saved us both time and money. The efficiency is unmatched and the results exceeded our expectations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces"
  },
  {
    name: "Sarah Johnson",
    position: "Product Manager",
    company: "InnovaTech",
    text: "Extremely reliable and well-designed solution. The performance and support team are absolutely outstanding.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces"
  },
  {
    name: "Ahmed Khan",
    position: "Founder",
    company: "PixelCore",
    text: "One of the best investments we've made for our business. Clean interface, fast performance, and great usability.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces"
  },
  {
    name: "Emily Chen",
    position: "CTO",
    company: "TechFlow",
    text: "Outstanding service and incredible results. Our productivity increased by 40% after implementation.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces"
  },
  {
    name: "Marcus Rodriguez",
    position: "Operations Lead",
    company: "DataDrive",
    text: "The seamless integration and robust features made this an easy choice for our growing business needs.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces"
  }
];

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  
  const positionRef = useRef(0);
  const animationIdRef = useRef(null);
  
  // Double the testimonials for seamless looping
  const doubledTestimonials = [...testimonials, ...testimonials];

  // Intersection Observer to pause animation when not visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animation effect
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.3;
    
    const animate = () => {
      // Only animate if visible and not paused
      if (isVisible && !isPaused) {
        positionRef.current += speed;
        
        // Calculate the width of one set of testimonials
        const firstCard = track.children[0];
        if (!firstCard) return;
        
        const cardWidth = firstCard.offsetWidth;
        const gap = 24;
        const totalWidth = (cardWidth + gap) * testimonials.length;
        
        // Reset position seamlessly when we've moved one full set
        if (positionRef.current >= totalWidth) {
          positionRef.current = 0;
        }
        
        track.style.transform = `translateX(-${positionRef.current}px)`;
      }
      
      animationIdRef.current = requestAnimationFrame(animate);
    };
    
    animationIdRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isVisible, isPaused]);

  // Pause on touch devices
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  return (
    <section 
      className="testimonial-section" 
      ref={sectionRef}
      aria-label="Client testimonials"
    >
      <h2 className="testimonial-title">What Our Clients Say</h2>

      <div className="testimonial-carousel-container">
        <div 
          className="testimonial-carousel-wrapper"
          aria-live="polite"
        >
          <div
            ref={trackRef}
            className="testimonial-track"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="list"
          >
            {doubledTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${index}`}
                className="testimonial-card"
                whileHover={{
                  y: -6,
                  boxShadow: '0 12px 35px rgba(255, 255, 255, 0.06)',
                  borderColor: '#444'
                }}
                transition={{ duration: 0.3 }}
                role="listitem"
                tabIndex={0}
              >
                <div className="testimonial-card-header">
                  <img 
                    src={testimonial.image} 
                    alt={`Portrait of ${testimonial.name}`}
                    className="testimonial-avatar"
                    loading="lazy"
                  />
                  <div className="testimonial-header-text">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <p className="testimonial-position">{testimonial.position}</p>
                  </div>
                </div>

                <p className="testimonial-text">"{testimonial.text}"</p>

                <div className="testimonial-footer">
                  <span className="testimonial-company">{testimonial.company}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Accessibility instructions */}
      <p className="visually-hidden">
        This carousel automatically scrolls. Hover or focus on a card to pause the animation.
      </p>
    </section>
  );
}