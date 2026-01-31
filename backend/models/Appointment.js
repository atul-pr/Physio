/**
 * Appointment model - patient appointments
 * Schema: patientName, phone, problem, date, status
 */

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    phone: { type: String, required: true },
    problem: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, default: "Pending", enum: ["Pending", "Confirmed", "Cancelled"] },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
