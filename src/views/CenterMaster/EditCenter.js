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

class EditCenter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allrmcu: [],
            centername: '',
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
            allBanks:[],
            allUsers: [],
            alldairy:[],
            allUser:[],
            image: null,
            errors: {},
        };
        this.submitData = this.submitData.bind(this);
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

      componentDidMount() {
          const {id} = this.props.match.params;
          const _this = this;

          axios.get(API_BASE_URL+'/editcenter1/' + id)
           .then(response => {
             console.log("csdcsaxdas",response.data);

             this.setState({
               centername: response.data.data[0].center_name,
               centername1: response.data.data[0].center_name1,
               centeroperator: response.data.data[0].center_operator,
               centeroperator1: response.data.data[0].center_operator1,
               centeraddress:response.data.data[0].center_address,
               centerpin: response.data.data[0].center_pin,
               centercontact: response.data.data[0].contact_details,
               bank_details:response.data.data[0].bank_details,
               bankaddress:response.data.data[0].bank_address,
               branchname:response.data.data[0].branch_name,
               accountnumber:response.data.data[0].account_number,
               ifsccode:response.data.data[0].ifsc_code,
               ratechart:response.data.data[0].rate_chart,
               rmcuname:response.data.data[0].rmcuname,
               app_image:response.data.data[0].image_url,
               userid:response.data.data[0].user_id,
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


        axios.get(API_BASE_URL+'/listuser')
        .then(response => {
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
          //const userref =  firebaseConfig.database().ref(`/Regions/` + id);
      }

     submitData(e){
       e.preventDefault();
       const {id} = this.props.match.params;
        const _this = this;
       axios.post(API_BASE_URL+'/updatecenter/'+ id,{

        centername: this.state.centername,
        centername1:this.state.centername1,
        rmcuname:this.state.rmcuname,
        userid: this.state.userid,
        centeroperator:this.state.centeroperator,
        centeroperator1: this.state.centeroperator1,
        centeraddress: this.state.centeraddress,
        centerpin: this.state.centerpin,
        centercontact: this.state.centercontact,
        bank_details: this.state.bank_details,
        bankaddress: this.state.bankaddress,
        branchname: this.state.branchname,
        ifsccode: this.state.ifsccode,
        accountnumber: this.state.accountnumber,
        ratechart: this.state.ratechart,
        isdeleted: this.state.isdeleted,
        file:this.state.image,
        file3:this.state.app_image,
     })
    //  .then(response => {
    //   console.log('from handle submit', response);
    //
    // });

        .then(() => this.setState({
          redirect: true,
        }));
       let myColor = { background: '#1985ac', text: "#FFFFFF", };
       notify.show('Data Updated Successfully!','custom', 15000, myColor);



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
        this.setState({centeraddress: e.target.value});
      }
      inputCenterPin(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
           this.setState({centerpin: e.target.value});
        }

      }
      inputCenterContact(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
          this.setState({centercontact: e.target.value});
        }

      }
      inputBankDetails(e) {
        this.setState({bank_details: e.target.value});
      }
      Userid(e) {
        this.setState({userid: e.target.value});
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




    render() {

      const { redirect,allBanks,allUser,allrmcu } = this.state;
    if (redirect) {
      return <Redirect to="/listcenter"/>;
    }

    let rmcuList = allrmcu.length > 0
    && allrmcu.map((item, i) => {
    return (
      <option key={i} value={item.id} >{item.society_name}</option>
    )
  }, this);

    let userList = allUser.length > 0
    && allUser.map((item, i) => {
    return (
      <option key={i} value={item.id} >{item.user_name}</option>
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
                <h2>Add Center</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit={this.submitData}>
                <FormGroup>
                  <h5><Label htmlFor="centername">Center Name *</Label></h5>
                  <Input type="text" id="centername" placeholder="Enter Center Name" onChange={this.inputCenterName}  value={this.state.centername} />
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="centername1">Center Name In Regional Language *</Label> </h5>
                  <Input type="text" id="centername1" placeholder="Center Name In Regional Language" onChange={this.inputCenterName1}  value={this.state.centername1}/>
                </FormGroup>

                <FormGroup>
                  <h5><Label htmlFor="centeroperator">Center Operator *</Label></h5>
                  <Input type="text" id="centeroperator" placeholder="Enter Operator Name" onChange={this.inputCenterOperator}  value={this.state.centeroperator} />
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="centeroperator1">Operator Name In Regional Language *</Label> </h5>
                  <Input type="text" id="centeroperator1" placeholder="Operator Name In Regional Language" onChange={this.inputCenterOperator1}  value={this.state.centeroperator1}/>
                </FormGroup>


                <FormGroup>
                <h5> <Label htmlFor="centeraddress">Center Address *</Label> </h5>
                  <Input type="text" id="centeraddress" placeholder="Center Address" onChange={this.inputCenterAddress}  value={this.state.centeraddress}/>
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="centerpin">Center Pin *</Label> </h5>
                  <Input type="text" id="centerpin" placeholder="Center Pin" onChange={this.inputCenterPin}  value={this.state.centerpin}/>
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="centercontact">Center Contact*</Label> </h5>
                  <Input type="text" id="centercontact" placeholder="Center Contact" onChange={this.inputCenterContact}  value={this.state.centercontact} maxLength="10"/>
                </FormGroup>


                <FormGroup>
                <h5> <Label htmlFor="bank_details">Bank Name*</Label> </h5>
                  <Input type="select" name ="select" id="select" value={this.state.bank_details} onChange={this.inputBankDetails} required>
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
                  <h5><Label htmlFor="ratechart">Select Society <span>*</span></Label></h5>
                  <Input type="select" name ="select" id="select" value={this.state.ratechart} onChange={this.inputRateChart}>
                  <option value="select">Please Select</option>
                    {rmcuList}
                  </Input>
                </FormGroup>

                <FormGroup>
                  <h5><Label htmlFor="ratechart">User <span>*</span></Label></h5>
                  <Input type="select"  value={this.state.userid} name="select" id="select" onChange={this.Userid} >
                      {userList}
                      </Input>

                </FormGroup>

                <FormGroup>
                <h5><Label htmlFor="userid">Previously Uploaded Image<span>*</span></Label></h5>

                   {this.state.app_image === "http://mcsoft.whitegoldtech.com:8888/centerimages/no-image.jpg" ? (
                      <h6>No image uploaded</h6>
                   ): <img src={`http://mcsoft.whitegoldtech.com:8888/centerimages/${this.state.app_image}`} height="200"/>}


                </FormGroup>

                <FormGroup>
                <h5><Label htmlFor="userid">Update Incharge Profile Photo<span>*</span></Label></h5>
                <span className="error">{this.state.errors["image1error"]}</span>
                <Input type="file" name ="file-input" id="file-input" onChange={this.handleimagechange.bind(this)}>

                </Input>
                </FormGroup>


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
export default EditCenter;
