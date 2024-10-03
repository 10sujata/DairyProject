import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
import { directive } from '@babel/types';
import firebaseConfig from '../../config'
import { FormGroup,Table,Pagination,Badge,PaginationItem,PaginationLink,CardHeader,Label,FormText,Button, Card, CardBody, CardFooter, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { userInfo } from 'os';
import Select from 'react-select';
import { Redirect } from 'react-router';

class RegenaratedPendingCalls extends Component {
    constructor(props) {
        super(props);

        this.state = {
           productname: '',
           allProducts: [],
           allCategories:[],
           categorydec: [
               ''
           ],
           productserialno: '',
           engineerintime: '',
           call_attending_date: '',
           callrescheduledate:'',
           invoice_no:'',
           natureofcomplaint:'',
           detailsofcomplaint:[],
           engineersobservation:'',
           clientsremark: '',
           imageupload: '',
           statusofcomplaint: '',
           servicecharge: false,
           servicecharge1: '',
           expensecharge: false,
           expensecharge1: '',
           foc: false,
           foc1: '',
           modeofpayment: "",
           productcategory: '',
           productdescription: '',
           name:'',
           call_assigned_by:'',
           call_assigned_to:'',
           call_log_date:'',
           call_visit_date:'',
           city_of_service:'',
           customer_address:'',
           customer_city:'',
           customer_country:'',
           customer_Email_Id:'',
           customer_Gst_In:'',
           customer_name:'',
           customer_rep_name:'',
           customer_state:'',
           name_of_service_engineer:'',
           product_category:'',
           product_description:'',
           region_of_service_engineer:'',
           image: null,
           url: '',

        };
        this.natureofcomplaint = this.natureofcomplaint.bind(this);
        this.statusofcomplaint = this.statusofcomplaint.bind(this);
        this.modeofpayment = this.modeofpayment.bind(this);
        this.detailsofcomplaint = this.detailsofcomplaint.bind(this);
        this.invoiceno = this.invoiceno.bind(this);
        this.servicecharge1 = this.servicecharge1.bind(this);
        this.engineersobservation = this.engineersobservation.bind(this);
        this.productserialno = this.productserialno.bind(this);
        this.servicecharge = this.servicecharge.bind(this);
        this.expensecharge = this.expensecharge.bind(this);
        this.expensecharge1 = this.expensecharge1.bind(this);
        this.foc = this.foc.bind(this);
        this.foc1 = this.foc1.bind(this);
        this.submitData = this.submitData.bind(this);
        this.handleimagechange = this.handleimagechange.bind(this);
        this.inputCategorydec = this.inputCategorydec.bind(this);

      }


      handleimagechange(e) {

        if(e.target.files[0]){
            const {image} = e.target.files[0];
            //this.setState(() => ({image}));

            this.setState({
              image: e.target.files[0]
            });

            console.log(e.target.files[0]);
        }
      }


    //   handleUpload(e) {

    //  }

      natureofcomplaint(e) {
        this.setState({natureofcomplaint: e.target.value});
      }

      statusofcomplaint(e) {
        this.setState({statusofcomplaint: e.target.value});
      }

      modeofpayment(e) {
        this.setState({modeofpayment: e.target.value});
      }

      servicecharge(e) {
        this.setState({servicecharge: !this.state.servicecharge});
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
      invoiceno(e) {
        this.setState({invoiceno: e.target.value});
      }
      servicecharge1 (e) {
        this.setState({servicecharge1: e.target.value});
      }
      engineersobservation(e) {
        this.setState({engineersobservation: e.target.value});
      }
      productserialno(e) {
        this.setState({productserialno: e.target.value});
      }
      detailsofcomplaint(e) {
        this.setState({detailsofcomplaint: e.target.value});
      }

      expensecharge1(e) {
        this.setState({expensecharge1: e.target.value});
      }
      handleChange = date => {
        this.setState({
          startDate: date
        });
      };


      inputCategorydec(e) {
        this.setState({categorydec: e.target.value});
      }

      createUI = () => {
         return this.state.categorydec.map((el, i) =>
             <div key={i}>
               <FormGroup>
               <Input type="text" id="categorydec"  placeholder="Enginners Observations Taken" onChange={this.handleChange1.bind(this, i)} value={el||''} />
               </FormGroup>
             </div>
         )
     }

     handleChange1(i, event) {
        let categorydec = [...this.state.categorydec];
        categorydec[i] = event.target.value;
        this.setState({ categorydec });
     }

     addClick(){
        this.setState(prevState => ({ categorydec: [...prevState.categorydec, '']}))
      }

    componentDidMount() {
        const {id} = this.props.match.params;
        const _this = this;
        const userref =  firebaseConfig.database().ref(`/Calls/` + id);
        userref.on("value", snapshot => {
           let allUsers = snapshot.val();


           console.log("new data",allUsers);

            this.setState({
                productcategory: allUsers.product_category,
                productdescription: allUsers.product_description,
                call_assigned_by: allUsers.call_assigned_by,
                call_assigned_to: allUsers.call_assigned_to,
                call_attending_date: allUsers.callattendingdate,
                call_log_date: allUsers.call_log_date,
                call_visit_date: allUsers.call_visit_date,
                city_of_service: allUsers.city_of_service,
                customer_address: allUsers.customer_address,
                customer_city: allUsers.customer_city,
                customer_country: allUsers.customer_country,
                customer_Email_Id: allUsers.customer_Email_Id,
                customer_Gst_In: allUsers.customer_Gst_In,
                customer_name: allUsers.customer_name,
                customer_rep_name: allUsers.customer_rep_name,
                customer_state: allUsers.customer_state,
                name_of_service_engineer: allUsers.name_of_service_engineer,
                product_category: allUsers.product_category,
                product_description: allUsers.product_description,
                region_of_service_engineer: allUsers.region_of_service_engineer,
                product_name : allUsers.productname,
                productserialno : allUsers.productserialno,
                invoice_no: allUsers.invoiceno,
                natureofcomplaint: allUsers.natureofcomplaint,
                detailsofcomplaint: allUsers.detailsofcomplaint,
                categorydec: allUsers.engineersobservation,
                clientremark: allUsers.clientremark,
                statusofcomplaint: allUsers.status_of_complaint,
                image: allUsers.image,
                callrescheduledate:allUsers.callrescheduledate
            });
      })

      const userref2 =  firebaseConfig.database().ref(`/Product Category/`);

            userref2.on("value", snapshot2 =>{
            let allUsers2 = snapshot2.val();
                console.log("category name",allUsers2);
                let newClient2 = [];
                for(let user2 in allUsers2){
                    newClient2.push({
                    id: user2,
                    Name: allUsers2[user2].CategoryName,
                    ProductName: allUsers2[user2].ProductName,
                  });
              }
              this.setState({
                allCategories: newClient2,
              });


         })
 }


    submitData(e) {
      e.preventDefault();
const isLoggedIn = localStorage.getItem("appState");
        const {image} = this.state;
  const {id} = this.props.match.params;
      const storage = firebaseConfig.storage();
          const { categorydec,call_assigned_by, call_assigned_to ,callattendingdate,call_log_date,callrescheduledate,customer_city,customer_country,customer_Email_Id,customer_name,customer_rep_name,customer_state,detailsofcomplaint,engineerintime,engineersobservation,invoiceno,name_of_service_engineer,natureofcomplaint,productname,product_category,product_description,productserialno,region_of_service_engineer,statusofcomplaint,servicecharge1,expensecharge1,foc1,modeofpayment} = this.state;

          let opjectval = {
            unique_id:id,
            call_assigned_by: call_assigned_by,
            call_assigned_to: call_assigned_to,
            callattendingdate: "",
            engineersobservation: categorydec,
            call_log_date: call_log_date,
            callrescheduledate: callrescheduledate,
            customer_city: customer_city,
            customer_country: customer_country,
            customer_Email_Id:customer_Email_Id,
            customer_name:customer_name,
            customer_rep_name:customer_rep_name,
            customer_state:customer_state,
            detailsofcomplaint: detailsofcomplaint,
            engineerintime: engineerintime,
            invoiceno: "",
            name_of_service_engineer:name_of_service_engineer,
            nature_of_comp: natureofcomplaint,
            product_category:product_category,
            product_description:product_description,
            product_name: productname,
            product_serial_no:productserialno,
            region_of_service_engineer: region_of_service_engineer,
            status_of_complaint: statusofcomplaint,
            servicecharge1: servicecharge1,
            expensecharge1: expensecharge1,
            foc1: foc1,
            modeofpayment: modeofpayment,

          }


          firebaseConfig
          .database()
          .ref(`/Calls/`+id)
          .update(opjectval).then(() => this.setState({
            redirect: true,
          }));

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
      return(

        <Card>
        <CardHeader>
                <h2>Call Attend</h2>

        </CardHeader>
        <CardBody>

        <Form onSubmit={this.submitData}>
                <FormGroup row className="my-0">
                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="productname">Product Name</Label></h5>
                  <Input type="text" id="productname" name="productname" value={this.state.product_name}></Input>
                </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                    <h5> <Label htmlFor="productserialno">Product Serial No</Label> </h5>
                      <Input type="text" value={this.state.productserialno} name ="productserialno" id="productserialno"/>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                  <FormGroup>
                  <h5>  <Label htmlFor="engineerintime">Engineer's In-Time</Label></h5>
    {/* <Input type="time" step="1" value={this.state.time}   onChange={(ev) => {this.setState({time:ev.target.value})}/> */}
          <Input type="time" step="1" value={this.state.time} name ="serialno" id="serialno"  placeholder="Product Serial No"/>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="call_attending_date">Call Attending Date</Label></h5>
                  <Input type="date" id="call_attending_date" name="call_attending_date" value={this.state.call_attending_date}></Input>
                  </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                    <h5><Label htmlFor="invoice_no">Invoice No of BST ELtromat(Optional)</Label></h5>
                      <Input type="text" name ="invoice_no" id="invoice_no" value={this.state.invoice_no} />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                  <FormGroup>
                  <h5>  <Label htmlFor="natureofcomplaint">Nature Of Complaint</Label> </h5>
                      <Input type="text" value={this.state.natureofcomplaint} name="natureofcomplaint" id="natureofcomplaint">
                      </Input>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                    <h5> <Label htmlFor="detailsofcomplaint">Details Of Complaint</Label></h5>
                      <Input type="text" name ="detailsofcomplaint" id="detailsofcomplaint" value={this.state.detailsofcomplaint}/>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="engineersobservation">Previous Observations/Action Taken</Label></h5>

                      {this.createUI()}
                    <Button type="button" size="md" color="primary" onClick={this.addClick.bind(this)}> Add New Engineer Observation </Button>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                    <h5> <Label htmlFor="clientremark">Client Remark</Label> </h5>
                      <Input type="text" name ="clientremark" id="clientremark" value={this.state.clientremark} />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                  <FormGroup>
                  <h5>   <Label htmlFor="statusofcomplaint">Status Of Complaint</Label> </h5>

                      <Input type="select"  value={this.state.statusofcomplaint} name="select" id="select" onChange={this.statusofcomplaint}>
                        <option value="0">Please Select</option>
                        <option value="Completed">Completed</option>
                        <option value="Needs to be visited again">Needs to be visited again</option>
                        <option value="Under-Repaired">Under-Repaired</option>
                        <option value="Spare part Required">Spare part Required</option>
                        <option value="System sent to factory for repair">System sent to factory for repair</option>
                        <option value="Other">Other</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                  <FormGroup row>
                    <Col md="3">
                    <h5>   <Label htmlFor="file-input">Image Uploaded</Label> </h5>
                    </Col>
                    <Col xs="9" md="5">
                      {/* <Input type="file" id="file-input" name="file-input" onChange={this.handleimagechange.bind(this)}/> */}
                      <img src={this.state.image} width="350" height="200"/>

                    </Col>
                  </FormGroup>
                  </Col>
                  {
                        this.state.statusofcomplaint === 'Completed' ?

                          <Col xs="6">
                  <FormGroup row className="my-0">
                    <Col md="7">
                    <h5> <Label>Applicable Charges</Label></h5><br />
                      <FormGroup check inline>
                        <Input className="form-check-input" type="checkbox" id="servicecharge" name="servicecharge" onChange={this.servicecharge} checked={this.state.servicecharge} />
                        <h5> <Label className="form-check-label" check htmlFor="inline-checkbox1">Service Charge</Label></h5>
                        {
                          this.state.servicecharge ?
                          <Input className="form-check-input" type="text" id="servicecharge1" name="servicecharge1" placeholder="Enter Service Charge" value={this.state.servicecharge1} onChange={this.servicecharge1}/>
                          : null
                        }
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="checkbox" id="expensecharge" onChange={this.expensecharge} name="expensecharge" value="option2" />
                        <h5>  <Label className="form-check-label" check htmlFor="inline-checkbox2">Expense Charge</Label></h5>
                        {
                          this.state.expensecharge ?
                          <Input className="form-check-input" type="text" id="expensecharge1" name="expensecharge1" value ={this.state.expensecharge1} onChange={this.expensecharge1} placeholder="Enter Expense Charge" />
                          : null
                        }
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="checkbox" id="foc" name="foc" onChange={this.foc} />
                        <h5> <Label className="form-check-label" check htmlFor="inline-checkbox3">FOC</Label>&nbsp;&nbsp;</h5>
                        {
                          this.state.foc ?
                          <Input className="form-check-input" type="text" id="foc1" name="foc1" onChange={this.foc1} placeholder="Enter Expense Charge" />
                          : null
                        }
                      </FormGroup>
                    </Col>
                    {
                          this.state.foc ?
                          null
                          : <Col md="5">
                     <FormGroup>
                     <h5> <Label htmlFor="modeofpayment">Mode Of Payment</Label></h5>
                      <Input type="select"  value={this.state.modeofpayment} name="select" id="select" onChange={this.modeofpayment}>
                        <option value="0">Please Select</option>
                        <option value="Cash Payment">Cash Payment</option>
                        <option value="Cheque Payment">Cheque Payment</option>
                        <option value="Bank Transfer:NEFT,RTGS,IMPS">Bank Transfer:NEFT,RTGS,IMPS</option>

                      </Input>
                    </FormGroup>
                    </Col>
                        }

                  </FormGroup>
                  </Col>
                        :    null
                      }
                      {
                        this.state.statusofcomplaint === 'Needs to be visited again' ?

                        <Col xs="6">
                        <FormGroup>

                        <h5><Label htmlFor="callrescheduledate">Call Reschedule  Date</Label></h5>
                  <Input type="date" id="callrescheduledate" name="callrescheduledate" value={this.state.callrescheduledate} onChange={event => this.setState({callrescheduledate: event.target.value})}></Input>
                  </FormGroup>
                        </Col>:null
                     }
                     {
                        this.state.statusofcomplaint === 'Under-Repaired' ?

                        <Col xs="6">
                        <FormGroup>
                        <h5><Label htmlFor="callrescheduledate">Call Reschedule  Date</Label></h5>
                  <Input type="date" id="callrescheduledate" name="callrescheduledate" value={this.state.callrescheduledate} onChange={event => this.setState({callrescheduledate: event.target.value})}></Input>
                  </FormGroup>
                        </Col>:null
                     }

                     {
                        this.state.statusofcomplaint === 'Spare part Required' ?

                        <Col xs="6">
                        <FormGroup>
                        <h5> <Label htmlFor="callrescheduledate">Call Reschedule  Date</Label></h5>
                  <Input type="date" id="callrescheduledate" name="callrescheduledate" value={this.state.callrescheduledate} onChange={event => this.setState({callrescheduledate: event.target.value})}></Input>
                      </FormGroup>
                        </Col>:null
                     }

                     {
                        this.state.statusofcomplaint === 'System sent to factory for repair' ?

                        <Col xs="6">
                        <FormGroup>
                        <h5> <Label htmlFor="callrescheduledate">Call Reschedule  Date</Label></h5>
                  <Input type="date" id="callrescheduledate" name="callrescheduledate" value={this.state.callrescheduledate} onChange={event => this.setState({callrescheduledate: event.target.value})}></Input>
                  </FormGroup>
                        </Col>:null
                     }

                     {
                        this.state.statusofcomplaint === 'Other' ?

                        <Col xs="6">
                        <FormGroup>
                        <h5><Label htmlFor="callattendingdate">Specify Reason</Label></h5>
                  <Input type="text" id="reason" name="reason" value={this.state.callvisitdate} onChange={event => this.setState({reason: event.target.value})}></Input>
                  </FormGroup>
                        <FormGroup>
                        <h5> <Label htmlFor="callrescheduledate">Call Reschedule  Date</Label></h5>
                  <Input type="date" id="callrescheduledate" name="callrescheduledate" value={this.state.callrescheduledate} onChange={event => this.setState({callrescheduledate: event.target.value})}></Input>
                  </FormGroup>
                        </Col>:null
                     }



                  </FormGroup>


                <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>&nbsp;
                <Button type="reset" size="md" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                </Form>
        </CardBody>

        </Card>

     );
    }
}
export default RegenaratedPendingCalls;
