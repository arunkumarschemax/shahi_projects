import { ComponentMappingModel } from "@project-management-system/shared-models";
import { ComponentMappingService, GarmentCategoryService, GarmentService, StyleService } from "@project-management-system/shared-services";
import { Button, Card, Checkbox, Col, Descriptions, Form, Input, Row, Select } from "antd"
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const CheckboxGroup = Checkbox.Group;
const {Option}= Select;


export const ComponentsMappingForm = () => {
    const [form] = Form.useForm()
    const [style,setStyle] = useState<string>('');
    const [garmentCategory,setGarmentCategory] = useState<string>('');
    const [garment,setGarment] = useState<string>('');
    const [components,setComponents] = useState<any[]>([]);
    const [styleInfo,setStyleInfo] = useState<any[]>([]);
    const [garmentCategoryInfo,setGarmentCategoryInfo] = useState<any[]>([])
    const [garmentInfo,setGarmentInfo] = useState<any[]>([])


    const servcie = new ComponentMappingService()
    const styleService = new StyleService()
    const garmentCategoryService = new GarmentCategoryService()
    const germentService = new GarmentService()

    useEffect(() => {
        getStyles();
        getGarmentCategories();
        getGarments()
    },[])

    const getStyles = () => {
        styleService.getAllStyle().then(res => {
            if(res.status){
                setStyleInfo(res.data)
            }
        })

    }

    const getGarmentCategories = () => {
        garmentCategoryService.getActiveGarmentCategories().then(res => {
            if(res.status){
                setGarmentCategoryInfo(res.data)
            }
        })

    }

    const getGarments = () => {
        germentService.getAllGarments().then(res => {
            if(res.status){
                setGarmentInfo(res.data)
            }
        })

    }

    const onChange = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
        setComponents(checkedValues)
    };

    const options = ['Front', 'Back', 'Collar', 'Sleeves', 'Pockets', 'Logo On Pocket'];

    const onFinish = (values) => {
        const req = new ComponentMappingModel(0,values.styleId,values.garmentCategoryId,values.garmentId,components,'admin','',true,1)
        console.log(req,'-------------req')
        servcie.createComponentMap(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
            } else{
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        })
    }


    const onStyleChange = (val,option) => {
        console.log(option,'------------option')
        setStyle(option?.key)
    }

    const onGarmentCategoryChange = (val,option) => {
        setGarmentCategory(option?.key)
    }

    const onGarmentChange = (val,option) => {
        setGarment(option?.key)
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
                        {/* <Input onChange={(val) => onStyleChange(val)}/> */}
                        <Select
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        placeholder='Select Style'
                        onChange={onStyleChange}
                        >
                            {
                                styleInfo.map((e) => {
                                    return(
                                        <Option key={e.style} value={e.styleId}>{e.style}--{e.description}</Option>
                                    )
                                })
                            }
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item label='Garment Category' name='garmentCategoryId'>
                        {/* <Input onChange={onGarmentCategoryChange}/> */}
                        <Select
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        onChange={onGarmentCategoryChange}
                        placeholder='Select Garment Category'
                        >
                            {
                                garmentCategoryInfo.map((e) => {
                                    return(
                                        <Option key={e.garmentCategory} value={e.garmentCategoryId}>{e.garmentCategory}</Option>
                                    )
                                })
                            }
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                      <Form.Item label='Garment' name='garmentId'>
                        {/* <Input onChange={onGarmentChange}/> */}
                        <Select
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        onChange={onGarmentChange}
                        placeholder='Select Garment'
                        >
                            {
                                garmentInfo.map((e) => {
                                    return(
                                        <Option key={e.garmentName} value={e.garmentId}>{e.garmentName}</Option>
                                    )
                                })
                            }
                        </Select>
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