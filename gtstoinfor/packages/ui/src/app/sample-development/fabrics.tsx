import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip, message, Form, InputNumber, Checkbox, FormInstance } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { ColourService, M3ItemsService, SampleDevelopmentService, UomService } from '@project-management-system/shared-services';
import { UomCategoryEnum, buyerandM3ItemIdReq } from '@project-management-system/shared-models';
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
          colourId:element.colour,
          totalCount: qtyy
        };
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

    console.log(data);
    console.log(key);

    let updatedData;
  
    if (field === 'fabricCode') {

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
          let totalSizeCountForSize = props.sizeDetails.find((s) => s.colour ===props.form.getFieldValue(`colorId${key}`))?.sizeInfo;
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
      console.log(props.sizeDetails);
      console.log(props.sizeDetails.find((s) => s.colour === e));
      let wastg =props.form.getFieldValue(`wastage${key}`) != undefined ?props.form.getFieldValue(`wastage${key}`) : 2;
      if(props.sizeDetails.find((s) => s.colour === e)?.colour > 0){
        updatedData = data.map((record) => {
          if (record.key === key) {
            
            let totalSizeCountForSize = props.sizeDetails.find((s) => s.colour === e)?.sizeInfo;
            console.log(totalSizeCountForSize);
            let qtyy = 0;
            totalSizeCountForSize?.forEach(qty => {
            console.log(qty.quantity);
            qtyy = Number(qtyy)+Number(qty.quantity);
          })
          console.log(qtyy);
            let consumptionCal = Number(qtyy) * Number(props.form.getFieldValue(`consumption${key}`));
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
       props.form.setFieldValue(`colorId${key}`,0)
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
    
    setData(updatedData);
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
        AlertMessages.getSuccessMessage(res.internalMessage)
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
    m3ItemsService.getM3FabricsByBuyer({buyerId:buyerId}).then(res =>{
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
    colorService.getAllActiveColour().then((res) => {
      if (res.status) {
        console.log(res,'size data')
        setColor(res.data);
      }
    });
  };

  const handleDelete = (key) => {
    const updatedData = data.filter((record) => record.key !== key);
    setData(updatedData);
    props.data(updatedData)
  };

  const getSelectedProductGroupId = (selectedFabricId) => {
    const selectedFabric = fabricCodeData.find(item =>item.fabricId == selectedFabricId)
    return selectedFabric ? selectedFabric.productGroupId : null;
  };

  const onCheck = (rowData, index, isChecked, fabIndex) => {
    console.log(rowData);
    if(isChecked){
      if(Number(rowData.issuedQty) > 0){
        rowData.issuedQty = rowData.issuedQty
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
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Fabric Code',
      dataIndex: 'fabricCode',
      width:"45%",
      render: (_, record, index) => (
        <>
        <Form.Item name={`allocatedStock${record.key}`}><Input name={`allocatedStock${record.key}`} style={{display:'none'}}/></Form.Item>
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
      width:"15%",
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
            placeholder="Select Fabric Code"
          >
          <Option name={`colorId${record.key}`} key={0} value={0}>Please Select Color</Option>
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
      width:"10%",
      render: (_, record) => (
        <Form.Item name={`consumption${record.key}`}
        rules={[{ required: true, message: 'Missing Consumption' }]}
        >
        <InputNumber
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
      width:"10%",
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
            {uom.map(e => {
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
      width:"10%",
      render: (_, record) => (
      <Form.Item name={`wastage${record.key}`} initialValue={2} 
      rules={[{ required: true, message: 'Missing Wastage' }]}
      >
        <InputNumber
        defaultValue={2}
        onChange={(e) => handleInputChange(e, record.key, 'wastage',0,record)}
        />
      </Form.Item>
      ),
    },
    {
      title: 'Total Requirement',
      dataIndex: 'totalRequirement',
      width:"10%",
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
      render: (_, record) => (
      <Form.Item name={`remarks${record.key}`}>
        <TextArea
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
      stockForm.setFieldValue(`allocatedQuantity${fabIndex}-${index}`,(rowData.requiredQty>rowData.quantity?rowData.requiredQty:rowData.quantity));
    }
    if (Number(value) > Number(rowData.quantity)) {
      stockForm.setFieldValue(`allocatedQuantity${fabIndex}-${index}`,(rowData.requiredQty>rowData.quantity?rowData.requiredQty:rowData.availableQty));
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
            scroll = {{x:'max-content',y:'max-content'}}
      dataSource={data} 
      columns={columns} 
      expandedRowRender={renderItems}
              expandable = {{
                defaultExpandAllRows : true
                }}
      // expandedRowRender={renderItems}
      // expandable = {{
      //   defaultExpandAllRows : true, rowExpandable:(record)=>{console.log(record) ; return (stockData.length>0)}
      //   }}
      bordered={true}
      />
      </Form>

    </div>
  );
};

export default FabricsForm;
