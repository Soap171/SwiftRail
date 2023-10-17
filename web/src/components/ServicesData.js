import React from 'react';
import './Services.css';
import { Link } from 'react-router-dom';

function ServicesData(props) {
  const { heading, text, link, image, isAuthenticated } = props;

  return (
    <div className='s-cards'>
      <div className='s-image'>
        <img alt='img' src={image} />
      </div>
      <h3>{heading}</h3>
      <p>{text}</p>   
      <Link to={link} className='btnSubmit'>{props.title}</Link>
    </div>
  );
}

export default ServicesData;


