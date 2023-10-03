
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

  let JanPreviousTotal = 0
    let JanLatestTotal = 0
    let FebPreviousTotal = 0
    let FebLatestTotal= 0
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
    const req = new YearReq(tab,'')    
    // service.getWareHouseComparisionData(req).then(res =>{

    //   if(res.status){
    //     setYear(res.data)
    //   }
    // })
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
    <th colSpan={2}style={{ position: 'relative', right: '520px' ,borderRight: '1px solid black', }}>August</th><br/>
    <th colSpan={2}style={{ position: 'relative', right: '600px' ,borderRight: '1px solid black'}}>September</th><br/>
    <th colSpan={2}style={{ position: 'relative', right: '720px', borderRight: '1px solid black' }}>October</th><br/>
    <th colSpan={2}style={{ position: 'relative', right: '620px',borderRight: '1px solid black', }}>November</th><br/>
    <th colSpan={2}style={{ position: 'relative', right: '550px', }}>December</th><br/>
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

    <td  style={{position: 'relative',right: '-20px'}} >(previous)</td>
    <td  style={{position: 'relative',right: '-10px'}} >(latest)</td>

    <td  style={{position: 'relative',right: '-15px'}} >(previous)</td>
    <td  style={{position: 'relative',right: '-10px'}} >(latest)</td>

    <td  style={{position: 'relative',right: '-20px'}} >(previous)</td>
    <td  style={{position: 'relative',right: '-20px'}} >(latest)</td>

    <td  style={{position: 'relative',right: '-60px'}} >(previous)</td>
    <td  style={{position: 'relative',right: '-60px'}} >(latest)</td>

    <td  style={{position: 'relative',right: '-50px'}} >(previous)</td>
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


  const Header = () => {
           
    return (
      <div>
<table>
<tr >
{/* <th style={{position: 'relative',paddingRight: '1200px'}}>Production Plan Type Name</th> */}
<th colSpan={2} style={{ position: 'relative', right: '-150px' , borderRight: '1px solid black',}}>January</th>
  <th colSpan={2} style={{ position: 'relative', right: '-210px',borderRight: '1px solid black', }}>Febuary</th><br/>
  <th colSpan={2}style={{ position: 'relative', right: '-290px' ,borderRight: '1px solid black', }}>March</th><br/>
  <th colSpan={2} style={{ position: 'relative', right: '-340px', borderRight: '1px solid black', }}>April</th><br/>
  <th colSpan={2}style={{ position: 'relative', right: '-390px', borderRight: '1px solid black', }}>May</th><br/>
  <th colSpan={2}style={{ position: 'relative', right: '-440px', borderRight: '1px solid black', }}>June</th><br/>
  <th colSpan={2}style={{ position: 'relative', right: '-510px' ,borderRight: '1px solid black', }}>July</th><br/>
  <th colSpan={2}style={{ position: 'relative', right: '-600px' ,borderRight: '1px solid black', }}>August</th><br/>
  <th colSpan={2}style={{ position: 'relative', right: '-660px' ,borderRight: '1px solid black'}}>September</th><br/>
  <th colSpan={2}style={{ position: 'relative', right: '-690px', borderRight: '1px solid black' }}>October</th><br/>
  <th colSpan={2}style={{ position: 'relative', right: '-760px',borderRight: '1px solid black', }}>November</th><br/>
  <th colSpan={2}style={{ position: 'relative', right: '-790px', }}>December</th><br/>
  <th colSpan={2}style={{ position: 'relative', right: '500px',  }}></th><br/>
  <th colSpan={2}style={{ position: 'relative', right: '500px',  }}></th><br/>

</tr>
<tr>
<td colSpan={150} style={{ borderBottom: '1px solid black' }}></td>

</tr>
<tr>
<td style={{paddingLeft:'10px',position:'relative',}}>Production Plan Type Name</td>
  <td style={{right: '-50px',position: 'relative', }}>(Latest)</td>
  <td style={{position: 'relative',right: '-100px' }} >(Previous)</td>

  <td  style={{position: 'relative',right: '-140px', }} >(Latest)</td>
  <td  style={{position: 'relative',right: '-180px',}} >(Previous)</td>

  <td  style={{position: 'relative',right: '-240px'}} >(Latest)</td>
  <td  style={{position: 'relative',right: '-290px'}} >(Previous)</td>

  <td  style={{position: 'relative',right: '-330px'}} >(Latest)</td>
  <td  style={{position: 'relative',right: '-370px'}} >(Previous)</td>

  <td  style={{position: 'relative',right: '-390px'}} >(Latest)</td>
  <td  style={{position: 'relative',right: '-430px'}} >(Previous)</td>

  <td  style={{position: 'relative',right: '-480px'}} >(Latest)</td>
  <td  style={{position: 'relative',right: '-500px'}} >(Previous)</td>

  <td  style={{position: 'relative',right: '-590px'}} >(Latest)</td>
  <td  style={{position: 'relative',right: '-600px'}} >(Previous)</td>

  <td  style={{position: 'relative',right: '-700px'}} >(Latest)</td>
  <td  style={{position: 'relative',right: '-760px'}} >(Previous)</td>

  <td  style={{position: 'relative',right: '-800px'}} >(Latest)</td>
  <td  style={{position: 'relative',right: '-850px'}} >(Previous)</td>

  <td  style={{position: 'relative',right: '-890px'}} >(Latest)</td>
  <td  style={{position: 'relative',right: '-930px'}} >(Previous)</td>

  <td  style={{position: 'relative',right: '-960px'}} >(Latest)</td>
  <td  style={{position: 'relative',right: '-990px'}} >(Previous)</td>

  <td  style={{position: 'relative',right: '-1020px'}} >(Latest)</td>
  <td  style={{position: 'relative',right: '-1070px'}} >(Previous)</td>
  <td  style={{position: 'relative',right: '-1100px'}} >Total(Latest)</td>
  <td  style={{position: 'relative',right: '-1200px'}} >Total(Previous)</td>
  
</tr>

<tr>
  
</tr>
</table>
      
      </div>
    );
  };
  const childColumns2: any = [
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
    {
      title: <Header/>,
      dataIndex: "monthWiseData",
      align:'center',
      render: (text: any, record: any) => (
        <Table
          dataSource={record.monthWiseData}
          columns={childColumns2}
          pagination={false} // Hide pagination for child table
          rowKey={(record) => record.itemName}
         
        />
      ),
    },
        
  ];
  const childColumns1: any = [
    {
      // title: "Production Plan Type Name",
      dataIndex: "phasetype",
      width:130
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
      align:"right",
      width:150,
      render: (text: any, record: any) => {
        return record.totalCoeff ? record.totalCoeff.toLocaleString() :0
      },
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
            record.whMonth == 1 && record.status == 'previous'? record.order_plan_qty : "-",
        },
        {
          title: `Jan Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.whMonth == 1 && record.status == 'latest'? record.order_plan_qty : "-",
      },
        {
          title: `Feb Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.whMonth == 2 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Feb Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.whMonth == 2 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Mar Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.whMonth == 3 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Mar Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.whMonth == 3 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Apr Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.whMonth == 4 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Apr Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.whMonth == 4 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `May Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.whMonth == 5 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `May Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.whMonth == 5 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Jun Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.whMonth == 6 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Jun Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.whMonth == 6 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Jul Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.whMonth == 7 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Jul Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.whMonth == 7 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Aug Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.whMonth == 8 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Aug Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.whMonth == 8 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Sep Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.whMonth == 9 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Sep Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.whMonth == 9 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Oct Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.whMonth == 10 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Oct Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.whMonth == 10 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Nov Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.whMonth == 11 && record.status == 'previous'? record.order_plan_qty : "-"

        },
        {
          title: `Nov Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.whMonth == 11 && record.status == 'latest'? record.order_plan_qty : "-",
        },
  
        {
          title: `Dec Previous`,
          dataIndex: "order_plan_qty",
         render: (text, record) =>
            record.whMonth == 12 && record.status == 'previous'? record.order_plan_qty : "-"
          },
        {
          title: `Dec Latest`,
          dataIndex: "order_plan_qty_coeff",
          render: (text, record) =>
          record.whMonth == 12 && record.status == 'latest'? record.order_plan_qty : "-",
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
    excel.saveAs(`Comparision WareHouse Report-${currentDate}.xlsx`);

};
const handleTabChange = (selectedYear: string) => {
  setTab(Number(selectedYear)); 
  getData()
  console.log(Number(selectedYear),'///////////');
  
};
const getTableSummary = (pageData) => {
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
           {janPre}<span/><span/> <span/><span/><span/><span/><span/><span/> {janLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/> 
           {febPre}<span/><span/> <span/><span/><span/><span/>{febLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/>
           {marPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/><span/>{marLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/>
           {aprPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/> {aprLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/>
           {mayPre}<span/><span/> <span/><span/><span/><span/><span/><span/> {mayLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/>
           {junPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>{julLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {julPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/> {julLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {augPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/>{augLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/><span/>
           {sepPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>{sepLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {octPre}<span/><span/><span/><span/><span/><span/><span/>{octLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {novPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>{novLat}
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>
           {decPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>{decLat}
           <span/><span/><span/>
           <span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/><span/>
            {totalPre}<span/><span/> <span/><span/><span/><span/><span/><span/><span/><span/>{totalLat}

          </Space>
        </div>
      </Table.Summary.Cell>
    </Table.Summary.Row>
  </>
  )
}
  return (
    <Card
    // title="Comparision WareHouse Report"

    // extra={data.length > 0 ? (<Button
    //     type="default"
    //     style={{ color: 'green' }}
    //     onClick={handleExport}
    //     icon={<FileExcelFilled />}>Download Excel</Button>) : null}
        >

    
<Tabs type="card" onChange={handleTabChange} aria-disabled>
        {year.map((item) => (
          <Tabs.TabPane key={item.year} tab={item.year}>
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
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 6 }} style={{ marginTop: 17}} >
                        <Button
            type="default"
            style={{ color: "green" }}
            onClick={handleExport}
            icon={<FileExcelFilled />}
          >
            Download Excel
          </Button>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5}} lg={{ span: 5 }} xl={{ span: 6 }}  style={{ marginTop: 17}} >
<Card title={'Total Items : ' + data.length} style={{textAlign: 'center', width:150,height:35, borderRadius:8, backgroundColor:'#EBEBF1'}}  
size="small"></Card>
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
  <Table
  columns={columns10}
  size="small"
  scroll={{ x: "max-content" }}/>
  </Card>
  );
};
export default WareHouseComparision