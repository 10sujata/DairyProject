import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  FormGroup,
  Input,
  Container,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Form,  
  Label,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import Notifications, {notify} from 'react-notify-toast';
import TimePicker from 'react-time-picker';

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
  { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
  { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
  { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'New Clients',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Recurring Clients',
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'Pageviews',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Organic',
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: 'CTR',
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: 'Bounce Rate',
  },
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        backgroundColor: 'transparent',
        borderColor: variant ? variant : '#c2cfd6',
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class SuperDashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      smsvalue :"",
      language:"",
      farmerdays:"",
      morningstarttime:'',
      morningendtime:'',
      eveningstarttime:'',
      eveningendtime:'',
      dropdownOpen: false,
      radioSelected: 2,
    };
    this.submitData = this.submitData.bind(this);
    this.Update = this.Update.bind(this);
    this.SMSValue = this.SMSValue.bind(this);
    this.Language = this.Language.bind(this);
    this.FarmerDays = this.FarmerDays.bind(this);
    this.Bonus = this.Bonus.bind(this);
    this.MorningStartTime = this.MorningStartTime.bind(this);
    this.MorningEndTime = this.MorningEndTime.bind(this);
    this.EveningStartTime = this.EveningStartTime.bind(this);
    this.EveningEndTime = this.EveningEndTime.bind(this);
    
  }

  SMSValue(e) {
    this.setState({smsvalue: e.target.value});
  }

  Language(e) {
    this.setState({language: e.target.value});
  }

  FarmerDays(e) {
    this.setState({farmerdays: e.target.value});
  }

  Bonus(e) {
    this.setState({bonus: e.target.value});
  }

  MorningStartTime(e) {
    this.setState({morningstarttime: e.target.value});
  }

  MorningEndTime(e) {
    this.setState({morningendtime: e.target.value});
  }

  EveningStartTime(e) {
    this.setState({eveningstarttime: e.target.value});
  }

  EveningEndTime(e) {
    this.setState({eveningendtime: e.target.value});
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  componentDidMount() {
    let days = '';
    axios.get(API_BASE_URL+'/superadminlist')
    .then(response => {
      console.log("dairyresponse",response);
        this.setState({
          newdata:response.data.data[0].smsvalue, 
          smsvalue: response.data.data[0].smsvalue,
          language:response.data.data[0].language,
          bonus:response.data.data[0].bonus,
          farmerdays: response.data.data[0].farmerdays,
          morningstarttime: response.data.data[0].morningstarttime,
          morningendtime: response.data.data[0].morningendtime,
          eveningstarttime: response.data.data[0].eveningstarttime,
          eveningendtime: response.data.data[0].eveningendtime,        
          //centername: response.data.data[0].center_name,
        });
        days = response.data.data[0].farmerdays;

    })
    .catch(e => {

    });
      
    
  }

  submitData(e) {
    e.preventDefault();
    axios.post(API_BASE_URL+'/superadminsettings',{
     smsvalue: this.state.smsvalue,
     language:this.state.language,
     bonus:this.state.bonus,
     farmerdays: this.state.farmerdays,
     morningstarttime: this.state.morningstarttime,
     morningendtime: this.state.morningendtime,
     eveningstarttime: this.state.eveningstarttime,
     eveningendtime: this.state.eveningendtime,
    })
    .then(() => this.setState({      
      redirect: true,
    }));
    let myColor = { background: '#1985ac', text: "#FFFFFF", };
  notify.show('Settings Saved Successfully!','custom', 9000, myColor);

  }

  Update(e) {
    e.preventDefault();
    const {id} = 1;
    const isdeleted = this.state.isdeleted;
    axios.post(API_BASE_URL+'/updatesuperadmin/'+ 1,{
      smsvalue: this.state.smsvalue,
      language:this.state.language,
      bonus:this.state.bonus,
      farmerdays: this.state.farmerdays,
      morningstarttime: this.state.morningstarttime,
      morningendtime: this.state.morningendtime,
      eveningstarttime: this.state.eveningstarttime,
      eveningendtime: this.state.eveningendtime,
  })
  .then(response => {
    alert('Settings Updated Successfully!');


  });
}

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const {smsvalue,language} = this.state;

    return (
      <div className="animated fadeIn">
        <Form onSubmit={this.submitData}>
        <Row>
          <Col>
          <div className='main'>
              <Notifications options={{zIndex: 200, top: '120px'}} />
        </div>
            <Card>
            <CardBody>
        <div>
         <Row gutter={20}> 
         
         <Col lg="4">
                  <div className="date-area">
                        <div className="date-area-left">
                        <h5><Label htmlFor="chartname">SMS Enabled</Label></h5>
                    </div>
                    <div className="date-area-right">
                        <Label htmlFor="chartname">                       
                        </Label>
                        
                    </div>
                  </div>
              </Col>

              <Col lg="8">
                  <div className="date-area">
                    
                  <FormGroup check inline>
                      <Label className="form-check-label" check htmlFor="smsvalue">Collection</Label>&nbsp;&nbsp;                          
                      <Input className="form-check-input" type="radio" id="smsvalue" value="collection" onChange={this.SMSValue}  checked={smsvalue == "collection"} required/>                      
                  </FormGroup>
                  <FormGroup check inline>
                      <Label className="form-check-label" check htmlFor="smsvalue">Deduction</Label>&nbsp;&nbsp;                          
                      <Input className="form-check-input" type="radio" id="smsvalue"  value="deduction" onChange={this.SMSValue}  checked={smsvalue == "deduction"} required/>                          
                  </FormGroup>
                  <FormGroup check inline>
                      <Label className="form-check-label" check htmlFor="smsvalue">Product/Sale</Label>&nbsp;&nbsp;                          
                      <Input className="form-check-input" type="radio" id="smsvalue"  value="productsale" onChange={this.SMSValue}  checked={smsvalue == "productsale"} required/>                        
                  </FormGroup>
                        
                    
                  </div>
              </Col>
        </Row>    
        <Row gutter={20}> 
         <Col lg="4">
                  <div className="date-area">
                        <div className="date-area-left">
                        <h5><Label htmlFor="chartname">Regional Language</Label></h5>
                    </div>
                    <div className="date-area-right">
                        <Label htmlFor="chartname">                       
                        </Label>
                        
                    </div>
                  </div>
              </Col>

              <Col lg="8">
                  <div className="date-area">
                    
                  <FormGroup check inline>
                      <Label className="form-check-label" check htmlFor="language">Marathi</Label>&nbsp;&nbsp;                          
                      <Input className="form-check-input" type="radio" id="language" value="marathi" onChange={this.Language}  checked={language == "marathi"} required/>                      
                  </FormGroup>
                  <FormGroup check inline>
                      <Label className="form-check-label" check htmlFor="smsvalue">Gujarati</Label>&nbsp;&nbsp;                          
                      <Input className="form-check-input" type="radio" id="language"  value="gujarati" onChange={this.Language}  checked={language == "gujarati"} required/>                          
                  </FormGroup>
                  <FormGroup check inline>
                      <Label className="form-check-label" check htmlFor="language">Hindi</Label>&nbsp;&nbsp;                          
                      <Input className="form-check-input" type="radio" id="language"  value="hindi" onChange={this.Language}  checked={language == "hindi"} required/>                        
                  </FormGroup>
                        
                    
                  </div>
              </Col>
        </Row> 
        <Row gutter={20}> 
         <Col lg="7">
                  <div className="date-area">
                        <div className="date-area-left">
                        <h5><Label htmlFor="farmerdays">No of days farmers needs to be disabled</Label></h5>
                    </div>
                    <div className="date-area-right">
                    <FormGroup className="superdays">                    
                        <Input type="text" name ="farmerdays" id="farmerdays" value={this.state.farmerdays} onChange={this.FarmerDays}>
                        </Input>
                  </FormGroup> 
                        
                    </div>
                  </div>
              </Col>              
        </Row>  

        <Row gutter={20}> 
         <Col lg="7">
                  <div className="date-area">
                        <div className="date-area-left">
                        <h5><Label htmlFor="chartname">Bonus for number of days</Label></h5>
                    </div>
                    <div className="date-area-right">
                    <FormGroup className="superdays">                    
                        <Input type="text" name ="bonus" id="bonus" value={this.state.bonus} onChange={this.Bonus}>
                        </Input>
                  </FormGroup> 
                        
                    </div>
                  </div>
              </Col>              
        </Row>   
        <Row gutter={20}> 
         <Col lg="12">
                  <div className="date-area">
                        <div className="date-area-left">
                        <h5><Label htmlFor="chartname">Morning Shift</Label></h5>
                    </div>
                    <div className="date-area-right s1">
                    <Row gutter={20} className="superrow">
                        <Col lg="6">Start Time <br />
                        <Input type="time" name ="morningstarttime" id="morningstarttime" value={this.state.morningstarttime} onChange={this.MorningStartTime}>
                        </Input>                                                   
                        </Col>

                        <Col lg="6">End Time<br />
                        <Input type="time" name ="morningendtime" id="morningendtime" value={this.state.morningendtime} onChange={this.MorningEndTime}>
                        </Input>
                        
                        </Col>
                    </Row>
                        
                    </div>
                  </div>
              </Col>              
        </Row> 

        <Row gutter={20}> 
         <Col lg="12">
                  <div className="date-area">
                        <div className="date-area-left">
                        <h5><Label htmlFor="chartname">Evening Shift</Label></h5>
                    </div>
                    <div className="date-area-right s1">
                    <Row gutter={20} className="superrow">
                        <Col lg="6">Start Time <br />
                        <Input type="time" name ="eveningstarttime" id="eveningstarttime" value={this.state.eveningstarttime} onChange={this.EveningStartTime}>
                        </Input>
                        
                        </Col>

                        <Col lg="6">End Time<br />
                        <Input type="time" name ="eveningendtime" id="eveningendtime" value={this.state.eveningendtime} onChange={this.EveningEndTime}>
                        </Input>
                        
                        </Col>
                        
                    </Row>
                    
                    </div>
                  </div>
          </Col>              
        </Row> <br /><br />
        {this.state.newdata===undefined ?(
                    <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                  ):<Button type="button" size="md" color="primary" onClick={this.Update}><i className="fa fa-dot-circle-o"></i> Update</Button>}
        
        </div>
        </CardBody>
             
            </Card>
          </Col>
        </Row>
        
       </Form>
      </div>
    );
  }
}

export default SuperDashboard;
