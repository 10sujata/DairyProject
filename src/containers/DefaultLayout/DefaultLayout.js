import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';



import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import {customNav1,customNav2,customNav3} from '../../_nav';

// routes config
import routes from '../../routes';
import firebaseConfig from '../../config'

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));


class DefaultLayout extends Component {

  constructor(props) {
      super(props);
      this.state = {
         role: '',
      };
    }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  UNSAFE_componentWillMount() {
    const isLoggedIn = localStorage.getItem("appState");
    if(isLoggedIn===null){
      setTimeout(() => {
        this.setState({
          role:"other"
        })
   }, 1000);
    }else {
      const userref3 =   firebaseConfig.database().ref(`/Users/` + isLoggedIn);
       userref3.on("value", snapshot =>{
         let allUsers = snapshot.val();
         console.log("username",allUsers);
         setTimeout(() => {
           this.setState({
             role:allUsers.UserRole
           })
      }, 1000);

        })
    }


  }

  signOut(e) {
    e.preventDefault();
    window.localStorage.clear();
    this.props.history.push('/');

  }

  passowrdroute(e) {
    e.preventDefault();
    this.props.history.push('/profilesettings');

  }


  render() {
    console.log(this.state.role);
    return (
      <div className="app">
          <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)} onpassword={e=>this.passowrdroute(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />

            {this.state.role==="admin" ? (
              <Suspense>

                <AppSidebarNav navConfig={customNav1} {...this.props} router={router}/>

              </Suspense>
            ) : this.state.role==="engineer" ? (
              <Suspense>

                <AppSidebarNav navConfig={customNav2} {...this.props} router={router}/>

              </Suspense>
            ) : this.state.role==="other" ? (
              <Suspense>

                <AppSidebarNav navConfig={customNav3} {...this.props} router={router}/>

              </Suspense>
            ) : (
              ""
            )}

            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {

                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}

                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
