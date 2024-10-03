import React, {Component} from 'react';
import {Tabs, TabList, Tab, PanelList, Panel} from 'react-tabtab';
const makeData = (number, titlePrefix = 'Tab') => {
  const data = [];
  for (let i = 0; i < number; i++) {
    data.push({
      title: `${titlePrefix} ${i}`,
      content:
        <div>
          Content {i}: Accusamus enim nisi itaque voluptas nesciunt repudiandae velit. <br/>
          Ad molestiae magni quidem saepe et quia voluptatibus minima. <br/>
          Omnis autem distinctio tempore. Qui omnis eum illum adipisci ab. <br/>
        </div>
    });
  }
  return data;
}
export default class modal extends Component {
  constructor(props) {
    super(props);
    const tabs = makeData(50);
    this.state = {
      tabs
    }
  }

  render() {
    const tabTemplate = [];
    const panelTemplate = [];
    this.state.tabs.forEach((tab, i) => {
      tabTemplate.push(<Tab key={i}>{tab.title}</Tab>);
      panelTemplate.push(<Panel key={i}>{tab.content}</Panel>);
    })
    return (
      <Tabs customStyle={this.props.customStyle}>
        <TabList>
          {tabTemplate}
        </TabList>
        <PanelList>
          {panelTemplate}
        </PanelList>
      </Tabs>
    )
  }
}
