import { Card, Col, Form, Input, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import AlertMessages from '../common/common-functions/alert-messages';
import { ProfitControlHeadService } from '@project-management-system/shared-services';




export const  Commonscreen = () => {

  const [pchData,setPchData] = useState<any>([])
  const Pchservice =new ProfitControlHeadService();

  useEffect (()=>{
    getAllActiveProfitControlHead();
  
  },[])
  
  
  const getAllActiveProfitControlHead=() =>{
    Pchservice.getAllActiveProfitControlHead().then(res =>{
    if (res.status){
      setPchData(res.data);
       
    } else{
      AlertMessages.getErrorMessage(res.internalMessage);
       }
  }).catch(err => {
    setPchData([]);
     AlertMessages.getErrorMessage(err.message);
   })
  
  }
  


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
        <Form.Item
                label="PCH"
                name="pch"
                rules={[{ required: true, message: "PCH" }]}
              >
                <Select placeholder="PCH" allowClear>
                  
                {pchData.map((rec) => (
                  <option key={rec.profitControlHeadId} value={rec.profitControlHeadId}>
                    {rec.profitControlHead}
                   </option>
                       ))}
                       

                </Select>
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