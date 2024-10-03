import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
import { directive } from '@babel/types';
import firebaseConfig from '../../config';
import { FormGroup,Table,Pagination,Badge,PaginationItem,PaginationLink,CardHeader,Label,FormText,Button, Card, CardBody, CardFooter, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { userInfo } from 'os';
import $ from 'jquery';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const baseUrl = "http://localhost:5500";

class ListEngineers extends Component {

    constructor(props) {

        super(props);
        this.state = {
            allUsers: [],
            filteredUsers: [],
            currentTodos:[],
            currentPage: 1,
            todosPerPage: 15,
            upperPageBound: 15,
            lowerPageBound: 0,
            isPrevBtnActive: 'disabled',
            isNextBtnActive: '',
            pageBound: 15,
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
        this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
      }

      componentDidMount() {
        const userref =  firebaseConfig.database().ref(`/Users/`).orderByChild("Isdeleted").equalTo("active");

            userref.on("value", snapshot =>{
              let allUsers = snapshot.val();
              console.log("get all users in a list",allUsers);
              let newState = [];

                for(let user in allUsers){

                  newState.push({
                    id: user,
                    Name: allUsers[user].Name,
                    Email:allUsers[user].Email,
                    Region:allUsers[user].Region,
                    Address:allUsers[user].Address,
                    Status:allUsers[user].Status,
                    Isdeleted: allUsers[user].Isdeleted,
                  });
                }

                this.setState({
                  allUsers: newState, filteredUsers: newState, currentTodos: newState,
                });

                  console.log("all users",this.state.allUsers);

            })
      }

      componentDidUpdate() {
        $("ul li.active").removeClass('active');
        $('ul li#'+this.state.currentPage).addClass('active');
      }

      handleClick(event) {
        let listid = Number(event.target.id);
         this.setState({
           currentPage: listid
         });
         $("ul li.active").removeClass('active');
         $('ul li#'+listid).addClass('active');
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
      if((this.state.currentPage -1)% this.state.pageBound === 0 ){
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



      handleChange = event => {
        this.setState({ searchInput: event.target.value }, () =>
          this.globalSearch()
        );
      };

      routeChange(id) {
        let path = `/newservicecalls/`+id;
        this.props.history.push(path);
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



      editenginner(id) {
        let path = `/editenginner/`+id;
        this.props.history.push(path);
      }

    approveEngineer = (id) => {

      firebaseConfig.database().ref(`/Users/`+id).update({Status: 'Approved'});
      this.setState({ title: "Approve" });

    }

    disapproveEngineer = (id) => {

      firebaseConfig.database().ref(`/Users/`+id).update({Status: 'Rejected'});

    }


    deleteEngineer = (id) => {
      var user = id;
    console.log("id",id);
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui'>
              <h3>Are you sure?</h3>
              <p>You want to delete this enginner?</p>
              <button onClick={onClose}>No</button>
              <button
                onClick={() => {
                  firebaseConfig.database().ref(`/Users/`+id).update({Isdeleted: 'inactive'});

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
      var newarray = [['id','Name','Email','Region','Address','Status']];
      var re = this.state.filteredUsers;
      for(var item=0;item<re.length;item++){
        newarray.push([item,re[item].Name,re[item].Email,re[item].Region,re[item].Address,re[item].Status]);
      }


      for(var i =0; i<newarray.length;++i){
        csvRow.push(newarray[i].join(","));
      }

      var csvstring = csvRow.join("%0A");
      var a = document.createElement("a");
      a.href = 'data:attachment/csv,' + csvstring;
      a.target = "_Blank";
      a.download = "engineers.csv";
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
            {partners.Name}
        </td>
        <td>{partners.Email}</td>
        <td>{partners.Region}</td>
        <td>{partners.Address}</td>
        <td>{partners.Status==="Pending" ? (
          <h4><Badge  color="warning">{partners.Status}</Badge></h4>
        ) : (
          <h4><Badge  color="success">{partners.Status}</Badge></h4>
        )}

        </td>
        <td>{partners.Status==="Approved" ? (

          <Button size="md" block color="danger" onClick={()=>this.disapproveEngineer(partners.id)}>
          Disapprove
        </Button>
        ) : (
          <Button size="md" block color="primary" onClick={()=>this.approveEngineer(partners.id)}>
          Approve
        </Button>
        )}

        </td>
        <td>
        <span size="md" id="grid" onClick={()=>this.deleteEngineer(partners.id)}>
        <i className="fa fa-trash fa-lg float-center"></i>
        </span>
        {/* <Button size="sm"  block color="primary" onClick={()=>this.deleteEngineer(partners.id)}>
          Delete
        </Button> */}
        </td>
        <td>
        <span size="md" id="grid" onClick={()=>this.routeChange(partners.id)}>
        <i className="fa fa-tasks fa-lg float-center"></i></span>

        {/* <Button size="sm"  block color="primary" >
          Assign Service Call
        </Button> */}
        </td>
        <td>
        <span size="md" id="grid" onClick={()=>this.editenginner(partners.id)}>
        <i className="fa fa-edit fa-lg float-center"></i>

        </span>
        {/* <Button size="sm"  block color="primary" onClick={()=>this.editenginner(partners.id)}>
         Edit Engineer Profile
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
                <i className="fa fa-align-justify"></i> Engineers &nbsp;
                <Button size="lg" onClick={()=>{this.exportCsv()}}>Export As CSV</Button>&nbsp;
  <Input id="input-search" data={this.state.filteredUsers} onChange={this.handleChange} handleSetData={this.handleSetData} type = "text" placeholder = "Search Engineer" value={this.state.searchInput || ""} name = "search" id = "search"/>&nbsp;
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Region</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Approve Engineer</th>
                    <th>Delete Engineer</th>
                    <th>Service Call</th>
                    <th>Edit Engineer</th>
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
export default ListEngineers;
