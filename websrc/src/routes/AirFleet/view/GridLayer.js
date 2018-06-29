import React, { Component, Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Layout,Tooltip,Icon,Button,Table,Radio,Modal,Checkbox,Input } from 'antd';

export default class GridLayer extends PureComponent{

    render(){
        const columns = [{
            title:'图层名称',
            dataIndex:'layerName',
            key:'layerName'
        },{
            title:'',
            dataIndex:'statu',
            key:'statu'
        }]
        return (
            <Table size="small"
             columns={columns}>
            </Table>
        )
    }
}