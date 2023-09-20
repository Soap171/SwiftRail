import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutImg from '../assets/about.jpg';

function About() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero-other"
        heroImg={AboutImg}
        title="About TravelPulse"
      />
      <section className="about-section py-5">
        <div className="container">
          <h2 className="section-title">Who We Are</h2>
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="text-center">
                <p>
                  Welcome to TravelPulse, your ultimate travel companion. We are
                  passionate about exploring the world and sharing our experiences
                  with you.
                </p>
                <p>
                  Our mission is to provide you with the latest travel information,
                  tips, and recommendations to make your journeys memorable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
