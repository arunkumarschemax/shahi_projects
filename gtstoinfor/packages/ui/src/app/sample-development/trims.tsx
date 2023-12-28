import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip, message, Form, InputNumber, Checkbox, FormInstance } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { M3TrimsService, SampleDevelopmentService, TrimParamsMappingService, UomService } from '@project-management-system/shared-services';
import { ItemTypeEnumDisplay, ItemTypeEnum, M3TrimType, BuyerIdReq, TrimIdRequestDto, buyerandM3ItemIdReq, UomCategoryEnum } from '@project-management-system/shared-models';
import moment from 'moment';
import AlertMessages from '../common/common-functions/alert-messages';

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
  // const [uomStatus, setUomStatus] = useState<boolean>(false);

 const {Option}=Select

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
          uomStatus:false
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
    service.getM3TrimsByBuyer({buyerId:buyerId}).then(res =>{
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

const getM3TrimsTypes = (value: number) => {
  const req = new BuyerIdReq(props.buyerId,itemType,value)
  service.getM3TrimsByBuyer(req).then(res => {
      if(res.status) {
          setM3Trims(res.data)
      }
  })
}

const getMappedTrims = (value, row) => {
  getM3TrimsTypes(value)
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
    
    console.log(record);
    console.log(e);

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
  
  const handleInputChange = async (e, key, field, record) => {
    console.log("*********************************************")
    console.log(e)
    console.log(key)
    console.log(field)


    let updatedData
    if (field === 'trimCode' && e != undefined) {
      console.log(m3Trims)
      console.log(m3Trims.find((i) => i.m3TrimsId === e)?.uomId)
      updatedData = data.map((record) => {
        if (record.key === key) {
          // setUomStatus(true)
          props.form.setFieldValue(`uomId${key}`,(m3Trims.find((i) => i.m3TrimsId === e)?.uomId)!= undefined?m3Trims.find((i) => i.m3TrimsId === e)?.uomId:null);
          return { ...record, [field]: e, ["uomId"]:(m3Trims.find((i) => i.m3TrimsId === e)?.uomId)!= undefined?m3Trims.find((i) => i.m3TrimsId === e)?.uomId:null };
        }
        return record;
      });
      await getStockDetails(record,e)
    } 
    else if(field === "allocatedStock"){
      console.log(record.key);
        console.log(key);

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
          props.sizeDetails?.forEach(element => {
            element.sizeInfo?.forEach(qty => {
              qtyy = Number(qtyy)+Number(qty.quantity);
            })
          });
          console.log(qtyy);
          let consumptionCal = Number(qtyy) * Number(e);
          let withPer = (Number(consumptionCal) * Number(wastg))/ 100;
          console.log(consumptionCal);
          console.log(withPer);
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
          console.log(qtyy);
          let consumptionCal = Number(qtyy) * Number(cons);
          let withPer = (Number(consumptionCal) * Number(e))/ 100;
          console.log(consumptionCal);
          console.log(withPer);
         props.form.setFieldValue(`totalRequirement${key}`,(Number(consumptionCal) + Number(withPer)).toFixed(2));
          return { ...record, [field]: e, [`totalRequirement`]:Number(Number(consumptionCal) + Number(withPer)).toFixed(2) };
        }
        return record;
      });
    }
    
    else{
      updatedData = data.map((record) => {
        if (record.key === key) {
          return { ...record, [field]: e };
        }
        return record;
      });
    }
    
    setData(updatedData);
    // console.log(updatedData)
    props.data(updatedData)
    
  };

  const handleDelete = (key) => {
    console.log(key);
    console.log(data);
    const updatedData = data.filter((record) => record.key !== key);
    console.log(updatedData);
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
          >
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
        <Form.Item name={`consumption${record.key}`} rules={[{ required: true, message: 'Missing Consumption' }]}>
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
        <Form.Item name={`uomId${record.key}`} rules={[{ required: true, message: 'Missing UOM' }]}>
        <Select
        value={record.uomId}
        style={{width:"100%"}}
        allowClear
        showSearch
        optionFilterProp="children"
        placeholder="Select UOM" 
        disabled={record.uomStatus}
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
      title: 'Action',
      dataIndex: 'action',
      width:"10%",
      fixed:'right',
      render: (_, record) => (
        <Button onClick={() => handleDelete(record.key)}><Tooltip title="Delete Row"><DeleteOutlined /></Tooltip></Button>
      ),
    },
  ];

  const setAllocatedQty = (index, rowData, value, total,fabIndex) => {
    console.log(fabIndex)
    console.log(total);
    console.log(index);
    console.log(data);
    console.log(rowData);
    rowData.issuedQty = value
    const newData = data.find((record,index) => index === fabIndex)?.allocatedStock;
    // const newData = [...stockData];
    console.log(newData);
    let stockRecord = newData.find((s) => s.stockId === rowData.stockId);
    stockRecord.issuedQty = value;
    const sum = newData.reduce((accumulator, object) => {
      console.log(accumulator);
      console.log(object.issuedQty);
      return accumulator + (object.issuedQty != undefined ? Number(object.issuedQty) : 0);
    }, 0);
    console.log(sum);
    if(Number(sum) > Number(total)){
      AlertMessages.getErrorMessage('Issued Quantity should not exceed total required. ')
      stockForm.setFieldValue(`allocatedQuantity${fabIndex}-${index}`,0)
    }
    // newData[index].issuedQty = value;
    // console.log(newData[index]);
    // console.log(newData)
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
  console.log(val);

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
      console.log("")
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
    </div>
  );
};

export default TrimsForm;
