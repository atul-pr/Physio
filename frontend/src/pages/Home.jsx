import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import WhyChooseUs from "../components/WhyChooseUs";
import DoctorSection from "../components/DoctorSection";
import { services } from "../data/services";
import { videos } from "../data/videos";
import { apiMethods } from "../api/config";

// Smooth animation config
const spring = { type: "spring", stiffness: 100, damping: 20 };
const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function Home() {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    // Fetch doctor information from API
    const fetchContent = async () => {
      try {
        const response = await apiMethods.getContent();
        if (response.data && response.data.doctor) {
          setDoctor(response.data.doctor);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };
    fetchContent();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Hero
        title="Expert Physiotherapy & Rehabilitation"
        subtitle="Personalized care for sports injuries, orthopaedic conditions, and neurological rehabilitation. Your journey to recovery starts here."
        ctaText="Book Appointment"
        ctaLink="/appointment"
      />

      {/* Services Preview */}
      <section className="section" style={{ padding: "5rem 1.5rem" }}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {},
            }}
          >
            <motion.h2 className="section-title" variants={fadeInUp} transition={spring}>
              Our Services
            </motion.h2>
            <motion.p
              className="section-subtitle"
              variants={fadeInUp}
              transition={spring}
            >
              Comprehensive physiotherapy and rehabilitation services tailored to your needs.
            </motion.p>
          </motion.div>

          <div className="services-grid">
            {services.slice(0, 3).map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>

          <motion.div
            style={{ textAlign: "center", marginTop: "2rem" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={spring}
          >
            <Link to="/services" className="btn btn-outline">
              View All Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* YouTube Videos Section */}
      <section className="section videos-section" style={{ padding: "5rem 1.5rem", background: "var(--color-bg-alt)" }}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {},
            }}
          >
            <motion.h2 className="section-title" variants={fadeInUp} transition={spring}>
              Helpful Videos
            </motion.h2>
            <motion.p
              className="section-subtitle"
              variants={fadeInUp}
              transition={spring}
            >
              Watch our curated physiotherapy and rehabilitation videos.
            </motion.p>
          </motion.div>

          <div className="videos-grid">
            {videos.map((video, i) => (
              <motion.div
                key={video.id}
                className="video-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ ...spring, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="video-embed">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Section */}
      <DoctorSection doctor={doctor} />

      <WhyChooseUs />

      {/* CTA Section */}
      <section className="section" style={{ padding: "5rem 1.5rem", background: "var(--color-bg)" }}>
        <div className="container">
          <motion.div
            className="cta-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
            style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}
          >
            <h2 className="section-title">Ready to Start Your Recovery?</h2>
            <p className="section-subtitle" style={{ marginBottom: "1.5rem" }}>
              Book an appointment today and take the first step towards a pain-free life.
            </p>
            <Link to="/appointment" className="btn btn-primary btn-lg">
              Book Appointment
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
