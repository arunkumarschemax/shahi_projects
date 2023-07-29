import { Button, Card, Checkbox, Col, Descriptions, Form, Input, Row } from "antd"
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useState } from "react";



export const ComponentsMappingForm = () => {
    const [form] = Form.useForm()
    const [style,setStyle] = useState<string>('');
    const [garmentCategory,setGarmentCategory] = useState<string>('');
    const [garment,setGarment] = useState<string>('');
    const [components,setComponents] = useState<any[]>([]);

    const onChange = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
        setComponents(checkedValues)
      };

    const onFinish = (values) => {
        console.log(values)
    }

    const onStyleChange = (val) => {
        console.log(val,'----------')
        setStyle(val)
    }

    const onGarmentCategoryChange = (val) => {
        setGarmentCategory(val)
    }

    const onGarmentChange = (val) => {
        setGarment(val)
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
                    <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                        <Row>
                        <Col span={8}>
                            <Checkbox value="A">A</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="B">B</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="C">C</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="D">D</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="E">E</Checkbox>
                        </Col>
                        </Row>
                    </Checkbox.Group>
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
                            <Row>
                                <Col>
                                {components.map((e) => {
                                    return(

                                        <Descriptions.Item>{e}</Descriptions.Item>
                                    )
                                    
                                })}
                                </Col>
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
                        <Button>Reset</Button>
                    </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    )

}

export default ComponentsMappingForm