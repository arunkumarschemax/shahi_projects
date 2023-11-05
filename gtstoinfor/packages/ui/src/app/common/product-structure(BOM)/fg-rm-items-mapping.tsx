import { ItemCreationService, RmCreationService, productStructureService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Input, Row, Select, message } from 'antd';
import React, { useEffect, useState } from 'react'
import AlertMessages from '../common-functions/alert-messages';
import Checkbox from 'antd/lib/checkbox';
import { FgRmMappingRequest, GlobalVariables, ProductGroupFilter, RmItemMappingRequest } from '@project-management-system/shared-models';
import { UndoOutlined } from '@ant-design/icons';


export const FgRMMappingForm = () => {
  const [form] = Form.useForm()
  const [fgItemsData,setFgItemsData] = useState<any[]>([])
  const [components,setComponents] = useState<any[]>([]);
  const [rmData,setRmData] = useState<any[]>([]);
  const [data,setData] = useState<any[]>([]);
  const CheckboxGroup = Checkbox.Group;
  const productStructureservice = new productStructureService()
  const { Option } = Select;
  const rmservice = new RmCreationService()
  const service = new ItemCreationService()
  const [rmItems,setRmItems] = useState<RmItemMappingRequest[]>([]);
  const [fabItems,setFabItems]  = useState<RmItemMappingRequest[]>([]);
 

  useEffect(()=>{
    getFgItemsDropdown();
    getRmItemsDatabyProductGroupId();
    getRmItemsDatabyProductGroupId1();

  
    
  },[])

  


  const onChange = (checkedValues) => {
    console.log(checkedValues, "checkedValues");
  
    const selectedComponentDetails = data.filter((option) =>
      checkedValues.includes(option.rmitemId)
    );
  
    const rmitem = []
    selectedComponentDetails.forEach(res=>{
      rmitem.push(new RmItemMappingRequest(res.rmitemId,res.itemCode) )
    })
    setRmItems(rmitem)

    const rmitemcodes = selectedComponentDetails.map((item) => item.itemCode);

  };
 
  


  const onChange1 = (checkedValues) => {
    console.log(checkedValues, "checkedValues")
  
    const selectedComponentDetails = rmData.filter((option) =>
      checkedValues.includes(option.rmitemId)
    );

    const rmitem = []
    selectedComponentDetails.forEach(res=>{
      rmitem.push(new RmItemMappingRequest(res.rmitemId,res.itemCode) )
    })
    setFabItems(rmitem)

    const rmitemcodes = selectedComponentDetails.map((item) => item.itemCode);
  
  };

  

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
 
  const req = new FgRmMappingRequest(values.fgitemId,values.fgitemCode,[...rmItems,...fabItems],"admin")
  productStructureservice.createFgRmMapping(req).then(res=>{
    if (res.status){
      onReset();
     form.setFieldsValue({ fabricitems: null })
     form.setFieldsValue({ trimitems: null })
      message.success(res.internalMessage);
     

     
  } else{ 
 
    AlertMessages.getErrorMessage(res.internalMessage);
     }
    }).catch(err => {

   AlertMessages.getErrorMessage(err.message);
 }) 
  
 }

 const onReset =()=>{
  form.resetFields()

 }

 const onFgchange =(values,code)=>{
  form.setFieldsValue({ fgitemCode: code?.code })

 }


  console.log(fgItemsData,"data")
  console.log(data,"uuu")


  return (
    <Card size="small" title="RM TO FG Mapping"  >
      <Form layout="horizontal" form={form} onFinish={onFinish}>
      <Row gutter={24}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5}} lg={{ span:6 }} xl={{ span: 8 }}>
            <Form.Item label='FG Item Code' name='fgitemId' rules={[{required:true,message:'FG itemCode is required'}]}>
                <Select showSearch allowClear placeholder='Select Item' onChange={onFgchange} >
                {fgItemsData.map((rec) => (
                        <Option key={rec.fgitemId} value={rec.fgitemId} code={rec.itemCode}>
                          {`${rec.itemName}-${rec.itemCode}`}
                        </Option>
                     ))}
    

                </Select>
            </Form.Item>
            <Form.Item name="fgitemCode" style={{ display: 'none' }}>
            <Input hidden />
            </Form.Item>
        </Col>
      
      </Row>
        <Row gutter={24}>
        <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
          <Form.Item name= "fabricitems">
                  <Card style={{marginLeft:30,height:'100%'}}>
                        <h3>Fabric Items</h3>
                    <CheckboxGroup style={{ width: '100%' }}  onChange={onChange}  >
                    <Row>
                        {data.map((option) => (
                        <Col span={12} key={option.rmitemId} >
                            <Checkbox value={option.rmitemId} key={option.rmitemId}  >{option.itemCode}</Checkbox>
                        </Col>
                        ))}
                    </Row>
                    </CheckboxGroup>
                    </Card>
        </Form.Item>
        </Col>
        <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
        <Form.Item name = "trimitems">
         

                    <Card style={{ width: '100%',marginLeft:100 }}>
                        <h3>Trims Items</h3>
                    <CheckboxGroup style={{ width: '100%' }} onChange={onChange1}>
                    <Row gutter={24}>
                        {rmData.map((option) => (
                        <Col span={12} key={option.rmitemId}>
                            <Checkbox value={option.rmitemId} key={option.rmitemId}>{option.itemCode}</Checkbox>
                        </Col>
                        ))}
                    </Row>
                    </CheckboxGroup>
                    </Card>
        </Form.Item>
         
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