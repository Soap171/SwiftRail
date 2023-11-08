import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import CheckoutImg from '../assets/Checkout-min.jpg';
import { useAuth } from '../components/AuthContext';
import supabase from '../config/supabaseClient';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';


function CheckoutPopup() {
  const navigate = useNavigate();
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

    if (!formData.cardNumber) {
      errors.cardNumber = 'Card Number is required';
    }

    if (!formData.expiration) {
      errors.expiration = 'Expiration Date is required';
    }

    if (!formData.cvv) {
      errors.cvv = 'CVV is required';
    } else if (formData.cvv.length !== 3) {
      errors.cvv = 'CVV must be a 3-digit number';
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

        setPaymentComplete(true);

        // Additional logic if payment is successful
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
              <Link to="/Profile" className="btn btn-primary">Check The QR</Link>
            </div>
          ) : (
            <div className="col-md-6 offset-md-3">
              <form onSubmit={handlePayment}>
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

                <div className="form-group">
      <label htmlFor="cardNumber">Card Number</label>
      <InputMask
        mask="9999 9999 9999 9999" // Custom mask for card number
        maskChar=" "
        type="text"
        className={`form-control ${formErrors.cardNumber ? 'is-invalid' : ''}`}
        id="cardNumber"
        name="cardNumber"
        value={formData.cardNumber}
        onChange={handleInputChange}
      />
      {formErrors.cardNumber && <div className="invalid-feedback">{formErrors.cardNumber}</div>}
    </div>

    <div className="form-group">
      <label htmlFor="expiration">Expiration Date</label>
      <InputMask
        mask="99/99" // Mask for expiration date (MM/YY)
        maskChar=" "
        type="text"
        className={`form-control ${formErrors.expiration ? 'is-invalid' : ''}`}
        id="expiration"
        name="expiration"
        value={formData.expiration}
        onChange={handleInputChange}
      />
      {formErrors.expiration && <div className="invalid-feedback">{formErrors.expiration}</div>}
    </div>

    <div className="form-group">
      <label htmlFor="cvv">CVV</label>
      <InputMask
        mask="999" // Mask for CVV
        maskChar=" "
        type="text"
        className={`form-control ${formErrors.cvv ? 'is-invalid' : ''}`}
        id="cvv"
        name="cvv"
        value={formData.cvv}
        onChange={handleInputChange}
      />
      {formErrors.cvv && <div className="invalid-feedback">{formErrors.cvv}</div>}
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
