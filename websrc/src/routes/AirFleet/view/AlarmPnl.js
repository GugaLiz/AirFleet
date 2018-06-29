import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Table, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
  Tabs, 
} from 'antd';
import styles from './AlarmEventForm.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane; 

@connect(({ loading }) => ({
}))
export default class AlarmPnl extends PureComponent {
  render() {
    const columns =[{
        title:'设备端口',
        dataIndex:'port',
        key:'port'
    },{
        title:'级别',
        dataIndex:'leval',
        key:'leval'
    },{
        title:'告警时间',
        dataIndex:'time',
        key:'time'
    },{
        title:'告警名称',
        dataIndex:'name',
        key:'name'
    }]
    
    return (
        <Table size="small"
        columns={columns} />
   
    );
  }
}
