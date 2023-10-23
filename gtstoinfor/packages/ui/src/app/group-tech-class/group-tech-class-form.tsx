import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select,Card, Row, Col } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GroupTechClassDto, PaymentTermsDto } from '@project-management-system/shared-models';
import { BuyersService, DivisionService, GroupTechClassService, PaymentTermsService } from '@project-management-system/shared-services';
import AlertMessages from '../common/common-functions/alert-messages';



const { Option } = Select;
const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 8,
  },
};


const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 10,
  },
};
/* eslint-disable-next-line */
export interface GroupTechClassFormProps {
  Data: GroupTechClassDto;
  updateDetails:(dto:GroupTechClassDto)=>void;
  isUpdate:boolean;
  closeForm: () => void;

}

export function GroupTechClassForm(props:GroupTechClassFormProps) {


  const [form] = Form.useForm();
  const [disable, setDisable] = useState<boolean>(false)
  const [buyerData,setBuyerData] = useState<any>([])
  const [divisionData,setDivisionData] = useState<any>([])


  const navigate = useNavigate()
  const service = new GroupTechClassService;
  const buyerService = new BuyersService();
  const divisionService = new DivisionService();


  let history = useLocation();

  useEffect(()=>{
    if(buyerService && divisionService && props.updateDetails){
      getAllActiveBuyers()
      getAllActiveDivision()
    }
   


  },[])

  const getAllActiveBuyers=() =>{
    buyerService.getAllActiveBuyers().then(res =>{
    if (res.status){
      setBuyerData(res.data);
       
    } else{
      AlertMessages.getErrorMessage(res.internalMessage);
       }
  })
}

const getAllActiveDivision=() =>{
  divisionService.getAllActiveDivision().then(res =>{
  if (res.status){
    setDivisionData(res.data);
     
  } else{
    AlertMessages.getErrorMessage(res.internalMessage);
     }
})

}

  const save = (Data: GroupTechClassDto) => {
    setDisable(true)
       service.createGroupTechClass(Data).then(res => {
        setDisable(false)
      if (res.status) {
        AlertMessages.getSuccessMessage('Created Successfully');
        navigate('/masters/groupTechClass/groupTechClass-grid')
        onReset();
      } else {
        if (res.status) {
          AlertMessages.getErrorMessage(res.internalMessage);
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      }
    }).catch(err => {
      setDisable(false)
      AlertMessages.getErrorMessage(err.message);
    })
  }


  
  const saveData = (values: GroupTechClassDto) => {
    console.log(values,"paaaaaaaa")
    setDisable(false)
    // console.log(values);
    if(props.isUpdate){
      props.updateDetails(values);
    }else{
      setDisable(false)
      save(values);
    }
  
  };
  const onReset = () => {
    form.resetFields();
  };

 console.log(GroupTechClassDto,"999999")

  return (
    <Card title='Group Tech Class' 
    extra={
      (props.isUpdate === false)
       && 
       <span><Button 
    onClick={() => navigate('/masters/groupTechClass/groupTechClass-grid')} type={'primary'}>View</Button></span>}>

    <Form layout="vertical" form={form} onFinish={saveData} 
    initialValues={props.Data}
     >
    <Row gutter={12}>
    <Form.Item name="groupTechClassId" style={{ display: 'none' }}>
        <Input hidden />
      </Form.Item>
  
      <Form.Item style={{ display: 'none' }} name="createdUser">
        <Input hidden />
      </Form.Item>  
    
      <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 5 }}
            >
     {/* <Col xs={{span:24}} sm={{span:24}} md={{span:5,offset:1}} lg={{span:5,offset:1}} xl={{span:5,offset:1}} style={{margin:'1%'}}> */}
        <Form.Item name="groupTechClassCode" label=" GroupTech Code"
        rules={[
          {
            required: true,
            message: 'GroupTech Code Is Required'
          },
        ]}
        >
        <Input />
      </Form.Item>
      </Col >

      <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 5 }}
            > 
     {/* <Col xs={{span:24}} sm={{span:24}} md={{span:5,offset:1}} lg={{span:5,offset:1}} xl={{span:5,offset:1}} style={{margin:'1%'}}> */}
        <Form.Item name="groupTechClassDescription" label=" GroupTech Description"
           rules={[
            {
              required: true,
              message: 'GroupTech DescriptionIs Required'
            },
          ]}
        >
        <Input />
      </Form.Item>
      </Col >
      <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 5 }}
            >
      {/* <Col xs={{span:24}} sm={{span:24}} md={{span:5,offset:1}} lg={{span:5,offset:1}} xl={{span:5,offset:1}} style={{margin:'1%'}}> */}
        <Form.Item
          name="buyerId"
          label="Buyer"
          rules={[
            {
              required: true,
              message: 'Buyer Is Required'
            },
          ]}
        >
         <Select placeholder="Select Buyer">
         {buyerData.map((rec) => (
                  <option key={rec.buyerId} value={rec.buyerId}>
                    {rec.buyerName}
                   </option>
                       ))}
          
        </Select>
        </Form.Item>
        </Col>
        <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 5 }}
            >
        {/* <Col xs={{span:24}} sm={{span:24}} md={{span:5,offset:1}} lg={{span:5,offset:1}} xl={{span:5,offset:1}} style={{margin:'1%'}}> */}
        <Form.Item
          name="divisionId"
          label="Division"
          style={{width:'120%'}}
          rules={[
            {
              required: true,
              message: 'Division Is Required'
            },
          
          ]}
        >
         <Select placeholder="Select Division">

         {divisionData.map((rec) => (
                  <option key={rec.divisionId} value={rec.divisionId}>
                    {rec.divisionName}
                   </option>
                       ))}
          

         </Select>
          
        </Form.Item>
        </Col>
        </Row>
      
        
            <Col span={24} style={{ textAlign: 'right' }}>
     
            <Button type="primary" disabled={disable} htmlType="submit" >
            Submit
          </Button>
          {(props.isUpdate === false) &&
         <Button htmlType="button" style={{ margin: '0 8px' }} onClick={onReset}>
            Reset
          </Button>
           } 
         
          </Col>
          
    </Form>
          </Card>
  );
}

export default GroupTechClassForm;
