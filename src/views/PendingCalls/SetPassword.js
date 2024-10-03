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

class SetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {

            password: '',
            confirmpassword: '',
            email:'',
            errors: {}
        };
        this.submitData = this.submitData.bind(this);
        this.inputPassword = this.inputPassword.bind(this);
        this.ConfirmPassword = this.ConfirmPassword.bind(this);
      }


    // componentDidMount(){
    //   const isLoggedIn = localStorage.getItem("appState");
    //   const userref3 =  firebaseConfig.database().ref(`/Users/` + isLoggedIn);
    //   userref3.on("value", snapshot =>{
    //      let allUsers = snapshot.val();
    //       this.setState({
    //         email: allUsers.Email,
    //
    //       });
    //     })
    // }

    submitData(e) {
      e.preventDefault();
      const isLoggedIn = localStorage.getItem("appState");
      console.log("vdfdsfds",isLoggedIn);
      let errors = {};
     const { password,confirmpassword} = this.state;
     const hashedPassword = passwordHash.generate(password);
     const params = new URLSearchParams(this.props.location.search);
     const code = params.get('oobCode')
     console.log("oobcode",code);
     if (password !== confirmpassword) {
      errors["confirmpassword"] = "The passwords do not match";
      this.setState({ errors: errors});
    } else {
        firebaseConfig.auth().confirmPasswordReset(code, password)
        .then(function() {
          alert("Password Updated Succesfully");
          this.props.history.push('/');
        })
        .catch(function() {
          // Invalid code
        })
      }
    }

    inputPassword(e) {
      this.setState({password: e.target.value});
    }

    ConfirmPassword(e) {
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
        <FormGroup>
        <h5> <Label htmlFor="password">Create Password *</Label> </h5>
          <Input type="password" id="password" placeholder="Create Your Password" onChange={this.inputPassword}  value={this.state.password} />
        </FormGroup>

        <FormGroup>
        <h5> <Label htmlFor="confirmpassword">Confirm Password *</Label> </h5>
          <Input type="password" id="confirmpassword" placeholder="Confirm Your Password" onChange={this.ConfirmPassword}  value={this.state.confirmpassword}/>
          <span className="error">{this.state.errors["confirmpassword"]}</span>
        </FormGroup>


                <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Update Password</Button>

                </Form>
        </CardBody>

        </Card>
        </Col>
        </Row>
        </Container>


     );
    }
}
export default SetPassword;
