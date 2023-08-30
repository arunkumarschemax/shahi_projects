// import React, { useEffect, useState } from "react";
// import { Button, Card, Col, Form, Input, Row, Table } from "antd";
// import { UndoOutlined } from "@ant-design/icons";
// import { useLocation } from "react-router-dom";
// import { ColumnsType } from "antd/es/table";
// import { AttributeService } from "@project-management-system/shared-services";

// interface DataType {
//   key: React.Key;
//   attributeName: string;
//   attributeValue : string;
//   disable: boolean;
// }


// export const BuyersOrderAttributeForm = () => {
//   const location = useLocation()
//   const [form] = Form.useForm();
//   const attributeService = new AttributeService()

//   const [page, setPage] = useState<number>(1);
//   const [attributes,setAttributes] = useState<any[]>([])

//    useEffect(() => {
//         getAttributes()
//     },[])


//   const getAttributes = () => {
//     attributeService.getAllOrderAttributes().then(res => {
//         if(res.status){
//             setAttributes(res.data)
//         }
//     })
// } 

//  console.log(attributes,"atttttttttttttt")
//   const columns : ColumnsType<DataType> = [
//     {
//       title: 'S No',
//       key: 'sno',
//       width: '70px',
//       responsive: ['sm'],
//       render: (text, object, index) => (page-1) * 10 +(index+1)
//     },
//     {
//       title: "Attribute Name",
//       dataIndex: "attributeName",
//     },

//     {
//       title: "Attribute Value",
//       dataIndex: "AttributeValue",
//       render: (_: any, record: any) => {
//         return <Input placeholder="Enter Value" />;
//       },
//     },
//   ];




//   const onSubmit = (value:any) => {
//     console.log(value,"values")
//   };

//   const onReset = () => {};

//   return (
//     <Card title="Buyer Order Attributes">
//       <Col span={12}>
//         <Table columns={columns} dataSource={attributes}  pagination={false} />
//       </Col>
//       <Col>
//         <Form form ={form} onFinish={onSubmit}>
//           <Row>
//             <div style={{ display: "flex", gap: "10px" }}>
//               <Button
//                 style={{ marginLeft: "855px", marginTop: "20px" }}
//                 onClick={onReset}
//                 icon={<UndoOutlined />}
//               >
//                 Reset
//               </Button>
//               <Button
//                 htmlType="submit"
//                 type="primary"
//                 style={{ marginTop: "20px" }}
//                 // onClick={onSubmit}
//               >
//                 Submit
//               </Button>
//             </div>
//           </Row>
//         </Form>
//       </Col>
//     </Card>
//   );
// };

// export default BuyersOrderAttributeForm;



// import React, { useEffect, useState } from "react";
// import { Button, Card, Col, Form, Input, Row, Table } from "antd";
// import { UndoOutlined } from "@ant-design/icons";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ColumnsType } from "antd/es/table";
// import { AttributeService, BuyersService } from "@project-management-system/shared-services";
// import { BuyerRequest, BuyersOrderAttributeInfoModel, BuyersOrderAttributeRequest } from "@project-management-system/shared-models";
// import AlertMessages from "../../common/common-functions/alert-messages";

// interface DataType {
//   key: React.Key;
//   attributeName: string;
//   attributeValue : string;
//   disable: boolean;
// }


// export const BuyersOrderAttributeForm = () => {
//   const [page, setPage] = useState<number>(1);
//   const [attributeValue,setAttributeValue] = useState<BuyersOrderAttributeInfoModel[]>([])
//   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
//   const service = new BuyersService()
//   const state = useLocation()
//   const navigate = useNavigate()
//   const attributeService = new AttributeService()
//   const [attributes,setAttributes] = useState<any[]>([])
//   const [isUpdate,setIsUpdate] = useState<boolean>(false);

//   // useEffect(() => {
//   //     getAttributes()
//   // },[])

//   useEffect(() => {
//       if(state.state.id != undefined){
//           getBuyerId(state.state.id)
//       }

//   },[state.state.id])

//   const getBuyerId = (id) => {
//       const req =new BuyerRequest(id,'')
//       service.getByBuyerId(req).then(res => {
//           if(res.status){
//               setAttributes(res.data)
//               setIsUpdate(true)
//           } else{
//               getAttributes()
//           }
//       })
//   }


//   const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
//       console.log('selectedRowKeys changed: ', newSelectedRowKeys);
//       setSelectedRowKeys(newSelectedRowKeys);
//   };

//   const getAttributes = () => {
//       attributeService.getAllActiveAttributes().then(res => {
//           if(res.status){
//               setAttributes(res.data)
//           }
//       })
//   }


//   const setAttributeInfo = (e,index,rowData) => {
//       console.log(rowData,'---------------rowdata')
//       const req = new BuyersOrderAttributeInfoModel(rowData.attributeId,rowData.attributeName,e.target.value,rowData.buyerOrderAttributeId)
//       console.log(req,'--------------req')
//       setAttributeValue([...attributeValue,req])
//   }

//   const columns : ColumnsType<DataType> = [
//       {
//           title: 'S No',
//           key: 'sno',
//           width: '70px',
//           responsive: ['sm'],
//           render: (text, object, index) => (page-1) * 10 +(index+1)
//       },
//       {
//           title:'Name',
//           dataIndex: 'attributeName'
//       },
//       {
//           title: 'Value',
//           dataIndex:'attributeValue',
//           render:(value,row,index) => {
//               return(
//                   <>
//                   {row.attributeValue ? <Input key={index} placeholder="Enter value" defaultValue={row.attributeValue}
//                       onBlur={e=> setAttributeInfo(e,index,row)}/> : (
//                       <Input key={index}placeholder="Enter value"
//                       onBlur={e=> setAttributeInfo(e,index,row)}/>
//                   )}
                  
//                   </>
//               )
//           }
//       }

//   ]

//   const rowSelection = {
//       selectedRowKeys,
//       onChange: onSelectChange,
//   };

//   const onSubmit = () => {
//       console.log(attributeValue,'-------attributeValue')
//       console.log(isUpdate,'-----------------------')
//       if(isUpdate){
//           const req:any = new BuyersOrderAttributeRequest(0,state.state.id,attributeValue,'admin')
//           service.updateOrderAttribute(req).then(res => {
//               if(res.status){
//                   AlertMessages.getSuccessMessage('Updated successfully')
//                   navigate('/masters/buyers/buyers-view')
//               } else{
//                   AlertMessages.getErrorMessage(res.internalMessage)
//               }
//           })
//       } else {
//           const req:any = new BuyersOrderAttributeRequest(0,state.state.id,attributeValue,'admin')
//           service.createOrderAttribute(req).then(res => {
//               if(res.status){
//                   AlertMessages.getSuccessMessage('Created successfully')
//                   navigate('/masters/buyers/buyers-view')
//               } else {
//                   AlertMessages.getErrorMessage(res.internalMessage)
//               }
//           })
//       }
//   }

//   const onReset= () => {
//       setAttributeValue([])
//   }
  

//   const splitData = (data) => {
//       const middleIndex = Math.ceil(data.length / 2);
//       const firstHalf = data.slice(0, middleIndex);
//       const secondHalf = data.slice(middleIndex);
//       return [firstHalf, secondHalf];
//   };

//   const [firstHalfData, secondHalfData] = splitData(attributes);

//   return(
//       <Card title='Buyer Order Attributes'>
//           {
//               attributes.length <= 10 ? (<>
//               <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 18 }}>
//               <Card >
//               <Table columns={columns} dataSource={attributes} pagination={false}/>
//               </Card>
//               </Col>
//               </>): (<></>)

//           }
//           {
//               attributes.length > 10 ? (<> <Row gutter={24}>
//                   <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
//                       <Card>
//                           <Table columns={columns} dataSource={firstHalfData} pagination={false}/>
//                       </Card>
//                   </Col>
//                   <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
//                       <Card>
//                           <Table columns={columns} dataSource={secondHalfData} pagination={false}/>
//                       </Card>
//                   </Col>
//                   </Row></>) : (<></>)
//           }
//          <br/>
//           <Form>
//               <Row justify='end'>
//                   <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 2 }}>
//                   <Form.Item>
//                       <Button onClick={onSubmit} type='primary' htmlType='submit'>Submit</Button>
//                   </Form.Item>                   
//                   </Col>
//                   <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 2 }}>
//                   <Form.Item>
//                       <Button onClick={onReset}>Reset</Button>
//                   </Form.Item>                    
//                   </Col>
//               </Row>
//           </Form>
//       </Card>
//   )
// };

// export default BuyersOrderAttributeForm;



import { AttributeAgainstEnum, AttributeAgainstRequest, BuyerRequest, BuyersOrderAttributeInfoModel, BuyersOrderAttributeRequest } from "@project-management-system/shared-models";
import { Button, Card, Col, Form, Input, Row } from "antd";
import Table, { ColumnsType } from "antd/es/table"
import { useEffect, useState } from "react";
import { AttributeService, BuyersService } from "@project-management-system/shared-services";
import AlertMessages from "../../common/common-functions/alert-messages";
import { useLocation, useNavigate } from "react-router-dom";

interface DataType {
    key: React.Key;
    attributeName: string;
    attributeValue : string;
    disable: boolean;
}

export const BuyersOrderAttributeForm = () => {
    const [page, setPage] = useState<number>(1);
    const [attributeValue,setAttributeValue] = useState<BuyersOrderAttributeInfoModel[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const service = new BuyersService()
    const state = useLocation()
    const navigate = useNavigate()
    const attributeService = new AttributeService()
    const [attributes,setAttributes] = useState<any[]>([])
    const [isUpdate,setIsUpdate] = useState<boolean>(false);

    console.log(state,"useLocation")

    // useEffect(() => {
    //     getAttributes()
    // },[])

    useEffect(() => {
        if(state.state.id != undefined){
            getByBuyerId(state.state.id)
        }

    },[state.state.id])

    const getByBuyerId = (id) => {
        const req =new BuyerRequest(id,'')
        service.getBuyerId(req).then(res => {
            if(res.status){
                setAttributes(res.data)
                console.log(res.data,"getbuyerfunc")
                setIsUpdate(true)
            } else{
                getAttributes()
            }
        })
    }


    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const getAttributes = () => {
        const req = new AttributeAgainstRequest(AttributeAgainstEnum.ORDER)
        attributeService.getAttributeByAttributeAgainst(req).then(res => {
            if(res.status){
                setAttributes(res.data)
                
            }
        })
    }
  
    console.log(attributes,"attributennnnnnnnnnnnn")
    

    const setAttributeInfo = (e,index,rowData) => {
        console.log(rowData,'---------------rowdata')
        const req:any = new BuyersOrderAttributeInfoModel(rowData.attributeId,rowData.attributeName,e.target.value,rowData.buyerOrderAttributeId)
        console.log(req,'--------------req')
        setAttributeValue([...attributeValue,req])
    }

    const columns : ColumnsType<DataType> = [
        // {
        //     title: 'S No',
        //     key: 'sno',
        //     width: '70px',
        //     responsive: ['sm'],
        //     render: (text, object, index) => (page-1) * 10 +(index+1)
        // },
        {
            title:'Name',
            dataIndex: 'attributeName'
        },
        {
            title: 'Value',
            dataIndex:'attributeValue',
            render:(value,row,index) => {
                return(
                    <>
                    {row.attributeValue ? <Input key={index} placeholder="Enter value" 
                     defaultValue={row.attributeValue}
                        onBlur={e=> setAttributeInfo(e,index,row)}/> : (
                        <Input key={index}placeholder="Enter value"
                        onBlur={e=> setAttributeInfo(e,index,row)}/>
                    )}
                    
                    </>
                )
            }
        }

    ]

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const onSubmit = () => {
        if(isUpdate){
            const req = new BuyersOrderAttributeRequest(0,state.state.id,attributeValue,'admin')
            console.log(req,'update req')
            service.updateOrderAttribute(req).then(res => {
                if(res.status){
                    AlertMessages.getSuccessMessage('Updated successfully')
                    navigate('/global/buyers/buyers-view')
                } else{
                    AlertMessages.getErrorMessage(res.internalMessage)
                }
            })
        } else {
            const req = new BuyersOrderAttributeRequest(0,state.state.id,attributeValue,'admin')
            service.createOrderAttribute(req).then(res => {
                if(res.status){
                    AlertMessages.getSuccessMessage('Created successfully')
                    navigate('/global/buyers/buyers-view')
                } else {
                    AlertMessages.getErrorMessage(res.internalMessage)
                }
            })
        }
    }

    const onReset= () => {
        setAttributeValue([])
    }
    

    const splitData = (data) => {
        const middleIndex = Math.ceil(data.length / 2);
        const firstHalf = data.slice(0, middleIndex);
        const secondHalf = data.slice(middleIndex);
        return [firstHalf, secondHalf];
    };

    const [firstHalfData, secondHalfData] = splitData(attributes);

    return(
        <Card title='Buyer Order Configuration' extra={<span><Button onClick={() => navigate('/global/buyers/buyers-view')} type={'primary'}>View</Button></span>}>
            {
                attributes.length <= 10 ? (<>
                <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 18 }}>
                <Card >
                <Table columns={columns} dataSource={attributes} pagination={false}/>
                </Card>
                </Col>
                </>): (<></>)

            }
            {
                attributes.length > 10 ? (<> <Row gutter={24}>
                    <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                        <Card>
                            <Table columns={columns} dataSource={firstHalfData} pagination={false}/>
                        </Card>
                    </Col>
                    <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 12 }}>
                        <Card>
                            <Table columns={columns} dataSource={secondHalfData} pagination={false}/>
                        </Card>
                    </Col>
                    </Row></>) : (<></>)
            }
           <br/>
            <Form>
                <Row justify='end'>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 2 }}>
                    <Form.Item>
                        <Button onClick={onSubmit} type='primary' htmlType='submit'>Submit</Button>
                    </Form.Item>                   
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 6 }} xl={{ span: 2 }}>
                    <Form.Item>
                        <Button onClick={onReset}>Reset</Button>
                    </Form.Item>                    
                    </Col>
                </Row>
            </Form>
        </Card>
    )

}

export default BuyersOrderAttributeForm




