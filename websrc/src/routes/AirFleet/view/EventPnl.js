import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Table, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
  Tabs
} from 'antd';
import { ChartCard, Field } from 'components/Charts';
import Trend from 'components/Trend';
import styles from './AlarmEventForm.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane; 
const RadioGroup = Radio.Group;

@connect(({ loading }) => ({
}))
export default class EventPnl extends PureComponent {
    state = {
        value:1
    }

    onChange = (e) => {
        this.setState({
            value:e.target.value
        });
    }
  render() {

    const columns =[{
        title:'设备端口',
        dataIndex:'port',
        key:'port'
    },{
        title:'事件时间',
        dataIndex:'time',
        key:'time'
    },{
        title:'事件名称',
        dataIndex:'name',
        key:'name'
    }]
    return (
        <ChartCard

        bordered={false}                          
            footer={
                <Table size="small"
                columns={columns} />}
            contentHeight={6}
            >
            <Trend >
            <RadioGroup onChange={this.onChange} defaultValue={this.state.value}>
            <Radio value={1}>实时事件</Radio>
            <Radio value={2}>解码事件</Radio>
            </RadioGroup>
          </Trend>            
          </ChartCard>
    );
  }
}
