import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ContactImg from '../assets/contact.jpg'
import Footer from '../components/Footer'

function Contact() {
  return (
    <>
    <Navbar/>
    <Hero
    cName = "hero-other"
    heroImg = {ContactImg}
    title = "Contact"
    />
    <Footer/>
    </>
    
     
  )
}

export default Contact
