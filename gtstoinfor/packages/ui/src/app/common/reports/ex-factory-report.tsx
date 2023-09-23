import { FileExcelFilled } from "@ant-design/icons";
import { YearReq } from "@project-management-system/shared-models";
import { OrdersService } from "@project-management-system/shared-services";
import { Button, Card, List, Table, Tabs, TabsProps, Typography } from "antd";
import { Excel } from "antd-table-saveas-excel";
import { IExcelColumn } from "antd-table-saveas-excel/app";
import { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { useState } from "react";

export const ExFactoryReport = () => {
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
    const req = new YearReq(tab)
    console.log(tab,'222222222222222222');
    
    service.getExfactoryYearData().then(res =>{

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
          title: `In PCs`,
          dataIndex: "janPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.janPcs}</span>  || '-'))
          
          }
        },
        {
          title: `In Coeff`,
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
          title: `In PCs`,
          dataIndex: "febPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.febPcs}</span>  || '-'))
          
          }
        },
        {
          title: `In Coeff`,
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
          title: `In PCs`,
          dataIndex: "marPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.marPcs}</span>  || '-'))
          
          }
        },
        {
          title: `In Coeff`,
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
          title: `In PCs`,
          dataIndex: "aprPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.aprPcs}</span>  || '-'))
          
          }
        },
        {
          title: `In Coeff`,
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
          title: `In PCs`,
          dataIndex: "mayPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.janPcs}</span>  || '-'))
          
          }
        },
        {
          title: `In Coeff`,
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
          title: `In PCs`,
          dataIndex: "junPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.junPcs}</span>  || '-'))
          
          }
        },
        {
          title: `In Coeff`,
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
          title: `In PCs`,
          dataIndex: "julPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.julPcs}</span>  || '-'))
          
          }
        },
        {
          title: `In Coeff`,
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
          title: `In PCs`,
          dataIndex: "augPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.augPcs}</span>  || '-'))
          
          }
        },
        {
          title: `In Coeff`,
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
          title: `In PCs`,
          dataIndex: "sepPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.sepPcs}</span>  || '-'))
          
          }
        },
        {
          title: `In Coeff`,
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
          title: `In PCs`,
          dataIndex: "octPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.octPcs}</span>  || '-'))
          
          },
        },
        {
          title: `In Coeff`,
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
          title: `In PCs`,
          dataIndex: "novPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.novPcs}</span>  || '-'))
          
          }
        },
        {
          title: `In Coeff`,
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
          title: `In PCs`,
          dataIndex: "decPcs",
          render: (text: any, record: any) => {
            return (record.pcsData.map((item: any) =><span>{item.decPcs}</span>  || '-'))
          
          }
        },
        {
          title: `In Coeff`,
          dataIndex: "decCoeff",
          render: (text: any, record: any) => {
            return (record.coeffData.map((item: any) =><span>{item.decCoeff}</span>  || '-'))
          
          }
        },
      ],

      
    },
    {
      title: "Total In PCs",
      dataIndex: "totalPcs",
     
    },
    {
      title: "Total In Coeff",
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
                  title: `In PCs`,
                  dataIndex: "janPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.janPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                 
                },
                {
                  title: `In Coeff`,
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
                  title: `In PCs`,
                  dataIndex: "febPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.febPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `In Coeff`,
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
                  title: `In PCs`,
                  dataIndex: "marPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.marPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `In Coeff`,
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
                  title: `In PCs`,
                  dataIndex: "aprPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.aprPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `In Coeff`,
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
                  title: `In PCs`,
                  dataIndex: "mayPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.mayPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `In Coeff`,
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
                  title: `In PCs`,
                  dataIndex: "junPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.junPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `In Coeff`,
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
                  title: `In PCs`,
                  dataIndex: "julPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.julPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `In Coeff`,
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
                  title: `In PCs`,
                  dataIndex: "augPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.augPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `In Coeff`,
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
                  title: `In PCs`,
                  dataIndex: "sepPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.sepPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `In Coeff`,
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
                  title: `In PCs`,
                  dataIndex: "octPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.octPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  },
                },
                {
                  title: `In Coeff`,
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
                  title: `In PCs`,
                  dataIndex: "novPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.novPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `In Coeff`,
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
                  title: `In PCs`,
                  dataIndex: "decPcs",
                  render: (text: any, record: any) => {
                    const pcs = record.monthWiseData.map((data: any) => data.pcsData.map(e => e.decPcs));
                    console.log(pcs,'jan');
                    
                    return pcs.join(', ') || '-';
                  }
                },
                {
                  title: `In Coeff`,
                  dataIndex: "decCoeff",
                  render: (text: any, record: any) => {
                    const coeff = record.monthWiseData.map((data: any) => data.coeffData.map(e => e.decCoeff));
                    
                    return coeff.join(', ') || '-';
                  }
                },
              ],
        
              
            },
            {
              title: "Total In PCs",
              dataIndex: "totalPcs",
             
            },
            {
              title: "Total In Coeff",
              dataIndex: "totalCoeff",
             
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
    
    extra={data.length > 0 ? (<Button
        type="default"
        style={{ color: 'green' }}
        onClick={handleExport}
        icon={<FileExcelFilled />}>Download Excel</Button>) : null}>

    
<Tabs type="card" onChange={handleTabChange} aria-disabled>
        {year.map((item) => (
          
          
          <Tabs.TabPane key={item.year} tab={item.year}>
        <Table
          dataSource={data} // Assuming 'data' contains data for each year
          columns={columns5} // Assuming 'columns5' is defined elsewhere
          size="small"
          scroll={{ x: "max-content" }}
          summary={(pageData) => {
            let totalCost = 0;
            let currentCost = 0;
            let totalDifference = 0;
            let totalCarryingAmount = 0;
            let totaldepUpto5Years = 0;
            let totaldepAmountWholeLife = 0;
            let totalslavagedValue = 0;

            pageData.forEach((e) => {
              if (Number(e)) {
                totalCost += Number(e)
              }
            })


           

           
           

            return (
              <>
                <Table.Summary.Row className="tableFooter">
                  <Table.Summary.Cell index={2} ><Text>Total</Text></Table.Summary.Cell>
                  <Table.Summary.Cell index={2} ></Table.Summary.Cell>
                  <Table.Summary.Cell index={1} >{Number(Number(totalCost).toFixed(0)).toLocaleString('en-IN')}</Table.Summary.Cell>
                  <Table.Summary.Cell index={1} >{Number(Number(currentCost).toFixed(0)).toLocaleString('en-IN')}</Table.Summary.Cell>
                  <Table.Summary.Cell index={1} >{Number(Number(totalDifference).toFixed(0)).toLocaleString('en-IN')}</Table.Summary.Cell>
                  <Table.Summary.Cell index={1} colSpan={1}>{Number(Number(totalCarryingAmount).toFixed(0)).toLocaleString('en-IN')}</Table.Summary.Cell>
                  <Table.Summary.Cell index={1} >{Number(Number(totaldepUpto5Years).toFixed(0)).toLocaleString('en-IN')}</Table.Summary.Cell>
                  <Table.Summary.Cell index={1} colSpan={4}>{Number(Number(totaldepAmountWholeLife).toFixed(0)).toLocaleString('en-IN')}</Table.Summary.Cell>
                  <Table.Summary.Cell index={1} colSpan={2}>{Number(Number(totalslavagedValue).toFixed(0)).toLocaleString('en-IN')}</Table.Summary.Cell>

                </Table.Summary.Row>
              </>
            )
          }}

        />
      </Tabs.TabPane>
    ))}
  </Tabs>
  </Card>
  );
};
export default ExFactoryReport