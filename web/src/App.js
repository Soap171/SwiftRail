import './Style.css';
import { Route, Routes, Navigate } from 'react-router-dom';
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
          <Route
            path="/Profile"
            element={
              useAuth().isAuthenticated ? <Profile /> : <Navigate to="/Login" />
            }
          />
          <Route
            path="/Subscriptions"
            element={
              useAuth().isAuthenticated ? (
                <Subscriptions />
              ) : (
                <Navigate to="/Login" />
              )
            }
          />
          <Route
            path="/Booking"
            element={
              useAuth().isAuthenticated ? <Booking /> : <Navigate to="/Login" />
            }
          />
        </Routes>
      </div>
   
  );
}

export default App;
