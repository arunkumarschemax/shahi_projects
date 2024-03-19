import { HMStyleSharedService } from '@project-management-system/shared-services'
import { Button, Card, Col, Form, Input, Row, Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlertMessages from '../../../common/common-functions/alert-messages'
import { HMStylesModelDto } from '@project-management-system/shared-models'

export interface hmStyleProps {
    hmStyleData: any;
    updateHmStyle: (hmStyle: any) => void;
    isUpdate: boolean;
    closeForm: () => void;
    setDrawerVisible: any;
    getHmStyle?: () => void;
  }

const HMStyleCreation = (props: hmStyleProps) => {

    const navigate=useNavigate()
    const service = new HMStyleSharedService();
    const [form] = Form.useForm();
    const {Option} = Select
    const [style,setStyle] =useState<any[]>([]);
    
    const [initialValues, setInitialValues] = useState();

    useEffect(() => {
        if (props.hmStyleData) {
          const valuesToSet = { ...props.hmStyleData };
    
          if (props.hmStyleData) {
            form.setFieldsValue({
              hmId: props.hmStyleData.hmId,
              styleNumber: props.hmStyleData.styleNumber,
              teflonSheetSize: props.hmStyleData.teflonSheetSize,
              consumption: props.hmStyleData.consumption,
              
                    });
          } else {
            form.setFieldsValue({
              hmId: props.hmStyleData.hmId,
              styleNumber: props.hmStyleData.styleNumber,
              teflonSheetSize: props.hmStyleData.teflonSheetSize,
              consumption: props.hmStyleData.consumption,
 
            });
          }
    
          setInitialValues(valuesToSet);
        }
    
      }, [props.hmStyleData]);
    

    const onFinish = (hmDto: HMStylesModelDto) => {  
        if (props.isUpdate) {
            props.updateHmStyle(hmDto)
          }  else
       { service.createHMStyle(hmDto).then(res => {
            if (res.status) {
                AlertMessages.getSuccessMessage(res.internalMessage)
                setTimeout(() => {
                    message.success('Submitted successfully');
                    navigate("/bom/hm-style-view")
                }, 500);;
            }
        }).catch(err => {
            AlertMessages.getErrorMessage(err.message);
        })}
    }

    
useEffect(() => {
    getAllStyles();
},[])

    const clearData = () => {
        form.resetFields()
      }

      const getAllStyles = () => {
        service
          .getAllStyles().then((res) => {
            if (res.status) {
              setStyle(res.data);
            } else {
              setStyle([]);
            }
          })
        
      };
      let createdUser = "";

      if (!props.isUpdate) {
        createdUser = localStorage.getItem("createdUser");
      }



  return (
    <div>
        <Card   title={<span style={{fontWeight: "bold"}}>HM Styles</span>}
                 extra={
                   props.isUpdate == true ? (
                     ''
                   ) : (
                     <Link to="/bom/hm-style-view">
                       <Button className="panel_button" type='primary'>View </Button>
                     </Link>
                   )
                 }
               >
           <Form layout="vertical" form={form} onFinish={onFinish} initialValues={initialValues}>
           <Row gutter={24}>
                    <Form.Item name="hmId" 
                    hidden={true} 
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="versionFlag" hidden  >
          <Input />
        </Form.Item>
        <Form.Item style={{ display: 'none' }} name="createdUser" initialValue={createdUser}>
          <Input hidden />
        </Form.Item>
                    
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="styleNumber" label="Style Number" >
                         <Select  placeholder='Select Style Number' style={{textAlign:"center"}}  showSearch >
                         {style.map((item) => (
                           <Option key={item.id} value={item.styleNumber}>{item.styleNumber}</Option>
                         ))}
                       </Select>
                    </Form.Item>
                </Col>

                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="teflonSheetSize" label="Teflon Sheet Size">
                            <Input placeholder='Enter Teflon Sheet Size' />
                    </Form.Item>
                </Col>
                    
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 5 }} xl={{ span: 5}} >
                    <Form.Item name="consumption" label="Consumption" >
                            <Input placeholder='Enter Consumption ' />
                    </Form.Item>
                </Col>
                    
                </Row>
                
                <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit" style={{backgroundColor:"green"}}>
                                Submit
                            </Button>
                            <Button htmlType="button" style={{ margin: '0 14px' }}
                                onClick={clearData} >
                                Reset
                            </Button>
                        </Col>
                </Row>

            </Form> 
        </Card>
    </div>
  )
}

export default HMStyleCreation