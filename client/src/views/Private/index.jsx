import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PrivateView extends Component {
  render() {
    const user = this.props.user;
    return (
      <div>
        <figure>
          <img src={user.picture} alt={user.name} />
        </figure>
        <div>
          <h1>{user.name}</h1>
          <span>{user.email}</span>
        </div>
        <Link to="/private/edit">Edit Profile</Link>
      </div>
    );
  }
}

export default PrivateView;
