import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ContactImg from '../assets/contact.jpg';
import Footer from '../components/Footer';

function Contact() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // State to manage alert
  const [alert, setAlert] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation here (you can add more rules)
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setAlert({
        type: 'danger',
        message: 'Please fill in all fields.',
      });
    } else {
      // Perform form submission (you can send data to a server here)

      // Clear the form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setAlert({
        type: 'success',
        message: 'Form submitted successfully!',
      });
    }
  };

  return (
    <>
      <Navbar />
      <Hero cName="hero-other" heroImg={ContactImg} title="Contact" />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {/* Alert */}
            {alert && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.message}
              </div>
            )}

            {/* Contact Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary mb-3">
                 Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
