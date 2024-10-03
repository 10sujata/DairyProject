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
import Axios from 'axios';
import Select from 'react-select';
var passwordHash = require('password-hash');

class Engineers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: '',
            fullname: '',
            address: '',
            phone:'',
            email: '',
            password: '',
            allRegions: [],
            confirmpassword:'',
            status: 'Pending',
            userrole:'',
            isdeleted: 'active',
            redirect: false,
            errors: {}
        };

        this.submitData = this.submitData.bind(this);
        this.inputRegion = this.inputRegion.bind(this);
        this.inputEmail = this.inputEmail.bind(this);
        this.inputFullname = this.inputFullname.bind(this);
        this.inputPhone = this.inputPhone.bind(this);
        this.inputAddress = this.inputAddress.bind(this);
        this.UserRole = this.UserRole.bind(this);
        this.inputPassword = this.inputPassword.bind(this);
        this.ConfirmPassword = this.ConfirmPassword.bind(this);
      }

    componentDidMount() {
      const userref1 =  firebaseConfig.database().ref(`/Regions/`).orderByChild("Isdeleted").equalTo("active");

      userref1.on("value", snapshot1 =>{
        let allUsers1 = snapshot1.val();

        let newClient = [];
        for(let user in allUsers1){
            newClient.push({
            id: user,
            RegionName: allUsers1[user].RegionName,
          });
        }

        this.setState({
          allRegions: newClient
        });
      })
  }


     submitData(e) {
       e.preventDefault();
       let errors = {};
      const { region, fullname,address,phone,email,password,confirmpassword,status,isdeleted,userrole } = this.state;
      const hashedPassword = passwordHash.generate(password);

      if (password !== confirmpassword) {
       errors["confirmpassword"] = "The passwords do not match";
       this.setState({ errors: errors});
     } else {
       const hashedPassword = passwordHash.generate(password);

       firebaseConfig.auth().createUserWithEmailAndPassword(email, password).then((res) => {
           console.log('uid:', res.user.uid);
           firebaseConfig
           .database()
           .ref(`/Users/${res.user.uid}`)
           .set({
             Name: fullname,
             Address: address,
             Contact: phone,
             Email: email,
             Password: hashedPassword,
             Region: region,
             Status:status,
             UserRole:userrole,
             Isdeleted: isdeleted,
           })
           .then(() =>
            {
              this.setState({ redirect: true });
              const form =  Axios.post('http://143.110.189.75:4001/api/form',{
                 fullname,
                 email,
                 password
              });
            }
           ) .catch(e => {
             alert("email is already exists!")
            });
         })
     }


      }

      inputRegion(e) {
        this.setState({region: e.target.value});
      }
      inputFullname(e) {
        this.setState({fullname: e.target.value});
      }

      inputPhone(e) {
        this.setState({phone: e.target.value});
      }

      inputEmail(e) {
        this.setState({email: e.target.value});
      }

      inputAddress(e) {
        this.setState({address: e.target.value});
      }


      UserRole(e) {
        this.setState({userrole: e.target.value});
      }

      inputPassword(e) {
        this.setState({password: e.target.value});
      }

      ConfirmPassword(e) {
        this.setState({confirmpassword: e.target.value});
      }

      quan (selectedOption) {
        const clinetid =   firebaseConfig.database().ref(`/Regions/`+ selectedOption.value);
        clinetid.on("value", snapdata => {
          let allclients = snapdata.val();
          console.log("dfdsfdsfds",selectedOption.value);
            this.setState({
              region: allclients.RegionName,
            });

      })

     };



    render() {

      const { redirect } = this.state;
      let options = [];
      this.state.allRegions.map(item =>
      options.push({ label: item.RegionName, value: item.id }),
      );
      const defaultOption = options[0];
    if (redirect) {
      return <Redirect to="/ListEngineers" />;
    }
     return(

        <Container>
        <Row className="justify-content-center">
        <Col xs="12" sm="12">
        <Card>
        <CardHeader>
                <h2>Add Engineer</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit={this.submitData}>
        <FormGroup>
          <h5><Label htmlFor="role">User Role <span>*</span></Label></h5>
          <Input type="select"  value={this.state.userrole} name="select" id="select" onChange={this.UserRole} >
                <option value="0">Please Select</option>
                <option value="engineer">Engineer</option>
                <option value="admin">Admin/Supervisor</option>
                <option value="admin">Director</option>
              </Input>
        </FormGroup>
                <FormGroup>
                  <h5><Label htmlFor="company">Region <span>*</span></Label></h5>
                      <Select type="select" id="region" name="region"  onChange={this.quan.bind(this)} options={options}></Select>
                </FormGroup>
                <FormGroup>
                  <h5><Label htmlFor="fullname">Full Name *</Label></h5>
                  <Input type="text" id="fullname" placeholder="Enter Your Full Name" onChange={this.inputFullname}  value={this.state.fullname} />
                </FormGroup>
                <FormGroup>
                <h5><Label htmlFor="address">Full Address *</Label></h5>
                  <Input type="text" id="address"  placeholder="Enter Your Full Address" onChange={this.inputAddress} value={this.state.address} />
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                    <h5> <Label htmlFor="phone">Contact Number *</Label> </h5>
                      <Input type="number" id="phone"  placeholder="Enter Your Contact Number" onChange={this.inputPhone}  value={this.state.phone}  />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                    <h5> <Label htmlFor="email">Email Address *</Label> </h5>
                      <Input type="email" id="email"  placeholder="Enter Your Email Address" onChange={this.inputEmail}  value={this.state.email} />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup>
                <h5> <Label htmlFor="password">Create Password *</Label> </h5>
                  <Input type="password" id="password" placeholder="Create Your Password" onChange={this.inputPassword}  value={this.state.password} />
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="confirmpassword">Confirm Password *</Label> </h5>
                  <Input type="password" id="confirmpassword" placeholder="Confirm Your Password" onChange={this.ConfirmPassword}  value={this.state.confirmpassword}/>
                  <span className="error">{this.state.errors["confirmpassword"]}</span>
                </FormGroup>

                <FormGroup>
                  <Input type="hidden" id="status" value={this.state.status}/>
                  <Input type="hidden" id="isdeleted" value={this.state.isdeleted}/>
                </FormGroup>

                <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>

                </Form>
        </CardBody>

        </Card>
        </Col>
        </Row>
        </Container>


     );
    }
}
export default Engineers;
