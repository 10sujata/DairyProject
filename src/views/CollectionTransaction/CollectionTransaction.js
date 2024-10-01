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



class CollectionTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
              date:'',
              c1:'cow',
              cattletype:'',
              cattlevalue:'cow',
              shift:'',
              farmernumber:'',
              farmername:'',
              image:'',
              app_image:'',
              weight:'',
              fat:'',
              lacto:'',
              snf:'',
              snf1:'',
              protein:'',
              water:'',
              ratenew:'',
              amount:'',
              previousweight:'',
              previousfat:'',
              previouslacto:'',
              previoussnf:'',
              previousprotein:'',
              previouswater:'',
              modalState: true,
              settingvalue:'',
              rmcucentername:'',
              allUsers:[],
              allUsers1:[],
              filteredUsers: [],
              allFarmers:[],
              alldate:[],
              searchInput: "",
              open: false,
              showComponent: false,
              errors: {},
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
        this.cancledata1 = this.cancledata1.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.CattleValue123 = this.CattleValue123.bind(this);
      }

      CattleValue123(e) {
        if(this.state.c2 ==="both"){
          const rmcuid = this.state.rmcucentername;
          let id1 = e.target.value;
          let id2 = this.state.shift;
          
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
          this.setState({c1: e.target.value});
        }
        else {
          this.setState({newcattlevalue: e.target.value});
        }
       
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


      axios.get(API_BASE_URL+'/listratechart')
      .then(response => {
          this.setState({ alldate: response.data.data});
          let datearray2 = response.data.data;
          for(let k=0; k<datearray2.length;k++){      
              let errors = {};     
              const expirydate = datearray2[k].expiration_date;
              var someDate = new Date();
              someDate.setDate(someDate.getDate()+(1)); 
              var newdate = someDate.toISOString().substr(0, 10);
              if(expirydate===newdate){                
                errors["ratechartname"] = datearray2[k].chartname+"  is expiring tommorow";
                this.setState({ errors: errors});
              }
              else {
                errors["ratechartname"] = "";
                this.setState({ errors: errors});
              }
                                                           
          }

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
      var someDate = new Date();
      someDate.setDate(someDate.getDate());
      var date = someDate.toISOString().substr(0, 10);
      e.preventDefault();
      let cattletype = this.state.cattlevalue;

      let snfvalue1 = (this.state.snf||this.state.snf1);
        const {c1,littervalue,shift,farmername,farmernumber,weight,fat,lacto,protein,water,ratenew,amount} = this.state;
        axios.post(API_BASE_URL+'/collectionform',{
        date,
        littervalue,
        shift,
        farmername,
        farmernumber,
        c1,
        weight,
        fat,
        lacto,
        snfvalue1,
        protein,
        water,
        ratenew,
        amount
      }).then(response => {

        axios.get(API_BASE_URL+'/listcollectiontotal')
       .then(response => {
         let arraydata = response.data.data;
         let totalweightcow=response.data.data[0].sum_of_weight;
         let avgfatcow = response.data.data[0].avg_of_fatcow;
         let avgsnfcow = response.data.data[0].avg_of_snfcow;
         let totalweightbuffalo=response.data.data1[0].sum_of_weightbffelo;
         let avgfatbuffelo = response.data.data1[0].avg_of_fatbuffelo;
         let avgsnfbuffelo = response.data.data1[0].avg_of_snfbuffelo;
                    
        
        this.setState({
          totalweightcow:totalweightcow,
          avgfatcow:avgfatcow,
          avgsnfcow:avgsnfcow,
          totalweightbuffelo:totalweightbuffalo,
          avgfatbuffelo:avgfatbuffelo,
          avgsnfbuffelo:avgsnfbuffelo,
          date:'',
          cattletype:'',
          cattlevalue:'cow',
          shift:'',
          farmernumber:'',
          farmername:'',
          image:'',
          app_image:'',
          weight:'',
          fat:'',
          lacto:'',
          snf:'',
          snf1:'',
          protein:'',
          water:'',
          ratenew:'',
          amount:'',
          previousweight:'',
          previousfat:'',
          previouslacto:'',
          previoussnf:'',
          previousprotein:'',
          previouswater:'',
          settingvalue:'',
          rmcucentername:'',
        });
        let myColor = { background: '#1985ac', text: "#FFFFFF", };
       notify.show('Collection Saved Successfully!','custom', 9000, myColor);

       })
    })
  }

      Date(e) {
        this.setState({date: e.target.value});
      }

      Shift(e) {
        this.setState({shift: e.target.value});
      }

   cancledata1(e){
     this.setState({
         open: false,
         date:'',
         cattletype:'',
         cattlevalue:'cow',
         shift:'',
         farmernumber:'',
         farmername:'',
         farmername1:'',
         image:'',
         app_image:'',
         weight:'',
         fat:'',
         lacto:'',
         snf:'',
         snf1:'',
         protein:'',
         water:'',
         ratenew:'',
         amount:'',
         previousweight:'',
         previousfat:'',
         previouslacto:'',
         previoussnf:'',
         previousprotein:'',
         previouswater:'',
         settingvalue:'',
         rmcucentername:'',
     })

   }
      cancledata(e){
          this.setState({
              open: false,
              date:'',
              cattletype:'',
              cattlevalue:'cow',
              shift:'',
              farmernumber:'',
              farmername:'',
              farmername1:'',
              image:'',
              app_image:'',
              weight:'',
              fat:'',
              lacto:'',
              snf:'',
              snf1:'',
              protein:'',
              water:'',
              ratenew:'',
              amount:'',
              previousweight:'',
              previousfat:'',
              previouslacto:'',
              previoussnf:'',
              previousprotein:'',
              previouswater:'',
              settingvalue:'',
              rmcucentername:'',
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
             c1: response.data.data[0].cattlevalue,
             c2: response.data.data[0].cattlevalue,
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
          const rmcuid = this.state.rmcucentername;
          let id1 = response.data.data[0].cattlevalue;
          let id2 = this.state.shift;

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
              littervalue:  response.data.data[0].littervalue,
            });


          })
          .catch(e => {

          });


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

      CattleType(e) {

        // this.setState({cattletype: e.target.value});
        const rmcuid = this.state.rmcucentername;
        let id1 = this.state.cattlevalue;
        let id2 = this.state.shift;

        console.log("vdcvdfds",id1);
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
        if(this.state.littervalue==="1"){
          this.state.weight=((e.target.value)*(0.970)).toFixed(2);
          e.target.value=((e.target.value)*(0.970)).toFixed(2);
        }
        const weightnew = this.state.previousweight;
        this.setState({
          deviationweight: ((e.target.value)-weightnew).toFixed(1)

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
          this.setState({
            fat:e.target.value
          })
        // if(this.state.formulavalue==="0"){
        //   this.setState(prevState => ({
        //     fat,
        //     snf1:((prevState.lacto)/4 + ((0.21) * fat) +(0.36)).toFixed(1)
        //   }));
        //
        // }
        // else {
        //   this.setState(prevState => ({
        //     fat,
        //     snf:((prevState.lacto)/4 + ((0.21) * fat) +(0.36)).toFixed(1)
        //   }));
        // }



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

      onOpenModal = () => {
      this.setState({ open: true });
    };

      onCloseModal = () => {
        this.setState({ open: false });
      };


      handleClickDelete(e){
        this.setState({
            open: false,
            date:'',
            cattletype:'',
            cattlevalue:'cow',
            shift:'',
            farmernumber:'',
            farmername:'',
            farmername1:'',
            image:'',
            app_image:'',
            weight:'',
            fat:'',
            lacto:'',
            snf:'',
            snf1:'',
            protein:'',
            water:'',
            ratenew:'',
            amount:'',
            previousweight:'',
            previousfat:'',
            previouslacto:'',
            previoussnf:'',
            previousprotein:'',
            previouswater:'',
            settingvalue:'',
            rmcucentername:'',
        })

      }


      deleteBank = (id) => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui'>
              <h3>Are you sure?</h3>
              <p>You want close this shift?</p>
              <button onClick={onClose}>No</button>
              <button
                onClick={() => {
                  this.handleClickDelete(id);
                  onClose();
                }}
              >
                Yes, Close the shift!
              </button>
            </div>
          );
        }
      });

  }

    render() {
      const { open,filteredUsers,c1,errors } = this.state;

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

      const { redirect,items } = this.state;
        if (redirect) {
          return <Redirect to="/ratechartmaster" />;
        }
        var someDate = new Date();
        someDate.setDate(someDate.getDate());
        var date = someDate.toISOString().substr(0, 10);
        var defaults1 = "0";

        const {cattlevalue,cattletype,settingvalue,allUsers,allUsers1} = this.state;
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
                            <h5 className="modal-title" align="center">Collection Transaction For</h5>
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
          <div align="center">
            <span className="error">{this.state.errors["ratechartname"]}</span>
            </div>
          <CardBody className="cardnewclass">
          
          <FormGroup row className="my-0">
          <Col xs="5">
          <FormGroup>
          <div className="date-area">
          <div className="date-area-left">
          <h5><Label htmlFor="chartname">Date *</Label></h5>
           </div>
          <div className="date-area-right">
            <Label htmlFor="chartname">{date}</Label>
           </div>
          </div>


            <Col xs="12">
            <div className="row">

            <div className="date-area">
            <div className="date-area-left">
            <h5><Label htmlFor="shift">Shift *</Label></h5>
             </div>
            <div className="date-area-right">

              <Input type="select" name ="select" id="select" value={this.state.shift} onChange={this.Shift} required>
              <option value="1">Please Select</option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
              </Input>
             </div>
            </div>

            </div>
            </Col>

            <Col xs="12">
            <div className="row">
            <div className="date-area">
            <div className="date-area-left">
          <h5><Label htmlFor="chartname">Farmer Number *</Label></h5>
             </div>
            <div className="date-area-right">
              <Input type="text" id="farmernumber" onFocus={this.onOpenModal}  value={this.state.farmernumber} required/>
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

                      <button className="buttoncancle" onClick={this.cancledata}>Cancel</button>&nbsp;&nbsp;
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
            <h5 className="cattlename" align="center"><Label htmlFor="chartname1">Cattle Type *</Label></h5>
            <FormGroup row align="center">
              <Col md="12">                
                <FormGroup check inline>                  
                  <Input className="form-check-input" type="radio" id="c1" value="cow" onChange={this.CattleValue123}  checked={c1 == "cow"}/>                 
                  <Label className="form-check-label" check htmlFor="c1">Cow</Label>&nbsp;&nbsp;                 
                </FormGroup>
                <FormGroup check inline>                  
                  <Input className="form-check-input" type="radio" id="c1" value="buffelo" onChange={this.CattleValue123}  checked={c1 == "buffelo"}/>                 
                  <Label className="form-check-label" check htmlFor="c1">Buffalo</Label>&nbsp;&nbsp;                 
                </FormGroup>              
              </Col>            
            </FormGroup>

            <Col xs="12">
            <div className="row">
            <div className="date-area data-arianew">
            <div className="date-area-left">
          <h5><Label htmlFor="chartname">Farmer Name *</Label></h5>
             </div>
            <div className="date-area-right">
            {this.state.farmername==="" ?(
              <Input disabled type="text" id="farmername" value={this.state.farmername} />
            ):(
              <Input type="text" id="farmername" value={this.state.farmername} />
            )}
             </div>
            </div>
            </div>
            </Col>
          </FormGroup>
          </Col>

          <Col xs="3">
          <FormGroup>
            <h5 className="cattlename"><Label htmlFor="chartname1">Profile Pic</Label></h5>
            {this.state.image === "http://dairyapis.webautodev.com/images/no-image.jpg" ? (
               <img src={this.state.app_image} width="100" height="100"/>
            ): <img src={this.state.image} width="100" height="100"/>}

          </FormGroup>
          </Col>
          </FormGroup>

          </CardBody>

          </Card>
          </Col>
          </Row>


          <Row>
          <Col xs="7" sm="7">
          <Card>

          <CardBody className="cardnewclass">
                <FormGroup row className="my-0">
                <Col xs="5">
                <FormGroup className="newclass1">
                    <Col xs="12">
                    <div className="weightclass">
                      <div className="weightclass-left">
                      <h5>
                      {this.state.littervalue==="1" ?(
                        <Label htmlFor="weight">Weight(Ltr)<span>*</span></Label>
                      ):(
                        <Label htmlFor="weight">Weight(kg)<span>*</span></Label>
                      )}
                      </h5>
                      </div>
                      <div className="weightclass-right">
                      {this.state.farmername==="" ?(
                        <Input disabled type="text" name="select" value={this.state.weight} id="weight" defaultValue={defaults1} onChange={this.Weight} onBlur={this.Weight1} required></Input>
                      ):(
                        <Input type="text" name="select" value={this.state.weight} id="weight" defaultValue={defaults1} onChange={this.Weight} onBlur={this.Weight1} required></Input>
                      )}
                    </div>
                </div>
              </Col>

                  <Col xs="12">
                  <div className="weightclass">
                    <div className="weightclass-left">
                  <h5><Label htmlFor="fat">FAT<span>*</span></Label></h5></div>
                    <div className="weightclass-right">

                    {this.state.farmername==="" ?(
                    <Input disabled type="text" defaultValue={defaults1}  id="fat" onChange={this.FATValue} value={this.state.fat}  required></Input>
                    ):(
                      <Input type="text" defaultValue={defaults1}  id="fat" onChange={this.FATValue} value={this.state.fat} required></Input>
                    )}


                  </div>
                  </div>

                  </Col>

                  <Col xs="12">
                  <div className="weightclass">
                    <div className="weightclass-left">
                  <h5><Label htmlFor="snf">SNF<span>*</span></Label></h5></div>
                    <div className="weightclass-right">

                    {this.state.farmername==="" ?
                      <Input disabled type="text" defaultValue={defaults1} name="snf" id="snf" value={this.state.snf}>

                      </Input>
                    :[
                      this.state.formulavalue==="1"?
                        <Input type="text" defaultValue={defaults1} name="snf" id="snf" value={this.state.snf} required/>
                        :[
                          <Input type="text" defaultValue={defaults1} name="snf1" id="snf1" onChange={this.SNFValue} value={this.state.snf1} required/>
                        ]
                    ]
                  }

                  </div>
                  </div>
                  </Col> 

                                   
                  <Col xs="12">
                  <div className="weightclass">
                    <div className="weightclass-left">
                  <h5><Label htmlFor="lacto">Lacto<span>*</span></Label></h5></div>
                    <div className="weightclass-right">

                    {this.state.farmername==="" ?(
                      <Input disabled type="text" defaultValue={defaults1} name="lacto" id="lacto" onChange={this.LactoValue} value={this.state.lacto} onBlur={this.Lacto1} required></Input>
                    ):(
                      <Input type="text" defaultValue={defaults1} name="lacto" id="lacto" onChange={this.LactoValue} value={this.state.lacto} onBlur={this.Lacto1} required></Input>
                    )}
                  </div>
                  </div>
                  </Col>  
                    
                              
                  <Col xs="12">

                  <div className="weightclass">
                    <div className="weightclass-left">
                  <h5><Label htmlFor="protein">Protein<span>*</span></Label></h5></div>
                    <div className="weightclass-right">
                    {this.state.farmername==="" ?(
                      <Input disabled type="text" defaultValue={defaults1} name="protein" id="protein" onChange={this.Protein} value={this.state.protein} onBlur={this.Protein1} required>

                      </Input>
                    ):(
                      <Input type="text" defaultValue={defaults1} name="protein" id="protein" onChange={this.Protein} value={this.state.protein} onBlur={this.Protein1} required>

                      </Input>
                    )}

                  </div>
                  </div>
                  </Col>

                  
                  <Col xs="12">
                  <div className="weightclass">
                    <div className="weightclass-left">
                  <h5><Label htmlFor="water">Water<span>*</span></Label></h5></div>
                    <div className="weightclass-right">
                    {this.state.farmername==="" ?(
                      <Input disabled type="text" defaultValue={defaults1} name="water" id="water" onChange={this.Water} value={this.state.water} onBlur={this.Water1} required></Input>
                    ):(
                      <Input type="text" defaultValue={defaults1} name="water" id="water" onChange={this.Water} value={this.state.water} onBlur={this.Water1} required></Input>
                    )}
                  </div>
                  </div>
                  </Col>
                </FormGroup>
                </Col>
                <Col xs="1">
                      <div className="border-aria"></div>
                </Col>
                <Col xs="6">
                <div className="previous-full">
                <div className="previous-full-left">
                <FormGroup>
                  <h5 className="previous-title"><Label htmlFor="ratechart">Previous Shift <span>*</span></Label></h5>
                  <Col xs="12">
                    <FormGroup>
                    <h5><Label htmlFor="shift">{this.state.previousweight}<span>*</span></Label></h5>
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                    <h5><Label htmlFor="shift">{this.state.previousfat}<span>*</span></Label></h5>
                    </FormGroup>
                  </Col>                  
                  <Col xs="12">
                    <FormGroup>
                    <h5><Label htmlFor="shift">{this.state.previoussnf}<span>*</span></Label></h5>
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                    <h5><Label htmlFor="shift">{this.state.previouslacto}<span>*</span></Label></h5>
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                    <h5><Label htmlFor="shift">{this.state.previousprotein}<span>*</span></Label></h5>
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                    <h5><Label htmlFor="shift">{this.state.previouswater}<span>*</span></Label></h5>
                    </FormGroup>
                  </Col>

                </FormGroup>
                </div>
                <div className="previous-full-right">
                <FormGroup>
                  <h5 className="deviation-title"><Label htmlFor="ratechart">Deviation<span>*</span></Label></h5>
                  <Col xs="12">
                    <FormGroup>
                    <h5><Label htmlFor="shift">{this.state.deviationweight}<span>*</span></Label></h5>
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                    <h5><Label htmlFor="shift">{this.state.deviationfat}<span>*</span></Label></h5>
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                    <h5><Label htmlFor="shift">{this.state.deviationlacto}<span>*</span></Label></h5>
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                    <h5><Label htmlFor="shift">{this.state.deviationsnf}<span>*</span></Label></h5>
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                    <h5><Label htmlFor="shift">{this.state.deviationprotein}<span>*</span></Label></h5>
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                    <h5><Label htmlFor="shift">{this.state.deviationwater}<span>*</span></Label></h5>
                    </FormGroup>
                  </Col>

                </FormGroup>

                </div>
                </div>

                </Col>
                <Col xs="6">
                </Col>
                </FormGroup>

              <FormGroup row className="my-0">
              <Col xs="12">
              <div className="top-bot"></div>
              </Col>
              <Col xs="6">
              <FormGroup>
                <h5><Label htmlFor="charttype">Rate</Label></h5>
                <Label htmlFor="charttype">{this.state.ratenew}</Label>
              </FormGroup>
              </Col>
              <Col xs="6" className="amountheading">
                <h5><Label htmlFor="cattletype">Amount</Label></h5>
                <Label htmlFor="cattletype">{this.state.amount}</Label>
              </Col>

              </FormGroup>

          </CardBody>

          </Card>
          </Col>
            <Col xs="5" sm="5">
            <Card>
            <CardBody>
              <FormGroup row className="my-0">
              <h5 className="summaryclass"><Label htmlFor="range"> Collection Summary</Label></h5>
              <Col xs="12">
              <div className="total-full">
              <div className="total-full-left">
              <h5><Label htmlFor="shift"></Label></h5>
              <h5><Label htmlFor="shift">Total Weight<span>*</span></Label></h5>
                <h5><Label htmlFor="shift">Avg FAT<span>*</span></Label></h5>
                <h5><Label htmlFor="shift">Avg SNF<span>*</span></Label></h5>
              </div>
              <div className="total-full-midd">
              <h5><Label htmlFor="shift">Cow</Label></h5>
              <h5><Label htmlFor="shift">{this.state.totalweightcow}</Label></h5>
              <h5><Label htmlFor="shift">{this.state.avgfatcow}</Label></h5>
              <h5><Label htmlFor="shift">{this.state.avgsnfcow}</Label></h5>

              </div>
              <div className="total-full-right">
              <h5><Label htmlFor="shift">Buffalo</Label></h5>
              <h5><Label htmlFor="shift">{this.state.totalweightbuffelo}</Label></h5>
              <h5><Label htmlFor="shift">{this.state.avgfatbuffelo}</Label></h5>
              <h5><Label htmlFor="shift">{this.state.avgsnfbuffelo}</Label></h5>

              </div>

              </div>

              </Col>
              </FormGroup>
            </CardBody>
            </Card>
            </Col>
          </Row>

            <Row align="right">
              <Col xs="12">
              <Card>
              <CardBody>
              <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>&nbsp;&nbsp;
              <Button type="button" size="md" color="primary" onClick={this.cancledata1}><i className="fa fa-dot-circle-o"></i> Cancel</Button>&nbsp;&nbsp;
              <Button type="button" size="md" color="primary" onClick={this.deleteBank}><i className="fa fa-dot-circle-o"></i> Close</Button>
              </CardBody>
              </Card>
              </Col>
            </Row>

          </Form>

        </Container>



     );
    }
}
export default CollectionTransaction;
