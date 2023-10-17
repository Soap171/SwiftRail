import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import ProfileImg from '../assets/profile.jpg';
import './Profile.css'
import { CSSTransition } from 'react-transition-group';


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
      <Hero cName="hero-other" 
      heroImg={ProfileImg}
      title="Your Place In SwiftRail"
      text = "Overall Task With Your Account Will Display Here"
        />
  
      <div className="profile-container">
        <Container>
         
  
          <Card className="profile-card">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h2>{user.name}</h2>
                  <p><strong>NIC:</strong> {user.nic}</p>
                  <p><strong>Contact Number:</strong> {user.contactNumber}</p>
                  <p><strong>Address:</strong> {user.address}</p>
                </Col>
                {user.hasSubscription && (
                  <Col md={6}>
                    <h2>Subscription Details</h2>
                    <p><strong>Plan:</strong> {user.subscriptionDetails.planName}</p>
                    <p><strong>Subscription Date:</strong> {user.subscriptionDetails.subscriptionDate}</p>
                    <p><strong>Expiration Date:</strong> {user.subscriptionDetails.expirationDate}</p>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>
  
          {user.parcelBookings && user.parcelBookings.length > 0 && (
            <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
              <Card className="parcel-card mt-4"> {/* Apply the 'parcel-card' class */}
                <Card.Body>
                  <h3>Parcel Bookings</h3>
                  {user.parcelBookings.map((booking, index) => (
                    <div key={index} className="mb-2">
                      <p><strong>Parcel ID:</strong> {booking.parcelId}</p>
                      <p><strong>Status:</strong> {booking.status}</p>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </CSSTransition>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
}
  export default Profile
