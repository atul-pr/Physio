'use client';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { apiMethods } from "../api/config";
import { useTheme } from "../hooks/useTheme";

export default function SocialLinksAdmin() {
    const { colors } = useTheme();
    const [socialLinks, setSocialLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        platform: "youtube",
        url: "",
        displayOrder: 0,
        isActive: true,
    });
    const navigate = useNavigate();

    const platforms = [
        { value: "youtube", label: "YouTube", icon: "🎥" },
        { value: "facebook", label: "Facebook", icon: "👍" },
        { value: "instagram", label: "Instagram", icon: "📷" },
        { value: "twitter", label: "Twitter/X", icon: "🐦" },
        { value: "linkedin", label: "LinkedIn", icon: "💼" },
        { value: "whatsapp", label: "WhatsApp", icon: "💬" },
    ];

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
        fetchSocialLinks();
    }, [navigate]);

    const fetchSocialLinks = async () => {
        try {
            const res = await apiMethods.getAllSocialLinks();
            setSocialLinks(res.data);
        } catch (error) {
            showMessage("error", "Failed to fetch social links");
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await apiMethods.updateSocialLink(editingId, formData);
                showMessage("success", "Social link updated successfully");
            } else {
                await apiMethods.createSocialLink(formData);
                showMessage("success", "Social link created successfully");
            }
            fetchSocialLinks();
            resetForm();
        } catch (error) {
            showMessage("error", error.response?.data?.message || "Operation failed");
        }
    };

    const handleEdit = (link) => {
        setFormData({
            platform: link.platform,
            url: link.url,
            displayOrder: link.displayOrder,
            isActive: link.isActive,
        });
        setEditingId(link._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this social link?")) return;
        try {
            await apiMethods.deleteSocialLink(id);
            showMessage("success", "Social link deleted successfully");
            fetchSocialLinks();
        } catch (error) {
            showMessage("error", "Failed to delete social link");
        }
    };

    const resetForm = () => {
        setFormData({
            platform: "youtube",
            url: "",
            displayOrder: 0,
            isActive: true,
        });
        setEditingId(null);
        setShowForm(false);
    };

    if (loading) {
        return (
            <div style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: colors.background
            }}>
                <p style={{ color: colors.textPrimary }}>Loading...</p>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: "100vh",
            background: colors.background,
            padding: "2rem 1.5rem",
            transition: "background 0.3s ease"
        }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                {/* Header */}
                <div style={{
                    background: colors.cardBg,
                    padding: "1.5rem",
                    borderRadius: "16px",
                    marginBottom: "2rem",
                    boxShadow: colors.shadow,
                    border: `1px solid ${colors.border}`
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                        <div>
                            <h1 style={{ margin: 0, marginBottom: "0.5rem", color: colors.textPrimary, fontSize: "2rem" }}>
                                Social Media Links
                            </h1>
                            <p style={{ margin: 0, color: colors.textSecondary }}>
                                Manage your social media links displayed in the navbar
                            </p>
                        </div>
                        <div style={{ display: "flex", gap: "0.75rem" }}>
                            <motion.button
                                onClick={() => navigate("/admin")}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: "0.75rem 1.5rem",
                                    background: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "10px",
                                    fontSize: "0.875rem",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                ← Back to Dashboard
                            </motion.button>
                            <motion.button
                                onClick={() => setShowForm(!showForm)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: "0.75rem 1.5rem",
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "10px",
                                    fontSize: "0.875rem",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    boxShadow: "0 2px 4px rgba(102, 126, 234, 0.3)"
                                }}
                            >
                                {showForm ? "✕ Cancel" : "+ Add Social Link"}
                            </motion.button>
                            <motion.button
                                onClick={handleLogout}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: "0.75rem 1.5rem",
                                    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "10px",
                                    fontSize: "0.875rem",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    boxShadow: "0 2px 4px rgba(239, 68, 68, 0.3)"
                                }}
                            >
                                🚪 Logout
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <AnimatePresence>
                    {message.text && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            style={{
                                padding: "1rem",
                                borderRadius: "10px",
                                marginBottom: "1rem",
                                background: message.type === "success" ? "#10b981" : "#ef4444",
                                color: "white",
                                fontWeight: "500"
                            }}
                        >
                            {message.text}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Form */}
                <AnimatePresence>
                    {showForm && (
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
                                boxShadow: colors.shadow
                            }}
                        >
                            <h3 style={{ marginTop: 0, color: colors.textPrimary }}>
                                {editingId ? "Edit Social Link" : "Add New Social Link"}
                            </h3>
                            <form onSubmit={handleSubmit}>
                                <div style={{ display: "grid", gap: "1.5rem" }}>
                                    <div>
                                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: colors.textSecondary }}>
                                            Platform
                                        </label>
                                        <select
                                            value={formData.platform}
                                            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                            required
                                            style={{
                                                width: "100%",
                                                padding: "0.75rem",
                                                borderRadius: "8px",
                                                border: `1px solid ${colors.inputBorder}`,
                                                background: colors.inputBg,
                                                color: colors.textPrimary,
                                                fontSize: "1rem"
                                            }}
                                        >
                                            {platforms.map((p) => (
                                                <option key={p.value} value={p.value}>
                                                    {p.icon} {p.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: colors.textSecondary }}>
                                            URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.url}
                                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                            required
                                            placeholder="https://youtube.com/@yourchannel"
                                            style={{
                                                width: "100%",
                                                padding: "0.75rem",
                                                borderRadius: "8px",
                                                border: `1px solid ${colors.inputBorder}`,
                                                background: colors.inputBg,
                                                color: colors.textPrimary,
                                                fontSize: "1rem"
                                            }}
                                        />
                                    </div>

                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                        <div>
                                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: colors.textSecondary }}>
                                                Display Order
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.displayOrder}
                                                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                                                min="0"
                                                style={{
                                                    width: "100%",
                                                    padding: "0.75rem",
                                                    borderRadius: "8px",
                                                    border: `1px solid ${colors.inputBorder}`,
                                                    background: colors.inputBg,
                                                    color: colors.textPrimary,
                                                    fontSize: "1rem"
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: colors.textSecondary }}>
                                                Active
                                            </label>
                                            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem", cursor: "pointer" }}>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.isActive}
                                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                                />
                                                <span style={{ color: colors.textPrimary }}>Show in navbar</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", gap: "1rem" }}>
                                        <motion.button
                                            type="submit"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            style={{
                                                flex: 1,
                                                padding: "0.875rem",
                                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "10px",
                                                fontSize: "1rem",
                                                fontWeight: "600",
                                                cursor: "pointer"
                                            }}
                                        >
                                            {editingId ? "Update Link" : "Create Link"}
                                        </motion.button>
                                        {editingId && (
                                            <motion.button
                                                type="button"
                                                onClick={resetForm}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                style={{
                                                    padding: "0.875rem 1.5rem",
                                                    background: colors.cardBg,
                                                    color: colors.textSecondary,
                                                    border: `2px solid ${colors.border}`,
                                                    borderRadius: "10px",
                                                    fontSize: "1rem",
                                                    fontWeight: "600",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                Cancel
                                            </motion.button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Social Links List */}
                <div style={{
                    background: colors.cardBg,
                    borderRadius: "16px",
                    padding: "1.5rem",
                    boxShadow: colors.shadow,
                    border: `1px solid ${colors.border}`
                }}>
                    <h3 style={{ marginTop: 0, marginBottom: "1.5rem", color: colors.textPrimary }}>
                        Existing Social Links ({socialLinks.length})
                    </h3>

                    {socialLinks.length === 0 ? (
                        <p style={{ color: colors.textSecondary, textAlign: "center", padding: "2rem" }}>
                            No social links yet. Click "Add Social Link" to create one.
                        </p>
                    ) : (
                        <div style={{ display: "grid", gap: "1rem" }}>
                            {socialLinks.map((link) => {
                                const platformInfo = platforms.find((p) => p.value === link.platform);
                                return (
                                    <motion.div
                                        key={link._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        style={{
                                            background: colors.background,
                                            border: `1px solid ${colors.border}`,
                                            borderRadius: "12px",
                                            padding: "1.25rem",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            gap: "1rem"
                                        }}
                                    >
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                                                <span style={{ fontSize: "1.5rem" }}>{link.icon || platformInfo?.icon}</span>
                                                <h4 style={{ margin: 0, color: colors.textPrimary }}>
                                                    {platformInfo?.label || link.platform}
                                                </h4>
                                                {!link.isActive && (
                                                    <span style={{
                                                        padding: "0.25rem 0.5rem",
                                                        background: "#6b7280",
                                                        color: "white",
                                                        borderRadius: "6px",
                                                        fontSize: "0.75rem",
                                                        fontWeight: "600"
                                                    }}>
                                                        Inactive
                                                    </span>
                                                )}
                                            </div>
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    color: "#667eea",
                                                    fontSize: "0.875rem",
                                                    textDecoration: "none",
                                                    wordBreak: "break-all"
                                                }}
                                            >
                                                {link.url}
                                            </a>
                                            <p style={{ margin: "0.5rem 0 0", fontSize: "0.75rem", color: colors.textSecondary }}>
                                                Order: {link.displayOrder}
                                            </p>
                                        </div>
                                        <div style={{ display: "flex", gap: "0.5rem" }}>
                                            <motion.button
                                                onClick={() => handleEdit(link)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                style={{
                                                    padding: "0.5rem 1rem",
                                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "8px",
                                                    fontSize: "0.875rem",
                                                    fontWeight: "600",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                ✏️ Edit
                                            </motion.button>
                                            <motion.button
                                                onClick={() => handleDelete(link._id)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                style={{
                                                    padding: "0.5rem 1rem",
                                                    background: "#ef4444",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "8px",
                                                    fontSize: "0.875rem",
                                                    fontWeight: "600",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                🗑️ Delete
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
