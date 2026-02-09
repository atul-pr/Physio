import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { services } from "../data/services";
import Hero from "../components/Hero";

export default function ServiceDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();

    // Find the service by slug
    const service = services.find(s => s.slug === slug);

    // If service not found, redirect to services page
    if (!service) {
        navigate("/services");
        return null;
    }

    // Get related services (other services)
    const relatedServices = services.filter(s => s.id !== service.id).slice(0, 3);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Hero Section */}
            <Hero
                title={service.title}
                subtitle={service.description}
                showCta={false}
            />

            {/* Breadcrumb Navigation */}
            <section style={{ background: "var(--color-bg-alt)", padding: "1rem 1.5rem", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                <div className="container">
                    <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                        <Link to="/" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Home</Link>
                        <span>/</span>
                        <Link to="/services" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Services</Link>
                        <span>/</span>
                        <span style={{ color: "var(--color-text)" }}>{service.title}</span>
                    </nav>
                </div>
            </section>

            {/* Main Content */}
            <section className="section" style={{ padding: "4rem 1.5rem" }}>
                <div className="container" style={{ maxWidth: "1200px" }}>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Service Icon and Full Description */}
                        <motion.div variants={itemVariants} style={{ marginBottom: "4rem", textAlign: "center" }}>
                            <div style={{ fontSize: "5rem", marginBottom: "1.5rem" }}>{service.icon}</div>
                            <p style={{ fontSize: "1.2rem", lineHeight: "1.8", color: "var(--color-text)", maxWidth: "800px", margin: "0 auto" }}>
                                {service.fullDescription}
                            </p>
                        </motion.div>

                        {/* Benefits Section */}
                        <motion.div variants={itemVariants} style={{ marginBottom: "4rem" }}>
                            <h2 style={{ fontSize: "2rem", marginBottom: "2rem", color: "var(--color-primary)", textAlign: "center" }}>
                                Benefits of Treatment
                            </h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                                {service.benefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        style={{
                                            background: "var(--color-bg-alt)",
                                            padding: "1.5rem",
                                            borderRadius: "12px",
                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: "1rem"
                                        }}
                                    >
                                        <span style={{ color: "var(--color-primary)", fontSize: "1.5rem", flexShrink: 0 }}>✓</span>
                                        <p style={{ margin: 0, color: "var(--color-text)" }}>{benefit}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Conditions Treated Section */}
                        <motion.div variants={itemVariants} style={{ marginBottom: "4rem" }}>
                            <h2 style={{ fontSize: "2rem", marginBottom: "2rem", color: "var(--color-primary)", textAlign: "center" }}>
                                Conditions We Treat
                            </h2>
                            <div style={{
                                background: "var(--color-bg-alt)",
                                padding: "2.5rem",
                                borderRadius: "12px",
                                border: "1px solid rgba(255, 255, 255, 0.1)"
                            }}>
                                <ul style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                                    gap: "1rem",
                                    listStyle: "none",
                                    padding: 0,
                                    margin: 0
                                }}>
                                    {service.conditions.map((condition, index) => (
                                        <li key={index} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                            <span style={{ color: "var(--color-primary)", fontSize: "1.2rem" }}>•</span>
                                            <span style={{ color: "var(--color-text)" }}>{condition}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Treatment Approach Section */}
                        <motion.div variants={itemVariants} style={{ marginBottom: "4rem" }}>
                            <h2 style={{ fontSize: "2rem", marginBottom: "2rem", color: "var(--color-primary)", textAlign: "center" }}>
                                Our Treatment Approach
                            </h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                                {service.approach.map((method, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.03 }}
                                        style={{
                                            background: "linear-gradient(135deg, var(--color-primary) 0%, #0284c7 100%)",
                                            padding: "1.5rem",
                                            borderRadius: "12px",
                                            color: "white",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1rem",
                                            cursor: "default"
                                        }}
                                    >
                                        <span style={{ fontSize: "1.5rem", fontWeight: "bold", opacity: 0.7 }}>{index + 1}</span>
                                        <p style={{ margin: 0, fontWeight: "500" }}>{method}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>



                        {/* Call to Action */}
                        <motion.div variants={itemVariants} style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "var(--color-text)" }}>
                                Ready to Start Your Recovery?
                            </h2>
                            <p style={{ fontSize: "1.1rem", marginBottom: "2rem", color: "var(--color-text-muted)", maxWidth: "600px", margin: "0 auto 2rem" }}>
                                Book an appointment today and take the first step towards better health and wellness.
                            </p>
                            <Link to="/appointment" className="btn btn-primary btn-lg" style={{ display: "inline-block" }}>
                                Book Appointment →
                            </Link>
                        </motion.div>

                        {/* Related Services */}
                        {relatedServices.length > 0 && (
                            <motion.div variants={itemVariants}>
                                <h2 style={{ fontSize: "2rem", marginBottom: "2rem", color: "var(--color-primary)", textAlign: "center" }}>
                                    Other Services
                                </h2>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                                    {relatedServices.map((relatedService) => (
                                        <Link
                                            key={relatedService.id}
                                            to={`/services/${relatedService.slug}`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.05, y: -5 }}
                                                style={{
                                                    background: "var(--color-bg-alt)",
                                                    padding: "2rem",
                                                    borderRadius: "12px",
                                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                                    textAlign: "center",
                                                    cursor: "pointer",
                                                    transition: "all 0.3s ease"
                                                }}
                                            >
                                                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{relatedService.icon}</div>
                                                <h3 style={{ fontSize: "1.3rem", marginBottom: "0.75rem", color: "var(--color-primary)" }}>
                                                    {relatedService.title}
                                                </h3>
                                                <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                                                    {relatedService.description}
                                                </p>
                                                <span style={{ color: "var(--color-primary)", marginTop: "1rem", display: "inline-block", fontWeight: "500" }}>
                                                    Learn More →
                                                </span>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
}
