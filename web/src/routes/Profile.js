import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import ProfileImg from '../assets/profile.jpg';
import './Profile.css'
import { CSSTransition } from 'react-transition-group';
import Userdetails from '../components/UserDetails';


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
      <Userdetails/>
      <Footer />
    </>
  );
}
  export default Profile
