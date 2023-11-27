import { Button, Card, Col, DatePicker, Divider, Form, Input, Popconfirm, Row, Segmented, Select, Space, Table, Tag, Tooltip, Upload, UploadProps, message, Modal } from "antd"
import { ColumnProps } from "antd/es/table";
import React, { useEffect } from "react";
import { useState } from "react"
import { BuyersService, ColourService, CurrencyService, FabricTypeService, FabricWeaveService, IndentService, M3ItemsService, M3MastersService, M3StyleService, M3TrimsService, ProfitControlHeadService, SampleDevelopmentService, SizeService, StyleService, UomService, VendorsService } from "@project-management-system/shared-services";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { EditOutlined, LoadingOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import { BuyerIdReq, M3MastersCategoryReq, SourcingRequisitionReq, UomCategoryEnum } from "@project-management-system/shared-models";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import AlertMessages from "../common/common-functions/alert-messages";
import M3Items from "../masters/m3-items/m3-items-form";


const {Option} = Select;


export const SourcingRequisitionDynamicForm = () => {
    const [tabName,setTabName] = useState<string>('Fabric')
    const [page, setPage] = React.useState(1);
    const [fabricTableData,setFabricTableData] = useState<any[]>([])
    const [fabricForm] = Form.useForm()
    const colorService = new ColourService();
    const [color,setColor] = useState<any[]>([])
    const [uom,setUom] = useState<any[]>([])
    const [trimCodes,setTrimCodes] = useState<any[]>([])
    const [currency,setCurrency] = useState<any[]>([])
    const [fabricColor,setFabricColor] = useState<string>('')
    const pchService = new ProfitControlHeadService()
    const [pch,setPch] = useState<any[]>([])
    const [fabricPch,setFabricPch] = useState<string>('')
    const supplierService = new VendorsService()
    const [supplier,setSupplier] = useState<any[]>([])
    const [fabricSupplier,setFabricSupplier] = useState<string>('')
    const buyerService = new BuyersService()
    const [buyer,setBuyer] = useState<any[]>([])
    const [trimTypes,setTrimTypes] = useState<any[]>([])
    const [fabricBuyer,setFabricBuyer] = useState<string>('')
    const navigate = useNavigate()
    const weaveService = new FabricWeaveService()
    const fabricTypeService =  new FabricTypeService();
    const [weave,setWeave] = useState<any[]>([])
    const [fabricType,setFabricType] = useState<any[]>([])
    const [fabricWeave,setFabricWeave] = useState<string>('')
    const [defaultFabricFormData, setDefaultFabricFormData] = useState<any>(undefined);
    const [fabricIndexVal, setFabricIndexVal] = useState(undefined);
    const [sourcingForm] = Form.useForm()
    const styleService = new StyleService()
    const [style,setStyle] = useState<any[]>([])
    const [fabricTableVisible,setFabricTableVisible] = useState<boolean>(false)
    const [trimsTableData,setTrimsTableData] = useState<any[]>([])
    const [trimTableVisible,setTrimTableVisible] = useState<boolean>(false)
    const [defaultTrimFormData, setDefaultTrimFormData] = useState<any>(undefined);
    const [trimIndexVal, setTrimIndexVal] = useState(undefined);
    const [size,setSize] = useState<any[]>([])
    const [trimForm] = Form.useForm()
    const [trimColor,setTrimColor] = useState<string>('')
    const [trimSize , setTrimSize] = useState<string>('')
    const sizeService = new SizeService()
    const m3MasterService = new M3MastersService()
    const m3ItemsService = new M3ItemsService()

    const [fabricM3Code,setFabricM3Code] = useState<any[]>([])
    const [trimM3Code,setTrimM3Code] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [visibleModel, setVisibleModel] = useState<boolean>(false);
    const [fabricfilelist, setFabricfilelist] = useState<any>([]);
    const [isUpdateimg, setisUpdateImg]=useState('')
    const [imageUrl, setImageUrl] = useState('');
    const [trimfilelist, setTrimfilelist] = useState<any>([]);
    const indentService = new IndentService()
    const uomService =  new UomService()
    const currencyService = new CurrencyService()
    const sampleDevelopmentService =  new SampleDevelopmentService()
    const m3Service = new M3TrimsService()
    const [m3Trims, setM3Trims] = useState<any[]>([])


    let tableData: any[] = []
    let trimTableInfo : any[] = []


    useEffect(()=>{
        getColor()
        getPCH()
        getSupplier()
        getBuyer()
        getweave()
        getStyle()
        getSize()
        // getM3FabricCodes()
        getM3FabricStyleCodes()
        getM3TrimCodes()
        getUom()
        getCurrencies()
        getFabricType()
        getFabricTypes()
        // getM3TrimsTypes()
    },[])

    const getFabricTypes = () => {
        fabricTypeService.getTrimTypes().then(res => {
            if(res.status) {
                setTrimTypes(res.data)
            }
        })
    }

    const getM3TrimsTypes = (option) => {
        const req = new BuyerIdReq(option)
        console.log(req,'---------')
        m3Service.getM3TrimsByBuyer(req).then(res => {
            if(res.status) {
                setM3Trims(res.data)
                console.log(res.data,'000000000000000000')
            }
        })
    }

    const getUom = () => {
        uomService.getUomByCategory({uomCategory:UomCategoryEnum.LENGTH,username:localStorage.getItem("user")}).then(res => {
            if(res.status) {
                setUom(res.data)
            }
        })
    }

    const getTrimCodes = () => {
        sampleDevelopmentService.getFabricCodes().then(res => {
            if(res.status) {
                setTrimCodes(res.data)
            }
        })
    }

    const getCurrencies = () => {
        currencyService.getAllCurrencies().then(res => {
            if(res.status) {
                setCurrency(res.data)
            }
        })
    }
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

    const getFabricType = () => {
        fabricTypeService.getAllActiveFabricType().then(res =>{
            if(res.status) {
                setFabricType(res.data)
            }
        })
    }
 
    const getStyle = () => {
        styleService.getAllActiveStyle().then(res =>{
            if(res.status){
                setStyle(res.data)
            }
        })
    }

    const getSize = () => {
        sizeService.getAllActiveSize().then(res =>{
            if(res.status) {
                setSize(res.data)
            }
        })
    }

    const getM3FabricCodes = () => {
        const req = new M3MastersCategoryReq('Fabric')
        m3MasterService.getByCategory(req).then(res => {
            if(res.status){
                setFabricM3Code(res.data)
            }
        })
    }
    const getM3FabricStyleCodes = () => {
        m3ItemsService.getM3Items().then(res => {
            if(res.status){
                setFabricM3Code(res.data)
            }
        })
    }

    const getM3TrimCodes = () => {
        const req = new M3MastersCategoryReq('Trim')
        m3MasterService.getByCategory(req).then(res => {
            if(res.status){
                setTrimM3Code(res.data)
            }
        })
    }

    const onSegmentChange = (val) => {
        setTabName(val)
    }

    const setEditForm = (rowData: any, index: any) => {
        console.log(rowData);
        setDefaultFabricFormData(rowData)
        setFabricIndexVal(index)
    }

    const editForm = (rowData : any , index:any) =>{
        setDefaultTrimFormData(rowData)
        setTrimIndexVal(index)
    }

    const deleteData = (index:any) => {
    tableData = [...fabricTableData]
    tableData.splice(index,1)
    setFabricTableData(tableData)
    if (tableData.length == 0) {
        setFabricTableVisible(false)
    }
    }

    const deleteTrim = (index:any) => {
        trimTableInfo = [...trimsTableData]
        trimTableInfo.splice(index,1)
        setTrimsTableData(trimTableInfo)
        if (trimTableInfo.length == 0) {
            setTrimTableVisible(false)
        }
    }

    useEffect(() => {
        if(defaultFabricFormData){
            console.log(defaultFabricFormData)
            fabricForm.setFieldsValue({
                content: defaultFabricFormData.content,
                fabricType: defaultFabricFormData.fabricType,
                weave: defaultFabricFormData.weave,
                weight : defaultFabricFormData.weight,
                weightUnit : defaultFabricFormData.weightUnit,
                width: defaultFabricFormData.width,
                construction: defaultFabricFormData.construction,
                yarnCount: defaultFabricFormData.yarnCount,
                yarnUnit: defaultFabricFormData.yarnUnit,
                finish : defaultFabricFormData.finish,
                shrinkage : defaultFabricFormData.shrinkage,
                m3FabricCode: defaultFabricFormData.m3FabricCode,
                color : defaultFabricFormData.color,
                pch  : defaultFabricFormData.pch,
                moq  : defaultFabricFormData.moq,
                moqUnit  : defaultFabricFormData.moqUnit,
                season  : defaultFabricFormData.season,
                moqPrice  : defaultFabricFormData.moqPrice,
                supplier  : defaultFabricFormData.supplier,
                grnDate  : dayjs(defaultFabricFormData.grnDate),
                buyer  : defaultFabricFormData.buyer,
                xlNo  : defaultFabricFormData.xlNo,
                quantity  : defaultFabricFormData.quantity,
                quantityUnit: defaultFabricFormData.quantityUnit

            })
        }

    },[defaultFabricFormData])


    useEffect(()=>{
        if(defaultTrimFormData){
            trimForm.setFieldsValue({
                trimType : defaultTrimFormData.trimType,
                trimCode : defaultTrimFormData.trimCode,
                size : defaultTrimFormData.size,
                color : defaultTrimFormData.color,
                quantity : defaultTrimFormData.quantity,
                m3TrimCode: defaultTrimFormData.m3TrimCode,
                description : defaultTrimFormData.description,
                remarks : defaultTrimFormData.remarks,
                quantityUnit: defaultTrimFormData.quantityUnit
            })
        }
    },[defaultTrimFormData])

    const columns : ColumnProps<any>[] = [
        {
            title: 'S No',
            key: 'sno',
            // width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        // {
        //     title:'Content',
        //     dataIndex:'content'
        // },
        // {
        //     title:'Fabric Type',
        //     dataIndex:'fabricType',
            
        // },
        // {
        //     title:'Weave',
        //     dataIndex:'weave',
        //     render: (text,record) => {
        //         return(
        //             <>
        //             {record.weave ? record.weaveName : '-'}
        //             </>
        //         )
        //     }
        // },
        // {
        //     title:'Weight',
        //     dataIndex:'weight',
        // },
        // {
        //     title:'Width',
        //     dataIndex:'width'
        // },
        // {
        //     title:'Construction',
        //     dataIndex:'construction'
        // },
        // {
        //     title:'Yarn Count',
        //     dataIndex:'yarnCount'
        // },
        // {
        //     title:'Finish',
        //     dataIndex:'finish',
        //   //   sorter: (a, b) => a.finish.length - b.finish.length,
        //   // sortDirections: ['descend', 'ascend'],
        // },
        // {
        //     title:'Shrinkage',
        //     dataIndex:'shrinkage',
        // },
        {
            title:'M3 Fabric Code',
            dataIndex:'m3FabricCode',
        },
        {
            title:'Color',
            dataIndex:'color',
            render: (text,record) => {
                return(
                    <>
                    {record.color ? record.colorName : '-'}
                    </>
                )
            }
            
        },
        // {
        //     title:'PCH',
        //     dataIndex:'pch',
        //     render: (text,record) => {
        //         return(
        //             <>
        //             {record.pch ? record.pchName : '-'}
        //             </>
        //         )
        //     }
            
        // },
        // {
        //     title:'MOQ',
        //     dataIndex:'moq'
        // },
        {
            title:'Season',
            dataIndex:'season',
            
        },
        // {
        //     title:'MOQ Price',
        //     dataIndex:'moqPrice'
        // },
        {
            title:'Supplier',
            dataIndex:'supplier',
            render: (text,record) => {
                return(
                    <>
                    {record.supplier ? record.supplierName : '-'}
                    </>
                )
            }
            
        },
        {
            title:'GRN Date',
            dataIndex:'grnDate',
            render:(text,record) => {
                const date = new Date(record.grnDate)
                return(
                    <>
                    {record.grnDate ? moment(date).format('YYYY-MM-DD') : '-'}
                    </>
                )
            }
        },
        {
            title:'Buyer',
            dataIndex:'buyer',
            render: (text,record) => {
                return(
                    <>
                    {record.buyer ? record.buyerName : '-'}
                    </>
                )
            }
            
        },
        {
            title:'XL No',
            dataIndex:'xlNo'
        },
         {
            title:'Quantity',
            dataIndex:'quantity'
        },
        {
            title: "Action",
            dataIndex: 'action',
            render: (text: any, rowData: any, index: any) => (
                <span>
                    <Tooltip placement="top" title='Edit'>
                        <Tag >
                        {/* <Popconfirm title='Sure to Edit?' onConfirm={e =>{setEditForm(rowData,index);}}> */}

                            <EditOutlined className={'editSamplTypeIcon'} type="edit"
                                onClick={() => {
                                    setEditForm(rowData,index)
                                }}
                                style={{ color: '#1890ff', fontSize: '14px' }}
                            />
                        {/* </Popconfirm> */}
                        </Tag>
                    </Tooltip>
                    <Divider type="vertical" />
                    
                    <Tooltip placement="top" title='delete'>
                    <Tag >
                        <Popconfirm title='Sure to delete?' onConfirm={e =>{deleteData(index);}}>
                        <MinusCircleOutlined 

                        style={{ color: '#1890ff', fontSize: '14px' }} />
                        </Popconfirm>
                    </Tag>
                    </Tooltip>
                </span>
            )
        }
    ]

    const columnsSkelton: any = [
        {
          title: 'S No',
          key: 'sno',
          width: '70px',
          responsive: ['sm'],
          render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
          title: 'Trim Type',
          dataIndex: 'trimType',
        },
        {
          title: 'Trim Code',
          dataIndex: 'trimCode',
        },
        {
          title: 'Size',
          dataIndex: 'size',
          render: (text,record) => {
            return(
                <>
                {record.size ? record.sizeName : '-'}
                </>
            )
        }
        },
        {
          title: 'Color',
          dataIndex: 'color',
            render: (text,record) => {
              return(
                  <>
                  {record.color ? record.colorName : '-'}
                  </>
              )
          }
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
        },
        {
            title: 'M3 Trim Code',
            dataIndex: 'm3TrimCode',
          },
        {
          title: 'Description',
          dataIndex: 'description',
        },
        {
          title: 'Remarks',
          dataIndex: 'remarks',
        },
        {
            title: "Action",
            dataIndex: 'action',
            render: (text: any, rowData: any, index: any) => (
                <span>
                    <Tooltip placement="top" title='Edit'>
                        <Tag >
                            <EditOutlined className={'editSamplTypeIcon'} type="edit"
                                onClick={() => {
                                    editForm(rowData,index)
                                }}
                                style={{ color: '#1890ff', fontSize: '14px' }}
                            />
                        </Tag>
                    </Tooltip>
                    <Divider type="vertical" />
                    
                    <Tooltip placement="top" title='delete'>
                    <Tag >
                        <Popconfirm title='Sure to delete?' onConfirm={e =>{deleteTrim(index);}}>
                        <MinusCircleOutlined 

                        style={{ color: '#1890ff', fontSize: '14px' }} />
                        </Popconfirm>
                    </Tag>
                    </Tooltip>
                </span>
            )
        }
    ]



    const onFabricAdd = (values) => {
        fabricForm.validateFields().then(() => {

            if(fabricIndexVal !== undefined){
                console.log(fabricIndexVal)
                values.m3FabricCode = fabricM3Code.find((e) => { e.m3ItemsId === values.m3FabricCode }).itemCode;
                fabricTableData[fabricIndexVal] = values;

                tableData = [...fabricTableData]
                setFabricIndexVal(undefined)
            } else{
                tableData = [...fabricTableData,values]
            }
            setFabricTableData(tableData)
            fabricForm.resetFields()
            setFabricTableVisible(true)
        }).catch(() => {
            message.error('Please fill all required fields')
        })
    }

    const onTrimAdd = (values) => {
        if(trimIndexVal !== undefined){
            console.log(trimIndexVal)
            trimsTableData[trimIndexVal] = values;
            trimTableInfo = [...trimsTableData]
            setTrimIndexVal(undefined)
        } else{
            trimTableInfo = [...trimsTableData,values]
        }
        setTrimsTableData(trimTableInfo)
        trimForm.resetFields()
        setTrimTableVisible(true)
        console.log(values,'namaste')
    }


    const onFabricColorChange = (val,option) => {
        setFabricColor(option?.name)
        fabricForm.setFieldsValue({colorName: option?.name})
    }

    const onPCHChange = (val,option) => {
        setFabricPch(option?.name)
        fabricForm.setFieldsValue({pchName: option?.name})
    }

    const onSupplierChange = (val,option) => {
        setFabricSupplier(option?.name)
        fabricForm.setFieldsValue({supplierName:option?.name})
    }

    const onBuyerChange = (val,option) => {
        setFabricBuyer(option?.name)
        fabricForm.setFieldsValue({buyerName:option?.name})
    }

    const onWeaveChange = (val,option) => {
        fabricForm.setFieldsValue({weaveName:option?.name})
    }

    const onColorChange = (val,option) => {
        setTrimColor(option?.name)
        trimForm.setFieldsValue({colorName:option?.name})

    }

    const onSizeChange = (val, option) => {
    const selectedSize = option?.name || ''; // Ensure a fallback value
    setTrimSize(selectedSize);
    trimForm.setFieldsValue({sizeName:selectedSize})
}

    const onReset = () => {
        setFabricTableVisible(false)
        fabricForm.resetFields()
        sourcingForm.resetFields()
        trimForm.resetFields()
        setFabricTableData([])
        setTrimsTableData([])
        setTrimTableVisible(false)
        setImageUrl('');
        setFabricfilelist([]);
        setTrimfilelist([])
    
    }

    const onSubmit = () =>{
        sourcingForm.validateFields().then(() => {
            const req = new SourcingRequisitionReq(sourcingForm.getFieldValue('style'),sourcingForm.getFieldValue('expectedDate'),sourcingForm.getFieldValue('requestNo'),sourcingForm.getFieldValue('indentDate'),fabricTableData,trimsTableData,0)
            console.log(req)
            indentService.createItems(req).then(res => {
                if(res.status){
                    navigate('/requisition-view')
                    AlertMessages.getSuccessMessage(res.internalMessage);
                }
                else{
                    AlertMessages.getErrorMessage(res.internalMessage);
                }
            })
            // onReset()
        }).catch(() => {
            message.error('Please fill all fields')
        })
    }

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }

    const uploadFabricProps: UploadProps = {
        // alert();
        multiple: false,
        onRemove: file => {
          setFabricfilelist([]);
          setImageUrl('');
        },
        beforeUpload: (file: any) => {
          if (!file.name.match(/\.(png|jpeg|PNG|jpg|JPG|pjpeg|gif|tiff|x-tiff|x-png)$/)) {
            AlertMessages.getErrorMessage("Only png,jpeg,jpg files are allowed!");
            // return true;
          }
          var reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = data => {
            if (fabricfilelist.length == 1) {
              AlertMessages.getErrorMessage("You Cannot Upload More Than One File At A Time");
              return true;
            } else {
                setFabricfilelist([...fabricfilelist,file]);
              getBase64(file, imageUrl =>
                setImageUrl(imageUrl)
              );
              return false;
            }
          }
        },
        progress: {
          strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
          },
          strokeWidth: 3,
          format: percent => `${parseFloat(percent.toFixed(2))}%`,
        },
        fileList: fabricfilelist,
      };

      const uploadTrimProps: UploadProps = {
        // alert();
        multiple: false,
        onRemove: file => {
          setTrimfilelist([]);
          setImageUrl('');
        },
        beforeUpload: (file: any) => {
          if (!file.name.match(/\.(png|jpeg|PNG|jpg|JPG|pjpeg|gif|tiff|x-tiff|x-png)$/)) {
            AlertMessages.getErrorMessage("Only png,jpeg,jpg files are allowed!");
            // return true;
          }
          var reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = data => {
            if (trimfilelist.length == 1) {
              AlertMessages.getErrorMessage("You Cannot Upload More Than One File At A Time");
              return true;
            } else {
                setTrimfilelist([...trimfilelist,file]);
              getBase64(file, imageUrl =>
                setImageUrl(imageUrl)
              );
              return false;
            }
          }
        },
        progress: {
          strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
          },
          strokeWidth: 3,
          format: percent => `${parseFloat(percent.toFixed(2))}%`,
        },
        fileList: trimfilelist,
      };


      
  const handleCancel = () => {
    setVisibleModel(false);
    getM3FabricStyleCodes();
  };

    const validateExpectedDate = (e) => {
        let selectedDate = e.format("YYYY-MM-DD");
        let indentDate = sourcingForm.getFieldValue("indentDate").format("YYYY-MM-DD");
        if(selectedDate < indentDate){
            AlertMessages.getErrorMessage("Expected Date must be less than Indent Date")
            sourcingForm.setFieldsValue({"expectedDate" : ''})
        }
        else{
            console.log("iii");
        }
    }
    return(
        <><Card title='Indent' headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={<span><Button onClick={() => navigate('/requisition-view')}>View</Button></span>}>
            <Form form={sourcingForm}>
                <Row gutter={8}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='style' label='Style' rules={[{ required: true, message: 'Style is required' }]}>
                            <Select showSearch allowClear optionFilterProp="children" placeholder='Select Style' onChange={getM3TrimsTypes}>
                                {style.map(e => {
                                    return (
                                        <Option key={e.styleId} value={e.styleId} name={e.buyerId}> {e.style}-{e.description}</Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='indentDate' label='Indent Date' rules={[{ required: true, message: 'Indent Date is required' }]} initialValue={dayjs(dayjs())}>
                            <DatePicker style={{ width: '100%' }} defaultValue={dayjs(dayjs())} />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='expectedDate' label='Expected Date' rules={[{ required: true, message: 'Expected Date is required' }]}>
                            <DatePicker style={{ width: '100%' }} onChange={validateExpectedDate} defaultValue={dayjs(dayjs(sourcingForm.getFieldValue('indentDate')).add(10, 'days'))}/>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='requestNo' label='Request Number' rules={[{ required: false, message: 'Request Number is required' }]} style={{ display: 'none' }}>
                            <Input placeholder="Enter Request Number" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Row gutter={8}>
                <Space direction="vertical" style={{ fontSize: "16px", width: '100%' }}>
                    <Segmented onChange={onSegmentChange} style={{ backgroundColor: '#68cc6b' }}
                        options={[
                            {
                                label: (
                                    <>
                                        <b style={{ fontSize: "12px" }}>Fabric Details</b>
                                    </>
                                ),
                                value: "Fabric",
                            },
                            {
                                label: (
                                    <>
                                        <b style={{ fontSize: "12px" }}>Trim Details</b>
                                    </>
                                ),
                                value: "Trim",
                            },
                        ]} />
                    <div>
                        {tabName === 'Fabric' ? (<>
                            <Card>
                                <Form layout="vertical" onFinish={onFabricAdd} form={fabricForm}>
                                    <h1 style={{ color: '#6b54bf', fontSize: '15px', textAlign: 'left' }}>FABRIC DETAILS</h1>
                                    <Form.Item name='sourcingRequisitionId' style={{ display: 'none' }}>
                                        <Input disabled />
                                    </Form.Item>
                                    <Form.Item name='colorName' style={{ display: 'none' }}>
                                        <Input disabled />
                                    </Form.Item>
                                    <Form.Item name='pchName' style={{ display: 'none' }}>
                                        <Input disabled />
                                    </Form.Item>
                                    <Form.Item name='supplierName' style={{ display: 'none' }}>
                                        <Input disabled />
                                    </Form.Item>
                                    <Form.Item name='buyerName' style={{ display: 'none' }}>
                                        <Input disabled />
                                    </Form.Item>
                                    <Form.Item name='weaveName' style={{ display: 'none' }}>
                                        <Input disabled />
                                    </Form.Item>
                                    <Row gutter={8}>
                                        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}> */}
                                        {/* <Form.Item name='content' label='Content' >
            <Select showSearch allowClear optionFilterProp="children" placeholder='Select Content'>
            <Option key='naturalFabrics' value='naturalFabrics'>Natural Fabrics</Option>
                <Option key='manufacturedFabrics' value='manufacturedFabrics'>Manufactured Fabrics</Option>
            </Select>
        </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
        <Form.Item name='fabricType' label='Type of Fabric' rules={[{required:true,message:'Type of Fabric is required'}]}>
            <Select showSearch allowClear optionFilterProp="children" placeholder='Select Fabric Type'>
                {fabricType.map(e => {
                        return(
                            <Option key={e.fabricTypeId} value={e.fabricTypeId} name={e.fabricTypeId}> {e.fabricTypeName}</Option>
                        )
                    })}
                </Select>
        </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
        <Form.Item name='weaveId' label='Weave'>
            <Select showSearch allowClear optionFilterProp="children" placeholder='Select weave' onChange={onWeaveChange}>
            {weave.map(e => {
                    return(
                        <Option key={e.fabricWeaveId} value={e.fabricWeaveId} name={e.fabricWeaveName}> {e.fabricWeaveName}</Option>
                    )
                })}
            </Select> */}
                                        {/* <Input placeholder="Enter Weave"/> */}
                                        {/* </Form.Item> */}
                                        {/* </Col> */}
                                        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
        <Form.Item name='weight' label='Weight'>
            <Input placeholder="Enter Weight"/>
        </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{marginTop:'2%'}}>
        <Form.Item name='weightUnit'>
            <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                {uom.map(e => {
                    return(
                        <Option key={e.uomId} value={e.uomId}>{e.uom}</Option>
                    )
                })}
            </Select>
        </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
        <Form.Item name='width' label='Width'>
            <Input placeholder="Enter Width"/>
        </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
        <Form.Item name='construction' label='Construction(EPI XPPI)'>
            <Input placeholder="Enter Construction"/>
        </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
        <Form.Item name='yarnCount' label='Yarn Count'>
            <Input placeholder="Enter Yarn Count"/>
        </Form.Item>
        </Col> */}
                                        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{marginTop:'2%'}}>
        <Form.Item name='yarnUnit'>
            <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                {uom.map(e => {
                    return(
                        <Option key={e.uomId} value={e.uomId}>{e.uom}</Option>
                    )
                })}
            </Select>
        </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
        <Form.Item name='finish' label='Finish'>
            <Input placeholder="Enter Finish"/>
        </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
        <Form.Item name='shrinkage' label='Shrinkage'>
            <Input placeholder="Enter Shrinkage"/>
        </Form.Item>
        </Col> */}
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 7 }}>
                                            <Form.Item name='m3FabricCode' label='M3 Fabric Code' rules={[{ required: true, message: 'M3 Code is required' }]}>
                                                <Select showSearch allowClear optionFilterProp="children" placeholder='Select M3 Code'>
                                                    {fabricM3Code.map(e => {
                                                        return (
                                                            <Option key={e.m3ItemsId} value={e.m3ItemsId}>{e.itemCode} - {e.description}</Option>
                                                        );
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        {/* <Col span = {4} style={{paddingTop:'24px'}}>
                                            <Button onClick={(e) => setVisibleModel(true)}>Add M3 Fabric</Button>
                                        </Col> */}
                                    </Row>
                                    {/* <Row gutter={24}>
            <h1 style={{ color: '#6b54bf', fontSize: '20px', textAlign: 'left' }}>ITEM DETAILS</h1>
        </Row> */}
                                    <h1 style={{ color: '#6b54bf', fontSize: '15px', textAlign: 'left' }}>ITEM DETAILS</h1>
                                    <Row gutter={8}>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                                            <Form.Item name='color' label='Color' rules={[{ required: true, message: 'Color is required' }]}>
                                                <Select showSearch allowClear optionFilterProp="children" placeholder='Select Color' onChange={onFabricColorChange}>
                                                    {color.map(e => {
                                                        return (
                                                            <Option key={e.colourId} value={e.colourId} name={e.colour}> {e.colour}</Option>
                                                        );
                                                    })}
                                                </Select>
                                                {/* <Input placeholder="Enter Color"/> */}
                                            </Form.Item>
                                        </Col>
                                        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
        <Form.Item name='pch' label='PCH'>
             <Select showSearch allowClear optionFilterProp="children" placeholder='Select PCH' onChange={onPCHChange}>
             {pch.map(e => {
                    return(
                        <Option key={e.profitControlHeadId} value={e.profitControlHeadId} name={e.profitControlHead}> {e.profitControlHead}</Option>
                    )
                })}
            </Select>
        </Form.Item>
        </Col> */}
                                        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
        <Form.Item name='moq' label='MOQ'
        > */}
                                        {/* <Select showSearch allowClear optionFilterProp="children">
            <Option key='content' value='content'>
                Content
            </Option>
        </Select> */}
                                        {/* <Input placeholder="Enter MOQ"/> */}
                                        {/* </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{marginTop:'2%'}}>
        <Form.Item name='moqUnit' rules={[{required:true,message:'Unit is required'}]}>
            <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                {uom.map(e => {
                    return(
                        <Option key={e.uomId} value={e.uomId}>{e.uom}</Option>
                    )
                })}
            </Select>
        </Form.Item>
        </Col> */}
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                                            <Form.Item name='season' label='Season' rules={[{ required: true, message: 'Season is required' }]}>
                                                {/* <Input placeholder="Enter Season"/> */}
                                                <Select showSearch allowClear optionFilterProp="children" placeholder='Enter Season'>
                                                    <Option key='autumn' value='autumn'>Autumn</Option>
                                                    <Option key='spring' value='spring'>Spring</Option>
                                                    <Option key='summer' value='summer'>Summer</Option>
                                                    <Option key='winter' value='winter'>Winter</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
        <Form.Item name='moqPrice' label='MOQ Price'>
            <Input placeholder="Enter MOQ Price"/>
        </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{marginTop:'2%'}}>
        <Form.Item name='moqPriceUnit' rules={[{required: fabricForm.getFieldValue('moqPrice') !== undefined ? true : false}]}>
            <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                {currency.map(e => {
                    return(
                        <Option key={e.currencyId} value={e.currencyId}>{e.currencyName}</Option>
                    )
                })}
            </Select>
        </Form.Item>
        </Col> */}
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                                            <Form.Item name='supplier' label='Supplier' rules={[{ required: true, message: 'Supplier is required' }]}>
                                                <Select showSearch allowClear optionFilterProp="children" placeholder='Select Supplier' onChange={onSupplierChange}>
                                                    {supplier.map(e => {
                                                        return (
                                                            <Option key={e.vendorId} value={e.vendorId} name={e.vendorName}>{e.vendorCode}-{e.vendorName}</Option>
                                                        );
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                                            <Form.Item name='grnDate' label='GRN Date' rules={[{ required: true, message: 'Grn date is required' }]}>
                                                <DatePicker style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                                            <Form.Item name='buyer' label='Buyer' rules={[{ required: true, message: 'Buyer is required' }]}>
                                                <Select showSearch allowClear optionFilterProp="children" placeholder='Select Buyer' onChange={onBuyerChange}>
                                                    {buyer.map(e => {
                                                        return (
                                                            <Option key={e.buyerId} value={e.buyerId} name={e.buyerName}>{e.buyerCode}-{e.buyerName}</Option>
                                                        );
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                                            <Form.Item name='xlNo' label='XL No' rules={[{ required: true, message: 'XL No is required' }]}>
                                                <Input placeholder="Enter XL No" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                                            <Form.Item name='quantity' label='Quantity' rules={[{ required: true, message: 'Quantity is required' }]}>
                                                <Input placeholder="Enter Quantity" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{ marginTop: '2%' }}>
                                            <Form.Item name='quantityUnit' rules={[{ required: true, message: 'Unit is required' }]}>
                                                <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                                                    {uom.map(e => {
                                                        return (
                                                            <Option key={e.uomId} value={e.uomId}>{e.uom}</Option>
                                                        );
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                                            <Form.Item name="fabricUpload" label='Fabric Upload'
                                            >
                                                <Upload {...uploadFabricProps} style={{ width: '100%' }} listType="picture-card">

                                                    <div>
                                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                                        <div style={{ marginTop: 8 }}>Upload Fabric</div>
                                                    </div>
                                                </Upload>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row justify={'end'}>
                                        <Button type='primary' htmlType="submit">Add</Button>
                                    </Row>
                                </Form>
                            </Card>
                            {fabricTableVisible ? (<>
                                <Table columns={columns} dataSource={fabricTableData} scroll={{ x: 'max-content' }} />
                            </>) : (<></>)}
                            {/* <Card>
        </Card> */}
                        </>) : (<></>)}
                    </div>
                    <div>
                        {tabName === 'Trim' ? (<>
                            <Card>
                                <Form layout="vertical" onFinish={onTrimAdd} form={trimForm}>
                                    <h1 style={{ color: '#6b54bf', fontSize: '15px', textAlign: 'left' }}>TRIM DETAILS</h1>
                                    <Form.Item name='sizeName' style={{ display: 'none' }}>
                                        <Input disabled />
                                    </Form.Item>
                                    <Form.Item name='colorName' style={{ display: 'none' }}>
                                        <Input disabled />
                                    </Form.Item>
                                    <Row gutter={8}>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
                                            <Form.Item
                                                name="trimType"
                                                label="Trim Type"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Trim Type Is Required",
                                                    },
                                                    {
                                                        pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                                                        message: `Should contain only alphabets.`,
                                                    },
                                                ]}>
                                                <Select
                                                    allowClear
                                                    showSearch
                                                    optionFilterProp="children"
                                                    placeholder="Select Trim Type"
                                                    onChange={getTrimCodes}
                                                >
                                                    {m3Trims?.map((e) => {
                                                        return (
                                                            <Option key={e.m3TrimsId} value={e.m3TrimsId} >
                                                                {e.trimType}
                                                            </Option>
                                                        );
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
                                            <Form.Item
                                                name="trimCode"
                                                label="Trim Code"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Trim Code Is Required",
                                                    },
                                                    {
                                                        pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                                                        message: `Should contain only alphabets.`,
                                                    },
                                                ]}>
                                                <Select
                                                    allowClear
                                                    showSearch
                                                    optionFilterProp="children"
                                                    placeholder="Select Trim Code"
                                                >
                                                    {m3Trims.map((e) => {
                                                        return (
                                                            <Option key={e.m3TrimsId} value={e.m3TrimsId}>
                                                                {e.trimCode}
                                                            </Option>
                                                        );
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
                                            <Form.Item
                                                name="size"
                                                label="Size"
                                            >
                                                <Select
                                                    allowClear
                                                    showSearch
                                                    optionFilterProp="children"
                                                    placeholder="Select Size"
                                                    onChange={onSizeChange}
                                                >
                                                    {size.map((e) => {
                                                        return (
                                                            <Option key={e.sizeId} value={e.sizeId} name={e.size}>
                                                                {e.size}
                                                            </Option>
                                                        );
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
                                            <Form.Item
                                                name="color"
                                                label="Color"
                                            >
                                                <Select
                                                    allowClear
                                                    showSearch
                                                    optionFilterProp="children"
                                                    placeholder="Select Color"
                                                    onChange={onColorChange}
                                                >
                                                    {color.map((e) => {
                                                        return (
                                                            <Option key={e.colourId} value={e.colourId} name={e.colour}>
                                                                {e.colour}
                                                            </Option>
                                                        );
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
                                            <Form.Item
                                                name="quantity"
                                                label="Quantity"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Quantity Is Required",
                                                    },
                                                    {
                                                        pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                                                        message: `Should contain only alphabets.`,
                                                    },
                                                ]}>
                                                <Input placeholder="Enter Quantity" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{ marginTop: '2%' }}>
                                            <Form.Item name='quantityUnit' rules={[{ required: true, message: 'Unit is required' }]}>
                                                <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                                                    {uom.map(e => {
                                                        return (
                                                            <Option key={e.uomId} value={e.uomId}>{e.uom}</Option>
                                                        );
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                                            <Form.Item name='m3TrimCode' label='M3 Trim Code' rules={[{ required: true, message: 'M3 code is required' }]}>
                                                <Select showSearch allowClear optionFilterProp="children" placeholder='Select M3 Code'>
                                                    {trimM3Code.map(e => {
                                                        return (
                                                            <Option key={e.m3Code} value={e.m3Code}> {e.m3StyleCode}-{e.category}</Option>
                                                        );
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col> */}
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                            <Form.Item
                                                name="description"
                                                label="Description"
                                            >
                                                <TextArea rows={1} placeholder="Enter Trim Description" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                            <Form.Item
                                                name="remarks"
                                                label="Remarks"
                                            >
                                                <TextArea rows={1} placeholder="Enter Remarks" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                                            <Form.Item name="trimUpload" label='Trim Upload'
                                            >
                                                <Upload {...uploadTrimProps} style={{ width: '100%' }} listType="picture-card">

                                                    <div>
                                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                                        <div style={{ marginTop: 8 }}>Upload Trim</div>
                                                    </div>
                                                </Upload>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row justify={'end'}>
                                        <Button type='primary' htmlType="submit">Add</Button>
                                    </Row>
                                </Form>
                            </Card>
                            {trimTableVisible ? (<>
                                <Table columns={columnsSkelton} dataSource={trimsTableData} scroll={{ x: 'max-content' }} />
                            </>) : (<></>)}
                        </>) : (<></>)}
                    </div>

                </Space>
            </Row>
            <Row justify={'end'}>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }}>
                    <Button type="primary" onClick={onSubmit} disabled={fabricTableData.length > 0 && trimsTableData.length > 0 ? false : true}>Submit</Button>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }}>
                    <Button onClick={onReset}>Reset</Button>
                </Col>

            </Row>
        </Card>
        <Modal
            className='rm-'
            key={'modal' + Date.now()}
            width={'80%'}
            style={{ top: 30, alignContent: 'right' }}
            visible={visibleModel}
            title={<React.Fragment>
            </React.Fragment>}
            onCancel={handleCancel}
            footer={[]}
        >
            <M3Items />

            </Modal></>
    )
}
export default SourcingRequisitionDynamicForm