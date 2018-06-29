import React, { Component, Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Layout,Tooltip,Icon,Button,Table,Radio,Modal,Checkbox,Input } from 'antd';
import { ChartCard, Field } from 'components/Charts';
import Trend from 'components/Trend';

import styles from './DeviceModal.less';

const Search = Input.Search;
export default class SelectPortModal extends PureComponent{

    render(){
        const {modalVisible,selectPortModal} = this.props;
        const okHandle = () =>{
            console.log('xx')
        }

        const columns = [{
            title:'设备名称',
            dataIndex:'name',
            key:'name'
        },{
            title:'端口',
            dataIndex:'port',
            key:'port'
        },{
            title:'型号',
            dataIndex:'type',
            key:'type'
        }]
        return(
            <Modal title="选择端口" width='70%'
            visible = {modalVisible}
            onOk = {okHandle}
            onCancel = {
                () => this.props.selectPortModal()
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
              <Checkbox onChange={this.onChange}>不显示0端口</Checkbox>
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