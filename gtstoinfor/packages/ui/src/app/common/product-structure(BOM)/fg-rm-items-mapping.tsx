import { ItemCreationService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import AlertMessages from '../common-functions/alert-messages';


export const FgRMMappingForm = () => {
  const [form] = Form.useForm()
  const [fgItemsData,setFgItemsData] = useState<any[]>([])

  useEffect(()=>{
    getFgItemsDropdown();
  },[])

  const service = new ItemCreationService()
  const getFgItemsDropdown = () =>{
    service.getFgItemsDropdown().then(res=>{
      if(res.status){
        setFgItemsData(res.data)
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    }).catch(err => {
      AlertMessages.getErrorMessage(err.message);
      setFgItemsData([]);
    })

  }
  
  console.log(fgItemsData,"data")


  return (
    <Card size="small" title="FG RM Mapping" >
      <Form layout="horizontal" form={form}>
      <Row gutter={24}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 5 }}>
            <Form.Item label='FG Item Code' name='fgitem' rules={[{required:true,message:'FG itemCode is required'}]}>
                <Select showSearch allowClear placeholder='Select Item' >
                {fgItemsData.map((rec) => (
                        <option key={rec.itemCode} value={rec.itemCode}>
                          {rec.itemCode}
                        </option>
                      ))}
    
                </Select>
            </Form.Item>
        </Col>
      
      </Row>
        {/* <Row gutter={24}>
      
        </Row> */}
        <Row justify={'end'}>
          <Form.Item>
            <Button type='primary'  >Submit</Button>
          </Form.Item>
        </Row>
      </Form>
    </Card>
  );
};

export default FgRMMappingForm