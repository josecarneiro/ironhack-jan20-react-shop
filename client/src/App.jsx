import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';

import ProductSingleView from './views/ProductSingle';
import ProductListView from './views/ProductList';
import CheckoutView from './views/Checkout';
import AuthenticationSignUpView from './views/Authentication/SignUp';
import AuthenticationSignInView from './views/Authentication/SignIn';
import ErrorView from './views/Error';

import { loadUserInformation } from './services/authentication';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null
    };
    this.updateUserInformation = this.updateUserInformation.bind(this);
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

  render() {
    return (
      <div className="App">
        {(this.state.loaded && (
          <BrowserRouter>
            <NavBar user={this.state.user} updateUserInformation={this.updateUserInformation} />
            <Switch>
              <Route path="/" exact component={ProductListView} />
              <Route path="/product/:id" component={ProductSingleView} />
              <ProtectedRoute
                path="/checkout"
                component={CheckoutView}
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
