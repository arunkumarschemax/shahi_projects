import { Button, Card, Form, Row, Col, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertMessages from "../common-functions/alert-messages";
import { CategoryReq, ColumnReq, WeightReq } from "@project-management-system/shared-models";
import { CategoryService, ColumnService, WeightService } from "@project-management-system/shared-services";


export interface WeightProps {
    columnData:WeightReq;
    updateDetails: (column: WeightReq) => void;
    isUpdate: boolean;
    closeForm: () => void;
  }

export const WeightForm = (props:WeightProps) => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [disable, setDisable] = useState<boolean>(false)
    const service = new WeightService()


    const onReset = () => {
        form.resetFields();
    };

    const onFinish =(val) => {
        setDisable(false)
    if (props.isUpdate) {
      props.updateDetails(val);
    } else {
      setDisable(false)
      savecolumn(val);
    }
    }

    const savecolumn = (val:WeightReq) => {
        setDisable(true)
        console.log(val,"val")
        service.createWeight(val).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
                onReset();
                navigate('/trim-master/weight/weight-view')
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
                    <Card title={<span >Weight</span>}  headStyle={{ backgroundColor: '#69c0ff', border: 0 }} 
            extra={props.isUpdate==true?"":<Link to='/trim-master/weight/weight-view' ><span style={{color:'white'}}>
                <Button  type={'primary'} >View </Button> </span></Link>}
>
        {/* <Card
        //    title={<span>Commission</span>}
           style={{ textAlign: "center" }}
           headStyle={{ backgroundColor: '#69c0ff', border: 0 }} 
           title={props.isUpdate ? 'Update column' : 'Add column'}
            extra={(props.isUpdate === false) && <span><Button 
            onClick={() => navigate('/masters/column/column-view')} 
            type={'primary'}>View</Button></span>}> */}
            <Form form={form} layout="vertical" onFinish={onFinish} initialValues={props.columnData}>
            <Form.Item name='weightId' style={{display:'none'}}>
                        <Input disabled/>
                    </Form.Item>
                <Row gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                    <Form.Item label='Weight' name='weight' rules={[{required:true}]}>
                        <Input placeholder="Enter Weight"/>
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

export default WeightForm