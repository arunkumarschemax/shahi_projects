import { Button, Card, Col, Form, Input, Row, Select, message } from 'antd'
import React from 'react'
import AlertMessages from '../../common/common-functions/alert-messages';
import { UomService } from '@project-management-system/shared-services';
import { UomCategoryEnumDispaly, UomRequest } from '@project-management-system/shared-models';
import { useNavigate } from 'react-router-dom';
const {Option} = Select;

const UomForm = () => {

    const [form] = Form.useForm();
    const service = new UomService();
    const navigate=useNavigate()

    const onFinish = (uomDto: UomRequest) => {
        service.createUom(uomDto).then(res => {
            if (res.status) {
                AlertMessages.getSuccessMessage(res.internalMessage)
                setTimeout(() => {
                    message.success('Submitted successfully');
                    navigate('/global/uom/uom-grid')
                    // window.location.reload();
                }, 500);;
            }
            else{
              AlertMessages.getErrorMessage(res.internalMessage)
            }
        }).catch(err => {
            AlertMessages.getErrorMessage(err.message);
        })
    }
  
    const clearData = () => {
        form.resetFields()
      }
  
  return (
    <Card  title="UOM "
    headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
    extra={<Button
        
        onClick={() => navigate('/global/uom/uom-grid')}
        type="primary"
    >View</Button>
    }>
         <Form  layout={'vertical'} form={form} onFinish={onFinish}>
      <Row gutter={24}>
      <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label="UOM Category" name="uomCategory"
              rules={[
                {
                  required: true,
                  message:'UOM Category Is Required'
                },
              ]}
              >
                <Select showSearch allowClear placeholder='Select UOM Category'>
                    {
                        UomCategoryEnumDispaly.map((e)=>{
                            return(
                                <Option key={e.name} value={e.name}>{e.displayVal}</Option>
                            )
                        })
                    }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label="UOM" name="uom"
              rules={[
                {
                  required: true,
                  message:'UOM Is Required'
                },
              ]}
              >
                <Input placeholder=" Enter UOM"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label="Description" name="description"
              rules={[
                {
                  required: false,
                },
              ]}
              >
                <Input placeholder=" Enter Description"/>
              </Form.Item>
            </Col>
            </Row>
            <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" style={{ margin: '0 14px' }}
                onClick={clearData}
              >
                Reset
              </Button>
            </Col>
          </Row>
            </Form>
    </Card>
  )
}

export default UomForm