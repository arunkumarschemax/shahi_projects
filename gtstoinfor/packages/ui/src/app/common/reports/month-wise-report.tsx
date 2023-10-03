import { Alert, Button, Card, Col, Form, Row, Select, Space, Table, Tabs, Typography, message } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import ExFactoryReport from "./ex-factory-report"
import WarehouseReport from "./ware-house-report"
import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons"
import form from "antd/es/form"
import { useEffect, useState } from "react"
import { OrdersService } from "@project-management-system/shared-services"
import React from "react"
import { YearReq } from "@project-management-system/shared-models"
import { Excel } from "antd-table-saveas-excel"
import { IExcelColumn } from "antd-table-saveas-excel/app"

export const MonthWiseReport = () =>{
    const [form] = Form.useForm();
  const { Option } = Select;
  const [selected, setSelected] = useState('ExFactory')
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);  const [phase, setPhase] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [year, setYear] = useState<any[]>([]);
  const [tab, setTab] = useState<number>(2023);
  const service = new OrdersService();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [excelsData, setExcelData] = useState<any[]>([]);
  const { Text } = Typography;
  useEffect(() => {
    getData(selected);
    getTabs();
  }, []);
  const handleChange = (val) =>{
    setSelected(val)
    getData(val)
    console.log(val,'-----onchangevalue-');
  }
  const getTabs = () => {
    service.getExfactoryYearData().then((res) => {
      if (res.status) {
        setYear(res.data);
      }
    });
  };
 
  const getData = (val) => {
    const req = new YearReq(tab,val);
    service.getMonthWiseReportData(req).then((res) => {
      console.log(res, "res==========");
      if (res.status) {
        setData(res.data);
        setFilteredData(res.data);
      } else {
        setData([]);
      }
    });
    service.getExfactoryMonthExcel(req).then((res) => {
      console.log(res, "res==========");
      if (res.status) {
        setExcelData(res.data);
      } else {
        setData([]);
      }
    });
    service.getPhaseMonthData(req).then((res)=>{
      if(res.status){
        setPhase(res.data)
      }else{
        setPhase([]);
      }
    })
  };
//       const Header = () => {
           
//       return (
//         <div>
// <table>
//   <tr >
//   {/* <th style={{position: 'relative',paddingRight: '1200px'}}>Production Plan Type Name</th> */}
//   <th colSpan={2} style={{ position: 'relative', right: '-150px' , borderRight: '1px solid black',}}>January</th>
//     <th colSpan={2} style={{ position: 'relative', right: '-210px',borderRight: '1px solid black', }}>February</th><br/>
//     <th colSpan={2}style={{ position: 'relative', right: '-290px' ,borderRight: '1px solid black', }}>March</th><br/>
//     <th colSpan={2} style={{ position: 'relative', right: '-340px', borderRight: '1px solid black', }}>April</th><br/>
//     <th colSpan={2}style={{ position: 'relative', right: '-390px', borderRight: '1px solid black', }}>May</th><br/>
//     <th colSpan={2}style={{ position: 'relative', right: '-440px', borderRight: '1px solid black', }}>June</th><br/>
//     <th colSpan={2}style={{ position: 'relative', right: '-510px' ,borderRight: '1px solid black', }}>July</th><br/>
//     <th colSpan={2}style={{ position: 'relative', right: '-600px' ,borderRight: '1px solid black', }}>August</th><br/>
//     <th colSpan={2}style={{ position: 'relative', right: '-660px' ,borderRight: '1px solid black'}}>September</th><br/>
//     <th colSpan={2}style={{ position: 'relative', right: '-690px', borderRight: '1px solid black' }}>October</th><br/>
//     <th colSpan={2}style={{ position: 'relative', right: '-760px',borderRight: '1px solid black', }}>November</th><br/>
//     <th colSpan={2}style={{ position: 'relative', right: '-790px', }}>December</th><br/>
//     <th colSpan={2}style={{ position: 'relative', right: '500px',  }}></th><br/>
//     <th colSpan={2}style={{ position: 'relative', right: '500px',  }}></th><br/>

//   </tr>
//   <tr>
//   <td colSpan={150} style={{ borderBottom: '1px solid black' }}></td>
  
// </tr>
//   <tr>
// <td style={{paddingLeft:'10px',position:'relative',}}>Production Plan Type Name</td>
//     <td style={{right: '-50px',position: 'relative', }}>(Coeff)</td>
//     <td style={{position: 'relative',right: '-100px' }} >(Coeff)</td>

//     <td  style={{position: 'relative',right: '-140px', }} >(Pcs)</td>
//     <td  style={{position: 'relative',right: '-180px',}} >(Coeff)</td>

//     <td  style={{position: 'relative',right: '-240px'}} >(Pcs)</td>
//     <td  style={{position: 'relative',right: '-290px'}} >(Coeff)</td>

//     <td  style={{position: 'relative',right: '-330px'}} >(Pcs)</td>
//     <td  style={{position: 'relative',right: '-370px'}} >(Coeff)</td>

//     <td  style={{position: 'relative',right: '-390px'}} >(Pcs)</td>
//     <td  style={{position: 'relative',right: '-430px'}} >(Coeff)</td>

//     <td  style={{position: 'relative',right: '-480px'}} >(Pcs)</td>
//     <td  style={{position: 'relative',right: '-500px'}} >(Coeff)</td>

//     <td  style={{position: 'relative',right: '-590px'}} >(Pcs)</td>
//     <td  style={{position: 'relative',right: '-600px'}} >(Coeff)</td>

//     <td  style={{position: 'relative',right: '-700px'}} >(Pcs)</td>
//     <td  style={{position: 'relative',right: '-760px'}} >(Coeff)</td>

//     <td  style={{position: 'relative',right: '-800px'}} >(Pcs)</td>
//     <td  style={{position: 'relative',right: '-850px'}} >(Coeff)</td>

//     <td  style={{position: 'relative',right: '-890px'}} >(Pcs)</td>
//     <td  style={{position: 'relative',right: '-930px'}} >(Coeff)</td>

//     <td  style={{position: 'relative',right: '-960px'}} >(Pcs)</td>
//     <td  style={{position: 'relative',right: '-990px'}} >(Coeff)</td>

//     <td  style={{position: 'relative',right: '-1020px'}} >(Pcs)</td>
//     <td  style={{position: 'relative',right: '-1070px'}} >(Coeff)</td>
//     <td  style={{position: 'relative',right: '-1100px'}} >Total(Pcs)</td>
//     <td  style={{position: 'relative',right: '-1200px'}} >Total(Coeff)</td>
    
//   </tr>

//   <tr>
    
// </tr>
// </table>
        
//         </div>
//       );
//     };
  
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
const pagination2 = {
  current: page,
  pageSize: pageSize,
  total: phase.length,
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
  const CustomTitle = () => {
    return (
      <div>
       
<table>
  <tr >
  {/* <th style={{position: 'relative',paddingRight: '1200px'}}>Production Plan Type Name</th> */}
  <th colSpan={2} style={{ position: 'relative', right: '-150px', borderLeft: '1px solid black', backgroundColor: 'lightblue', width: '100px' }}>January</th>
<th colSpan={2} style={{ position: 'relative', right: '-100px', backgroundColor: 'lightgreen', width: '100px', borderLeft: '1px solid black', borderRight: '1px solid black' }}>February</th>
<th colSpan={2} style={{ position: 'relative', right: '-100px', backgroundColor: 'lightblue', width: '100px', borderRight: '1px solid black' }}>March</th>
<th colSpan={2} style={{ position: 'relative', right: '-100px', backgroundColor: 'lightgreen', width: '100px', borderRight: '1px solid black' }}>April</th>
<th colSpan={2} style={{ position: 'relative', right: '-100px', backgroundColor: 'lightblue', width: '100px', borderRight: '1px solid black' }}>May</th>
<th colSpan={2} style={{ position: 'relative', right: '-100px', backgroundColor: 'lightgreen', width: '100px', borderRight: '1px solid black' }}>June</th>
<th colSpan={2} style={{ position: 'relative', right: '-100px', backgroundColor: 'lightblue', width: '100px', borderRight: '1px solid black' }}>July</th>
<th colSpan={2} style={{ position: 'relative', right: '-100px', backgroundColor: 'lightgreen', width: '100px', borderRight: '1px solid black' }}>August</th>
<th colSpan={2} style={{ position: 'relative', right: '-100px', backgroundColor: 'lightblue', width: '100px', borderRight: '1px solid black' }}>September</th>
<th colSpan={2} style={{ position: 'relative', right: '-100px', backgroundColor: 'lightgreen', width: '100px', borderRight: '1px solid black' }}>October</th>
<th colSpan={2} style={{ position: 'relative', right: '-100px', backgroundColor: 'lightblue', width: '100px', borderRight: '1px solid black' }}>November</th>
<th colSpan={2} style={{ position: 'relative', right: '-100px', backgroundColor: 'lightgreen', width: '100px',borderRight: '1px solid black' }}>December</th>
<th colSpan={2} style={{ position: 'relative',right: '-100px', width: '100px',borderRight: '1px solid black' }}>Total(Pcs)</th>
<th colSpan={2} style={{position: 'relative', right: '-100px', width: '100px', }}>Total(Coeff)</th>


  </tr>
  <tr>
  <td colSpan={26} style={{ borderBottom: '1px solid black' }}></td>
</tr>
  <tr>
<td style={{paddingLeft:'10px',position:'relative',}}>Production Plan Type Name</td>
    <td style={{right: '70px',position: 'relative', }}>(Pcs)</td>
    <td style={{position: 'relative',right: '30px' }} >(Coeff)</td>

    <td  style={{position: 'relative',right: '20px', }} >(Pcs)</td>
    <td  style={{position: 'relative',right: '25px',}} >(Coeff)</td>

    <td  style={{position: 'relative',right: '20px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '20px'}} >(Coeff)</td>

    <td  style={{position: 'relative',right: '10px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '20px'}} >(Coeff)</td>

    <td  style={{position: 'relative',right: '10px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '10px'}} >(Coeff)</td>

    <td  style={{position: 'relative',right: '10px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '-10px'}} >(Coeff)</td>

    <td  style={{position: 'relative',right: '15px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '-10px'}} >(Coeff)</td>

    <td  style={{position: 'relative',right: '10px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '-10px'}} >(Coeff)</td>

    <td  style={{position: 'relative',right: '10px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '-20px'}} >(Coeff)</td>
    <td  style={{position: 'relative',right: '10px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '-10px'}} >(Coeff)</td>
    <td  style={{position: 'relative',right: '-10px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '-20px'}} >(Coeff)</td>
    <td  style={{position: 'relative',right: '-5px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '-20px'}} >(Coeff)</td>
    <td  style={{position: 'relative',right: '-310px'}} ><span></span></td>
    <td  style={{position: 'relative',right: '-410px'}} ><span></span></td>
    
  </tr>

  <tr>
    
</tr>
</table>
      </div>
    );
  };
  const childColumns1: any = [
    {
      // title: "Production Plan Type Name",
      dataIndex: "phasetype",
      width: 100,
    },
    {
      // title: `In PCs`,
      dataIndex: "janPcs",
      width: 50,
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
      width: 50,
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
      width: 50,
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
      width: 50,
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
      width: 50,
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
      width: 50,
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
      width: 50,
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
      width: 50,
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
      width:50,
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
      width: 50,
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
      width: 50,
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
      width: 50,
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
      width: 50,
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
      width: 50,
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
      width: 50,
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
      width: 50,
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
      width: 50,
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
      width: 70,
      render: (text: any, record: any) => {
        return record.totalPcs ? record.totalPcs.toLocaleString() : 0;
      },
    },
    {
      // title: "Total In Coeff",
      dataIndex: "totalCoeff",
      align: "right",
      width: 70,

      render: (text: any, record: any) => {
        return record.totalCoeff ? record.totalCoeff.toLocaleString() : 0;
      },
    },
  ];
  const childColumns2: any = [
    {
      // title: "Production Plan Type Name",
      dataIndex: "prod_plan_type",
      width:100

    },
    {
          // title: `In PCs`,
          dataIndex: "janPcsCoeff",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.janPcsCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "janPcsCoeff",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.janPcsCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
     
    
      
        {
          // title: `In PCs`,
          dataIndex: "febPcsWh",
          width:50,
          align:"right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => 
              <span>{item.febPcsWh.toLocaleString()}</span> || "-"

            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "febPcsCoeff",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.febPcsCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
      
  
    {

        
          // title: `In PCs`,
          dataIndex: "marPcsWh",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.marPcsWh.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "marPcsCoeff",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.marCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
      
        {
          // title: `In PCs`,
          dataIndex: "aprPcsWh",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.aprPcsWh.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "aprPcsCoeff",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.aprPcsCoeff.toLocaleString()}</span> || "-"
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
          dataIndex: "mayPcsWh",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.mayPcsWh.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "mayPcsCoeff",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.mayPcsCoeff.toLocaleString()}</span> || "-"
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
          dataIndex: "junPcsWh",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.junPcsWh.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "junPcsCoeff",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.junPcsCoeff.toLocaleString()}</span> || "-"
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
          dataIndex: "julPcsWh",
          width:50,
          align:"right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.julPcsWh.toLocaleString()}</span> || "-"
            )
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "julPcsCoeff",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.julPcsCoeff.toLocaleString()}</span> || "-"
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
          dataIndex: "augPcsWh",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.augPcsWh.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "augPcsCoeff",
          width:30,
          align:"right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.augPcsCoeff.toLocaleString()}</span> || "-"
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
          dataIndex: "sepPcsWh",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.sepPcsWh.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "sepPcsCoeff",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.sepPcsCoeff.toLocaleString()}</span> || "-"
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
          dataIndex: "octPcsWh",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.octPcsWh.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "octPcsCoeff",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.octPcsCoeff.toLocaleString()}</span> || "-"
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
          dataIndex: "novPcsWh",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.novPcsWh.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "novPcsCoeff",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.novPcsCoeff.toLocaleString()}</span> || "-"
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
          dataIndex: "decPcsWh",
          width:60,
          align:"right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.decPcsWh.toLocaleString()}</span> || "-"
            );
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "decPcsCoeff",
          width:60,
          align:"right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.decPcsCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
    //   ],
    // },
    {
      // title: "Total In PCs",
      dataIndex: "total_order_plan_qty",
      align:"right",
      width:100,
      render: (text: any, record: any) => {
        return record.total_order_plan_qty ? record.total_order_plan_qty.toLocaleString() :0
      },
    },
    {
      // title: "Total In Coeff",
      dataIndex: "total_order_plan_qty_coeff",
      align:"right",
      width:100,
      render: (text: any, record: any) => {
        return record.total_order_plan_qty_coeff?record.total_order_plan_qty_coeff.toLocaleString() :0
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
          dataSource={record.monthWiseData}
          columns={childColumns1}
          pagination={false} // Hide pagination for child table
          rowKey={(record) => record.itemName}
        />
      ),
    },
  ];
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
        title:'In Pcs',
    dataIndex: "janPcs",
    render: (text: any, record: any) => <span>{record.pcsData[0].janPcs}</span>,

      },
      {
        title:'In Coeff',
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
      title:'In Pcs',
  dataIndex: "febPcs",
  render: (text: any, record: any) => <span >{record.pcsData[0].febPcs}</span>,

    },
    {
      title:'In Coeff',
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
      title:'In Pcs',
  dataIndex: "marPcs",
  render: (text: any, record: any) => <span>{record.pcsData[0].marPcs}</span>,

    },
    {
      title:'In Coeff',
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
      title:'In Pcs',
  dataIndex: "aprPcs",
  render: (text: any, record: any) => <span>{record.pcsData[0].aprPcs}</span>,

    },
    {
      title:'In Coeff',
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
      title:'In Pcs',
  dataIndex: "mayPcs",
  render: (text: any, record: any) => <span>{record.pcsData[0].mayPcs}</span>,

    },
    {
      title:'In Coeff',
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
      title:'In Pcs',
  dataIndex: "junPcs",
  render: (text: any, record: any) => <span>{record.pcsData[0].junPcs}</span>,

    },
    {
      title:'In Coeff',
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
      title:'In Pcs',
  dataIndex: "julPcs",
  render: (text: any, record: any) => <span>{record.pcsData[0].julPcs}</span>,

    },
    {
      title:'In Coeff',
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
      title:'In Pcs',
  dataIndex: "augPcs",
  render: (text: any, record: any) => <span>{record.pcsData[0].augPcs}</span>,

    },
    {
      title:'In Coeff',
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
      title:'In Pcs',
  dataIndex: "sepPcs",
  render: (text: any, record: any) => <span>{record.pcsData[0].sepPcs}</span>,

    },
    {
      title:'In Coeff',
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
      title:'In Pcs',
  dataIndex: "octPcs",
  render: (text: any, record: any) => <span>{record.pcsData[0].octPcs}</span>,

    },
    {
      title:'In Coeff',
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
      title:'In Pcs',
  dataIndex: "novPcs",
  render: (text: any, record: any) => <span>{record.pcsData[0].novPcs}</span>,

    },
    {
      title:'In Coeff',
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
      title:'In Pcs',
  dataIndex: "decPcs",
  render: (text: any, record: any) => <span>{record.pcsData[0].decPcs}</span>,

    },
    {
      title:'In Coeff',
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
    // console.log(selected,'exfactory');

    if(selected =='ExFactory'){
        console.log('exfactory');
        
    exportingColumns.push(
        { title: "Item Name", dataIndex: "item" },
        { title: "Production Plan Type Name",dataIndex: "prod_plan_type",},
        {title: `Jan In PCs`,dataIndex: "janPcsExf",},
        {title: `Jan In Coeff`,dataIndex: "janCoeffExf",},
        {title: `Feb In PCs`,dataIndex: "febPcsExf",},
        {title: `Feb In Coeff`,dataIndex: "febCoeffExf",},
        {title: `Mar In PCs`,dataIndex: "marPcsExf",},
        {title: `Mar In Coeff`,dataIndex: "marCoeffExf",},
        {title: `Apr In PCs`,dataIndex: "aprPcsExf",},
        {title: `Apr In Coeff`,dataIndex: "aprCoeffExf",},
        {title: `May In PCs`,dataIndex: "mayPcsExf",},
        {title: `May In Coeff`,dataIndex: "mayCoeffExf",},
        {title: `Jun In PCs`,dataIndex: "junPcsExf",},
        {title: `Jun In Coeff`,dataIndex: "junCoeffExf",},
        {title: `Jul In PCs`,dataIndex: "julPcsExf",},
        {title: `Jul In Coeff`,dataIndex: "julCoeffExf",},
        {title: `Aug In PCs`,dataIndex: "augPcsExf",},
        {title: `Aug In Coeff`,dataIndex: "augCoeffExf",},
        {title: `Sep In PCs`,dataIndex: "sepPcsExf",},
        {title: `Sep In Coeff`,dataIndex: "sepCoeffExf",},
        {title: `Oct In PCs`,dataIndex: "octPcsExf",},
        {title: `Oct In Coeff`,dataIndex: "octCoeffExf",},
        {title: `Nov In PCs`,dataIndex: "novPcsExf",},
        {title: `Nov In Coeff`,dataIndex: "novCoeffExf",},
        {title: `Dec In PCs`,dataIndex: "decPcsExf",},
        {title: `Dec In Coeff`,dataIndex: "decCoeffExf",},

    //   {
    //     title: `Jan In Coeff`,
    //     dataIndex: "OrderCoeffQty",
    //     render: (text, record) => {
    //       return record.ExfMonth == 1 ? record.OrderCoeffQty : "-";
    //     },
    //   },
    //   {
    //     title: `Feb In PCs`,
    //     dataIndex: "OrderQty",
    //     render: (text, record) =>
    //       record.ExfMonth == 2 ? record.OrderQty : "-",
    //   },
    //   {
    //     title: `Feb In Coeff`,
    //     dataIndex: "OrderCoeffQty",
    //     render: (text, record) => {
    //       return record.ExfMonth == 2 ? record.OrderCoeffQty : "-";
    //     },
    //   },

    //   {
    //     title: `Mar In PCs`,
    //     dataIndex: "OrderQty",
    //     render: (text, record) =>
    //       record.ExfMonth == 3 ? record.OrderQty : "-",
    //   },
    //   {
    //     title: `Mar In Coeff`,
    //     dataIndex: "OrderCoeffQty",
    //     render: (text, record) => {
    //       return record.ExfMonth == 3 ? record.OrderCoeffQty : "-";
    //     },
    //   },

    //   {
    //     title: `Apr In PCs`,
    //     dataIndex: "OrderQty",
    //     render: (text, record) =>
    //       record.ExfMonth == 4 ? record.OrderQty : "-",
    //   },
    //   {
    //     title: `Apr In Coeff`,
    //     dataIndex: "OrderCoeffQty",
    //     render: (text, record) => {
    //       return record.ExfMonth == 4 ? record.OrderCoeffQty : "-";
    //     },
    //   },

    //   {
    //     title: `May In PCs`,
    //     dataIndex: "OrderQty",
    //     render: (text, record) =>
    //       record.ExfMonth == 5 ? record.OrderQty : "-",
    //   },
    //   {
    //     title: `May In Coeff`,
    //     dataIndex: "OrderCoeffQty",
    //     render: (text, record) => {
    //       return record.ExfMonth == 5 ? record.OrderCoeffQty : "-";
    //     },
    //   },

    //   {
    //     title: `Jun In PCs`,
    //     dataIndex: "OrderQty",
    //     render: (text, record) =>
    //       record.ExfMonth == 6 ? record.OrderQty : "-",
    //   },
    //   {
    //     title: `Jun In Coeff`,
    //     dataIndex: "OrderCoeffQty",
    //     render: (text, record) => {
    //       return record.ExfMonth == 6 ? record.OrderCoeffQty : "-";
    //     },
    //   },

    //   {
    //     title: `Jul In PCs`,
    //     dataIndex: "OrderQty",
    //     render: (text, record) =>
    //       record.ExfMonth == 7 ? record.OrderQty : "-",
    //   },
    //   {
    //     title: `Jul In Coeff`,
    //     dataIndex: "OrderCoeffQty",
    //     render: (text, record) => {
    //       return record.ExfMonth == 7 ? record.OrderCoeffQty : "-";
    //     },
    //   },

    //   {
    //     title: `Aug In PCs`,
    //     dataIndex: "OrderQty",
    //     render: (text, record) =>
    //       record.ExfMonth == 8 ? record.OrderQty : "-",
    //   },
    //   {
    //     title: `Aug In Coeff`,
    //     dataIndex: "OrderCoeffQty",
    //     render: (text, record) => {
    //       return record.ExfMonth == 8 ? record.OrderCoeffQty : "-";
    //     },
    //   },

    //   {
    //     title: `Sep In PCs`,
    //     dataIndex: "OrderQty",
    //     render: (text, record) =>
    //       record.ExfMonth == 9 ? record.OrderQty : "-",
    //   },
    //   {
    //     title: `Sep In Coeff`,
    //     dataIndex: "OrderCoeffQty",
    //     render: (text, record) => {
    //       return record.ExfMonth == 9 ? record.OrderCoeffQty : "-";
    //     },
    //   },

    //   {
    //     title: `Oct In PCs`,
    //     dataIndex: "OrderQty",
    //     render: (text, record) =>
    //       record.ExfMonth == 10 ? record.OrderQty : "-",
    //   },
    //   {
    //     title: `Oct In Coeff`,
    //     dataIndex: "OrderCoeffQty",
    //     render: (text, record) => {
    //       return record.ExfMonth == 10 ? record.OrderCoeffQty : "-";
    //     },
    //   },

    //   {
    //     title: `Nov In PCs`,
    //     dataIndex: "OrderQty",
    //     render: (text, record) =>
    //       record.ExfMonth == 11 ? record.OrderQty : "-",
    //   },
    //   {
    //     title: `Nov In Coeff`,
    //     dataIndex: "OrderCoeffQty",
    //     render: (text, record) => {
    //       return record.ExfMonth == 11 ? record.OrderCoeffQty : "-";
    //     },
    //   },

    //   {
    //     title: `Dec In PCs`,
    //     dataIndex: "OrderQty",
    //     render: (text, record) =>
    //       record.ExfMonth == 12 ? record.OrderQty : "-",
    //   },
    //   {
    //     title: `Dec In Coeff`,
    //     dataIndex: "OrderCoeffQty",
    //     render: (text, record) => {
    //       return record.ExfMonth == 12 ? record.OrderCoeffQty : "-";
    //     },
    //   },
      
    )
}
if(selected === 'WareHouse'){
    exportingColumns.push(
      { title: "Item Name", dataIndex: "item" },
      { title: "Production Plan Type Name",dataIndex: "prod_plan_type",},
      {title: `Jan In PCs`,dataIndex: "janPcsWh",},
      {title: `Jan In Coeff`,dataIndex: "janCoeffWh",},
      {title: `Feb In PCs`,dataIndex: "febPcsWh",},
      {title: `Feb In Coeff`,dataIndex: "febCoeffWh",},
      {title: `Mar In PCs`,dataIndex: "marPcsWh",},
      {title: `Mar In Coeff`,dataIndex: "marCoeffWh",},
      {title: `Apr In PCs`,dataIndex: "aprPcsWh",},
      {title: `Apr In Coeff`,dataIndex: "aprCoeffWh",},
      {title: `May In PCs`,dataIndex: "mayPcsWh",},
      {title: `May In Coeff`,dataIndex: "mayCoeffWh",},
      {title: `Jun In PCs`,dataIndex: "junPcsWh",},
      {title: `Jun In Coeff`,dataIndex: "junCoeffWh",},
      {title: `Jul In PCs`,dataIndex: "julPcsWh",},
      {title: `Jul In Coeff`,dataIndex: "julCoeffWh",},
      {title: `Aug In PCs`,dataIndex: "augPcsWh",},
      {title: `Aug In Coeff`,dataIndex: "augCoeffWh",},
      {title: `Sep In PCs`,dataIndex: "sepPcsWh",},
      {title: `Sep In Coeff`,dataIndex: "sepCoeffWh",},
      {title: `Oct In PCs`,dataIndex: "octPcsWh",},
      {title: `Oct In Coeff`,dataIndex: "octCoeffWh",},
      {title: `Nov In PCs`,dataIndex: "novPcsWh",},
      {title: `Nov In Coeff`,dataIndex: "novCoeffWh",},
      {title: `Dec In PCs`,dataIndex: "decPcsWh",},
      {title: `Dec In Coeff`,dataIndex: "decCoeffWh",},

      
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
        totalJanExfPre += Number(row.janPcsExf) || 0;
        totalJanExfLat += Number(row.janCoeffExf) || 0;
        totalFebExfPre += Number(row.febPcsExf) || 0;
        totalFebExfLat += Number(row.febCoeffExf) || 0;
        totalMarExfPre += Number(row.marPcsExf) || 0;
        totalMarExfLat += Number(row.marCoeffExf) || 0;
        totalAprExfPre += Number(row.aprPcsExf) || 0;
        totalAprExfLat += Number(row.aprCoeffExf) || 0;
        totalMayExfPre += Number(row.mayPcsExf) || 0;
        totalMayExfLat += Number(row.mayCoeffExf) || 0;
        totalJunExfPre += Number(row.junPcsExf) || 0;
        totalJunExfLat += Number(row.junCoeffExf) || 0;
        totalJulExfPre += Number(row.julPcsExf) || 0;
        totalJulExfLat += Number(row.julCoeffExf) || 0;
        totalAugExfPre += Number(row.augPcsExf) || 0;
        totalAugExfLat += Number(row.augCoeffExf) || 0;
        totalSepExfPre += Number(row.sepPcsExf) || 0;
        totalSepExfLat += Number(row.sepCoeffExf) || 0;  
        totalOctExfPre += Number(row.octPcsExf) || 0;
        totalOctExfLat += Number(row.octCoeffExf) || 0;
        totalNovExfPre += Number(row.novPcsExf) || 0;
        totalNovExfLat += Number(row.novCoeffExf) || 0;
        totalDecExfPre += Number(row.decPcsExf) || 0;
        totalDecExfLat += Number(row.decCoeffExf) || 0;
        totalExfPre += Number(row.totalPcsExf) || 0;
        totalExfLat += Number(row.totalCoeffExf) || 0;
        totalJanWhPre += Number(row.janPcsWh) || 0;
        totalJanWhLat += Number(row.janCoeffWh) || 0;
        totalFebWhPre += Number(row.febPcsWh) || 0;
        totalFebWhLat += Number(row.febCoeffWh) || 0;
        totalMarWhPre += Number(row.marPcsWh) || 0;
        totalMarWhLat += Number(row.marCoeffWh) || 0;
        totalAprWhPre += Number(row.aprPcsWh) || 0;
        totalAprWhLat += Number(row.aprCoeffWh) || 0;
        totalMayWhPre += Number(row.mayPcsWh) || 0;
        totalMayWhLat += Number(row.mayCoeffWh) || 0;
        totalJunWhPre += Number(row.junPcsWh) || 0;
        totalJunWhLat += Number(row.junCoeffWh) || 0;
        totalJulWhPre += Number(row.julPcsWh) || 0;
        totalJulWhLat += Number(row.julCoeffWh) || 0;
        totalAugWhPre += Number(row.augPcsWh) || 0;
        totalAugWhLat += Number(row.augCoeffWh) || 0;
        totalSepWhPre += Number(row.sepPcsWh) || 0;
        totalSepWhLat += Number(row.sepCoeffWh) || 0;  
        totalOctWhPre += Number(row.octPcsWh) || 0;
        totalOctWhLat += Number(row.octCoeffWh) || 0;
        totalNovWhPre += Number(row.novPcsWh) || 0;
        totalNovWhLat += Number(row.novCoeffWh) || 0;
        totalDecWhPre += Number(row.decPcsWh) || 0;
        totalDecWhLat += Number(row.decCoeffWh) || 0;
        totalWhPre += Number(row.totalPcsWh) || 0;
        totalWhLat += Number(row.totalCoeffWh) || 0;
    });

   const totalsPcsRow = {
        item: "Total",
        prod_plan_type: "", 
        janPcsExf: totalJanExfPre,
        janCoeffExf: totalJanExfLat,
        febPcsExf: totalFebExfPre,
        febCoeffExf: totalFebExfLat,
        marPcsExf: totalMarExfPre,
        marCoeffExf: totalMarExfLat, 
        aprPcsExf: totalAprExfPre,
        aprCoeffExf: totalAprExfLat,
         mayFxfPre: totalMayExfPre,
        mayFxfLat: totalMayExfLat, 
        junPcsExf: totalJunExfPre,
        junCoeffExf: totalJunExfLat, 
        julPcsExf: totalJulExfPre,
        julCoeffExf: totalJulExfLat, 
        augPcsExf: totalAugExfPre,
        augCoeffExf: totalAugExfLat,
         sepPcsExf: totalSepExfPre,
        sepCoeffExf: totalSepExfLat, 
        octPcsExf: totalOctExfPre,
        octCoeffExf: totalOctExfLat, 
        novPcsExf: totalNovExfPre,
        novCoeffExf: totalNovExfLat, 
        decPcsExf: totalDecExfPre,
        decCoeffExf: totalDecExfLat,
        totalPcsExf: totalExfPre,
        totalCoeffExf: totalExfLat,
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
    excel.saveAs(`Ex-Factory-report-${currentDate}.xlsx`);
    console.log("Exporting Columns: ", exportingColumns);
  };
  const handleTabChange = (selectedYear: any) => {
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
    console.log("okk");
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
                {/* <span /> 
                <span />
                <span /> */}
                <span />
                <span />
                <span /> <span />
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

                {janPre.toLocaleString()}
                <span />
                <span /> <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span /> <span />
                
                <span /> {janLat.toLocaleString()}
                <span />
                <span /> <span />
                <span />
                <span />
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
                
                
                {mayPre.toLocaleString()}
                <span />
                <span /> <span />
                <span />
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
                {junLat.toLocaleString()}
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
                <span /> <span />
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
                <span />
                {decLat.toLocaleString()}
                <span />
                <span /> <span />
                <span />
                
                
                
                {totalPre.toLocaleString()}
                <span />
                <span /><span />
                <span />
                <span />
                <span /> 
                <span />
                <span />
                <span />
                <span /> <span />
                <span /> <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span/>
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
       
        <>
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
              <label>Month Wise Parameters</label>
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
        {year.map((item) => (
          <Tabs.TabPane key={item.year} tab={item.year}>
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

                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 5 }}
                  lg={{ span: 5 }}
                  xl={{ span: 6 }}
                  style={{ marginTop: 17 }}
                >
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    style={{ marginRight: 50, width: 80 }}
                    htmlType="button"
                    onClick={getFilterdData}
                  >
                    Search
                  </Button>
                  <Button
                    type="primary"
                    icon={<UndoOutlined />}
                    htmlType="submit"
                    onClick={onReset}
                  >
                    Reset
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
        scroll={{ x: "max-content" }}
        pagination={false}/>
          </Tabs.TabPane>
        ))}
        
      </Tabs>
   
          ): (<> 
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
          </>
    )


}
export default MonthWiseReport