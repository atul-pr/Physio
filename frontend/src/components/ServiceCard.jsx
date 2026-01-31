import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ServiceCard({ service, index = 0 }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        
        .service-card-wrapper {
          position: relative;
          height: 100%;
        }
        
        .service-card-inner {
          background: white;
          border-radius: 20px;
          padding: 2.5rem 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(14, 165, 233, 0.1);
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        
        .service-card-inner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #0ea5e9 0%, #0c4a6e 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .service-card-wrapper:hover .service-card-inner::before {
          transform: scaleX(1);
        }
        
        .service-card-inner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.03) 0%, rgba(12, 74, 110, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .service-card-wrapper:hover .service-card-inner::after {
          opacity: 1;
        }
        
        .service-card-icon-wrapper {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #0ea5e9 0%, #0c4a6e 100%);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 8px 20px rgba(14, 165, 233, 0.25);
          position: relative;
          z-index: 1;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .service-card-wrapper:hover .service-card-icon-wrapper {
          transform: scale(1.1) rotate(-5deg);
          box-shadow: 0 12px 30px rgba(14, 165, 233, 0.35);
        }
        
        .service-card-title {
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
        
        .service-card-wrapper:hover .service-card-title {
          color: #0ea5e9;
        }
        
        .service-card-description {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #64748b;
          line-height: 1.7;
          margin: 0 0 1.5rem 0;
          flex-grow: 1;
          position: relative;
          z-index: 1;
        }
        
        .service-card-link {
          font-family: 'Inter', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #0ea5e9;
          font-weight: 600;
          font-size: 0.9375rem;
          text-decoration: none;
          position: relative;
          z-index: 1;
          transition: gap 0.3s ease;
        }
        
        .service-card-link:hover {
          gap: 0.75rem;
        }
        
        .service-card-link::after {
          content: '→';
          transition: transform 0.3s ease;
        }
        
        .service-card-link:hover::after {
          transform: translateX(4px);
        }
        
        .service-card-badge {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: white;
          padding: 0.375rem 0.875rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
          z-index: 1;
        }
        
        @media (max-width: 768px) {
          .service-card-inner {
            padding: 2rem 1.5rem;
          }
          
          .service-card-icon-wrapper {
            width: 70px;
            height: 70px;
            font-size: 2rem;
          }
        }
      `}</style>

      <motion.article
        className="service-card-wrapper"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: index * 0.1,
        }}
        whileHover={{
          y: -8,
          transition: { type: "spring", stiffness: 300, damping: 25 },
        }}
      >
        <div className="service-card-inner">
          {service.popular && (
            <div className="service-card-badge">Popular</div>
          )}

          <motion.div
            className="service-card-icon-wrapper"
            whileHover={{
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 }
            }}
          >
            {service.icon}
          </motion.div>

          <h3 className="service-card-title">{service.title}</h3>
          <p className="service-card-description">{service.description}</p>

          <Link to={`/services/${service.slug}`} className="service-card-link">
            Learn More
          </Link>
        </div>
      </motion.article>
    </>
  );
}