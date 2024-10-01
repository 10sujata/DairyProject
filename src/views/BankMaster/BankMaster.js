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


class BankMaster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bankname: '',
            bankaddress: '',
            branchname:'',
            ifsccode: '',
            accountnumber: '',
            status: 'Pending',
            isdeleted: 'active',
            isButtonDisabled: false,
            redirect: false
        };
        this.submitData = this.submitData.bind(this);
        this.inputBankname = this.inputBankname.bind(this);
        this.inputBankaddress = this.inputBankaddress.bind(this);
        this.inputBranchname = this.inputBranchname.bind(this);
        this.inputIfsccode = this.inputIfsccode.bind(this);
        this.inputAccountnumber = this.inputAccountnumber.bind(this);
      }

    // componentDidMount() {
    //     firebaseConfig
    //       .database()
    //       .ref(`/Users/`)
    //       .on('value', snap => console.log('from db', snap.val()));
    //   }

     submitData(e) {
       e.preventDefault();


       axios.post(API_BASE_URL+'/bankform',{
        bankname: this.state.bankname,
        bankaddress:this.state.bankaddress,
        branchname:this.state.branchname,
        ifsccode: this.state.ifsccode,
        accountnumber: this.state.accountnumber,
        isdeleted: this.state.isdeleted,
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
    notify.show('Bank Record Created Successfully!','custom', 9000, myColor);



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

        this.setState({bankname: '', bankaddress: '', branchname: '',ifsccode:'',accountnumber:'',isdeleted:''})

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
        if(regex.test(e.target.value)){
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


    backbutton(id) {
      let path = `/listbanks/`;
      this.props.history.push(path);
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
                <h2>Add Bank Details</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit={this.submitData}>
                <FormGroup row className="my-0">
                <Col xs="6">
                <FormGroup>
                <h5><Label htmlFor="bankname">Bank Name *</Label></h5>
                  <Input type="text" id="bankname" placeholder="Enter Bank Name" onChange={this.inputBankname}  value={this.state.bankname} required/>
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
                  <Input type="text" id="ifsccode" placeholder="Enter IFSC Code" onChange={this.inputIfsccode}  value={this.state.ifsccode} maxLength="12" required/>
                </FormGroup>
                </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                <Col xs="6">
                <FormGroup>
                <h5> <Label htmlFor="accountnumber">Account Number *</Label> </h5>
                  <Input type="text" id="accountnumber" placeholder="Enter Account Number" onChange={this.inputAccountnumber}  value={this.state.accountnumber} maxLength="15" required/>
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
export default BankMaster;
