import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
import { directive } from '@babel/types';
import { FormGroup,Badge,CardHeader,Label,FormText,Button, Card, CardBody, CardFooter, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { userInfo } from 'os';
import { Redirect } from 'react-router';
import Notifications, {notify} from 'react-notify-toast';
import axios from 'axios';
import { API_BASE_URL } from '../../config';



class TransactionSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
          ratechart1:[],
          ratechart2:[],
          ratechart3:[],
          ratechart4:[],
            allrmcu: [],
            rmcuname: '',
            rmcuname1:'',
            centername: '',
            scale:'manual',
            analyzer: 'auto',
            analyzer1: 'auto',
            cowmorning: '',
            buffelomorning:'',
            cowevening:'',
            buffeloevening:'',
            printingvalue:'',
            printingvalue1:'',
            settingvalue:'',
            status: 'Pending',
            isdeleted: 'active',
            isButtonDisabled: false,
            redirect: false,
            centernamenew:'',
            rmcuname:'',
            headermessage:'',
            footermessage:'',
            readOnly: true,
            ratevalue1:'',
            ratevalue2:'',
            checked: false,
            littervalue:false
        };

        this.inputRMCU = this.inputRMCU.bind(this);
        this.CenterName = this.CenterName.bind(this);
        this.scale = this.scale.bind(this);
        this.analyzer= this.analyzer.bind(this);
        this.cowmorning = this.cowmorning.bind(this);
        this.buffelomorning = this.buffelomorning.bind(this);
        this.cowevening = this.cowevening.bind(this);
        this.buffeloevening = this.buffeloevening.bind(this);
        this.printingvalue = this.printingvalue.bind(this);
        this.printingvalue1 = this.printingvalue1.bind(this);
        this.snfvalue= this.snfvalue.bind(this);
        this.littervalue= this.littervalue.bind(this);
        this.settingvalue = this.settingvalue.bind(this);
        this.HeaderMessage = this.HeaderMessage.bind(this);
        this.FooterMessage = this.FooterMessage.bind(this);
        this.RateValue1 = this.RateValue1.bind(this);
        this.RateValue2 = this.RateValue2.bind(this);
        this.submitData = this.submitData.bind(this);
      }


      inputRMCU(e){
        console.log('Selected value:', e.target.value);
        this.setState({rmcuname: e.target.value});
        let id = e.target.value;
        const _this = this;

        if(id=="All"){
            this.setState({
              centernamenew: "All",
           });
        }
        else {
            axios.get(API_BASE_URL+'/rmcucenter/' + id)
             .then(response => {

               console.log("center id",response);
                  this.setState({
                    centernamenew: response.data.data,
                 });
          })

            axios.get(API_BASE_URL+'/rmcunameid/' + id)
              .then(response => {
                console.log("rmcuname id",response);
                    this.setState({
                      rmcunameid: response.data.data[0].society_name,
                  });
            })
        }

        

        //let id = `/editdevice/`+id;
      }


      CenterName(e){

        let id = e.target.value;
        console.log("center name id",id);
        const _this = this;
        this.setState({centername: e.target.value});

        axios.get(API_BASE_URL+ '/settingslistid/' +id)
          .then(response => {            
            if(response.data.data==""){
              this.setState({
                headermessage:'',
                footermessage:'',
                printingvalue:'',
                cowmorning:'',
                cowevening:'',
                buffelomorning:'',
                buffeloevening:'',
                scale:'',
                littervalue:false,
                checked:false,

              });
            }
            else {
              const checked = response.data.data[0].snfformula==="1"? true : false;
            const littervalue = response.data.data[0].littervalue==="1"? true : false;
              this.setState({
                headermessage:response.data.data[0].headermessage,
                footermessage:response.data.data[0].footermessage,
                printingvalue:response.data.data[0].printingvalue,
                cowmorning:response.data.data[0].cowmorning,
                cowevening:response.data.data[0].cowevening,
                buffelomorning:response.data.data[0].buffelomorning,
                buffeloevening:response.data.data[0].buffeloevening,
                scale:response.data.data[0].scale,
                littervalue:littervalue,
                checked:checked,
                analyzer:response.data.data[0].analyzer,
                ratevalue1:response.data.data[0].ratevalue1,
                ratevalue2:response.data.data[0].ratevalue2,

              });
            }


            axios.get(API_BASE_URL+'/centernameid/' + id)
              .then(response => {
                console.log("centername id",response);
                    this.setState({
                      centernameid: response.data.data[0].center_name,
                  });
            })              

          })
          .catch(e => {

          });
      }

      scale(e) {
        this.setState({scale: e.target.value});
      }

      analyzer(e) {
        this.setState({analyzer: e.target.value});
      }

      cowmorning(e) {
        this.setState({cowmorning: e.target.value});
        let id = e.target.value;
          axios.get(API_BASE_URL+'/cowmorningid/' + id)
              .then(response => {
                console.log("cowmorning id",response);
                    this.setState({
                      cowmorningname: response.data.data[0].chartname,
                  });
            })
      }
      buffelomorning(e){
        this.setState({buffelomorning: e.target.value});
        let id = e.target.value;
          axios.get(API_BASE_URL+'/buffelomorningid/' + id)
              .then(response => {
                console.log("cowmorning id",response);
                    this.setState({
                      buffelomorningname: response.data.data[0].chartname,
                  });
            })
      }

      cowevening(e){
        this.setState({cowevening: e.target.value});
        let id = e.target.value;
          axios.get(API_BASE_URL+'/coweveningid/' + id)
              .then(response => {
                console.log("cowmorning id",response);
                    this.setState({
                      coweveningname: response.data.data[0].chartname,
                  });
            })
      }

      buffeloevening(e){
        this.setState({buffeloevening: e.target.value});
        let id = e.target.value;
        axios.get(API_BASE_URL+'/buffeloeveningid/' + id)
            .then(response => {
              console.log("cowmorning id",response);
                  this.setState({
                    buffeloeveningname: response.data.data[0].chartname,
                });
          })
      }

      printingvalue(e) {
        this.setState({printingvalue: e.target.value});
      }

      printingvalue1(e) {
        this.setState({printingvalue1: e.target.value});
      }

      settingvalue(e){
        let id = e.target.value;
        const _this = this;
        this.setState({settingvalue: e.target.value});

        axios.get(API_BASE_URL+ '/commonsettingslistid/' +id)
          .then(response => {
            console.log("response center",response);
            if(response.data.data==""){
              this.setState({
                headermessage:'',
                footermessage:'',
                printingvalue:'',
                cowmorning:'',
                cowevening:'',
                buffelomorning:'',
                buffeloevening:'',
                scale:''

              });
            }
            else {
              this.setState({
                headermessage:response.data.data[0].headermessage,
                footermessage:response.data.data[0].footermessage,
                printingvalue:response.data.data[0].printingvalue,
                cowmorning:response.data.data[0].cowmorning,
                cowevening:response.data.data[0].cowevening,
                buffelomorning:response.data.data[0].buffelomorning,
                buffeloevening:response.data.data[0].buffeloevening,
                scale:response.data.data[0].scale

              });
            }

              console.log("common setting response",response);

          })
          .catch(e => {

          });

      }

      HeaderMessage(e){
        this.setState({headermessage: e.target.value});
      }

      FooterMessage(e){
        this.setState({footermessage: e.target.value});
      }

      RateValue1(e){
        this.setState({ratevalue1: e.target.value});
      }

      RateValue2(e){
        this.setState({ratevalue2: e.target.value});
      }

      snfvalue(e){
        this.setState({
      	   checked: !this.state.checked
        });
      }

      littervalue(e){
        this.setState({
      	   littervalue: !this.state.littervalue
        });
      }

     componentDidMount(){

       axios.get(API_BASE_URL+'/listsociety')
       .then(response => {
           this.setState({
             allrmcu:response.data.data,
             //centername: response.data.data[0].center_name,
           });

       })
       .catch(e => {

       });

       axios.get(API_BASE_URL+'/listratechart1')
       .then(response => {
           console.log("ratevresponse",response);
           this.setState({
             ratechart1:response.data.data,
             //centername: response.data.data[0].center_name,
           });

       })
       .catch(e => {

       });

       axios.get(API_BASE_URL+'/listratechart2')
       .then(response => {
         this.setState({
           ratechart2:response.data.data,
           //centername: response.data.data[0].center_name,
         });

       })
       .catch(e => {

       });

       axios.get(API_BASE_URL+'/listratechart3')
       .then(response => {
           console.log("ratevresponse",response);
           this.setState({
             ratechart3:response.data.data,
             //centername: response.data.data[0].center_name,
           });

       })
       .catch(e => {

       });

       axios.get(API_BASE_URL+'/listratechart4')
       .then(response => {
           console.log("ratevresponse",response);
           this.setState({
             ratechart4:response.data.data,
             //centername: response.data.data[0].center_name,
           });

       })
       .catch(e => {

       });

       axios.get(API_BASE_URL+'/settingslist1')
         .then(response => {
             this.setState({
               analyzer1: response.data.data[0].analyzer,
               rmcuname1: response.data.data[0].rmcuname,
             });
             console.log("common setting response",this.state.analyzer);

         })
         .catch(e => {

         });
     }

     submitData(e) {
          
      
       e.preventDefault();   
       if(this.state.scale===""){
        this.state.scale="manual";
       } 
       if(this.state.analyzer===""){
        this.state.scale="auto";
       }     

       console.log("this.state.checked",this.state.checked);
       console.log("this.state.littervalue",this.state.littervalue);
         const {cowmorningname,buffelomorningname,coweveningname,buffeloeveningname,centernameid,rmcunameid,scale,checked,littervalue,ratevalue1,ratevalue2,headermessage,footermessage,settingvalue,analyzer,cowmorning,buffelomorning,cowevening,buffeloevening,printingvalue,isdeleted} = this.state;
         let rmcuname = this.state.rmcuname;
         let centername = this.state.centername;
         if(this.state.settingvalue=="common"){
           rmcuname="all";
           centername="all";
         }
         
       axios.post(API_BASE_URL+'/settingsform',{
        cowmorningname,
        buffelomorningname,
        coweveningname,
        buffeloeveningname,
        rmcuname,
        centername,
        scale,
        analyzer,
        cowmorning,
        buffelomorning,
        cowevening,
        buffeloevening,
        printingvalue,
        checked,
        littervalue,
        headermessage,
        footermessage,
        settingvalue,
        isdeleted:'active',
        ratevalue1,
        ratevalue2,
        centernameid,
        rmcunameid
     })
     .then(response => {
         let myColor = { background: '#1985ac', text: "#FFFFFF", };
         notify.show('Settings Saved Successfully!','custom', 3000, myColor);
         setTimeout(()=> this.setState({open: true}),3000);
       // console.log(response);

       // self.setState({ open: false});

     });

      this.setState({
        rmcuname: '',
        centername: '',
        scale:'',
        analyzer: '',
        cowmorning: '',
        buffelomorning:'',
        cowevening:'',
        buffeloevening:'',
        printingvalue:'',
        checked:false,
        littervalue:false,
        ratevalue1:'',
        ratevalue2:'',
        settingvalue:'',
        headermessage:'',
        footermessage:'',
        isdeleted:'',
      })

     }


     backbutton() {
       this.setState({
         rmcuname: '',
         centername: '',
         scale:'',
         analyzer: '',
         cowmorning: '',
         buffelomorning:'',
         cowevening:'',
         buffeloevening:'',
         printingvalue:'',         
         snfvalue:'no',
         ratevalue1:'',
         ratevalue2:'',
         settingvalue:'',
         headermessage:'',
         footermessage:'',
         isdeleted:'',
         littervalue:false,
         checked:false,
         ratevalue1:'',
         ratevalue2:'',
       })
     }

    render() {
        const {snfvalue,allrmcu,centernamenew,ratechart1,ratechart2,ratechart3,ratechart4,printingvalue,printingvalue1,settingvalue} = this.state;

      const { redirect } = this.state;
    // if (redirect) {
    //   return <Redirect to="/listbanks" />;
    // }


      let rmcuList = allrmcu.length > 0
      && allrmcu.map((item, i) => {
        if(this.state.settingvalue=="common"){
          return (
            <option value="All">All</option>
          )
        }else {
          return (
            <option key={i} value={item.id} >{item.society_name}</option>
          )
        }

    }, this);

     let centerlist = centernamenew.length > 0
     && centernamenew.map((item, i) => {
     return (
       <option key={i} value={item.id} >{item.center_name}</option>
     )
   }, this);


     let rmcuList1 = ratechart1.length > 0
     && ratechart1.map((item, i) => {
     return (
       <option key={i} value={item.id} >{item.chartname}</option>
     )
   }, this);

     let rmcuList2 = ratechart2.length > 0
     && ratechart2.map((item, i) => {
     return (
       <option key={i} value={item.id} >{item.chartname}</option>
     )
    }, this);

    let rmcuList3 = ratechart3.length > 0
    && ratechart3.map((item, i) => {
    return (
      <option key={i} value={item.id} >{item.chartname}</option>
    )
   }, this);


   let rmcuList4 = ratechart4.length > 0
   && ratechart4.map((item, i) => {
   return (
     <option key={i} value={item.id} >{item.chartname}</option>
   )
  }, this);

  const content = this.state.checked
    	? <FormGroup row className="my-0 new-row1">
      <Col xs="12" align="center">
         <FormGroup row>

            <FormGroup className="s1new">
              <h7 align="center">SNF</h7>=CLR/4+
            </FormGroup>


            <FormGroup className="s2new">
             <Input class="input1" className="s2new1" type="text" id="ratevalue1"  value={this.state.ratevalue1} onChange={this.RateValue1} required/>
            </FormGroup>


            <FormGroup className="s2new">
             *FAT+
            </FormGroup>


            <FormGroup className="s2new">
             <Input class="input1" className="s2new1" type="text" id="ratevalue2"  value={this.state.ratevalue2} onChange={this.RateValue2}/>
            </FormGroup>

         </FormGroup>
      </Col>
      </FormGroup>
      : null;


     return(

        <Container>
          <Form onSubmit={this.submitData}>

          <Row>
          <Col xs="12" sm="12">
          <div className='main'>
                      <Notifications options={{zIndex: 200, top: '120px'}} />

                  </div>
          <Card>
          <CardHeader>
                  <h4 align="center">Setting Option</h4>

          </CardHeader>
          <CardBody>

          <FormGroup row className="my-0">
          <Col xs="12">
          <FormGroup check inline>
            <Input className="form-check-input" type="checkbox" id="settingvalue" onChange={this.settingvalue} value="common" checked={settingvalue == "common"} />
            <Label className="form-check-label" check htmlFor="settingvalue">Common</Label>
          </FormGroup>
          <FormGroup check inline>
            <Input className="form-check-input" type="checkbox" id="settingvalue" onChange={this.settingvalue} value="individual" checked={settingvalue == "individual"} />
            <Label className="form-check-label" check htmlFor="settingvalue">Individual</Label>
          </FormGroup>
          </Col>

          </FormGroup>


          </CardBody>

          </Card>
          </Col>
          </Row>
        <Row className="justify-content-center">
        <Col xs="12" sm="12">
        <Card>
        <CardHeader>
                <h4 align="center">Transaction Settings</h4>
        </CardHeader>
        <CardBody>

        <FormGroup row className="my-0">
        <Col xs="6">
        <FormGroup row>
          <Col md="4">
            <FormGroup check inline>
              <Label className="form-check-label" htmlFor="rmcuname">Select Society Center<span>*</span></Label>
            </FormGroup>
          </Col>
          <Col md="8">
          {this.state.settingvalue=="common" ? (
            <Input type="select" name ="select" id="rmcunameid" value={this.state.rmcuname}>
              <option value="all" >All</option>

            </Input>):(<Input type="select" name ="select" id="rmcunameid" onChange={this.inputRMCU} value={this.state.rmcuname}>
                <option value="1">Please Select</option>
                {rmcuList}
              </Input>
            )
          }



          </Col>
        </FormGroup>
        </Col>
        <Col xs="6">
        <FormGroup row>
          <Col md="4">
            <FormGroup check inline>
            <Label className="form-check-label" check htmlFor="centername">Center Name</Label>
            </FormGroup>
          </Col>
          <Col md="8">
           {this.state.settingvalue=="common" ? (
             <Input type="select" name ="select" id="centernameid" value={this.state.centername}>
                <option value="all" >All</option>
             </Input>
           ):(
             <Input type="select" name ="select" id="centernameid" onChange={this.CenterName} value={this.state.centername}>
             <option value="select">Please Select</option>
               {centerlist}
             </Input>

           )}


          </Col>
        </FormGroup>
        </Col>
        </FormGroup>


        </CardBody>

        </Card>
        </Col>
        </Row>
        <Row>
        <Col xs="12" sm="12">
        <Card>
        <CardHeader>
                <h4 align="center">Collection Mode</h4>

        </CardHeader>
        <CardBody>

        <FormGroup row className="my-0">
        <Col xs="6">
        <FormGroup row>
          <Col md="4">
            <FormGroup check inline>
            <Label className="form-check-label" check htmlFor="scale">Weighting Scale</Label>
            </FormGroup>
          </Col>
          <Col md="8">
          <Input type="select" id="scale" onChange={this.scale} value={this.state.scale}>
          <option value="manual">Manual</option>
          <option value="auto">Auto</option>
          </Input>

          </Col>
        </FormGroup>
        </Col>
        <Col xs="6">
        <FormGroup row>
          <Col md="4">
            <FormGroup check inline>
            <Label className="form-check-label" check htmlFor="analyzer">Analyzer</Label>
            </FormGroup>
          </Col>
          <Col md="8">
          {this.state.settingvalue=="common" ? (
            <Input type="select" id="analyzer" onChange={this.analyzer} value={this.state.analyzer1}>
              <option value="manual">Manual</option>
              <option value="auto">Auto</option>
              </Input>):(  <Input type="select" id="analyzer" onChange={this.analyzer} value={this.state.analyzer}>
              <option value="manual">Manual</option>
              <option value="auto">Auto</option>
              </Input>
            )
          }

          </Col>
        </FormGroup>
        </Col>
        </FormGroup>


        </CardBody>

        </Card>
        </Col>
        </Row>
        <Row>
        <Col xs="12" sm="12" align="center" >
        <Card>
        <CardBody>
                <h4 align="center">Rate Chart Settings</h4><br/>
          <FormGroup row className="my-0">
          <Col xs="12">

          <FormGroup check inline>
           <Input type="checkbox" checked={ this.state.littervalue } onChange={ this.littervalue } />
            <Label className="form-check-label" check htmlFor="snfvalue">Kg. to Ltr.</Label>
          </FormGroup><br />
          <FormGroup check inline>
           <Input type="checkbox" checked={ this.state.checked } onChange={ this.snfvalue } />
            <Label className="form-check-label" check htmlFor="snfvalue">SNF by formula</Label>
          </FormGroup>
          </Col>

          </FormGroup>
          {content}

        </CardBody>
        </Card>
        <Card>
        <CardBody>
        <FormGroup row className="my-0">
        <Col xs="6">
        <FormGroup row>
          <Col md="4">
            <FormGroup check inline>
            <Label className="form-check-label" check htmlFor="cowmorning">Cow Morning</Label>
            </FormGroup>
          </Col>
          <Col md="8">
          <Input type="select" name ="select" id="cowmorning" onChange={this.cowmorning} value={this.state.cowmorning}>
          <option value="select">Please Select</option>
            {rmcuList1}
          </Input>

          </Col>
        </FormGroup><br />
        <FormGroup row>
          <Col md="4">
            <FormGroup check inline>
            <Label className="form-check-label" check htmlFor="cowevening">Cow Evening</Label>
            </FormGroup>
          </Col>
          <Col md="8">
          <Input type="select" name ="select" id="cowevening" onChange={this.cowevening} value={this.state.cowevening}>
            <option value="select">Please Select</option>
            {rmcuList3}
          </Input>

          </Col>
        </FormGroup>
        </Col>
        <Col xs="6">
        <FormGroup row>
          <Col md="4">
            <FormGroup check inline>
            <Label className="form-check-label" check htmlFor="buffelomorning">Buffalo Morning</Label>
            </FormGroup>
          </Col>
          <Col md="8">
          <Input type="select" name ="select" id="buffelomorning" onChange={this.buffelomorning} value={this.state.buffelomorning}>
            <option value="select">Please Select</option>
            {rmcuList2}
          </Input>
          </Col>
        </FormGroup><br />
        <FormGroup row>
          <Col md="4">
            <FormGroup check inline>
            <Label className="form-check-label" check htmlFor="buffeloevening">Buffalo Evening</Label>
            </FormGroup>
          </Col>
          <Col md="8">
          <Input type="select" name ="select" id="buffeloevening" onChange={this.buffeloevening} value={this.state.buffeloevening}>
            <option value="select">Please Select</option>
            {rmcuList4}
          </Input>

          </Col>
        </FormGroup>
        </Col>
        </FormGroup>
        </CardBody>

        </Card>
        </Col>
        </Row>

        <Row>
        <Col xs="12" sm="12">
        <Card>
        <CardHeader>
                <h4 align="center">Printing Options</h4>

        </CardHeader>
        <CardBody>

        <FormGroup row className="my-0">

        <Col xs="12">
        <FormGroup>
          <h5><Label htmlFor="header-message">Header Message</Label></h5>
          <Input type="text" id="header-message" onChange={this.HeaderMessage} value={this.state.headermessage}/>
        </FormGroup>

        <FormGroup>
          <h5><Label htmlFor="footer-message">Footer Message</Label></h5>
          <Input type="text" id="footer-message" onChange={this.FooterMessage} value={this.state.footermessage}/>
        </FormGroup>
        <h5><Label htmlFor="footer-message">Options</Label></h5>
          <FormGroup check inline>
            <Input className="form-check-input" type="checkbox" id="printingvalue" onChange={this.printingvalue} value="protein" checked={printingvalue == "protein"} />
            <Label className="form-check-label" check htmlFor="printingvalue">Protein</Label>
          </FormGroup>
          <FormGroup check inline>
            <Input className="form-check-input" type="checkbox" id="printingvalue" onChange={this.printingvalue} value="water" checked={printingvalue == "water"} />
            <Label className="form-check-label" check htmlFor="printingvalue">Added Water %</Label>

        </FormGroup>
        </Col>

        </FormGroup>


        </CardBody>

        </Card>
        </Col>
        </Row>



        <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>&nbsp;&nbsp;
        <Button type="button" size="md" color="primary" onClick={()=>this.backbutton()}><i className="fa fa-dot-circle-o"></i> Cancel</Button>
  </Form>
        </Container>



     );
    }
}
export default TransactionSettings;
