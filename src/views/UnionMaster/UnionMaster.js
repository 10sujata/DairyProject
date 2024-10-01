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


class UnionMaster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            unionname: '',
            unionname1: '',
            union_address:'',
            union_address1: '',
            pin_code:'',
            mobile_number:'',
            rate_value:'',
            status: 'Pending',
            isdeleted: 'active',
            redirect: false
        };
        this.submitData = this.submitData.bind(this);
        this.Update = this.Update.bind(this);
        this.inputUnionName = this.inputUnionName.bind(this);
        this.inputUnionName1 = this.inputUnionName1.bind(this);
        this.inputUnionAddress = this.inputUnionAddress.bind(this);
        this.inputUnionAddress1 = this.inputUnionAddress1.bind(this);
        this.inputPinCode= this.inputPinCode.bind(this);
        this.inputMobileNumber = this.inputMobileNumber.bind(this);
        this.inputRateValue = this.inputRateValue.bind(this);
      }

    componentDidMount() {
      axios.get(API_BASE_URL+'/dairylist')
      .then(response => {
        console.log("dairyresponse",response);
          this.setState({
            newdata:response.data.data[0].union_name,
            unionname:response.data.data[0].union_name,
            unionname1:response.data.data[0].union_name1,
            union_address:response.data.data[0].union_address,
            union_address1:response.data.data[0].union_address1,
            mobile_number:response.data.data[0].mobile_no,
            //centername: response.data.data[0].center_name,
          });

      })
      .catch(e => {

      });
    }

     submitData(e) {
       e.preventDefault();
       console.log("mobile number",this.state.mobile_number);
       axios.post(API_BASE_URL+'/unionform',{
        unionname: this.state.unionname,
        unionname1:this.state.unionname1,
        union_address:this.state.union_address,
        union_address1: this.state.union_address1,
        pin_code: "324242",
        mobile_number: this.state.mobile_number,
        rate_value: "fdfss"
     })
     .then(() => this.setState({
       unionname: '',
       unionname1: '',
       union_address:'',
       union_address1: '',
       pin_code:'',
       mobile_number:'',
       rate_value:'',


     }))
     let myColor = { background: '#1985ac', text: "#FFFFFF", };
    notify.show('Dairy Record Created Successfully!','custom', 9000, myColor);


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

      Update(e) {
        e.preventDefault();
        const {id} = 1;
        const isdeleted = this.state.isdeleted;
        axios.post(API_BASE_URL+'/updateunion/'+ 1,{
          unionname: this.state.unionname,
          unionname1:this.state.unionname1,
          union_address:this.state.union_address,
          union_address1: this.state.union_address1,
          pin_code: "324242",
          mobile_number: this.state.mobile_number,
          rate_value: "fdfss"
      })
      .then(response => {
        alert('Dairy Data Updated Successfully!');


      });
    }

      inputUnionName(e) {
        var regex = new RegExp("^[a-zA-Z ]*$");
       if (regex.test(e.target.value)) {
           this.setState({unionname: e.target.value});
       }
      }
      inputUnionName1(e) {
        var regex = new RegExp("^[a-zA-Z ]*$");
       if (regex.test(e.target.value)) {
           this.setState({unionname1: e.target.value});
       }
      }

      inputUnionAddress(e) {
        this.setState({union_address: e.target.value});
      }
      inputUnionAddress1(e) {
        this.setState({union_address1: e.target.value});
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
      inputRateValue(e){
        this.setState({rate_value: e.target.value});
      }

    render() {
      console.log("newdata array",this.state.newdata);
      const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/ListEngineers" />;
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
                <h2>Add Dairy/HO</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit={this.submitData}>
                <FormGroup>
                  <h5><Label htmlFor="unionname">Dairy *</Label></h5>
                  {this.state.newdata===undefined ?(
                    <Input type="text" id="unionname" onChange={this.inputUnionName}  placeholder="Please Enter Dairy Name" value={this.state.unionname} />
                  ):<Input type="text" id="unionname" onChange={this.inputUnionName}  value={this.state.unionname} />}

                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="unionname1">Dairy Name In Regional Language *</Label> </h5>
                {this.state.newdata===undefined ?(
                  <Input type="text" id="unionname1" onChange={this.inputUnionName1}  placeholder="Dairy Name In Regional Language" value={this.state.unionname1}/>
                ):<Input type="text" id="unionname1" onChange={this.inputUnionName1}  value={this.state.unionname1}/>}

                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="union_address">Dairy Address *</Label> </h5>
                {this.state.newdata===undefined ?(
                  <Input type="text" placeholder= "Dairy Address" id="union_address"  onChange={this.inputUnionAddress}  value={this.state.union_address}/>
                ):<Input type="text" id="union_address"  onChange={this.inputUnionAddress}  value={this.state.union_address}/>}

                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="union_address1">Dairy Address In Regional Language *</Label> </h5>
                  {this.state.newdata===undefined ?(
                    <Input type="text" placeholder="Dairy Address In Regional Language" id="union_address1"  onChange={this.inputUnionAddress1}  value={this.state.union_address1}/>
                  ):<Input type="text" id="union_address1"  onChange={this.inputUnionAddress1}  value={this.state.union_address1}/>}

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
                <h5> <Label htmlFor="mobile_number">Mobile Number *</Label> </h5>
                {this.state.newdata===undefined ?(
                  <Input placeholder="Mobile Number" type="text" id="mobile_number" onChange={this.inputMobileNumber}  value={this.state.mobile_number}/>
                ):<Input type="text" id="mobile_number" onChange={this.inputMobileNumber}  value={this.state.mobile_number} maxLength="10"/>}

                </FormGroup>

                <FormGroup>
                  <Input type="hidden" id="status" value={this.state.status}/>
                  <Input type="hidden" id="isdeleted" value={this.state.isdeleted}/>
                </FormGroup>
                  {this.state.newdata===undefined ?(
                    <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                  ):<Button type="button" size="md" color="primary" onClick={this.Update}><i className="fa fa-dot-circle-o"></i> Update</Button>}


                </Form>
        </CardBody>

        </Card>
        </Col>
        </Row>
        </Container>


     );
    }
}
export default UnionMaster;
