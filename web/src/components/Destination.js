import React from 'react'
import DestinationData from './DestinationData'
import Railway1 from '../assets/railway (1).jpg';
import Railway2 from '../assets/railway (2).jpg';
import Railway3 from '../assets/railway (3).jpg';
import Railway4 from '../assets/railway (4).jpg';
import Railway5 from '../assets/railway (5).jpg';
import Railway6 from '../assets/railway (6).jpg';


function Destination() {
  return (
    <>
    <div className='destination'>
        <h1>Discover Your Dream Destinations</h1>
        <p>Discover and embark on your ideal adventure.</p>
        <DestinationData
        className = "first-des"
        heading = "The Hill Country Railway"
        text = "For those seeking an exceptional railway adventure, the Hill Country Railway in Sri Lanka is a must-experience journey. This rail route meanders through the central highlands of the island, where the air is cool, and the landscape is dominated by lush tea plantations"
        image1 = {Railway1}
        image2 = {Railway2}      
        />

       <DestinationData
        className = "first-des-reverse"
        heading = "Journey Through Time and Nature"
        text = "Nestled in the heart of the Indian Ocean, Sri Lanka is a tropical paradise renowned for its stunning natural beauty. With pristine beaches, lush forests, and picturesque landscapes, the island offers a diverse array of landscapes, from golden sands along the coast to misty highlands shrouded in emerald green"
        image1 = {Railway5}
        image2 = {Railway6}      
       />


       <DestinationData
       className = "first-des"
       heading = "The Mesmerizing Beauty of the Island Paradise"
       text = "The Sri Lankan railway network is an enchanting experience that seamlessly combines history, culture, and natural beauty. Traversing through the island, this railway system takes travelers on a journey through time, as they wind their way through colonial-era train stations and lush, evergreen landscapes"
       image1 = {Railway3}
       image2 = {Railway4}      
/>

    </div>
    </>
  )
}

export default Destination;
