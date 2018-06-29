import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
  Tabs, 
} from 'antd';
import styles from './AlarmEventForm.less';

import AlarmPnl from './AlarmPnl';
import EventPnl from './EventPnl';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane; 

@connect(({ loading }) => ({
}))
export default class AlarmEventForm extends PureComponent {
  close = () => {
    this.props.alarmEventForm();
  }
  
  render() {
    const {alarmEventFormVisible,alarmPnlVisible,eventPnlVisible} = this.props;
    const display = alarmEventFormVisible ? 'block' : 'none';
    const style = {
      display:display,
      padding:'0px'
    }
    const isDisplay = {display:display};
    const operations = <Button icon="close" size="small" onClick={this.close}/>;

    return (
      <Card style = {style}>
      <Tabs type="card" tabBarExtraContent={operations}>
        <TabPane tab={<span><Icon type="meh-o" />事件</span>}  key="1" >
        <EventPnl></EventPnl>
         
        </TabPane>

        <TabPane tab={<span><Icon type="frown-o" />告警</span>} key ="2">
        <AlarmPnl></AlarmPnl> 
        </TabPane>
      </Tabs>
      </Card>
    );
  }
}
