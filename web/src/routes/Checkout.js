import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CheckoutImg from '../assets/Checkout.jpg';
import QRCode from 'react-qr-code'; // Import the QR code library

function Checkout() {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvv: '',
  });
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const validateCardDetails = () => {
    const errors = {};

    if (!cardDetails.cardNumber) {
      errors.cardNumber = 'Card number is required.';
    } else if (!/^\d{16}$/.test(cardDetails.cardNumber)) {
      errors.cardNumber = 'Invalid card number. It should be 16 digits.';
    }

    if (!cardDetails.cardHolder) {
      errors.cardHolder = 'Card holder name is required.';
    }

    if (!cardDetails.expirationDate) {
      errors.expirationDate = 'Expiration date is required.';
    } else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expirationDate)) {
      errors.expirationDate = 'Invalid expiration date. Use MM/YY format.';
    }

    if (!cardDetails.cvv) {
      errors.cvv = 'CVV is required.';
    } else if (!/^\d{3}$/.test(cardDetails.cvv)) {
      errors.cvv = 'Invalid CVV. It should be 3 digits.';
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (validateCardDetails()) {
      // Handle your payment logic here
      // Set showPaymentSuccess to true when payment is successful
      setShowPaymentSuccess(true);

      // Generate a QR code when payment is successful
      const qrCodeData = `Payment Details: ${JSON.stringify(cardDetails)}`;
      setShowQRCode(qrCodeData);
    }
  };

  const handleDownloadQRCode = () => {
    // Clean up temporary elements

    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = `data:image/png;base64,${btoa(showQRCode)}`;
    a.download = 'payment_qr_code.png';
    a.click();
  };

  return (
    <>
      <Navbar />
      <Hero cName="hero-other" heroImg={CheckoutImg} title="Checkout" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            {/* Checkout form */}
            <form onSubmit={handlePaymentSubmit}>
              <h2>Card Details</h2>
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                  Card Number
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    validationErrors.cardNumber ? 'is-invalid' : ''
                  }`}
                  id="cardNumber"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardInputChange}
                />
                {validationErrors.cardNumber && (
                  <div className="invalid-feedback">
                    {validationErrors.cardNumber}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="cardHolder" className="form-label">
                  Card Holder
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    validationErrors.cardHolder ? 'is-invalid' : ''
                  }`}
                  id="cardHolder"
                  name="cardHolder"
                  value={cardDetails.cardHolder}
                  onChange={handleCardInputChange}
                />
                {validationErrors.cardHolder && (
                  <div className="invalid-feedback">
                    {validationErrors.cardHolder}
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="expirationDate" className="form-label">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validationErrors.expirationDate ? 'is-invalid' : ''
                    }`}
                    id="expirationDate"
                    name="expirationDate"
                    value={cardDetails.expirationDate}
                    onChange={handleCardInputChange}
                  />
                  {validationErrors.expirationDate && (
                    <div className="invalid-feedback">
                      {validationErrors.expirationDate}
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validationErrors.cvv ? 'is-invalid' : ''
                    }`}
                    id="cvv"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardInputChange}
                  />
                  {validationErrors.cvv && (
                    <div className="invalid-feedback">{validationErrors.cvv}</div>
                  )}
                </div>
              </div>
              <button type="submit" className="btn btn-primary mb-2">
                Make Payment
              </button>
            </form>
          </div>
          <div className="col-md-4">
            {/* Display payment success message and QR code */}
            {showPaymentSuccess ? (
              <div>
                <h2>Payment Successful!</h2>
                <p>Thank you for your purchase.</p>
                <p>Click the button below to download your QR code:</p>
                <button
                  onClick={handleDownloadQRCode}
                  className="btn btn-success"
                >
                  Download QR Code
                </button>
              </div>
            ) : null}
            {/* Render QR code */}
            {showQRCode ? (
              <div className="mt-4">
                <QRCode value={showQRCode} size={128} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;

