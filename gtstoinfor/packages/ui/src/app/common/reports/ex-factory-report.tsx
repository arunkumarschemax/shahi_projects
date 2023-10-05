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
import React, { useEffect } from "react";
import { useState } from "react";

export const ExFactoryReport = () => {
  const [pageSize, setPageSize] = useState<number>(null);
  const [page, setPage] = React.useState(1);
  const [data, setData] = useState<any[]>([]);
  const [year, setYear] = useState<any[]>([]);
  const [tab, setTab] = useState<number>(2023);
  const service = new OrdersService();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [excelData, setExcelData] = useState<any[]>([]);
  const [form] = Form.useForm();
  const { Option } = Select;

  let JanPreviousTotal = 0;
  let JanLatestTotal = 0;
  let FebPreviousTotal = 0;
  let FebLatestTotal = 0;

  const { Text } = Typography;
  useEffect(() => {
    getData();
    getTabs();
  }, []);
  const getTabs = () => {
    service.getExfactoryYearData().then((res) => {
      if (res.status) {
        setYear(res.data);
      }
    });
  };
  const getData = () => {
    const req = new YearReq(tab,'');
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
  <td style={{right: '-50px',position: 'relative', }}>(Pcs)</td>
  <td style={{position: 'relative',right: '-100px' }} >(Coeff)</td>

  <td  style={{position: 'relative',right: '-140px', }} >(Pcs)</td>
  <td  style={{position: 'relative',right: '-180px',}} >(Coeff)</td>

  <td  style={{position: 'relative',right: '-240px'}} >(Pcs)</td>
  <td  style={{position: 'relative',right: '-290px'}} >(Coeff)</td>

  <td  style={{position: 'relative',right: '-330px'}} >(Pcs)</td>
  <td  style={{position: 'relative',right: '-370px'}} >(Coeff)</td>

  <td  style={{position: 'relative',right: '-390px'}} >(Pcs)</td>
  <td  style={{position: 'relative',right: '-430px'}} >(Coeff)</td>

  <td  style={{position: 'relative',right: '-480px'}} >(Pcs)</td>
  <td  style={{position: 'relative',right: '-500px'}} >(Coeff)</td>

  <td  style={{position: 'relative',right: '-590px'}} >(Pcs)</td>
  <td  style={{position: 'relative',right: '-600px'}} >(Coeff)</td>

  <td  style={{position: 'relative',right: '-700px'}} >(Pcs)</td>
  <td  style={{position: 'relative',right: '-760px'}} >(Coeff)</td>

  <td  style={{position: 'relative',right: '-800px'}} >(Pcs)</td>
  <td  style={{position: 'relative',right: '-850px'}} >(Coeff)</td>

  <td  style={{position: 'relative',right: '-890px'}} >(Pcs)</td>
  <td  style={{position: 'relative',right: '-930px'}} >(Coeff)</td>

  <td  style={{position: 'relative',right: '-960px'}} >(Pcs)</td>
  <td  style={{position: 'relative',right: '-990px'}} >(Coeff)</td>

  <td  style={{position: 'relative',right: '-1020px'}} >(Pcs)</td>
  <td  style={{position: 'relative',right: '-1070px'}} >(Coeff)</td>
  <td  style={{position: 'relative',right: '-1100px'}} >Total(Pcs)</td>
  <td  style={{position: 'relative',right: '-1200px'}} >Total(Coeff)</td>
  
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
  const CustomTitle = () => {
    return (
      <div>
        {/* <Space size={"large"}>
          Production Plan Type Name
          <br />
          <span>Jan(Pcs)</span>
          <br />
          <span>
            <span></span>Jan(Coeff)
          </span>
          <br />
          <span>Feb(Pcs)</span>
          <br />
          <span>Feb(Coeff)</span>
          <br />
          <span>Mar(Pcs)</span>
          <br />
          <span>Mar(Coeff)</span>
          <br />
          <span>Apr(Pcs)</span>
          <br />
          <span>Apr(Coeff)</span>
          <br />
          <br />
          <span>May(Pcs)</span>
          <br />
          <span>May(Coeff)</span>
          <br />
          <br />
          <span>Jun(Pcs)</span>
          <br />
          <span>Jun(Coeff)</span>
          <br />
          <span>Jul(Pcs)</span>
          <br />
          <span>Jul(Coeff)</span>
          <br />
          <span>Aug(Pcs)</span>
          <br />
          <br />
          <span>Aug(Coeff)</span>
          <br />
          <span>Sep(Pcs)</span>
          <br />
          <span>Sep(Coeff)</span>
          <br />
          <span>Oct(Pcs)</span>
          <br />
          <span>Oct(Coeff)</span>
          <br />
          <span>
            {" "}
            <span></span>Nov(Pcs)
          </span>
          <br />
          <span>Nov(Coeff)</span>
          <br />
          <span>
            Dec(Pcs)
            <br />
          </span>
          <br />
          <span>Dec(Coeff)</span>
          <br />
          <span>Total(Pcs)</span>
          <br />
          <br />
          <span>Total(Coeff)</span>
        </Space> */}

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
      width: 100,
    },
    {
      // title: `In PCs`,
      dataIndex: "janPcs",
      width: 40,
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
      width: 50,
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
      width: 40,
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
      width: 30,
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
      width: 40,
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
      width: 40,
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
      width: 40,
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
      width: 60,
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
      width: 60,
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
      width: 100,
      render: (text: any, record: any) => {
        return record.totalPcs ? record.totalPcs.toLocaleString() : 0;
      },
    },
    {
      // title: "Total In Coeff",
      dataIndex: "totalCoeff",
      align: "right",
      width: 100,
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
        title: `Jan In PCs`,
        dataIndex: "OrderQty",
        render: (text, record) =>
          record.ExfMonth == 1 ? record.OrderQty : "-",
      },
      {
        title: `Jan In Coeff`,
        dataIndex: "OrderCoeffQty",
        render: (text, record) => {
          return record.ExfMonth == 1 ? record.OrderCoeffQty : "-";
        },
      },
      {
        title: `Feb In PCs`,
        dataIndex: "OrderQty",
        render: (text, record) =>
          record.ExfMonth == 2 ? record.OrderQty : "-",
      },
      {
        title: `Feb In Coeff`,
        dataIndex: "OrderCoeffQty",
        render: (text, record) => {
          return record.ExfMonth == 2 ? record.OrderCoeffQty : "-";
        },
      },

      {
        title: `Mar In PCs`,
        dataIndex: "OrderQty",
        render: (text, record) =>
          record.ExfMonth == 3 ? record.OrderQty : "-",
      },
      {
        title: `Mar In Coeff`,
        dataIndex: "OrderCoeffQty",
        render: (text, record) => {
          return record.ExfMonth == 3 ? record.OrderCoeffQty : "-";
        },
      },

      {
        title: `Apr In PCs`,
        dataIndex: "OrderQty",
        render: (text, record) =>
          record.ExfMonth == 4 ? record.OrderQty : "-",
      },
      {
        title: `Apr In Coeff`,
        dataIndex: "OrderCoeffQty",
        render: (text, record) => {
          return record.ExfMonth == 4 ? record.OrderCoeffQty : "-";
        },
      },

      {
        title: `May In PCs`,
        dataIndex: "OrderQty",
        render: (text, record) =>
          record.ExfMonth == 5 ? record.OrderQty : "-",
      },
      {
        title: `May In Coeff`,
        dataIndex: "OrderCoeffQty",
        render: (text, record) => {
          return record.ExfMonth == 5 ? record.OrderCoeffQty : "-";
        },
      },

      {
        title: `Jun In PCs`,
        dataIndex: "OrderQty",
        render: (text, record) =>
          record.ExfMonth == 6 ? record.OrderQty : "-",
      },
      {
        title: `Jun In Coeff`,
        dataIndex: "OrderCoeffQty",
        render: (text, record) => {
          return record.ExfMonth == 6 ? record.OrderCoeffQty : "-";
        },
      },

      {
        title: `Jul In PCs`,
        dataIndex: "OrderQty",
        render: (text, record) =>
          record.ExfMonth == 7 ? record.OrderQty : "-",
      },
      {
        title: `Jul In Coeff`,
        dataIndex: "OrderCoeffQty",
        render: (text, record) => {
          return record.ExfMonth == 7 ? record.OrderCoeffQty : "-";
        },
      },

      {
        title: `Aug In PCs`,
        dataIndex: "OrderQty",
        render: (text, record) =>
          record.ExfMonth == 8 ? record.OrderQty : "-",
      },
      {
        title: `Aug In Coeff`,
        dataIndex: "OrderCoeffQty",
        render: (text, record) => {
          return record.ExfMonth == 8 ? record.OrderCoeffQty : "-";
        },
      },

      {
        title: `Sep In PCs`,
        dataIndex: "OrderQty",
        render: (text, record) =>
          record.ExfMonth == 9 ? record.OrderQty : "-",
      },
      {
        title: `Sep In Coeff`,
        dataIndex: "OrderCoeffQty",
        render: (text, record) => {
          return record.ExfMonth == 9 ? record.OrderCoeffQty : "-";
        },
      },

      {
        title: `Oct In PCs`,
        dataIndex: "OrderQty",
        render: (text, record) =>
          record.ExfMonth == 10 ? record.OrderQty : "-",
      },
      {
        title: `Oct In Coeff`,
        dataIndex: "OrderCoeffQty",
        render: (text, record) => {
          return record.ExfMonth == 10 ? record.OrderCoeffQty : "-";
        },
      },

      {
        title: `Nov In PCs`,
        dataIndex: "OrderQty",
        render: (text, record) =>
          record.ExfMonth == 11 ? record.OrderQty : "-",
      },
      {
        title: `Nov In Coeff`,
        dataIndex: "OrderCoeffQty",
        render: (text, record) => {
          return record.ExfMonth == 11 ? record.OrderCoeffQty : "-";
        },
      },

      {
        title: `Dec In PCs`,
        dataIndex: "OrderQty",
        render: (text, record) =>
          record.ExfMonth == 12 ? record.OrderQty : "-",
      },
      {
        title: `Dec In Coeff`,
        dataIndex: "OrderCoeffQty",
        render: (text, record) => {
          return record.ExfMonth == 12 ? record.OrderCoeffQty : "-";
        },
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

    const totals = (data) =>{     
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
  
    data.forEach((e) => {
        if (e.ExfMonth === 1) {
          // const jan = +Number(OrderQty);
          janPre  +Number(e.OrderQty);
          
        }

        if (e.ExfMonth === 2) {
          febPre  +Number(e.OrderQty);
        }
       
        if(e.ExfMonth ===3) {
        
          marPre += Number(e.OrderQty);
        }
        if(e.ExfMonth ===4) {
        
          aprPre += Number(e.OrderQty);
        }
        if(e.ExfMonth ===5) {
        
          mayPre += Number(e.OrderQty);
        }
        if(e.ExfMonth ===6) {
        
          junPre += Number(e.OrderQty);
        }
        if(e.ExfMonth ===7) {
        
          julPre += Number(e.OrderQty);
        }
        if(e.ExfMonth ===8) {
        
          augPre += Number(e.OrderQty);
        }
        if(e.ExfMonth ===9) {
        
          sepPre += Number(e.OrderQty);
        }
        if(e.ExfMonth ===10) {
        
          octPre += Number(e.OrderQty);
        }
        if(e.ExfMonth ===11) {
        
          novPre += Number(e.OrderQty);
        }
        if(e.ExfMonth === 12) {
        
          decPre += Number(e.OrderQty);
        }
        if(e.ExfMonth ===1) {
          janLat += Number(e.OrderCoeffQty);
        }
        if(e.ExfMonth === 2) {
          
          febLat += Number(e.OrderCoeffQty);
        }
        if(e.ExfMonth === 3) {
          
          marLat += Number(e.OrderCoeffQty);
        }
        if(e.ExfMonth === 4) {
          
          aprLat += Number(e.OrderCoeffQty);
        }
        if(e.ExfMonth === 5) {
          
          mayLat += Number(e.OrderCoeffQty);
        }
        if(e.ExfMonth === 6) {
          
          junLat += Number(e.OrderCoeffQty);
        }
        if(e.ExfMonth === 7) {
          
          julLat += Number(e.OrderCoeffQty);
        }
        if(e.ExfMonth === 8) {
          
          augLat += Number(e.OrderCoeffQty);
        }
        if(e.ExfMonth === 9) {
          
          sepLat += Number(e.OrderCoeffQty);
        }
        if(e.ExfMonth === 10) {
          
          octLat += Number(e.OrderCoeffQty);
        }
        if(e.ExfMonth === 11) {
          
          novLat += Number(e.OrderCoeffQty);
        }
        if(e.ExfMonth === 12) {
          
          decLat += Number(e.OrderCoeffQty);
        }
      
      });
      const fullTotals =[janLat,febLat,marLat,aprLat,mayLat,junLat,julLat,augLat,sepLat,octLat,novLat,decLat,janPre,febPre,marPre,aprPre,mayPre,junPre,julPre,augPre,sepPre,octPre,novPre,decPre]
      return totals(fullTotals)
    }

    excel.addColumns(exportingColumns);
    excel.addDataSource(excelData);
    // const total = totals(excelData)
    // excel.addDataSource([total])
   
    excel.saveAs(`Ex-Factory-report-${currentDate}.xlsx`);
  };
  const handleTabChange = (selectedYear: any) => {
    setTab(Number(selectedYear));
    getData();
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
                <span />
                {aprLat.toLocaleString()}
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
      // title="Ex-Factory Report"
      // extra={
      //   data.length > 0 ? (
      //     <Button
      //       type="default"
      //       style={{ color: "green" }}
      //       onClick={handleExport}
      //       icon={<FileExcelFilled />}
      //     >
      //       Download Excel
      //     </Button>
      //   ) : null
      // }
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
              dataSource={filteredData} // Assuming 'data' contains data for each year
              columns={columns5} // Assuming 'columns5' is defined elsewhere
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
export default ExFactoryReport;