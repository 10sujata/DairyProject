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


class SocietyMaster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            alldairy:[],
            allBanks:[],
            societyname: '',
            rmcunumber:'',
            rmcunumber1:'',
            societyname1: '',
            society_address:'',
            centername:'',
            bankaddress:'',
            branchname:'',
            ifsccode:'',
            accountnumber:'',
            pin_code:'',
            mobile_number:'',
            unionname:'',
            bank_name: '',
            userid:'',
            rmcuinchargename:'',
            rmcuinchargename1:'',
            fields: {},
            status: 'Pending',
            isdeleted: 'active',
            redirect: false,
            allUser:[],
            errors: {},
            image: null,
        };
        this.submitData = this.submitData.bind(this);
        this.inputSocietyName = this.inputSocietyName.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.inputSocietyName1 = this.inputSocietyName1.bind(this);
        this.inputSocietyAddress = this.inputSocietyAddress.bind(this);
        this.inputPinCode= this.inputPinCode.bind(this);
        this.inputMobileNumber = this.inputMobileNumber.bind(this);
        this.inputUnionValue = this.inputUnionValue.bind(this);
        this.inputBankDetails = this.inputBankDetails.bind(this);
        this.RmcuinChargeName = this.RmcuinChargeName.bind(this);
        this.RmcuinChargeName1 = this.RmcuinChargeName1.bind(this);
        this.RMCUNumber = this.RMCUNumber.bind(this);
        this.Userid = this.Userid.bind(this);
        this.handleimagechange = this.handleimagechange.bind(this);
      }

    // componentDidMount() {
    //     firebaseConfig
    //       .database()
    //       .ref(`/Users/`)
    //       .on('value', snap => console.log('from db', snap.val()));
    //   }

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


      axios.get(API_BASE_URL+'/listuser')
      .then(response => {
          this.setState({
            allUser:response.data.data,
            //centername: response.data.data[0].center_name,
          });

      })
      .catch(e => {

      });

      axios.get(API_BASE_URL+'/dairylist')
      .then(response => {
        console.log("dairyresponse",response);
          this.setState({
            union_name:response.data.data[0].union_name,
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

      axios.get(API_BASE_URL+'/listsociety')
      .then(response => {
        let user1 = response.data.data;
        let user2 = user1[user1.length-1];
          this.setState({
          rmcunumber1:user2.id,
        });
      })
      .catch(e => {

      });

    }

     submitData(e) {
       e.preventDefault();

       const {centername} = this.state.fields;
       const isdeleted = this.state.isdeleted;
       axios.post(API_BASE_URL+'/societyform',{
        societyname: this.state.societyname,
        societyname1:this.state.societyname1,
        centername,
        file:this.state.image,
        union_name: this.state.union_name,
        society_address: this.state.society_address,
        pin_code: this.state.pin_code,
        mobile_number: this.state.mobile_number,
        bank_name: this.state.bank_name,
        isdeleted: this.state.isdeleted,
        userid: this.state.userid,
        rmcuinchargename: this.state.rmcuinchargename,
        rmcuinchargename1: this.state.rmcuinchargename1,
        bankaddress: this.state.bankaddress,
        branchname: this.state.branchname,
        ifsccode: this.state.ifsccode,
        accountnumber: this.state.accountnumber,
        rmcunumber: this.state.rmcunumber,

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
    notify.show('RMCU Record Created Successfully!','custom', 9000, myColor);


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


      inputSocietyName(e) {
        var regex = new RegExp("^[a-zA-Z ]*$");
         if (regex.test(e.target.value)) {
             this.setState({societyname: e.target.value});
         }
      }
      inputSocietyName1(e) {
        var regex = new RegExp("^[a-zA-Z ]*$");
         if (regex.test(e.target.value)) {
             this.setState({societyname1: e.target.value});
         }

      }

      inputSocietyAddress(e) {
        this.setState({society_address: e.target.value});
      }
      inputUnionValue(e) {
        this.setState({union_name: e.target.value});
      }
      inputPinCode(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
           this.setState({pin_code: e.target.value});
        }

      }

      inputMobileNumber(e){
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
          this.setState({mobile_number: e.target.value});
        }

      }

      RMCUNumber(e){
        this.setState({rmcunumber: e.target.value});
      }

      inputBankDetails(e){
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
        this.setState({bank_name: e.target.value});
      }

      handleChange(field, e){
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
      }

      backbutton(id) {
        let path = `/listrmcu/`;
        this.props.history.push(path);
      }

      Userid(e) {
        this.setState({userid: e.target.value});
      }

      RmcuinChargeName(e){
        this.setState({rmcuinchargename: e.target.value});
      }

      RmcuinChargeName1(e){
        this.setState({rmcuinchargename1: e.target.value});
      }
    render() {

      const { redirect,rmcunumber1 } = this.state;
        const {allUsers,allUser,alldairy,allBanks} = this.state;
        this.state.rmcunumber = (Number(this.state.rmcunumber1)+1);

        console.log("centernumber",this.state.rmcunumber);
    if (redirect) {
      return <Redirect to="/listsociety" />;
    }

    let userList = allUser.length > 0
    && allUser.map((item, i) => {
    return (
      <option key={i} value={item.id} >{item.user_name}</option>
    )
  }, this);

    let centerList = allUsers.length > 0
    && allUsers.map((item, i) => {
    return (
      <option key={i} value={item.id} >{item.center_name}</option>
    )
  }, this);

      let bankList = allBanks.length > 0
      && allBanks.map((item, i) => {
      return (
        <option key={i} value={item.id} >{item.bank_name}</option>
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
                <h2>Add Society</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit={this.submitData}>
                <FormGroup>
                  <h5><Label htmlFor="societyname">Society Name *</Label></h5>
                  <Input type="text" id="societyname" placeholder="Enter Society Name" onChange={this.inputSocietyName}  value={this.state.societyname} required/>
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="societyname1">Society Name In Regional Language *</Label> </h5>
                  <Input type="text" id="societyname1" placeholder="Society Name In Regional Language" onChange={this.inputSocietyName1}  value={this.state.societyname1} required/>
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="rmcuinchargename">Society Incharge Name *</Label> </h5>
                  <Input type="text" id="rmcuinchargename" placeholder="Society Incharge" onChange={this.RmcuinChargeName}  value={this.state.rmcuinchargename} required/>
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="rmcuinchargename1">Society Incharge Name In Regional Language *</Label> </h5>
                  <Input type="text" id="rmcuinchargename1" placeholder="Society Incharge Name In Regional Language" onChange={this.RmcuinChargeName1}  value={this.state.rmcuinchargename1} required/>
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="society_address">Society Address *</Label> </h5>
                  <Input type="text" id="society_address" placeholder="Society Address" onChange={this.inputSocietyAddress}  value={this.state.society_address} required/>
                </FormGroup>



                <FormGroup>
                <h5> <Label htmlFor="mobile_number">Mobile Number *</Label> </h5>
                  <Input type="text" id="mobile_number" placeholder="Mobile Number" onChange={this.inputMobileNumber}  value={this.state.mobile_number} maxlength="10" required />
                </FormGroup>

                 <FormGroup>
                <h5> <Label htmlFor="union_name">Dairy Name *</Label> </h5>
                  <Input type="text" id="union_name" placeholder="Union Name" onChange={this.inputUnionValue}  value={this.state.union_name} required disabled/>
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="bank_details">Bank Name*</Label> </h5>
                  <Input type="select" name ="select" id="select" value={this.state.bank_name} onChange={this.inputBankDetails} required>
                  <option value="select">Please Select Bank</option>
                    {bankList}
                  </Input>
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="bankaddress">Bank Address</Label> </h5>
                  <Input type="text" id="bankaddress" placeholder="Bank Address" value={this.state.bankaddress} required/>
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="branchname">Branch Name</Label> </h5>
                  <Input type="text" id="branchname" placeholder="Branch Name" value={this.state.branchname} required/>
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="ifsccode">IFSC Code</Label> </h5>
                  <Input type="text" id="ifsccode" placeholder="IFSC Code" value={this.state.ifsccode} required/>
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="accountnumber">Account Number</Label> </h5>
                  <Input type="text" id="accountnumber" placeholder="Account Number" value={this.state.accountnumber} required/>
                </FormGroup>


                <FormGroup>
                  <h5><Label htmlFor="userid">Select User<span>*</span></Label></h5>
                  <Input type="select" name ="select" id="username" value={this.state.userid} onChange={this.Userid} required>
                  <option value="select">Please Select User</option>
                    {userList}
                  </Input>
                </FormGroup>

                <FormGroup>
                <h5><Label htmlFor="userid">Incharge Profile Photo<span>*</span></Label></h5>
                <span className="error">{this.state.errors["image1error"]}</span>
                <Input type="file" name ="file-input" id="file-input" onChange={this.handleimagechange.bind(this)}>

                </Input>
                </FormGroup>

                {/* <FormGroup>
                  <h5><Label htmlFor="union_address">Record list <span>*</span></Label></h5>
                  <Input type="select"  value={this.state.recordlist} name="select" id="select" onChange={this.inputRecordList} >
                        <option value="0">Please Select</option>
                        <option value="HO">HO</option>
                        <option value="Chilling Center">Chilling Center</option>
                        <option value="RMCU application">RMCU application</option>
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
export default SocietyMaster;
