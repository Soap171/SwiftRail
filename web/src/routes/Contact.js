import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ContactImg from '../assets/contact.jpg';
import Footer from '../components/Footer';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [alert, setAlert] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setAlert({
        type: 'danger',
        message: 'Please fill in all fields.',
      });
    } else {
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

  const handleClearForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setAlert(null);
  };

  return (
    <>
      <Navbar />
      <Hero cName="hero-other" heroImg={ContactImg} title="Contact" />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {alert && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.message}
              </div>
            )}

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
              <div className="row mb-3">
               <div className="col">
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </div>
              <div className="col mt-3">
               <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={handleClearForm}
                >
                Clear
              </button>
             </div>
           </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
