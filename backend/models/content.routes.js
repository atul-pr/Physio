/**
 * Content Management System Routes
 * Allows admin to edit site content (hero, services, features, etc.)
 */

import express from "express";
import Content from "./Content.model.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// GET /api/content - Get all site content (public)
router.get("/content", async (req, res) => {
  try {
    const content = await Content.findOne() || await Content.create({
      hero: {
        title: "Professional Physiotherapy & Rehabilitation",
        subtitle: "Expert care for sports injuries, chronic pain, and post-operative recovery. Your journey to wellness starts here.",
        ctaText: "Book Appointment",
        ctaLink: "/appointment",
        backgroundImage: null,
      },
      services: [
        {
          title: "Sports Injury Rehabilitation",
          description: "Specialized treatment for athletic injuries, helping you return to peak performance safely and effectively.",
          icon: "⚽",
          popular: true,
        },
        {
          title: "Manual Therapy",
          description: "Hands-on techniques to relieve pain, improve mobility, and restore function through targeted manipulation.",
          icon: "👐",
          popular: false,
        },
        {
          title: "Post-Surgery Recovery",
          description: "Comprehensive rehabilitation programs designed to optimize healing and restore strength after surgery.",
          icon: "🏥",
          popular: false,
        },
        {
          title: "Chronic Pain Management",
          description: "Evidence-based approaches to manage and reduce persistent pain, improving your quality of life.",
          icon: "💊",
          popular: false,
        },
        {
          title: "Ergonomic Assessment",
          description: "Workplace evaluations and solutions to prevent injury and optimize comfort in your daily activities.",
          icon: "💼",
          popular: false,
        },
        {
          title: "Pediatric Physiotherapy",
          description: "Specialized care for children's developmental, neurological, and orthopedic conditions.",
          icon: "👶",
          popular: false,
        },
      ],
      features: [
        {
          title: "Expert Care",
          description: "Certified physiotherapists with extensive experience in sports medicine, rehabilitation, and pain management.",
          icon: "👨‍⚕️",
          color: "#0ea5e9",
        },
        {
          title: "Personalized Plans",
          description: "Customized treatment programs designed specifically for your condition, goals, and lifestyle.",
          icon: "📋",
          color: "#8b5cf6",
        },
        {
          title: "Evidence-Based",
          description: "Modern therapeutic techniques backed by the latest clinical research and proven results.",
          icon: "🔬",
          color: "#10b981",
        },
        {
          title: "Patient-Focused",
          description: "Your recovery journey, comfort, and well-being are at the heart of everything we do.",
          icon: "❤️",
          color: "#f59e0b",
        },
        {
          title: "Advanced Equipment",
          description: "State-of-the-art facilities and technology for optimal treatment outcomes.",
          icon: "⚙️",
          color: "#ec4899",
        },
        {
          title: "Flexible Scheduling",
          description: "Convenient appointment times that work with your busy schedule, including evenings.",
          icon: "📅",
          color: "#06b6d4",
        },
      ],
      stats: {
        patients: "2000+",
        experience: "11+",
        successRate: "98%",
        treatments: "50+",
      },
      doctor: {
        name: "Dr. [Your Name]",
        title: "Physiotherapist & Rehabilitation Specialist",
        description: "With years of experience in treating sports injuries, orthopaedic conditions, and neurological rehabilitation, I am dedicated to helping you recover and live pain-free.",
        image: null,
      },
      footer: {
        tagline: "Professional physiotherapy and rehabilitation care helping you recover, rebuild, and reach your wellness goals.",
        socialLinks: {
          facebook: "https://facebook.com",
          instagram: "https://instagram.com",
          twitter: "https://twitter.com",
          linkedin: "https://linkedin.com",
        },
      },
    });

    res.json(content);
  } catch (err) {
    console.error("Get content error:", err);
    res.status(500).json({ message: "Failed to fetch content." });
  }
});

// PUT /api/content - Update site content (admin only)
router.put("/content", authMiddleware, async (req, res) => {
  try {
    const { hero, services, features, stats, doctor, footer } = req.body;

    let content = await Content.findOne();

    if (!content) {
      content = new Content({});
    }

    // Update fields if provided
    if (hero) content.hero = { ...content.hero, ...hero };
    if (services) content.services = services;
    if (features) content.features = features;
    if (stats) content.stats = { ...content.stats, ...stats };
    if (doctor) content.doctor = { ...content.doctor, ...doctor };
    if (footer) content.footer = { ...content.footer, ...footer };

    await content.save();

    res.json({
      message: "Content updated successfully.",
      content,
    });
  } catch (err) {
    console.error("Update content error:", err);
    res.status(500).json({ message: "Failed to update content." });
  }
});

// PUT /api/content/hero - Update hero section only (admin only)
router.put("/content/hero", authMiddleware, async (req, res) => {
  try {
    const { title, subtitle, ctaText, ctaLink, backgroundImage } = req.body;

    let content = await Content.findOne();
    if (!content) {
      content = new Content({});
    }

    content.hero = { title, subtitle, ctaText, ctaLink, backgroundImage };
    await content.save();

    res.json({
      message: "Hero section updated successfully.",
      hero: content.hero,
    });
  } catch (err) {
    console.error("Update hero error:", err);
    res.status(500).json({ message: "Failed to update hero section." });
  }
});

// POST /api/content/services - Add new service (admin only)
router.post("/content/services", authMiddleware, async (req, res) => {
  try {
    const { title, description, icon, popular } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required.",
      });
    }

    let content = await Content.findOne();
    if (!content) {
      content = new Content({});
    }

    content.services.push({
      title,
      description,
      icon: icon || "⚕️",
      popular: popular || false,
    });

    await content.save();

    res.status(201).json({
      message: "Service added successfully.",
      service: content.services[content.services.length - 1],
    });
  } catch (err) {
    console.error("Add service error:", err);
    res.status(500).json({ message: "Failed to add service." });
  }
});

// PUT /api/content/services/:index - Update service (admin only)
router.put("/content/services/:index", authMiddleware, async (req, res) => {
  try {
    const { index } = req.params;
    const { title, description, icon, popular } = req.body;

    let content = await Content.findOne();
    if (!content || !content.services[index]) {
      return res.status(404).json({ message: "Service not found." });
    }

    if (title) content.services[index].title = title;
    if (description) content.services[index].description = description;
    if (icon) content.services[index].icon = icon;
    if (popular !== undefined) content.services[index].popular = popular;

    await content.save();

    res.json({
      message: "Service updated successfully.",
      service: content.services[index],
    });
  } catch (err) {
    console.error("Update service error:", err);
    res.status(500).json({ message: "Failed to update service." });
  }
});

// DELETE /api/content/services/:index - Delete service (admin only)
router.delete("/content/services/:index", authMiddleware, async (req, res) => {
  try {
    const { index } = req.params;

    let content = await Content.findOne();
    if (!content || !content.services[index]) {
      return res.status(404).json({ message: "Service not found." });
    }

    const deletedService = content.services[index];
    content.services.splice(index, 1);
    await content.save();

    res.json({
      message: "Service deleted successfully.",
      service: deletedService,
    });
  } catch (err) {
    console.error("Delete service error:", err);
    res.status(500).json({ message: "Failed to delete service." });
  }
});

// PUT /api/content/stats - Update statistics (admin only)
router.put("/content/stats", authMiddleware, async (req, res) => {
  try {
    const { patients, experience, successRate, treatments } = req.body;

    let content = await Content.findOne();
    if (!content) {
      content = new Content({});
    }

    if (patients) content.stats.patients = patients;
    if (experience) content.stats.experience = experience;
    if (successRate) content.stats.successRate = successRate;
    if (treatments) content.stats.treatments = treatments;

    await content.save();

    res.json({
      message: "Statistics updated successfully.",
      stats: content.stats,
    });
  } catch (err) {
    console.error("Update stats error:", err);
    res.status(500).json({ message: "Failed to update statistics." });
  }
});

// PUT /api/content/doctor - Update doctor section (admin only)
router.put("/content/doctor", authMiddleware, async (req, res) => {
  try {
    const { name, title, description, image } = req.body;

    let content = await Content.findOne();
    if (!content) {
      content = new Content({});
    }

    if (name) content.doctor.name = name;
    if (title) content.doctor.title = title;
    if (description) content.doctor.description = description;
    if (image !== undefined) content.doctor.image = image; // Allow null to clear image

    await content.save();

    res.json({
      message: "Doctor information updated successfully.",
      doctor: content.doctor,
    });
  } catch (err) {
    console.error("Update doctor error:", err);
    res.status(500).json({ message: "Failed to update doctor information." });
  }
});

export default router;
