import { Button, Card, Form, Row, Col, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertMessages from "../../common/common-functions/alert-messages";
import { ThicknessReq } from "@project-management-system/shared-models";
import { ThicknessService } from "@project-management-system/shared-services";


export interface ThicknessProps {
    ThicknessData: ThicknessReq;
    updateDetails: (Thickness: ThicknessReq) => void;
    isUpdate: boolean;
    closeForm: () => void;
  }

export const ThicknessForm = (props:ThicknessProps) => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [disable, setDisable] = useState<boolean>(false)
    const service = new ThicknessService()


    const onReset = () => {
        form.resetFields();
    };

    const onFinish =(val) => {
        setDisable(false)
    if (props.isUpdate) {
      props.updateDetails(val);
    } else {
      setDisable(false)
      saveThickness(val);
    }
    }

    const saveThickness = (val) => {
        setDisable(true)
        const req = new ThicknessReq(val.thickness,'admin',val.thicknessId)
        service.createThickness(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
                onReset();
                navigate('/masters/thickness/thickness-view')
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
            
            <Card title={<span >Thickness</span>}  headStyle={{ backgroundColor: '#69c0ff', border: 0 }} 
            extra={props.isUpdate==true?"":<Link to='/masters/thickness/thickness-view' ><span style={{color:'white'}}>
                <Button  type={'primary'} >View </Button> </span></Link>}
>
        {/* <Card
        //    title={<span>Commission</span>}
           style={{ textAlign: "center" }}
           headStyle={{ backgroundColor: '#69c0ff', border: 0 }} 
           title={props.isUpdate ? 'Update Thickness' : 'Add Thickness'}
            extra={(props.isUpdate === false) && <span><Button 
            onClick={() => navigate('/masters/Thickness/Thickness-view')} 
            type={'primary'}>View</Button></span>}> */}
            <Form form={form} layout="vertical" onFinish={onFinish} initialValues={props.ThicknessData}>
            <Form.Item name='thicknessId' style={{display:'none'}}>
                        <Input disabled/>
                    </Form.Item>
                <Row gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                    <Form.Item label='Thickness' name='thickness' rules={[{required:true}]}>
                        <Input placeholder="Enter Thickness"/>
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

export default ThicknessForm