import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import ProfileImg from '../assets/profile.jpg';
import './Profile.css'

function Profile() {
  const user = {
    name: 'John Doe',
    nic: '123456789',
    contactNumber: '123-456-7890',
    address: '123 Main St, City',
    hasSubscription: true,
    subscriptionDetails: {
      planName: 'Premium Plan',
      subscriptionDate: '2023-10-14',
      expirationDate: '2024-10-14',
    },
    parcelBookings: [
      {
        parcelId: 'ABCD123',
        status: 'In Transit',
      },
      {
        parcelId: 'EFGH456',
        status: 'Delivered',
      },
    ],
  };

  return (
    <>
      <Navbar />
      <Hero
        cName="hero-other"
        heroImg={ProfileImg}
        title="Place To See Your Process"
      />
      <div className="profile-container mt-4 mb-4">
        <Container>
          <h1 className="mt-4 mb-4 text-center">Your Account</h1>
          <Card>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h2>{user.name}</h2>
                  <p className="mb-2"><strong>NIC:</strong> {user.nic}</p>
                  <p className="mb-2"><strong>Contact Number:</strong> {user.contactNumber}</p>
                  <p className="mb-2"><strong>Address:</strong> {user.address}</p>
                </Col>
                {user.hasSubscription && (
                  <Col md={6}>
                    <h3>Subscription Details</h3>
                    <p className="mb-2"><strong>Plan:</strong> {user.subscriptionDetails.planName}</p>
                    <p className="mb-2"><strong>Subscription Date:</strong> {user.subscriptionDetails.subscriptionDate}</p>
                    <p className="mb-2"><strong>Expiration Date:</strong> {user.subscriptionDetails.expirationDate}</p>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>

          {user.parcelBookings && user.parcelBookings.length > 0 && (
            <Card className="mt-4">
              <Card.Body>
                <h3 className='mb-4'>Parcel Bookings</h3>
                {user.parcelBookings.map((booking, index) => (
                  <div key={index} className="mb-2">
                    <p><strong>Parcel ID:</strong> {booking.parcelId}</p>
                    <p><strong>Status:</strong> {booking.status}</p>
                    <br></br>
                  </div>
                ))}
              </Card.Body>
            </Card>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
