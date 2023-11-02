import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import CheckoutImg from '../assets/Checkout.jpg';
import { useLocation } from 'react-router-dom';
import supabase from '../config/supabaseClient'; // Import your Supabase client
import { useAuth } from '../components/AuthContext';

function CheckoutPopup() {
  const { userData } = useAuth(); // Access user data from the AuthContext
  const userNIC = userData ? userData.NIC : null; // Assuming 'nic' is the property name for NIC
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [formData, setFormData] = useState({
    cardType: 'visa',
    cardNumber: '',
    expiration: '',
    cvv: '',
  });
  const location = useLocation();
  const subscriptionKey = location.state ? location.state.subscriptionKey : null;
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    // Validation logic for card details (example - card number)
    if (!formData.cardNumber) {
      errors.cardNumber = 'Card Number is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const subscriptionDuration = 30; // Assuming subscription duration is 30 days
      const today = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format

      // Fetch subscription data to get the amount for the chosen subscription
      const { data: subscriptionData, error } = await supabase
        .from('subscription')
        .select('amount')
        .eq('subscriptionId', subscriptionKey)
        .single();

      if (error) {
        console.error('Error fetching subscription data:', error);
        return;
      }

      const amount = subscriptionData ? subscriptionData.amount : 0; // Assuming 'amount' is the column name

      // Update the customerSubscription table in Supabase
      const { data: updatedData, error: updateError } = await supabase
        .from('customerSubscription')
        .upsert([
          {
            subscriptionId: subscriptionKey,
            customerNIC: userNIC,
            balance: amount,
            QrStatus: true,
            subscriptionDuration: subscriptionDuration,
            paymentDate: today,
          },
        ]);

      if (updateError) {
        console.error('Error updating customerSubscription:', updateError);
        return;
      }

      setPaymentComplete(true); // Payment successful
    }
  };

  return (
    <div>
      <NavBar />
      <Hero heroImg={CheckoutImg} cName="hero-other" title="Checkout" />

      <div className="container mt-4 mb-4">
        <div className="row">
          {paymentComplete ? (
            <div className="col-md-12">
              <h2>Payment Successful</h2>
              <p>Thank you for your payment. Your order has been successfully processed.</p>
            </div>
          ) : (
            <div className="col-md-6 offset-md-3">
              <h2>Payment Information</h2>
              <form onSubmit={handlePayment}>
                {/* Card Type */}
                <div className="form-group">
                  <label htmlFor="cardType">Card Type</label>
                  <select
                    className="form-control"
                    id="cardType"
                    name="cardType"
                    value={formData.cardType}
                    onChange={handleInputChange}
                  >
                    <option value="visa">Visa</option>
                    <option value="mastercard">MasterCard</option>
                    <option value="amex">American Express</option>
                  </select>
                </div>
                {/* Card Number */}
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.cardNumber ? 'is-invalid' : ''}`}
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                  />
                  {formErrors.cardNumber && <div className="invalid-feedback">{formErrors.cardNumber}</div>}
                </div>
                {/* Expiration and CVV */}
                <div className="form-row">
                  <div className="form-group text-center">
                    <label htmlFor="expiration">Expiration Date</label>
                    <input
                      type="text"
                      className="form-control"
                      id="expiration"
                      name="expiration"
                      value={formData.expiration}
                      onChange={handleInputChange}
                    />
                    {/* Add any validation/error display for expiration */}
                  </div>
                  <div className="form-group text-center">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                    />
                    {/* Add any validation/error display for CVV */}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-2" style={{ width: '50%' }}>
                  Pay
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CheckoutPopup;
