import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
  Tabs, Modal,Table
} from 'antd';
import styles from './AlarmEventForm.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane; 

export default class SelectParam extends PureComponent {

    render() {
        const {modalVisible,selectParamModal} = this.props;
        const okHandle = () =>{
            console.log('xx')
        }
        const columns = [{
            title:'参数名称',
            dataIndex:'paramName',
            key:'paramName'
        },{
            title:'阀值分段',
            dataIndex:'threholds',
            key:'threholds'
        }]
        return (
            <Modal width="70%"
            title="选择参数"
            visible = {modalVisible}
            onOk = {okHandle}
            onCancel = {
                () => this.props.selectParamModal()
            }
            >
            <Tabs type="card">
            <TabPane tab="Common" key="1">
            <Table size="small"
            columns={columns}>
            </Table>
            </TabPane>
            <TabPane tab="GSM" key="2">
            <Table size="small"
            columns={columns}>
            </Table>
            </TabPane>
            </Tabs>
            </Modal>
        )
    }
}