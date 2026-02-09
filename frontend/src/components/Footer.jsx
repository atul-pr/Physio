import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { contactInfo } from "../data/contact";
import { apiMethods } from "../api/config";

const footerLinks = {
  quick: [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
    { path: "/exercises", label: "Exercises" },
    { path: "/about", label: "About" },
  ],
  services: [
    { path: "/services", label: "Sports Injury" },
    { path: "/services", label: "Manual Therapy" },
    { path: "/services", label: "Rehabilitation" },
    { path: "/services", label: "Post-Surgery Care" },
    { path: "/admin", label: "Admin" },

  ],
};

const platformIcons = {
  facebook: "fa-brands fa-facebook-f",
  youtube: "fa-brands fa-youtube",
  instagram: "fa-brands fa-instagram",
  twitter: "fa-brands fa-x-twitter",
  linkedin: "fa-brands fa-linkedin-in",
  whatsapp: "fa-brands fa-whatsapp"
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const res = await apiMethods.getSocialLinks();
        setSocialLinks(res.data);
      } catch (error) {
        console.error("Failed to fetch social links for footer:", error);
      }
    };
    fetchSocialLinks();
  }, [location.pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        
        .footer-wrapper {
          background: linear-gradient(180deg, #0c4a6e 0%, #082f49 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        .footer-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        }
        
        .footer-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: 
            repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 60px);
        }
        
        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 4rem 1.5rem 2rem;
          position: relative;
          z-index: 1;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        
        .footer-brand {
          max-width: 350px;
        }
        
        .footer-logo {
          font-family: 'Crimson Pro', serif;
          font-size: 2rem;
          font-weight: 700;
          color: white;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          transition: opacity 0.3s ease;
        }
        
        .footer-logo:hover {
          opacity: 0.8;
        }
        
        .footer-logo-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #0ea5e9 0%, #fbbf24 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
        }
        
        .footer-tagline {
          font-family: 'Inter
           sans-serif;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.7;
          margin: 0 0 1.5rem 0;
          font-size: 1rem;
        }
        
        .footer-social {
          display: flex;
          gap: 0.75rem;
        }
        
        .footer-social-link {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          font-size: 1.25rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .footer-social-link:hover {
          background: rgba(14, 165, 233, 0.3);
          border-color: rgba(14, 165, 233, 0.5);
          transform: translateY(-2px);
        }
        
        .footer-section h4 {
          font-family: 'Crimson Pro', serif;
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 1.5rem 0;
          color: white;
        }
        
        .footer-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .footer-links a {
          font-family: 'Inter', sans-serif;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.9375rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }
        
        .footer-links a:hover {
          color: #0ea5e9;
          padding-left: 0.5rem;
        }
        
        .footer-links a::before {
          content: '→';
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .footer-links a:hover::before {
          opacity: 1;
        }
        
        .footer-contact-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .footer-contact-item {
          display: flex;
          align-items: start;
          gap: 0.75rem;
          font-family: 'Inter', sans-serif;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9375rem;
          line-height: 1.6;
        }
        
        .footer-contact-icon {
          font-size: 1.25rem;
          margin-top: 0.125rem;
          flex-shrink: 0;
        }
        
        .footer-contact-item a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .footer-contact-item a:hover {
          color: #0ea5e9;
        }
        
        .footer-cta {
          background: rgba(14, 165, 233, 0.15);
          border: 1px solid rgba(14, 165, 233, 0.3);
          border-radius: 16px;
          padding: 2rem;
          margin-top: 3rem;
          text-align: center;
        }
        
        .footer-cta h3 {
          font-family: 'Crimson Pro', serif;
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          color: white;
        }
        
        .footer-cta p {
          font-family: 'Inter', sans-serif;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 1.5rem 0;
          font-size: 1rem;
        }
        
        .footer-cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .footer-btn {
          font-family: 'Inter', sans-serif;
          padding: 0.875rem 2rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .footer-btn-primary {
          background: white;
          color: #0c4a6e;
          border: 2px solid white;
        }
        
        .footer-btn-primary:hover {
          background: #fbbf24;
          border-color: #fbbf24;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
        }
        
        .footer-btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }
        
        .footer-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: white;
          transform: translateY(-2px);
        }
        
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .footer-copyright {
          font-family: 'Inter', sans-serif;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          margin: 0;
        }
        
        .footer-legal {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        
        .footer-legal a {
          font-family: 'Inter', sans-serif;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.3s ease;
        }
        
        .footer-legal a:hover {
          color: #0ea5e9;
        }
        
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .footer-container {
            padding: 3rem 1rem 1.5rem;
          }
          
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          
          .footer-brand {
            max-width: 100%;
          }
          
          .footer-cta {
            margin-top: 2rem;
            padding: 1.5rem;
          }
          
          .footer-cta-buttons {
            flex-direction: column;
          }
          
          .footer-btn {
            width: 100%;
            justify-content: center;
          }
          
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
          
          .footer-legal {
            justify-content: center;
          }
        }
      `}</style>

      <footer className="footer-wrapper">
        <div className="footer-pattern" />

        <div className="footer-container">
          {/* Main Footer Grid */}
          <div className="footer-grid">
            {/* Brand Section */}
            <motion.div
              className="footer-brand"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="footer-logo">
                <img
                  src="/logo.png"
                  alt="PhysioCare Logo"
                  style={{
                    width: "280px",
                    height: "auto",
                    maxHeight: "80px",
                    objectFit: "contain"
                  }}
                />
              </Link>
              <p className="footer-tagline">
                Professional physiotherapy and rehabilitation care helping you recover,
                rebuild, and reach your wellness goals.
              </p>
              <div className="footer-social">
                {socialLinks.filter(link => link.showInFooter !== false).map((link) => (
                  <motion.a
                    key={link._id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    title={link.platform}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className={platformIcons[link.platform] || "fa-solid fa-link"}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="footer-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4>Quick Links</h4>
              <ul className="footer-links">
                {footerLinks.quick.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              className="footer-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4>Services</h4>
              <ul className="footer-links">
                {footerLinks.services.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="footer-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4>Get in Touch</h4>
              <div className="footer-contact-info">
                <div className="footer-contact-item">
                  <span className="footer-contact-icon">📞</span>
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}>
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="footer-contact-item">
                  <span className="footer-contact-icon">✉️</span>
                  <a href={`mailto:${contactInfo.email}`}>
                    {contactInfo.email}
                  </a>
                </div>
                <div className="footer-contact-item">
                  <span className="footer-contact-icon">💬</span>
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp Us
                  </a>
                </div>
                <div className="footer-contact-item">
                  <span className="footer-contact-icon">📍</span>
                  <Link to="/contact">View Location</Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            className="footer-cta"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3>Ready to Start Your Recovery Journey?</h3>
            <p>Book an appointment today and take the first step towards better health</p>
            <div className="footer-cta-buttons">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/appointment" className="footer-btn footer-btn-primary">
                  📅 Book Appointment
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-btn footer-btn-secondary"
                >
                  💬 Chat on WhatsApp
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              &copy; {currentYear} PhysioCare. All rights reserved.
            </p>
            <div className="footer-legal">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}