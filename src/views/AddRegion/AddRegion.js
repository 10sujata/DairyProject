import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
import { directive } from '@babel/types';
import firebaseConfig from '../../config'
import { FormGroup,Badge,CardHeader,Label,FormText,Button, Card, CardBody, CardFooter, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { userInfo } from 'os';
import { Redirect } from 'react-router';
import{ListEngineers} from '../../../src/views/ListEngineers/ListEngineers';

class AddRegion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            regionname: '',
            redirect: false,
            isdeleted:'active',
            errors: {}
        };
        this.submitData = this.submitData.bind(this);
        this.inputregionname = this.inputregionname.bind(this);


      }

    componentDidMount() {
        firebaseConfig
          .database()
          .ref(`/Regions/`)
          .on('value', snap => console.log('from db', snap.val()));
      }

    submitData(e) {
      e.preventDefault();
      const { regionname,isdeleted} = this.state;

firebaseConfig.database().ref(`/Regions/`).orderByChild("RegionName").equalTo(regionname).once('value', snapshot => {
  if (snapshot.exists()) {
    let errors = {};
      errors["region"] = "Region already exists";
      this.setState({ errors: errors});
    }
    else {
      let errors = {};
      errors["region"] = "";
      this.setState({ errors: errors});
      firebaseConfig
      .database()
      .ref(`/Regions/`)
      .push({
        RegionName: regionname,
        Isdeleted: isdeleted,
      })

      .then(() => this.setState({ redirect: true }));
    }
    });

      }

      inputregionname(e) {
        let errors = {};
        errors["region"] = "";
        this.setState({ errors: errors});
        this.setState({regionname: e.target.value});
      }


//    createUI = () => {
//     return this.state.categorydec.map((el, i) =>
//         <div key={i}>
//           <FormGroup>
//           <Input type="text" id="categorydec"  placeholder="Enter Category Description" onChange={this.handleChange.bind(this, i)} value={el||''} />
//           </FormGroup>
//         </div>
//     )
//  }


    // createproductUI = () => {
    //     return this.state.productname.map((el, i) =>
    //         <div key={i}>
    //         <FormGroup>
    //         <Input type="text" id="productname"  placeholder="Enter Product Name" onChange={this.handleproductChange.bind(this, i)} value={el||''} />
    //         </FormGroup>
    //         </div>
    //     )
    // }


//  handleChange(i, event) {
//     let categorydec = [...this.state.categorydec];
//     categorydec[i] = event.target.value;
//     this.setState({ categorydec });
//  }

//  handleproductChange(i, event) {
//     let productname = [...this.state.productname];
//     productname[i] = event.target.value;
//     this.setState({ productname });
//  }

//  addClick(){
//     this.setState(prevState => ({ categorydec: [...prevState.categorydec, '']}))
//   }


//  addproductClick(){
//     this.setState(prevState => ({ productname: [...prevState.productname, '']}))
//   }



    render() {

      const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/listregions" />;
    }
     return(

        <Container>
        <Row className="justify-content-center">
        <Col xs="6" sm="6">
        <Card>
        <CardHeader>
                <h2>Add Region</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit={this.submitData}>
                <FormGroup>
                  <h5><Label htmlFor="regionname">Region Name</Label></h5>
                  <Input type="text" id="regionname" placeholder="Enter Region Name" onChange={this.inputregionname}  value={this.state.regionname} />
                  <span className="error">{this.state.errors["region"]}</span>
                </FormGroup>


                {/* <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="phone">Contact Number</Label>
                      <Input type="text" id="phone"  placeholder="Enter Your Contact Number" onChange={this.inputPhone}  value={this.state.phone}  />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="email">Email Address</Label>
                      <Input type="text" id="email"  placeholder="Enter Your Email Address" onChange={this.inputEmail}  value={this.state.email} />
                    </FormGroup>
                  </Col>
                </FormGroup> */}


                {/* <FormGroup>
                  <Input type="hidden" id="status" value={this.state.status}/>
                  <Input type="hidden" id="isdeleted" value={this.state.isdeleted}/>
                </FormGroup> */}

                <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>

                </Form>
        </CardBody>

        </Card>
        </Col>
        </Row>
        </Container>


     );
    }
}
export default AddRegion;
