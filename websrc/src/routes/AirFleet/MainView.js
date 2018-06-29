import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Layout,Tooltip,Icon,Button,Table,Radio } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from 'components/Charts';
import Trend from 'components/Trend';
import MonitorPnl from './view/MonitorPnl';
import DetailPnl from './view/DetailPnl';
import AlarmEventForm from './view/AlarmEventForm';
import ParamPnl from './view/ParamPnl';
import MapPnl from './view/Map';
import styles from './MainView.less';

const { Sider,Content } = Layout;

export default class AirFleet extends Component {

  state = {
    paramPnlVisible:true,
    alarmEventFormVisible:false,
    alarmPnlVisible:false,
    eventPnlVisible:false,
    detailPnlVisible:false,
    //detailPnlVisible:true,
    monitorPnlVisible:true,
    detailData:[],
  };

  paramPnl = () =>{
    this.setState({
      paramPnlVisible:!this.state.paramPnlVisible
    });
  }

  alarmEventForm = () =>{
    this.setState({
      alarmEventFormVisible:!this.state.alarmEventFormVisible
    });
  }

  alarmPnl = () => {
    this.setState({
      alarmPnlVisible:!this.state.alarmPnlVisible
    });
  }

  eventPnl = () => {
    this.setState({
      eventPnlVisible:!eventPnlVisible
    });
  }

  detailPnl = (bool) => {
    this.setState({
      detailPnlVisible:bool
    });
  }

  getDevRec = (rec) => {
    this.setState({
      detailData:rec
    });
  }

  monitorPnl = () => {
    this.setState({
      monitorPnlVisible:!this.state.monitorPnlVisible,
      detailPnlVisible:false
    });
  }
 
  render() {
    const parentMethods = {
      paramPnlVisible:this.state.paramPnlVisible,
      alarmEventFormVisible:this.state.alarmEventFormVisible,
      alarmPnlVisible:this.state.alarmPnlVisible,
      eventPnlVisible:this.state.eventPnlVisible,
      detailPnlVisible:this.state.detailPnlVisible,
      detailData:this.state.detailData,
      monitorPnlVisible:this.state.monitorPnlVisible,
      paramPnl:this.paramPnl,
      alarmEventForm:this.alarmEventForm,
      alarmPnl:this.alarmPnl,
      eventPnl:this.eventPnl,
      detailPnl:this.detailPnl,
      getDevRec:this.getDevRec,
      monitorPnl:this.monitorPnl
    }

    //const width
    return (
      <Layout >

        <Sider width='380px'
        style={{background:'#f0f2f5',height:'100%',flexDirection:'cloumn'}}
        collapsible
        collapsed={!this.state.monitorPnlVisible}
        collapsedWidth="0">
       
        <MonitorPnl style={{flex:1,overflow:'hidden'}} {...parentMethods}/>

        <DetailPnl style={{flex:1}} {...parentMethods}/>

        </Sider>

          <Content style={{background:'#3ba0e9',height:'100%'}}>
            <MapPnl style={{flex:2}} {...parentMethods} />
            <ParamPnl style={{flex:1}} {...parentMethods} />
          </Content>
          
  
        <Sider width='380px' style={{height:'100%'}}
        collapsible
        collapsed={!this.state.alarmEventFormVisible}
        collapsedWidth="0"
        >
          <AlarmEventForm {...parentMethods}/>
        </Sider>
      </Layout>
    );
  }
}
