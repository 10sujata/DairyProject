import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
import { directive } from '@babel/types';
import firebaseConfig from '../../config'
import { PaginationLink,PaginationItem,Table,Pagination,FormGroup,Badge,CardHeader,Label,FormText,Button, Card, CardBody, CardFooter, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { userInfo } from 'os';
import { Redirect } from 'react-router';
import{ListEngineers} from '../../../src/views/ListEngineers/ListEngineers';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import '@firebase/storage';



class Customers extends Component {
    
  constructor(props) {
      
    super(props);
    this.state = {
        CallsToAttend: [],
    };
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange(id) {
    let path = `/callattend/`+id;
    this.props.history.push(path);
  }


componentDidMount() {
  const userref =  firebaseConfig.database().ref(`/Calls Generated/`);

      userref.on("value", snapshot =>{
        let allUsers = snapshot.val();
        console.log("get all users in a list",allUsers);
        let newState = [];

        for(let user in allUsers){
         
          newState.push({
            id: user,
            customer_name: allUsers[user].customer_name,
            customer_city: allUsers[user].customer_city,
            customer_state: allUsers[user].customer_state,
            customer_region: allUsers[user].region_of_service_engineer,
            //call_assigned_to:allUsers[user].call_assigned_to,
            call_assigned_date:allUsers[user].call_log_date,
            call_assigned_by: allUsers[user].call_assigned_by,
            product_category: allUsers[user].product_category,
            product_serial_no: allUsers[user].productserialno,
            nature_of_complaint: allUsers[user].natureofcomplaint,
            details_of_complaint: allUsers[user].detailsofcomplaint,
            invoice_no: allUsers[user].invoiceno,
            call_attended_date: allUsers[user].callattendingdate,
            
          });
        }
  
        this.setState({
          CallsToAttend: newState
        });
  
              
      })
}

// approveEngineer = (id) => {
  
//   firebaseConfig.database().ref(`/Users/`+id).update({Status: 'Approved'});
//   this.setState({ title: "Approve" });

// }


// disapproveEngineer = (id) => {
  
//   firebaseConfig.database().ref(`/Users/`+id).update({Status: 'Rejected'});

// }


// deleteEngineer = (id) => {
  
//   firebaseConfig.database().ref(`/Users/`+id).update({Isdeleted: 'inactive'});

// }


exportCsv(){
  var csvRow = [];
  var newarray = [['id','customer_name','customer_state','call_assigned_to']];
  var re = this.state.CallsToAttend;
  for(var item=0;item<re.length;item++){
    newarray.push([item,re[item].customer_name,re[item].customer_state,re[item].call_assigned_to]);
  }
  

  for(var i =0; i<newarray.length;++i){
    csvRow.push(newarray[i].join(","));
  }
  
  //console.log("nfsdsdjk",csvRow);
//   this.state.allUsers.map(item =>
//     newarray.push({ id: item.id, Name: item.Name,Email: item.Email,Region: item.Region,Address: item.Name }),
// );

//   newarray.map(item =>
//    csvRow.push(newarray.join(" , ")),
// );
  
  var csvstring = csvRow.join("%0A");
  var a = document.createElement("a");
  a.href = 'data:attachment/csv,' + csvstring;
  a.target = "_Blank";
  a.download = "testfile.csv";
  document.body.appendChild(a);
  a.click();
  
  //console.log("njkbnjk",csvstring);
  
}

render() {
  
 return(
    
    <Row className="justify-content-center">
    <Col xl="24" sm="24">
    <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> Call To Attend &nbsp;
            <Button onClick={()=>{this.exportCsv()}}>Export As CSV</Button>
            
          </CardHeader>
          <CardBody>
            <Table responsive bordered>
              <thead>
              <tr>
                <th>Customer Names</th>
                <th>Customer City</th>
                <th>Customer State</th>
                <th>Customer Region</th>
                <th>Call Assigned Date</th>
                <th>Call Logged by (Service Engineer)</th>
                <th>Product Category</th> 
                {/* <th>Product Serial No</th>
                <th>Nature Of Complaint</th>
                <th>Details Of Complaint</th>
                <th>Invoice No</th>
                <th>Call Attended Date</th> */}
              </tr>
              </thead>
            <tbody>
            {this.state.CallsToAttend ? this.state.CallsToAttend.map((partners) => (
              <tr key={partners.id}>
                  <td>
                      {partners.customer_name}
                  </td>
                  <td>
                  {partners.customer_city}
                  </td>
                  <td>
                  {partners.customer_state}
                  </td>
                  <td>
                  {partners.customer_region}
                  </td>
                  <td>
                  {partners.call_assigned_date}
                  </td>
                  <td>
                  {partners.call_assigned_by}
                  </td>
                  <td>
                  {partners.product_category}
                  </td>
                  {/* <td>
                  {partners.product_serial_no}
                  </td> */}
                  {/* <td>
                  {partners.nature_of_complaint}
                  </td>
                  <td>
                  {partners.details_of_complaint}
                  </td>
                  <td>
                    {partners.invoice_no}
                  </td>
                  <td>
                    {partners.callattendingdate}
                  </td> */}
                  
              </tr>
             )):''}
           </tbody>
            </Table>
            <Pagination>
              <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
              <PaginationItem active>
                <PaginationLink tag="button">1</PaginationLink>
              </PaginationItem>
              <PaginationItem className="page-item"><PaginationLink tag="button">2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
            </Pagination>
          </CardBody>
        </Card>
    </Col>
    </Row>
          
 );
}
    
    
}
export default Customers;