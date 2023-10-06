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
  const [pageSize, setPageSize] = useState<number>(10);  
  const [phase, setPhase] = useState<any[]>([]);
  const [phaseExcel, setPhaseExcel] = useState<any[]>([]);
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
      console.log(res,"*********")
      if(res.status){
        setPhase(res.data)
      }else{
        setPhase([]);
      }
    })
    service.getPhaseMonthExcelData(req).then((res) => {
      console.log(res, "res==========");
      if (res.status) {
        setPhaseExcel(res.data);
      } else {
        setData([]);
      }
    });
  };

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
    setPage(1); 
    setPageSize(size);
  },
};

  
  
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
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>In Pcs</td>
      <td style={{borderCollapse: 'collapse'}}>In Coeff</td>
      </tr>
    </table>
    </td>
    <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',borderCollapse: 'collapse',backgroundColor: 'lightblue',borderLeft: '1px solid #ddd'}}>February</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>In Pcs</td>
      <td style={{borderCollapse: 'collapse'}}>In Coeff</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',backgroundColor: 'lightgreen',borderCollapse: 'collapse',borderLeft: '1px solid #ddd'}}>March</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>In Pcs</td>
      <td style={{borderCollapse: 'collapse'}}>In Coeff</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',backgroundColor: 'lightblue',borderCollapse: 'collapse',borderLeft: '1px solid #ddd'}}>April</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>In Pcs</td>
      <td style={{borderCollapse: 'collapse'}}>In Coeff</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',backgroundColor: 'lightgreen',borderCollapse: 'collapse',borderLeft: '1px solid #ddd'}}>May</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>In Pcs</td>
      <td style={{borderCollapse: 'collapse'}}>In Coeff</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',backgroundColor: 'lightblue',borderCollapse: 'collapse',borderLeft: '1px solid #ddd'}}>June</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>In Pcs</td>
      <td style={{borderCollapse: 'collapse'}}>In Coeff</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',backgroundColor: 'lightgreen',borderCollapse: 'collapse',borderLeft: '1px solid #ddd'}}>July</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>In Pcs</td>
      <td style={{borderCollapse: 'collapse'}}>In Coeff</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',backgroundColor: 'lightblue',borderCollapse: 'collapse',borderLeft: '1px solid #ddd'}}>August</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>In Pcs</td>
      <td style={{borderCollapse: 'collapse'}}>In Coeff</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',backgroundColor: 'lightgreen',borderCollapse: 'collapse',borderLeft: '1px solid #ddd'}}>September</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>In Pcs</td>
      <td style={{borderCollapse: 'collapse'}}>In Coeff</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',backgroundColor: 'lightblue',borderCollapse: 'collapse',borderLeft: '1px solid #ddd'}}>October</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>In Pcs</td>
      <td style={{borderCollapse: 'collapse'}}>In Coeff</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',backgroundColor: 'lightgreen',borderCollapse: 'collapse',borderLeft: '1px solid #ddd'}}>November</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>In Pcs</td>
      <td style={{borderCollapse: 'collapse'}}>In Coeff</td>
      </tr>
    </table>
    </td>   <td>
    <table style={{textAlign:'center',borderCollapse: 'collapse'}}>
      <tr>
      <th colSpan={2} style={{borderBottom: '1px solid #ddd',backgroundColor: 'lightblue',borderCollapse: 'collapse',borderLeft: '1px solid #ddd',borderRight: '1px solid #ddd'}}>December</th>
      </tr>
      <tr>
      <td style={{borderRight: '1px solid #ddd',borderLeft: '1px solid #ddd',borderCollapse: 'collapse'}}>In Pcs</td>
      <td style={{borderCollapse: 'collapse',borderRight: '1px solid #ddd'}}>In Coeff</td>
      </tr>
    </table>
    </td>
    <td>
  <table  >
      <th style={{width:50,textAlign:'center'}}>Total(In Pcs)</th>
    </table>
    </td> <td>
  <table  >
      <th style={{width:50,textAlign:'center'}}>Total(In Coeff)</th>
    </table>
    </td>
</table>
  
      </div>
    );
  };
  const childColumns1: any = [
    {
      // title: "Production Plan Type Name",
      dataIndex: "phasetype",
      width:80,
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
    
    {
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
      dataIndex: "octCoeff",
      width: 50,
      align: "right",
      render: (text: any, record: any) => {
        return record.coeffData.map(
          (item: any) => <span>{item.octCoeff.toLocaleString()}</span> || "-"
        );
      },
    },

    {
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
      dataIndex: "novCoeff",
      width: 50,
      align: "right",
      render: (text: any, record: any) => {
        return record.coeffData.map(
          (item: any) => <span>{item.novCoeff.toLocaleString()}</span> || "-"
        );
      },
    },
  
    {
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
      dataIndex: "decCoeff",
      width: 50,
      align: "right",
      render: (text: any, record: any) => {
        return record.coeffData.map(
          (item: any) => <span>{item.decCoeff.toLocaleString()}</span> || "-"
        );
      },
    },
   
    {
      dataIndex: "totalPcs",
      align: "right",
      width: 70,
      render: (text: any, record: any) => {
        return record.totalPcs ? record.totalPcs.toLocaleString() : 0;
      },
    },
    {
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
          dataIndex: "aprPcsCoeff",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.pcsData.map(
              (item: any) => <span>{item.aprPcsCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
   
        {
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
          dataIndex: "mayPcsCoeff",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.mayPcsCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
    
        {
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
          dataIndex: "junPcsCoeff",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.junPcsCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
    
        {
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
          dataIndex: "julPcsCoeff",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.julPcsCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
    
        {
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
          dataIndex: "augPcsCoeff",
          width:30,
          align:"right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.augPcsCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
    
        {
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
          dataIndex: "sepPcsCoeff",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.sepPcsCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
    
        {
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
          dataIndex: "octPcsCoeff",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.octPcsCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
    
        {
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
          dataIndex: "novPcsCoeff",
          width:40,
          align:"right",
          render: (text: any, record: any) => {
            return record.coeffData.map(
              (item: any) => <span>{item.novPcsCoeff.toLocaleString()}</span> || "-"
            );
          },
        },
    
        {
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
          pagination={false} // Hide pagination for child table
          rowKey={(record) => record.itemName}
        />
      ),
    },
  ];
  let columns:any[]=[];
  if (selected =='ExFactory'){
    columns.push( 
    {
      title: "S No",
      key: "sno",
      render: (text, object, index) => (page - 1) * pageSize + (index + 1),
    },
    
    { title: "Production Plan Type Name",dataIndex: "prod_plan_type",},
    {title: ``,dataIndex: "",},
    {title: ``,dataIndex: "",},

    {title:<span style={{ background: 'lightgreen' }}>Jan In PCs</span>, dataIndex: "janPcsExf", align: "right"},
    {title: <span style={{ background: 'lightgreen' }}>Jan In Coeff</span>,dataIndex: "janExfCoeff",align:"right"},
      {title: ``,dataIndex: "",},
      {title: ``,dataIndex: "",},

      {title: <span style={{ background: 'lightblue' }}>Feb In PCs</span>,dataIndex: "febPcsExf",align:"right"},
      {title: <span style={{ background: 'lightblue' }}>Feb In Coeff</span>,dataIndex: "febExfCoeff",align:"right"},
      {title: ``,dataIndex: "",},
      {title: ``,dataIndex: "",},

      {title: <span style={{ background: 'lightgreen' }}>Mar In PCs</span>,dataIndex: "marPcsExf",align:"right"},
      {title: <span style={{ background: 'lightgreen' }}>Mar In Coeff</span>,dataIndex: "marExfCoeff",align:"right"},
      {title: ``,dataIndex: "",},
      {title: ``,dataIndex: "",},

      {title: <span style={{ background: 'lightblue' }}>Apr In PCs</span>,dataIndex: "aprPcsExf",align:"right"},
      {title:<span style={{ background: 'lightblue' }}>Apr In Coeff</span>,dataIndex: "aprExfCoeff",align:"right"},
      {title: ``,dataIndex: "",},
      {title: ``,dataIndex: "",},

      {title: <span style={{ background: 'lightgreen' }}> May In PCs</span>,dataIndex: "mayPcsExf",align:"right"},
      {title: <span style={{ background: 'lightgreen' }}> May In Coeff</span>,dataIndex: "mayExfCoeff",align:"right"},
      {title: ``,dataIndex: "",},
      {title: ``,dataIndex: "",},

      {title:<span style={{ background: 'lightblue' }}>Jun In PCs</span>,dataIndex: "junPcsExf",align:"right"},
      {title: <span style={{ background: 'lightblue' }}>Jun In Coeff</span>,dataIndex: "junExfCoeff",align:"right"},
      {title: ``,dataIndex: "",},
      {title: ``,dataIndex: "",},

      {title: <span style={{ background: 'lightgreen' }}> Jul In PCs</span>,dataIndex: "julPcsExf",align:"right"},
      {title: <span style={{ background: 'lightgreen' }}> Jul In Coeff</span>,dataIndex: "julExfCoeff",align:"right"},
      {title: ``,dataIndex: "",},
      {title: ``,dataIndex: "",},

      {title: <span style={{ background: 'lightblue' }}>Aug In PCs</span>,dataIndex: "augPcsExf",align:"right"},
      {title: <span style={{ background: 'lightblue' }}>Aug In Coeff</span>,dataIndex: "augExfCoeff",align:"right"},
      {title: ``,dataIndex: "",},
      {title: ``,dataIndex: "",},

      {title: <span style={{ background: 'lightgreen' }}> Sep In PCs</span>,dataIndex: "sepPcsExf",align:"right"},
      {title:<span style={{ background: 'lightgreen' }}> Sep In Coeff</span>,dataIndex: "sepExfCoeff",align:"right"},
      {title: ``,dataIndex: "",},
      {title: ``,dataIndex: "",},

      {title: <span style={{ background: 'lightblue' }}>Oct In PCs</span>,dataIndex: "octPcsExf",align:"right"},
      {title: <span style={{ background: 'lightblue' }}>Oct In Coeff</span>,dataIndex: "octExfCoeff",align:"right"},
      {title: ``,dataIndex: "",},
      {title: ``,dataIndex: "",},

      {title: <span style={{ background: 'lightgreen' }}> Nov In PCs</span>,dataIndex: "novPcsExf",align:"right"},
      {title: <span style={{ background: 'lightgreen' }}> Nov In Coeff</span>,dataIndex: "novExfCoeff",align:"right"},
      {title: ``,dataIndex: "",},
      {title: ``,dataIndex: "",},

      {title: <span style={{ background: 'lightblue' }}> Dec In PCs</span>,dataIndex: "decPcsExf",align:"right"},
      {title: <span style={{ background: 'lightblue' }}> Dec In Coeff</span>,dataIndex: "decExfCoeff",align:"right"},
      {title: ``,dataIndex: "",},

   )

}
if(selected === 'WareHouse'){
  columns.push(
    { title: "Production Plan Type Name",dataIndex: "prod_plan_type",},
    {title: <span style={{ background: 'lightblue' }}> Jan In PCs</span>,dataIndex: "janPcsWh",align:"right"},
    {title: <span style={{ background: 'lightblue' }}> Jan In Coeff</span>,dataIndex: "janCoeffWh",align:"right"},
    {title: ``,dataIndex: "",},
    {title: ``,dataIndex: "",},

    {title: <span style={{ background: 'lightgreen' }}> Feb In PCs</span>,dataIndex: "febPcsWh",align:"right"},
    {title: <span style={{ background: 'lightgreen' }}> Feb In Coeff</span>,dataIndex: "febCoeffWh",align:"right"},
    {title: ``,dataIndex: "",},
    {title: ``,dataIndex: "",},

    {title: <span style={{ background: 'lightblue' }}> Mar In PCs</span>,dataIndex: "marPcsWh",align:"right"},
    {title: <span style={{ background: 'lightblue' }}> Mar In Coeff</span>,dataIndex: "marCoeffWh",align:"right"},
    {title: ``,dataIndex: "",},
    {title: ``,dataIndex: "",},

    {title: <span style={{ background: 'lightgreen' }}> Apr In PCs</span>,dataIndex: "aprPcsWh",align:"right"},
    {title: <span style={{ background: 'lightgreen' }}> Apr In Coeff</span>,dataIndex: "aprCoeffWh",align:"right"},
    {title: ``,dataIndex: "",},
    {title: ``,dataIndex: "",},

    {title: <span style={{ background: 'lightblue' }}> May In PCs</span>,dataIndex: "mayPcsWh",align:"right"},
    {title: <span style={{ background: 'lightblue' }}> May In Coeff</span>,dataIndex: "mayCoeffWh",align:"right"},
    {title: ``,dataIndex: "",},
    {title: ``,dataIndex: "",},

    {title:  <span style={{ background: 'lightgreen' }}> Jun In PCs</span>,dataIndex: "junPcsWh",align:"right"},
    {title:  <span style={{ background: 'lightgreen' }}> Jun In Coeff</span>,dataIndex: "junCoeffWh",align:"right"},
    {title: ``,dataIndex: "",},
    {title: ``,dataIndex: "",},

    {title:  <span style={{ background: 'lightblue' }}> Jul In PCs</span>,dataIndex: "julPcsWh",align:"right"},
    {title:  <span style={{ background: 'lightblue' }}> Jul In Coeff</span>,dataIndex: "julCoeffWh",align:"right"},
    {title: ``,dataIndex: "",},
    {title: ``,dataIndex: "",},

    {title:  <span style={{ background: 'lightgreen' }}> Aug In PCs</span>,dataIndex: "augPcsWh",align:"right"},
    {title:  <span style={{ background: 'lightgreen' }}> Aug In Coeff</span>,dataIndex: "augCoeffWh",align:"right"},
    {title: ``,dataIndex: "",},
    {title: ``,dataIndex: "",},

    {title:  <span style={{ background: 'lightblue' }}> Sep In PCs</span>,dataIndex: "sepPcsWh",align:"right"},
    {title:  <span style={{ background: 'lightblue' }}> Sep In Coeff</span>,dataIndex: "sepCoeffWh",align:"right"},
    {title: ``,dataIndex: "",},
    {title: ``,dataIndex: "",},

    {title: <span style={{ background: 'lightgreen' }}> Oct In PCs</span>,dataIndex: "octPcsWh",align:"right"},
    {title:  <span style={{ background: 'lightgreen' }}> Oct In Coeff</span>,dataIndex: "octCoeffWh",align:"right"},
    {title: ``,dataIndex: "",},
    {title: ``,dataIndex: "",},

    {title:  <span style={{ background: 'lightblue' }}> Nov In PCs</span>,dataIndex: "novPcsWh",align:"right"},
    {title:  <span style={{ background: 'lightblue' }}> Nov In Coeff</span>,dataIndex: "novCoeffWh",align:"right"},
    {title: ``,dataIndex: "",},
    {title: ``,dataIndex: "",},

    {title:  <span style={{ background: 'lightgreen' }}> Dec In PCs</span>,dataIndex: "decPcsWh",align:"right"},
    {title:  <span style={{ background: 'lightgreen' }}> Dec In Coeff</span>,dataIndex: "decCoeffWh",align:"right"},
    {title: ``,dataIndex: "",},
    {title: ``,dataIndex: "",},

  
  )
}

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

  const columnsWithBackground = columns.map((column) => ({
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
        {title: `Dec In Coeff`,dataIndex: "decCoeffExf",}
      
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
    let secondTableColumns: IExcelColumn[] = [];
    if(selected =='ExFactory'){
      console.log('exfactory');
      
      secondTableColumns.push(
      { title: "Production Plan Type Name",dataIndex: "prod_plan_type",},
      {title: `Jan In PCs`,dataIndex: "janPcsExf",},
      {title: `Jan In Coeff`,dataIndex: "janExfCoeff",},
      {title: `Feb In PCs`,dataIndex: "febPcsExf",},
      {title: `Feb In Coeff`,dataIndex: "febExfCoeff",},
      {title: `Mar In PCs`,dataIndex: "marPcsExf",},
      {title: `Mar In Coeff`,dataIndex: "marExfCoeff",},
      {title: `Apr In PCs`,dataIndex: "aprPcsExf",},
      {title: `Apr In Coeff`,dataIndex: "aprExfCoeff",},
      {title: `May In PCs`,dataIndex: "mayPcsExf",},
      {title: `May In Coeff`,dataIndex: "mayExfCoeff",},
      {title: `Jun In PCs`,dataIndex: "junPcsExf",},
      {title: `Jun In Coeff`,dataIndex: "junExfCoeff",},
      {title: `Jul In PCs`,dataIndex: "julPcsExf",},
      {title: `Jul In Coeff`,dataIndex: "julExfCoeff",},
      {title: `Aug In PCs`,dataIndex: "augPcsExf",},
      {title: `Aug In Coeff`,dataIndex: "augExfCoeff",},
      {title: `Sep In PCs`,dataIndex: "sepPcsExf",},
      {title: `Sep In Coeff`,dataIndex: "sepExfCoeff",},
      {title: `Oct In PCs`,dataIndex: "octPcsExf",},
      {title: `Oct In Coeff`,dataIndex: "octExfCoeff",},
      {title: `Nov In PCs`,dataIndex: "novPcsExf",},
      {title: `Nov In Coeff`,dataIndex: "novExfCoeff",},
      {title: `Dec In PCs`,dataIndex: "decPcsExf",},
      {title: `Dec In Coeff`,dataIndex: "decExfCoeff",}
    
  )
}
if(selected === 'WareHouse'){
  secondTableColumns.push(
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

  excel.addColumns(secondTableColumns);
  excel.addDataSource(phaseExcel)
  excel.addRow();
  if(selected =='ExFactory'){ 
      excel.saveAs(`Ex-Factory-report-${currentDate}.xlsx`);
  }
  if(selected == 'WareHouse'){
    excel.saveAs(`Ware-House-report-${currentDate}.xlsx`);
  }
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
          console.log(janPre,'jan');

        }
        if (rec.pcsData[0].febPcs) {
          const feb = [rec.pcsData[0].febPcs];
          febPre += Number(feb);
          console.log(febPre,'feb');
          
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
        if (rec.coeffData[0].janCoeff) {
          const jan = [rec.coeffData[0].janCoeff];
          janLat += Number(jan);
          console.log(janLat,'--------------------');
          
        }
        
        if (rec.coeffData[0].febCoeff) {
          const feb = [rec.coeffData[0].febCoeff];
          febLat += Number(feb);
          console.log(febLat,'===========');
          
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
               
                {aprLat.toLocaleString()}
                <span />
                <span /> <span />
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
                <span />
                 {mayLat.toLocaleString()}
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
                <span /> 
                <span />
                <span /> 
                <span />  <span /> 
                <span />
                
                {totalPre.toLocaleString()}
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
                      bordered={false}
              dataSource={filteredData}
              columns={columns5}
              size="small"
              scroll={{ x: "max-content" }}
              summary={getTableSummary}
              pagination={pagination}

            />
               <Table
         columns={columns} 
         dataSource={phaseExcel}
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