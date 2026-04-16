import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cursor from "./Cursor";
import "./Navbar.css";
import Logo from "../assets/Logo.png";

// Updated Navigation links - Left side: PROJECTS, SERVICES, CONTACT | Right side: ABOUT, CAREER
const NAV_LINKS_LEFT = [
  { name: "Projects", path: "/projects" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/branches" },
];

const NAV_LINKS_RIGHT = [
  { name: "About", path: "/about" },
  { name: "Career", path: "/career" }, // Changed to separate career path
];

// Split text for animated letters
const SplitText = ({ text }) => (
  <>
    {text.split("").map((letter, i) => (
      <span
        key={i}
        className="letter-container"
        style={{ ["--delay"]: `${i * 40}ms` }}
      >
        <span className="letter">{letter}</span>
        <span className="letter-clone" aria-hidden>
          {letter}
        </span>
      </span>
    ))}
  </>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHoveringLetsTalk, setIsHoveringLetsTalk] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll visibility and background
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // ✅ Let's Talk handler navigates to ContactPage
  const handleLetsTalk = () => {
    navigate("/contact");
    closeMenu();
  };

  // Check if link is active - special handling for Career to not be active on home
  const isLinkActive = (linkPath) => {
    if (linkPath === "/career") {
      return location.pathname === "/career";
    }
    return location.pathname === linkPath;
  };

  return (
    <>
      <Cursor />
      <header
        className={`navbar ${scrolled ? "navbar--scrolled" : "navbar--top"} ${
          !visible ? "navbar--hidden" : ""
        }`}
      >
        <div className="navbar-inner">
          {/* Left Navigation Links */}
          <div className="nav-links-left">
            {NAV_LINKS_LEFT.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link ${
                  isLinkActive(link.path) ? "active" : ""
                }`}
                onClick={closeMenu}
              >
                <SplitText text={link.name} />
              </Link>
            ))}
          </div>

          {/* Brand Logo */}
          <Link
            to="/"
            className="brand"
            onClick={closeMenu}
            aria-label="FlipStudio home"
          >
            <div className="logo-container">
              <img 
                src={Logo} 
                alt="Flip Studio" 
                className="logo-image"
              />
            </div>
          </Link>

          {/* Right Navigation Links */}
          <div className="nav-links-right">
            {NAV_LINKS_RIGHT.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link ${
                  isLinkActive(link.path) ? "active" : ""
                }`}
                onClick={closeMenu}
              >
                <SplitText text={link.name} />
              </Link>
            ))}

            {/* Enhanced Let's Talk Button */}
            <button
              className={`lets-talk-btn ${isHoveringLetsTalk ? "hover" : ""}`}
              onClick={handleLetsTalk}
              onMouseEnter={() => setIsHoveringLetsTalk(true)}
              onMouseLeave={() => setIsHoveringLetsTalk(false)}
              aria-label="Let's Talk"
            >
              <div className="lets-talk-content">
                <div className="plus-container">
                  <span className="plus-icon">+</span>
                </div>
                <div className="lets-talk-text-container">
                  <span className="lets-talk-text">Let's Talk</span>
                  <span className="say-hi-text">Say Hi</span>
                </div>
              </div>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`hamburger ${menuOpen ? "is-active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="hamburger-box">
              <div className="hamburger-inner" />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "is-active" : ""}`}>
        <div className="mobile-menu-content">
          <button className="mobile-close" onClick={closeMenu}>
            ✕
          </button>
          {[...NAV_LINKS_LEFT, ...NAV_LINKS_RIGHT].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="mobile-link"
              onClick={closeMenu}
            >
              <SplitText text={link.name} />
            </Link>
          ))}
          {/* Mobile Let's Talk button */}
          <button className="mobile-lets-talk-btn" onClick={handleLetsTalk}>
            <div className="mobile-lets-talk-content">
              <div className="mobile-plus-container">
                <span className="mobile-plus-icon">+</span>
              </div>
              <div className="mobile-lets-talk-text-container">
                <span className="mobile-lets-talk-text">Let's Talk</span>
                <span className="mobile-say-hi-text">Say Hi</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}