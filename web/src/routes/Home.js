import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HomeImg from '../assets/home-min.jpg'
import Destination from '../components/Destination'
import Services from '../components/Services'
import Footer from '../components/Footer'

function Home() {
  return (
   <>
   <Navbar/>
    <Hero
    cName = "hero"
    heroImg = {HomeImg}
    title = "Explore Your Dream Destinations with Us!"
    text = "Begin Your Journey of a Lifetime with Our Travel Expertise!" 
    btnText = "Start"
    url = "/Service"
    btnClass = "homeBtn"
    />
    <Destination/>
    <Services/>
    <Footer/>
   </>

    
   
  )
}

export default Home
