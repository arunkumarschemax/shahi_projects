import { Button, Card, Col, DatePicker, Divider, Form, Input, Row, Select, Table, Tabs } from 'antd'
import style from 'antd/es/alert/style'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useEffect, useState } from 'react'
import PurchaseOrderfabricForm from '../purchase-order2/purchase-order-fabric'
import PurchaseOrderTrim from '../purchase-order2/purchase-order-trim'
import { BuyersService, GRNService, PurchaseOrderservice, UomService, VendorsService } from '@project-management-system/shared-services'
import TextArea from 'antd/es/input/TextArea'
import GRNFabricForm from './grn-fabric'
import GRNTrimForm from './grn-trim'
import { GRNTypeEnum, GrnDto, GrnItemsDto, GrnItemsFormDto, PoItemEnum, PurchaseOrderStatus, VendorIdReq } from '@project-management-system/shared-models'
import AlertMessages from '../common/common-functions/alert-messages'
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from 'react-router-dom'
import { EditOutlined, MinusCircleOutlined } from '@ant-design/icons'

// const data : GrnItemsFormDto[] = []
// const obj1 : GrnItemsFormDto = new GrnItemsFormDto(1,1,'YY/FAB00001','Activewear Fabrics',17,PoItemEnum.OPEN,3,'Inch',3000,5,2,5000,0,0,1200,18,'red',1,null,1,'')
// const obj2 : GrnItemsFormDto = new GrnItemsFormDto(2,2,'YY/FAB00002','Automotive Fabric',21,PoItemEnum.OPEN,3,'Inch',3000,5,2,5000,0,0,1200,18,'red',1,null,1,'')


const GRNForm = () => {

  const { Option } = Select
  const [form] = Form.useForm()
  const [fabricForm] = Form.useForm()
  // const [tabName,setTabName] = useState<string>('Fabric')
  // const [fabricData, setFabricData]=useState<any[]>([])
  const vendorService = new VendorsService()
  const [vendor, setVendor] = useState<any[]>([])
  const [poNoData, setPoNoData] = useState<any[]>([])
  const [poData, setPoData] = useState<any>()
  const poService = new PurchaseOrderservice()
  const [materialType, setMaterialType] = useState<string>('')
  const grnService = new GRNService()
  // const [formData,setFormData] = useState<any[]>([])
  // const [trimFormData, setTrimFormData]=useState<any[]>([])
  const navigate = useNavigate();
  const [selectedPoType, setSelectedPoType] = useState(null);
  const [uomData, setUomData] = useState<any[]>([])
  const uomService = new UomService()
  const [quantity, setQuantity] = useState<any>(undefined)
  const [reciveUomName, setReciveUomName] = useState<any>('')
  const [createChild, setCreateChild] = useState([])
  const [poItemData, setPoItemData] = useState<GrnItemsFormDto[]>()
  const [selectedItem, setSelectedItem] = useState<any>()
  const [itemsForm] = Form.useForm()



  useEffect(() => {
    getVendorsData()
    form.setFieldsValue({ grnDate: dayjs() })
    getUomData()
  }, [])

  const getUomData = () => {
    uomService.getAllActiveUoms().then((res) => {
      setUomData(res.data)
    })
  }


  const createGrn = async () => {
    await form.validateFields()
    const values = form.getFieldsValue()
    const req = new GrnDto(values.vendorId, values.purchaseOrderId, form.getFieldValue('grnDate').format('YYYY-MM-DD'), PurchaseOrderStatus.OPEN, values.remarks, undefined, undefined, '', undefined, '', 0, 0, poData[0]?.poMaterialType, poItemData, 0, '', values.grnType, values.invoiceNo, poData?.poMaterialType,values.grnAmount);
    grnService.createGrn(req).then((res) => {
      if (res.status) {
        AlertMessages.getSuccessMessage(res.internalMessage);
        navigate('/grn-view')
      } else {
        AlertMessages.getErrorMessage(res.internalMessage);
      }
    })
  };


  const getVendorsData = () => {
    vendorService.getAllActiveVendors().then((res) => {
      if (res.status) {
        setVendor(res.data)
      }
    })
  }

  const getPoData = (value) => {
    form.resetFields(['purchaseOrderId'])
    itemsForm.resetFields()
    setPoItemData([])
    const req = new VendorIdReq(value)
    poService.getAllPONumbers(req).then((res) => {
      if (res.status) {
        setPoNoData(res.data)
      }
    })
  }

  const getPODataById = (val, option) => {
    itemsForm.resetFields()
    setPoData([])
    setPoItemData([])
    const req = new VendorIdReq(0, val, option?.name, option.val);
    poService.getPODataById(req).then((res) => {
      if (res.status) {
        setPoData(res.data[0]);
        setPoItemData(res.data[0].grnItems)
        form.setFieldsValue({ grnType: res.data[0].poAgainst });
      }
    });
  };


  const onReset = () => {
    form.resetFields()
    setPoData([])
  }





  const setDataToForm = (record) => {
    itemsForm.setFieldsValue({
      m3itemCode: record.m3ItemCode,
      uom: record.uom,
      poQuantity: record.poQuantity,
      m3ItemType: record.m3ItemType,
      grnQuantity: record.grnQuantity,
      buyer: record.buyer,
      unitPrice: record.unitPrice,
      discount: record.discount,
      tax: record.tax,
      transportation: record.transportation,
      subjectiveAmount: record.subjectiveAmount,
      receivedQuantity: 0,
      acceptedQuantity: 0,
      poItemId: record.poItemId,
      conversionUomId:record.uomId
    })
  }

  function handleRemovePoItem(record) {
    setPoItemData(prevData =>
      prevData.filter(item => item.poItemId !== record.poItemId)
    );
  }


  const columns: any = [
    {
      title: <div style={{ textAlign: "center" }}> Item Code</div>,
      fixed: 'left',
      dataIndex: 'm3ItemCode',

    },
    {
      title: <div style={{ textAlign: "center" }}> Item Type</div>,
      dataIndex: 'm3ItemType',
      fixed: 'left',

    },
    // {
    //   title: <div style={{textAlign:"center"}}>Style</div>,
    //   dataIndex: 'style',
    // },
    {
      title: <div style={{ textAlign: "center" }}>Buyer</div>,
      dataIndex: 'buyer',
      fixed: 'left',

    },
    {
      title: <div style={{ textAlign: "center" }}>PO Qty</div>,
      dataIndex: 'poQuantity',
      align: "right",
      render: (poQuantity, row) => `${poQuantity} ${row.uom}`,
    },
    {
      title: <div style={{ textAlign: "center" }}>Previous Qty</div>,
      align: "right",
      dataIndex: 'grnQuantity',
      render: (value, rowData) => {
        return (
          rowData.grnQuantity ? rowData.grnQuantity : 0
        )
      }
    },
    {
      title: <div style={{ textAlign: "center" }}>Received Qty</div>,
      dataIndex: 'receivedQuantity',
      render: (value, rowData) => {
        return (
          value ? value : (rowData.poQuantity-rowData.grnQuantity)
          
        )
      }
     

    },
    {
      title: <div style={{ textAlign: "center" }}>Accepted Qty</div>,
      dataIndex: 'acceptedQuantity',
      render: (value, rowData) => {
        return (
          value ? value : (rowData.poQuantity-rowData.grnQuantity)
        )
      }

    },
    {
      title: <div style={{ textAlign: "center" }}>Rejected Qty</div>,
      dataIndex: 'rejectedQuantity',
      render: (value, rowData) => {
        return (
          value ? value : 0
        )
      }
    },
    {
      title: <div style={{ textAlign: "center" }}>UOM</div>,
      dataIndex: 'uom',

    },
    {
      title: 'Received UOM',
      dataIndex: 'convertedUOMOnChange',
      render: (value, record) => {
        return value ? value : record.uom
      }
    },
    {
      title: <div style={{ textAlign: 'center' }}>Unit Price</div>,
      dataIndex: 'unitPrice',

    },
    {
      title: <div style={{ textAlign: 'center' }}>Discount</div>,
      dataIndex: 'discount',

    },
    {
      title: <div style={{ textAlign: 'center' }}>Tax</div>,
      dataIndex: 'tax',

    },

    {
      title: <div style={{ textAlign: 'center' }}>Transportation</div>,
      dataIndex: 'transportation',
      render: (value, rowData) => {
        return (
          value ? value : 0
        )
      }

    },
    {
      title: 'Subjective Amount',
      dataIndex: 'subjectiveAmount',
      render: (value, rowData) => {
        return (
          rowData.revisedSubjectivePrice ? rowData.revisedSubjectivePrice : value
        )
      }
    },
    // {
    //   title: <div style={{ textAlign: 'center' }}>Converted Qty</div>,
    //   dataIndex: 'convertedQty',
    //   render: (_, record) => {
    //     return <Form.Item name={`convertedQty_${record.poFabricId}_${record.key}`} initialValue={0}>
    //       {<span>{Number(quantity) ? Number(quantity) : ''}</span>}</Form.Item>
    //   },
    // },
    {
      title: 'Action',
      fixed: 'right',
      render: (_, record) => <span>
        <EditOutlined onClick={() => setDataToForm(record)} />

        {
          poItemData.length > 1 ? <>
            <Divider type='vertical' />
            <MinusCircleOutlined onClick={() => handleRemovePoItem(record)} />
          </> : <></>
        }
      </span>
    }
  ]


  function receivedQuantityOnChange(e) {
    const poItemId = itemsForm.getFieldValue('poItemId')
    setPoItemData(prevData =>
      prevData.map(item => {
        if (item.poItemId === poItemId) {
          return {
            ...item,
            receivedQuantity: e.target.value
          };
        }
        return item;
      }))
      calculatePrices()
  }

  function acceptedQuantityOnChange(e) {
    const poItemId = itemsForm.getFieldValue('poItemId')

    setPoItemData(prevData =>
      prevData.map(item => {
        if (item.poItemId === poItemId) {
          return {
            ...item,
            acceptedQuantity: e.target.value,
            rejectedQuantity: item.poQuantity - Number(e.target.value)
          };
        }
        return item;
      }))
      console.log(poItemData)
  }


  function calculatePrices() {
    const poItemId = itemsForm.getFieldValue('poItemId')
    const subjectivePrice = Number(itemsForm.getFieldValue('subjectiveAmount'))
    const acceptedQty = Number(itemsForm.getFieldValue('acceptedQuantity'))
    const poQty = Number(itemsForm.getFieldValue('poQuantity'))
    const unitPrice = Number((subjectivePrice) / poQty)
    const totalSubjectivePrice = (Number(acceptedQty) * Number(unitPrice))
    setPoItemData(prevData =>
      prevData.map(item => {
        if (item.poItemId == poItemId) {
          return {
            ...item,
            grnItemAmount: totalSubjectivePrice
          };
        }
        return item;
      }))
    let totalGrnAmount = 0
   poItemData.forEach((v) => {
      if (v.poItemId == poItemId) {
        v.grnItemAmount = totalSubjectivePrice
      }
      totalGrnAmount += v.grnItemAmount ? Number(v.grnItemAmount) : Number(v.subjectiveAmount)
    })
    form.setFieldValue('grnAmount',totalGrnAmount)
  }

  function convertedUOMOnChange(e) {
    console.log(e)
    const poItemId = itemsForm.getFieldValue('poItemId')
    setPoItemData(prevData =>
      prevData.map(item => {
        if (item.poItemId === poItemId) {
          return {
            ...item,
            conversionUomId: e,
          };
        }
        return item;
      }))

  }

  function itemsFormReset() {
    itemsForm.resetFields()
  }




  return (
    <>
      <Card title='GRN' headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={
        <span>
          <Button onClick={() => navigate("/grn-view")}>View</Button>
        </span>}>
        <Form form={form} layout="vertical" >
          <Form.Item name={'grnAmount'} hidden><Input></Input></Form.Item>
          <Row gutter={8}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
              <Form.Item name={'grnId'} hidden><Input></Input></Form.Item>
              <Form.Item name='vendorId' label='Vendor' rules={[{ required: true, message: 'Vendor is required' }]}>
                <Select showSearch allowClear optionFilterProp="children" placeholder='Select Vendor' onSelect={getPoData}>
                  {vendor.map(e => {
                    return (
                      <Option key={e.vendorId} value={e.vendorId}>{e.vendorName}</Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
              <Form.Item name='purchaseOrderId' label='PO Number' rules={[{ required: true, message: 'PO Number is required' }]}>
                <Select showSearch allowClear optionFilterProp="children" placeholder='Select Vendor' onChange={getPODataById}>
                  {poNoData.map(e => {
                    return (
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
              <Form.Item name='grnDate' label='GRN Date' rules={[{ required: true, message: 'Date is required' }]}>
                <DatePicker style={{ width: '93%', marginLeft: 5 }} showToday />
              </Form.Item>
            </Col>
            {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
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
                <Input style={{ width: '93%', marginLeft: 5 }} placeholder='Enter Contact Person' />
              </Form.Item>
            </Col> */}
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
                    min: 4,
                    max: 20,
                    message: 'Invoice number must be between 12 and 20 characters',
                  },
                ]}
              >
                <Input style={{ width: '93%', marginLeft: 5 }} placeholder='Enter Invoice No' />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
              <Form.Item name='remarks' label='Remarks'>
                <TextArea rows={1} placeholder='Enter Remarks' />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Card title='Items'>
          <Form form={itemsForm} layout="vertical">
            <Row gutter={24} >
              <Form.Item name={'poItemId'} hidden><Input></Input></Form.Item>
              <Form.Item name={'grnItemAmount'} hidden><Input></Input></Form.Item>

              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                <Form.Item name='m3itemCode' label='M3 Item'>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                <Form.Item name='m3ItemType' label='M3 Item Type'>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} hidden>
                <Form.Item name='uom' label='UOM'>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} hidden>
                <Form.Item name='poQuantity' label='Po Qty'>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                <Form.Item
                  name={`receivedQuantity`}
                  label='Received Qty'

                >
                  <Input
                    placeholder="Received Quantity"
                    type="number"
                    pattern="^[0-9]*$"
                    min={0}
                    onChange={receivedQuantityOnChange}
                  />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                <Form.Item
                  name={`acceptedQuantity`}
                  label='Accepted Qty'
                >
                  <Input
                    placeholder="Accepted Quantity"
                    type="number"
                    pattern="^[0-9]*$"
                    onChange={acceptedQuantityOnChange}
                  />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                <Form.Item name='conversionUomId' label='Received UOM'>
                  <Select
                  disabled
                    allowClear
                    style={{ width: "100%" }}
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select UOM"
                    onChange={convertedUOMOnChange}
                  >
                    {uomData?.map((e) => (
                      <Option key={e.uomId} value={e.uomId}>
                        {e.uom}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }} hidden>
                <Form.Item name='unitPrice' label='Unit price'>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }} hidden>
                <Form.Item name='discount' label='Discount'>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }} hidden>
                <Form.Item name='tax' label='Tax %'>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }} hidden>
                <Form.Item name='transportation' label='Transportation'>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }} hidden>
                <Form.Item name='subjectiveAmount' label='Subjective Amount'>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col>
                <Button style={{ marginTop: '25px' }} onClick={itemsFormReset} >Reset</Button>
              </Col>
            </Row>
          </Form>

          <Row>
            <Table scroll={{ x: 'max-content' }} columns={columns} dataSource={poItemData} bordered pagination={false} />
          </Row>
        </Card>

        <Row justify={'end'}>
          <Col span={24} style={{ textAlign: "right", marginTop: '10px' }} >
            <Button type="primary" onClick={createGrn}>Submit</Button>
            <Button style={{ margin: "0 14px" }} onClick={onReset}>Reset</Button>
          </Col>
        </Row>


      </Card>
    </>
  )

}

export default GRNForm