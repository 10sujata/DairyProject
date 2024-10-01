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

class EditProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
          allUsers: [],
          productname: '',
          productname1: '',
          recordlist:'',
          manufacturedetails: '',
          unitvalue:'',
          subsidypercentage:'',
          allsuppliers: [],
          allunit: [],
          errors: {},
        };

        this.submitData = this.submitData.bind(this);
        this.inputProductname = this.inputProductname.bind(this);
        this.inputProductname1 = this.inputProductname1.bind(this);
        this.inputRecordList = this.inputRecordList.bind(this);
        this.inputManufactureDetails = this.inputManufactureDetails.bind(this);
        this.inputUnitValue = this.inputUnitValue.bind(this);
        this.inputSubsidyPercentage = this.inputSubsidyPercentage.bind(this);
      }

    componentDidMount() {
        const {id} = this.props.match.params;
        const _this = this;

        axios.get(API_BASE_URL+'/editproduct/' + id)
         .then(response => {
           this.setState({
             productname: response.data.data[0].product_name,
             productname1: response.data.data[0].product_name1,
             recordlist: response.data.data[0].record_list,
             manufacturedetails: response.data.data[0].manufacture_details,
             unitvalue:response.data.data[0].unit_scale,             
             subsidypercentage:response.data.data[0].subsidy_percentage,
             manufacturename:response.data.data[0].suppliername,
             unitname:response.data.data[0].unitscalename,

         });

      })
      .catch(e => {

      });

        axios.get(API_BASE_URL+'/supplierlist')
        .then(response => {
            this.setState({ allsuppliers: response.data.data,filteredUsers:response.data.data,currentTodos:response.data.data });
            console.log("response",response.data);

        })
        .catch(e => {

        });

        axios.get(API_BASE_URL+'/listunit')
        .then(response => {
            this.setState({ allunit: response.data.data,filteredUsers:response.data.data,currentTodos:response.data.data });
            console.log("response",response.data);

        })
        .catch(e => {

        });
        
    }

   submitData(e) {
      e.preventDefault();
      const {id} = this.props.match.params;
       const _this = this;
       let errors = {};
       if(this.state.unitvalue===""){
        errors["uniterror"] = "Please select unit value";        
        this.setState({ errors: errors});
       }
       else if(this.state.manufacturedetails===""){
        errors["uniterror1"] = "Please select manufacuring value";
        this.setState({ errors: errors});
       }

          axios.post(API_BASE_URL+'/updateproduct/'+ id,{
            productname: this.state.productname,
            productname1:this.state.productname1,
            recordlist: this.state.recordlist,
            manufacturedetails: this.state.manufacturedetails,
            unitvalue:this.state.unitvalue,
            subsidypercentage:this.state.subsidypercentage,
            manufacturename:this.state.suppliername,
            unitname:this.state.unitname,
         })
         .then(response => {
          console.log('from handle submit', response);
          alert('Product Data Updated Successfully!');
           this.props.history.push('/lisproduct');
         });
     }

     inputManufactureDetails(e) {
      this.setState({manufacturedetails: e.target.value}); 

      axios.get(API_BASE_URL+'/typesuppliername/'+ e.target.value)
      .then(response => {
        console.log("sadasdas",response.data.data);
          this.setState({
          suppliername: response.data.data[0].supplier_name,           
        });

      })
      .catch(e => {

      });       
  }

      inputProductname(e) {
        this.setState({productname: e.target.value});
      }
      inputProductname1(e) {
        this.setState({productname1: e.target.value});
      }

      inputRecordList(e) {
        this.setState({recordlist: e.target.value});
      }    
      inputSubsidyPercentage(e) {
        this.setState({subsidypercentage: e.target.value});
      }

      inputUnitValue(e) {       
        this.setState({unitvalue: e.target.value});         
      axios.get(API_BASE_URL+'/unitname/'+ e.target.value)
      .then(response => {
        console.log("sadasdas",response.data.data);
          this.setState({
          unitname: response.data.data[0].unit_name,           
        });

      })
      .catch(e => {

      });       
  }


    render() {

      const { redirect ,allsuppliers,allunit} = this.state;

      let supplierList = allsuppliers.length > 0
      && allsuppliers.map((item, i) => {
      return (
        <option key={i} value={item.id} >{item.supplier_name}</option>
      )
    }, this);

    let unitList = allunit.length > 0
      && allunit.map((item, i) => {
      return (
        <option key={i} value={item.id} >{item.unit_name}</option>
      )
    }, this);

    if (redirect) {
      return <Redirect to="/listproduct" />;
    }
     return(

        <Container>
        <Row className="justify-content-center">
        <Col xs="12" sm="12">
        <Card>
        <CardHeader>
                <h2>Edit Product Details</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit={this.submitData}>
                <FormGroup>
                  <h5><Label htmlFor="productname">Product Name *</Label></h5>
                  <Input type="text" id="productname" placeholder="Enter Product Name" onChange={this.inputProductname}  value={this.state.productname} />
                </FormGroup>

                <FormGroup>
                <h5> <Label htmlFor="productname1">Product Name In Regional Language *</Label> </h5>
                  <Input type="text" id="productname1" placeholder="Product Name In Regional Language" onChange={this.inputProductname1}  value={this.state.productname1}/>
                </FormGroup>

                <FormGroup>
                  <h5><Label htmlFor="inputManufactureDetails">Manufacturing Details<span>*</span></Label></h5>
                  <Input type="select" name ="select" id="inputManufactureDetails" value={this.state.manufacturedetails} onChange={this.inputManufactureDetails} >
                  <option value="select">Please Select</option>
                    {supplierList}
                  </Input>
                  <span className="error">{this.state.errors["uniterror1"]}</span>
                </FormGroup>
                            
                <FormGroup>
                  <h5><Label htmlFor="unitvalue">Unit for sale and purchase<span>*</span></Label></h5>
                  <Input type="select" name ="select" id="unitvalue" value={this.state.unitvalue} onChange={this.inputUnitValue} >
                  <option value="select">Please Select</option>
                    {unitList}
                  </Input>
                  <span className="error">{this.state.errors["uniterror"]}</span>
                </FormGroup>


                <FormGroup>
                <h5> <Label htmlFor="subsidypercentage">Subsidy Percentage *</Label> </h5>
                  <Input type="text" id="subsidypercentage" placeholder="Subsidy Percentage" onChange={this.inputSubsidyPercentage}  value={this.state.subsidypercentage}/>
                </FormGroup>

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
export default EditProduct;
