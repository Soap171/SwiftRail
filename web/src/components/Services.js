import React from 'react'
import './Services.css'
import ServicesData from './ServicesData'
import Schedules from '../assets/Schedules-min.jpg'
import QR from '../assets/QR-min.jpg'
import Parcel from '../assets/Parcel-min.jpg'

function Services() {
  return (
    <div className='services'>
        <h1>Our Services</h1>
        <p>Streamlined Train Transportation Services at Your Fingertips! Discover the Convenience of QR Ticketing,
           Parcel Booking, and Real-Time Schedules with swfitrail. Whether you're a frequent traveler or a business
            in need of reliable shipping solutions, swfitrail is your go-to platform for hassle-free train transportation services.
           Explore our range of features designed to make your train journeys and parcel shipments more efficient and enjoyable.</p>
      <div className='service-card'>
       <ServicesData
       
        image= {Schedules}
        heading = "Train Schedules"
        text = "Stay On Track with Train Schedules: Easily access train schedules from your location to your destination on swfitrail. Plan your journeys efficiently and set up SMS notifications for specific train arrivals and departures. Never miss a train again – swfitrail keeps you informed and on time"
        title = "Schedules"
        link = "/Schedules"
       
       />

      <ServicesData
       
       image= {QR}
       heading = "QR Tickets"
       text = "Experience Ultimate Convenience: Our QR Ticket Subscription Plans simplify train travel. No more ticket hassles. Choose from flexible options daily, monthly, or long-term. Enjoy quick, paperless ticketing and journey hassle-free with swfitrail! Join today!"
       title = "Subscriptions"
       link = "/Subscriptions"
       
      
      />


      <ServicesData
       
       image= {Parcel}
       heading = "Parcel Bookings"
       text = "Simplify Parcel Booking Online: Enjoy the convenience of booking parcels online with swfitrail. Easily arrange shipments from your home or office using our user-friendly platform. Send parcels to your preferred destinations effortlessly."
       title = "Parcel Booking"
       link = "/Booking"
      />

      </div>
    </div>
  )
}

export default Services
