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
import { GRNTypeEnum, GrnDto, GrnItemsDto, GrnItemsFormDto, PoItemEnum, PurchaseOrderStatus, VendorIdReq } from '@project-management-system/shared-models'
import AlertMessages from '../common/common-functions/alert-messages'
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'

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

  console.log(poData)

  const createGrn = () => {
    const values = form.getFieldsValue()
    console.log(poData[0]?.poMaterialType)
    const req = new GrnDto(values.vendorId, values.purchaseOrderId, form.getFieldValue('grnDate').format('YYYY-MM-DD'), PurchaseOrderStatus.OPEN, values.remarks, undefined, undefined, '', undefined, '', 0, 0, poData[0]?.poMaterialType, poItemData, 0, '', values.grnType, values.invoiceNo,poData?.poMaterialType);
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
    console.log('po data called')
    itemsForm.resetFields()
    setPoData([])
    setPoItemData([])
    if (!val) {
      setSelectedPoType(null);
      return;
    }

    const req = new VendorIdReq(0, val, option?.name, option.val);
    poService.getPODataById(req).then((res) => {
      if (res.status) {
        
        setPoData(res.data[0]);
        setPoItemData(res.data[0].grnItems)
        form.setFieldsValue({ grnType: res.data[0].poAgainst });
        setSelectedPoType(res.data[0].poAgainst);
      }
    });
  };


  const onReset = () => {
    form.resetFields()
    setPoData([])
  }

  // const validateFabricForm = async (value) => {
  //   // let createChildData;

  //   if (poData[0]?.materialType === 'Fabric') {
  //     try {
  //       const values = await form.validateFields();
  //       form.validateFields().then((values) => {
  //         const updatedFormData = poData.filter((record) => {
  //           const key = record.key;
  //           return (
  //             values[`receivedQuantity_${record.poFabricId}_${key}`] ||
  //             values[`acceptedQuantity_${record.poFabricId}_${key}`] ||
  //             values[`rejectedQuantity_${record.poFabricId}_${key}`]
  //           );
  //         }).map((record) => ({
  //           poFabricId: record.poFabricId,
  //           receivedQuantity: values[`receivedQuantity_${record.poFabricId}_${record.key}`],
  //           acceptedQuantity: values[`acceptedQuantity_${record.poFabricId}_${record.key}`],
  //           rejectedQuantity: values[`rejectedQuantity_${record.poFabricId}_${record.key}`],
  //           rejectedUomId: values[`rejectedUomId_${record.poFabricId}_${record.key}`],
  //           conversionQuantity: quantity,
  //           conversionUomId: values[`acceptedUomId_${record.poFabricId}_${record.key}`],
  //           ...record,
  //         }));
  //         const grnItemsArray = [];
  //         updatedFormData.forEach((record) => {
  //           const grnItem = new GrnItemsDto(0, record.m3fabricCode, record.receivedQuantity, record.acceptedQuantity, record.rejectedQuantity, record.rejectedUomId, record.conversionQuantity, record.conversionUomId, record.remarks, undefined, '', undefined, '', 0, 0, record.poFabricId, null, record.indentFabricId, null)
  //           grnItemsArray.push(grnItem)
  //         });
  //         createGrn(value, grnItemsArray)
  //         console.log(value, grnItemsArray, '=hhhhhhhhhhhhhhhhh')
  //       });
  //     } catch (error) {
  //       console.error('Error validating fabric fields:', error);
  //       return;
  //     }
  //   }

  //   if (poData[0]?.materialType === 'Trim') {
  //     try {
  //       const values = await form.validateFields();
  //       const updatedFormData = poData.filter((record) => {
  //         const key = record.key;
  //         return (
  //           values[`receivedQuantity_${record.poTrimId}_${key}`] ||
  //           values[`acceptedQuantity_${record.poTrimId}_${key}`] ||
  //           values[`rejectedQuantity_${record.poTrimId}_${key}`]
  //         );
  //       }).map((record) => ({
  //         poTrimId: record.poTrimId,
  //         receivedQuantity: values[`receivedQuantity_${record.poTrimId}_${record.key}`],
  //         receivedUomId: values[`receivedUomId_${record.poTrimId}_${record.key}`],
  //         acceptedQuantity: values[`acceptedQuantity_${record.poTrimId}_${record.key}`],
  //         acceptedUomId: values[`acceptedUomId_${record.poTrimId}_${record.key}`],
  //         rejectedQuantity: values[`rejectedQuantity_${record.poTrimId}_${record.key}`],
  //         rejectedUomId: values[`rejectedUomId_${record.poTrimId}_${record.key}`],
  //         conversionQuantity: quantity,
  //         conversionUomId: values[`acceptedUomId_${record.poFabricId}_${record.key}`],
  //         ...record,
  //       }))

  //       const grnItemsArray = [];
  //       updatedFormData.forEach((record) => {
  //         const grnItem = new GrnItemsDto(0, record.m3TrimCode, record.receivedQuantity, record.acceptedQuantity, record.rejectedQuantity, record.rejectedUomId, record.conversionQuantity, record.conversionUomId, record.remarks, undefined, '', undefined, '', 0, 0, 0, record.poTrimId, null, record.indentTrimId);
  //         grnItemsArray.push(grnItem);
  //       });

  //       // Call createGrn here if needed
  //       createGrn(value, grnItemsArray)
  //     } catch (error) {
  //       console.error('Error validating trim fields:', error);
  //       return;
  //     }
  //   }

  //   // You might want to move the call to createGrn outside the if blocks, depending on your logic.
  //   // createGrn(value, createChildData);
  // };





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
    if (quantity != null && fromUom != undefined && toUom != undefined) {
      console.log(quantity, fromUom, toUom)
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

  const acceptUomOnchange = (option, value, record) => {
    const acceptedQuantity = form.getFieldValue(`acceptedQuantity_${record.poFabricId}_${record.key}`);
    convertedQty = convertQuantity(acceptedQuantity, reciveUomName, value?.type ? value.type : undefined);
  }

  const receiveuomOnChange = (value, option) => {
    console.log(option.name)
    setReciveUomName(option.name)

  }

  const acceptedQuantityOnchange = (value) => {
    console.log(value)
  }

  const setDataToForm = (record) => {
    itemsForm.setFieldsValue({
      m3itemCode: record.m3itemCode,
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
      poItemId: record.poItemId
    })
  }


  const columns: any = [
    {
      title: <div style={{ textAlign: "center" }}> Item Code</div>,
      dataIndex: 'm3itemCode',
    },
    {
      title: <div style={{ textAlign: "center" }}> Item Type</div>,
      dataIndex: 'm3ItemType',
    },
    // {
    //   title: <div style={{textAlign:"center"}}>Style</div>,
    //   dataIndex: 'style',
    // },
    {
      title: <div style={{ textAlign: "center" }}>Buyer</div>,
      dataIndex: 'buyer',
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
          value ? value : 0
        )
      }


    },
    {
      title: <div style={{ textAlign: "center" }}>Accepted Qty</div>,
      dataIndex: 'acceptedQuantity',
      render: (value, rowData) => {
        return (
          value ? value : 0
        )
      }

    },
    {
      title: <div style={{ textAlign: "center" }}>Rejected Qty</div>,
      dataIndex: 'rejectedQuantity',

    },
    {
      title: <div style={{ textAlign: "center" }}>UOM</div>,
      dataIndex: 'uom',

    },
    {
      title: 'Converted UOM',
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
      title:'Subjective Amount',
      dataIndex : 'subjectiveAmount',
      render: (value, rowData) => {
        return (
          rowData.revisedSubjectivePrice ?  rowData.revisedSubjectivePrice : value 
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
      render: (_, record) => <EditOutlined onClick={() => setDataToForm(record)} />
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
    console.log('state updated', poItemData)
  }

  function acceptedQuantityOnChange(e) {
    const poItemId = itemsForm.getFieldValue('poItemId')
    const receivedQunatity = itemsForm.getFieldValue('receivedQuantity')
    
    setPoItemData(prevData =>
      prevData.map(item => {
        if (item.poItemId === poItemId) {
          return {
            ...item,
            acceptedQuantity: e.target.value,
            rejectedQuantity: Number(receivedQunatity) - Number(e.target.value)

          };
        }
        return item;
      }))
  }


  function calculatePrices(value){
    const uomFactors = {
      cm : 12
    }
    const poItemId = itemsForm.getFieldValue('poItemId')
    const subjectivePrice = Number(itemsForm.getFieldValue('subjectiveAmount'))
    const acceptedQty = Number(itemsForm.getFieldValue('acceptedQuantity'))
    const poQty = Number(itemsForm.getFieldValue('poQuantity'))
    console.log(subjectivePrice,acceptedQty,poQty)
    const unitPrice = Number((subjectivePrice)/poQty)
    const totalSubjectivePrice =( Number(acceptedQty) * Number(unitPrice))
    console.log(totalSubjectivePrice)
    console.log(poItemData)
    setPoItemData(prevData =>
      prevData.map(item => {
        if (item.poItemId == poItemId) {
          return {
            ...item,
            revisedSubjectivePrice : totalSubjectivePrice
          };
        }
        return item;
      }))
   
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
      calculatePrices(e);
  }


const saveData = () => {
  const formValues = form.getFieldsValue()
  const grnDto = new GrnDto(formValues.vendorId,formValues.purchaseOrderId,new Date(),PurchaseOrderStatus.OPEN,"")
  const grnItemsFormDto :GrnItemsFormDto[] = poItemData
  
}


  return (
    <>
      <Card title='GRN' headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={
        <span>
          <Button onClick={() => navigate("/grn-view")}>View</Button>
        </span>}>
        <Form form={form} layout="vertical" >
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
                    min: 12,
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
              <Form.Item name={'revisedSubjectivePrice'} hidden><Input></Input></Form.Item>

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
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                <Form.Item name='uom' label='UOM'>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
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

              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }}>
                <Form.Item name='unitPrice' label='Unit price'>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }}>
                <Form.Item name='discount' label='Discount'>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }}>
                <Form.Item name='tax' label='Tax %'>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }}>
                <Form.Item name='transportation' label='Transportation'>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }}>
                <Form.Item name='subjectiveAmount' label='Subjective Amount'>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col>
                <Button style={{ marginTop: '25px' }} type='primary'>Update</Button>
              </Col>
            </Row>
          </Form>

          <Row>
            <Table columns={columns} dataSource={poItemData} bordered />
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