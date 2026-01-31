import { motion } from "framer-motion";

const features = [
  {
    title: "Expert Care",
    desc: "Certified physiotherapists with extensive experience in sports medicine, rehabilitation, and pain management.",
    icon: "👨‍⚕️",
    color: "#0ea5e9",
  },
  {
    title: "Personalized Plans",
    desc: "Customized treatment programs designed specifically for your condition, goals, and lifestyle.",
    icon: "📋",
    color: "#8b5cf6",
  },
  {
    title: "Evidence-Based",
    desc: "Modern therapeutic techniques backed by the latest clinical research and proven results.",
    icon: "🔬",
    color: "#10b981",
  },
  {
    title: "Patient-Focused",
    desc: "Your recovery journey, comfort, and well-being are at the heart of everything we do.",
    icon: "❤️",
    color: "#f59e0b",
  },
  {
    title: "Advanced Equipment",
    desc: "State-of-the-art facilities and technology for optimal treatment outcomes.",
    icon: "⚙️",
    color: "#ec4899",
  },
  {
    title: "Flexible Scheduling",
    desc: "Convenient appointment times that work with your busy schedule, including evenings.",
    icon: "📅",
    color: "#06b6d4",
  },
];

export default function WhyChooseUs() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        
        .why-section {
          padding: 6rem 1.5rem;
          background: linear-gradient(180deg, #f8fafc 0%, white 100%);
          position: relative;
          overflow: hidden;
        }
        
        .why-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 400px;
          background: radial-gradient(circle at 50% 0%, rgba(14, 165, 233, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .why-container {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        
        .why-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 4rem;
        }
        
        .why-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 0.9375rem;
          font-weight: 600;
          color: #0ea5e9;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 1rem 0;
        }
        
        .why-title {
          font-family: 'Crimson Pro', serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #0c4a6e;
          margin: 0 0 1.5rem 0;
          line-height: 1.2;
        }
        
        .why-description {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1rem, 2vw, 1.125rem);
          color: #64748b;
          line-height: 1.7;
          margin: 0;
        }
        
        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }
        
        .why-card {
          background: white;
          border-radius: 20px;
          padding: 2.5rem 2rem;
          border: 1px solid rgba(14, 165, 233, 0.1);
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        
        .why-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--card-color, #0ea5e9) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .why-card:hover::before {
          opacity: 0.05;
        }
        
        .why-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08);
          border-color: var(--card-color, #0ea5e9);
        }
        
        .why-icon-wrapper {
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, var(--card-color, #0ea5e9) 0%, var(--card-color-dark, #0c4a6e) 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
          position: relative;
          z-index: 1;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .why-card:hover .why-icon-wrapper {
          transform: scale(1.15) rotate(-8deg);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
        }
        
        .why-card-title {
          font-family: 'Crimson Pro', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #0c4a6e;
          margin: 0 0 1rem 0;
          line-height: 1.3;
          position: relative;
          z-index: 1;
          transition: color 0.3s ease;
        }
        
        .why-card:hover .why-card-title {
          color: var(--card-color, #0ea5e9);
        }
        
        .why-card-description {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #64748b;
          line-height: 1.7;
          margin: 0;
          position: relative;
          z-index: 1;
        }
        
        .why-stats {
          margin-top: 5rem;
          background: linear-gradient(135deg, #0c4a6e 0%, #0ea5e9 100%);
          border-radius: 24px;
          padding: 3rem 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .why-stats::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 40px);
          pointer-events: none;
        }
        
        .why-stat {
          text-align: center;
          position: relative;
          z-index: 1;
        }
        
        .why-stat-number {
          font-family: 'Crimson Pro', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: white;
          line-height: 1;
          margin-bottom: 0.75rem;
        }
        
        .why-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }
        
        @media (max-width: 768px) {
          .why-section {
            padding: 4rem 1rem;
          }
          
          .why-header {
            margin-bottom: 3rem;
          }
          
          .why-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .why-card {
            padding: 2rem 1.5rem;
          }
          
          .why-stats {
            padding: 2rem 1.5rem;
            gap: 1.5rem;
          }
        }
      `}</style>

      <section className="why-section">
        <div className="why-container">
          {/* Header */}
          <motion.div
            className="why-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <p className="why-subtitle">Why Choose PhysioCare</p>
            <h2 className="why-title">Excellence in Physiotherapy Care</h2>
            <p className="why-description">
              We combine clinical expertise, advanced technology, and personalized care 
              to help you achieve optimal recovery and wellness.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="why-grid">
            {features.map((item, i) => (
              <motion.div
                key={item.title}
                className="why-card"
                style={{
                  '--card-color': item.color,
                  '--card-color-dark': item.color,
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: i * 0.1,
                }}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 25 },
                }}
              >
                <motion.div
                  className="why-icon-wrapper"
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="why-card-title">{item.title}</h3>
                <p className="why-card-description">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            className="why-stats"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
          >
            <div className="why-stat">
              <motion.div
                className="why-stat-number"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                2000+
              </motion.div>
              <div className="why-stat-label">Happy Patients</div>
            </div>
            <div className="why-stat">
              <motion.div
                className="why-stat-number"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                15+
              </motion.div>
              <div className="why-stat-label">Years Experience</div>
            </div>
            <div className="why-stat">
              <motion.div
                className="why-stat-number"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                98%
              </motion.div>
              <div className="why-stat-label">Success Rate</div>
            </div>
            <div className="why-stat">
              <motion.div
                className="why-stat-number"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                50+
              </motion.div>
              <div className="why-stat-label">Treatment Types</div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}