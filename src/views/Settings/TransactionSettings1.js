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



class TransactionSettings1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
          ratechart1:[],
          ratechart2:[],
            allrmcu: [],
            rmcuname: '',
            centername: '',
            scale:'',
            analyzer: '',
            cowmorning: '',
            buffelomorning:'',
            cowevening:'',
            buffeloevening:'',
            printingvalue:'',
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
        this.settingvalue = this.settingvalue.bind(this);
        this.HeaderMessage = this.HeaderMessage.bind(this);
        this.FooterMessage = this.FooterMessage.bind(this);
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
                  this.setState({
                    centernamenew: response.data.data,
                 });
          })
        }


        //let id = `/editdevice/`+id;
      }


      CenterName(e){
        this.setState({centername: e.target.value});
      }

      scale(e) {
        this.setState({scale: e.target.value});
      }

      analyzer(e) {
        this.setState({analyzer: e.target.value});
      }

      cowmorning(e) {
        this.setState({cowmorning: e.target.value});
      }
      buffelomorning(e){
        this.setState({buffelomorning: e.target.value});
      }

      cowevening(e){
        this.setState({cowevening: e.target.value});
      }

      buffeloevening(e){
        this.setState({buffeloevening: e.target.value});
      }

      printingvalue(e) {
        this.setState({printingvalue: e.target.value});
      }

      settingvalue(e){
        console.log("this is selected",e.target.value);
        this.setState({settingvalue: e.target.value});
      }

      HeaderMessage(e){
        this.setState({headermessage: e.target.value});
      }

      FooterMessage(e){
        this.setState({footermessage: e.target.value});
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
     }

     submitData(e) {
       e.preventDefault();
         const {headermessage,footermessage,settingvalue,rmcuname,centername,scale,analyzer,cowmorning,buffelomorning,cowevening,buffeloevening,printingvalue,isdeleted} = this.state;
       axios.post(API_BASE_URL+'/settingsform',{
        rmcuname,
        centername,
        scale,
        analyzer,
        cowmorning,
        buffelomorning,
        cowevening,
        buffeloevening,
        printingvalue,
        headermessage,
        footermessage,
        settingvalue,
        isdeleted
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
        settingvalue:'',
        headermessage:'',
        footermessage:'',
        isdeleted:'',
      })

     }

    render() {
        const {allrmcu,centernamenew,ratechart1,ratechart2,printingvalue,settingvalue} = this.state;

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
     return(

        <Container>
          <Form onSubmit={this.submitData}>
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
              <Label className="form-check-label" htmlFor="rmcuname">Select RMCU Center<span>*</span></Label>
            </FormGroup>
          </Col>
          <Col md="8">
          {this.state.settingvalue=="common" ? (
            <Input type="select" name ="select" id="rmcunameid" value={this.state.rmcuname}>
              <option value="all" >All</option>

            </Input>):(<Input type="select" name ="select" id="rmcunameid" onChange={this.inputRMCU} value={this.state.rmcuname}>

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
           {this.state.settingvalue=="common" ?(
             <Input type="select" name ="select" id="centername" value={this.state.centername}>
                <option value="all" >All</option>
             </Input>
           ):(
             <Input type="select" name ="select" id="centername" onChange={this.CenterName} value={this.state.centername}>
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
          <Input type="select" id="analyzer" onChange={this.analyzer} value={this.state.analyzer}>
          <option value="manual">Manual</option>
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
        <Col xs="12" sm="12" align="center" >
        <Card>
        <CardHeader>
                <h4 align="center">Rate Chart Settings</h4><br/>
         <FormGroup row className="my-0 new-row1">
         <Col xs="12" align="center">
            <FormGroup row>

               <FormGroup className="s1new">
                 <h7 align="center">SNF</h7>=CLR/4+
               </FormGroup>


               <FormGroup className="s2new">
                <Input class="input1" type="text" id="username3" value="0.21" required/>
               </FormGroup>


               <FormGroup className="s2new">
                *FAT+
               </FormGroup>


               <FormGroup className="s2new">
                <Input class="input1" type="text" id="username3" value="0.36" required/>
               </FormGroup>

            </FormGroup>
         </Col>
         </FormGroup>

        </CardHeader>
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

            {rmcuList1}
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

            {rmcuList2}
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
          <Input type="text" id="header-message" placeholder="Please Enter Header Message" onChange={this.HeaderMessage} value={this.state.headermessage}/>
        </FormGroup>

        <FormGroup>
          <h5><Label htmlFor="footer-message">Footer Message</Label></h5>
          <Input type="text" id="footer-message" placeholder="Please Enter Footer Message" onChange={this.FooterMessage} value={this.state.footermessage}/>
        </FormGroup>
        <h5><Label htmlFor="footer-message">Options</Label></h5>
          <FormGroup check inline>
            <Input className="form-check-input" type="checkbox" id="printingvalue" onChange={this.printingvalue} value="protein" checked={printingvalue == "protein"} />
            <Label className="form-check-label" check htmlFor="printingvalue">Protein</Label>
          </FormGroup>
          <FormGroup check inline>
            <Input className="form-check-input" type="checkbox" id="printingvalue" onChange={this.printingvalue} value="water" checked={printingvalue == "water"} />
            <Label className="form-check-label" check htmlFor="printingvalue">Water</Label>

        </FormGroup>
        </Col>

        </FormGroup>


        </CardBody>

        </Card>
        </Col>
        </Row>



        <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>&nbsp;&nbsp;
  </Form>
        </Container>



     );
    }
}
export default TransactionSettings1;
