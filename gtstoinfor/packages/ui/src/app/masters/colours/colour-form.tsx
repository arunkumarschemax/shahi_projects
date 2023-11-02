import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ColourDto, DivisionDto } from '@project-management-system/shared-models';
import { ColourService, DivisionService } from '@project-management-system/shared-services';
import { __values } from 'tslib';
import AlertMessages from '../../common/common-functions/alert-messages';
import FormItem from 'antd/es/form/FormItem';

export interface ColourFromProps{
  
    colourData: ColourDto;
    updateItem: (colourData:ColourDto)=>void
        isUpdate:boolean;
        closeForm:()=>void;
    
}


export const ColourForm=(props:ColourFromProps)=>{
    const [form] = Form.useForm();
    const [disable, setDisable] = useState<boolean>(false)
    const [division, setdivision] = useState<number>(null);
    const [DivsionData, setDivsionData] = useState<DivisionDto[]>([]);
    const { Option } = Select;
    const services= new DivisionService();
    const service = new ColourService();
    let history =useLocation();
    let navigate = useNavigate()

    let createdUser="";
    if(!props.isUpdate){
        createdUser= 'admin';
    }

    useEffect(()=>{
      getAllDivison();

    },[])

    const getAllDivison=()=>{
      services.getAllActiveDivision().then(res=>{
        if(res.status){
          setDivsionData(res.data);
      
        }else{
          if (res.status) {
            AlertMessages.getErrorMessage(res.internalMessage);
          } else {
            AlertMessages.getErrorMessage(res.internalMessage);
          }
        }
      }).catch(err=>{
        AlertMessages.getErrorMessage(err.message);
      
      })
        }
        const handleItemCategory = (value, item) => {
          setdivision(value);
        }
    const savePayment = (colourData:ColourDto ) => {
        // setDisable(true)
        colourData.colourId= 0;
        service.createColour(colourData).then((res) => {
          setDisable(false)
            if (res.status) {
              AlertMessages.getSuccessMessage('Colour Created Successfully');
          navigate('/masters/colour/colour-view')
              onReset();
            } else {
                AlertMessages.getErrorMessage(res.internalMessage);
            }
          })
          .catch((err) => {
            setDisable(false)
            AlertMessages.getErrorMessage(err.message);
          });
        }
          const saveData =(values:ColourDto)=>{
            setDisable(false)
            if (props.isUpdate) {
                props.updateItem(values);
              } else {
                setDisable(false)
                savePayment(values);
              }
          }
          const onReset = () => {
            form.resetFields();
          };

      

      return(
        <Card title={props.isUpdate ?
        'Colours':'Colours'}
        //  headStyle={{ border: 0 }} 
        extra={(props.isUpdate ===false) && <span ><Button onClick={()=> navigate('/masters/colour/colour-view')} 
          type={'primary'} >View </Button> </span>}>
       
<Form
layout={'vertical'}
form={form}
initialValues={props.colourData}
name="control-hooks"
onFinish={saveData}>

<FormItem name="colourId" style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<FormItem name="createdUser"  initialValue={createdUser} style={{display:'none'}}>
    <Input hidden/>
</FormItem>
<Row gutter={24}>
<Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            {" "}
            <Form.Item name="divisionId" label="Division Name"
           rules={[
            {
              required: true,
              message: 'Division Name is required'
            },
          ]} >

            <Select placeholder="select Divison Name"
            onSelect={handleItemCategory}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            >
               {DivsionData?.map(Drop=>{
            return<Option key={Drop.divisionId} value={Drop.divisionId}>{Drop.divisionName}</Option>
           })

           }
            </Select>
          </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            {" "}
            <Form.Item
              name="optionGroup"
              label="Option Group"
              rules={[
                {
                  required: true,
                  message: " Option Group Is Required",
                },
                {
                  pattern:
                    /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                  message: `Option Group Should contain only alphabets.`,
                },
              ]}
            >
                <Input placeholder='Enter Option Group'/>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            {" "}
            <Form.Item
              name="colourCode"
              label="Colour Code"
              rules={[
                {
                  required: true,
                  message: " Colour Code Is Required",
                },
                // {
                //   pattern:
                //     /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                //   message: `Colour Code Should contain only alphabets.`,
                // },
              ]}
            >
                <Input placeholder='Enter Colour Code'/>
            </Form.Item>
          </Col>
<Col xs={{span:24}} sm={{span:24}} md={{span:8}} lg={{span:8}} xl={{span:6}}>
   <Form.Item
          name="colour"
          label="Colour"
          rules={[
            {
              required: true,
              message:' Colour Is Required'
            },
            {
              pattern: /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
              message: `Colour Should contain only alphabets.`
            }
          ]}
        >
          <Input placeholder='Enter Colour'/>
        </Form.Item>
        </Col>
</Row>
<Row>
<Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            {" "}
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: " Description Is Required",
                },
                // {
                //   pattern:
                //     /^[^-\s\\0-9\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z ]*$/,
                //   message: `Description Should contain only alphabets.`,
                // },
              ]}
            >
                <Input placeholder='Enter Description'/>
            </Form.Item>
          </Col>
</Row>

<Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" disabled={disable} htmlType="submit">
              Submit
            </Button>
            {/* {(props.isUpdate===false) && */}
         <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
            Reset
          </Button>
          {/* } */}
          </Col>
        </Row>
</Form>
       </Card>
      )
}