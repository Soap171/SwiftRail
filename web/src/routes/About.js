import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutImg from '../assets/about.jpg';
import Footer from '../components/Footer';
import AboutData from '../components/AboutData'

function About() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero-other"
        heroImg={AboutImg}
        title="About SwiftRail"
        text ="Welcome to Swiftrail, the innovative web application that's transforming the way you experience railways."
      />
     <AboutData
     heading="Our Vision"
     text="At Swiftrail, we envision a world where every train ride is a delightful adventure, where passengers and parcels can move swiftly, and where information flows seamlessly. We aim to simplify your relationship with railways, making it a positive, stress-free experience."
      />

<AboutData
  heading="Our Features"
  textItems={[
    "Comprehensive Train Information: We bring you comprehensive train schedules, route details, and real-time updates at your fingertips. Say goodbye to the uncertainty of train travel, and hello to confidence in planning your journeys.",
    "SMS Notifications: We understand the importance of staying informed. With Swiftrail, receive real-time SMS notifications to keep you updated on any changes, ensuring you're always in control of your travel.",
    "Online Parcel Booking: Swiftrail is not just for passengers. Our online parcel booking service allows you to send and receive packages conveniently, so you can rely on us for all your transportation needs.",
    "QR Ticketing with Subscription Plans: The days of standing in long ticket queues are over. Swiftrail offers QR ticketing with customizable subscription plans, making your boarding process quick and hassle-free."
  ]}
/>

<AboutData
  heading="Why Swiftrail?"
  textItems={[
    "Simplicity: We believe that navigating the railways should be easy. Swiftrail simplifies the entire process, from planning your trip to boarding the train.",
    "Efficiency: We're committed to making your journey efficient. Our services save you time, reduce stress, and make traveling a breeze.",
    "Reliability: Count on us for accurate, real-time information and dependable parcel delivery. Swiftrail is your trusted railway companion.",
  ]}
/>

<AboutData
  heading="Join the Swiftrail Community"
  text="Discover a world where your railway experience is defined by ease, convenience, and delight. Join the Swiftrail community today and experience a new era of railway travel. We're dedicated to ensuring your journeys are not just about reaching your destination but enjoying the ride itself. Welcome to Swiftrail - redefining your railway experience, one feature at a time."
/>


     
     
      <Footer/>
    </>
  );
}

export default About;
