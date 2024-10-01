import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
import { directive } from '@babel/types';

import { FormGroup,Table,Pagination,Badge,PaginationItem,PaginationLink,CardHeader,Label,FormText,Button, Card, CardBody, CardFooter, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { userInfo } from 'os';
import UserMaster from '../UserMaster/UserMaster';
import {API_BASE_URL} from '../../config';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
// import $ from 'jquery';


class ProductPurchaseReport extends Component {

    constructor(props) {

        super(props);
        this.state = {
            allUsers: [],
            filteredUsers: [],
            currentTodos:[],
            currentPage: 1,
            todosPerPage: 10,
            upperPageBound: 10,
            lowerPageBound: 0,
            isPrevBtnActive: 'disabled',
            isNextBtnActive: '',
            pageBound: 10,
            title1:'Approve',
            title2: 'Disapprove',
            searchInput: "",
            fromdate:'',
            todate:'',
            cattletype:'',
            showResults: false,
            rmcucentername:'',
            centername:'',
            errors: {},
            allrmcu:[],
            centernamenew:[],
            farmername:'',
            farmernamenew:[],
        };

        this.routeChange = this.routeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSetData = this.handleSetData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnNextClick = this.btnNextClick.bind(this);
        this.btnPrevClick = this.btnPrevClick.bind(this);
        this.FromDate = this.FromDate.bind(this);
        this.ToDate = this.ToDate.bind(this);
        this.CattleType = this.CattleType.bind(this);
        this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.RMCUCentername= this.RMCUCentername.bind(this);
        this.CenterName= this.CenterName.bind(this);
        this.FarmerName= this.FarmerName.bind(this);
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


      handleChange = event => {
        this.setState({ searchInput: event.target.value }, () =>
          this.globalSearch()
        );
      };


      routeChange(id) {
        let path = `/newservicecalls/`+id;
        this.props.history.push(path);
      }


    adduser(){
      let path = `/listusers/usermaster/`;
      this.props.history.push(path);
    }

      handleClick(event) {
        let listid = Number(event.target.id);
        this.setState({
          currentPage: listid
        });
        // $(".page-item .active").removeClass('active');
        //     $('.page-item#'+listid).addClass('active');
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

        let filteredData = this.state.allUsers.filter(value => {
          //console.log("",value);
          // return (
          //   value.user_name.toLowerCase().includes(searchInput.toLowerCase()) ||
          //   value.Region.toLowerCase().includes(searchInput.toLowerCase()) ||
          //   value.Email.toLowerCase().includes(searchInput.toLowerCase()) ||
          //   value.Address.toLowerCase().includes(searchInput.toLowerCase()) ||
          //   value.Status.toLowerCase().includes(searchInput.toLowerCase()) ||
          //   value.toString().toLowerCase().includes(searchInput.toLowerCase())
          // );
        });
        this.handleSetData(filteredData);
      };



      edituser(id) {
          let path = `/edituser/`+id;

        this.props.history.push(path);
      }

      handleClickDelete = (id) => {
          axios.post(API_BASE_URL+'/deleteuser/' + id)
          .then(response => {
             window.location.reload(false);
            })
      }

      deleteUser = (id) => {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className='custom-ui'>
                <h3>Are you sure?</h3>
                <p>You want to delete this file?</p>
                <button onClick={onClose}>No</button>
                <button
                  onClick={() => {
                    this.handleClickDelete(id);
                    onClose();
                  }}
                >
                  Yes, Delete it!
                </button>
              </div>
            );
          }
        });

    }

      FromDate(e) {
         this.setState({ fromdate: e.target.value });
      }

      ToDate(e) {
        this.setState({ todate: e.target.value });
     }

      CattleType(e) {
        this.setState({ cattletype: e.target.value });
     }


    componentDidMount() {       
        axios.get(API_BASE_URL+'/listcenter')
        .then(response => {
            this.setState({
              allcenter: response.data.data,              
            });
            console.log("response",response.data);

        })
        .catch(e => {

        });

        axios.get(API_BASE_URL+'/listsociety')
        .then(response => {
            this.setState({ allrmcu: response.data.data });
            console.log("response",response.data);

        })
        .catch(e => {

        });
    }

    
      // $(".page-item.active").removeClass('active');
      // $('.page-item#'+this.state.currentPage).addClass('active');




    exportCsv(){
      var csvRow = [];
      var newarray = [['S.No.','Center No.','Society No.','Farmer No.','Date','Shift','Quantity','Amount']];
      var re = this.state.filteredUsers;
      for(var item=0;item<re.length;item++){
        newarray.push([item,re[item].centernumber,re[item].rmcunumber,re[item].farmer_number,re[item].created_at,re[item].shift,re[item].sum_of_totalweight,re[item].sum_of_totalamount]);
      }


      for(var i =0; i<newarray.length;++i){
        csvRow.push(newarray[i].join(","));
      }

      var csvstring = csvRow.join("%0A");
      var a = document.createElement("a");
      a.href = 'data:attachment/csv,' + csvstring;
      a.target = "_Blank";
      a.download = "memberpassbook.csv";
      document.body.appendChild(a);
      a.click();

      //console.log("njkbnjk",csvstring);

    }



    handleSetData = allUsers => {
      console.log("gndfjkjkgndfjkg",allUsers);
      this.setState({ filteredUsers: allUsers });

    };

    onClick = e => {
      e.preventDefault();    
      let errors = {};
      if(this.state.rmcunnewnumber=="" || this.state.centernamenew=="" ||this.state.farmernumber==""){
        errors["filtererror"] = "Please select filter";
      }
      else {
        axios.post(API_BASE_URL+'/productpurchasereport',{
          rmcuvalue:this.state.rmcunnewnumber,
          centervalue:this.state.centernamenew,          
          fromdate: this.state.fromdate,
          todate:this.state.todate
          }).then(response => {          
            this.setState({ 
              allUsers: response.data.data,
              filteredUsers:response.data.data,
              currentTodos:response.data.data ,
              showResults: true
            });      
          });
          errors["filtererror"] = "";
      }
      
      
        this.setState({ errors: errors});
      
  };

    render() {

      console.log("list of users",this.state.allUsers);

      let { farmernamenew,centernamenew,allrmcu,errors,filteredUsers,currentPage, todosPerPage,upperPageBound,lowerPageBound,isPrevBtnActive,isNextBtnActive } = this.state;
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage; 

       let rmcuList = allrmcu.length > 0
            && allrmcu.map((item, i) => {
            return (
              <option key={i} value={item.id} >{item.society_name}</option>
            )
          }, this);

          let centerlist = centernamenew.length > 0
          && centernamenew.map((item, i) => {
          return (
            <option key={i} value={item.id} >{item.center_name}</option>
          )
        }, this);  

        let farmerlist = farmernamenew.length > 0
      && farmernamenew.map((item, i) => {
      return (
        <option key={i} value={item.id} >{item.farmername}</option>
      )
    }, this);   

      let abxd = Object.keys(filteredUsers).length;
      let currentTodos;

       if(abxd > 3){
          currentTodos = filteredUsers.slice(indexOfFirstTodo, indexOfLastTodo);
       }
       else {
        currentTodos = filteredUsers;
       }


      const renderTodos = currentTodos.map((partners, index) => {

        return <tr key={partners.id}>
        <td>
            {index}
        </td>
             
        <td>
            {partners.productname}
        </td>
        <td>
            {partners.productnumber}
        </td>
        <td>
            {partners.center_id}-{partners.center_name}
        </td>
        <td>
            {partners.productquantity}
        </td> 
        <td>
            {partners.allocatedstock}
        </td>  
        <td>
            {partners.salerate}
        </td>
             
    </tr>;

      });


      const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredUsers.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }


      const renderPageNumbers = pageNumbers.map(number => {
        if(number === 1 && currentPage === 1){
            return(
        <PaginationItem><a href='#' id={number} onClick={this.handleClick}><PaginationLink key={number} className='active' id={number}>{number}</PaginationLink></a></PaginationItem>
            )
        }
        else if((number < upperPageBound + 1) && number > lowerPageBound){
            return(

                <PaginationItem><a href='#' id={number} onClick={this.handleClick}><PaginationLink key={number} id={number}>{number}</PaginationLink></a></PaginationItem>
            )
        }
    });


    let pageIncrementBtn = null;
    if(pageNumbers.length > upperPageBound){
        pageIncrementBtn = <PaginationItem><PaginationLink className='' previous tag="button"><a href='#' onClick={this.btnIncrementClick}> &hellip; </a></PaginationLink></PaginationItem>
    }
    let pageDecrementBtn = null;
    if(lowerPageBound >= 1){
        pageDecrementBtn = <PaginationItem><PaginationLink className='' previous tag="button"> <a href='#' onClick={this.btnDecrementClick}> &hellip; </a></PaginationLink></PaginationItem>
    }
    let renderPrevBtn = null;
    if(isPrevBtnActive === 'disabled') {
        renderPrevBtn = <PaginationItem><PaginationLink className={isPrevBtnActive} previous tag="button"> Prev </PaginationLink></PaginationItem>
    }
    else{
        renderPrevBtn = <PaginationItem><a href='#' id="btnPrev" onClick={this.btnPrevClick}><PaginationLink className={isPrevBtnActive} previous tag="button"> Prev </PaginationLink></a></PaginationItem>
    }
    let renderNextBtn = null;

    if(isNextBtnActive === 'disabled') {

        renderNextBtn = <PaginationItem><PaginationLink className={isNextBtnActive} next tag="button">Next</PaginationLink></PaginationItem>
    }
    else{
        renderNextBtn = <PaginationItem><a href='#' id="btnNext" onClick={this.btnNextClick}><PaginationLink className={isNextBtnActive} next tag="button"> Next </PaginationLink></a></PaginationItem>
    }

     return(

        <Row className="justify-content-center">
        <Col xs="12" sm="12">
        <Card>

              <CardHeader>
                <i className="fa fa-align-justify"></i> Product Sale Report &nbsp;                
                
  {/* <Input id="input-search" data={this.state.filteredUsers} onChange={this.handleChange} handleSetData={this.handleSetData} type = "text" placeholder = "Search Engineer" value={this.state.searchInput || ""} name = "search" id = "search"/>&nbsp; */}
              </CardHeader>
              <CardBody>
              <div align="center">
              <Row gutter={20}>
              <Col lg="12">

              <FormGroup check inline>
                <Label className="form-check-label" check htmlFor="fromdate">Select From Date</Label>
                <Input className="form-check-input" type="date" id="fromdate" name="fromdate" onChange={this.FromDate} value={this.state.fromdate}/>
              </FormGroup>

              <FormGroup check inline>
                <Label className="form-check-label" check htmlFor="settingvalue">Select To Date</Label>
                <Input className="form-check-input" type="date" id="todate" name="todate" onChange={this.ToDate} value={this.state.todate}/>
              </FormGroup>
             
              <FormGroup check inline>
                <Label className="form-check-label" check htmlFor="date">Select Society</Label>&nbsp;&nbsp;
                <Input type="select" name ="select" id="select" value={this.state.rmcucentername} onChange={this.RMCUCentername}>
                <option value="1">Please Select Society</option>
                {rmcuList}
                </Input>
              </FormGroup>
              <FormGroup check inline>
                <Label className="form-check-label" check htmlFor="settingvalue">Select Center</Label>
                <Input type="select" name ="select" id="select" value={this.state.centername} onChange={this.CenterName}>
                    <option value="select">Please Select Center</option>
                    {centerlist}
                    </Input>
              </FormGroup><br/><br/>
              
              
              <FormGroup check inline>                
              <Button type="submit" size="md" color="primary" onClick={this.onClick}><i className="fa fa-dot-circle-o"></i> View Report</Button>&nbsp;&nbsp;
              </FormGroup>
              </Col>
              </Row>
              </div>
              <div className="collectionhistoryclass" style={{ display: this.state.showResults ? "block" : "none" }}>
              <span className="error">{this.state.errors["filtererror"]}</span>
                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Product Name</th> 
                    <th>ProductId</th>
                    <th>Center Code.</th>                    
                    <th>Requested Quantity.</th>
                    <th>Allocated Quantity</th>                                                          
                    <th>Sale Rate</th>
                                       
                  </tr>
                  </thead>
                <tbody>
                  {renderTodos}
               </tbody>
                </Table>
                
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

                <Pagination>
                  {renderPrevBtn}
                  {pageDecrementBtn}
                  {renderPageNumbers}
                  {pageIncrementBtn}
                  {renderNextBtn}
                </Pagination>
                </div>
              </CardBody>
            </Card>
        </Col>
        </Row>



     );
    }
}
export default ProductPurchaseReport;
