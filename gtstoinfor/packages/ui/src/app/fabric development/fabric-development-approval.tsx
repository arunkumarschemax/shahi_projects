import { UndoOutlined, UploadOutlined } from '@ant-design/icons';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Col, Form, Input, Row, Select, Space, Upload } from 'antd'
import React from 'react'
import FabricDevelopmentRequestQuality from './fabric-development-quality-request';
import FabricDevelopmentTabs from './fabric-development-tabs';

export const  FabricDevelopmentApproval = () => {
  const [form] = Form.useForm();

  const onReset = () =>{
    form.resetFields()
  }
    
  const onFinish = (values) =>{
    console.log(values,"values")

  }
  return (
   
   <Card size= "small" title = "Fabric Development " >
    <Form
          form={form}
          style={{ fontSize: "10px" }}
          layout="vertical"
          onFinish={onFinish}
        >
    <Card >
    <Row gutter={12} >
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4}}
                    xl={{ span: 4 }}
                  >
                    <Form.Item
                      label="Location"
                      name="location"
                      rules={[{ required: true, message: "Enter Trim Code" }]}
                    >
                      <Input placeholder="Location" allowClear/>
                    </Form.Item>
                  </Col>
              
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4 }}
                    xl={{ span: 4 }}
                  >
                    <Form.Item label="Request No" name="Requestno">
                      <Input placeholder="Request No" allowClear/>
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4 }}
                    xl={{ span: 4 }}
                  >
                    <Form.Item label="User" name="user">
                      <Input placeholder="User" allowClear/>
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4 }}
                    xl={{ span: 4 }}
                  >
                    <Form.Item label="PCH" name="pch"
                    rules={[{ required: true, message: "Enter Trim Code" }]}

                    >
                    <Select placeholder="PCH"></Select>
                    </Form.Item>
                  </Col>

                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4 }}
                    xl={{ span: 4 }}
                  >
                    <Form.Item label="Buyer" name="buyer"
                      rules={[{ required: true, message: "Enter Trim Code" }]}

                    >
                    <Select placeholder="Buyer"></Select>
                    </Form.Item>
                  </Col>
                  
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4 }}
                    xl={{ span: 4 }}
                    >
                    <Form.Item label="Light Source " name="lightsource">
                        <Space direction="horizontal">
                        <Select placeholder="primary" style={{width:60}} />
                        <Select placeholder="secondary" style={{width:60}} />
                        <Select placeholder="tertiary"style={{width:60}} />
                        </Space>
                    </Form.Item>
                    </Col>

                    <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4 }}
                    xl={{ span: 4 }}
                  >
                    <Form.Item label="Type" name="type"
                    rules={[{ required: true, message: "Enter Trim Code" }]}
                    
                    >
                    <Select placeholder="Sample Type"></Select>
                    </Form.Item>
                  </Col>

                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4 }}
                    xl={{ span: 4 }}
                  >
                    <Form.Item label="Fabric Responsible" name="fabricresponsible"
                      rules={[{ required: true, message: "Enter Trim Code" }]}

                    >
                    <Select placeholder="Fabric Responsible"></Select>
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 4 }}
                    lg={{ span: 4 }}
                    xl={{ span: 4 }}
                  >
                    <Form.Item label="Remarks" name="remarks" >
                    <Input.TextArea placeholder='Remarks'  rows={1}/>
                    </Form.Item>
                  </Col>
                
                </Row>
                <Row gutter={24} justify="space-around" style={{marginLeft:350}} >
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
              <Form.Item>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button type="primary"style= {{ marginLeft: 10 }}>Back</Button>

                  <Upload>
                    <Button icon={<UploadOutlined />} style={{ marginLeft: 10 }}>
                      Attached File
                    </Button>
                  </Upload>

                  <Button type="primary" style={{ marginLeft: 10 }}>Link another CRM</Button>

                  <Button
                    type="primary"
                    htmlType="submit"
                    className="ant-submit-btn"
                    style={{ marginLeft: 10}}
                  >
                    Submit
                  </Button>
                  <Button
                    type="default"
                    danger
                    icon={<UndoOutlined />}
                    onClick={onReset}
                    style={{ marginLeft: 10 }}
                  >
                    Reset
                  </Button>
                </div>
              </Form.Item>
            </Col>
          </Row>
    </Card>
    <Card>
      < FabricDevelopmentTabs key='1' />
    </Card>
    </Form>
   </Card>
   
  )
}

export default FabricDevelopmentApproval