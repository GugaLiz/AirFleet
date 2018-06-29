import React, { Component, Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Layout,Tooltip,Icon,Button,Table,Radio,Modal,Checkbox,Input } from 'antd';
import { ChartCard, Field } from 'components/Charts';
import Trend from 'components/Trend';

import styles from './DeviceModal.less';

export default class NavigationLayer extends PureComponent{

    render(){
        const columns = [{
            title:'图层名称',
            dataIndex:'layerName',
            key:'layerName'
        },{
            title:'',
            dataIndex:'statu',
            key:'statu'
        }];
        
        return(
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
              <Button icon="upload" size="small" style={{marginRight:'5px'}} onClick={this.deviceModal}>上传</Button>
              <Button icon="delete" size="small" style={{marginRight:'5px'}} onClick={this.deviceModal}>删除</Button>
              </Trend>      
            </ChartCard>
        )
    }
}