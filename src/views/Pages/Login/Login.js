import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import  firebaseConfig  from '../../../config';
import Dashboard from '../../Dashboard/Dashboard';
import  firebase from '../../../config';
import * as firebaseClient from 'firebase';
import ROUTES from '../../../routes';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../../assets/img/brand/logo.png';
import sygnet from '../../../assets/img/brand/sygnet.svg'



class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      is_login_progress: false,
      invalid_credential: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.ForgotPassword = this.ForgotPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
       [event.target.name]: event.target.value
    });
}

handleSubmit(event) {
    event.preventDefault();

    this.setState({
        'is_login_progress': true,
        'invalid_credential': false
    });

    firebaseConfig.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
          console.log("Login",user.user.uid);
          localStorage["appState"] = user.user.uid;
            this.props.history.push('/dashboard');
        })
        .catch((error) => {
          alert("Invalid Credentials");

            this.setState({
                'is_login_progress': false,
                'invalid_credential': true
            });
        });
}

ForgotPassword(e) {
  e.preventDefault();
  const isLoggedIn = localStorage.getItem("appState");
const {email} = this.state;
  if(email==""){
    alert("Please Enter Email Id");
  }
  let errors = {};
    firebaseConfig.auth().sendPasswordResetEmail(email)
     .then(function (user) {
       alert('Please check your email...')
     }).catch(function (e) {
       console.log(e)
     })

}

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                <AppNavbarBrand align="center"
          full={{ src: logo, width: 250, height: 35, alt: 'CoreUI Logo' }}
        />
                  <CardBody>
                    <Form noValidate onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="email"
                              placeholder="Username or Email id"
                              name="email"
                              type="email"
                              value={this.state.email}
                              onChange={this.handleChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input  id="password"
                              placeholder="Password"
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handleChange} />
                      </InputGroup>
                      <Row>
                        <Col xs="12">
                          <Button color="primary" className="px-4" type="submit" variant="contained">Login</Button>&nbsp;&nbsp;
                          <Button color="primary" size="md" className="px-4" type="button" onClick={this.ForgotPassword} variant="contained">Forgot Password</Button>
                        </Col>
                        <Col xs="4">

                        </Col>
                        {/* <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col> */}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                {/* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card> */}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


export default withRouter(Login);
