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
import { Calendar } from 'react-date-range';
import DateTimePicker from 'react-datetime-picker';
import Notifications, {notify} from 'react-notify-toast';
import {API_BASE_URL} from '../../config';


class EditDeduction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deductionname: '',
            deductionname1: '',
            deductiontype:'',
            deductioncycle:'',
            activationperiodfrom: '',
            activationperiodto: '',
            deductionmethod: '',
            deductionactive: '',
            status: 'Pending',
            isdeleted: 'active',
            redirect: false,
        };
        this.submitData = this.submitData.bind(this);
        this.inputDeductionname = this.inputDeductionname.bind(this);
        this.inputDeductionname1 = this.inputDeductionname1.bind(this);
        this.inputDeductiontype = this.inputDeductiontype.bind(this);
        this.inputDeductioncycle = this.inputDeductioncycle.bind(this);
        this.inputActivationperiodfrom = this.inputActivationperiodfrom.bind(this);
        this.inputActivationperiodto = this.inputActivationperiodto.bind(this);
        this.inputDeductionmethod = this.inputDeductionmethod.bind(this);
        this.inputDeductionactive = this.inputDeductionactive.bind(this);
        this.onChange = this.onChange.bind(this);
      }

    // componentDidMount() {
    //     firebaseConfig
    //       .database()
    //       .ref(`/Users/`)
    //       .on('value', snap => console.log('from db', snap.val()));
    //   }

      componentDidMount() {
        const {id} = this.props.match.params;
        const _this = this;
        console.log("cscsdz",id);
        axios.get(API_BASE_URL+'/editdeduction/'+ id)

        .then(response => {
          console.log("dfdfsd",response.data.data[0].deduction_name);
            this.setState({
              deductionname: response.data.data[0].deduction_name,
              deductionname1:response.data.data[0].deduction_name1,
              deductiontype:response.data.data[0].deduction_type,
              deductioncycle:response.data.data[0].deduction_cycle,
              activationperiodfrom:response.data.data[0].activation_periodfrom,
              activationperiodto:response.data.data[0].activation_periodto,
              deductionmethod:response.data.data[0].deduction_method,
              deductionactive: response.data.data[0].deduction_active
            });
        })
        .catch(e => {

        });

      }

      submitData(e) {
       e.preventDefault();
       const {id} = this.props.match.params;
        const _this = this;
           axios.post(API_BASE_URL+'/updatededuction1/'+ id,{
             deductionname: this.state.deductionname,
             deductionname1:this.state.deductionname1,
             deductiontype:this.state.deductiontype,
             deductioncycle:this.state.deductioncycle,
             activationperiodfrom:this.state.activationperiodfrom,
             activationperiodto:this.state.activationperiodto,
             deductionmethod:this.state.deductionmethod,
             deductionactive: this.state.isdeleted
          })
          .then(() => this.setState({
            deductionname: '',
            deductionname1: '',
            deductiontype:'',
            deductioncycle:'',
            activationperiodfrom: '',
            activationperiodto: '',
            deductionmethod: '',
            deductionactive: '',
            redirect: true,
          }));
          let myColor = { background: '#1985ac', text: "#FFFFFF", };
         notify.show('Deduction Record Updated Successfully!','custom', 9000, myColor);
      }


      backbutton(id) {
        let path = `/deductionlist/`;
        this.props.history.push(path);
      }
      onChange(e) {
        this.setState({datenew: e.target.value});
      }

      inputDeductionname(e) {
        this.setState({deductionname: e.target.value});
      }

      inputDeductionname1(e) {
        this.setState({deductionname1: e.target.value});
      }

      inputDeductiontype(e) {
        this.setState({deductiontype: e.target.value});
      }

      inputDeductioncycle(e) {
        this.setState({deductioncycle: e.target.value});
      }


      inputDeductionmethod(e) {
        this.setState({deductionmethod: e.target.value});
      }
      inputDeductionactive(e) {
        this.setState({deductionactive: e.target.value});
      }

      inputActivationperiodfrom(e) {
        this.setState({activationperiodfrom: e.target.value});
      }
      inputActivationperiodto(e) {
        this.setState({activationperiodto: e.target.value});
      }
    render() {

      const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/deductionlist" />;
    }

    var someDate = new Date();
    someDate.setDate(someDate.getDate());
    var date = someDate.toISOString().substr(0, 10);
     return(

        <Container>
        <Row className="justify-content-center">
        <Col xs="12" sm="12">
        <div className='main'>
              <Notifications options={{zIndex: 200, top: '120px'}} />
        </div>
        <Card>
        <CardHeader>
                <h2>Add Deduction</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit={this.submitData}>
                <FormGroup>
                  <h5><Label htmlFor="deductionname">Deduction Name In English *</Label></h5>
                  <Input type="text" id="deductionname" onChange={this.inputDeductionname}  value={this.state.deductionname} required/>
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="deductionname1">Deduction Name In Regional Language*</Label> </h5>
                  <Input type="text" id="deductionname1" onChange={this.inputDeductionname1}  value={this.state.deductionname1} required/>
                </FormGroup>
                <FormGroup>
                  <h5><Label htmlFor="deductiontype">Deduction Type <span>*</span></Label></h5>
                    <Input type="select"  value={this.state.deductiontype} name="select" id="select" onChange={this.inputDeductiontype} >
                        <option value="0">Please Select</option>
                        <option value="Regular">Regular</option>
                        <option value="Fix">Fix</option>
                        <option value="Other Deduction">Other Deduction</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                <h5> <Label htmlFor="deductioncycle">Deduction Cycle*</Label> </h5>
                 <Input type="select"  value={this.state.deductioncycle} name="select" id="select" onChange={this.inputDeductioncycle} >
                        <option value="0">Please Select</option>
                        <option value="bill-wise">Bill Wise</option>
                        <option value="yearly">Yearly</option>

                    </Input>
                </FormGroup>

                <FormGroup row className="my-0">
                <Col xs="6">
                <FormGroup row>
                  <Col md="4">
                    <FormGroup check inline>
                    <h5><Label className="form-check-label" check htmlFor="fromdate">Activation Period From</Label></h5>
                    </FormGroup>
                  </Col>
                  <Col md="8">
                  <Input type="date" defaultValue={date} onChange={this.inputActivationperiodfrom} />
                  </Col>
                </FormGroup>
                </Col>
                <Col xs="6">
                <FormGroup row>
                  <Col md="4">
                    <FormGroup check inline>
                    <h5><Label className="form-check-label" check htmlFor="todate">Activation Period To</Label></h5>
                    </FormGroup>
                  </Col>
                  <Col md="8">
                  <Input type="date" id="activationperiodto" onChange={this.inputActivationperiodto} value={this.state.activationperiodto} required/>
                  </Col>
                </FormGroup>
                </Col>
                </FormGroup>

                 <FormGroup>
                  <h5><Label htmlFor="deductionmethod">Deduction method <span>*</span></Label></h5>
                    <Input type="select"  value={this.state.deductionmethod} name="select" id="select" onChange={this.inputDeductionmethod} >
                        <option value="0">Please Select</option>
                        <option value="liter">Liter</option>
                        <option value="fix-amount">Fixed amount</option>
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
export default EditDeduction;
