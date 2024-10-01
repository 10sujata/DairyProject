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

class EditUnits extends Component {

    constructor(props) {
        super(props);
        this.state = {
          allUsers: [],
          unitname: '',
          unitname1: '',
          scalefactor:'',
          factorunit: ''
        };
         this.submitData = this.submitData.bind(this);
        this.inputUnitName = this.inputUnitName.bind(this);
        this.inputUnitName1 = this.inputUnitName1.bind(this);
        this.inputScaleFactor = this.inputScaleFactor.bind(this);
        this.inputFactorUnit = this.inputFactorUnit.bind(this);
      }

    componentDidMount() {
        const {id} = this.props.match.params;
        const _this = this;

        axios.get(API_BASE_URL+'/editunit/' + id)
         .then(response => {
           console.log("csdcsaxdas",response.data);
           
           this.setState({
             unitname: response.data.data[0].unit_name,
             unitname1: response.data.data[0].unit_name1,
             scalefactor: response.data.data[0].scale_factor,
             factorunit:response.data.data[0].factor_unit,
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
          axios.post(API_BASE_URL+'/updateunit/'+ id,{
            unitname: this.state.unitname,
            unitname1:this.state.unitname1,
            scalefactor:this.state.scalefactor,
            factorunit: this.state.factorunit
         })
         .then(response => {
           alert('Unit Data Updated Successfully!');
          this.props.history.push('/listunit');
      
         });
     }
 

 inputUnitName(e) {
        this.setState({unitname: e.target.value});
      }

      inputUnitName1(e) {
        this.setState({unitname1: e.target.value});
      }

      inputScaleFactor(e) {
        this.setState({scalefactor: e.target.value});
      }

      inputFactorUnit(e) {
        this.setState({factorunit: e.target.value});
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
                <h2>Edit Bank Details</h2>
                
        </CardHeader>
        <CardBody>
       <Form onSubmit={this.submitData}>
                <FormGroup row className="my-0">
                <Col xs="6">
                <FormGroup>
                <h5><Label htmlFor="unitname">Unit Name *</Label></h5>
                  <Input type="text" id="unitname" placeholder="Enter Unit Name" onChange={this.inputUnitName}  value={this.state.unitname} />
                </FormGroup>
                </Col>
                <Col xs="6">
                <FormGroup>
                <h5> <Label htmlFor="unitname1">Unit Name In Regional  *</Label> </h5>
                  <Input type="text" id="unitname1" placeholder="Enter Name In Regional " onChange={this.inputUnitName1}  value={this.state.unitname1}/>
                </FormGroup>
                </Col>
                </FormGroup>

                <FormGroup row className="my-0">
                <Col xs="6">
                <FormGroup>
                <h5> <Label htmlFor="scalefactor">Scale Factor *</Label> </h5>
                  <Input type="text" id="scalefactor" placeholder="Enter Scale Factor" onChange={this.inputScaleFactor}  value={this.state.scalefactor}/>
                </FormGroup>
                </Col>
                <Col xs="6">
                <FormGroup>
                <h5> <Label htmlFor="factorunit">Factor Unit *</Label> </h5>
                  <Input type="text" id="factorunit" placeholder="Enter Factor Unit" onChange={this.inputFactorUnit}  value={this.state.factorunit}/>
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
export default EditUnits;
