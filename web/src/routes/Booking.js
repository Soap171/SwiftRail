import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import BookingImg from '../assets/Booking.jpg';

export default function Booking() {
  const [formData, setFormData] = useState({
    senderName: '',
    senderAddress: '',
    senderPhone: '',
    senderNIC: '',
    senderRailwayStation: '',
    recipientName: '',
    recipientAddress: '',
    recipientPhone: '',
    recipientNIC: '',
    recipientRailwayStation: '',
    parcelDescription: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    // Sender details validation
    if (!formData.senderName) {
      errors.senderName = 'Sender Name is required';
    }
    if (!formData.senderAddress) {
      errors.senderAddress = 'Sender Address is required';
    }
    if (!formData.senderPhone) {
      errors.senderPhone = 'Sender Phone is required';
    } else if (!/^\d{10}$/.test(formData.senderPhone)) {
      errors.senderPhone = 'Invalid Sender Phone number';
    }
    if (!formData.senderNIC) {
      errors.senderNIC = 'Sender NIC is required';
    }
    if (!formData.senderRailwayStation) {
      errors.senderRailwayStation = 'Sender Railway Station is required';
    }

    // Recipient details validation
    if (!formData.recipientName) {
      errors.recipientName = 'Recipient Name is required';
    }
    if (!formData.recipientAddress) {
      errors.recipientAddress = 'Recipient Address is required';
    }
    if (!formData.recipientPhone) {
      errors.recipientPhone = 'Recipient Phone is required';
    } else if (!/^\d{10}$/.test(formData.recipientPhone)) {
      errors.recipientPhone = 'Invalid Recipient Phone number';
    }
    if (!formData.recipientNIC) {
      errors.recipientNIC = 'Recipient NIC is required';
    }
    if (!formData.recipientRailwayStation) {
      errors.recipientRailwayStation = 'Recipient Railway Station is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, you can proceed with form submission
      // Use formData to send data to your server or perform any necessary actions
    }
  };

  return (
    <div>
      <NavBar />
      <Hero
        cName="hero-other"
        heroImg={BookingImg}
        title="Book Your Parcel Here"
        text=""
      />

      <div className="container mt-5 mb-5">
        <form onSubmit={handleSubmit}>
          <h2>Sender Details</h2>
          <div className="form-group mt-2">
            <input
              type="text"
              className={`form-control ${errors.senderName && 'is-invalid'}`}
              name="senderName"
              placeholder="Sender's Name"
              value={formData.senderName}
              onChange={handleInputChange}
            />
            {errors.senderName && (
              <div className="invalid-feedback">{errors.senderName}</div>
            )}
          </div>
          <div className="form-group mt-2">
            <input
              type="text"
              className={`form-control ${errors.senderAddress && 'is-invalid'}`}
              name="senderAddress"
              placeholder="Sender's Address"
              value={formData.senderAddress}
              onChange={handleInputChange}
            />
            {errors.senderAddress && (
              <div className="invalid-feedback">{errors.senderAddress}</div>
            )}
          </div>
          <div className="form-group mt-2">
            <input
              type="tel"
              className={`form-control ${errors.senderPhone && 'is-invalid'}`}
              name="senderPhone"
              placeholder="Sender's Phone"
              value={formData.senderPhone}
              onChange={handleInputChange}
            />
            {errors.senderPhone && (
              <div className="invalid-feedback">{errors.senderPhone}</div>
            )}
          </div>
          <div className="form-group mt-2">
            <input
              type="text"
              className={`form-control ${errors.senderNIC && 'is-invalid'}`}
              name="senderNIC"
              placeholder="Sender's NIC"
              value={formData.senderNIC}
              onChange={handleInputChange}
            />
            {errors.senderNIC && (
              <div className="invalid-feedback">{errors.senderNIC}</div>
            )}
          </div>
          <div className="form-group mt-2">
            <input
              type="text"
              className={`form-control ${errors.senderRailwayStation && 'is-invalid'}`}
              name="senderRailwayStation"
              placeholder="Sender's Railway Station"
              value={formData.senderRailwayStation}
              onChange={handleInputChange}
            />
            {errors.senderRailwayStation && (
              <div className="invalid-feedback">{errors.senderRailwayStation}</div>
            )}
          </div>

          <h2 className='mt-5'>Recipient Details</h2>
          <div className="form-group mt-2">
            <input
              type="text"
              className={`form-control ${errors.recipientName && 'is-invalid'}`}
              name="recipientName"
              placeholder="Recipient's Name"
              value={formData.recipientName}
              onChange={handleInputChange}
            />
            {errors.recipientName && (
              <div className="invalid-feedback">{errors.recipientName}</div>
            )}
          </div>
          <div className="form-group mt-2">
            <input
              type="text"
              className={`form-control ${errors.recipientAddress && 'is-invalid'}`}
              name="recipientAddress"
              placeholder="Recipient's Address"
              value={formData.recipientAddress}
              onChange={handleInputChange}
            />
            {errors.recipientAddress && (
              <div className="invalid-feedback">{errors.recipientAddress}</div>
            )}
          </div>
          <div className="form-group mt-2">
            <input
              type="tel"
              className={`form-control ${errors.recipientPhone && 'is-invalid'}`}
              name="recipientPhone"
              placeholder="Recipient's Phone"
              value={formData.recipientPhone}
              onChange={handleInputChange}
            />
            {errors.recipientPhone && (
              <div className="invalid-feedback">{errors.recipientPhone}</div>
            )}
          </div>
          <div className="form-group mt-2">
            <input
              type="text"
              className={`form-control ${errors.recipientNIC && 'is-invalid'}`}
              name="recipientNIC"
              placeholder="Recipient's NIC"
              value={formData.recipientNIC}
              onChange={handleInputChange}
            />
            {errors.recipientNIC && (
              <div className="invalid-feedback">{errors.recipientNIC}</div>
            )}
          </div>
          <div className="form-group mt-2">
            <input
              type="text"
              className={`form-control ${errors.recipientRailwayStation && 'is-invalid'}`}
              name="recipientRailwayStation"
              placeholder="Recipient's Railway Station"
              value={formData.recipientRailwayStation}
              onChange={handleInputChange}
            />
            {errors.recipientRailwayStation && (
              <div className="invalid-feedback">{errors.recipientRailwayStation}</div>
            )}
          </div>

          <div className="form-group">
            <label className='mt-5'>Parcel Description</label>
            <textarea
              className="form-control mt-2"
              name="parcelDescription"
              placeholder="Enter Parcel Description"
              value={formData.parcelDescription}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

