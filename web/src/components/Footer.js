import React from 'react';
import { Link } from 'react-router-dom';
import { Menuitems } from './Menuitems';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            {/* Social Icons */}
            <div className="social-icons mb-4">
              <a href="https://www.facebook.com/" target='_blank' className="text-white me-3">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com/?lang=en" target='_blank' className="text-white me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/?hl=en" target='_blank' className="text-white me-3">
                <i className="fab fa-instagram"></i>
              </a>
            </div>

            {/* Additional Content */}
            <div className="mb-4">
              <h5>Contact Us</h5>
              <p>Email: contact@travelpulse.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            {/* Quick Links */}
            <div className="mb-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
              {Menuitems.map((item, index) => (
              <li key={index}>
                <Link  to={item.url} className="footer-link">
                  {item.title}
                </Link>
              </li>
            ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            {/* Newsletter */}
            <div className="mb-4">
              <h5>Subscribe to Our Newsletter</h5>
              <form>
                <div className="input-group">
                  <input type="email" className="form-control" placeholder="Enter your email" />
                  <button className="btn btn-primary" type="button">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright Ownership */}
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} TravelPulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;