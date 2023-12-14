import { Button, Card, Col, DatePicker, Divider, Form, Input, Modal, Row, Select, Table, Tabs, Typography, message, notification } from 'antd'
import style from 'antd/es/alert/style'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useEffect, useState } from 'react'
import PurchaseOrderfabricForm from '../purchase-order2/purchase-order-fabric'
import PurchaseOrderTrim from '../purchase-order2/purchase-order-trim'
import { BuyersService, GRNService, PurchaseOrderservice, TrimParamsMappingService, UomService, VendorsService } from '@project-management-system/shared-services'
import TextArea from 'antd/es/input/TextArea'
import GRNFabricForm from './grn-fabric'
import GRNTrimForm from './grn-trim'
import { GRNTypeEnum, GrnDto, GrnItemsDto, GrnItemsFormDto, ItemTypeEnumDisplay, PoItemEnum, PurchaseOrderStatus, TrimIdRequestDto, VendorIdReq } from '@project-management-system/shared-models'
import AlertMessages from '../common/common-functions/alert-messages'
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from 'react-router-dom'
import { EditOutlined, MinusCircleOutlined, QrcodeOutlined } from '@ant-design/icons'
import { useIAMClientState } from '../common/iam-client-react'
import { QrScanner } from './qr-scanner'

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
  const { IAMClientAuthContext, dispatch } = useIAMClientState();
  const paramsService = new TrimParamsMappingService()
  const [mapData, setMapData] = useState<any[]>([])


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
    form.validateFields().then(() => {

      const values = form.getFieldsValue()
      console.log(values,'rrrr')
      const req = new GrnDto(values.vendorId, values.purchaseOrderId, form.getFieldValue('grnDate').format('YYYY-MM-DD'), PurchaseOrderStatus.OPEN, values.remarks, undefined, undefined, '', undefined, '', 0, 0, poData[0]?.poMaterialType, poItemData, 0, '',values.grnType, values.invoiceNo, poData?.poMaterialType, values.grnAmount,form.getFieldValue('invoiceDate').format('YYYY-MM-DD'));
      grnService.createGrn(req).then((res) => {
        if (res.status) {
          AlertMessages.getSuccessMessage(res.internalMessage);
          navigate('/grn-view')
        } else {
          AlertMessages.getErrorMessage(res.internalMessage);
        }
      })
    }).catch(() => {
      // message.error('Please fill all required fields')
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
    const buyerRefNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null
    const req = new VendorIdReq(value,null,null,null,buyerRefNo)
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
    if(option && option?.name.includes('TRIM')){
    getMappedTrims(option?.mapId)
    }else{
      setMapData([])
    }

    const req = new VendorIdReq(0, val, option?.name, option?.val);
    poService.getPODataById(req).then((res) => {
      if (res.status) {
        setPoData(res.data[0]);
        setPoItemData(res.data[0].grnItems)
        form.setFieldsValue({ grnType: res.data[0].poAgainst == "Sample Order" ? GRNTypeEnum.SAMPLE_ORDER : GRNTypeEnum.INDENT});
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
      receivedQuantity: record.receivedQuantity,
      acceptedQuantity: record.acceptedQuantity,
      poItemId: record.poItemId,
      conversionUomId: record.uomId
    })
   

  }

  function handleRemovePoItem(record) {
    setPoItemData(prevData =>
      prevData.filter(item => item.poItemId !== record.poItemId)
    );
  }

  const getMappedTrims = (value?) => {
    const req = new TrimIdRequestDto(value)
    paramsService.getMappedParamsByTrim(req).then((res) => {
      if (res.status) {
        setMapData(res.data)
      }
    });
  }

  const columns: any = [
    {
      title: <div style={{ textAlign: "center" }}>Buyer</div>,
      dataIndex: 'buyer',
      fixed: 'left',
    },
    poData?.poMaterialType !== 'Fabric'?{
      title:<div style={{textAlign:"center"}}>Trim Params</div>,
      dataIndex:"trimParams",
    }:{},
    {
      title: <div style={{ textAlign: "center" }}> Item Code</div>,
      // fixed: 'left',
      dataIndex: 'm3ItemCode',
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
      // render: (value, rowData) => {
      //   return (
      //     value ? value : (rowData.poQuantity - rowData.grnQuantity)

      //   )
      // }


    },
    {
      title: <div style={{ textAlign: "center" }}>Accepted Qty</div>,
      dataIndex: 'acceptedQuantity',
      // render: (value, rowData) => {
      //   return (
      //     value ? value : (rowData.poQuantity - rowData.grnQuantity)
      //   )
      // }

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
    {
      title: 'Grn Amount',
      dataIndex: 'grnItemAmount',
     
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
  const filteredColumns = columns.filter((column) => Object.keys(column).length > 0);



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
            rejectedQuantity: item.receivedQuantity - Number(e.target.value)
          };
        }
        return item;
      }))
    
  }


  function calculatePrices() {
    const poItemId = itemsForm.getFieldValue('poItemId')
    const subjectivePrice = Number(itemsForm.getFieldValue('subjectiveAmount'))
    const acceptedQty = Number(itemsForm.getFieldValue('receivedQuantity'))
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
    form.setFieldValue('grnAmount', totalGrnAmount)
    console.log(poItemData)
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

  const [showQrSacn, setShowQrScan] = useState<boolean>(false);
  const [modal, setModal] = useState('')

  const poNumberQr = (e) =>{
    setShowQrScan(true);
     setModal('poNumber')
  }

  const handleQrScan = (value) => {
    setShowQrScan(false);
    const selectedVendor = form.getFieldValue('vendorId');
    if (!selectedVendor) {
      setTimeout(() => {
        notification.info({message:'Please select a vendor'});
      });
      return;
    }
  
    const poNumber = poNoData.filter((el) => el.poNumber === value.text)[0];
    if (!poNumber) {
      setTimeout(() => {
      notification.warning({message:'Scanned PO does not match with Vendor POs'});
    },2000);
      return;
    }

    if (poNumber) {
      getPODataById(poNumber.purchaseOrderId, { name: poNumber.materialType, val: poNumber.poAgainst });
      form.setFieldsValue({
        purchaseOrderId: poNumber.poNumber,
      });
    }
  }
  

  return (
    <>
      <Card title='GRN' headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={
        <span>
          <Button onClick={() => navigate("/grn-view")}>View</Button>
        </span>}>
        <Form form={form} layout="vertical" >
          <Form.Item name={'grnAmount'} hidden><Input></Input></Form.Item>
          <Form.Item name={'grnQuantity'} hidden><Input></Input></Form.Item>
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
                <Select showSearch allowClear optionFilterProp="children" placeholder='Select Vendor' onChange={getPODataById}
                suffixIcon={<QrcodeOutlined
                  onClick={(e) => { poNumberQr(e.target) }}
                  style={{ fontSize: '28px', marginLeft: '-7px' }} />}
                >
                  {poNoData.map(e => {
                    return (
                      <Option key={e.purchaseOrderId} value={e.purchaseOrderId} name={e.materialType} val={e.poAgainst} mapId={e.trimMappingId}> {e.poNumber}</Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
           
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                <Form.Item name='grnType' label='GRN Type' dependencies={['purchaseOrderId']} >
                  <Select showSearch allowClear optionFilterProp="children" disabled>
                    {Object.values(GRNTypeEnum).map((value) => (
                      <Option key={value} value={value}>
                        <span style={{ fontWeight: 'bold' }}>{value}</span>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
          
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
              <Form.Item name='invoiceDate' label='Invoice Date'
              rules={[{ required: true, message: 'Date is required' }]}
               >
                <DatePicker style={{ width: '93%', marginLeft: 5 }} showToday />
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

              {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}> */}
              <Form.Item name='m3itemCode' label='M3 Item' hidden>
                <Input disabled />
              </Form.Item>
              {/* </Col> */}
              {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}> */}
              <Form.Item name='m3ItemType' label='M3 Item Type' hidden>
                <Input disabled />
              </Form.Item>
              {/* </Col> */}
              {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} hidden> */}
              <Form.Item name='uom' label='UOM' hidden>
                <Input disabled />
              </Form.Item>
              {/* </Col> */}
              {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} hidden> */}
              <Form.Item name='poQuantity' label='Po Qty' hidden>
                <Input disabled />
              </Form.Item>
              {/* </Col> */}
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
              {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}> */}
              <Form.Item name='conversionUomId' label='Received UOM' hidden>
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
              {/* </Col> */}

              {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }} hidden> */}
              <Form.Item name='unitPrice' label='Unit price' hidden>
                <Input disabled />
              </Form.Item>
              {/* </Col> */}
              {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }} hidden> */}
              <Form.Item name='discount' label='Discount' hidden>
                <Input disabled />
              </Form.Item>
              {/* </Col> */}
              {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }} hidden> */}
              <Form.Item name='tax' label='Tax %' hidden>
                <Input disabled />
              </Form.Item>
              {/* </Col> */}
              {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }} hidden> */}
              <Form.Item name='transportation' label='Transportation' hidden>
                <Input disabled />
              </Form.Item>
              {/* </Col> */}
              {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }} hidden> */}
              <Form.Item name='subjectiveAmount' label='Subjective Amount' hidden>
                <Input disabled />
              </Form.Item>
              {/* </Col> */}
              <Col>
                <Button style={{ marginTop: '25px' }} onClick={itemsFormReset} >Reset</Button>
              </Col>
              {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 6 }} hidden>
                <Card title={false}>
                  <Typography.Text >Po Quantity</Typography.Text><br />

                  <Typography.Text >Grn Quantity</Typography.Text><br />
                  <Typography.Text >Received Quantity</Typography.Text><br />
                  <Typography.Text >Acceptep Quantity</Typography.Text><br />

                </Card>
              </Col> */}
              {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 6 }} hidden>
                <Card title={false}>
                  <Typography.Text >Grn Quantity</Typography.Text><br />
                  <Typography.Text >Received Quantity</Typography.Text><br />
                  <Typography.Text >Received Quantity</Typography.Text>

                </Card>
              </Col> */}
            </Row>
          </Form>
          <Row gutter={24}>

          </Row>

          <Row>
            <Table scroll={{ x: 'max-content' }} columns={filteredColumns} dataSource={poItemData} bordered pagination={false} />
          </Row>
        </Card>

        <Row justify={'end'}>
          <Col span={24} style={{ textAlign: "right", marginTop: '10px' }} >
            <Button type="primary" onClick={createGrn}>Submit</Button>
            <Button style={{ margin: "0 14px" }} onClick={onReset}>Reset</Button>
          </Col>
        </Row>

        <Modal
        className='qr-container'
        key={'modal' + Date.now()}
        width={'95%'}
        style={{ top: 30, textAlign: 'right',height:"50%" }}
        visible={showQrSacn}
        onCancel={() => { setShowQrScan(false) }}
      >
        {modal === 'poNumber' ? <QrScanner handleScan={(value) =>{handleQrScan(value)}} /> : null}
      </Modal>
      </Card>
    </>
  )

}

export default GRNForm