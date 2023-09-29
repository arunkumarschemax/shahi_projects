import {
  FileExcelFilled,
  SearchOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { YearReq } from "@project-management-system/shared-models";
import { OrdersService } from "@project-management-system/shared-services";
import {
  Button,
  Card,
  Col,
  Form,
  List,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  TabsProps,
  Typography,
  message,
} from "antd";
import { Excel } from "antd-table-saveas-excel";
import { IExcelColumn } from "antd-table-saveas-excel/app";
import form from "antd/es/form";
import { ColumnsType } from "antd/es/table";
import { type } from "os";
import React, { useEffect } from "react";
import { useState } from "react";

export const ExFactoryReportWithComparision = () => {
  const [pageSize, setPageSize] = useState<number>(null);
  const [page, setPage] = React.useState(1);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [year, setYear] = useState<any[]>([]);
  const [tab, setTab] = useState<number>(2023);
  const [excelData, setExcelData] = useState<any[]>([]);
  const service = new OrdersService();
  const { Text } = Typography;
  const [form] = Form.useForm();
  const { Option } = Select;

  let JanPreviousTotal = 0;
  let JanLatestTotal = 0;
  let FebPreviousTotal = 0;
  let FebLatestTotal = 0;

  useEffect(() => {
    getData();
    getTabs();
  }, []);
  const getTabs = () => {
    service.getExfactoryYearData().then((res) => {
      if (res.status) {
        setYear(res.data);
        console.log(res.data, "year");
      }
    });
  };
  const getData = () => {
    const req = new YearReq(tab);
    service.getExfactoryWithComparision(req).then((res) => {
      console.log(res.data, "res==========");
      if (res.status) {
        setData(res.data);
        setFilteredData(res.data);
      } else {
        setData([]);
      }
    });
    service.getExfactoryWithComparisionExcel(req).then((res) => {
      console.log(res, "res==========");
      if (res.status) {
        setExcelData(res.data);
      } else {
        setData([]);
      }
    });
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
      .slice(0, 100)
      .split("-")
      .join("/");

    const excel = new Excel();
    
    excel.addSheet(tab.toString()); 
    let exportingColumns: IExcelColumn[] = [];
    exportingColumns = [
      {
        title: "Item Name",
        dataIndex: "item",
      },
      {
        title: "Production Plan Type Name",
        dataIndex: "prod_plan_type",
      },
      {
        title: `Jan Previous`,
        dataIndex: "order_plan_qty",
        render: (text, record) =>
          record.ExfMonth == 1 && record.status == "previous"
            ? record.order_plan_qty
            : "-",
      },
      {
        title: `Jan Latest`,
        dataIndex: "order_plan_qty_coeff",
        render: (text, record) =>
          record.ExfMonth == 1 && record.status == "latest"
            ? record.order_plan_qty
            : "-",
      },
      {
        title: `Feb Previous`,
        dataIndex: "order_plan_qty",
        render: (text, record) =>
          record.ExfMonth == 2 && record.status == "previous"
            ? record.order_plan_qty
            : "-",
      },
      {
        title: `Feb Latest`,
        dataIndex: "order_plan_qty_coeff",
        render: (text, record) =>
          record.ExfMonth == 2 && record.status == "latest"
            ? record.order_plan_qty
            : "-",
      },

      {
        title: `Mar Previous`,
        dataIndex: "order_plan_qty",
        render: (text, record) =>
          record.ExfMonth == 3 && record.status == "previous"
            ? record.order_plan_qty
            : "-",
      },
      {
        title: `Mar Latest`,
        dataIndex: "order_plan_qty_coeff",
        render: (text, record) =>
          record.ExfMonth == 3 && record.status == "latest"
            ? record.order_plan_qty
            : "-",
      },

      {
        title: `Apr Previous`,
        dataIndex: "order_plan_qty",
        render: (text, record) =>
          record.ExfMonth == 4 && record.status == "previous"
            ? record.order_plan_qty
            : "-",
      },
      {
        title: `Apr Latest`,
        dataIndex: "order_plan_qty_coeff",
        render: (text, record) =>
          record.ExfMonth == 4 && record.status == "latest"
            ? record.order_plan_qty
            : "-",
      },

      {
        title: `May Previous`,
        dataIndex: "order_plan_qty",
        render: (text, record) =>
          record.ExfMonth == 5 && record.status == "previous"
            ? record.order_plan_qty
            : "-",
      },
      {
        title: `May Latest`,
        dataIndex: "order_plan_qty_coeff",
        render: (text, record) =>
          record.ExfMonth == 5 && record.status == "latest"
            ? record.order_plan_qty
            : "-",
      },

      {
        title: `Jun Previous`,
        dataIndex: "order_plan_qty",
        render: (text, record) =>
          record.ExfMonth == 6 && record.status == "previous"
            ? record.order_plan_qty
            : "-",
      },
      {
        title: `Jun Latest`,
        dataIndex: "order_plan_qty_coeff",
        render: (text, record) =>
          record.ExfMonth == 6 && record.status == "latest"
            ? record.order_plan_qty
            : "-",
      },

      {
        title: `Jul Previous`,
        dataIndex: "order_plan_qty",
        render: (text, record) =>
          record.ExfMonth == 7 && record.status == "previous"
            ? record.order_plan_qty
            : "-",
      },
      {
        title: `Jul Latest`,
        dataIndex: "order_plan_qty_coeff",
        render: (text, record) =>
          record.ExfMonth == 7 && record.status == "latest"
            ? record.order_plan_qty
            : "-",
      },

      {
        title: `Aug Previous`,
        dataIndex: "order_plan_qty",
        render: (text, record) =>
          record.ExfMonth == 8 && record.status == "previous"
            ? record.order_plan_qty
            : "-",
      },
      {
        title: `Aug Latest`,
        dataIndex: "order_plan_qty_coeff",
        render: (text, record) =>
          record.ExfMonth == 8 && record.status == "latest"
            ? record.order_plan_qty
            : "-",
      },

      {
        title: `Sep Previous`,
        dataIndex: "order_plan_qty",
        render: (text, record) =>
          record.ExfMonth == 9 && record.status == "previous"
            ? record.order_plan_qty
            : "-",
      },
      {
        title: `Sep Latest`,
        dataIndex: "order_plan_qty_coeff",
        render: (text, record) =>
          record.ExfMonth == 9 && record.status == "latest"
            ? record.order_plan_qty
            : "-",
      },

      {
        title: `Oct Previous`,
        dataIndex: "order_plan_qty",
        render: (text, record) =>
          record.ExfMonth == 10 && record.status == "previous"
            ? record.order_plan_qty
            : "-",
      },
      {
        title: `Oct Latest`,
        dataIndex: "order_plan_qty_coeff",
        render: (text, record) =>
          record.ExfMonth == 10 && record.status == "latest"
            ? record.order_plan_qty
            : "-",
      },

      {
        title: `Nov Previous`,
        dataIndex: "order_plan_qty",
        render: (text, record) =>
          record.ExfMonth == 11 && record.status == "previous"
            ? record.order_plan_qty
            : "-",
      },
      {
        title: `Nov Latest`,
        dataIndex: "order_plan_qty_coeff",
        render: (text, record) =>
          record.ExfMonth == 11 && record.status == "latest"
            ? record.order_plan_qty
            : "-",
      },

      {
        title: `Dec Previous`,
        dataIndex: "order_plan_qty",
        render: (text, record) =>
          record.ExfMonth == 12 && record.status == "previous"
            ? record.order_plan_qty
            : "-",
      },
      {
        title: `Dec Latest`,
        dataIndex: "order_plan_qty_coeff",
        render: (text, record) =>
          record.ExfMonth == 12 && record.status == "latest"
            ? record.order_plan_qty
            : "-",
      },
      // {
      //   title: "Total In PCs",
      //   dataIndex: "totalPcs",

      // },
      // {
      //   title: "Total In Coeff",
      //   dataIndex: "totalCoeff",

      // },
    ];

    excel.addRow();

    excel.addColumns(exportingColumns);
    excel.addDataSource(excelData);
    // });
    excel.saveAs(`Ex-Factory-report-${currentDate}.xlsx`);
  };
  const handleTabChange = (selectedYear: string) => {
    setTab(Number(selectedYear));
    getData();
    console.log(Number(selectedYear), "///////////");
  };
  const getFilterdData = () => {
    let ItemName = form.getFieldValue("ItemName");

    let filteredData = data;
    console.log(filteredData, "--------");

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
    getData();
  };

  const getTableSummary = (pageData) => {
    console.log(pageData,'pageeeeeeeeee');
    
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
        console.log(Number(rec.coeffData[0].janCoeff),'----------');
        
        if (rec.pcsData[0].janPcs) {
          console.log(rec.pcsData[0].janPcs,'jannnnnnnnnnn');
          
          const jan = [rec.pcsData[0].janPcs];
          janPre += Number(jan);
          console.log(janPre,'------');
          
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

  return (
    <Card
    >
  

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
        />
        
      </Tabs.TabPane>
    ))}
  </Tabs>
  </Card>
  );
};
export default ExFactoryReportWithComparision;
