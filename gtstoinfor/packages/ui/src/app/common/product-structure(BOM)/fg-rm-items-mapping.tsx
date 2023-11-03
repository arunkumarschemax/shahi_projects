import { ColourService, ItemCreationService, RmCreationService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import AlertMessages from '../common-functions/alert-messages';
import Checkbox from 'antd/lib/checkbox';


export const FgRMMappingForm = () => {
  const [form] = Form.useForm()
  const [fgItemsData,setFgItemsData] = useState<any[]>([])
  const colorService = new ColourService()
  const [color,setColor] = useState<any[]>([])
  const [components,setComponents] = useState<any[]>([]);
  const [rmData,setRmData] = useState<any[]>([]);


const CheckboxGroup = Checkbox.Group;
  

  useEffect(()=>{
    getFgItemsDropdown();
    getAllColors();
    getRmItemsData();
    
  },[])

  // const onChange = (checkedValues) => {
  //   const selectedComponentDetails = color.filter(
  //     (option) => checkedValues.includes(option.colorId)
  //   );

  //   setComponents(selectedComponentDetails);
  //   console.log(checkedValues,"yyy")
  // };
  
  const rmservice = new RmCreationService()

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

  const getAllColors = () => {
    colorService.getAllActiveColour().then(res => {
        if(res.status){
            setColor(res.data)
        }
    })
}


  const getRmItemsData = () => {
    rmservice.getRmItemsData().then(res => {
        if(res.status){
          setRmData(res.data)
        }
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
                          {`${rec.itemName}-${rec.itemCode}`}
                        </option>
                      ))}
    
                </Select>
            </Form.Item>
        </Col>
      
      </Row>
        <Row gutter={24}>
        
                  <Card style={{marginLeft:30}}>
                        <h3>RM Items</h3>
                    <CheckboxGroup>
                    <Row>
                        {rmData.map((option) => (
                        <Col span={8} key={option.rmitemId}>
                            <Checkbox value={option.rmitemId} key={option.itemCode}>{option.itemCode}</Checkbox>
                        </Col>
                        ))}
                    </Row>
                    </CheckboxGroup>
                    </Card>

       
        </Row>
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