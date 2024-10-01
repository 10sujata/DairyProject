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
import $ from 'jquery';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

class BillingMaster extends Component {

    constructor(props) {
        super(props);
        this.state = {
              farmercollectiondata:'',
              farmerdeductiondata:'',
              date:'',
              settingvalue:'',
              rmcucentername:'',
              centername:'',
              farmername:'',
              centernamenew:[],
              farmernamenew:[],
              allUsers:[],
              allUsers1:[],
              filteredUsers:[],
              allother:[],
              alltransaction:[],
              collectiondata:[],
              deductiondata:[],
              farmerarraydata :[],
              allfarmercollectionnewdata:[],
              allfarmercollectionnewdata1:[],
              allfarmercollectionnewdata2:[],  
              allcenternamearray:[],          
              fromdate:'',
              todate:'',
              billnumber:'',
              open: false,
              open1:false,
        };

        this.settingvalue = this.settingvalue.bind(this);
        this.Date = this.Date.bind(this);
        this.RMCUCentername= this.RMCUCentername.bind(this);
        this.CenterName= this.CenterName.bind(this);
        this.FarmerName= this.FarmerName.bind(this);
        this.FromDate = this.FromDate.bind(this);
        this.ToDate = this.ToDate.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onOpenModal1 = this.onOpenModal1.bind(this);
        this.submitData = this.submitData.bind(this);
      }

      componentDidMount(){
        axios.get(API_BASE_URL+'/dairylist')
        .then(response => {
          console.log("dairyresponse",response);
            this.setState({
              union_name:response.data.data[0].union_name,
              //centername: response.data.data[0].center_name,
            });

        })
        .catch(e => {

        });

        axios.get(API_BASE_URL+'/listbills')
        .then(response => {

          let user1 = response.data.data;
          let user2 = user1.length;
          console.log("bill list",user2);
            this.setState({
            billnumber1:user2,
          });


        })
        .catch(e => {

        });
      }

      onOpenModal1 = () => {
               
        axios.get(API_BASE_URL+'/listsociety')
        .then(response => {     
          this.setState({ allrmcudata: response.data.data });   
          let dataarray = response.data.data;
          let farmers = [];
          let farmers1 = [];
          let farmers2 = [];
          let centernamearray = [];
            for(let i=0; i<dataarray.length;i++){
            const rmcuid = dataarray[i].id;
          axios.get(API_BASE_URL+'/rmcucenter/' + rmcuid)
              .then(response => {               
                let dataarray1 = response.data.data;
             for(let j=0; j<dataarray1.length;j++){
              if(dataarray1[j].id!=""){
                const centerid = dataarray1[j].id;
                 centernamearray.push(dataarray1[j].center_name);
                axios.get(API_BASE_URL+'/centerfarmer/' + centerid)
                  .then(response => {
                    let dataarray2 = response.data.data;
                    for(let k=0; k<dataarray2.length;k++){
                      if(dataarray2[j].id!=""){
                        const farmerid = dataarray2[k].farmer_number;
                        axios.get(API_BASE_URL+'/farmercollectiondata/' + farmerid)
                          .then(response => {  
                            if(response.data.data[0]!="undefined"){
                              farmers.push(response.data.data[0]);
                              farmers1.push(response.data.data1[0]); 
                              farmers2.push(response.data.data2[0]);
                             
                            }
                                                                                                              
                          })                        
                      }
                    }
                      
                  })
              }                  
          }
      })
               
              
    }
       
    this.setState({ 
      allfarmercollectionnewdata: farmers,
      allcenternamearray:centernamearray,
      allfarmercollectionnewdata1:farmers1,
      allfarmercollectionnewdata2:farmers2
    }); 
                        
    })
    

    setTimeout(() => {
      this.setState({open1: true});
    }, 8000)    
       
    }


      onOpenModal = () => {
        this.setState({ open: true });
        let id= this.state.farmernumber;
        axios.get(API_BASE_URL+'/farmercollectiondata1/' + id)
         .then(response => {
           let allcattletype = response.data.data;
           let cattlevalue = '';
           for(let user in allcattletype){
             cattlevalue = allcattletype[user].cattletype
           }

           let arraydata = response.data.data;

           let arraydatacount = (arraydata.length);
           let sum4 = arraydata.reduce(function(prev, current) {
           return prev + +current.amount
          }, 0);


           let sum = arraydata.reduce(function(prev, current) {
           return prev + +current.weight
          }, 0);


          let sum1 = arraydata.reduce(function(prev, current) {
          return prev + +current.fat
         }, 0);

         let sum2 = arraydata.reduce(function(prev, current) {
         return prev + +current.snf
        }, 0);

        let sum3 = arraydata.reduce(function(prev, current) {
        return prev + +current.lacto
       }, 0);
            console.log("lacto value",sum3);
          this.setState({
            totalneweight: (sum).toFixed(2),
            totalamount:(sum4).toFixed(2),
            fatavg:(sum1/arraydatacount).toFixed(1),
            snfavg:(sum2/arraydatacount).toFixed(1),
            lactoavg:(sum3/arraydatacount).toFixed(1),
            collectiondata:response.data.data,
            cattlevalue1:cattlevalue
          });

      })

         axios.get(API_BASE_URL+'/farmerdeductiondata/' + id)
          .then(response => {
            let arraydata = response.data.data;
            let sum4 = arraydata.reduce(function(prev, current) {
            return prev + +current.amount
           }, 0);

            this.setState({
              deductiondata: response.data.data,
              deductionamounttotal:sum4
            })

          })
      }

       FromDate(e) {
         this.setState({ fromdate: e.target.value });
      }

      ToDate(e) {
        this.setState({ todate: e.target.value });
     }

    CenterName(e) {
          console.log("rmcu id",e.target.value);
          this.setState({
            centername: e.target.value,

          });

          axios.get(API_BASE_URL+'/centernewnumber/' + e.target.value)
           .then(response => {
             console.log("center id",response);
                this.setState({
                  centernewnumber: response.data.data[0].center_number,
                  centername1 :response.data.data[0].center_name
               });
        })

          axios.get(API_BASE_URL+'/centerfarmer/' + e.target.value)
           .then(response => {
             console.log("center id",response);
                this.setState({
                  farmernamenew: response.data.data,
               });
        })
    }

    RMCUCentername(e) {
      console.log("rmcu id",e.target.value);
      this.setState({
        rmcucentername: e.target.value,

      });

          axios.get(API_BASE_URL+'/rmcunewnumber/' + e.target.value)
           .then(response => {
             console.log("center id",response);
                this.setState({
                  rmcunnewnumber: response.data.data[0].society_number,
               });
        })

          axios.get(API_BASE_URL+'/rmcucenter/' + e.target.value)
           .then(response => {
             console.log("center id",response);
                this.setState({
                  centernamenew: response.data.data,
               });
        })

    }

    settingvalue(e) {
      if(e.target.value==="center"){
        axios.get(API_BASE_URL+'/listcenter')
        .then(response => {
            this.setState({
              allUsers1: response.data.data,
              modalState: !this.state.modalState
            });
            console.log("response",response.data);

        })
        .catch(e => {

        });
      }
      else if(e.target.value==="rmcu"){
        axios.get(API_BASE_URL+'/listsociety')
        .then(response => {
            this.setState({ allUsers: response.data.data });
            console.log("response",response.data);

        })
        .catch(e => {

        });
      }

      this.setState({ settingvalue: e.target.value });
  }

      submitData(e) {
        e.preventDefault();
        axios.post(API_BASE_URL+'/billform',{
         farmernumber: this.state.farmernumber,

      })
    }
    FarmerName(e){
      this.setState({ farmername: e.target.value });

      axios.get(API_BASE_URL+'/editfarmernew/' + e.target.value)
       .then(response => {
         console.log("dbfhdsfs",response);
         this.setState({
           farmername1: response.data.data[0].farmername,
           farmernumber: response.data.data[0].farmer_number,

         })

       })
    }


      Date(e) {
        this.setState({date: e.target.value});
      }
      onCloseModal = () => {
        this.setState({ open: false });
      };

      onCloseModal1 = () => {
        this.setState({ open1: false });
      };


    render() {
      const { allcenternamearray,allfarmercollectionnewdata,allfarmercollectionnewdata1,allfarmercollectionnewdata2,farmercdata,billnumber1,open1,deductiondata,farmernamenew,centernamenew,open,filteredUsers,opennew,alltransaction,allother,collectiondata } = this.state;
    this.state.billnumber = "000"+(Number(this.state.billnumber1)+1);
     
   
      console.log("dsdsdssdeer",allfarmercollectionnewdata);
      let filtered = allfarmercollectionnewdata.filter(function(x) {
        return x !== undefined;
     });

     let filtered1 = allfarmercollectionnewdata1.filter(function(x) {
          return x !== undefined;
      });

      let filtered2 = allfarmercollectionnewdata2.filter(function(x) {
        return x !== undefined;
    });

     
     let arr3 = filtered.map((item, i) => Object.assign({}, item, filtered1[i],filtered2[i]));
    
     console.log("filtered",arr3);
        let userList = allother.length > 0
        && allother.map((item, i) => {
        return (
          <option key={i} value={item.id} >{item.deduction_name}</option>
        )
      }, this);

      let farmerlist = farmernamenew.length > 0
      && farmernamenew.map((item, i) => {
      return (
        <option key={i} value={item.id} >{item.farmername}</option>
      )
    }, this);

        let centerlist = centernamenew.length > 0
        && centernamenew.map((item, i) => {
        return (
          <option key={i} value={item.id} >{item.center_name}</option>
        )
      }, this);

      let abxd = Object.keys(filteredUsers).length;
      let abxd2 = Object.keys(allfarmercollectionnewdata).length;
      console.log("xsaas",abxd2);
      let currentTodos;
        currentTodos = filteredUsers;
       const renderTodos = currentTodos.map((partners, index) => {

        return <tr key={partners.id}>
        <td>
            {partners.farmer_number}
        </td>
        <td>
        {partners.farmername}
        </td>
    </tr>
      });

      const renderTodos3 = collectiondata.map((partners, index) => {

        return <tr key={partners.id}>
        <td>
            {partners.cattletype}
        </td>


    </tr>;

      });

    

      const renderTodos2 = deductiondata.map((partners, index) => {

       return <tr key={partners.id}>
       <td>
           {partners.id}
       </td>
       <td>
       {partners.deductionname}
       </td>
       <td>
       {partners.deductionmethod}
       </td>
       <td>
       {partners.amount}
       </td>
   </tr>
     });


  

      const { redirect,items} = this.state;
           
    

        if (redirect) {
          return <Redirect to="/ratechartmaster" />;
        }
        var someDate = new Date();
        someDate.setDate(someDate.getDate());
        var date = someDate.toISOString().substr(0, 10);
        var defaults1 = "0";

        const {cattletype,settingvalue,allUsers,allUsers1} = this.state;
            let rmcuList = allUsers.length > 0
            && allUsers.map((item, i) => {
            return (
              <option key={i} value={item.id} >{item.society_name}</option>
            )
          }, this);

          let rmcuList1 = allUsers1.length > 0
          && allUsers1.map((item, i) => {
          return (
            <option key={i} value={item.id} >{item.center_name}</option>
          )
        }, this);
            
        let paypabalamount = Number(this.state.totalamount) - Number(this.state.deductionamounttotal);

     return(

        <Container className="collectionconatiner">
          <Form className="bill-modal">
          <Row>
          <Col xs="12" sm="12">
          <div className='main'>
                <Notifications options={{zIndex: 200, top: '120px'}} />
          </div>
          <Modal className="billing-modal" open={open1} onClose={this.onCloseModal1} center>
          <Row gutter={20}>
              <Col lg="12" md="12">
                  <div className="billdiv">
                    <h5 className="modal-title" align="center">{this.state.union_name}</h5><br />                                      
                      <h5 className="modal-title" align="center"></h5>                                       
                  </div>
              </Col>
             

              <Col lg="6">
                  <div className="date-area">
                        <div className="date-area-left">
                        <h5><Label htmlFor="chartname">Bill Date *</Label></h5>
                    </div>
                    <div className="date-area-right">
                        <Label htmlFor="chartname">{date}</Label>
                    </div>
                  </div>
              </Col>

              <Col lg="6">
                  <div className="date-area">
                        <div className="date-area-left">
                        <h5><Label htmlFor="chartname">Billing Number *</Label></h5>
                    </div>
                    <div className="date-area-right">
                        <Label htmlFor="chartname">{this.state.billnumber}</Label>
                    </div>
                  </div>
              </Col>
                           

              <Col lg="6">
                  <div className="date-area">
                        <div className="date-area-left">
                        <h5><Label htmlFor="chartname">Billing Period *</Label></h5>
                    </div>
                    <div className="date-area-right">
                        <Label htmlFor="chartname">{this.state.fromdate} to {this.state.todate}</Label>
                    </div>
                  </div>
              </Col>

          </Row>
         
          {arr3.map((item, i) => {
           let total = item.sum_of_amount;
           let total1 = item.sum_of_saleamount;
           let totalvalue= Number(total)+Number(total1);
           let collectionvalue = Number(item.sum_of_collectionamount);
           let newtotal = (Number(collectionvalue)-Number(totalvalue)||item.sum_of_collectionamount);
          
                        return (                  
                          <div>
                          <Row gutter={20}>  
                            <Col lg="6">
                              <div className="date-area">
                                    <div className="date-area-left">
                                    <h5><Label htmlFor="chartname">Society Name-Number</Label></h5>
                                </div>
                                <div className="date-area-right">                                                         
                                <Label htmlFor="chartname"></Label>
                                </div>
                              </div>
                            </Col>

                            <Col lg="6">
                            <div className="date-area">
                                  <div className="date-area-left">
                                  <h5><Label htmlFor="chartname">Center Name-Number</Label></h5>
                              </div>
                              <div className="date-area-right">
                                  <Label htmlFor="chartname">{item.centername}-{item.centerid}</Label>
                              </div>
                            </div>
                          </Col>
                          </Row>
                          <Row gutter={20}>
                          <Table responsive bordered>
                
                              <thead>
                              <tr>
                                <th>Farmer No</th>
                                <th>FarmerName</th>
                                <th>Milk Pour (ltr) </th>
                                <th>Milk Amount</th>
                                <th>Deduction Amount</th>
                                <th>Sale Transaction Amount</th>
                                <th>Total Bill Amount</th>
                
                              </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{item.farmernumber}</td>
                                  <td>{item.farmername}</td>
                                  <td>{item.sum_of_weight}</td>
                                  <td>{item.sum_of_collectionamount.toFixed(2)}</td>
                                  <td>{item.sum_of_amount||0}</td>
                                  <td>{item.sum_of_saleamount||0}</td>
                                  <td>{newtotal.toFixed(2)}</td>
                                </tr>
                              </tbody>
                              </Table>
                
                          </Row>                                                                       
                              </div>
                        )
                      }, this)}                 
          
          
               
            
                  
        
          </Modal>
          <Modal open={open} onClose={this.onCloseModal} center>
          <Form onSubmit={this.submitData}>
          <Row gutter={20}>
              <Col lg="12" md="12">
                  <div className="billdiv">
                    <h5 className="modal-title" align="center">{this.state.union_name}</h5><br />
                    <h5 className="modal-title" align="center">{this.state.centername1}</h5>
                  </div>
              </Col>
              <Col lg="6">
                  <div className="date-area">
                        <div className="date-area-left">
                        <h5><Label htmlFor="chartname">Bill Date *</Label></h5>
                    </div>
                    <div className="date-area-right">
                        <Label htmlFor="chartname">{date}</Label>
                    </div>
                  </div>
              </Col>
              <Col lg="6">
                  <div className="date-area">
                        <div className="date-area-left">
                        <h5><Label htmlFor="chartname">Bill Number *</Label></h5>
                    </div>
                    <div className="date-area-right">
                        <Label htmlFor="chartname">{this.state.billnumber}</Label>
                    </div>
                  </div>
              </Col>

              <Col lg="6">
                  <div className="date-area">
                        <div className="date-area-left">
                        <h5><Label htmlFor="chartname">Billing Period *</Label></h5>
                    </div>
                    <div className="date-area-right">
                        <Label htmlFor="chartname">{this.state.fromdate} to {this.state.todate}</Label>
                    </div>
                  </div>
              </Col>

          </Row>

          <Row gutter={20}>
              <Col lg="6">
                  <div className="date-area">
                        <div className="date-area-left">
                        <h5><Label htmlFor="chartname">Farmer Name *</Label></h5>
                    </div>
                    <div className="date-area-right">
                        <Label htmlFor="chartname">{this.state.farmername1}</Label>
                    </div>
                  </div>
              </Col>
              <Col lg="6">
                  <div className="date-area">
                        <div className="date-area-left">
                        <h5><Label htmlFor="chartname">Farmer Number *</Label></h5>
                    </div>
                    <div className="date-area-right">
                        <Label htmlFor="chartname">{this.state.farmernumber}</Label>
                    </div>
                  </div>
              </Col>
          </Row>

          <Row gutter={20}>
          <h5>Milk Collection Details</h5>
          <Table responsive bordered>

            <thead>
            <tr>
              <th>Cattle Type</th>
              <th>Avg FAT</th>
              <th>Avg SNF </th>
              <th>Avg Lacto</th>
              <th>Total Milk </th>
              <th>Amount</th>

            </tr>
            </thead>
          <tbody>
          <tr>
              <td>{this.state.cattlevalue1}</td>
              <td>{this.state.fatavg}</td>
              <td>{this.state.snfavg}</td>
              <td>{this.state.lactoavg}</td>
              <td>{this.state.totalneweight}</td>
              <td>{this.state.totalamount}</td>

          </tr>
         </tbody>
          </Table>
          </Row>
          <Row gutter={20}>
            <h5>Deduction Details</h5>
          <Table responsive bordered>

            <thead>
            <tr>
              <th>id</th>
              <th>Deduction Type</th>
              <th>Deduction Details </th>
              <th>Amount</th>

            </tr>
            </thead>
          <tbody>
            {renderTodos2}
         </tbody>
          </Table>

          </Row>
          <Row gutter={20} className="firstnewrow">
            <Col lg="2" className="colclass">Milk Amount(Ltr) </Col>
            <Col lg="2" className="colclass">{this.state.totalamount}</Col>
            <Col lg="2" className="colclass">Deduction Amount</Col>
            <Col lg="2" className="colclass">{this.state.deductionamounttotal}</Col>
            <Col lg="2" className="colclass">Total Payable Amount</Col>
            <Col lg="2">{paypabalamount}</Col>
          </Row><br /><br />
          <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>&nbsp;&nbsp;
            </Form>
          </Modal>

          <Card className="new1">

          <CardBody className="cardnewclass1" align="center">

        <FormGroup row className="my-0">
        <CardBody>
        <FormGroup check inline>
          <Label className="form-check-label" check htmlFor="settingvalue">From Date</Label>
          <Input className="form-check-input" type="date" id="fromdate" name="fromdate" onChange={this.FromDate} value={this.state.fromdate}/>
        </FormGroup>
        <FormGroup check inline>
          <Label className="form-check-label" check htmlFor="settingvalue">To Date</Label>
          <Input className="form-check-input" type="date" id="todate" name="todate" onChange={this.ToDate}  value={this.state.todate}/>
        </FormGroup><br/><br/>
        <FormGroup check inline>
          <Input className="form-check-input" type="radio" id="settingvalue" name="settingvalue" onChange={this.settingvalue} value="rmcu"/>
          <Label className="form-check-label" check htmlFor="settingvalue">Individual</Label>
        </FormGroup>
        <FormGroup check inline>
          <Input className="form-check-input" type="radio" id="settingvalue" name="settingvalue" onChange={this.settingvalue}  value="center"/>
          <Label className="form-check-label" check htmlFor="settingvalue">All</Label>
        </FormGroup><br/><br/>

        {this.state.settingvalue==="rmcu" ? (
          <div>
          <Input type="select" name ="select" id="select" value={this.state.rmcucentername} onChange={this.RMCUCentername}>
          <option value="1">Please Select RMCU</option>
          {rmcuList}
          </Input><br />
          <Input type="select" name ="select" id="select" value={this.state.centername} onChange={this.CenterName}>
          <option value="select">Please Select Center</option>
          {centerlist}
          </Input><br />
          <Input type="select" name ="select" id="select" value={this.state.farmername} onChange={this.FarmerName}>
          <option value="select">Please Select Farmer</option>
          {farmerlist}
          </Input>
          </div>
        ) : this.state.settingvalue==="center" ? (
          <Button align="center" className="billbutton" size="md" color="primary" onClick={(event)=> this.onOpenModal1()}><i className="fa fa-dot-circle-o tab-button"></i> Generate Bill</Button>
        ) : (
          ""
        ) }
        {this.state.settingvalue==="" ?(
          ''
        ):(this.state.rmcucentername==="" || this.state.centername==="" || this.state.farmername==="" || this.state.settingvalue==="center" ) ? (
          ''
        ) : (
          <Button align="center" className="billbutton" size="md" color="primary" onClick={(event)=> this.onOpenModal()}><i className="fa fa-dot-circle-o tab-button"></i> Generate Bill</Button>
        )}

          {/* <Pagination>
            <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
            <PaginationItem active>
              <PaginationLink tag="button">1</PaginationLink>
            </PaginationItem>
            <PaginationItem className="page-item"><PaginationLink tag="button">2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
          </Pagination> */}

        </CardBody>

        </FormGroup>
          </CardBody>
          </Card>
          </Col>
        </Row>
        </Form>
        </Container>

     );
    }
}
export default BillingMaster;
