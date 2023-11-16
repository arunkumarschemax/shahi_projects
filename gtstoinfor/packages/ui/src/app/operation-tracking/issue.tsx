import React, { useEffect, useState } from 'react';
import { Segmented, Button, Space, Card, Form, Col, Select, Table, Input, Divider } from 'antd';
import { OperationTrackingService, StyleService } from '@project-management-system/shared-services';


const IssueScreen = () => {
    const [form] = Form.useForm()
    const [itemCodeData,setItemsCodeData] = useState<any>([])
    const [operationName,setOperationName] = useState<any>([])
    const [ItemsId,setItemsId] = useState<any>()
    const [operationData,setOperationData] = useState<any>([])
    // const [issueQuantityData,setIssueQuantityData] = useState<any[]>([])
    const [issueQtyData,setIssueQtyData] = useState<any[]>([])
    const [operData,setOperData] = useState<any>([])
    const styleService = new StyleService()
    const [style,setStyle] = useState<any[]>([])


     const services = new OperationTrackingService ()
     useEffect(()=>{
     getItemsCode()
     getStyle()
     },[])
  

     const getItemsCode = () =>{
      services.getAllitemsCode().then(res=>{
        setItemsCodeData(res)
      })
     }

     const getStyle = () => {
      styleService.getAllActiveStyle().then(res => {
        setStyle(res.data)
      })
     }

     const getData = (value) =>{
      setItemsId(value)
      console.log(value,"hhello");
      
      services.getAllOperation(value).then (res=>{
        console.log(res,"hhhh")
        setOperationName(res)
      })
     }

   console.log(operationName,"opration name")
 

   const operations = [];
   for (const item of operationName) {
     for (const operation of item.operation) {
        operations.push(operation.operationName);
      }
  }

  const generateSegmentedOptions = () => {
    for (const item of operationName) {
      return item.operation.map((operation, index) => (
          {
        label: <b>{operation.operationName}</b>, // Change this to the appropriate property from your data
        value: operation.operationName,    // Change this to the appropriate property from your data
        key: index.toString(),           // Use a unique key for each option
      }
      ));
    }
  };

  const segmentedOptions = generateSegmentedOptions();


console.log(operations,"////")

const setIssueQuantityInfo = (e,index,rowData) => {
  // const req = {
  //   SKUcode:rowData.SKUcode,
  //   color: rowData.color,
  //   destination:rowData.destination,
  //   quantity:rowData.quantity,
  //   size:rowData.size,
  //   style:rowData.style,
  //   issuedQuantity:e.target.value
  // }
  // console.log(req,"req....................")
  // console.log(rowData,'---------------rowdata')
  console.log(e.target.value,"8888888")
  setIssueQtyData(e.target.value)
  // setIssueQuantityData([...issueQuantityData,req])
  
}
const onButtonChange = (rowData) => {
    const req = {
      itemsId: ItemsId,
      operationName:operData,
      SKUcode:rowData.SKUcode,
      color: rowData.color,
      destination:rowData.destination,
      quantity:rowData.quantity,
      size:rowData.size,
      style:rowData.style,
      issuedQuantity:issueQtyData
    }
    console.log(req,"rowdata")

}

  const column:any = [

    {title: 'SKU', dataIndex: 'SKUcode', key: 'SKU' },
    {title: 'Color', dataIndex: 'color', key: 'color' },
    {title: 'Size', dataIndex: 'size', key: 'size' },
    {title: 'Destination', dataIndex: 'destination', key: 'destination' },
    {title: 'Style', dataIndex: 'style', key: 'style' },
    {title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Issued Quantitiy',
      dataIndex: 'issuedQuantity',
      render:(value,row,index) => {
        return(
            <>
            <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 10 }}
          lg={{ span: 10 }}
          xl={{ span: 10 }}
        >
            <Form.Item  >
             <Input key={index} placeholder="Enter Quantity" 
              defaultValue={row.issueQuantity}
                onBlur={e=> setIssueQuantityInfo(e,index,row)}
                required={true}
                /> 
                </Form.Item>
                </Col>

                {/* <Input key={index}placeholder="Enter Quantity"
                onBlur={e=> setIssueQuantityInfo(e,index,row)}/> */}
            
            
            </>
        )
    }
  },
  {
            title: 'Action',
            dataIndex:'action',
            fixed: 'right',
            render: (text, rowData) => (
                <span>
                    {/* <EditOutlined onClick={() => onEdit(rowData)}/> */}
                    <Divider type='vertical'/>
                        <Button type='primary' shape="round" size='small' onClick={()=> onButtonChange(rowData)} >Submit</Button>
                </span>
            )
        }


]
  const onChange = (value) => {  
    console.log('onChange:', value, ItemsId); // Assuming ItemsId is defined somewhere else.

    const req = {
        itemsId: ItemsId, 
        operationName: value
    }

    console.log("req:", req)
    setOperData(value)

    services.getAllOperationData(req.itemsId, req.operationName).then(res => {
        console.log(res[0].SKUinfo  ,"sku data");
        setOperationData(res[0].SKUinfo)
    });
};
  
 
// console.log(issueQuantityData,"*********")

  return (
    <Card title="Operation Issues"  >
      <Form  form ={form} >
         <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 4 }}
          lg={{ span: 4 }}
          xl={{ span: 6 }}
        >
          <Form.Item name="Item" label="Style" 
            // rules={[{ required: true, message: "Style is required" }]}

          >
            <Select placeholder="Style" onChange={getData} 
             >
            {style.map(res=>(
              <option key={res.styleId} value={res.styleId}>
               {res.style}-{res.description}
              </option>
            ))}
             
            </Select>
          </Form.Item>
        </Col>
       </Form>
      <Segmented options={segmentedOptions}  onChange={onChange}  style={{backgroundColor:'#dde5b6'}}
      // className="ant-segmented-item-selected" 
       />
       {operationData && operationData.length > 0 ?  (
      <Table columns={column} dataSource={operationData} pagination={false}/>
      ):"" }
    </Card>
  );
};

export default IssueScreen;

