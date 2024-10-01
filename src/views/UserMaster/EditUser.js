import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
import { directive } from '@babel/types';
import { FormGroup,Badge,CardHeader,Label,FormText,Button, Card, CardBody, CardFooter, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { userInfo } from 'os';
import { Redirect } from 'react-router';
import {API_BASE_URL} from '../../config';
import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';

class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
          allUsers: [],
          bankname:'',
          userfor: '',
          userrole: '',
        };
        this.submitData = this.submitData.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        //this.inputUsername = this.inputUsername.bind(this);
        this.inputUserfor = this.inputUserfor.bind(this);
        this.inputUserrole = this.inputUserrole.bind(this);
      }

    componentDidMount() {
        const {id} = this.props.match.params;
        const _this = this;

        axios.get(API_BASE_URL+'/edituser/' + id)
         .then(response => {
           console.log("csdcsaxdas",response.data);

           this.setState({
             username: response.data.data[0].user_name,
             userfor: response.data.data[0].user_for,
             userrole: response.data.data[0].user_role,

         });
      })
      .then(json => {
      if(json.data.success){
        alert("Data Updated Successfully!");
        this.props.history.push('/listusers');
      }
   })
      .catch(e => {

      });
        //const userref =  firebaseConfig.database().ref(`/Regions/` + id);
    }

    // submitData(e) {
    //     const {id} = this.props.match.params;
    //     const { region } = this.state;
    //     e.preventDefault();
    //       firebaseConfig
    //       .database()
    //       .ref(`/Regions/`+id)
    //       .update({
    //         RegionName: region,
    //       })
    //       .then(() => this.setState({ redirect: true }));
    // }


submitData(e) {
      e.preventDefault();
      const {id} = this.props.match.params;
       const _this = this;
          axios.post(API_BASE_URL+'/updateuser/'+ id,{
            username: this.state.username,
            userfor:this.state.userfor,
            userrole:this.state.userrole,
         })
         .then(response => {
          console.log('from handle submit', response);
          let myColor = { background: '#1985ac', text: "#FFFFFF", };
         notify.show('Data Updated Successfully!','custom', 9000, myColor);
          this.props.history.push('/listusers');
         });
     }

     inputUsername(e) {
        this.setState({username: e.target.value});
      }

       inputUserfor(e) {
        this.setState({userfor: e.target.value});
      }

      inputUserrole(e) {
        this.setState({userrole: e.target.value});
      }


    render() {

      const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/listregions" />;
    }
     return(

        <Container>
        <Row className="justify-content-center">
        <Col xs="12" sm="12">
        <div className='main'>
              <Notifications options={{zIndex: 200, top: '120px'}} />
        </div>
        <Card>
        <CardHeader>
                <h2>Edit User Details</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit={this.submitData}>
                <FormGroup>

                <FormGroup>
                <h5><Label htmlFor="username">User Name *</Label></h5>
                  <Input type="text" id="username" onChange={this.inputUserName}  value={this.state.username}/>
                </FormGroup>
                </FormGroup>
                <FormGroup>
                  <h5><Label htmlFor="userfor">User For <span>*</span></Label></h5>
                  <Input type="select"  value={this.state.userfor} name="select" id="select" onChange={this.inputUserfor} >
                        <option value="0">Please Select</option>
                        <option value="HO">HO</option>
                        <option value="Center">Center</option>
                        <option value="RMCU application">RMCU application</option>
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
export default EditUser;
