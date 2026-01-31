import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { apiMethods } from "../api/config";

export default function DoctorManagement() {
    const [doctor, setDoctor] = useState({
        name: "",
        title: "",
        description: "",
        image: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        fetchDoctorInfo();
    }, []);

    const fetchDoctorInfo = async () => {
        try {
            const response = await apiMethods.getContent();
            if (response.data && response.data.doctor) {
                setDoctor(response.data.doctor);
                if (response.data.doctor.image) {
                    setImagePreview(response.data.doctor.image);
                }
            }
        } catch (error) {
            console.error("Error fetching doctor info:", error);
            setMessage({ type: "error", text: "Failed to load doctor information" });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setMessage({ type: "error", text: "Image size must be less than 5MB" });
                return;
            }

            // Validate file type
            if (!file.type.startsWith("image/")) {
                setMessage({ type: "error", text: "Please select a valid image file" });
                return;
            }

            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setImagePreview(base64String);
                setDoctor({ ...doctor, image: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            await apiMethods.updateDoctor(doctor);
            setMessage({ type: "success", text: "Doctor information updated successfully!" });
            setTimeout(() => setMessage({ type: "", text: "" }), 3000);
        } catch (error) {
            console.error("Error updating doctor info:", error);
            setMessage({ type: "error", text: "Failed to update doctor information" });
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setDoctor({ ...doctor, image: null });
    };

    return (
        <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            border: "1px solid #e2e8f0",
        }}>
            <h2 style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1e293b",
                marginBottom: "0.5rem",
            }}>
                👨‍⚕️ Doctor Information
            </h2>
            <p style={{
                color: "#64748b",
                marginBottom: "2rem",
                fontSize: "0.9375rem",
            }}>
                Manage doctor profile displayed on Home and About pages
            </p>

            {message.text && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
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
                        fontWeight: "500",
                    }}
                >
                    <span>{message.type === "success" ? "✓" : "⚠"}</span>
                    {message.text}
                </motion.div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Image Upload */}
                <div style={{ marginBottom: "2rem" }}>
                    <label style={{
                        display: "block",
                        marginBottom: "0.75rem",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#475569",
                    }}>
                        Doctor Photo
                    </label>

                    {imagePreview ? (
                        <div style={{ position: "relative", display: "inline-block" }}>
                            <img
                                src={imagePreview}
                                alt="Doctor preview"
                                style={{
                                    width: "200px",
                                    height: "200px",
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                    border: "2px solid #e2e8f0",
                                }}
                            />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                style={{
                                    position: "absolute",
                                    top: "8px",
                                    right: "8px",
                                    background: "#ef4444",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "32px",
                                    height: "32px",
                                    cursor: "pointer",
                                    fontSize: "1.25rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ) : (
                        <div style={{
                            border: "2px dashed #cbd5e1",
                            borderRadius: "12px",
                            padding: "2rem",
                            textAlign: "center",
                            background: "#f8fafc",
                        }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                id="doctor-image"
                                style={{ display: "none" }}
                            />
                            <label
                                htmlFor="doctor-image"
                                style={{
                                    cursor: "pointer",
                                    color: "#667eea",
                                    fontWeight: "600",
                                }}
                            >
                                <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>📸</div>
                                <div>Click to upload doctor photo</div>
                                <div style={{ fontSize: "0.875rem", color: "#64748b", marginTop: "0.5rem" }}>
                                    PNG, JPG up to 5MB
                                </div>
                            </label>
                        </div>
                    )}
                </div>

                {/* Doctor Name */}
                <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#475569",
                    }}>
                        Doctor Name *
                    </label>
                    <input
                        type="text"
                        value={doctor.name}
                        onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
                        required
                        placeholder="e.g., Dr. John Smith"
                        style={{
                            width: "100%",
                            padding: "0.75rem 1rem",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                            fontSize: "1rem",
                            color: "#1e293b",
                        }}
                    />
                </div>

                {/* Doctor Title */}
                <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#475569",
                    }}>
                        Professional Title *
                    </label>
                    <input
                        type="text"
                        value={doctor.title}
                        onChange={(e) => setDoctor({ ...doctor, title: e.target.value })}
                        required
                        placeholder="e.g., Physiotherapist & Rehabilitation Specialist"
                        style={{
                            width: "100%",
                            padding: "0.75rem 1rem",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                            fontSize: "1rem",
                            color: "#1e293b",
                        }}
                    />
                </div>

                {/* Doctor Description */}
                <div style={{ marginBottom: "2rem" }}>
                    <label style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#475569",
                    }}>
                        About / Bio *
                    </label>
                    <textarea
                        value={doctor.description}
                        onChange={(e) => setDoctor({ ...doctor, description: e.target.value })}
                        required
                        rows={5}
                        placeholder="Write a brief bio about the doctor's experience and expertise..."
                        style={{
                            width: "100%",
                            padding: "0.75rem 1rem",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                            fontSize: "1rem",
                            fontFamily: "inherit",
                            color: "#1e293b",
                            resize: "vertical",
                        }}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: "0.875rem 2rem",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: loading ? "not-allowed" : "pointer",
                        fontWeight: "600",
                        fontSize: "1rem",
                        opacity: loading ? 0.7 : 1,
                    }}
                >
                    {loading ? "Saving..." : "💾 Save Doctor Information"}
                </button>
            </form>
        </div>
    );
}
