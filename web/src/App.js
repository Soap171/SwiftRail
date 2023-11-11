import './Style.css';
import { Route, Routes, Navigate,useNavigate } from 'react-router-dom';
import Home from './routes/Home';
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
import LoadingIndicator from '../src/components/LoadingIndicator';


function PrivateRoute({ element: Element, ...props }) {
    const auth = useAuth();
  
    if (auth.isLoading) {
      return <LoadingIndicator />;
    }
  
    if (!auth.isAuthenticated) {
      return <Navigate to="/Login" />;
    }
  
    return <Element {...props} />;
  }

function App() {
  return (
    
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CheckoutPopup" element={<CheckoutPopup/>} />
          <Route path="/About" element={<About />} />
          <Route path="/Service" element={<Service />} />
          <Route path="/Schedules" element={<Schedules />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Profile" element={<PrivateRoute element={Profile} />} />
        <Route path="/Subscriptions" element={<PrivateRoute element={Subscriptions} />} />
        <Route path="/Booking" element={<PrivateRoute element={Booking} />} />
        </Routes>
      </div>
   
  );
}

export default App;
