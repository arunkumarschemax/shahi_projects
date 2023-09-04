import React, { useEffect, useState } from "react";
import { Steps, Divider, Select, Spin, message, Button, Input, Card, Form, Row, Col, Space, Tooltip, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined, EnvironmentOutlined, MinusCircleOutlined, PlusOutlined, UndoOutlined } from "@ant-design/icons";
import { Item } from "rc-menu";
import Table, { ColumnProps } from "antd/es/table";

export interface DocExtractFormprops{
    type : string;
    invoiceData:any[];
    file:any[];
   
  }

const DocExtractForm1 = (props:DocExtractFormprops) => {
    const navigate = useNavigate();
    const [form] = Form.useForm()
    const [itemsForm] = Form.useForm()
    const [itemData, setItemData] = useState<any[]>([]);
    const [formVisible, setFormVisible]=useState<boolean>(false)


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

const StaticData =()=>{
    setItemData([
        {
            "hsnCode": 901,
            "description": "BAP",
            "tax": "IGST",
            "taxPercentage":"8",
            "charges":"100",
        },
        {
            "hsnCode": 5671,
            "description": "BAP",
            "tax": "IGST",
            "taxPercentage":"8",
            "charges":"100",
        },
    ])
}
    useEffect(() =>{
        StaticData()
    },[])
    console.log(itemData)


   const openFormWithData =(rowData, index) =>{
    console.log('#############')
    console.log(rowData)
    setFormVisible(true)
    itemsForm.setFieldsValue({hsnCode:rowData.hsnCode,description:rowData.description,tax:rowData.tax,taxPercentage:rowData.taxPercentage,charges:rowData.charges})
   }
    console.log(formVisible)

    const columns: ColumnProps<any>[] = [
        {
          title: 'Hsn Code',
          dataIndex: 'hsnCode',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          align: 'left',
          render: (text, data, index) => {
            // console.log(text, data, index)
            return <span>{data?.itemId?.children ? data?.itemId?.children : text}</span>
          }
    
        },
        {
          title: ' Tax',
          dataIndex: 'tax',
          key: 'quantity',
          align: 'left',
        },
        {
            title: ' Tax%',
            dataIndex: 'taxPercentage',
            key: 'taxPercentage',
            align: 'left',
        },
        {
          title: ' Charges',
            dataIndex: 'charges',
            key: 'charges',
            align: 'left',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          // width: '20%',
          render: (text, rowData: any, index) => (
            <span>
              <Tooltip placement="top" title='edit'>
                <EditOutlined className={'editSamplTypeIcon'} type="edit"
                  onClick={() => {
                    if (rowData) {
                    //   console.log(rowData);
                      openFormWithData(rowData, index);
                    }
                  }}
                  style={{ color: '#1890ff', fontSize: '14px' }}
                />
              </Tooltip>
            </span>)
        }
    
      ]

    const onReset =() =>{
        itemsForm.resetFields()
    }

    const onfinishData =(values) =>{
        console.log(values)
        itemsForm.validateFields().then((res) =>{
            console.log(res)
           
        })
        console.log('****************')
    }

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
        <Form form={itemsForm} layout='vertical' >      
        <Row gutter={24} >
        <Card title='Item Details' size="small">
        <Row gutter={24}>
            <Col span ={24} >
            <Row gutter={24} >
                      <Col span={4} style={{width:'500px'}}>
                     <Form.Item name={'id'} style={{display:'none'}}>
                      <Input hidden />
                    </Form.Item>
                        <Form.Item label={<Space><span>Hsn Code</span></Space>} name={ 'hsnCode'} 
                          rules={[
                            {
                              required: true,
                              message: 'Missing Hsn Code'
                            }
                          ]}>
                        <Input></Input>
                        </Form.Item>
                      </Col>
                        <Col span={4}>
                            <Form.Item  label="Description" name={'description'}  rules={[
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
                        <Col span={2} style={{marginTop:'28px'}}>
                        <Form.Item >
                            <Button type="primary" 
                            onClick={onfinishData}
                              style={{ marginLeft: 50,background:"green"}}>
                                Update
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={2} style={{marginTop:'28px'}}>
                                <Button
                                type="default" danger
                                icon={<UndoOutlined />}
                                style={{marginLeft:30}}
                                onClick={onReset}
                                >
                                Reset
                                </Button>
                        </Col>
                    </Row>
            </Col>
        </Row>
        <Table key={Date.now()} scroll={{ x: 500 }}
            dataSource={itemData}
            columns={columns} pagination={false} size="small"/>
        </Card>
        </Row>
        </Form>
{/*    
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
       */}
       </Form>
        </Card>
      
    );
};


export default DocExtractForm1;
