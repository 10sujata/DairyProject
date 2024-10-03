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

class AddCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryname: '',
            categorydec: [
                ''
            ],
            productname:[
                ''
            ],
            redirect: false,
            isdeleted:'active'
        };
        this.submitData = this.submitData.bind(this);
        this.inputCategoryname = this.inputCategoryname.bind(this);
        this.inputCategorydec = this.inputCategorydec.bind(this);
        this.inputProductname = this.inputProductname.bind(this);

      }

    componentDidMount() {
        firebaseConfig
          .database()
          .ref(`/Product Category/`)
          .on('value', snap => console.log('from db', snap.val()));
      }

    submitData(e) {
      const { categoryname,categorydec,productname,isdeleted} = this.state;
        e.preventDefault();
          firebaseConfig
          .database()
          .ref(`/Product Category/`)
          .push({
            CategoryName: categoryname,
            ProductDescription: categorydec,
            ProductName: productname,
            Isdeleted:isdeleted
          })
          .then(() => this.setState({ redirect: true }));
      }

      inputCategoryname(e) {
        this.setState({categoryname: e.target.value});
      }
      inputCategorydec(e) {
        this.setState({categorydec: e.target.value});
      }

      inputProductname(e) {
        this.setState({productname: e.target.value});
      }

   createUI = () => {
      return this.state.categorydec.map((el, i) =>
          <div key={i}>
            <FormGroup>
            <Input type="text" id="categorydec"  placeholder="Enter Category Description" onChange={this.handleChange.bind(this, i)} value={el||''} />
            <Button type="button" size="md" color="primary"> Delete </Button>
            </FormGroup>
          </div>
      )
  }


    createproductUI = () => {
        return this.state.productname.map((el, i) =>
            <div key={i}>
            <FormGroup>
            <Input type="text" id="productname"  placeholder="Enter Product Name" onChange={this.handleproductChange.bind(this, i)} value={el||''} />
            </FormGroup>
            </div>
        )
    }


 handleChange(i, event) {
    let categorydec = [...this.state.categorydec];
    categorydec[i] = event.target.value;
    this.setState({ categorydec });
 }

 handleproductChange(i, event) {
    let productname = [...this.state.productname];
    productname[i] = event.target.value;
    this.setState({ productname });
 }

 addClick(){
    this.setState(prevState => ({ categorydec: [...prevState.categorydec, '']}))
  }


 addproductClick(){
    this.setState(prevState => ({ productname: [...prevState.productname, '']}))
  }



    render() {

      const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/listcategory" />;
    }
     return(

        <Container>
        <Row className="justify-content-center">
        <Col xs="12" sm="12">
        <Card>
        <CardHeader>
                <h2>Add Product Category</h2>
        </CardHeader>
        <CardBody>
        <Form onSubmit={this.submitData}>
                <FormGroup>
                  <h5><Label htmlFor="categoryname">Category Name</Label></h5>
                  <Input type="text" id="categoryname" placeholder="Enter Category Name" onChange={this.inputCategoryname}  value={this.state.categoryname} />
                </FormGroup>
                <FormGroup>
                <h5><Label htmlFor="categorydec">Category Description</Label></h5>
                {/* <Input type="text" id="categorydec"  placeholder="Enter Category Description" onChange={this.inputCategorydec}/></FormGroup>   */}
                  {this.createUI()}
                <Button type="button" size="md" color="primary" onClick={this.addClick.bind(this)}> Add More Description </Button>
                </FormGroup>
                <FormGroup>
                  <h5><Label htmlFor="productname">Product Name</Label></h5>
                  {/* <Input type="text" id="productname" placeholder="Enter Product Name" onChange={this.inputProductname}  value={this.state.productname}/> */}
                  {this.createproductUI()}
                  <Button type="button" size="md" color="primary" onClick={this.addproductClick.bind(this)}> Add More Products </Button>
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

                <Button type="submit" size="md" color="danger"><i className="fa fa-dot-circle-o"></i> Submit</Button>

                </Form>
        </CardBody>

        </Card>
        </Col>
        </Row>
        </Container>


     );
    }
}
export default AddCategory;
