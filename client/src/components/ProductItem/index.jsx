import React from 'react';
import { Link } from 'react-router-dom';

import formatPrice from './../../utilities/format-price';

import classnames from 'classnames';

import './style.scss';

const ProductItem = props => {
  return (
    <Link
      to={`/product/${props._id}`}
      className={classnames('product__item', { 'product__item--disabled': !props.unitsLeft })}
    >
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
