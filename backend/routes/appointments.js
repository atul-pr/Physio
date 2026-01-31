/**
 * Appointment routes - Complete CRUD operations
 * POST /api/appointments - create (public)
 * GET /api/appointments - list all (admin only, JWT required)
 * PUT /api/appointments/:id - update (admin only, JWT required)
 * DELETE /api/appointments/:id - delete (admin only, JWT required)
 */

import express from "express";
import Appointment from "../models/Appointment.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// GET /api/health - health check (for frontend connectivity)
router.get("/health", (req, res) => res.json({ ok: true }));

// POST /api/appointments - create new appointment (public)
router.post("/appointments", async (req, res) => {
  try {
    const { patientName, phone, problem, date } = req.body;

    if (!patientName || !phone || !problem || !date) {
      return res.status(400).json({
        message: "patientName, phone, problem, and date are required.",
      });
    }

    const newAppointment = new Appointment({
      patientName,
      phone,
      problem,
      date: new Date(date),
      status: "Pending", // Default status
    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment booked successfully.",
      appointment: {
        id: newAppointment._id,
        patientName: newAppointment.patientName,
        date: newAppointment.date,
        status: newAppointment.status,
      },
    });
  } catch (err) {
    console.error("Create appointment error:", err);
    res.status(500).json({ message: "Failed to book appointment." });
  }
});

// GET /api/appointments - list all (admin only)
router.get("/appointments", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ date: 1 })
      .lean();

    res.json(appointments);
  } catch (err) {
    console.error("Get appointments error:", err);
    res.status(500).json({ message: "Failed to fetch appointments." });
  }
});

// PUT /api/appointments/:id - update appointment (admin only)
router.put("/appointments/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { patientName, phone, problem, date, status } = req.body;

    // Find appointment
    const appointment = await Appointment.findById(id);
    
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    // Update fields if provided
    if (patientName !== undefined) appointment.patientName = patientName;
    if (phone !== undefined) appointment.phone = phone;
    if (problem !== undefined) appointment.problem = problem;
    if (date !== undefined) appointment.date = new Date(date);
    if (status !== undefined) appointment.status = status;

    await appointment.save();

    res.json({
      message: "Appointment updated successfully.",
      appointment: {
        id: appointment._id,
        patientName: appointment.patientName,
        phone: appointment.phone,
        problem: appointment.problem,
        date: appointment.date,
        status: appointment.status,
      },
    });
  } catch (err) {
    console.error("Update appointment error:", err);
    
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid appointment ID format." });
    }
    
    res.status(500).json({ message: "Failed to update appointment." });
  }
});

// DELETE /api/appointments/:id - delete appointment (admin only)
router.delete("/appointments/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndDelete(id);
    
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    res.json({
      message: "Appointment deleted successfully.",
      appointment: {
        id: appointment._id,
        patientName: appointment.patientName,
      },
    });
  } catch (err) {
    console.error("Delete appointment error:", err);
    
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid appointment ID format." });
    }
    
    res.status(500).json({ message: "Failed to delete appointment." });
  }
});

export default router;