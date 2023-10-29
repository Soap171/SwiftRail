import './Style.css';
import { Route, Routes, Navigate,useNavigate } from 'react-router-dom';
import Home from './routes/Home';
import Contact from './routes/Contact';
import Service from './routes/Service';
import About from './routes/About';
import Schedules from './routes/Schedules';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import Booking from './routes/Booking';
import Subscriptions from './routes/Subscriptions';
import CheckoutPopup from './routes/CheckoutPopup';
import Profile from './routes/Profile';
import { AuthProvider, useAuth } from './components/AuthContext';
import React, { useEffect } from 'react';



function ProfileRoute() {
  const auth = useAuth();
  const navigate = useNavigate();

  // Use useEffect to handle authentication changes
  React.useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/Login');
    }
  }, [auth.isAuthenticated, navigate]);

  if (!auth.isAuthenticated) {
    return null; // Or display a loading indicator while redirecting
  }

  return <Profile />;
}

function SubscriptionsRoute() {
  const auth = useAuth();
  const navigate = useNavigate();

  // Use useEffect to handle authentication changes
  React.useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/Login');
    }
  }, [auth.isAuthenticated, navigate]);

  if (!auth.isAuthenticated) {
    return null; // Or display a loading indicator while redirecting
  }

  return <Subscriptions />;
}

function BookingRoute() {
  const auth = useAuth();
  const navigate = useNavigate();

  // Use useEffect to handle authentication changes
  React.useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/Login');
    }
  }, [auth.isAuthenticated, navigate]);

  if (!auth.isAuthenticated) {
    return null; // Or display a loading indicator while redirecting
  }

  return <Booking />;
}



function App() {
  return (
    
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Service" element={<Service />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Schedules" element={<Schedules />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/CheckoutPopup" element={<CheckoutPopup />} />
          <Route path="/Profile" element={<ProfileRoute />} />
        <Route path="/Subscriptions" element={<SubscriptionsRoute />} />
        <Route path="/Booking" element={<BookingRoute />} />
        </Routes>
      </div>
   
  );
}

export default App;
