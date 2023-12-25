import { Button, Card, Col, DatePicker, Divider, Form, Input, Popconfirm, Row, Segmented, Select, Space, Table, Tag, Tooltip, Upload, UploadProps, message, Modal } from "antd"
import { ColumnProps } from "antd/es/table";
import React, { useEffect } from "react";
import { useState } from "react"
import { BuyersService, ColourService, CurrencyService, FabricTypeService, FabricWeaveService, IndentService, M3ItemsService, M3MastersService, M3StyleService, M3TrimsService, ProfitControlHeadService, SampleDevelopmentService, SizeService, StyleService, TrimParamsMappingService, TrimService, UomService, VendorsService } from "@project-management-system/shared-services";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { EditOutlined, LoadingOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import { BuyerIdReq, BuyerRefNoRequest, ItemTypeEnum, ItemTypeEnumDisplay, M3MastersCategoryReq, M3TrimType, M3trimsDTO, MenusAndScopesEnum, SourcingRequisitionReq, StyleIdReq, TrimIdRequestDto, UomCategoryEnum, buyerReq } from "@project-management-system/shared-models";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import AlertMessages from "../common/common-functions/alert-messages";
import M3Items from "../masters/m3-items/m3-items-form";
import { useIAMClientState } from "../common/iam-client-react";
import RolePermission from "../role-permissions";


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
    const [fabricIndexVal, setFabricIndexVal] = useState<any>(0);
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
    const [trimCode , setTrimCode] = useState<string>('')
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
    const [btnType, setBtnType] = useState<any>("Add");
    const [trimBtnType, setTrimBtnType] = useState<any>("Add");
    const indentService = new IndentService()
    const uomService =  new UomService()
    const currencyService = new CurrencyService()
    const sampleDevelopmentService =  new SampleDevelopmentService()
    const m3Service = new M3TrimsService()
    const [m3Trims, setM3Trims] = useState<any[]>([])
    const { IAMClientAuthContext, dispatch } = useIAMClientState();
    const [isBuyer, setIsBuyer] = useState(false);
    const trimService = new TrimService()
    const [trimData, setTrimData] = useState<any[]>([])
    const [trimCat, setTrimCat] = useState<any[]>([]);
    const paramsService = new TrimParamsMappingService()
    const [mapData, setMapData] = useState<any[]>([])




    let tableData: any[] = []
    let trimTableInfo : any[] = []


    useEffect(()=>{
        console.log(IAMClientAuthContext.user)
        sourcingForm.setFieldsValue({"expectedDate":dayjs(dayjs(sourcingForm.getFieldValue('indentDate')).add(10, 'days'))})
        getColor()
        getPCH()
        getSupplier()
        getBuyer()
        getweave()
        getSize()
        // getM3FabricCodes()
        // getM3FabricStyleCodes()
        getM3TrimCodes()
        getUom()
        getCurrencies()
        getFabricType()
        getFabricTypes()
        // getM3TrimsTypes()
        // getTrimCategory()
    },[])

    useEffect(()=>{
        if(checkAccess(MenusAndScopesEnum.Scopes.trimTab) && !checkAccess(MenusAndScopesEnum.Scopes.fabricTab)){
            setTabName('Trim')
          }
          if(checkAccess(MenusAndScopesEnum.Scopes.fabricTab) && !checkAccess(MenusAndScopesEnum.Scopes.trimTab)){
            setTabName('Fabric')
          }
          if(checkAccess(MenusAndScopesEnum.Scopes.trimTab) && checkAccess(MenusAndScopesEnum.Scopes.fabricTab)){
            setTabName('Fabric')
          }
        // checkAccess(MenusAndScopesEnum.Scopes.fabricTab) ? setTabName('Fabric') : checkAccess(MenusAndScopesEnum.Scopes.fabricTab) ? setTabName('Trim') :'both'
    },[])

    const getFabricTypes = () => {
        fabricTypeService.getTrimTypes().then(res => {
            if(res.status) {
                setTrimTypes(res.data)
            }
        })
    }

    const getM3TrimsTypes = () => {
        const req = new BuyerIdReq(sourcingForm.getFieldValue('buyer'),trimForm.getFieldValue('trimType'),trimForm.getFieldValue('trimCategory'))
        m3Service.getM3TrimsByBuyer(req).then(res => {
            if(res.status) {
                setM3Trims(res.data)
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
        const req = new BuyerRefNoRequest()
        const refNo = IAMClientAuthContext.user?.externalRefNo ? IAMClientAuthContext.user?.externalRefNo :null   
        req.buyerRefNo = refNo 
        buyerService.getAllActiveBuyers(req).then(res =>{
            if(res.status) {
                setBuyer(res.data)
                if(refNo){
                    sourcingForm.setFieldsValue({buyer: res.data[0]?.buyerId})
                    onBuyerChange(res.data[0]?.buyerId,res.data[0]?.buyerName)
                }
            }
        })
    }

    const getTrimCategory = (value)=>{
        trimForm.setFieldsValue(undefined)
        getTrimCodes()
        const req = new M3TrimType(value,sourcingForm.getFieldValue('buyer'))
        m3Service.getAllTrimCategories(req).then((res)=>{
            if(res.status){
                setTrimData(res.data)
            }
        })
    }

    const getMappedTrims = (value, option) => {
        getM3TrimsTypes()
        setTrimCat(option?.name)
        const req = new TrimIdRequestDto(undefined,option?.name)
        paramsService.getMappedParamsByTrim(req).then((res) => {
          if (res.status) {
            setMapData(res.data)
          }
        });
      }

      const renderTrimCodeOptions = () => {
        const trimOptions = [];
      
        mapData.forEach((item, index) => {
          let optionLabel = "Format - Buyer/TrimType/TrimCategory";
          Object.entries(item).forEach(([key, value]) => {
            if (value === true && key !== 'isActive') {
              optionLabel += `/${key.toUpperCase()}`;
            }
          });
      
          trimOptions.push(
            <Option key={`${index}`} value={null}>
              {optionLabel}
            </Option>
          );
        });
      
        return trimOptions;
      };
      
      
      

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
 
    const getStyle = (buyer) => {
        const req = new buyerReq(buyer,null)
        styleService.getAllStyle(req).then(res =>{
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
    const getM3FabricStyleCodes = (buyer) => {
        m3ItemsService.getM3FabricsByBuyer({buyerId:buyer}).then(res => {
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
        setBtnType("Update")
    }

    const editForm = (rowData : any , index:any) =>{
        setDefaultTrimFormData(rowData)
        setTrimIndexVal(index)
        setTrimBtnType("Update")
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
                colorName : defaultFabricFormData.colorName,
                newColor : defaultFabricFormData.newColor,
                pch  : defaultFabricFormData.pch,
                moq  : defaultFabricFormData.moq,
                moqUnit  : defaultFabricFormData.moqUnit,
                season  : defaultFabricFormData.season,
                moqPrice  : defaultFabricFormData.moqPrice,
                supplier  : defaultFabricFormData.supplier,
                supplierName:defaultFabricFormData.supplierName,
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
                trimName : defaultTrimFormData.trimName,
                size : defaultTrimFormData.size,
                sizeName : defaultTrimFormData.sizeName,
                color : defaultTrimFormData.color,
                colorName : defaultTrimFormData.colorName,
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
            dataIndex:'m3FabricName',
            render: (text,record) => {
                return(
                    <>
                    {record.m3FabricName ? record.m3FabricName : '-'}
                    </>
                )
            }
        },
        {
            title:'Color',
            dataIndex:'color',
            render: (text,record) => {
                return(
                    <>
                    {record.color ? record.colorName : record.newColor}
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
        // {
        //     title:'Supplier',
        //     dataIndex:'supplier',
        //     render: (text,record) => {
        //         return(
        //             <>
        //             {record.supplier ? record.supplierName : '-'}
        //             </>
        //         )
        //     }
            
        // },
        // {
        //     title:'GRN Date',
        //     dataIndex:'grnDate',
        //     render:(text,record) => {
        //         const date = new Date(record.grnDate)
        //         return(
        //             <>
        //             {record.grnDate ? moment(date).format('YYYY-MM-DD') : '-'}
        //             </>
        //         )
        //     }
        // },
        // {
        //     title:'Buyer',
        //     dataIndex:'buyer',
        //     render: (text,record) => {
        //         return(
        //             <>
        //             {record.buyer ? record.buyerName : '-'}
        //             </>
        //         )
        //     }
            
        // },
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
          render: (text) => {
            const EnumObj = ItemTypeEnumDisplay?.find((item) => item.name === text);
            return EnumObj ? EnumObj.displayVal : text;
          },
        },
        // {
        //   title: 'Trim Code',
        //   dataIndex: 'trimCode',
        // },
        {
            title: 'M3 Trim Code',
            dataIndex: 'trimName',
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
       
        // {
        //   title: 'Description',
        //   dataIndex: 'description',
        // },
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
            if(values.color || values.newColor){

                console.log(fabricIndexVal) 
                console.log(values)
                if(fabricIndexVal !== undefined){
                    console.log(fabricIndexVal)
                    console.log(fabricM3Code)
                    console.log(fabricM3Code.find((e) => e.m3ItemsId === values.m3FabricCode)?.itemCode)
                    let m3item = fabricM3Code.find((e) => e.m3ItemsId === values.m3FabricCode)?.itemCode + " - " + fabricM3Code.find((e) => e.m3ItemsId === values.m3FabricCode)?.description
                    values.m3FabricName = m3item;
                    // let colorName = color.find((e) => e.colourId === values.color)?.colorName;
                    // values.colorName = colorName;
                    fabricTableData[fabricIndexVal] = values;
    
                    tableData = [...fabricTableData]
                    setFabricIndexVal(fabricIndexVal+1)
                } else{
                    tableData = [...fabricTableData,values]
                }
                setFabricTableData(tableData)
                fabricForm.resetFields()
                setFabricTableVisible(true)
                setBtnType("Add")
            }else{
                message.error('Please Give the color')
            }
        }).catch(() => {
            message.error('Please fill all required fields')
        })
    }

    const onTrimAdd = (values) => {
        console.log(values);
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
        setTrimBtnType("Add")
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
        setFabricBuyer(option)
        fabricForm.setFieldsValue({buyerName:option})
        getStyle(val);
        // getM3TrimsTypes(val);
        getM3FabricStyleCodes(val)
        setFabricTableData([])
        setFabricTableVisible(false)
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

const quantityOnChange = (val, option)=> {
    console.log(val);
    console.log(option);
}

const onTrimChange = (val, option) => {
    console.log(val);
    console.log(option);

    const selectedTrim = option?.children || ''; // Ensure a fallback value
    setTrimCode(selectedTrim);
    trimForm.setFieldsValue({trimName:selectedTrim})
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
            const req = new SourcingRequisitionReq(sourcingForm.getFieldValue('style'),sourcingForm.getFieldValue('expectedDate'),sourcingForm.getFieldValue('requestNo'),sourcingForm.getFieldValue('indentDate'),fabricTableData,trimsTableData,sourcingForm.getFieldValue('buyer'))
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
  };

    const validateExpectedDate = (e) => {
        let selectedDate = e.format("YYYY-MM-DD");
        let indentDate = sourcingForm.getFieldValue("indentDate").format("YYYY-MM-DD");
        console.log(selectedDate)
        console.log(indentDate)
        if(selectedDate < indentDate){
            AlertMessages.getErrorMessage("Expected Date must be less than Indent Date")
            sourcingForm.setFieldsValue({"expectedDate" : ''})
        }
        else{
            console.log("iii");
        }
    }
    const checkAccess = (buttonParam) => {   
        const accessValue = RolePermission(null,MenusAndScopesEnum.Menus.Procurment,MenusAndScopesEnum.SubMenus.Indent,buttonParam)
        // console.log(accessValue,'access');
        
        return accessValue
    }

    const options = () => {
        let segmentOptions = [
        { key: 'Fabric', label: 'Fabric' },
        { key: 'Trim', label: 'Trim' }
      ];
      if (checkAccess(MenusAndScopesEnum.Scopes.trimTab && checkAccess(MenusAndScopesEnum.Scopes.fabricTab))) {
        console.log(segmentOptions);
        segmentOptions = segmentOptions
      }
      // if(tableData?.indentFabricDetails)
        if (checkAccess(MenusAndScopesEnum.Scopes.fabricTab) && !checkAccess(MenusAndScopesEnum.Scopes.trimTab) ) {
          segmentOptions = segmentOptions.filter((e) => e.label === 'Fabric');
          console.log(segmentOptions);
        }
        if (checkAccess(MenusAndScopesEnum.Scopes.trimTab) && !checkAccess(MenusAndScopesEnum.Scopes.fabricTab)) {
          console.log(segmentOptions);
          segmentOptions = segmentOptions.filter((e) => e.label === 'Trim');
        }
        console.log(segmentOptions);
        
        return segmentOptions.map((operation, index) => ({
          label: <b>{operation.label}</b>,
          value: operation.label,
          key: index.toString(),
      
        }));
      };
  const segmentedOptions = options();
    return(
        <><Card title='Indent' headStyle={{ backgroundColor: '#69c0ff', border: 0 }} extra={<span><Button onClick={() => navigate('/requisition-view')}>View</Button></span>}>
            <Form form={sourcingForm} layout="vertical">
                <Row gutter={8}>
                {/* {!isBuyer ? 
                <> */}
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
                    {/* </>:<></>} */}
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Form.Item name='style' label='Style' rules={[{ required: true, message: 'Style is required' }]}>
                            <Select showSearch allowClear optionFilterProp="children" placeholder='Select Style' >
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
                            <DatePicker style={{ width: '100%' }} onChange={validateExpectedDate}/>
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
                        defaultValue={checkAccess(MenusAndScopesEnum.Scopes.fabricTab)?"Fabric":checkAccess(MenusAndScopesEnum.Scopes.trimTab) ? "Trim":''}
                        // options={[
                        //     {
                        //         label: (
                        //             <>
                        //                 <b style={{ fontSize: "12px" }}>Fabric Details</b>
                        //             </>
                        //         ),
                        //         value: "Fabric",
                        //     },
                        //     {
                        //         label: (
                        //             <>
                        //                 <b style={{ fontSize: "12px" }}>Trim Details</b>
                        //             </>
                        //         ),
                        //         value: "Trim",
                        //     },
                        // ]} 
                        options= {segmentedOptions}
                        />
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
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 12 }}>
                                            <Form.Item name='m3FabricCode' label='M3 Fabric Code' rules={[{ required: true, message: 'M3 Code is required' }]}>
                                                <Select showSearch allowClear optionFilterProp="children" placeholder='Select M3 Code'
                                                dropdownMatchSelectWidth={false}
                                                    >
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
                                    {/* </Row> */}
                                    {/* <Row gutter={24}>
            <h1 style={{ color: '#6b54bf', fontSize: '20px', textAlign: 'left' }}>ITEM DETAILS</h1>
        </Row> */}
                                    {/* <h1 style={{ color: '#6b54bf', fontSize: '15px', textAlign: 'left' }}>ITEM DETAILS</h1>
                                    <Row gutter={8}> */}
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                                            <Form.Item name='color' label='Color' rules={[{ required: false, message: 'Color is required' }]}>
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
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                                            <Form.Item name='newColor' label='New Color(If not in the list)' rules={[{ required: false, message: 'color is required' }]}>
                                                <Input placeholder="Enter Color" />
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
                                        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                                            <Form.Item name='supplier' label='Supplier'
                                            //  rules={[{ required: true, message: 'Supplier is required' }]}
                                             >
                                                <Select showSearch allowClear optionFilterProp="children" placeholder='Select Supplier' onChange={onSupplierChange}>
                                                    {supplier.map(e => {
                                                        return (
                                                            <Option key={e.vendorId} value={e.vendorId} name={e.vendorName}>{e.vendorCode}-{e.vendorName}</Option>
                                                        );
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col> */}
                                        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                                            <Form.Item name='grnDate' label='GRN Date' rules={[{ required: true, message: 'Grn date is required' }]}>
                                                <DatePicker style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col> */}
                                        
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                                            <Form.Item name='xlNo' label='XL No' rules={[{ required: true, message: 'XL No is required' }]}>
                                                <Input placeholder="Enter XL No" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                                            <Form.Item name='quantity' label='Quantity' rules={[{ required: true, message: 'Quantity is required' }]}>
                                                <Input type="number" placeholder="Enter Quantity" addonAfter={ <Form.Item name='quantityUnit' style={{width:'90px', height:"10px"}} rules={[{ required: true, message: 'Unit is required' }]}><Select showSearch allowClear optionFilterProp="children" placeholder='Unit' >
                                                    {uom.filter((e)=> e.uomCategory === UomCategoryEnum.LENGTH)?.map(e => {
                                                        return (
                                                            <Option key={e.uomId} value={e.uomId}>{e.uom}</Option>
                                                        );
                                                    })}
                                                </Select></Form.Item>} />
                                            </Form.Item>
                                        </Col>
                                        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{ marginTop: '2%' }}>
                                            <Form.Item name='quantityUnit' rules={[{ required: true, message: 'Unit is required' }]}>
                                                <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                                                    {uom.map(e => {
                                                        return (
                                                            <Option key={e.uomId} value={e.uomId}>{e.uom}</Option>
                                                        );
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col> */}
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
                                        {
                                        imageUrl && (
                                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                                            <Card style={{ height: '250px' }}>
                                                <Form.Item>
                                                <img
                                                    src={imageUrl}
                                                    alt="Preview"
                                                    height={'200px'}
                                                    width={'500px'}
                                                    style={{ width: '100%', objectFit: 'contain', marginRight: '100px' }}
                                                />
                                                </Form.Item>
                                            </Card>
                                            </Col>
                                        )}
                                    </Row>
                                    <Row justify={'end'}>
                                        <Button type='primary' htmlType="submit">{btnType}</Button>
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
                                    <Form.Item name='trimName' style={{ display: 'none' }}>
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
                                                    onChange={getTrimCategory}
                                                >
                                                    {Object.values(ItemTypeEnumDisplay).filter((val) => val.displayVal !== ItemTypeEnum.FABRIC).map((val) => (
                                                        <Option key={val.name} value={val.name}>
                                                            {val.displayVal}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 4 }}>
                                            <Form.Item
                                                name="trimCategory"
                                                label="Trim Category"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Trim Category Is Required",
                                                    }
                                                ]}>
                                                <Select
                                                    allowClear
                                                    showSearch
                                                    optionFilterProp="children"
                                                    placeholder="Select Trim Category"
                                                    onChange={getMappedTrims}
                                                >
                                                    {trimData?.map((e) => {
                                                        return (
                                                            <Option key={e.trimCategory} value={e.trimCategoryId} name={e.trimMappingId}>
                                                                {e.trimCategory}
                                                            </Option>
                                                        );
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 12 }}>
                                            <Form.Item
                                                name="trimCode"
                                                label="Trim Code"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Trim Code Is Required",
                                                    }
                                                ]}>
                                                <Select
                                                    allowClear
                                                    showSearch
                                                    optionFilterProp="children"
                                                    placeholder={renderTrimCodeOptions()[0]?.props.children}
                                                    onChange={onTrimChange}
                                                >
                                                    {renderTrimCodeOptions()}
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
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }}>
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
                                                <Input type="number"  min={1} placeholder="Enter Quantity" addonAfter={<Form.Item name='quantityUnit' style={{width:'80px', height:"10px"}} rules={[{ required: true, message: 'Unit is required' }]}>
                                                    <Select showSearch allowClear optionFilterProp="children" placeholder="Enter uom">
                                                    {uom?.map(e => {
                                                        return (
                                                            <Option key={e.uomId} value={e.uomId}>{e.uom}</Option>
                                                        );
                                                    })}
                                                </Select></Form.Item>}/>
                                            </Form.Item>
                                        </Col>
                                        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{ marginTop: '2%' }}>
                                            <Form.Item name='quantityUnit' rules={[{ required: true, message: 'Unit is required' }]}>
                                                <Select showSearch allowClear optionFilterProp="children" placeholder='Unit'>
                                                    {uom.map(e => {
                                                        return (
                                                            <Option key={e.uomId} value={e.uomId}>{e.uom}</Option>
                                                        );
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col> */}
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
                                        {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}> */}
                                            <Form.Item
                                                name="description"
                                                // label="Description"
                                            >
                                                <Input type="hidden" value='trim' />
                                            </Form.Item>
                                        {/* </Col> */}
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                            <Form.Item
                                                name="remarks"
                                                label="Remarks"
                                            >
                                                <TextArea rows={1} placeholder="Enter Remarks" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 4 }}>
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
                                        <Button type='primary' htmlType="submit">{trimBtnType}</Button>
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
                    <Button type="primary" onClick={onSubmit} disabled={fabricTableData.length>0 || trimsTableData.length > 0 ?false:true}>Submit</Button>
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