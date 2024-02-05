import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip, message, Form, InputNumber, Checkbox, FormInstance, Modal, Upload, UploadProps, Card } from 'antd';
import { DeleteOutlined, EyeOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { M3TrimsService, SampleDevelopmentService, TrimParamsMappingService, UomService } from '@project-management-system/shared-services';
import { ItemTypeEnumDisplay, ItemTypeEnum, M3TrimType, BuyerIdReq, TrimIdRequestDto, buyerandM3ItemIdReq, UomCategoryEnum, M3TrimFilterReq } from '@project-management-system/shared-models';
import moment from 'moment';
import AlertMessages from '../common/common-functions/alert-messages';
import M3TrimsReqFile from '../sourcing-requisition/m3-trims-req.file';

export interface TrimsFormProps {
  data: any;
  buyerId: number;
  sizeDetails: any[];
  form:FormInstance<any>
}

const TrimsForm = (props:TrimsFormProps) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [trimCode, setTrimCode]=useState<any[]>([])
  const [trimType, setTrimtype]= useState<any[]>([])
  const [uom, setUom] = useState([]);
  const service = new M3TrimsService()
  const sampleDevelopmentService = new SampleDevelopmentService()
  const uomService =  new UomService()
  const [trimData, setTrimData] = useState<any[]>([])
  const[itemType, setItemType] = useState<string>('')
  const paramsService = new TrimParamsMappingService()
  const [mapData, setMapData] = useState<any[]>([])
  const [m3Trims, setM3Trims] = useState<any[]>([])
  // const [form] = Form.useForm();
  const [stockData, setStockData] = useState<any[]>([])
  const [sourcingForm] = Form.useForm();
  const [checked, setChecked] = useState<boolean>(false)
  const [btnEnable,setbtnEnable]=useState<boolean>(false)
  const [stockForm] = Form.useForm();
  const [keyUpdate, setKeyUpdate] = useState<number>(1);
  const [keyValue, setKeyValue] = useState<number>(undefined);
  // const [uomStatus, setUomStatus] = useState<boolean>(false);
  const [visibleModel, setVisibleModel] = useState<boolean>(false);
  const [searchVisible, setSearchVisible] = useState<boolean>(false)
  const [trimCatId, setTrimCatId] = useState<number>(undefined)
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [modal, setModal] = useState('')
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [imageName, setImageName] = useState('');
 const {Option}=Select

 const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
const uploadFabricProps = (keyValue:number): UploadProps =>  ({
  // alert();
  multiple: true,
  onRemove: file => {
    console.log(file);
    console.log(fileList.length);

    let files:any[] = fileList.length != undefined ? fileList?.find((f) => f.uid != file.uid) : []
    console.log(data)
    console.log(data[keyValue]);
    if(data[keyValue] != undefined){
      data[keyValue].trimUpload = undefined;
    }
    setData(data);
    props.data(data);

    setFileList(files);
    setImageUrl('');
  },
  beforeUpload: (file: any, index:any) => {
    console.log(file)
    console.log(fileList);
    console.log(index)
    console.log(keyValue)
    if (!file.name.match(/\.(png|jpeg|PNG|jpg|JPG|pjpeg|gif|tiff|x-tiff|x-png)$/)) {
      AlertMessages.getErrorMessage("Only png,jpeg,jpg,pjpeg,gif files are allowed!");
      return true;
    }
    console.log(fileList)

    // var reader = new FileReader();
    // reader.readAsArrayBuffer(file);
    // reader.onload = data => {
      // if (fileList?.length == 1) {
      //   AlertMessages.getErrorMessage("You Cannot Upload More Than One File At A Time");
      //   return true;
      // } else {
        console.log(fileList)
        setFileList([...fileList,file]);
        console.log(fileList,"****")
        // getBase64(file, imageUrl =>
        //   setImageUrl(imageUrl)
        // );
        return false;
      // }
    // }
  },
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: percent => `${parseFloat(percent.toFixed(2))}%`,
  },
  // fileList: fileList,
});

  const handleAddRow = () => {
    if(props.sizeDetails.length > 0){
      props.sizeDetails?.forEach(element => {
        let qtyy = 0;
        element.sizeInfo?.forEach(qty => {
          qtyy = Number(qtyy)+Number(qty.quantity);
        })
        const newRow = {
          key: count,
          colourId:element.colour,
          totalCount: qtyy,
          wastage:2,
          uomStatus:false,
          fabricUpload:undefined
        };
        props.form.setFieldValue([`wastage${count}`],2)
        setData([...data, newRow]);
        setCount(count + 1);
      });
    }
  };

  useEffect(() =>{
    if(props.buyerId != null){
      getTrimTypes(props.buyerId)
    }
  },[props.buyerId])

  useEffect(() =>{
    getUom()
  },[])
  const getUom = () => {
    uomService.getAllUoms().then(res => {
        if(res.status) {
            setUom(res.data)
        }
    })
  }
  const getTrimTypes = (buyerId) =>{
    const req = new M3TrimFilterReq(buyerId,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined)
    
    service.getM3TrimsByBuyer(req).then(res =>{
      if(res.status){
        setTrimtype(res.data)
      }else{
        setTrimtype([])
        message.info(res.internalMessage)
      }
    })
  }

  const getTrimCategory = (value)=>{
    setItemType(value)
    const req = new M3TrimType(value,props.buyerId)
    service.getAllTrimCategories(req).then((res)=>{
        if(res.status){
            setTrimData(res.data)
        }
    })
}

const getM3TrimsTypes = (value: number,request:any,KeyValue:number) => {
  console.log(request)
  let req = new M3TrimFilterReq()
  req.buyerId=props.buyerId
  req.trimType=itemType
  req.trimCategory=value?value:trimCatId
  if(request != undefined){
    req.categoryId=request.categoryId
    req.contentId=request.contentId
    req.finishId=request.finishId
    req.holeId=request.holeId
    req.hsnCode=request.hsnCode
    req.m3Code=request.m3Code
    req.typeId=request.typeId
    req.trimMapId=request.trimMapId
  }

  console.log(req)
  // const reqq = new BuyerIdReq(props.buyerId,itemType,value)
  //  req = new M3TrimFilterReq(props.buyerId,value,itemType,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined)
  service.getM3TrimsByBuyer(req).then(res => {
      if(res.status) {
          props.form.setFieldValue(`trimCode${KeyValue}`,undefined)
          setM3Trims(res.data)
      }else{
        setM3Trims([])
        message.info('No Data Found')
      }
  })
}

const getMappedTrims = (value, row) => {
  setSearchVisible(true)
  getM3TrimsTypes(value,undefined,keyValue)
  const req = new TrimIdRequestDto(undefined,value)
  paramsService.getMappedParamsByTrim(req).then((res) => {
    if (res.status) {
      let updatedData = data.map((record) => {
        if (record.key === row.key) {
          return { ...record, ["uomStatus"]: res.data[0].uom };
        }
        return record;
      });
      setData(updatedData)
      setMapData(res.data)
    }
  });
}

  const getTrimCodes = (value) =>{
    service.getM3TrimsByTrimCode({trimType:value}).then(res =>{
      if(res.status){
        setTrimCode(res.data)
      }else{
        setTrimCode([])
        message.info(res.internalMessage)
      }
    })
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

  const getStockDetails = (record,e) => {
    
    // console.log(record);
    // console.log(e);

    record.trimCode = e;
    let req = new buyerandM3ItemIdReq(props.buyerId,e,record.trimType);
    sampleDevelopmentService.getAvailbelQuantityAginstBuyerAnditem(req).then((res) => {
      if(res.status){
        setStockData(res.data);
        handleInputChange(res.data, record.key, "allocatedStock", record)
        // sourcingForm.setFieldValue([`allocatedStock${record.key}`],res.data)
        // AlertMessages.getSuccessMessage(res.internalMessage)
      }
      else{
        setStockData([]);
        AlertMessages.getErrorMessage(res.internalMessage)
      }
    })
  }
  // console.log(trimCatId)
  const handleInputChange = async (e, key, field, record) => {
    // console.log("*********************************************")
    // console.log(e)
    // console.log(key)
    // console.log(field)
    setKeyValue(key)
    let isDuplicate 
    let updatedData
    if(field == 'trimCategory'){
      setTrimCatId(e)
    }
    if (field === 'trimCode' && e != undefined) {
      console.log(data);
      isDuplicate =  data.find((r) => r.trimCode === e);
      console.log(isDuplicate);
      // console.log(m3Trims)
      // console.log(m3Trims.find((i) => i.m3TrimsId === e)?.uomId)
      updatedData = data.map((record) => {
        if (record.key === key) {
          // setUomStatus(true)
          // handleInputChange((m3Trims.find((i) => i.m3TrimsId === e)?.uomId)!= undefined?m3Trims.find((i) => i.m3TrimsId === e)?.uomId:null,key,"uomId",record);
          props.form.setFieldValue(`uomId${key}`,(m3Trims.find((i) => i.m3TrimsId === e)?.uomId)!= undefined?m3Trims.find((i) => i.m3TrimsId === e)?.uomId:null);
          return { ...record, [field]: e };
        }
        return record;
      });
      await getStockDetails(record,e)
    } 
    else if(field === "allocatedStock"){
      // console.log(record.key);
        // console.log(key);

      updatedData = data.map((record) => {
        if (record.key === key) {
          return { ...record, [field]: e, ["trimCode"] : record.trimCode };
        }
        return record;
      });
    }
    else if(field === 'consumption'){
      let wastg =props.form.getFieldValue(`wastage${key}`) != undefined ?props.form.getFieldValue(`wastage${key}`) : 2;
      updatedData = data.map((record) => {
        if (record.key === key) {
          let qtyy = 0;
          // props.sizeDetails?.forEach(element => {
          //   element.sizeInfo?.forEach(qty => {
          //     qtyy = Number(qtyy)+Number(qty.quantity);
          //   })
          // });

           qtyy += props.sizeDetails.reduce((sum, record) => {
            const sizeInfoQuantitySum = record.sizeInfo.reduce(
              (sizeSum, sizeInfo) => sizeSum + Number(sizeInfo.quantity),
              0
            );
          
            return sum + sizeInfoQuantitySum;
          }, 0);

          console.log(qtyy)

          // console.log(qtyy);
          let consumptionCal = Number(qtyy) * Number(e);
          let withPer = (Number(consumptionCal) * Number(wastg))/ 100;
          // console.log(consumptionCal);
          // console.log(withPer);
         props.form.setFieldValue(`totalRequirement${key}`,(Number(consumptionCal) + Number(withPer)).toFixed(2));
          return { ...record, [field]: e, [`totalRequirement`]:Number(Number(consumptionCal) + Number(withPer)).toFixed(2) };
        }
        return record;
      });
    }
    else if(field === 'wastage'){
      let cons =props.form.getFieldValue(`consumption${key}`) != undefined ?props.form.getFieldValue(`consumption${key}`) : 0
      updatedData = data.map((record) => {
        if (record.key === key) {
          let qtyy = 0;
          props.sizeDetails?.forEach(element => {
            element.sizeInfo?.forEach(qty => {
              qtyy = Number(qtyy)+Number(qty.quantity);
            })
          });
          // console.log(qtyy);
          let consumptionCal = Number(qtyy) * Number(cons);
          let withPer = (Number(consumptionCal) * Number(e))/ 100;
          // console.log(consumptionCal);
          // console.log(withPer);
         props.form.setFieldValue(`totalRequirement${key}`,(Number(consumptionCal) + Number(withPer)).toFixed(2));
          return { ...record, [field]: e, [`totalRequirement`]:Number(Number(consumptionCal) + Number(withPer)).toFixed(2) };
        }
        return record;
      });
    }
    
    // else if(field === "trimCategory"){
    //   console.log(data);
    //   isDuplicate =  data.find((r) => r.trimCode === record.trimCode && r.trimCategory === e && r.trimType === record.trimType);
    //   console.log(isDuplicate);
    //   updatedData = data.map((record) => {
    //     if (record.key === key) {
    //       return { ...record, [field]: e };
    //     }
    //     return record;
    //   });
    // }
    // else if(field === "trimType"){
    //   console.log(data);
    //   isDuplicate =  data.find((r) => r.trimCode === record.trimCode && r.trimCategory === record.trimCategory && r.trimType === e);
    //   console.log(isDuplicate);
    //   updatedData = data.map((record) => {
    //     if (record.key === key) {
    //       return { ...record, [field]: e };
    //     }
    //     return record;
    //   });
    // }
    else{
      updatedData = data.map((record) => {
        if (record.key === key) {
          return { ...record, [field]: e };
        }
        return record;
      });
    }

    console.log(isDuplicate);
    if(isDuplicate?.trimCode > 0)
    {
      AlertMessages.getErrorMessage("Duplicate Entries not allowed. ")
      props.form.setFieldValue(`trimCode${key}`,undefined)
      props.form.validateFields().then(trim => {
      })
      .catch((err) => {
        // console.log(err);
      })
      
    }
    else{
      // console.log("jj")
    }
    
    setData(updatedData);
    console.log(updatedData)
    props.data(updatedData)
    
  };

  const handleDelete = (key) => {
    // console.log(key);
    // console.log(data);
    const updatedData = data.filter((record) => record.key !== key);
    // console.log(updatedData);
    if(updatedData.length === 0){
      setData([]);
      props.data([])
    }
    else{
      setData(updatedData);
      props.data(updatedData)
    }
   
  };

  const trimTypeOnchange = (value) =>{
    getTrimCodes(value)
  }
  const columns:any = [
    {
      title: 'S.No',
      dataIndex: 'sNo',
      width:"10%",

      render: (_, record, index) => index + 1,
    },
    {
      title: 'Trim Type',
      dataIndex: 'trimType',
      width:"20%",

      render: (_, record) => (
        <Form.Item name={`trimType${record.key}`} rules={[{ required: true, message: 'Missing Trim Type' }]}>
        <Select
          value={record.trimType}
          onChange={(e) => handleInputChange(e, record.key, 'trimType',record)}
          style={{width:"100%"}}
          allowClear
          showSearch
          optionFilterProp="children"
          placeholder="Select Trim Type"
          onSelect={getTrimCategory}
         >
          {/* <Option name={`trimType${record.key}`} key={0} value={0}>Please Select TrimType</Option> */}
          {Object.values(ItemTypeEnumDisplay).filter((val) => val.displayVal !== ItemTypeEnum.FABRIC).map((val) => (
            <Option key={val.name} value={val.name}>
              {val.displayVal}
            </Option>
          ))}
          </Select>
          </Form.Item>
      ),
    },
    {
      title: 'Trim Category',
      dataIndex: 'trimCategory',
      width:"20%",

      render: (_, record) => (
        <Form.Item name={`trimCategory${record.key}`} rules={[{ required: true, message: 'Missing Trim Category' }]}> 
        <Select
          value={record.trimCategory}
          onChange={(e) => handleInputChange(e, record.key, 'trimCategory',record)}
          style={{width:"100%"}}
          allowClear
          showSearch
          optionFilterProp="children"
          placeholder="Select Trim Category"
          onSelect={(e) => getMappedTrims(e,record)}
         >
          {/* <Option name={`trimCategory${record.key}`} key={0} value={0}>Please Select Trim Category</Option> */}
          {trimData?.map((e) => {
            return (
            <Option key={e.trimCategory} value={e.trimCategoryId} name={e.trimMappingId}>
              {e.trimCategory}
            </Option>
          )})}
          </Select>
          </Form.Item>
      ),
    },
    {
      title: 'Trim Code',
      dataIndex: 'trimCode',
      width:"100%",

      render: (_, record) => (
        <><Form.Item name={`allocatedStock${record.key}`} style={{display:'none'}}><Input name={`allocatedStock${record.key}`} style={{display:'none'}}/></Form.Item>
        <Form.Item name={`trimCode${record.key}`} rules={[{ required: true, message: 'Missing Trim Code' }]}>
          <Select
            value={record.trimCode} 
            onChange={(e) => handleInputChange(e, record.key, 'trimCode', record)}
            style={{ width: "100%" }}
            allowClear
            showSearch
            optionFilterProp="children"
            placeholder="Select Trim Code"
            suffixIcon={searchVisible == true?<SearchOutlined
            onClick={() => trimFilterFormVisible(record.key)}
             style={{ fontSize: '28px', marginLeft: '-7px' }} />:<></>}
          >
            <Option name={`trimCode${record.key}`} key={0} value={undefined}>Please Select Trim Code</Option>
            {m3Trims.map(item => {
              return <Option key={item.m3TrimsId} value={item.m3TrimsId}>{item.trimCode}</Option>;
            })}
          </Select>
        </Form.Item></>
      ),
    },
   
    {
      title: 'Consumption',
      dataIndex: 'consumption',
      width:"16%",
          
      render: (_, record) => (
        <Form.Item name={`consumption${record.key}`} rules={[{ required: true,pattern: new RegExp(/^[0-9]+$/), message: 'Decimal values are not allowed' }]}>
        <InputNumber placeholder="Consumption" min={1}
        value={record.consumption}
        onChange={(e) => handleInputChange(e, record.key, 'consumption',record)}
        />
        </Form.Item>
      ),
    },
    {
      title:"UOM",
      dataIndex: 'Uom',
      width:"14%",

      render: (_, record) => (
        <Form.Item name={`uomId${record.key}`} rules={[{ required: false, message: 'Missing UOM' }]}>
        <Select
        value={record.uomId}
        style={{width:"100%"}}
        allowClear
        showSearch
        optionFilterProp="children"
        placeholder="Select UOM" 
        disabled={true}
        // defaultValue={uom.find((e) => e.uom === "PCS")?.uom}
        onChange={(e) => handleInputChange(e, record.key, 'uomId',record)}
        >
            {uom?.map(e => {
              return(
                  <option key={e.uomId} value={e.uomId}>{e.uom}</option>
                  
              )
          })}
        </Select>
        </Form.Item>
      ),
    },
    {
      title: 'Wastage %',
      dataIndex: 'wastage',
      width:"15%",

      render: (_, record) => (
      <Form.Item name={`wastage${record.key}`} rules={[{ required: true, message: 'Missing Wastage' }]}>
        <InputNumber placeholder='wastage'
        defaultValue={2} min={0}
        onChange={(e) => handleInputChange(e, record.key, 'wastage',record)}
        />
      </Form.Item>
      ),
    },
    {
      title: 'Total Requirement',
      dataIndex: 'totalRequirement',
      width:"15%",

      render: (_, record) => (
      <Form.Item name={`totalRequirement${record.key}`} rules={[{ required: true, message: 'Missing total requirement' }]}>
        <Input disabled style={{fontWeight:'bold', color:"black"}}
        value={record.totalRequirement}
        onChange={(e) => handleInputChange(e.target.value, record.key, 'totalRequirement',record)}
        />
      </Form.Item>
      ),
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      width:"50%",

      render: (_, record) => (
        <Form.Item name={`remarks${record.key}`}>
        <TextArea
        value={record.remarks} placeholder='Remarks'
        onChange={(e) => handleInputChange(e.target.value, record.key, 'remarks',record)}
        rows={1}
        />
        </Form.Item>
      ),
    },
    {
      title:'preview',
      dataIndex: 'fabricUpload',
      width:"10%",
      fixed:'right',
      render: (_, record) => (
        <span style={{alignContent:'center'}}>{
        (fileList.length>0 && fileList[record.key] != undefined)?<Button icon={<EyeOutlined/>} onClick={()=>onTrimView(record.key)}></Button>:<></>
    }</span>
      )
    },
    {
      title: 'Upload Trim',
      dataIndex: 'trimUpload',
      width:"25%",
      fixed:'right',
      render: (_, record) => (
        <Form.Item name={`trimUpload${record.key}`} initialValue={record.trimUpload}>
          <Upload key={record.key} name={`trimUpload${record.key}`} style={{ width: '100%' }} 
            {...uploadFabricProps(record.key)}
            accept=".jpeg,.png,.jpg"
            onChange={(e) => handleInputChange(e.file,record.key,'trimUpload',record)}
            >
            <Button key={record.key} name={`trimUpload${record.key}`}
                style={{ color: 'black', backgroundColor: '#7ec1ff' }}
                // icon={<UploadOutlined />}
                disabled={(fileList[record.key] != undefined)? true:false}
            >
                <Tooltip title="Upload Trim"><UploadOutlined /></Tooltip>
            </Button>
          </Upload>
      </Form.Item>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width:"10%",
      fixed:'right',
      render: (_, record) => (
        <Button onClick={() => handleDelete(record.key)}><Tooltip title="Delete Row"><DeleteOutlined /></Tooltip></Button>
      ),
    },
  ];

  const onTrimView =(key) =>{
    setModal('fileUpload')
    setPreviewVisible(true)
    console.log(fileList[key])
    setImageName(fileList[key].name)
    getBase64(fileList[key], imageUrl =>
      // console.log(imageUrl)
      setImageUrl(imageUrl)
    );
    
  }

  const setAllocatedQty = (index, rowData, value, total,fabIndex) => {
    // console.log(fabIndex)
    // console.log(total);
    // console.log(index);
    // console.log(data);
    // console.log(rowData);
    rowData.issuedQty = value
    const newData = data.find((record,index) => index === fabIndex)?.allocatedStock;
    // const newData = [...stockData];
    // console.log(newData);
    let stockRecord = newData.find((s) => s.stockId === rowData.stockId);
    stockRecord.issuedQty = value;
    const sum = newData.reduce((accumulator, object) => {
      // console.log(accumulator);
      // console.log(object.issuedQty);
      return accumulator + (object.issuedQty != undefined ? Number(object.issuedQty) : 0);
    }, 0);
    // console.log(sum);
    if(Number(sum) > Number(total)){
      AlertMessages.getErrorMessage('Issued Quantity should not exceed total required. ')
      stockForm.setFieldValue(`allocatedQuantity${fabIndex}-${index}`,0)
    }
    // newData[index].issuedQty = value;
    console.log(newData[index]);
    console.log(newData)
    // setStockData(newData);
    if (value === 0 || value === null || value < 0 || value === undefined) {
      AlertMessages.getErrorMessage('Issued Quantity should be greater than zero')
      stockForm.setFieldValue(`allocatedQuantity${fabIndex}-${index}`,0);
    }
    if (Number(value) > Number(rowData.quantity)) {
      stockForm.setFieldValue(`allocatedQuantity${fabIndex}-${index}`,0);
      AlertMessages.getErrorMessage('Issued Quantity should be less than Avaialble Quantity--')
    }
  }
 const checkboxonclick =() =>{
  setChecked(true)
}

const tableColumns = (val,fabindex) => {
  if(val === undefined){
    AlertMessages.getWarningMessage("Please give required consumption. ");
  }
  // console.log(val);

  const renderColumnForFabric: any =[
    {
      title: 'S.No',
      dataIndex: 'sNo',
      width:"5%",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Grn Number",
      key:'grnNumber',
      dataIndex: "grnNumber",
      width: "150px",

    },
    {
      title: "Grn Date",
      key:'grnDate',
      dataIndex:"grnDate",
      render:(grnDate)=>moment(grnDate).format("YYYY-MM-DD"),
      width: "150px",

    },
    {
      title: "Location",
      key:'location',

      dataIndex: "location",
      width:'80px',
    },
  
    {
      title: "Available Quantity",
      width: "150px",
      dataIndex: "quantity",
    },
   
    {
      title: "Allocated Quantity",
      width:'200px',
      render: (text, rowData, index) => { 
        return(
          <Form form={stockForm}>
            <Form.Item name={`allocatedQuantity${fabindex}-${index}`}>
                  <InputNumber name={`allocatedQuantity${fabindex}-${index}`}
                      onChange={(e) => setAllocatedQty(index,rowData, e, val,fabindex)} 
                  />
            </Form.Item>
          </Form>
        )
      }
    },
    {
      title: <div style={{ textAlign: "center" }}>{btnEnable ?<Button  type="primary" 
      // onClick={() =>allocateQuantity()} 
      >Allocate</Button>:'Allocate'}</div>,
      dataIndex: "sm",
      key: "sm",
      align: "center",
      render: (text, rowData, index) => { 
        return (
          <Checkbox 
          onClick={checkboxonclick}
          onChange={(e) => onCheck(rowData, index, e.target.checked)}
          // onClick={(e) =>onCheck(rowData,undefined)}
          />
        );
      },
    },
   
  ]
  return [...renderColumnForFabric]
}
  const onCheck = (rowData, index, isChecked) => {
    if(isChecked){
      if(Number(rowData.issuedQty) > 0){
        rowData.issuedQty = rowData.issuedQty
        rowData.checkedStatus = 1;
        const newData = [...stockData];
        newData[index].issuedQty = rowData.issuedQty;
        newData[index].checkedStatus = 1;
        data.map((record) => {
          if (record.fabricCode === rowData.m3ItemId) {
            // record.allocatedStock = [...record.allocatedStock, newData];
            return { ...record, [`allocatedStock`]: newData};
          }
        }); 
        setStockData(newData);
        
        // setbtnEnable(true)
      }
      else{
        AlertMessages.getErrorMessage('Issued Quantity should be greater than zero')
      }
    }
    else{
      // console.log("")
    }
    
  };

  
  const renderItems = (record:any, index:any) => {
      return  <Table
      rowKey={record.stockId}
       dataSource={record.allocatedStock}
        columns={tableColumns(record.totalRequirement,index)} 

        pagination={false}
         />;
  };
  const handleCancel = () => {
    setVisibleModel(false);
  };
  const closeModel = () =>{
    setVisibleModel(false)
  }
  const trimFilterFormVisible =(key)=>{
     setVisibleModel(true)
     setKeyValue(key)
  }
  const handleTrimFilterData =(trimFilterData) =>{
    console.log(trimFilterData)
    let req
    if(trimFilterData != undefined){
      req = new M3TrimFilterReq(trimFilterData.buyerId,undefined,undefined,trimFilterData[0].categoryId,trimFilterData[0].contentId,trimFilterData[0].finishId,trimFilterData[0].holeId,trimFilterData[0].hsnCode,trimFilterData[0].m3Code,trimFilterData[0].typeId,trimFilterData[0].trimMapId) 
      getM3TrimsTypes(undefined,req,keyValue)
    }else{
      getM3TrimsTypes(undefined,undefined,keyValue)
    }
  }
  return (
    <div>
      <Form form={props.form}>

      <Button onClick={handleAddRow} style={{margin:"10px"}}>Add Row</Button>
      <Table 
      key={keyUpdate}
      rowKey={record => record.key}
      dataSource={data} 
      columns={columns} 
      expandedRowRender={renderItems}
      expandable = {{
        defaultExpandAllRows : true
        }}
        scroll={{ x: 2000 }}
        size="large"
        bordered
      />
      </Form>
      <Modal
          visible={previewVisible}
          title={imageName}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          {modal == 'fileUpload' ?<>
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
            </Card></>: <img alt="example" style={{ width: "100%" }} src={previewImage} />}
        </Modal>
      <Modal
            className='rm-'
            // key={'modal' + Date.now()}
            width={'70%'}
            style={{ top: 30, alignContent: 'right' }}
            visible={visibleModel}
            title={<React.Fragment>
            </React.Fragment>}
            onCancel={handleCancel}
            footer={[]}
        >
         <>
               <M3TrimsReqFile trimCategoryId={trimCatId} close={closeModel} formValues={handleTrimFilterData} buyerId={props.buyerId} trimType={itemType}/>
               </>:
         
            </Modal>
    </div>
    
  );
};

export default TrimsForm;
