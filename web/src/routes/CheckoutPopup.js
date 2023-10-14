import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import CheckoutImg from '../assets/Checkout.jpg';
import '../components/Button.css';

function CheckoutPopup() {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardType: 'visa',
    cardNumber: '',
    expiration: '',
    cvv: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName) {
      errors.fullName = 'Full Name is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    }

    if (!formData.address) {
      errors.address = 'Address is required';
    }

    if (!formData.city) {
      errors.city = 'City is required';
    }

    if (!formData.zip) {
      errors.zip = 'ZIP Code is required';
    }

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
      // You can add your payment processing logic here.
      // For this example, we'll simulate a payment with a brief delay.
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
              {/* You can display the order summary here. */}
            </div>
          ) : (
            <>
              <div className="col-md-6">
                <h2>Billing Information</h2>
                <form onSubmit={handlePayment}>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.fullName ? 'is-invalid' : ''}`}
                      id="fullName"
                      name="fullName"
                      onChange={handleInputChange}
                    />
                    {formErrors.fullName && <div className="invalid-feedback">{formErrors.fullName}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      onChange={handleInputChange}
                    />
                    {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.address ? 'is-invalid' : ''}`}
                      id="address"
                      name="address"
                      onChange={handleInputChange}
                    />
                    {formErrors.address && <div className="invalid-feedback">{formErrors.address}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.city ? 'is-invalid' : ''}`}
                      id="city"
                      name="city"
                      onChange={handleInputChange}
                    />
                    {formErrors.city && <div className="invalid-feedback">{formErrors.city}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="zip">ZIP Code</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.zip ? 'is-invalid' : ''}`}
                      id="zip"
                      name="zip"
                      onChange={handleInputChange}
                    />
                    {formErrors.zip && <div className="invalid-feedback">{formErrors.zip}</div>}
                  </div>
                </form>
              </div>

              <div className="col-md-6">
                <h2>Payment Information</h2>
                <form onSubmit={handlePayment}>
                  <div className="form-group">
                    <label htmlFor="cardType">Card Type</label>
                    <select
                      className={`form-control ${formErrors.cardType ? 'is-invalid' : ''}`}
                      id="cardType"
                      name="cardType"
                      onChange={handleInputChange}
                    >
                      <option value="visa">Visa</option>
                      <option value="mastercard">MasterCard</option>
                      <option value="amex">American Express</option>
                    </select>
                    {formErrors.cardType && <div className="invalid-feedback">{formErrors.cardType}</div>}
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
            </>
          )}
        </div>
     </div>
   <Footer />
</div>
);
}
              
 export default CheckoutPopup;
              
         
