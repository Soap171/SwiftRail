import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ServiceImg from '../assets/service.jpg'

function Service() {
  return (
    <>
    <Navbar/>
    <Hero
    cName = "hero-other"
    heroImg = {ServiceImg}
    title = "Services"
    
    
    />
    </>
  )
}

export default Service
