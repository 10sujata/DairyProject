import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
import { directive } from '@babel/types';
import { FormGroup,Badge,CardHeader,Label,FormText,Button, Card, CardBody, CardFooter, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { userInfo } from 'os';
import { Redirect } from 'react-router';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { Tabs, Tab } from 'react-bootstrap';
import ProductList from '../ProductMaster/ProductList';
import Notifications, {notify} from 'react-notify-toast';

class FarmerEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            fullname1: '',
            centername:'',
            address: '',
            contact: '',
            bank_details: '',
            cattele:'',
            commission:'',
            rfid:"",
            farmername:"",
            dob:"",
            gender:"",
            pid:"",
            designation:"",
            dairyname:"",
            ratechart: '',
            dcsno:"",
            doj:"",
            village:"",
            mobilenumber:"",
            smsenable:"",
            image: null,
            app_image:null,
            img:null,
            uploadvalue1:null,
            uploadvalue2:null,
            imageupload: "",
            aadharcardnumber:"",
            panno:"",
            address:"",
            village1:"",
            taluka:"",
            district:"",
            state:"",
            pincode:"",
            country:"",
            emailaddress:"",
            telno:"",
            telno2:"",
            education:"",
            maritalstatus:"",
            hfvalue:"",
            jerseyvalue:"",
            girvalue:"",
            xbreedvalue:"",
            localvalue:"",
            othervalue:"",
            totalcows:"",
            murrahvalue:"",
            mehsanavalue:"",
            jaffarabadivalue:"",
            surativalue:"",
            localvalue1:"",
            othervalue1:"",
            totalbuffaloes:"",
            cattleshedvalue:"",
            milking:"",
            bankname:"",
            branch:"",
            ifscvalue:"",
            accountnumber:"",
            branchvalue:"",
            debitcard:"",
            creditcard:"",
            creationvalue:"",
            cattlevalue:"cow",
            isdeleted: 'active',
            isdeleted: 'active',
            redirect: false,
            image1:"",
            key: 1,
            alldairy:[],
            allrmcu: [],
            allCenter:[],
            errors: {},
        };
        this.submitData = this.submitData.bind(this);
        this.RFID = this.RFID.bind(this);
        this.FarmerName = this.FarmerName.bind(this);
        this.DOB = this.DOB.bind(this);
        this.Gender = this.Gender.bind(this);
        this.Pid = this.Pid.bind(this);
        this.Designation = this.Designation.bind(this);
        this.inputRateChart = this.inputRateChart.bind(this);
        this.DSCNO = this.DSCNO.bind(this);
        this.VillageName = this.VillageName.bind(this);
        this.MobileNumber = this.MobileNumber.bind(this);
        this.inputSms = this.inputSms.bind(this);
        this.handleimagechange = this.handleimagechange.bind(this);
        this.handleimagechange1 = this.handleimagechange1.bind(this);
        this.handleimagechange2 = this.handleimagechange2.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.Aadharcard = this.Aadharcard.bind(this);
        this.Aadharcardvalidation = this.Aadharcardvalidation.bind(this);
        this.Pancard = this.Pancard.bind(this);
        this.Validatepancard = this.Validatepancard.bind(this);
        this.Address = this.Address.bind(this);
        this.VillageName1 = this.VillageName1.bind(this);
        this.Taluka = this.Taluka.bind(this);
        this.District = this.District.bind(this);
        this.State = this.State.bind(this);
        this.Pincode = this.Pincode.bind(this);
        this.Country = this.Country.bind(this);
        this.Email = this.Email.bind(this);
        this.Validateemail = this.Validateemail.bind(this);
        this.Telno = this.Telno.bind(this);
        this.Telno2 = this.Telno2.bind(this);
        this.Education = this.Education.bind(this);
        this.Marital = this.Marital.bind(this);
        this.HFValue = this.HFValue.bind(this);
        this.HFValue1 = this.HFValue1.bind(this);
        this.JerseyValue=this.JerseyValue.bind(this);
        this.JerseyValue1=this.JerseyValue1.bind(this);
        this.GirValue = this.GirValue.bind(this);
        this.GirValue1 = this.GirValue1.bind(this);
        this.XbreedValue = this.XbreedValue.bind(this);
        this.XbreedValue1 = this.XbreedValue1.bind(this);
        this.LocalValue = this.LocalValue.bind(this);
        this.LocalValue2= this.LocalValue2.bind(this);
        this.OtherValue = this.OtherValue.bind(this);
        this.TotalCows = this.TotalCows.bind(this);
        this.MurrahValue =this.MurrahValue.bind(this);
        this.MurrahValue1 =this.MurrahValue1.bind(this);
        this.MehsanaValue =this.MehsanaValue.bind(this);
        this.MehsanaValue1 =this.MehsanaValue1.bind(this);
        this.Jaffarabadivalue = this.Jaffarabadivalue.bind(this);
        this.Jaffarabadivalue1 = this.Jaffarabadivalue1.bind(this);
        this.Surativalue = this.Surativalue.bind(this);
        this.Surativalue1 = this.Surativalue1.bind(this);
        this.LocalValue1 = this.LocalValue1.bind(this);
        this.LocalValue3 = this.LocalValue3.bind(this);
        this.OtherValue1 = this.OtherValue1.bind(this);
        this.OtherValue3 = this.OtherValue3.bind(this);
        this.OtherValue2 = this.OtherValue2.bind(this);
        this.TotalBuffaloes = this.TotalBuffaloes.bind(this);
        this.CattleShed = this.CattleShed.bind(this);
        this.Milking = this.Milking.bind(this);
        this.BankName = this.BankName.bind(this);
        this.BranchName = this.BranchName.bind(this);
        this.IfscValue = this.IfscValue.bind(this);
        this.AccountNumber = this.AccountNumber.bind(this);
        this.BranchValue = this.BranchValue.bind(this);
        this.DebitCard = this.DebitCard.bind(this);
        this.CreditCard = this.CreditCard.bind(this);
        this.DOJ = this.DOJ.bind(this);
        this.CreationValue = this.CreationValue.bind(this);
        this.CattleValue = this.CattleValue.bind(this);
      }

      CreationValue(e){
        this.setState({creationvalue: e.target.value});
      }

      CattleValue(e) {
        this.setState({cattlevalue: e.target.value});
      }

      handleimagechange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
              return;
        this.createImage(files[0]);
      }

      handleimagechange1(e) {
        let files1 = e.target.files || e.dataTransfer.files;
        if (!files1.length)
              return;
        this.createImage1(files1[0]);
      }

      handleimagechange2(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
              return;
        this.createImage2(files[0]);
      }



      createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({
            img: e.target.result
          })
          console.log("upload1",this.state.img);
        };
        reader.readAsDataURL(file);
      }


      createImage1(file1) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({
            uploadvalue1: e.target.result
          })

          console.log("upload1",this.state.uploadvalue1);
        };
        reader.readAsDataURL(file1);
      }

      createImage2(file2) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({
            uploadvalue2: e.target.result
          })

          console.log("upload1",this.state.uploadvalue2);
        };
        reader.readAsDataURL(file2);
      }

    // componentDidMount() {
    //     firebaseConfig
    //       .database()
    //       .ref(`/Users/`)
    //       .on('value', snap => console.log('from db', snap.val()));
    //   }
    componentDidMount() {
        const {id} = this.props.match.params;
        const _this = this;

        axios.get(API_BASE_URL+'/editfarmernew/' + id)
         .then(response => {
           console.log("csdcsaxdas",response.data);

           this.setState({
             creationvalue:response.data.data[0].creationvalue,
             cattlevalue:response.data.data[0].cattlevalue,
             rfid: response.data.data[0].rfid,
             farmername: response.data.data[0].farmername,
             dob: response.data.data[0].dob,
             gender: response.data.data[0].gender,
             pid:response.data.data[0].pid,
             designation: response.data.data[0].designation,
             dairyname: response.data.data[0].dairyname,
             dcsno:response.data.data[0].dscno,
             doj: response.data.data[0].doj,
             village: response.data.data[0].village,
             mobilenumber: response.data.data[0].mobilenumber,
             smsenable:response.data.data[0].smsenable,
             aadharcardnumber:response.data.data[0].aadharcardnumber,
             panno: response.data.data[0].panno,
             address: response.data.data[0].address,
             village1: response.data.data[0].village1,
             taluka: response.data.data[0].taluka,
             district:response.data.data[0].district,
             state: response.data.data[0].state,
             pincode: response.data.data[0].pincode,
             country:response.data.data[0].country,
             emailaddress: response.data.data[0].emailaddress,
             telno: response.data.data[0].telno,
             telno2: response.data.data[0].telno2,
             education:response.data.data[0].education,
             maritalstatus:response.data.data[0].maritalstatus,
             hfvalue:response.data.data[0].hfvalue,
             jerseyvalue: response.data.data[0].jerseyvalue,
             girvalue: response.data.data[0].girvalue,
             telno2: response.data.data[0].telno2,
             xbreedvalue:response.data.data[0].xbreedvalue,
             localvalue:response.data.data[0].localvalue,
             othervalue: response.data.data[0].othervalue,
             totalcows: response.data.data[0].totalcows,
             murrahvalue: response.data.data[0].murrahvavalue,
             mehsanavalue:response.data.data[0].mehsanavalue,
             jaffarabadivalue:response.data.data[0].jaffarabadivalue,
             surativalue:response.data.data[0].surativalue,
             localvalue1: response.data.data[0].localvalue1,
             othervalue1: response.data.data[0].othervalue1,
             totalbuffaloes: response.data.data[0].totalbuffaloes,
             cattleshedvalue:response.data.data[0].cattleshedvalue,
             milking:response.data.data[0].milking,
             bankname:response.data.data[0].bankname,
             branch: response.data.data[0].branch,
             ifscvalue: response.data.data[0].ifscvalue,
             accountnumber: response.data.data[0].accountnumber,
             branchvalue:response.data.data[0].branchvalue,
             debitcard:response.data.data[0].debitcard,
             creditcard:response.data.data[0].creditcard,
             image:response.data.data[0].image,
             app_image:response.data.data[0].app_image,
             uploadvalue1:response.data.data[0].uploadvalue1,
             uploadvalue2:response.data.data[0].uploadvalue2,
             ratechart:response.data.data[0].ratechart,
             dscno:response.data.data[0].dscno,
             centernumber:response.data.data[0].centernumber,
             rmcunumber:response.data.data[0].rmcunumber,
             cattlevalue:response.data.data[0].cattlevalue,
         });

         let rmcuid = response.data.data[0].ratechart;
         console.log("rate chart id",rmcuid);
         axios.get(API_BASE_URL+'/rmcucenterfarmer/' + response.data.data[0].ratechart)
          .then(response => {
            console.log("center id",response);
               this.setState({
                 allCenter: response.data.data,
              });
       })
      })
      .catch(e => {

      });

      axios.get(API_BASE_URL+'/listsociety')
      .then(response => {
          this.setState({
            allrmcu:response.data.data,
            //centername: response.data.data[0].center_name,
          });

      })
      .catch(e => {

      });

      // axios.get(API_BASE_URL+'/listcenter')
      // .then(response => {
      //     this.setState({
      //       allCenter:response.data.data,
      //       //centername: response.data.data[0].center_name,
      //     });
      // })
      // .catch(e => {
      //
      // });


        //const userref =  firebaseConfig.database().ref(`/Regions/` + id);
    }




     submitData(e){
       e.preventDefault();
       const {id} = this.props.match.params;
        const _this = this;
        let file3 = this.state.image;
        console.log("center number",this.state.dscno,this.state.centernumber,this.state.rmcunumber);
        const {rmcunumber,centernumber,creationvalue,cattlevalue,rfid,farmername,dob,gender,pid,designation,dairyname,ratechart,dscno,doj,village,mobilenumber,smsenable,image,uploadvalue1,uploadvalue2,aadharcardnumber,panno,address,village1,taluka,district,state,pincode,country,emailaddress,telno,telno2,education,maritalstatus,hfvalue,jerseyvalue,girvalue,xbreedvalue,localvalue,othervalue,totalcows,murrahvalue,mehsanavalue,jaffarabadivalue,surativalue,localvalue1,othervalue1,totalbuffaloes,cattleshedvalue,milking,bankname,branch,ifscvalue,
 accountnumber,branchvalue,debitcard,creditcard,isdeleted} = this.state;
       axios.post(API_BASE_URL+'/updatefarmernew/'+ id,{
         creationvalue,
         centernumber,
         rmcunumber,
         cattlevalue,
         rfid,
         farmername,
         dob,
         gender,
         pid,
         designation,
         dairyname,
         ratechart,
         dscno,
         doj,
         village,
         mobilenumber,
         smsenable,
         file:this.state.img,
         file1:this.state.uploadvalue1,
         file2:this.state.uploadvalue2,
         file3,
         aadharcardnumber,
         panno,
         address,
         village1,
         taluka,
         district,
         state,
         pincode,
         country,
         emailaddress,
         telno,
         telno2,
         education,
         maritalstatus,
         hfvalue,
         jerseyvalue,
         girvalue,
         xbreedvalue,
         localvalue,
         othervalue,
         totalcows,
         murrahvalue,
         mehsanavalue,
         jaffarabadivalue,
         surativalue,
         localvalue1,
         othervalue1,
         totalbuffaloes,
         cattleshedvalue,
         milking,
         bankname,
         branch,
         ifscvalue,
         accountnumber,
         branchvalue,
         debitcard,
         creditcard,
         isdeleted
     })
     .then(() => this.setState({
       redirect: true,
     }));
    let myColor = { background: '#1985ac', text: "#FFFFFF", };
    notify.show('Data Updated Successfully!','custom', 15000, myColor);



        // firebaseConfig.auth().createUserWithEmailAndPassword(email, password).then((res) => {
        //   console.log('uid:', res.user.uid);
        //   firebaseConfig
        //   .database()
        //   .ref(`/Users/${res.user.uid}`)
        //   .set({
        //     Name: fullname,
        //     Address: address,
        //     Contact: phone,
        //     Email: email,
        //     Password: hashedPassword,
        //     Region: region,
        //     Status:status,
        //     Isdeleted: isdeleted,
        //   })
        //   .then(() => this.setState({ redirect: true }));
        // })

      }
      RFID(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
           this.setState({rfid: e.target.value});
        }
       }

       FarmerName(e) {
         var regex = new RegExp("^[a-zA-Z ]*$");
           if (regex.test(e.target.value)) {
               this.setState({farmername: e.target.value});
           }
        }

       DOB(e){
         this.setState({dob: e.target.value});
       }

       Gender(e){
         console.log("gendervalue",e.target.value);
         this.setState({gender: e.target.value});
       }

       Pid(e){
         this.setState({pid: e.target.value});
       }

       Designation(e) {
         console.log("fdsfsd",e.target.value);
         this.setState({designation: e.target.value});
       }

       DOJ(e){
         this.setState({doj: e.target.value});
       }

       VillageName(e){
         var regex = new RegExp("^[a-zA-Z ]*$");
           if (regex.test(e.target.value)) {
              this.setState({village: e.target.value});
           }
       }

       inputRateChart(e) {
         this.setState({ratechart: e.target.value});
         let id = e.target.value;
         const _this = this;

         if(id=="All"){
             this.setState({
               allCenter: "All",
            });
         }
         else {
             axios.get(API_BASE_URL+'/rmcucenter/' + id)
              .then(response => {
                console.log("center id",response);
                   this.setState({
                     allCenter: response.data.data,
                  });
           })
         }

         axios.get(API_BASE_URL+'/farmerrmcu/' + id)
          .then(response => {

            console.log("society id",response.data.data);
               this.setState({
                 rmcunumber: response.data.data[0].society_number,
              });
         })
       }

       DSCNO(e) {
         this.setState({dscno: e.target.value});
         let id = e.target.value;
         const _this = this;
         if(id==="select"){
             this.setState({
               dscno: "",
            });
         }
         else {
           axios.get(API_BASE_URL+'/liscenternumber/' + id)
            .then(response => {
              console.log("center id",response);
                 this.setState({
                   centernumber: response.data.data[0].center_number,
                });
           })
         }
       }

       MobileNumber(e){
         const re = /^[0-9\b]+$/;
         if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({mobilenumber: e.target.value});
         }
       }

       inputSms(e) {
         this.setState({smsenable: e.target.value});
       }

       Aadharcard(e) {
         const re = /^[0-9\b]+$/;
         if (e.target.value === '' || re.test(e.target.value)) {
          this.setState({aadharcardnumber: e.target.value});
         }
       }

       Aadharcardvalidation(e){
           let errors = {};
           console.log((e.target.value).length);
           if(((e.target.value).length)<12){
             errors["aadharcard"] = "Please enter 12 digit Aadharcardnumber";
             this.setState({ errors: errors});
           }
           else {
             this.setState({ errors: ''});
           }
       }


       Pancard(e) {
         this.setState({panno: e.target.value.replace(/[^\w\s]/gi, "")});
       }

       Validatepancard(e){
         var pattern = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
         let errors = {};

       if (!pattern.test(e.target.value)) {
           errors["pancard"] = "Please enter valid pancard number.";
           this.setState({ errors: errors});
         }
         else {
           this.setState({ errors: ''});
         }

       }
       Address(e) {
         this.setState({address: e.target.value});
       }

       VillageName1(e){
         this.setState({village1: e.target.value});
       }

       Taluka(e){
         this.setState({taluka: e.target.value});
       }

       District(e){
         this.setState({district: e.target.value});
       }

       State(e){
         let value = e.target.value;
 					value = value.replace(/[^A-Za-z]/gi, "");
         this.setState({state: value});
       }

       Pincode(e){
         const re = /^[0-9\b]+$/;
         if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({pincode: e.target.value});
         }
       }

       Country(e){
         let value = e.target.value;
 					value = value.replace(/[^A-Za-z]/gi, "");
         this.setState({country: value});
       }

       Email(e){
         this.setState({emailaddress: e.target.value});
       }

       Validateemail(e) {
         let errors = {};
       var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
       if (!pattern.test(e.target.value)) {

           errors["email"] = "Please enter valid email address.";
           this.setState({ errors: errors});
         }
         else {
           this.setState({ errors: ''});
         }

       }

       Telno(e){
         const re = /^[0-9\b]+$/;
         if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({telno: e.target.value});
         }

       }

       Telno2(e){
         const re = /^[0-9\b]+$/;
         if (e.target.value === '' || re.test(e.target.value)) {
          this.setState({telno2: e.target.value});
         }

       }

       Education(e){
         this.setState({education: e.target.value});
       }

       Marital(e) {
         this.setState({maritalstatus: e.target.value});
       }

       HFValue(e) {
         if(e.target.value===''||this.state.regexp.test(e.target.value)){
             this.setState({hfvalue: e.target.value});
         }

       }

       HFValue1(e) {
         let s1 = e.target.value;
         let s2 = this.state.jerseyvalue;
         let s3 = this.state.girvalue;
         let s4 = this.state.xbreedvalue;
         let s5 = this.state.localvalue;
         let s6 = this.state.othervalue;
         let s7 =Number(s1)+Number(s2)+Number(s3)+Number(s4)+Number(s5)+Number(s6);
         console.log("cdsfdsf",s7);
         // let s1 = (e.target.value)+(Number(this.state.hfvalue))+(Number(this.state.jerseyvalue))+(Number(this.state.girvalue))+(Number(this.state.xbreedvalue))+(Number(this.state.localvalue));
         this.setState({totalcows: s7});
       }

       JerseyValue1(e) {
         let s1 = e.target.value;
         let s2 = this.state.hfvalue;
         let s3 = this.state.girvalue;
         let s4 = this.state.xbreedvalue;
         let s5 = this.state.localvalue;
         let s6 = this.state.othervalue;
         let s7 =Number(s1)+Number(s2)+Number(s3)+Number(s4)+Number(s5)+Number(s6);
         console.log("cdsfdsf",s7);
         // let s1 = (e.target.value)+(Number(this.state.hfvalue))+(Number(this.state.jerseyvalue))+(Number(this.state.girvalue))+(Number(this.state.xbreedvalue))+(Number(this.state.localvalue));
         this.setState({totalcows: s7});
       }

       JerseyValue(e) {
         if(e.target.value===''||this.state.regexp.test(e.target.value)){
             this.setState({jerseyvalue: e.target.value});
         }
       }

       GirValue(e) {
         if(e.target.value===''||this.state.regexp.test(e.target.value)){
             this.setState({girvalue: e.target.value});
         }

       }

       GirValue1(e) {
         let s1 = e.target.value;
         let s2 = this.state.hfvalue;
         let s3 = this.state.jerseyvalue;
         let s4 = this.state.xbreedvalue;
         let s5 = this.state.localvalue;
         let s6 = this.state.othervalue;
         let s7 =Number(s1)+Number(s2)+Number(s3)+Number(s4)+Number(s5)+Number(s6);
         console.log("cdsfdsf",s7);
         this.setState({totalcows: s7});
       }

       XbreedValue(e) {
         if(e.target.value===''||this.state.regexp.test(e.target.value)){
             this.setState({xbreedvalue: e.target.value});
         }
       }

       XbreedValue1(e) {
         let s1 = e.target.value;
         let s2 = this.state.hfvalue;
         let s3 = this.state.jerseyvalue;
         let s4 = this.state.girvalue;
         let s5 = this.state.localvalue;
         let s6 = this.state.othervalue;
         let s7 =Number(s1)+Number(s2)+Number(s3)+Number(s4)+Number(s5)+Number(s6);
         console.log("cdsfdsf",s7);
         this.setState({totalcows: s7});
       }

       LocalValue(e) {
         if(e.target.value===''||this.state.regexp.test(e.target.value)){
             this.setState({localvalue: e.target.value});
         }
       }

       LocalValue2(e) {
         let s1 = e.target.value;
         let s2 = this.state.hfvalue;
         let s3 = this.state.jerseyvalue;
         let s4 = this.state.girvalue;
         let s5 = this.state.xbreedvalue;
         let s6 = this.state.othervalue;
         let s7 =Number(s1)+Number(s2)+Number(s3)+Number(s4)+Number(s5)+Number(s6);
         console.log("cdsfdsf",s7);
         this.setState({totalcows: s7});
       }

       OtherValue(e) {

         if(e.target.value===''||this.state.regexp.test(e.target.value)){
             this.setState({othervalue: e.target.value});
         }
       }

       OtherValue2(e) {
         let s1 = e.target.value;
         let s2 = this.state.hfvalue;
         let s3 = this.state.jerseyvalue;
         let s4 = this.state.girvalue;
         let s5 = this.state.xbreedvalue;
         let s6 = this.state.localvalue;
         let s7 =Number(s1)+Number(s2)+Number(s3)+Number(s4)+Number(s5)+Number(s6);
         console.log("cdsfdsf",s7);
         this.setState({totalcows: s7});
       }

       TotalCows(e) {
         this.setState({totalcows: e.target.value});
       }

       MurrahValue(e) {
         if(e.target.value===''||this.state.regexp.test(e.target.value)){
             this.setState({murrahvalue: e.target.value});
         }
       }


       MurrahValue1(e) {
         let s1 = e.target.value;
         let s2 = this.state.mehsanavalue;
         let s3 = this.state.jaffarabadivalue;
         let s4 = this.state.surativalue;
         let s5 = this.state.localvalue1;
         let s6 = this.state.othervalue1;
         let s7 =Number(s1)+Number(s2)+Number(s3)+Number(s4)+Number(s5)+Number(s6);
         console.log("cdsfdsf",s7);
         this.setState({totalbuffaloes: s7});
       }

       MehsanaValue(e) {
         if(e.target.value===''||this.state.regexp.test(e.target.value)){
           this.setState({mehsanavalue: e.target.value});
         }
       }

       MehsanaValue1(e) {
         let s1 = e.target.value;
         let s2 = this.state.murrahvalue;
         let s3 = this.state.jaffarabadivalue;
         let s4 = this.state.surativalue;
         let s5 = this.state.localvalue1;
         let s6 = this.state.othervalue1;
         let s7 =Number(s1)+Number(s2)+Number(s3)+Number(s4)+Number(s5)+Number(s6);
         console.log("cdsfdsf",s7);
         this.setState({totalbuffaloes: s7});
       }

       Jaffarabadivalue(e) {
         if(e.target.value===''||this.state.regexp.test(e.target.value)){
           this.setState({jaffarabadivalue: e.target.value});
         }
       }

       Jaffarabadivalue1(e) {
         let s1 = e.target.value;
         let s2 = this.state.murrahvalue;
         let s3 = this.state.mehsanavalue;
         let s4 = this.state.surativalue;
         let s5 = this.state.localvalue1;
         let s6 = this.state.othervalue1;
         let s7 =Number(s1)+Number(s2)+Number(s3)+Number(s4)+Number(s5)+Number(s6);
         console.log("cdsfdsf",s7);
         this.setState({totalbuffaloes: s7});
       }

       Surativalue(e) {
         if(e.target.value===''||this.state.regexp.test(e.target.value)){
           this.setState({surativalue: e.target.value});
         }
       }

       Surativalue1(e) {
         let s1 = e.target.value;
         let s2 = this.state.murrahvalue;
         let s3 = this.state.mehsanavalue;
         let s4 = this.state.jaffarabadivalue;
         let s5 = this.state.localvalue1;
         let s6 = this.state.othervalue1;
         let s7 =Number(s1)+Number(s2)+Number(s3)+Number(s4)+Number(s5)+Number(s6);
         console.log("cdsfdsf",s7);
         this.setState({totalbuffaloes: s7});
       }

       LocalValue1(e) {
         if(e.target.value===''||this.state.regexp.test(e.target.value)){
           this.setState({localvalue1: e.target.value});
         }
       }

       LocalValue3(e) {
         let s1 = e.target.value;
         let s2 = this.state.murrahvalue;
         let s3 = this.state.mehsanavalue;
         let s4 = this.state.jaffarabadivalue;
         let s5 = this.state.surativalue;
         let s6 = this.state.othervalue1;
         let s7 =Number(s1)+Number(s2)+Number(s3)+Number(s4)+Number(s5)+Number(s6);
         console.log("cdsfdsf",s7);
         this.setState({totalbuffaloes: s7});
       }


       OtherValue1(e) {
         if(e.target.value===''||this.state.regexp.test(e.target.value)){
           this.setState({othervalue1: e.target.value});
         }
       }

       OtherValue3(e) {
         let s1 = e.target.value;
         let s2 = this.state.murrahvalue;
         let s3 = this.state.mehsanavalue;
         let s4 = this.state.jaffarabadivalue;
         let s5 = this.state.surativalue;
         let s6 = this.state.localvalue1;
         let s7 =Number(s1)+Number(s2)+Number(s3)+Number(s4)+Number(s5)+Number(s6);
         console.log("cdsfdsf",s7);
         this.setState({totalbuffaloes: s7});
       }

       TotalBuffaloes(e) {
         this.setState({totalbuffaloes: e.target.value});
       }

       CattleShed(e) {
         this.setState({cattleshedvalue: e.target.value});
       }

       Milking(e) {
         this.setState({milking: e.target.value});
       }

       BankName(e) {
         var regex = new RegExp("^[a-zA-Z ]*$");
           if (regex.test(e.target.value)) {
             this.setState({bankname: e.target.value});
           }
       }


       BranchName(e) {
         var regex = new RegExp("^[a-zA-Z ]*$");
           if (regex.test(e.target.value)) {
             this.setState({branch: e.target.value});
           }
       }

       IfscValue(e) {
         this.setState({ifscvalue: e.target.value.replace(/[^\w\s]/gi, "")});
       }

       AccountNumber(e) {
         const re = /^[0-9\b]+$/;
         if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({accountnumber: e.target.value});
         }
       }


       BranchValue(e) {
         this.setState({branchvalue: e.target.value});
       }

       DebitCard(e) {
         this.setState({debitcard: e.target.value});
       }

       CreditCard(e) {
         this.setState({creditcard: e.target.value});
       }

       backbutton(id) {
         let path = `/listfarmers/`;
         this.props.history.push(path);
       }
      handleSelect(key) {
        //alert('selected ' + key);
        this.setState({key});
      }

    render() {

      const {creationvalue, cattlevalue, redirect ,gender,allrmcu,allCenter} = this.state;

      console.log("app image",this.state.app_image);
    if (redirect) {
      return <Redirect to="/listfarmers" />;
    }

      let rmcuList = allrmcu.length > 0
      && allrmcu.map((item, i) => {
      return (
        <option key={i} value={item.id} >{item.society_name}</option>
      )
    }, this);

      let centerList = allCenter.length > 0
      && allCenter.map((item, i) => {
      return (
        <option key={i} value={item.id} >{item.center_name}</option>
      )
    }, this);
     return(

       <Container>
       <Row className="justify-content-center">
       <Col xs="12" sm="12">
       <div className='main'>
             <Notifications options={{zIndex: 200, top: '120px'}} />
       </div>
       <Card>
       <CardHeader>
               <h2>Add Farmer Details</h2>

       </CardHeader>
       <CardBody>
         <Form onSubmit={this.submitData}>
         <div>
           <Tabs activeKey={this.state.key} onSelect={this.handleSelect}
            id="controlled-tab-example">
                <Tab eventKey={1} title="Farmer Details">
                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">
                   <FormGroup row className="my-0">
                   <Col xs="12">
                   <FormGroup row>
                   <Col md="4">
                     <FormGroup check inline>
                     <Label className="form-check-label" check htmlFor="creationvalue">Creation Value<span>*</span></Label>
                     </FormGroup>
                   </Col>
                   <Col md="8">
                   <FormGroup check inline>
                   <Label className="form-check-label" check htmlFor="creationvalue">Society Farmer Creation</Label>&nbsp;&nbsp;
                     <Input className="form-check-input" type="radio" id="creationvalue" value="rmcucreation" onChange={this.CreationValue}  checked={creationvalue == "rmcucreation"} required/>

                   </FormGroup>
                   <FormGroup check inline>
                   <Label className="form-check-label" check htmlFor="creationvalue">Center Farmer Creation</Label>&nbsp;&nbsp;
                     <Input className="form-check-input" type="radio" id="creationvalue"  value="centercreation" onChange={this.CreationValue}  checked={creationvalue == "centercreation"} required/>

                   </FormGroup>

                   </Col>
                   </FormGroup>
                     <FormGroup row className="my-0 cshds">
                       <Col xs="12">
                         <FormGroup row>
                         <Col md="4">
                           <FormGroup check inline>
                           <Label className="form-check-label" check htmlFor="cattlevalue">Cattle Type<span>*</span></Label>
                           </FormGroup>
                         </Col>
                         <Col md="8">
                         <FormGroup check inline>
                         <Label className="form-check-label" check htmlFor="cattlevalue">Cow</Label>&nbsp;&nbsp;
                         {this.state.creationvalue==="" ?(
                           <Input className="form-check-input" type="radio" id="cattlevalue" value="cow" onChange={this.CattleValue}  checked={cattlevalue == "cow"} disabled/>
                         ):(
                           <Input className="form-check-input" type="radio" id="cattlevalue" value="cow" onChange={this.CattleValue}  checked={cattlevalue == "cow"}/>

                         )}


                         </FormGroup>
                         <FormGroup check inline>
                         <Label className="form-check-label" check htmlFor="cattlevalue">Buffalo</Label>&nbsp;&nbsp;

                           {this.state.creationvalue==="" ?(
                             <Input className="form-check-input" type="radio" id="cattlevalue"  value="buffalo" onChange={this.CattleValue}  checked={cattlevalue == "buffalo"} disabled/>
                           ):(
                             <Input className="form-check-input" type="radio" id="cattlevalue"  value="buffalo" onChange={this.CattleValue}  checked={cattlevalue == "buffalo"} required/>
                           )}

                         </FormGroup>

                         <FormGroup check inline>
                         <Label className="form-check-label" check htmlFor="cattlevalue">Both</Label>&nbsp;&nbsp;
                         {this.state.creationvalue==="" ?(
                           <Input className="form-check-input" type="radio" id="cattlevalue"  value="both" onChange={this.CattleValue}  checked={cattlevalue == "both"} disabled/>
                         ):(
                           <Input className="form-check-input" type="radio" id="cattlevalue"  value="both" onChange={this.CattleValue}  checked={cattlevalue == "both"} required/>
                         )}

                         </FormGroup>

                         </Col>
                         </FormGroup>
                       </Col>
                     </FormGroup>
                   </Col>
                   </FormGroup>
                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="rfidname">RFID<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {this.state.creationvalue==="" ?(
                       <Input type="text" name="rfid" id="rfidid" value={this.state.rfid} onChange={this.RFID} disabled>
                       </Input>
                     ):(
                       <Input type="text" name="rfid" id="rfidid" value={this.state.rfid} onChange={this.RFID} required maxLength="8">
                       </Input>
                     )}
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                       <Label className="form-check-label" check htmlFor="farmername">Name<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {this.state.creationvalue==="" ?(
                       <Input type="text" name ="farmername" id="farmernameid" value={this.state.farmername} onChange={this.FarmerName} disabled>
                       </Input>
                     ):(
                       <Input type="text" name ="farmername" id="farmernameid" value={this.state.farmername} onChange={this.FarmerName}>
                       </Input>
                     )}
                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>


                   </Col>
                   </Row>

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">

                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="dob">Date Of Birth<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {this.state.creationvalue==="" ?(
                       <Input type="date" name ="dob" id="dobid" value={this.state.dob} onChange={this.DOB} disabled>
                       </Input>
                     ):(
                       <Input type="date" name ="dob" id="dobid" value={this.state.dob} onChange={this.DOB}>
                       </Input>
                     )}
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                       <Label className="form-check-label" check htmlFor="gender">Gender<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     <FormGroup check inline>
                     <Label className="form-check-label" check htmlFor="gender">Male</Label>&nbsp;&nbsp;
                     {this.state.creationvalue==="" ?(
                     <Input className="form-check-input" type="radio" id="gender" value="male" onChange={this.Gender}  checked={gender == "male"} disabled/>
                     ):(
                       <Input className="form-check-input" type="radio" id="gender" value="male" onChange={this.Gender}  checked={gender == "male"} />
                     )}


                     </FormGroup>
                     <FormGroup check inline>
                     <Label className="form-check-label" check htmlFor="gender">Female</Label>&nbsp;&nbsp;
                     {this.state.creationvalue==="" ?(
                     <Input className="form-check-input" type="radio" id="gender"  value="female" onChange={this.Gender}  value="female" checked={gender == "female"} disabled/>
                     ):(
                       <Input className="form-check-input" type="radio" id="gender"  value="female" onChange={this.Gender}  value="female" checked={gender == "female"} />
                     )}

                     </FormGroup>
                     <FormGroup check inline>
                     <Label className="form-check-label" check htmlFor="gender">Other</Label>&nbsp;&nbsp;
                     {this.state.creationvalue==="" ?(
                     <Input className="form-check-input" type="radio" id="gender"  value="other" onChange={this.Gender} checked={gender == "other"} disabled/>
                     ):(
                       <Input className="form-check-input" type="radio" id="gender"  value="other" onChange={this.Gender} checked={gender == "other"} />
                     )}

                     </FormGroup>
                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>
                   </Col>
                   </Row>

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">

                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="pid">PID<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                       <Input type="text" name ="select" id="pid" value={this.state.pid} onChange={this.Pid}>
                       </Input>
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                       <Label className="form-check-label" check htmlFor="designation">Designation</Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {this.state.creationvalue==="" ?(
                       <Input type="select" name ="select" id="designationid" value={this.state.designation} onChange={this.Designation} disabled>
                       <option value="no-value">Please Select</option>
                       <option value="designation1">Designation1</option>
                       <option value="designation2">Designation2</option>
                       <option value="designation3">Designation3</option>
                       </Input>
                     ):(
                       <Input type="select" name ="select" id="designationid" value={this.state.designation} onChange={this.Designation}>
                       <option value="no-value">Please Select</option>
                       <option value="designation1">Designation1</option>
                       <option value="designation2">Designation2</option>
                       <option value="designation3">Designation3</option>
                       </Input>
                     )}
                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>

                   </Col>
                   </Row>

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">
                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="dairyname">Select Dairy<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {this.state.creationvalue==="" ?(
                       <Input type="text" name ="select" id="dairynameid" value={this.state.dairyname} disabled>
                       </Input>
                     ):(
                       <Input type="text" name ="select" id="dairynameid" value={this.state.dairyname} >
                       </Input>
                     )}
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                       <Label className="form-check-label" check htmlFor="ratechart">Select RMCU</Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {this.state.creationvalue==="" ?(
                       <Input type="select" name ="select" id="select" value={this.state.ratechart} onChange={this.inputRateChart} required disabled>
                       <option value="1">Please Select</option>
                         {rmcuList}
                       </Input>
                     ):(
                       <Input type="select" name ="select" id="select" value={this.state.ratechart} onChange={this.inputRateChart} required>
                       <option value="1">Please Select</option>
                         {rmcuList}
                       </Input>
                     )}
                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>

                   </Col>
                   </Row>


                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">
                   <FormGroup row className="my-0">
                   <Col xs="6">

                   {this.state.creationvalue === "centercreation" ? (
                       <FormGroup row>
                       <Col md="4">
                         <FormGroup check inline>
                         <Label className="form-check-label" check htmlFor="dcsno">Select Center</Label>
                         </FormGroup>
                       </Col>
                       <Col md="8">
                       <Input type="select" name ="select" id="select" value={this.state.dscno} onChange={this.DSCNO}>
                       <option value="select">Please Select</option>
                         {centerList}
                       </Input>
                       </Col>
                       </FormGroup>
                   ):( <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                       <Label className="form-check-label" check htmlFor="mobilenumber">Mobile Number</Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {this.state.creationvalue==="" ?(
                       <Input type="text" name ="mobilenumber" id="mobilenumberid" value={this.state.mobilenumber} onChange={this.MobileNumber} required disabled>
                       </Input>
                     ):(
                       <Input type="text" name ="mobilenumber" id="mobilenumberid" value={this.state.mobilenumber} onChange={this.MobileNumber} required maxLength="10">
                       </Input>
                     )}
                     </Col>
                   </FormGroup>
                   )}

                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                       <Label className="form-check-label" check htmlFor="doj">Date Of Joining</Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {this.state.creationvalue==="" ?(
                       <Input type="date" name ="select" id="dojid" value={this.state.doj} onChange={this.DOJ} required disabled>
                       </Input>
                     ):(
                       <Input type="date" name ="select" id="dojid" value={this.state.doj} onChange={this.DOJ} required>
                       </Input>
                     )}

                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>

                   </Col>
                   </Row>



                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">
                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="villagename">Village<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {this.state.creationvalue==="" ?(
                       <Input type="text" name ="select" id="villagenameid" value={this.state.village} onChange={this.VillageName} required disabled>

                       </Input>
                     ):(
                       <Input type="text" name ="select" id="villagenameid" value={this.state.village} onChange={this.VillageName} required>

                       </Input>
                     )}
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                       <Label className="form-check-label" check htmlFor="mobilenumber">Mobile Number</Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {this.state.creationvalue === "centercreation" ? (
                       <FormGroup row>
                         <Col md="4">
                           <FormGroup check inline>
                           <Label className="form-check-label" check htmlFor="mobilenumber">Mobile Number</Label>
                           </FormGroup>
                         </Col>
                         <Col md="8">
                            <Input type="text" name ="mobilenumber" id="mobilenumberid" value={this.state.mobilenumber} onChange={this.MobileNumber} required maxLength="10">
                            </Input>
                         </Col>
                       </FormGroup>
                     ):(
                       ""
                     )}
                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>

                   </Col>
                   </Row>

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">
                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="smsenable">Enable SMS<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {this.state.creationvalue === "" ? (
                       <Input type="select" name ="select" id="select" value={this.state.smsenable} onChange={this.inputSms} disabled>
                       <option value="yes">Yes</option>
                       <option value="no">No</option>
                       </Input>
                     ):(
                       <Input type="select" name ="select" id="select" value={this.state.smsenable} onChange={this.inputSms}>
                       <option value="yes">Yes</option>
                       <option value="no">No</option>
                       </Input>
                     )}
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">

                   </Col>
                   </FormGroup>

                   </Col>
                   </Row>

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">
                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="file-input">Profile Pic<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="4">
                       <Input type="file" name ="file-input" id="file-input" onChange={this.handleimagechange.bind(this)} >

                       </Input>
                     </Col><br/>
                     <Col>
                     {this.state.image === "http://mcsoft.whitegoldtech.com:8888/images/no-image.jpg" ? (
                        <img src={this.state.app_image} height="200"/>
                     ): <img src={this.state.image} height="200"/>}

                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">

                   </Col>
                   </FormGroup>

                   </Col>
                   </Row>

                     <Button align="right" size="md" color="primary" onClick={()=>this.handleSelect(2)}><i className="fa fa-dot-circle-o tab-button"></i> Next</Button>&nbsp;&nbsp;
                   </Tab>
                   <Tab eventKey={2} title="Personal Details">

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">

                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="aadharcardnumber">Aadhaar Card No<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     <Input type="text" name ="aadharcardnumber" id="aadharcardnumberid" value={this.state.aadharcardnumber} onChange={this.Aadharcard} onBlur={this.Aadharcardvalidation} required  maxLength="12">
                     </Input>
                     <span className="error">{this.state.errors["aadharcard"]}</span>
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                       <Label className="form-check-label" check htmlFor="panno">Pan No<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     <Input type="text" name ="panno" id="pannoid" value={this.state.panno} onBlur={this.Validatepancard} onChange={this.Pancard} required>
                     </Input>
                     <span className="error">{this.state.errors["pancard"]}</span>
                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>


                   </Col>
                   </Row>

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">

                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="address">Address<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                       <Input type="text" name ="address" id="addressid" value={this.state.address} onChange={this.Address}>
                       </Input>
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="village1">Village<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                       <Input type="text" name ="village1" id="village1id" value={this.state.village1} onChange={this.VillageName1}>
                       </Input>
                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>
                   </Col>
                   </Row>

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">

                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="taluka">Taluka<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                       <Input type="text" name ="taluka" id="talukaid" value={this.state.taluka} onChange={this.Taluka}>
                       </Input>
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                       <Label className="form-check-label" check htmlFor="district">District</Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                        <Input type="text" name ="district" id="districtid" value={this.state.district} onChange={this.District}>

                        </Input>
                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>

                   </Col>
                   </Row>

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">
                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="state">State<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                       <Input type="text" name ="select" id="stateid" value={this.state.state} onChange={this.State}>


                       </Input>
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                       <Label className="form-check-label" check htmlFor="pincode">Pincode</Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                        <Input type="text" name ="pincode" id="pincodeid" value={this.state.pincode} onChange={this.Pincode}>

                        </Input>
                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>

                   </Col>
                   </Row>

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">
                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="country">Country<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                       <Input type="text" name ="country" id="countryid" value={this.state.country} onChange={this.Country}>

                       </Input>
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                       <Label className="form-check-label" check htmlFor="emailaddress">Email Address</Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     <Input type="email" name ="emailaddress" id="emailaddress" value={this.state.emailaddress} onBlur={this.Validateemail} onChange={this.Email}>

                     </Input>
                     <span className="error">{this.state.errors["email"]}</span>
                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>

                   </Col>
                   </Row>

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">
                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="telno">Tel No 1<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                       <Input type="text" name ="select" id="telnoid" value={this.state.telno} onChange={this.Telno} maxLength="10">

                       </Input>
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                       <Label className="form-check-label" check htmlFor="telno2">Tel No 1</Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                        <Input type="text" name ="telno2" id="telno2id" value={this.state.telno2} onChange={this.Telno2} maxLength="10">

                        </Input>
                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>

                   </Col>
                   </Row>

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">
                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="education">Education<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                       <Input type="text" name ="text" id="education" value={this.state.education} onChange={this.Education}>
                       </Input>
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="maritalstatus">Marital Status<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                       <Input type="select" name ="select" id="maritalstatus" value={this.state.maritalstatus} onChange={this.Marital}>
                       <option value="yes">Yes</option>
                       <option value="no">No</option>
                       </Input>
                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>

                   </Col>
                   </Row>
                     <Button align="right" size="md" color="primary" onClick={()=>this.handleSelect(3)}><i className="fa fa-dot-circle-o tab-button"></i> Next</Button>&nbsp;&nbsp;
                     <Button size="md" color="primary" className="fa fa-dot-circle-o tab-button" onClick={()=>this.handleSelect(1)}>Previous</Button>
                   </Tab>
                   <Tab eventKey={3} title="Farm Details">
                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">

                           <h6 align="left">No. Of Cows</h6>


                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="hfvalue">HF<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                         {(this.state.cattlevalue==="cow" || this.state.cattlevalue==="both") ?(
                           <Input type="number" name ="hfvalue" id="hfvalueid" value={this.state.hfvalue} onChange={this.HFValue} onBlur={this.HFValue1}/>
                         ):(
                           <Input type="number" name ="hfvalue" id="hfvalueid" value={this.state.hfvalue} onChange={this.HFValue} disabled/>
                         )}
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                       <Label className="form-check-label" check htmlFor="jerseyvalue">Jersey<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                       {(this.state.cattlevalue==="cow" || this.state.cattlevalue==="both") ?(
                         <Input type="number" name ="jerseyvalue" id="jerseyvalueid" value={this.state.jerseyvalue} onChange={this.JerseyValue} onBlur={this.JerseyValue1}>
                         </Input>
                       ):(
                         <Input type="number" name ="jerseyvalue" id="jerseyvalueid" value={this.state.jerseyvalue} onChange={this.JerseyValue} disabled/>

                       )}
                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>


                   </Col>
                   </Row>

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">

                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="girvalue">Gir<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                       {(this.state.cattlevalue==="cow" || this.state.cattlevalue==="both") ?(
                         <Input type="number" name ="girvalue" id="girvalueid" value={this.state.girvalue} onChange={this.GirValue} onBlur={this.GirValue1}>
                         </Input>
                       ):(
                         <Input type="number" name ="girvalue" id="girvalueid" value={this.state.girvalue} onChange={this.GirValue} disabled>
                         </Input>

                       )}
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="xbreedvalue">X Breed<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {(this.state.cattlevalue==="cow" || this.state.cattlevalue==="both") ?(
                       <Input type="number" name ="xbreedvalue" id="xbreedvalueid" value={this.state.xbreedvalue} onChange={this.XbreedValue} onBlur={this.XbreedValue1}>
                       </Input>
                     ):(
                       <Input type="number" name ="xbreedvalue" id="xbreedvalueid" value={this.state.xbreedvalue} onChange={this.XbreedValue} disabled>
                       </Input>

                     )}
                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>
                   </Col>
                   </Row>

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">

                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="localvalue">Local<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {(this.state.cattlevalue==="cow" || this.state.cattlevalue==="both") ?(
                       <Input type="number" name ="localvalue" id="localvalueid" value={this.state.localvalue} onChange={this.LocalValue} onBlur={this.LocalValue2}>
                       </Input>
                     ):(
                       <Input type="number" name ="localvalue" id="localvalueid" value={this.state.localvalue} onChange={this.LocalValue} disabled>
                       </Input>

                     )}
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                       <Label className="form-check-label" check htmlFor="othervalue">Other</Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {(this.state.cattlevalue==="cow" || this.state.cattlevalue==="both") ?(
                       <Input type="number" name ="othervalue" id="othervalueid" value={this.state.othervalue} onChange={this.OtherValue} onBlur={this.OtherValue2}/>
                     ):(
                     <Input type="number" name ="othervalue" id="othervalueid" value={this.state.othervalue} onChange={this.OtherValue} disabled/>

                     )}
                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>

                   </Col>
                   </Row>

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">
                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="totalcows">Total Cows<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {(this.state.cattlevalue==="cow" || this.state.cattlevalue==="both") ?(
                       <Input type="number" name ="totalcows" id="totalcowsid" value={this.state.totalcows} onChange={this.TotalCows}>
                       </Input>
                     ):(
                       <Input type="number" name ="totalcows" id="totalcowsid" value={this.state.totalcows} onChange={this.TotalCows} disabled>
                       </Input>

                     )}

                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>

                   </FormGroup>
                   </Col>
                   </FormGroup>

                   </Col>
                   </Row>

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">
                   <h6>No. Of Buffaloes</h6>
                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="murrahvalue">Murrah<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {(this.state.cattlevalue==="buffalo" || this.state.cattlevalue==="both") ?(
                       <Input type="number" name ="murrahvalue" id="murrahvalueid" value={this.state.murrahvalue} onChange={this.MurrahValue} onBlur={this.MurrahValue1}>

                       </Input>
                     ):(
                       <Input type="number" name ="murrahvalue" id="murrahvalueid" value={this.state.murrahvalue} onChange={this.MurrahValue} disabled>

                       </Input>
                     )}
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                       <Label className="form-check-label" check htmlFor="mehsanavalue">Mehsana</Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {(this.state.cattlevalue==="buffalo" || this.state.cattlevalue==="both") ?(
                       <Input type="number" name ="mehsanavalue" id="mehsanavalueid" value={this.state.mehsanavalue} onChange={this.MehsanaValue} onBlur={this.MehsanaValue1}>

                       </Input>
                     ):(
                       <Input type="number" name ="mehsanavalue" id="mehsanavalueid" value={this.state.mehsanavalue} onChange={this.MehsanaValue} disabled>

                       </Input>
                     )}
                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>

                   </Col>
                   </Row>

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">
                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="jaffarabadivalue">Jaffarabdi<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {(this.state.cattlevalue==="buffalo" || this.state.cattlevalue==="both") ?(
                       <Input type="number" name ="jaffarabadivalue" id="jaffarabadivalueid" value={this.state.jaffarabadivalue} onChange={this.Jaffarabadivalue} onBlur={this.Jaffarabadivalue1}>

                       </Input>
                     ):(
                       <Input type="number" name ="jaffarabadivalue" id="jaffarabadivalueid" value={this.state.jaffarabadivalue} onChange={this.Jaffarabadivalue} disabled>

                       </Input>
                     )}
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                       <Label className="form-check-label" check htmlFor="surativalue">Surati</Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {(this.state.cattlevalue==="buffalo" || this.state.cattlevalue==="both") ?(
                       <Input type="number" name ="surativalue" id="surativalueid" value={this.state.surativalue} onChange={this.Surativalue} onBlur={this.Surativalue1}>
                       </Input>
                     ):(
                       <Input type="number" name ="surativalue" id="surativalueid" value={this.state.surativalue} onChange={this.Surativalue} disabled>
                       </Input>
                     )}
                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>

                   </Col>
                   </Row>

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">
                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="localvalue1">Local<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {(this.state.cattlevalue==="buffalo" || this.state.cattlevalue==="both") ?(
                       <Input type="number" name ="localvalue1" id="localvalue1id" value={this.state.localvalue1} onChange={this.LocalValue1} onBlur={this.LocalValue3}>

                       </Input>
                     ):(
                       <Input type="number" name ="localvalue1" id="localvalue1id" value={this.state.localvalue1} onChange={this.LocalValue1} disabled>

                       </Input>
                     )}
                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="othervalue1">Other<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {(this.state.cattlevalue==="buffalo" || this.state.cattlevalue==="both") ?(
                     <Input type="number" name ="othervalue1" id="othervalue1id" value={this.state.othervalue1} onChange={this.OtherValue1} onBlur={this.OtherValue3}>
                       </Input>
                     ):(
                       <Input type="number" name ="othervalue1" id="othervalue1id" value={this.state.othervalue1} onChange={this.OtherValue1} disabled>
                       </Input>
                     )}
                     </Col>
                   </FormGroup>
                   </Col>
                   </FormGroup>

                   </Col>
                   </Row>

                   <Row className="justify-content-center">
                   <Col xs="12" sm="12">
                   <FormGroup row className="my-0">
                   <Col xs="6">
                   <FormGroup row>
                     <Col md="4">
                       <FormGroup check inline>
                         <Label className="form-check-label" htmlFor="totalbuffaloes">Total Buffaloes<span>*</span></Label>
                       </FormGroup>
                     </Col>
                     <Col md="8">
                     {(this.state.cattlevalue==="buffalo" || this.state.cattlevalue==="both") ?(
                       <Input type="number" name ="totalbuffaloes" id="totalbuffaloesid" value={this.state.totalbuffaloes} onChange={this.TotalBuffaloes}>

                       </Input>
                     ):(
                       <Input type="number" name ="totalbuffaloes" id="totalbuffaloesid" value={this.state.totalbuffaloes} onChange={this.TotalBuffaloes} disabled>

                       </Input>
                     )}

                     </Col>
                   </FormGroup>
                   </Col>
                   <Col xs="6">
                   <FormGroup row>

                   </FormGroup>
                   </Col>
                   </FormGroup>

                   </Col>
                   </Row>


               <Row className="justify-content-center">
               <Col xs="12" sm="12">
               <FormGroup row className="my-0">
               <Col xs="6">
               <FormGroup row>
                 <Col md="4">
                   <FormGroup check inline>
                     <Label className="form-check-label" htmlFor="cattleshedvalue">Cattle Shed<span>*</span></Label>
                   </FormGroup>
                 </Col>
                 <Col md="8">
                   <Input type="select" name ="cattleshedvalue" id="cattleshedvalueid" value={this.state.cattleshedvalue} onChange={this.CattleShed}>
                   <option value="conventional">CONVENTIONAL</option>
                   <option value="planned">Planned</option>
                   </Input>
                 </Col>
               </FormGroup>
               </Col>
               <Col xs="6">
               <FormGroup row>
                 <Col md="4">
                   <FormGroup check inline>
                     <Label className="form-check-label" htmlFor="milking">Milking<span>*</span></Label>
                   </FormGroup>
                 </Col>
                 <Col md="8">
                   <Input type="select" name ="milking" id="milkingid" value={this.state.milking} onChange={this.Milking}>
                   <option value="hand-milking">HAND MILKING</option>
                   <option value="machine-milking">MACHINE MILKING</option>
                   </Input>
                 </Col>
               </FormGroup>
               </Col>
               </FormGroup>

               </Col>
               </Row>

<Button align="right" size="md" color="primary" onClick={()=>this.handleSelect(4)}><i className="fa fa-dot-circle-o tab-button"></i> Next</Button>&nbsp;&nbsp;
<Button size="md" color="primary" className="fa fa-dot-circle-o tab-button" onClick={()=>this.handleSelect(2)}>Previous</Button>

                   </Tab>
           <Tab eventKey={4} title="Bank Details">
           <Row className="justify-content-center">
           <Col xs="12" sm="12">
           <FormGroup row className="my-0">
           <Col xs="6">
           <FormGroup row>
             <Col md="4">
               <FormGroup check inline>
                 <Label className="form-check-label" htmlFor="bankname">Bank Name<span>*</span></Label>
               </FormGroup>
             </Col>
             <Col md="8">
               <Input type="text" name ="bankname" id="banknameid" value={this.state.bankname} onChange={this.BankName}>
               </Input>
             </Col>
           </FormGroup>
           </Col>
           <Col xs="6">
           <FormGroup row>
             <Col md="4">
               <FormGroup check inline>
               <Label className="form-check-label" check htmlFor="branch">Branch<span>*</span></Label>
               </FormGroup>
             </Col>
             <Col md="8">
                <Input type="text" name ="branch" id="branchid" value={this.state.branch} onChange={this.BranchName}>
                </Input>
             </Col>
           </FormGroup>
           </Col>
           </FormGroup>


           </Col>
           </Row>

           <Row className="justify-content-center">
           <Col xs="12" sm="12">

           <FormGroup row className="my-0">
           <Col xs="6">
           <FormGroup row>
             <Col md="4">
               <FormGroup check inline>
                 <Label className="form-check-label" htmlFor="ifscvalue">IFSC<span>*</span></Label>
               </FormGroup>
             </Col>
             <Col md="8">
             <Input type="text" name ="ifscvalue" id="ifscvalueid" value={this.state.ifscvalue} onChange={this.IfscValue} maxLength="12">
             </Input>
             </Col>
           </FormGroup>
           </Col>
           <Col xs="6">
           <FormGroup row>
             <Col md="4">
               <FormGroup check inline>
                 <Label className="form-check-label" htmlFor="accountnumber">A/c number<span>*</span></Label>
               </FormGroup>
             </Col>
             <Col md="8">
             <Input type="text" name ="accountnumber" id="accountnumberid" value={this.state.accountnumber} onChange={this.AccountNumber} maxLength="15">
             </Input>
             </Col>
           </FormGroup>
           </Col>
           </FormGroup>
           </Col>
           </Row>

           <Row className="justify-content-center">
           <Col xs="12" sm="12">

           <FormGroup row className="my-0">
           <Col xs="6">
           <FormGroup row>
             <Col md="4">
               <FormGroup check inline>
                 <Label className="form-check-label" htmlFor="branchvalue">Branch In Village<span>*</span></Label>
               </FormGroup>
             </Col>
             <Col md="8">
               <Input type="select" name ="select" id="branchvalueid" value={this.state.branchvalue} onChange={this.BranchValue}>
               <option value="yes">YES</option>
               <option value="no">No</option>
               </Input>
             </Col>
           </FormGroup>
           </Col>
           <Col xs="6">
           <FormGroup row>
             <Col md="4">
               <FormGroup check inline>
               <Label className="form-check-label" check htmlFor="debitcard">Debit Card</Label>
               </FormGroup>
             </Col>
             <Col md="8">
                <Input type="select" name ="select" id="debitcardid" value={this.state.debitcard} onChange={this.DebitCard}>
                   <option value="yes">Yes</option>
                   <option value="no">No</option>
                </Input>
             </Col>
           </FormGroup>
           </Col>
           </FormGroup>

           </Col>
           </Row>

           <Row className="justify-content-center">
           <Col xs="12" sm="12">
           <FormGroup row className="my-0">
           <Col xs="6">
           <FormGroup row>
             <Col md="4">
               <FormGroup check inline>
                 <Label className="form-check-label" htmlFor="creditcard">Credit Card<span>*</span></Label>
               </FormGroup>
             </Col>
             <Col md="8">
               <Input type="select" name ="select" id="creditcardid" value={this.state.creditcard} onChange={this.CreditCard}>
               <option value="yes">Yes</option>
               <option value="no">No</option>
               </Input>
             </Col>
           </FormGroup>
           </Col>
           <Col xs="6">
           <FormGroup row>

           </FormGroup>
           </Col>
           </FormGroup>

           </Col>
           </Row>

           <Button align="right" size="md" color="primary" onClick={()=>this.handleSelect(5)}><i className="fa fa-dot-circle-o tab-button"></i> Next</Button>&nbsp;&nbsp;
           <Button size="md" color="primary" className="fa fa-dot-circle-o tab-button" onClick={()=>this.handleSelect(3)}>Previous</Button>

           </Tab>
           <Tab eventKey={5} title="Uploads">
           <FormGroup row>
             <Col md="4">
               <FormGroup check inline>
                 <Label className="form-check-label" htmlFor="file-input">Uploads1<span>*</span></Label>
               </FormGroup>
             </Col>
             <Col md="8">
               <Input type="file" name ="file-input" id="file-input" onChange={this.handleimagechange1}>

               </Input>
             </Col>

           </FormGroup>

           <FormGroup row>
             <Col md="4">
               <FormGroup check inline>
                 <Label className="form-check-label" htmlFor="file-input">Uploads2<span>*</span></Label>
               </FormGroup>
             </Col>
             <Col md="8">
               <Input type="file" name ="file-input" id="file-input" onChange={this.handleimagechange2}>

               </Input>
             </Col>


           </FormGroup>

           <Button align="right" type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o tab-button"></i> Update</Button>&nbsp;&nbsp;
           <Button size="md" color="primary" className="fa fa-dot-circle-o tab-button" onClick={()=>this.handleSelect(4)}>Previous</Button>
           </Tab>
           </Tabs>
         </div>
         </Form>
       </CardBody>

       </Card>
       </Col>
       </Row>
       </Container>

     );
    }
}
export default FarmerEdit;
