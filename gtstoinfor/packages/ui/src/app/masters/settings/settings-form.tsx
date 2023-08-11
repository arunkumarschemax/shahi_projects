import { UserSwitchOutlined } from "@ant-design/icons";
import { Res } from "@nestjs/common";
import { DepartmentReq } from "@project-management-system/shared-models";
import { BuyersService, CompanyService, CurrencyService, DeliveryMethodService, DeliveryTermsService, DivisionService, EmployeeDetailsService, FactoryService, LiscenceTypeService, PackageTermsService, PaymentMethodService, PaymentTermsService, ProfitControlHeadService, WarehouseService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, Input, Row, Select } from "antd"
import { useEffect, useState } from "react";

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
    },[])

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
                setCurrency(res.data)
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

    const onReset = () => {
        form.resetFields()
    }

    return(
        <Card title='Settings'>
            <Form layout="vertical" form={form}>
                <Form.Item name='settingId' style={{display:'none'}}>
                    <Input hidden/>
                </Form.Item>
                <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                    <Card bordered={false}>
                    <h1 style={{ color: 'grey', fontSize: '20px', textAlign: 'left' }}>COMPANY DETAILS</h1>
                    <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8}}>
                        <Form.Item name='accountControlId' label='Account Control' rules={[{required:true,message:'Account Control is reqired'}]}>
                        <Select allowClear showSearch optionFilterProp="children" placeholder='Select Account Control'>
                                {employee.map((e) => {
                                    return(
                                        <Option key={e.employeeId} value={e.employeeId}>{e.employee}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name='pchId' label='PCH' rules={[{required:true,message:'PCH is reqired'}]}>
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
                        <Form.Item name='companyId' label='Company' rules={[{required:true,message:'Company is reqired'}]}>
                            <Select allowClear showSearch optionFilterProp="children" placeholder='Select Comapny'>
                                {company.map((e) => {
                                    return(
                                        <Option key={e.companyId} value={e.companyId}>{e.company}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name='facilityId' label='Facility' rules={[{required:true,message:'Facility is reqired'}]}>
                        <Select allowClear showSearch optionFilterProp="children" placeholder='Select Facility'>
                                {facility.map((e) => {
                                    return(
                                        <Option key={e.factoryId} value={e.factoryId}>{e.factory}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name='divisionId' label='Division' rules={[{required:true,message:'Division is reqired'}]}>
                        <Select allowClear showSearch optionFilterProp="children" placeholder='Select Division'>
                                {division.map((e) => {
                                    return(
                                        <Option key={e.divisionId} value={e.divisionId}>{e.division}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name='warehouseId' label='Warehouse' rules={[{required:true,message:'Warehouse is reqired'}]}>
                        <Select allowClear showSearch optionFilterProp="children" placeholder='Select Warehouse'>
                                {warehouse.map((e) => {
                                    return(
                                        <Option key={e.warehouseId} value={e.warehouseId}>{e.warehouse}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name='coTypeId' label='CO Type' rules={[{required:true,message:'CO Type is reqired'}]}>
                        <Select allowClear showSearch optionFilterProp="children" placeholder='Select CO Type'>
                                {coType.map((e) => {
                                    return(
                                        <Option key={e.coTypeId} value={e.coTypeId}>{e.coType}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    </Row>
                    <h1 style={{ color: 'grey', fontSize: '20px', textAlign: 'left' }}>PRODUCT DETAILS</h1>
                    <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name='currencyId' label='Currency' rules={[{required:true,message:'Currency is reqired'}]}>
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
                        <Form.Item name='licencetypeId' label='Licence Type' rules={[{required:true,message:'Licence Type is reqired'}]}>
                        <Select allowClear showSearch optionFilterProp="children" placeholder='Select Licence Type'>
                                {licenceType.map((e) => {
                                    return(
                                        <Option key={e.licencetypeId} value={e.licencetypeId}>{e.licenceType}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                        <Form.Item name='discount' label={<b>Discount(%)</b>}>
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
                                <Form.Item name='salesPersonId' label='Sales Person' rules={[{required:true,message:'Sales Person is reqired'}]}>
                                    <Select allowClear showSearch optionFilterProp="children" placeholder='Select Sales Person'>
                                {salesPerson.map((e) => {
                                    return(
                                        <Option key={e.employeeId} value={e.employeeId}>{e.employee}</Option>
                                    )
                                })}
                            </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                                <Form.Item name='fabricResponsibleId' label='Fabric Responsible' rules={[{required:true,message:'Fabric Responsible is reqired'}]}>
                                    <Select allowClear showSearch optionFilterProp="children" placeholder='Select Fabric Responsible'>
                                {fabricResponsible.map((e) => {
                                    return(
                                        <Option key={e.employeeId} value={e.employeeId}>{e.employee}</Option>
                                    )
                                })}
                            </Select>
                                </Form.Item>
                            </Col>
                            </Row>
                            <Row gutter={8}>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                                <Form.Item name='itemResponsibleId' label='Item Responsible' rules={[{required:true,message:'Item Responsible is reqired'}]}>
                                    <Select allowClear showSearch optionFilterProp="children" placeholder='Select Item Responsible'>
                                {itemResponsible.map((e) => {
                                    return(
                                        <Option key={e.employeeId} value={e.employeeId}>{e.employee}</Option>
                                    )
                                })}
                            </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                                <Form.Item name='trimResponsibleId' label='Trim Responsible' rules={[{required:true,message:'Trim Responsible is reqired'}]}>
                                    <Select allowClear showSearch optionFilterProp="children" placeholder='Select Trim Responsible'>
                                {trimResponsible.map((e) => {
                                    return(
                                        <Option key={e.employeeId} value={e.employeeId}>{e.employee}</Option>
                                    )
                                })}
                            </Select>
                                </Form.Item>
                            </Col>
                            </Row>
                            <h1 style={{ color: 'grey', fontSize: '20px', textAlign: 'left' }}>CUSTOMER DETAILS</h1>
                            <Row gutter={8}>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                                <Form.Item name='buyerAddress' label='Buyer Address' rules={[{required:true,message:'Buyer Address is reqired'}]}>
                                    <Input/>
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
                                <Form.Item name='agent' label='Agent' rules={[{required:true,message:'Agent is reqired'}]}>
                                <Select allowClear showSearch optionFilterProp="children" placeholder='Select Agent'>
                                {employee.map((e) => {
                                    return(
                                        <Option key={e.employeeId} value={e.employeeId}>{e.employee}</Option>
                                    )
                                })}
                            </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                                <Form.Item name='packageTerms' label='Package Terms' rules={[{required:true,message:'Package Terms is reqired'}]}>
                                <Select allowClear showSearch optionFilterProp="children" placeholder='Select Package Terms'>
                                {packageTerms.map((e) => {
                                    return(
                                        <Option key={e.packageTermsId} value={e.packageTermsId}>{e.packageTerms}</Option>
                                    )
                                })}
                            </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                                <Form.Item name='paymentMethod' label='Payment Method' rules={[{required:true,message:'Payment Method is reqired'}]}>
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
                                <Form.Item name='paymentTerms' label='Payment Terms' rules={[{required:true,message:'Payment Terms is reqired'}]}>
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
                                <Form.Item name='deliveryMethod' label='Delivery Method' rules={[{required:true,message:'Delivery Method is reqired'}]}>
                                <Select allowClear showSearch optionFilterProp="children" placeholder='Select Delivery Method'>
                                {deliveryMethods.map((e) => {
                                    return(
                                        <Option key={e.deliveryMethodId} value={e.deliveryMethodId}>{e.delivery}</Option>
                                    )
                                })}
                            </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 8 }}>
                                <Form.Item name='deliveryTerms' label='Delivery Terms' rules={[{required:true,message:'Delivery Terms is reqired'}]}>
                                <Select allowClear showSearch optionFilterProp="children" placeholder='Select Delivery Terms'>
                                {deliveryTerms.map((e) => {
                                    return(
                                        <Option key={e.deliveryTermId} value={e.deliveryTermId}>{e.deliveryTerm}</Option>
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