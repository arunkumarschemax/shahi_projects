import { RMCreFilterRequest, RmItemTypeEnum, RmSkuFeatureReq, RmSkuReq, RmStatusEnum } from "@project-management-system/shared-models";
import { FabricStructuresService, FeatureService, ProductGroupService, RmCreationService, RmSkuService } from "@project-management-system/shared-services";
import { Badge, Button, Card, Checkbox, Col, Form ,Row,Select, Space, Tag, Tooltip} from "antd"
import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";
import { Link } from "react-router-dom";

const {Option} = Select;
const CheckboxGroup = Checkbox.Group;

export const RmSkusGeneration = () => {
    const [itemCodes,setItemCodes] = useState<any[]>([])
    const [itemId,setItemId] = useState<number>(undefined)
    const [featuresInfo,setFeaturesInfo] = useState<any[]>([])
    const [features,setFeatures] = useState<any[]>([])
    const service = new RmSkuService()
    const [form] = Form.useForm()
    const rmItemService = new RmCreationService()
    const featureService = new FeatureService()
    const productGroupService = new ProductGroupService()
    const [proGroups,setProGroups] = useState<any[]>([])
    

    useEffect(() => {
        getFeatures()
        getProdGroups()
    },[])

    const getProdGroups = () => {
        productGroupService.getAllActiveProductGroup().then(res => {
            if(res.status){
                setProGroups(res.data)
            }
        })
    }

    const getFeatures = () => {
        featureService.getFeaturesInfo().then(res => {
            if(res.status){
                setFeaturesInfo(res.data)
            }
        })
    } 

    const onItemCodeChange = (val,option) => {
        setItemId(option?.itemId)
    }

    const onChange = (checkedValues) => {
        const selectedComponentDetails = featuresInfo.filter(
          (option) => checkedValues.includes(option.featureId)
        );
        setFeatures(selectedComponentDetails);
    };

    const onReset = () => {
        form.resetFields()
        setFeatures([])
    }

    const onFinish = (val) => {
        let featureReq = []
        for(const rec of features){
            featureReq.push(new RmSkuFeatureReq(rec.featureCode,rec.optionsData))
        }
        const req = new RmSkuReq(itemId,val.itemType,featureReq,RmStatusEnum.OPEN,val.itemCode,'admin')
        service.createRmSkus(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
                onReset()
            } else{
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        })
    }

    const onItemTypeChange = (val,option) => {
       const req = new RMCreFilterRequest()
       req.productGroup = option?.key
       rmItemService.getAllRMItems(req).then(res => {
        if(res.status){
            setItemCodes(res.data)
        }
       })
       
    }

    return (
        <Card title='Rm Feature Mapping & Rm Sku Generation' extra={<Link to='/materialCreation/rm-skus-view' ><span style={{color:'white'}} ><Button type={'primary'} >View </Button> </span></Link>}>
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Row gutter={8}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                <Form.Item name={'itemType'} label='Item Type' rules={[{required:true,message:'Item Type is required'}]}>
                    <Select allowClear showSearch optionFilterProp="children" placeholder='Select Item Type' onChange={onItemTypeChange}>
                        {/* {
                            Object.values(RmItemTypeEnum).map(e => {
                                return(
                                    <Option key={e} value={e}>{e}</Option>
                                )
                            })
                        } */}
                        {
                            proGroups.map(e => {
                                return(
                                    <Option key={e.productGroupId} value={e.productGroup}>{e.productGroup}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                <Form.Item name={'itemCode'} label='Item Code' rules={[{required:true,message:'Item Code is required'}]}>
                    <Select allowClear showSearch optionFilterProp="children" placeholder='Select Item Code' onChange={onItemCodeChange}>
                        {/* <Option key='1' value='I001' itemId={1}>I001</Option> */}
                        {
                            itemCodes.map(e => {
                                return(
                                    <Option key={e.rm_item_id} value={e.item_code} itemId={e.rm_item_id}>{e.item_code}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                </Col>
                </Row>
                <Row gutter={24}>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 24 }}>
                    <Card  style={{height:'100%'}}>
                        <span>Features</span>
                        {/* <h1>Fetures</h1> */}
                    <CheckboxGroup style={{ width: '100%' }} value={features.map((feature) => feature.featureId)} onChange={onChange}>
                    <Row gutter={24}>
                        {featuresInfo.map((option) => (
                        <Col key={option.featureId} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Row gutter={24}>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                            <Checkbox value={option.featureId} key={option.featureName}>
                            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <Badge.Ribbon text={option.featureName} color="volcano">    
                                <Card title={`${option.option}`} size='small' style={{width:'300px'}}>
                                <Row gutter={24}>
                                    {option.optionInfo[0]?.option.map((e, index) => (
                                        <>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 6}}>
                                        <Tag key={index} color="#cde5d7" style={{color:'black',fontSize:'15px'}}>{e}</Tag>
                                    </Col>
                                    <br/>
                                    <br/>
                                    </>
                                    
                                    ))}
                                    </Row>
                            </Card>
                            </Badge.Ribbon>
                            </Space>
                            </Checkbox>
                                </Col>
                            </Row>
                        </Col>
                        ))}
                    </Row>
                    </CheckboxGroup>
                    </Card>
                    </Col>
                </Row>
                <br/>
                <Row justify={'end'}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 2 }}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={features.length > 0 && form.getFieldValue('itemType')!= undefined && form.getFieldValue('itemCode') != undefined ? false : true}>Submit</Button>
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

export default RmSkusGeneration