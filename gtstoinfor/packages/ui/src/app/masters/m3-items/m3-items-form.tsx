import { Button, Card, Col, Form, Input, Row, Select } from 'antd'
import React from 'react'

const M3Items = () => {
  return (
    <div>
        <Card title="M3 ITEMS">
        <Form layout="vertical">
        <Row gutter={24}>
      <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label="Item Code" name="itemCode"
               rules={[
                { required: true, message: 'Field is required' },
              ]}
              >
                <Input placeholder=" Enter Item Code"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label="Content" name="content"
               rules={[
                { required: true, message: 'Field is required' },
              ]}
              >
                <Input placeholder=" Enter Content"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label=" Fabric Type" name="fabricType"
               rules={[
                { required: true, message: 'Field is required' },
              ]}
              >
            <Input placeholder=" Enter  Fabric Type"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label=" Weave" name="weave"
               rules={[
                { required: true, message: 'Field is required' },
              ]}
              >
            <Input placeholder=" Enter  Weave"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label="Weight" name="weight"
               rules={[
                { required: true, message: 'Field is required' },
                // {
                //   pattern: Rules,
                //   message: 'Only numbers and characters are allowed',
                // },
              ]}
              >
                <Input placeholder=" Enter Weight"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label=" Construction" name="construction"
               rules={[
                { required: true, message: 'Field is required' },
              ]}
              >
            <Input placeholder=" Enter  Construction"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label=" Yarn Count" name="yarnCount"
               rules={[
                { required: true, message: 'Field is required' },
              ]}
              >
            <Input placeholder=" Enter  Yarn Count"/>
              </Form.Item>
            </Col>
  
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label=" Finish" name="finish"
               rules={[
                { required: true, message: 'Field is required' },
              ]}
              >
            <Input placeholder=" Enter  Finish"/>
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4}} lg={{ span: 8}} xl={{ span: 5}}>
              <Form.Item label=" Shrinkage" name="shrinkage"
               rules={[
                { required: true, message: 'Field is required' },
              ]}
              >
            <Input placeholder=" Enter  Shrinkage"/>
              </Form.Item>
            </Col>
            
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" style={{ margin: '0 14px' }}
                // onClick={clearData}
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

export default M3Items