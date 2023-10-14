import React, { useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap'; // Import Modal
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    address: '',
    contactNumber: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for the success modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here
    console.log(formData);

    // Show the success modal
    setShowSuccessModal(true);
  };

  // Function to close the success modal
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    // Navigate to the login page after closing the modal
    navigate('/login');
  };

  return (
    <div className="background">
      <Container className="signup-container">
        <Form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
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
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </Container>

      {/* Success Modal */}
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
