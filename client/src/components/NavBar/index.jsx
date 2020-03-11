import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { signOut } from '../../services/authentication';

const NavBar = props => {
  const handleSignOut = () => {
    signOut()
      .then(() => {
        props.updateUserInformation(null);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <nav className="nav-bar">
      <Link to="/">Shop</Link>
      {(props.user && (
        <Fragment>
          <Link to="/">{props.user.name}'s Profile</Link>
          <Link to="/checkout">Checkout</Link>
          <button onClick={handleSignOut}>Sign Out</button>
        </Fragment>
      )) || (
        <Fragment>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </Fragment>
      )}
    </nav>
  );
};

export default NavBar;
