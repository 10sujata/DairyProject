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
import {API_BASE_URL} from '../../config';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

// import $ from 'jquery';


class SettingsList extends Component {

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
            searchInput: ""
        };

        this.routeChange = this.routeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSetData = this.handleSetData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnNextClick = this.btnNextClick.bind(this);
        this.btnPrevClick = this.btnPrevClick.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleClickDelete1 = this.handleClickDelete1.bind(this);
        this.handleClickDelete2 = this.handleClickDelete2.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
        this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
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

      handleClickDelete1(){
        let path = `/centermaster/`;
        this.props.history.push(path);
      }

      handleClickDelete2(){
        let path = `/transactionsettings/`;
        this.props.history.push(path);
      }

    adddevice(){
      // let path = `/centermaster/`;
      // this.props.history.push(path);
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui'>

              <button
                onClick={() => {
                  this.handleClickDelete1();
                  onClose();
                }}
              >
                Already Created User
              </button>

              <button
                onClick={() => {
                  this.handleClickDelete2();
                  onClose();
                }}
              >
                Create User
              </button>

              <button onClick={onClose}>Cancle</button>
            </div>
          );
        }
      });
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



      editsettings(id) {
        let path = `/editsettings/`+id;
        this.props.history.push(path);
      }



    componentDidMount() {


      axios.get(API_BASE_URL+'/settingslist')
      .then(response => {
          this.setState({ allUsers: response.data.data,filteredUsers:response.data.data,currentTodos:response.data.data });
          console.log("response",response.data);

      })
      .catch(e => {

      });
      
    }

    

    componentDidUpdate() {
    //   $(".page-item.active").removeClass('active');
    //   $('.page-item#'+this.state.currentPage).addClass('active');
}
    

    handleClickDelete = (id) => {
        axios.post(API_BASE_URL+'/deletesettings/' + id)
        .then(response => {
           window.location.reload(false);
          })
    }

   deletesettings = (id) => {
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

    exportCsv(){
      var csvRow = [];
      var newarray = [['id','Society Name','Center Name','Scale','Analyzer','Cow Morning','Buffalo Morning','Cow Evening','Buffalo Evening','Printing Value','Setting Value','Header Message','Footer Message']];
      var re = this.state.filteredUsers;
      for(var item=0;item<re.length;item++){
        newarray.push(
          [
          item,re[item].rmcunameid,
          re[item].centernameid,
          re[item].scale,
          re[item].analyzer,
          re[item].cowmorningname,
          re[item].buffelomorningname,
          re[item].coweveningname,
          re[item].buffeloeveningname,
          re[item].printingvalue,
          re[item].settingvalue,
          re[item].headermessage,
          re[item].footermessage,        
        ]);
      }


      for(var i =0; i<newarray.length;++i){
        csvRow.push(newarray[i].join(","));
      }

      var csvstring = csvRow.join("%0A");
      var a = document.createElement("a");
      a.href = 'data:attachment/csv,' + csvstring;
      a.target = "_Blank";
      a.download = "Settings.csv";
      document.body.appendChild(a);
      a.click();

      //console.log("njkbnjk",csvstring);

    }


    handleSetData = allUsers => {
      console.log("gndfjkjkgndfjkg",allUsers);
      this.setState({ filteredUsers: allUsers });
    };

    render() {
      let { filteredUsers,currentPage, todosPerPage,upperPageBound,lowerPageBound,isPrevBtnActive,isNextBtnActive } = this.state;
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      console.log("==",filteredUsers,indexOfFirstTodo,indexOfLastTodo);

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
            {partners.rmcunameid}
        </td>
        <td>{partners.centernameid}</td>
        <td>{partners.scale}</td>
        <td>{partners.analyzer}</td>
        <td>{partners.cowmorningname}</td>
        <td>{partners.buffelomorningname}</td>
        <td>{partners.coweveningname}</td>
        <td>{partners.buffeloeveningname}</td>
        <td>{partners.printingvalue}</td>
        
        {
            partners.snfformula==="1" ? (
                <td>Applied</td>
            ) : (
                <td>No</td>
            )
        } 
        
        
        {
            partners.littervalue==="1" ? (
                <td>0.970</td>
            ) : (
                <td>1</td>
            )
        } 
       
        <td>{partners.settingvalue}</td>
        <td>{partners.headermessage}</td>
        <td>{partners.footermessage}</td>

        <td>
         <i className="fa fa-trash fa-lg float-center" onClick={()=>this.deletesettings(partners.id)}></i>&nbsp;&nbsp;&nbsp;
         <i className="fa fa-edit fa-lg float-center" onClick={()=>this.editsettings(partners.id)}></i>
        {/* <Button size="sm"  block color="primary" onClick={()=>this.deleteEngineer(partners.id)}>
          Delete
        </Button> */}
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
                <i className="fa fa-align-justify"></i> Users &nbsp;
                <Button size="lg" onClick={()=>{this.exportCsv()}}>Export As CSV</Button>&nbsp;
                <Button size="lg" onClick={()=>{this.handleClickDelete2()}}>Add Settings</Button>&nbsp;
  {/* <Input id="input-search" data={this.state.filteredUsers} onChange={this.handleChange} handleSetData={this.handleSetData} type = "text" placeholder = "Search Engineer" value={this.state.searchInput || ""} name = "search" id = "search"/>&nbsp; */}
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Society Name</th>
                    <th>Center Name</th>
                    <th>Scale</th>
                    <th>Analyzer</th>
                    <th>Cow morning</th>
                    <th>Buffalo morning</th>
                    <th>Cow evening</th>
                    <th>Buffalo evening</th>
                    <th>Printing value</th>
                    <th>Snf value</th>
                    <th>Kg to Ltr factor</th>
                    <th>Setting value</th>
                    <th>Header message</th>
                    <th>Footer message</th>
                    <th>Actions</th>
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
              </CardBody>
            </Card>
        </Col>
        </Row>



     );
    }
}
export default SettingsList;



