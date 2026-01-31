/**
 * Seed script - creates initial admin user
 * Run: node scripts/seedAdmin.js
 * Or: npm run seed
 *
 * Default credentials (change after first login):
 * Email: admin@physiocare.com
 * Password: Admin@123
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/physiocare";

const defaultAdmin = {
  name: "Dr. Admin",
  email: "admin@physiocare.com",
  password: "Admin@123",
  specialization: "Physiotherapy & Rehabilitation",
  clinicName: "PhysioCare",
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const existing = await Admin.findOne({ email: defaultAdmin.email });
    if (existing) {
      console.log("Admin already exists. Skipping seed.");
      process.exit(0);
      return;
    }

    const admin = new Admin(defaultAdmin);
    await admin.save();

    console.log("Admin created successfully!");
    console.log("Email:", defaultAdmin.email);
    console.log("Password:", defaultAdmin.password);
    console.log("\nChange password after first login.");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
