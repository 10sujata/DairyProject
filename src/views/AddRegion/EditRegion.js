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

class EditRegions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: '',
        };
        this.submitData = this.submitData.bind(this);
        this.inputregionname = this.inputregionname.bind(this);
      }

    componentDidMount() {
        const {id} = this.props.match.params;
        const _this = this;
        const userref =  firebaseConfig.database().ref(`/Regions/` + id);

        userref.on("value", snapshot => {
            let allUsers = snapshot.val();
            
            this.setState({
                region: allUsers.RegionName,
            });
       })

      }

    submitData(e) {
      e.preventDefault();
        const {id} = this.props.match.params;
      const { region } = this.state;
        e.preventDefault();
          firebaseConfig
          .database()
          .ref(`/Regions/`+id)
          .update({
            RegionName: region,
          })
          .then(() => this.setState({ redirect: true }));
    }



      inputregionname(e) {
        this.setState({region: e.target.value});
      }



    render() {

      const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/listregions" />;
    }
     return(

        <Container>
        <Row className="justify-content-center">
        <Col xs="12" sm="12">
        <Card>
        <CardHeader>
                <h2>Edit Region</h2>

        </CardHeader>
        <CardBody>
        <Form onSubmit={this.submitData}>
                <FormGroup>
                  <Col xs="6">
                  <FormGroup>
                  <h5><Label htmlFor="region">Region Name</Label></h5>
                  <Input type="text" id="region" onChange={this.inputregionname}  value={this.state.region} />
                </FormGroup>

                  </Col>
                </FormGroup>
                {/* <FormGroup>
                  <Label htmlFor="password">Update Password</Label>
                  <Input type="text" id="password" placeholder="Update Your Password" onChange={this.inputPassword}  value={this.state.password}/>
                </FormGroup> */}
                <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Update</Button>

                </Form>
        </CardBody>

        </Card>
        </Col>
        </Row>
        </Container>


     );
    }
}
export default EditRegions;
