import { motion } from "framer-motion";

const spring = { type: "spring", stiffness: 100, damping: 20 };
const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function DoctorSection({ doctor }) {
    if (!doctor) return null;

    return (
        <section className="section" style={{ padding: "5rem 1.5rem", background: "var(--color-bg)" }}>
            <div className="container">
                <motion.div
                    className="doctor-container"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.15 } },
                        hidden: {},
                    }}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "3rem",
                        alignItems: "center",
                        maxWidth: "1000px",
                        margin: "0 auto",
                    }}
                >
                    {/* Doctor Image */}
                    {doctor.image && (
                        <motion.div
                            variants={fadeInUp}
                            transition={spring}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    maxWidth: "400px",
                                    aspectRatio: "1",
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                }}
                            >
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Doctor Info */}
                    <motion.div
                        variants={fadeInUp}
                        transition={spring}
                        style={{
                            textAlign: doctor.image ? "left" : "center",
                        }}
                    >
                        <h2
                            className="section-title"
                            style={{
                                marginBottom: "0.75rem",
                                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                            }}
                        >
                            {doctor.name}
                        </h2>
                        <p
                            style={{
                                color: "var(--color-primary)",
                                fontSize: "1.125rem",
                                fontWeight: "600",
                                marginBottom: "1.5rem",
                            }}
                        >
                            {doctor.title}
                        </p>
                        <p
                            className="section-subtitle"
                            style={{
                                lineHeight: 1.8,
                                fontSize: "1.0625rem",
                            }}
                        >
                            {doctor.description}
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
