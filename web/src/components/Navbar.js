import React, { Component } from 'react';
import { Menuitems } from './Menuitems';
import './Navbar.css';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <div>
        <nav className='NavbarItems'>
          <Link to="/" className='Navbar-logo'>SwiftRail</Link>
          <div className='menu-icons' onClick={this.handleClick}>
            <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>

          <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
            {Menuitems.map((item, index) => (
              <li key={index}>
                <Link className={item.cName} to={item.url}>
                  <i className={item.icon}></i>
                  {item.title}
                </Link>
              </li>
            ))}
           
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
<h1 className='Navbar-logo'></h1>