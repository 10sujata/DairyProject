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



class CallAttend extends Component {
    constructor(props) {
        super(props);
        this.state = {
           productname: '',
           allProducts: [],
           allCategories:[],
           allUsersList:[],
           categorydec: [
               ''
           ],
           productserialno: '',
           engineerintime: '',
           callattendingdate: '',
           callrescheduledate:'',
           invoiceno:'',
           natureofcomplaint:'',
           detailsofcomplaint:[],
           engineersobservation:[],
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
           clientremark: '',
           url: '',
           callassignto:'',

        };
        this.natureofcomplaint = this.natureofcomplaint.bind(this);
        this.statusofcomplaint = this.statusofcomplaint.bind(this);
        this.modeofpayment = this.modeofpayment.bind(this);
        this.detailsofcomplaint = this.detailsofcomplaint.bind(this);
        this.invoiceno = this.invoiceno.bind(this);
        this.servicecharge1 = this.servicecharge1.bind(this);
        this.engineersobservation = this.engineersobservation.bind(this);
        this.clientremark = this.clientremark.bind(this);
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
          let errors = {};
            const {image} = e.target.files[0];

            this.setState({
              image: e.target.files[0]
            });

            // console.log(e.target.files[0]);
        }
      }

      clientremark(e) {
        this.setState({clientremark: e.target.value});
      }

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
        userref.on("value", snapshot =>{
           let allUsers = snapshot.val();


          //  console.log("new data",allUsers);

            this.setState({
                productcategory: allUsers.product_category,
                productdescription: allUsers.product_description,
                call_assigned_by: allUsers.call_assigned_by,
                call_assigned_to: allUsers.call_assigned_to,
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
                userid: allUsers.user_uid,

            });
      })


            const userref2 =  firebaseConfig.database().ref(`/Product Category/`);

            userref2.on("value", snapshot2 =>{
            let allUsers2 = snapshot2.val();
                // console.log("category name",allUsers2);
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


    submitData(e) {
      e.preventDefault();
      const isLoggedIn = localStorage.getItem("appState");
        const {id} = this.props.match.params;
        const {image} = this.state;
      const storage = firebaseConfig.storage();
      let image_url;



        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed',
        (snapshot)=>{

        },
        (error) => {
          alert("Please Select Image")
        },
        () => {
          const { callassignto,categorydec,userid,call_assigned_by, call_assigned_to ,callattendingdate,call_log_date,callrescheduledate,customer_city,customer_country,customer_Email_Id,customer_name,customer_rep_name,customer_state,detailsofcomplaint,engineerintime,engineersobservation,invoiceno,name_of_service_engineer,natureofcomplaint,productname,product_category,product_description,productserialno,region_of_service_engineer,statusofcomplaint,servicecharge,servicecharge1,expensecharge,expensecharge1,foc,foc1,modeofpayment,clientremark} = this.state;
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
          let opjectval = {
            unique_id:id,
            call_assigned_by: call_assigned_by,
            call_assigned_to: call_assigned_to,
            callattendingdate: callattendingdate,
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
            engineersobservation: categorydec,
            invoiceno: invoiceno,
            name_of_service_engineer:name_of_service_engineer,
            natureofcomplaint: natureofcomplaint,
            product_category:product_category,
            product_description:product_description,
            productname: productname,
            productserialno:productserialno,
            region_of_service_engineer: region_of_service_engineer,
            status_of_complaint: statusofcomplaint,
            servicecharge1: servicecharge1,
            expensecharge1: expensecharge1,
            foc1: foc1,
            servicecharge: servicecharge,
            expensecharge: expensecharge,
            foc: foc,
            clientremark: clientremark,
            modeofpayment: modeofpayment,
            image: url,
            user_uid:callassignto,

          }

      //  console.log("object data",opjectval);
          firebaseConfig
          .database()
          .ref(`/Calls/`+id)
          .update(opjectval)
        }).then(() => this.setState({
          redirect: true,
        }));

      })
    }

    productchange(selectedOption) {
        this.setState({
            productname: selectedOption.label,
        });

    }

    callchange(selectedOption) {
      const categoryid =   firebaseConfig.database().ref(`/Users/`+ selectedOption.value);

      categoryid.on("value", snapdata => {
      let allclients = snapdata.val();
        this.setState({
            call_assigned_to: allclients.Name,
            name_of_service_engineer: allclients.Name,
            region_of_service_engineer:allclients.Region


        });
      })

      this.setState({
          callassignto: selectedOption.value,
      });

  }

 render() {
  //  console.log("vdnsfvsd",this.state);

  const {step} = this.state;
  const { redirect } = this.state;
  if (redirect) {
    if(this.state.statusofcomplaint==="Completed"){
      return <Redirect to="/completedcalls" />;
    }
    else {
      return <Redirect to="/pendingcalls" />;
    }

  }
  let variable = this.state.productcategory;

  

   let options = [];
   let useroption = [];

    this.state.allCategories.map((item) => {
        if(item.Name===variable)
        {
            item.ProductName.map(item =>
                options.push({ label: item, value: item })
            );

        }
    });
    const defaultOption = options[0];

    this.state.allUsersList.map((item) => {
          useroption.push({ label: item.Name, value: item.id });
  });
  const defaultOption1 = useroption[0];




      return(

        <Card>
        <CardHeader>
                <h2>Call Attend</h2>

        </CardHeader>
        <CardBody>

        <Form onSubmit={this.submitData}>

                <FormGroup row className="my-0">
                  <Col xs="4">
                    <FormGroup>
                    <h5><Label htmlFor="callassignedto">Assigned Call To Another Engineer</Label></h5>
                      <Select type="select" id="callassignto" onChange={this.callchange.bind(this)} name="callassignto" options={useroption}>
                      </Select>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                  <FormGroup>
                  <h5><Label htmlFor="productname">Product Name</Label></h5>
                  <Select type="select" id="productname" name="productname" onChange={this.productchange.bind(this)} options={options}></Select>
                </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                    <h5><Label htmlFor="productserialno">Product Serial No</Label></h5>
                      <Input type="text" value={this.state.productserialno} name ="productserialno" id="productserialno"  placeholder="Product Serial No" onChange={this.productserialno} />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="engineerintime">Engineer's In-Time</Label></h5>
    {/* <Input type="time" step="1" value={this.state.time}   onChange={(ev) => {this.setState({time:ev.target.value})}/> */}
          <Input type="time" step="1" value={this.state.time} name ="serialno" id="serialno"  placeholder="Product Serial No"/>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="callattendingdate">Call Attending Date</Label></h5>
                  <Input type="date" id="callattendingdate" name="callattendingdate" value={this.state.callattendingdate} onChange={event => this.setState({callattendingdate: event.target.value})}></Input>
                  </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                    <h5> <Label htmlFor="invoiceno">Invoice No of BST ELtromat(Optional)</Label></h5>
                      <Input type="text" name ="invoiceno" id="invoiceno"  placeholder="Invoice No" onChange={this.invoiceno} value={this.state.invoiceno} />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="natureofcomplaint">Nature Of Complaint</Label></h5>
                      <Input type="select" value={this.state.natureofcomplaint} name="select" id="select" onChange={this.natureofcomplaint}>
                        <option value="0">Please Select</option>
                        <option value="servicecall">Service Call</option>
                        <option value="serviceunderwarranty">Service Under Warranty</option>
                        <option value="installation">Installation/Commissioning</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                    <h5> <Label htmlFor="detailsofcomplaint">Details Of Complaint</Label> </h5>
                      <Input type="text" name ="detailsofcomplaint" id="detailsofcomplaint"  placeholder="Details Of Complaint" onChange={this.detailsofcomplaint} value={this.state.detailsofcomplaint}/>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                  <FormGroup>
                  <h5> <Label htmlFor="engineersobservation">Engineer's Observation/Action Taken</Label></h5>
                      {this.createUI()}
                    <Button type="button" size="md" color="primary" onClick={this.addClick.bind(this)}> Add Engineer Observation </Button>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                    <h5> <Label htmlFor="clientremark">Client Remark</Label></h5>
                      <Input type="text" name ="clientremark" id="clientremark"  placeholder="Client Remark" onChange={this.clientremark}  value={this.state.clientremark} />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                  <FormGroup>
                  <h5> <Label htmlFor="statusofcomplaint">Status Of Complaint</Label></h5>
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
                    <h5> <Label htmlFor="file-input">Image Upload</Label></h5>
                    </Col>
                    <Col xs="9" md="5">
                      <Input type="file" id="file-input" name="file-input" onChange={this.handleimagechange.bind(this)} required/>


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

                </Form>
        </CardBody>

        </Card>

     );
    }


}
export default CallAttend;
