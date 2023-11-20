import { CaretRightOutlined } from "@ant-design/icons";
import { FeatureSubstituionReq, FgItemCreIdRequest, RMInfoReq, StatusEnum } from "@project-management-system/shared-models";
import { ItemCreationService, ProductStructureService, SubstitutionService } from "@project-management-system/shared-services";
import { Button, Card, Checkbox, Col, Collapse, Descriptions, Form, Row, Select, Space, Table, Tag } from "antd"
import { ColumnProps } from "antd/es/table";
import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";
import DescriptionsItem from "antd/es/descriptions/Item";

const {Option} = Select;
const CheckboxGroup = Checkbox.Group;

export const FeatureSubstitution = () =>{
    const [fgItems,setFgItems] = useState<any[]>([])
    const fgItemService = new ItemCreationService()
    const [form] = Form.useForm()
    const fgrmMappingService = new ProductStructureService()
    const [data,setData] = useState<any[]>([])
    const [checkValues,setCheckValues] = useState<any[]>([])
    const [fgItemId,setFgItemId] = useState<number>()
    const substitutionService = new SubstitutionService()

    useEffect(() => {
        getFgItems()
    },[])

    const getFgItems = () => {
        fgItemService.getFgItemsDropdown().then(res => {
            if(res.status){
                setFgItems(res.data)
            }
        })
    }

    const onFgItemChange = (val,option) => {
        setData([])
        setCheckValues([])
        setFgItemId(option?.key)
        const req = new FgItemCreIdRequest(option.key)
        fgrmMappingService.getFeaturesInfoByFgItem(req).then(res => {
            if(res.status){
                setData(res.data)
            }
        })
        
    }

    const onChange = (checkedValues,e,rowData,info) => {
        const req = new RMInfoReq(e.rmItemId,e.rmItemCode,e.rmSkuId,e.rmSkuCode,info[0].featureId,rowData.fetaureCode,info[0].option,rowData.fgOptionValue,info[0].option,checkedValues.target.value,StatusEnum.OPEN)
        if(checkedValues.target.checked){
            setCheckValues([...checkValues,req]);
        } else{
            const index = checkValues.findIndex(e => e.rmSkuCode === req.rmSkuCode)
            if(index != -1){
                checkValues.splice(index,1)
            }
        }
    }

    const columns : ColumnProps<any>[] = [
         {
          dataIndex:'fgOptionValue',
          title:'Garment'  
         },
         {
            dataIndex:'rm',
            title:'Material',
            render:(text,record) => {
                const featureInfo =data[0]?.featuresInfo
                console.log(featureInfo)
                const info = featureInfo.filter(e => {
                    return e.featureCode === record.fetaureCode
                })
                return(
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* <CheckboxGroup style={{ width: '100%' }} value={checkValues.map((e) => e.optionValue)} onChange={(e) => onChange(e,info)}> */}
                    {info[0]?.optionInfo.map((e) => (
                        <Checkbox value={e.optionValue} key={e.rmItemId} onChange={(val) => onChange(val,e,record,info)}>
                            <Space direction='vertical' size='middle' style={{width:'100%'}}>
                               {/* <Card key={e.optionValue} style={{marginLeft:'1%',backgroundColor:'#FFDAB9',width:'100%',height:'40%'}} size='small'>
                                <p>{e.optionValue}</p>
                                </Card> */}
                                <Tag key={e.optionValue} color="geekblue">{`${e.optionValue} (${e.rmItemType}/${e.rmItemName})`}</Tag>
                            </Space>
                        </Checkbox>
                    ))}
                    {/* </CheckboxGroup> */}
                  </div>
                )
            }
         }
    ]

    const HeaderRow = (props: any,) => {
        const {featureCode,option,featureName} = props
        
        return (
        <div style={{ display: "flex" }}>
            <span>Feature Code : {<b>{featureCode}</b>}</span>
            <span style={{width:'10px'}}></span>
            <span>FeatureName : {<b>{featureName}</b>}</span>
            <span style={{width:'10px'}}></span>
            <span>Option : {<b>{option}</b>}</span>
            {/* <span style={{width:'10px'}}></span>
            <span>Indent Date : {<b>{indentDate}</b>}</span>
            <span style={{width:'10px'}}></span>
            <span>Expected Date : {<b>{expectedDate}</b>}</span> */}
            {/* <span style={{width:'10px'}}></span>
            <span>{<Tag onClick={() => generateBarcode(requestNo)} style={{cursor:'pointer'}}>
                        <BarcodeOutlined />
                    </Tag>}</span> */}

        </div>
        );
    };

    const onSubmit = () => {
        const req = new FeatureSubstituionReq(fgItemId,form.getFieldValue('fgItemCode'),checkValues)
        console.log(req)
        substitutionService.createFeatureSubstitution(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
                onReset()
            } else{
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        })
    }

    const onReset = () => {
        form.resetFields()
        setData([])
        setCheckValues([])
    }


    return(
        <Card title='Feature Substitution'>
            <Form form={form}>
                <Row gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Form.Item name='fgItemCode' label='FG Item Code' rules={[{required:true,message:'FG Item Code is required'}]}>
                    <Select placeholder='Select FG Item Code' showSearch allowClear optionFilterProp="children" onChange={onFgItemChange}>
                        {
                            fgItems.map((e) => {
                                return(
                                    <Option key={e.fgitemId} value={e.itemCode}>{e.itemCode}-{e.itemName}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                </Col>
                { data.length > 0 ? (<>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                    <Descriptions>
                        <DescriptionsItem label={<b style={{color:'green',height:'20px'}}>Style</b>}>{data[0].style} </DescriptionsItem>
                    </Descriptions>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                    <Descriptions>
                        <DescriptionsItem label={<b style={{color:'green',height:'20px'}}>Internal Style</b>}>{data[0].internalStyle} </DescriptionsItem>
                    </Descriptions>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                    <Descriptions>
                        <DescriptionsItem label={<b style={{color:'green',height:'20px'}}>Item Type</b>}>{data[0].itemType} </DescriptionsItem>
                    </Descriptions>
                </Col>
                </>) : (<></>)
                    
                }
               
                </Row>
            </Form>
            {data.length > 0 ? (<>
            
                <Collapse expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />} accordion>
                {data[0]?.featuresInfo.map((e:any,index:any) => (
                    <Collapse.Panel header={<HeaderRow featureCode={e.featureCode} option={e.option} featureName={e.featureName}/>} key={index}>
                        {/* <Space direction="vertical" style={{fontSize:"16px",width:'100%'}}> */}
                            <Table columns={columns} dataSource={e.fgInfo} style={{width:'100%'}} pagination={false} size="small" bordered/>
                        {/* </Space> */}
                    </Collapse.Panel>
                ))
                }
            </Collapse>
            <br/>
            <Row justify={'end'}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 2 }}>
                <Form.Item>
                    <Button onClick={onSubmit} type='primary' disabled={checkValues.length > 0 ? false: true}>Submit</Button>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 2 }}>
                <Form.Item>
                    <Button onClick={onReset}>Reset</Button>
                </Form.Item>
            </Col>
            </Row>
            </>) : (<></>)
           
            }
          
        </Card>
    )

}

export default FeatureSubstitution