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
    const req = new YearReq(tab,'')
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
<table>
  <tr >
  {/* <th style={{position: 'relative',paddingRight: '1200px'}}>Production Plan Type Name</th> */}
  <th colSpan={2} style={{ position: 'relative', right: '-100px' , }}>January</th>
    <th colSpan={2} style={{ position: 'relative', right: '-30px', borderLeft: '1px solid black',borderRight: '1px solid black', }}>Febuary</th><br/>
    <th colSpan={2}style={{ position: 'relative', right: '50px' ,borderRight: '1px solid black', }}>March</th><br/>
    <th colSpan={2} style={{ position: 'relative', right: '130px', borderRight: '1px solid black', }}>April</th><br/>
    <th colSpan={2}style={{ position: 'relative', right: '230px', borderRight: '1px solid black', }}>May</th><br/>
    <th colSpan={2}style={{ position: 'relative', right: '290px', borderRight: '1px solid black', }}>June</th><br/>
    <th colSpan={2}style={{ position: 'relative', right: '350px' ,borderRight: '1px solid black', }}>July</th><br/>
    <th colSpan={2}style={{ position: 'relative', right: '390px' ,borderRight: '1px solid black', }}>August</th><br/>
    <th colSpan={2}style={{ position: 'relative', right: '480px' ,borderRight: '1px solid black'}}>September</th><br/>
    <th colSpan={2}style={{ position: 'relative', right: '590px', borderRight: '1px solid black' }}>October</th><br/>
    <th colSpan={2}style={{ position: 'relative', right: '580px',borderRight: '1px solid black', }}>November</th><br/>
    <th colSpan={2}style={{ position: 'relative', right: '500px', }}>December</th><br/>
    <th colSpan={2}style={{ position: 'relative', right: '500px',  }}></th><br/>
    <th colSpan={2}style={{ position: 'relative', right: '500px',  }}></th><br/>

  </tr>
  <tr>
  <td colSpan={26} style={{ borderBottom: '1px solid black' }}></td>
</tr>
  <tr>
<td style={{paddingLeft:'10px',position:'relative',}}>Production Plan Type Name</td>
    <td style={{right: '100px',position: 'relative', }}>(Pcs)</td>
    <td style={{position: 'relative',right: '100px' }} >(Coeff)</td>

    <td  style={{position: 'relative',right: '40px', }} >(Pcs)</td>
    <td  style={{position: 'relative',right: '30px',}} >(Coeff)</td>

    <td  style={{position: 'relative',right: '20px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '20px'}} >(Coeff)</td>

    <td  style={{position: 'relative',right: '10px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '20px'}} >(Coeff)</td>

    <td  style={{position: 'relative',right: '10px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '-10px'}} >(Coeff)</td>

    <td  style={{position: 'relative',right: '-10px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '-20px'}} >(Coeff)</td>

    <td  style={{position: 'relative',right: '-10px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '-30px'}} >(Coeff)</td>

    <td  style={{position: 'relative',right: '-50px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '-50px'}} >(Coeff)</td>

    <td  style={{position: 'relative',right: '-55px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '-50px'}} >(Coeff)</td>
    <td  style={{position: 'relative',right: '-60px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '-80px'}} >(Coeff)</td>
    <td  style={{position: 'relative',right: '-100px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '-100px'}} >(Coeff)</td>
    <td  style={{position: 'relative',right: '-160px'}} >(Pcs)</td>
    <td  style={{position: 'relative',right: '-200px'}} >(Coeff)</td>
    <td  style={{position: 'relative',right: '-310px'}} >Total(Pcs)</td>
    <td  style={{position: 'relative',right: '-410px'}} >Total(Coeff)</td>
    
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
        width:100
  
      },
      {
            // title: `In PCs`,
            dataIndex: "janPcs",
            width:40,
            align:"right",
            render: (text: any, record: any) => {
              return record.pcsData.map(
                (item: any) => <span>{item.janPcs.toLocaleString()}</span> || "-"
              );
            },
          },
          {
            // title: `In Coeff`,
            dataIndex: "janCoeff",
            width:40,
            align:"right",
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
            align:"right",
            render: (text: any, record: any) => {
              return record.pcsData.map(
                (item: any) => 
                <span>{item.febPcs.toLocaleString()}</span> || "-"
  
              );
            },
          },
          {
            // title: `In Coeff`,
            dataIndex: "febCoeff",
            width:40,
            align:"right",
            render: (text: any, record: any) => {
              return record.coeffData.map(
                (item: any) => <span>{item.febCoeff.toLocaleString()}</span> || "-"
              );
            },
          },
        
    
      {
  
          
            // title: `In PCs`,
            dataIndex: "marPcs",
            width:40,
            align:"right",
            render: (text: any, record: any) => {
              return record.pcsData.map(
                (item: any) => <span>{item.marPcs.toLocaleString()}</span> || "-"
              );
            },
          },
          {
            // title: `In Coeff`,
            dataIndex: "marCoeff",
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
            dataIndex: "aprPcs",
            width:40,
            align:"right",
            render: (text: any, record: any) => {
              return record.pcsData.map(
                (item: any) => <span>{item.aprPcs.toLocaleString()}</span> || "-"
              );
            },
          },
          {
            // title: `In Coeff`,
            dataIndex: "aprCoeff",
            width:40,
            align:"right",
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
            width:40,
            align:"right",
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
            align:"right",
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
            width:40,
            align:"right",
            render: (text: any, record: any) => {
              return record.pcsData.map(
                (item: any) => <span>{item.junPcs.toLocaleString()}</span> || "-"
              );
            },
          },
          {
            // title: `In Coeff`,
            dataIndex: "junCoeff",
            width:40,
            align:"right",
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
            width:50,
            align:"right",
            render: (text: any, record: any) => {
              return record.pcsData.map(
                (item: any) => <span>{item.julPcs.toLocaleString()}</span> || "-"
              )
            },
          },
          {
            // title: `In Coeff`,
            dataIndex: "julCoeff",
            width:40,
            align:"right",
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
            width:40,
            align:"right",
            render: (text: any, record: any) => {
              return record.pcsData.map(
                (item: any) => <span>{item.augPcs.toLocaleString()}</span> || "-"
              );
            },
          },
          {
            // title: `In Coeff`,
            dataIndex: "augCoeff",
            width:30,
            align:"right",
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
            width:40,
            align:"right",
            render: (text: any, record: any) => {
              return record.pcsData.map(
                (item: any) => <span>{item.sepPcs.toLocaleString()}</span> || "-"
              );
            },
          },
          {
            // title: `In Coeff`,
            dataIndex: "sepCoeff",
            width:40,
            align:"right",
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
            width:40,
            align:"right",
            render: (text: any, record: any) => {
              return record.pcsData.map(
                (item: any) => <span>{item.octPcs.toLocaleString()}</span> || "-"
              );
            },
          },
          {
            // title: `In Coeff`,
            dataIndex: "octCoeff",
            width:40,
            align:"right",
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
            width:40,
            align:"right",
            render: (text: any, record: any) => {
              return record.pcsData.map(
                (item: any) => <span>{item.novPcs.toLocaleString()}</span> || "-"
              );
            },
          },
          {
            // title: `In Coeff`,
            dataIndex: "novCoeff",
            width:40,
            align:"right",
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
            width:60,
            align:"right",
            render: (text: any, record: any) => {
              return record.pcsData.map(
                (item: any) => <span>{item.decPcs.toLocaleString()}</span> || "-"
              );
            },
          },
          {
            // title: `In Coeff`,
            dataIndex: "decCoeff",
            width:60,
            align:"right",
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
        align:"right",
        width:100,
        render: (text: any, record: any) => {
          return record.totalPcs ? record.totalPcs.toLocaleString() :0
        },
      },
      {
        // title: "Total In Coeff",
        dataIndex: "totalCoeff",
        align:"right",
        width:100,
        render: (text: any, record: any) => {
          return record.totalCoeff?record.totalCoeff.toLocaleString() :0
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
    const Calculate=(data)=>{
      const pcsfulltotal={
        janPcs:0,
        febPcs:0,
        marPcs:0,
        aprPcs:0,
        mayPcs:0,
        junPcs:0,
        julPcs:0,
        augPcs:0,
        sepPcs:0,
        octPcs:0,
        novPcs:0,
        decPcs:0,

      };
      data.forEach((item)=>{
        for(const month in pcsfulltotal){
          if(item[month]){
           
            pcsfulltotal[month]+= Number(item[month]);
            
          }
        }
      })
      return pcsfulltotal;
    };
      const CalculateTotal=(data)=>{
        const coeffsFullTotsl={
          janCoeff:0,
          Coeff:0,
          marCoeff:0,
          aprCoeff:0,
          mayCoeff:0,
          junCoeff:0,
          julCoeff:0,
          augCoeff:0,
          sepCoeff:0,
          octCoeff:0,
          novCoeff:0,
          decCoeff:0,
  
        };
  
        data.forEach((item)=>{
          for(const month in coeffsFullTotsl){
            if(item[month]){
             
              coeffsFullTotsl[month]+= Number(item[month]);
              
            }
          }
        })
        return coeffsFullTotsl;
      };
     
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
      excel.addDataSource(excelData)
      const pcstotal = Calculate(excelData)
      const coefftotal = CalculateTotal(excelData)
      const combined = {...pcstotal , ...coefftotal }
      excel.addDataSource([combined]);
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
    // title="Montly Wise WareHouse Report"
    // extra={data.length > 0 ? (<Button
    //     type="default"
    //     style={{ color: 'green' }}
    //     onClick={handleExport}
    //     icon={<FileExcelFilled />}>Download Excel</Button>) : null}
        >

    
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
        />
        
       </Tabs.TabPane>
    ))}
  </Tabs>
  </Card>
  );
};

// }
export default WarehouseReport;
