import NavBar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SubscriptionPlan from '../components/SubscriptionPlan';
import img from '../assets/Subscription-min.jpg'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import '../components/Button.css'
import supabase from '../config/supabaseClient';
import React, { useState, useEffect } from 'react';




function Subscriptions() {

  const [subscriptions, setSubscriptions] = useState([]);


  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        // Fetch subscription data from Supabase
        const { data, error } = await supabase
          .from('subscription') // Replace 'subscription' with your actual table name
          .select('subscriptionPlanName, amount, description,subscriptionId');

        if (error) {
          throw error;
        }

        if (data) {
          setSubscriptions(data);
        }
      } catch (error) {
        console.error('Error fetching subscription data:', error.message);
      }
    }

    fetchSubscriptions();
  }, []); // Run this effect only once when the component mounts


  return (
    <>
      <NavBar />
      <Hero
      heroImg = {img}
      cName = "hero-other"
      title = "QR Subscription Plans"
     
      />

        
       <div className="container">
          <h5 className="text-center text-lg-center text-md-center mt-4">
          Flexibility Meets Digital Ticketing: Your Journey, Your Way! Choose a Flexible Plan for Seamless QR Digital Ticketing !!
         </h5>
       </div>

        <div className="row">
        {subscriptions.map((subscription, index) => (
    <SubscriptionPlan
      key={index} // This uses the array index as the key - be cautious with this approach
      title={subscription.subscriptionPlanName}
      price={`$${subscription.amount}/month`}
      description={subscription.description}
      primaryKey={subscription.subscriptionId} // Assuming subscriptionId is unique
    />
  ))}
          
        </div>
     <Footer/>
      
    </>
  );
}

export default Subscriptions;