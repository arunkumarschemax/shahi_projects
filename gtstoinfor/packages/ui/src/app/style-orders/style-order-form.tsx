import { BuyerIdReq, ItemCodeReq } from "@project-management-system/shared-models";
import { BuyersService, CurrencyService, DeliveryMethodService, DeliveryTermsService, EmployeeDetailsService, FactoryService, ItemsService, PackageTermsService, PaymentMethodService, PaymentTermsService, SKUGenerationService, WarehouseService } from "@project-management-system/shared-services"
import { Card, Col, DatePicker, Form, Input, Row, Select } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react"

const {Option} = Select;

export const StyleOrderCreation = () => {

    const [itemCodes,setItemCodes] = useState<any[]>([])
    const itemService = new ItemsService()
    const [buyers,setBuyers] = useState<any[]>([])
    const [buyerAddress,setBuyerAddress] = useState<any[]>([])
    const buyerService = new BuyersService()
    const [factory,setFactory] = useState<any[]>([])
    const factoryService = new FactoryService()
    const [warehouse,setWarehouse] = useState<any[]>([])
    const warehouseService = new WarehouseService()
    const empService = new EmployeeDetailsService()
    const [agent,setAgent] = useState<any[]>([])
    const [packageTerms,setPackageTerms] = useState<any[]>([])
    const pacTermsService = new PackageTermsService()
    const [deliveryTerms,setDeliveryTerms] = useState<any[]>([])
    const deliTermsService = new DeliveryTermsService()
    const [deliveryMethod,setDeliveryMethod] = useState<any[]>([])
    const deliMethService = new DeliveryMethodService()
    const [paymentTerms,setpaymentTerms] = useState<any>([])
    const payTermsService = new PaymentTermsService()
    const [paymentMethod,setpaymentMethod] = useState<any[]>([])
    const payMethService = new PaymentMethodService()
    const [currency,setCurrency] = useState<any[]>([])
    const currencyService = new CurrencyService()
    const [destinations,setDestinations] = useState<any[]>([])
    const skuService = new SKUGenerationService()
    const [form] = Form.useForm()




    useEffect(() => {
        getItemCodes()
        getBuyersInfo()
        getfactoryInfo()
        getWarehouseInfo()
        getAgentInfo()
        getpackageTermsInfo()
        getDeliveryMethodInfo()
        getDeliveryTermsInfo()
        getPaymentMethodInfo()
        getPaymentTermsInfo()
        getCurrencyInfo()
        
    },[])

    const getItemCodes = () => {
        itemService.getAllItems().then(res => {
            if(res.status){
                setItemCodes(res.data)
            }
        })
    }

    const getBuyersInfo = () => {
        buyerService.getAllActiveBuyers().then(res => {
            if(res.status){
                setBuyers(res.data)
            }
        })
    }

    const getBuyersAddressInfo = (buyerId) => {
        const req = new BuyerIdReq(buyerId)
        buyerService.getAddressByBuyerId(req).then(res => {
            if(res.status){
                setBuyerAddress(res.data)
            }
        })
    }

    const getfactoryInfo = () => {
        factoryService.getActiveFactories().then(res => {
            if(res.status){
                setFactory(res.data)
            }
        })
    }

    const getWarehouseInfo = () => {
        warehouseService.getAllActiveWarehouse().then(res => {
            if(res.status){
                setWarehouse(res.data)
            }
        })
    }

    const getAgentInfo = () => {
        empService.getAllActiveEmploee().then(res => {
            if(res.status){
                setAgent(res.data)
            }
        })
    }

    const getpackageTermsInfo = () => {
        pacTermsService.getAllActivePackageTerms().then(res => {
            if(res.status){
                setPackageTerms(res.data)
            }
        })
    }

    const getDeliveryTermsInfo = () => {
        deliTermsService.getAllActiveDeliveryTerms().then(res => {
            if(res.status){
                setDeliveryTerms(res.data)
            }
        })
    }

    const getDeliveryMethodInfo = () => {
        deliMethService.getAllActiveDeliveryMethods().then(res => {
            if(res.status){
                setDeliveryMethod(res.data)
            }
        })
    }

    const getPaymentMethodInfo = () => {
        payMethService.getAllActiveMethod().then(res => {
            if(res.status){
                setpaymentMethod(res.data)
            }
        })
    }

    const getPaymentTermsInfo = () => {
        payTermsService.getAllActivePaymentTerms().then(res => {
            if(res.status){
                setpaymentTerms(res.data)
            }
        })
    }

    const getCurrencyInfo = () => {
        currencyService.getAllActiveCurrencys().then(res => {
            if(res.status){
                setCurrency(res.data)
            }
        })
    }

    const getDestinationsByItem = () =>{
        const req = new ItemCodeReq(form.getFieldValue('itemCode'))
        skuService.getDestinationsByItem(req).then(res =>{
            if(res.status){
                setDestinations(res.data)
            }
        })
    }

    const onBuyerChange = (e,option) => {
        getBuyersAddressInfo(option?.key)
    }

    const onItemCodeChange = (e,option) => {
        getDestinationsByItem()
    }
    return(
        <Card title='Style Order Creation' size='small'>
            <Form layout="vertical" form={form}>
               <Row gutter={[8,4]}>
               <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 12}}>
               <Card size='small' bordered={false}>
               {/* <h4 style={{ color: 'grey', textAlign: 'left' }}>Order Details</h4> */}
               <span style={{color:'blue'}}><b>Order Details</b></span>
                <Row gutter={[8,8]}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                <Form.Item name='itemCode' label='Item'>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select Item' onChange={onItemCodeChange}>
                        {
                            itemCodes.map((e) => {
                                return(
                                    <Option key={e.itemCode} value={e.itemCode}>{e.itemCode}-{e.itemName}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                    <Form.Item name='buyer' label='Buyer' >
                        <Select showSearch allowClear optionFilterProp="children" onChange={onBuyerChange} placeholder='Select Buyer'>
                            {
                                buyers.map((e) => {
                                    return(
                                        <Option key={e.buyerId} value={e.buyerCode}>{e.buyerCode}-{e.buyerName}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                </Col>
                </Row>
                {/* <h4 style={{ color: 'grey', textAlign: 'left' }}>CO Information</h4> */}
                <span style={{color:'blue'}}><b>CO Information</b></span>
                    <Row gutter={[8,4]}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                <Form.Item name='facility' label='Facility'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Facility'>
                            {
                                factory.map((e) => {
                                    return(
                                        <Option key={e.id} value={e.name}>{e.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                <Form.Item name='warehouse' label='Warehouse'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Warehouse'>
                            {
                                warehouse.map((e) => {
                                    return(
                                        <Option key={e.id} value={e.name}>{e.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                <Form.Item name='remarks' label='Remarks'>
                        <TextArea rows={1} placeholder='Enter Remarks'/>
                    </Form.Item>
                </Col>
                </Row>
                {/* <h4 style={{ color: 'grey', textAlign: 'left' }}>Customer PO Information</h4> */}
                <span style={{color:'blue'}}><b>Customer PO Information</b></span>
                <Row gutter={[8,4]}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
            <Form.Item name='buyerPO' label='Buyer PO'>
                    <Input placeholder="Enter Buyer PO"/>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
            <Form.Item name='CODate' label='CO Date'>
                    <DatePicker style={{width:'100%'}}/>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
            <Form.Item name='shipmentType' label='Shipment Type'>
                    <Input placeholder="Enter Shipment Type"/>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
            <Form.Item name='buyerStyle' label='Buyer Style'>
                    <Input placeholder="Enter Buyer Style"/>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
            <Form.Item name='agent' label='Agent'>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select Agent'>
                        {
                            agent.map((e) => {
                                return(
                                    <Option key={e.employeeId} value={e.employeeId}>{e.firstName}-{e.employeeCode}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
            <Form.Item name='buyerAddress' label='Buyer Address' >
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select Address'>
                        {
                            buyerAddress.map((e) => {
                                return(
                                    <Option key={e.addressId} value={e.addressId}>{e.landmark}-{e.city}-{e.state}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
            </Col>
            </Row>
                </Card>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 12}}>
               <Card size='small' bordered={false}>
               {/* <h4 style={{ color: 'grey', textAlign: 'left' }}>Shipment Information</h4> */}
               <span style={{color:'blue'}}><b>Shipment Information</b></span>
                <Row gutter={8}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                <Form.Item name='exfactoryDate' label='Ex-factory Date'>
                        <DatePicker style={{width:'100%'}}/>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                <Form.Item name='deliveryDate' label='Delivery Date'>
                        <DatePicker style={{width:'100%'}}/>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                <Form.Item name='packingTerms' label='Packing Terms'>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select Packing Terms'>
                        {
                            packageTerms.map((e) => {
                                return(
                                    <Option key={e.packageTermsId} value={e.packageTermsId}>{e.packageTermsName}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                <Form.Item name='deliveryMethod' label='Delivery Method'>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select Delivery Method'>
                        {
                            deliveryMethod.map((e) => {
                                return(
                                    <Option key={e.deliveryMethodId} value={e.deliveryMethodId}>{e.deliveryMethod}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                <Form.Item name='deliveryTerms' label='Delivery Terms'>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select Delivery Terms'>
                        {
                            deliveryTerms.map((e) => {
                                return(
                                    <Option key={e.deliveryTermsId} value={e.deliveryTermsId}>{e.deliveryTermsName}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                <Form.Item name='inStoreDate' label='In Store Date'>
                        <DatePicker style={{width:'100%'}}/>
                    </Form.Item>
                </Col>
                </Row>
                {/* <h4 style={{ color: 'grey', textAlign: 'left' }}>Payment Information</h4> */}
               <span style={{color:'blue'}}><b>Payment Information</b></span>
                <Row gutter={8}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                <Form.Item name='salesPrice' label='Sales Price'>
                        <Input placeholder="Enter Price"/>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                <Form.Item name='discount' label='Discount(%)'>
                        <Input placeholder="Enter Discount"/>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                <Form.Item name='paymentMethod' label='Payment Method'>
                    <Select showSearch allowClear optionFilterProp="children"  placeholder='Select Payment Method'>
                        {
                            paymentMethod.map((e) => {
                                return(
                                    <Option key={e.paymentMethodId} value={e.paymentMethodId}>{e.paymentMethod}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                <Form.Item name='paymentTerms' label='Payment Terms' >
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select Payment Terms'>
                        {
                            paymentTerms.map((e) => {
                                return(
                                    <Option key={e.paymentTermsId} value={e.paymentTermsId}>{e.paymentTermsName}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                </Col>
                </Row>
                </Card>
                </Col>
               </Row>
            </Form>

        </Card>
    )

}

export default StyleOrderCreation