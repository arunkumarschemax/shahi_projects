import { UserSwitchOutlined } from "@ant-design/icons";
import { Res } from "@nestjs/common";
import { DepartmentReq, SettingsIdReq, SettingsRequest } from "@project-management-system/shared-models";
import { BuyersService, CompanyService, CurrencyService, DeliveryMethodService, DeliveryTermsService, DivisionService, EmployeeDetailsService, FactoryService, LiscenceTypeService, PackageTermsService, PaymentMethodService, PaymentTermsService, ProfitControlHeadService, SettingsService, WarehouseService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Select } from "antd"
import { useEffect, useState } from "react";
import AlertMessages from "../../common/common-functions/alert-messages";
import { useLocation, useNavigate } from "react-router-dom";

const {Option} = Select;

export const SettingsForm = () => {
    const [form] = Form.useForm()
    const pchService = new ProfitControlHeadService()
    const [pch,setPch] = useState<any[]>([])
    const companyService = new CompanyService()
    const [company,setCompany] =    useState<any[]>([])
    const facilityService = new FactoryService()
    const [facility,setFacility] = useState<any[]>([])
    const warehouseService = new WarehouseService()
    const [warehouse,setWarehouse] = useState<any[]>([])
    // const cotypeService = new COTypeService()
    const [coType,setCoType] = useState<any[]>([])
    const currencyService = new CurrencyService()
    const [currency,setCurrency] = useState<any[]>([]);
    const licenceTypeService = new LiscenceTypeService()
    const [licenceType,setLicenceType] = useState<any[]>([])
    const employeeService = new EmployeeDetailsService()
    const [salesPerson,setSalesPerson] = useState<any[]>([])
    const [fabricResponsible,setFabricResponsible] = useState<any[]>([])
    const [itemResponsible,setItemResponsible] = useState<any[]>([]);
    const [trimResponsible,setTrimResponsible] = useState<any[]>([]);
    const [employee,setEmployee] = useState<any[]>([]);
    const buyerService = new BuyersService()
    const [buyerAddress,setBuyerAddress] = useState<any[]>([])
    const packageTermsService = new PackageTermsService()
    const [packageTerms,setPackageTerms] = useState<any[]>([])
    const paymentMethodSerivce = new PaymentMethodService()
    const [paymentMethos,setPaymentMethod] = useState<any[]>([])
    const paymentTermsService = new PaymentTermsService()
    const [paymentTerms,setPaymentTerms] = useState<any>([])
    const deliveryTermsService = new DeliveryTermsService()
    const [deliveryTerms,setDeliveryTerms] = useState<any[]>([])
    const deliveryMethodsService = new DeliveryMethodService()
    const [deliveryMethods,setDeliveryMethods] = useState<any[]>([])
    const divisionService = new DivisionService()
    const [division,setDivision] = useState<any[]>([])
    const service = new SettingsService()
    const navigate = useNavigate()
    const [initialData,setInitialData] = useState<any>()
    const [updateKey,setUpdateKey] = useState<number>(0)

    const { state } = useLocation();


    useEffect(() => {
        getPCHData()
        getCompany()
        getFacility()
        getWarehouse()
        getCurrency()
        getLicenceType()
        getPackageTerms()
        getPaymentMethods()
        getPaymentTerms()
        getDeliveryMethods()
        getDeliveryTerms()
        getDivision()
        getSalesPerson()
        getItemResponsible()
        getTrimResponsible()
        getFabricResponsible()
        getEmployees()
        getBuyerAddress()
    },[])

    useEffect(() => {
        if(state?.id){
            getAllInfo()
        }
    },[state])

    useEffect(()=> {
        if(initialData){
            console.log(initialData)
        }
    },[initialData])

    useEffect(()=>{
        if(initialData){
            // form.setFieldsValue({
            //     settingId:initialData?.settingsId,
            //     accountControlId: initialData?.accountControlId,
            //     pchId: initialData?.pchId,
            //     companyId: initialData?.companyId,
            //     facilityId: initialData?.name,
            //     divisionId: initialData?.divisionName,
            //     warehouseId: initialData?.warehouseName,
            //     coTypeId: initialData?.coTypeId,
            //     currencyId: initialData?.currencyName,
            //     licencetypeId: initialData?.liscenceType,
            //     salesPersonId: initialData?.salesPerson,
            //     fabricResponsibleId: initialData?.fabricResponsible,
            //     itemResponsibleId: initialData?.itemResponsible,
            //     trimResponsibleId: initialData?.trimRespondsible,
            //     discount:initialData?.discount,
            //     buyerAddress:initialData?.buyerAddress,
            //     buyerName:initialData?.buyerName,
            //     buyerGroup:initialData?.buyerGroup,
            //     agent:initialData?.agentName,
            //     packageTerms:initialData?.packageTermsName,
            //     paymentMethodId:initialData?.paymentMethod,
            //     paymentTerms:initialData?.paymentTermsName,
            //     deliveryMethodId:initialData?.deliveryMethod,
            //     deliveryTerms:initialData?.deliveryTermsName,
            // })
        }

    },[initialData])

    const getAllInfo = () => {
        const req = new SettingsIdReq(state?.id)
        service.getAllSettingsInfo(req).then(res => {
            if(res.status){
                setInitialData(res.data[0])
                setUpdateKey(prevState => prevState+1)

            }
        })
    }


    const getPCHData = () => {
        pchService.getAllActiveProfitControlHead().then(res => {
            if(res.status){
                setPch(res.data)
            }
        })
    }

    const getCompany = () => {
        companyService.getAllActiveCompanys().then(res => {
            if(res.status){
                setCompany(res.data)
            }
        })
    }

    const getFacility = () => {
        facilityService.getActiveFactories().then(res => {
            if(res.status){
                setFacility(res.data)
            }
        })
    }

    const getWarehouse = () => {
        warehouseService.getAllActiveWarehouse().then(res => {
            if(res.status){
                setWarehouse(res.data)
            }
        })
    }

    // const getCoType = () => {
        
    // }

    const getCurrency = () => {
        currencyService.getAllActiveCurrencys().then(res => {
            if(res.status){
                setCurrency(res.data)
            }
        })
    }

    const getLicenceType = () => {
        licenceTypeService.getAllActiveLiscenceTypes().then(res => {
            if(res.status){
                setLicenceType(res.data)
            }
        })
    }

    const getPackageTerms = () => {
        packageTermsService.getAllActivePackageTerms().then(res => {
            if(res.status){
                setPackageTerms(res.data)
            }
        })
    }

    const getPaymentTerms = () => {
        paymentTermsService.getAllActivePaymentTerms().then(res => {
            if(res.status){
                setPaymentTerms(res.data)
            }
        })
    }

    const getPaymentMethods = () => {
        paymentMethodSerivce.getAllActiveMethod().then(res => {
            if(res.status){
                setPaymentMethod(res.data)
            }
        })
    }

    const getDeliveryTerms = () => {
        deliveryTermsService.getAllActiveDeliveryTerms().then(res => {
            if(res.status){
                setDeliveryTerms(res.data)
            }
        })
    }

    const getDeliveryMethods = () => {
        deliveryMethodsService.getAllActiveDeliveryMethods().then(res => {
            if(res.status){
                setDeliveryMethods(res.data)
            }
        })
    }

    const getDivision = () => {
        divisionService.getAllActiveDivision().then(res => {
            if(res.status){
                setDivision(res.data)
            }
        })
    }

    const getSalesPerson = () => {
        const req = new DepartmentReq('Sales')
        employeeService.getAllActiveEmploeesByDepartment(req).then(res => {
            if(res.status){
                setSalesPerson(res.data)
            }
        })
    }

    const getFabricResponsible = () => {
        const req = new DepartmentReq('Fabric')
        employeeService.getAllActiveEmploeesByDepartment(req).then(res => {
            if(res.status){
                setFabricResponsible(res.data)
            }
        })
    }

    const getItemResponsible = () => {
        const req = new DepartmentReq('Item')
        employeeService.getAllActiveEmploeesByDepartment(req).then(res => {
            if(res.status){
                setItemResponsible(res.data)
            }
        })
    }

    const getTrimResponsible = () => {
        const req = new DepartmentReq('Trim')
        employeeService.getAllActiveEmploeesByDepartment(req).then(res => {
            if(res.status){
                setTrimResponsible(res.data)
            }
        })
    }

    const getEmployees = () => {
        employeeService.getAllActiveEmploee().then(res => {
            if(res.status){
                setEmployee(res.data)
            }
        })
    }

    const getBuyerAddress = () => {
        buyerService.getAllAddress().then(res => {
            if(res.status){
                setBuyerAddress(res.data)
            }
        })
    }

    const onReset = () => {
        form.resetFields()
    }

    const updateValues = (val) => {
        const req = new SettingsRequest(val.accountControlId,val.pchId,val.companyId,val.facilityId,val.divisionId,val.warehouseId,val.coTypeId,val.currencyId,val.licencetypeId,val.discount,val.salesPersonId,val.fabricResponsibleId,val.itemResponsibleId,val.trimResponsibleId,val.buyerAddress,val.buyerGroup,val.agent,val.packageTerms,val.paymentMethodId,val.paymentTerms,val.deliveryMethodId,val.deliveryTerms,'','admin',state?.id)
        console.log(req)
        service.updateSettings(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
                form.resetFields()
                navigate('/settings/settings-view')
            } else{
                AlertMessages.getSuccessMessage(res.internalMessage)
            }
        })
    }

    const onSave = (val) => {
        const req = new SettingsRequest(val.accountControlId,val.pchId,val.companyId,val.facilityId,val.divisionId,val.warehouseId,val.coTypeId,val.currencyId,val.licencetypeId,val.discount,val.salesPersonId,val.fabricResponsibleId,val.itemResponsibleId,val.trimResponsibleId,val.buyerAddress,val.buyerGroup,val.agent,val.packageTerms,val.paymentMethodId,val.paymentTerms,val.deliveryMethodId,val.deliveryTerms,'admin','')
        service.createSettings(req).then(res => {
            if(res.status){
                AlertMessages.getSuccessMessage(res.internalMessage)
                form.resetFields()
                navigate('/settings/settings-view')
            } else{
                AlertMessages.getSuccessMessage(res.internalMessage)
            }
        })
    }

    const onFinish = (val) => {
        if(state?.id){
            updateValues(val)
        } else{
            onSave(val)
        }
    }

    const onAddressChange = (val,object) => {
        form.setFieldsValue({buyerName:object?.buyer})
    }

    return(
        <Card title='Settings' size='small'>
            <Form layout="vertical" form={form} onFinish={onFinish} initialValues={initialData} key={updateKey}>
                <Form.Item name='settingId' style={{display:'none'}}>
                    <Input hidden/>
                </Form.Item>
                <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                    <Card bordered={false}>
                    <h1 style={{ color: 'grey', fontSize: '20px', textAlign: 'left' }}>COMPANY DETAILS</h1>
                    <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>
                        <Form.Item name='accountControlId' label='Account Control' rules={[{required:true,message:'Account Control is requried'}]}>
                        <Select allowClear showSearch optionFilterProp="children" placeholder='Select Account Control'>
                                {employee.map((e) => {
                                    return(
                                        <Option key={e.employeeId} value={e.employeeId}>{e.firstName}-{e.employeeCode}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name='pchId' label='PCH' rules={[{required:true,message:'PCH is requried'}]}>
                            <Select allowClear showSearch optionFilterProp="children" placeholder='Select PCH'>
                                {pch.map((e) => {
                                    return(
                                        <Option key={e.profitControlHeadId} value={e.profitControlHeadId}>{e.profitControlHead}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name='companyId' label='Company' rules={[{required:true,message:'Company is requried'}]}>
                            <Select allowClear showSearch optionFilterProp="children" placeholder='Select Comapny'>
                                {company.map((e) => {
                                    return(
                                        <Option key={e.companyId} value={e.companyId}>{e.companyName}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name='facilityId' label='Facility' rules={[{required:true,message:'Facility is requried'}]}>
                        <Select allowClear showSearch optionFilterProp="children" placeholder='Select Facility'>
                                {facility.map((e) => {
                                    return(
                                        <Option key={e.id} value={e.id}>{e.name}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name='divisionId' label='Division' rules={[{required:true,message:'Division is requried'}]}>
                        <Select allowClear showSearch optionFilterProp="children" placeholder='Select Division'>
                                {division.map((e) => {
                                    return(
                                        <Option key={e.divisionId} value={e.divisionId}>{e.divisionName}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name='warehouseId' label='Warehouse' rules={[{required:true,message:'Warehouse is requried'}]}>
                        <Select allowClear showSearch optionFilterProp="children" placeholder='Select Warehouse'>
                                {warehouse.map((e) => {
                                    return(
                                        <Option key={e.warehouseId} value={e.warehouseId}>{e.warehouseName}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name='coTypeId' label='CO Type' rules={[{required:true,message:'CO Type is requried'}]}>
                        {/* <Select allowClear showSearch optionFilterProp="children" placeholder='Select CO Type'>
                                {coType.map((e) => {
                                    return(
                                        <Option key={e.coTypeId} value={e.coTypeId}>{e.coType}</Option>
                                    )
                                })}
                            </Select> */}
                            <Input/>
                        </Form.Item>
                    </Col>
                    </Row>
                    <h1 style={{ color: 'grey', fontSize: '20px', textAlign: 'left' }}>PRODUCT DETAILS</h1>
                    <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name='currencyId' label='Currency' rules={[{required:true,message:'Currency is requried'}]}>
                        <Select allowClear showSearch optionFilterProp="children" placeholder='Select Currency'>
                                {currency.map((e) => {
                                    return(
                                        <Option key={e.currencyId} value={e.currencyId}>{e.currencyName}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name='licencetypeId' label='Licence Type' rules={[{required:true,message:'Licence Type is requried'}]}>
                        <Select allowClear showSearch optionFilterProp="children" placeholder='Select Licence Type'>
                                {licenceType.map((e) => {
                                    return(
                                        <Option key={e.liscenceTypeId} value={e.liscenceTypeId}>{e.liscenceType}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name='discount' label={<b>Discount(%)</b>} 
                          rules={[{
                            pattern: /^[0-9]*$/,
                            message: `Only numbers are accepted`
                          }]}
                        >
                            <Input placeholder="Enter discount"/>
                        </Form.Item>
                    </Col>
                    </Row>
                    </Card>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                        <Card bordered={false}>
                        <h1 style={{ color: 'grey', fontSize: '20px', textAlign: 'left' }}>TEAM DETAILS</h1>
                            <Row gutter={8}>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                                <Form.Item name='salesPersonId' label='Sales Person' rules={[{required:true,message:'Sales Person is requried'}]}>
                                    <Select allowClear showSearch optionFilterProp="children" placeholder='Select Sales Person'>
                                {salesPerson.map((e) => {
                                    return(
                                        <Option key={e.employeeId} value={e.employeeId}>{e.firstName}-{e.employeeCode}</Option>
                                    )
                                })}
                            </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                                <Form.Item name='fabricResponsibleId' label='Fabric Responsible' rules={[{required:true,message:'Fabric Responsible is requried'}]}>
                                    <Select allowClear showSearch optionFilterProp="children" placeholder='Select Fabric Responsible'>
                                {fabricResponsible.map((e) => {
                                    return(
                                        <Option key={e.employeeId} value={e.employeeId}>{e.firstName}-{e.employeeCode}</Option>
                                    )
                                })}
                            </Select>
                                </Form.Item>
                            </Col>
                            </Row>
                            <Row gutter={8}>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                                <Form.Item name='itemResponsibleId' label='Item Responsible' rules={[{required:true,message:'Item Responsible is requried'}]}>
                                    <Select allowClear showSearch optionFilterProp="children" placeholder='Select Item Responsible'>
                                {itemResponsible.map((e) => {
                                    return(
                                        <Option key={e.employeeId} value={e.employeeId}>{e.firstName}-{e.employeeCode}</Option>
                                    )
                                })}
                            </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                                <Form.Item name='trimResponsibleId' label='Trim Responsible' rules={[{required:true,message:'Trim Responsible is requried'}]}>
                                    <Select allowClear showSearch optionFilterProp="children" placeholder='Select Trim Responsible'>
                                {trimResponsible.map((e) => {
                                    return(
                                        <Option key={e.employeeId} value={e.employeeId}>{e.firstName}-{e.employeeCode}</Option>
                                    )
                                })}
                            </Select>
                                </Form.Item>
                            </Col>
                            </Row>
                            <h1 style={{ color: 'grey', fontSize: '20px', textAlign: 'left' }}>CUSTOMER DETAILS</h1>
                            <Row gutter={8}>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                                <Form.Item name='buyerAddress' label='Buyer Address' rules={[{required:true,message:'Buyer Address is requried'}]}>
                                <Select allowClear showSearch optionFilterProp="children" placeholder='Select Buyer Address' onChange={onAddressChange}>
                                {buyerAddress.map((e) => {
                                    return(
                                        <Option key={e.addressId} value={e.addressId} buyer={e.buyerInfo.buyerName}>{e.countryInfo.countryName}-{e.state}-{e.city}-{e.landmark}</Option>
                                    )
                                })}
                            </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                                <Form.Item name='buyerName' label='Buyer Name'>
                                    <Input disabled/>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                                <Form.Item name='buyerGroup' label='Buyer Group'>
                                    <Input/>
                                </Form.Item>
                            </Col>
                            </Row>
                            <Row gutter={8}>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                                <Form.Item name='agent' label='Agent' rules={[{required:true,message:'Agent is requried'}]}>
                                <Select allowClear showSearch optionFilterProp="children" placeholder='Select Agent'>
                                {employee.map((e) => {
                                    return(
                                        <Option key={e.employeeId} value={e.employeeId}>{e.firstName}-{e.employeeCode}</Option>
                                    )
                                })}
                            </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                                <Form.Item name='packageTerms' label='Package Terms' rules={[{required:true,message:'Package Terms is requried'}]}>
                                <Select allowClear showSearch optionFilterProp="children" placeholder='Select Package Terms'>
                                {packageTerms.map((e) => {
                                    return(
                                        <Option key={e.packageTermsId} value={e.packageTermsId}>{e.packageTermsName}</Option>
                                    )
                                })}
                            </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                                <Form.Item name='paymentMethodId' label='Payment Method' rules={[{required:true,message:'Payment Method is requried'}]}>
                                <Select allowClear showSearch optionFilterProp="children" placeholder='Select Payment Method'>
                                {paymentMethos.map((e) => {
                                    return(
                                        <Option key={e.paymentMethodId} value={e.paymentMethodId}>{e.paymentMethod}</Option>
                                    )
                                })}
                            </Select>
                                </Form.Item>
                            </Col>
                            </Row>
                            <Row gutter={8}>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                                <Form.Item name='paymentTerms' label='Payment Terms' rules={[{required:true,message:'Payment Terms is requried'}]}>
                                <Select allowClear showSearch optionFilterProp="children" placeholder='Select Payment Terms'>
                                {paymentTerms.map((e) => {
                                    return(
                                        <Option key={e.paymentTermsId} value={e.paymentTermsId}>{e.paymentTermsName}</Option>
                                    )
                                })}
                            </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                                <Form.Item name='deliveryMethodId' label='Delivery Method' rules={[{required:true,message:'Delivery Method is requried'}]}>
                                <Select allowClear showSearch optionFilterProp="children" placeholder='Select Delivery Method'>
                                {deliveryMethods.map((e) => {
                                    return(
                                        <Option key={e.deliveryMethodId} value={e.deliveryMethodId}>{e.deliveryMethod}</Option>
                                    )
                                })}
                            </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                                <Form.Item name='deliveryTerms' label='Delivery Terms' rules={[{required:true,message:'Delivery Terms is requried'}]}>
                                <Select allowClear showSearch optionFilterProp="children" placeholder='Select Delivery Terms'>
                                {deliveryTerms.map((e) => {
                                    return(
                                        <Option key={e.deliveryTermsId} value={e.deliveryTermsId}>{e.deliveryTermsName}</Option>
                                    )
                                })}
                            </Select>
                                </Form.Item>
                            </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row justify={'end'}>
                <Col xs={{ span: 6 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span:2  }}><Button type='primary' htmlType='submit'>Submit</Button></Col>
                <Col xs={{ span: 6 }} sm={{ span: 6}} md={{ span: 4 }} lg={{ span: 2 }} xl={{ span: 2 }}><Button onClick={onReset}>Reset</Button></Col>
                </Row>
                
            </Form>
        </Card>
    )
}

export default SettingsForm