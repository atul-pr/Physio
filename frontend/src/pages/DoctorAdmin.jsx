import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import DoctorManagement from "../components/DoctorManagement";

export default function DoctorAdmin() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div style={{
            minHeight: "100vh",
            background: "#f8fafc",
            fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700;900&display=swap');
      `}</style>

            {/* Header */}
            <div style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "2rem 1.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}>
                        <div>
                            <h1 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                                fontWeight: "900",
                                color: "white",
                                margin: 0,
                                marginBottom: "0.5rem",
                            }}>
                                Doctor Profile Management
                            </h1>
                            <p style={{
                                color: "rgba(255, 255, 255, 0.9)",
                                margin: 0,
                                fontSize: "0.95rem",
                            }}>
                                Update doctor information displayed on your website
                            </p>
                        </div>
                        <Link
                            to="/admin"
                            style={{
                                padding: "0.875rem 1.75rem",
                                background: "white",
                                color: "#667eea",
                                border: "none",
                                borderRadius: "12px",
                                fontSize: "1rem",
                                fontWeight: "600",
                                textDecoration: "none",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                display: "inline-block",
                            }}
                        >
                            ← Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <DoctorManagement />
                </motion.div>
            </div>
        </div>
    );
}
