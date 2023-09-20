import React from 'react'
import './Services.css'
import ServicesData from './ServicesData'
import Guide from '../assets/Guide.jpg'
import Booking from '../assets/Booking.jpg'
import Consultant from '../assets/Consultant.jpg'

function Services() {
  return (
    <div className='services'>
        <h1>Our Services</h1>
        <p>We're dedicated to creating unforgettable travel experiences. From expert guides to curated packages, our services cater to your every need. Explore with us and make unforgettable global memories.</p>
      <div className='service-card'>
       <ServicesData
       
        image= {Guide}
        heading = "Guided Tours"
        text = "Explore the world with our knowledgeable guides who will lead you through the best destinations, ensuring an enriching travel experience."
        
       
       />

      <ServicesData
       
       image= {Booking}
       heading = "Accommodation Booking"
       text = "Find the perfect place to stay with our wide range of accommodation options, from luxury hotels to cozy cottages."
       
      
      />


      <ServicesData
       
       image= {Consultant}
       heading = "Travel Consultation"
       text = "Receive expert advice and travel tips from our experienced consultants, helping you plan the perfect getaway."
       
      
      />
      </div>
    </div>
  )
}

export default Services
