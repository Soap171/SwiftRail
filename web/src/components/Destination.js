import React from 'react'
import DestinationData from './DestinationData'
import GoldenGate1 from '../assets/GoldenGate (1).jpg';
import GoldenGate2 from '../assets/GoldenGate (2).jpg';
import Rome1 from '../assets/Rome (1).jpg';
import Rome2 from '../assets/Rome (2).jpg';
import Lodon1 from '../assets/London (1).jpg';
import Lodon2 from '../assets/London (2).jpg';


function Destination() {
  return (
    <>
    <div className='destination'>
        <h1>Discover Your Dream Destinations</h1>
        <p>Discover and embark on your ideal adventure.</p>
        <DestinationData
        className = "first-des"
        heading = "Golden Gate Bridge , USA"
        text = "The iconic Golden Gate Bridge in San Francisco is a marvel of engineering and a symbol of the city. Spanning the entrance to San Francisco Bay, it offers breathtaking views and a piece of history you won't want to miss during your visit."
        image1 = {GoldenGate1}
        image2 = {GoldenGate2}      
        />

       <DestinationData
        className = "first-des-reverse"
        heading = "Discover Rome's Rich Heritage, Italy"
        text = "Explore the timeless city of Rome, where history and culture blend seamlessly. From the awe-inspiring Colosseum to the historic streets of the Vatican, immerse yourself in centuries of art, architecture, and ancient wonders.        "
        image1 = {Rome1}
        image2 = {Rome2}      
       />


       <DestinationData
       className = "first-des"
       heading = "Experience London, UK"
       text = "Explore the vibrant city of London, UK. With its iconic landmarks like Big Ben and the Tower Bridge, world-class museums, and diverse neighborhoods, London offers a blend of history, culture, and modernity that will captivate your senses."
       image1 = {Lodon1}
       image2 = {Lodon2}      
/>

    </div>
    </>
  )
}

export default Destination;
