import { BuyerIdReq, BuyersDestinationRequest, CustomerOrderStatusEnum, ItemCodeReq, SKUGenerationReq, StyleOrderIdReq, StyleOrderItemsReq, StyleOrderReq } from "@project-management-system/shared-models";
import { BuyerDestinationService, BuyersService, CurrencyService, DeliveryMethodService, DeliveryTermsService, DestinationService, EmployeeDetailsService, FactoryService, ItemCreationService, ItemsService, PackageTermsService, PaymentMethodService, PaymentTermsService, SKUGenerationService, StyleOrderService, WarehouseService } from "@project-management-system/shared-services"
import { Button, Card, Col, DatePicker, Form, Input, Row, Segmented, Select, Space, Table } from "antd"
import TextArea from "antd/es/input/TextArea";
import { ColumnProps } from "antd/es/table";
import { useEffect, useState } from "react"
import AlertMessages from "../common/common-functions/alert-messages";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const {Option} = Select;

export interface StyleOrderCreationProps {
    coData: any;
    updateDetails: (data: StyleOrderReq) => void;
    isUpdate: boolean;
    closeForm: () => void;
  }

export const StyleOrderCreation = (props:StyleOrderCreationProps) => {

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
    const [data,setData] = useState<any[]>([])
    const [page, setPage] = useState<number>(1);
    const [orderQuantityData,setOrderQuantityData] = useState<any[]>([])
    const [itemId,setItemId] = useState<number>(0)
    const deliveryAddressService = new BuyerDestinationService()
    const [delivAdd,setDelivAdd] =  useState<any[]>([])
    const styleOrderService = new StyleOrderService()
    const navigate = useNavigate();
    const [tableVisible,setTableVisible] = useState<boolean>(false)
    const fgItemService = new ItemCreationService()
    const [initialData,setInitialData] = useState<any[]>([])
    const { state } = useLocation();
    console.log(state,'------')

    useEffect(()=>{
        if(initialData.length > 0){
            console.log(initialData[0],'--------')
            form.setFieldsValue({
                'itemCode':initialData[0].itemCode,
                'buyer': initialData[0].buyerId,
                'facility':initialData[0].facilityId,
                'warehouse':initialData[0].warehouseId,
                'remarks':initialData[0].remarks,
                'buyerPoNumber':initialData[0].buyerPoNumber,
                'CODate':dayjs(initialData[0].orderDate),
                'shipmentType': initialData[0].shipmentType,
                'buyerStyle': initialData[0].buyerStyle,
                'agent': Number(initialData[0].agent),
                'buyerAddress': Number(initialData[0].buyerAddress),
                'exfactoryDate': dayjs(initialData[0].exfactoryDate),
                'deliveryDate': dayjs(initialData[0].deliveryDate),
                'packageTerms': initialData[0].packageTermsId,
                'deliveryMethod': initialData[0].deliveryMethodId,
                'deliveryTerms': initialData[0].deliverytermId,
                'inStoreDate' : dayjs(initialData[0].inStoreDate),
                'currency': initialData[0].currencyId,
                'salePrice': initialData[0].salePrice,
                'priceQuantity': initialData[0].priceQuantity,
                'discount': initialData[0].discount,
                'paymentMethod': initialData[0].paymentMethodId,
                'paymentTerms': initialData[0].paymentTermId,
                'styleOrderId': state?.id,
                'coNumber':initialData[0].coNumber

            })
            setItemId(initialData[0].itemId)
            getDestinationsByItem()
        }
    
    },[initialData])

    useEffect(() => {
        if(state?.id){
            const req = new StyleOrderIdReq(state?.id)
            styleOrderService.getCOInfoById(req).then(res => {
                if(res.status){
                    setInitialData(res.data)
                }
            })
        }

    },[state?.id])


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
        fgItemService.getFgItemsDropdown().then(res => {
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

    const getBuyerDestinations = (buyerId) =>{
        const request = new BuyersDestinationRequest(buyerId)
        deliveryAddressService.getAll(request).then(res=>{
            if(res.status){
                setDelivAdd(res.data)
            }
        })
    
    }

    const onBuyerChange = (e,option) => {
        getBuyersAddressInfo(option?.key)
        getBuyerDestinations(option?.key)
    }

    const onItemCodeChange = (e,option) => {
        setItemId(option?.key)
        getDestinationsByItem()

    }

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

    // const onSegmentChange = (e) => {
    //     console.log(e)
    //     setTableVisible(true)
    //     if(state !== null && initialData[0].styleOrderItems.length > 0){
    //         const req = new StyleOrderIdReq(state?.id,e)
    //         styleOrderService.getCoLineItemsByDestination(req).then(res => {
    //             if(res.status){
    //                 setData(res.data)
    //             }
    //         })

    //     } else{
    //         const req = new ItemCodeReq(form.getFieldValue('itemCode'),e)
    //         skuService.getDataByDestinationAgainstItem(req).then(res => {
    //             if(res.status){
    //                 setData(res.data)
    //             }
    //         })
    //     }
    // }

    const setQuantityValue = (e,index,rowData) => {
        console.log(e,index,rowData)
        console.log(e.target.value)
        data[index].quantity = e.target.value
        data[index].deliveryAddress = form.getFieldValue('deliveryAddress')
        const req = new StyleOrderItemsReq(form.getFieldValue('deliveryAddress'),e.target.value,rowData.color,rowData.size,rowData.destination,null,CustomerOrderStatusEnum.OPEN,null,null,null,rowData.colorInfo.colourId,rowData.sizeInfo.sizeId,rowData.destinationInfo.destinationId,null,rowData.id,rowData.coLineNumber,rowData.skuCode)
        setOrderQuantityData([...orderQuantityData,req])
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
            title:'Quantity',
            dataIndex:'quantity',
            render:(text,row,index) => {
                return(
                    <span>
                    {row.orderQuantity ? (<>
                        <Input key={row.itemSkuId} placeholder="Enter value"
                        onBlur={e=> setQuantityValue(e,index,row)} defaultValue={row.orderQuantity}/>
                    </>) : (<>
                        <Input key={row.itemSkuId} placeholder="Enter value"
                        onBlur={e=> setQuantityValue(e,index,row)}/></>)}

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

    const onFinish = (val) => {
        const req = new StyleOrderReq(val.itemCode,val.CODate,val.buyerPoNumber,val.shipmentType,val.buyerStyle,val.agent,val.buyerAddress,val.exfactoryDate,val.deliveryDate,val.inStoreDate,val.salePrice,val.priceQuantity,val.discount,null,orderQuantityData.length > 0 ? CustomerOrderStatusEnum.CONFIRMED : CustomerOrderStatusEnum.OPEN,val.remarks,itemId,val.warehouse,val.facility,null,val.packageTerms,val.deliveryMethod,val.deliveryTerms,val.currency,val.paymentMethod,val.paymentTerms,orderQuantityData,val.buyer,'admin',val.styleOrderId,val.coNumber)
        styleOrderService.createCustomerOrder(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
            } else{
                AlertMessages.getSuccessMessage(res.internalMessage)
            }
        }) 
    }
    return(
        <Card title='Style Order Creation' size='small'  extra={
            <span>
              <Button
                onClick={() => navigate("/materialCreation/style-order-view")}
                type={"primary"}
              >
                View
              </Button>
            </span>
          }>
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item name='styleOrderId' style={{display:'none'}}>
                    <Input disabled/>
                </Form.Item>
                <Form.Item name='coNumber' style={{display:'none'}}>
                    <Input disabled/>
                </Form.Item>
               <Row gutter={[8,4]}>
               <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 12}}>
               <Card size='small' bordered={false}>
               {/* <h4 style={{ color: 'grey', textAlign: 'left' }}>Order Details</h4> */}
               <span style={{color:'blue'}}><b>Order Details</b></span>
                <Row gutter={[8,8]}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                <Form.Item name='itemCode' label='Item' rules={[{required:true,message:'Item is required'}]}>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select Item' onChange={onItemCodeChange}>
                        {
                            itemCodes.map((e) => {
                                return(
                                    <Option key={e.fgitemId} value={e.itemCode}>{e.itemCode}-{e.itemName}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                    <Form.Item name='buyer' label='Buyer' rules={[{required:true,message:'Buyer is required'}]} >
                        <Select showSearch allowClear optionFilterProp="children" onChange={onBuyerChange} placeholder='Select Buyer'>
                            {
                                buyers.map((e) => {
                                    return(
                                        <Option key={e.buyerId} value={e.buyerId}>{e.buyerCode}-{e.buyerName}</Option>
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
                <Form.Item name='facility' label='Facility' rules={[{required:true,message:'Facility is required'}]}>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Facility'>
                            {
                                factory.map((e) => {
                                    return(
                                        <Option key={e.id} value={e.id}>{e.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                <Form.Item name='warehouse' label='Warehouse' rules={[{required:true,message:'Warehouse is required'}]}>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Warehouse'>
                            {
                                warehouse.map((e) => {
                                    return(
                                        <Option key={e.warehouseId} value={e.warehouseId}>{e.warehouseName}</Option>
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
            <Form.Item name='buyerPoNumber' label='Buyer PO' rules={[{required:true,message:'Buyer PO is required'}]}>
                    <Input placeholder="Enter Buyer PO"/>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
            <Form.Item name='CODate' label='CO Date' rules={[{required:true,message:'CO Date is required'}]}>
                    <DatePicker style={{width:'100%'}}/>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
            <Form.Item name='shipmentType' label='Shipment Type'>
                    <Input placeholder="Enter Shipment Type"/>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
            <Form.Item name='buyerStyle' label='Buyer Style' rules={[{required:true,message:'Buyer Style is required'}]}>
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
            <Form.Item name='buyerAddress' label='Buyer Address' rules={[{required:true,message:'Buyer Address is required'}]}>
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
                <Form.Item name='exfactoryDate' label='Ex-factory Date' rules={[{required:true,message:'Ex-factory Date is required'}]}>
                        <DatePicker style={{width:'100%'}}/>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                <Form.Item name='deliveryDate' label='Delivery Date' rules={[{required:true,message:'Delivery Date is required'}]}>
                        <DatePicker style={{width:'100%'}}/>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                <Form.Item name='packageTerms' label='Packing Terms'>
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
                <Form.Item name='deliveryMethod' label='Delivery Method' rules={[{required:true,message:'Delivery Method is required'}]}>
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
                <Form.Item name='deliveryTerms' label='Delivery Terms' rules={[{required:true,message:'Delivery Terms is required'}]}>
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
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 5 }}>
                <Form.Item name='currency' label='Sales Price' rules={[{required:true,message:'Currency is required'}]}>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Currency'>
                        {
                            currency.map((e) => {
                                return(
                                    <Option key={e.currencyId} value={e.currencyId}>{e.currencyName}</Option>
                                )
                            })
                        }
                    </Select>
                        {/* <Input placeholder="Enter Price"/> */}
                </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 5 }} style={{marginTop:'23px'}}>
                <Form.Item name='salePrice' rules={[{required:true,message:'Sale Price is required'}]}>
                        <Input placeholder="Enter Price"/>
                </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 1 }} style={{marginTop:'23px'}}>
                <Form.Item>
                        Per
                </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 4 }} style={{marginTop:'23px'}}>
                <Form.Item name='priceQuantity' rules={[{required:true,message:'Pieces is required'}]}>
                        <Input placeholder="Quantity"/>
                </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 4 }} style={{marginTop:'23px'}}>
                <Form.Item>
                        PCS
                </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                <Form.Item name='discount' label='Discount(%)'>
                        <Input placeholder="Enter Discount"/>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                <Form.Item name='paymentMethod' label='Payment Method' rules={[{required:true,message:'Payment Method is required'}]}>
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
                <Form.Item name='paymentTerms' label='Payment Terms' rules={[{required:true,message:'Payment Terms is required'}]}>
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
               <Row>
                {
                    form.getFieldValue('itemCode') !== undefined || state?.id ? (<>
                        <Card style={{width:'100%'}}>
                <Space direction="vertical" style={{fontSize:"16px",width:'100%'}}>
                <Segmented 
                style={{backgroundColor:'#dde5b6'}}
                options={segmentedOptions} 
                // onChange={onSegmentChange}
                />
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 7}} xl={{ span: 8 }}>
                    <Form.Item label='Delivery Address' name='deliveryAddress'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Delivery Address'>
                        {
                            delivAdd[0]?.destination.map((e) => {
                                return(
                                    <Option key={e.destinationId} value={e.destinationId}>{e.destination}</Option>
                                )
                            })
                        }
                    </Select>
                    </Form.Item>
                </Col>
                {
                    tableVisible || state?.id ? (<>
                    
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
                    <Button htmlType="submit" type='primary'>Submit</Button>
                </Form.Item>
               </Col>
               </Row>
                </Card>
                    </>) : (<></>)
                }
            
               </Row>
             
            </Form>

        </Card>
    )

}

export default StyleOrderCreation