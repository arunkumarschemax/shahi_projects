import { Card, Col, Form, Input, Row } from 'antd'
import React from 'react'





export const  Commonscreen = () => {
  return (
    <Card bordered={false}>
     <Form>
         <Row gutter={48}>

         <Col xs={{ span: 48 }} sm={{ span: 48 }} md={{ span: 4 }} lg={{ span: 8 }} xl={{ span: 8}}>
           <Form.Item name="itemno" label = "Item No">
           <Input placeholder='Item No' />
           </Form.Item>
        </Col>

        <Col xs={{ span: 48 }} sm={{ span: 48 }} md={{ span: 4 }} lg={{ span: 8 }} xl={{ span: 8}}>
            <Form.Item name="Pch" label = "PCH">
             <Input placeholder='PCH' />
            </Form.Item>
        </Col>

        <Col xs={{ span: 48 }} sm={{ span: 48 }} md={{ span: 4 }} lg={{ span: 8 }} xl={{ span: 8}}>
            <Form.Item name="facility" label = "Facility">
             <Input placeholder='Facility'  />
            </Form.Item>
        </Col>

        </Row>
     </Form>
     </Card>
    
  )
}

export default Commonscreen