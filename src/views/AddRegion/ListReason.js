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
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class ListReason extends Component {

    constructor(props) {

        super(props);
        this.state = {
            allUsers: [],
            filteredUsers: [],
            currentTodos:[],
            title1:'Approve',
            title2: 'Disapprove',
            currentPage: 1,
            todosPerPage:15,
            upperPageBound: 15,
            lowerPageBound: 0,
            isPrevBtnActive: 'disabled',
            isNextBtnActive: '',
            pageBound: 15,
            title1:'Approve',
            title2: 'Disapprove',
            searchInput: ""
        };

        //this.routeChange = this.routeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSetData = this.handleSetData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnNextClick = this.btnNextClick.bind(this);
        this.btnPrevClick = this.btnPrevClick.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
        this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);

        //this.routeChange = this.routeChange.bind(this);
      }

    //   routeChange(id) {
    //     let path = `/newservicecalls/`+id;
    //     this.props.history.push(path);
    //   }

    handleChange = event => {
      this.setState({ searchInput: event.target.value }, () =>
        this.globalSearch()
      );
    };


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


    editregion(id) {
        let path = `/editregion/`+id;
        this.props.history.push(path);
      }


    componentDidMount() {
      const userref =  firebaseConfig.database().ref(`/Regions/`).orderByChild("Isdeleted").equalTo("active");
          userref.on("value", snapshot =>{
            let allUsers = snapshot.val();
            let newState = [];
              for(let user in allUsers){
                newState.push({
                  id: user,
                  RegionName: allUsers[user].RegionName,
                });
              }
              this.setState({
                allUsers: newState,filteredUsers: newState,currentTodos: newState,
              });
          })
    }

    componentDidUpdate() {
      $(".page-item.active").removeClass('active');
      $('.page-item#'+this.state.currentPage).addClass('active');
}

deleteRegion = (id) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className='custom-ui'>
          <h3>Are you sure?</h3>
          <p>You want to delete this region?</p>
          <button onClick={onClose}>No</button>
          <button
            onClick={() => {
              firebaseConfig.database().ref(`/Regions/`+id).update({Isdeleted: 'inactive'});
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

    globalSearch = () => {
      let { searchInput } = this.state;

      let filteredData = this.state.allUsers.filter(value => {
        return (
          value.RegionName.toLowerCase().includes(searchInput.toLowerCase()) ||
          // value.Region.toLowerCase().includes(searchInput.toLowerCase()) ||
          // value.Email.toLowerCase().includes(searchInput.toLowerCase()) ||
          // value.Address.toLowerCase().includes(searchInput.toLowerCase()) ||
          // value.Status.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.toString().toLowerCase().includes(searchInput.toLowerCase())
        );
      });
      this.handleSetData(filteredData);
    };


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
      //console.log("gndfjkjkgndfjkg",allUsers);
      this.setState({ filteredUsers: allUsers });
    };


    render() {


      let { filteredUsers,currentPage, todosPerPage,upperPageBound,lowerPageBound,isPrevBtnActive,isNextBtnActive } = this.state;
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;      

      let abxd = Object.keys(filteredUsers).length;
      let currentTodos;

       if(abxd > 2){
          currentTodos = filteredUsers.slice(indexOfFirstTodo, indexOfLastTodo);
       }
       else {
        currentTodos = filteredUsers;
       }


       const renderTodos = currentTodos.map((partners, index) => {

        return <tr key={partners.id}>
        <td>
            {partners.RegionName}
        </td>
        <td>
        <span size="md" id="grid" onClick={()=>this.deleteRegion(partners.id)}>
        <i className="fa fa-trash fa-lg float-center"></i>
        </span>
        {/* <Button size="sm"  block color="primary" onClick={()=>this.deleteEngineer(partners.id)}>
          Delete
        </Button> */}
        </td>
        <td>
        <span size="md" id="grid" onClick={()=>this.editregion(partners.id)}>
        <i className="fa fa-edit fa-lg float-center"></i></span>
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
                <i className="fa fa-align-justify"></i> Regions&nbsp;
                <Button size="lg" onClick={()=>{this.exportCsv()}}>Export As CSV</Button>&nbsp;
                <Input id="input-search" data={this.state.filteredUsers} onChange={this.handleChange} handleSetData={this.handleSetData} type = "text" placeholder = "Search Engineer" value={this.state.searchInput || ""} name = "search" id = "search"/>&nbsp;
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Region Name</th>
                    <th>Delete</th>
                    <th>Edit Region</th>
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
export default ListReason;
