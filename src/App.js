import React, { Component } from 'react';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import ReactDOM from "react-dom";
import { firebaseConfig } from '../src/config';
import * as firebaseClient from 'firebase';
import XhrEvalChunkPlugin from 'xhr-eval-chunk-webpack-plugin';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import isEmpty from 'lodash/isEmpty';
import requireAuth from './ProtectedRoute/protectedroute'


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./views/Pages/Login'));
const routes = React.lazy(() => import('./routes'));


// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const Dashboard = React.lazy(() => import('./containers/DefaultLayout/'));
const userId = JSON.parse(window.localStorage.getItem('userInfo'));


// const isAuthenticated = () => {
//   //write your condition here
//   return false;

// }


// const UnauthenticatedRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     !isAuthenticated()
//       ? <Component {...props} />
//       : <Redirect to='/' />
//   )} />
// );


// const AuthenticatedRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     isAuthenticated()
//       ? <Component {...props} />
//       : <Redirect to='/login' />
//   )} />
// );


class App extends Component {
  constructor(props) {
    super(props);


    this.state = {
      region: 'UAE',
      user: null,
      errorMessage: "",
      auth: true
    };

  }

  render() {

    return (
      <BrowserRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/" name="Login Page" component={Login} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route  path="/" name="Home" component={Dashboard} />

            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
