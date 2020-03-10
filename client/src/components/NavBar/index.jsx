import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <Link to="/">Shop</Link>
      <Link to="/checkout">Checkout</Link>
    </nav>
  );
};

export default NavBar;
