import React from 'react'
import './Services.css'
import { Link } from 'react-router-dom';

function ServicesData(props) {
  return (
    <div className='s-cards'>
      <div className='s-image'>
        <img alt='img' src={props.image}/>
      </div>
      <h3>{props.heading}</h3>
      <p>{props.text}</p>
      <Link to={props.link} className='btnSubmit'>{props.title}</Link>
    </div>
  )
}

export default ServicesData


