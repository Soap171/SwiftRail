import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../components/Button.css'

function SubscriptionPlan(props) {
  const { title, price, description } = props;

  return (
    <div className="col-lg-4 col-md-6 mb-4 mt-4"> {/* Add mt-4 for top margin */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{price}</h6>
          <p className="card-text">{description}</p>
          <Link to="/CheckoutPopup" className='btn btn-primary'>Subscribe</Link>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPlan;
