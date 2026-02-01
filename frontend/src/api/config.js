/**
 * Central API configuration
 * Uses environment variable for base URL - works with Vercel + Render deployment
 */

import axios from "axios";

// Use VITE_API_URL in production (Render backend URL), fallback to proxy in dev
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized API methods
export const apiMethods = {
  // Admin login
  login: (email, password) =>
    api.post("/api/login", { email, password }),

  // Create appointment (public)
  createAppointment: (data) =>
    api.post("/api/appointments", data),

  // Read appointments (admin)
  getAppointments: () =>
    api.get("/api/appointments"),

  // UPDATE appointment status (Confirm / Cancel)
  updateAppointment: (id, data) =>
    api.put(`/api/appointments/${id}`, data),

  // DELETE appointment
  deleteAppointment: (id) =>
    api.delete(`/api/appointments/${id}`),

  // Get site content (public)
  getContent: () =>
    api.get("/api/content"),

  // Update doctor information (admin)
  updateDoctor: (data) =>
    api.put("/api/content/doctor", data),

  // Change password
  changePassword: (email, oldPassword, newPassword) =>
    api.put("/api/change-password", { email, oldPassword, newPassword }),

  // Slider operations
  getSliders: () =>
    api.get("/api/sliders"),

  getAllSliders: () =>
    api.get("/api/sliders/all"),

  createSlider: (data) =>
    api.post("/api/sliders", data),

  updateSlider: (id, data) =>
    api.put(`/api/sliders/${id}`, data),

  deleteSlider: (id) =>
    api.delete(`/api/sliders/${id}`),

  // Social Links operations
  getSocialLinks: () =>
    api.get("/api/social-links"),

  getAllSocialLinks: () =>
    api.get("/api/social-links/all"),

  createSocialLink: (data) =>
    api.post("/api/social-links", data),

  updateSocialLink: (id, data) =>
    api.put(`/api/social-links/${id}`, data),

  deleteSocialLink: (id) =>
    api.delete(`/api/social-links/${id}`),

  // Videos operations
  getVideos: () =>
    api.get("/api/videos"),

  getAllVideos: () =>
    api.get("/api/videos/all"),

  createVideo: (data) =>
    api.post("/api/videos", data),

  updateVideo: (id, data) =>
    api.put(`/api/videos/${id}`, data),

  deleteVideo: (id) =>
    api.delete(`/api/videos/${id}`),
};
