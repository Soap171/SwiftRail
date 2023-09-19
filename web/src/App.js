import './Style.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Contact from './routes/Contact';
import Service from './routes/Service';
import About from './routes/About';




function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={ <Home/>}/>
        <Route path="/About" element={ <About/>}/>
        <Route path="/Service" element={ <Service/>}/>
        <Route path="/Contact" element={ <Contact/>}/>
        <Route path="/About" element={ <About/>}/>
      </Routes>
     

  
      
    </div>
  );
}

export default App;
