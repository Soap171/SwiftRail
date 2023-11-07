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
