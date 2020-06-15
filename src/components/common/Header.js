import React from 'react';
import { Link } from 'react-router-dom';
import '../../resources/css/bootstrap.css';

const Header = () => {
  return (
    <header>
      <nav className='navbar navbar-dark bg-secondary fixed-top'>
        <Link to='/' className='navbar-brand font-weight-bold'>React API Tool</Link>
      </nav>
    </header>
  )
}

export default Header;