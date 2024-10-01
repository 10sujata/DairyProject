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

class EditSociety extends Component {

    constructor(props) {
        super(props);
        this.state = {
          societyname: '',
          societyname1: '',
          society_address:'',
          pin_code:'',
          mobile_number:'',
          unionname:'',
          bank_name: '',
        };
        this.submitData = this.submitData.bind(this);
        this.inputSocietyName = this.inputSocietyName.bind(this);
        this.inputSocietyName1 = this.inputSocietyName1.bind(this);
        this.inputSocietyAddress = this.inputSocietyAddress.bind(this);
        this.inputPinCode= this.inputPinCode.bind(this);
        this.inputMobileNumber = this.inputMobileNumber.bind(this);
        this.inputUnionValue = this.inputUnionValue.bind(this);
        this.inputBankDetails = this.inputBankDetails.bind(this);
      }

    componentDidMount() {
        const {id} = this.props.match.params;
        const _this = this;

        axios.get(API_BASE_URL+'/editsociety/' + id)
         .then(response => {
           console.log("csdcsaxdas",response.data);

           this.setState({
             societyname: response.data.data[0].society_name,
             societyname1: response.data.data[0].society_name1,
             society_address: response.data.data[0].society_address,
             pin_code: response.data.data[0].union_name,
             mobile_number:response.data.data[0].pin_code,
             unionname: response.data.data[0].mobile_number,
             bank_name:response.data.data[0].bank_details,
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
      const isdeleted = this.state.isdeleted;
      axios.post(API_BASE_URL+'/updatesociety/'+id,{
       societyname: this.state.societyname,
       societyname1:this.state.societyname1,
       union_name: this.state.union_name,
       society_address: this.state.society_address,
       pin_code: this.state.pin_code,
       mobile_number: this.state.mobile_number,
       bank_name: this.state.bank_name,
       isdeleted: this.state.isdeleted,
    })
    .then(response => {
      alert('Society Data Updated Successfully!');
     this.props.history.push('/listsociety');

    });
}


    inputSocietyName(e) {
          this.setState({societyname: e.target.value});
        }
    inputSocietyName1(e) {
      this.setState({societyname1: e.target.value});
    }

    inputSocietyAddress(e) {
      this.setState({society_address: e.target.value});
    }
    inputUnionValue(e) {
      this.setState({union_name: e.target.value});
    }
    inputPinCode(e) {
      this.setState({pin_code: e.target.value});
    }

    inputMobileNumber(e){
      this.setState({mobile_number: e.target.value});
    }
    inputBankDetails(e){
      this.setState({bank_name: e.target.value});
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
       <Card>
       <CardHeader>
               <h2>Update RMCU</h2>

       </CardHeader>
       <CardBody>
       <Form onSubmit={this.submitData}>
               <FormGroup>
                 <h5><Label htmlFor="societyname">RMCU Name *</Label></h5>
                 <Input type="text" id="societyname" placeholder="Enter Society Name" onChange={this.inputSocietyName}  value={this.state.societyname} />
               </FormGroup>

               <FormGroup>
               <h5> <Label htmlFor="societyname1">RMCU Name In Regional Language *</Label> </h5>
                 <Input type="text" id="societyname1" placeholder="Society Name In Regional Language" onChange={this.inputSocietyName1}  value={this.state.societyname1}/>
               </FormGroup>

               <FormGroup>
               <h5> <Label htmlFor="society_address">RMCU Address *</Label> </h5>
                 <Input type="text" id="society_address" placeholder="Society Address" onChange={this.inputSocietyAddress}  value={this.state.society_address}/>
               </FormGroup>


               <FormGroup>
               <h5> <Label htmlFor="mobile_number">Mobile Number *</Label> </h5>
                 <Input type="text" id="mobile_number" placeholder="Mobile Number" onChange={this.inputMobileNumber}  value={this.state.mobile_number}/>
               </FormGroup>

                <FormGroup>
               <h5> <Label htmlFor="union_name">Dairy Name *</Label> </h5>
                 <Input type="text" id="union_name" placeholder="Union Name" onChange={this.inputUnionValue}  value={this.state.union_name}/>
               </FormGroup>

                <FormGroup>
               <h5> <Label htmlFor="bank_name">Bank Name *</Label> </h5>
                 <Input type="text" id="bank_name" placeholder="Bank Name" onChange={this.inputBankDetails}  value={this.state.bank_name}/>
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
export default EditSociety;
