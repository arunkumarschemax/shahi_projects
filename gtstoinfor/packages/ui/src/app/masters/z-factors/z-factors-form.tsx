import { BomService, ItemsService } from '@project-management-system/shared-services';
import { Card, Col, Form, Input, Radio, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'

const ZFactors = () => {
  const [items,setItems] =useState<any[]>([]);
  const [imCode,setImCode]=useState<any[]>([]);
  const [style,setStyle]=useState<any[]>([]);
  const service1=new BomService();
  const service= new ItemsService();
  const {Option} = Select

  useEffect(() => {
    getAllItems();
    getImCode();
    getStyles();
},[])

const getImCode= () => {
  service1
    .getImcodes().then((res) => {
      if (res.status) {
        setImCode(res.data);
      } else {
        setImCode([]);
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

  const getAllItems= () => {
    service
      .getAllItems().then((res) => {
        if (res.status) {
          setItems(res.data);
        } else {
          setItems([]);
        }
      })
    
  };
    
  return (
    <div>
      <Card title={<span style={{fontWeight: "bold"}}>Z FACTORS</span>}>
       <Form layout='vertical'>
       <Row gutter={60}>
       <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="item" label="Items" >
                         <Select  placeholder='Select Item' style={{textAlign:"center"}}  showSearch >
                         {items.map((map) => (
                           <Option key={map.itemId} value={map.item}>{map.item}</Option>
                         ))}
                       </Select>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="imCode" label="Im Code" >
                         <Select  placeholder='Select Style Number' style={{textAlign:"center"}}  showSearch >
                         {imCode.map((item) => (
                           <Option key={item.id} value={item.imCode}>{item.imCode}</Option>
                         ))}
                       </Select>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="action" label="Action" >
                        
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
                    <Form.Item name="plantCode" label="Plant code" >
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
                         <Input placeholder='Select Item'/>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="imCode" label="Im Code" >
                    <Input placeholder='Select ImCode'/>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="description" label="Description" >
                    <Input placeholder='Select Description'/>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="geoCode" label="Geo Code" >
                    
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="destination" label="Destination" >
                    <Input placeholder='Select Destination'/>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="size" label="Size" >
                    <Input placeholder='Select Size'/>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="sequence" label="Sequence" >
                    <Input placeholder='Select Sequence'/>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="gender" label="Gender" >
                   <Input placeholder='Select Gender'/>
                    </Form.Item>
                </Col>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="plantCode" label="Plant code" >
                    
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