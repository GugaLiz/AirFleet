import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
  Tabs, Modal
} from 'antd';
import styles from './AlarmEventForm.less';

import GridLayer from './GridLayer';
import NavigationLayer from './NavigationLayer';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane; 

export default class Config extends PureComponent {

    render() {
        const {modalVisible,configModal} = this.props;
        const okHandle = () =>{
            console.log('xx')
        }
        return (
            <Modal width="70%"
            title="配置"
            visible = {modalVisible}
            onOk = {okHandle}
            onCancel = {
                () => this.props.configModal()
            }
            >
            <Tabs type="card">
            <TabPane tab="网格图层" key="1">
            <GridLayer />
            </TabPane>
            <TabPane tab="道路轨迹" key="2">
            <NavigationLayer />
            </TabPane>
            </Tabs>
            </Modal>
        )
    }
}