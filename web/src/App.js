import './Style.css'
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Contact from './routes/Contact';
import Service from './routes/Service';
import About from './routes/About';
import Schedules from './routes/Schedules';
import Login from './routes/Login'
import SignUp from './routes/SignUp'
import Booking from './routes/Booking';
import Subscriptions from './routes/Subscriptions';
import CheckoutPopup from './routes/CheckoutPopup';

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
        <Route path="/Login" element={ <Login/>}/>
        <Route path="/SignUp" element={ <SignUp/>}/>
        <Route path="/Booking" element={ <Booking/>}/>
        <Route path="/Subscriptions" element={ <Subscriptions/>}/>
        <Route path="/CheckoutPopup" element={ <CheckoutPopup/>}/>

      </Routes>
     

  
      
    </div>
  );
}

export default App;
