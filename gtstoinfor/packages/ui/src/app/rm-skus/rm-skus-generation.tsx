import { RmItemTypeEnum, RmSkuFeatureReq, RmSkuReq, RmStatusEnum } from "@project-management-system/shared-models";
import { RmSkuService } from "@project-management-system/shared-services";
import { Badge, Button, Card, Checkbox, Col, Form ,Row,Select, Space, Tag, Tooltip} from "antd"
import { useEffect, useState } from "react";
import AlertMessages from "../common/common-functions/alert-messages";

const {Option} = Select;
const CheckboxGroup = Checkbox.Group;

export const RmSkusGeneration = () => {
    const [itemCodes,setItemCodes] = useState<any[]>([])
    const [itemId,setItemId] = useState<number>(undefined)
    const [featuresInfo,setFeaturesInfo] = useState<any[]>([])
    const [features,setFeatures] = useState<any[]>([])
    const service = new RmSkuService()
    const [form] = Form.useForm()
    const [array,setArray] = useState<any[]>(['blue','pink'])


    useEffect(() => {
        getFeatures()
    },[])

    useEffect(() => {
        console.log(features)
    },[features])

    const getFeatures = () => {
        service.getFeatures().then(res => {
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
    }

    const onFinish = (val) => {
        let featureReq = []
        for(const rec of features){
            featureReq.push(new RmSkuFeatureReq(rec.featureCode))
        }
        const req = new RmSkuReq(itemId,val.itemType,featureReq,RmStatusEnum.OPEN,val.itemCode,'admin')
        service.createRmSkus(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
            } else{
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        })
    }

    const getOptions = (rec) => {
        if(rec != undefined){
            rec.optionInfo[0].option.map(e => {
                return <Tag>{e}</Tag>
            })
        } else{
            return null
        }
      

    }

    return (
        <Card title='Rm Skus'>
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Row gutter={8}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                <Form.Item name={'itemType'} label='Item Type' rules={[{required:true,message:'Item Type is required'}]}>
                    <Select allowClear showSearch optionFilterProp="children" placeholder='Select Item Type'>
                        {
                            Object.values(RmItemTypeEnum).map(e => {
                                return(
                                    <Option key={e} value={e}>{e}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                <Form.Item name={'itemCode'} label='Item Code' rules={[{required:true,message:'Item Code is required'}]}>
                    <Select allowClear showSearch optionFilterProp="children" placeholder='Select Item Code' onChange={onItemCodeChange}>
                        <Option key='1' value='I001' itemId={1}>I001</Option>
                        {
                            itemCodes.map(e => {
                                return(
                                    <Option key={e.itemId} value={e.itemCode} itemId={e.itemId}>{e.itemCode}</Option>
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
                        <h1>Fetures</h1>
                    <CheckboxGroup style={{ width: '100%' }} value={features.map((feature) => feature.featureId)} onChange={onChange}>
                    <Row>
                        {featuresInfo.map((option) => (
                        <Col span={8} key={option.featureId} xl={{ span: 6 }}>
                            {/* <Tooltip title={[option.optionInfo[0].option]} color="cyan"> */}
                            <Checkbox value={option.featureId} key={option.featureName}>
                            <Space direction="vertical" size="middle" style={{ width: '150%' }}>
                            <Badge.Ribbon text={option.featureName}>
                            <Card title={`${option.option}`} size='small'>
                                <div>
                                    <Tag>{option.optionInfo[0].option}</Tag>
                                    {
                                        option.optionInfo[0].option.forEach(e => {
                                            
                                        })
                                    }
                                    {getOptions(option)}
                                </div>
                                {/* <span>
                                {
                                    option.optionInfo[0].option.map(e => {
                                        <Tag>xxxxxxxxx</Tag>
                                    })
                                }
                                </span> */}
                            </Card>
                            </Badge.Ribbon>
                            </Space>
                            </Checkbox>
                            {/* </Tooltip> */}
                        </Col>
                        ))}
                    </Row>
                    </CheckboxGroup>
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

export default RmSkusGeneration