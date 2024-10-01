import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
import { directive } from '@babel/types';
import { FormGroup,Badge,CardHeader,Label,FormText,Button, Card, CardBody, CardFooter, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { userInfo } from 'os';
import { Redirect } from 'react-router';
import axios from 'axios';
import {API_BASE_URL} from '../../config';
import Notifications, {notify} from 'react-notify-toast';


class DeviceMaster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            devicename1: '',
            devicename2: '',
            nodevices:'',
            status: 'Pending',
            isdeleted: 'active',
            redirect: false
        };
        this.submitData = this.submitData.bind(this);
        this.inputDevicename1 = this.inputDevicename1.bind(this);
        this.inputDevicename2 = this.inputDevicename2.bind(this);
        this.inputNodevices = this.inputNodevices.bind(this);
      }

    // componentDidMount() {
    //     firebaseConfig
    //       .database()
    //       .ref(`/Users/`)
    //       .on('value', snap => console.log('from db', snap.val()));
    //   }

     submitData(e) {
       e.preventDefault();

      const {isdeleted} = this.state;
       axios.post(API_BASE_URL+'/deviceform',{
        devicename1: this.state.devicename1,
        devicename2:this.state.devicename2,
        nodevices:this.state.nodevices,
        isdeleted:this.state.isdeleted,
     })
     .then(() => this.setState({ redirect: true }));
     let myColor = { background: '#1985ac', text: "#FFFFFF", };
    notify.show('Device Record Created Successfully!','custom', 4000, myColor);


        // firebaseConfig.auth().createUserWithEmailAndPassword(email, password).then((res) => {
        //   console.log('uid:', res.user.uid);
        //   firebaseConfig
        //   .database()
        //   .ref(`/Users/${res.user.uid}`)
        //   .set({
        //     Name: fullname,
        //     Address: address,
        //     Contact: phone,
        //     Email: email,
        //     Password: hashedPassword,
        //     Region: region,
        //     Status:status,
        //     Isdeleted: isdeleted,
        //   })
        //   .then(() => this.setState({ redirect: true }));
        // })

      }


      inputDevicename1(e) {
        this.setState({devicename1: e.target.value});
      }

      inputDevicename2(e) {
        this.setState({devicename2: e.target.value});
      }

      inputNodevices(e) {
        this.setState({nodevices: e.target.value});
      }


      backbutton(id) {
        let path = `/listdevice/`;
        this.props.history.push(path);
      }

    render() {

      const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/listdevice" />;
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
                <h2>Add Device</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit={this.submitData}>
                <FormGroup>
                  <h5><Label htmlFor="devicename1">Device Name In English *</Label></h5>
                  <Input type="text" id="devicename1" placeholder="Name In English" onChange={this.inputDevicename1}  value={this.state.devicename1} required/>
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="devicename2">Device Name In Regional Language*</Label> </h5>
                  <Input type="text" id="devicename2" placeholder="Device Name In Regional Language" onChange={this.inputDevicename2}  value={this.state.devicename2} required/>
                </FormGroup>
                <FormGroup>
                <h5><Label htmlFor="nodevices">Type Of Devices*</Label> </h5>
                <Input type="text" id="nodevices" placeholder="Type Of Devices" onChange={this.inputNodevices}  value={this.state.nodevices} required/>
                </FormGroup>
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
export default DeviceMaster;
