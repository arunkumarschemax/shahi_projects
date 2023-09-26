
import { FileExcelFilled } from "@ant-design/icons";
import { YearReq } from "@project-management-system/shared-models";
import { OrdersService } from "@project-management-system/shared-services";
import { Button, Card, List, Table, Tabs, TabsProps, Typography } from "antd";
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
  const [tab, setTab] = useState<number>();
  const service = new OrdersService()
  const {Text} = Typography
  useEffect(()=>{
    getData();
  },[])

  const getData =()=>{
    const req = new YearReq(2023 )
    console.log(tab,'222222222222222222');
    
    service.getWareHouseComparisionData(req).then(res =>{

      if(res.status){
        setYear(res.data)
      }
    })
    service.getAll(req).then(res =>{
      console.log(res,'res==========');
      if(res.status){
        setData(res.data)
      }
      else{
        setData([])
      }
    })}
 
  const childColumns1: any = [
    {
      title: "Production Plan Type Name",
      dataIndex: "phasetype",
      key: "phasetype",
    },
    {
      title: "January",
            children: [
        {
          title: `Previous`,
          dataIndex: "janPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.janPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "janCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.janCoeff}</span>  || '-'))
          
          }
        },
      ],
   
    },
    {
      title: "February",
      dataIndex: "oldOrderQtyPcs2",
            children: [
        {
          title: `Previous`,
          dataIndex: "febPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.febPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "febCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.febCoeff}</span>  || '-'))
          
          }
        },
      ],
 
    },
    {
      title: "March",
      dataIndex: "oldOrderQtyPcs3",
      key: "oldOrderQtyPcs3",
            children: [
        {
          title: `Previous`,
          dataIndex: "marPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.marPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "marCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.marCoeff}</span>  || '-'))
          
          }
        },
      ],
      
    },
    {
      title: "April",
      dataIndex: "oldOrderQtyPcs4",
      key: "oldOrderQtyPcs4",
            children: [
        {
          title: `Previous`,
          dataIndex: "aprPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.aprPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "aprCoeff",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.janPcs}</span>  || '-'))
          
          }
        },
      ],
  
    },
    {
      title: "May",
      dataIndex: "oldOrderQtyPcs5",
      key: "oldOrderQtyPcs5",
            children: [
        {
          title: `Previous`,
          dataIndex: "mayPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.janPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "mayCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.mayCoeff}</span>  || '-'))
          
          }
        },
      ],
    
      
    },
    {
      title: "June",
      dataIndex: "oldOrderQtyPcs6",
      key: "oldOrderQtyPcs6",
            children: [
        {
          title: `Previous`,
          dataIndex: "junPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.junPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "junCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.junCoeff}</span>  || '-'))
          
          }
        },
      ],
   
      
    },
    {
      title: "July",
      dataIndex: "oldOrderQtyPcs7",
      key: "oldOrderQtyPcs7",
            children: [
        {
          title: `Previous`,
          dataIndex: "julPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.julPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "julCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.julCoeff}</span>  || '-'))
          
          }
        },
      ],
  
      
    },
    {
      title: "August",
      dataIndex: "oldOrderQtyPcs8",
      key: "oldOrderQtyPcs8",
            children: [
        {
          title: `Previous`,
          dataIndex: "augPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.augPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "augCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.augCoeff}</span>  || '-'))
          
          }
        },
      ],
   
    },
    {
      title: "September",
      dataIndex: "oldOrderQtyPcs9",
      key: "oldOrderQtyPcs9",
            children: [
        {
          title: `Previous`,
          dataIndex: "sepPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.sepPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "sepCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.sepCoeff}</span>  || '-'))
          
          }
        },
      ],
    
    },
    {
      title: "October",
      dataIndex: "oldOrderQtyPcs10",
      key: "oldOrderQtyPcs10",
            children: [
        {
          title: `Previous`,
          dataIndex: "octPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.octPcs}</span>  || '-'))
          
          },
        },
        {
          title: `Latest`,
          dataIndex: "octCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.octCoeff}</span>  || '-'))
          
          }
        },
      ],
    
    },
    {
      title: "November",
      dataIndex: "oldOrderQtyPcs11",
      key: "oldOrderQtyPcs11",
            children: [
        {
          title: `Previous`,
          dataIndex: "novPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.novPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "novCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.novCoeff}</span>  || '-'))
          
          },
        },
      ],
     
    },
    {
      title: "December",
      dataIndex: "oldOrderQtyPcs12",
      key: "oldOrderQtyPcs12",
            children: [
        {
          title: `Previous`,
          dataIndex: "decPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.decPcs}</span>  || '-'))
          
          }
        },
        {
          title: `Latest`,
          dataIndex: "decCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.decCoeff}</span>  || '-'))
          
          }
        },
      ],

      
    },
    {
      title: "Total Previous",
      dataIndex: "totalPcs",
     
    },
    {
      title: "Total Latest",
      dataIndex: "totalCoeff",
     
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
      title: "Month Wise Data",
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
          dataIndex: "itemName",
        //   render: (text: any, record: any) => {
        //     return record.itemName ? <span>{record.itemName}</span> : '-'
        // }
        },
        {
          title: "Month Wise Data",
          dataIndex: "monthWiseData",
          children: [
            {
              title: "Production Plan Type Name",
              dataIndex: "phasetype",
              render: (text: any, record: any) => {
                const phaseTypes = record.monthWiseData.map((data: any) => data.phasetype);
                return phaseTypes.join(', ') || '-';
              }
              // render: (text: any, record: any) => {
              //   const phaseTypes = record.monthWiseData.map((data: any) => data.phasetype)
              //   return (
              //     <div>
              //       <div>{phaseTypes}</div>
              //       <br /> {/* Add a line break between each "phasetype" value */}
              //     </div>)
                
              // }
            },
            {
              title: "January",
              dataIndex:'',
                    children: [
                {
                  title: `Previous`,
                  dataIndex: "janPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.janPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                 
                },
                {
                  title: `Latest`,
                  dataIndex: "janCoeff",
                  render: (text: any, record: any) => {
                    const coeff = record.monthWiseData.map((data: any) => data.coeffData.map(e => e.janCoeff));
                    
                    return coeff.join(', ') || '-';
                  }
                },
              ],
           
            },
            {
              title: "February",
              dataIndex: "oldOrderQtyPcs2",
                    children: [
                {
                  title: `Previous`,
                  dataIndex: "febPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.febPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `Latest`,
                  dataIndex: "febCoeff",
                  render: (text: any, record: any) => {
                    const coeff = record.monthWiseData.map((data: any) => data.coeffData.map(e => e.febCoeff));
                    
                    return coeff.join(', ') || '-';
                  }
                },
              ],
         
            },
            {
              title: "March",
              dataIndex: "oldOrderQtyPcs3",
                    children: [
                {
                  title: `Previous`,
                  dataIndex: "marPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.marPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `Latest`,
                  dataIndex: "marCoeff",
                  render: (text: any, record: any) => {
                    const coeff = record.monthWiseData.map((data: any) => data.coeffData.map(e => e.marCoeff));
                    
                    return coeff.join(', ') || '-';
                  }
                },
              ],
              
            },
            {
              title: "April",
              dataIndex: "oldOrderQtyPcs4",
                    children: [
                {
                  title: `Previous`,
                  dataIndex: "aprPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.aprPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `Latest`,
                  dataIndex: "aprCoeff",
                  render: (text: any, record: any) => {
                    const coeff = record.monthWiseData.map((data: any) => data.coeffData.map(e => e.aprCoeff));
                    
                    return coeff.join(', ') || '-';
                  }
                },
              ],
          
            },
            {
              title: "May",
              dataIndex: "oldOrderQtyPcs5",
                    children: [
                {
                  title: `Previous`,
                  dataIndex: "mayPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.mayPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `Latest`,
                  dataIndex: "mayCoeff",
                  render: (text: any, record: any) => {
                    const coeff = record.monthWiseData.map((data: any) => data.coeffData.map(e => e.mayCoeff));
                    
                    return coeff.join(', ') || '-';
                  }
                },
              ],
            
              
            },
            {
              title: "June",
              dataIndex: "oldOrderQtyPcs6",
                    children: [
                {
                  title: `Previous`,
                  dataIndex: "junPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.junPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `Latest`,
                  dataIndex: "junCoeff",
                  render: (text: any, record: any) => {
                    const coeff = record.monthWiseData.map((data: any) => data.coeffData.map(e => e.junCoeff));
                    
                    return coeff.join(', ') || '-';
                  }
                },
              ],
           
              
            },
            {
              title: "July",
              dataIndex: "oldOrderQtyPcs7",
                    children: [
                {
                  title: `Previous`,
                  dataIndex: "julPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.julPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `Latest`,
                  dataIndex: "julCoeff",
                  render: (text: any, record: any) => {
                    const coeff = record.monthWiseData.map((data: any) => data.coeffData.map(e => e.julCoeff));
                    
                    return coeff.join(', ') || '-';
                  }
                },
              ],
          
              
            },
            {
              title: "August",
              dataIndex: "oldOrderQtyPcs8",
                    children: [
                {
                  title: `Previous`,
                  dataIndex: "augPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.augPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `Latest`,
                  dataIndex: "augCoeff",
                  render: (text: any, record: any) => {
                    const coeff = record.monthWiseData.map((data: any) => data.coeffData.map(e => e.augCoeff));
                    
                    return coeff.join(', ') || '-';
                  }
                },
              ],
           
            },
            {
              title: "September",
              dataIndex: "oldOrderQtyPcs9",
                    children: [
                {
                  title: `Previous`,
                  dataIndex: "sepPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.sepPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `Latest`,
                  dataIndex: "sepCoeff",
                  render: (text: any, record: any) => {
                    const coeff = record.monthWiseData.map((data: any) => data.coeffData.map(e => e.sepCoeff));
                    
                    return coeff.join(', ') || '-';
                  }
                },
              ],
            
            },
            {
              title: "October",
              dataIndex: "oldOrderQtyPcs10",
                    children: [
                {
                  title: `Previous`,
                  dataIndex: "octPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.octPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  },
                },
                {
                  title: `Latest`,
                  dataIndex: "octCoeff",
                  render: (text: any, record: any) => {
                    const coeff = record.monthWiseData.map((data: any) => data.coeffData.map(e => e.octCoeff));
                    
                    return coeff.join(', ') || '-';
                  }
                },
              ],
            
            },
            {
              title: "November",
              dataIndex: "oldOrderQtyPcs11",
                    children: [
                {
                  title: `Previous`,
                  dataIndex: "novPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.novPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `Latest`,
                  dataIndex: "novCoeff",
                  render: (text: any, record: any) => {
                    const coeff = record.monthWiseData.map((data: any) => data.coeffData.map(e => e.novCoeff));
                    
                    return coeff.join(', ') || '-';
                  }
                },
              ],
             
            },
            {
              title: "December",
              dataIndex: "oldOrderQtyPcs12",
                    children: [
                {
                  title: `Previous`,
                  dataIndex: "decPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.decPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `Latest`,
                  dataIndex: "decCoeff",
                  render: (text: any, record: any) => {
                    const coeff = record.monthWiseData.map((data: any) => data.coeffData.map(e => e.decCoeff));
                    
                    return coeff.join(', ') || '-';
                  }
                },
              ],
        
              
            },
            {
              title: "Total Previous",
              dataIndex: "totalPcs",
              render: (text: any, record: any) => {
                const phaseTypes = record.monthWiseData.map((data: any) => data.totalPcs);
                return phaseTypes.join(', ') || '-';
              }
            },
            {
              title: "Total Latest",
              dataIndex: "totalCoeff",
              render: (text: any, record: any) => {
                const phaseTypes = record.monthWiseData.map((data: any) => data.totalCoeff);
                return phaseTypes.join(', ') || '-';
              }
            },
          ]
        },
      ];
    
   
      excel.addRow();
  
      excel.addColumns(exportingColumns);
      excel.addDataSource(data);
    // });
    excel.saveAs(`Ex-Factory-report-${currentDate}.xlsx`);

};
const handleTabChange = (selectedYear: string) => {
  setTab(Number(selectedYear)); 
  getData()
  console.log(Number(selectedYear),'///////////');
  
};
  return (
    <Card
    title="Comparision WareHouse Report"

    extra={data.length > 0 ? (<Button
        type="default"
        style={{ color: 'green' }}
        onClick={handleExport}
        icon={<FileExcelFilled />}>Download Excel</Button>) : null}>

    
{/* <Tabs type="card" onChange={handleTabChange} aria-disabled> */}
        {year.map((item) => (
          
          
          // <Tabs.TabPane key={item.year} tab={item.year}>
        <Table
          dataSource={data} // Assuming 'data' contains data for each year
          columns={columns5} // Assuming 'columns5' is defined elsewhere
          size="small"
          scroll={{ x: "max-content" }}
         
        />
        
      // </Tabs.TabPane>
    ))}
  {/* </Tabs> */}
  </Card>
  );
};
export default WareHouseComparision