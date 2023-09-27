
import { FileExcelFilled, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { YearReq } from "@project-management-system/shared-models";
import { OrdersService } from "@project-management-system/shared-services";
import { Button, Card, Col, Form, List, Row, Select, Space, Table, Tabs, TabsProps, Typography, message } from "antd";
import { Excel } from "antd-table-saveas-excel";
import { IExcelColumn } from "antd-table-saveas-excel/app";
import { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { useState } from "react";

export const WareHouseComparision = () => {
  const [pageSize, setPageSize] = useState<number>(null);
  const [page, setPage] = React.useState(1);
  const [data, setData] = useState<any[]>([]);
  const [year, setYear] = useState<any[]>([]);
  const [tab, setTab] = useState<number>(2023);
  const [excelData, setExcelData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([])
  const service = new OrdersService()
  const [form] = Form.useForm();
  const { Option } = Select;
  const {Text} = Typography
  useEffect(()=>{
    getData();
    getTabs()
  },[])

  const getTabs = () => {
    service.getWareHouseYearData().then((res) => {
      if (res.status) {
        setYear(res.data);
        // console.log(res.data,'hhhhhhh')
      }
    });
  };
  const getData =()=>{
    const req = new YearReq(tab)    
    service.getWareHouseComparisionData(req).then(res =>{

      if(res.status){
        setYear(res.data)
      }
    })
    service.getWareHouseComparisionData(req).then(res =>{
      console.log(res,'res==========');
      if(res.status){
        setData(res.data)
        setFilteredData(res.data)
      }
      else{
        setData([])
      }
    })
    service.getWareHouseComparisionExcelData(req).then((res) => {
      console.log(res, "res==========");
      if (res.status) {
        setExcelData(res.data);
      } else {
        setData([]);
      }
    })
  }
  
  const getFilterdData = () => {
    let ItemName = form.getFieldValue('ItemName');
  
    let filteredData = data;
    console.log(filteredData,'--------');
    
    if (ItemName) {
        filteredData = filteredData.filter(record => record.itemName === ItemName);
        if (filteredData.length === 0) {
            message.error("No Data Found")
        }
        setFilteredData(filteredData);
    }
   
  }
  const onReset = () => {
    form.resetFields();
    getData();
  }
  const CustomTitle = () => {
           
    return (
      <div>
      <Space size={"large"}>
       <span>Production Plan Type Name</span><span>Jan(previous)</span><br/><span></span>Jan(latest)
       <span>Feb(previous)</span><br/><span>Feb(latest)</span>
        <span>Mar(previous)</span><br/><span>Mar(latest)</span>
        <span>Apr(previous)</span><br/><span>Apr(latest)</span>
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
          // title: `Previous`,
          dataIndex: "janPcs",
          align:"right",
          width:100,
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.janPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `Latest`,
          dataIndex: "janCoeff",
          align:"right",
          width:100,
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.janCoeff}</span>  || '-'))
          
          }
        },
    //   ],
   
    // },
    // {
    //   title: "February",
    //   dataIndex: "oldOrderQtyPcs2",
    //         children: [
        {
          // title: `Previous`,
          dataIndex: "febPcs",
          width:100,
          align:'right',
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.febPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `Latest`,
          dataIndex: "febCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.febCoeff}</span>  || '-'))
          
          }
        },
    //   ],
 
    // },
    // {
    //   title: "March",
    //   dataIndex: "oldOrderQtyPcs3",
    //   key: "oldOrderQtyPcs3",
    //         children: [
        {
          // title: `Previous`,
          dataIndex: "marPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.marPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `Latest`,
          dataIndex: "marCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.marCoeff}</span>  || '-'))
          
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
          // title: `Previous`,
          dataIndex: "aprPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.aprPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `Latest`,

          dataIndex: "aprCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.janPcs}</span>  || '-'))
          
          }
        },
    //   ],
  
    // },
    // {
    //   title: "May",
    //   dataIndex: "oldOrderQtyPcs5",
    //   key: "oldOrderQtyPcs5",
    //         children: [
        {
          // title: `Previous`,
          dataIndex: "mayPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.janPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `Latest`,
          dataIndex: "mayCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.mayCoeff}</span>  || '-'))
          
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
          // title: `Previous`,
          dataIndex: "junPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.junPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `Latest`,
          dataIndex: "junCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.junCoeff}</span>  || '-'))
          
          }
      //   },
      // ],
   
      
    },
    // // {
    // //   title: "July",
    // //   dataIndex: "oldOrderQtyPcs7",
    // //   key: "oldOrderQtyPcs7",
    //         children: [
        {
          // title: `Previous`,
          dataIndex: "julPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.julPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `Latest`,
          dataIndex: "julCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.julCoeff}</span>  || '-'))
          
          }
      //   },
      // ],
  
      
    },
    // {
    //   title: "August",
    //   dataIndex: "oldOrderQtyPcs8",
    //   key: "oldOrderQtyPcs8",
    //         children: [
        {
          // title: `Previous`,
          dataIndex: "augPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.augPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `Latest`,
          dataIndex: "augCoeff",
          width:150,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.augCoeff}</span>  || '-'))
          
          }
        },
    //   ],
   
    // },
    // {
    //   title: "September",
    //   dataIndex: "oldOrderQtyPcs9",
    //   key: "oldOrderQtyPcs9",
    //         children: [
        {
          // title: `Previous`,
          dataIndex: "sepPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.sepPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `Latest`,
          dataIndex: "sepCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.sepCoeff}</span>  || '-'))
          
          }
        },
    //   ],
    
    // },
    // {
    //   title: "October",
    //   dataIndex: "oldOrderQtyPcs10",
    //   key: "oldOrderQtyPcs10",
    //         children: [
        {
          // title: `Previous`,
          dataIndex: "octPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.octPcs}</span>  || '-'))
          
          },
        },
        {
          // title: `Latest`,
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
          // title: `Previous`,
          dataIndex: "novPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.novPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `Latest`,
          dataIndex: "novCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.novCoeff}</span>  || '-'))
          
          },
      //   },
      // ],
     
    },
    // {
    //   title: "December",
    //   dataIndex: "oldOrderQtyPcs12",
    //   key: "oldOrderQtyPcs12",
    //         children: [
        {
          // title: `Previous`,
          dataIndex: "decPcs",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.decPcs}</span>  || '-'))
          
          }
        },
        {
          // title: `Latest`,
          dataIndex: "decCoeff",
          width:100,
          align:"right",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.decCoeff}</span>  || '-'))
          
          }
      //   },
      // ],

      
    },
    {
      // title: "Total Previous",
      dataIndex: "totalPcs",
      align:"right",
     width:100
    },
    {
      // title: "Total Latest",
      dataIndex: "totalCoeff",
      align:"right",
      width:100
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
      excel.addSheet(tab.toString()); 
  
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
          title: `Jan Previous`,
          dataIndex: "order_plan_qty",
          render: (text, record) =>
            record.ExfMonth == 1 && record.status == 'previous'? record.order_plan_qty : "-",
        },
        {
          title: `Jan Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 1 && record.status == 'latest'? record.order_plan_qty : "-",
      },
        {
          title: `Feb Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 2 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Feb Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 2 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Mar Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 3 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Mar Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 3 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Apr Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 4 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Apr Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 4 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `May Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 5 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `May Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 5 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Jun Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 6 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Jun Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 6 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Jul Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 7 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Jul Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 7 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Aug Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 8 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Aug Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 8 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Sep Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 9 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Sep Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 9 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Oct Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 10 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Oct Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 10 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Nov Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 11 && record.status == 'previous'? record.order_plan_qty : "-"

        },
        {
          title: `Nov Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 11 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Dec Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.ExfMonth == 12 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Dec Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.ExfMonth == 12 && record.status == 'latest'? record.order_plan_qty : "-",
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
  getData()
  console.log(Number(selectedYear),'///////////');
  
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
 
  pageData.forEach((e) => {
    console.log(e,'----------');
    
    // e.monthWiseData.forEach((rec) => {
    //   if(rec.pcsData[0].janPcs) {
    //     const jan = [rec.pcsData[0].janPcs]
    //     janPre += Number(jan)
    //   }
    //   if(rec.pcsData[0].febPcs) {
    //     const feb = [rec.pcsData[0].febPcs]
    //     febPre += Number(feb)
    //   }
    //   if(rec.pcsData[0].marPcs) {
    //     const mar = [rec.pcsData[0].marPcs]
    //     marPre += Number(mar)
    //   }
    //   if(rec.pcsData[0].aprPcs) {
    //     const apr = [rec.pcsData[0].aprPcs]
    //     aprPre += Number(apr)
    //   } if(rec.pcsData[0].mayPcs) {
    //     const may = [rec.pcsData[0].mayPcs]
    //     mayPre += Number(may)
    //   } if(rec.pcsData[0].junPcs) {
    //     const jun = [rec.pcsData[0].junPcs]
    //     junPre += Number(jun)
    //   } if(rec.pcsData[0].julPcs) {
    //     const jul = [rec.pcsData[0].julPcs]
    //     julPre += Number(jul)
    //   } if(rec.pcsData[0].augPcs) {
    //     const aug = [rec.pcsData[0].augPcs]
    //     augPre += Number(aug)
    //   } if(rec.pcsData[0].sepPcs) {
    //     const sep = [rec.pcsData[0].sepPcs]
    //     sepPre += Number(sep)
    //   } if(rec.pcsData[0].octPcs) {
    //     const oct = [rec.pcsData[0].octPcs]
    //     octPre += Number(oct)
    //   } if(rec.pcsData[0].novPcs) {
    //     const nov = [rec.pcsData[0].novPcs]
    //     novPre += Number(nov)
    //   } if(rec.pcsData[0].decPcs) {
    //     const dec = [rec.pcsData[0].decPcs]
    //     decPre += Number(dec)
    //   }
    //   if(rec.pcsData[0].jancoeff) {
    //     const jan = [rec.coeffData[0].janCoeff]
    //     janLat += Number(jan)
    //   }
    //   if(rec.coeffData[0].febCoeff) {
    //     const feb = [rec.coeffData[0].febCoeff]
    //     febLat += Number(feb)
    //   }
    //   if(rec.coeffData[0].marCoeff) {
    //     const mar = [rec.coeffData[0].marCoeff]
    //     marLat += Number(mar)
    //   }
    //   if(rec.coeffData[0].aprCoeff) {
    //     const apr = [rec.coeffData[0].aprCoeff]
    //     aprLat += Number(apr)
    //   } if(rec.coeffData[0].mayCoeff) {
    //     const may = [rec.coeffData[0].mayCoeff]
    //     mayLat += Number(may)
    //   } if(rec.coeffData[0].junCoeff) {
    //     const jun = [rec.coeffData[0].junCoeff]
    //     junLat += Number(jun)
    //   } if(rec.coeffData[0].julCoeff) {
    //     const jul = [rec.coeffData[0].julCoeff]
    //     julLat += Number(jul)
    //   } if(rec.coeffData[0].augCoeff) {
    //     const aug = [rec.coeffData[0].augCoeff]
    //     augLat += Number(aug)
    //   } if(rec.coeffData[0].sepCoeff) {
    //     const sep = [rec.coeffData[0].sepCoeff]
    //     sepLat += Number(sep)
    //   } if(rec.coeffData[0].octCoeff) {
    //     const oct = [rec.coeffData[0].octCoeff]
    //     octLat += Number(oct)
    //   } if(rec.coeffData[0].novCoeff) {
    //     const nov = [rec.coeffData[0].novCoeff]
    //     novLat += Number(nov)
    //   } if(rec.coeffData[0].decCoeff) {
    //     const dec = [rec.coeffData[0].decCoeff]
    //     decLat += Number(dec)
    //   }
    //   console.log(febLat,'lat');
    //   console.log(febPre,'pre');
      
      
    // })
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
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>{julLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {junPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>{julLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {julPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/> {julLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {augPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>{augLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/><span/>
           {sepPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>{sepLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {octPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>{octLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {novPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>{novLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {decPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/><span/>{decLat}
          </Space>
        </div>
      </Table.Summary.Cell>
    </Table.Summary.Row>
  </>
  )
}
  return (
    <Card
    title="Comparision WareHouse Report"

    extra={data.length > 0 ? (<Button
        type="default"
        style={{ color: 'green' }}
        onClick={handleExport}
        icon={<FileExcelFilled />}>Download Excel</Button>) : null}>
 <Form form={form} layout={'vertical'}>
              <Row gutter={24}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }} >
                            <div>
                                <label>Item Name</label>
                                <Form.Item name="ItemName">
                                    <Select
                                        showSearch
                                        placeholder="Select Item Name"
                                        optionFilterProp="children"
                                        allowClear>
                                            {data.map(e=>(
                                                <Option key={e.itemName} value={e.itemName}>{e.itemName}</Option>
                                            ))}
                                        {/* <Option key='new' value="NEW">NEW</Option>
                                        <Option key='unaccepted' value="UNACCEPTED">UNACCEPTED</Option> */}
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
    
<Tabs type="card" onChange={handleTabChange} aria-disabled>
        {year.map((item) => (
          <Tabs.TabPane key={item.year} tab={item.year}>
           
           <Table
              dataSource={filteredData} 
              columns={columns5}
              size="small"
              scroll={{ x: "max-content" }}
            />
        
      </Tabs.TabPane>
    ))}
  </Tabs>
  </Card>
  );
};
export default WareHouseComparision