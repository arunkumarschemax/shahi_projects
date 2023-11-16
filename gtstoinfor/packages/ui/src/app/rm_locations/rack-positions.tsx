import { Button, Card, Col, Form, Input, Row, Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertMessages from '../common/common-functions/alert-messages';
import { RackPositionService, RacksService } from '@project-management-system/shared-services';
import { RackPositionDTO } from '@project-management-system/shared-models';


const RackPosition = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const service = new RackPositionService();
  const services = new RacksService();
  const onlyNumbersAndCharactersPattern = /^[a-zA-Z0-9]+$/;
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getdata()
  },[])

  const getdata = () => {
    services.getRacks()
      .then((res) => {
        if (res.status) {
          setData(res.data);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };


  const onFinish = (liscenceTypeDto: RackPositionDTO) => {
    service.createPosition(liscenceTypeDto).then(res => {
      if (res.status) {
        AlertMessages.getSuccessMessage(res.internalMessage)
        setTimeout(() => {
          message.success('Submitted successfully');
          window.location.reload();
          navigate("/masters/rackPosition-view")
        }, 500);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
    })
  }


  const clearData = () => {
    form.resetFields()
  }

  return (
    <div>
      <Card title={<span>WARE HOUSE LOCATIONS</span>} style={{ textAlign: 'center' }} headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
      className="card-header"
        extra={<Button
          onClick={() => navigate('/masters/rackPosition-view')}
          type="primary"
          style={{ background: "white", color: "#3C085C" }}
        >View</Button>
        }>
        <Form form={form} layout={'vertical'} name="control-hooks" onFinish={onFinish}>
          <Row gutter={12}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
              <Form.Item label=" Rack Name" name="rackName"
               rules={[
                { required: true, message: 'Field is required' },]}
              >
                <Select placeholder=" Select Rack Code" >
                  {data.map((option) => (
                    <option key={option.rackId} value={option.rackName}>
                      {option.rackName}
                    </option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
              <Form.Item label=" Position Code" name="positionCode"
                rules={[
                  { required: true, message: 'Field is required' },
                  {
                    pattern: onlyNumbersAndCharactersPattern,
                    message: 'Only numbers and characters are allowed',
                  },
                ]}
              >
                <Input placeholder=" Enter Position Code"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
              <Form.Item label="Rack Position Name" name="rackPositionName"
                rules={[
                  { required: true, message: 'Field is required' },
                  {
                    pattern: onlyNumbersAndCharactersPattern,
                    message: 'Only numbers and characters are allowed',
                  },
                ]}
              >
                <Input placeholder=" Enter Position Name"/>
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
    </div>
  )
}

export default RackPosition