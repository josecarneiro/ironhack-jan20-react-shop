import React, { Component, Fragment } from 'react';
import formatPrice from './../../utilities/format-price';
import './style.scss';

import { load as loadSingleProduct } from './../../services/product';

class ProductSingleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.handleCartAddition = this.handleCartAddition.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const id = this.props.match.params.id;
    loadSingleProduct(id)
      .then(product => {
        this.setState({ product });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleCartAddition() {
    this.props.updateCart(this.state.product);
  }

  render() {
    const { product } = this.state;

    return (
      <div className="product__single">
        {(product && (
          <Fragment>
            <figure className="product__single__image">
              <img src={product.image} alt={product.name} />
            </figure>
            <div className="product__single__description">
              <h1>{product.name}</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae illum quod sequi
                suscipit possimus nesciunt hic minus inventore distinctio iure!
              </p>
              <span>{product.colors} different colors</span>
              <button onClick={this.handleCartAddition}>
                Add to Cart | {formatPrice(product.price)}
              </button>
            </div>
          </Fragment>
        )) ||
          ''}
      </div>
    );
  }
}

export default ProductSingleView;
