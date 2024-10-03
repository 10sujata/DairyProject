import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
import { directive } from '@babel/types';
import firebaseConfig from '../../config'
import { FormGroup,Badge,CardHeader,Label,FormText,Button, Card, CardBody, CardFooter, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { userInfo } from 'os';
import { Redirect } from 'react-router';
import{ListEngineers} from '../../../src/views/ListEngineers/ListEngineers';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import '@firebase/storage';



class ViewCallsToAttend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameofservicengineer:'',
            regionofserviceengineer:'',
            cityofservice:'',
            customername:'',
            customerepname:'',
            customeremail:'',
            customeraddress:'',
            customercity:'',
            customerstate:'',
            customercountry:'',
            productcategory:'',
            productdescription:'',
            calllogdate:'',
            callassignedto:'',
            callassignedby:'',
            productname:'',
            productserialno:'',
            enginnerintime:'',
            callattendingdate:'',
            imageupload: '',
            image1: null,
            url1: '',
            invoicenumber:'',
            natureofcomplaint:'',
            detailsofcomplaint:'',
            engineerobservation:'',
            callassignto:'',
            allUsersList:[],
            servicecharge: false,
            servicecharge1: '',
            expensecharge: false,
            expensecharge1: '',
            foc: false,
            foc1: '',
            modeofpayment: "",
        };
        this.nameofserviceengineer = this.nameofserviceengineer.bind(this);
        this.regionofserviceengineer = this.regionofserviceengineer.bind(this);
        this.cityofservice = this.cityofservice.bind(this);
        this.customername = this.customername.bind(this);
        this.customerepname = this.customerepname.bind(this);
        this.customeremail =  this.customeremail.bind(this);
        this.customeraddress = this.customeraddress.bind(this);
        this.customercity = this.customercity.bind(this);
        this.customerstate = this.customerstate.bind(this);
        this.customercountry = this.customercountry.bind(this);
        this.productcategory = this.productcategory.bind(this);
        this.productdescription = this.productdescription.bind(this);
        this.calllogdate = this.calllogdate.bind(this);
        this.callassignedto = this.callassignedto.bind(this);
        this.callassignedby = this.callassignedby.bind(this);
        this.productname = this.productname.bind(this);
        this.productserialno = this.productserialno.bind(this);
        this.enginnerintime = this.enginnerintime.bind(this);
        this.callattendingdate=this.callattendingdate.bind(this);
        this.handleimagechange1 = this.handleimagechange1.bind(this);
        this.natureofcomplaint = this.natureofcomplaint.bind(this);
        this.detailsofcomplaint = this.detailsofcomplaint.bind(this);
        this.engineerobservation = this.engineerobservation.bind(this);
        this.statusofcomplaint = this.statusofcomplaint.bind(this);
        this.modeofpayment = this.modeofpayment.bind(this);
        this.servicecharge1 = this.servicecharge1.bind(this);
        this.servicecharge = this.servicecharge.bind(this);
        this.submitData = this.submitData.bind(this);
        this.expensecharge = this.expensecharge.bind(this);
        this.expensecharge1 = this.expensecharge1.bind(this);
        this.foc = this.foc.bind(this);
        this.foc1 = this.foc1.bind(this);
      }

      foc(e) {
        this.setState({foc: !this.state.foc});
      }

      foc1(e) {
        this.setState({foc1: e.target.value});
      }
      expensecharge(e) {
        this.setState({expensecharge: !this.state.expensecharge});
      }
      expensecharge1(e) {
        this.setState({expensecharge1: e.target.value});
      }

      servicecharge1(e) {
        this.setState({servicecharge1: e.target.value});
      }
      modeofpayment(e) {
        this.setState({modeofpayment: e.target.value});
      }
      servicecharge(e) {
        this.setState({servicecharge: !this.state.servicecharge});
      }

      handleimagechange1(e) {
        if(e.target.files[0]){
          let errors = {};
            const {image} = e.target.files[0];

            this.setState({
              image1: e.target.files[0]
            });

            console.log(e.target.files[0]);
        }
      }

      nameofserviceengineer(e) {
        this.setState({nameofservicengineer: e.target.value});
      }

      regionofserviceengineer(e) {
        this.setState({regionofservicengineer: e.target.value});
      }

      cityofservice(e) {
        this.setState({cityofservice:e.target.value});
      }

      customername(e) {
        this.setState({customername:e.target.value});
      }

      customerepname(e){
        this.setState({customerepname:e.target.value});
      }

      customeremail(e){
        this.setState({customeremail:e.target.value});
      }

      customeraddress(e){
        this.setState({customeraddress:e.target.value});
      }

      customercity(e) {
        this.setState({customercity:e.target.value});
      }

      customerstate(e) {
        this.setState({customerstate:e.target.value});
      }

      customercountry(e) {
        this.setState({customercountry:e.target.value});
      }

      productcategory(e) {
        this.setState({productcategory:e.target.value});
      }

      productdescription(e){
        this.setState({productdescription:e.target.value});
      }

      calllogdate(e){
        this.setState({calllogdate:e.target.value});
      }

      callassignedto(e){
        this.setState({callassignedto:e.target.value});
      }

      callassignedby(e){
        this.setState({callassignedby:e.target.value});
      }

      productname(e){
        this.setState({productname:e.target.value});
      }

      productserialno(e){
        this.setState({productserialno:e.target.value});
      }

      enginnerintime(e){
        this.setState({enginnerintime:e.target.value});
      }

      callattendingdate(e){
        this.setState({callattendingdate:e.target.value});
      }

      invoicenumber(e){
        this.setState({invoicenumber:e.target.value});
      }

      natureofcomplaint(e){
        this.setState({natureofcomplaint:e.target.value});
      }

      detailsofcomplaint(e){
        this.setState({detailsofcomplaint:e.target.value});
      }

      engineerobservation(e) {
        this.setState({engineerobservation:e.target.value});
      }

      componentDidMount() {
          const {id} = this.props.match.params;
          const _this = this;
          const userref =  firebaseConfig.database().ref(`/Calls/` + id);

          userref.on("value", snapshot => {
              let allUsers = snapshot.val();
              console.log("new data",allUsers);
              this.setState({
                  nameofservicengineer: allUsers.name_of_service_engineer,
                  regionofserviceengineer:allUsers.region_of_service_engineer,
                  callrescheduledate:allUsers.callrescheduledate,
                  cityofservice:allUsers.city_of_service,
                  customername:allUsers.customer_name,
                  customerepname:allUsers.customer_rep_name,
                  customeremail:allUsers.customer_Email_Id,
                  customeraddress:allUsers.customer_address,
                  customercity:allUsers.customer_city,
                  customerstate:allUsers.customer_state,
                  customercountry:allUsers.customer_country,
                  productcategory:allUsers.product_category,
                  productdescription:allUsers.product_description,
                  calllogdate:allUsers.call_log_date,
                  callassignedto:allUsers.call_assigned_to,
                  callassignedby:allUsers.call_assigned_by,
                  detailsofcomplaint:allUsers.detailsofcomplaint,
                  productname:allUsers.productname,
                  productserialno:allUsers.productserialno,
                  enginnerintime:allUsers.engineer_in_time,
                  callattendingdate:allUsers.callattendingdate,
                  image: allUsers.image,
                  invoicenumber: allUsers.invoiceno,
                  natureofcomplaint:allUsers.natureofcomplaint,
                  detailsofcomplaint:allUsers.detailsofcomplaint,
                  statusofcomplaint:allUsers.status_of_complaint,
                  engineerobservation:allUsers.engineersobservation
              });
         })


         const userref3 =  firebaseConfig.database().ref(`/Users/`);

            userref3.on("value", snapshot2 =>{
            let allUsers3 = snapshot2.val();
                
                let newClient2 = [];
                for(let user2 in allUsers3){                                    
                    newClient2.push({
                    id: user2,
                    Name: allUsers3[user2].Name                   
                  });
              }
              this.setState({
                allUsersList: newClient2,
              });


          })

      }


          submitData(e){
            e.preventDefault();
            const {id} = this.props.match.params;
            const _this = this;
      const { name_of_service_engineer,statusofcomplaint,region_of_service_engineer,callassignto,nameofservicengineer,regionofserviceengineer,cityofservice,customername,customerepname,customeremail,customeraddress,customercity,customerstate,customercountry,productcategory,productdescription,calllogdate,callassignedto,callassignedby,productname,productserialno,enginnerintime,callattendingdate,image,invoicenumber,natureofcomplaint,detailsofcomplaint,engineerobservation} = this.state;
           
              firebaseConfig
              .database()
              .ref(`/Calls/`+id)
              .update({            
                name_of_service_engineer:name_of_service_engineer,    
                call_assigned_to: callassignedto,
                callattendingdate: callattendingdate,
                call_log_date: calllogdate,
                customer_city: customercity,
                customer_country: customername,
                customer_Email_Id:customeremail,
                customer_name:customername,
                customer_rep_name:customerepname,
                customer_state:customerstate,
                detailsofcomplaint: detailsofcomplaint,
                engineersobservation: engineerobservation,
                invoiceno: invoicenumber,
                name_of_service_engineer:nameofservicengineer,
                region_of_service_engineer: region_of_service_engineer,
                natureofcomplaint: natureofcomplaint,
                product_category:productcategory,
                product_description:productdescription,
                productname: productname,
                status_of_complaint:statusofcomplaint,
                productserialno:productserialno,
                user_uid:callassignto,
                unique_id:id,
                

              })
              .then(() => this.setState({ redirect: true }));
        }

        callchange(selectedOption) {
          const categoryid = firebaseConfig.database().ref(`/Users/`+ selectedOption.value);

          categoryid.on("value", snapdata => {
          let allclients = snapdata.val();
            this.setState({
                call_assigned_to: allclients.Name,
                callassignedto:allclients.Name,
                name_of_service_engineer: allclients.Name,
                region_of_service_engineer:allclients.Region ,
                regionofserviceengineer: allclients.Region ,
                nameofservicengineer: allclients.Name,    
            });
          })

          this.setState({
              callassignto: selectedOption.value,
          });

    }

    statusofcomplaint(e) {
      this.setState({statusofcomplaint: e.target.value});
    }

 render() {

  const { redirect } = this.state;
  if (redirect) {
    if(this.state.statusofcomplaint=="Completed"){
      return <Redirect to="/completedcalls" />;
    }
    else {
      return <Redirect to="/pendingcalls" />;
    }

  }
        let useroption = [];
        this.state.allUsersList.map((item) => {        
          useroption.push({ label: item.Name, value: item.id });      
      });
      const defaultOption1 = useroption[0];


      return(

        <Card>
        <CardHeader>
                <h2>Calls To Attend</h2>

        </CardHeader>
        <CardBody>

        <Form onSubmit={this.submitData}>
                <FormGroup row className="my-0">
                  
                  <Col xs="4">
                  <FormGroup>
                  <h5><Label htmlFor="productname">Name of service Engineer</Label></h5>
                  <Input type="text" id="nameofservicengineer" name="nameofservicengineer" onChange={this.nameofservicengineer} value={this.state.nameofservicengineer}></Input>
                </FormGroup>
                  </Col>

                  <Col xs="4">
                  <FormGroup>
                  <h5><Label htmlFor="productname">Region of service Engineer</Label></h5>
                  <Input type="text" id="regionofserviceengineer" name="regionofserviceengineer" onChange={this.regionofserviceengineer} value={this.state.regionofserviceengineer}></Input>
                </FormGroup>
                  </Col>

                </FormGroup>

                <FormGroup row className="my-0">
                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="productname">City of service</Label></h5>
                  <Input type="text" id="cityofservice" name="cityofservice" onChange={this.cityofservice} value={this.state.cityofservice}></Input>
                </FormGroup>
                  </Col>

                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="productname">Customer Name</Label></h5>
                  <Input type="text" id="customername" name="customername" onChange={this.customername} value={this.state.customername}></Input>
                </FormGroup>
                  </Col>

                </FormGroup>

                <FormGroup row className="my-0">
                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="productname">Customer Rep. Name </Label></h5>
                  <Input type="text" id="customerepname" name="customerepname" onChange={this.customerepname} value={this.state.customerepname}></Input>
                </FormGroup>
                  </Col>

                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="productname">Customer Email Id</Label></h5>
                  <Input type="text" id="customeremail" name="customeremail" onChange={this.customeremail} value={this.state.customeremail}></Input>
                </FormGroup>
                  </Col>

                </FormGroup>

                <FormGroup row className="my-0">
                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="productname">Customer Address </Label></h5>
                  <Input type="text" id="customeraddress" name="customeraddress" onChange={this.customeraddress} value={this.state.customeraddress}></Input>
                </FormGroup>
                  </Col>

                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="productname">Customer City</Label></h5>
                  <Input type="text" id="customercity" name="customercity" onChange={this.customercity} value={this.state.customercity}></Input>
                </FormGroup>
                  </Col>

                </FormGroup>


                <FormGroup row className="my-0">
                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="productname">Customer State </Label></h5>
                  <Input type="text" id="customerstate" name="customerstate" onChange={this.customerstate} value={this.state.customerstate}></Input>
                </FormGroup>
                  </Col>

                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="productname">Customer Country</Label></h5>
                  <Input type="text" id="customercountry" name="customercountry" onChange={this.customercountry} value={this.state.customercountry}></Input>
                </FormGroup>
                  </Col>

                </FormGroup>


                <FormGroup row className="my-0">
                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="productname">Product Category </Label></h5>
                  <Input type="text" id="productcategory" name="productcategory" onChange={this.productcategory} value={this.state.productcategory}></Input>
                </FormGroup>
                  </Col>

                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="productname">Product Description</Label></h5>
                  <Input type="text" id="productdescription" name="productdescription" onChange={this.productdescription} value={this.state.productdescription}></Input>
                </FormGroup>
                  </Col>

                </FormGroup>


                <FormGroup row className="my-0">
                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="productname">Call Log Date </Label></h5>
                  <Input type="text" id="calllogdate" name="calllogdate" onChange={this.calllogdate} value={this.state.calllogdate}></Input>
                </FormGroup>
                  </Col>

                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="productname">Call Assigned To</Label></h5>
                  <Input type="text" id="callassignedto" name="callassignedto" onChange={this.callassignedto} value={this.state.callassignedto}></Input>
                </FormGroup>
                  </Col>

                </FormGroup>

                <FormGroup row className="my-0">
                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="productname">Call Assign By</Label></h5>
                  <Input type="text" id="callassignedby" name="callassignedby" onChange={this.callassignedby} value={this.state.callassignedby}></Input>
                </FormGroup>
                  </Col>
                  
                </FormGroup>

                <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Update</Button>&nbsp;
                </Form>
        </CardBody>
        </Card>

     );
    }


}
export default ViewCallsToAttend;
