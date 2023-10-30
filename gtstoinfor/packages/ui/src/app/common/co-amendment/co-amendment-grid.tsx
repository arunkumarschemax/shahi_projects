
import { Button, Col, Divider, Form, Input, Table } from 'antd'
import React, { useState } from 'react'
export interface COAmendmentGridProps {
  poData:any
  activeTab:any
}
  const COAmendmentGrid = (props: COAmendmentGridProps) => {
  console.log(props.activeTab,"key")


  const [page, setPage] = React.useState(1);
  const [coLineData,setCoLineData] = useState<any[]>([])
  const [fobData,setFobData] = useState<any[]>([])
  const [vpoData,setVpoData] = useState<any[]>([])
  const [deliveryDateData,setDeliveryDateData] = useState<any[]>([])
  const [destinationData,setDestinationData] = useState<any[]>([])
  const [quantityData,setQuantityData] = useState<any[]>([])







  const onButtonChange1 = (rowData) => { 
    console.log(rowData,"rowdata")}
    const req1 = {
      coLineNumber: coLineData

    }

    const onButtonChange2 = (rowData) => { 
      console.log(rowData,"rowdata")}
      const req2 = {
        fob: fobData
  
      }

    const onButtonChange3 = (rowData) => { 
        console.log(rowData,"rowdata")}
        const req3 = {
          vpo: vpoData
    
        }

    const onButtonChange4 = (rowData) => { 
         console.log(rowData,"rowdata")}
          const req4 = {
            deliveryDate: deliveryDateData
      
          }  
   const onButtonChange5 = (rowData) => { 
            console.log(rowData,"rowdata")}
             const req5 = {
            destination: destinationData
         
          }  
          
   const onButtonChange6 = (rowData) => { 
        console.log(rowData,"rowdata")}
        const req6 = {
          orderQuantity: quantityData
         
      }  


    const colineInfo = (e,index,rowData) => {
    
      console.log(e.target.value,"colineInfo")
      setCoLineData(e.target.value)
      
    }

    const fobInfo = (e,index,rowData) => {
    
      console.log(e.target.value,"fobInfo")
      setFobData(e.target.value)
      
    }

    const vpoInfo = (e,index,rowData) => {
    
      console.log(e.target.value,"vpoInfo")
      setVpoData(e.target.value)
      
    }
   
    
    const deliveryDateInfo = (e,index,rowData) => {
    
      console.log(e.target.value,"deliveryDateInfo")
      setDeliveryDateData(e.target.value)
    }

    const destinationInfo = (e,index,rowData) => {
    
      console.log(e.target.value,"destinationInfo")
      setDestinationData(e.target.value)
      
    }

    const quantityInfo = (e,index,rowData) => {
    
      console.log(e.target.value,"quantityInfo")
      setQuantityData(e.target.value)
    }


 
  
    const columnsSkelton1: any = [
      
        {
          title: "S No",
          key: "sno",
          responsive: ["sm"],
          render: (text, object, index) => (page - 1) * 10 + (index + 1),
        },
        {
          title: "SKU Code",
          dataIndex: "skuCode",
          
        },
        {
          title: "Size",
          dataIndex: "size",
          
        },
    
        {
          title: "Color",
          dataIndex: "color",
        },
       
        {
          title: "CO Line Number",
          dataIndex: "coLineNumber",
          
        
        },
        {
          title: 'CO Line Number',
          dataIndex: 'coLineNumber',
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
                 <Input key={index} placeholder="Enter CO Line Number" 
                  // defaultValue={row.coLineNumber}
                    onBlur={e=> colineInfo(e,index,row)}
                    required={true}
                    /> 
                    </Form.Item>
                    </Col>
    
                
                
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
                            <Button type='primary' shape="round" size='small'
                             onClick={()=> onButtonChange1(rowData)}
                              >Update</Button>
                    </span>
                )
            }
        
    
      ];
      
    const columnsSkelton2: any = [
        {
          title: "S No",
          key: "sno",
          responsive: ["sm"],
          render: (text, object, index) => (page - 1) * 10 + (index + 1),
        },
        {
          title: "SKU Code",
          dataIndex: "skuCode",
          
        },
        {
          title: "Size",
          dataIndex: "size",
          
        },
    
        {
          title: "Color",
          dataIndex: "color",
        },
       
        {
          title: "FOB",
          dataIndex: "fob",
        
        },
     
    
        {
          title: 'FOB',
          dataIndex: 'fob',
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
                 <Input key={index} placeholder="Enter FOB" 
                    onBlur={e=> fobInfo(e,index,row)}
                    required={true}
                    /> 
                    </Form.Item>
                    </Col>
    
                
                
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
                            <Button type='primary' shape="round" size='small'
                             onClick={()=> onButtonChange2(rowData)}
                              >Update</Button>
                    </span>
                )
            }
    
      ];

    const columnsSkelton3: any = [
        {
          title: "S No",
          key: "sno",
          responsive: ["sm"],
          render: (text, object, index) => (page - 1) * 10 + (index + 1),
        },
        {
          title: "SKU Code",
          dataIndex: "skuCode",
          
        },
        {
          title: "Size",
          dataIndex: "size",
          
        },
    
        {
          title: "Color",
          dataIndex: "color",
        },
  
        {
          title: "VPO",
          dataIndex: "vpo",
        
        },
        
    
        {
          title: 'VPO',
          dataIndex: 'vpo',
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
                 <Input key={index} placeholder="Enter VPO" 
                    onBlur={e=> vpoInfo(e,index,row)}
                    required={true}
                    /> 
                    </Form.Item>
                    </Col>
    
                
                
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
                            <Button type='primary' shape="round" size='small'
                             onClick={()=> onButtonChange3(rowData)}
                              >Update</Button>
                    </span>
                )
            }
    
    
      ];
      
    const columnsSkelton4: any = [
        {
          title: "S No",
          key: "sno",
          responsive: ["sm"],
          render: (text, object, index) => (page - 1) * 10 + (index + 1),
        },
        {
          title: "SKU Code",
          dataIndex: "skuCode",
          
        },
        {
          title: "Size",
          dataIndex: "size",
          
        },
    
        {
          title: "Color",
          dataIndex: "color",
        },
       
        {
          title: "Delivery Date",
          dataIndex: "deliveryDate",
        
        },
        
    
    
        {
          title: 'Delivery Date',
          dataIndex: 'deliveryDate',
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
                 <Input key={index} placeholder="Enter Delivery Date" 
                    onBlur={e=> deliveryDateInfo(e,index,row)}
                    required={true}
                    /> 
                    </Form.Item>
                    </Col>
    
                
                
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
                            <Button type='primary' shape="round" size='small'
                             onClick={()=> onButtonChange4(rowData)}
                              >Update</Button>
                    </span>
                )
            }
    
      ];

     const columnsSkelton5: any = [
        {
          title: "S No",
          key: "sno",
          responsive: ["sm"],
          render: (text, object, index) => (page - 1) * 10 + (index + 1),
        },
        {
          title: "SKU Code",
          dataIndex: "skuCode",
          
        },
        {
          title: "Size",
          dataIndex: "size",
          
        },
    
        {
          title: "Color",
          dataIndex: "color",
        },
        {
          title: "Destination Address",
          dataIndex: "destination",
        
        },
        
          {
          title: 'Destination Address',
          dataIndex: 'destination',
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
                 <Input key={index} placeholder="Enter Destination Address" 
                    onBlur={e=> destinationInfo(e,index,row)}
                    required={true}
                    /> 
                    </Form.Item>
                    </Col>
    
                
                
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
                            <Button type='primary' shape="round" size='small'
                             onClick={()=> onButtonChange5(rowData)}
                              >Update</Button>
                    </span>
                )
            }
    
      ];

    const columnsSkelton6: any = [
        {
          title: "S No",
          key: "sno",
          responsive: ["sm"],
          render: (text, object, index) => (page - 1) * 10 + (index + 1),
        },
        {
          title: "SKU Code",
          dataIndex: "skuCode",
          
        },
        {
          title: "Size",
          dataIndex: "size",
          
        },
    
        {
          title: "Color",
          dataIndex: "color",
        },
      
        {
          title: "Quantity",
          dataIndex: "orderQuantity",
      
        },
       
    
        {
          title: 'Quantity',
          dataIndex: 'orderQuantity',
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
                    onBlur={e=> quantityInfo(e,index,row)}
                    required={true}
                    /> 
                    </Form.Item>
                    </Col>
    
                
                
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
                            <Button type='primary' shape="round" size='small'
                             onClick={()=> onButtonChange6(rowData)}
                              >Update</Button>
                    </span>
                )
            }
    
      ];


      let columnsToDisplay;

      if (props.activeTab === 'orderline') {
        columnsToDisplay = columnsSkelton1;

      } else  if (props.activeTab === 'fob'){
        columnsToDisplay = columnsSkelton2; 

      } else if (props.activeTab === 'deliverydate'){
        columnsToDisplay = columnsSkelton4; 
           
      } else if (props.activeTab==="quantity"){
        columnsToDisplay = columnsSkelton6; 
         
      } else if (props.activeTab==="vponumber"){
        columnsToDisplay = columnsSkelton3; 

      } else if (props.activeTab==="destinationaddress"){
        columnsToDisplay = columnsSkelton5; 
        
      } else {
        columnsToDisplay = columnsSkelton1;    
      }

  return (
    <Table
        size="small"
        dataSource={props?.poData[0]?.styleOrderItems}
        // rowClassName={(record, index) =>
        //   index % 2 === 0 ? "table-row-light" : "table-row-dark"
        // }
        columns={columnsToDisplay}
        pagination={false}
      />
  )
}

export default COAmendmentGrid