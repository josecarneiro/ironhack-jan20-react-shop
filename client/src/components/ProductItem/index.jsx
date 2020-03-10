import React from 'react';
import { Link } from 'react-router-dom';

import formatPrice from './../../utilities/format-price';

import './style.scss';

const ProductItem = props => {
  return (
    <Link to={`/product/${props.id}`} className="product__item">
      <figure className="product__image">
        <img src={props.image} alt={props.name} />
      </figure>
      <header className="product__information">
        <div className="product__details">
          <strong>{props.name}</strong>
          {props.unitsLeft <= 13 && <small>Only {props.unitsLeft} units left!</small>}
          <small>{props.colors} colors</small>
        </div>
        <div className="product__price">
          <span>{formatPrice(props.price)}</span>
        </div>
      </header>
    </Link>
  );
};

export default ProductItem;
