import React, { useEffect, useState } from 'react';
import { Card, Form, Select, Button, Row, Col, Input, message, MessageArgsProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { DocumentDto, DocumentRoleMappingDto } from '@project-management-system/shared-models';
import RoleSharedService from 'packages/libs/shared-services/src/document-role-service/document-role-sharedservice';
import { DocumentService } from '@project-management-system/shared-services';
const { Option } = Select;

export const RoleMappingForm=() =>{
   

const [roleData, setRoleData] = useState<any>([]);

const services = new DocumentService ();
const roleMappingService = new RoleSharedService()
const [form] = Form.useForm();
const navigate=useNavigate();


const roleOptions = [
    {
      value: 1,
      label: "Admin",
    },
    {
      value: 2,
      label: "Sourcing",
    },
    {
      value: 3,
      label: "Logistics",
    },
    {
      value: 4,
      label: "Factory",
    },
    {
      value: 5,
      label: "Accounts",
    }
  ];

const getDocumentData =() =>{
    services.getDocumentsNotMapped().then((res) =>{
        if(res.status){
            setRoleData(res.data)
        }else{
            setRoleData([])
            }
    }
    ) 
}
  useEffect(() =>{
    getDocumentData();
  },[])

  const handleReset =() =>{
    form.resetFields();
  }

  const onFinish = (data:DocumentRoleMappingDto) =>{
    console.log(data,data)
    const req = new  DocumentRoleMappingDto(undefined,form.getFieldValue('documentId'),form.getFieldValue('roleName'),form.getFieldValue('documentName'),form.getFieldValue('roleId'),'admin')
    console.log(req)
    form.validateFields().then(()=>{
        roleMappingService.createDocMapping(req).then(res =>{
            if(res.status){
             message.success(res.internalMessage)
                navigate("/role-mapping-grid")
                handleReset()
            }else{
              message.error(res.internalMessage)
            }
        })
    })
   
  }
  const docOnchange =(e:any,option:any) =>{
    console.log(option.type)
    form.setFieldsValue({documentName:option?.type})
  
  }
  const roleOnchange =(e:any,option:any) =>{
    form.setFieldsValue({roleId:option?.key})
  
  }
    return (
        <div>
            <Card title="Document Role Mapping " size='small'
        extra={<span><Button onClick={() => navigate('/role-mapping-grid')} type={'primary'}>View</Button></span>}>          
                <Form
                    form={form}
                    onFinish={onFinish}
                    >
                    <Row gutter={24}>
                        <Col span={4}>
                            <Form.Item name="roleName" label="Role"
                                rules={[
                                    { required: true, message: "Enter role Name" },
                                    
                                    {
                                        message: "role should contain only letters",
                                        pattern: /^[A-Za-z]+$/,
                                    },
                                ]}>
                                <Select
                                    showSearch
                                    allowClear
                                    optionFilterProp="children"
                                    placeholder="select Role" onChange={roleOnchange}>
                                      {roleOptions?.map(obj =>{
                                            return <Option key={obj.value} value={obj.label}>{obj.label}</Option>
                                         })}
                                        
                                </Select>
                            </Form.Item>
                            <Form.Item name={'roleId'} hidden></Form.Item>
                            </Col>
                            <Col span={8}>
                            <Form.Item name="documentId" label="Document Name"
                                rules={[
                                    { required: true, message: "Enter Document Name" },
                                   
                                ]}>
                            
                               <Select
                                    mode='multiple'
                                    showSearch
                                    allowClear
                                    placeholder="select DocumentName" 
                                    onChange={docOnchange}
                                    >
                                      {roleData?.map((obj:any) =>{
                                            return <Option key={obj.id} value={obj.id} type={obj.documentName}>{obj.documentName}</Option>
                                         })}
                                </Select>
                            </Form.Item>
                            <Col>
                            <Form.Item name='documentName' hidden>
                              {/* <Input/> */}
                              <Select mode='multiple'></Select>
                              </Form.Item>

                            </Col>
                        </Col>
                        </Row>                    
                        <Row justify="end">
                        <Col>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                    Submit
                                </Button>

                                <Button htmlType="reset" onClick={handleReset} >
                                    Reset
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>

        </div>
    );
};

export default RoleMappingForm;