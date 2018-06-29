import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Layout,Tooltip,Icon,Button,Table,Radio,Divider } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from 'components/Charts';
import Trend from 'components/Trend';

import DeviceModal from './DeviceModal';
import ConfigModal from './ConfigModal';

import styles from './MonitorPnl.less';

const { Sider,Content } = Layout;
@connect(({ airfleet, loading }) => ({
  airfleet,
  loading: loading.models.airfleet,
}))
export default class MonitorPnl extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'airfleet/fetchMonitor',
    });
  }

  state = {
    deviceModalVisible:false,
    configModalVisible:false,
  }

  close = () => {
    this.props.monitorPnl();
  }

  deviceModal = (flag) =>{
    this.setState({
      deviceModalVisible:!!flag
    });
  }

  configModal = (flag) => {
    this.setState({
      configModalVisible:!!flag
    });
  }

  paramPnl = (flag) =>{
    this.props.paramPnl();
    // this.setState({
    //   paramPnlVisible:!!flag
    // });
  }

  alarmEventForm = (flag) => {
    this.props.alarmEventForm();
  }

  detailPnl = () => {
    this.props.detailPnl(true);
  }

  getDevRec = (record) => {
    this.props.getDevRec(record);
  }

  countOnline = (data) => {
    var count = 0;
    for(var i=0;i<data.length;i++){
      var d = data[i].statu;
      if(d===1){
        count += 1;
      }
    }
    return count;
  }

  position= () => {
    console.log(1111)
  }

  remove = () =>{
    //console.log(key)
  }

    render(){
      const {airfleet:{data},loading,monitorPnl,monitorPnlVisible,detailPnlVisible} = this.props;
      const devictTotal = data.pagination.total;
      const deviceOnline = this.countOnline(data.list);
      //const { data } = airfleet;
      //console.log(deviceOnline)
      const display = monitorPnlVisible ? 'block' : 'none';
      const isDisplay = {display:display}; 
      const h = window.innerHeight;
      const height = detailPnlVisible ? 0.4*h : h;
     // console.log(height);
      const style= { 
        display:display,
        width: '100%',
        height:height,
        //height: '600px',
        //height:'100%'
      }

      const styleTable = {
        height:height-100
      }
        // const paginationProps = {
        //     showSizeChanger: true,
        //     showQuickJumper: true,
        //     showTotal:this.showTotal
        //   };

        const columns=[{
            title: '设备名称',
            dataIndex: 'deviceName',
            key: 'name',
            width:'108.67px'
          },{
            title:'状态',
            dataIndex:'statu',
            key:'statu',  
            width:'67.33px'  ,       
            render: val => {
              if(val===1)
              {
                return <Icon type="meh-o" />
              }
              return <Icon type="meh" />
            },
          },{
            title:'移除',
            dataIndex:'remove',
            key:'remove',
            width:'67.33px',
            render: (text, record, index) => 
            <a name="remove" onClick={() => this.remove(record)}><Icon type="minus-circle" /></a>
           
          },{
            title:'定位',
            dataIndex:'location',
            key:'location',
            width:'67.33px',
            render: (val, record, index) => {
              if(val===1)
              {
                return <a name="remove" onClick={() => this.position(record)}><Icon type="environment-o" /></a>              
              }
              return <a name="remove" onClick={() => this.position(record)}><Icon type="environment" /></a>
            },
          }];

        return(
          <Content style = {style}>
            <ChartCard
            style = {style}
          bordered={true}
          title="设备监控"
          action={            
            <Tooltip title="">
              <Icon type="setting" onClick={this.configModal} />
              <Icon type="close" onClick={this.close}/>
            </Tooltip>
          }                    
            footer={
              
              <Table size="small"
              bordered
              style={styleTable}
              scroll={{y:height-172}}
              footer={() => {
                return (<div>设备在线/总数：{deviceOnline}/{devictTotal}
                 </div>)
              }}
              columns={columns}
              dataSource={data.list}
              pagination={false}
              //style={tStyle}
              //pagination={paginationProps}
              onRow={(record) => {
                return {
                  onClick:() => {
                    console.log(record);
                    this.getDevRec(record);
                    this.detailPnl();

                  }
                }
              }}
               />}
            contentHeight={35}
            >
            <Trend >
            <Button icon="laptop" size="small" style={{marginRight:'5px'}} onClick={this.deviceModal}>设备</Button>
            <Button icon="smile-o" size="small" onClick={this.paramPnl}>参数</Button>
            <Button icon="meh-o" size="small" onClick={this.alarmEventForm}>事件</Button>            
            <Button icon="frown-o" size="small" onClick={this.alarmEventForm}>告警</Button>
          </Trend>            
          </ChartCard>
          <ConfigModal
          modalVisible={this.state.configModalVisible}
          configModal={this.configModal}
          />
          <DeviceModal 
          modalVisible={this.state.deviceModalVisible}
          deviceModal={this.deviceModal}
          />
          </Content>
        )
    }
}