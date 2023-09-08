import { BuyersService, ColourService, FabricWeaveService, ProfitControlHeadService, VendorsService } from "@project-management-system/shared-services";
import { Card, Col, Row ,Form, Select, Input, Button, DatePicker} from "antd"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const {Option} = Select;

export const SourcingRequisitionForm = () => {

    const [form] = Form.useForm()
    const colorService = new ColourService();
    const [color,setColor] = useState<any[]>([])
    const pchService = new ProfitControlHeadService()
    const [pch,setPch] = useState<any[]>([])
    const supplierService = new VendorsService()
    const [supplier,setSupplier] = useState<any[]>([])
    const buyerService = new BuyersService()
    const [buyer,setBuyer] = useState<any[]>([])
    const navigate = useNavigate()
    const weaveService = new FabricWeaveService()
    const [weave,setWeave] = useState<any[]>([])

    useEffect(()=>{
        getColor()
        getPCH()
        getSupplier()
        getBuyer()
        getweave()
    },[])

    const getColor = () => {
        colorService.getAllActiveColour().then(res =>{
            if(res.status) {
                setColor(res.data)
            }
        })
    }

    const getPCH = () => {
        pchService.getAllActiveProfitControlHead().then(res =>{
            if(res.status) {
                setPch(res.data)
            }
        })
    }

    const getSupplier = () => {
        supplierService.getAllActiveVendors().then(res =>{
            if(res.status) {
                setSupplier(res.data)
            }
        })
    }

    const getBuyer = () => {
        buyerService.getAllActiveBuyers().then(res =>{
            if(res.status) {
                setBuyer(res.data)
            }
        })
    }

    const getweave = () => {
        weaveService.getAllActiveFabricWeave().then(res =>{
            if(res.status) {
                setWeave(res.data)
            }
        })
    }

    const onReset = () => {
        form.resetFields();
    };

    const saveData = (values: any) => {
        console.log(values)
    };

    return(
        <Card title='Sourcing Requisition' className="card-header" style={{textAlign:'center'}}  extra={<span><Button onClick={() => navigate('/sourcing-requisition-view')} type={'primary'}>View</Button></span>}>
            <Form form={form} layout='vertical' onFinish={saveData}>
                <Row gutter={24}>
                    <h1 style={{ color: '#6b54bf', fontSize: '20px', textAlign: 'left' }}>FABRIC DETAILS</h1>
                </Row>
                <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='content' label='Content' rules={[{required:true,message:'Content is required'}]}>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Content'>
                        <Option key='naturalFabrics' value='naturalFabrics'>Natural Fabrics</Option>
                            <Option key='manufacturedFabrics' value='manufacturedFabrics'>Manufactured Fabrics</Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='fabricType' label='Type of Fabric'>
                        <Input placeholder="Enter Fabric Type"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='weave' label='Weave'  rules={[{required:true,message:'Weave is required'}]}>
                        <Select showSearch allowClear optionFilterProp="children">
                        {weave.map(e => {
                                return(
                                    <Option key={e.colourId} value={e.colourId}> {e.colour}</Option>
                                )
                            })}
                        </Select>
                        <Input placeholder="Enter Weave"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='weight' label='Weight'  rules={[{required:true,message:'Weight is required'}]}>
                        <Input placeholder="Enter Weight"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{marginTop:'2%'}}>
                    <Form.Item name='weightUnit'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                            <Option key='kg' value='kg'>
                                Kg
                            </Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='width' label='Width'>
                        <Input placeholder="Enter Width"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='construction' label='Construction(EPI XPPI)'  rules={[{required:true,message:'Construction is required'}]}>
                        <Input placeholder="Enter Construction"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='yarnCount' label='Yarn Count'  rules={[{required:true,message:'Yarn Count is required'}]}>
                        <Input placeholder="Enter Yarn Count"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{marginTop:'2%'}}>
                    <Form.Item name='yarnUnit'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                            <Option key='tex' value='tex'>TEX</Option>

                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='finish' label='Finish'  rules={[{required:true,message:'Finish is required'}]}>
                        <Input placeholder="Enter Finish"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='shrinkage' label='Shrinkage'>
                        <Input placeholder="Enter Shrinkage"/>
                    </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <h1 style={{ color: '#6b54bf', fontSize: '20px', textAlign: 'left' }}>ITEM DETAILS</h1>
                </Row>
                <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='color' label='Color'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Select Content'>
                            {color.map(e => {
                                return(
                                    <Option key={e.colourId} value={e.colourId}> {e.colour}</Option>
                                )
                            })}
                        </Select>
                        {/* <Input placeholder="Enter Color"/> */}
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='pch' label='PCH'>
                         <Select showSearch allowClear optionFilterProp="children" placeholder='Select PCH'>
                         {pch.map(e => {
                                return(
                                    <Option key={e.profitControlHeadId} value={e.profitControlHeadId}> {e.profitControlHead}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='moq' label='MOQ'>
                        {/* <Select showSearch allowClear optionFilterProp="children">
                            <Option key='content' value='content'>
                                Content
                            </Option>
                        </Select> */}
                        <Input placeholder="Enter MOQ"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{marginTop:'2%'}}>
                    <Form.Item name='moqUnit'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                            <Option key='pieces' value='pieces'>
                                Pieces
                            </Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='season' label='Season'>
                        {/* <Input placeholder="Enter Season"/> */}
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                            <Option key='spring' value='spring'>Spring</Option>
                            <Option key='autumn' value='autumn'>Autumn</Option>
                            <Option key='summer' value='summer'>Summer</Option>
                            <Option key='winter' value='winter'>Winter</Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='moqPrice' label='MOQ Price'>
                        <Input placeholder="Enter MOQ Price"/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{marginTop:'2%'}}>
                    <Form.Item name='moqPriceUnit'>
                        <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                            <Option key='inr' value='inr'>
                                INR
                            </Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='supplier' label='Supplier'>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select Supplier'>
                        {supplier.map(e => {
                                return(
                                    <Option key={e.vendorId} value={e.vendorId}>{e.vendorCode}-{e.vendorName}</Option>
                                )
                            })} 
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='grnDate' label='GRN Date'>
                        <DatePicker style={{width:'100%'}}/>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='buyer' label='Buyer'>
                    <Select showSearch allowClear optionFilterProp="children" placeholder='Select Buyer'>
                        {buyer.map(e => {
                                return(
                                    <Option key={e.buyerId} value={e.buyerId}>{e.buyerCode}-{e.buyerName}</Option>
                                )
                            })} 
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                    <Form.Item name='xlNo' label='XL No'>
                        <Input placeholder="Enter XL No"/>
                    </Form.Item>
                    </Col>
                </Row>
                <Row>
                <Col span={24} style={{ textAlign: 'right' }}>

                    <Button type="primary" htmlType="submit" >
                    Submit
                        </Button>
                    <Button htmlType="button" style={{ margin: '0 14px' }} onClick={onReset}>
                        Reset
                </Button>
                </Col>
                </Row>
            </Form>

        </Card>
    )

}

export default SourcingRequisitionForm