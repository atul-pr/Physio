import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/exercises", label: "Exercises" },
  { path: "/contact", label: "Contact" },
  { path: "/about", label: "About" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&family=Work+Sans:wght@400;500;600;700&display=swap');
        
        .navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .navbar-wrapper.scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .navbar-wrapper:not(.scrolled) {
          background: white;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }
        
        .navbar-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0.5rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }
        
        .navbar-logo {
          font-family: 'Libre Baskerville', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #0c4a6e;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.3s ease;
          white-space: nowrap;
        }
        
        .navbar-logo:hover {
          color: #0ea5e9;
        }
        
        .navbar-logo-icon {
          width: 250px;
          height: auto;
          max-height: 65px;
          border-radius: 8px;
          object-fit: contain;
          display: block;
          transition: transform 0.3s ease;
        }
        
        .navbar-logo-icon:hover {
          transform: scale(1.05);
        }
        
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .nav-link {
          font-family: 'Work Sans', sans-serif;
          font-size: 0.9375rem;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          padding: 0.625rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
          white-space: nowrap;
        }
        
        .nav-link:hover {
          color: #43a5c5ff;
          background: #f0f9ff;
        }
        
        .nav-link.active {
          color: #0ea5e9;
          font-weight: 600;
          background: #e0f2fe;
        }
        
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0.25rem;
          left: 1rem;
          right: 1rem;
          height: 2px;
          background: #0ea5e9;
          border-radius: 2px;
        }
        
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .navbar-btn {
          font-family: 'Work Sans', sans-serif;
          font-size: 0.9375rem;
          font-weight: 600;
          padding: 0.625rem 1.25rem;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.3s ease;
          white-space: nowrap;
          border: none;
          cursor: pointer;
          display: inline-block;
        }
        
        .navbar-btn-primary {
          background: linear-gradient(135deg, #0ea5e9 0%, #0c4a6e 100%);
          color: white;
          box-shadow: 0 2px 8px rgba(14, 165, 233, 0.25);
        }
        
        .navbar-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.35);
        }
        
        .navbar-btn-outline {
          background: white;
          color: #0ea5e9;
          border: 2px solid #0ea5e9;
        }
        
        .navbar-btn-outline:hover {
          background: #0ea5e9;
          color: white;
        }
        
        .navbar-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          padding: 0.5rem;
          cursor: pointer;
          z-index: 1001;
        }
        
        .navbar-toggle span {
          width: 26px;
          height: 2.5px;
          background: #0c4a6e;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .navbar-toggle span.open:nth-child(1) {
          transform: rotate(45deg) translate(7px, 7px);
        }
        
        .navbar-toggle span.open:nth-child(2) {
          opacity: 0;
          transform: translateX(-10px);
        }
        
        .navbar-toggle span.open:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -7px);
        }
        
        .navbar-mobile {
          background: white;
          border-top: 1px solid #e2e8f0;
          overflow: hidden;
        }
        
        .navbar-mobile-inner {
          padding: 1.5rem;
        }
        
        .navbar-mobile ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .navbar-mobile-link {
          font-family: 'Work Sans', sans-serif;
          display: block;
          padding: 0.875rem 1rem;
          color: #475569;
          text-decoration: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        
        .navbar-mobile-link:hover {
          background: #f0f9ff;
          color: #0ea5e9;
        }
        
        .navbar-mobile-link.active {
          background: #e0f2fe;
          color: #0ea5e9;
          font-weight: 600;
        }
        
        .navbar-mobile-divider {
          height: 1px;
          background: #e2e8f0;
          margin: 1rem 0;
        }
        
        .navbar-mobile-btn {
          display: block;
          width: 100%;
          text-align: center;
          padding: 1rem;
          border-radius: 10px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .navbar-mobile-btn-primary {
          background: linear-gradient(135deg, #0ea5e9 0%, #0c4a6e 100%);
          color: white;
          margin-bottom: 0.75rem;
          box-shadow: 0 2px 8px rgba(14, 165, 233, 0.25);
        }
        
        .navbar-mobile-btn-outline {
          background: white;
          color: #0ea5e9;
          border: 2px solid #0ea5e9;
        }
        
        /* Tablet and Mobile */
        @media (max-width: 1024px) {
          .navbar-links {
            gap: 0.25rem;
          }
          
          .nav-link {
            padding: 0.5rem 0.75rem;
            font-size: 0.875rem;
          }
          
          .navbar-btn {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
        }
        
        @media (max-width: 768px) {
          .navbar-links,
          .navbar-actions {
            display: none;
          }
          
          .navbar-toggle {
            display: flex;
          }
          
          .navbar-container {
            padding: 0.875rem 1rem;
          }
          
          .navbar-logo {
            font-size: 1.25rem;
          }
          
          .navbar-logo-icon {
            width: 200px;
            max-height: 70px;
          }
        }
        
        @media (max-width: 480px) {
          .navbar-logo {
            font-size: 1.125rem;
          }
          
          .navbar-logo-icon {
            width: 180px;
            max-height: 60px;
          }
        }
        
        /* Prevent scroll when mobile menu is open */
        body.menu-open {
          overflow: hidden;
        }
          
      `}</style>

      <motion.header
        className={`navbar-wrapper ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <nav className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <img
              src="/logo.png"
              alt="Mangala Physiocare Logo"
              className="navbar-logo-icon"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="navbar-actions">
            <Link to="/appointment" className="navbar-btn navbar-btn-primary">
              Book Appointment
            </Link>
            <Link to="/login" className="navbar-btn navbar-btn-outline">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="navbar-toggle"
            onClick={() => {
              setIsOpen(!isOpen);
              // Prevent body scroll when menu is open
              document.body.classList.toggle("menu-open");
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <span className={isOpen ? "open" : ""} />
            <span className={isOpen ? "open" : ""} />
            <span className={isOpen ? "open" : ""} />
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="navbar-mobile"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="navbar-mobile-inner">
                <ul>
                  {navLinks.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className={`navbar-mobile-link ${location.pathname === link.path ? "active" : ""
                          }`}
                        onClick={() => {
                          setIsOpen(false);
                          document.body.classList.remove("menu-open");
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="navbar-mobile-divider" />

                <Link
                  to="/appointment"
                  className="navbar-mobile-btn navbar-mobile-btn-primary"
                  onClick={() => {
                    setIsOpen(false);
                    document.body.classList.remove("menu-open");
                  }}
                >
                  📅 Book Appointment
                </Link>
                <Link
                  to="/login"
                  className="navbar-mobile-btn navbar-mobile-btn-outline"
                  onClick={() => {
                    setIsOpen(false);
                    document.body.classList.remove("menu-open");
                  }}
                >
                  🔐 Admin Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content jump */}
      <div style={{ height: scrolled ? "60px" : "70px" }} />
    </>
  );
}