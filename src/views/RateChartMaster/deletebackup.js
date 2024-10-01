import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
import { directive } from '@babel/types';
import { FormGroup,Table,Badge,Pagination,PaginationItem,PaginationLink,CardHeader,Label,FormText,Button, Card, CardBody, CardFooter, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { userInfo } from 'os';
import { Redirect } from 'react-router';
import axios from 'axios';
import ListUsers from '../ListUsers/ListUsers';
import { API_BASE_URL } from '../../config';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import '../../assets/css/modal.css';
var passwordHash = require('password-hash');

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

function Text(props) {
  var style = {
    paddingTop: 5,
    margin: 5
  };
  return (
    <div>
      <div style={style}> {props.label} </div>
      <input
        type="text"
        name={props.name}
        style={style}
        value={props.labelInputText}
        onChange={props.changeHandler}
      />
    </div>
  );
}



function TableFormList(props) {

  return(
    <Table responsive bordered>
    <thead>
    <tr>
   {props.headers.map((item,index) => <th key={index}>{item}</th>)}
    </tr>
    </thead>
    <tbody>

     {props.formElements.map((item,index) => <tr key={index}><td>{item.ratechartmatrixvalue}</td><td>{item.increvalue}</td><td>{item.matrixfatrangefrom}</td><td>{item.matrixfatrangeto}</td><td>{item.condition}</td><td><Button type="button" onClick={()=> SomeDeleteRowFunction(index,item,props)}>Delete</Button></td></tr> )}
    </tbody>
</Table>
    )
  }

  function SomeDeleteRowFunction(index,item,props) {
    var array = props.formElements;
    var index1 = array.indexOf(item);
    array.splice(index1, 1);

     console.log("vjhj",props.formElements);
}
class RateChartMaster extends Component {

    constructor(props) {
        super(props);
        this.state = {

            allUsers: [],
            open: false,
            filteredUsers: [],
            currentTodos:[],
            currentPage: 1,
            todosPerPage: 10,
            upperPageBound: 10,
            lowerPageBound: 0,
            isPrevBtnActive: 'disabled',
            isNextBtnActive: '',
            pageBound: 3,
            searchInput: "",
            chartname: '',
            chartname1: '',
            shift: '',
            ratechart:'',
            cattletype: '',
            charttype: '',
            range: '0',
            fatrange_from:'',
            fatrange_to:'',
            fatsnfrange_from:'',
            fatsnfrange_to:'',
            fixedrate:'',
            ratedate:'',
            effectivedate:'',
            expirydate:'',
            fatvalue:'',
            snfvalue:'',
            ratechartid:'',
            ratechartformula:'0',
            condition:'',
            matrixfatrangeto:'',
            matrixfatrangefrom:'',
            increvalue:'',
            ratechartmatrixvalue: '',
            isdeleted: 'active',
            redirect: false,
            isDisabled:true,
            isSubmitted: false,
            fields: {},
            errors: {},
            // users: [{ratechartmatrixvalue: "", increvalue: "",matrixfatrangefrom:"",matrixfatrangeto:"",condition:""}]
            items: [],
        };
        this.changeHandler = this.changeHandler.bind(this);
         this.AddElementsOnSubmit = this.AddElementsOnSubmit.bind(this);
        this.submitData = this.submitData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSetData = this.handleSetData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnNextClick = this.btnNextClick.bind(this);
        this.btnPrevClick = this.btnPrevClick.bind(this);
        this.ChartName = this.ChartName.bind(this);
        this.ChartName1 = this.ChartName1.bind(this);
        this.Shift = this.Shift.bind(this);
        this.RateChart = this.RateChart.bind(this);
        this.CattleType = this.CattleType.bind(this);
        this.ChartType = this.ChartType.bind(this);
        this.Range = this.Range.bind(this);
        this.EffectiveDate = this.EffectiveDate.bind(this);
        this.ExpiryDate = this.ExpiryDate.bind(this);
        this.FatValue = this.FatValue.bind(this);
        this.SNFValue = this.SNFValue.bind(this);
        this.FixedRate = this.FixedRate.bind(this);
        this.RateDate = this.RateDate.bind(this);
        this.RateChartFormula = this.RateChartFormula.bind(this);
        this.FatRange_From = this.FatRange_From.bind(this);
        this.FatRange_To = this.FatRange_To.bind(this);
        this.FatSnfRange_From = this.FatSnfRange_From.bind(this);
        this.FatSnfRange_To = this.FatSnfRange_To.bind(this);
        this.Condition = this.Condition.bind(this);
        this.MatrixFatRangeTo = this.MatrixFatRangeTo.bind(this);
        this.MatrixFatRangeFrom = this.MatrixFatRangeFrom.bind(this);
        this.IncreValue = this.IncreValue.bind(this);
        this.RateChartMatrixValue = this.RateChartMatrixValue.bind(this);
      }


      componentDidMount() {
        // axios.get(API_BASE_URL+'/listratechartmatrix')
        // .then(response => {
        //     this.setState({ allUsers: response.data.data,filteredUsers:response.data.data,currentTodos:response.data.data });
        //     console.log("response matrix",(response.data.data));
        //
        // })
        // .catch(e => {
        //
        // });

        // axios.get(API_BASE_URL+'/listrangechartmatrix')
        // .then(response => {
        //   console.log("range",response.data.data.range);
        //    this.setState({ allUsers: response.data.data,filteredUsers:response.data.data,currentTodos:response.data.data });
        //     // console.log("response matrix",(response.data.data));
        //
        // })
        // .catch(e => {
        //
        // });

        }

      onOpenModal = () => {
          this.setState({ open: true });
        };

        onCloseModal = () => {
          this.setState({ open: false });
        };

      handleRemoveRow = () => {
        this.setState((prevState, props) => {
          return { rows: prevState.rows.slice(1) };
        });
      };

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

      addClick(){
          this.setState(prevState => ({
          	users: [...prevState.users, { ratechartmatrixvalue: "", increvalue: "",matrixfatrangefrom:"",matrixfatrangeto:"",condition:"" }]
          }))
        }



      handleChangenew(i, e) {
           const { name, value } = e.target;
           let users = [...this.state.users];
           users[i] = {...users[i], [name]: value};
           this.setState({ users });
        }

        removeClick(i){
     let users = [...this.state.users];
     users.splice(i, 1);
     this.setState({ users });
  }

      exportCsv(){
        var csvRow = [];
        var newarray = [['id','Product Name','Product Name In Regional Language','Record Name','Manufacturing Details','Unit Scale','Subsidy']];
        var re = this.state.filteredUsers;
        for(var item=0;item<re.length;item++){
          newarray.push([item,re[item].product_name,re[item].product_name1,re[item].record_list,re[item].manufacture_details,re[item].unit_scale,re[item].subsidy_percentage]);
        }


        for(var i =0; i<newarray.length;++i){
          csvRow.push(newarray[i].join(","));
        }

        var csvstring = csvRow.join("%0A");
        var a = document.createElement("a");
        a.href = 'data:attachment/csv,' + csvstring;
        a.target = "_Blank";
        a.download = "products.csv";
        document.body.appendChild(a);
        a.click();

        //console.log("njkbnjk",csvstring);

      }


      handleSetData = allUsers => {
        console.log("gndfjkjkgndfjkg",allUsers);
        this.setState({ filteredUsers: allUsers });
      };



    submitData(e) {
      e.preventDefault();
          var self = this;
          var conarray = [];
        const {isdeleted} = this.state;
        const {isSubmitted} = this.state;
        let data = (this.state.items);
        const { open } = this.state;
        const {effectivedate,expirydate,fatvalue,snfvalue,condition,matrixfatrangeto,matrixfatrangefrom,increvalue,ratechartmatrixvalue,fatrange_from,fatrange_to,fatsnfrange_from,fatsnfrange_to,chartname,shift,ratechart,cattletype,charttype,range,fixedrate,ratedate } = this.state;
        axios.post(API_BASE_URL+'/ratehchartform',{
          chartname,
          shift,
          ratechart,
          cattletype,
          charttype,
          range,
          effectivedate,
          expirydate,
          fatvalue,
          snfvalue,
          fatrange_from,
          fatrange_to,
          fatsnfrange_from,
          fatsnfrange_to,
          fixedrate,
          ratedate,
          isdeleted,
      })
      .then(response => {
         console.log("response",response.data.data.id);
         this.setState({
           ratechartid: response.data.data.id
       });

       axios.post(API_BASE_URL+'/ratechartmatrixform',{
         "params" : {
            data,
            ratechartid:this.state.ratechartid,
            fixedrate

        }
      }).then(response => {
        let data = (this.state.items);

      //   data.forEach((item, i) => {
      //     this.setState({
      //       conarray: item.condition,
      //       inc: item.increvalue,
      //       fromrange : item.matrixfatrangefrom,
      //       torange :item.matrixfatrangeto,
      //   });
      // });
      //
       const newarraydata = data.reverse();
       const floats = [];
       const rates = [];
       var ratenew = fixedrate;

       for(var i = 0; i<newarraydata.length; i++){
           const rangefr = newarraydata[i].matrixfatrangefrom;
           const rangeto = newarraydata[i].matrixfatrangeto;
           var incedecvalue = newarraydata[i].increvalue;
           const c1 = newarraydata[i].condition;
           console.log("fdsf",rangefr,rangeto,incedecvalue);



             if(incedecvalue=="Inc"){
               for(var j = Number(rangefr); j<=Number(rangeto); j+=0.1){
                 floats.push(j);
                 rates.push(ratenew);
                  ratenew = (Number(ratenew) + Number(c1)).toFixed(2);
                 //ratenew = ratenew+0.1;

               }
             }
             else if(incedecvalue=="Dec"){
               for(var j = Number(rangefr); j>=Number(rangeto); j-=0.1){
                  floats.push(j);
                  rates.push(ratenew);
                   ratenew = (Number(ratenew) - Number(c1)).toFixed(2);

               }
             }


          //  while (Number(rangefr) < Number(rangeto)) {
          //   rangefr = (Number(rangefr) + 0.1).toFixed(1);
          //   floats.push(rangefr);
          //   rangefr = parseFloat(rangefr);
          //   ratenew = (Number(ratenew) + Number(c1)).toFixed(1);
          //   rates.push(ratenew);
          // }



           // for(var j = rangeto; j<=rangefr; j+0.1){
           //    const df = rangefr+j;
           //    console.log("dsfdsf",df);
           // }
       }
       console.log(floats,rates);

        axios.post(API_BASE_URL+'/raterangeform',{
          "params" : {
             ratechartid:this.state.ratechartid,
             rates,
             floats,
             isdeleted
         }
       }).then(response => {
         axios.get(API_BASE_URL+'/listrangechartmatrix')
         .then(response => {
           console.log("range",response.data.data.range);
            this.setState({ allUsers: response.data.data,filteredUsers:response.data.data,currentTodos:response.data.data });
             // console.log("response matrix",(response.data.data));

         })
         .catch(e => {

         });
       })

       .then(response => {
          alert("Rate Chart Created Successfully");
           setTimeout(()=> this.setState({open: true}),1000);
           this.setState({
             isSubmitted: true,
           });
         // console.log(response);

         // self.setState({ open: false});

       });
     })

    });

  }

      RateChartFormula(e) {
        this.setState({ratechartformula: e.target.value});
      }

      ChartName(e) {
        this.setState({chartname: e.target.value});
      }


      ChartName1(e) {
        this.setState({chartname1: e.target.value});
      }

      Shift(e) {
        this.setState({shift: e.target.value});
      }

      RateChart(e) {
        this.setState({ratechart: e.target.value});
      }

      CattleType(e) {
        this.setState({cattletype: e.target.value});
      }

      ChartType(e) {
        this.setState({charttype: e.target.value});
      }

      Range(e) {
        this.setState({range: e.target.value});
      }

      FixedRate(e) {
        this.setState({fixedrate: e.target.value});
      }

      RateDate(e) {
        this.setState({ratedate: e.target.value});
      }

      FatRange_From(e) {
        this.setState({fatrange_from: e.target.value});
      }
      FatRange_To(e) {
        this.setState({fatrange_to: e.target.value});
      }

      FatSnfRange_From(e) {
        this.setState({fatsnfrange_from: e.target.value});
      }
      FatSnfRange_To(e) {
        this.setState({fatsnfrange_to: e.target.value});
      }

      Condition(e) {
        this.setState({condition: e.target.value});
      }
      MatrixFatRangeTo(e) {
        this.setState({matrixfatrangeto: e.target.value});
      }
      MatrixFatRangeFrom(e) {
        this.setState({matrixfatrangefrom: e.target.value});
      }
      IncreValue(e) {
        this.setState({increvalue: e.target.value});
      }
      RateChartMatrixValue(e) {
        this.setState({ratechartmatrixvalue: e.target.value});
      }
      EffectiveDate(e) {
        this.setState({effectivedate: e.target.value});
      }
      ExpiryDate(e) {
        this.setState({expirydate: e.target.value});
      }
      FatValue(e) {
        this.setState({fatvalue: e.target.value});
      }
      SNFValue(e) {
        this.setState({snfvalue: e.target.value});
      }

      // inputPassword(e) {
      //   this.setState({password: e.target.value});
      // }

      changeHandler(event) {
        this.setState({ [event.target.name]: event.target.value });
      }
      AddElementsOnSubmit() {
         var ratechartmatrixvalue = this.state.ratechartmatrixvalue;
         var increvalue = this.state.increvalue;
         var matrixfatrangefrom = this.state.matrixfatrangefrom;
         var matrixfatrangeto = this.state.matrixfatrangeto;
         var condition = this.state.condition;


         var elements = this.state.items.slice();

         elements.push({ratechartmatrixvalue: ratechartmatrixvalue, increvalue: increvalue,matrixfatrangefrom:matrixfatrangefrom,matrixfatrangeto:matrixfatrangeto,condition:condition});
         elements.reverse();
         console.log("sorted array",elements);
         this.setState({ items: elements, ratechartmatrixvalue: "", increvalue: "",matrixfatrangefrom:"",matrixfatrangeto:"",condition:"" });
       }


    render() {
      const { open } = this.state;
     const {cattletype} = this.state;
     const {isSubmitted} = this.state;
      const { redirect,allUsers } = this.state;
        if (redirect) {
          return <Redirect to="/ratechartmaster" />;
        }

    let { filteredUsers,currentPage, todosPerPage,upperPageBound,lowerPageBound,isPrevBtnActive,isNextBtnActive } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;    //console.log("==",filteredUsers,indexOfFirstTodo,indexOfLastTodo);

    let abxd = Object.keys(filteredUsers).length;
    let currentTodos;

     if(abxd > 3){
        currentTodos = filteredUsers.slice(indexOfFirstTodo, indexOfLastTodo);
     }
     else {
      currentTodos = filteredUsers;
     }


    const renderTodos1 = currentTodos.map((partners, index) => {
      const rate = JSON.parse(partners.fat_range);
      const rate1 = JSON.parse(partners.rate_value);
      //if(partners.ratechart_id ===this.state.ratechartid)
      return <tbody key={partners.id}>
         <tr>

          <td> {
             rate.map((item)=>

                          <p>{item.toFixed(1)}</p>
                       )
         }</td>
             <td>
             {
               rate1.map((item)=>
                            <p>{item}</p>
                         )
            }
             </td>


         </tr>
</tbody>
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
                <h2>Add Rate Chart Details</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit= {this.submitData.bind(this)}>

        <FormGroup row className="my-0">
        <Col xs="6">
        <FormGroup>
          <h5><Label htmlFor="chartname">Rate Chart Name In English *</Label></h5>
          <Input type="text" id="chartname" placeholder="Please Enter Chart Name" onChange={this.ChartName} value={this.state.chartname}/>
        </FormGroup>
        </Col>
        <Col xs="6">
        <FormGroup>
          <h5><Label htmlFor="chartname1">Rate Chart Name In Regional Language *</Label></h5>
          <Input type="text" id="chartname1" placeholder="Please Enter Chart Name In Regional Language" onChange={this.ChartName1} value={this.state.chartname1}/>
        </FormGroup>
        </Col>
        </FormGroup>
        <FormGroup row className="my-0">
        <Col xs="6">
        <FormGroup row>
          <Col md="4">
            <FormGroup check inline>
            <Label className="form-check-label" check htmlFor="effectivedate">Effective Date</Label>
            </FormGroup>
          </Col>
          <Col md="8">
          <Input type="date" id="effectivedate" placeholder="Effective Date" onChange={this.EffectiveDate} value={this.state.effectivedate}/>
          </Col>
        </FormGroup>
        </Col>
        <Col xs="6">
        <FormGroup row>
          <Col md="4">
            <FormGroup check inline>
            <Label className="form-check-label" check htmlFor="expirydate">Expiration Date</Label>
            </FormGroup>
          </Col>
          <Col md="8">
          <Input type="date" id="expirydate" placeholder="Expiry Date" onChange={this.ExpiryDate} value={this.state.expirydate}/>
          </Col>
        </FormGroup>
        </Col>
        </FormGroup>
        <FormGroup row className="my-0">
        <Col xs="6">
        <FormGroup>
          <h5><Label htmlFor="shift">Shift Selection<span>*</span></Label></h5>
          <Input type="select"  value={this.state.shift} name="select" id="shift" onChange={this.Shift}>
                <option value="0">Please Select</option>
                  <option value="both-shift">Common For Both The Shift</option>
                <option value="morning-shift">Morning Shift</option>
                <option value="evening-shift">Evening Shift</option>
              </Input>
              <span className="error">{this.state.errors["userfor"]}</span>
        </FormGroup>
        </Col>
        <Col xs="6">
        <FormGroup>
          <h5><Label htmlFor="ratechart">Chart Type <span>*</span></Label></h5>
          <Input type="select"  value={this.state.ratechart} name="select" id="ratechart" onChange={this.RateChart}>
                <option value="0">Please Select</option>
                <option value="society-ratehchart">Society Rate Chart</option>
                <option value="center-ratechart">Center Rate Chart</option>
              </Input>

        </FormGroup>
        </Col>
        </FormGroup>

      <FormGroup row className="my-0">
      <Col xs="6">
      <FormGroup>
        <h5><Label htmlFor="charttype">Rate Type *</Label></h5>
        <Input type="select"  value={this.state.charttype} name="select" id="charttype" onChange={this.ChartType}>
              <option value="0">Please Select</option>
              <option value="fat-chart">FAT Chart</option>
              <option value="fatsnf-chart">FAT-SNF Chart</option>
              <option value="fat-lacto">FAT-Lacto Chart</option>
        </Input>
      </FormGroup>
      </Col>
      <Col xs="6">
        <h5><Label htmlFor="cattletype">Cattle Type *</Label></h5>
      <FormGroup row>
        <Col md="9">
          <FormGroup check inline>
            <Input className="form-check-input" type="radio" id="cattletype" name="cattletype" onChange={this.CattleType} value="cow" checked={cattletype == "cow"}  />
            <Label className="form-check-label" check htmlFor="cattletype">Cow</Label>
          </FormGroup>
          <FormGroup check inline>
            <Input className="form-check-input" type="radio" id="cattletype" name="cattletype" onChange={this.CattleType}  value="buffalo" checked={cattletype=="buffalo"}/>
            <Label className="form-check-label" check htmlFor="cattletype">Buffalo</Label>
          </FormGroup>
        </Col>
      </FormGroup>
      </Col>

      </FormGroup>

        <FormGroup row className="my-0">
        <Col xs="12">
          <h5><Label htmlFor="range"> FAT Range *</Label></h5>
          {this.state.charttype === "fat-chart" && (
            <FormGroup row>
            <Col md="6">
            <FormGroup>
              <h7><Label htmlFor="fatrange_from">FAT Range From *</Label></h7>
              <Input type="text" id="fatrange_from" placeholder="Please Enter Fat Range" onChange={this.FatRange_From} value={this.state.fatrange_from}/>
            </FormGroup>
            </Col>
            <Col md="6">
            <FormGroup>
              <h7><Label htmlFor="fatrange_to">FAT Range To *</Label></h7>
              <Input type="text" id="fatrange_to" placeholder="Please Enter Fat Range" onChange={this.FatRange_To} value={this.state.fatrange_to}/>
            </FormGroup>
            </Col>
            </FormGroup>

          )}

          {this.state.charttype === "fatsnf-chart" && (
            <FormGroup row>
            <Col md="3">
            <FormGroup>
              <h7><Label htmlFor="fatrange_from">FAT Range From *</Label></h7>
              <Input type="text" id="fatrange_from" placeholder="Please Enter Fat SNF Range" onChange={this.FatRange_From} value={this.state.fatrange_from}/>
            </FormGroup>
            </Col>
            <Col md="3">
            <FormGroup>
              <h7><Label htmlFor="fatrange_to">FAT Range To *</Label></h7>
              <Input type="text" id="fatrange_to" placeholder="Please Enter Fat SNF  Range" onChange={this.FatRange_To} value={this.state.fatrange_to}/>
            </FormGroup>
            </Col>
            <Col md="3">
            <FormGroup>
              <h7><Label htmlFor="fatsnfrange_from">FAT-SNF Range From *</Label></h7>
              <Input type="text" id="fatsnfrange_from" placeholder="Please Enter Fat Range" onChange={this.FatSnfRange_From} value={this.state.fatsnfrange_from}/>
            </FormGroup>
            </Col>
            <Col md="3">
            <FormGroup>
              <h7><Label htmlFor="fatsnfrange_to">FAT-SNF Range To *</Label></h7>
              <Input type="text" id="fatsnfrange_to" placeholder="Please Enter Fat Range" onChange={this.FatSnfRange_To} value={this.state.fatsnfrange_to}/>
            </FormGroup>
            </Col>
            </FormGroup>

          )}

          {this.state.charttype === "fat-lacto" && (
            <FormGroup row>
            <Col md="3">
            <FormGroup>
              <h7><Label htmlFor="fatrange_from">FAT Range From *</Label></h7>
              <Input type="text" id="fatrange_from" placeholder="Please Enter Fat SNF Range" onChange={this.FatRange_From} value={this.state.fatrange_from}/>
            </FormGroup>
            </Col>
            <Col md="3">
            <FormGroup>
              <h7><Label htmlFor="fatrange_to">FAT Range To *</Label></h7>
              <Input type="text" id="fatrange_to" placeholder="Please Enter Fat SNF  Range" onChange={this.FatRange_To} value={this.state.fatrange_to}/>
            </FormGroup>
            </Col>
            <Col md="3">
            <FormGroup>
              <h7><Label htmlFor="fatsnfrange_from">Lacto Range From *</Label></h7>
              <Input type="text" id="fatsnfrange_from" placeholder="Please Enter Fat Range" onChange={this.FatSnfRange_From} value={this.state.fatsnfrange_from}/>
            </FormGroup>
            </Col>
            <Col md="3">
            <FormGroup>
              <h7><Label htmlFor="fatsnfrange_to">Lacto Range To *</Label></h7>
              <Input type="text" id="fatsnfrange_to" placeholder="Please Enter Fat Range" onChange={this.FatSnfRange_To} value={this.state.fatsnfrange_to}/>
            </FormGroup>
            </Col>
            </FormGroup>

          )}

        </Col>
        </FormGroup>
        <FormGroup row className="my-0">
          <Col xs="12">
          <FormGroup row>
           <Col md="1">
           <FormGroup>
             <h7><Label htmlFor="fixedrate">Fix Rate</Label></h7>
           </FormGroup>
           </Col>
           <Col md="3">
           <FormGroup>
            <Input type="text" id="fixedrate" placeholder="Please Enter Fixed Rate" onChange={this.FixedRate} value={this.state.fixedrate}/>
            </FormGroup>
           </Col>
           <Col md="1">
           <FormGroup>
             <h9><Label htmlFor="fatvalue">FAT Value</Label></h9>
           </FormGroup>
           </Col>
            <Col md="3">
             <FormGroup>
             <Input type="text" id="fatvalue" placeholder="Please Enter Fat Rate" onChange={this.FatValue} value={this.state.fatvalue}/>
             </FormGroup>
            </Col>
           <Col md="1">
           <FormGroup>
             <h9><Label htmlFor="snfvalue">SNF/LACTO Value</Label></h9>
           </FormGroup>
           </Col>
           <Col md="3">
           <FormGroup>
             <Input type="text" id="snfvalue" placeholder="Please Enter SNF Value" onChange={this.SNFValue} value={this.state.snfvalue}/>
           </FormGroup>
           </Col>
          </FormGroup>
          </Col>
        </FormGroup>

        <FormGroup row className="my-0" >
        <FormGroup row>
        <Col md="2">
        <FormGroup>
          <h7><Label htmlFor="ratechartmatrixvalue">Field *</Label></h7>
          <Input type="select" name="ratechartmatrixvalue" value={this.state.ratechartmatrixvalue} onChange={this.changeHandler}>
                <option value="0">Please Select</option>
                <option value="fat-chart">FAT Chart</option>
                <option value="fatsnf-chart">FAT-SNF Chart</option>
          </Input>
        </FormGroup>
        </Col>
        <Col md="2">
        <FormGroup>
          <h7><Label htmlFor="increvalue">Inc/Dec *</Label></h7>
          <Input type="select" name="increvalue" id="increvalue" value={this.state.increvalue} onChange={this.changeHandler}>
                <option value="0">Please Select</option>
                <option value="Inc">Inc</option>
                <option value="Dec">Dec</option>
          </Input>
        </FormGroup>
        </Col>

        <Col md="2">
        <FormGroup>
          <h7><Label htmlFor="matrixfatrangefrom">Range From *</Label></h7>
          <Input type="text" id="matrixfatrangefrom" placeholder="Please Enter Fat Range From" name="matrixfatrangefrom" value={this.state.matrixfatrangefrom} onChange={this.changeHandler} />
        </FormGroup>
        </Col>

        <Col md="3">
        <FormGroup>
          <h7><Label htmlFor="matrixfatrangeto">Range To *</Label></h7>
          <Input type="text" id="matrixfatrangeto" placeholder="Please Enter Fat Range To" name="matrixfatrangeto" value={this.state.matrixfatrangeto} onChange={this.changeHandler}/>
        </FormGroup>
        </Col>

        <Col md="3">
        <FormGroup>
          <h7><Label htmlFor="condition" labelInputText={this.state.condition}>Condition *</Label></h7>
          <Input type="text" id="condition" placeholder="Please Enter Condition" name="condition" value={this.state.condition} onChange={this.changeHandler}/>
        </FormGroup>
        </Col>
        </FormGroup>
        </FormGroup>

        <FormGroup>

  <Button type="button" size="md" color="primary" onClick={() => this.AddElementsOnSubmit()}><i className="fa fa-dot-circle-o"></i> Add Condition</Button>
            </FormGroup>

                <FormGroup>
                  <Input type="hidden" id="status" value={this.state.status}/>
                  <Input type="hidden" id="isdeleted" value={this.state.isdeleted}/>
                </FormGroup>
                <Row className="justify-content-center">
                <Col xs="12" sm="12">
                <Card>


                        <TableFormList
            headers={["Field","Inc/Dec","Range From","Range To","Condition","Delete"]}
            formElements={this.state.items}
          />

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



                    </Card>
                </Col>
                </Row>
                <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>

                </Form>
        </CardBody>

        </Card>
        </Col>
        </Row>

        {this.state.isSubmitted && (
        <Row className="justify-content-center">
        <Col xs="12" sm="12">
        <div style={styles}>
          <h2></h2>

          <Modal open={open} onClose={this.onCloseModal}>
            <h2>Rate Matrix</h2>
            <Table responsive bordered>
              <thead>

              <tr>
              <th>FAT </th>
              <th>RATE </th>

              </tr>
              </thead>

              {renderTodos1}

            </Table>
          </Modal>
        </div>
        </Col>
        </Row>
      )}
        </Container>

     );

    }

}

export default RateChartMaster;
