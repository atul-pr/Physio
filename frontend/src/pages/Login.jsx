'use client';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { apiMethods } from "../api/config";


export default function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await apiMethods.login(email, password);
      const { token } = res.data;
      localStorage.setItem("adminToken", token);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/admin"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (pass) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[A-Z]/, text: "At least one uppercase letter" },
      { regex: /[a-z]/, text: "At least one lowercase letter" },
      { regex: /[0-9]/, text: "At least one number" },
      { regex: /[^A-Za-z0-9]/, text: "At least one special character" },
    ];
    return requirements.map(req => ({
      ...req,
      isMet: req.regex.test(pass)
    }));
  };

  const passwordRequirements = validatePassword(newPassword);
  const isPasswordStrong = passwordRequirements.every(req => req.isMet);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!isPasswordStrong) {
      setError("Please meet all password strength requirements.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await apiMethods.changePassword(email, oldPassword, newPassword);
      setSuccess("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setIsChangePassword(false), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>


      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.5rem" }}
      >
        <section className="section login-section" style={{ width: "100%" }}>
          <div className="container">
            <motion.div
              className="login-form-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ maxWidth: "450px", margin: "0 auto" }}
            >
              <motion.div
                className="form-card"
                style={{
                  background: "var(--color-bg-alt)",
                  borderRadius: "12px",
                  padding: "2.5rem",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {!isChangePassword ? (
                  <form onSubmit={handleLogin}>
                    <motion.h2
                      style={{ textAlign: "center", marginBottom: "1.5rem", color: "var(--color-primary)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      Welcome Back
                    </motion.h2>

                    <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                      <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "var(--color-text)" }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="admin@physiocare.com"
                        style={{
                          width: "100%",
                          padding: "0.875rem",
                          borderRadius: "8px",
                          border: "2px solid rgba(255, 255, 255, 0.1)",
                          background: "rgba(0, 0, 0, 0.2)",
                          color: "var(--color-text)",
                          fontSize: "1rem",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                      <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "var(--color-text)" }}>
                        Password
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder="••••••••"
                          style={{
                            width: "100%",
                            padding: "0.875rem",
                            borderRadius: "8px",
                            border: "2px solid rgba(255, 255, 255, 0.1)",
                            background: "rgba(0, 0, 0, 0.2)",
                            color: "var(--color-text)",
                            fontSize: "1rem",
                            transition: "all 0.3s ease",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          style={{
                            position: "absolute",
                            right: "12px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            color: "var(--color-primary)",
                            cursor: "pointer",
                            fontSize: "1.2rem",
                          }}
                        >
                          {showPassword ? "👁️" : "👁️‍🗨️"}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <motion.p
                        className="form-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          background: "rgba(255, 59, 48, 0.1)",
                          color: "#ff3b30",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          marginBottom: "1.5rem",
                          fontSize: "0.9rem",
                        }}
                      >
                        {error}
                      </motion.p>
                    )}

                    {success && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          background: "rgba(52, 211, 153, 0.1)",
                          color: "#34d399",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          marginBottom: "1.5rem",
                          fontSize: "0.9rem",
                        }}
                      >
                        {success}
                      </motion.p>
                    )}

                    <motion.button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: "100%",
                        padding: "1rem",
                        marginBottom: "1rem",
                        background: loading ? "rgba(59, 130, 246, 0.5)" : "var(--color-primary)",
                        opacity: loading ? 0.7 : 1,
                      }}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() => {
                        setIsChangePassword(true);
                        setError("");
                        setSuccess("");
                      }}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        background: "transparent",
                        border: "2px solid var(--color-primary)",
                        color: "var(--color-primary)",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "0.95rem",
                        fontWeight: "500",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "rgba(59, 130, 246, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                      }}
                    >
                      Change Password
                    </motion.button>
                  </form>
                ) : (
                  <form onSubmit={handleChangePassword}>
                    <motion.h2
                      style={{ textAlign: "center", marginBottom: "1.5rem", color: "var(--color-primary)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      Update Password
                    </motion.h2>

                    <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                      <label htmlFor="email-change" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "var(--color-text)" }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email-change"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="admin@physiocare.com"
                        style={{
                          width: "100%",
                          padding: "0.875rem",
                          borderRadius: "8px",
                          border: "2px solid rgba(255, 255, 255, 0.1)",
                          background: "rgba(0, 0, 0, 0.2)",
                          color: "var(--color-text)",
                          fontSize: "1rem",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                      <label htmlFor="oldPassword" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "var(--color-text)" }}>
                        Current Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        style={{
                          width: "100%",
                          padding: "0.875rem",
                          borderRadius: "8px",
                          border: "2px solid rgba(255, 255, 255, 0.1)",
                          background: "rgba(0, 0, 0, 0.2)",
                          color: "var(--color-text)",
                          fontSize: "1rem",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                      <label htmlFor="newPassword" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "var(--color-text)" }}>
                        New Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        style={{
                          width: "100%",
                          padding: "0.875rem",
                          borderRadius: "8px",
                          border: "2px solid rgba(255, 255, 255, 0.1)",
                          background: "rgba(0, 0, 0, 0.2)",
                          color: "var(--color-text)",
                          fontSize: "1rem",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                      />

                      {/* Password Strength Requirements */}
                      <div className="password-requirements" style={{ marginTop: "0.75rem", padding: "0.5rem", borderRadius: "8px", background: "rgba(0,0,0,0.15)" }}>
                        <p style={{ fontSize: "0.80rem", marginBottom: "0.40rem", fontWeight: "600", color: "#94a3b8" }}>Password Requirements:</p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.30rem" }}>
                          {passwordRequirements.map((req, idx) => (
                            <div key={idx} style={{ display: "flex", alignItems: "center", fontSize: "0.75rem", color: req.isMet ? "#34d399" : "#94a3b8", transition: "all 0.3s ease" }}>
                              <span style={{ marginRight: "0.5rem" }}>{req.isMet ? "✅" : "⭕"}</span>
                              <span>{req.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                      <label htmlFor="confirmPassword" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "var(--color-text)" }}>
                        Confirm New Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        style={{
                          width: "100%",
                          padding: "0.875rem",
                          borderRadius: "8px",
                          border: "2px solid rgba(255, 255, 255, 0.1)",
                          background: "rgba(0, 0, 0, 0.2)",
                          color: "var(--color-text)",
                          fontSize: "1rem",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                      />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
                      <input
                        type="checkbox"
                        id="showPass"
                        checked={showPassword}
                        onChange={togglePasswordVisibility}
                        style={{ marginRight: "0.5rem", cursor: "pointer" }}
                      />
                      <label htmlFor="showPass" style={{ cursor: "pointer", fontSize: "0.9rem", color: "var(--color-text)" }}>
                        Show passwords
                      </label>
                    </div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          background: "rgba(255, 59, 48, 0.1)",
                          color: "#ff3b30",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          marginBottom: "1.5rem",
                          fontSize: "0.9rem",
                        }}
                      >
                        {error}
                      </motion.p>
                    )}

                    {success && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          background: "rgba(52, 211, 153, 0.1)",
                          color: "#34d399",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          marginBottom: "1.5rem",
                          fontSize: "0.9rem",
                        }}
                      >
                        {success}
                      </motion.p>
                    )}

                    <motion.button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading || !isPasswordStrong}
                      whileHover={{ scale: isPasswordStrong ? 1.02 : 1 }}
                      whileTap={{ scale: isPasswordStrong ? 0.98 : 1 }}
                      style={{
                        width: "100%",
                        padding: "1rem",
                        marginBottom: "1rem",
                        background: (loading || !isPasswordStrong) ? "rgba(59, 130, 246, 0.3)" : "var(--color-primary)",
                        opacity: (loading || !isPasswordStrong) ? 0.6 : 1,
                        cursor: isPasswordStrong ? "pointer" : "not-allowed"
                      }}
                    >
                      {loading ? "Updating..." : "Update Password"}
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() => {
                        setIsChangePassword(false);
                        setOldPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setError("");
                        setSuccess("");
                      }}
                      style={{
                        background: "rgba(255, 255, 255, 0.08)", // transparent glass
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)",
                        borderRadius: "16px",
                        padding: "2.5rem",
                        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                      }}

                      onMouseEnter={(e) => {
                        e.target.style.background = "rgba(59, 130, 246, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                      }}
                    >
                      Back to Login
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
}