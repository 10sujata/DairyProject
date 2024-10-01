import React, { Component } from 'react';
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import PrivateRoute from './views/Pages/Login/private-route';


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;


// Containers
//const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const DefaultLayout = React.lazy(() => import('./views/Pages/Login'));
const routes = React.lazy(() => import('./routes'));

// Pages
// const Login = React.lazy(() => import('./views/Pages/Login'));
// const Register = React.lazy(() => import('./views/Pages/Register'));
// const Page404 = React.lazy(() => import('./views/Pages/Page404'));
// const Page500 = React.lazy(() => import('./views/Pages/Page500'));


const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const Dashboard = React.lazy(() => import('./containers/DefaultLayout/'));

const userId = JSON.parse(window.localStorage.getItem('userInfo'));


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
    const { isUserLogggedIn } = this.state;
    return (
      <BrowserRouter>
          <React.Suspense fallback={loading()}>
          <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
              <PrivateRoute path="/" name="Home" component={Dashboard} />
            </Switch>
            {/* <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
            </Switch> */}
          </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
