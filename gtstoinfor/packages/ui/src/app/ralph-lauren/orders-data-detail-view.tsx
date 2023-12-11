// import { OrderDataModel } from "@project-management-system/shared-models";
// import { Button, Card, Descriptions, Table } from "antd"
// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";


// const RLOrdersDetailView = () => {
// const [page, setPage] = React.useState(1);
// const [pageSize, setPageSize] = useState(1);
// const [data, setData] = useState<any[]>([]);
// let location = useLocation();


//  console.log(location.state.data,"yyyyyyyyyyyyy")

//  const rowData= [] 
//  rowData.push( location?.state?.data)
//  console.log(rowData,"uu")

//  const getSizeWiseHeaders = (data: OrderDataModel[]) => {
//     const sizeHeaders = new Set<string>();
//     data?.forEach((rec) =>
//       rec.sizeWiseData?.forEach((version) => {
//         sizeHeaders.add("" + version.size);
//       })
//     );
//     return Array.from(sizeHeaders);
//   };
//   const getMap = (data: OrderDataModel[]) => {
//     const sizeWiseMap = new Map<string, Map<string, number>>();
//     data?.forEach((rec) => {
//       if (!sizeWiseMap.has(rec.poNumber)) {
//         sizeWiseMap.set(rec.poNumber, new Map<string, number>());
//       }
//       rec.sizeWiseData?.forEach((version) => {
//         sizeWiseMap.get(rec.poNumber).set(" " + version.size, version.TotalQty);
//       });
//     });
//     return sizeWiseMap;
//   };
  
//  const renderReport = (data: OrderDataModel[]) => {
//     const sizeHeaders = getSizeWiseHeaders(data);
//     const sizeWiseMap = getMap(data);
//     const columns: any = [
//         {
//             title: "S.No",
//             key: "sno",
//             width: 50,
//             render: (text, object, index) => (page - 1) * pageSize + (index + 1),
//             fixed: 'left'
//         }
//     ]
//     sizeHeaders?.forEach(version => {
//             columns.push({
//                 title: version,
//                 dataIndex: version,
//                 key: version,
//                 width: 70,
//                 align: 'center',
//                 children: [
//                     {
//                         title: 'UPC/EAN',
//                         dataIndex: '',
//                         key: '',
//                         width: 70,
//                         className: "center",
//                         render: (text, record) => {
//                             const sizeData = record.sizeWiseData.find(item => item.size === version);
//                             console.log()
//                             if (sizeData) {
//                                 if (sizeData.size !== null) {
//                                     const formattedQty = (sizeData?.upcEan)
//                                     return (
//                                         formattedQty
//                                     );
//                                 } else {
    
//                                     return (
//                                         '-'
//                                     );
//                                 }
//                             } else {
//                                 return '-';
//                             }
//                         }
//                     },
                    
//                     {
//                         title: 'MSRP',
//                         dataIndex: '',
//                         key: '',
//                         width: 70,
//                         className: "center",
//                         render: (text, record) => {
//                             const sizeData = record.sizeWiseData.find(item => item.size === version);
//                             console.log()
//                             if (sizeData) {
//                                 if (sizeData.size !== null) {
//                                     const formattedQty = (sizeData?.msrpPrice)
//                                     return (
//                                         formattedQty
//                                     );
//                                 } else {
    
//                                     return (
//                                         '-'
//                                     );
//                                 }
//                             } else {
//                                 return '-';
//                             }
//                         }
//                     },
//                     {
//                         title: 'Customer Selling Price',
//                         dataIndex: '',
//                         key: '',
//                         width: 70,
//                         className: "center",
//                         render: (text, record) => {
//                             const sizeData = record.sizeWiseData.find(item => item.size === version);
//                             console.log()
//                             if (sizeData) {
//                                 if (sizeData.size !== null) {
//                                     const formattedQty = (sizeData?.csprice)
//                                     return (
//                                         formattedQty
//                                     );
//                                 } else {
    
//                                     return (
//                                         '-'
//                                     );
//                                 }
//                             } else {
//                                 return '-';
//                             }
//                         }
//                     },
//                     {
//                         title: 'Price',
//                         dataIndex: '',
//                         key: '',
//                         width: 70,
//                         className: "center",
//                         render: (text, record) => {
//                             const sizeData = record.sizeWiseData.find(item => item.size === version);
                    
//                             if (sizeData) {
//                                 if (sizeData.size !== null) {
//                                     const formattedQty = `${sizeData.price} ${sizeData.currency}`;
//                                     return formattedQty;
//                                 } else {
//                                     return '-';
//                                 }
//                             } else {
//                                 return '-';
//                             }
//                         }
//                     },
                    
//                     {
//                         title: 'Quantity',
//                         dataIndex: '',
//                         key: '',
//                         width: 70,
//                         className: "center",
//                         render: (text, record) => {
//                             const sizeData = record.sizeWiseData.find(item => item.size === version);
//                             console.log()
//                             if (sizeData) {
//                                 if (sizeData.size !== null) {
//                                     const formattedQty = (sizeData?.quantity)
//                                     return (
//                                         formattedQty
//                                     );
//                                 } else {
    
//                                     return (
//                                         '-'
//                                     );
//                                 }
//                             } else {
//                                 return '-';
//                             }
//                         }
//                     },
//                     {
//                         title: 'Amount',
//                         dataIndex: '',
//                         key: '',
//                         width: 70,
//                         className: "center",
//                         render: (text, record) => {
//                             const sizeData = record.sizeWiseData.find(item => item.size === version);
//                             console.log()
//                             if (sizeData) {
//                                 if (sizeData.size !== null) {
//                                     const formattedQty = `${sizeData.amount} ${sizeData.currency}`;
//                                     // const formattedQty = (sizeData?.amount)
//                                     return (
//                                         formattedQty
//                                     );
//                                 } else {
    
//                                     return (
//                                         '-'
//                                     );
//                                 }
//                             } else {
//                                 return '-';
//                             }
//                         }
//                     },
//                     // {
//                     //     title: 'Total Amount',
//                     //     dataIndex: '',
//                     //     key: '',
//                     //     width: 70,
//                     //     className: "center",
//                     //     render: (text, record) => {
//                     //         const sizeData = record.sizeWiseData.find(item => item.size === version);
//                     //         console.log()
//                     //         if (sizeData) {
//                     //             if (sizeData.size !== null) {
//                     //                 const formattedQty = (sizeData?.totalAmount)
//                     //                 return (
//                     //                     formattedQty
//                     //                 );
//                     //             } else {
    
//                     //                 return (
//                     //                     '-'
//                     //                 );
//                     //             }
//                     //         } else {
//                     //             return '-';
//                     //         }
//                     //     }
//                     // },
//                 ]
//             });
//         })


//         const getRowClassName = (record) => {
//             if (record.displayName) {
//               return "colored-row";
//             }
//             return "";
//           };
      
//           return (
//             <>
//               {rowData.length > 0 ? (
//                 <Table
//                   // loading={tableLoading}
//                   columns={columns}
//                   dataSource={rowData}
//                   size="small"
//                   // pagination={false}
//                   pagination={{
//                     pageSize: 50,
//                     onChange(current, pageSize) {
//                       setPage(current);
//                       setPageSize(pageSize);
//                     },
//                   }}
//                   className="custom-table-wrapper"
//                   scroll={{ x: "max-content", y: 450 }}
//                   rowClassName={getRowClassName}
//                   bordered
//                 />
//               ) : (
//                 <Table size="large" />
//               )}
//             </>
//           );
//         };
        
        

    


//     return (
//         <Card title="Order Detail View"
//         extra ={<Link to='/ralph-lauren/order-data-info-grid' ><Button className='panel_button' >View </Button></Link>}
//         >
//         <Descriptions size="small" column={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 2 }} >
//         <Descriptions.Item label='Material Number'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.materialNo}</Descriptions.Item>
//         <Descriptions.Item label='PO Number' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.poNumber}</Descriptions.Item>
//         <Descriptions.Item label='PO Item' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.poItem}</Descriptions.Item>
//         <Descriptions.Item label='Purchase Group' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.purchaseGroup}</Descriptions.Item>
//         <Descriptions.Item label='Supplier' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.supplier}</Descriptions.Item>
//         <Descriptions.Item label='Revision Number'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.revisionNo}</Descriptions.Item>
//         <Descriptions.Item label='Season Code'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.seasonCode}</Descriptions.Item>
//         <Descriptions.Item label='Board Code'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.boardCode}</Descriptions.Item>
//         <Descriptions.Item label='Color'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.color}</Descriptions.Item>
//         <Descriptions.Item label='Division'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.division}</Descriptions.Item>
//         <Descriptions.Item label='Ship Mode'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.shipMode}</Descriptions.Item>
//         <Descriptions.Item label='Ship Date'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.shipDate}</Descriptions.Item>
//         <Descriptions.Item label='Ship To Address'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.shipToAddress}</Descriptions.Item>
//         <Descriptions.Item label='Agent'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.agent}</Descriptions.Item>








       

//         </Descriptions>
//         <br></br>
//         {/* <Table
//                     columns={columns}
//                     dataSource={data}
//                     bordered
//                     className="custom-table-wrapper"
//                     pagination={{
//                         pageSize: 50,
//                         onChange(current, pageSize) {
//                             setPage(current);
//                             setPageSize(pageSize);
//                         },
//                     }}
//                     scroll={{ x: 'max-content', y: 450 }}
//                 >
//                 </Table> */}

//       {renderReport(rowData)}
        
//         </Card>
//     )

// }
// export default RLOrdersDetailView;


import { OrderDataModel, PoOrderFilter } from "@project-management-system/shared-models";
import { RLOrdersService } from "@project-management-system/shared-services";
import { Button, Card, Descriptions, Table, message } from "antd"
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


const RLOrdersDetailView = () => {
const [page, setPage] = React.useState(1);
const [pageSize, setPageSize] = useState(1);
const [data, setData] = useState<any[]>([]);
let location = useLocation();
const service = new RLOrdersService();
const [orderData, setOrderData] = useState<any>([]);



useEffect(() => {
    getorderData();
  }, []);

  const getorderData = () => {
    const req = new PoOrderFilter(location?.state?.data?.poNumber);
    service.getorderDataByPoNumber(req).then((res) => {
      if (res.status) {
        setOrderData(res.data);
      } else {
        message.error(res.internalMessage)
      }
    });
  };


 console.log(location?.state?.data,"yyyyyyyyyyyyy")



    const columns: any = [
        {
            title: "S.No",
            key: "sno",
            align:"center",
            // width: 25,
            render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            // fixed: 'left'
        },
        {
            // title: <div style={{textAlign:"center"}}>Size</div>,4
            title:"Size",
            dataIndex: 'size',
            // align:"center",
            // width: 60,
            sorter: (a, b) => a.size.localeCompare(b.size),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: 'UPC/EAN',
            dataIndex: 'upc_ean',
            // align:"center",
            // width: 60,
            sorter: (a, b) => a.upc_ean.localeCompare(b.upc_ean),
            sortDirections: ["ascend", "descend"],
            // ...getColumnSearchProps('purchaseOrderNumber')
        },
        {
            title: 'MSRP',
            dataIndex: 'msrp_price',
            // width: 60,
            // align:"center",
            sorter: (a, b) => a.msrp_price.localeCompare(b.msrp_price),
            sortDirections: ["ascend", "descend"],
            // ...getColumnSearchProps('purchaseOrderNumber')
        },
        {
            title: 'Price',
            dataIndex: 'price',
            // width: 60,
            // align:"center",
            sorter: (a, b) => a.price.localeCompare(b.price),
            sortDirections: ["ascend", "descend"],
            render: (text, record) => {
                if (record) {
                    if (record) {
                        const formatted = `${record.price} ${record.currency}`;
                        // const formattedQty = (sizeData?.amount)
                        return (
                            formatted
                        );
                    } else {

                        return (
                            '-'
                        );
                    }
                } else {
                    return '-';
                }
            }
            // ...getColumnSearchProps('purchaseOrderNumber')
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            // width: 60,
            // align:"center",
            sorter: (a, b) => a.quantity.localeCompare(b.quantity),
            sortDirections: ["ascend", "descend"],
            // ...getColumnSearchProps('purchaseOrderNumber')
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            // width: 60,
            // align:"center",
            sorter: (a, b) => a.amount.localeCompare(b.amount),
            sortDirections: ["ascend", "descend"],
            // ...getColumnSearchProps('purchaseOrderNumber')
        },

    ]
   

    const getTotalAmountAndQuantity = () => {
        const total = orderData.reduce(
          (accumulator, item) => {
            accumulator.amount += parseFloat(item.amount) || 0;
            accumulator.quantity += parseInt(item.quantity, 10) || 0;
            return accumulator;
          },
          { amount: 0, quantity: 0 }
        );
    
        return {
          totalAmount: total.amount.toFixed(2),
          totalQuantity: total.quantity,
        };
      };
     
      const { totalAmount, totalQuantity } = getTotalAmountAndQuantity() 

    


    return (
        <Card title="Order Detail View"
        extra ={<Link to='/ralph-lauren/order-data-info-grid' ><Button className='panel_button' >View </Button></Link>}
        >
        <Descriptions size="small" column={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 2 }} >
        <Descriptions.Item label='Material Number'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.materialNo ? location.state.data.materialNo : "--"}</Descriptions.Item>
        <Descriptions.Item label='PO Number' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.poNumber ? location?.state?.data?.poNumber : "--"}</Descriptions.Item>
        <Descriptions.Item label='PO Item' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.poItem ? location?.state?.data?.poItem :"--"}</Descriptions.Item>
        <Descriptions.Item label='Purchase Group' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.purchaseGroup ? location?.state?.data?.purchaseGroup :"--"}</Descriptions.Item>
        <Descriptions.Item label='Supplier' labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.supplier ? location?.state?.data?.supplier :"--" }</Descriptions.Item>
        <Descriptions.Item label='Revision Number'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.revisionNo ? location?.state?.data?.revisionNo :"--"}</Descriptions.Item>
        <Descriptions.Item label='Season Code'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.seasonCode ? location?.state?.data?.seasonCode :"--"}</Descriptions.Item>
        <Descriptions.Item label='Board Code'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.boardCode ? location?.state?.data?.boardCode :"--"}</Descriptions.Item>
        <Descriptions.Item label='Color'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.color ? location?.state?.data?.color :"--"}</Descriptions.Item>
        <Descriptions.Item label='Division'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.division ? location?.state?.data?.division :"--"}</Descriptions.Item>
        <Descriptions.Item label='Ship Mode'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.shipMode ? location?.state?.data?.shipMode :"--"}</Descriptions.Item>
        <Descriptions.Item label='Ship Date'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.shipDate ? location?.state?.data?.shipDate :"--"}</Descriptions.Item>
        <Descriptions.Item label='Ship To Address'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.shipToAddress ? location?.state?.data?.shipToAddress :"--"}</Descriptions.Item>
        <Descriptions.Item label='Agent'labelStyle={{ color: 'black', fontWeight: 'bold' }} >{location?.state?.data?.agent ? location?.state?.data?.agent :"--"}</Descriptions.Item>
       

        </Descriptions>
          <br></br>
       
                     <Table
                        size="small"
                        columns={columns}
                        dataSource={orderData}
                        className="custom-table-wrapper"
                        pagination={{
                        pageSize: 50,
                        onChange(current, pageSize) {
                            setPage(current);
                            setPageSize(pageSize);
                        },
                        }}
                        // scroll={{ y: 450 }}
                        summary={() => (
                        <>
                            <Table.Summary.Row className="tableFooter">
                                
                                    <Table.Summary.Cell index={1} colSpan={5}>
                                    <span style={{ marginLeft:600 }}>
                                        <b>PO Line Total</b>
                                    </span>
                                
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1} colSpan={1}>
                                    <span>
                                        <b>{Number(totalQuantity)}</b>
                                    </span>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1} colSpan={1}>
                                    <span>
                                        <b>{Number(totalAmount)} {location?.state?.data?.currency} </b>
                                    </span>
                                    </Table.Summary.Cell>
                                    

                                    <Table.Summary.Cell index={1} colSpan={1}>
                                    <span style={{ textAlign: "end" }}>
                                    </span>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                                <Table.Summary.Row className="tableFooter">
                                
                                    <Table.Summary.Cell index={1} colSpan={5}>
                                    <span style={{ marginLeft:600 }}>
                                        <b>Purchase Order Total</b>
                                    </span>
                                
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1} colSpan={1}>
                                    <span>
                                        <b>{Number(totalQuantity)}</b>
                                    </span>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1} colSpan={1}>
                                    <span>
                                        <b>{Number(totalAmount)} {location?.state?.data?.currency} </b>
                                    </span>
                                    </Table.Summary.Cell>
                                    

                                    <Table.Summary.Cell index={1} colSpan={1}>
                                    <span style={{ textAlign: "end" }}>
                                    </span>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                        </>
                        )}
                    ></Table>

        
        </Card>
    )

}
export default RLOrdersDetailView;