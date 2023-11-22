import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { GarmentCategoryDto } from '@project-management-system/shared-models';
import { GarmentCategoryService } from '@project-management-system/shared-services';
import AlertMessages from '../../common/common-functions/alert-messages';
import { __values } from 'tslib';
import FormItem from 'antd/es/form/FormItem';
import { useState } from 'react';



export interface GarmentCategoryProps{
    GarmentCategoryData:GarmentCategoryDto;
    updateItem:(GarmentCategoryData:GarmentCategoryDto)=>void
    isUpdate:boolean;
    closeForm:()=>void;
}

export const GarmentCategoryForm=(props:GarmentCategoryProps)=>{
    const [form] = Form.useForm();
        const [disable, setDisable] = useState<boolean>(false)
        const service = new GarmentCategoryService();
        let history =useLocation();
        const navigate = useNavigate();

        let createdUser="";
        if(!props.isUpdate){
          createdUser= 'admin';
        }
 
        const saveGarment=(garment:GarmentCategoryDto)=>{
          garment.garmentCategoryId=0;
          service.createGarmentCategories(garment).then((res) => {
            setDisable(false)
            if (res.status) {
              AlertMessages.getSuccessMessage('garment category Created Successfully');
              navigate("/masters/garmentcategory/garmentcategory-view");
              onReset();
            }  else {
                AlertMessages.getErrorMessage(res.internalMessage);
              }
          }).catch(err => {
            setDisable(false);
            console.error(err); // Log the error message to the console
            AlertMessages.getErrorMessage(err.message);
          })
        }
      
        const saveData = (values:GarmentCategoryDto) => {
          setDisable(false)
        // console.log(values,'emooooooooo')
          if(props.isUpdate){
            props.updateItem(values);
          }else{
            setDisable(false)
            saveGarment(values);
          }
        
        };


  const onReset = () => {
    form.resetFields();
  };
  return(
    <Card title={<span >Garment Category </span>} 
    extra={props.isUpdate==true?"":<Link to='/masters/garmentcategory/garmentcategory-view' ><span style={{color:'white'}} ><Button type={'primary'} >View </Button> </span></Link>} >

<Form 
    layout={'vertical'}
    form={form}
    initialValues={props.GarmentCategoryData}
    name="control-hooks"
    onFinish={saveData}>
<FormItem name="garmentCategoryId" style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<FormItem name="createdUser"  initialValue={createdUser} style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<Row gutter={24}>
   <Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}> <Form.Item
          name="garmentCategory"
          label="Garment Category"
          
          rules={[
            {
              required: true,
              message:' Garment Category Is Required'
            },
            {
              pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
              message: `Garment Category Should contain only alphabets.`
            }
          ]}
        >
          <Input placeholder='Enter Garment Category'/>
        </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Form.Item
              name="remarks"
              label="Remarks">
              <Input placeholder='Enter Remarks'/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" disabled={disable} htmlType="submit">
              Submit
            </Button>
             {(props.isUpdate===false) && 
         <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
            Reset
          </Button>
           } 
          </Col>
        </Row>
        </Form>
</Card>

  )
}
