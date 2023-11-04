import { ItemCreationService, RmCreationService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import AlertMessages from '../common-functions/alert-messages';
import Checkbox from 'antd/lib/checkbox';
import { GlobalVariables, ProductGroupFilter } from '@project-management-system/shared-models';
import { UndoOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


export const FgRMMappingForm = () => {
  const [form] = Form.useForm()
  const [fgItemsData,setFgItemsData] = useState<any[]>([])
  const [components,setComponents] = useState<any[]>([]);
  const [rmData,setRmData] = useState<any[]>([]);
  const [data,setData] = useState<any[]>([]);



const CheckboxGroup = Checkbox.Group;
  

  useEffect(()=>{
    getFgItemsDropdown();
    getRmItemsDatabyProductGroupId();
    getRmItemsDatabyProductGroupId1();

  
    
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


const getRmItemsDatabyProductGroupId = () => {
  const req = new ProductGroupFilter(GlobalVariables.productGroupId)
  rmservice.getRmItemsDatabyProductGroupId(req).then(res => {
      if(res.status){
        setData(res.data)
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);
      }
  }).catch(err => {
    AlertMessages.getErrorMessage(err.message);
     setData([]);
  })
}

const getRmItemsDatabyProductGroupId1 = () => {
  const req = new ProductGroupFilter(GlobalVariables.productGroupId)
  rmservice.getRmItemsDatabyProductGroupId1(req).then(res => {
      if(res.status){
        setRmData(res.data)
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);
      }
  }).catch(err => {
    AlertMessages.getErrorMessage(err.message);
    setRmData([]);
  })
}


 const onFinish =(values)=>{
  console.log(values,"vvvvv")
 }

 const onReset =()=>{
  form.resetFields()
 }


  console.log(fgItemsData,"data")


  return (
    <Card size="small" title="RM TO FG Mapping"  extra={<Link to='/product-structure/fg-rm-mapping-view' >
    <span style={{color:'white'}} ><Button type={'primary'} >View</Button> </span>
    </Link>} >
      <Form layout="horizontal" form={form} onFinish={onFinish}>
      <Row gutter={24}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5}} lg={{ span:6 }} xl={{ span: 8 }}>
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
        <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                  <Card style={{marginLeft:30,height:'100%'}}>
                        <h3>Fabric Items</h3>
                    <CheckboxGroup style={{ width: '100%' }}>
                    <Row>
                        {data.map((option) => (
                        <Col span={12} key={option.rmitemId}>
                            <Checkbox value={option.rmitemId} key={option.itemCode}>{option.itemCode}</Checkbox>
                        </Col>
                        ))}
                    </Row>
                    </CheckboxGroup>
                    </Card>
        </Col>
        <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>


                    <Card style={{ width: '100%',marginLeft:100 }}>
                        <h3>Trims Items</h3>
                    <CheckboxGroup style={{ width: '100%' }}>
                    <Row gutter={24}>
                        {rmData.map((option) => (
                        <Col span={12} key={option.rmitemId}>
                            <Checkbox value={option.rmitemId} key={option.itemCode}>{option.itemCode}</Checkbox>
                        </Col>
                        ))}
                    </Row>
                    </CheckboxGroup>
                    </Card>

        </Col>
        </Row>
        <Row justify={'end'}>
          <Form.Item>
            <Button type='primary'  htmlType="submit">Submit</Button>
            <Button
                  type="default"
                  danger
                  icon={<UndoOutlined />}
                  onClick={onReset}
                  style={{ marginLeft: 20 }}
                >
                  Reset
                </Button>
          </Form.Item>
        </Row>
      </Form>
    </Card>
  );
};

export default FgRMMappingForm