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
import { Redirect } from 'react-router';


class PurchaseRequisition extends Component {

    constructor(props) {

        super(props);
        this.state = {
            allUsers: [],
            availablestockarray:[],
            filteredUsers: [],
            currentTodos:[],
            allNumbers:[],
            saleratearray:[],
            currentPage: 1,
            todosPerPage: 10,
            upperPageBound: 10,
            lowerPageBound: 0,
            isPrevBtnActive: 'disabled',
            isNextBtnActive: '',
            pageBound: 10,
            flag: 'active',
            allocatedstock:[],
            title1:'Approve',
            title2: 'Disapprove',
            searchInput: "",
            open: false,
            redirect: false,
            requsitionid:'',
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
        const {allocatedstock,productname,productnumber,productunit,productquantity,salerate,flag,newid,change} = this.state;
               
        axios.post(API_BASE_URL+'/purchaserequestform',{
              data:allocatedstock
      })

      axios.post(API_BASE_URL+'/purchaseupdate',{
          data:allocatedstock,
          requsitionid:this.state.requsitionid,
      });

      axios.post(API_BASE_URL+'/stockchange',{
          data:allocatedstock
        })
        .then(() => window.location.reload(true),this.setState({ open: false,salerate:'' }));

    }

    adddevice(){
      let path = `/listfarmers/farmermaster/`;
      this.props.history.push(path);
    }

    AllocatedStock(id,e,index){

      console.log("event value",e.target.value);
      console.log("product number value",id);

       let allocatedstock = [...this.state.allocatedstock];
       let salearray= this.state.saleratearray;
       console.log("sale rate array",salearray);
       let type = Array.isArray(this.state.saleratearray) && this.state.saleratearray.find(el => el.productid ==id);
       console.log("csdss",type);
      allocatedstock[index] = ({allocatedstock:e.target.value,productnumber:id,salerate:type.salerate});
       this.setState({ allocatedstock });
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
      this.setState({requsitionid:id})
      axios.get(API_BASE_URL+'/listpurchasecenter/'+ id)
      .then(response => {
        let newdataarray = response.data.data;
        let newClient2 = [];
        for(let user2 in newdataarray){
            newClient2.push({
            productnumber: newdataarray[user2].productnumber,
          });
      }
          this.setState({ allUsers: response.data.data,allNumbers: newClient2,});
          this.setState({ newid:response.data.data[0].id,productnumber: response.data.data[0].productnumber,productname: response.data.data[0].productname,productunit: response.data.data[0].productunit,productquantity: response.data.data[0].productquantity});
          console.log("allNumbers",this.state.allNumbers);
          axios.post(API_BASE_URL+'/stockvalues',{
               data:this.state.allNumbers,
         }).then(response => {
           console.log("available response",response);
             this.setState({
             availablestockarray: response.data.data
           });
         });

        axios.post(API_BASE_URL+'/stockmodelnew',{
                 data:this.state.allNumbers,
           }).then(response => {
             console.log("available response",response);
                this.setState({saleratearray: response.data.data});

           });

      })
      .catch(e => {

      });

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

    Decline = (id) => {
      axios.post(API_BASE_URL+'/updatepurchasedb/'+ id,{
          allocatedstock:this.state.allocatedstock,
        })
        .then(() => window.location.reload(true),this.setState({ open: false}));
  }

    render() {
    
      let { saleratearray,availablestockarray,redirect,allUsers,filteredUsers,currentPage, todosPerPage,upperPageBound,lowerPageBound,isPrevBtnActive,isNextBtnActive,open } = this.state;
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      var filtered = saleratearray.filter(function (el) {
        return el != null;
      });

      var filtered1 = availablestockarray.filter(function (el) {
        return el != null;
      });
      
     
      let abxd = Object.keys(filteredUsers).length;
      let currentTodos;
      if (redirect) {
        return <Redirect to="/purchaserequisition" />;
      }

       if(abxd > 3){
          currentTodos = filteredUsers.slice(indexOfFirstTodo, indexOfLastTodo);
       }
       else {
        currentTodos = filteredUsers;
       }

      const renderTodos = currentTodos.map((partners, index) => {

        return <tr key={partners.id}>
        <td>
            {partners.requestdate}
        </td>
        <td>
            {partners.centername}
        </td>
        <td>
            {partners.rmcuname}
        </td>
        <td>
        <span size="md" id="grid">
        <i className="fa fa-eye fa-lg float-center" onClick={(event)=> this.onOpenModal(partners.id)}></i> &nbsp;&nbsp;
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
        <td>
        {filtered1.map(content =>
                    content.productnumber === partners.productnumber ? (
                        <span>{content.availablestock}</span>
                    ) : (
                        ''
                    )
            )}
        </td>
        <td> {filtered.map(content =>
                    content.productid === partners.productnumber ? (
                        <span>{content.salerate}</span>
                    ) : (
                        ''
                    )
            )} </td>
        <td><Input type="text" name="allocatedstock" value={this.state.index} onChange={(e) => this.AllocatedStock(partners.productnumber, e ,index)}/></td>
        <td>
        <span size="md" id="grid">
        <i className="fa fa-close fa-lg float-center" onClick={(event)=> this.Decline(partners.id)}></i> &nbsp;&nbsp;
        </span>
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

       <Container>
       <Row className="justify-content-center">
       <Col xs="12" sm="12">

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
           <th>Requisition Date</th>
           <th>Center Name</th>
           <th>RMCU Name </th>
           <th>View Details</th>
         </tr>
         </thead>
         <tbody>
           {renderTodos}
        </tbody>
       </Table>

           <div className="modalclass">

           <Modal open={open} onClose={this.onCloseModal} center>
           <Row className="justify-content-center">

           <Col xs="12" sm="12">
           <Form onSubmit={this.submitData}>
                 <CardBody>
                   <Table responsive bordered>
                   <thead>
                   <tr>
                     <th>Product Number</th>
                     <th>Product Name</th>
                     <th>Product Unit</th>
                     <th>Requested Quantity</th>
                     <th>Available Stock</th>
                     <th>Sale Rate</th>
                     <th>Allocated Quantity</th>
                     <th>Decline</th>
                   </tr>
                   </thead>
                   <tbody>
                     {renderTodos1}
                  </tbody>
                   </Table>
                 </CardBody>
                 <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Approve</Button>&nbsp;&nbsp;
                 <Button type="button" size="md" color="primary" onClick={this.onCloseModal}><i className="fa fa-dot-circle-o"></i> Cancle</Button>
                  </Form>
           </Col>

           </Row>

           </Modal>

           </div>
       </CardBody>
       </Card>
       </Col>
       </Row>
       </Container>

     );
    }
}
export default PurchaseRequisition;
