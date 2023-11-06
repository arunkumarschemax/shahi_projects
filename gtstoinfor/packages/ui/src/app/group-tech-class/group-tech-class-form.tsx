import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select,Card, Row, Col } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BuyerExtrnalRefIdReq, GroupTechClassDto, MenusAndScopesEnum, PaymentTermsDto } from '@project-management-system/shared-models';
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
  data: GroupTechClassDto;
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
  const [dataFetched, setDataFetched] = useState(false); 
  const [userId, setUserId] = useState([]); 
  const [loginBuyer,setLoginBuyer] = useState<number>(0)
  const externalRefNo = JSON.parse(localStorage.getItem('currentUser')).user.externalRefNo
  const role = JSON.parse(localStorage.getItem('currentUser')).user.roles
let userRef 

  let history = useLocation();

  useEffect(() => {
    if (!dataFetched) { // Check if data has not been fetched already
      getAllActiveDivision();
      setDataFetched(true);
      Login()
    }
  }, [dataFetched]);
  const Login = () => {
    const req = new BuyerExtrnalRefIdReq();
    if (role === MenusAndScopesEnum.roles.crmBuyer) {
      req.extrnalRefId = externalRefNo;
    }
    buyerService.getBuyerByRefId(req).then((res) => {
      if (res.status) {
        setUserId(res.data);
        setLoginBuyer(res.data?.buyerId);
        if(req.extrnalRefId){
            form.setFieldsValue({'buyerId': res.data.buyerId})
            }
                  }
    });
    buyerService.getAllActiveBuyers().then((res) => {
      if (res.status) {
        setBuyerData(res.data);
      }
      else{
        AlertMessages.getErrorMessage(res.internalMessage);
         }
    });
  };
  

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

//  console.log(GroupTechClassDto,"999999")
 console.log(props.data,"999999")


  return (
    <Card title='Group Tech Class' 
    extra={
      (props.isUpdate === false)
       && 
       <span><Button 
    onClick={() => navigate('/masters/groupTechClass/groupTechClass-grid')} type={'primary'}>View</Button></span>}>

    <Form layout="vertical" form={form} onFinish={saveData} 
    initialValues={props.data}
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
          
            {
              pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
              message: `Should contain only alphabets and numbers.`
            }
        ]}
        >
        <Input  placeholder='Enter GroupTech Code'/>
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
            }
            ,
            {
              pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
              message: `Should contain only alphabets and numbers.`
            }
          ]}
        >
        <Input placeholder='Enter GroupTech Description '/>
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
        initialValue={userId.length>0 ?userId[0].buyerId:''}
          name="buyerId"
          label="Buyer"
          rules={[
            {
              required: true,
              message: 'Buyer Is Required'
            },
          ]}
        >
         <Select defaultValue={userId.length>0 ?userId[0].buyerId:''} placeholder="Select Buyer">
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
