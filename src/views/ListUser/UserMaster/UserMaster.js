import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
import { directive } from '@babel/types';
import { FormGroup,FormControl,Badge,CardHeader,Label,FormText,Button, Card, CardBody, CardFooter, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { userInfo } from 'os';
import { Redirect } from 'react-router';
import axios from 'axios';
import ListUser from '../ListUser/ListUser';
import { API_BASE_URL } from '../../../config';
import Select from 'react-select';
import Notifications, {notify} from 'react-notify-toast';
var passwordHash = require('password-hash');



class UserMaster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            allrmcu: [],
            username: '',
            password: '',
            userfor:'',
            userrole: '',
            id: '',
            rmcuid: '',
            rmcuname:'',
            centername: '',
            status: 'Pending',
            isdeleted: 'active',
            redirect: false,
            isDisabled:true,
            fields: {},
            errors: {},
        };
        this.submitData = this.submitData.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        this.inputUsername = this.inputUsername.bind(this);
        this.inputUserfor = this.inputUserfor.bind(this);
        this.inputCenter = this.inputCenter.bind(this);
        this.inputUserrole = this.inputUserrole.bind(this);
        this.inputRMCU = this.inputRMCU.bind(this);
        this.inputPassword = this.inputPassword.bind(this);
      }

    // componentDidMount() {
    //     firebaseConfig
    //       .database()
    //       .ref(`/Users/`)
    //       .on('value', snap => console.log('from db', snap.val()));
    //   }

    handleValidation(){
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      //UserName
      if(!fields["username"]){
        formIsValid = false;
        errors["username"] = "Username Cannot be empty";
      }

      if(typeof fields["username"] !== "undefined"){
        let lastAtPos = fields["username"].lastIndexOf('@');
        let lastDotPos = fields["username"].lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["username"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["username"].length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["username"] = "Please Enter Valid Email Id";
        }
      }

      //Password

      if(!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }

      if (typeof fields["password"] !== "undefined") {
        if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password"] = "Please enter secure and strong password.";
        }
      }

      if(!fields["userfor"]) {
        formIsValid = false;
        errors["userfor"] = "*Please select user for application.";
      }

      // if(!fields["userrole"]) {
      //   formIsValid = false;
      //   errors["userrole"] = "*Please select user role.";
      // }



      //User For

      // if(!fields["userfor"]) {
      //   formIsValid = false;
      //   errors["userfor"] = "Please Select User Application.";
      // }

       //User Role

      //  if(!fields["userrole"]) {
      //   formIsValid = false;
      //   errors["userrole"] = "Please Select User Role.";
      // }

      this.setState({errors: errors});
      return formIsValid;
    }

    backbutton(id) {
      let path = `/listusers/`;
      this.props.history.push(path);
    }


     componentDidMount() {
       axios.get(API_BASE_URL+'/listcenter')
       .then(response => {
           this.setState({
             allUsers:response.data.data,
             //centername: response.data.data[0].center_name,
           });

       })
       .catch(e => {

       });

       axios.get(API_BASE_URL+'/listsociety')
       .then(response => {
           this.setState({
             allrmcu:response.data.data,
             //centername: response.data.data[0].center_name,
           });

       })
       .catch(e => {

       });

     }
    submitData(e) {
      e.preventDefault();

        const {isdeleted} = this.state;
        const { password,username,userfor,userrole,centername,rmcuname} = this.state;
        const hashedPassword = passwordHash.generate(password);
        axios.post(API_BASE_URL+'/form',{
          username,
          userfor,
          userrole,
          hashedPassword,
          centername,
          rmcuname,
          isdeleted,

      })
      .then(() => this.setState({
        bankname: '',
        bankaddress: '',
        branchname:'',
        ifsccode: '',
        accountnumber: '',
        redirect: true,
      }));
      let myColor = { background: '#1985ac', text: "#FFFFFF", };
     notify.show('User Record Created Successfully!','custom', 8000, myColor);

    }


      inputUserfor(e) {
        this.setState({userfor: e.target.value});
      }

      inputCenter(e){
        this.setState({centername: e.target.value});
      }

      inputRMCU(e){
        this.setState({rmcuname: e.target.value});
      }


      inputUserrole(e) {
        this.setState({userrole: e.target.value});
      }


      inputUsername(e) {
        this.setState({username: e.target.value});
      }

      inputPassword(e) {
        this.setState({password: e.target.value});
      }

      // handleChange(field, e){
      //   let fields = this.state.fields;
      //   fields[field] = e.target.value;
      //   this.setState({fields});
      // }




    render() {

      const { redirect } = this.state;
      const {allUsers,allrmcu} = this.state;
    if (redirect) {
      return <Redirect to="/ListUsers" />;
    }


    let centerList = allUsers.length > 0
		&& allUsers.map((item, i) => {
		return (
			<option key={i} value={item.id} >{item.center_name}</option>
		)
	}, this);

    let rmcuList = allrmcu.length > 0
    && allrmcu.map((item, i) => {
    return (
      <option key={i} value={item.id} >{item.society_name}</option>
    )
  }, this);
     return(

        <Container>
        <Row className="justify-content-center">
        <Col xs="12" sm="12">
              <div className='main'>
                    <Notifications options={{zIndex: 200, top: '120px'}} />

                </div>
        <Card>
        <CardHeader>
                <h2>Add User</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit= {this.submitData.bind(this)}>
                <FormGroup>
                  <h5><Label htmlFor="username">User Name *</Label></h5>
                  <Input type="email" id="username" placeholder="Please Enter Your Email" onChange={this.inputUsername}  value={this.state.username} required/>

                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="password">Create Password *</Label> </h5>
                  <Input type="password" id="password" placeholder="Create Your Password" onChange={this.inputPassword} value={this.state.password} required/>

                </FormGroup>
                <FormGroup>
                  <h5><Label htmlFor="userfor">User For <span>*</span></Label></h5>
                  <Input type="select"  value={this.state.userfor} name="select" id="userfor" onChange={this.inputUserfor} required>
                        <option value="0">Please Select</option>
                        <option value="HO">HO</option>
                        <option value="Center">Center</option>
                        <option value="RMCU">RMCU application</option>
                      </Input>

                </FormGroup>

               {this.state.userfor === "HO" && (
                 <FormGroup>
                   <h5><Label htmlFor="userrole">User Role <span>*</span></Label></h5>
                   <Input type="select"  value={this.state.userrole} name="select" id="userrole" onChange={this.inputUserrole}>
                         <option value="0">Please Select</option>
                         <option value="Admin">Admin</option>
                         <option value="Billing">Billing</option>
                         <option value="Dashboard">Dashboard</option>
                       </Input>
                 </FormGroup>
               )}
                <FormGroup>
                  <Input type="hidden" id="status" value={this.state.status}/>
                  <Input type="hidden" id="isdeleted" value={this.state.isdeleted}/>
                </FormGroup>

                <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>&nbsp;&nbsp;
                <Button type="button" size="md" color="primary" onClick={()=>this.backbutton()}><i className="fa fa-dot-circle-o"></i> Back</Button>

                </Form>
        </CardBody>

        </Card>
        </Col>
        </Row>
        </Container>

     );
    }
}
export default UserMaster;
