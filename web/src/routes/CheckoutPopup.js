import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import CheckoutImg from '../assets/Checkout.jpg';

function CheckoutPopup() {
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    // You can add your payment processing logic here.
    // For this example, we'll simulate a payment with a brief delay.
    setTimeout(() => {
      setPaymentComplete(true);
    }, 2000); // Simulating a 2-second payment processing delay
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
                    <input type="text" className="form-control" id="fullName" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" id="address" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" className="form-control" id="city" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zip">ZIP Code</label>
                    <input type="text" className="form-control" id="zip" />
                  </div>
                </form>
              </div>

              <div className="col-md-6">
                <h2>Payment Information</h2>
                <form onSubmit={handlePayment}>
                  <div className="form-group">
                    <label htmlFor="cardType">Card Type</label>
                    <select className="form-control" id="cardType">
                      <option value="visa">Visa</option>
                      <option value="mastercard">MasterCard</option>
                      <option value="amex">American Express</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input type="text" className="form-control" id="cardNumber" />
                  </div>
                  <div className="form-row">
                  <div className="form-group text-center"> {/* Center the fields */}
                    <label htmlFor="expiration">Expiration Date</label>
                    <input type="text" className="form-control" id="expiration" placeholder="MM/YY" />
                  </div>
                  <div className="form-group text-center"> {/* Center the fields */}
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" className="form-control" id="cvv" />
                  </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block mt-2">Pay</button>
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
