import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';
var passwordHash = require('password-hash');


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      is_login_progress: false,
      isLoggedIn: false,
      invalid_credential: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
       [event.target.name]: event.target.value
    });
}

  async handleSubmit(event) {
    event.preventDefault();

     await axios.post(API_BASE_URL+'/loginform1',{
      email: this.state.email,
      password:this.state.password,
      // deductiontype:this.state.deductiontype,
      // deductioncycle:this.state.deductioncycle,
      // activationperiod:this.state.date,
      // deductionmethod:this.state.deductionmethod,
      // deductionactive: this.state.deductionactive
   })
   .then(json => {
     console.log("json data",json);
      if(json.data.success){
        //alert("Login Successful!");

        let userData = {
          user_name: json.data.data.email,
          password: json.data.data.password,
          timestamp: new Date().toString()
        };
        let appState = {
          isLoggedIn: true,
          user: userData
        };
        const userId = json.data.data.id;
        if(userId){
          localStorage.setItem('appState',userId);
          this.props.history.push('/dashboard');
          console.log("appstate1",userId);
        }

      }else if (json.data.fail) {
        alert("Not a HO user");
      }
      else if (json.data.newsucess) {
        let userData = {
          user_name: json.data.data.email,
          password: json.data.data.password,
          timestamp: new Date().toString()
        };
        let appState = {
          isLoggedIn: true,
          user: userData
        };
        const userId = json.data.data.id;
        const userrole = json.data.data.usertype;
        
        if(userId){
          localStorage.setItem('appState',userId);  
          localStorage.setItem('usertype',userrole);       
          this.props.history.push('/superdashboard');
          console.log("appstate1",userId);
        } 
      }
      else {
        alert("Invalid Credentials");
      }

   })
   .catch(error =>{
    alert(`An Error Occured! ${error}`);

   })


    // this.setState({
    //     'is_login_progress': true,
    //     'invalid_credential': false
    // });

    // firebaseConfig.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    //     .then((user) => {
    //         // console.log("Login",user);
    //         window.localStorage.setItem('userInfo',JSON.stringify(user));
    //         // window.localStorage.getItem('userInfo');
    //         // console.log("Id===========".user)
    //         // console.log("login success")
    //         this.props.history.push('/dashboard');
    //     })
    //     .catch((error) => {
    //         // Handle Errors here.
    //         //var errorCode = error.code;
    //         //var errorMessage = error.message;
    //         //console.log(error);

    //         this.setState({
    //             'is_login_progress': false,
    //             'invalid_credential': true
    //         });
    //     });
}




  render() {
    if (localStorage.getItem("appState")) {
      return <Redirect to="/" />;
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
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
                              name="email"
                              placeholder="Email"
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
                                name="password"
                                placeholder="Password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handleChange} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" type="submit" variant="contained">Login</Button>
                        </Col>
                        {/* <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col> */}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>

              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
