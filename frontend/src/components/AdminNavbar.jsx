import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

export default function AdminNavbar() {
    const { theme, toggleTheme, colors } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/login");
    };

    const navItems = [
        { path: "/admin", label: "Appointments", icon: "📅" },
        { path: "/admin/slider", label: "Sliders", icon: "🎨" },
        { path: "/admin/doctor", label: "Doctors", icon: "👨‍⚕️" },
        { path: "/admin/videos", label: "Videos", icon: "🎥" },
        { path: "/admin/social", label: "Social", icon: "💬" },
    ];

    return (
        <nav style={{
            background: colors.cardBg,
            borderBottom: `1px solid ${colors.border}`,
            padding: "0.75rem 1.5rem",
            position: "sticky",
            top: 0,
            zIndex: 1000,
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease"
        }}>
            <div style={{
                maxWidth: "1400px",
                margin: "0 auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                    <Link to="/admin" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "1.5rem" }}>🏥</span>
                        <span style={{
                            fontSize: "1.25rem",
                            fontWeight: "800",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            letterSpacing: "-0.5px"
                        }}>
                            PhysioCare Admin
                        </span>
                    </Link>

                    <div style={{ display: "flex", gap: "0.5rem", background: colors.background, padding: "0.25rem", borderRadius: "12px", border: `1px solid ${colors.border}` }}>
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    style={{ textDecoration: "none" }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            padding: "0.5rem 1rem",
                                            borderRadius: "10px",
                                            fontSize: "0.875rem",
                                            fontWeight: "600",
                                            color: isActive ? "white" : colors.textSecondary,
                                            background: isActive ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "transparent",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                            transition: "all 0.2s ease"
                                        }}
                                    >
                                        <span>{item.icon}</span>
                                        <span className="nav-label">{item.label}</span>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <motion.button
                        onClick={toggleTheme}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            background: colors.background,
                            border: `1px solid ${colors.border}`,
                            color: colors.textPrimary,
                            width: "40px",
                            height: "40px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontSize: "1.2rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: colors.shadow
                        }}
                        title="Toggle dark mode"
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </motion.button>

                    <motion.button
                        onClick={handleLogout}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: "0.6rem 1.25rem",
                            background: "#fee2e2",
                            color: "#ef4444",
                            border: "1px solid #fecaca",
                            borderRadius: "10px",
                            fontSize: "0.875rem",
                            fontWeight: "700",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem"
                        }}
                    >
                        🚪 Logout
                    </motion.button>
                </div>
            </div>
            
            <style>{`
                @media (max-width: 768px) {
                    .nav-label {
                        display: none;
                    }
                }
            `}</style>
        </nav>
    );
}
