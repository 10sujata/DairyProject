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
import ProductList from '../ProductMaster/ProductList';
import Notifications, {notify} from 'react-notify-toast';

class CenterMaster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allrmcu: [],
            bank_name:"",
            centernumber:"",
            centernumber1:"",
            centername: '',
            bankaddress:'',
            branchname:'',
            ifsccode:'',
            accountnumber:'',
            centername1: '',
            centeroperator:'',
            centeroperator1: '',
            centeraddress: '',
            centercontact: '',
            centerpin: '',
            bank_details: '',
            ratechart: '',
            isdeleted: 'active',
            redirect: false,
            allUser:[],
            allBanks:[],
            errors: {},
            image: null,
            rmcuname:'',
        };
        this.submitData = this.submitData.bind(this);
        this.CenterNumber = this.CenterNumber.bind(this);
        this.inputCenterName = this.inputCenterName.bind(this);
        this.inputCenterName1 = this.inputCenterName1.bind(this);
        this.inputCenterOperator = this.inputCenterOperator.bind(this);
        this.inputCenterOperator1 = this.inputCenterOperator1.bind(this);
        this.inputCenterAddress = this.inputCenterAddress.bind(this);
        this.inputCenterContact = this.inputCenterContact.bind(this);
        this.inputCenterPin = this.inputCenterPin.bind(this);
        this.inputBankDetails = this.inputBankDetails.bind(this);
        this.inputRateChart = this.inputRateChart.bind(this);
        this.Userid = this.Userid.bind(this);
        this.handleimagechange = this.handleimagechange.bind(this);

      }

      handleimagechange(e) {
        let errors = {};
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
              return;
        this.createImage(files[0]);
        let file_size = e.target.files[0].size;
         if(file_size >  30000 ) {
           console.log("file size is too small");
           errors["image1error"] = "file size is too large, please pick a smaller file\n";
           this.setState({ errors: errors});

         }
         else {
           errors["image1error"] = "";
           this.setState({ errors: errors});
         }


      }

          createImage(file) {
            let reader = new FileReader();
            reader.onload = (e) => {
              this.setState({
                image: e.target.result
              })

            };
            reader.readAsDataURL(file);
          }




    // componentDidMount() {
    //     firebaseConfig
    //       .database()
    //       .ref(`/Users/`)
    //       .on('value', snap => console.log('from db', snap.val()));
    //   }

     submitData(e){
       e.preventDefault();
       axios.post(API_BASE_URL+'/centerform',{
        centername: this.state.centername,
        centername1:this.state.centername1,
        file:this.state.image,
        rmcuname:this.state.rmcuname,
        centeroperator:this.state.centeroperator,
        centeroperator1: this.state.centeroperator1,
        centeraddress: this.state.centeraddress,
        centerpin: this.state.centerpin,
        centercontact: this.state.centercontact,
        bank_details: this.state.bank_details,
        ratechart: this.state.ratechart,
        isdeleted: this.state.isdeleted,
        userid: this.state.userid,
        bankaddress: this.state.bankaddress,
        branchname: this.state.branchname,
        ifsccode: this.state.ifsccode,
        accountnumber: this.state.accountnumber,
        centernumber:this.state.centernumber
     })
     .then(() => this.setState({
       allrmcu: [],
       centername: '',
       centername1: '',
       centeroperator:'',
       centeroperator1: '',
       centeraddress: '',
       centercontact: '',
       centerpin: '',
       bank_details: '',
       bankaddress:'',
       branchname: '',
       ifsccode: '',
       accountnumber: '',
       ratechart: '',
       redirect: true,
     }));
     let myColor = { background: '#1985ac', text: "#FFFFFF", };
    notify.show('Center Record Created Successfully!','custom', 9000, myColor);



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

    inputCenterName(e) {
        var regex = new RegExp("^[a-zA-Z ]*$");
       if (regex.test(e.target.value)) {
           this.setState({centername: e.target.value});
       }

      }
      inputCenterName1(e) {
          var regex = new RegExp("^[a-zA-Z ]*$");
         if (regex.test(e.target.value)) {
             this.setState({centername1: e.target.value});
         }

      }
      inputCenterOperator(e) {
        var regex = new RegExp("^[a-zA-Z ]*$");
       if (regex.test(e.target.value)) {
           this.setState({centeroperator: e.target.value});
       }

    }
      inputCenterOperator1(e) {
        var regex = new RegExp("^[a-zA-Z ]*$");
       if (regex.test(e.target.value)) {
           this.setState({centeroperator1: e.target.value});
       }

      }
      inputCenterAddress(e) {
        this.setState({centeraddress: e.target.value.replace(/[^\w\s]/gi, "")});
      }
      inputCenterPin(e) {
        this.setState({centerpin: e.target.value});
      }
      inputCenterContact(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
           this.setState({centercontact: e.target.value});
        }

      }
      inputBankDetails(e) {
        console.log("bank id",e.target.value);
        let bankid = e.target.value;


        axios.get(API_BASE_URL+'/bankdata/' + bankid)
         .then(response => {

           console.log("center id",response.data.data[0].bank_address);
              this.setState({
                bankaddress: response.data.data[0].bank_address,
                branchname:response.data.data[0].branch_name,
                ifsccode:response.data.data[0].ifsc_code,
                accountnumber:response.data.data[0].account_number
             });
      })
        this.setState({bank_details: e.target.value});


      }
      inputRateChart(e) {
        this.setState({ratechart: e.target.value});

        axios.get(API_BASE_URL+'/rmcunameid/'+ e.target.value)
        .then(response => {
          console.log("sadasdas",response.data.data);
            this.setState({ rmcuname: response.data.data[0].society_name});

        })
        .catch(e => {

        });

      }
      Userid(e) {
        this.setState({userid: e.target.value});
      }

      CenterNumber(e) {
        this.setState({CenterNumber: e.target.value});
      }

    backbutton(id) {
      let path = `/listcenter/`;
      this.props.history.push(path);
    }

    componentDidMount() {
      axios.get(API_BASE_URL+'/listsociety')
      .then(response => {
          this.setState({
            allrmcu:response.data.data,
            //centername: response.data.data[0].center_name,
          });

      })
      .catch(e => {

      });


      axios.get(API_BASE_URL+'/listuser')
      .then(response => {
        let user1 = response.data.data;
        let user2 = user1[user1.length-1];
          this.setState({
            allUser:response.data.data,

            //centername: response.data.data[0].center_name,
          });

      })
      .catch(e => {

      });


      axios.get(API_BASE_URL+'/listbanks')
      .then(response => {
          this.setState({ allBanks: response.data.data });
          console.log("response",typeof response.data);

      })
      .catch(e => {

      });


      axios.get(API_BASE_URL+'/listcenter')
      .then(response => {
        let user1 = response.data.data;
        let user2 = user1[user1.length-1];
          this.setState({
          centernumber1:user2.id,
        });
      })
      .catch(e => {

      });


    }


    render() {
      const { redirect,centernumber1 } = this.state;

      this.state.centernumber = (Number(this.state.centernumber1)+1);

      console.log("centernumber",this.state.centernumber);
      if (redirect) {
      return <Redirect to="/listcenter" />;
      }
      const {rmcuname,allrmcu,allUser,allBanks } = this.state;

      let userList = allUser.length > 0
      && allUser.map((item, i) => {
      return (
        <option key={i} value={item.id} >{item.user_name}</option>
      )
    }, this);

      let rmcuList = allrmcu.length > 0
      && allrmcu.map((item, i) => {
      return (
        <option key={i} value={item.id} >{item.society_name}</option>
      )
    }, this);


      let bankList = allBanks.length > 0
      && allBanks.map((item, i) => {

      return (
        <option key={i} value={item.id} >{item.bank_name}</option>
      )
    }, this);



    if (redirect) {
      return <Redirect to="/CenterList" />;
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
                <h2>Add Center</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit={this.submitData}>
                <FormGroup>
                  <h5><Label htmlFor="centername">Center Name *</Label></h5>
                  <Input type="text" id="centername" placeholder="Enter Center Name" onChange={this.inputCenterName}  value={this.state.centername} required />
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="centername1">Center Name In Regional Language *</Label> </h5>
                  <Input type="text" id="centername1" placeholder="Center Name In Regional Language" onChange={this.inputCenterName1}  value={this.state.centername1} required/>
                </FormGroup>

                <FormGroup>
                  <h5><Label htmlFor="centeroperator">Center Operator *</Label></h5>
                  <Input type="text" id="centeroperator" placeholder="Enter Operator Name" onChange={this.inputCenterOperator}  value={this.state.centeroperator} required/>
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="centeroperator1">Operator Name In Regional Language *</Label> </h5>
                  <Input type="text" id="centeroperator1" placeholder="Operator Name In Regional Language" onChange={this.inputCenterOperator1}  value={this.state.centeroperator1} required/>
                </FormGroup>


                <FormGroup>
                <h5> <Label htmlFor="centeraddress">Center Address *</Label> </h5>
                  <Input type="text" id="centeraddress" placeholder="Center Address" onChange={this.inputCenterAddress}  value={this.state.centeraddress} required/>
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="centercontact">Mobile Number</Label> </h5>
                  <Input type="text" id="centercontact" placeholder="Center Contact" onChange={this.inputCenterContact}  value={this.state.centercontact} required  maxLength="10"/>
                </FormGroup>


                <FormGroup>
                <h5> <Label htmlFor="bank_details">Bank Name*</Label> </h5>
                  <Input type="select" name ="select" id="select" value={this.state.bank_details} onChange={this.inputBankDetails}>
                  <option value="select">Please Select Bank</option>
                    {bankList}
                  </Input>
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="bankaddress">Bank Address</Label> </h5>
                  <Input type="text" id="bankaddress" placeholder="Bank Address" value={this.state.bankaddress} />
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="branchname">Branch Name</Label> </h5>
                  <Input type="text" id="branchname" placeholder="Branch Name" value={this.state.branchname} />
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="ifsccode">IFSC Code</Label> </h5>
                  <Input type="text" id="ifsccode" placeholder="IFSC Code" value={this.state.ifsccode} />
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="accountnumber">Account Number</Label> </h5>
                  <Input type="text" id="accountnumber" placeholder="Account Number" value={this.state.accountnumber} />
                </FormGroup>


                <FormGroup>
                  <h5><Label htmlFor="ratechart">Select Society <span>*</span></Label></h5>
                  <Input type="select" name ="select" id="select" value={this.state.ratechart} onChange={this.inputRateChart}>
                  <option value="select">Please Select</option>
                    {rmcuList}
                  </Input>
                </FormGroup>

                <FormGroup>
                  <h5><Label htmlFor="userid">Select User<span>*</span></Label></h5>
                  <Input type="select" name ="select" id="username" value={this.state.userid} onChange={this.Userid}>
                  <option value="select">Please Select</option>
                    {userList}
                  </Input>
                </FormGroup>

                <FormGroup>
                <h5><Label htmlFor="userid">Operator Profile Photo<span>*</span></Label></h5>
                <span className="error">{this.state.errors["image1error"]}</span>
                <Input type="file" name ="file-input" id="file-input" onChange={this.handleimagechange.bind(this)} required>

                </Input>
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
export default CenterMaster;
