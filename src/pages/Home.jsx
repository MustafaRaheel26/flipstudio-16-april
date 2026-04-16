// src/pages/Home.jsx
import React from "react";
import Hero from "../sections/Hero";
import BrandCarousel from "../sections/BrandCarousel";
import FeatureProjects from "../sections/FeaturedProjects";
import AdvancedFooter from "../components/AdvancedFooter";
import TextReveal from "../sections/TextReveal";
import TextRevealSecond from "../sections/TextRevealSecond";
import Testimonial from "../sections/Testimonial";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-root">
      <Hero />
      <BrandCarousel />
      <TextReveal />
      <TextRevealSecond />
      <FeatureProjects />
      <Testimonial/>
      <AdvancedFooter />
    </div>
  );
}
