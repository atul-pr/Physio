import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard";
import Hero from "../components/Hero";
import { services } from "../data/services";

export default function Services() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero
        title="Our Services"
        subtitle="Comprehensive physiotherapy and rehabilitation care for a wide range of conditions."
        showCta={true}
        ctaText="Book Appointment"
        ctaLink="/appointment"
      />

      <section className="section" style={{ padding: "5rem 1.5rem" }}>
        <div className="container">
          <div className="services-grid">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
