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
import { API_BASE_URL } from '../../config';
import Notifications, {notify} from 'react-notify-toast';


class SupplierMaster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            suppliername: '',
            suppliername1: '',
            supplieraddress: '',
            suppliernumber:'',
            officenumber:'',
            owername:'',
            status: 'Pending',
            isdeleted: 'active',
            redirect: false
        };
        this.submitData = this.submitData.bind(this);
        this.inputSupplierName = this.inputSupplierName.bind(this);
        this.inputSupplierName1 = this.inputSupplierName1.bind(this);
        this.inputSupplierAddress = this.inputSupplierAddress.bind(this);
        this.inputSupplierNumber = this.inputSupplierNumber.bind(this);
        this.inputOwerName = this.inputOwerName.bind(this);
        this.inputOfficeNumber = this.inputOfficeNumber.bind(this);
      }

    // componentDidMount() {
    //     firebaseConfig
    //       .database()
    //       .ref(`/Users/`)
    //       .on('value', snap => console.log('from db', snap.val()));
    //   }

     submitData(e) {
       e.preventDefault();


       axios.post(API_BASE_URL+'/supplyform',{
        suppliername: this.state.suppliername,
        suppliername1:this.state.suppliername1,
        supplieraddress:this.state.supplieraddress,
        suppliernumber: this.state.suppliernumber,
        owername: this.state.owername,
        officenumber: this.state.officenumber,
        isdeleted: this.state.isdeleted,
     })

     .then(() => this.setState({
       suppliername: '',
       suppliername1: '',
       supplieraddress:'',
       suppliernumber: '',
       owername: '',
       officenumber:'',
       redirect: true,
     }));
     let myColor = { background: '#1985ac', text: "#FFFFFF", };
    notify.show('Supplier Record Created Successfully!','custom', 9000, myColor);



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


      inputSupplierName(e) {
        var regex = new RegExp("^[a-zA-Z ]*$");
         if (regex.test(e.target.value)) {
            this.setState({suppliername: e.target.value});
         }

      }

      inputSupplierName1(e) {
        var regex = new RegExp("^[a-zA-Z ]*$");
         if (regex.test(e.target.value)) {
            this.setState({suppliername1: e.target.value});
         }

      }

      inputSupplierAddress(e) {
        this.setState({supplieraddress: e.target.value});
      }

      inputSupplierNumber(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
           this.setState({suppliernumber: e.target.value});
        }

      }

      inputOfficeNumber(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
           this.setState({officenumber: e.target.value});
        }

      }

      inputOwerName(e) {
        var regex = new RegExp("^[a-zA-Z ]*$");
         if (regex.test(e.target.value)) {
            this.setState({owername: e.target.value});
         }

      }

      backbutton(id) {
      let path = `/listsupplier/`;
      this.props.history.push(path);
      }

    render() {

      const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/listsupplier" />;
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
                <h2>Add Supplier Details</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit={this.submitData}>
                <FormGroup row className="my-0">
                <Col xs="6">
                <FormGroup>
                <h5><Label htmlFor="suppliername">Firm Name *</Label></h5>
                  <Input type="text" id="suppliername" placeholder="Enter Firm Name" onChange={this.inputSupplierName}  value={this.state.suppliername} />
                </FormGroup>
                </Col>
                <Col xs="6">
                <FormGroup>
                <h5> <Label htmlFor="suppliername1">Firm Name In Regional  *</Label> </h5>
                  <Input type="text" id="suppliername1" placeholder="Enter Firm Name In Regional " onChange={this.inputSupplierName1}  value={this.state.suppliername1}/>
                </FormGroup>
                </Col>
                </FormGroup>

                <FormGroup row className="my-0">
                <Col xs="6">
                <FormGroup>
                <h5> <Label htmlFor="supplieraddress">Firm Address *</Label> </h5>
                  <Input type="text" id="supplieraddress" placeholder="Enter Firm Address" onChange={this.inputSupplierAddress}  value={this.state.supplieraddress}/>
                </FormGroup>
                </Col>
                <Col xs="6">
                <FormGroup>
                <h5> <Label htmlFor="suppliernumber">Mobile Number *</Label> </h5>
                  <Input type="text" id="suppliernumber" placeholder="Enter Supplier Number " onChange={this.inputSupplierNumber}  value={this.state.suppliernumber} maxLength="10"/>
                </FormGroup>
                </Col>
                </FormGroup>

                <FormGroup row className="my-0">
                <Col xs="6">
                <FormGroup>
                <h5> <Label htmlFor="owername">Owner Name *</Label> </h5>
                  <Input type="text" id="owername" placeholder="Enter Ower Name" onChange={this.inputOwerName}  value={this.state.owername}/>
                </FormGroup>
                </Col>
                <Col xs="6">
                <FormGroup>
                <h5> <Label htmlFor="officenumber">Office Number *</Label> </h5>
                  <Input type="text" id="officenumber" placeholder="Enter Office Number " onChange={this.inputOfficeNumber}  value={this.state.officenumber} maxLength="10"/>
                </FormGroup>
                </Col>
                </FormGroup>

                {/* <FormGroup>
                  <h5><Label htmlFor="userfor">User For <span>*</span></Label></h5>
                  <Input type="select"  value={this.state.userfor} name="select" id="select" onChange={this.inputUserfor} >
                        <option value="0">Please Select</option>
                        <option value="HO">HO</option>
                        <option value="Chilling Center">Chilling Center</option>
                        <option value="RMCU application">RMCU application</option>
                      </Input>
                </FormGroup> */}
                {/* <FormGroup>
                  <h5><Label htmlFor="userrole">User Role <span>*</span></Label></h5>
                  <Input type="select"  value={this.state.userrole} name="select" id="select" onChange={this.inputUserrole} >
                        <option value="0">Please Select</option>
                        <option value="Admin">Admin</option>
                        <option value="Billing">Billing</option>
                        <option value="Dashboard">Dashboard</option>
                      </Input>
                </FormGroup> */}

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
export default SupplierMaster;
