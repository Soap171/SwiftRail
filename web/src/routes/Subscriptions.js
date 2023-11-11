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
        
        const { data, error } = await supabase
          .from('subscription') 
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
  }, []); 


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
            key={index}
            title={subscription.subscriptionPlanName}
            price={`$${subscription.amount}/month`}
            description={subscription.description}
            primaryKey={subscription.subscriptionId} 
            />
         ))}
          
        </div>
     <Footer/>
      
    </>
  );
}

export default Subscriptions;