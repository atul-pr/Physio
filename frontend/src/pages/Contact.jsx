import { motion } from "framer-motion";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import { contactInfo } from "../data/contact";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
const spring = { type: "spring", stiffness: 100, damping: 20 };

export default function Contact() {
  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Work+Sans:wght@400;500;600;700&display=swap');
        
        .contact-wrapper {
          font-family: 'Work Sans', sans-serif;
          background: linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%);
          min-height: 100vh;
        }
        
        .contact-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 4rem 1.5rem;
        }
        
        .contact-hero {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .contact-hero h1 {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #0c4a6e;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        
        .contact-hero p {
          font-size: clamp(1.125rem, 2vw, 1.375rem);
          color: #475569;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }
        
        .contact-card {
          background: white;
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(14, 165, 233, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .contact-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #0ea5e9 0%, #0c4a6e 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        
        .contact-card:hover::before {
          transform: scaleX(1);
        }
        
        .contact-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .contact-icon-wrapper {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #0ea5e9 0%, #0c4a6e 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
        }
        
        .contact-card h3 {
          font-family: 'Libre Baskerville', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #0c4a6e;
          margin-bottom: 0.75rem;
        }
        
        .contact-card p {
          color: #64748b;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }
        
        .contact-link {
          color: #0ea5e9;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9375rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: gap 0.3s ease;
        }
        
        .contact-link:hover {
          gap: 0.75rem;
        }
        
        .contact-link::after {
          content: '→';
        }
        
        .action-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 4rem;
        }
        
        .action-card {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          border: 2px solid #e0f2fe;
          transition: all 0.3s ease;
        }
        
        .action-card:hover {
          border-color: #0ea5e9;
          transform: translateY(-4px);
        }
        
        .action-card h4 {
          font-family: 'Libre Baskerville', serif;
          font-size: 1.25rem;
          color: #0c4a6e;
          margin-bottom: 1rem;
        }
        
        .action-card p {
          color: #64748b;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }
        
        .btn-contact {
          display: inline-block;
          padding: 0.875rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1rem;
          cursor: pointer;
          border: none;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #0ea5e9 0%, #0c4a6e 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(14, 165, 233, 0.4);
        }
        
        .btn-whatsapp {
          background: #25D366;
          color: white;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
        }
        
        .btn-whatsapp:hover {
          background: #20BA5A;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.4);
        }
        
        .btn-outline {
          background: white;
          color: #0ea5e9;
          border: 2px solid #0ea5e9;
        }
        
        .btn-outline:hover {
          background: #0ea5e9;
          color: white;
        }
        
        .map-section {
          background: white;
          border-radius: 24px;
          padding: 3rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(14, 165, 233, 0.1);
        }
        
        .map-section h2 {
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(2rem, 4vw, 2.5rem);
          color: #0c4a6e;
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .map-container {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }
        
        .map-container iframe {
          display: block;
          width: 100%;
          height: 450px;
          border: none;
        }
        
        .map-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .info-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: #e0f2fe;
          color: #0c4a6e;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        @media (max-width: 768px) {
          .contact-container {
            padding: 2rem 1rem;
          }
          
          .contact-hero {
            margin-bottom: 2rem;
          }
          
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin-bottom: 2rem;
          }
          
          .action-cards-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
            margin-bottom: 2rem;
          }
          
          .contact-card {
            padding: 2rem 1.5rem;
          }
          
          .map-section {
            padding: 2rem 1.5rem;
            border-radius: 16px;
          }
          
          .map-container iframe {
            height: 350px;
          }
          
          .map-actions {
            flex-direction: column;
          }
          
          .btn-contact {
            width: 100%;
            text-align: center;
          }
        }
        
        @media (max-width: 480px) {
          .contact-hero h1 {
            font-size: 2rem;
          }
          
          .contact-hero p {
            font-size: 1rem;
          }
          
          .contact-icon-wrapper {
            width: 56px;
            height: 56px;
            font-size: 1.75rem;
          }
          
          .map-container iframe {
            height: 300px;
          }
        }
      `}</style>

      <motion.div
        className="contact-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="contact-container">
          {/* Hero Section */}
          <motion.div
            className="contact-hero"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Get in Touch</h1>
            <p>
              We're here to answer your questions and help you start your journey to better health. 
              Reach out through any of the channels below.
            </p>
          </motion.div>

          {/* Contact Information Cards */}
          <motion.div
            className="contact-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {},
            }}
          >
            {/* Location Card */}
            <motion.div
              className="contact-card"
              variants={fadeInUp}
              transition={spring}
            >
              <div className="contact-icon-wrapper">
                📍
              </div>
              <h3>Visit Our Clinic</h3>
              <p>{contactInfo.address}</p>
              <a
                href={contactInfo.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                Get Directions
              </a>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              className="contact-card"
              variants={fadeInUp}
              transition={spring}
            >
              <div className="contact-icon-wrapper">
                📞
              </div>
              <h3>Call Us</h3>
              <p>Available for appointments and inquiries during business hours</p>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="contact-link"
              >
                {contactInfo.phone}
              </a>
            </motion.div>

            {/* Email Card */}
            <motion.div
              className="contact-card"
              variants={fadeInUp}
              transition={spring}
            >
              <div className="contact-icon-wrapper">
                ✉️
              </div>
              <h3>Email Us</h3>
              <p>Send us your questions and we'll get back to you shortly</p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="contact-link"
              >
                {contactInfo.email}
              </a>
            </motion.div>
          </motion.div>

          {/* Action Cards */}
          <motion.div
            className="action-cards-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {},
            }}
          >
            {/* Book Appointment Card */}
            <motion.div
              className="action-card"
              variants={fadeInUp}
              transition={spring}
            >
              <h4>📅 Book an Appointment</h4>
              <p>Schedule your visit online in just a few minutes</p>
              <Link to="/appointment" className="btn-contact btn-primary">
                Book Now
              </Link>
            </motion.div>

            {/* WhatsApp Card */}
            <motion.div
              className="action-card"
              variants={fadeInUp}
              transition={spring}
            >
              <h4>💬 Chat on WhatsApp</h4>
              <p>Quick responses to your questions and concerns</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-contact btn-whatsapp"
              >
                Start Chat
              </a>
            </motion.div>

            {/* Emergency Card */}
            <motion.div
              className="action-card"
              variants={fadeInUp}
              transition={spring}
            >
              <h4>🚨 Need Urgent Care?</h4>
              <p>Contact us immediately for emergency consultations</p>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="btn-contact btn-outline"
              >
                Call Now
              </a>
            </motion.div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            className="map-section"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Find Us on the Map</h2>
            
            <div className="map-container">
              <iframe
                src={contactInfo.mapsEmbedUrl}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic location on Google Maps"
              />
            </div>
            
            <div className="map-actions">
              <a
                href={contactInfo.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-contact btn-primary"
              >
                📍 Open in Google Maps
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-contact btn-whatsapp"
              >
                💬 Share Location via WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Info Badges */}
          <motion.div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '3rem'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="info-badge">
              ⏰ Mon-Sat: 9:00 AM - 7:00 PM
            </div>
            <div className="info-badge">
              🅿️ Free Parking Available
            </div>
            <div className="info-badge">
              ♿ Wheelchair Accessible
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}