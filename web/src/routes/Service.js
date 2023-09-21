import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ServiceImg from '../assets/service.jpg'
import Services from '../components/Services'
import Footer from '../components/Footer'

function Service() {
  return (
    <>
    <Navbar/>
    <Hero
    cName = "hero-other"
    heroImg = {ServiceImg}
    title = "Services"
    />
    <Services/>
    <Footer/>
    </>
  )
}

export default Service
