'use client';

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api/config";

export default function SliderAdmin() {
    const [sliders, setSliders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [showNewForm, setShowNewForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        order: 0,
        isActive: true
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
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
        fetchSliders();
    }, [navigate]);

    const fetchSliders = async () => {
        try {
            setLoading(true);
            const res = await api.get("/api/sliders/all");
            setSliders(res.data);
            setMessage({ type: "", text: "" });
        } catch (err) {
            console.error("Error fetching sliders:", err);
            setMessage({ type: "error", text: "Failed to load sliders" });
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile && !editingId) {
            setMessage({ type: "error", text: "Please select an image" });
            return;
        }

        try {
            setLoading(true);
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('subtitle', formData.subtitle);
            formDataToSend.append('order', formData.order);
            formDataToSend.append('isActive', formData.isActive);

            if (imageFile) {
                formDataToSend.append('image', imageFile);
            }

            if (editingId) {
                await api.put(`/api/sliders/${editingId}`, formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setMessage({ type: "success", text: "Slider updated successfully!" });
            } else {
                await api.post("/api/sliders", formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setMessage({ type: "success", text: "Slider created successfully!" });
            }
            resetForm();
            await fetchSliders();
        } catch (err) {
            console.error("Error saving slider:", err);
            setMessage({ type: "error", text: "Failed to save slider" });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (slider) => {
        setEditingId(slider._id);
        setFormData({
            title: slider.title,
            subtitle: slider.subtitle || "",
            order: slider.order,
            isActive: slider.isActive
        });
        setImagePreview(`http://localhost:5000${slider.imageUrl}`);
        setShowNewForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this slider?")) return;

        try {
            setLoading(true);
            await api.delete(`/api/sliders/${id}`);
            setMessage({ type: "success", text: "Slider deleted successfully!" });
            await fetchSliders();
        } catch (err) {
            setMessage({ type: "error", text: "Failed to delete slider" });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            subtitle: "",
            order: 0,
            isActive: true
        });
        setImageFile(null);
        setImagePreview(null);
        setEditingId(null);
        setShowNewForm(false);
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "#f8fafc",
            fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
            {/* Header */}
            <div style={{
                background: "linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)",
                padding: "2rem 1.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem"
                    }}>
                        <div>
                            <h1 style={{
                                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                                fontWeight: "700",
                                color: "white",
                                margin: 0,
                                marginBottom: "0.5rem"
                            }}>
                                🎨 Homepage Slider Management
                            </h1>
                            <p style={{
                                color: "rgba(255, 255, 255, 0.9)",
                                margin: 0,
                                fontSize: "0.95rem"
                            }}>
                                Upload and manage rotating banner images on the homepage
                            </p>
                        </div>
                        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                            <Link
                                to="/admin"
                                style={{
                                    padding: "0.875rem 1.75rem",
                                    background: "rgba(255, 255, 255, 0.2)",
                                    color: "white",
                                    border: "2px solid white",
                                    borderRadius: "12px",
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    textDecoration: "none",
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                ← Back to Dashboard
                            </Link>
                            <motion.button
                                onClick={() => {
                                    if (showNewForm) {
                                        resetForm();
                                    } else {
                                        setShowNewForm(true);
                                    }
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: "0.875rem 1.75rem",
                                    background: "white",
                                    color: "#0d9488",
                                    border: "none",
                                    borderRadius: "12px",
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                {showNewForm ? "✕ Cancel" : "+ New Slider"}
                            </motion.button>
                            <motion.button
                                onClick={handleLogout}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: "0.875rem 1.75rem",
                                    background: "rgba(255, 255, 255, 0.95)",
                                    color: "#ef4444",
                                    border: "2px solid white",
                                    borderRadius: "12px",
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                🚪 Logout
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>
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
                            }}
                        >
                            {message.text}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* New/Edit Slider Form */}
                <AnimatePresence>
                    {showNewForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{
                                background: "white",
                                border: "2px solid #0d9488",
                                borderRadius: "16px",
                                padding: "2rem",
                                marginBottom: "2rem",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            <h3 style={{ marginTop: 0, marginBottom: "1.5rem", fontSize: "1.25rem", fontWeight: "700" }}>
                                {editingId ? "Edit Slider" : "Create New Slider"}
                            </h3>
                            <form onSubmit={handleSubmit}>
                                <div style={{ display: "grid", gap: "1.25rem" }}>
                                    <div>
                                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", fontSize: "0.875rem" }}>
                                            Title *
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Expert Physiotherapy Care"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            required
                                            style={{
                                                width: "100%",
                                                padding: "0.75rem 1rem",
                                                borderRadius: "8px",
                                                border: "1px solid #cbd5e1",
                                                fontSize: "1rem"
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", fontSize: "0.875rem" }}>
                                            Subtitle
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Optional subtitle text"
                                            value={formData.subtitle}
                                            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                            style={{
                                                width: "100%",
                                                padding: "0.75rem 1rem",
                                                borderRadius: "8px",
                                                border: "1px solid #cbd5e1",
                                                fontSize: "1rem"
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", fontSize: "0.875rem" }}>
                                            Upload Image * {editingId && "(leave empty to keep current image)"}
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{
                                                width: "100%",
                                                padding: "0.75rem 1rem",
                                                borderRadius: "8px",
                                                border: "1px solid #cbd5e1",
                                                fontSize: "1rem"
                                            }}
                                        />
                                        {imagePreview && (
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                style={{
                                                    marginTop: "1rem",
                                                    maxWidth: "300px",
                                                    maxHeight: "200px",
                                                    borderRadius: "8px",
                                                    objectFit: "cover"
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                        <div>
                                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", fontSize: "0.875rem" }}>
                                                Order
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.order}
                                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                                style={{
                                                    width: "100%",
                                                    padding: "0.75rem 1rem",
                                                    borderRadius: "8px",
                                                    border: "1px solid #cbd5e1",
                                                    fontSize: "1rem"
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", fontSize: "0.875rem" }}>
                                                Status
                                            </label>
                                            <select
                                                value={formData.isActive ? "active" : "inactive"}
                                                onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "active" })}
                                                style={{
                                                    width: "100%",
                                                    padding: "0.75rem 1rem",
                                                    borderRadius: "8px",
                                                    border: "1px solid #cbd5e1",
                                                    fontSize: "1rem"
                                                }}
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        style={{
                                            padding: "0.875rem 2rem",
                                            background: "linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "10px",
                                            cursor: "pointer",
                                            fontWeight: "600",
                                            fontSize: "1rem"
                                        }}
                                    >
                                        {loading ? "Saving..." : editingId ? "Update Slider" : "Create Slider"}
                                    </button>
                                    {editingId && (
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            style={{
                                                padding: "0.875rem 2rem",
                                                background: "#e2e8f0",
                                                color: "#475569",
                                                border: "none",
                                                borderRadius: "10px",
                                                cursor: "pointer",
                                                fontWeight: "600",
                                                fontSize: "1rem"
                                            }}
                                        >
                                            Cancel Edit
                                        </button>
                                    )}
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Sliders List */}
                {loading && sliders.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "3rem" }}>
                        <p style={{ color: "#64748b" }}>Loading sliders...</p>
                    </div>
                ) : sliders.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "3rem", background: "white", borderRadius: "16px" }}>
                        <p style={{ color: "#64748b", fontSize: "1.125rem" }}>No sliders yet. Upload your first image!</p>
                    </div>
                ) : (
                    <div style={{ display: "grid", gap: "1.5rem" }}>
                        {sliders.map((slider) => (
                            <motion.div
                                key={slider._id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    background: "white",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "16px",
                                    padding: "1.5rem",
                                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                                    display: "grid",
                                    gridTemplateColumns: "200px 1fr auto",
                                    gap: "1.5rem",
                                    alignItems: "center"
                                }}
                            >
                                <img
                                    src={`http://localhost:5000${slider.imageUrl}`}
                                    alt={slider.title}
                                    style={{
                                        width: "100%",
                                        height: "120px",
                                        objectFit: "cover",
                                        borderRadius: "12px"
                                    }}
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
                                    }}
                                />
                                <div>
                                    <h3 style={{ margin: 0, marginBottom: "0.5rem", fontSize: "1.125rem", fontWeight: "700" }}>
                                        {slider.title}
                                    </h3>
                                    {slider.subtitle && (
                                        <p style={{ margin: 0, marginBottom: "0.75rem", color: "#64748b", fontSize: "0.9rem" }}>
                                            {slider.subtitle}
                                        </p>
                                    )}
                                    <div style={{ display: "flex", gap: "1rem", alignItems: "center", fontSize: "0.875rem" }}>
                                        <span style={{
                                            padding: "0.25rem 0.75rem",
                                            borderRadius: "6px",
                                            background: slider.isActive ? "#d1fae5" : "#fee2e2",
                                            color: slider.isActive ? "#065f46" : "#991b1b",
                                            fontWeight: "600"
                                        }}>
                                            {slider.isActive ? "Active" : "Inactive"}
                                        </span>
                                        <span style={{ color: "#64748b" }}>Order: {slider.order}</span>
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <button
                                        onClick={() => handleEdit(slider)}
                                        style={{
                                            padding: "0.5rem 1rem",
                                            background: "#3b82f6",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            fontWeight: "600",
                                            fontSize: "0.875rem"
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(slider._id)}
                                        style={{
                                            padding: "0.5rem 1rem",
                                            background: "#ef4444",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            fontWeight: "600",
                                            fontSize: "0.875rem"
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
