
import { Button, Col, DatePicker, Divider, Form, Input, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import AlertMessages from '../common-functions/alert-messages'

import { StyleOrderService } from 'packages/libs/shared-services/src/common'
import { CoLineIdReq, CoUpdateReq, StyleOrderIdReq } from '@project-management-system/shared-models'
import moment from 'moment'
export interface COAmendmentGridProps {
  poData:any
  activeTab:any
}
  const COAmendmentGrid = (props: COAmendmentGridProps) => {
  // console.log(props.activeTab,"key")
  // console.log(props?.poData)
  // console.log((props?.poData[0]?.styleOrderId),"88")
  


  const [form] = Form.useForm()
  
  const [page, setPage] = React.useState(1);
  const [coLineData,setCoLineData] = useState<any>()
  const [fobData,setFobData] = useState<any>()
  const [vpoData,setVpoData] = useState<any>()
  const [deliveryDateData,setDeliveryDateData] = useState<any>()
  const [destinationData,setDestinationData] = useState<any>()
  const [quantityData,setQuantityData] = useState<any>()
  const [coLineInfodata, setCoLineInfoData] = useState<any[]>([]);
  const services = new StyleOrderService()


  useEffect(()=>{
    if(props?.poData[0]?.coId){
      getCoLineData()
    }
    
    
  },[])
  
  // console.log(props?.poData[0]?.CoLineData,"propss")
  // console.log(props?.poData[0]?.coId,"propssjjj")


  const getCoLineData = () =>{
    const req = new StyleOrderIdReq(props?.poData[0]?.coId)
    services.getCoLineInfoById(req).then((res) => {
      if (res.status) {
        setCoLineInfoData(res.data);
       }
    });

  }
  
  //  console.log(JSON.parse(localStorage.getItem('currentUser')).user.userName)

  //  console.log(coLineInfodata,"coline")   
  
  const onButtonChange1 = (rowData) => { 
    // console.log(rowData,"rowdata")
    if(!coLineData ){
     AlertMessages.getErrorMessage("Please Enter the CO Line");
       return

    }
    
    const req = new CoUpdateReq(rowData.coId,rowData.coLineId,rowData.orderNumber,rowData.coLineNumber,coLineData,"orderline",JSON.parse(localStorage.getItem('currentUser')).user.userName)
    services.updateCoData(req).then((res)=>{
      if (res.status){
        getCoLineData();
       message.success(res.internalMessage);
       setCoLineData(null);
       
          
   } else{

     AlertMessages.getErrorMessage(res.internalMessage);
      }
 }).catch(err => {

    AlertMessages.getErrorMessage(err.message);
  })

}
    

    const onButtonChange2 = (rowData) => { 
      // console.log(rowData,"rowdata")
      if(!fobData ){
        AlertMessages.getErrorMessage("Please Enter the FOB");
          return
   
       }
      const req = new CoUpdateReq(rowData.coId,rowData.coLineId,rowData.orderNumber,rowData.salePrice,fobData,"fob",JSON.parse(localStorage.getItem('currentUser')).user.userName)
    services.updateCoData(req).then((res)=>{
      if (res.status){
       message.success(res.internalMessage);
       getCoLineData();
       setFobData(null)
        
   } else{

     AlertMessages.getErrorMessage(res.internalMessage);
      }
 }).catch(err => {

    AlertMessages.getErrorMessage(err.message);
  })
    }
     
      
    const onButtonChange3 = (rowData) => { 
        // console.log(rowData,"rowdata")
        if(!vpoData ){
          AlertMessages.getErrorMessage("Please Enter the VPO");
            return
     
         }
        const req = new CoUpdateReq(rowData.coId,rowData.coLineId,rowData.orderNumber,rowData.vpo,vpoData,"vponumber",JSON.parse(localStorage.getItem('currentUser')).user.userName)
        services.updateCoData(req).then((res)=>{
          if (res.status){
           message.success(res.internalMessage);
          getCoLineData();
          setVpoData(null)

          
       } else{
    
         AlertMessages.getErrorMessage(res.internalMessage);
          }
     }).catch(err => {
    
        AlertMessages.getErrorMessage(err.message);
      })
    }
       

    const onButtonChange4 = (rowData) => { 
        //  console.log(rowData,"rowdata")
         if(!deliveryDateData ){
          AlertMessages.getErrorMessage("Please Enter the Delivery Date");
            return
     
         }
         const req = new CoUpdateReq(rowData.coId,rowData.coLineId,rowData.orderNumber,rowData.deliveryDate,deliveryDateData,"deliverydate",JSON.parse(localStorage.getItem('currentUser')).user.userName)
        services.updateCoData(req).then((res)=>{
          if (res.status){
           message.success(res.internalMessage);
          getCoLineData();
           setDeliveryDateData(null)


          
       } else{
    
         AlertMessages.getErrorMessage(res.internalMessage);
          }
     }).catch(err => {
    
        AlertMessages.getErrorMessage(err.message);
      })
        
      }

        
   const onButtonChange5 = (rowData) => { 
            // console.log(rowData,"rowdata")
            if(!destinationData ){
              AlertMessages.getErrorMessage("Please Enter the Destination Address");
                return
         
             }
            const req = new CoUpdateReq(rowData.coId,rowData.coLineId,rowData.orderNumber,rowData.deliveryAddress,destinationData,"destinationaddress",JSON.parse(localStorage.getItem('currentUser')).user.userName)
            services.updateCoData(req).then((res)=>{
              if (res.status){
               message.success(res.internalMessage);
              getCoLineData();
              setDestinationData(null)

              
           } else{
        
             AlertMessages.getErrorMessage(res.internalMessage);
              }
         }).catch(err => {
        
            AlertMessages.getErrorMessage(err.message);
          })
         }  
          
   const onButtonChange6 = (rowData) => { 
        // console.log(rowData,"rowdata")
        if(!quantityData ){
          AlertMessages.getErrorMessage("Please Enter the Quantity");
            return
     
         }
        const req = new CoUpdateReq(rowData.coId,rowData.coLineId,rowData.orderNumber,rowData.orderQuantity,quantityData,"quantity",JSON.parse(localStorage.getItem('currentUser')).user.userName)
            services.updateCoData(req).then((res)=>{
              if (res.status){ 
               message.success(res.internalMessage);
               getCoLineData();
               setQuantityData(null)

              
           } else{
        
             AlertMessages.getErrorMessage(res.internalMessage);
              }
         }).catch(err => {
        
            AlertMessages.getErrorMessage(err.message);
          })
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
          dataIndex: 'newcoLineNumber',
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
                <Form.Item 
                  
                  rules={[
                    {
                      required: true,
                      message:"Enter valid CO Line Number."
                    },
                    {
                      pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                      message: `Should contain only alphabets and numbers.`
                    }
                  ]}
                 >
                 <Input
                    name= {`Co${row.coLineId}`}
                    placeholder="Enter CO Line Number" 
                    onBlur={(e) => setCoLineData(e.target.value)}
                    required={true}
                    key={Date.now()}
                    
                    
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
          dataIndex: "salePrice",
        
        },
     
    
        {
          title: 'FOB',
          dataIndex: 'salePrice',
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
                <Form.Item 
                rules={[
                  {
                    required: true,
                    message:"Enter valid FOB"
                  },
                  {
                    pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                    message: `Should contain only alphabets and numbers.`
                  }
                ]}
                 >
                 <Input 
                  name= {`Co${row.coLineId}`}

                 key={Date.now()} 
                 placeholder="Enter FOB" 
                  onBlur={(e) => setFobData(e.target.value)}


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
                <Form.Item 
                 rules={[
                  {
                    required: true,
                    message:"Enter valid VPO"
                  },
                  {
                    pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                    message: `Should contain only alphabets and numbers.`
                  }
                ]}
                 >
                 <Input
                  key={Date.now()} 
                  placeholder="Enter VPO" 
                  onBlur={(e) => setVpoData(e.target.value)}
                  name= {`Co${row.coLineId}`}


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
          render: (text, record) => {
            // Assuming deliveryDate is a string in ISO format, like "2023-11-11T12:34:56Z"
            const formattedDate = moment(record.deliveryDate).format("YYYY-MM-DD");
            return <span>{formattedDate}</span>;
          },
          
        
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
                {/* <Form.Item 
                rules={[
                  {
                    required: true,
                    message:"Enter valid Delivery Date"
                  },
                  {
                    pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                    message: `Should contain only alphabets and numbers.`
                  }
                ]}
                 >
                 <Input 
                 name= {`Co${row.styleOrderItemsId}`}

                 key={Date.now()} 
                 placeholder="Enter Delivery Date" 
                 onBlur={(e) => setDeliveryDateData(e.target.value)}
                 required={true}
                    /> 
                    </Form.Item> */}
                     <Form.Item
                          name={`Co${row.coLineId}`}
                          rules={[
                            {
                              required: true,
                              message: "Enter valid Delivery Date",
                            },
                
                          ]}
                          required={true}
                        >
                          <DatePicker
                            placeholder="Select Delivery Date"
                            onChange={(date, dateString) => setDeliveryDateData(dateString)}
                            
                            
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
          dataIndex: "deliveryAddress",
        
        },
        
          {
          title: 'Destination Address',
          dataIndex: 'deliveryAddress',
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
                <Form.Item 
                rules={[
                  {
                    required: true,
                    message:"Enter valid Destination Address"
                  },
                  {
                    pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                    message: `Should contain only alphabets and numbers.`
                  }
                ]}
                 >
                 <Input
                  name= {`Co${row.coLineId}`}

                  key={Date.now()} 
                  placeholder="Enter Destination Address" 
                  onBlur={(e) => setDestinationData(e.target.value)}

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
                 <Form.Item 
                rules={[
                  {
                    required: true,
                    message:"Enter valid Quantity"
                  },
                  {
                    pattern: /^[^-\s\\[\]()*!@#$^&_\-+/%=`~{}:";'<>,.?|][a-zA-Z0-9-/\\_@ ]*$/,
                    message: `Should contain only alphabets and numbers.`
                  }
                ]}
                 >
                 <Input 
                  name= {`Co${row.coLineId}`}
                   key={Date.now()} 
                   placeholder="Enter Quantity" 
                    // onBlur={e=> quantityInfo(e,index,row)}
                    onBlur={(e) => setQuantityData(e.target.value)}

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
        // dataSource={props?.poData[0]?.styleOrderItems}
        dataSource={coLineInfodata}
        // rowClassName={(record, index) =>
        //   index % 2 === 0 ? "table-row-light" : "table-row-dark"
        // }
        columns={columnsToDisplay}
        pagination={false}
      />
  )
}

export default COAmendmentGrid