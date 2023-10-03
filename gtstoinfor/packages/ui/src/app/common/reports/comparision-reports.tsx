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
    const [pageSize, setPageSize] = useState<number>();
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<any[]>([]);
    const [year, setYear] = useState<any[]>([]);
    const [tab, setTab] = useState<number>(2023);
    const service = new OrdersService();
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [excelsData, setExcelData] = useState<any[]>([]);
    const [dates, setDates] = useState<any[]>([]);

    const { Text } = Typography;
    useEffect(() => {
        getData(selected);
        getTabs();
      }, []);
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
          title: 'S.No',
          key: 'sno',
          responsive: ['sm'],
          render: (text, object, index) => (page - 1) + (index + 1)

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
          />
          
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