import React, { useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import supabase from '../config/supabaseClient';
import axios from 'axios'; // Import Axios

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    NIC: '',
    username: '',
    password: '',
    address: '',
    contactNumber: '',
    email: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Send the user data to Supabase for registration
    try {
      const { data, error } = await supabase.from('customer').upsert([
        {
          NIC: formData.NIC,
          userName: formData.username,
          password: formData.password,
          address: formData.address,
          contactNo: formData.contactNumber,
          email: formData.email,
        },
      ]);
  
      if (error) {
        console.error('Error signing up:', error);
      } else {
        // Show the success modal
        setShowSuccessModal(true);
        // Call a function to send the SMS with the entered userName and password
        await sendSMS(formData.contactNumber, formData.username, formData.password);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
  
  
  
  
  
  

  const sendSMS = async (phoneNumber, userName, password) => {
    // Create the SMS message with a welcome greeting, username, and a security note
    const message = `Welcome to SwiftRail, ${userName}! Thank you for signing up. Please remember not to share your credentials with anyone. Your password has been securely stored.`;
  
    // Make an HTTP POST request to your server to send the SMS
    try {
      await axios.post('http://localhost:3001/send-sms', { message, phoneNumber });
      console.log('SMS Sent Successfully');
    } catch (error) {
      console.error('Failed to send SMS:', error);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };


  return (
    <div className="background">
      <Container className="signup-container">
        <Form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <Form.Group>
            <Form.Label>NIC</Form.Label>
            <Form.Control
              type="text"
              name="NIC"
              value={formData.NIC}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </Container>

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Successfully Signed Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have successfully signed up. You can now proceed to the login page.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            Continue to Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SignUp;
