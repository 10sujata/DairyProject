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

class EditEngineers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: '',
            name: '',
            address: '',
            phone:'',
            email: '',
            password: '',
            status: 'Pending',
            isdeleted: 'active',
            redirect: false
        };
        this.submitData = this.submitData.bind(this);
        this.inputregion = this.inputregion.bind(this);
        this.inputemail = this.inputemail.bind(this);
        this.inputname = this.inputname.bind(this);
        this.inputphone = this.inputphone.bind(this);
        this.inputaddress = this.inputaddress.bind(this);
        this.inputPassword = this.inputPassword.bind(this);
        this.UserRole = this.UserRole.bind(this);
      }

    componentDidMount() {
        const {id} = this.props.match.params;
        const _this = this;
        const userref =  firebaseConfig.database().ref(`/Users/` + id);

        userref.on("value", snapshot => {
            let allUsers = snapshot.val();
            console.log("new data",allUsers);
            this.setState({
                address: allUsers.Address,
                phone: allUsers.Contact,
                email: allUsers.Email,
                name: allUsers.Name,
                region: allUsers.Region,
                userrole:allUsers.UserRole
            });
       })

      }

    submitData(e) {
        const {id} = this.props.match.params;
      const { region,name,address,phone,email,userrole } = this.state;
        e.preventDefault();
          firebaseConfig
          .database()
          .ref(`/Users/`+id)
          .update({
            Name: name,
            Address: address,
            Contact: phone,
            Email: email,
            Region: region,
            UserRole:userrole,
          })
          .then(() => this.setState({ redirect: true }));
    }

    UserRole(e) {
      this.setState({userrole: e.target.value});
    }

    inputregion(e) {
        this.setState({region: e.target.value});
      }
      inputname(e) {
        this.setState({name: e.target.value});
      }

      inputphone(e) {
        this.setState({phone: e.target.value});
      }

      inputemail(e) {
        this.setState({email: e.target.value});
      }

      inputaddress(e) {
        this.setState({address: e.target.value});
      }

      inputPassword(e) {
        this.setState({password: e.target.value});
      }



    render() {

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
                <h2>Edit Engineer</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit={this.submitData}>
        <FormGroup>
          <h5><Label htmlFor="role">User Role <span>*</span></Label></h5>
          <Input type="select"  value={this.state.userrole} name="select" id="select" onChange={this.UserRole} >
                <option value="0">Please Select</option>
                <option value="engineer">Engineer</option>
                <option value="admin">Admin/Supervisor</option>
                <option value="director">Director</option>
              </Input>
        </FormGroup>
                <FormGroup>
                  <h5><Label htmlFor="region">Region</Label></h5>
                  <Input type="text"  value={this.state.region} onChange={this.inputregion} name="region" id="region">
                </Input>
                </FormGroup>
                <FormGroup>
                <h5><Label htmlFor="name">Full Name</Label></h5>
                  <Input type="text" id="name" onChange={this.inputname} value={this.state.name} />
                </FormGroup>
                <FormGroup>
                <h5><Label htmlFor="address">Full Address</Label></h5>
                  <Input type="text" id="address" onChange={this.inputaddress} value={this.state.address} />
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                    <h5><Label htmlFor="phone">Contact Number</Label></h5>
                      <Input type="text" id="phone"  value={this.state.phone} onChange={this.inputphone} />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                    <h5><Label htmlFor="email">Email Address</Label></h5>
                      <Input type="text" id="email" onChange={this.inputemail}  value={this.state.email} />
                    </FormGroup>
                  </Col>
                </FormGroup>
                {/* <FormGroup>
                  <Label htmlFor="password">Update Password</Label>
                  <Input type="text" id="password" placeholder="Update Your Password" onChange={this.inputPassword}  value={this.state.password}/>
                </FormGroup> */}
                <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Update</Button>

                </Form>
        </CardBody>

        </Card>
        </Col>
        </Row>
        </Container>


     );
    }
}
export default EditEngineers;
