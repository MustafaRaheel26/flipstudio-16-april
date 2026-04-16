// OurServicesSection.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import "./OurServicesSection.css";

const OurServicesSection = () => {
  const sectionRef = useRef(null);

  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Slow down overall scroll effect
  const slowedProgress = useTransform(scrollYProgress, [0, 1], [0, 0.6]);

  // Heading animations with fade effect
  const leftTextX = useTransform(slowedProgress, [0.1, 0.4], ["-40%", "-77%"]);
  const rightTextX = useTransform(slowedProgress, [0.1, 0.4], ["35%", "72%"]);
  
  // Fade effect for headings as they slide out
  const leftTextOpacity = useTransform(slowedProgress, [0.2, 0.4], [1, 0.3]);
  const rightTextOpacity = useTransform(slowedProgress, [0.1, 0.4], [1, 0.3]);

  // Middle list appearance - fast reveal
  const listOpacity = useTransform(slowedProgress, [0.1, 0.3], [0, 1]);
  const listY = useTransform(slowedProgress, [0.14, 0.25], [20, 0]);
  const listScale = useTransform(slowedProgress, [0.15, 0.25], [0.95, 1]);

  // Services array
  const services = [
    { name: "Interior Design", slug: "interior-design" },
    { name: "Architectural Planning", slug: "architectural-planning" },
    { name: "Brand Identity", slug: "brand-identity" },
    { name: "Space Optimization", slug: "space-optimization" },
    { name: "Sustainable Design", slug: "sustainable-design" },
    { name: "Project Management", slug: "project-management" },
  ];

  return (
    <section className="our-services-section" ref={sectionRef}>
      <div className="container">
        <div className="split-section">

          {/* LEFT TEXT with fade effect */}
          <motion.div 
            className="split-left" 
            style={{ 
              x: leftTextX,
              opacity: leftTextOpacity 
            }}
          >
            <h2>OUR</h2>
          </motion.div>

          {/* RIGHT TEXT with fade effect */}
          <motion.div 
            className="split-right" 
            style={{ 
              x: rightTextX,
              opacity: rightTextOpacity 
            }}
          >
            <h2>SERVICES</h2>
          </motion.div>

          {/* SERVICES LIST */}
          <motion.div
            className="services-list-container"
            style={{
              opacity: listOpacity,
              y: listY,
              scale: listScale,
            }}
          >
            <div className="services-list">
              {services.map((service, index) => {
                // Fast staggered appearance
                const start = 0.2 + index * 0.02;
                const end = 0.3 + index * 0.02;

                const itemOpacity = useTransform(slowedProgress, [start, end], [0, 1]);
                const itemX = useTransform(slowedProgress, [start, end], [-20, 0]);

                return (
                  <motion.div
                    key={service.slug}
                    className="service-link-item"
                    style={{ opacity: itemOpacity, x: itemX }}
                  >
                    <Link className="service-link" to={`/services/${service.slug}`}>
                      {service.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;