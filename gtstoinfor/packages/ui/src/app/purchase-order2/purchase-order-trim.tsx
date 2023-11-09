import { M3MastersCategoryReq } from "@project-management-system/shared-models";
import { ColourService, M3MastersService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Select, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import React, { useEffect } from "react";
import { useState } from "react";

export const PurchaseOrderTrim = () =>{
    const [trimForm] = Form.useForm()
    const {Option} = Select
    const [update, setUpdate] = useState<boolean>(false)
    const [page, setPage] = React.useState(1);
    const [trimtableVisible,setTrimtableVisible] = useState<boolean>(false)
    const [trimTableData,setTrimTableData] = useState<any[]>([])
    const [trimM3Code,setTrimM3Code] = useState<any[]>([])

    const [color,setColor] = useState<any[]>([])
    const colorService = new ColourService();
    const m3MasterService = new M3MastersService()


    useEffect(() =>{
        getColor()
        getM3TrimCodes()
    },[])

    const getColor = () => {
        colorService.getAllActiveColour().then(res =>{
            if(res.status) {
                setColor(res.data)
            }
        })
    }
    const getM3TrimCodes = () => {
        const req = new M3MastersCategoryReq('Trim')
        m3MasterService.getByCategory(req).then(res => {
            if(res.status){
                setTrimM3Code(res.data)
            }
        })
    }
    const columns : ColumnProps<any>[] =[
        {
            title: 'S No',
            key: 'sno',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            title:'Content',
            dataIndex:'content'
        },
        {
            title:'Fabric Type',
            dataIndex:'fabricTypeName',
            
        },
        {
            title:'Weave',
            dataIndex:'weaveName',
        },
        {
            title:'Weight',
            dataIndex:'weight',
        },
        {
            title:'Width',
            dataIndex:'width'
        },
        {
            title:'Construction',
            dataIndex:'construction'
        },
        {
            title:'Yarn Count',
            dataIndex:'yarnCount'
        },
        {
            title:'Finish',
            dataIndex:'finish',
        },
        {
            title:'Shrinkage',
            dataIndex:'shrinkage',
        },
        {
            title:'M3 Fabric Code',
            dataIndex:'m3FabricCode',
        },
        {
            title:'Color',
            dataIndex:'colorName',
        },
    ]

    const onColorChange= (value,option) =>{
        trimForm.setFieldsValue({colorname:option.name?option.name:''})
    }

    return(
        <Card title='trim Details'>
            <Form form={trimForm}>
                <Row gutter={8}>
                    <Form.Item name={'poTrimId'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'poTrimId'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'trimCode'} hidden><Input></Input></Form.Item>
                    <Form.Item name={'colorname'} hidden><Input></Input></Form.Item>


                     <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name={'trimType'} label={'Trim type'}
                         rules={[
                            {
                              required: true,
                              message: "Trim Type Is Required",
                            },
                            {
                                pattern:/^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                                message: `Should contain only alphabets.`,
                            },
                        ]}
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
                        <Form.Item
                        name="trimCode"
                        label="Trim Code"
                        rules={[
                            {
                                required: true,
                                message: "Trim Code Is Required",
                            },
                            {
                                pattern:/^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                                message: `Should contain only alphabets.`,
                            },
                        ]}>
                            <Input placeholder="Enter Trim Code" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }} >
                            <Form.Item
                            name="color"
                            label="Color"
                        >
                            <Select
                            allowClear
                            showSearch
                            optionFilterProp="children"
                            placeholder="Select Color"
                            onChange={onColorChange}
                            >
                                {color.map((e) => {
                                  return (
                                    <Option key={e.colourId} value={e.colourId} name={e.colour}>
                                  {e.colour}
                                </Option>
                              );
                            })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name={'quantity'} label={'Quantity'}>
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='m3TrimCode' label='M3 Trim Code' rules={[{required:true,message:'M3 code is required'}]}>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select M3 Code'>
                            {trimM3Code.map(e => {
                                return(
                                    <Option key={e.m3Code} value={e.m3Code}> {e.m3Code}-{e.category}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    </Col>
                     <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name={'description'} label={'Description'}>
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name={'consumption'} label={'Consumption'}>
                            <Input></Input>
                        </Form.Item>
                    </Col> */}
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                        <Form.Item name={'remarks'} label={'Remarks'}>
                            <Input></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={'end'}>
                <Button type='primary' htmlType="submit">{update ?'Update':'Add'}</Button>
                </Row>
                <Row>
                {trimtableVisible ? <Table columns={columns} dataSource={trimTableData}
                     />
                :<></>}
                </Row>
            </Form>

        </Card>
    )

}
export default PurchaseOrderTrim;