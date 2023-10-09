import { Alert, Button, Card, Col, Form, Row, Select, Space, Table, Tabs, Typography, message } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import ExFactoryReportWithComparision from "./ex-factory-report-with-comparision"
import WareHouseComparision from "./warehouse-comparision"
import { OrdersService } from "@project-management-system/shared-services"
import React, { useEffect, useState } from "react"
import { YearReq } from "@project-management-system/shared-models"
import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons"
import { Excel } from "antd-table-saveas-excel"
import { IExcelColumn } from "antd-table-saveas-excel/app"
import moment from "moment"
import { Pagination } from 'antd';


export const MonthWiseComparisionReport = () =>{
    const [form] = Form.useForm();
    const { Option } = Select;
    const [page, setPage] = useState<number>(1);

    const [selected, setSelected] = useState('ExFactory')
    const [data, setData] = useState<any[]>([]);
    const [phase, setPhase] = useState<any[]>([]);
    const [phaseExcel, setPhaseExcel] = useState<any[]>([]);
    const [year, setYear] = useState<any[]>([]);
    const [tab, setTab] = useState<number>(2023);
    const service = new OrdersService();
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [excelsData, setExcelData] = useState<any[]>([]);
    const [dates, setDates] = useState<any[]>([]);
    const { Text } = Typography;
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        getData(selected);
        getTabs();
      }, []);
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const currentPageData = data.slice(startIndex, endIndex);
      const handlePageChange = (newPage, newPageSize) => {
        setPage(newPage);
        setPageSize(newPageSize);
      };
      
      const getTabs = () => {
        service.getExfactoryYearData().then((res) => {
          if (res.status) {
            setYear(res.data);
          }
        });
      };
      
    const handleChange = (val) =>{
        setSelected(val)
        getData(val)
      }
      const getData = (val) => {
        const req = new YearReq(tab,val);
        service.getMonthlyComparisionData(req).then((res) => {
         if (res.status) {
            setData(res.data);
            setFilteredData(res.data);
          } else {
            setData([]);
          }
        });
        service.getExfactoryWithComparisionExcel(req).then((res) => {
          if (res.status) {
            setExcelData(res.data);
          } else {
            setData([]);
          }
        });
        service.getMonthlyComparisionDate(req).then((res)=>{
            if (res.status) {
                setDates(res.data);
                console.log(res.data[0].Date);

                
              } else {
                setDates([]);
              }
        })
        service.getComparisionPhaseData(req).then((res)=>{
          if(res.status){
            setPhase(res.data)
          }else{
            setPhase([]);
          }
        })
        service.getComparisionPhaseExcelData(req).then((res)=>{
          if(res.status){
            setPhaseExcel(res.data)
          }else{
            setPhaseExcel([]);
          }
        })
      };

      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      }
      const CustomTitle = () => {
        return (

<div>
<table>
  <td>
  <table  >
      <th style={{width:80,textAlign:'center'}}>product plan type</th>
    </table>
    </td>
    <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',borderCollapse: 'collapse',backgroundColor: 'lightgreen',borderLeft: '1px solid #ddd'}}>January</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>Latest</td>
      <td style={{borderCollapse: 'collapse'}}>Previous</td>
      </tr>
    </table>
    </td>
    <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',borderCollapse: 'collapse',backgroundColor: 'lightblue',borderLeft: '1px solid #ddd'}}>February</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>Latest</td>
      <td style={{borderCollapse: 'collapse'}}>Previous</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',borderCollapse: 'collapse',backgroundColor: 'lightgreen',borderLeft: '1px solid #ddd'}}>March</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>Latest</td>
      <td style={{borderCollapse: 'collapse'}}>Previous</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',borderCollapse: 'collapse',backgroundColor: 'lightblue',borderLeft: '1px solid #ddd'}}>April</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>Latest</td>
      <td style={{borderCollapse: 'collapse'}}>Previous</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',borderCollapse: 'collapse',backgroundColor: 'lightgreen',borderLeft: '1px solid #ddd'}}>May</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>Latest</td>
      <td style={{borderCollapse: 'collapse'}}>Previous</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',backgroundColor: 'lightblue',borderCollapse: 'collapse',borderLeft: '1px solid #ddd'}}>June</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>Latest</td>
      <td style={{borderCollapse: 'collapse'}}>Previous</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',borderCollapse: 'collapse',backgroundColor: 'lightgreen',borderLeft: '1px solid #ddd'}}>July</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>Latest</td>
      <td style={{borderCollapse: 'collapse'}}>Previous</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',borderCollapse: 'collapse',backgroundColor: 'lightblue',borderLeft: '1px solid #ddd'}}>August</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>Latest</td>
      <td style={{borderCollapse: 'collapse'}}>Previous</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',borderCollapse: 'collapse',backgroundColor: 'lightgreen',borderLeft: '1px solid #ddd'}}>September</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>Latest</td>
      <td style={{borderCollapse: 'collapse'}}>Previous</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',borderCollapse: 'collapse',backgroundColor: 'lightblue',borderLeft: '1px solid #ddd'}}>October</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>Latest</td>
      <td style={{borderCollapse: 'collapse'}}>Previous</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',borderCollapse: 'collapse',backgroundColor: 'lightgreen',borderLeft: '1px solid #ddd'}}>November</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>Latest</td>
      <td style={{borderCollapse: 'collapse'}}>Previous</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',borderCollapse: 'collapse',backgroundColor: 'lightblue',borderLeft: '1px solid #ddd',borderRight: '1px solid #ddd'}}>December</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>Latest</td>
      <td style={{borderCollapse: 'collapse',borderRight: '1px solid #ddd'}}>Previous</td>
      </tr>
    </table>
  
    </td>
    <td>
  <table  >
      <th style={{width:50,textAlign:'center'}}>Total(Latest)</th>
    </table>
    </td> <td>
  <table  >
      <th style={{width:50,textAlign:'center'}}>Total(Previous)</th>
    </table>
    </td>
</table>
</div>
        );
      };
    //   const columns10: any = [
    //     {
    //       title: "S No",
    //       key: "sno",
    //       render: (text, object, index) => (page - 1) * pageSize + (index + 1),
    //     },
    //     // {
    //     //   title: "Item code",
    //     //   dataIndex: "itemCode",
    //     //   // ...getColumnSearchProps('itemCode')
    //     // },
    //     // {
    //     //   title: "Item Name",
    //     //   dataIndex: "itemName",
    //     //   width:200,
    //     //   render: (text: any, record: any) => (
    //     //   <span>{record.itemName}</span>
    //     //   ),
    //     //   // ...getColumnSearchProps('itemName')
    //     // },
    //     {title:'Production Plan Type',
    //     dataIndex: "phasetype",
    //     render: (text: any, record: any) => <span>{record.phasetype}</span>,
    //   },
    //   {title:'January',
    //     dataIndex: "phasetype",
    //     children:[
    //       {
    //         title:'Previous',
    //     dataIndex: "janPcs",
    //     render: (text: any, record: any) => <span>{record.pcsData[0].janPcs}</span>,
    
    //       },
    //       {
    //         title:'Latest',
    //     dataIndex: "janCoeff",
    //     render: (text: any, record: any) => <span>{record.coeffData[0].janCoeff}</span>,
    
    //       }
    //     ],
    //     style: { backgroundColor: "lightblue" },
    //   },
    //   {
    //     title: "", 
    //     width: 20, 
    //     },
    //   {title:'February',
    //   dataIndex: "phasetype",
    //   children:[
    //     {
    //       title:'Previous',
    //   dataIndex: "febPcs",
    //   render: (text: any, record: any) => <span >{record.pcsData[0].febPcs}</span>,
    
    //     },
    //     {
    //       title:'Latest',
    //   dataIndex: "febCoeff",
    //   render: (text: any, record: any) => <span>{record.coeffData[0].febCoeff}</span>,
    
    //     }
    //   ]
    // },
    // {
    //   title: "", 
    //   width: 20, 
    // },
    // {title:'March',
    //   dataIndex: "phasetype",
    //   children:[
    //     {
    //       title:'Previous',
    //   dataIndex: "marPcs",
    //   render: (text: any, record: any) => <span>{record.pcsData[0].marPcs}</span>,
    
    //     },
    //     {
    //       title:'Latest',
    //   dataIndex: "marCoeff",
    //   render: (text: any, record: any) => <span>{record.coeffData[0].marCoeff}</span>,
    
    //     }
    //   ]
    // },
    // {
    //   title: "", 
    //   width: 20, 
    // },
    // {title:'April',
    //   dataIndex: "phasetype",
    //   children:[
    //     {
    //       title:'Previous',
    //   dataIndex: "aprPcs",
    //   render: (text: any, record: any) => <span>{record.pcsData[0].aprPcs}</span>,
    
    //     },
    //     {
    //       title:'Latest',
    //   dataIndex: "aprCoeff",
    //   render: (text: any, record: any) => <span>{record.coeffData[0].aprCoeff}</span>,
    
    //     }
    //   ]
    // },
    // {
    //   title: "", 
    //   width: 20, 
    // },
    // {title:'May',
    //   dataIndex: "phasetype",
    //   children:[
    //     {
    //       title:'Previous',
    //   dataIndex: "mayPcs",
    //   render: (text: any, record: any) => <span>{record.pcsData[0].mayPcs}</span>,
    
    //     },
    //     {
    //       title:'Latest',
    //   dataIndex: "mayCoeff",
    //   render: (text: any, record: any) => <span>{record.coeffData[0].mayCoeff}</span>,
    
    //     }
    //   ]
    // },
    // {
    //   title: "", 
    //   width: 20, 
    // },
    // {title:'June',
    //   dataIndex: "phasetype",
    //   children:[
    //     {
    //       title:'Previous',
    //   dataIndex: "junPcs",
    //   render: (text: any, record: any) => <span>{record.pcsData[0].junPcs}</span>,
    
    //     },
    //     {
    //       title:'Latest',
    //   dataIndex: "junCoeff",
    //   render: (text: any, record: any) => <span>{record.coeffData[0].junCoeff}</span>,
    
    //     }
    //   ]
    // },
    // {
    //   title: "", 
    //   width: 20, 
    // },
    // {title:'July',
    //   dataIndex: "phasetype",
    //   children:[
    //     {
    //       title:'Previous',
    //   dataIndex: "julPcs",
    //   render: (text: any, record: any) => <span>{record.pcsData[0].julPcs}</span>,
    
    //     },
    //     {
    //       title:'Latest',
    //   dataIndex: "julCoeff",
    //   render: (text: any, record: any) => <span>{record.coeffData[0].julCoeff}</span>,
    
    //     }
    //   ]
    // },
    // {
    //   title: "", 
    //   width: 20, 
    // },
    // {title:'August',
    //   dataIndex: "phasetype",
    //   children:[
    //     {
    //       title:'Previous',
    //   dataIndex: "augPcs",
    //   render: (text: any, record: any) => <span>{record.pcsData[0].augPcs}</span>,
    
    //     },
    //     {
    //       title:'Latest',
    //   dataIndex: "augCoeff",
    //   render: (text: any, record: any) => <span>{record.coeffData[0].augCoeff}</span>,
    
    //     }
    //   ]
    // },
    // {
    //   title: "", 
    //   width: 20, 
    // },
    // {title:'September',
    //   dataIndex: "phasetype",
    //   children:[
    //     {
    //       title:'Previous',
    //   dataIndex: "sepPcs",
    //   render: (text: any, record: any) => <span>{record.pcsData[0].sepPcs}</span>,
    
    //     },
    //     {
    //       title:'Latest',
    //   dataIndex: "sepCoeff",
    //   render: (text: any, record: any) => <span>{record.coeffData[0].sepCoeff}</span>,
    
    //     }
    //   ]
    // },
    // {
    //   title: "", 
    //   width: 20, 
    // },
    // {title:'October',
    //   dataIndex: "phasetype",
    //   children:[
    //     {
    //       title:'Previous',
    //   dataIndex: "octPcs",
    //   render: (text: any, record: any) => <span>{record.pcsData[0].octPcs}</span>,
    
    //     },
    //     {
    //       title:'Latest',
    //   dataIndex: "octCoeff",
    //   render: (text: any, record: any) => <span>{record.coeffData[0].octCoeff}</span>,
    
    //     }
    //   ]
    // },
    // {
    //   title: "", 
    //   width: 20, 
    // },
    // {title:'November',
    //   dataIndex: "phasetype",
    //   children:[
    //     {
    //       title:'Previous',
    //   dataIndex: "novPcs",
    //   render: (text: any, record: any) => <span>{record.pcsData[0].novPcs}</span>,
    
    //     },
    //     {
    //       title:'Latest',
    //   dataIndex: "novCoeff",
    //   render: (text: any, record: any) => <span>{record.coeffData[0].novCoeff}</span>,
    
    //     }
    //   ]
    // },
    // {
    //   title: "", 
    //   width: 20, 
    // },
    // {title:'December',
    //   dataIndex: "phasetype",
    //   children:[
    //     {
    //       title:'Previous',
    //   dataIndex: "decPcs",
    //   render: (text: any, record: any) => <span>{record.pcsData[0].decPcs}</span>,
    
    //     },
    //     {
    //       title:'Latest',
    //   dataIndex: "decCoeff",
    //   render: (text: any, record: any) => <span>{record.coeffData[0].decCoeff}</span>,
    
    //     }
    //   ]
    // },
    // {
    //   title: "", 
    //   width: 20, 
    // },
    // {title:"Total Pcs",
    // dataIndex:"total_order_plan_qty",
    // render: (text: any, record: any) => <span >{record.pcsData[0].total_order_plan_qty}</span>,
    // },
    
    // {
    //   title: "", 
    //   width: 20, 
    // },
    // {title:"Total Coeff",
    // dataIndex:"total_order_plan_qty_coeff",
    // render: (text: any, record: any) => <span >{record.pcsData[0].total_order_plan_qty_coeff}</span>,
    // },
    
    
    //     // // {
    //     // //   title: <Header/>,
    //     // //   dataIndex: "monthWiseData",
    //     // //   align:'center',
    //     // //   render: (text: any, record: any) => (
    //     // //     <Table
    //     // //       dataSource={record.monthWiseData}
    //     // //       columns={childColumns2}
    //     // //       pagination={false} // Hide pagination for child table
    //     // //       rowKey={(record) => record.itemName}
             
    //     // //     />
    //     //   ),
    //     // },
            
    //   ];
      const getColumnBackgroundColor = (title) => {
        if (title === "January") {
          return "lightblue"; 
        } else if (title === "February") {
          return "lightgreen";
        } else if  (title === "March"){
          return "lightblue"; 
        }else if (title === "April") {
          return "lightgreen";
        }else if  (title === "May"){
          return "lightblue"; 
        }else if (title === "June") {
          return "lightgreen";
        }else if  (title === "July"){
          return "lightblue"; 
        }else if (title === "August") {
          return "lightgreen";
        }else if  (title === "September"){
          return "lightblue"; 
        }else if (title === "October") {
          return "lightgreen";
        }else if  (title === "November"){
          return "lightblue";
        }else if (title === "December") {
          return "lightgreen";
         }else{
          return undefined; 
        }
      };
    
     
      // const childColumns1: any = [
      //   {
      //     // title: "Production Plan Type Name",
      //     dataIndex: "phasetype",
      //     width: 100,
      //   },
      //   {
      //         // title: `Previous`,
      //         dataIndex: "janPcs",         
      //          width:100,
      //         align:"right",
    
      //         render: (text: any, record: any) => {
      //           return (record.pcsData.map((item: any) =><span>{item.janPcs.toLocaleString()}</span>  || '-'))
              
      //         }
      //       },
      //       {
      //         // title: `Latest`,
      //         dataIndex: "janCoeff",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.coeffData.map((item: any) =><span>{item.janCoeff.toLocaleString()}</span>  || '-'))
              
      //         }
            
       
      //   },
      //   {
          
      //         // title: `Previous`,
      //         dataIndex: "febPcs",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.pcsData.map((item: any) =><span>{item.febPcs.toLocaleString()}</span>  || '-'))
              
      //         }
      //       },
      //       {
      //         // title: `Latest`,
      //         dataIndex: "febCoeff",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.coeffData.map((item: any) =><span>{item.febCoeff.toLocaleString()}</span>  || '-'))
              
      //         }
           
     
      //   },
      //   {
         
      //        // title: `Previous`,
      //         dataIndex: "marPcs",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.pcsData.map((item: any) =><span>{item.marPcs.toLocaleString()}</span>  || '-'))
              
      //         }
      //       },
      //       {
      //        // title: `Latest`,
      //         dataIndex: "marCoeff",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.coeffData.map((item: any) =><span>{item.marCoeff.toLocaleString()}</span>  || '-'))
              
      //         }
            
          
      //   },
      //   {
          
      //        // title: `Previous`,
      //         dataIndex: "aprPcs",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.pcsData.map((item: any) =><span>{item.aprPcs.toLocaleString()}</span>  || '-'))
              
      //         }
      //       },
      //       {
      //        // title: `Latest`,
      //         dataIndex: "aprCoeff",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.coeffData.map((item: any) =><span>{item.aprCoeff.toLocaleString()}</span>  || '-'))
              
      //         }
            
      
      //   },
      //   {
         
      //        // title: `Previous`,
      //         dataIndex: "mayPcs",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.pcsData.map((item: any) =><span>{item.mayPcs.toLocaleString()}</span>  || '-'))
              
      //         }
      //       },
      //       {
      //        // title: `Latest`,
      //         dataIndex: "mayCoeff",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.coeffData.map((item: any) =><span>{item.mayCoeff.toLocaleString()}</span>  || '-'))
              
      //         }
            
        
          
      //   },
      //   {
         
      //        // title: `Previous`,
      //         dataIndex: "junPcs",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.pcsData.map((item: any) =><span>{item.junPcs.toLocaleString()}</span>  || '-'))
              
      //         }
      //       },
      //       {
      //        // title: `Latest`,
      //         dataIndex: "junCoeff",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.coeffData.map((item: any) =><span>{item.junCoeff.toLocaleString()}</span>  || '-'))
              
      //         }
           
       
          
      //   },
      //   {
         
      //        // title: `Previous`,
      //         dataIndex: "julPcs",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.pcsData.map((item: any) =><span>{item.julPcs.toLocaleString()}</span>  || '-'))
              
      //         }
      //       },
      //       {
      //        // title: `Latest`,
      //         dataIndex: "julCoeff",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.coeffData.map((item: any) =><span>{item.julCoeff.toLocaleString()}</span>  || '-'))
              
      //         }
           
      //   },
      //   {
          
      //        // title: `Previous`,
      //         dataIndex: "augPcs",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.pcsData.map((item: any) =><span>{item.augPcs.toLocaleString()}</span>  || '-'))
              
      //         }
      //       },
      //       {
      //        // title: `Latest`,
      //         dataIndex: "augCoeff",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.coeffData.map((item: any) =><span>{item.augCoeff.toLocaleString()}</span>  || '-'))
              
      //         }
           
      //   },
      //   {
       
      //        // title: `Previous`,
      //         dataIndex: "sepPcs",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.pcsData.map((item: any) =><span>{item.sepPcs.toLocaleString()}</span>  || '-'))
              
      //         }
      //       },
      //       {
      //        // title: `Latest`,
      //         dataIndex: "sepCoeff",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.coeffData.map((item: any) =><span>{item.sepCoeff.toLocaleString()}</span>  || '-'))
              
      //         }
           
        
      //   },
      //   {
        
      //        // title: `Previous`,
      //         dataIndex: "octPcs",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.pcsData.map((item: any) =><span>{item.octPcs.toLocaleString()}</span>  || '-'))
              
      //         },
      //       },
      //       {
      //        // title: `Latest`,
      //         dataIndex: "octCoeff",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.coeffData.map((item: any) =><span>{item.octCoeff.toLocaleString()}</span>  || '-'))
              
      //         }
           
      //   },
      //   {
         
      //        // title: `Previous`,
      //         dataIndex: "novPcs",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.pcsData.map((item: any) =><span>{item.novPcs.toLocaleString()}</span>  || '-'))
              
      //         }
      //       },
      //       {
      //        // title: `Latest`,
      //         dataIndex: "novCoeff",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.coeffData.map((item: any) =><span>{item.novCoeff.toLocaleString()}</span>  || '-'))
              
      //         },
           
      //   },
      //   {
         
      //         // title: `Previous`,
      //         dataIndex: "decPcs",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.pcsData.map((item: any) =><span>{item.decPcs.toLocaleString()}</span>  || '-'))
              
      //         }
      //       },
      //       {
      //         // title: `Latest`,
      //         dataIndex: "decCoeff",
      //         width:100,
      //         align:"right",
      //         render: (text: any, record: any) => {
      //           return (record.coeffData.map((item: any) =><span>{item.decCoeff.toLocaleString()}</span>  || '-'))
              
      //         }
    
          
      //   },
      //   {
      //     // title: "Total Previous",
      //     dataIndex: "totalPcs",
      //  align:"right",
      //  width:150,
      //  render: (text: any, record: any) => {
      //   return record.totalPcs ? record.totalPcs.toLocaleString() :0
      // },    },
      //   {
      //     // title: "Total Latest",
      //     dataIndex: "totalCoeff",
      //     align: "right",
      //     width: 150,
      //     render: (text: any, record: any) => {
      //       return record.totalCoeff ? record.totalCoeff.toLocaleString() : 0;
      //     },
      //   },
      // ];
      const childColumns1: any = [
        {
          // title: "Production Plan Type Name",
          dataIndex: "phasetype",
          width: 80,
        },
        {
          // title: `In PCs`,
          dataIndex: "janPcs",
          width:30,
          align: "right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.janPcs.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "janCoeff",
          width: 40,
          align: "right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.janCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
    
        {
          // title: `In PCs`,
          dataIndex: "febPcs",
          width:50,
          align: "right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.febPcs.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "febCoeff",
          width: 40,
          align: "right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.febCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
    
        {
          // title: `In PCs`,
          dataIndex: "marPcs",
          width: 40,
          align: "right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.marPcs.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "marCoeff",
          width: 40,
          align: "right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.marCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
    
        {
          // title: `In PCs`,
          dataIndex: "aprPcs",
          width: 40,
          align: "right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.aprPcs.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "aprCoeff",
          width: 40,
          align: "right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.aprPcs.toLocaleString()}</span> || "-"
            );
          },
        },
        //   ],
        // },
        // {
        // title: "May",
        //   dataIndex: "oldOrderQtyPcs5",
        //   key: "oldOrderQtyPcs5",
        //   children: [
        {
          // title: `In PCs`,
          dataIndex: "mayPcs",
          width: 40,
          align: "right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.mayPcs.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "mayCoeff",
          width:40,
          align: "right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.mayCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
        //   ],
        // },
        // {
        // title: "June",
        //   dataIndex: "oldOrderQtyPcs6",
        //   key: "oldOrderQtyPcs6",
        //   children: [
        {
          // title: `In PCs`,
          dataIndex: "junPcs",
          width: 40,
          align: "right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.junPcs.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "junCoeff",
          width: 40,
          align: "right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.junCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
        //   ],
        // },
        // {
        // title: "July",
        //   dataIndex: "oldOrderQtyPcs7",
        //   key: "oldOrderQtyPcs7",
        //   children: [
        {
          // title: `In PCs`,
          dataIndex: "julPcs",
          width: 50,
          align: "right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.julPcs.toLocaleString()}</span> || "-"
            )
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "julCoeff",
          width: 40,
          align: "right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.julCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
        //   ],
        // },
        // {
        // title: "August",
        //   dataIndex: "oldOrderQtyPcs8",
        //   key: "oldOrderQtyPcs8",
        //   children: [
        {
          // title: `In PCs`,
          dataIndex: "augPcs",
          width: 40,
          align: "right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.augPcs.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "augCoeff",
          width: 40,
          align: "right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.augCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
        //   ],
        // },
        // {
        // title: "September",
        //   dataIndex: "oldOrderQtyPcs9",
        //   key: "oldOrderQtyPcs9",
        //   children: [
        {
          // title: `In PCs`,
          dataIndex: "sepPcs",
          width: 50,
          align: "right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.sepPcs.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "sepCoeff",
          width: 40,
          align: "right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.sepCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
        //   ],
        // },
        // {
        // title: "October",
        //   dataIndex: "oldOrderQtyPcs10",
        //   key: "oldOrderQtyPcs10",
        //   children: [
        {
          // title: `In PCs`,
          dataIndex: "octPcs",
          width: 40,
          align: "right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.octPcs.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "octCoeff",
          width: 40,
          align: "right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.octCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
        //   ],
        // },
        // {
        // title: "November",
        //   dataIndex: "oldOrderQtyPcs11",
        //   key: "oldOrderQtyPcs11",
        //   children: [
        {
          // title: `In PCs`,
          dataIndex: "novPcs",
          width: 50,
          align: "right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.novPcs.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "novCoeff",
          width: 50,
          align: "right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.novCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
        //   ],
        // },
        // {
        // title: "December",
        //   dataIndex: "oldOrderQtyPcs12",
        //   key: "oldOrderQtyPcs12",
        //   children: [
        {
          // title: `In PCs`,
          dataIndex: "decPcs",
          width: 50,
          align: "right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.decPcs.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "decCoeff",
          width: 50,
          align: "right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.decCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
        //   ],
        // },
        {
          // title: "Total In PCs",
          dataIndex: "totalPcs",
          align: "right",
          width: 80,
          render: (text: any, record: any) => {
            return record.totalPcs ? record.totalPcs.toLocaleString() : 0;
          },
        },
        {
          // title: "Total In Coeff",
          dataIndex: "totalCoeff",
          align: "right",
          width: 80,
    
          render: (text: any, record: any) => {
            return record.totalCoeff ? record.totalCoeff.toLocaleString() : 0;
          },
        },
      ];
      const columns5: any = [
        {
          title: 'S.No',
          key: 'sno',
          responsive: ['sm'],
          render: (text, object, index) => (page - 1) * 10 + (index + 1)

      },
        // {
        //   title: "Item code",
        //   dataIndex: "itemCode",
        //   // ...getColumnSearchProps('itemCode')
        // },
        {
          title: "Item Name",
          dataIndex: "itemName",
          render: (text: any, record: any) => <span>{record.itemName}</span>,
          // ...getColumnSearchProps('itemName')
        },
        {
          title: <CustomTitle />,
          dataIndex: "monthWiseData",
          align: "center",
          render: (text: any, record: any) => (
            
            <Table
            showHeader={false}
            bordered={false}
              dataSource={record.monthWiseData}
              columns={childColumns1}
              pagination={false} 
              rowKey={(record) => record.itemName}
            />
          ),
        },
      ];

      let columnsphase:any[]=[];
      if(selected == 'ExFactory'){
        columnsphase.push(
          {
            
              title: "S No",
              key: "sno",
              render: (text, object, index) => (page - 1) * pageSize + (index + 1),
            
          },
          { title: "Production Plan Type Name",dataIndex: "prod_plan_type",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightgreen' }}>Jan In Pre</span>,dataIndex: "janExfPre",},
          {title: <span style={{ background: 'lightgreen' }}>Jan In Lat</span>,dataIndex: "janExfLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightblue' }}>Feb In Pre</span>,dataIndex: "febExfPre",},
          {title: <span style={{ background: 'lightblue' }}>Feb In Lat</span>,dataIndex: "febExfLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightgreen' }}>Mar In Pre</span>,dataIndex: "marExfPre",},
          {title: <span style={{ background: 'lightgreen' }}>Mar In Lat</span>,dataIndex: "marExfLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title:<span style={{ background: 'lightblue' }}>Apr In Pre</span>,dataIndex: "aprExfPre",},
          {title:<span style={{ background: 'lightblue' }}>Apr In Lat</span>,dataIndex: "aprExfLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightgreen' }}>May In Pre</span>,dataIndex: "mayExfPre",},
          {title: <span style={{ background: 'lightgreen' }}>May In Lat</span>,dataIndex: "mayExfLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightblue' }}>Jun In Pre</span>,dataIndex: "junExfPre",},
          {title:<span style={{ background: 'lightblue' }}>Jun In Lat</span>,dataIndex: "junExfLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightgreen' }}>Jul In Pre</span>,dataIndex: "julExfPre",},
          {title: <span style={{ background: 'lightgreen' }}>Jul In Lat</span>,dataIndex: "julExfLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightblue' }}>Aug In Pre</span>,dataIndex: "augExfPre",},
          {title:<span style={{ background: 'lightblue' }}>Aug In Lat</span>,dataIndex: "augExfLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightgreen' }}>Sep In Pre</span>,dataIndex: "sepExfPre",},
          {title:<span style={{ background: 'lightgreen' }}>Sep In Lat</span>,dataIndex: "sepExfLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightblue' }}>Oct In Pre</span>,dataIndex: "octExfPre",},
          {title: <span style={{ background: 'lightblue' }}>Oct In Lat</span>,dataIndex: "octExfLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightgreen' }}>Nov In Pre</span>,dataIndex: "novExfPre",},
          {title: <span style={{ background: 'lightgreen' }}>Nov In Lat</span>,dataIndex: "novExfLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title:<span style={{ background: 'lightblue' }}>Dec In Pre</span>,dataIndex: "decExfPre",},
          {title: <span style={{ background: 'lightblue' }}>Dec In Lat</span>,dataIndex: "decExfLat",},
        
          {title:  <span style={{ background: 'lightblue' }}> Total In Pcs</span>,dataIndex: "totalExfPre",align:"right"},
      {title:  <span style={{ background: 'lightgreen' }}> Total In Coeff</span>,dataIndex: "totalExfLat",align:"right"},
      {title: ``,dataIndex: "",},
      {title: ``,dataIndex: "",},
        )
      }
      if(selected === 'WareHouse'){
        columnsphase.push(
          { title: "Item Name", dataIndex: "item" },
          { title: "Production Plan Type Name",dataIndex: "prod_plan_type",},
          {title: ``,dataIndex: "",},
          {title:<span style={{ background: 'lightgreen' }}>Jan In Pre</span>,dataIndex: "janWhPre",},
          {title: <span style={{ background: 'lightgreen' }}>Jan In Pre</span>,dataIndex: "janWhLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightblue' }}>Feb In Pre</span>,dataIndex: "febWhPre",},
          {title:<span style={{ background: 'lightblue' }}>Feb In Lat</span>,dataIndex: "febWhLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightgreen' }}>Mar In Pre</span>,dataIndex: "marWhPre",},
          {title: <span style={{ background: 'lightgreen' }}>Mar In Lat</span>,dataIndex: "marWhLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightblue' }}>APr In Pre</span>,dataIndex: "aprWhPre",},
          {title:<span style={{ background: 'lightblue' }}>APr In Lat</span>,dataIndex: "aprWhLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightgreen' }}>May In Pre</span>,dataIndex: "mayWhPre",},
          {title: <span style={{ background: 'lightgreen' }}>May In Lat</span>,dataIndex: "mayWhLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title:<span style={{ background: 'lightblue' }}>Jun In Pre</span>,dataIndex: "junWhPre",},
          {title: <span style={{ background: 'lightblue' }}>Jun In Lat</span>,dataIndex: "junWhLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightgreen' }}>Jul In Pre</span>,dataIndex: "julWhPre",},
          {title:<span style={{ background: 'lightgreen' }}>Jul In Lat</span>,dataIndex: "julWhLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightblue' }}>Aug In Pre</span>,dataIndex: "augWhPre",},
          {title: <span style={{ background: 'lightblue' }}>Aug In Lat</span>,dataIndex: "augWhLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title:<span style={{ background: 'lightgreen' }}>Sep In Pre</span>,dataIndex: "sepWhPre",},
          {title: <span style={{ background: 'lightgreen' }}>Sep In Lat</span>,dataIndex: "sepWhLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightblue' }}>Oct In Pre</span>,dataIndex: "octWhPre",},
          {title: <span style={{ background: 'lightblue' }}>Oct In Lat</span>,dataIndex: "octWhLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightgreen' }}>Nov In Pre</span>,dataIndex: "novWhPre",},
          {title:<span style={{ background: 'lightgreen' }}>Nov In Lat</span>,dataIndex: "novWhLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
          {title: <span style={{ background: 'lightblue' }}>Dec In Pre</span>,dataIndex: "decWhPre",},
          {title: <span style={{ background: 'lightblue' }}>Dec In Lat</span>,dataIndex: "decWhLat",},
          {title: ``,dataIndex: "",},
          {title: ``,dataIndex: "",},
    {title:  <span style={{ background: 'lightblue' }}> Total In Pcs</span>,dataIndex: "totalWhPre",align:"right"},
    {title:  <span style={{ background: 'lightgreen' }}> Total In Coeff</span>,dataIndex: "totalWhLat",align:"right"},
    {title: ``,dataIndex: "",},
    {title: ``,dataIndex: "",},
          
        )
    }
      const handleExport = (e: any) => {
        e.preventDefault(); 
        const currentDate = new Date()
          .toISOString()
          .slice(0, 10)
          .split("-")
          .join("/");
    
        const excel = new Excel();
        excel.addSheet(tab.toString()); 
        let exportingColumns: IExcelColumn[] = [];
    
        if(selected =='ExFactory'){
            
        exportingColumns.push(
            { title: "Item Name", dataIndex: "item" },
            { title: "Production Plan Type Name",dataIndex: "prod_plan_type",},
            {title: `Jan Pre`,dataIndex: "janExfPre",},
            {title: `Jan Lat`,dataIndex: "janExfLat",},
            {title: `Feb Pre`,dataIndex: "febExfPre",},
            {title: `Feb Lat`,dataIndex: "febExfLat",},
            {title: `Mar Pre`,dataIndex: "marExfPre",},
            {title: `Mar Lat`,dataIndex: "marExfLat",},
            {title: `Apr Pre`,dataIndex: "aprExfPre",},
            {title: `Apr Lat`,dataIndex: "aprExfLat",},
            {title: `May Pre`,dataIndex: "mayExfPre",},
            {title: `May Lat`,dataIndex: "mayExfLat",},
            {title: `Jun Pre`,dataIndex: "junExfPre",},
            {title: `Jun Lat`,dataIndex: "junExfLat",},
            {title: `Jul Pre`,dataIndex: "julExfPre",},
            {title: `Jul Lat`,dataIndex: "julExfLat",},
            {title: `Aug Pre`,dataIndex: "augExfPre",},
            {title: `Aug Lat`,dataIndex: "augExfLat",},
            {title: `Sep Pre`,dataIndex: "sepExfPre",},
            {title: `Sep Lat`,dataIndex: "sepExfLat",},
            {title: `Oct Pre`,dataIndex: "octExfPre",},
            {title: `Oct Lat`,dataIndex: "octExfLat",},
            {title: `Nov Pre`,dataIndex: "novExfPre",},
            {title: `Nov Lat`,dataIndex: "novExfLat",},
            {title: `Dec Pre`,dataIndex: "decExfPre",},
            {title: `Dec Lat`,dataIndex: "decExfLat",},
            {title: `Total Pre`,dataIndex: "totalExfPre",},
            {title: `Total Lat`,dataIndex: "totalExfLat",}
          
        )
    }
    if(selected === 'WareHouse'){
        exportingColumns.push(
          { title: "Item Name", dataIndex: "item" },
          { title: "Production Plan Type Name",dataIndex: "prod_plan_type",},
          {title: `Jan Pre`,dataIndex: "janWhPre",},
          {title: `Jan Lat`,dataIndex: "janWhLat",},
          {title: `Feb Pre`,dataIndex: "febWhPre",},
          {title: `Feb Lat`,dataIndex: "febWhLat",},
          {title: `Mar Pre`,dataIndex: "marWhPre",},
          {title: `Mar Lat`,dataIndex: "marWhLat",},
          {title: `Apr Pre`,dataIndex: "aprWhPre",},
          {title: `Apr Lat`,dataIndex: "aprWhLat",},
          {title: `May Pre`,dataIndex: "mayWhPre",},
          {title: `May Lat`,dataIndex: "mayWhLat",},
          {title: `Jun Pre`,dataIndex: "junWhPre",},
          {title: `Jun Lat`,dataIndex: "junWhLat",},
          {title: `Jul Pre`,dataIndex: "julWhPre",},
          {title: `Jul Lat`,dataIndex: "julWhLat",},
          {title: `Aug Pre`,dataIndex: "augWhPre",},
          {title: `Aug Lat`,dataIndex: "augWhLat",},
          {title: `Sep Pre`,dataIndex: "sepWhPre",},
          {title: `Sep Lat`,dataIndex: "sepWhLat",},
          {title: `Oct Pre`,dataIndex: "octWhPre",},
          {title: `Oct Lat`,dataIndex: "octWhLat",},
          {title: `Nov Pre`,dataIndex: "novWhPre",},
          {title: `Nov Lat`,dataIndex: "novWhLat",},
          {title: `Dec Pre`,dataIndex: "decWhPre",},
          {title: `Dec Lat`,dataIndex: "decWhLat",},
          {title: `Total Pre`,dataIndex: "totalWhPre",},
          {title: `Total Lat`,dataIndex: "totalWhLat",}
          
        )
    }
    let totalJanExfPre = 0;
    let totalJanExfLat = 0;
    let totalFebExfPre = 0;
    let totalFebExfLat = 0; 
    let totalMarExfPre = 0;
    let totalMarExfLat = 0;
    let totalAprExfPre = 0;
    let totalAprExfLat = 0;
    let totalMayExfPre = 0;
    let totalMayExfLat = 0;
    let totalJunExfPre = 0;
    let totalJunExfLat = 0;
    let totalJulExfPre = 0;
    let totalJulExfLat = 0;
    let totalAugExfPre = 0;
    let totalAugExfLat = 0;
    let totalSepExfPre = 0;
    let totalSepExfLat = 0;
    let totalOctExfPre = 0;
    let totalOctExfLat = 0;
    let totalNovExfPre = 0;
    let totalNovExfLat = 0;
    let totalDecExfPre = 0;
    let totalDecExfLat = 0;
    let totalExfPre = 0;
    let totalExfLat = 0;
    let totalJanWhPre = 0;
    let totalJanWhLat = 0;
    let totalFebWhPre = 0;
    let totalFebWhLat = 0; 
    let totalMarWhPre = 0;
    let totalMarWhLat = 0;
    let totalAprWhPre = 0;
    let totalAprWhLat = 0;
    let totalMayWhPre = 0;
    let totalMayWhLat = 0;
    let totalJunWhPre = 0;
    let totalJunWhLat = 0;
    let totalJulWhPre = 0;
    let totalJulWhLat = 0;
    let totalAugWhPre = 0;
    let totalAugWhLat = 0;
    let totalSepWhPre = 0;
    let totalSepWhLat = 0;
    let totalOctWhPre = 0;
    let totalOctWhLat = 0;
    let totalNovWhPre = 0;
    let totalNovWhLat = 0;
    let totalDecWhPre = 0;
    let totalDecWhLat = 0;
    let totalWhPre = 0;
    let totalWhLat = 0;
      excelsData.forEach((row) => {
        totalJanExfPre += Number(row.janExfPre) || 0;
        totalJanExfLat += Number(row.janExfLat) || 0;
        totalFebExfPre += Number(row.febExfPre) || 0;
        totalFebExfLat += Number(row.febExfLat) || 0;
        totalMarExfPre += Number(row.marExfPre) || 0;
        totalMarExfLat += Number(row.marExfLat) || 0;
        totalAprExfPre += Number(row.aprExfPre) || 0;
        totalAprExfLat += Number(row.aprExfLat) || 0;
        totalMayExfPre += Number(row.mayExfPre) || 0;
        totalMayExfLat += Number(row.mayExfLat) || 0;
        totalJunExfPre += Number(row.junExfPre) || 0;
        totalJunExfLat += Number(row.junExfLat) || 0;
        totalJulExfPre += Number(row.julExfPre) || 0;
        totalJulExfLat += Number(row.julExfLat) || 0;
        totalAugExfPre += Number(row.augExfPre) || 0;
        totalAugExfLat += Number(row.augExfLat) || 0;
        totalSepExfPre += Number(row.sepExfPre) || 0;
        totalSepExfLat += Number(row.sepExfLat) || 0;  
        totalOctExfPre += Number(row.octExfPre) || 0;
        totalOctExfLat += Number(row.octExfLat) || 0;
        totalNovExfPre += Number(row.novExfPre) || 0;
        totalNovExfLat += Number(row.novExfLat) || 0;
        totalDecExfPre += Number(row.decExfPre) || 0;
        totalDecExfLat += Number(row.decExfLat) || 0;
        totalExfPre += Number(row.totalExfPre) || 0;
        totalExfLat += Number(row.totalExfLat) || 0;
        totalJanWhPre += Number(row.janWhPre) || 0;
        totalJanWhLat += Number(row.janWhLat) || 0;
        totalFebWhPre += Number(row.febWhPre) || 0;
        totalFebWhLat += Number(row.febWhLat) || 0;
        totalMarWhPre += Number(row.marWhPre) || 0;
        totalMarWhLat += Number(row.marWhLat) || 0;
        totalAprWhPre += Number(row.aprWhPre) || 0;
        totalAprWhLat += Number(row.aprWhLat) || 0;
        totalMayWhPre += Number(row.mayWhPre) || 0;
        totalMayWhLat += Number(row.mayWhLat) || 0;
        totalJunWhPre += Number(row.junWhPre) || 0;
        totalJunWhLat += Number(row.junWhLat) || 0;
        totalJulWhPre += Number(row.julWhPre) || 0;
        totalJulWhLat += Number(row.julWhLat) || 0;
        totalAugWhPre += Number(row.augWhPre) || 0;
        totalAugWhLat += Number(row.augWhLat) || 0;
        totalSepWhPre += Number(row.sepWhPre) || 0;
        totalSepWhLat += Number(row.sepWhLat) || 0;  
        totalOctWhPre += Number(row.octWhPre) || 0;
        totalOctWhLat += Number(row.octWhLat) || 0;
        totalNovWhPre += Number(row.novWhPre) || 0;
        totalNovWhLat += Number(row.novWhLat) || 0;
        totalDecWhPre += Number(row.decWhPre) || 0;
        totalDecWhLat += Number(row.decWhLat) || 0;
        totalWhPre += Number(row.totalWhPre) || 0;
        totalWhLat += Number(row.totalWhLat) || 0;
    });

   const totalsPcsRow = {
        item: "Total",
        prod_plan_type: "", 
        janExfPre: totalJanExfPre,
        janExfLat: totalJanExfLat,
        febExfPre: totalFebExfPre,
        febExfLat: totalFebExfLat,
        marExfPre: totalMarExfPre,
        marExfLat: totalMarExfLat, 
        aprExfPre: totalAprExfPre,
        aprExfLat: totalAprExfLat,
         mayFxfPre: totalMayExfPre,
        mayFxfLat: totalMayExfLat, 
        junExfPre: totalJunExfPre,
        junExfLat: totalJunExfLat, 
        julExfPre: totalJulExfPre,
        julExfLat: totalJulExfLat, 
        augExfPre: totalAugExfPre,
        augExfLat: totalAugExfLat,
         sepExfPre: totalSepExfPre,
        sepExfLat: totalSepExfLat, 
        octExfPre: totalOctExfPre,
        octExfLat: totalOctExfLat, 
        novExfPre: totalNovExfPre,
        novExfLat: totalNovExfLat, 
        decExfPre: totalDecExfPre,
        decExfLat: totalDecExfLat,
        totalExfPre: totalExfPre,
        totalExfLat: totalExfLat,
    }
    const totalsCoeffRow = {
      item: "Total",
      prod_plan_type: "", 
      janWhPre: totalJanWhPre,
      janWhLat: totalJanWhLat,
      febWhPre: totalFebWhPre,
      febWhLat: totalFebWhLat,
      marWhPre: totalMarWhPre,
      marWhLat: totalMarWhLat, 
      aprWhPre: totalAprWhPre,
      aprWhLat: totalAprWhLat,
       mayWhPre: totalMayWhPre,
      mayWhLat: totalMayWhLat, 
      junWhPre: totalJunWhPre,
      junWhLat: totalJunWhLat, 
      julWhPre: totalJulWhPre,
      julWhLat: totalJulWhLat, 
      augWhPre: totalAugWhPre,
      augWhLat: totalAugWhLat,
       sepWhPre: totalSepWhPre,
      sepWhLat: totalSepWhLat, 
      octWhPre: totalOctWhPre,
      octWhLat: totalOctWhLat, 
      novWhPre: totalNovWhPre,
      novWhLat: totalNovWhLat, 
      decWhPre: totalDecWhPre,
      decWhLat: totalDecWhLat,
      totalWhPre: totalWhPre,
      totalWhLat: totalWhLat,
  }
  if(selected =='ExFactory'){   
     excelsData.push(totalsPcsRow);
  }
  if(selected == 'WareHouse'){
    excelsData.push(totalsCoeffRow)
  }

        excel.addColumns(exportingColumns);
        excel.addDataSource(excelsData);
        let secondTableColumns: IExcelColumn[] = [];
    if(selected =='ExFactory'){
      console.log('exfactory');
      
      secondTableColumns.push(
      { title: "Production Plan Type Name",dataIndex: "prod_plan_type",},
      {title: `Jan Pre`,dataIndex: "janExfPre",},
      {title: `Jan Lat`,dataIndex: "janExfLat",},
      {title: `Feb Pre`,dataIndex: "febExfPre",},
      {title: `Feb Lat`,dataIndex: "febExfLat",},
      {title: `Mar Pre`,dataIndex: "marExfPre",},
      {title: `Mar Lat`,dataIndex: "marExfLat",},
      {title: `Apr Pre`,dataIndex: "aprExfPre",},
      {title: `Apr Lat`,dataIndex: "aprExfLat",},
      {title: `May Pre`,dataIndex: "mayExfPre",},
      {title: `May Lat`,dataIndex: "mayExfLat",},
      {title: `Jun Pre`,dataIndex: "junExfPre",},
      {title: `Jun Lat`,dataIndex: "junExfLat",},
      {title: `Jul Pre`,dataIndex: "julExfPre",},
      {title: `Jul Lat`,dataIndex: "julExfLat",},
      {title: `Aug Pre`,dataIndex: "augExfPre",},
      {title: `Aug Lat`,dataIndex: "augExfLat",},
      {title: `Sep Pre`,dataIndex: "sepExfPre",},
      {title: `Sep Lat`,dataIndex: "sepExfLat",},
      {title: `Oct Pre`,dataIndex: "octExfPre",},
      {title: `Oct Lat`,dataIndex: "octExfLat",},
      {title: `Nov Pre`,dataIndex: "novExfPre",},
      {title: `Nov Lat`,dataIndex: "novExfLat",},
      {title: `Dec Pre`,dataIndex: "decExfPre",},
      {title: `Dec Lat`,dataIndex: "decExfLat",},
     
      {title: `Total In Pcs`,dataIndex: "totalExfPre"},
      {title:  `Total In Coeff`,dataIndex: "totalExfLat"},
  )
}
if(selected === 'WareHouse'){
  secondTableColumns.push(
    { title: "Production Plan Type Name",dataIndex: "prod_plan_type",},
    {title: `Jan Pre`,dataIndex: "janWhPre",},
    {title: `Jan Lat`,dataIndex: "janWhLat",},
    {title: `Feb Pre`,dataIndex: "febWhPre",},
    {title: `Feb Lat`,dataIndex: "febWhLat",},
    {title: `Mar Pre`,dataIndex: "marWhPre",},
    {title: `Mar Lat`,dataIndex: "marWhLat",},
    {title: `Apr Pre`,dataIndex: "aprWhPre",},
    {title: `Apr Lat`,dataIndex: "aprWhLat",},
    {title: `May Pre`,dataIndex: "mayWhPre",},
    {title: `May Lat`,dataIndex: "mayWhLat",},
    {title: `Jun Pre`,dataIndex: "junWhPre",},
    {title: `Jun Lat`,dataIndex: "junWhLat",},
    {title: `Jul Pre`,dataIndex: "julWhPre",},
    {title: `Jul Lat`,dataIndex: "julWhLat",},
    {title: `Aug Pre`,dataIndex: "augWhPre",},
    {title: `Aug Lat`,dataIndex: "augWhLat",},
    {title: `Sep Pre`,dataIndex: "sepWhPre",},
    {title: `Sep Lat`,dataIndex: "sepWhLat",},
    {title: `Oct Pre`,dataIndex: "octWhPre",},
    {title: `Oct Lat`,dataIndex: "octWhLat",},
    {title: `Nov Pre`,dataIndex: "novWhPre",},
    {title: `Nov Lat`,dataIndex: "novWhLat",},
    {title: `Dec Pre`,dataIndex: "decWhPre",},
    {title: `Dec Lat`,dataIndex: "decWhLat",},
    {title: `Total In Pcs`,dataIndex: "totalWhPre"},
    {title:  `Total In Coeff`,dataIndex: "totalWhLat"},
  )
}

  excel.addColumns(secondTableColumns);
  excel.addDataSource(phaseExcel)
  excel.addRow();
  if(selected =='ExFactory'){ 
    excel.saveAs(`Ex-Factory-comparision-report-${currentDate}.xlsx`);
}
if(selected == 'WareHouse'){
  excel.saveAs(`Ware-House-comparision-report-${currentDate}.xlsx`);
}       
      };
      const handleTabChange = (selectedYear: string) => {
        setTab(Number(selectedYear));
        getData(selected);
      };
      const getFilterdData = () => {
        let ItemName = form.getFieldValue("ItemName");
    
        let filteredData = data;
    
        if (ItemName) {
          filteredData = filteredData.filter(
            (record) => record.itemName === ItemName
          );
          if (filteredData.length === 0) {
            message.error("No Data Found");
          }
          setFilteredData(filteredData);
        }
      };
      const onReset = () => {
        form.resetFields();
        getData(selected);
      };
    
      const getTableSummary = (pageData) => {
        
        let janPre = 0;
        let janLat = 0;
        let febPre = 0;
        let febLat = 0;
        let marPre = 0;
        let marLat = 0;
        let aprPre = 0;
        let aprLat = 0;
        let mayPre = 0;
        let mayLat = 0;
        let junPre = 0;
        let junLat = 0;
        let julPre = 0;
        let julLat = 0;
        let augPre = 0;
        let augLat = 0;
        let sepPre = 0;
        let sepLat = 0;
        let octPre = 0;
        let octLat = 0;
        let novPre = 0;
        let novLat = 0;
        let decPre = 0;
        let decLat = 0;
        let totalPre = 0;
        let totalLat = 0;
    
        pageData.forEach((e) => {
          e.monthWiseData.forEach((rec) => {
            
            if (rec.pcsData[0].janPcs) {
              
              const jan = [rec.pcsData[0].janPcs];
              janPre += Number(jan);
              
            }
            if (rec.pcsData[0].febPcs) {
              const feb = [rec.pcsData[0].febPcs];
              febPre += Number(feb);
            }
            if (rec.pcsData[0].marPcs) {
              const mar = [rec.pcsData[0].marPcs];
              marPre += Number(mar);
            }
            if (rec.pcsData[0].aprPcs) {
              const apr = [rec.pcsData[0].aprPcs];
              aprPre += Number(apr);
            }
            if (rec.pcsData[0].mayPcs) {
              const may = [rec.pcsData[0].mayPcs];
              mayPre += Number(may);
            }
            if (rec.pcsData[0].junPcs) {
              const jun = [rec.pcsData[0].junPcs];
              junPre += Number(jun);
            }
            if (rec.pcsData[0].julPcs) {
              const jul = [rec.pcsData[0].julPcs];
              julPre += Number(jul);
            }
            if (rec.pcsData[0].augPcs) {
              const aug = [rec.pcsData[0].augPcs];
              augPre += Number(aug);
            }
            if (rec.pcsData[0].sepPcs) {
              const sep = [rec.pcsData[0].sepPcs];
              sepPre += Number(sep);
            }
            if (rec.pcsData[0].octPcs) {
              const oct = [rec.pcsData[0].octPcs];
              octPre += Number(oct);
            }
            if (rec.pcsData[0].novPcs) {
              const nov = [rec.pcsData[0].novPcs];
              novPre += Number(nov);
            }
            if (rec.pcsData[0].decPcs) {
              const dec = [rec.pcsData[0].decPcs];
              decPre += Number(dec);
            }
            if (rec.pcsData[0].jancoeff) {
              const jan = [rec.coeffData[0].janCoeff];
              janLat += Number(jan);
            }
            if (rec.coeffData[0].febCoeff) {
              const feb = [rec.coeffData[0].febCoeff];
              febLat += Number(feb);
            }
            if (rec.coeffData[0].marCoeff) {
              const mar = [rec.coeffData[0].marCoeff];
              marLat += Number(mar);
            }
            if (rec.coeffData[0].aprCoeff) {
              const apr = [rec.coeffData[0].aprCoeff];
              aprLat += Number(apr);
            }
            if (rec.coeffData[0].mayCoeff) {
              const may = [rec.coeffData[0].mayCoeff];
              mayLat += Number(may);
            }
            if (rec.coeffData[0].junCoeff) {
              const jun = [rec.coeffData[0].junCoeff];
              junLat += Number(jun);
            }
            if (rec.coeffData[0].julCoeff) {
              const jul = [rec.coeffData[0].julCoeff];
              julLat += Number(jul);
            }
            if (rec.coeffData[0].augCoeff) {
              const aug = [rec.coeffData[0].augCoeff];
              augLat += Number(aug);
            }
            if (rec.coeffData[0].sepCoeff) {
              const sep = [rec.coeffData[0].sepCoeff];
              sepLat += Number(sep);
            }
            if (rec.coeffData[0].octCoeff) {
              const oct = [rec.coeffData[0].octCoeff];
              octLat += Number(oct);
            }
            if (rec.coeffData[0].novCoeff) {
              const nov = [rec.coeffData[0].novCoeff];
              novLat += Number(nov);
            }
            if (rec.coeffData[0].decCoeff) {
              const dec = [rec.coeffData[0].decCoeff];
              decLat += Number(dec);
            }
            if (rec.totalPcs) {
              const pcs = [rec.totalPcs];
              totalPre += Number(pcs);
            }
            if (rec.totalCoeff) {
              const coeff = [rec.totalCoeff];
              totalLat += Number(coeff);
            }
          });
        });
    
        return (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}></Table.Summary.Cell>
              <Table.Summary.Cell index={1}>Total</Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                <div>
                  <Space></Space>
                  <Space>
                    <span /> 
                    <span /><span /> 
                    <span />
                    <span /> 
                    <span />
                    <span /> 
                    <span />
                    <span />
                    <span />
                    <span />
                    <span /> 
                    <span />
                    <span /> 
                    <span />
                    <span /> 
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                   
                    {janPre.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span /> {janLat.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    {febPre.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    {febLat.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                   
                    {marPre.toLocaleString()}
                    <span />
                    <span /> 
                    <span />
                    <span />
                    <span />
                    <span />
                   

                    {marLat.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                   
                    
                    


                    {aprPre.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    {aprLat.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    {mayPre.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    {mayLat.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                  
                    {junPre.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    
                    {julLat.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    
                    {julPre.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span /> {julLat.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    {augPre.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    {augLat.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    {sepPre.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    {sepLat.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    {octPre.toLocaleString()}
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />

                    {octLat.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />

                    {novPre.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    

                    {novLat.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />

                    {decPre.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  
                    <span />

                    {decLat.toLocaleString()}
                    <span />
                    <span />
                    <span />
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />


                    {totalPre.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span /><span />
                    <span />
                    <span />
                    <span />

                    {totalLat.toLocaleString()}
                  </Space>
                </div>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        );
      };
    return(
       
        <Card>
              <Form form={form} layout={"vertical"}>
        <Row gutter={24}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 6 }}
          >
            <div>
              <label>
               Comparision Parameters
              </label>
              <Form.Item name="Label" initialValue={'ExFactory'}>
                <Select
                  showSearch
                  placeholder="Select "
                  optionFilterProp="children"
                  allowClear
                  onChange={handleChange}
               defaultValue={'ExFactory'}
                >
                  <Option key={'ExFactory'} value={'ExFactory'}>Ex-Factory</Option>
                  <Option key={'WareHouse'} value={'WareHouse'}>WareHouse</Option>
                 </Select>
              </Form.Item>
            </div>
          </Col>
          <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 5 }}
                  lg={{ span: 5 }}
                  xl={{ span: 6 }}
                  style={{ marginTop: 17 }}
                >
                  <Card
                    
                    style={{
                      textAlign: "center",
                    //   width: 150,
                    //   height: 35,
                      borderRadius: 8,
                      backgroundColor: "#EBEBF1",
                    }}
                    size="small"
                  ><span>Latest File uploaded Date: {dates?.[0]?.Date? moment(dates?.[0]?.Date).format("DD/MM hh:mm:a"): "-"}</span></Card>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 5 }}
                  lg={{ span: 5 }}
                  xl={{ span: 6 }}
                  style={{ marginTop: 17 }}
                >
                  <Card
                    
                    style={{
                      textAlign: "center",
                    //   width: 150,
                    //   height: 35,
                      borderRadius: 8,
                      backgroundColor: "#EBEBF1",
                    }}
                    size="small"
                  ><span>Previous File uploaded Date: {dates?.[1]?.Date? moment(dates?.[1]?.Date).format("DD/MM hh:mm:a"): "-"}</span></Card>
                </Col>
              </Row>
          </Form>
          {selected && data.length > 0 ?(
          <Tabs type="card" onChange={handleTabChange} aria-disabled>
          {year.map((e) => (
            <Tabs.TabPane tab={`${e.year}`} key={e.year}>
              <Form form={form} layout={"vertical"}>
                <Row gutter={24}>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 6 }}
                    lg={{ span: 6 }}
                    xl={{ span: 6 }}
                  >
                    <div>
                      <label>Item Name</label>
                      <Form.Item name="ItemName">
                        <Select
                          showSearch
                          placeholder="Select Item Name"
                          optionFilterProp="children"
                          allowClear
                        >
                          {data.map((e) => (
                            <Option key={e.itemName} value={e.itemName}>
                              {e.itemName}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </Col>
  
                          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 6 }} style={{ marginTop: 17 }} >
                              <Button
                                  type="primary"
                                  icon={<SearchOutlined />}
                                  style={{ marginRight: 50, width: 80 }}
                                  htmlType="button"
                                  onClick={getFilterdData}>Search</Button>
                              <Button
                                  type="primary"
                                  icon={<UndoOutlined />}
                                  htmlType="submit"
                                  onClick={onReset}>Reset</Button>
                          </Col>
                          <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 5 }}
                  lg={{ span: 5 }}
                  xl={{ span: 6 }}
                  style={{ marginTop: 17 }}
                >
                  <Button
                    type="default"
                    style={{ color: "green" }}
                    onClick={handleExport}
                    icon={<FileExcelFilled />}
                  >
                    Download Excel
                  </Button>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 5 }}
                  lg={{ span: 5 }}
                  xl={{ span: 6 }}
                  style={{ marginTop: 17 }}
                >
                  <Card
                    title={"Total Items : " + data.length}
                    style={{
                      textAlign: "center",
                      width: 150,
                      height: 35,
                      borderRadius: 8,
                      backgroundColor: "#EBEBF1",
                    }}
                    size="small"
                  ></Card>
                </Col>
              
                      </Row>
                  </Form>
          <Table
          bordered={false}
          // showHeader={false}
            dataSource={filteredData} 
            columns={columns5} 
            size="small"
            scroll={{ x: "max-content" }}
            summary={getTableSummary}
            pagination={{
              onChange(current) {
                setPage(current);
              }
            }}
          

          />
          <Table
         columns={columnsphase} 
         dataSource={phaseExcel}
            size="small"
        scroll={{ x: "max-content" }}/>
          
        </Tabs.TabPane>
      ))}
    </Tabs>
  ):(
  <> 
    <Row>
       <Alert
       message="No data"
       type="info"
       style={{ margin: "auto",width:500 }}
       showIcon
     />
     </Row>
     </>) }
        </Card>
    )
}
export default MonthWiseComparisionReport