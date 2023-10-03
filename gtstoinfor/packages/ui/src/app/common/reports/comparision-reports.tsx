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

export const MonthWiseComparisionReport = () =>{
    const [form] = Form.useForm();
    const { Option } = Select;
    const [selected, setSelected] = useState('ExFactory')
    const [data, setData] = useState<any[]>([]);
    const [phase, setPhase] = useState<any[]>([]);
    const [year, setYear] = useState<any[]>([]);
    const [tab, setTab] = useState<number>(2023);
    const service = new OrdersService();
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [excelData, setExcelData] = useState<any[]>([]);
    const [dates, setDates] = useState<any[]>([]);
    const { Text } = Typography;
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    useEffect(() => {
        getData(selected);
        getTabs();
      }, []);
     
      const pagination = {
        current: page,
        pageSize: pageSize,
        total: filteredData.length,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        onChange: (current, pageSize) => {
          setPage(current);
          setPageSize(pageSize);
        },
        showSizeChanger: true,
        onShowSizeChange: (current, size) => {
          setPage(1); // Reset the page to 1 when changing page size
          setPageSize(size);
        },
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
      };
      const CustomTitle = () => {
        return (
          <div>
          
    
    <table>
      <tr >
      {/* <th style={{position: 'relative',paddingRight: '1200px'}}>Production Plan Type Name</th> */}
      <th colSpan={2} style={{ position: 'relative', right: '-110px' , }}>January</th>
        <th colSpan={2} style={{ position: 'relative', right: '-30px', borderLeft: '1px solid black',borderRight: '1px solid black', }}>Febuary</th><br/>
        <th colSpan={2}style={{ position: 'relative', right: '50px' ,borderRight: '1px solid black', }}>March</th><br/>
        <th colSpan={2} style={{ position: 'relative', right: '150px', borderRight: '1px solid black', }}>April</th><br/>
        <th colSpan={2}style={{ position: 'relative', right: '230px', borderRight: '1px solid black', }}>May</th><br/>
        <th colSpan={2}style={{ position: 'relative', right: '320px', borderRight: '1px solid black', }}>June</th><br/>
        <th colSpan={2}style={{ position: 'relative', right: '390px' ,borderRight: '1px solid black', }}>July</th><br/>
        <th colSpan={2}style={{ position: 'relative', right: '500px' ,borderRight: '1px solid black', }}>August</th><br/>
        <th colSpan={2}style={{ position: 'relative', right: '580px' ,borderRight: '1px solid black'}}>September</th><br/>
        <th colSpan={2}style={{ position: 'relative', right: '680px', borderRight: '1px solid black' }}>October</th><br/>
        <th colSpan={2}style={{ position: 'relative', right: '620px',borderRight: '1px solid black', }}>November</th><br/>
        <th colSpan={2}style={{ position: 'relative', right: '500px', }}>December</th><br/>
        <th colSpan={2}style={{ position: 'relative', right: '500px',  }}></th><br/>
        <th colSpan={2}style={{ position: 'relative', right: '500px',  }}></th><br/>
    
      </tr>
      <tr>
      <td colSpan={26} style={{ borderBottom: '1px solid black' }}></td>
    </tr>
      <tr>
    <td style={{paddingLeft:'10px',position:'relative',}}>Production Plan Type Name</td>
        <td style={{right: '70px',position: 'relative', }}>(previous)</td>
        <td style={{position: 'relative',right: '60px' }} >(latest)</td>
        <td  style={{position: 'relative',right: '60px', }} >(previous)</td>
        <td  style={{position: 'relative',right: '50px',}} >(latest)</td>
        <td  style={{position: 'relative',right: '30px'}} >(previous)</td>
        <td  style={{position: 'relative',right: '40px'}} >(latest)</td>
        <td  style={{position: 'relative',right: '20px'}} >(previous)</td>
        <td  style={{position: 'relative',right: '20px'}} >(latest)</td>
        <td  style={{position: 'relative',right: '10px'}} >(previous)</td>
        <td  style={{position: 'relative',right: '20px'}} >(latest)</td>
        <td  style={{position: 'relative',right: '5px'}} >(previous)</td>
        <td  style={{position: 'relative',right: '20px'}} >(latest)</td>
        <td  style={{position: 'relative',right: '-10px'}} >(previous)</td>
        <td  style={{position: 'relative',right: '-px'}} >(latest)</td>
        <td  style={{position: 'relative',right: '-10px'}} >(previous)</td>
        <td  style={{position: 'relative',right: '-px'}} >(latest)</td>
        <td  style={{position: 'relative',right: '5px'}} >(previous)</td>
        <td  style={{position: 'relative',right: '10px'}} >(latest)</td>
        <td  style={{position: 'relative',right: '-20px'}} >(previous)</td>
        <td  style={{position: 'relative',right: '-20px'}} >(latest)</td>
        <td  style={{position: 'relative',right: '-20px'}} >(previous)</td>
        <td  style={{position: 'relative',right: '-20px'}} >(latest)</td>
        <td  style={{position: 'relative',right: '-70px'}} >(previous)</td>
        <td  style={{position: 'relative',right: '-50px'}} >(latest)</td>
        <td  style={{position: 'relative',right: '-200px'}} >Total(previous)</td>
        <td  style={{position: 'relative',right: '-300px'}} >Total(latest)</td>
        
      </tr>
    
      <tr>
        
    </tr>
    </table>
    
          {/* <Space size={"large"}>
            <span/>
           <span>Jan(previous)</span><br/><span><span></span>Jan(latest)</span>
           <span>Feb(previous)</span><br/><span>Feb(latest)</span>
            <span>Mar(previous)</span><br/><span>Mar(latest)</span>
            <span>Apr(previous)</span><span>Apr(latest)</span>
            <span>May(previous)</span><br/><span>May(latest)</span>
            <span>Jun(previous)</span><br/><span>Jun(latest)</span>
            <span>Jul(previous)</span><br/><span>Jul(latest)</span>
            <span>Aug(previous)</span><br/><span>Aug(latest)</span>
            <span>Sep(previous)</span><br/><span>Sep(latest)</span>
            <span>Oct(previous)</span><br/><span>Oct(latest)</span>
            <span>Nov(previous)</span><span>Nov(latest)</span>
            <span>Dec(previous)</span><br/><span>Dec(latest)</span>
            <span>Total(previous)</span><br/><span>Total(latest)</span>
            <span></span><span></span>
    </Space> */}
          
          </div>
        );
      };
      const columns10: any = [
        {
          title: "S No",
          key: "sno",
          render: (text, object, index) => (page - 1) * pageSize + (index + 1),
        },
        // {
        //   title: "Item code",
        //   dataIndex: "itemCode",
        //   // ...getColumnSearchProps('itemCode')
        // },
        // {
        //   title: "Item Name",
        //   dataIndex: "itemName",
        //   width:200,
        //   render: (text: any, record: any) => (
        //   <span>{record.itemName}</span>
        //   ),
        //   // ...getColumnSearchProps('itemName')
        // },
        {title:'Production Plan Type',
        dataIndex: "phasetype",
        render: (text: any, record: any) => <span>{record.phasetype}</span>,
      },
      {title:'January',
        dataIndex: "phasetype",
        children:[
          {
            title:'Previous',
        dataIndex: "janPcs",
        render: (text: any, record: any) => <span>{record.pcsData[0].janPcs}</span>,
    
          },
          {
            title:'Latest',
        dataIndex: "janCoeff",
        render: (text: any, record: any) => <span>{record.coeffData[0].janCoeff}</span>,
    
          }
        ],
        style: { backgroundColor: "lightblue" },
      },
      {
        title: "", 
        width: 20, 
        },
      {title:'February',
      dataIndex: "phasetype",
      children:[
        {
          title:'Previous',
      dataIndex: "febPcs",
      render: (text: any, record: any) => <span >{record.pcsData[0].febPcs}</span>,
    
        },
        {
          title:'Latest',
      dataIndex: "febCoeff",
      render: (text: any, record: any) => <span>{record.coeffData[0].febCoeff}</span>,
    
        }
      ]
    },
    {
      title: "", 
      width: 20, 
    },
    {title:'March',
      dataIndex: "phasetype",
      children:[
        {
          title:'Previous',
      dataIndex: "marPcs",
      render: (text: any, record: any) => <span>{record.pcsData[0].marPcs}</span>,
    
        },
        {
          title:'Latest',
      dataIndex: "marCoeff",
      render: (text: any, record: any) => <span>{record.coeffData[0].marCoeff}</span>,
    
        }
      ]
    },
    {
      title: "", 
      width: 20, 
    },
    {title:'April',
      dataIndex: "phasetype",
      children:[
        {
          title:'Previous',
      dataIndex: "aprPcs",
      render: (text: any, record: any) => <span>{record.pcsData[0].aprPcs}</span>,
    
        },
        {
          title:'Latest',
      dataIndex: "aprCoeff",
      render: (text: any, record: any) => <span>{record.coeffData[0].aprCoeff}</span>,
    
        }
      ]
    },
    {
      title: "", 
      width: 20, 
    },
    {title:'May',
      dataIndex: "phasetype",
      children:[
        {
          title:'Previous',
      dataIndex: "mayPcs",
      render: (text: any, record: any) => <span>{record.pcsData[0].mayPcs}</span>,
    
        },
        {
          title:'Latest',
      dataIndex: "mayCoeff",
      render: (text: any, record: any) => <span>{record.coeffData[0].mayCoeff}</span>,
    
        }
      ]
    },
    {
      title: "", 
      width: 20, 
    },
    {title:'June',
      dataIndex: "phasetype",
      children:[
        {
          title:'Previous',
      dataIndex: "junPcs",
      render: (text: any, record: any) => <span>{record.pcsData[0].junPcs}</span>,
    
        },
        {
          title:'Latest',
      dataIndex: "junCoeff",
      render: (text: any, record: any) => <span>{record.coeffData[0].junCoeff}</span>,
    
        }
      ]
    },
    {
      title: "", 
      width: 20, 
    },
    {title:'July',
      dataIndex: "phasetype",
      children:[
        {
          title:'Previous',
      dataIndex: "julPcs",
      render: (text: any, record: any) => <span>{record.pcsData[0].julPcs}</span>,
    
        },
        {
          title:'Latest',
      dataIndex: "julCoeff",
      render: (text: any, record: any) => <span>{record.coeffData[0].julCoeff}</span>,
    
        }
      ]
    },
    {
      title: "", 
      width: 20, 
    },
    {title:'August',
      dataIndex: "phasetype",
      children:[
        {
          title:'Previous',
      dataIndex: "augPcs",
      render: (text: any, record: any) => <span>{record.pcsData[0].augPcs}</span>,
    
        },
        {
          title:'Latest',
      dataIndex: "augCoeff",
      render: (text: any, record: any) => <span>{record.coeffData[0].augCoeff}</span>,
    
        }
      ]
    },
    {
      title: "", 
      width: 20, 
    },
    {title:'September',
      dataIndex: "phasetype",
      children:[
        {
          title:'Previous',
      dataIndex: "sepPcs",
      render: (text: any, record: any) => <span>{record.pcsData[0].sepPcs}</span>,
    
        },
        {
          title:'Latest',
      dataIndex: "sepCoeff",
      render: (text: any, record: any) => <span>{record.coeffData[0].sepCoeff}</span>,
    
        }
      ]
    },
    {
      title: "", 
      width: 20, 
    },
    {title:'October',
      dataIndex: "phasetype",
      children:[
        {
          title:'Previous',
      dataIndex: "octPcs",
      render: (text: any, record: any) => <span>{record.pcsData[0].octPcs}</span>,
    
        },
        {
          title:'Latest',
      dataIndex: "octCoeff",
      render: (text: any, record: any) => <span>{record.coeffData[0].octCoeff}</span>,
    
        }
      ]
    },
    {
      title: "", 
      width: 20, 
    },
    {title:'November',
      dataIndex: "phasetype",
      children:[
        {
          title:'Previous',
      dataIndex: "novPcs",
      render: (text: any, record: any) => <span>{record.pcsData[0].novPcs}</span>,
    
        },
        {
          title:'Latest',
      dataIndex: "novCoeff",
      render: (text: any, record: any) => <span>{record.coeffData[0].novCoeff}</span>,
    
        }
      ]
    },
    {
      title: "", 
      width: 20, 
    },
    {title:'December',
      dataIndex: "phasetype",
      children:[
        {
          title:'Previous',
      dataIndex: "decPcs",
      render: (text: any, record: any) => <span>{record.pcsData[0].decPcs}</span>,
    
        },
        {
          title:'Latest',
      dataIndex: "decCoeff",
      render: (text: any, record: any) => <span>{record.coeffData[0].decCoeff}</span>,
    
        }
      ]
    },
    {
      title: "", 
      width: 20, 
    },
    {title:"Total Pcs",
    dataIndex:"total_order_plan_qty",
    render: (text: any, record: any) => <span >{record.pcsData[0].total_order_plan_qty}</span>,
    },
    
    {
      title: "", 
      width: 20, 
    },
    {title:"Total Coeff",
    dataIndex:"total_order_plan_qty_coeff",
    render: (text: any, record: any) => <span >{record.pcsData[0].total_order_plan_qty_coeff}</span>,
    },
    
    
        // // {
        // //   title: <Header/>,
        // //   dataIndex: "monthWiseData",
        // //   align:'center',
        // //   render: (text: any, record: any) => (
        // //     <Table
        // //       dataSource={record.monthWiseData}
        // //       columns={childColumns2}
        // //       pagination={false} // Hide pagination for child table
        // //       rowKey={(record) => record.itemName}
             
        // //     />
        //   ),
        // },
            
      ];
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
    
      const columnsWithBackground = columns10.map((column) => ({
        ...column,
        title: (
          <div style={{ backgroundColor: getColumnBackgroundColor(column.title) }}>
            {column.title}
          </div>
        ),
      }));
      const childColumns1: any = [
        {
          // title: "Production Plan Type Name",
          dataIndex: "phasetype",
          width: 130,
        },
        {
              // title: `Previous`,
              dataIndex: "janPcs",         
               width:60,
              align:"right",
    
              render: (text: any, record: any) => {
                return (record.pcsData.map((item: any) =><span>{item.janPcs.toLocaleString()}</span>  || '-'))
              
              }
            },
            {
              // title: `Latest`,
              dataIndex: "janCoeff",
              width:60,
              align:"right",
              render: (text: any, record: any) => {
                return (record.coeffData.map((item: any) =><span>{item.janCoeff.toLocaleString()}</span>  || '-'))
              
              }
            
       
        },
        {
          
              // title: `Previous`,
              dataIndex: "febPcs",
              width:60,
              align:"right",
              render: (text: any, record: any) => {
                return (record.pcsData.map((item: any) =><span>{item.febPcs.toLocaleString()}</span>  || '-'))
              
              }
            },
            {
              // title: `Latest`,
              dataIndex: "febCoeff",
              width:60,
              align:"right",
              render: (text: any, record: any) => {
                return (record.coeffData.map((item: any) =><span>{item.febCoeff.toLocaleString()}</span>  || '-'))
              
              }
           
     
        },
        {
         
             // title: `Previous`,
              dataIndex: "marPcs",
              width:70,
              align:"right",
              render: (text: any, record: any) => {
                return (record.pcsData.map((item: any) =><span>{item.marPcs.toLocaleString()}</span>  || '-'))
              
              }
            },
            {
             // title: `Latest`,
              dataIndex: "marCoeff",
              width:60,
              align:"right",
              render: (text: any, record: any) => {
                return (record.coeffData.map((item: any) =><span>{item.marCoeff.toLocaleString()}</span>  || '-'))
              
              }
            
          
        },
        {
          
             // title: `Previous`,
              dataIndex: "aprPcs",
              width:80,
              align:"right",
              render: (text: any, record: any) => {
                return (record.pcsData.map((item: any) =><span>{item.aprPcs.toLocaleString()}</span>  || '-'))
              
              }
            },
            {
             // title: `Latest`,
              dataIndex: "aprCoeff",
              width:60,
              align:"right",
              render: (text: any, record: any) => {
                return (record.coeffData.map((item: any) =><span>{item.aprCoeff.toLocaleString()}</span>  || '-'))
              
              }
            
      
        },
        {
         
             // title: `Previous`,
              dataIndex: "mayPcs",
              width:50,
              align:"right",
              render: (text: any, record: any) => {
                return (record.pcsData.map((item: any) =><span>{item.mayPcs.toLocaleString()}</span>  || '-'))
              
              }
            },
            {
             // title: `Latest`,
              dataIndex: "mayCoeff",
              width:70,
              align:"right",
              render: (text: any, record: any) => {
                return (record.coeffData.map((item: any) =><span>{item.mayCoeff.toLocaleString()}</span>  || '-'))
              
              }
            
        
          
        },
        {
         
             // title: `Previous`,
              dataIndex: "junPcs",
              width:70,
              align:"right",
              render: (text: any, record: any) => {
                return (record.pcsData.map((item: any) =><span>{item.junPcs.toLocaleString()}</span>  || '-'))
              
              }
            },
            {
             // title: `Latest`,
              dataIndex: "junCoeff",
              width:70,
              align:"right",
              render: (text: any, record: any) => {
                return (record.coeffData.map((item: any) =><span>{item.junCoeff.toLocaleString()}</span>  || '-'))
              
              }
           
       
          
        },
        {
         
             // title: `Previous`,
              dataIndex: "julPcs",
              width:70,
              align:"right",
              render: (text: any, record: any) => {
                return (record.pcsData.map((item: any) =><span>{item.julPcs.toLocaleString()}</span>  || '-'))
              
              }
            },
            {
             // title: `Latest`,
              dataIndex: "julCoeff",
              width:60,
              align:"right",
              render: (text: any, record: any) => {
                return (record.coeffData.map((item: any) =><span>{item.julCoeff.toLocaleString()}</span>  || '-'))
              
              }
           
        },
        {
          
             // title: `Previous`,
              dataIndex: "augPcs",
              width:60,
              align:"right",
              render: (text: any, record: any) => {
                return (record.pcsData.map((item: any) =><span>{item.augPcs.toLocaleString()}</span>  || '-'))
              
              }
            },
            {
             // title: `Latest`,
              dataIndex: "augCoeff",
              width:60,
              align:"right",
              render: (text: any, record: any) => {
                return (record.coeffData.map((item: any) =><span>{item.augCoeff.toLocaleString()}</span>  || '-'))
              
              }
           
        },
        {
       
             // title: `Previous`,
              dataIndex: "sepPcs",
              width:60,
              align:"right",
              render: (text: any, record: any) => {
                return (record.pcsData.map((item: any) =><span>{item.sepPcs.toLocaleString()}</span>  || '-'))
              
              }
            },
            {
             // title: `Latest`,
              dataIndex: "sepCoeff",
              width:60,
              align:"right",
              render: (text: any, record: any) => {
                return (record.coeffData.map((item: any) =><span>{item.sepCoeff.toLocaleString()}</span>  || '-'))
              
              }
           
        
        },
        {
        
             // title: `Previous`,
              dataIndex: "octPcs",
              width:70,
              align:"right",
              render: (text: any, record: any) => {
                return (record.pcsData.map((item: any) =><span>{item.octPcs.toLocaleString()}</span>  || '-'))
              
              },
            },
            {
             // title: `Latest`,
              dataIndex: "octCoeff",
              width:70,
              align:"right",
              render: (text: any, record: any) => {
                return (record.coeffData.map((item: any) =><span>{item.octCoeff.toLocaleString()}</span>  || '-'))
              
              }
           
        },
        {
         
             // title: `Previous`,
              dataIndex: "novPcs",
              width:70,
              align:"right",
              render: (text: any, record: any) => {
                return (record.pcsData.map((item: any) =><span>{item.novPcs.toLocaleString()}</span>  || '-'))
              
              }
            },
            {
             // title: `Latest`,
              dataIndex: "novCoeff",
              width:50,
              align:"right",
              render: (text: any, record: any) => {
                return (record.coeffData.map((item: any) =><span>{item.novCoeff.toLocaleString()}</span>  || '-'))
              
              },
           
        },
        {
         
              // title: `Previous`,
              dataIndex: "decPcs",
              width:80,
              align:"right",
              render: (text: any, record: any) => {
                return (record.pcsData.map((item: any) =><span>{item.decPcs.toLocaleString()}</span>  || '-'))
              
              }
            },
            {
              // title: `Latest`,
              dataIndex: "decCoeff",
              width:75,
              align:"right",
              render: (text: any, record: any) => {
                return (record.coeffData.map((item: any) =><span>{item.decCoeff.toLocaleString()}</span>  || '-'))
              
              }
    
          
        },
        {
          // title: "Total Previous",
          dataIndex: "totalPcs",
       align:"right",
       width:150,
       render: (text: any, record: any) => {
        return record.totalPcs ? record.totalPcs.toLocaleString() :0
      },    },
        {
          // title: "Total Latest",
          dataIndex: "totalCoeff",
          align: "right",
          width: 150,
          render: (text: any, record: any) => {
            return record.totalCoeff ? record.totalCoeff.toLocaleString() : 0;
          },
        },
      ];
      const columns5: any = [
        {
          title: "S No",
          key: "sno",
          render: (text, object, index) => (page - 1) * pageSize + (index + 1),
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
    
          
        )
    }
        excel.addColumns(exportingColumns);
        excel.addDataSource(excelData);
        excel.saveAs(`Ex-Factory-report-${currentDate}.xlsx`);
       
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
                    <span />
                    <span />
                    <span /> <span />
                    <span />
                    <span />
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
                    <span />
                    {marPre.toLocaleString()}
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
                    {marLat.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
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
                    <span />
                    <span />
                    <span /> {aprLat.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
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
                    <span /> {mayLat.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
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
                    <span />
                    <span />
                    {julLat.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
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
                    {totalPre.toLocaleString()}
                    <span />
                    <span /> <span />
                    <span />
                    <span />
                    <span />
                    <span />
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
              <label>label</label>
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
                  ><span>Latest File uploaded Date: {dates?.[0]?.Date? moment(dates?.[0]?.Date).format("DD/MM"): "-"}</span></Card>
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
                  ><span>Previous File uploaded Date: {dates?.[1]?.Date? moment(dates?.[0]?.Date).format("DD/MM"): "-"}</span></Card>
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
            pagination={pagination}

          />
          <Table
         columns={columnsWithBackground} 
         dataSource={phase}
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