import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // Import the useAuth hook
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css';
import supabase from '../config/supabaseClient';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from the AuthContext
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if the user exists with the provided credentials in the Supabase `customer` table
    const { data, error } = await supabase
      .from('customer')
      .select('NIC, userName, password')
      .eq('userName', userName)
      .eq('password', password)
      .single();

    if (error) {
      console.error('Error during login:', error);
    } else if (data) {
      // User with the provided credentials found
      // You can store the user's data in a state or context for further use
      console.log(data)
      login(data);

      // For now, navigate to the root page ('/')
      navigate('/');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  }

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
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/SignUp')}>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="contact-button">
        <a href="mailto:spiyumal48@gmail.com" className="btn btn-secondary btn-lg">
          Contact
        </a>
      </div>
    </div>
  );
}

export default Login;
