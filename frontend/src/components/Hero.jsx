import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const spring = { type: "spring", stiffness: 100, damping: 20 };

export default function Hero({ 
  title, 
  subtitle, 
  ctaText = "Book Appointment", 
  ctaLink = "/appointment", 
  showCta = true,
  backgroundImage = null,
  overlay = true
}) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        
        .hero-section {
          position: relative;
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 1.5rem 4rem;
          overflow: hidden;
          background: linear-gradient(135deg, #0c4a6e 0%, #0ea5e9 100%);
        }
        
        .hero-background {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        
        .hero-background::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(12, 74, 110, 0.4) 0%, transparent 50%),
            linear-gradient(135deg, rgba(12, 74, 110, 0.9) 0%, rgba(14, 165, 233, 0.8) 100%);
          animation: gradientShift 15s ease infinite;
        }
        
        @keyframes gradientShift {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .hero-background-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0.2;
        }
        
        .hero-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.05;
          background-image: 
            repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px),
            repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px);
          animation: patternMove 30s linear infinite;
        }
        
        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        .hero-content-wrapper {
          position: relative;
          z-index: 1;
          max-width: 900px;
          text-align: center;
        }
        
        .hero-title {
          font-family: 'Crimson Pro', serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 700;
          color: white;
          margin: 0 0 1.5rem 0;
          line-height: 1.2;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
          letter-spacing: -0.02em;
        }
        
        .hero-title-highlight {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
        }
        
        .hero-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.125rem, 2.5vw, 1.5rem);
          color: rgba(255, 255, 255, 0.95);
          line-height: 1.7;
          margin: 0 auto 2.5rem;
          max-width: 700px;
          font-weight: 400;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .hero-cta-wrapper {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .hero-btn {
          font-family: 'Inter', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2.5rem;
          font-size: 1.125rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .hero-btn-primary {
          background: white;
          color: #0c4a6e;
          border: 2px solid white;
        }
        
        .hero-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
          background: #fbbf24;
          border-color: #fbbf24;
          color: white;
        }
        
        .hero-btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.5);
        }
        
        .hero-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: white;
          transform: translateY(-3px);
        }
        
        .hero-stats {
          display: flex;
          gap: 3rem;
          justify-content: center;
          margin-top: 4rem;
          flex-wrap: wrap;
        }
        
        .hero-stat {
          text-align: center;
        }
        
        .hero-stat-number {
          font-family: 'Crimson Pro', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: white;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        
        .hero-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 500;
        }
        
        .hero-scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          cursor: pointer;
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
        
        .hero-scroll-icon {
          width: 24px;
          height: 36px;
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-radius: 12px;
          position: relative;
        }
        
        .hero-scroll-icon::before {
          content: '';
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 8px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 2px;
          animation: scrollDot 2s infinite;
        }
        
        @keyframes scrollDot {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
          50% { transform: translateX(-50%) translateY(12px); opacity: 0.3; }
        }
        
        @media (max-width: 768px) {
          .hero-section {
            min-height: 60vh;
            padding: 5rem 1rem 3rem;
          }
          
          .hero-cta-wrapper {
            flex-direction: column;
            align-items: stretch;
          }
          
          .hero-btn {
            width: 100%;
            justify-content: center;
          }
          
          .hero-stats {
            gap: 2rem;
          }
        }
      `}</style>

      <motion.section
        className="hero-section"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
          hidden: {},
        }}
      >
        <div className="hero-background">
          {backgroundImage && (
            <div 
              className="hero-background-image"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
          )}
          <div className="hero-pattern" />
        </div>

        <div className="hero-content-wrapper">
          <motion.h1
            className="hero-title"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ ...spring, duration: 0.8 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ ...spring, delay: 0.2, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>

          {showCta && (
            <motion.div
              className="hero-cta-wrapper"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ ...spring, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={ctaLink} className="hero-btn hero-btn-primary">
                  {ctaText}
                  <span>→</span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/contact" className="hero-btn hero-btn-secondary">
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          )}

          {/* Optional Stats */}
          <motion.div
            className="hero-stats"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ ...spring, delay: 0.6 }}
          >
            <div className="hero-stat">
              <div className="hero-stat-number">500+</div>
              <div className="hero-stat-label">Patients Treated</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">10+</div>
              <div className="hero-stat-label">Years Experience</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">95%</div>
              <div className="hero-stat-label">Success Rate</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span>Scroll</span>
          <div className="hero-scroll-icon" />
        </motion.div>
      </motion.section>
    </>
  );
}