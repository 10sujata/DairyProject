import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
import { directive } from '@babel/types';

import { FormGroup,Table,Pagination,Badge,PaginationItem,PaginationLink,CardHeader,Label,FormText,Button, Card, CardBody, CardFooter, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { userInfo } from 'os';
import UserMaster from '../UserMaster/UserMaster';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// import $ from 'jquery';


class TruckSheetReport extends Component {

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
            fromdate:'',
            todate:'',
            pageBound: 10,
            title1:'Approve',
            title2: 'Disapprove',
            searchInput: "",
            showResults: false,
            rmcucentername:'',
            centername:'',
            allrmcu:[],
            centernamenew:[],
            errors: {},
        };

       
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnNextClick = this.btnNextClick.bind(this);
        this.btnPrevClick = this.btnPrevClick.bind(this);      
        this.FromDate = this.FromDate.bind(this);
        this.ToDate = this.ToDate.bind(this);
        this.RMCUCentername= this.RMCUCentername.bind(this);
        this.CenterName= this.CenterName.bind(this);
        this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
      }

      FromDate(e) {
         this.setState({ fromdate: e.target.value });
      }

      ToDate(e) {
        this.setState({ todate: e.target.value });
     }




     onClick = e => {
        e.preventDefault();    
        let errors = {};
        if(this.state.fromdate=="" || this.state.todate==""){
          errors["filtererror"] = "Please select filter";
        }
        else {
          axios.post(API_BASE_URL+'/listtrucksheet',{  
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
          return (
            value.Name.toLowerCase().includes(searchInput.toLowerCase()) ||
            value.Region.toLowerCase().includes(searchInput.toLowerCase()) ||
            value.Email.toLowerCase().includes(searchInput.toLowerCase()) ||
            value.Address.toLowerCase().includes(searchInput.toLowerCase()) ||
            value.Status.toLowerCase().includes(searchInput.toLowerCase()) ||
            value.toString().toLowerCase().includes(searchInput.toLowerCase())
          );
        });
        this.handleSetData(filteredData);
      };



      


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

    
    componentDidUpdate() {
    
  }
   
    exportCsv(){
      var csvRow = [];
      var newarray = [['id','Shift','Driver Name','Driver Contact No','Date','Time','Totalwt Cow','Total wt Buffalo','AvgFat Cow','AvgFat Buffalo','AvgSNF Cow','Avg SNF Buffalo']];
      var re = this.state.filteredUsers;
      for(var item=0;item<re.length;item++){
        newarray.push([item,re[item].shift,re[item].driver_name,re[item].driver_contact,re[item].date,re[item].time,re[item].total_weight_cow,re[item].total_weight_buffalo,re[item].avgfat_cow,re[item].avgfat_buffalo,re[item].avgsnf_cow,re[item].avgsnf_buffalo]);
      }


      for(var i =0; i<newarray.length;++i){
        csvRow.push(newarray[i].join(","));
      }

      var csvstring = csvRow.join("%0A");
      var a = document.createElement("a");
      a.href = 'data:attachment/csv,' + csvstring;
      a.target = "_Blank";
      a.download = "society.csv";
      document.body.appendChild(a);
      a.click();

      //console.log("njkbnjk",csvstring);

    }


    handleSetData = allUsers => {
      console.log("gndfjkjkgndfjkg",allUsers);
      this.setState({ filteredUsers: allUsers });
    };

    

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

    render() {
      let {  errors,filteredUsers,currentPage, allrmcu,centernamenew,todosPerPage,upperPageBound,lowerPageBound,isPrevBtnActive,isNextBtnActive } = this.state;
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      console.log("==",filteredUsers,indexOfFirstTodo,indexOfLastTodo);

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
            {partners.shift}
        </td>
        <td>
            {partners.driver_name}
        </td>
        <td>{partners.driver_contact}</td>
        <td>{partners.date}</td>
        <td>{partners.time}</td>
        <td>{partners.total_weight_cow}</td>
        <td>{partners.total_weight_buffalo}</td>
        <td>{partners.avgfat_cow}</td>
        <td>{partners.avgfat_buffalo}</td>        
        <td>{partners.avgsnf_cow}</td>
        <td>{partners.avgsnf_buffalo}</td>
        
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
              </FormGroup><br /><br />

              <FormGroup check inline>
                <Label className="form-check-label" check htmlFor="date">Select RMCU</Label>&nbsp;&nbsp;
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
              </FormGroup>

                  
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
                    <th>id</th>
                    <th>Shift</th>
                    <th>Driver Name</th>
                    <th>Driver Contact</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Total wt Cow </th>
                    <th>Total wt Buffalo </th>
                    <th>AvgFat Cow </th>
                    <th>AvgFat Buffalo </th>
                    <th>AvgSNF Cow </th>
                    <th>AvgSNF Buffalo </th>
                    

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
export default TruckSheetReport;
