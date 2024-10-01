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
import Notifications, {notify} from 'react-notify-toast';
import '../../assets/css/modal.css';
import moment from 'moment';
var passwordHash = require('password-hash');

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const today = new Date();

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
            lactovalue:'',
            ratechartid:'',
            ratechartformula:'0',
            condition:'',
            matrixfatrangeto:'',
            matrixfatrangefrom:'',
            matrixfatrangefrom1:'',
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
        this.SomeDeleteRowFunction = this.SomeDeleteRowFunction.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.AddElementsOnSubmit = this.AddElementsOnSubmit.bind(this);
        this.submitData = this.submitData.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleBlur1 = this.handleBlur1.bind(this);
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
        this.LactoValue = this.LactoValue.bind(this);
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



      handleChange = event => {
        this.setState({ searchInput: event.target.value }, () =>
          this.globalSearch()
        );
      };


      handleBlur (e) {
        let errors = {};
        var val = (e.target.value);
        var fatrange = this.state.fatrange_from;
        var snfrange = this.state.fatsnfrange_from;
        var fatmatrixvalue = this.state.ratechartmatrixvalue;
        if(fatmatrixvalue==="fat") {
          if(val<fatrange){
            errors["matrixfatrangefrom"] = "Please enter value greater than fat range from.";

          }
        }
        else if (fatmatrixvalue==="snf") {

          if(val<snfrange){
            errors["matrixfatrangefrom"] = "Please enter value greater than snf range from.";

          }
        }


        this.setState({errors: errors});
      }

      handleBlur1 (e) {
        let errors = {};
        var val = (e.target.value);
        var fatrange = this.state.fatrange_to;
        var snfrange = this.state.fatsnfrange_to;
        var fatmatrixvalue = this.state.ratechartmatrixvalue;

           if (fatmatrixvalue==="fat") {
              if(Number(val)>Number(fatrange)){
                errors["matrixfatrangeto"] = "Please enter value less than fat range to.";
              }

              // errors["matrixfatrangeto"] = "Please enter value less than snf range to.";

          }
        else if(fatmatrixvalue==="snf") {
            //console.log("cssa",fatrange);
            if(Number(val)>Number(snfrange)){
              errors["matrixfatrangeto"] = "Please enter value less than snf range to.";
            }

          }

        this.setState({errors: errors});
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

      SomeDeleteRowFunction(event,item) {
       var array = [...this.state.items];
       var index = array.indexOf(item)
       array.splice(index, 1);
       this.setState({items: array});
     }


      AddElementsOnSubmit() {
         var ratechartmatrixvalue = this.state.ratechartmatrixvalue;
         var increvalue = this.state.increvalue;
         var matrixfatrangefrom = this.state.matrixfatrangefrom;
         var matrixfatrangeto = this.state.matrixfatrangeto;
         var condition = this.state.condition;
 console.log("sorted array",ratechartmatrixvalue);

         var elements = this.state.items.slice();

         elements.push({ratechartmatrixvalue: ratechartmatrixvalue, increvalue: increvalue,matrixfatrangefrom:matrixfatrangefrom,matrixfatrangeto:matrixfatrangeto,condition:condition});
         //elements.reverse();

         this.setState({ items: elements, ratechartmatrixvalue: "", increvalue: "",matrixfatrangefrom:"",matrixfatrangeto:"",condition:"" });
       }





    submitData(e) {
      e.preventDefault();
          var self = this;
          var conarray = [];
        const {isdeleted} = this.state;
        const {isSubmitted} = this.state;
        let data = (this.state.items);
        const { open } = this.state;
        const {effectivedate,expirydate,fatvalue,snfvalue,lactovalue,condition,matrixfatrangeto,matrixfatrangefrom,increvalue,ratechartmatrixvalue,fatrange_from,fatrange_to,fatsnfrange_from,fatsnfrange_to,chartname,shift,ratechart,cattletype,charttype,range,fixedrate,ratedate } = this.state;
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
          lactovalue,
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


       const newarraydata = data;
       const fatarrayvalues = [];
       const snfarrayvalues = [];
       const floats = [];
       const rates = [];
       var ratenew = fixedrate;
       var ratenew1 = fixedrate;
       var basefat = fatvalue;
       var basesnf = snfvalue;

       var fatRangeFrom = fatrange_from;
       var fatRangeTo =   fatrange_to;
       var snfRangeFrom = fatsnfrange_from;
       var snfRangeTo = fatsnfrange_to;

       var assignRate = 0;
       var fatAssignRate = 0;


       if(charttype=="fat-chart"){
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
         }
       }
       else if (charttype=="fatsnf-chart") {

         for(var i = 0; i<newarraydata.length; i++){
             var getfield = newarraydata[i].ratechartmatrixvalue;
             const rangefr = newarraydata[i].matrixfatrangefrom;
             const rangeto = newarraydata[i].matrixfatrangeto;
             var incedecvalue = newarraydata[i].increvalue;
             const c1 = newarraydata[i].condition;


              if(getfield=="fat")
              {
                if(incedecvalue=="Inc"){
                  fatAssignRate = Number(ratenew);
                  console.log("fat rate",fatAssignRate);

                  for(var j = Number(rangefr); j<=Number(rangeto); j+=0.1){

                      if(Number(basefat)==j){
                        fatarrayvalues.push(j);
                        snfarrayvalues.push(basesnf);
                        rates.push(ratenew);
                        // fatAssignRate = (Number(fatAssignRate) + Number(c1)).toFixed(2);
                      }
                      else {
                        fatAssignRate = (Number(fatAssignRate) + Number(c1)).toFixed(2);
                        fatarrayvalues.push(j);
                        snfarrayvalues.push(basesnf);
                        rates.push(fatAssignRate);

                      }

                      var assignRate;
                      assignRate = fatAssignRate;
                     for(var x = 0; x<newarraydata.length; x++){
                       var getfield = newarraydata[x].ratechartmatrixvalue;
                       const rangefr = newarraydata[x].matrixfatrangefrom;
                       const rangeto = newarraydata[x].matrixfatrangeto;
                       var incedecvalue = newarraydata[x].increvalue;
                       const c1 = newarraydata[x].condition;


                         if(getfield=="snf"){
                           var firstDigit = (rangefr).substring(0, 1);
                           var secondDigit = (basesnf).substring(0, 1);
                           if(firstDigit==secondDigit){
                             assignRate = fatAssignRate;
                             console.log("fat assignrate",assignRate);
                           }
                           if(incedecvalue=="Inc"){

                             for(var y = Number(rangefr); y<=Number(rangeto); y+=0.1){
                               if (Number(basesnf) == y){
                                 // assignRate = (Number(assignRate) + Number(c1)).toFixed(2);
                                 fatarrayvalues.push(j);
                                 snfarrayvalues.push(y.toFixed(2));
                                 rates.push(ratenew);
                               }
                               else {
                                 assignRate = (Number(assignRate) + Number(c1)).toFixed(2);
                                 fatarrayvalues.push(j);
                                 snfarrayvalues.push(y.toFixed(2));
                                 rates.push(assignRate);
                               }


                             }
                           }
                            else if (incedecvalue=="Dec") {

                              for(var y = Number(rangefr); y>=Number(rangeto); y-=0.1){
                                if(Number(basesnf)==y){
                                  // assignRate = (Number(assignRate) - Number(c1)).toFixed(2);
                                  fatarrayvalues.push(j);
                                  snfarrayvalues.push(y.toFixed(2));
                                  rates.push(ratenew);
                                }
                                else {
                                  assignRate = (Number(assignRate) - Number(c1)).toFixed(2);
                                  fatarrayvalues.push(j);
                                  snfarrayvalues.push(y.toFixed(2));
                                  rates.push(assignRate);
                                }

                              }
                            }

                         }

                     }
                      //assignRate = getRateValue(df, assignRate, conditions);

                  }
                }
                else if(incedecvalue=="Dec") {
                 // if(Number(rangefr)==Number(basefat)){
                 //   	fatAssignRate = ratenew;
                 // }

                 var firstDigit = (rangefr).substring(0, 1);
                 var secondDigit = (basefat).substring(0, 1);
                 if(firstDigit==secondDigit){
                   fatAssignRate = ratenew;
                   console.log("first digit",fatAssignRate);
                 }

                  for(var j = Number(rangefr); j>=Number(rangeto); j-=0.1){
                     if(Number(basefat)==j){
                       fatarrayvalues.push(j);
                       snfarrayvalues.push(basesnf);
                       rates.push(ratenew);
                       // fatAssignRate = (Number(fatAssignRate) - Number(c1)).toFixed(2);
                     }
                     else {
                       fatAssignRate = (Number(fatAssignRate) - Number(c1)).toFixed(2);
                       fatarrayvalues.push(j);
                       snfarrayvalues.push(basesnf);
                       rates.push(fatAssignRate);

                     }

                      var assignRate;
                      assignRate = fatAssignRate;
                    for(var x = 0; x<newarraydata.length; x++){
                      var getfield = newarraydata[x].ratechartmatrixvalue;
                      const rangefr = newarraydata[x].matrixfatrangefrom;
                      const rangeto = newarraydata[x].matrixfatrangeto;
                      var incedecvalue = newarraydata[x].increvalue;
                      const c1 = newarraydata[x].condition;


                        if(getfield=="snf"){
                          var firstDigit = (rangefr).substring(0, 1);
                          var secondDigit = (basesnf).substring(0, 1);
                           if(firstDigit==secondDigit){
                             assignRate = fatAssignRate;
                           }
                          if(incedecvalue=="Inc"){

                            for(var y = Number(rangefr); y<=Number(rangeto); y+=0.1){
                              if(Number(basesnf==y)){
                                // assignRate = (Number(assignRate) + Number(c1)).toFixed(2);
                                fatarrayvalues.push(j);
                                snfarrayvalues.push(y.toFixed(2));
                                rates.push(ratenew);
                              }
                              else {
                                assignRate = (Number(assignRate) + Number(c1)).toFixed(2);
                                fatarrayvalues.push(j);
                                snfarrayvalues.push(y.toFixed(2));
                                rates.push(assignRate);
                              }
                            }
                          }
                           else if (incedecvalue=="Dec") {

                                console.log("end rate",assignRate);
                             for(var y = Number(rangefr); y>=Number(rangeto); y-=0.1){
                                 if(Number(basesnf)==y){
                                   // assignRate = (Number(assignRate) - Number(c1)).toFixed(2);
                                   fatarrayvalues.push(j);
                                   snfarrayvalues.push(y.toFixed(2));
                                   rates.push(ratenew);
                                 }
                                 else {
                                   assignRate = (Number(assignRate) - Number(c1)).toFixed(2);
                                   fatarrayvalues.push(j);
                                   snfarrayvalues.push(y.toFixed(2));
                                   rates.push(assignRate);
                                 }

                             }
                           }

                        }

                    }

                  }

                }
              }

         }
       }


       console.log("fat array va",fatarrayvalues,"snf array",snfarrayvalues,"rate",rates);

        axios.post(API_BASE_URL+'/raterangeform',{
          "params" : {
             ratechartid:this.state.ratechartid,
             rates,
             fatarrayvalues,
             snfarrayvalues,
             isdeleted
         }
       }).then(response => {
         axios.get(API_BASE_URL+'/listrangechartmatrix')
         .then(response => {

            this.setState({ allUsers: response.data.data,filteredUsers:response.data.data,currentTodos:response.data.data });
             // console.log("response matrix",(response.data.data));

         })
         .catch(e => {

         });
       })

       .then(response => {
           let myColor = { background: '#1985ac', text: "#FFFFFF", };
           notify.show('Rate Chart Created Successfully!','custom', 1000, myColor);
           setTimeout(()=> this.setState({open: true}),3000);
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
      LactoValue(e) {
        this.setState({lactovalue: e.target.value});
      }

      // inputPassword(e) {
      //   this.setState({password: e.target.value});
      // }

      changeHandler(event) {
        this.setState({ [event.target.name]: event.target.value });
      }


    backbutton(id) {
      let path = `/listratechart/`;
      this.props.history.push(path);
    }


    render() {
      const { open } = this.state;
     const {cattletype} = this.state;
     const {isSubmitted} = this.state;
      const { redirect,allUsers,items } = this.state;
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


     const elementdelete = items.map((item,index)=>{
        return <tr key={index}>
        <td>{item.ratechartmatrixvalue}</td>
        <td>{item.increvalue}</td>
        <td>{item.matrixfatrangefrom}</td>
        <td>{item.matrixfatrangeto}</td>
        <td>{item.condition}</td>
        <td><Button onClick={(event) => this.SomeDeleteRowFunction(event, index,item)}>Delete</Button></td>
        </tr>
     });


    let renderTodos1 = currentTodos.map((partners, index) => {
      let rate = JSON.parse(partners.fat_range);
      let rate2 = JSON.parse(partners.snf_lacto_range);
      let rate1 = JSON.parse(partners.rate_value);
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
               rate2.map((item)=>
                            <p>{item}</p>
                         )
            }
             </td>
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
      <div className='main'>
                  <Notifications options={{zIndex: 200, top: '120px'}} />

              </div>
              </Col>
              </Row>

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
          <Input type="date" id="effectivedate" placeholder="Effective Date" onChange={this.EffectiveDate} value={this.state.effectivedate} />

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
          <Input type="date" id="expirydate" placeholder="Expiry Date" onChange={this.ExpiryDate} value={this.state.expirydate} max={moment().format("2021-03-31")}/>
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
                <option value="society-ratehchart">RMCU Rate Chart</option>
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
              <option value="no-chart">Please Select</option>
              <option value="fat-chart">FAT Chart</option>
              <option value="fatsnf-chart">SNF Chart</option>
              <option value="fat-lacto">Lacto Chart</option>
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
              <Input type="text" id="fatrange_from" placeholder="Please Enter Fat Range" onChange={this.FatRange_From} value={this.state.fatrange_from}/>
            </FormGroup>
            </Col>
            <Col md="3">
            <FormGroup>
              <h7><Label htmlFor="fatrange_to">FAT Range To *</Label></h7>
              <Input type="text" id="fatrange_to" placeholder="Please Enter Fat Range" onChange={this.FatRange_To} value={this.state.fatrange_to}/>
            </FormGroup>
            </Col>
            <Col md="3">
            <FormGroup>
              <h7><Label htmlFor="fatsnfrange_from">SNF Range From *</Label></h7>
              <Input type="text" id="fatsnfrange_from" placeholder="Please Enter SNF Range" onChange={this.FatSnfRange_From} value={this.state.fatsnfrange_from}/>
            </FormGroup>
            </Col>
            <Col md="3">
            <FormGroup>
              <h7><Label htmlFor="fatsnfrange_to">SNF Range To *</Label></h7>
              <Input type="text" id="fatsnfrange_to" placeholder="Please Enter SNF Range" onChange={this.FatSnfRange_To} value={this.state.fatsnfrange_to}/>
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
          {this.state.charttype === "fat-chart" && (
            <FormGroup row>
             <Col md="1">
             <FormGroup>
               <h7><Label htmlFor="fixedrate">Fix Rate</Label></h7>
             </FormGroup>
             </Col>
             <Col md="5">
             <FormGroup>
              <Input type="text" id="fixedrate" placeholder="Please Enter Fixed Rate" onChange={this.FixedRate} value={this.state.fixedrate}/>
              </FormGroup>
             </Col>
             <Col md="1">
             <FormGroup>
               <h9><Label htmlFor="fatvalue">FAT Value</Label></h9>
             </FormGroup>
             </Col>
              <Col md="5">
               <FormGroup>
               <Input type="text" id="fatvalue" placeholder="Please Enter Fat Rate" onChange={this.FatValue} value={this.state.fatvalue}/>
               </FormGroup>
              </Col>
            </FormGroup>
          )}
          {this.state.charttype === "fatsnf-chart" && (
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
               <h9><Label htmlFor="fatvalue">Fat Value</Label></h9>
             </FormGroup>
             </Col>
             <Col md="3">
             <FormGroup>
               <Input type="text" id="fatvalue" placeholder="Please Enter Fat Rate" onChange={this.FatValue} value={this.state.fatvalue}/>
             </FormGroup>
             </Col>
             <Col md="1">
             <FormGroup>
               <h9><Label htmlFor="snfvalue">SNF Value</Label></h9>
             </FormGroup>
             </Col>
             <Col md="3">
             <FormGroup>
               <Input type="text" id="snfvalue" placeholder="Please Enter SNF Value" onChange={this.SNFValue} value={this.state.snfvalue}/>
             </FormGroup>
             </Col>
            </FormGroup>
          )}

          {this.state.charttype === "fat-lacto" && (
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
               <h9><Label htmlFor="fatvalue">Fat Value</Label></h9>
             </FormGroup>
             </Col>
             <Col md="3">
             <FormGroup>
               <Input type="text" id="fatvalue" placeholder="Please Enter Fat Value" onChange={this.SNFValue} value={this.state.snfvalue}/>
             </FormGroup>
             </Col>
             <Col md="1">
             <FormGroup>
               <h9><Label htmlFor="lactovalue">Lacto Value</Label></h9>
             </FormGroup>
             </Col>
             <Col md="3">
             <FormGroup>
               <Input type="text" id="lactovalue" placeholder="Please Enter Lacto Value" onChange={this.LactoValue} value={this.state.lactovalue}/>
             </FormGroup>
             </Col>
            </FormGroup>
          )}


          </Col>
        </FormGroup>

        <FormGroup row className="my-0" >
        <FormGroup row>

        <Col md="2">


        <FormGroup>
          <h7><Label htmlFor="ratechartmatrixvalue">Field *</Label></h7>
          <Input type="select" name="ratechartmatrixvalue" id="ratechartmatrixvalue" value={this.state.ratechartmatrixvalue} onChange={this.changeHandler}>
                <option value="0">Please Select</option>
                <option value="fat">FAT</option>
                <option value="snf">SNF</option>
                <option value="lacto">Lacto</option>
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
          <Input type="text" id="matrixfatrangefrom" placeholder="Please Enter Fat Range From" name="matrixfatrangefrom" value={this.state.matrixfatrangefrom} onChange={this.changeHandler} onBlur={this.handleBlur} />
          <span className="error">{this.state.errors["matrixfatrangefrom"]}</span>

        </FormGroup>
        </Col>

        <Col md="3">
        <FormGroup>
          <h7><Label htmlFor="matrixfatrangeto">Range To *</Label></h7>
          <Input type="text" id="matrixfatrangeto" placeholder="Please Enter Fat Range To" name="matrixfatrangeto" value={this.state.matrixfatrangeto} onChange={this.changeHandler} onBlur={this.handleBlur1}/>
          <span className="error">{this.state.errors["matrixfatrangeto"]}</span>
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

                <Table responsive bordered>
                  <thead>

                  <tr>
                  <th>Field </th>
                  <th>Inc/Dec </th>
                  <th>Range From</th>
                  <th>Range To</th>
                  <th>Condition</th>
                  <th>Delete</th>

                  </tr>
                  </thead>
                  <tbody>
                  {elementdelete}
                  </tbody>
                </Table>

                    </Card>
                </Col>
                </Row>
                <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>&nbsp;&nbsp;
                <Button type="button" size="md" color="primary" onClick={()=>this.backbutton()}><i className="fa fa-dot-circle-o"></i> Back</Button>

                </Form>
        </CardBody>

        </Card>
        </Col>
        </Row>

        {this.state.isSubmitted && (
        <Row className="justify-content-center">
        <Col xs="12" sm="12">
        <div style={styles}>


          <Modal open={open} onClose={this.onCloseModal}>
            <h2>Rate Matrix</h2><br />
            <Table responsive bordered>
              <thead>

              <tr>
              <th>FAT Range</th>
              <th>SNF Range</th>
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
