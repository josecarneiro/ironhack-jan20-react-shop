import React, { Component } from 'react';
import ProductItem from './../../components/ProductItem';
import './style.scss';

import { list as listProducts } from './../../services/product';

class ProductListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    listProducts()
      .then(products => {
        this.setState({
          products
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="product__list">
          {this.state.products.map(product => (
            <ProductItem key={product.id} {...product} />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductListView;
