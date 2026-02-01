'use client';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { apiMethods } from "../api/config";
import { useTheme } from "../hooks/useTheme";

export default function VideosAdmin() {
    const { colors } = useTheme();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        youtubeUrl: "",
        displayOrder: 0,
        isActive: true,
    });
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
        fetchVideos();
    }, [navigate]);

    const fetchVideos = async () => {
        try {
            const res = await apiMethods.getAllVideos();
            setVideos(res.data);
        } catch (error) {
            showMessage("error", "Failed to fetch videos");
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    };

    const extractYouTubeId = (url) => {
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
            /^([a-zA-Z0-9_-]{11})$/,
        ];
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) return match[1];
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await apiMethods.updateVideo(editingId, formData);
                showMessage("success", "Video updated successfully");
            } else {
                await apiMethods.createVideo(formData);
                showMessage("success", "Video created successfully");
            }
            fetchVideos();
            resetForm();
        } catch (error) {
            showMessage("error", error.response?.data?.message || "Operation failed");
        }
    };

    const handleEdit = (video) => {
        setFormData({
            title: video.title,
            description: video.description,
            youtubeUrl: video.youtubeUrl,
            displayOrder: video.displayOrder,
            isActive: video.isActive,
        });
        setEditingId(video._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this video?")) return;
        try {
            await apiMethods.deleteVideo(id);
            showMessage("success", "Video deleted successfully");
            fetchVideos();
        } catch (error) {
            showMessage("error", "Failed to delete video");
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            youtubeUrl: "",
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

    const videoId = formData.youtubeUrl ? extractYouTubeId(formData.youtubeUrl) : null;

    return (
        <div style={{
            minHeight: "100vh",
            background: colors.background,
            padding: "2rem 1.5rem",
            transition: "background 0.3s ease"
        }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
                                Helpful Videos
                            </h1>
                            <p style={{ margin: 0, color: colors.textSecondary }}>
                                Manage YouTube videos displayed on the home page
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
                                {showForm ? "✕ Cancel" : "+ Add Video"}
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
                                {editingId ? "Edit Video" : "Add New Video"}
                            </h3>
                            <form onSubmit={handleSubmit}>
                                <div style={{ display: "grid", gap: "1.5rem" }}>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                                        {/* Left Column - Form */}
                                        <div style={{ display: "grid", gap: "1.5rem" }}>
                                            <div>
                                                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: colors.textSecondary }}>
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.title}
                                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                    required
                                                    placeholder="3 Exercises For Achilles Pain"
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
                                                    Description
                                                </label>
                                                <textarea
                                                    value={formData.description}
                                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                    required
                                                    rows={3}
                                                    placeholder="Gentle exercises for Achilles pain relief..."
                                                    style={{
                                                        width: "100%",
                                                        padding: "0.75rem",
                                                        borderRadius: "8px",
                                                        border: `1px solid ${colors.inputBorder}`,
                                                        background: colors.inputBg,
                                                        color: colors.textPrimary,
                                                        fontSize: "1rem",
                                                        resize: "vertical"
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: colors.textSecondary }}>
                                                    YouTube URL or Video ID
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.youtubeUrl}
                                                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                                                    required
                                                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
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
                                                {videoId && (
                                                    <p style={{ margin: "0.5rem 0 0", fontSize: "0.875rem", color: colors.textSecondary }}>
                                                        ✓ Video ID: {videoId}
                                                    </p>
                                                )}
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
                                                        <span style={{ color: colors.textPrimary }}>Show on home page</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column - Preview */}
                                        <div>
                                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: colors.textSecondary }}>
                                                Preview
                                            </label>
                                            <div style={{
                                                border: `2px dashed ${colors.border}`,
                                                borderRadius: "12px",
                                                padding: "1rem",
                                                background: colors.background,
                                                height: "calc(100% - 2rem)"
                                            }}>
                                                {videoId ? (
                                                    <div>
                                                        <div style={{
                                                            position: "relative",
                                                            paddingBottom: "56.25%",
                                                            height: 0,
                                                            overflow: "hidden",
                                                            borderRadius: "8px",
                                                            marginBottom: "1rem"
                                                        }}>
                                                            <iframe
                                                                src={`https://www.youtube.com/embed/${videoId}`}
                                                                title="Video preview"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                                style={{
                                                                    position: "absolute",
                                                                    top: 0,
                                                                    left: 0,
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    border: "none"
                                                                }}
                                                            />
                                                        </div>
                                                        <h4 style={{ margin: "0 0 0.5rem", color: colors.textPrimary, fontSize: "1rem" }}>
                                                            {formData.title || "Video Title"}
                                                        </h4>
                                                        <p style={{ margin: 0, color: colors.textSecondary, fontSize: "0.875rem", lineHeight: "1.5" }}>
                                                            {formData.description || "Video description"}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div style={{ textAlign: "center", padding: "2rem", color: colors.textSecondary }}>
                                                        <p>Enter a YouTube URL to see preview</p>
                                                    </div>
                                                )}
                                            </div>
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
                                            {editingId ? "Update Video" : "Create Video"}
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

                {/* Videos List */}
                <div style={{
                    background: colors.cardBg,
                    borderRadius: "16px",
                    padding: "1.5rem",
                    boxShadow: colors.shadow,
                    border: `1px solid ${colors.border}`
                }}>
                    <h3 style={{ marginTop: 0, marginBottom: "1.5rem", color: colors.textPrimary }}>
                        Videos ({videos.length})
                    </h3>

                    {videos.length === 0 ? (
                        <p style={{ color: colors.textSecondary, textAlign: "center", padding: "2rem" }}>
                            No videos yet. Click "Add Video" to create one.
                        </p>
                    ) : (
                        <div style={{ display: "grid", gap: "1rem" }}>
                            {videos.map((video) => (
                                <motion.div
                                    key={video._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        background: colors.background,
                                        border: `1px solid ${colors.border}`,
                                        borderRadius: "12px",
                                        padding: "1.25rem",
                                        display: "grid",
                                        gridTemplateColumns: "200px 1fr auto",
                                        gap: "1rem",
                                        alignItems: "start"
                                    }}
                                >
                                    <div style={{
                                        position: "relative",
                                        paddingBottom: "56.25%",
                                        height: 0,
                                        overflow: "hidden",
                                        borderRadius: "8px",
                                        background: "#000"
                                    }}>
                                        <img
                                            src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                            alt={video.title}
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover"
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                            <h4 style={{ margin: 0, color: colors.textPrimary }}>{video.title}</h4>
                                            {!video.isActive && (
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
                                        <p style={{ margin: "0 0 0.5rem", color: colors.textSecondary, fontSize: "0.875rem" }}>
                                            {video.description}
                                        </p>
                                        <a
                                            href={video.youtubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: "#667eea", fontSize: "0.75rem", textDecoration: "none" }}
                                        >
                                            Watch on YouTube →
                                        </a>
                                        <p style={{ margin: "0.5rem 0 0", fontSize: "0.75rem", color: colors.textSecondary }}>
                                            Order: {video.displayOrder}
                                        </p>
                                    </div>
                                    <div style={{ display: "flex", gap: "0.5rem", flexDirection: "column" }}>
                                        <motion.button
                                            onClick={() => handleEdit(video)}
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
                                                cursor: "pointer",
                                                whiteSpace: "nowrap"
                                            }}
                                        >
                                            ✏️ Edit
                                        </motion.button>
                                        <motion.button
                                            onClick={() => handleDelete(video._id)}
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
                                                cursor: "pointer",
                                                whiteSpace: "nowrap"
                                            }}
                                        >
                                            🗑️ Delete
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
