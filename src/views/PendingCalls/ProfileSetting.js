import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
import { directive } from '@babel/types';
import firebaseConfig from '../../config'
import { FormGroup,Badge,CardHeader,Label,FormText,Button, Card, CardBody, CardFooter, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { userInfo } from 'os';
import { Redirect } from 'react-router';
import{ListEngineers} from '../../../src/views/ListEngineers/ListEngineers';
var passwordHash = require('password-hash');

class ProfileSetting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentpassword: '',
            changepassword: '',
            confirmpassword: '',
            email:'',
            errors: {}
        };
        this.submitData = this.submitData.bind(this);
        this.CurrentPassword = this.CurrentPassword.bind(this);
        this.ChangePassword = this.ChangePassword.bind(this);
        this.ConfrimPassword = this.ConfrimPassword.bind(this);
      }


    componentDidMount(){
      const isLoggedIn = localStorage.getItem("appState");
      const userref3 =  firebaseConfig.database().ref(`/Users/` + isLoggedIn);
      userref3.on("value", snapshot =>{
         let allUsers = snapshot.val();
          this.setState({
            email: allUsers.Email,
          });
        })
    }

    submitData(e) {
      e.preventDefault();
      const isLoggedIn = localStorage.getItem("appState");
      console.log("vdfdsfds",isLoggedIn);
      let errors = {};
     const { changepassword, confirmpassword,email} = this.state;
     const hashedPassword = passwordHash.generate(changepassword);

     if (changepassword !== confirmpassword) {
      errors["confirmpassword"] = "The passwords do not match";
      this.setState({ errors: errors});
      } else {
        firebaseConfig.auth().sendPasswordResetEmail(email)
         .then(function (user) {
           alert('Please check your email...')
         }).catch(function (e) {
           console.log(e)
         })
      }
    }

    CurrentPassword(e) {
        this.setState({currentpassword: e.target.value});
      }

    ChangePassword(e) {
        this.setState({changepassword: e.target.value});
      }

    ConfrimPassword(e) {
        this.setState({confirmpassword: e.target.value});
      }




    render() {
      console.log("email",this.state.email);
      const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/ListEngineers" />;
    }
     return(

        <Container>
        <Row className="justify-content-center">
        <Col xs="12" sm="12">
        <Card>
        <CardHeader>
                <h2>Password Settings</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit={this.submitData}>

                <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Click here To get password reset email</Button>

                </Form>
        </CardBody>

        </Card>
        </Col>
        </Row>
        </Container>


     );
    }
}
export default ProfileSetting;
