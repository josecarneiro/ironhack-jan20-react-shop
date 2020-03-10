import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar';

import ProductSingleView from './views/ProductSingle';
import ProductListView from './views/ProductList';
import CheckoutView from './views/Checkout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact component={ProductListView} />
          <Route path="/product/:id" component={ProductSingleView} />
          <Route path="/checkout" component={CheckoutView} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
