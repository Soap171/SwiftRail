import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import CheckoutImg from '../assets/Checkout.jpg';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import QRCode from 'qrcode';
import supabase from '../config/supabaseClient';

function CheckoutPopup() {
  const { userData } = useAuth();
  const userNIC = userData ? userData.NIC : null;
  const [qrCodeImage, setQRCodeImage] = useState(null);
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
      try {
        const subscriptionDuration = 30;
        const today = new Date().toISOString().split('T')[0];

        // Fetch subscription data to get the amount for the chosen subscription
        const { data: subscriptionData, error: subscriptionError } = await supabase
          .from('subscription')
          .select('amount')
          .eq('subscriptionId', subscriptionKey)
          .single();

        if (subscriptionError) {
          console.error('Error fetching subscription data:', subscriptionError);
          return;
        }

        const amount = subscriptionData ? subscriptionData.amount : 0;

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

        // Fetch the balance after the transaction
        const { data: newSubscriptionData, error: newSubscriptionError } = await supabase
          .from('customerSubscription')
          .select('balance')
          .eq('customerNIC', userNIC)
          .eq('subscriptionId', subscriptionKey)
          .single();

        if (newSubscriptionError) {
          console.error('Error fetching subscription data:', newSubscriptionError);
          return;
        }

        const balance = newSubscriptionData ? newSubscriptionData.balance : 0;
        console.log(newSubscriptionData.balance);

        // Generate the QR code data including 'balance'
        const qrData = JSON.stringify({
          transactionID: subscriptionKey,
          customerNIC: userNIC,
          balance: balance, // Include 'balance' in the QR code
        });

        // Generate the QR code image
        QRCode.toDataURL(qrData, (err, url) => {
          if (err) {
            console.error('Error generating QR code:', err);
          } else {
            setQRCodeImage(url); // Save the generated QR code image URL
          }
        });
      } catch (error) {
        console.error('Error during payment:', error);
      }
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
              {qrCodeImage && (
                <div>
                  <h3>Download Your Payment Receipt</h3>
                  {/* Adjust the size of the image element */}
                  <img
                    src={qrCodeImage}
                    alt="Payment Receipt QR Code"
                    style={{ width: '200px', height: '200px' }} // Set the desired width and height
                  />

                  {/* Add a download link for the QR code image */}
                  <a href={qrCodeImage} download="payment_receipt.png">
                    Download QR Code
                  </a>
                </div>
              )}
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
