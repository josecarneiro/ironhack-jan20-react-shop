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
          <Link to="/private">
            <div className="profile__picture">
              <img src={props.user.picture} alt={props.user.name} />
            </div>
            {props.user.name}'s Profile
          </Link>
          <Link to="/checkout">
            Shopping Cart <small>({props.cart.length})</small>
          </Link>
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
