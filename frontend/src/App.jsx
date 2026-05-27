import React, { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      setStatus(data.message || "Form Submitted Successfully");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-content">
          <p className="tag">NGO • Empowering Women</p>
          <h1>She Can Foundation</h1>
          <p className="subtitle">
            Supporting women with opportunities, learning, confidence, and
            growth.
          </p>
          <a href="#contact" className="cta-button">
            Join Us
          </a>
        </div>

        <div className="hero-image">
          {/* <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80"
            alt="Women supporting each other"
          /> */}
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
            alt="Community teamwork"
          />
          
        </div>
      </header>

      <section className="about-section">
        <h2>About Us</h2>
        <p>
          She Can Foundation works to uplift women through education, skill
          development, and community support. Our mission is to create a safe
          space where every woman can learn, grow, and achieve independence.
        </p>
      </section>

      <section className="form-section" id="contact">
        <div className="form-card">
          <h2>Contact / Volunteer Form</h2>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>

          {status && <p className="status-message">{status}</p>}
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 She Can Foundation. All rights reserved.</p>
      </footer>
    </div>
  );
}
