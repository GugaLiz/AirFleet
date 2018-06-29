import React, { PureComponent, Fragment } from 'react';
import { render } from 'react-dom';

import { connect } from 'dva';
import { Row, Col, Card, Tooltip, Menu, Dropdown, Icon, Button,Layout } from 'antd';

import styles from './Map.less';

import L from 'leaflet';
import { Map, TileLayer,Marker,Popup, GeoJSON,CircleMarker } from 'react-leaflet';

import "leaflet/dist/leaflet.css";

const {Content} = Layout;

//把图标重新引入
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.imagePath = ''
L.Icon.Default.mergeOptions({
  	iconRetinaUrl: require('../../../assets/markers/marker-icon-2x.png'),
 	  iconUrl: require('../../../assets/markers/marker-icon.png'),
  	shadowUrl: require('../../../assets/markers/marker-shadow.png')
})

//处理每一个marker的显示
const PopupMarker = ({ children,position }) => {
  const items = children.map((item) => (<span key={item.key}>{item.string}<br /></span>))
  
  return  <CircleMarker center={position} radius={8} color={'#000'} fillColor={'#ff7800'} opacity={1} fillOpacity={0.8} weight={1} /> 
  }
  //处理markerlist
  const MarkersList = ({markers}) => {
    const items = markers.map(({ key,...props}) => (
      <PopupMarker key={key} {...props} />   
    ))
    return <div>{items}</div>
  }

@connect(({ airfleet, loading }) => ({
  airfleet,
  loading: loading.models.airfleet,
}))
export default class MapPnl extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'airfleet/fetchMonitor',
    });
  }  

showMonitorPnl = () => {
  this.props.monitorPnl();
}


  render() {
    const { airfleet:{data}, monitorPnl,monitorPnlVisible,paramPnlVisible } = this.props;
    const display = monitorPnlVisible ? 'none' : 'block';
    const isDisplay = {display:display}; 
    const position = [22.7047, 113.302];
    const h = window.innerHeight;
    const height = paramPnlVisible ? 0.6*h : h;
    
    const style= { 
      width: '100%',
      height:height,
      //height: '600px',
      //height:'100%'
    }

    const style1 = {
      display:display,
      margin: '80px 0 0 13px',
      position:"absolute",
      zIndex: 19999,
    };
//模拟数据
const dataList = [];
for (let i = 0; i < 46; i += 1) {
  dataList.push({
    id: i,
    Province: '',
    Name: `site ${i}`,
    Lat: 22.7047 + `${i}`,
    Lng: 113.302 - `${i}`,
    currentValue: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 2,
    purchaseDate: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    create_time: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
    Province: Math.floor(Math.random() * 10) % 2 ? '省份1' : '省份2',
    City: Math.floor(Math.random() * 10) % 2 ? '城市1' : '城市2',
  });
}
 let cellPoints = [];

 dataList.map(item => {
   let lng = Number.parseFloat(item.Lng);
   let lat = Number.parseFloat(item.Lat);
   let name = item.Name;     
   let city = item.City || '';
   let district = item.District || '';
   let address = item.Address || '';
   let maintainer = item.Maintainer || '';
   let popupContent = [{key:city,string:`城市：${city}`},
   {key:name,string:`基站名称：${name}`},
   {key:lng,string:`经度：${lng}`},
   {key:lat,string:`纬度：${lat}`},
   {key:district,string:`地区：${district}`},
   {key:address,string:`地址：${address}`},
   {key:maintainer,string:`维护人员：${maintainer}`},
 ]
   cellPoints.push({key:name,position:[lat, lng],children:popupContent});
 });

    //const dataList = data.list;
   // console.log(dataList)
  //  const dataList = [];
  //  for (var i = 1; i < 46; i++) {
  //   const cell = { key:i,lng: 116.404 + (i * 0.001), lat: 39.915 - (i * 0.001) }
  //   dataList.push(cell)
  // }
  //   let cellPoints = [];
  //   dataList.map(item => {
  //     let key = Number.parseFloat(item.key);
  //     let lng = Number.parseFloat(item.Lng);
  //     let lat = Number.parseFloat(item.Lat);
     
  //     cellPoints.push({key:key,position:[lat, lng]});
  //   });
  const styleCir = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }

    return (
            <Content style={{height:'100%'}}>
            <div style={style1}>
            <Tooltip title="侧边栏">
            <Button size="small" onClick={this.showMonitorPnl}>
              <Icon type="switcher" />
            </Button>
            </Tooltip>
            </div>
              <Map center={position} zoom={13} style={style}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
               
              <MarkersList markers={cellPoints} />

                </Map>

            </Content>
    );
  }
}
