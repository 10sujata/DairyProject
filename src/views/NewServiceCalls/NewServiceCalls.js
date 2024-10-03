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

class NewServiceCalls extends Component {
    constructor(props) {
        super(props);

        this.state = {
           callassignedby: '',
           callassign: '',
           calllogdate: '',
           callvisitdate: '',
           cityofservice: '',
           personaddress: '',
           personcity: '',
           personcountry: '',
           personemail: '',
           persongstin: '',
           personname: '',
           name: '',
           allClients: [],
           personstate: '',
           value: '',
           desc1: '',
           allCategories: [],
           product_category:'',
           productdescription:[],
           product_description:'',
           reportStartDate: '',
           address: '',
           region: '',
           customername: '',
           selectValue: "",
           status_of_complaint:"",
           isdeleted:'active',
        };

        this.submitData = this.submitData.bind(this);
        this.inputassignedname = this.inputassignedname.bind(this);
        this.inputcityofservice = this.inputcityofservice.bind(this);
        this.inputrepname = this.inputrepname.bind(this);
        this.inputActivationperiodfrom = this.inputActivationperiodfrom.bind(this);
      }

      inputActivationperiodfrom(e) {
        this.setState({calllogdate: e.target.value});
      }

      handleChange = date => {
        this.setState({
          startDate: date
        });
      };

    componentDidMount() {
        const isLoggedIn = localStorage.getItem("appState");
        console.log("cfdsfff",isLoggedIn);
        const {id} = this.props.match.params;
        const _this = this;


        const userref3 =  firebaseConfig.database().ref(`/Users/` + isLoggedIn);
        userref3.on("value", snapshot =>{
           let allUsers = snapshot.val();
            this.setState({
              assignname: allUsers.Name,

            });
          })

        const userref =  firebaseConfig.database().ref(`/Users/` + id);
        userref.on("value", snapshot =>{
           let allUsers = snapshot.val();
            this.setState({
              name: allUsers.Name,
              region: allUsers.Region,
            });
          })

          const userref1 =  firebaseConfig.database().ref(`/Clients/`);

          userref1.on("value", snapshot1 =>{
            let allUsers1 = snapshot1.val();

            let newClient = [];
            for(let user in allUsers1){
                newClient.push({
                id: user,
                Name: allUsers1[user].PartyName,
              });
            }

            this.setState({
              allClients: newClient
            });
          })


          const userref2 =  firebaseConfig.database().ref(`/Product Category/`);

          userref2.on("value", snapshot2 =>{
            let allUsers2 = snapshot2.val();
            let newClient2 = [];
            for(let user2 in allUsers2){
                newClient2.push({
                id: user2,
                Name: allUsers2[user2].CategoryName,
              });
            }

            this.setState({
              allCategories: newClient2
            });
          })


      }

    submitData(e) {
      e.preventDefault();
      var someDate = new Date();
      someDate.setDate(someDate.getDate());
      // var date = someDate.toISOString().replace(/T.*/,'').split('-').reverse().join('-');
       var date = someDate.toISOString().substr(0, 10);


      if(this.state.calllogdate==""){
        this.state.calllogdate=date;
      }

      let visitnew = new Date(this.state.callvisitdate);
      visitnew.setDate(visitnew.getDate());
      var v1 = visitnew.toISOString().replace(/T.*/,'').split('-').reverse().join('-');
      this.state.callvisitdate=v1

      const {id} = this.props.match.params;
      const _this = this;
      const { isdeleted,assignname,calllogdate,callvisitdate,cityofservice,personaddress,personcity,personcountry,personemail,persongstin,customername,personname,personstate,name,selectValue,product_category,product_description,region} = this.state;
        e.preventDefault();
        const key = firebaseConfig.database()
     .ref('Calls')
     .push().key;
   return firebaseConfig.database()
     .ref('Calls/' + key)
     .set({
       unique_id: key,
       call_assigned_by: assignname,
       call_assigned_to: name,
       call_log_date: calllogdate,
       call_visit_date: callvisitdate,
       city_of_service: cityofservice,
       customer_address: personaddress,
       customer_city: personcity,
       customer_country:personcountry,
       customer_Email_Id:personemail,
       customer_Gst_In:persongstin,
       customer_name:customername,
       customer_rep_name:personname,
       customer_state:personstate,
       name_of_service_engineer:name,
       product_category:product_category,
       product_description:product_description,
       region_of_service_engineer:region,
       user_uid:id,
       status_of_complaint:"empty",
       Isdeleted:isdeleted,

     })
     .then(() => this.setState({
       redirect: true,
     }));
 }


     quan (selectedOption) {
      const clinetid =   firebaseConfig.database().ref(`/Clients/`+ selectedOption.value);
      clinetid.on("value", snapdata => {
        let allclients = snapdata.val();

          this.setState({
            personname: allclients.PersonName,
            personemail: allclients.EmailID,
            personaddress: allclients.Address,
            personcity: allclients.City,
            personcountry: allclients.Country,
            persongstin: allclients.GSTINNo,
            personstate: allclients.State,
            customername: selectedOption.label,
          });
    })

    };

      categorychange(selectedOption) {

      const categoryid =   firebaseConfig.database().ref(`/Product Category/`+ selectedOption.value);

      categoryid.on("value", snapdata => {
      let allclients = snapdata.val();

        this.setState({
            productdescription: allclients.ProductDescription,
            product_category: selectedOption.label,
        });

      })
    };


      descchange(selectedOption) {
        this.setState({
            product_description: selectedOption.label,
        });

      };


    inputassignedname(e) {
      this.setState({callassignedby: e.target.value});
    }



    inputcityofservice(e){
      this.setState({cityofservice: e.target.value});
    }

    inputrepname(e){
      this.setState({personname: e.target.value});
    }

 render() {
  const {step} = this.state;
  const { redirect } = this.state;
  if (redirect) {
    return <Redirect to="/callstoattendlist" />;
  }


  var someDate = new Date();
  someDate.setDate(someDate.getDate());
  var date = someDate.toISOString().substr(0, 10);

    let options = [];
    let categories = [];
    let description = [];

    this.state.allClients.map(item =>
    options.push({ label: item.Name, value: item.id }),
    );
    const defaultOption = options[0];


    this.state.allCategories.map(item =>
      categories.push({ label: item.Name, value: item.id }),
    );
    const defaultOption1 = categories[0];


    this.state.productdescription.map(item =>
      description.push({ label: item, value: item }),
    );
    const defaultOption2 = description[0];


      return(

        <Container>
        <Row className="justify-content-center">
        <Col xs="12" sm="12">
        <Card>
        <CardHeader>
                <strong>New Service</strong>
                <small> Call</small>
        </CardHeader>
        <CardBody>

        <Form onSubmit={this.submitData}>
                <FormGroup>
                    <Col md="12">
                      <strong><Label>Type Of Service Call</Label> *</strong>
                    </Col>
                    <Col md="12">
                      <FormGroup check inline required>
                        <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1" />
                        <Label className="form-check-label" check htmlFor="inline-checkbox1">Service</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="checkbox" id="inline-checkbox2" name="inline-checkbox2" value="option2" />
                        <Label className="form-check-label" check htmlFor="inline-checkbox2">Repair</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="checkbox" id="inline-checkbox3" name="inline-checkbox3" value="option3" />
                        <Label className="form-check-label" check htmlFor="inline-checkbox3">Installation and Commissioning</Label>
                      </FormGroup>
                    </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                <Col xs="6">
                <FormGroup>
                <Label htmlFor="nameofserviceengineer">Name Of Service Engineer</Label>
                  <Input type="text" value={this.state.name} readOnly/>
                </FormGroup>
                </Col>
                <Col xs="6">
                <FormGroup>
                  <Label htmlFor="regionofserviceengineer">Region Of Service Engineer</Label>
                  <Input type="text" value={this.state.region} />
                </FormGroup>
                </Col>
                </FormGroup>

                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="phone">City Of Service</Label>
                      <Input type="text" value={this.state.cityofservice} name ="cityofservice" id="cityofservice"  placeholder="City Of Service" onChange={this.inputcityofservice} />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                  <FormGroup>
                  <Label htmlFor="customername">Customer Name</Label>
                  <Select type="select" id="customername" name="customername"  onChange={this.quan.bind(this)} options={options}></Select>
                </FormGroup>
                  </Col>
                </FormGroup>


                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="representativename">Customer Representative Name</Label>
                      <Input type="text" name ="personname" id="personname"  value={this.state.personname} onChange={this.inputrepname}/>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                  <FormGroup>
                      <Label htmlFor="emailid">Email Id</Label>
                      <Input type="text" name ="personemail" id="personemail"  value={this.state.personemail}/>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="address">Address</Label>
                      <Input type="text" name ="personaddress" id="personaddress"  placeholder="Address" onChange={this.inputPhone} value={this.state.personaddress} />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                  <FormGroup>
                      <Label htmlFor="gstno">GSTINNO</Label>
                      <Input type="text" name ="gstinno" id="gstinno"  placeholder="GSTINNO" onChange={this.inputPhone} value={this.state.persongstin}/>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="city">City</Label>
                      <Input type="text" name ="personcity" id="personcity"  value={this.state.personcity}/>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                  <FormGroup>
                      <Label htmlFor="personstate">State</Label>
                      <Input type="text" name ="personstate" id="personstate"  value={this.state.personstate}/>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="personcountry">Country</Label>
                      <Input type="text" name ="personcountry" id="personcountry"  value={this.state.personcountry} />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                  <FormGroup>
                      <Label htmlFor="productcategory">Product Category</Label>
                      <Select type="select" id="product_category" onChange={this.categorychange.bind(this)}  name="product_category" options={categories}>
                      </Select>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row className="my-0">
                  <Col xs="6">
                  <FormGroup>
                      <Label htmlFor="productdescription">Product Description</Label>
                      <Select type="select" id="product_description" name="product_description" onChange={this.descchange.bind(this)} options={description}></Select>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                  <FormGroup>
                      <Label htmlFor="calllogdate">Call Log Date</Label>

                      <Input type="date" defaultValue={date} onChange={this.inputActivationperiodfrom} />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="callassign">Call Assigned To</Label>
                      <Input type="text" id="callassign" name="callassign" value={this.state.name}></Input>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                  <FormGroup>
                      <Label htmlFor="callassignedby">Call Assigned By</Label>
                      <Input type="text" id="callassignedby" value={this.state.assignname} name="callassignedby"></Input>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="callvisitdate">Call Visit Date</Label>
                      <Input type="date" id="callvisitdate" name="callvisitdate" value={this.state.callvisitdate} onChange={event => this.setState({callvisitdate: event.target.value})}></Input>
                    </FormGroup>
                  </Col>
                </FormGroup>


                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>&nbsp;
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                </Form>
        </CardBody>

        </Card>
        </Col>
        </Row>
        </Container>


     );
    }


}
export default NewServiceCalls;
