import React from 'react';
import { Card, Form, Radio, Select, Button, Row, Col, DatePicker, Input, message, MessageArgsProps } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DocumentDto } from '@project-management-system/shared-models';
import { DocumentService } from '@project-management-system/shared-services';

const { Option } = Select;
export interface DocumentFormprops{
    data : any;
    updateDetails : (route : any) => void;
    isUpdate: boolean;
    closeForm: () => void;
  }
const DocumentForm = (props:DocumentFormprops) => {

const services = new DocumentService ();
const navigate = useNavigate();
const [form] = Form.useForm();

    const save = (values: DocumentDto) => {
        form.validateFields().then(() =>{
            services.createDocument(values).then(res => {
                if (res.status) {
                    setTimeout(() => {
                        message.success("Created Successfully");
                        form.resetFields();
                    }, 1000);
                } else {
                    message.error(res.internalMessage);
                }
            }).catch((err: { message: any; }) => {
                console.log(err.message);
                alert(err.message)
            })
        })
      
    };

    const handleReset = () => {
        form.resetFields();
    };

    const onFinish = (val: DocumentDto) => {
        if(props.isUpdate) {
            props.updateDetails(val);
            console.log(val)
            console.log(props.updateDetails)
        } else {
          console.log(val)
          console.log(props.isUpdate)
          save(val);
        }
        
      }

    return (
        <div>
              <Card  title={<span style={{ color: "Black",}}>Document</span>}  headStyle={{ backgroundColor:'transparent'}} extra={<Link to='/masters/document-grid' >{(props.isUpdate === false) && <Button className='panel_button' type={'primary'}>View </Button>}</Link>} size="small">
                <Form
                    form={form}
                    onFinish={onFinish} initialValues={props.data}>
                    <Row gutter={10}>
                     <Form.Item
                        name="id" style={{ display: "none" }} >
                        <Input hidden />
                      </Form.Item>  
                        <Col span={8}>
                            <Form.Item name="documentName" label="Document Name"
                                rules={[
                                    { required: true, message: "Enter Document Name" }
                                ]}>
                               <Input/>
                            </Form.Item>
                        </Col>               
                    </Row>
                    <Row justify="end">
                        <Col>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                    Submit
                                </Button>
                                <Button htmlType="reset" onClick={handleReset} >
                                    Reset
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>

        </div>
    );
};

export default DocumentForm;