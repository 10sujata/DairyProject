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
import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// import $ from 'jquery';


class RateChartList extends Component {

    constructor(props) {

        super(props);
        this.state = {
            allUsers: [],
            singledataexport:[],
            singledataexport1:'',
            filteredUsers: [],
            currentTodos:[],
            rangedata:[],
            singlesnfarray:[],
            singleratearray:[],
            currentPage: 1,
            todosPerPage: 10,
            upperPageBound: 10,
            lowerPageBound: 0,
            isPrevBtnActive: 'disabled',
            isNextBtnActive: '',
            pageBound: 3,
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
        // this.componentDidMount = this.componentDidMount.bind(this);
        this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
      }



      handleChange = event => {
        this.setState({ searchInput: event.target.value }, () =>
          this.globalSearch()
        );
      };


      handleClickDelete = (id) => {
          axios.post(API_BASE_URL+'/deleteratechart/' + id)
          .then(response => {
             window.location.reload(false);
            })
      }


      deleteBank = (id) => {
      // if( window.confirm('Are you sure want to delete?')){
      //   axios.post(API_BASE_URL+'/deletebank/' + id)
      //   .then(response => {
      //      console.log("response",response);
      //      alert('Data Deleted Successfully!');
      //      window.location.reload(false);
      //
      //     })
      //
      // }

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

      routeChange(id) {
        let path = `/newservicecalls/`+id;
        this.props.history.push(path);
      }


    addproduct(){
      let path = `/ratechartmaster/`;
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
          return (
            value.chartname.toLowerCase().includes(searchInput.toLowerCase()) ||
            value.shift.toLowerCase().includes(searchInput.toLowerCase()) ||
            value.ratechart.toLowerCase().includes(searchInput.toLowerCase()) ||
            value.cattletype.toLowerCase().includes(searchInput.toLowerCase()) ||
            value.expiration_date.toLowerCase().includes(searchInput.toLowerCase()) ||
            value.charttype.toLowerCase().includes(searchInput.toLowerCase())        
          );
        });
        this.handleSetData(filteredData);
      };



      editratechart(id) {
        let path = `/editratechart/`+id;
        this.props.history.push(path);
      }



    componentDidMount() {
      axios.get(API_BASE_URL+'/listratechart')
      .then(response => {
          this.setState({ allUsers: response.data.data,filteredUsers:response.data.data,currentTodos:response.data.data });
          console.log("response",typeof response.data);

      })
      .catch(e => {

      });

    }

    componentDidUpdate() {
    //   $(".page-item.active").removeClass('active');
    //   $('.page-item#'+this.state.currentPage).addClass('active');
}

  exportCsv(){
      let csvRow = [];
      let newarray = [['id','Chart Name','Effective Date','Expiration Date','Chart Type']];
      let re = this.state.filteredUsers;
      for(let item=0;item<re.length;item++){
        newarray.push([item,re[item].chartname,re[item].effective_date,re[item].expiration_date,re[item].charttype]);
      }


      for(let i =0; i<newarray.length;++i){
        csvRow.push(newarray[i].join(","));
      }

      let csvstring = csvRow.join("%0A");
      let a = document.createElement("a");
      a.href = 'data:attachment/csv,' + csvstring;
      a.target = "_Blank";
      a.download = "RateChartList.csv";
      document.body.appendChild(a);
      a.click();
    }

    exportindividualCsv(id){
         axios.get(API_BASE_URL+'/editratechart/' + id)
           .then(response => {
             this.setState({singledataexport1:response.data.data[0].charttype });
      })
        axios.get(API_BASE_URL+'/individualmatrix/' + id).then(response => {
          console.log("individual response",response);
          this.setState({singledataexport:response.data.data });
          let csvRow = [];
          let re = this.state.singledataexport;
          let newarray = [['id','Rate Code','FAT','SNF/LACTO','rate/values']];
          let newarray1 = [['FAT/SNF']];
          let fatarray = [];
          if(this.state.singledataexport1=="fat-chart"){
            for(let item=0;item<re.length;item++){
              console.log("re[item]",re[item].ratechart_id);
               newarray.push([item,re[item].ratechart_id,re[item].fat_range,re[item].snf_lacto_range,re[item].rate_value]);
            }

            for(let i =0; i<newarray.length;++i){
              csvRow.push(newarray[i].join(","));
            }

            let csvstring = csvRow.join("%0A");
            let a = document.createElement("a");
            a.href = 'data:attachment/csv,' + csvstring;
            a.target = "_Blank";
            a.download = "ratematrix.csv";
            document.body.appendChild(a);
            a.click();
          }
          else {
            for(let item=0;item<re.length;item++){
               // newarray.push([item,re[item].ratechart_id,re[item].fat_range,re[item].snf_lacto_range,re[item].rate_value]);
               fatarray.push({'fatarrayvalues':re[item].fat_range});
            }
            let standardsList = fatarray.filter((li, idx, self) => self.map(itm => itm.fatarrayvalues).indexOf(li.fatarrayvalues) === idx)
            console.log("standlist",standardsList);
          let sortarray = standardsList.sort(function (a, b) {
              return a.fatarrayvalues - b.fatarrayvalues;
            });

              axios.post(API_BASE_URL+'/listsnfratematrix',{
                   ratechartid:id,
                   arraydata:standardsList,
             }).then(response => {
               this.setState({singlesnfarray:response.data.data});
                axios.post(API_BASE_URL+'/listfatsnfratematrix',{
                     ratechartid:id,
                     arraydata:standardsList,
                     arraydata1:response.data.data
               }).then(response => {
                 this.setState({singleratearray:response.data.data});
                 let snfarray = this.state.singlesnfarray;
                 let ratearray = this.state.singleratearray;




                 // for(let item=0;item<sortarray.length;item++){
                 //   for(let j=0;j<snfarray.length;j++){
                 //       newarray1.push([snfarray[j].snf_lacto_range]);
                 //   }
                 // }
                 //
                 // for(let i =0; i<newarray1.length;++i){
                 //   csvRow.push(newarray1[i].join(","));
                 // }
                 //
                 //   let csvstring = csvRow.join("%0A");
                 //   let a = document.createElement("a");
                 //   a.href = 'data:attachment/csv,' + csvstring;
                 //   a.target = "_Blank";
                 //   a.download = "ratematrix.csv";
                 //   document.body.appendChild(a);
                 //   a.click();
              })
            })


          }
          // for(let item=0;item<re.length;item++){
          //   console.log("re[item]",re[item].ratechart_id);
          //   // newarray.push([item,re[item].chartname,re[item].shift,re[item].ratechart,re[item].cattletype,re[item].charttype,re[item].fatrange_from,re[item].fatrange_to,re[item].fatsnfrange_from,re[item].fatsnfrange_to,re[item].effective_date,re[item].expiration_date,re[item].fat_value,re[item].snf_value]);
          // }

      });
    //   axios.get(API_BASE_URL+'/editratechart/' + id)
    //    .then(response => {
    //
    //       this.setState({singledataexport:response.data.data });
    //       let csvRow = [];
    //       let newarray = [['id','Chart Name','Shift','Rate Chart','Cattle Type','Chart Type','FatRange From','FatRange To','FatSNFRange From','FatSNFRange To','Effective Date','Expiration Date','Fat Value','SNF Value']];
    //
    //       let re = this.state.singledataexport;
    //       for(let item=0;item<re.length;item++){
    //         newarray.push([item,re[item].chartname,re[item].shift,re[item].ratechart,re[item].cattletype,re[item].charttype,re[item].fatrange_from,re[item].fatrange_to,re[item].fatsnfrange_from,re[item].fatsnfrange_to,re[item].effective_date,re[item].expiration_date,re[item].fat_value,re[item].snf_value]);
    //       }
    //
    //       for(let i =0; i<newarray.length;++i){
    //         csvRow.push(newarray[i].join(","));
    //       }
    //
    //       let csvstring = csvRow.join("%0A");
    //       let a = document.createElement("a");
    //       a.href = 'data:attachment/csv,' + csvstring;
    //       a.target = "_Blank";
    //       a.download = "ratechart.csv";
    //       document.body.appendChild(a);
    //       a.click();
    // })
    // .catch(e => {
    //
    // });

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
            {partners.chartname}
        </td>
        <td>{partners.shift}</td>
        <td>{partners.ratechart}</td>
        <td>{partners.cattletype}</td>
        <td>{partners.charttype}</td>
        <td>{partners.effective_date}</td>
        <td>{partners.expiration_date}</td>
        <td>
        <i className="fa fa-trash fa-lg float-center" onClick={()=>this.deleteBank(partners.id)}></i>&nbsp;&nbsp;
        <i className="fa fa-edit fa-lg float-center" onClick={()=>this.editratechart(partners.id)}></i>&nbsp;&nbsp;
        <i className="fa fa-download fa-lg float-center" onClick={()=>{this.exportindividualCsv(partners.id)}}></i>
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
                <Button size="lg" onClick={()=>{this.addproduct()}}>Add RateChart</Button>&nbsp;
  <Input id="input-search" data={this.state.filteredUsers} onChange={this.handleChange} handleSetData={this.handleSetData} type = "text" placeholder = "Search Rate Chart" value={this.state.searchInput || ""} name = "search" id = "search"/>&nbsp;
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Chart Name</th>
                    <th>Shift *</th>
                    <th>Rate Chart </th>
                    <th>Cattle Type</th>
                    <th>Chart Type *</th>
                    <th>From</th>
                    <th>To</th>

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
export default RateChartList;
