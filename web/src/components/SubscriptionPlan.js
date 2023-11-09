import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import supabase from '../config/supabaseClient';

function SubscriptionPlan(props) {
  const { title, price, description, primaryKey } = props;
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!userData || !userData.NIC) {
        console.error('User data or NIC is missing or undefined.');
        return;
      }

      const { data, error } = await supabase
        .from('customerSubscription')
        .select('subscriptionId')
        .eq('customerNIC', userData.NIC);

      if (error) {
        console.error('Error fetching subscription details:', error);
      } else if (data && data.length > 0) {
        setHasSubscription(true);
      }
    };

    checkSubscription();
  }, [userData]);

  const handleSubscribeClick = () => {
    if (!hasSubscription && primaryKey) {
      navigate('/CheckoutPopup', { state: { subscriptionKey: primaryKey } });
    } else if (hasSubscription) {
      alert('User already has a subscription.Wait until it gets expired');
      
    } else {
      console.error('Invalid primaryKey or user data.');
    }
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4 mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{price}</h6>
          <p className="card-text">{description}</p>
          <button onClick={handleSubscribeClick} className='btn btn-primary'>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPlan;
