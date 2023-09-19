import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AboutImg from '../assets/about.jpg'
function About() {
  return (
   <>
    <Navbar/>
    <Hero
    cName = "hero-other"
    heroImg = {AboutImg}
    title = "About"
    
    
    />
   </>
     
      
   
  )
}

export default About
