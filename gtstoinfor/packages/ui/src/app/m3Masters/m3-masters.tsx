import { M3MastersReq } from "@project-management-system/shared-models"
import { M3MastersService } from "@project-management-system/shared-services"
import { Button, Card, Col, Form, Input, Row } from "antd"
import { useNavigate } from "react-router-dom"
import AlertMessages from "../common/common-functions/alert-messages"
import { useState } from "react"
export interface M3MastersProps {
    m3MasterData: M3MastersReq;
    updateDetails: (m3MasterData: M3MastersReq) => void;
    isUpdate: boolean;
  //   saveItem:(varirantData:VariantDto) => void;
    closeForm: () => void;
  }
export const M3Masters = (
    props: M3MastersProps
) => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const service = new M3MastersService()
    const [disable, setDisable] = useState<boolean>(false)

    const onSubmit = (val) => {
        console.log(val,'frontend')
        const req = new M3MastersReq(val.category,val.m3Code,val.m3Id)
        
        service.create(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
                form.resetFields()
            } else{
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        })
    }
    const saveData = (values: M3MastersReq) => {
        setDisable(false)
        if(props.isUpdate){
          props.updateDetails(values);          
        }else{
          setDisable(false)
          onSubmit(values);
        }
      
      };
    return(
        <Card  title={props.isUpdate ? 'Update Item Codes' : 'Item Codes'} extra={props.isUpdate === true?"":<span><Button onClick={() => navigate('/masters/m3-itemcodes-view')} type={'primary'}>View</Button></span>}headStyle={{ backgroundColor: '#69c0ff', border: 0 }}>
            <Form form={form} layout="vertical" onFinish={saveData} initialValues={props.m3MasterData}>
                <Row gutter={24}>
                <Form.Item name="m3Id" style={{display:'none'}}>
                    <Input hidden/>
                </Form.Item>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name='category' label='Category' rules={[{required:true,message:'Category is required'}]}>
                            <Input placeholder="Enter Category"/>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} >
                        <Form.Item name='m3Code' label='M3 Code' rules={[{required:true,message:'M3 is required'}]}>
                            <Input placeholder="Enter M3 Code"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={'end'}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }}>
                    <Button type="primary" htmlType='submit'>Submit</Button>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }}>
                    <Button danger>Reset</Button>
                </Col>
                </Row>
            </Form>

        </Card>
    )

}

export default M3Masters