import './Style.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Contact from './routes/Contact';
import Service from './routes/Service';
import About from './routes/About';
import Schedules from './routes/Schedules';
import Subscriptions from './routes/Subscriptions'
import ParcelBookings from './routes/ParcelBookings'
import Profile from './routes/Profile'
import Login from './routes/Login'
import SignUp from './routes/SignUp'


function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={ <Home/>}/>
        <Route path="/About" element={ <About/>}/>
        <Route path="/Service" element={ <Service/>}/>
        <Route path="/Contact" element={ <Contact/>}/>
        <Route path="/About" element={ <About/>}/>
        <Route path="/Schedules" element={ <Schedules/>}/>
        <Route path="/Subscriptions" element={ <Subscriptions/>}/>
        <Route path="/ParcelBookings" element={ <ParcelBookings/>}/>
        <Route path="/Profile" element={ <Profile/>}/>

      </Routes>
     

  
      
    </div>
  );
}

export default App;
