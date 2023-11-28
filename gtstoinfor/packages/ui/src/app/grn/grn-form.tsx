import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table, Tabs } from 'antd'
import style from 'antd/es/alert/style'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useEffect, useState } from 'react'
import PurchaseOrderfabricForm from '../purchase-order2/purchase-order-fabric'
import PurchaseOrderTrim from '../purchase-order2/purchase-order-trim'
import { BuyersService, GRNService, PurchaseOrderservice, UomService, VendorsService } from '@project-management-system/shared-services'
import TextArea from 'antd/es/input/TextArea'
import GRNFabricForm from './grn-fabric'
import GRNTrimForm from './grn-trim'
import { GRNTypeEnum, GrnDto, GrnItemsDto, PurchaseOrderStatus, VendorIdReq } from '@project-management-system/shared-models'
import AlertMessages from '../common/common-functions/alert-messages'
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from 'react-router-dom'


const GRNForm = () => {

    const{Option} = Select
    const [form] = Form.useForm()
    const [fabricForm] = Form.useForm()
    // const [tabName,setTabName] = useState<string>('Fabric')
    // const [fabricData, setFabricData]=useState<any[]>([])
    const vendorService = new VendorsService()
    const [vendor, setVendor] = useState<any[]>([])
    const [poNoData, setPoNoData] = useState<any[]>([])
    const [poData, setPoData] = useState<any[]>([])
    const poService = new PurchaseOrderservice()
    const [materialType, setMaterialType] = useState<string>('')
    const grnService = new GRNService()
    // const [formData,setFormData] = useState<any[]>([])
    // const [trimFormData, setTrimFormData]=useState<any[]>([])
    const navigate = useNavigate();
    const [selectedPoType, setSelectedPoType] = useState(null);
    const [uomData, setUomData] = useState<any[]>([])
    const uomService = new UomService()
    const [quantity, setQuantity]= useState<any>(undefined)
    const [reciveUomName, setReciveUomName] = useState<any>('')
    const [createChild, setCreateChild] = useState([])




    useEffect(()=>{
        getVendorsData()
        form.setFieldsValue({grnDate:dayjs()})
        getUomData()
    },[])

    const getUomData = () =>{
        uomService.getAllActiveUoms().then((res)=>{
          setUomData(res.data)
        })
      }

    const createGrn = (value:any, createChildData) => {
        console.log(createChildData,'slalalal')
        const req = new GrnDto(value.vendorId,poData[0]?.purchaseOrderId,form.getFieldValue('grnDate').format('YYYY-MM-DD'),value.contactPerson,PurchaseOrderStatus.OPEN,value.remarks,undefined,undefined,'',undefined,'',0,0,poData[0]?.materialType,createChildData,0,'',value.grnType,value.invoiceNo);
        console.log(req,'[][][][][][][]')
        grnService.createGrn(req).then((res) => {
            if (res.status) {
              AlertMessages.getSuccessMessage(res.internalMessage);
              navigate('/grn-view')
            } else {
              AlertMessages.getErrorMessage(res.internalMessage);
            }
          })
      };
      

    const getVendorsData = () =>{
        vendorService.getAllActiveVendors().then((res)=>{
            if(res.status){
                setVendor(res.data)
            }
        })
    }

    const getPoData =(value)=>{
        const req = new VendorIdReq(value)
        poService.getAllPONumbers(req).then((res)=>{
            if(res.status){
                setPoNoData(res.data)
            }
        })
    }

    const getPODataById = (val, option) => {
        if (!val) {
          setSelectedPoType(null);
          return;
        }
      
        const req = new VendorIdReq(0, val, option?.name,option.val);
        poService.getPODataById(req).then((res) => {
          if (res.status) {
            setPoData(res.data);
            form.setFieldsValue({ grnType: res.data[0].poAgainst });
            setSelectedPoType(res.data[0].poAgainst);
          }
        });
      };
      

    const onReset = () =>{
        form.resetFields()
        setPoData([])
    }

    const validateFabricForm = async (value) => {
        let createChildData;
    
        if (poData[0]?.materialType === 'Fabric') {
            try {
                const values = await form.validateFields();
    
                const updatedFormData = poData
                    .filter((record) => {
                        const key = record.key;
                        return (
                            values[`receivedQuantity_${record.poFabricId}_${key}`] ||
                            values[`acceptedQuantity_${record.poFabricId}_${key}`] ||
                            values[`rejectedQuantity_${record.poFabricId}_${key}`]
                        );
                    })
                    .map((record) => ({
                        poFabricId: record.poFabricId,
                        receivedQuantity: values[`receivedQuantity_${record.poFabricId}_${record.key}`],
                        acceptedQuantity: values[`acceptedQuantity_${record.poFabricId}_${record.key}`],
                        rejectedQuantity: values[`rejectedQuantity_${record.poFabricId}_${record.key}`],
                        rejectedUomId: values[`rejectedUomId_${record.poFabricId}_${record.key}`],
                        conversionQuantity: quantity,
                        conversionUomId: values[`acceptedUomId_${record.poFabricId}_${record.key}`],
                        ...record,
                    }));
    
                console.log(updatedFormData, 'fabric');
                createChildData = updatedFormData;
            } catch (error) {
                console.error('Error validating fields:', error);
                return;
            }
        }
    
        if (poData[0]?.materialType === 'Trim') {
            try {
                const values = await form.validateFields();
    
                const updatedFormData = poData
                    .filter((record) => {
                        const key = record.key;
                        return (
                            values[`receivedQuantity_${record.poTrimId}_${key}`] ||
                            values[`acceptedQuantity_${record.poTrimId}_${key}`] ||
                            values[`rejectedQuantity_${record.poTrimId}_${key}`]
                        );
                    })
                    .map((record) => ({
                        poTrimId: record.poTrimId,
                        receivedQuantity: values[`receivedQuantity_${record.poTrimId}_${record.key}`],
                        receivedUomId: values[`receivedUomId_${record.poTrimId}_${record.key}`],
                        acceptedQuantity: values[`acceptedQuantity_${record.poTrimId}_${record.key}`],
                        acceptedUomId: values[`acceptedUomId_${record.poTrimId}_${record.key}`],
                        rejectedQuantity: values[`rejectedQuantity_${record.poTrimId}_${record.key}`],
                        rejectedUomId: values[`rejectedUomId_${record.poTrimId}_${record.key}`],
                        conversionQuantity: quantity,
                        conversionUomId: values[`acceptedUomId_${record.poFabricId}_${record.key}`],
                        ...record,
                    }));
    
                console.log(updatedFormData, 'trim');
                createChildData = updatedFormData;
            } catch (error) {
                console.error('Error validating fields:', error);
                return;
            }
        }
    
        console.log(createChildData, 'final createChildData');
    
        // Now call createGrn with the validated data
        createGrn(value, createChildData);
    };
    

  
      const uomConversionFactors = {
        m: 1,          // 1 meter
        yd: 0.9144,    // 1 yard = 0.9144 meters
        gsm: 1,        // 1 gram per square meter
        'oz/yd²': 33.906, // 1 ounce per square yard = 33.906 grams per square meter
        pc: 1,         // 1 piece
        ly: 1,         // 1 length (assuming length is in meters)
        mm: 0.001,     // 1 millimeter = 0.001 meters
        in: 0.0254,    // 1 inch = 0.0254 meters
        cm: 0.01,      // 1 centimeter = 0.01 meters
        gr: 0.001      // 1 gram
      };
      
  
      const convertQuantity = (quantity, fromUom, toUom) => {
        if(quantity != null && fromUom != undefined && toUom != undefined){
          console.log(quantity,fromUom,toUom)
          if (fromUom === toUom) {
          console.log(quantity)
          setQuantity(quantity)
            return quantity;
          }
          if (!(fromUom in uomConversionFactors) || !(toUom in uomConversionFactors)) {
            console.log(fromUom in uomConversionFactors)
            throw new Error('Invalid units of measure');
          }
        
          const baseQuantity = quantity * uomConversionFactors[fromUom];
          const convertedQuantity = baseQuantity / uomConversionFactors[toUom];
          console.log(convertedQuantity)
          setQuantity(convertedQuantity)
          return convertedQuantity;
        }  
      };

      let convertedQty

      const acceptUomOnchange = (option, value, record) =>{
        const acceptedQuantity = form.getFieldValue(`acceptedQuantity_${record.poFabricId}_${record.key}`);
         convertedQty = convertQuantity(acceptedQuantity, reciveUomName, value?.type?value.type:undefined);
      }
     
      const receiveuomOnChange = (value,option) =>{
        console.log(option.name)
        setReciveUomName(option.name)
  
      }

    const acceptedQuantityOnchange =(value) =>{
        console.log(value)
        }


    const columns:any = [
        {
          title: <div style={{textAlign:"center"}}>M3 Fabric Code</div>,
          dataIndex: 'itemCode',
        },
        {
          title: <div style={{textAlign:"center"}}>Style</div>,
          dataIndex: 'style',
        },
        {
          title: <div style={{textAlign:"center"}}>Buyer</div>,
          dataIndex: 'buyer',
        },
        {
          title: <div style={{textAlign:"center"}}>PO Qty</div>,
          dataIndex: 'poQuantity',
          align:"right",
          render: (poQuantity, row) => `${poQuantity} ${row.uom}`,
        },
        {
          title: <div style={{textAlign:"center"}}>Previous Qty</div>,
          align:"right",
          dataIndex: 'grnQuantity',
          render:(value,rowData) =>{
            return(
              rowData.grnQuantity? rowData.grnQuantity:0
            )
          }
        },
        {
          title: <div style={{textAlign:"center"}}>Received Qty</div>,
          dataIndex: 'receivedQuantity',
          render: (_, record) => (
            <Form.Item
              name={`receivedQuantity_${record.poFabricId}_${record.key}`}
              rules={[
                {
                  validator: (_, value) => {
                    if (!value || (Number(value) <= record.poQuantity)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Cannot exceed PO Qty');
                  },
                },
              ]}
            >
              <Input 
                placeholder="Received Quantity" 
                type="number"
                pattern="^[0-9]*$"
              />
            </Form.Item>
          ),
        },
        {
          title: <div style={{textAlign:"center"}}>Accepted Qty</div>,
          dataIndex: 'acceptedQuantity',
          render: (_, record) => (
              <Form.Item
              name={`acceptedQuantity_${record.poFabricId}_${record.key}`}
              rules={[
                {
                  validator: (_, value) => {
                    if (!value || (Number(value) <= record.poQuantity)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Cannot exceed PO Qty');
                  },
                },
              ]}
              >
                <Input 
                placeholder="Accepted Quantity" 
                type="number"
                pattern="^[0-9]*$"
                onChange={acceptedQuantityOnchange}
                />
              </Form.Item>
          ),
        },
        {
          title: <div style={{textAlign:"center"}}>Rejected Qty</div>,
          dataIndex: 'rejectedQuantity',
          render: (index, record) => (
            <Form.Item
            name={`rejectedQuantity_${record.poFabricId}_${record.key}`}
            >
              <Input 
              placeholder="Rejected Quantity" 
              type="number"
                pattern="^[0-9]*$"
              />
            </Form.Item>
            ),
        },
        {
          title: <div style={{textAlign:"center"}}>UOM</div>,
          dataIndex: 'rejectedUomId',
          render: (index, record) => (
            <Form.Item
            name={`rejectedUomId_${record.poFabricId}_${record.key}`}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                showSearch
                optionFilterProp="children"
                placeholder="Select UOM"
              >
                {uomData?.map((e) => (
                  <Option key={e.uomId} value={e.uomId} name={`${record.poFabricId}`+`${record.key}+'rejectedUomId'`}>
                    {e.uom}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: <div style={{ textAlign: 'center' }}>Converted Qty</div>,
          dataIndex: 'convertedQty',
          render: (_, record) => {
            return   <Form.Item  name={`convertedQty_${record.poFabricId}_${record.key}`} initialValue={0}>  
              {<span>{Number(quantity)?Number(quantity):''}</span>}</Form.Item>
          },
        },
      ]

      const trimColumn:any = [
        {
          title: <div style={{textAlign:"center"}}>M3 Trim Code</div>,
          dataIndex: 'm3TrimCode',
        },
        {
          title: <div style={{textAlign:"center"}}>Style</div>,
          dataIndex: 'style',
        },
        {
          title: <div style={{textAlign:"center"}}>Buyer</div>,
          dataIndex: 'buyer',
        },
        {
          title: <div style={{textAlign:"center"}}>PO Qty</div>,
          dataIndex: 'poQuantity',
          align:"right",
          render: (poQuantity, row) => `${poQuantity} ${row.uom}`,
        },
        {
          title: <div style={{textAlign:"center"}}>Previous Qty</div>,
          align:"right",
          dataIndex: 'grnQuantity',
        },
        {
          title: <div style={{textAlign:"center"}}>Received Qty</div>,
          dataIndex: 'receivedQuantity',
          render: (_, record) => (
            <Form.Item
            name={`receivedQuantity_${record.poTrimId}_${record.key}`}>
              <Input placeholder="Received Quantity" 
              />
            </Form.Item>
          ),
        },
        {
          title: <div style={{textAlign:"center"}}>Accepted Qty</div>,
          dataIndex: 'acceptedQuantity',
          render: (_, record) => (
              <Form.Item
              name={`acceptedQuantity_${record.poTrimId}_${record.key}`}>
                <Input 
                placeholder="Accepted Quantity" 
                name={`${record.poTrimId}`+`${record.key}+'acceptedQuantity'`}
                onChange={acceptedQuantityOnchange}
                />
              </Form.Item>
          ),
        },
        {
          title: <div style={{textAlign:"center"}}>Rejected Qty</div>,
          dataIndex: 'rejectedQuantity',
          render: (index, record) => (
            <Form.Item
            name={`rejectedQuantity_${record.poTrimId}_${record.key}`}>
              <Input 
              placeholder="Accepted Quantity" 
              name={`${record.poTrimId}`+`${record.key}+'rejectedQuantity'`}
              />
            </Form.Item>
            ),
        },
        {
          title: <div style={{textAlign:"center"}}>UOM</div>,
          dataIndex: 'rejectedUomId',
          render: (index, record) => (
            <Form.Item
            name={`rejectedUomId_${record.poTrimId}_${record.key}`}>
              <Select
                allowClear
                style={{ width: "100%" }}
                showSearch
                optionFilterProp="children"
                placeholder="Select UOM"
              >
                {uomData?.map((e) => (
                  <Option key={e.uomId} value={e.uomId} name={`${record.poTrimId}`+`${record.key}+'rejectedUomId'`}>
                    {e.uom}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: <div style={{ textAlign: 'center' }}>Converted Qty</div>,
          dataIndex: 'convertedQty',
          render: (_, record) => {
            return   <Form.Item  name={`convertedQty_${record.poTrimId}_${record.key}`}>  
              {<span>{Number(quantity)?Number(quantity):''}</span>}</Form.Item>
          },
        },
      ]




    return(
        <>
        <Card title='GRN' headStyle={{ backgroundColor: '#69c0ff', border: 0 }}   extra={
          <span>
            <Button onClick={() => navigate("/grn-view")}>View</Button>
          </span>}>
            <Form form={form} layout="vertical" onFinish={validateFabricForm}>
                <Row gutter={8}>
                 <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                    <Form.Item name={'grnId'} hidden><Input></Input></Form.Item>
                        <Form.Item name='vendorId' label='Vendor' rules={[{required:true,message:'Vendor is required'}]}>
                           <Select showSearch allowClear optionFilterProp="children" placeholder='Select Vendor' onSelect={getPoData}>
                                {vendor.map(e => {
                                    return(
                                        <Option key={e.vendorId} value={e.vendorId}>{e.vendorName}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='purchaseOrderId' label='PO Number' rules={[{required:true,message:'PO Number is required'}]}>
                           <Select showSearch allowClear optionFilterProp="children" placeholder='Select Vendor' onChange={getPODataById}>
                                {poNoData.map(e => {
                                    return(
                                        <Option key={e.purchaseOrderId} value={e.purchaseOrderId} name={e.materialType} val={e.poAgainst}> {e.poNumber}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                  </Col>
                  {selectedPoType !== null && (
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='grnType' label='GRN Type' dependencies={['purchaseOrderId']}>
                           <Select showSearch allowClear optionFilterProp="children" disabled>
                           {Object.values(GRNTypeEnum).map((value) => (
                                <Option key={value} value={value}>
                                 <span style={{ fontWeight: 'bold' }}>{value}</span>
                                </Option>
                            ))}
                            </Select>
                        </Form.Item>
                  </Col>
                  )}
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='grnDate' label='GRN Date' rules={[{required:true,message:'Date is required'}]}>
                        <DatePicker style={{ width: '93%', marginLeft: 5 }} showToday/>
                        </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='contactPerson' label='Contact Person' 
                        rules={[
                            {
                              required: true,
                              message: 'Contact Person is required',
                            },
                            {
                              pattern: /^[A-Za-z]+$/,
                              message: 'Only alphabetic characters are allowed',
                            },
                          ]}
                        >
                        <Input style={{ width: '93%', marginLeft: 5 }} placeholder='Enter Contact Person'/>
                        </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='invoiceNo' label='Invoice No' 
                        rules={[
                            {
                              required: true,
                              message: 'Invoice is required',
                            },
                            {
                              pattern: /^[A-Za-z0-9]+$/,
                              message: 'Only alphanumeric characters are allowed',
                            },
                            {
                              min: 12,
                              max: 20,
                              message: 'Invoice number must be between 12 and 20 characters',
                            },
                          ]}
                        >
                        <Input style={{ width: '93%', marginLeft: 5 }} placeholder='Enter Invoice No'/>
                        </Form.Item>
                  </Col>
                   <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='remarks' label='Remarks'>
                            <TextArea rows={1} placeholder='Enter Remarks'/>
                        </Form.Item>
                  </Col>
                </Row>
                {selectedPoType !== null && poData[0]?.materialType === 'Fabric' ? (
                <Row>
                    <div style={{ overflowX: "auto", width: "100%" }}>
                        <Card title={<div style={{ color: "blue", fontSize: "17px",textAlign:"left"  }}>Fabric Details</div>} style={{textAlign:"right"}}>
                            <Table columns={columns} dataSource={poData} bordered scroll={{ x: "max-content" }} pagination={false} />
                        </Card>
                    </div>
                </Row>
                ) : null}
                {selectedPoType !== null && poData[0]?.materialType === 'Trim' ? (
                <Row>
                    <div style={{ overflowX: "auto", width: "100%" }}>
                        <Card title={<div style={{ color: "blue", fontSize: "17px",textAlign:"left" }}>Trim Details</div>} style={{ textAlign: 'right' }}>
                            <Table columns={trimColumn} dataSource={poData} bordered scroll={{ x: "max-content" }} pagination={false} />
                        </Card>
                    </div>
                </Row>
                ) : null}      
                <Row justify={'end'}>
                    <Col span={24} style={{ textAlign: "right", marginTop:'10px'}} >
                        <Button  type="primary" htmlType='submit'>Submit</Button>
                        <Button style={{ margin: "0 14px" }} onClick={onReset}>Reset</Button>
                    </Col>
                </Row>
            </Form>
        </Card>
        </>
    )

}

export default GRNForm