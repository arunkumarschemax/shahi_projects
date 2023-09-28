import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Select, Space, TabPaneProps, Table, Tabs, TabsProps, Tag, Typography, message } from "antd";
import { ColumnProps, ColumnsType } from "antd/es/table";
import { dateFormatterMap } from "@ant-design/pro-components";
import { OrdersService } from "@project-management-system/shared-services";
import { YearReq } from "@project-management-system/shared-models";
import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { IExcelColumn } from "antd-table-saveas-excel/app";
import { Excel } from "antd-table-saveas-excel";
import form from "antd/es/form";



export const WarehouseReport = () => {
  const [pageSize, setPageSize] = useState<number>(null);
  const [page, setPage] = React.useState(1);
  const [data, setData] = useState<any[]>([]);
  const [year, setYear] = useState<any[]>([]);
  const [tab, setTab] = useState<number>(2023);
  const service = new OrdersService()
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [excelData, setExcelData] = useState<any[]>([]);
  const {Text} = Typography
  const { Option } = Select;
  const [form] = Form.useForm();

  let JanPreviousTotal = 0
    let JanLatestTotal = 0
    let FebPreviousTotal = 0
    let FebLatestTotal= 0
  useEffect(()=>{
    getData();
    getTabs();
  },[])

  const getTabs = () => {
    service.getWareHouseYearData().then((res) => {
      if (res.status) {
        setYear(res.data);
      }
    });
  };
  const getData =()=>{
    const req = new YearReq(tab)
    // console.log(tab,'222222222222222222');
    service.getAllWareHouse(req).then(res =>{
      if(res.status){
        setData(res.data)
        setFilteredData(res.data);

      }else{
        setData([]);
      }
    })
    service.getWareHouseMonthExcelData(req).then(res =>{
      // console.log(res,'res==========');
      if(res.status){
        setExcelData(res.data)
      }
      else{
        setData([])
      }
    })}
 
    const CustomTitle = () => {
           
      return (
        <div>
           <Space size={"large"}>
     Production Plan Type Name<br/><span>Jan(Pcs)</span><br/><span><span></span>Jan(Coeff)</span><br/>
     <span>Feb(Pcs)</span><br/><span>Feb(Coeff)</span><br/>
      <span>Mar(Pcs)</span><br/><span>Mar(Coeff)</span><br/>
      <span>Apr(Pcs)</span><br/><span>Apr(Coeff)</span><br/><br/>
      <span>May(Pcs)</span><br/><span>May(Coeff)</span><br/><br/>
      <span>Jun(Pcs)</span><br/><span>Jun(Coeff)</span><br/>
      <span>Jul(Pcs)</span><br/><span>Jul(Coeff)</span><br/>
      <span>Aug(Pcs)</span><br/><br/><span>Aug(Coeff)</span><br/>
      <span>Sep(Pcs)</span><br/><span>Sep(Coeff)</span><br/>
      <span>Oct(Pcs)</span><br/><span>Oct(Coeff)</span><br/>
      <span> <span></span>Nov(Pcs)</span><br/><span>Nov(Coeff)</span><br/>
      <span>Dec(Pcs)<br/></span><br/><span>Dec(Coeff)</span><br/>
      <span>Total(Pcs)</span><br/><br/><span>Total(Coeff)</span>

</Space>
        
        </div>
      );
    };
  const childColumns1: any = [
    {
      // title: "Production Plan Type Name",
      dataIndex: "phasetype",
      align: "left",
      width: 130,
      // key: "phasetype",
    },
    // {
    //   title: "January",
    //         children: [
        {
          // title: `In PCs`,
          dataIndex: "janPcs",
          align:'right',
          width:100,
          render: (text: any, record: any) => {
            return (record.pcsData.map(
              (item: any) =><span>{item.janPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `In Coeff`,
          dataIndex: "janCoeff",
          align:'right',

          width:100,
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =>
            <span>{item.janCoeff}</span>  || '-'))
          
          }
        },
    //   ],
   
    // },
    {
      // title: "February",
      // dataIndex: "oldOrderQtyPcs2",
      //       children: [
      //   {
          // title: `In PCs`,
          dataIndex: "febPcs",
          width:100,
          align:'right',
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =>
            <span>{item.febPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `In Coeff`,
          dataIndex: "febCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =>
            <span>{item.febCoeff}</span>  || '-'))
          
          }
      //   },
      // ],
 
        },
      // {
      //   title: "March",
      //   dataIndex: "oldOrderQtyPcs3",
      //   key: "oldOrderQtyPcs3",
      //         children: [
        {
          // title: `In PCs`,
          dataIndex: "marPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =>
            <span>{item.marPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `In Coeff`,
          dataIndex: "marCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =>
            <span>{item.marCoeff}</span>  || '-'))
          
          }
        },
    //   ],
      
    // },
    // {
    //   title: "April",
    //   dataIndex: "oldOrderQtyPcs4",
    //   key: "oldOrderQtyPcs4",
    //         children: [
        {
          // title: `In PCs`,
          dataIndex: "aprPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =>
            <span>{item.aprPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `In Coeff`,
          dataIndex: "aprCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =>
            <span>{item.janPcs}</span>  || '-'))
          
          }
      //   },
      // ],
  
    },
    // {
    //   title: "May",
    //   dataIndex: "oldOrderQtyPcs5",
    //   key: "oldOrderQtyPcs5",
    //         children: [
        {
          // title: `In PCs`,
          dataIndex: "mayPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =>
            <span>{item.mayPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `In Coeff`,
          dataIndex: "mayCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =>
            <span>{item.mayCoeff}</span>  || '-'))
          
          }
      //   },
      // ],
    
      
    },
    // {
    //   title: "June",
    //   dataIndex: "oldOrderQtyPcs6",
    //   key: "oldOrderQtyPcs6",
    //         children: [
        {
          // title: `In PCs`,
          dataIndex: "junPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =>
              
            <span>{item.junPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `In Coeff`,
          dataIndex: "junCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.junCoeff}</span>  || '-'))
          
          }
      //   },
      // ],
   
      
    },
    // {
    //   title: "July",
    //   dataIndex: "oldOrderQtyPcs7",
    //   key: "oldOrderQtyPcs7",
    //         children: [
        {
          // title: `In PCs`,
          dataIndex: "julPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.julPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `In Coeff`,
          dataIndex: "julCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.julCoeff}</span>  || '-'))
          
          }
        },
    //   ],
  
      
    // },
    // {
    //   title: "August",
    //   dataIndex: "oldOrderQtyPcs8",
    //   key: "oldOrderQtyPcs8",
    //         children: [
        {
          // title: `In PCs`,
          dataIndex: "augPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.augPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `In Coeff`,
          dataIndex: "augCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.augCoeff}</span>  || '-'))
          
          }
      //   },
      // ],
   
    },
    // {
    //   title: "September",
    //   dataIndex: "oldOrderQtyPcs9",
    //   key: "oldOrderQtyPcs9",
    //         children: [
        {
          // title: `In PCs`,
          dataIndex: "sepPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.sepPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `In Coeff`,
          dataIndex: "sepCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.sepCoeff}</span>  || '-'))
          
          }
      //   },
      // ],
    
    },
    // {
    //   title: "October",
    //   dataIndex: "oldOrderQtyPcs10",
    //   key: "oldOrderQtyPcs10",
    //         children: [
        {
          // title: `In PCs`,
          dataIndex: "octPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.octPcs}</span>  || '-'))
          
          },
        },
        {
          // title: `In Coeff`,
          dataIndex: "octCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.octCoeff}</span>  || '-'))
          
          }
        },
    //   ],
    
    // },
    // {
    //   title: "November",
    //   dataIndex: "oldOrderQtyPcs11",
    //   key: "oldOrderQtyPcs11",
    //         children: [
        {
          // title: `In PCs`,
          dataIndex: "novPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.novPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `In Coeff`,
          dataIndex: "novCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.novCoeff}</span>  || '-'))
          
          },
        },
    //   ],
     
    // },
    // {
    //   title: "December",
    //   dataIndex: "oldOrderQtyPcs12",
    //   key: "oldOrderQtyPcs12",
    //         children: [
        {
          // title: `In PCs`,
          dataIndex: "decPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.decPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `In Coeff`,
          dataIndex: "decCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.decCoeff}</span>  || '-'))
          
          }
        },
    //   ],

      
    // },
    {
      // title: "Total In PCs",
      dataIndex: "totalPcs",
      width:100,
      align:"right",
    },
    {
      // title: "Total In Coeff",
      dataIndex: "totalCoeff",
      width:100,
      align:"right",
    },
  ]
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
      render: (text: any, record: any) => (
      <span>{record.itemName}</span>
      ),
      // ...getColumnSearchProps('itemName')
    },
    {
      title: <CustomTitle/>,
      dataIndex: "monthWiseData",
      align:'center',
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
  const handleExport = (e: any) => {
    e.preventDefault();

  
    const currentDate = new Date()
        .toISOString()
        .slice(0, 10)
        .split("-")
        .join("/");

   
    const excel = new Excel();
    // year.forEach((yearItem) => {
      excel.addSheet(tab.toString()); // Create a sheet for the year
  
      let exportingColumns: IExcelColumn[] = []
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
          title: `Jan In PCs`,
          dataIndex: "order_plan_qty",
          render: (text, record) =>
            record.whMonth == 1 ? record.order_plan_qty : "-",
        },
        {
          title: `Jan In Coeff`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) => {
           return record.whMonth == 1 ? record.order_plan_qty_coeff : "-";
          },
        },
        {
          title: `Feb In PCs`,
          dataIndex: "order_plan_qty",
          render: (text, record) =>
            record.whMonth == 2 ? record.order_plan_qty : "-",
        },
        {
          title: `Feb In Coeff`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) => {
            return record.whMonth == 2 ? record.order_plan_qty_coeff : "-";
          },
        },
  
        {
          title: `Mar In PCs`,
          dataIndex: "order_plan_qty",
          render: (text, record) =>
            record.whMonth == 3 ? record.order_plan_qty : "-",
        },
        {
          title: `Mar In Coeff`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) => {
            return record.whMonth == 3 ? record.order_plan_qty_coeff : "-";
          },
        },
  
        {
          title: `Apr In PCs`,
          dataIndex: "order_plan_qty",
          render: (text, record) =>
            record.whMonth == 4 ? record.order_plan_qty : "-",
        },
        {
          title: `Apr In Coeff`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) => {
            return record.whMonth == 4 ? record.order_plan_qty_coeff : "-";
          },
        },
  
        {
          title: `May In PCs`,
          dataIndex: "order_plan_qty",
          render: (text, record) =>
            record.whMonth == 5 ? record.order_plan_qty : "-",
        },
        {
          title: `May In Coeff`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) => {
            return record.whMonth == 5 ? record.order_plan_qty_coeff : "-";
          },
        },
  
        {
          title: `Jun In PCs`,
          dataIndex: "order_plan_qty",
          render: (text, record) =>
          record.whMonth == 6 ? record.order_plan_qty : "-",
        },
        {
          title: `Jun In Coeff`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) => {
            return record.whMonth == 6 ? record.order_plan_qty_coeff : "-";
          },
        },
  
        {
          title: `Jul In PCs`,
          dataIndex: "order_plan_qty",
          render: (text, record) =>
          record.whMonth == 7 ? record.order_plan_qty : "-",
        },
        {
          title: `Jul In Coeff`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) => {
            return record.whMonth == 7 ? record.order_plan_qty_coeff : "-";
          },
        },
  
        {
          title: `Aug In PCs`,
          dataIndex: "order_plan_qty",
          render: (text, record) =>
          record.whMonth == 8 ? record.order_plan_qty : "-",
        },
        {
          title: `Aug In Coeff`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) => {
           return record.whMonth == 8 ? record.order_plan_qty_coeff : "-";
          },
        },
  
        {
          title: `Sep In PCs`,
          dataIndex: "order_plan_qty",
          render: (text, record) =>
          record.whMonth == 9 ? record.order_plan_qty : "-",
        },
        {
          title: `Sep In Coeff`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) => {
            return record.whMonth == 9 ? record.order_plan_qty_coeff : "-";
          },
        },
  
        {
          title: `Oct In PCs`,
          dataIndex: "order_plan_qty",
          render: (text, record) =>
            record.whMonth == 10 ? record.order_plan_qty : "-",
        },
        {
          title: `Oct In Coeff`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) => {
            return record.whMonth == 10 ? record.order_plan_qty_coeff : "-";
          },
        },
  
        {
          title: `Nov In PCs`,
          dataIndex: "order_plan_qty",
          render: (text, record) =>
            record.whMonth == 11 ? record.order_plan_qty : "-",
          
        },
        {
          title: `Nov In Coeff`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) => {
            return record.whMonth == 11 ? record.order_plan_qty_coeff : "-";
          },
        },
  
        {
          title: `Dec In PCs`,
          dataIndex: "order_plan_qty",
          render: (text, record) =>
            record.whMonth == 12 ? record.order_plan_qty : "-",
        },
        {
          title: `Dec In Coeff`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) => {
            return record.month == 12 ? record.order_plan_qty_coeff : "-";
          },
        },
     
      ];
    
   
      excel.addRow();
  
      excel.addColumns(exportingColumns);
      excel.addDataSource(excelData);
    // });
    excel.saveAs(`Ware-House-report-${currentDate}.xlsx`);

};
const handleTabChange = (selectedYear: string) => {
  setTab(Number(selectedYear)); 
  getData()
  // console.log(Number(selectedYear),'///////////');
  
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
  getData();
};

const getTableSummary = (pageData) => {
  console.log('okk')
  let janPre = 0;let janLat = 0;
  let febPre = 0;let febLat = 0;
  let marPre = 0;let marLat = 0;
  let aprPre = 0;let aprLat = 0;
  let mayPre = 0;let mayLat = 0;
  let junPre = 0;let junLat = 0;
  let julPre = 0;let julLat = 0;
  let augPre = 0;let augLat = 0;
  let sepPre = 0;let sepLat = 0;
  let octPre = 0;let octLat = 0;
  let novPre = 0;let novLat = 0;
  let decPre = 0;let decLat = 0;
  let totalPre = 0;let totalLat =0;

  pageData.forEach((e) => {
    console.log(e)
    e.monthWiseData.forEach((rec) => {
      console.log(rec)
   if(Number(rec.pcsData[0].janPcs)) {
    console.log(rec.pcsData[0].janPcs)
    janPre += Number(rec.pcsData[0].janPcs)
  }
})
  })
  JanPreviousTotal += janPre
  pageData.forEach((e) => {
    e.monthWiseData.forEach((rec) => {
      if(rec.pcsData[0].janPcs) {
        const jan = [rec.pcsData[0].janPcs]
        janPre += Number(jan)
      }
      if(rec.pcsData[0].febPcs) {
        const feb = [rec.pcsData[0].febPcs]
        febPre += Number(feb)
      }
      if(rec.pcsData[0].marPcs) {
        const mar = [rec.pcsData[0].marPcs]
        marPre += Number(mar)
      }
      if(rec.pcsData[0].aprPcs) {
        const apr = [rec.pcsData[0].aprPcs]
        aprPre += Number(apr)
      } if(rec.pcsData[0].mayPcs) {
        const may = [rec.pcsData[0].mayPcs]
        mayPre += Number(may)
      } if(rec.pcsData[0].junPcs) {
        const jun = [rec.pcsData[0].junPcs]
        junPre += Number(jun)
      } if(rec.pcsData[0].julPcs) {
        const jul = [rec.pcsData[0].julPcs]
        julPre += Number(jul)
      } if(rec.pcsData[0].augPcs) {
        const aug = [rec.pcsData[0].augPcs]
        augPre += Number(aug)
      } if(rec.pcsData[0].sepPcs) {
        const sep = [rec.pcsData[0].sepPcs]
        sepPre += Number(sep)
      } if(rec.pcsData[0].octPcs) {
        const oct = [rec.pcsData[0].octPcs]
        octPre += Number(oct)
      } if(rec.pcsData[0].novPcs) {
        const nov = [rec.pcsData[0].novPcs]
        novPre += Number(nov)
      } if(rec.pcsData[0].decPcs) {
        const dec = [rec.pcsData[0].decPcs]
        decPre += Number(dec)
      }
      if(rec.pcsData[0].jancoeff) {
        const jan = [rec.coeffData[0].janCoeff]
        janLat += Number(jan)
      }
      if(rec.coeffData[0].febCoeff) {
        const feb = [rec.coeffData[0].febCoeff]
        febLat += Number(feb)
      }
      if(rec.coeffData[0].marCoeff) {
        const mar = [rec.coeffData[0].marCoeff]
        marLat += Number(mar)
      }
      if(rec.coeffData[0].aprCoeff) {
        const apr = [rec.coeffData[0].aprCoeff]
        aprLat += Number(apr)
      } if(rec.coeffData[0].mayCoeff) {
        const may = [rec.coeffData[0].mayCoeff]
        mayLat += Number(may)
      } if(rec.coeffData[0].junCoeff) {
        const jun = [rec.coeffData[0].junCoeff]
        junLat += Number(jun)
      } if(rec.coeffData[0].julCoeff) {
        const jul = [rec.coeffData[0].julCoeff]
        julLat += Number(jul)
      } if(rec.coeffData[0].augCoeff) {
        const aug = [rec.coeffData[0].augCoeff]
        augLat += Number(aug)
      } if(rec.coeffData[0].sepCoeff) {
        const sep = [rec.coeffData[0].sepCoeff]
        sepLat += Number(sep)
      } if(rec.coeffData[0].octCoeff) {
        const oct = [rec.coeffData[0].octCoeff]
        octLat += Number(oct)
      } if(rec.coeffData[0].novCoeff) {
        const nov = [rec.coeffData[0].novCoeff]
        novLat += Number(nov)
      } if(rec.coeffData[0].decCoeff) {
        const dec = [rec.coeffData[0].decCoeff]
        decLat += Number(dec)
      }
      if(rec.totalPcs) {
        const pcs = [rec.totalPcs]
        totalPre += Number(pcs)
      }
      if(rec.totalCoeff) {
        const coeff = [rec.totalCoeff]
        totalLat += Number(coeff)
      }
      
    })
  })


  return(
    <>
        <Table.Summary.Row>
      <Table.Summary.Cell index={0}></Table.Summary.Cell>
      <Table.Summary.Cell index={1}>Total</Table.Summary.Cell>
      <Table.Summary.Cell index={3}>
        <div>
          <Space></Space>
          <Space>
            <span/> <span/><span/><span/><span/><span/>
            <span/> <span/><span/><span/><span/><span/>
            <span/> <span/><span/><span/><span/><span/>
            <span/> <span/><span/><span/><span/><span/>
            <span/> <span/><span/><span/>
           {janPre}<span/><span/> <span/><span/><span/><span/><span/><span/> {janLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/> 
           {febPre}<span/><span/> <span/><span/><span/><span/>{febLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {marPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/><span/>{marLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {aprPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/> {aprLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {mayPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/> {mayLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {junPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>{julLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {julPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/> {julLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {augPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>{aprLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/><span/>
           {sepPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>{sepLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {octPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>{octLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {novPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>{novLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {decPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/><span/>{decLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {totalPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/><span/>{totalLat}
          
          </Space>
        </div>
      </Table.Summary.Cell>
    </Table.Summary.Row>
  </>
  )
}
  return (
    <Card
    title="Montly Wise WareHouse Report"
    extra={data.length > 0 ? (<Button
        type="default"
        style={{ color: 'green' }}
        onClick={handleExport}
        icon={<FileExcelFilled />}>Download Excel</Button>) : null}>

    
<Tabs type="card" onChange={handleTabChange} aria-disabled>
        {year.map((item) => (
        <Tabs.TabPane key={item.year} tab={item.year}>
          <Form form={form} layout={"vertical"}>
           <Row>
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
                        {/* <Option key='new' value="NEW">NEW</Option>
                                        <Option key='unaccepted' value="UNACCEPTED">UNACCEPTED</Option> */}
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
           </Row>
          </Form>
        <Table
          dataSource={data} 
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

// }
export default WarehouseReport;
