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


class CenterList extends Component {

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
        let path = `/listcenter/centermaster/`;
        this.props.history.push(path);
      }

      handleClickDelete2(){
        let path = `/listusers/usermaster/`;
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
            value.center_name.toLowerCase().includes(searchInput.toLowerCase())           
          );
        });
        this.handleSetData(filteredData);
      };



      editcenter(id) {
        let path = `/editcenter/`+id;
        this.props.history.push(path);
      }



    componentDidMount() {
      axios.get(API_BASE_URL+'/listcenter')
      .then(response => {
          this.setState({ allUsers: response.data.data,filteredUsers:response.data.data,currentTodos:response.data.data });
          console.log("response",response.data);

      })
      .catch(e => {

      });
      // const userref =  firebaseConfig.database().ref(`/Users/`);

      //     userref.on("value", snapshot =>{
      //       let allUsers = snapshot.val();
      //       console.log("get all users in a list",allUsers);
      //       let newState = [];

      //         for(let user in allUsers){

      //           newState.push({
      //             id: user,
      //             Name: allUsers[user].Name,
      //             Email:allUsers[user].Email,
      //             Region:allUsers[user].Region,
      //             Address:allUsers[user].Address,
      //             Status:allUsers[user].Status,
      //             Isdeleted: allUsers[user].Isdeleted,
      //           });
      //         }

      //         this.setState({
      //           allUsers: newState, filteredUsers: newState, currentTodos: newState,
      //         });

      //           console.log("all users",this.state.allUsers);

      //     })
    }

    // approveEngineer = (id) => {

    //   firebaseConfig.database().ref(`/Users/`+id).update({Status: 'Approved'});
    //   this.setState({ title: "Approve" });

    // }

    componentDidUpdate() {
    //   $(".page-item.active").removeClass('active');
    //   $('.page-item#'+this.state.currentPage).addClass('active');
}
    // disapproveEngineer = (id) => {

    //   firebaseConfig.database().ref(`/Users/`+id).update({Status: 'Rejected'});

    // }


    handleClickDelete = (id) => {
        axios.post(API_BASE_URL+'/deletecenter/' + id)
        .then(response => {
           window.location.reload(false);
          })
    }

   deletecenter = (id) => {
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
      var newarray = [['id','Center Name','Center name in regional language','Center Number','Center Operator','Center Operator ame in regional language','Center Address','Center Pin','Contact Details']];
      var re = this.state.filteredUsers;
      console.log("dsfdsfs",re);


      for(var item=0;item<re.length;item++){
        newarray.push([item,re[item].center_name,re[item].center_name1,re[item].center_number,re[item].center_operator,re[item].center_operator1,re[item].center_address,re[item].center_pin,re[item].contact_details]);
      }


      for(var i =0; i<newarray.length;++i){
        csvRow.push(newarray[i].join(","));
      }

      var csvstring = csvRow.join("%0A");
      var a = document.createElement("a");
      a.href = 'data:attachment/csv,' + csvstring;
      a.target = "_Blank";
      a.download = "center.csv";
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
            {partners.center_name}
        </td>
        <td>{partners.rmcuname}</td>
        <td>{partners.center_name1}</td>
        <td>{partners.center_operator}</td>
        <td>{partners.center_operator1}</td>
        <td>{partners.center_address}</td>
        <td>{partners.contact_details}</td>

        <td>
        <i className="fa fa-trash fa-lg float-center" onClick={()=>this.deletecenter(partners.id)}></i>&nbsp;&nbsp;&nbsp;
        <i className="fa fa-edit fa-lg float-center" onClick={()=>this.editcenter(partners.id)}></i>
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
                <Button size="lg" onClick={()=>{this.adddevice()}}>Add Center</Button>&nbsp;
  <Input id="input-search" data={this.state.filteredUsers} onChange={this.handleChange} handleSetData={this.handleSetData} type = "text" placeholder = "Search Center" value={this.state.searchInput || ""} name = "search" id = "search"/>&nbsp;
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Center Name</th>
                    <th>Society Name</th>
                    <th>Center Name In regional language</th>
                    <th>Center Operator Name</th>
                    <th>Center Operator Name In Regional language</th>
                    <th>Center Address</th>
                    <th>Contact Details</th>

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
export default CenterList;
