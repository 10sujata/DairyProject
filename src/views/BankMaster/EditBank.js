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

class EditBanks extends Component {

    constructor(props) {
        super(props);
        this.state = {
          allUsers: [],
          bankname:'',
          bankaddress: '',
          branchname:'',
          ifsccode:'',
          accountnumber:'',
          redirect:false,
        };
        this.submitData = this.submitData.bind(this);
        this.inputBankname = this.inputBankname.bind(this);
        this.inputBankaddress = this.inputBankaddress.bind(this);
        this.inputBranchname = this.inputBranchname.bind(this);
        this.inputIfsccode = this.inputIfsccode.bind(this);
        this.inputAccountnumber = this.inputAccountnumber.bind(this);
      }

    componentDidMount() {
        const {id} = this.props.match.params;
        const _this = this;

        axios.get(API_BASE_URL+'/editbank/' + id)
         .then(response => {
           console.log("csdcsaxdas",response.data);

           this.setState({
             bankname: response.data.data[0].bank_name,
             bankaddress: response.data.data[0].bank_address,
             branchname: response.data.data[0].branch_name,
             ifsccode: response.data.data[0].ifsc_code,
             accountnumber:response.data.data[0].account_number,
         });
      })
      .catch(e => {

      });
        //const userref =  firebaseConfig.database().ref(`/Regions/` + id);
    }

     submitData(e) {
      e.preventDefault();
      const {id} = this.props.match.params;
       const _this = this;
          axios.post(API_BASE_URL+'/updatebank/'+ id,{
            bankname: this.state.bankname,
            bankaddress:this.state.bankaddress,
            branchname:this.state.branchname,
            ifsccode: this.state.ifsccode,
            accountnumber: this.state.accountnumber
         })
         .then(() => this.setState({
           redirect: true,
         }));
        let myColor = { background: '#1985ac', text: "#FFFFFF", };
        notify.show('Data Updated Successfully!','custom', 15000, myColor);
     }



  inputBankname(e) {
          var regex = new RegExp("^[a-zA-Z ]*$");
         if (regex.test(e.target.value)) {
               this.setState({bankname: e.target.value});
         }

      }

      inputBankaddress(e) {
        this.setState({bankaddress: e.target.value});
      }

      inputBranchname(e) {
        var regex = new RegExp("^[a-zA-Z ]*$");
       if (regex.test(e.target.value)) {
             this.setState({branchname: e.target.value});
       }

      }

      inputIfsccode(e) {
        this.setState({ifsccode: e.target.value.replace(/[^\w\s]/gi, "")});

      }

      inputAccountnumber(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
          this.setState({accountnumber: e.target.value});
        }

      }


    render() {

      const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/listbanks" />;
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
                <h2>Edit Bank Details</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit={this.submitData}>
                <FormGroup row className="my-0">
                <Col xs="6">
                <FormGroup>
                <h5><Label htmlFor="bankname">Bank Name *</Label></h5>
                  <Input type="text" id="bankname" onChange={this.inputBankname}  value={this.state.bankname}/>
                </FormGroup>
                </Col>
                <Col xs="6">
                <FormGroup>
                <h5> <Label htmlFor="bankaddress">Bank Address *</Label> </h5>
                  <Input type="text" id="bankaddress" placeholder="Enter Bank Address" onChange={this.inputBankaddress}  value={this.state.bankaddress} required/>
                </FormGroup>
                </Col>
                </FormGroup>

                <FormGroup row className="my-0">
                <Col xs="6">
                <FormGroup>
                <h5> <Label htmlFor="branchname">Branch Name *</Label> </h5>
                  <Input type="text" id="branchname" placeholder="Enter Branch Name" onChange={this.inputBranchname}  value={this.state.branchname} required/>
                </FormGroup>
                </Col>
                <Col xs="6">
                <FormGroup>
                <h5> <Label htmlFor="ifsccode">IFSC Code *</Label> </h5>
                  <Input type="text" id="ifsccode" placeholder="Enter IFSC Code" onChange={this.inputIfsccode}  value={this.state.ifsccode} required/>
                </FormGroup>
                </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                <Col xs="6">
                <FormGroup>
                <h5> <Label htmlFor="accountnumber">Account Number *</Label> </h5>
                  <Input type="number" id="accountnumber" placeholder="Enter Account Number" onChange={this.inputAccountnumber}  value={this.state.accountnumber} required/>
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

                <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Update Data</Button>

                </Form>
        </CardBody>

        </Card>
        </Col>
        </Row>
        </Container>


     );
    }
}
export default EditBanks;
