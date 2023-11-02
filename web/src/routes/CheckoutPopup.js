import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import CheckoutImg from '../assets/Checkout.jpg';
import { useLocation } from 'react-router-dom';
import '../components/Button.css';

function CheckoutPopup() {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [formData, setFormData] = useState({
    cardType: 'visa',
    cardNumber: '',
    expiration: '',
    cvv: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const location = useLocation();
  const subscriptionKey = location.state ? location.state.subscriptionKey : null;

  useEffect(() => {
    console.log('Subscription Key:', subscriptionKey);
  }, [subscriptionKey]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.cardNumber) {
      errors.cardNumber = 'Card Number is required';
    }

    if (!formData.expiration) {
      errors.expiration = 'Expiration Date is required';
    }

    if (!formData.cvv) {
      errors.cvv = 'CVV is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setTimeout(() => {
        setPaymentComplete(true);
      }, 2000); // Simulating a 2-second payment processing delay
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
                <div className="form-group">
                  <label htmlFor="cardType">Card Type</label>
                  <select
                    className="form-control"
                    id="cardType"
                    name="cardType"
                    onChange={handleInputChange}
                  >
                    <option value="visa">Visa</option>
                    <option value="mastercard">MasterCard</option>
                    <option value="amex">American Express</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.cardNumber ? 'is-invalid' : ''}`}
                    id="cardNumber"
                    name="cardNumber"
                    onChange={handleInputChange}
                  />
                  {formErrors.cardNumber && <div className="invalid-feedback">{formErrors.cardNumber}</div>}
                </div>
                <div className="form-row">
                  <div className="form-group text-center">
                    <label htmlFor="expiration">Expiration Date</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.expiration ? 'is-invalid' : ''}`}
                      id="expiration"
                      name="expiration"
                      placeholder="MM/YY"
                      onChange={handleInputChange}
                    />
                    {formErrors.expiration && <div className="invalid-feedback">{formErrors.expiration}</div>}
                  </div>
                  <div className="form-group text-center">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.cvv ? 'is-invalid' : ''}`}
                      id="cvv"
                      name="cvv"
                      onChange={handleInputChange}
                    />
                    {formErrors.cvv && <div className="invalid-feedback">{formErrors.cvv}</div>}
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
