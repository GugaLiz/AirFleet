import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Layout,Tooltip,Icon,Button,Table,Radio } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from 'components/Charts';
import Trend from 'components/Trend';

//import styles from './Analysis.less';
import SelectPortModal from './SelectPortModal';
import SelectParamModal from './SelectParamModal';

const { Sider,Content } = Layout;

export default class MonitorPnl extends Component {
  state={
    selectPortModalVisible:false,
    selectParamModalVisible:false,
  }

  selectPortModal = (flag) => {
    this.setState({
      selectPortModalVisible:!!flag
    });
  }

  selectParamModal = (flag) => {
    this.setState({
      selectParamModalVisible:!!flag
    });
  }


    close = () => {
        this.props.paramPnl();
    }
    render(){
        const {paramPnlVisible,paramPnl} = this.props;
        const display = paramPnlVisible ? 'block' : 'none';
        const isDisplay = {display:display};
        const paginationProps = {
            // showSizeChanger: true,
            // showQuickJumper: true,
            showTotal:this.showTotal
          };

        const columns=[{
            title: '设备端口',
            dataIndex: 'port',
            key: 'port',
          },{
            title:'状态',
            dataIndex:'statu',
            key:'statu'
          }];

        return(
            <Content style = {isDisplay}>
            <ChartCard
          bordered={true}
          title="参数"
          action={            
            <Tooltip title="">
              <Icon type="close" onClick={this.close} />
            </Tooltip>
          }                    
            footer={<Table size="small"
              columns={columns}
              //pagination={paginationProps}
               />}
            contentHeight={35}
            >
            <Trend >
            <Button icon="laptop" size="small" style={{marginRight:'5px'}} onClick={this.selectPortModal}>选择端口</Button>
            <Button icon="smile-o" size="small" onClick={this.selectParamModal}>选择参数</Button>
          </Trend>            
          </ChartCard>
          <SelectPortModal
          modalVisible={this.state.selectPortModalVisible}
          selectPortModal={this.selectPortModal}
          />
          <SelectParamModal 
          modalVisible={this.state.selectParamModalVisible}
          selectParamModal={this.selectParamModal}
          />
          </Content>
        )
    }
}