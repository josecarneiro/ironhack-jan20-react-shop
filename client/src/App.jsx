import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';

import ProductSingleView from './views/ProductSingle';
import ProductListView from './views/ProductList';
import CheckoutView from './views/Checkout';
import AuthenticationSignUpView from './views/Authentication/SignUp';
import AuthenticationSignInView from './views/Authentication/SignIn';
import PrivateView from './views/Private';
import PrivateEditView from './views/PrivateEdit';
import PaymentMethodListView from './views/PaymentMethodList';
import PaymentMethodCreateView from './views/PaymentMethodCreate';
import ErrorView from './views/Error';

import { loadUserInformation } from './services/authentication';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null,
      cart: []
    };
    this.updateUserInformation = this.updateUserInformation.bind(this);
    this.updateCart = this.updateCart.bind(this);
  }

  componentDidMount() {
    loadUserInformation()
      .then(user => {
        this.updateUserInformation(user);
        this.setState({
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateUserInformation(user) {
    this.setState({
      user
    });
  }

  updateCart(item) {
    this.setState(previousState => ({
      cart: [...previousState.cart, item]
    }));
  }

  render() {
    return (
      <div className="App">
        {(this.state.loaded && (
          <BrowserRouter>
            <NavBar
              user={this.state.user}
              cart={this.state.cart}
              updateUserInformation={this.updateUserInformation}
            />
            <Switch>
              <Route path="/" exact component={ProductListView} />
              <Route
                path="/product/:id"
                render={props => <ProductSingleView updateCart={this.updateCart} {...props} />}
              />
              <ProtectedRoute
                path="/checkout"
                render={props => <CheckoutView cart={this.state.cart} {...props} />}
                authorized={this.state.user}
                redirect={'/sign-in'}
              />
              <ProtectedRoute
                path="/sign-up"
                authorized={!this.state.user}
                redirect={'/'}
                render={props => (
                  <AuthenticationSignUpView
                    {...props}
                    updateUserInformation={this.updateUserInformation}
                  />
                )}
              />
              <ProtectedRoute
                path="/sign-in"
                authorized={!this.state.user}
                redirect={'/'}
                render={props => (
                  <AuthenticationSignInView
                    {...props}
                    updateUserInformation={this.updateUserInformation}
                  />
                )}
              />
              <ProtectedRoute
                authorized={this.state.user}
                redirect="/sign-in"
                path="/private/edit"
                render={props => (
                  <PrivateEditView
                    updateUserInformation={this.updateUserInformation}
                    user={this.state.user}
                    {...props}
                  />
                )}
              />
              <ProtectedRoute
                authorized={this.state.user}
                redirect="/sign-in"
                path="/private"
                render={props => <PrivateView user={this.state.user} {...props} />}
              />
              <ProtectedRoute
                authorized={this.state.user}
                redirect="/sign-in"
                path="/payment-method/list"
                render={props => <PaymentMethodListView user={this.state.user} {...props} />}
              />
              <ProtectedRoute
                authorized={this.state.user}
                redirect="/sign-in"
                path="/payment-method/create"
                render={props => <PaymentMethodCreateView user={this.state.user} {...props} />}
              />
              <Route path="/error" component={ErrorView} />
              <Redirect to="/error" />
            </Switch>
          </BrowserRouter>
        )) || <span>Loading...</span>}
      </div>
    );
  }
}

export default App;
