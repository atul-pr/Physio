import { useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import { apiMethods } from "../api/config";

export default function Appointment() {
  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    problem: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (formData.patientName.trim().length < 2) {
      setMessage({ type: "error", text: "Please enter a valid full name (at least 2 characters)." });
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) {
      setMessage({ type: "error", text: "Please provide a valid 10-digit phone number." });
      return;
    }

    const appointmentDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of today for date-only comparison

    if (appointmentDate < today) {
      setMessage({ type: "error", text: "Please choose a date in the future." });
      return;
    }

    if (formData.problem.trim().length < 5) {
      setMessage({ type: "error", text: "Please provide a more descriptive problem (at least 5 characters)." });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await apiMethods.createAppointment(formData);
      setMessage({ type: "success", text: "Appointment booked successfully! We will contact you soon." });
      setFormData({ patientName: "", phone: "", problem: "", date: "" });
    } catch (err) {
      let msg = "Failed to book appointment. Please try again.";
      if (err.code === "ERR_NETWORK" || !err.response) {
        msg = "Cannot connect to server. Make sure the backend is running.";
      } else if (err.response?.data?.message) {
        msg = err.response.data.message;
      }
      setMessage({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero
        title="Book an Appointment"
        subtitle="Schedule your visit with our physiotherapy clinic. Fill in the form below and we will get back to you."
        showCta={false}
      />

      <section className="section" style={{ padding: "5rem 1.5rem" }}>
        <div className="container">
          <motion.div
            className="appointment-form-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: "500px", margin: "0 auto" }}
          >
            <form onSubmit={handleSubmit} className="appointment-form">
              <div className="form-group">
                <label htmlFor="patientName">Full Name *</label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 9876543210"
                />
              </div>
              <div className="form-group">
                <label htmlFor="problem">Problem / Condition *</label>
                <textarea
                  id="problem"
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  required
                  placeholder="Briefly describe your condition or reason for visit"
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Preferred Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              {message.text && (
                <p className={message.type === "success" ? "form-success" : "form-error"}>
                  {message.text}
                </p>
              )}
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: "100%" }}>
                {loading ? "Booking..." : "Book Appointment"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
