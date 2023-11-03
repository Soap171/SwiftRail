import React from 'react';
import { useNavigate } from 'react-router-dom';

function SubscriptionPlan(props) {
  const { title, price, description, primaryKey } = props;
  const navigate = useNavigate();
  console.log('Received primaryKey:', primaryKey);

  const handleSubscribeClick = () => {
    if (primaryKey) {
      navigate('/CheckoutPopup', { state: { subscriptionKey: primaryKey } });
    } else {
      console.error('primaryKey is null or undefined.');
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
