import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import DoctorSection from "../components/DoctorSection";
import { apiMethods } from "../api/config";

export default function About() {
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
      transition={{ duration: 0.3 }}
    >
      <Hero
        title="About PhysioCare"
        subtitle="Dedicated to helping you recover, move better, and live pain-free."
        showCta={true}
        ctaText="Book Appointment"
        ctaLink="/appointment"
      />

      <section className="section" style={{ padding: "5rem 1.5rem" }}>
        <div className="container">
          <motion.div
            className="about-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
          >
            <h2 className="section-title">Our Story</h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", lineHeight: 1.8 }}>
              PhysioCare was founded with a simple mission: to provide accessible, high-quality
              physiotherapy and rehabilitation services. Our clinic owner brings years of experience
              in treating sports injuries, orthopaedic conditions, post-operative rehabilitation,
              and neurological conditions.
            </p>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem", lineHeight: 1.8 }}>
              We believe in a patient-centered approach. Every treatment plan is tailored to your
              unique needs, goals, and lifestyle. Whether you are recovering from surgery, managing
              chronic pain, or looking to improve your athletic performance, we are here to support
              your journey.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Doctor Section */}
      <DoctorSection doctor={doctor} />

      <WhyChooseUs />
    </motion.div>
  );
}
