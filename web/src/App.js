import './Style.css';
import { Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
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

function App() {
  const isAuthenticated = /* Check if the user is authenticated, e.g., from state or context */ false;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Schedules" element={<Schedules isAuthenticated={isAuthenticated} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/CheckoutPopup" element={<CheckoutPopup />} />
        {/* Separate the Profile route based on authentication status */}
        {isAuthenticated ? (
          <Route path="/Profile" element={<Profile />} />
        ) : (
          <Route path="/Profile" element={<Navigate to="/Login" />} />
        )}

        {isAuthenticated ? (
          <Route path="/Subscriptions" element={<Subscriptions />} />
        ) : (
          <Route path="/Subscriptions" element={<Navigate to="/Login" />} />
        )}


        {isAuthenticated ? (
          <Route path="/Booking" element={<Booking />} />
        ) : (
          <Route path="/Booking" element={<Navigate to="/Login" />} />
        )}


      </Routes>
    </div>
  );
}

export default App;
