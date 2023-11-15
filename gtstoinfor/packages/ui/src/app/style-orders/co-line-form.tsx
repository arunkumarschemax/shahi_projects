import { CoLineItemsReq, CoLineReq, CoLineStatusEnum, FgItemCreIdRequest, StyleOrderIdReq } from "@project-management-system/shared-models";
import { ItemCreationService, StyleOrderService } from "@project-management-system/shared-services";
import { Button, Card, Col, DatePicker, Descriptions, Form, Input, Row, Segmented, Select, Space, Table } from "antd"
import DescriptionsItem from "antd/es/descriptions/Item"
import { ColumnProps } from "antd/es/table";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AlertMessages from "../common/common-functions/alert-messages";

const {Option} = Select;

export const CoLineForm = () => {
    const { state } = useLocation();
    const styleOrderService = new StyleOrderService()
    const [initialData,setInitialData] = useState<any[]>([])
    const [destinations,setDestinations] = useState<any[]>([])
    const [tableVisible,setTableVisible] = useState<boolean>(false)
    const [data,setData] = useState<any[]>([])
    const fgItemService = new ItemCreationService()
    const [salePrice,setSalePrice] = useState<number>()
    const [salePriceQty,setSalePriceQty] = useState<number>()
    const [coLineItems,setCoLineItems] = useState<any[]>([])
    const [form] = Form.useForm()


    useEffect(() => {
        if(state?.id){
            let fgItemId
            const req = new StyleOrderIdReq(state?.id)
            styleOrderService.getCOInfoById(req).then(res => {
                if(res.status){
                    setInitialData(res.data)
                    fgItemId = res.data[0].itemId
                }
            })
            styleOrderService.getDestinationInOrderLines().then(res => {
                if(res.status){
                    setDestinations(res.data)
                }
            })
            const fgreq = new FgItemCreIdRequest(fgItemId)
            fgItemService.getFgItemsDropdown(fgreq).then(res => {
                if(res.status){
                    setSalePrice(Number(res.data[0].salePrice))
                    setSalePriceQty(res.data[0].salePriceQty)
                }
            })
        }

    },[state?.id])

    const generateSegmentedOptions = () => {
        return destinations.map((rec, index) => (
            {
          label: <b>{rec.destination}</b>, // Change this to the appropriate property from your data
          value: rec.destination_id,    // Change this to the appropriate property from your data
          key: index.toString(),           // Use a unique key for each option
        }
        ));
      };

      const segmentedOptions = generateSegmentedOptions();

      const onSegmentChange = (e) => {
        setTableVisible(true)
        if(state !== null && initialData[0].styleOrderItems[0].styleOrderItemsId !== null){
            const req = new StyleOrderIdReq(state?.id,e)
            styleOrderService.getCoLineItemsByDestination(req).then(res => {
                if(res.status){
                    setData(res.data)
                }
            })

        }
    }

    const setQuantityValue = (e,index,rowData) => {
        if(e.target.value != ''){
            const iniIndex = coLineItems.findIndex(e => e.skuCode === rowData.skuCode)
            if(iniIndex != -1){
                coLineItems[index].quantity = e.target.value
            } else{
                const req = new CoLineItemsReq(rowData.skuCode,rowData.color,rowData.size,rowData.destination,e.target.value,salePrice,Number(initialData[0]?.styleOrderItems[0].deliveryAddress),rowData.colorInfo.colourId,rowData.sizeInfo.sizeId,rowData.destinationInfo.destinationId,null,CoLineStatusEnum.OPEN,null,null)
                setCoLineItems([...coLineItems,req])
            }
        }
    }

        const setSalePriceValue = (e,index,rowData) => {
        const iniIndex = coLineItems.findIndex(e => e.skuCode === rowData.skuCode)
        if(iniIndex != -1){
            coLineItems[index].salePrice = e.target.value
        } else{
            const req = new CoLineItemsReq(rowData.skuCode,rowData.color,rowData.size,rowData.destination,e.target.value,null,Number(initialData[0]?.styleOrderItems[0].deliveryAddress),rowData.colorInfo.colourId,rowData.sizeInfo.sizeId,rowData.destinationInfo.destinationId,null,CoLineStatusEnum.OPEN,null,null)
            setCoLineItems([...coLineItems,req])
        }

    }

    const columns: ColumnProps<any>[] = [
        // {
        //     title: 'S No',
        //     key: 'sno',
        //     width: '70px',
        //     responsive: ['sm'],
        //     render: (text, object, index) => (page-1) * 10 +(index+1)
        // },
        {
            title:'SKU Code',
            dataIndex:'skuCode'
        },
        {
            title:'Color',
            dataIndex:'color'
        },
        {
            title:'Size',
            dataIndex:'size'
        },
        {
            title:'Total Quantity',
            dataIndex:'orderQuantity'
        },
        {
            title:'Quantity',
            dataIndex:'quantity',
            render:(text,row,index) => {
                return(
                    <span>
                        <Input key={row.itemSkuId} placeholder="Enter value"
                        onBlur={e=> setQuantityValue(e,index,row)}/>
                    </span>
                    
                )
            }
        },
        {
            title:`Price per ${state != null ? initialData[0]?.itemSalePriceQty : salePriceQty} PCS`,
            dataIndex:'salePrice',
            render:(text,row,index) => {
                return(
                    <span>
                    {salePrice || state != null? (<>
                        <Input key={row.itemSkuId} placeholder="Enter value"
                        onBlur={e=> setSalePriceValue(e,index,row)} defaultValue={Number(salePrice)}/>
                    </>) : (<>
                        <Input key={row.itemSkuId} placeholder="Enter value"
                        onBlur={e=> setSalePriceValue(e,index,row)}/></>)}

                    </span>
                    
                )
            }
        },
    ]

    const splitData = (data) => {
        const middleIndex = Math.ceil(data.length / 2);
        const firstHalf = data.slice(0, middleIndex);
        const secondHalf = data.slice(middleIndex);
        return [firstHalf, secondHalf];
    };

    const [firstHalfData, secondHalfData] = splitData(data);

    const onSubmit = () => {
        const req = new CoLineReq(state?.id,initialData[0].orderNumber,form.getFieldValue('exfactoryDate'),form.getFieldValue('deliveryDate'),form.getFieldValue('season'),initialData[0].buyerPoNumber,coLineItems,form.getFieldValue('coNumber'))
        console.log(req)
        styleOrderService.createCoLine(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage('CoLine created successfully')
                onReset()
            } else{
                AlertMessages.getErrorMessage(res.internalMessage)
            }
        })
    }

    const onReset = () => {
        form.resetFields()
    }

    return(
        <Card title='Co Line Creation'>
            <Row gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 12}}>
                <span style={{color:'blue'}}><b>Order Details</b></span>
            <Descriptions>
                <DescriptionsItem label='Order Number'>{initialData[0]?.orderNumber}</DescriptionsItem>
                <DescriptionsItem label='Item Code'>{initialData[0]?.itemCode}</DescriptionsItem>
                <DescriptionsItem label='Item'>{initialData[0]?.itemName}</DescriptionsItem>
                <DescriptionsItem label='Buyer'>{initialData[0]?.buyerName}</DescriptionsItem>
            </Descriptions>
                <span style={{color:'blue'}}><b>CO Information</b></span>
            <Descriptions>
                <DescriptionsItem label='Facility'>{initialData[0]?.factoryName}</DescriptionsItem>
                <DescriptionsItem label='Warehouse'>{initialData[0]?.warehouseName}</DescriptionsItem>
                <DescriptionsItem label='Merchandiser'>{initialData[0]?.merchandiserCode}-{initialData[0]?.merchandiserName}</DescriptionsItem>
                <DescriptionsItem label='Planner'>{initialData[0]?.plannerCode}-{initialData[0]?.plannerName}</DescriptionsItem>
                <DescriptionsItem label='Quantity UOM'>{initialData[0]?.uom}</DescriptionsItem>
                <DescriptionsItem label='Remarks'>{initialData[0]?.remarks}</DescriptionsItem>
                </Descriptions>
                <span style={{color:'blue'}}><b>Shipment Information</b></span>
                <Descriptions>
                <DescriptionsItem label='Packing Terms'>{initialData[0]?.packageTermsName}</DescriptionsItem>
                <DescriptionsItem label='Delivery Method'>{initialData[0]?.deliveryMethod}</DescriptionsItem>
                <DescriptionsItem label='Delivery Trems'>{initialData[0]?.deliveryTermsName}</DescriptionsItem>
                <DescriptionsItem label='In Store Date'>{initialData[0]?.instoreDate ? moment(initialData[0]?.instoreDate).format('YYYY-MM-DD') : '-'}</DescriptionsItem>
                </Descriptions>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 12}}>
                
                <span style={{color:'blue'}}><b>Customer PO Information</b></span>
                <Descriptions>
                <DescriptionsItem label='Buyer PO'>{initialData[0]?.buyerPoNumber}</DescriptionsItem>
                <DescriptionsItem label='CO Date'>{moment(initialData[0]?.orderDate).format('YYYY-MM-DD')}</DescriptionsItem>
                <DescriptionsItem label='CO Type'>{initialData[0]?.coType}</DescriptionsItem>
                <DescriptionsItem label='Shipment Type'>{initialData[0]?.shipmentType}</DescriptionsItem>
                <DescriptionsItem label='Buyer Style'>{initialData[0]?.buyerStyle}</DescriptionsItem>
                <DescriptionsItem label='Agent'>{initialData[0]?.agentName}</DescriptionsItem>
                <DescriptionsItem label='Buyer Address'>{initialData[0]?.state}-{initialData[0]?.city}-{initialData[0]?.landmark}</DescriptionsItem>
            </Descriptions>
            <span style={{color:'blue'}}><b>Payment Information</b></span>
                <Descriptions>
                <DescriptionsItem label='Sales Price'>{initialData[0]?.salePrice}</DescriptionsItem>
                <DescriptionsItem label='Discount'>{initialData[0]?.discountPercent}</DescriptionsItem>
                <DescriptionsItem label='Payment Method'>{initialData[0]?.paymentMethod}</DescriptionsItem>
                <DescriptionsItem label='Payment Terms'>{initialData[0]?.paymentTermsName}</DescriptionsItem>
            </Descriptions>
                </Col>
            </Row>
            <Form layout="vertical"  form={form}> 
            <Row gutter={24}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 6 }}>
                <Form.Item name='coNumber' label='Co Number' rules={[{required:true,message:'CO Number is required'}]}>
                        <Input placeholder="Enter Co Number"/>
                    </Form.Item>
                </Col>
                 <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 6 }}>
                <Form.Item name='exfactoryDate' label='Ex-factory Date' rules={[{required:true,message:'Ex-factory Date is required'}]}>
                        <DatePicker style={{width:'100%'}}/>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 6 }}>
                <Form.Item name='deliveryDate' label='Delivery Date' rules={[{required:true,message:'Delivery Date is required'}]}>
                        <DatePicker style={{width:'100%'}}/>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 6 }}>
                    <Form.Item name='season' label='Season' >
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Season'>
                            <Option key='ss' value='SS'>SS</Option>
                            <Option key='fw' value='FW'>FW</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            </Form>
            <Row>
                {/* <Form layout="vertical" onFinish={onSubmit} form={form}> */}
                {
                    state?.id ? (<>
                        <Card style={{width:'100%'}}>
                <Space direction="vertical" style={{fontSize:"16px",width:'100%'}}>
                <Segmented 
                style={{backgroundColor:'#dde5b6'}}
                options={segmentedOptions} 
                onChange={onSegmentChange}
                default={true}
                defaultValue={segmentedOptions[0]?.label?.props?.children}
                />
                <Row gutter={24}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                    <Descriptions>
                   <DescriptionsItem label='Delivery Address'>{initialData[0]?.styleOrderItems[0].state}-{initialData[0]?.styleOrderItems[0].city}-{initialData[0]?.styleOrderItems[0].landmark}</DescriptionsItem>
                    </Descriptions>
                </Col>
               
                </Row>
                {
                    tableVisible ? (<>
                    
                    {
                    data.length <= 10 ? (<>
                    <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 18 }}>
                    <Table  size='small'  bordered columns={columns} dataSource={data} pagination={false}/>
                    </Col>
                    </>): (<></>)
    
                    }
                    {
                    data.length > 10 ? (<> <Row gutter={24}>
                        <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                                <Table  size='small'  bordered columns={columns} dataSource={firstHalfData} pagination={false}/>
                        </Col>
                        <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                                <Table  size='small'  bordered columns={columns} dataSource={secondHalfData} pagination={false}/>
                        </Col>
                        </Row></>) : (<></>)
                    }
                    </>) : (<></>)
                }
                </Space>
                <Row justify={'end'} style={{marginLeft:'85%',marginTop:'5px'}}>
               <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                <Form.Item>
                    <Button type='primary' onClick={onSubmit} disabled={coLineItems.length > 0 ? false: true}>Submit</Button>
                </Form.Item>
               </Col>
               <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                <Form.Item>
                    <Button danger onClick={onReset}>Reset</Button>
                </Form.Item>
               </Col>
               </Row>
                </Card>
                    </>) : (<></>)
                }
            {/* </Form> */}
               </Row>
         

        </Card>
    )

}

export default CoLineForm