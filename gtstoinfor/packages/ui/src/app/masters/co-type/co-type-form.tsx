import { BusinessAreaReq, CoTypeReq } from "@project-management-system/shared-models";
import { BusinessAreaService, CoTypeService } from "@project-management-system/shared-services";
import { Button, Card, Form, Row, Col, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";


export interface CoTypeProps {
    coTypeData: CoTypeReq;
    updateDetails: (cotype: CoTypeReq) => void;
    isUpdate: boolean;
    closeForm: () => void;
  }

export const CoTypeForm = (props:CoTypeProps) => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [disable, setDisable] = useState<boolean>(false)
    const service = new CoTypeService()


    const onReset = () => {
        form.resetFields();
    };

    const onFinish =(val) => {
        setDisable(false)
    if (props.isUpdate) {
      props.updateDetails(val);
    } else {
      setDisable(false)
      saveCoType(val);
    }
    }

    const saveCoType = (val) => {
        setDisable(true)
        const req = new CoTypeReq(val.coType,'admin')
        service.createCoType(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
                onReset();
                navigate('/masters/co-type/co-type-view')
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
        <Card title={props.isUpdate ? 'Update Co Type' : 'Add Co Type'} extra={(props.isUpdate === false) && <span><Button onClick={() => navigate('/masters/co-type/co-type-view')} type={'primary'}>View</Button></span>}>
            <Form form={form} layout="vertical" onFinish={onFinish} initialValues={props.coTypeData}>
            <Form.Item name='coTypeId' style={{display:'none'}}>
                        <Input disabled/>
                    </Form.Item>
                <Row gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                    <Form.Item label='Co Type' name='coType' rules={[{required:true}]}>
                        <Input placeholder="Enter Co Type"/>
                    </Form.Item>
                </Col>
                </Row>
                <Row  gutter={24} justify={'end'}>
            { props.isUpdate === false && 
            
              <Col xs={{ span: 6 }} sm={{ span: 6}} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span: 2 }}><Button onClick={onReset}>Reset</Button></Col>
            }
              <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span:2  }}><Button type='primary' htmlType='submit'>Submit</Button></Col>
            </Row>
            </Form>
        </Card>
        
        </>
    )

}

export default CoTypeForm