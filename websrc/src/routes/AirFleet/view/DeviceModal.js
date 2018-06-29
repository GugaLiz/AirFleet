import React, { Component, Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Layout,Tooltip,Icon,Button,Table,Radio,Modal,Checkbox,Input } from 'antd';
import { ChartCard, Field } from 'components/Charts';
import Trend from 'components/Trend';

import styles from './DeviceModal.less';

const Search = Input.Search;
export default class DeviceModal extends PureComponent{

    render(){
        const {modalVisible} = this.props;
        const okHandle = () =>{
            console.log('xx')
        }

        const columns = [{
            title:'设备名称',
            dataIndex:'name',
            key:'name'
        },{
            title:'设备状态',
            dataIndex:'statu',
            key:'statu'
        },{
            title:'当前在线时长（小时）',
            dataIndex:'time',
            key:'time'
        },{
            title:'速度',
            dataIndex:'speed',
            key:'speed'
        },{
            title:'设备版本',
            dataIndex:'version',
            key:'version'
        }]
        return(
            <Modal title="选择设备" width='70%'
            visible = {modalVisible}
            onOk = {okHandle}
            onCancel = {
                () => this.props.deviceModal()
            }>
            <ChartCard
            bordered={false}
            //title="设备监控"                 
              footer={
                <Table size="small"
                columns={columns}
                //pagination={paginationProps}
                 />}
              contentHeight={16}
              >    
              <Trend>
              <Button icon="reload" size="small" style={{marginRight:'5px'}} onClick={this.deviceModal}>刷新</Button>
              <Checkbox onChange={this.onChange}>只显示在线</Checkbox>
              <Search
              size="small"
              label="查询："
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
              </Trend>      
            </ChartCard>
            </Modal>
        )
    }
}