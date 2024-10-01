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
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {API_BASE_URL} from '../../config';


class PurchaseRequisition extends Component {

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
            allocatedstock:'',
            title1:'Approve',
            title2: 'Disapprove',
            searchInput: "",
            open: false,
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
        this.onOpenModal = this.onOpenModal.bind(this);
        this.AllocatedStock = this.AllocatedStock.bind(this);
        this.submitData = this.submitData.bind(this);
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

    submitData(e) {
        e.preventDefault();
        const {allocatedstock,productname,productnumber,productunit,productquantity} = this.state;
        console.log("allocatedstock",this.state.productname);
    }

    adddevice(){
      let path = `/listfarmers/farmermaster/`;
      this.props.history.push(path);
    }

    AllocatedStock(e){
      this.setState({allocatedstock: e.target.value});
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



      editfarmer(id) {
        let path = `/editfarmer/`+id;
        this.props.history.push(path);
      }

    componentDidMount() {
      axios.get(API_BASE_URL+'/listpurchase')
      .then(response => {
          this.setState({ allUsers: response.data.data,filteredUsers:response.data.data,currentTodos:response.data.data });
          console.log("response",response.data);

      })
      .catch(e => {

      });

    }

    onOpenModal = (id) => {
      console.log("person id",id);
      axios.get(API_BASE_URL+'/listpurchasecenter/'+ id)
      .then(response => {
          this.setState({ allUsers: response.data.data});
          this.setState({ productnumber: response.data.data[0].productnumber,productname: response.data.data[0].productname,productunit: response.data.data[0].productunit,productquantity: response.data.data[0].productquantity});
          console.log("response",response.data);
      })
      .catch(e => {

      });

      axios.get(API_BASE_URL+'/stockvalues/' + id)
       .then(response => {
         console.log("center id",response);
         if(response.data.data==""){
           this.setState({
             availablestock: "0",
          });
        }
        else {
          this.setState({
            availablestock: response.data.data[0].availablestock,
            salerate: response.data.data[0].salerate,
         });
        }

    })
      this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };


    handleClickDelete = (id) => {
        axios.post(API_BASE_URL+'/deletefarmernew/' + id)
        .then(response => {
           window.location.reload(false);
          })
    }

   deletefarmer = (id) => {
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
      var newarray = [['id','Device Name','Device Name In Regional Language','No Of Devices']];
      var re = this.state.filteredUsers;
      for(var item=0;item<re.length;item++){
        newarray.push([item,re[item].device_name,re[item].device_name1,re[item].no_devices]);
      }


      for(var i =0; i<newarray.length;++i){
        csvRow.push(newarray[i].join(","));
      }

      var csvstring = csvRow.join("%0A");
      var a = document.createElement("a");
      a.href = 'data:attachment/csv,' + csvstring;
      a.target = "_Blank";
      a.download = "banks.csv";
      document.body.appendChild(a);
      a.click();

      //console.log("njkbnjk",csvstring);

    }


    handleSetData = allUsers => {
      console.log("gndfjkjkgndfjkg",allUsers);
      this.setState({ filteredUsers: allUsers });
    };

    render() {
      let { allUsers,filteredUsers,currentPage, todosPerPage,upperPageBound,lowerPageBound,isPrevBtnActive,isNextBtnActive,open } = this.state;
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
            {partners.centername}
        </td>
        <td>
            {partners.rmcuname}
        </td>
        <td>
        <span size="md" id="grid">
        <i className="fa fa-eye fa-lg float-center" onClick={(event)=> this.onOpenModal(partners.productnumber)}></i> &nbsp;&nbsp;
        </span>
        {/* <Button size="sm"  block color="primary" onClick={()=>this.deleteEngineer(partners.id)}>
          Delete
        </Button> */}
        </td>

    </tr>;

      });



      const renderTodos1 = allUsers.map((partners, index) => {

        return <tr key={partners.id}>
        <td>
            {partners.productnumber}
        </td>
        <td>
            {partners.productname}
        </td>
        <td>
            {partners.productunit}
        </td>
        <td>
            {partners.productquantity}
        </td>
        <td>{this.state.availablestock}</td>
        <td><Input type="text" name="allocatedstock" id="allocatedstock" value={this.state.allocatedstock} onChange={this.AllocatedStock}/></td>
        <td>{this.state.salerate}</td>

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
        <Form onSubmit={this.submitData}>
        <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> List &nbsp;
                <Button size="lg" onClick={()=>{this.exportCsv()}}>Export As CSV</Button>&nbsp;
  {/* <Input id="input-search" data={this.state.filteredUsers} onChange={this.handleChange} handleSetData={this.handleSetData} type = "text" placeholder = "Search Engineer" value={this.state.searchInput || ""} name = "search" id = "search"/>&nbsp; */}
              </CardHeader>

              <CardBody>

                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Center Name</th>
                    <th>RMCU Name </th>
                    <th>View Details</th>
                  </tr>
                  </thead>
                  <tbody>
                    {renderTodos}
                 </tbody>
                </Table>

                <div>

                   <Modal open={open} onClose={this.onCloseModal} center>
                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">
                   <Row className="justify-content-center">
                       </Row>
                         <CardBody>
                           <Table responsive bordered>
                           <thead>
                           <tr>
                             <th>Product Number</th>
                             <th>Product Name</th>
                             <th>Product Unit</th>
                             <th>Requested Quantity</th>
                             <th>Available Stock</th>
                             <th>Allocated Quantity</th>
                             <th>Sale Rate</th>
                           </tr>
                           </thead>
                           <tbody>
                             {renderTodos1}
                          </tbody>
                           </Table>
                         </CardBody>
                        <Button align="right" type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o tab-button"></i> Submit</Button>&nbsp;&nbsp;
                        <Button type="button" size="md" color="primary" onClick={this.onCloseModal}>Cancle</Button>
                   </Col>
                   </Row>
                   </Modal>

                 </div>

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
            </Form>
        </Col>
        </Row>



     );
    }
}
export default PurchaseRequisition;
