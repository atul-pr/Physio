import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    hero: {
      title: {
        type: String,
        default: "Professional Physiotherapy & Rehabilitation",
      },
      subtitle: {
        type: String,
        default: "Expert care for your recovery journey",
      },
      ctaText: {
        type: String,
        default: "Book Appointment",
      },
      ctaLink: {
        type: String,
        default: "/appointment",
      },
      backgroundImage: {
        type: String,
        default: null,
      },
    },
    services: [
      {
        title: String,
        description: String,
        icon: String,
        popular: {
          type: Boolean,
          default: false,
        },
      },
    ],
    features: [
      {
        title: String,
        description: String,
        icon: String,
        color: String,
      },
    ],
    stats: {
      patients: {
        type: String,
        default: "2000+",
      },
      experience: {
        type: String,
        default: "15+",
      },
      successRate: {
        type: String,
        default: "98%",
      },
      treatments: {
        type: String,
        default: "50+",
      },
    },
    doctor: {
      name: {
        type: String,
        default: "Dr. [Your Name]",
      },
      title: {
        type: String,
        default: "Physiotherapist & Rehabilitation Specialist",
      },
      description: {
        type: String,
        default: "With years of experience in treating sports injuries, orthopaedic conditions, and neurological rehabilitation, I am dedicated to helping you recover and live pain-free.",
      },
      image: {
        type: String,
        default: null,
      },
    },
    footer: {
      tagline: {
        type: String,
        default: "Professional physiotherapy care",
      },
      socialLinks: {
        facebook: String,
        instagram: String,
        twitter: String,
        linkedin: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model("Content", contentSchema);

export default Content;
