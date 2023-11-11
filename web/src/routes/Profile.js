import React from 'react';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import ProfileImg from '../assets/profile-min.jpg';
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
