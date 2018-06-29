import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Layout,Tooltip,Icon,Button,Table,Radio,Form,Input,Row,Col,Checkbox,InputNumber,Card } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from 'components/Charts';
import Trend from 'components/Trend';

import styles from './DetailPnl.less';
import { Meta } from 'antd/lib/list/Item';

const { Sider,Content } = Layout;
const FormItem = Form.Item;

@connect(({ loading }) => ({
    //submitting: loading.effects['form/submitRegularForm'],
  }))
  @Form.create()
export default class MonitorPnl extends Component {
    constructor(props) {
        super(props);
    }

    onChange = (e) => {
      console.log(`checked=${e.target.checked}`);
    }

    close = () => {
        this.props.detailPnl(false);
    }

    render(){
        const {detailPnl,detailPnlVisible,detailData} = this.props;
        const height = window.innerHeight * 0.6;
        const display = detailPnlVisible ? 'block' : 'none';
        const isDisplay = {display:display};
        const { getFieldDecorator } = this.props.form; 
        
        const data = [detailData];

        const detailColumns=[{
            title:'端口',
            dataIndex:'port',
            key:'port',
            width:'71px'
          },{
            title:'',
            dataIndex:'isCheck',
            key:'radio',
            width:'27px',
            render:val => {
                if(val === 1){
                    <Radio style={{width:'2px'}} value={1}></Radio>
                }
                return <Radio style={{width:'2px'}}></Radio>
            }
          },{
            title:'参数值1',
            dataIndex:'param1',
            key:'param1',
            width:'107px',
          },{
            title:'参数值2',
            dataIndex:'param2',
            key:'param2',
            width:'107px'
          }]

         // const tStyle = {height:'30vh'}

         const formItemLayout = { 
          margin:0,     
          labelCol: {
              xs: { span: 8 },
          },
          wrapperCol: {
              xs: { span: 16 },
          },
      };

      const formItemLayout1 = {
          width:'100%'
      };

      const inputNumStyle={
        width:'50%'
      }

      const styleCol = {
        paddingLeft:'3px',
        paddingRight:'3px'
      }

      const styleCard = {
          display:display,
          height:height,
          overflow:'hidden'
      }

      const styleTable = {
          height:height-277,
          padding:'0px'
      }
        return(
            <ChartCard
            style = {styleCard}
            bordered={true}
            title="设备详情"
            action={            
                <Tooltip title="">
                <Icon type="close" onClick={this.close}/>
                </Tooltip>
            }                    
            footer={<Table size="small"
              bordered
              scroll={{y:height-200}}
              style={styleTable}
              columns={detailColumns}
              dataSource={data}
              pagination={false}
              />}
            contentHeight={200}
            >
            <div >
            <Row gutter={24} >
            <Col span={14} style={styleCol}>
            
            <FormItem {...formItemLayout}
            label = "设备ID："> {
                getFieldDecorator('id',{
                    initialValue:''
                })(<Input size="small" />
            )
            }
            </FormItem>
            </Col>
            <Col span={9} style={styleCol}>
            <FormItem {...formItemLayout}
            label = ""> {
                getFieldDecorator('gz',{
                })(<Checkbox onChange={this.onChange}>跟踪</Checkbox>
            )
            }
            </FormItem>
            </Col>
            </Row>

            <Row gutter={24}>
            <Col span={14} style={styleCol}>
            <FormItem {...formItemLayout}
            label = "设备名称："> {
                getFieldDecorator('name',{
                    initialValue:''
                })(<Input size="small" />
            )
            }
            </FormItem>
            </Col>
            <Col span={9} style={styleCol}>
            <FormItem {...formItemLayout}
            label = "类型"> {
                getFieldDecorator('type',{
                })(<Icon type="download" />
            )
            }
            </FormItem>
            </Col>
            </Row>

            <Row gutter={24}>
            <Col span={14} style={styleCol}>
            <FormItem {...formItemLayout}
            label = "版本："> {
                getFieldDecorator('version',{
                    initialValue:''
                })(<Input  size="small"  />
            )
            }
            </FormItem>
            </Col>
            <Col span={10} style={styleCol}>
            <FormItem {...formItemLayout}
            label = "端口数："> {
                getFieldDecorator('portNum',{
                })(<InputNumber  size="small" style={inputNumStyle}/>
            )
            }
            </FormItem>
            </Col>
            </Row>
            <div className={styles.deviceStatu}>
            <span><p style={{color:'rgba(0,0,0,0.45)',marginTop:'5px',height:'10px'}}>设备状态</p></span>
            <Row gutter={24}>
            <Col span={12} style={styleCol}>
            <FormItem {...formItemLayout}
            label = "状态："> {
                getFieldDecorator('statu',{
                    initialValue:''
                })(<Icon type="meh" />
            )
            }
            </FormItem>
            </Col>
            <Col span={12} style={styleCol}>
            <FormItem {...formItemLayout}
            label = "在线时长"> {
                getFieldDecorator('time',{
                })(<InputNumber  size="small" style={formItemLayout1}/>
            )
            }
            </FormItem>
            </Col>
            </Row>

            <Row gutter={24}>
            <Col span={12} style={styleCol}>
            <FormItem {...formItemLayout}
            label = "距离"> {
                getFieldDecorator('distance',{
                    initialValue:''
                })(<InputNumber  size="small" style={formItemLayout1}/>
            )
            }
            </FormItem>
            </Col>
            <Col span={12} style={styleCol}>
            <FormItem {...formItemLayout}
            label = "速度"> {
                getFieldDecorator('speed',{
                })(<InputNumber  size="small" style={formItemLayout1}/>
            )
            }
            </FormItem>
            </Col>
            </Row>

            <Row gutter={24}>
            <Col span={12} style={styleCol}>
            <FormItem {...formItemLayout}
            label = "经度"> {
                getFieldDecorator('lat',{
                    initialValue:''
                })(<InputNumber  size="small" style={formItemLayout1}/>
            )
            }
            </FormItem>
            </Col>
            <Col span={12} style={styleCol}>
            <FormItem {...formItemLayout}
            label = "纬度："> {
                getFieldDecorator('lng',{
                })(<InputNumber  size="small" style={formItemLayout1}/>
            )
            }
            </FormItem>
            </Col>
            </Row>
            </div>
            </div>
          </ChartCard>
        )
    }
}