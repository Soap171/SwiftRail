import React from 'react'
import './Services.css'

function ServicesData(props) {
  return (
    <div className='s-cards'>
      <div className='s-image'>
        <img alt='img' src={props.image}/>
      </div>
      <h3>{props.heading}</h3>
      <p>{props.text}</p>
    </div>
  )
}

export default ServicesData


