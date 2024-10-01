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



class DeductionTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
              date:'',
              farmernumber:'',
              farmername:'',
              typeofdeduction:'',
              deductioncycle:'',
              deductionmethod:'',
              amount:'',
              repaymentofbillingcycle:'',
              remark:'',
              previousweight:'',
              previousfat:'',
              previouslacto:'',
              previoussnf:'',
              previousprotein:'',
              previouswater:'',
              modalState: true,
              settingvalue:'',
              rmcucentername:'',
              alltransaction:[],
              allother:[],
              allUsers:[],
              allUsers1:[],
              filteredUsers: [],
              allFarmers:[],
              deductionarray:[],
              searchInput: "",
              open: false,
              opennew: false,
              hidediv: false,
              hidediv1: false
        };
        this.handleSetData = this.handleSetData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.settingvalue = this.settingvalue.bind(this);
        this.submitData = this.submitData.bind(this);
        this.Date = this.Date.bind(this);
        this.CattleType = this.CattleType.bind(this);
        this.Shift = this.Shift.bind(this);
        this.FarmerNumber = this.FarmerNumber.bind(this);
        this.Weight = this.Weight.bind(this);
        this.FATValue = this.FATValue.bind(this);
        this.LactoValue = this.LactoValue.bind(this);
        this.SNFValue = this.SNFValue.bind(this);
        this.RateNew= this.RateNew.bind(this);
        this.Protein= this.Protein.bind(this);
        this.Water= this.Water.bind(this);
        this.Weight1= this.Weight1.bind(this);
        this.Lacto1= this.Lacto1.bind(this);
        this.RMCUCentername= this.RMCUCentername.bind(this);
        this.Protein1= this.Protein1.bind(this);
        this.Water1= this.Water1.bind(this);
        this.backdata = this.backdata.bind(this);
        this.cancledata = this.cancledata.bind(this);
        this.backdata1 = this.backdata1.bind(this);
        this.cancledata1 = this.cancledata1.bind(this);
        this.TypeDeduction = this.TypeDeduction.bind(this);
        this.DeductionCycle = this.DeductionCycle.bind(this);
        this.DeductionMethod = this.DeductionMethod.bind(this);
        this.Amount = this.Amount.bind(this);
        this.NoRepayment = this.NoRepayment.bind(this);
        this.Remark = this.Remark.bind(this);
        this.updatetransaction = this.updatetransaction.bind(this);
      }

      TypeDeduction(e) {
        this.setState({ typeofdeduction: e.target.value });
        axios.get(API_BASE_URL+'/typedeductionname/'+ e.target.value)
        .then(response => {
          console.log("sadasdas",response.data.data);
            this.setState({
            deductioname: response.data.data[0].deduction_name,
            deductioncycle:response.data.data[0].deduction_cycle,
            deductionmethod:response.data.data[0].deduction_method
          });

        })
        .catch(e => {

        });
     }

     DeductionCycle(e) {
       this.setState({ deductioncycle: e.target.value });
    }

    DeductionMethod(e) {
      this.setState({ deductionmethod: e.target.value });
   }
     Amount(e) {
       this.setState({ amount: e.target.value });
    }

    NoRepayment(e) {
      this.setState({ norepayment: e.target.value });
   }
   Remark(e) {
     this.setState({ remark: e.target.value });
  }

      handleChange = event => {
        this.setState({ searchInput: event.target.value }, () =>
          this.globalSearch()
        );
      };

      handleShow() {
        this.setState({ modalState: !this.state.modalState });
    }

    RMCUCentername(e) {
      this.setState({
        rmcucentername: e.target.value,
        modalState: !this.state.modalState
      });

      console.log("setting value farmer",e.target.value);

      axios.get(API_BASE_URL+'/listfarmersnewid/'+ e.target.value)
      .then(response => {
          this.setState({ allFarmers: response.data.data,filteredUsers:response.data.data,currentTodos:response.data.data });
          console.log("farmers list",response.data);

      })
      .catch(e => {

      });

    }

    settingvalue(e) {
      if(e.target.value==="center"){
        axios.get(API_BASE_URL+'/listcenter')
        .then(response => {
            this.setState({ allUsers1: response.data.data});
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
    componentDidMount(){

    }

    globalSearch = () => {
      let { searchInput } = this.state;

      let filteredData = this.state.allFarmers.filter(value => {
        //console.log("",value);
        return (
          value.farmername.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.farmer_number.toLowerCase().includes(searchInput.toLowerCase()) ||
          // value.Email.toLowerCase().includes(searchInput.toLowerCase()) ||
          // value.Address.toLowerCase().includes(searchInput.toLowerCase()) ||
          // value.Status.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.toString().toLowerCase().includes(searchInput.toLowerCase())
        );
      });
      this.handleSetData(filteredData);
    };

    handleSetData = allFarmers => {

      this.setState({ filteredUsers: allFarmers });
    };

    submitData(e) {
      e.preventDefault();
      let snfvalue1 = (this.state.snf||this.state.snf1);

      var someDate = new Date();
      someDate.setDate(someDate.getDate());
      var date = someDate.toISOString().substr(0, 10);
      if(this.state.date==""){
        this.state.date=date;
      }
        const {typeofdeduction,deductioname,deductioncycle,deductionmethod,norepayment,remark,shift,farmername,farmernumber,cattletype,weight,fat,lacto,protein,water,ratenew,amount} = this.state;
        axios.post(API_BASE_URL+'/deductionformnew',{
        typeofdeduction,
        deductioname,
        deductioncycle,
        deductionmethod,
        norepayment,
        remark,
        amount,
        farmernumber,
        farmername,
        date
      }).then(response => {
          this.setState({
            typeofdeduction:'',
            deductioncycle:'',
            deductionmethod:'',
            norepayment:'',
            remark:'',
            amount:'',
            farmernumber:'',
            farmername:'',
            date:''
          });
    })
  }

      Date(e) {
        this.setState({date: e.target.value});
      }

      Shift(e) {
        this.setState({shift: e.target.value});
      }

      CattleType(e) {
        this.setState({cattletype: e.target.value});

        const rmcuid = this.state.rmcucentername;
        let id1 = e.target.value;
        let id2 = this.state.shift;

        console.log("vdcvdfds",id1);
        console.log("vdcvdfds",id2);
        axios.get(API_BASE_URL+'/settingslistidnew/'+rmcuid+'/'+id1+'/'+id2)
        .then(response => {
          console.log("response cow id",response.data.data);
            this.setState({
              ratechartcowmorning: response.data.data[0].cowmorning,
              ratechartcowevening: response.data.data[0].cowevening,
              ratechartbuffelomorning: response.data.data[0].buffelomorning,
              ratechartbuffeloevening:response.data.data[0].buffeloevening,
            });


        })
        .catch(e => {

        });

        axios.get(API_BASE_URL+'/formulalist/'+ rmcuid)
        .then(response => {

          console.log("fdsfsds",response);
          this.setState({
            formulavalue: response.data.data[0].snfformula,

          });


        })
        .catch(e => {

        });
      }

      cancledata(e){
          this.setState({
              open: false,
              farmername1:"",
              farmername:"",
          })

      }

      cancledata1(e){
          this.setState({
              opennew: false,
          })

      }
      backdata1(e){
        this.setState({
          opennew:false,
        })
      }

      backdata(e){
        const {number} = e.target.value;
        const _this = this;

        axios.get(API_BASE_URL+'/farmernumber/' + this.state.farmernumber)
         .then(response => {
           console.log("dbfhdsfs",response);
           this.setState({
             farmername: response.data.data[0].farmername,
             image:response.data.data[0].image,
             app_image:response.data.data[0].app_image,
             weight:'0',
             fat:'0',
             lacto:'0',
             snf:'0',
             snf1:'0',
             protein:'0',
             water:'0',
             ratenew:'0',
             amount:'0',
             deviationfat:'0',
             deviationweight:'0',
             deviationsnf:'0',
             deviationlacto:'0',
             deviationprotein:'0',
             deviationwater:'0',
             open: false

           })


         })

         axios.get(API_BASE_URL+'/listcollection/' + this.state.farmernumber)
          .then(response => {
            console.log("dbfhdsfs",response);
            this.setState({
              previousweight:response.data.data[0].weight,
              previousfat:response.data.data[0].fat,
              previouslacto:response.data.data[0].lacto,
              previoussnf:response.data.data[0].snf,
              previousprotein:response.data.data[0].protein,
              previouswater:response.data.data[0].water,

            })

          }).catch(error => {
            this.setState({
              previousweight:"0",
              previousfat:"0",
              previouslacto:"0",
              previoussnf:"0",
              previousprotein:"0",
              previouswater:"0",
              deviationweight:"0",
              deviationfat:"0",
              deviationlacto:"0",
              deviationsnf:"0",
              deviationprotein:"0",
              deviationwater:"0",

            })
          });
      }

      FarmerNumber(e) {
        this.setState({
          farmernumber: e.target.value,

        });
        const {number} = e.target.value;
        const _this = this;

        axios.get(API_BASE_URL+'/farmernumber/' + e.target.value)
         .then(response => {
           console.log("dbfhdsfs",response);
           this.setState({
             farmername1: response.data.data[0].farmername,
           })

         })


      }


      Weight(e){
        const weight = (e.target.value);
         this.setState(prevState => ({
           weight,
           amount:((prevState.ratenew)*weight).toFixed(2)
         }));
      }

      RateNew = e => {
      const weight = this.state.weight;
      const fatnew = this.state.previousfat;
      let id =(this.state.ratechartcowevening||this.state.ratechartcowmorning||this.state.ratechartbuffelomorning||this.state.ratechartbuffeloevening) ;
      let id1 = (this.state.snf||this.state.snf1);
      console.log("rate chart new id",id1);

        axios.get(API_BASE_URL+'/ratelist/' + e.target.value + '/'+ id +'/'+id1)
       .then(response => {
         if(response.data.data==""){
           this.setState({
             ratenew:0,
           })
         }
         else {
           this.setState({
             ratenew:response.data.data[0].rate_value,
           })
           this.setState(prevState => ({
             weight,
             amount:((response.data.data[0].rate_value)*(prevState.weight)).toFixed(1)
           }));
         }


       })

       this.setState({
          deviationfat: ((e.target.value)-fatnew).toFixed(1)
       })

  }


      Weight1 = e => {
        const weightnew = this.state.previousweight;
        this.setState({
          deviationweight: (e.target.value)-weightnew

        })
    }


      Lacto1 = e => {
        const lactonew = this.state.previouslacto;
        const snfnew = this.state.previoussnf;
        const snfold = (this.state.snf||this.state.snf1);
        this.setState({
          deviationlacto: (e.target.value)-lactonew,
          deviationsnf: (snfold-snfnew).toFixed(1)
        })
        let id2= this.state.fat;
        const weight = this.state.weight;
        const fatnew = this.state.previousfat;
        let id =(this.state.ratechartcowevening||this.state.ratechartcowmorning||this.state.ratechartbuffelomorning||this.state.ratechartbuffeloevening) ;
        let id1 = (this.state.snf||this.state.snf1);
        console.log("rate chart new id",id2);

          axios.get(API_BASE_URL+'/ratelist/' + id2 + '/'+ id +'/'+id1)
         .then(response => {
           if(response.data.data==""){
             this.setState({
               ratenew:0,
             })
           }
           else {
             this.setState({
               ratenew:response.data.data[0].rate_value,
             })
             this.setState(prevState => ({
               weight,
               amount:((response.data.data[0].rate_value)*(prevState.weight)).toFixed(2)
             }));
           }
         })
    }


        Protein1 = e => {
          const proteinnew = this.state.previousprotein;
          this.setState({
            deviationprotein: (e.target.value)-proteinnew

          })
      }


      Water1 = e => {
        const waternew = this.state.previouswater;
        this.setState({
          deviationwater: (e.target.value)-waternew

        })
    }


      FATValue(e){
        const fat = (e.target.value);
        if(this.state.formulavalue==="0"){
          this.setState(prevState => ({
            fat,
            snf1:((prevState.lacto)/4 + ((0.21) * fat) +(0.36)).toFixed(1)
          }));

        }
        else {
          this.setState(prevState => ({
            fat,
            snf:((prevState.lacto)/4 + ((0.21) * fat) +(0.36)).toFixed(1)
          }));
        }
      }


      LactoValue(e){
        const lacto = (e.target.value);
        if(this.state.formulavalue==="0"){
          this.setState(prevState => ({
            lacto,
            snf1:((lacto/4) + ((0.21) * (prevState.fat)) +(0.36)).toFixed(1)
          }));
        }
        else {
          this.setState(prevState => ({
            lacto,
            snf:((lacto/4) + ((0.21) * (prevState.fat)) +(0.36)).toFixed(1)
          }));
        }

      }

      SNFValue(e){
      this.setState({snf1: e.target.value});

      }

      Protein(e) {
        this.setState({protein: e.target.value});
      }

      Water(e) {
        this.setState({water: e.target.value});
      }
      datanew = (id) => {

        axios.get(API_BASE_URL+'/deductionfarmertransactionnew/' + id)
         .then(response => {

           console.log("type of data response",response.data.data);
           if(response.data.data==""){
             this.setState({
               newid :'',
               typeofdeduction1:'',
               deductioncycle1:'',
               deductionmethod1:'',
               amount1:'',
               norepayment1:'',
               remark1:'',
               opennew:false,
             })
           }else {
             this.setState({
               newid :response.data.data[0].id,
               typeofdeduction1: response.data.data[0].typeofdeduction,
               deductioncycle1:  response.data.data[0].deductioncycle,
               deductionmethod1:  response.data.data[0].deductionmethod,
               amount1: response.data.data[0].amount,
               balance: response.data.data[0].amount,
               norepayment1:  response.data.data[0].repaymentcount,
               remark1:  response.data.data[0].remark,
               opennew:false,
             })
           }

         })
      }


      onOpenModal = () => {
      this.setState({ open: true });
    };

      onCloseModal = () => {
        this.setState({ open: false });
      };

      onCloseModal1 = () => {
        this.setState({ opennew: false });
      };

      handleClick1 = () => {
        axios.get(API_BASE_URL+'/deductionlisttransaction')
        .then(response => {
            this.setState({ allother: response.data.data});
            console.log("response deduction",response.data);

        })
        .catch(e => {

        });

       this.setState({
          hidediv: true,
          hidediv1:false,
          opennew:false,
        });
      }

      handleClick2 = () => {
        let id= this.state.farmernumber;
        axios.get(API_BASE_URL+'/deductionfarmertransaction/' + id)
         .then(response => {
           console.log("dbfhdsfs",response);
           this.setState({
             alltransaction: response.data.data,
           })

         })
       this.setState({
          hidediv: false,
          hidediv1:true,
          opennew:true,
        });

        axios.get(API_BASE_URL+'/deductionlisttransaction')
        .then(response => {
            this.setState({ allother: response.data.data});
            console.log("response deduction",response.data);
        })
        .catch(e => {

        });

      }

      changeamount = (e) => {
        this.setState({
           amount: e.target.value,
         });
      }

      changeamount4 = (e) =>{
        this.setState({
          amount2: e.target.value,
        });
      }


      changeamount2 = (e) => {
        let newamount = this.state.amount1;
        let newamount1 = this.state.amount2;
        let bamount = Number(newamount) -Number(newamount1);

        this.setState({
          amount3: bamount,
        });
      }

      updatetransaction = () =>{
                                    
        const {amount3,newid,typeofdeduction,deductioncycle,deductionmethod,norepayment,remark,shift,farmername,farmernumber,cattletype,weight,fat,lacto,protein,water,ratenew} = this.state;
        axios.post(API_BASE_URL+'/updatedeductiontransaction/'+ newid,{
          amount3,
          }).then(response => {
            this.setState({
              typeofdeduction:'',
              deductioncycle:'',
              deductionmethod:'',
              norepayment:'',
              remark:'',
              amount:'',
              farmernumber:'',
              farmername:'',
              date:''
            });

        })
      }

    render() {
      const { open,filteredUsers,opennew,alltransaction,allother,deductionarray } = this.state;

      let userList = allother.length > 0
      && allother.map((item, i) => {
      return (
        <option key={i} value={item.id} >{item.deduction_name}</option>
      )
    }, this);



      let abxd = Object.keys(filteredUsers).length;
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

      const renderTodos1 = alltransaction.map((partners, index) => {

       return <tr className="cursor-pointer" key={partners.id} onClick={(event)=> this.datanew(partners.id)}>
       <td>
           {partners.id}
       </td>
       <td>
       {partners.deductionname}
       </td>
   </tr>
     });

      const { redirect,items } = this.state;
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

     return(

        <Container className="collectionconatiner">
          <Form onSubmit= {this.submitData.bind(this)}>
          <Row>
          <Col xs="12" sm="12">
          <div className='main'>
                <Notifications options={{zIndex: 200, top: '120px'}} />
          </div>
          <div>
            <div className={"modal fade" + (this.state.modalState ? " show d-block" : " d-none")} tabIndex="-1" role="dialog" id="modal-overlay">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" align="center">Deduction Transaction For</h5>
                            <button type="button" className="close" onClick={this.handleShow}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" align="center">
                        <FormGroup check inline>
                          <Input className="form-check-input" type="radio" id="settingvalue" name="settingvalue" onChange={this.settingvalue} value="rmcu"/>
                          <Label className="form-check-label" check htmlFor="settingvalue">Society</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="radio" id="settingvalue" name="settingvalue" onChange={this.settingvalue}  value="center"/>
                          <Label className="form-check-label" check htmlFor="settingvalue">Center</Label>
                        </FormGroup><br/><br/>

                        {this.state.settingvalue==="rmcu" ? (
                          <Input type="select" name ="select" id="select" value={this.state.rmcucentername} onChange={this.RMCUCentername}>
                          <option value="1">Please Select</option>
                          {rmcuList}
                          </Input>
                        ) : this.state.settingvalue==="center" ? (
                          <Input type="select" name ="select" id="select" value={this.state.rmcucentername} onChange={this.RMCUCentername}>
                          <option value="1">Please Select</option>
                          {rmcuList1}
                          </Input>
                        ) : (
                          ""
                        ) }

                        </div>
                    </div>
                </div>
            </div>
        </div>
          <Card className="new1">

          <CardBody className="cardnewclass1">

          <FormGroup row className="my-0">
          <Col xs="5">
          <FormGroup>
          <div className="date-area">
          <div className="date-area-left">
          <h5><Label htmlFor="chartname">Date *</Label></h5>
           </div>
          <div className="date-area-right">
            <Label htmlFor="chartname" value={this.state.date}>{date}</Label>
           </div>
          </div>
            <Col xs="12">
            <div className="row">
            <div className="date-area">
            <div className="date-area-left">
          <h5><Label htmlFor="chartname">Farmer Number *</Label></h5>
             </div>
            <div className="date-area-right">
              <Input type="text" id="farmernumber" onFocus={this.onOpenModal}  value={this.state.farmernumber}/>
             </div>
             <div>&nbsp;&nbsp;
                <Modal open={open} onClose={this.onCloseModal} center>
                <Row className="justify-content-center">
                <Col xs="12" sm="12">
                <Row className="justify-content-center">
                  <Col xs="12">
                    <div className="row">
                    <div className="date-area">
                    <div className="date-area-left1">
                  <h5><Label htmlFor="chartname">Farmer Number *</Label></h5>
                     </div>
                    <div className="date-area-right1">
                      <Input id="input-search" data={this.state.allFarmers} onChange={this.handleChange} handleSetData={this.handleSetData} type = "text" placeholder = "Farmer Number" value={this.state.searchInput || ""} name = "search" id = "search" onBlur={this.FarmerNumber}/>&nbsp;
                     </div>
                     <div>
                      </div>
                    </div>
                    </div>
                    </Col>

                    <Col xs="12">
                    <div className="row">
                    <div className="date-area">
                    <div className="date-area-left1">
                  <h5><Label htmlFor="chartname">Farmer Name *</Label></h5>
                     </div>
                    <div className="date-area-right1">
                    <Input type="text" id="farmername" disable value={this.state.farmername1} />
                     </div>
                    </div>
                    </div>
                    </Col>
                    </Row>
                      <CardBody>
                        <Table responsive bordered>
                        <tbody>
                        {renderTodos}
                       </tbody>
                        </Table>
                      </CardBody>

                      <button className="buttoncancle" onClick={this.cancledata}>Cancle</button>&nbsp;&nbsp;
                      <button className="buttonok" onClick={this.backdata}>OK</button>
                </Col>
                </Row>
                </Modal>
              </div>
            </div>
            </div>
            </Col>

          </FormGroup>
          </Col>
          <Col xs="4">
          <FormGroup>
            <Col xs="12">
            <div className="row">
            <div className="date-area data-arianew">
            <div className="date-area-left">
          <h5><Label htmlFor="chartname">Farmer Name *</Label></h5>
             </div>
            <div className="date-area-right">
            <Input type="text" id="farmername" disable value={this.state.farmername} />
             </div>
            </div>
            </div>
            </Col>
          </FormGroup>
          </Col>
          </FormGroup>
          {this.state.farmernumber==="" ?(
            <div>
            <button disabled type="submit" onClick={this.handleClick2} class="btn btn-primary btn-md"><i class="fa fa-dot-circle-o"></i> Repayment Of Deduction</button>&nbsp;&nbsp;
            <button disabled type="button" onClick={this.handleClick1} class="btn btn-primary btn-md"><i class="fa fa-dot-circle-o"></i> Add New Deduction</button>&nbsp;&nbsp;
            </div>
          ):(
            <div>
            <button  type="submit" onClick={this.handleClick2} class="btn btn-primary btn-md"><i class="fa fa-dot-circle-o"></i> Repayment Of Deduction</button>&nbsp;&nbsp;
            <button  type="button" onClick={this.handleClick1} class="btn btn-primary btn-md"><i class="fa fa-dot-circle-o"></i> Add New Deduction</button>&nbsp;&nbsp;
            </div>
          )}

          </CardBody>
          </Card>
          </Col>
          </Row>
          <Row>
          <Col xs="12" sm="12">
          <Card>
          <div id="results" className="search-results" hidden = {!this.state.hidediv}>
          <CardBody>
          <FormGroup row className="my-0">
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="typeofdeduction">Name Of Deduction<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">
            <Input type="select" name ="select" id="select" value={this.state.typeofdeduction} onChange={this.TypeDeduction}>
            <option value="select">Please Select</option>
              {userList}
            </Input>

            </Col>
          </FormGroup>
          </Col>
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="deductioncycle">Deduction Cycle<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">
              <Input type="select" name ="deductioncycle" id="deductioncycle" value={this.state.deductioncycle} onChange={this.DeductionCycle} required>
              <option value="select">Please Select</option>
              <option value="1">Bill Wise</option>
              <option value="2">Yearly</option>
              </Input>
            </Col>
          </FormGroup>
          </Col>
          </FormGroup>

          <FormGroup row className="my-0">
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="deductionmethod">Deduction Method<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">
              <Input type="select" name ="deductionmethod" id="deductionmethod" value={this.state.deductionmethod} onChange={this.DeductionMethod} required>
              <option value="select">Please Select</option>
              <option value="1">Liter</option>
              <option value="2">Fixed amount</option>
              </Input>
            </Col>
          </FormGroup>
          </Col>
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="amount">Amount<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">
              <Input type="text" name ="amount" id="amount" value={this.state.amount} onChange={this.Amount} required>
              </Input>
            </Col>
          </FormGroup>
          </Col>
          </FormGroup>

          <FormGroup row className="my-0">
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="norepayment">Number Of Repayment Cycle<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">
              <Input type="select" name ="norepayment" id="norepayment" value={this.state.norepayment} onChange={this.NoRepayment} required>
              <option value="select">Please Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              </Input>
            </Col>
          </FormGroup>
          </Col>
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="remark">Remark<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">
              <Input type="textarea" name ="remark" id="remark" value={this.state.remark} onChange={this.Remark} required>
              </Input>
            </Col>
          </FormGroup>
          </Col>
          </FormGroup>
          <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>&nbsp;&nbsp;
          <Button type="button" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Cancle</Button>&nbsp;&nbsp;
          <Button type="button" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Close</Button>
            </CardBody>
          </div>
          <div id="results" className="search-results" hidden = {!this.state.hidediv1}>
          <CardBody>
          <CardBody>
          <FormGroup row className="my-0">
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="typeofdeduction">Type Of Deduction<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">
              <Input type="select" name ="typeofdeduction" id="typeofdeduction" value={this.state.typeofdeduction1} disabled>
              <option value="select">Please Select</option>
                {userList}
              </Input>
            </Col>
          </FormGroup>
          </Col>
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="deductioncycle">Deduction Cycle<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">
              <Input type="select" name ="deductioncycle" id="deductioncycle" value={this.state.deductioncycle1} disabled>
              <option value="select">Please Select</option>
              <option value="1">Bill Wise</option>
              <option value="2">Yearly</option>
              </Input>
            </Col>
          </FormGroup>
          </Col>
          </FormGroup>

          <FormGroup row className="my-0">
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="deductionmethod">Deduction Method<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">
              <Input type="select" name ="deductionmethod" id="deductionmethod" value={this.state.deductionmethod1} disabled>
              <option value="select">Please Select</option>
              <option value="1">Liter</option>
              <option value="2">Fixed amount</option>
              </Input>
            </Col>
          </FormGroup>
          </Col>
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="amount">Total<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">
              <Input type="text" name ="amount" id="amount" value={this.state.balance} onChange={this.changeamount}>
              </Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="amount2">Amount<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">
              <Input type="text" name ="amount2" id="amount2" value={this.state.amount2} onBlur={this.changeamount2} onChange={this.changeamount4}>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="amount3">Balance<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">
              <Input type="text" name ="amount3" id="amount3" value={this.state.amount3}>
              </Input>
            </Col>
          </FormGroup>

          </Col>
          </FormGroup>

          <FormGroup row className="my-0">
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="norepayment">Number Of Repayment Cycle<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">
              <Input type="select" name ="norepayment" id="norepayment" value={this.state.norepayment1} disabled>
              <option value="select">Please Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              </Input>
            </Col>
          </FormGroup>
          </Col>
          <Col xs="6">
          <FormGroup row>
            <Col md="4">
              <FormGroup check inline>
                <Label className="form-check-label" htmlFor="remark">Remark<span>*</span></Label>
              </FormGroup>
            </Col>
            <Col md="8">
              <Input type="textarea" name ="remark" id="remark" value={this.state.remark1} disabled>
              </Input>
            </Col>
          </FormGroup>
          </Col>
          </FormGroup>
          <Button type="button" size="md" color="primary" onClick={this.updatetransaction}><i className="fa fa-dot-circle-o"></i> Update</Button>&nbsp;&nbsp;

            </CardBody>
          <div>&nbsp;&nbsp;
             <Modal open={opennew} onClose={this.onCloseModal1} center>

                   <CardBody>
                   <h6 align="center"> List Of Active Deduction Transaction</h6>
                     <Table responsive bordered>
                     <thead>
                     <tr>
                       <th>Deduction No</th>
                       <th>Deduction Name</th>
                     </tr>
                     </thead>
                     <tbody>
                     {renderTodos1}
                    </tbody>
                     </Table>
                   </CardBody>

                   <button className="buttoncancle" onClick={this.cancledata1}>Cancle</button>&nbsp;&nbsp;
                   <button className="buttonok" onClick={this.backdata1}>OK</button>


             </Modal>
           </div>
          </CardBody>
           </div>

          </Card>
          </Col>
          </Row>
          </Form>
        </Container>
     );
    }
}
export default DeductionTransaction;
