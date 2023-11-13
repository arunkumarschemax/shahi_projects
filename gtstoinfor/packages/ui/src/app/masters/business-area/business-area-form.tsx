import { BusinessAreaReq } from "@project-management-system/shared-models";
import { BusinessAreaService } from "@project-management-system/shared-services";
import { Button, Card, Form, Row, Col, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";


export interface BusinessAreaFormProps {
    businessAreaData: BusinessAreaReq;
    updateDetails: (busarea: BusinessAreaReq) => void;
    isUpdate: boolean;
    closeForm: () => void;
  }

export const BusinessAreaForm = (props:BusinessAreaFormProps) => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [disable, setDisable] = useState<boolean>(false)
    const service = new BusinessAreaService()


    const onReset = () => {
        form.resetFields();
    };

    const onFinish =(val) => {
        setDisable(false)
    if (props.isUpdate) {
      props.updateDetails(val);
    } else {
      setDisable(false)
      saveBusinessArea(val);
    }
    }

    const saveBusinessArea = (val) => {
        setDisable(true)
        const req = new BusinessAreaReq(val.businessAreaCode,val.businessAreaName,'admin')
        service.createBusinessArea(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
                onReset();
                navigate('/masters/business-area/business-area-view')
            } else{
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        }).catch(err => {
            setDisable(false)
            AlertMessages.getErrorMessage(err)
          })

    }
    
    return(
        <>
        <Card title={props.isUpdate ? 'Update Business Area' : 'Add Business Area'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/masters/business-area/business-area-view')} type={'primary'}>View</Button></span>}>
            <Form form={form} layout="vertical" onFinish={onFinish} initialValues={props.businessAreaData}>
            <Form.Item name='businessAreaId' style={{display:'none'}}>
                        <Input disabled/>
                    </Form.Item>
                <Row gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                    <Form.Item label='Business Area Code' name='businessAreaCode' rules={[{required:true}]}>
                        <Input placeholder="Enter Business Area Code"/>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                    <Form.Item label='Business Area Name' name='businessAreaName' rules={[{required:true}]}>
                        <Input placeholder="Enter Business Area Name"/>
                    </Form.Item>
                </Col>
                </Row>
                <Row  gutter={24} justify={'end'}>
            
              <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span:2  }}><Button type='primary' htmlType='submit'>Submit</Button></Col>
              { props.isUpdate === false && 
            
            <Col xs={{ span: 6 }} sm={{ span: 6}} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span: 2 }}><Button onClick={onReset}>Reset</Button></Col>
          }
            </Row>
            </Form>
        </Card>
        
        </>
    )

}

export default BusinessAreaForm