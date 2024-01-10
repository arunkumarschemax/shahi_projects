import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip, message, Form, InputNumber, Checkbox, FormInstance } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { BuyerDestinationService, ColourService, M3ItemsService, SampleDevelopmentService, UomService } from '@project-management-system/shared-services';
import { UomCategoryEnum, buyerandM3ItemIdReq, m3FabricFiltersReq } from '@project-management-system/shared-models';
import { updateLocale } from 'moment';
import AlertMessages from '../common/common-functions/alert-messages';
import { useIAMClientState } from "../common/iam-client-react";
import moment from 'moment';
import { StockDetailsInfo } from '../sourcing-requisition/stock-details-info';
import FormItem from 'antd/es/form/FormItem';

export interface FabricsFormProps {
  data: any;
  buyerId: number;
  sizeDetails: any[]
  form:FormInstance<any>
}

const FabricsForm = (props:FabricsFormProps) => {
  const [data, setData] = useState([]);
  const [uom, setUom] = useState([]);
  const [count, setCount] = useState(0);
  const [fabricCodeData, setFabricCodeData] = useState<any[]>([])
  const [stockData, setStockData] = useState<any[]>([])
  const [allocatedData, setAllocatedData] = useState<any[]>([])

  const [color, setColor] = useState<any[]>([])
  const [btnEnable,setbtnEnable]=useState<boolean>(false)
  const {Option}=Select
  const service = new SampleDevelopmentService()
  const m3ItemsService = new M3ItemsService()
  const uomService =  new UomService()
  const [checked, setChecked] = useState<boolean>(false)
  const [sourcingForm] = Form.useForm();
  const colorService = new ColourService()
  const buyerDestinationService = new BuyerDestinationService()
  const [keyUpdate, setKeyUpdate] = useState<number>(1);
  const [onchangeData, setOnchangeData] = useState<any[]>([]); 

  const { IAMClientAuthContext } = useIAMClientState();
  // const [form] =props.form.useForm();
  const [stockForm] = Form.useForm();

  const handleAddRow = () => {

    if(props.sizeDetails.length > 0){
      props.sizeDetails?.forEach(element => {
        let qtyy = 0;
        element.sizeInfo?.forEach(qty => {
          console.log(qty.quantity);
          qtyy = Number(qtyy)+Number(qty.quantity);
        })
        console.log(qtyy)
        const newRow = {
          key: count,
          colourId:0,
          totalCount: qtyy,
          wastage:2
        };
        props.form.setFieldValue([`wastage${count}`],2)
        console.log(newRow)
        setData([...data, newRow]);
        setCount(count + 1);
      });
    }
    
  };

  useEffect(() =>{
    if(props.buyerId != null){
      fabricCode(props.buyerId)
    }
  },[props.buyerId])

  useEffect(() =>{
    console.log(props.sizeDetails)
  },[props.sizeDetails])
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
  // const handleInputChange = (e, key, field,productGroupId) => {
  //   const updatedData = data.map((record) => {
  //     if (record.key === key) {
  //       return { ...record, [field]: e,productGroupId:productGroupId };
  //     }
  //     return record;
  //   });
  //   console.log(updatedData)
  //   setData(updatedData);
  //   props(updatedData);
  // };

  const handleInputChange = async (e, key, field, additionalValue,record) => {
    console.log(e);
    console.log(field);
    console.log(key);

    console.log(record);
    console.log(data);

    let isDuplicate 
    let fieldName

    

    let updatedData;
  
    if (field === 'fabricCode' && e != undefined) {
      fieldName = "fabricId"
      isDuplicate =  onchangeData.find((r) => r.colourId === record.colourId && r.fabricCode === e);
      updatedData = data.map((record) => {
        if (record.key === key) {
          return { ...record, [field]: e };
        }
        return record;
      });
      await getStockDetails(record,e)
    } 
    else if(field === "allocatedStock"){
      updatedData = data.map((record) => {
        if (record.key === key) {
          return { ...record, [field]: e, ["fabricCode"]: record.fabricCode };
        }
        return record;
      });
    }

    else if(field === 'consumption'){
      let wastg =props.form.getFieldValue(`wastage${key}`) != undefined ?props.form.getFieldValue(`wastage${key}`) : 2;
      updatedData = data.map((record) => {
        if (record.key === key) {
          console.log(e);
          console.log(record.totalCount);
          let totalSizeCountForSize = props.sizeDetails.find((s) => s.colorId ===props.form.getFieldValue(`colorId${key}`))?.sizeInfo;
          console.log(totalSizeCountForSize);
          let qtyy = 0;
          totalSizeCountForSize?.forEach(qty => {
          console.log(qty.quantity);
          qtyy = Number(qtyy)+Number(qty.quantity);
        })
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
          console.log(e);
      console.log(record.totalCount);
          let consumptionCal = Number(record.totalCount) * Number(cons);
          let withPer = (Number(consumptionCal) * Number(e))/ 100;
          console.log(consumptionCal);
          console.log(withPer);
         props.form.setFieldValue(`totalRequirement${key}`,(Number(consumptionCal) + Number(withPer)).toFixed(2));
          return { ...record, [field]: e, [`totalRequirement`]:Number(Number(consumptionCal) + Number(withPer)).toFixed(2) };
        }
        return record;
      });
    }
    
    else if(field === 'colourId'){
      fieldName = "colourId"
      isDuplicate =  onchangeData.find((r) => r.colourId === e && r.fabricCode === record.fabricCode);
      console.log(props.sizeDetails);
      console.log(props.sizeDetails.find((s) => s.colorId === e));
      let wastg =props.form.getFieldValue(`wastage${key}`) != undefined ?props.form.getFieldValue(`wastage${key}`) : 2;
      if(props.sizeDetails.find((s) => s.colorId === e)?.colorId > 0){
        updatedData = data.map((record) => {
          if (record.key === key) {
            let totalSizeCountForSize = props.sizeDetails.find((s) => s.colorId === e)?.sizeInfo;
            console.log(totalSizeCountForSize);
            let qtyy = 0;
            totalSizeCountForSize?.forEach(qty => {
            console.log(qty.quantity);
            qtyy = Number(qtyy)+Number(qty.quantity);
          })
          console.log(qtyy);
          console.log(props.form.getFieldValue(`consumption${key}`));
            let consumptionCal = Number(qtyy) * (props.form.getFieldValue(`consumption${key}`) !=undefined ? Number(props.form.getFieldValue(`consumption${key}`)) : Number(0));
            let withPer = (Number(consumptionCal) * Number(wastg))/ 100;
            console.log(consumptionCal);
            console.log(withPer);
           props.form.setFieldValue(`totalRequirement${key}`,(Number(consumptionCal) + Number(withPer)).toFixed(2));
            return { ...record, [field]: e, [`totalRequirement`]:Number(Number(consumptionCal) + Number(withPer)).toFixed(2) };
          }
          return record;
        });
      }
      else{
        AlertMessages.getErrorMessage("Fabric color is not in size details")
       props.form.setFieldValue(`colorId${key}`,undefined)
        updatedData = data.map((record) => {
          // if (record.key === key) {
          //   return { ...record, [field]: e };
          // }
          return record;
        });
      }
    }

    else {
      updatedData = data.map((record) => {
        if (record.key === key) {
          return { ...record, [field]: e };
        }
        return record;
      });
    }
    if(isDuplicate?.fabricCode > 0)
    {
      AlertMessages.getErrorMessage("Duplicate Entries not allowed. ")
      props.form.setFieldValue(`${fieldName}${key}`,null)
      props.form.validateFields().then(fab => {
      })
      .catch((err) => {
        console.log(err);
      })
      
    }
    else{
      console.log("jj")
    }
    
    setData(updatedData);
    setOnchangeData(updatedData)
    props.data(updatedData);

  };

  const getStockDetails = (record,itemId) => {
    console.log(record);
    record.fabricCode = itemId;
    let req = new buyerandM3ItemIdReq(props.buyerId,itemId,"Fabric");
    service.getAvailbelQuantityAginstBuyerAnditem(req).then((res) => {
      if(res.status){
        setStockData(res.data);
        handleInputChange(res.data, record.key, "allocatedStock", 0,record)
        // sourcingForm.setFieldValue([`allocatedStock${record.key}`],res.data)
        // AlertMessages.getSuccessMessage(res.internalMessage)
      }
      else{
        setStockData([]);
        AlertMessages.getErrorMessage(res.internalMessage)
      }
    })
  }
  useEffect(() =>{
    getColors()
  },[])
  useEffect(() =>{
    console.log(props.sizeDetails)
  },[props.sizeDetails])

  const fabricCode = (buyerId) =>{
    console.log(buyerId)
    const req= new m3FabricFiltersReq()
    req.buyerId=buyerId
    m3ItemsService.getM3FabricsByBuyer(req).then(res =>{
      console.log(res)
      if(res.status){
        setFabricCodeData(res.data)
      }else{
        setFabricCodeData([])
        message.info("hi"+res.internalMessage)
      }
    })
  }
  const getColors = () => {
    buyerDestinationService.getAllColorsAgainstBuyer({buyerId:props.buyerId}).then((res) => {
    // colorService.getAllActiveColour().then((res) => {
      if (res.status) {
        console.log(res,'size data')
        setColor(res.data);
      }
    });
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
      setOnchangeData(updatedData)
      props.data(updatedData)
    }
   
  };

  const getSelectedProductGroupId = (selectedFabricId) => {
    const selectedFabric = fabricCodeData.find(item =>item.fabricId == selectedFabricId)
    return selectedFabric ? selectedFabric.productGroupId : null;
  };

  const onCheck = (rowData, index, isChecked, fabIndex) => {
    console.log(rowData);
    if(isChecked){
      if(Number(rowData.issuedQty) > 0){
        // rowData.issuedQty = rowData.issuedQty
        rowData.checkedStatus = 1;
        const newData = [...stockData];
        newData[index].issuedQty = rowData.issuedQty;
        newData[index].checkedStatus = 1;
        data.map((record) => {
          console.log(record);
          if (record.fabricCode === rowData.m3ItemId) {
            // record.allocatedStock = [...record.allocatedStock, newData];
            return { ...record, [`allocatedStock`]: newData};
          }
        }); 
        console.log(data)        
        setStockData(newData);
        
        // setbtnEnable(true)
      }
      else{
        AlertMessages.getErrorMessage('Issued Quantity should be greater than zero')
      }
    }
    else{
      stockForm.setFieldsValue({[`allocatedQuantity${fabIndex}-${index}`]:0, [`checkStatus${index}`]:false});
      console.log("")
    }
    
  };

  const columns:any = [
    {
      title: 'S.No',
      dataIndex: 'sNo',
      width:"8%",
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Fabric Code',
      dataIndex: 'fabricCode',
      width:"100%",
      render: (_, record, index) => (
        <>
        <Form.Item name={`allocatedStock${record.key}`} style={{display:'none'}}><Input name={`allocatedStock${record.key}`} style={{display:'none'}}/></Form.Item>
        <Form.Item name={`fabricId${record.key}`}
         rules={[{ required: true, message: 'Missing Fabric' }]}
        >
          <Select
            // onChange={(e) => handleInputChange(e, record.key, 'fabricCode',getSelectedProductGroupId(e))}
            style={{ width: "100%" }}
            allowClear
            showSearch
            optionFilterProp="children"
            placeholder="Select Fabric Code"
            onChange={(e) => handleInputChange(e, record.key, 'fabricCode',0, record)}
          >
          {/* <Option name={`fabricId${record.key}`} key={0} value={0}>Please Select Fabric</Option> */}
            {fabricCodeData?.map(item => {
              return <Option name={`fabricId${record.key}`} key={item.m3ItemsId} valu={item.m3ItemsId}>{item.itemCode+ "-"+ item.description}</Option>;
            })}
          </Select>

        </Form.Item>
        {/* <Form.Item name={'productGroupId'} hidden>
            <Input hidden></Input>
          </Form.Item> */}
      </>
      ),
    },
    // {
    //   title: 'Description',
    //   dataIndex: 'description',
    //   width:"15%",
    //   render: (_, record) => (
    //     <Input
    //     value={record.description}
    //     onChange={(e) => handleInputChange(e.target.value, record.key, 'description',0)}
    //     />
    //   ),
    // },
    {
      title: 'Color',
      dataIndex: 'color',
      width:"25%",

      render: (_, record) => (
        <>
        <Form.Item name={`colorId${record.key}`}
        rules={[{ required: true, message: 'Missing Color' }]}
        >
          <Select
            value={record.colourId}
            onChange={(e) => handleInputChange(e, record.key, 'colourId', 0,record)}
            style={{ width: "100%" }}
            allowClear
            showSearch
            optionFilterProp="children"
            placeholder="Select Color"
          >
          {/* <Option name={`colorId${record.key}`} key={0} value={0}>Please Select Color</Option> */}
            {color.map((e) => {
              return (
                <Option name={`colorId${record.key}`} key={e.colourId} value={e.colourId}>
                  {e.colour}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        </>
      
      ),
    },
    {
      title: 'Consumption',
      dataIndex: 'consumption',
      width:"17%",

      render: (_, record) => (
        <Form.Item name={`consumption${record.key}`}
        rules={[{ required: true, message: 'Missing Consumption' }]}
        >
        <InputNumber placeholder="Consumption" min={1}
        value={record.consumption}
        onChange={(e) => handleInputChange(e, record.key, 'consumption',0,record)}
        />
        </Form.Item>
      ),
    },
    // {
    //   title: 'Fabric Requirment',
    //   dataIndex: 'fabricRequirment',
    //   width:"10%",
    //   render: (_, record) => (
    //     <Input
    //     value={record.fabricRequirment}
    //     onChange={(e) => handleInputChange(e.target.value, record.key, 'fabricRequirment',0)}
    //     />
    //   ),
    // },
    // {
    //   title: 'Wastage',
    //   dataIndex: 'wastage',
    //   width:"10%",
    //   render: (_, record) => (
    //     <Input
    //     value={record.wastage}
    //     onChange={(e) => handleInputChange(e.target.value, record.key, 'wastage',0)}
    //     />
    //   ),
    // },
    
    {
      title:"UOM",
      dataIndex: 'UomId',

      width:"13%",
      render: (_, record) => (
        <Form.Item name={`uomId${record.key}`}
        rules={[{ required: true, message: 'Missing UOM' }]}
        >

        <Select
        value={record.uomId}
        style={{width:"100%"}}
        allowClear
        showSearch
        optionFilterProp="children"
        placeholder="Select UOM"
        defaultValue={uom.find((e) => e.uom === "m")?.uom}
        onChange={(e) => handleInputChange(e, record.key, 'uomId',0,record)}
        >
            {uom.filter((e) => e.uomCategory === UomCategoryEnum.LENGTH)?.map(e => {
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

      width:"17%",
      render: (_, record) => (
      <Form.Item name={`wastage${record.key}`} initialValue={2} 
      rules={[{ required: true, message: 'Missing Wastage' }]}
      >
        <InputNumber placeholder='wastage' min={0}
        defaultValue={2}
        onChange={(e) => handleInputChange(e, record.key, 'wastage',0,record)}
        />
      </Form.Item>
      ),
    },
    {
      title: 'Total Requirement',
      dataIndex: 'totalRequirement',
      width:"15%",

      render: (_, record) => (
      <Form.Item name={`totalRequirement${record.key}`} 
      rules={[{ required: true, message: 'Missing Total Requirement' }]}
      >
        <Input disabled style={{fontWeight:'bold', color:'black'}}
        value={record.totalRequirement}
        onChange={(e) => handleInputChange(e.target.value, record.key, 'totalRequirement',0,record)}
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
        <TextArea placeholder='Remarks'
        value={record.remarks}
        onChange={(e) => handleInputChange(e.target.value, record.key, 'remarks',0,record)}
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
        onClick={() =>allocateQuantity()} 
        >Allocate</Button>:'Allocate'}</div>,
        dataIndex: "sm",
        key: "sm",
        align: "center",
        render: (text, rowData, index) => { 
          return (
            <Form.Item name={`checkStatus${index}`}>
            <Checkbox 
            onClick={checkboxonclick}
            onChange={(e) => onCheck(rowData, index, e.target.checked,fabindex)}
            // onClick={(e) =>onCheck(rowData,undefined)}
            />
            </Form.Item>
          );
        },
      },
    
    ]
    return [...renderColumnForFabric]
  }

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
  const allocateQuantity = () =>{
    // console.log(avilableQuantity)
    // createAllocation(avilableQuantity)

  }

  const renderItems = (record:any, index:any) => {
    console.log(record)
    console.log(index)

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
                defaultExpandAllRows : false
                }}
      // expandedRowRender={renderItems}
      // expandable = {{
      //   defaultExpandAllRows : true, rowExpandable:(record)=>{console.log(record) ; return (stockData.length>0)}
      //   }}
      scroll={{ x: 2000 }}
      size="large"
      bordered
      />
      </Form>

    </div>
  );
};

export default FabricsForm;
