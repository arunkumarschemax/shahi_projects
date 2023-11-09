import { ItemCreationService, RmCreationService, ProductStructureService, OperationsService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Input, Row, Select, message } from 'antd';
import React, { useEffect, useState } from 'react'
import AlertMessages from '../common-functions/alert-messages';
import Checkbox from 'antd/lib/checkbox';
import { FgRmMappingRequest, GlobalVariables, OperationsDTO, ProductGroupFilter, RmItemMappingRequest } from '@project-management-system/shared-models';
import { UndoOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';


export const FgRMMappingForm = () => {
  const [form] = Form.useForm()
  const [fgItemsData,setFgItemsData] = useState<any[]>([])
 

  const [rmData,setRmData] = useState<any[]>([]);
  const [data,setData] = useState<any[]>([]);
  const CheckboxGroup = Checkbox.Group;
  const productStructureservice = new ProductStructureService()
  const { Option } = Select;
  const rmservice = new RmCreationService()
  const service = new ItemCreationService()
  const [rmItems,setRmItems] = useState<RmItemMappingRequest[]>([]);
  const [fabItems,setFabItems]  = useState<RmItemMappingRequest[]>([]);
  const operationsService = new OperationsService();
  const [operationsData, setOperationsData] = useState<OperationsDTO[]>([]);
  const [itemOpMap] = useState(new Map<number,number>())
  const [selectedCheckbox, setSelectedCheckbox] = useState({});
  const [selectedCheckbox1, setSelectedCheckbox1] = useState({});
  let navigate = useNavigate()



 

  useEffect(()=>{
    getFgItemsDropdown();
    getRmItemsDatabyProductGroupId();
    getRmItemsDatabyProductGroupId1();
    getAllOperationsData();
    
  },[])


 
 
  const getAllOperationsData = () => {

    operationsService.getAllActiveOperations().then(res => {
      if (res.status) {
        setOperationsData(res.data);
      } else {
        AlertMessages.getErrorMessage(res.internalMessage)
      }
    }).catch(err => {
      // setOperationsData([]);
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const onOperation = (itemId:number,selectedValue:number) => {
    itemOpMap.set(itemId,selectedValue)
}


  const onChange = (checkedValues) => {
    // console.log(checkedValues, "checkedValues");
  
    const selectedComponentDetails = data.filter((option) =>
      checkedValues.includes(option.rmitemId)
    );
  
    const rmitem = []
    selectedComponentDetails.forEach(res=>{
      rmitem.push(new RmItemMappingRequest(res.rmitemId,res.itemCode) )
    })
    setRmItems(rmitem)

    const rmitemcodes = selectedComponentDetails.map((item) => item.itemCode);

    // added below
    const updatedSelectedCheckbox = {};
     data.forEach((option) => {
    updatedSelectedCheckbox[option.rmitemId] = checkedValues.includes(option.rmitemId);
  });
  setSelectedCheckbox(updatedSelectedCheckbox);

  };

  
   


  const onChange1 = (checkedValues) => {
    // console.log(checkedValues, "checkedValues")
  
    const selectedComponentDetails = rmData.filter((option) =>
      checkedValues.includes(option.rmitemId)
    );

    const rmitem = []
    
    selectedComponentDetails.forEach(res=>{
      rmitem.push(new RmItemMappingRequest(res.rmitemId,res.itemCode) )
    })
    setFabItems(rmitem)

    const rmitemcodes = selectedComponentDetails.map((item) => item.itemCode);

    // added below
    const updatedSelectedCheckbox = {};
    rmData.forEach((option) => {
    updatedSelectedCheckbox[option.rmitemId] = checkedValues.includes(option.rmitemId);
  });
  setSelectedCheckbox1(updatedSelectedCheckbox);
  
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
  // console.log(values,"vvvvv")
  if (!rmItems.length && !fabItems.length) {
    message.error('Please select at least one item in Fabric Items or Trims Items');
    return;
  }
  
  rmItems.forEach(res=>{
    res.operationId = itemOpMap.get(res.rmitemId)
   })

   fabItems.forEach(res=>{
    res.operationId = itemOpMap.get(res.rmitemId)
   })

  const req = new FgRmMappingRequest(values.fgitemId,values.fgitemCode,[...rmItems,...fabItems],"admin")
  productStructureservice.createFgRmMapping(req).then(res=>{
    if (res.status){
      onReset();
     form.setFieldsValue({ fabricitems: null })
     form.setFieldsValue({ trimitems: null })
      message.success(res.internalMessage);
      navigate('/product-structure/fg-rm-mapping-view')
     

     
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


  // console.log(fgItemsData,"data")
  // console.log(data,"uuu")


  return (
    <Card size="default" title="RM TO FG Mapping"  extra={<Link to='/product-structure/fg-rm-mapping-view' >
    <span style={{color:'white'}} ><Button type={'primary'} >View</Button> </span>
    </Link>} >
      <Form layout="horizontal" form={form} onFinish={onFinish}>
      <Row gutter={24}>
        <Col xs={{ span: 10 }} sm={{ span: 24 }} md={{ span: 8}} lg={{ span:8 }} xl={{ span: 6 }}>
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
                    <CheckboxGroup style={{ width: '100%' }} onChange={onChange} >
                      {data.length === 0 ?(
                          <p>No data found</p>
                         ) : (
                    <Row>
                        {data.map((option) => (
                        // <Col span={12} key={option.rmitemId} >
                        //     <Checkbox value={option.rmitemId} key={option.rmitemId}  >{option.itemCode}</Checkbox>
                        // </Col>
                        <Col span={16} key={option.rmitemId}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ marginRight: "10px" }}>
                                <Checkbox value={option.rmitemId} key={option.rmitemId}>{option.itemCode}</Checkbox>
                            </div>
                            <div>
                            <Form.Item name={`fab_operationId_${option.rmitemId}`} >
                                <Select  placeholder="Select Operation" onChange={(value)=>onOperation(option.rmitemId,value)} disabled={!selectedCheckbox[option.rmitemId]}>
                                {operationsData.map((e)=>{
                                  return(<Option key={e.operationId} value={e.operationId}>
                                  {e.operationName}
                                   </Option>)
                                   })}

                                </Select>
                                </Form.Item>
                            </div>
                        </div>
                    </Col>
                        ))}
                    </Row>
                       )}
                    </CheckboxGroup>
                    </Card>
        </Form.Item>
        </Col>
        <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
       <Form.Item name = "trimitems">
         

          <Card style={{ width: '100%', marginLeft: 100 }}>
    <h3>Trims Items</h3>
    <CheckboxGroup style={{ width: '100%' }} onChange={onChange1}>
        {rmData.length === 0 ? (
            <p>No data found</p>
        ) : (
            <Row gutter={16} style={{ flexDirection: "row" }}>
                {rmData.map((option) => (
                    <Col span={16} key={option.rmitemId}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ marginRight: "10px" }}>
                                <Checkbox value={option.rmitemId} key={option.rmitemId}>{option.itemCode}</Checkbox>
                            </div>
                            <div>
                            <Form.Item name={`trim_operationId_${option.rmitemId}`} >
                                <Select  placeholder="Select Operation" onChange={(value)=>onOperation(option.rmitemId,value)} disabled={!selectedCheckbox1[option.rmitemId]} >
                                {operationsData.map((e)=>{
                                  return(<Option key={e.operationId} value={e.operationId}>
                                  {e.operationName}
                                   </Option>)
                                   })}

                                </Select>
                                </Form.Item>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        )}
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