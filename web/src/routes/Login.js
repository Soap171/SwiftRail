// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css'

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    if (userName === 'admin' && password === '123') {
      navigate('/Profile');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleSignUp = () => {
    navigate('/SignUp'); // Navigate to the "SignUp" route
  };

  return (
    <div className="login-container">
      <div className="login-panel">
        <div className="card">
          <div className="card-header text-center bg-primary text-white">
            SwiftRail
          </div>
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="userName">User name</label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  placeholder="Enter User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleSignUp}>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="contact-button">
        <button className="btn btn-secondary btn-lg">Contact Us</button>
      </div>
    </div>
  );
}

export default Login;
