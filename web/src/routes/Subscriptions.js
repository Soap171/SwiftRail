import React from 'react';
import NavBar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SubscriptionPlan from '../components/SubscriptionPlan';
import img from '../assets/Subscription.jpg'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

function Subscriptions() {
  return (
    <>
      <NavBar />
      <Hero
      heroImg = {img}
      cName = "hero-other"
      title = "Subscriptions"
      text = "Here is All The Subscription Plans You can Choose From Us"
      />

        
       <div class="container">
          <h1 className="text-center mt-4">Subscription Plans</h1>
          <p class="text-center text-lg-center text-md-center">
          Flexibility Meets Digital Ticketing: Your Journey, Your Way! Choose a Flexible Plan for Seamless QR Digital Ticketing
         </p>
       </div>

        <div className="row">
          <SubscriptionPlan
            title="Basic Plan"
            price="$10/month"
            description="Access to basic features"
          />
          <SubscriptionPlan
            title="Pro Plan"
            price="$20/month"
            description="Access to pro features"
          />
          <SubscriptionPlan
            title="Premium Plan"
            price="$30/month"
            description="Access to premium features"
          />
          
        </div>
     <Footer/>
      
    </>
  );
}

export default Subscriptions;
