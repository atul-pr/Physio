'use client';

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { apiMethods } from "../api/config";
import { useTheme } from "../hooks/useTheme";
import ThemeToggle from "../components/ThemeToggle";

export default function AdminDashboard() {
  const { theme, toggleTheme, colors } = useTheme();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    phone: "",
    problem: "",
    date: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchAppointments();
  }, [navigate]);

  useEffect(() => {
    let filtered = appointments;

    if (statusFilter !== "All") {
      filtered = filtered.filter((apt) => apt.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (apt) =>
          apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.phone.includes(searchTerm) ||
          apt.problem.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAppointments(filtered);
  }, [appointments, statusFilter, searchTerm]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await apiMethods.getAppointments();
      setAppointments(res.data);
      setMessage({ type: "", text: "" });
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setMessage({ type: "error", text: "Failed to load appointments" });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (newAppointment.patientName.trim().length < 2) {
      setMessage({ type: "error", text: "Patient name must be at least 2 characters long." });
      return;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(newAppointment.phone.replace(/[\s-]/g, ''))) {
      setMessage({ type: "error", text: "Please provide a valid 10-digit phone number." });
      return;
    }
    const appointmentDate = new Date(newAppointment.date);
    if (appointmentDate < new Date()) {
      setMessage({ type: "error", text: "Appointment date must be in the future." });
      return;
    }
    if (newAppointment.problem.trim().length < 5) {
      setMessage({ type: "error", text: "Please provide a more descriptive problem." });
      return;
    }

    try {
      setLoading(true);
      await apiMethods.createAppointment(newAppointment);
      setNewAppointment({ patientName: "", phone: "", problem: "", date: "" });
      setShowNewForm(false);
      setMessage({ type: "success", text: "Appointment created successfully!" });
      await fetchAppointments();
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to create appointment" });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (appointment) => {
    setEditingId(appointment._id);
    setEditFormData(appointment);
    setIsModalOpen(true);
  };

  const handleUpdateAppointment = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (editFormData.patientName.trim().length < 2) {
      setMessage({ type: "error", text: "Patient name must be at least 2 characters long." });
      return;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(editFormData.phone.replace(/[\s-]/g, ''))) {
      setMessage({ type: "error", text: "Please provide a valid 10-digit phone number." });
      return;
    }
    const appointmentDate = new Date(editFormData.date);
    if (appointmentDate < new Date()) {
      setMessage({ type: "error", text: "Appointment date must be in the future." });
      return;
    }
    if (editFormData.problem.trim().length < 5) {
      setMessage({ type: "error", text: "Please provide a more descriptive problem." });
      return;
    }

    try {
      setLoading(true);
      await apiMethods.updateAppointment(editingId, editFormData);
      setAppointments((prev) =>
        prev.map((a) => (a._id === editingId ? { ...a, ...editFormData } : a))
      );
      setIsModalOpen(false);
      setEditingId(null);
      setMessage({ type: "success", text: "Appointment updated successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to update appointment" });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await apiMethods.updateAppointment(id, { status: newStatus });
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
      );
      setMessage({ type: "success", text: `Status updated to ${newStatus}` });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to update status" });
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      setLoading(true);
      await apiMethods.deleteAppointment(id);
      setAppointments((prev) => prev.filter((a) => a._id !== id));
      setMessage({ type: "success", text: "Appointment deleted successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete appointment" });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" };
      case "Cancelled":
        return { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5" };
      default:
        return { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" };
    }
  };

  const statsData = [
    {
      label: "Total",
      value: appointments.length,
      icon: "📊",
      color: "#3b82f6"
    },
    {
      label: "Pending",
      value: appointments.filter(a => a.status === "Pending").length,
      icon: "⏳",
      color: "#f59e0b"
    },
    {
      label: "Confirmed",
      value: appointments.filter(a => a.status === "Confirmed").length,
      icon: "✅",
      color: "#10b981"
    },
    {
      label: "Cancelled",
      value: appointments.filter(a => a.status === "Cancelled").length,
      icon: "❌",
      color: "#ef4444"
    }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: colors.background,
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      transition: "background 0.3s ease"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700;900&display=swap');
        
        * {
          box-sizing: border-box;
        }

        html, body {
           overflow-x: hidden;
           width: 100%;
        }
        
        .stat-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stat-card:hover {
          transform: translateY(-4px);
        }
        
        .appointment-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .appointment-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        
        input, textarea, select {
          transition: all 0.2s ease;
        }
        
        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: #667eea !important;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          .appointments-grid {
            grid-template-columns: 1fr !important;
          }
          
          .filter-buttons {
            flex-wrap: wrap;
          }
        }
        
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          .header-section {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 1.25rem !important;
            padding: 0 !important;
          }
          .header-actions {
            width: 100% !important;
            justify-content: flex-start !important;
            gap: 0.75rem !important;
            flex-wrap: wrap !important;
          }
          .header-title {
            font-size: 1.5rem !important;
            margin-bottom: 0.25rem !important;
          }
          .header-subtitle {
            font-size: 0.9375rem !important;
          }
          .nav-grid {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
          .mobile-btn {
            padding: 0.625rem 1rem !important;
            font-size: 0.875rem !important;
            flex: 1;
            justify-content: center;
          }
          .stat-card {
            padding: 1rem !important;
          }
          .nav-item {
            padding: 0.75rem 1rem !important;
          }
        }
      `}</style>


      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Header Section */}
        <div className="header-section" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "2rem" }}>
          <div>
            <h1 className="header-title" style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              color: colors.textPrimary,
              margin: 0,
              marginBottom: "0.5rem",
              letterSpacing: "-0.5px"
            }}>
              Appointments Dashboard
            </h1>
            <p className="header-subtitle" style={{ color: colors.textSecondary, margin: 0, fontSize: "1.125rem" }}>
              Monitor and manage patient appointment requests efficiently
            </p>
          </div>
          <div className="header-actions" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} colors={colors} />
            <motion.button
              onClick={() => setShowNewForm(!showNewForm)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mobile-btn"
              style={{
                padding: "0.75rem 1.5rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 6px -1px rgba(102, 126, 234, 0.3)",
                display: "flex",
                alignItems: "center"
              }}
            >
              {showNewForm ? "✕ Close" : "+ Create"}
            </motion.button>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mobile-btn"
              style={{
                padding: "0.75rem 1.5rem",
                background: "rgba(239, 68, 68, 0.1)",
                color: "#ef4444",
                border: "2px solid #ef4444",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: "700",
                cursor: "pointer",
                display: "flex",
                alignItems: "center"
              }}
            >
              Logout
            </motion.button>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="nav-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          marginTop: "2rem",
          marginBottom: "2rem"
        }}>
          {[
            { path: "/admin/slider", label: "Sliders", icon: "🎨" },
            { path: "/admin/doctor", label: "Doctors", icon: "👨‍⚕️" },
            { path: "/admin/videos", label: "Videos", icon: "🎥" },
            { path: "/admin/social", label: "Social Links", icon: "💬" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{ textDecoration: "none" }}
            >
              <motion.div
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className="nav-item"
                style={{
                  padding: "1rem 1.25rem",
                  background: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  boxShadow: colors.shadow,
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "rgba(102, 126, 234, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.125rem"
                }}>
                  {item.icon}
                </div>
                <span style={{ fontWeight: "700", color: colors.textPrimary, fontSize: "0.9375rem" }}>{item.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>

        <div>
          {/* Stats Cards */}
          <div className="stats-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2rem"
          }}>
            {statsData.map((stat, idx) => (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                style={{
                  background: colors.cardBg,
                  padding: "1.5rem",
                  borderRadius: "16px",
                  boxShadow: colors.shadow,
                  border: `1px solid ${colors.border}`,
                  transition: "all 0.3s ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: `${stat.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem"
                  }}>
                    {stat.icon}
                  </div>
                  <div>
                    <div style={{
                      fontSize: "0.875rem",
                      color: colors.textSecondary,
                      marginBottom: "0.25rem"
                    }}>
                      {stat.label}
                    </div>
                    <div style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      color: colors.textPrimary
                    }}>
                      {stat.value}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message Display */}
          <AnimatePresence>
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  padding: "1rem 1.25rem",
                  borderRadius: "12px",
                  marginBottom: "1.5rem",
                  background: message.type === "success" ? "#d1fae5" : "#fee2e2",
                  color: message.type === "success" ? "#065f46" : "#991b1b",
                  border: `1px solid ${message.type === "success" ? "#6ee7b7" : "#fca5a5"}`,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  fontSize: "0.9375rem",
                  fontWeight: "500"
                }}
              >
                <span>{message.type === "success" ? "✓" : "⚠"}</span>
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          {/* New Appointment Form */}
          <AnimatePresence>
            {showNewForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  background: colors.cardBg,
                  border: "2px solid #667eea",
                  borderRadius: "16px",
                  padding: "2rem",
                  marginBottom: "2rem",
                  boxShadow: colors.shadow,
                  transition: "all 0.3s ease"
                }}
              >
                <h3 style={{
                  marginTop: 0,
                  marginBottom: "1.5rem",
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  color: colors.textPrimary
                }}>
                  Create New Appointment
                </h3>
                <form onSubmit={handleCreateAppointment}>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "1.25rem",
                    marginBottom: "1.25rem"
                  }}>
                    <div>
                      <label style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#475569"
                      }}>
                        Patient Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter patient name"
                        value={newAppointment.patientName}
                        onChange={(e) =>
                          setNewAppointment({ ...newAppointment, patientName: e.target.value })
                        }
                        required
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "1rem",
                          color: "#1e293b"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#475569"
                      }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        value={newAppointment.phone}
                        onChange={(e) =>
                          setNewAppointment({ ...newAppointment, phone: e.target.value })
                        }
                        required
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "1rem",
                          color: "#1e293b"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#475569"
                      }}>
                        Appointment Date *
                      </label>
                      <input
                        type="datetime-local"
                        value={newAppointment.date}
                        onChange={(e) =>
                          setNewAppointment({ ...newAppointment, date: e.target.value })
                        }
                        required
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "1rem",
                          color: "#1e293b"
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#475569"
                    }}>
                      Medical Condition / Problem *
                    </label>
                    <textarea
                      placeholder="Describe the medical condition or reason for visit"
                      value={newAppointment.problem}
                      onChange={(e) =>
                        setNewAppointment({ ...newAppointment, problem: e.target.value })
                      }
                      required
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "1rem",
                        fontFamily: "inherit",
                        color: "#1e293b",
                        resize: "vertical"
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{
                      padding: "0.875rem 2rem",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "1rem"
                    }}
                  >
                    {loading ? "Creating..." : "Create Appointment"}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filters & Search */}
          <div style={{
            background: colors.cardBg,
            padding: "1.5rem",
            borderRadius: "16px",
            marginBottom: "2rem",
            boxShadow: colors.shadow,
            border: `1px solid ${colors.border}`,
            transition: "all 0.3s ease"
          }}>
            <div style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "center"
            }}>
              <input
                type="text"
                placeholder="🔍 Search by name, phone, or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: "1",
                  minWidth: "250px",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  border: `1px solid ${colors.inputBorder}`,
                  fontSize: "0.9375rem",
                  color: colors.textPrimary,
                  background: colors.inputBg,
                  transition: "all 0.2s ease"
                }}
              />
              <div className="filter-buttons" style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap"
              }}>
                {["All", "Pending", "Confirmed", "Cancelled"].map((status) => (
                  <motion.button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: "0.625rem 1.25rem",
                      borderRadius: "8px",
                      border: "2px solid",
                      borderColor: statusFilter === status ? "#667eea" : colors.border,
                      background: statusFilter === status ? "#667eea" : colors.cardBg,
                      color: statusFilter === status ? "white" : colors.textSecondary,
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {status}
                  </motion.button>
                ))}
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <motion.button
                  onClick={() => setViewMode("grid")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "0.625rem",
                    borderRadius: "8px",
                    border: "2px solid",
                    borderColor: viewMode === "grid" ? "#667eea" : "#cbd5e1",
                    background: viewMode === "grid" ? "#667eea" : "white",
                    color: viewMode === "grid" ? "white" : "#64748b",
                    cursor: "pointer",
                    fontSize: "1.125rem",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  ▦
                </motion.button>
                <motion.button
                  onClick={() => setViewMode("list")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "0.625rem",
                    borderRadius: "8px",
                    border: "2px solid",
                    borderColor: viewMode === "list" ? "#667eea" : "#cbd5e1",
                    background: viewMode === "list" ? "#667eea" : "white",
                    color: viewMode === "list" ? "white" : "#64748b",
                    cursor: "pointer",
                    fontSize: "1.125rem",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  ☰
                </motion.button>
              </div>
            </div>
            <p style={{
              color: colors.textSecondary,
              marginTop: "1rem",
              marginBottom: 0,
              fontSize: "0.875rem"
            }}>
              Showing <strong>{filteredAppointments.length}</strong> of <strong>{appointments.length}</strong> appointments
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <motion.div
              style={{ textAlign: "center", padding: "3rem" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div style={{
                width: "48px",
                height: "48px",
                border: "4px solid #e2e8f0",
                borderTop: "4px solid #667eea",
                borderRadius: "50%",
                margin: "0 auto 1rem",
                animation: "spin 1s linear infinite"
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <p style={{ color: "#64748b", fontSize: "0.9375rem" }}>Loading appointments...</p>
            </motion.div>
          )}

          {/* Appointments Display */}
          {!loading && (
            <motion.div
              className={viewMode === "grid" ? "appointments-grid" : ""}
              style={viewMode === "grid" ? {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "1.5rem"
              } : {
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AnimatePresence mode="popLayout">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((apt) => {
                    const statusColors = getStatusColor(apt.status);
                    return (
                      <motion.div
                        key={apt._id}
                        className="appointment-card"
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        style={{
                          background: colors.cardBg,
                          border: `1px solid ${colors.border}`,
                          borderRadius: "16px",
                          padding: "1.5rem",
                          boxShadow: colors.shadow,
                          transition: "all 0.3s ease"
                        }}
                      >
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "start",
                          marginBottom: "1rem"
                        }}>
                          <h3 style={{
                            margin: 0,
                            fontSize: "1.25rem",
                            fontWeight: "700",
                            color: colors.textPrimary
                          }}>
                            {apt.patientName}
                          </h3>
                          <span style={{
                            padding: "0.375rem 0.875rem",
                            borderRadius: "20px",
                            background: statusColors.bg,
                            color: statusColors.text,
                            border: `1px solid ${statusColors.border}`,
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                          }}>
                            {apt.status}
                          </span>
                        </div>

                        <div style={{ marginBottom: "1.25rem" }}>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            marginBottom: "0.625rem",
                            color: "#475569",
                            fontSize: "0.9375rem"
                          }}>
                            <span style={{ fontSize: "1.125rem" }}>📞</span>
                            <span>{apt.phone}</span>
                          </div>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            marginBottom: "0.625rem",
                            color: "#475569",
                            fontSize: "0.9375rem"
                          }}>
                            <span style={{ fontSize: "1.125rem" }}>📅</span>
                            <span>
                              {new Date(apt.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })} at {new Date(apt.date).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <div style={{
                            display: "flex",
                            alignItems: "start",
                            gap: "0.75rem",
                            color: colors.textSecondary,
                            fontSize: "0.9375rem"
                          }}>
                            <span style={{ fontSize: "1.125rem", marginTop: "2px" }}>📋</span>
                            <span style={{
                              flex: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              lineHeight: "1.5"
                            }}>{apt.problem}</span>
                          </div>
                        </div>

                        <div style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "0.625rem",
                          marginBottom: "1.25rem"
                        }}>
                          <select
                            value={apt.status}
                            onChange={(e) => handleStatusChange(apt._id, e.target.value)}
                            style={{
                              padding: "0.625rem",
                              borderRadius: "8px",
                              border: `1px solid ${colors.inputBorder}`,
                              background: colors.inputBg,
                              color: colors.textPrimary,
                              cursor: "pointer",
                              fontSize: "0.875rem",
                              fontWeight: "500",
                              transition: "all 0.2s ease"
                            }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <motion.button
                            onClick={() => handleEditClick(apt)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                              padding: "0.625rem",
                              borderRadius: "8px",
                              border: "none",
                              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              color: "white",
                              cursor: "pointer",
                              fontSize: "0.875rem",
                              fontWeight: "600",
                              transition: "all 0.2s ease",
                              boxShadow: "0 2px 4px rgba(102, 126, 234, 0.2)"
                            }}
                          >
                            📝 View Details
                          </motion.button>
                        </div>

                        <motion.button
                          onClick={() => handleDeleteAppointment(apt._id)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          style={{
                            width: "100%",
                            padding: "0.625rem",
                            borderRadius: "8px",
                            border: "1px solid #ef4444",
                            background: "#fef2f2",
                            color: "#ef4444",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "0.875rem"
                          }}
                        >
                          🗑️ Delete
                        </motion.button>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div
                    style={{
                      gridColumn: "1 / -1",
                      textAlign: "center",
                      padding: "4rem 1rem",
                      background: "white",
                      borderRadius: "16px",
                      border: "2px dashed #cbd5e1"
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📋</div>
                    <p style={{
                      fontSize: "1.125rem",
                      color: "#64748b",
                      margin: 0
                    }}>
                      No appointments found
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                padding: "1rem",
                backdropFilter: "blur(4px)"
              }}
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "2rem",
                  maxWidth: "540px",
                  width: "100%",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <h2 style={{
                  marginTop: 0,
                  marginBottom: "1.5rem",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#1e293b"
                }}>
                  Edit Appointment
                </h2>
                <form onSubmit={handleUpdateAppointment}>
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#475569"
                    }}>
                      Patient Name
                    </label>
                    <input
                      type="text"
                      value={editFormData.patientName || ""}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, patientName: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "1rem",
                        color: "#1e293b",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#475569"
                    }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={editFormData.phone || ""}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, phone: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "1rem",
                        color: "#1e293b",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#475569"
                    }}>
                      Medical Condition
                    </label>
                    <textarea
                      value={editFormData.problem || ""}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, problem: e.target.value })
                      }
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "1rem",
                        fontFamily: "inherit",
                        color: "#1e293b",
                        boxSizing: "border-box",
                        resize: "vertical"
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#475569"
                    }}>
                      Appointment Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={editFormData.date ? new Date(editFormData.date).toISOString().slice(0, 16) : ""}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, date: new Date(e.target.value).toISOString() })
                      }
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "1rem",
                        color: "#1e293b",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary"
                      style={{
                        flex: 1,
                        padding: "0.875rem",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "1rem"
                      }}
                    >
                      {loading ? "Updating..." : "Update Appointment"}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        flex: 1,
                        padding: "0.875rem",
                        background: "#f1f5f9",
                        border: "1px solid #cbd5e1",
                        color: "#475569",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "1rem"
                      }}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}