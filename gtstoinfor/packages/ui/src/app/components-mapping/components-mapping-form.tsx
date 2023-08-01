import { ComponentMappingDto } from "@project-management-system/shared-models";
import { ComponentMappingService } from "@project-management-system/shared-services";
import { Button, Card, Checkbox, Col, Descriptions, Form, Input, Row } from "antd"
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const CheckboxGroup = Checkbox.Group;


export const ComponentsMappingForm = () => {
    const [form] = Form.useForm()
    const [style,setStyle] = useState<string>('');
    const [garmentCategory,setGarmentCategory] = useState<string>('');
    const [garment,setGarment] = useState<string>('');
    const [components,setComponents] = useState<any[]>([]);

    const servcie = new ComponentMappingService()

    const onChange = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
        setComponents(checkedValues)
    };

    const options = ['Front', 'Back', 'Collar', 'Sleeves', 'Pockets', 'Logo On Pocket'];

    const handleClearButtonClick = () => {
        setComponents([]); // Clear the selection by setting an empty array
      };

    const onFinish = (values) => {
        const req = new ComponentMappingDto(0,values.styleId,values.garmentCategoryId,values.garmentId,components)
        console.log(req,'-------------req')
        servcie.createComponentMap(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
            } else{
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        })

    }

    const onStyleChange = (val) => {
        setStyle(val)
    }

    const onGarmentCategoryChange = (val) => {
        setGarmentCategory(val)
    }

    const onGarmentChange = (val) => {
        setGarment(val)
    }

    const onReset = () => {
        form.resetFields()
        setComponents([]); // Clear the selection by setting an empty array

    }

    return(
        <Card title='Components Mapping'>
            <Form form={form} onFinish={onFinish}>
                <Row gutter={24}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item label='Style' name='styleId'>
                        <Input onChange={(val) => onStyleChange(val)}/>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item label='Garment Category' name='garmentCategoryId'>
                        <Input onChange={onGarmentCategoryChange}/>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item label='Garment' name='garmentId'>
                        <Input onChange={onGarmentChange}/>
                      </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                    <Card>
                        <h1>Map Components</h1>
                    {/* <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                        <Row>
                        <Col span={8}>
                            <Checkbox value="Front">Front</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="Back">Back</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="Collar">Collar</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="Sleeves">Sleeves</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="Pockets">Pockets</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="Logo On Pocket">Logo On Pocket</Checkbox>
                        </Col>
                        </Row>
                    </Checkbox.Group> */}
                    <CheckboxGroup style={{ width: '100%' }} value={components} onChange={onChange}>
                    <Row>
                        {options.map((option) => (
                        <Col span={8} key={option}>
                            <Checkbox value={option}>{option}</Checkbox>
                        </Col>
                        ))}
                    </Row>
                    </CheckboxGroup>
                    </Card>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                        <Card>
                            <h1>Mapped Components</h1>
                            <Row>
                                <Col>
                                <Descriptions.Item >{<b>{`Style : `} </b>}{`${style? style : 'N/A'}`} </Descriptions.Item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Descriptions.Item >{<b>{`Garment Category : `} </b>}{`${garmentCategory? garmentCategory : 'N/A'}`} </Descriptions.Item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Descriptions.Item >{<b>{`Garment : `} </b>}{`${garment? garment : 'N/A'}`} </Descriptions.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                {components.map((e) => {
                                    return(
                                        <Card style={{marginLeft:'1%',backgroundColor:'#FFDAB9'}}>
                                        <Descriptions.Item>{e}</Descriptions.Item>
                                        </Card>
                                    )
                                    
                                })}
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row justify={'end'}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 2 }}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 2 }}>
                    <Form.Item>
                        <Button onClick={onReset}>Reset</Button>
                    </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    )

}

export default ComponentsMappingForm