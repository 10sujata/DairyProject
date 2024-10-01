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

class EditDevice extends Component {

    constructor(props) {
        super(props);
        this.state = {
          allUsers: [],
         devicename1: '',
         devicename2: '',
         nodevices:'',
        };
        this.submitData = this.submitData.bind(this);
        this.inputDevicename1 = this.inputDevicename1.bind(this);
        this.inputDevicename2 = this.inputDevicename2.bind(this);
        this.inputNodevices = this.inputNodevices.bind(this);
      }

    componentDidMount() {
        const {id} = this.props.match.params;
        const _this = this;

        axios.get(API_BASE_URL+'/editdevice/' + id)
         .then(response => {
           console.log("csdcsaxdas",response.data.data);
              this.setState({
                 devicename1: response.data.data[0].device_name1,
                 devicename2: response.data.data[0].device_name2,
                 nodevices: response.data.data[0].no_devices,
             
             });
      }) .then(json => {
      if(json.data.success){
        alert("Device Data Updated Successfully!");
        this.props.history.push('/listdevice');
      }   
   })
      .catch(e => {

      });
        //const userref =  firebaseConfig.database().ref(`/Regions/` + id);
    }

  submitData(e) {
      e.preventDefault();
      const {id} = this.props.match.params;
       const _this = this;
          axios.post(API_BASE_URL+'/updatedevice/'+ id,{
            devicename1: this.state.devicename1,
            devicename2:this.state.devicename2,
            nodevices:this.state.nodevices,
         })
         .then(response => {
          console.log('from handle submit', response);
          alert('Data Updated Successfully!');
          this.props.history.push('/listdevice');
         });
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




    render() {

      const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/listregions" />;
    }
     return(

        <Container>
        <Row className="justify-content-center">
        <Col xs="12" sm="12">
        <Card>
        <CardHeader>
                <h2>Edit User Details</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit={this.submitData}>
                <FormGroup>
                
                <FormGroup>
                <h5><Label htmlFor="devicename">Device Name *</Label></h5>
                  <Input type="text" id="devicename" onChange={this.inputDevicename1}  value={this.state.devicename1}/>
                </FormGroup>   
                </FormGroup>
                <FormGroup>
                   <h5><Label htmlFor="devicename1">Device Name In Regional Language *</Label></h5>
                  <Input type="text" id="devicename1" onChange={this.inputDevicename2}  value={this.state.devicename2}/>
                </FormGroup> 
                 <FormGroup>
                 <h5><Label htmlFor="nodevices">Number Of Devices *</Label></h5>
                  <Input type="text" id="nodevices" onChange={this.inputNodevices}  value={this.state.nodevices}/>
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
export default EditDevice;
