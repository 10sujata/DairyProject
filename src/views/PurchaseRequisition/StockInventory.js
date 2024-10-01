import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
import { directive } from '@babel/types';
import { FormGroup,Table,Badge,Pagination,PaginationItem,PaginationLink,CardHeader,Label,FormText,Button, Card, CardBody, CardFooter, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { userInfo } from 'os';
import { Redirect } from 'react-router';
import axios from 'axios';
import ListUsers from '../ListUsers/ListUsers';
import { API_BASE_URL } from '../../config';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Notifications, {notify} from 'react-notify-toast';
import '../../assets/css/modal.css';
import moment from 'moment';
var passwordHash = require('password-hash');




class StockInventory extends Component {

    constructor(props) {
        super(props);
        this.state = {
              allUsers: [],
              items: [],
              fields: {},
              purchasedate:'',
              productnamenew:'',
              productname:'',
              productnumber:'',
              productunit:'',
              availablestock: '',
              purchasestock: '',
              totalstock: '',
              purchaserate:'',
              salerate: '',
              flag:'active',
              isdeleted:'active',
              errors: {},
        };

        this.SomeDeleteRowFunction = this.SomeDeleteRowFunction.bind(this);
        this.AddElementsOnSubmit = this.AddElementsOnSubmit.bind(this);
        this.submitData = this.submitData.bind(this);
        this.ProductName = this.ProductName.bind(this);
        this.PurchaseStock = this.PurchaseStock.bind(this);
        this.PurchaseRate = this.PurchaseRate.bind(this);
        this.SaleRate = this.SaleRate.bind(this);
        this.Calculation = this.Calculation.bind(this);
        this.PurchaseDate = this.PurchaseDate.bind(this);
      }


      componentDidMount() {
          axios.get(API_BASE_URL+'/listproducts')
          .then(response => {
              this.setState({
                allUsers:response.data.data,
              });
          })
          .catch(e => {

          });

        }

      Calculation (e) {
        let errors = {};
        var val = (e.target.value);
        var availablenumber = this.state.availablestock;
        var total = Number(val)+ Number(availablenumber);

        this.setState({totalstock: total});
      }


      SomeDeleteRowFunction(event,item) {
       var array = [...this.state.items];
       var index = array.indexOf(item)
       array.splice(index, 1);
       console.log("bfdhfdsf",array);
       this.setState({items: array});
     }


      AddElementsOnSubmit() {
        let errors = {};
        var someDate = new Date();
        someDate.setDate(someDate.getDate());
        var date = someDate.toISOString().substr(0, 10);


        if(this.state.purchasedate==""){
          this.state.purchasedate=date;
        }

         var productnamenew = this.state.productnamenew;
         var productnumber = this.state.productnumber;
         var productunit = this.state.productunit;
         var availablestock = this.state.availablestock;
         var purchasestock = this.state.purchasestock;
         var purchaserate = this.state.purchaserate;
         var salerate = this.state.salerate;
         var totalstock = this.state.totalstock;
         var purchasedate = this.state.purchasedate

         var elements = this.state.items.slice();


         elements.push({purchasedate:purchasedate,productnamenew: productnamenew, productnumber: productnumber,productunit:productunit,availablestock:availablestock,purchasestock:purchasestock,purchaserate:purchaserate,salerate:salerate,totalstock:totalstock});
         //elements.reverse();
         if(this.state.productname==="select"||this.state.productname==="" || this.state.purchasestock==""||this.state.purchaserate==""||this.state.salerate==""){
           errors["productname"] = "Please Select Product";
           errors["purchasestock"] = "Please Select Value";
           errors["purchaserate"] = "Please Select Value";
           errors["salerate"] = "Please Select Value";
           this.setState({ errors: errors});
         }
         else {
           this.setState({ errors: errors,items: elements, purchasedate:"",productname:"",productnamenew: "", productnumber: "",productunit:"",availablestock:"",purchasestock:"",purchaserate:"",salerate:"",totalstock:"" });
         }

       }

    submitData(e) {
      e.preventDefault();
      var someDate = new Date();
      someDate.setDate(someDate.getDate());
      var date = someDate.toISOString().substr(0, 10);


      if(this.state.purchasedate==""){
        this.state.purchasedate=date;
      }

      console.log("datenew",typeof this.state.items);
      axios.post(API_BASE_URL+'/stockform',{
           arraydata:this.state.items,
           flagvalue:this.state.flag
    })
    .then(() => this.setState({ 
      redirect: false,
      items:[],
    }));

    axios.post(API_BASE_URL+'/stockinventoryform',{
             arraydata:this.state.items,
      })
      .then(() => this.setState({ 
        redirect: false,
        items:[],
      }));
    let myColor = { background: '#1985ac', text: "#FFFFFF", };
   notify.show('Stock Record Created Successfully!','custom', 9000, myColor);

  }

      ProductId(e) {
        this.setState({productid: e.target.value});
      }

      ProductName(e) {
        let errors = {};
        console.log("product id",e.target.value);
        let id = e.target.value;

        errors["productname"] = "";
        this.setState({ errors: errors});
        if(id==="select"){
            this.setState({
              productname: "",
           });

        }
        else {
            axios.get(API_BASE_URL+'/listproductnew/' + id)
             .then(response => {
               console.log("center id",response);
                  this.setState({
                    productnumber: response.data.data[0].id,
                    productunit: response.data.data[0].unitscalename,
                    productnamenew: response.data.data[0].product_name,

                 });
          })

            axios.get(API_BASE_URL+'/stockvaluesnew/' + id)
             .then(response => {
               console.log("center id",response);
              if(response.data.data==""){
                  this.setState({
                    availablestock: "0"
                 });
               }
               else {
                  this.setState({
                    availablestock: response.data.data[0].availablestock,
                 });
               }

          })
        }
        this.setState({productname: e.target.value});
      }

      PurchaseStock(e) {
        let errors = {};
        errors["purchasetock"] = "";
        this.setState({ errors: errors});
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
           this.setState({purchasestock: e.target.value});
        }
        
      }


      PurchaseRate(e) {
        let errors = {};
        errors["purchaserate"] = "";       
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
          this.setState({purchaserate: e.target.value});
        }
      }

      SaleRate(e) {
        let errors = {};
        errors["salerate"] = "";      
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
          this.setState({salerate: e.target.value});
        }
      }

      PurchaseDate(e) {
        this.setState({purchasedate: e.target.value});
      }



    render() {
      const { open,purchasedate,errors } = this.state;
      const {cattletype} = this.state;
      const {isSubmitted} = this.state;
      const { redirect,allUsers,items } = this.state;
      let productList = allUsers.length > 0
      && allUsers.map((item, i) => {
      return (
        <option key={i} value={item.id} >{item.product_name}</option>
      )
    }, this);

    if (redirect) {
      return <Redirect to="/ratechartmaster" />;
    }

     const elementdelete = items.map((item,index)=>{
        return <tr key={index}>
        <td>{item.purchasedate}</td>
        <td>{item.productnamenew}</td>
        <td>{item.productnumber}</td>
        <td>{item.productunit}</td>
        <td>{item.availablestock}</td>
        <td>{item.purchasestock}</td>
        <td>{item.totalstock}</td>
        <td>{item.purchaserate}</td>
        <td>{item.salerate}</td>

        <td><Button onClick={(event) => this.SomeDeleteRowFunction(event, index,item)}>Delete</Button></td>
        </tr>
     });



  var someDate = new Date();
  someDate.setDate(someDate.getDate());
  var date = someDate.toISOString().substr(0, 10);
  var defaults1 = "0";
     return(
        <Container>
        <div className='main'>
              <Notifications options={{zIndex: 200, top: '120px'}} />
        </div>
          <Form onSubmit= {this.submitData.bind(this)}>
          <Card>
          <CardBody>
          <FormGroup row className="my-0">

          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="purchasedate">Purchase Date<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">

          <Input type="date" name ="select" id="purchasedateid" defaultValue={date} onChange={this.PurchaseDate} required>
          </Input>
            </Col>
          </FormGroup>
          </Col>
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
              <Label className="form-check-label" check htmlFor="productname">Product List</Label>
              </FormGroup>
            </Col>
            <Col md="8">
              <Input type="select" name ="select" id="productname" onChange={this.ProductName} value={this.state.productname}>
               <option value="select">Please Select</option>
               {productList}
               </Input>
               <span className="error">{this.state.errors["productname"]}</span>
            </Col>
          </FormGroup>
          </Col>
          </FormGroup>
          <FormGroup row className="my-0">
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="rmcuname">Product Number<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">
          <Label className="form-check-label" htmlFor="rmcuname">{this.state.productnumber}</Label>
            </Col>
          </FormGroup>
          </Col>
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
              <Label className="form-check-label" check htmlFor="productname">Product Unit</Label>
              </FormGroup>
            </Col>
            <Col md="8">
               <Label className="form-check-label" check htmlFor="productname">{this.state.productunit}</Label>
            </Col>
          </FormGroup>
          </Col>
          </FormGroup>
          <FormGroup row className="my-0">
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="availablestock">Available Stock<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">
          <Label className="form-check-label" check htmlFor="availablestock">{this.state.availablestock}</Label>
            </Col>
          </FormGroup>
          </Col>
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
              <Label className="form-check-label" check htmlFor="purchasestock">Purchase Stock</Label>
              </FormGroup>
            </Col>
            <Col md="8">
              <Input type="text" name ="select" id="purchasestock" value={this.state.purchasestock} onChange={this.PurchaseStock} onBlur={this.Calculation}>

               </Input>
               <span className="error">{this.state.errors["purchasestock"]}</span>
            </Col>
          </FormGroup>
          </Col>
          </FormGroup>
          <FormGroup row className="my-0">

          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
              <Label className="form-check-label" check htmlFor="purchaserate">Purchase Rate(per unit)</Label>
              </FormGroup>
            </Col>
            <Col md="8">
              <Input type="text" name ="purchaserate" id="purchaserate" onChange={this.PurchaseRate} value={this.state.purchaserate}>

               </Input>
               <span className="error">{this.state.errors["purchaserate"]}</span>
            </Col>
          </FormGroup>
          </Col>
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="salerate">Sale Rate(per unit)<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">
          <Input type="text" onChange={this.SaleRate} name="salerate" id="salerate" value={this.state.salerate}/>
          <span className="error">{this.state.errors["salerate"]}</span>
            </Col>
          </FormGroup>
          </Col>
          </FormGroup>
          <FormGroup row className="my-0">
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="totalstock">Total Stock<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">
          <Label className="form-check-label" htmlFor="totalstock">{this.state.totalstock}</Label>
            </Col>
          </FormGroup>
          </Col>
          </FormGroup>

          </CardBody>
          </Card>

          <Row>
          <Col xs="12" sm="12">
          <div className='main'>
                <Notifications options={{zIndex: 200, top: '120px'}} />
          </div>
          <Card>

          <CardBody>
          <FormGroup>

              <Button type="button" size="md" color="primary" onClick={() => this.AddElementsOnSubmit()}><i className="fa fa-dot-circle-o"></i> Add</Button>
              </FormGroup>

                  <FormGroup>
                    <Input type="hidden" id="status" value={this.state.productnamenew}/>

                  </FormGroup>
                  <Row className="justify-content-center">
                  <Col xs="12" sm="12">
                  <Card>

                  <Table responsive bordered>
                    <thead>

                    <tr>
                    <th>Purchase Date </th>
                    <th>Product Name</th>
                    <th>Product Id</th>
                    <th>Product Unit</th>
                    <th>Available Stock</th>
                    <th>Purchase Stock</th>
                    <th>Total Stock</th>
                    <th>Purchase Rate</th>
                    <th>Sale Rate</th>
                    <th>Delete</th>

                    </tr>
                    </thead>
                    <tbody>
                    {elementdelete}
                    </tbody>
                  </Table>

                      </Card>
                  </Col>
                  </Row>
                  <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>&nbsp;&nbsp;                  
          </CardBody>

          </Card>
          </Col>
          </Row>
          </Form>

        </Container>



     );
    }
}
export default StockInventory;
