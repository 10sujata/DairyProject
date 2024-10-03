import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
import { directive } from '@babel/types';
import firebaseConfig from '../../config'
import { FormGroup,Table,Pagination,Badge,PaginationItem,PaginationLink,CardHeader,Label,FormText,Button, Card, CardBody, CardFooter, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { userInfo } from 'os';
import $ from 'jquery';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import XLSX from 'xlsx';

class PendingCalls extends Component {

    constructor(props) {

        super(props);
        this.state = {
            allPending: [],
            filteredUsers: [],
            currentTodos:[],
            currentPage: 1,
            todosPerPage: 15,
            upperPageBound: 15,
            lowerPageBound: 0,
            isPrevBtnActive: 'disabled',
            isNextBtnActive: '',
            pageBound: 15,
            searchInput: "",
            open: false,
            startdate:'',
            enddate:'',
            allUsers1: [],
            allCategories: [],
            product_category:'',
            customername:'',
            allClients: [],

        };
        this.routeChange = this.routeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSetData = this.handleSetData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnNextClick = this.btnNextClick.bind(this);
        this.btnPrevClick = this.btnPrevClick.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.StartDate= this.StartDate.bind(this);
        this.EndDate= this.EndDate.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
        this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);

      }

      handleChange = event => {
        this.setState({ searchInput: event.target.value }, () =>
          this.globalSearch()
        );
      };


      onOpenModal = () => {
        var someDate = new Date();
        someDate.setDate(someDate.getDate());
        var date = someDate.toISOString().substr(0, 10);

        var someDate1 = new Date();
        someDate1.setDate(someDate1.getDate());
        var date1 = someDate1.toISOString().replace(/T.*/,'').split('-').reverse().join('-');



         if(this.state.customername!="" && this.state.product_category!=""){
               const userref =  firebaseConfig.database().ref(`/Calls/`).orderByChild("product_category").equalTo(this.state.product_category)
                   userref.on("value", snapshot =>{
                     console.log("dsdsds",snapshot.val());
                     let allUsers = snapshot.val();
                     let newState = [];
                     for(let user in allUsers){
                         if(allUsers[user].customer_name==this.state.customername && (allUsers[user].status_of_complaint==="Other"||allUsers[user].status_of_complaint==="Spare part Required"|| allUsers[user].status_of_complaint==="System sent to factory for repair"||allUsers[user].status_of_complaint==="Needs to be visited again"||allUsers[user].status_of_complaint==="Under-Repaired")){
                           newState.push({
                             id: user,
                             Name: allUsers[user].name_of_service_engineer,
                             Region: allUsers[user].region_of_service_engineer,
                             Customername: allUsers[user].customer_name,
                             Calllogdate: allUsers[user].call_log_date,
                             Cityofservicecall:allUsers[user].city_of_service,
                             Productca:allUsers[user].product_category,
                             Productna:allUsers[user].product_name,
                             Productdes:allUsers[user].product_description,
                             Servicecallstatus:allUsers[user].status_of_complaint,
                             ProductName:allUsers[user].productname,
                             Callassignby: allUsers[user].call_assigned_by,
                             Callassignto: allUsers[user].call_assigned_to,
                             Callvisitdate: allUsers[user].call_visit_date,
                             CustomerAddress: allUsers[user].customer_address,
                             CustomerCity: allUsers[user].customer_city,
                             CustomerCountry: allUsers[user].customer_country,
                             CustomerState: allUsers[user].customer_state,
                             CustomerEmail: allUsers[user].customer_Email_Id,
                             EngineerObservation:allUsers[user].Engg_observation,
                             ProductSerialNumber:allUsers[user].product_serial_no,
                             ProductInvoiceNo:allUsers[user].invoice_no,
                             Remarks:allUsers[user].client_remark,
                           });
                         }
                     }

                     this.setState({
                       allUsers1: newState,
                     });
             })
         }
         else if(this.state.customername!=""){
           const userref =  firebaseConfig.database().ref(`/Calls/`).orderByChild("customer_name").equalTo(this.state.customername)
               userref.on("value", snapshot =>{
                 console.log("dsdsds",snapshot.val());
                 let allUsers = snapshot.val();
                 let newState = [];
                 for(let user in allUsers){
                     if((allUsers[user].status_of_complaint==="Other"||allUsers[user].status_of_complaint==="Spare part Required"|| allUsers[user].status_of_complaint==="System sent to factory for repair"||allUsers[user].status_of_complaint==="Needs to be visited again"||allUsers[user].status_of_complaint==="Under-Repaired")){
                       newState.push({
                         id: user,
                         Name: allUsers[user].name_of_service_engineer,
                         Region: allUsers[user].region_of_service_engineer,
                         Customername: allUsers[user].customer_name,
                         Calllogdate: allUsers[user].call_log_date,
                         Cityofservicecall:allUsers[user].city_of_service,
                         Productca:allUsers[user].product_category,
                         Productna:allUsers[user].product_name,
                         Productdes:allUsers[user].product_description,
                         Servicecallstatus:allUsers[user].status_of_complaint,
                         ProductName:allUsers[user].productname,
                         Callassignby: allUsers[user].call_assigned_by,
                         Callassignto: allUsers[user].call_assigned_to,
                         Callvisitdate: allUsers[user].call_visit_date,
                         CustomerAddress: allUsers[user].customer_address,
                         CustomerCity: allUsers[user].customer_city,
                         CustomerCountry: allUsers[user].customer_country,
                         CustomerState: allUsers[user].customer_state,
                         CustomerEmail: allUsers[user].customer_Email_Id,
                         EngineerObservation:allUsers[user].Engg_observation,
                         ProductSerialNumber:allUsers[user].product_serial_no,
                         ProductInvoiceNo:allUsers[user].invoice_no,
                         Remarks:allUsers[user].client_remark,
                       });
                     }
                 }

                 this.setState({
                   allUsers1: newState,
                 });
         })
        }

        else if(this.state.product_category!="") {
          const userref =  firebaseConfig.database().ref(`/Calls/`).orderByChild("product_category").equalTo(this.state.product_category)
              userref.on("value", snapshot =>{
                console.log("dsdsds",snapshot.val());
                let allUsers = snapshot.val();
                let newState = [];
                for(let user in allUsers){
                    if((allUsers[user].status_of_complaint==="Other"||allUsers[user].status_of_complaint==="Spare part Required"||allUsers[user].status_of_complaint==="System sent to factory for repair"||allUsers[user].status_of_complaint==="Needs to be visited again"||allUsers[user].status_of_complaint==="Under-Repaired")){
                      newState.push({
                        id: user,
                        Name: allUsers[user].name_of_service_engineer,
                        Region: allUsers[user].region_of_service_engineer,
                        Customername: allUsers[user].customer_name,
                        Calllogdate: allUsers[user].call_log_date,
                        Cityofservicecall:allUsers[user].city_of_service,
                        Productca:allUsers[user].product_category,
                        Productna:allUsers[user].product_name,
                        Productdes:allUsers[user].product_description,
                        Servicecallstatus:allUsers[user].status_of_complaint,
                        ProductName:allUsers[user].productname,
                        Callassignby: allUsers[user].call_assigned_by,
                        Callassignto: allUsers[user].call_assigned_to,
                        Callvisitdate: allUsers[user].call_visit_date,
                        CustomerAddress: allUsers[user].customer_address,
                        CustomerCity: allUsers[user].customer_city,
                        CustomerCountry: allUsers[user].customer_country,
                        CustomerState: allUsers[user].customer_state,
                        CustomerEmail: allUsers[user].customer_Email_Id,
                        EngineerObservation:allUsers[user].Engg_observation,
                        ProductSerialNumber:allUsers[user].product_serial_no,
                        ProductInvoiceNo:allUsers[user].invoice_no,
                        Remarks:allUsers[user].client_remark,
                      });
                    }
                }

                this.setState({
                  allUsers1: newState,
                });
        })

      }

      else if(this.state.startdate!=""){
        const userref =  firebaseConfig.database().ref(`/Calls/`).orderByChild("call_log_date").startAt(this.state.startdate).endAt(this.state.enddate)
            userref.on("value", snapshot =>{
              console.log("dsdsds",snapshot.val());
              let allUsers = snapshot.val();
              let newState = [];
              for(let user in allUsers){
                  if((allUsers[user].status_of_complaint==="Other"||allUsers[user].status_of_complaint==="Spare part Required"|| allUsers[user].status_of_complaint==="System sent to factory for repair"||allUsers[user].status_of_complaint==="Needs to be visited again"||allUsers[user].status_of_complaint==="Under-Repaired")){
                    newState.push({
                      id: user,
                      Name: allUsers[user].name_of_service_engineer,
                      Region: allUsers[user].region_of_service_engineer,
                      Customername: allUsers[user].customer_name,
                      Calllogdate: allUsers[user].call_log_date,
                      Cityofservicecall:allUsers[user].city_of_service,
                      Productca:allUsers[user].product_category,
                      Productna:allUsers[user].product_name,
                      Productdes:allUsers[user].product_description,
                      Servicecallstatus:allUsers[user].status_of_complaint,
                      ProductName:allUsers[user].productname,
                      Callassignby: allUsers[user].call_assigned_by,
                      Callassignto: allUsers[user].call_assigned_to,
                      Callvisitdate: allUsers[user].call_visit_date,
                      CustomerAddress: allUsers[user].customer_address,
                      CustomerCity: allUsers[user].customer_city,
                      CustomerCountry: allUsers[user].customer_country,
                      CustomerState: allUsers[user].customer_state,
                      CustomerEmail: allUsers[user].customer_Email_Id,
                      EngineerObservation:allUsers[user].Engg_observation,
                      ProductSerialNumber:allUsers[user].product_serial_no,
                      ProductInvoiceNo:allUsers[user].invoice_no,
                      Remarks:allUsers[user].client_remark,
                    });
                  }
              }

              this.setState({
                allUsers1: newState,
              });
      })

    }

    else if(this.state.startdate!="" && this.state.enddate!=""){
      const userref =  firebaseConfig.database().ref(`/Calls/`).orderByChild("call_log_date").startAt(this.state.startdate).endAt(this.state.enddate)
          userref.on("value", snapshot =>{
            console.log("dsdsds",snapshot.val());
            let allUsers = snapshot.val();
            let newState = [];
            for(let user in allUsers){
                if((allUsers[user].status_of_complaint==="Other"||allUsers[user].status_of_complaint==="Spare part Required"|| allUsers[user].status_of_complaint==="System sent to factory for repair"||allUsers[user].status_of_complaint==="Needs to be visited again"||allUsers[user].status_of_complaint==="Under-Repaired")){
                  newState.push({
                    id: user,
                    Name: allUsers[user].name_of_service_engineer,
                    Region: allUsers[user].region_of_service_engineer,
                    Customername: allUsers[user].customer_name,
                    Calllogdate: allUsers[user].call_log_date,
                    Cityofservicecall:allUsers[user].city_of_service,
                    Productca:allUsers[user].product_category,
                    Productna:allUsers[user].product_name,
                    Productdes:allUsers[user].product_description,
                    Servicecallstatus:allUsers[user].status_of_complaint,
                    ProductName:allUsers[user].productname,
                    Callassignby: allUsers[user].call_assigned_by,
                    Callassignto: allUsers[user].call_assigned_to,
                    Callvisitdate: allUsers[user].call_visit_date,
                    CustomerAddress: allUsers[user].customer_address,
                    CustomerCity: allUsers[user].customer_city,
                    CustomerCountry: allUsers[user].customer_country,
                    CustomerState: allUsers[user].customer_state,
                    CustomerEmail: allUsers[user].customer_Email_Id,
                    EngineerObservation:allUsers[user].Engg_observation,
                    ProductSerialNumber:allUsers[user].product_serial_no,
                    ProductInvoiceNo:allUsers[user].invoice_no,
                    Remarks:allUsers[user].client_remark,
                  });
                }
            }

            this.setState({
              allUsers1: newState,
            });
    })

  }

    else if(this.state.startdate!="" && this.state.product_category!="" && this.state.customername!=""){
      const userref =  firebaseConfig.database().ref(`/Calls/`).orderByChild("call_log_date").startAt(this.state.startdate).endAt(this.state.enddate)
          userref.on("value", snapshot =>{
            console.log("dsdsds",snapshot.val());
            let allUsers = snapshot.val();
            let newState = [];
            for(let user in allUsers){
                if((allUsers[user].status_of_complaint==="Other"||allUsers[user].status_of_complaint==="Spare part Required"||allUsers[user].status_of_complaint==="System sent to factory for repair"||allUsers[user].status_of_complaint==="Needs to be visited again"||allUsers[user].status_of_complaint==="Under-Repaired") && allUsers[user].product_category==this.state.product_category && allUsers[user].customer_name==this.state.customername){
                  newState.push({
                    id: user,
                    Name: allUsers[user].name_of_service_engineer,
                    Region: allUsers[user].region_of_service_engineer,
                    Customername: allUsers[user].customer_name,
                    Calllogdate: allUsers[user].call_log_date,
                    Cityofservicecall:allUsers[user].city_of_service,
                    Productca:allUsers[user].product_category,
                    Productna:allUsers[user].product_name,
                    Productdes:allUsers[user].product_description,
                    Servicecallstatus:allUsers[user].status_of_complaint,
                    ProductName:allUsers[user].productname,
                    Callassignby: allUsers[user].call_assigned_by,
                    Callassignto: allUsers[user].call_assigned_to,
                    Callvisitdate: allUsers[user].call_visit_date,
                    CustomerAddress: allUsers[user].customer_address,
                    CustomerCity: allUsers[user].customer_city,
                    CustomerCountry: allUsers[user].customer_country,
                    CustomerState: allUsers[user].customer_state,
                    CustomerEmail: allUsers[user].customer_Email_Id,
                    EngineerObservation:allUsers[user].Engg_observation,
                    ProductSerialNumber:allUsers[user].product_serial_no,
                    ProductInvoiceNo:allUsers[user].invoice_no,
                    Remarks:allUsers[user].client_remark,
                  });
                }
            }

            this.setState({
              allUsers1: newState,
            });
        })
    }

      else if(this.state.startdate!="" && this.state.product_category!=""){
        const userref =  firebaseConfig.database().ref(`/Calls/`).orderByChild("call_log_date").startAt(this.state.startdate).endAt(this.state.enddate)
            userref.on("value", snapshot =>{
              console.log("dsdsds",snapshot.val());
              let allUsers = snapshot.val();
              let newState = [];
              for(let user in allUsers){
                  if((allUsers[user].status_of_complaint==="Other"||allUsers[user].status_of_complaint==="Spare part Required"||allUsers[user].status_of_complaint==="System sent to factory for repair"||allUsers[user].status_of_complaint==="Needs to be visited again"||allUsers[user].status_of_complaint==="Under-Repaired") && allUsers[user].product_category==this.state.product_category){
                    newState.push({
                      id: user,
                      Name: allUsers[user].name_of_service_engineer,
                      Region: allUsers[user].region_of_service_engineer,
                      Customername: allUsers[user].customer_name,
                      Calllogdate: allUsers[user].call_log_date,
                      Cityofservicecall:allUsers[user].city_of_service,
                      Productca:allUsers[user].product_category,
                      Productna:allUsers[user].product_name,
                      Productdes:allUsers[user].product_description,
                      Servicecallstatus:allUsers[user].status_of_complaint,
                      ProductName:allUsers[user].productname,
                      Callassignby: allUsers[user].call_assigned_by,
                      Callassignto: allUsers[user].call_assigned_to,
                      Callvisitdate: allUsers[user].call_visit_date,
                      CustomerAddress: allUsers[user].customer_address,
                      CustomerCity: allUsers[user].customer_city,
                      CustomerCountry: allUsers[user].customer_country,
                      CustomerState: allUsers[user].customer_state,
                      CustomerEmail: allUsers[user].customer_Email_Id,
                      EngineerObservation:allUsers[user].Engg_observation,
                      ProductSerialNumber:allUsers[user].product_serial_no,
                      ProductInvoiceNo:allUsers[user].invoice_no,
                      Remarks:allUsers[user].client_remark,
                    });
                  }
              }

              this.setState({
                allUsers1: newState,
              });
          })

      }

  else if(this.state.startdate!="" && this.state.customername!=""){
    const userref =  firebaseConfig.database().ref(`/Calls/`).orderByChild("call_log_date").startAt(this.state.startdate).endAt(this.state.enddate)
        userref.on("value", snapshot =>{
          console.log("dsdsds",snapshot.val());
          let allUsers = snapshot.val();
          let newState = [];
          for(let user in allUsers){
              if((allUsers[user].status_of_complaint==="Other"||allUsers[user].status_of_complaint==="Spare part Required"||allUsers[user].status_of_complaint==="System sent to factory for repair"||allUsers[user].status_of_complaint==="Needs to be visited again"||allUsers[user].status_of_complaint==="Under-Repaired") && allUsers[user].customer_name==this.state.customername){
                newState.push({
                  id: user,
                  Name: allUsers[user].name_of_service_engineer,
                  Region: allUsers[user].region_of_service_engineer,
                  Customername: allUsers[user].customer_name,
                  Calllogdate: allUsers[user].call_log_date,
                  Cityofservicecall:allUsers[user].city_of_service,
                  Productca:allUsers[user].product_category,
                  Productna:allUsers[user].product_name,
                  Productdes:allUsers[user].product_description,
                  Servicecallstatus:allUsers[user].status_of_complaint,
                  ProductName:allUsers[user].productname,
                  Callassignby: allUsers[user].call_assigned_by,
                  Callassignto: allUsers[user].call_assigned_to,
                  Callvisitdate: allUsers[user].call_visit_date,
                  CustomerAddress: allUsers[user].customer_address,
                  CustomerCity: allUsers[user].customer_city,
                  CustomerCountry: allUsers[user].customer_country,
                  CustomerState: allUsers[user].customer_state,
                  CustomerEmail: allUsers[user].customer_Email_Id,
                  EngineerObservation:allUsers[user].Engg_observation,
                  ProductSerialNumber:allUsers[user].product_serial_no,
                  ProductInvoiceNo:allUsers[user].invoice_no,
                  Remarks:allUsers[user].client_remark,
                });
              }
          }

          this.setState({
            allUsers1: newState,
          });
      })
  }

    this.setState({ open: true});

  }




      onCloseModal = () => {
        this.setState({ open: false });
      };

      editpendingcall(id) {
          let path = `/editpendingcalls/`+id;
          this.props.history.push(path);
        }

      routeChange(id) {
        let path = `/regeneratedpendingcalls/`+id;
        this.props.history.push(path);
      }

      handleClick(event) {
        let listid = Number(event.target.id);
        this.setState({
          currentPage: listid
        });
        $(".page-item .active").removeClass('active');
            $('.page-item#'+listid).addClass('active');
        this.setPrevAndNextBtnClass(listid);
      }

      setPrevAndNextBtnClass(listid) {
        let totalPage = Math.ceil(this.state.filteredUsers.length / this.state.todosPerPage);
        this.setState({isNextBtnActive: 'disabled'});
        this.setState({isPrevBtnActive: 'disabled'});
        if(totalPage === listid && totalPage > 1){
            this.setState({isPrevBtnActive: ''});
        }
        else if(listid === 1 && totalPage > 1){
            this.setState({isNextBtnActive: ''});
        }
        else if(totalPage > 1){
            this.setState({isNextBtnActive: ''});
            this.setState({isPrevBtnActive: ''});
        }
      }

      btnIncrementClick() {
        this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
        this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid});
        this.setPrevAndNextBtnClass(listid);
    }


      btnDecrementClick() {
        this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
        this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
        let listid = this.state.upperPageBound - this.state.pageBound;
        this.setState({ currentPage: listid});
        this.setPrevAndNextBtnClass(listid);
    }


    btnPrevClick() {
      if((this.state.currentPage -1)%this.state.pageBound === 0 ){
          this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
          this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
      }
      let listid = this.state.currentPage - 1;
      this.setState({ currentPage : listid});
      this.setPrevAndNextBtnClass(listid);
  }

  btnNextClick() {
      if((this.state.currentPage +1) > this.state.upperPageBound ){
          this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
          this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
      }
      let listid = this.state.currentPage + 1;
      this.setState({ currentPage : listid});
      this.setPrevAndNextBtnClass(listid);
  }

  globalSearch = () => {
    let { searchInput } = this.state;

    let filteredData = this.state.allPending.filter(value => {
      //console.log("",value);
      return (
        value.CustomerName.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.CustomerState.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.engineername.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.region.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.toString().toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    this.handleSetData(filteredData);
  };


  UNSAFE_componentWillMount() {
    const userref4 =  firebaseConfig.database().ref(`/Clients/`);

    userref4.on("value", snapshot1 =>{
      let allUsers4 = snapshot1.val();

      let newClient = [];
      for(let user in allUsers4){
          newClient.push({
          id: user,
          Name: allUsers4[user].PartyName,
        });
      }

      this.setState({
        allClients: newClient
      });
    })


    const userref5 =  firebaseConfig.database().ref(`/Product Category/`);

    userref5.on("value", snapshot2 =>{
      let allUsers5 = snapshot2.val();
      let newClient2 = [];
      for(let user2 in allUsers5){
          newClient2.push({
          id: user2,
          Name: allUsers5[user2].CategoryName,
        });
      }

      this.setState({
        allCategories: newClient2
      });
    })
  }

  categorychange(selectedOption) {

    console.log("vfdhfbdf",selectedOption.value);

  const categoryid =   firebaseConfig.database().ref(`/Product Category/`+ selectedOption.value);

  categoryid.on("value", snapdata => {
  let allclients = snapdata.val();

    this.setState({
        productdescription: allclients.ProductDescription,
        product_category: selectedOption.label,
    });

  })
  };


    componentDidMount() {
      const userref =  firebaseConfig.database().ref(`/Calls/`);
          userref.on("value", snapshot => {
            let allUsers = snapshot.val();
            console.log("get all pending calls",allUsers);
            let newState = [];

            for(let user in allUsers){
              if((allUsers[user].status_of_complaint==="Spare part Required"||allUsers[user].status_of_complaint==="System sent to factory for repair"||allUsers[user].status_of_complaint==="Needs to be visited again"||allUsers[user].status_of_complaint==="Under-Repaired" || allUsers[user].status_of_complaint==="Other")){
                newState.push({
                  id: user,
                  region:allUsers[user].region_of_service_engineer,
                  engineername:allUsers[user].name_of_service_engineer,
                  CustomerName: allUsers[user].customer_name,
                  CustomerState: allUsers[user].customer_state,
                  calllogdate:allUsers[user].call_log_date,
                  cityofservicecall:allUsers[user].city_of_service,
                  productca:allUsers[user].product_category,
                  productna:allUsers[user].product_name,
                  productdes:allUsers[user].product_description,
                  servicecallstatus:allUsers[user].status_of_complaint,
                  call_assigned_to:allUsers[user].call_assigned_to,
                });
              }
            }

            this.setState({
              allPending: newState, filteredUsers: newState,currentTodos: newState,
            });

            console.log("all calls",this.state.allPending);

          });
    }


    componentDidUpdate() {
      $(".page-item.active").removeClass('active');
      $('.page-item#'+this.state.currentPage).addClass('active');
}


quan (selectedOption) {
 const clinetid =   firebaseConfig.database().ref(`/Clients/`+ selectedOption.value);
 clinetid.on("value", snapdata => {
   let allclients = snapdata.val();

   console.log("dfdsfdsfds",selectedOption.value);

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

    deleteCall = (id) => {
      firebaseConfig.database().ref('Calls').child(id).remove();
    }

    exportCsv(){
      var csvRow = [];
      var allUsers1 = [['Region','Service Engineer Name','Customer Name','Customer Email','Customer Country','Customer State','Customer City','Call Assign By','Call Assign To ','Call Log Date','Call Visit Date','City Of Service Call','Product Category','Product Description','Engineer Observations','Product Serial No','Product Invoice no','Remarks','Service Call Status']];
      var re = this.state.allUsers1;
      this.state.allUsers1.forEach((user) => {        
          let userArray = [user.Region,user.Name,user.Customername,user.CustomerEmail,user.CustomerCountry,user.CustomerState,user.CustomerCity,user.Callassignby,user.Callassignto,user.Calllogdate,user.Callvisitdate,user.Cityofservicecall,user.Productca,user.Productdes,user.EngineerObservation,user.ProductSerialNumber,user.ProductInvoiceNo,user.Remarks,user.Servicecallstatus];
          allUsers1.push(userArray);
      })
      const wb = XLSX.utils.book_new()
     const wsAll = XLSX.utils.aoa_to_sheet(allUsers1)
         XLSX.utils.book_append_sheet(wb, wsAll, "All Users")
         XLSX.writeFile(wb, "pendingcalls.xlsx")

    }

    StartDate(e){
      this.setState({startdate:e.target.value});
    }

    EndDate(e){
      this.setState({enddate:e.target.value});
    }

    handleSetData = allPending => {
      //console.log("gndfjkjkgndfjkg",allUsers);
      this.setState({ filteredUsers: allPending });
    };


    render() {
      let { open,allUsers1,filteredUsers,currentPage, todosPerPage,upperPageBound,lowerPageBound,isPrevBtnActive,isNextBtnActive } = this.state;
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      let abxd = Object.keys(filteredUsers).length;
      let currentTodos;

      let options = [];
      let categories = [];
      this.state.allClients.map(item =>
      options.push({ label: item.Name, value: item.id }),
      );
      const defaultOption = options[0];
      console.log("hdbshdjshdbsa",options);

      this.state.allCategories.map(item =>
        categories.push({ label: item.Name, value: item.id }),
      );
      const defaultOption1 = categories[0];

      var someDate = new Date();
      someDate.setDate(someDate.getDate());
      var date = someDate.toISOString().substr(0, 10);

       if(abxd > 3){
          currentTodos = filteredUsers.slice(indexOfFirstTodo, indexOfLastTodo);
       }
       else {
        currentTodos = filteredUsers;
       }

       const renderTodo1 = allUsers1.map((partners, index) => {

        return <tr key={partners.id}>

        <td>
            {partners.Region}
        </td>

        <td>
            {partners.Name}
        </td>

        <td>
            {partners.Customername}
        </td>

        <td>
            {partners.CustomerAddress}
        </td>

        <td>
            {partners.CustomerCountry}
        </td>

        <td>
            {partners.CustomerState}
        </td>

        <td>
            {partners.CustomerCity}
        </td>

        <td>
            {partners.Callassignby}
        </td>

        <td>
            {partners.Callassignto}
        </td>

        <td>
            {partners.Calllogdate}
        </td>

        <td>
            {partners.Callvisitdate}
        </td>
        <td>
            {partners.Cityofservicecall}
        </td>
        <td>
          {partners.ProductName}
        </td>
        <td>
            {partners.Productca}
        </td>

        <td>
            {partners.Productdes}
        </td>
        <td>
            {partners.Servicecallstatus}
        </td>

       </tr>
       });


      const renderTodos = currentTodos.map((partners, index) => {

        return  <tr key={partners.id}>
        <td>
            {partners.region}
        </td>
        <td>
            {partners.engineername}
        </td>
        <td>
            {partners.CustomerName}
        </td>
        <td>
        {partners.calllogdate}
        </td>
        <td>
        {partners.cityofservicecall}
        </td>
        <td>
            {partners.productca}
        </td>

        <td>
            {partners.productdes}
        </td>
        <td>
            {partners.servicecallstatus}
        </td>
        <td>
        {partners.call_assigned_to}
        </td>
        <td>
        <Button size="md"  block color="primary" onClick={()=>this.editpendingcall(partners.id)}>
          Revisit Pending Call
        </Button>
        </td>
        <td>
          <span size="md" id="grid" onClick={()=>this.editpendingcall(partners.id)}>
          <i className="fa fa-eye fa-lg float-center"></i> &nbsp;&nbsp;
          </span>
        </td>

        <td>
        <span size="md" id="grid" onClick={()=>this.deleteCall(partners.id)}>
        <i className="fa fa-trash fa-lg float-center"></i>
        </span>
        {/* <Button size="sm"  block color="primary" onClick={()=>this.deleteEngineer(partners.id)}>
          Delete
        </Button> */}
        </td>

    </tr>

      });


      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(filteredUsers.length / todosPerPage); i++) {
        pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => {
            if(number === 1 && currentPage === 1){
                return(
                    <li key={number} className='active' id={number}><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
                )
            }
            else if((number < upperPageBound + 1) && number > lowerPageBound){
                return(
                    <li key={number} id={number}><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
                )
            }
        });
        let pageIncrementBtn = null;
        if(pageNumbers.length > upperPageBound){
            pageIncrementBtn = <li className=''><a href='#' onClick={this.btnIncrementClick}> &hellip; </a></li>
        }
        let pageDecrementBtn = null;
        if(lowerPageBound >= 1){
            pageDecrementBtn = <li className=''><a href='#' onClick={this.btnDecrementClick}> &hellip; </a></li>
        }
        let renderPrevBtn = null;
        if(isPrevBtnActive === 'disabled') {
            renderPrevBtn = <li className={isPrevBtnActive}><span id="btnPrev"> Prev </span></li>
        }
        else{
            renderPrevBtn = <li className={isPrevBtnActive}><a href='#' id="btnPrev" onClick={this.btnPrevClick}> Prev </a></li>
        }
        let renderNextBtn = null;
        if(isNextBtnActive === 'disabled') {
            renderNextBtn = <li className={isNextBtnActive}><span id="btnNext"> Next </span></li>
        }
        else{
            renderNextBtn = <li className={isNextBtnActive}><a href='#' id="btnNext" onClick={this.btnNextClick}> Next </a></li>
        }

     return(

        <Row className="justify-content-center">
        <Col xs="12" sm="12">
        <Card>
        <CardHeader>
        <div className="searchnewclass1">
        <i className="fa fa-align-justify"></i> Pending Calls
        <Input className="searchclass" id="input-search" data={this.state.callsAttend} onChange={this.handleChange} handleSetData={this.handleSetData} type = "text" placeholder = "Search Engineer" value={this.state.searchInput || ""} name = "search" id = "search"/><br />
        </div>
        </CardHeader>
              <CardHeader>

              <div className="headernewclass">
                <div className="headernewone">
                <Input type="date" className="startclass" id="startdate" onChange={this.StartDate} value={this.state.startdate} />
                <Input type="date" className="endclass" id="enddate" onChange={this.EndDate} value={this.state.enddate} />
                </div>
                <div className="headernewtwo">
                <Select className="customerclass" type="select" id="customername1" name="customername"  onChange={this.quan.bind(this)} options={options}></Select>
                <Select type="select" id="product_category1" onChange={this.categorychange.bind(this)}  name="product_category" options={categories}></Select>
                <Button className="viewclass" onClick={(event)=> this.onOpenModal()}>View Report</Button>&nbsp;
                </div>
              </div>

              </CardHeader>
              <CardBody>
              <div className="calltoattendclass">
              <Modal open={open} onClose={this.onCloseModal} center>
              <Row className="justify-content-center">

              <Col xs="12" sm="12">
              <Form onSubmit={this.submitData}>
                    <CardBody>
                      <Table responsive bordered>
                      <thead>
                      <tr>
                      <th>Region</th>
                      <th>Name</th>
                      <th>Customer Name</th>
                      <th>Customer Address</th>
                      <th>Customer Country</th>
                      <th>Customer State</th>
                      <th>Customer City</th>
                      <th>Call Assign By</th>
                      <th>Call Assign To</th>
                      <th>Call Log Date</th>
                      <th>Call Visit Date</th>
                      <th>City of Service Call</th>
                      <th>Product Name</th>
                      <th>Product Category</th>
                      <th>Product Description</th>
                      <th>Service Call Status</th>
                      </tr>
                      </thead>
                      <tbody>
                      {renderTodo1}
                     </tbody>
                      </Table>

                    </CardBody>
                     </Form>
           <Button className="exportclass" id="export-button" onClick={()=>{this.exportCsv()}}>Export As CSV</Button>&nbsp;
              </Col>

              </Row>

              </Modal>

              </div>
                <Table responsive bordered>
                  <thead>
                  <tr>
                  <th>Region</th>
                  <th>Name</th>
                  <th>Customer Name</th>
                  <th>Call Log Date</th>
                  <th>City of Service Call</th>
                  <th>Product Category</th>
                  <th>Product Description</th>
                  <th>Service Call Status</th>
                  <th>Call Assigned To</th>
                  <th>Regenerate Call</th>
                  <th>View Call</th>
                  <th>Delete Call</th>
                  </tr>
                  </thead>
                <tbody>
               {renderTodos}
               </tbody>
                </Table>
                <Pagination>
                {renderPrevBtn}
                  {pageDecrementBtn}
                  {renderPageNumbers}
                  {pageIncrementBtn}
                  {renderNextBtn}
                </Pagination>
              </CardBody>
            </Card>
        </Col>
        </Row>



     );
    }
}
export default PendingCalls;
