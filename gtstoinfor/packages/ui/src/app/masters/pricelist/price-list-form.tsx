
import { PriceListDto } from '@project-management-system/shared-models';
import { PriceListService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Input, Row, message } from 'antd';
import React,{useState,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AlertMessages from '../../common/common-functions/alert-messages';

export interface PriceListFormProps {
  Data:PriceListDto;
  updateData:(PriceList:PriceListDto)=>void;
  isUpdate:boolean;
  closeForm: () => void;
}
export const PriceListForm = (props: PriceListFormProps) => {

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const priceService = new PriceListService()
  const { state } = useLocation();
  const [disable, setDisable] = useState<boolean>(false);



  useEffect(() => {
    if(state?.id){
      form.setFieldsValue({operationGroupId:state?.id})
    }
  },[state])
  

   const createPriceList=(Dto:PriceListDto)=>{
    setDisable(true)
    priceService.createPriceList(Dto).then(res => {
      setDisable(false)
      
      if (res.status) {
        AlertMessages.getSuccessMessage('Price List Created Successfully');
        navigate("/masters/pricelist/price-list-view");
        onReset();
      } else {
        if (res.status) {
          AlertMessages.getErrorMessage(res.internalMessage);
        } else {
          // AlertMessages.getErrorMessage(res.internalMessage);
          message.error("Style, Destination details already existed")
        }
      }
    }).catch(err => {
      setDisable(false)
      AlertMessages.getErrorMessage(err.message);
    })
  }

  const onReset = () => {
    form.resetFields()
  }

  const saveData = (values:PriceListDto ) => { 
    setDisable(false)
    if(props.isUpdate){
      props.updateData(values);
      // console.log(values, "to update")
    }else{
      setDisable(false)
      createPriceList(values);
    }
  };

  return (
    <Card title='Add Price List' extra={<span><Button onClick={() => navigate('/masters/pricelist/price-list-view')} type={'primary'}>View</Button></span>}>
        <Form form={form} title='Factories' layout='vertical' onFinish={saveData} initialValues={props.Data} >
        <Form.Item name="id"  style={{display:"none"}} >
                  <Input hidden/>
                </Form.Item>
            <Row gutter={24}>

              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                <Form.Item name='style' label='Style'   rules={[
              {
                required: true,
                message: 'Style is Required',

              },
              {
                //pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9_/`"-',.|\s-]*$/,
                message: `Invalid Style Name`
              }

              
            ]} >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                <Form.Item name='destination' label='Destination '  rules={[
              {
                required: true,
                message: 'Destination is Required',

              },
              {
                //pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9_/`"-',.|\s-]*$/,
                message: `Invalid Destination`
              }

              
            ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                <Form.Item name='seasonCode' label='Season Code '>
                  <Input />
                </Form.Item>
              </Col>
             
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                <Form.Item name='year' label='Year '>
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                <Form.Item name='currency' label='Currency  '>
                  <Input />
                </Form.Item>
              </Col>
           
            </Row>
            <Row  gutter={24} justify={'end'}>
              <Col xs={{ span: 6 }} sm={{ span: 6}} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span: 2 }}><Button onClick={onReset}>Reset</Button></Col>
              <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span:2  }}><Button type='primary' disabled={disable} htmlType='submit'>Submit</Button></Col>
            </Row>
        </Form>
    </Card>
   
  )
}
export default PriceListForm