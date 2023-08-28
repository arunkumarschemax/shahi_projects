import React, { useEffect, useState } from "react";
import { Steps, Divider, Select, Spin, message, Button, Input, Card, Form, Row, Col, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { EnvironmentOutlined, MinusCircleOutlined, PlusOutlined, UndoOutlined } from "@ant-design/icons";
import { Item } from "rc-menu";

export interface DocExtractFormprops{
    type : string;
    invoiceData:any[];
    file:any[];
   
  }

const DocExtractForm = (props:DocExtractFormprops) => {
    const navigate = useNavigate();
    const [form] = Form.useForm()

const data=[
    {
        name:'renu',
        age:'29'
    },
    {
        name:'mahi',
        age:'30'
    }
]

    useEffect(() =>{
        // props.type='Po'
        // console.log(props.type)
    },[])
    
    const formFields = data.map((item, index) => (
        <Row gutter={24}>
            <Col span ={24} >
            <Row gutter={24} >
                      <Col span={6} style={{width:'500px'}}>
                      <Form.Item name={'id'} style={{display:'none'}}>
                      <Input hidden />
                    </Form.Item>
                        <Form.Item label={<Space><span>Hsn Code</span></Space>} name={ 'hsCode'} 
                          rules={[
                            {
                              required: true,
                              message: 'Missing Hsn Code'
                            }
                          ]}>
                        <Input></Input>
                        </Form.Item>
                      </Col>
                        <Col span={6}>
                            <Form.Item  label="Description" name={'orders'}  rules={[
                            {
                                required: true,
                                message: 'Description Required',
                            },
                            ]}
                            >
                            <Input  />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Tax" name={'tax'}  rules={[
                            {
                                required: true,
                                message: 'Tax Required',
                            },
                            ]}
                            >
                                <Select>

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item label="Tax %" name={'taxPercentage'}  rules={[
                            {
                                required: true,
                                message: 'OrdeTax % Required',
                            },
                            ]}
                            >
                            <Input type="number"   />
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item label="Charges" name={'charges'}  rules={[
                            {
                                required: true,
                                message: 'charges Required',
                            },
                            ]}
                            >
                            <Input type="number"   />
                            </Form.Item>
                        </Col>
                    </Row>
            </Col>
        </Row>
    ));
  
    return (
        <Card className="card-header" title={<span style={{ color: "Black",}}>Invoice Details</span>} size="small">
       <Form form={form} layout='vertical'>
        <Row gutter={24}>
        <Col xs={24} sm={12} md={8} lg={6} xl={4} hidden={props.type == 'Po' ?true:false}>
            <Form.Item  name={'CustomerNo'} label='Customer Po' rules={[{required:true}]}>
                <Input>
                </Input>
            </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Form.Item  name={'Acknumber'} label='Ack No' rules={[{required:true}]}>
                <Input>
                </Input>
            </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Form.Item  name={'Pannumber'} label='PAN No' rules={[{required:true}]}>
                <Input>
                </Input>
            </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Form.Item  name={'Amountdue'} label='Due Amount' rules={[{required:true}]}>
                <Input>
                </Input>
            </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Form.Item  name={'Amountdue'} label='Due Amount' rules={[{required:true}]}>
                <Input>
                </Input>
            </Form.Item>
        </Col>
        </Row>
        <Card title=''>
        {formFields}
        <Row gutter={24}>
            <Col span={8}></Col>
            <Col span={8}></Col>
            <Col span={8}>
            <Form.Item >
            <Button type="primary" htmlType="submit" style={{ marginLeft: 50,background:"green"}}>
                  Submit
                </Button>
                <Button
                type="default" danger
                icon={<UndoOutlined />}
                  style={{marginLeft:30}}
                >
                  Reset
                </Button>
                </Form.Item>
            </Col>
        </Row>
        </Card>
       </Form>
        </Card>
      
    );
};


export default DocExtractForm;
