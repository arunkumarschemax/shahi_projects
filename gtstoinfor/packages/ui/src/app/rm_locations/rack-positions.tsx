import { Alert, Button, Card, Col, Form, Input, Row, Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertMessages from '../common/common-functions/alert-messages';
import { ColumnService, LevelService, RackPositionService, RacksService } from '@project-management-system/shared-services';
import { RackPositionDTO } from '@project-management-system/shared-models';


const RackPosition = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const service = new RackPositionService();
  const services = new RacksService();
  const onlyNumbersAndCharactersPattern = /^[a-zA-Z0-9]+$/;
  const [data, setData] = useState<any[]>([]);
  const [data2, setData2] = useState<any[]>([]);
  const [data3, setData3] = useState<any[]>([]);

const service2  = new LevelService()
const service1= new ColumnService()
  useEffect(() => {
    getdata()
    getdata1()
    getdata2()
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

  const getdata1=()=>{
    service1.getAllColumnInfo()
    .then((res)=>{
      if (res.status) {
        setData2(res.data);
      } else {
        setData2([]);
      }
 
    })
  }


  const getdata2=()=>{
    service2.getAllLevel()
    .then((res)=>{
      if (res.status) {
        setData3(res.data);
      } else {
        setData3([]);
      }
 
    })
  }
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
      <Card title={<span>Warehouse Location</span>} headStyle={{ backgroundColor: '#69c0ff', border: 0 }}
        extra={<Button
          onClick={() => navigate('/masters/rackPosition-view')}
          type="primary"
          // style={{ background: "white", color: "#3C085C" }}
        >View</Button>
        }>
      
        <Form form={form} layout={'vertical'} name="control-hooks" onFinish={onFinish}>
          <Row gutter={12}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }}>
              <Form.Item label="Column" name="columnId"
               rules={[
                { required: true, message: 'Column is required' },]}
              >
                <Select placeholder=" Select Column" >
                  {data2.map((option) => (
                    <option key={option.columnId} value={option.columnId}>
                      {option.column}
                    </option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }}>
              <Form.Item label="Level" name="levelId"
               rules={[
                { required: true, message: 'Level is required' },]}
              >
                <Select placeholder=" Select Level" >
                  {data3.map((option) => (
                    <option key={option.levelId} value={option.levelId}>
                      {option.levelName}
                    </option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }}>
              <Form.Item label=" Rack " name="rackName"
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }}>
              <Form.Item label=" Rack Position Code" name="positionCode"
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
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }}>
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