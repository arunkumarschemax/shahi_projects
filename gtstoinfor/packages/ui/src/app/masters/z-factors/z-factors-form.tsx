import { ZFactorReq } from '@project-management-system/shared-models';
import { BomService, ItemsService, ZFactoryService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Input, Radio, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import AlertMessages from '../../common/common-functions/alert-messages';
import { useNavigate } from 'react-router-dom';
import { ActionEnum } from 'packages/libs/shared-models/src/Enum/z-factors-Enum';


const ZFactors = () => {
  const [items,setItems] =useState<any[]>([]);
  const [imCode,setImCode]=useState<any[]>([]);
  const [style,setStyle]=useState<any[]>([]);
  const [geoCode,setGeoCode]=useState<any[]>([]);
  const [plantCode,setPlantCode]=useState<any[]>([]);
  const service1=new BomService();
  const service2= new ZFactoryService();
  const {Option} = Select
  const navigate=useNavigate();



  useEffect(() => {
    getAllItems();
    getImCode();
    getStyles();
    getGeoCode();
    getPlantCode();
},[])

const getPlantCode= () => {
  service2
    .getPlantCode().then((res) => {
      if (res.status) {
        setPlantCode(res.data);
      } else {
        setPlantCode([]);
      }
    })
  
};

const getGeoCode= () => {
  service2
    .getGeoCode().then((res) => {
      if (res.status) {
        setGeoCode(res.data);
      } else {
        setGeoCode([]);
      }
    })
  
};

const getImCode= () => {
  const req = new ZFactorReq()
  service2
    .getImCode(req).then((res) => {
      if (res.status) {
        setImCode(res.data);
      } else {
        setImCode([]);
      }
    })
  
};



  const getAllItems= () => {
    service2
      .getAllItems().then((res) => {
        if (res.status) {
          setItems(res.data);
        } else {
          setItems([]);
        }
      })
    
  };

  const getStyles= () => {
    service1
      .getStyle().then((res) => {
        if (res.status) {
          setStyle(res.data);
        } else {
          setStyle([]);
        }
      })
    
  };
    
  return (
    <div>
    <Card title={<span style={{fontWeight: "bold"}}>Z Factors</span>}
            extra={<span><Button type='primary' onClick={() => navigate('/bom/z-factors-view')}>View</Button></span>}>
       <Form layout='vertical'>
       <Row gutter={60}>
       <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="itemId" label="Items" >
                         <Select  placeholder='Select Item' style={{textAlign:"center"}}  showSearch >
                         {items.map((map) => (
                           <Option key={map.itemId} value={map.itemId}>{map.item}</Option>
                         ))}
                       </Select>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="actualIM" label="Im Code" >
                         <Select  placeholder='Select Style Number' style={{textAlign:"center"}}  showSearch >
                         {imCode.map((item) => (
                           <Option key={item.id} value={item.im_code}>{item.im_code}</Option>
                         ))}
                       </Select>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                <Form.Item label="Action" name="action"
                initialValue={ActionEnum.ADD}
                >
                <Select placeholder='Select Action' 
                defaultValue={ActionEnum.ADD}
                >
                  {Object.keys(ActionEnum).map(action => {
                    return <Select.Option value={ActionEnum[action]}>{ActionEnum[action]}</Select.Option>
                  })}
                </Select>
              </Form.Item>
              </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="geoCode" label="Geo Code" >
                    <Radio.Group
              // onChange={(e) => {
              //   setSelectedKeys([e.target.value.toString()]);
              // }}
            >
              <Radio
                style={{ marginRight: '11px', marginLeft: '20px' }}
                value={1}
              >
                Yes
              </Radio>
              <Radio value={0}>No</Radio>
            </Radio.Group>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="destination" label="Destination" >
                    <Radio.Group
              // onChange={(e) => {
              //   setSelectedKeys([e.target.value.toString()]);
              // }}
            >
              <Radio
                style={{ marginRight: '11px', marginLeft: '20px' }}
                value={1}
              >
                Yes
              </Radio>
              <Radio value={0}>No</Radio>
            </Radio.Group>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="size" label="Size" >
                    <Radio.Group
              // onChange={(e) => {
              //   setSelectedKeys([e.target.value.toString()]);
              // }}
            >
              <Radio
                style={{ marginRight: '11px', marginLeft: '20px' }}
                value={1}
              >
                Yes
              </Radio>
              <Radio value={0}>No</Radio>
            </Radio.Group>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="gender" label="Gender" >
                    <Radio.Group
              // onChange={(e) => {
              //   setSelectedKeys([e.target.value.toString()]);
              // }}
            >
              <Radio
                style={{ marginRight: '11px', marginLeft: '20px' }}
                value={1}
              >
                Yes
              </Radio>
              <Radio value={0}>No</Radio>
            </Radio.Group>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="plant" label="Plant code" >
                    <Radio.Group
              // onChange={(e) => {
              //   setSelectedKeys([e.target.value.toString()]);
              // }}
            >
              <Radio
                style={{ marginRight: '11px', marginLeft: '20px' }}
                value={1}
              >
                Yes
              </Radio>
              <Radio value={0}>No</Radio>
            </Radio.Group>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="style" label="Style" >
                    <Radio.Group
              // onChange={(e) => {
              //   setSelectedKeys([e.target.value.toString()]);
              // }}
            >
              <Radio
                style={{ marginRight: '11px', marginLeft: '20px' }}
                value={1}
              >
                Yes
              </Radio>
              <Radio value={0}>No</Radio>
            </Radio.Group>
                    </Form.Item>
                </Col>
       </Row>
       </Form>
      </Card>
      <Card>
      <Form layout='vertical'>
       <Row gutter={40}>
       <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="item" label="Items" >
                         <Input placeholder='Enter Item'/>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="imCode" label="Im Code" >
                    <Input placeholder='Enter ImCode'/>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="description" label="Description" >
                    <Input placeholder='Enter Description'/>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="geoCode" label="Geo Code" >
                    <Select  placeholder='Select Geo Code' style={{textAlign:"center"}}  showSearch >
                         {geoCode.map((map) => (
                           <Option key={map.destinationId} value={map.geoCode}>{map.geoCode}</Option>
                         ))}
                       </Select>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="destination" label="Destination" >
                    <Input placeholder='Enter Destination'/>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="size" label="Size" >
                    <Input placeholder='Enter Size'/>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="sequence" label="Sequence" >
                    <Input placeholder='Enter Sequence'/>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="gender" label="Gender" >
                   <Input placeholder='Enter Gender'/>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="plantCode" label="Plant code" >
                    <Select  placeholder='Select Plant Code' style={{textAlign:"center"}}  showSearch >
                         {plantCode.map((map) => (
                           <Option key={map.id} value={map.plant}>{map.plant}</Option>
                         ))}
                       </Select>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="style" label="Style" >
                    <Select  placeholder='Select Style Number' style={{textAlign:"center"}}  showSearch >
                         {style.map((item) => (
                           <Option key={item.id} value={item.style}>{item.style}</Option>
                         ))}
                       </Select>
                    </Form.Item>
                </Col>
       </Row>
       </Form>
      </Card>
    </div>
  )
}

export default ZFactors