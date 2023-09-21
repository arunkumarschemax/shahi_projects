import { FileExcelFilled } from "@ant-design/icons";
import { OrdersService } from "@project-management-system/shared-services";
import { Button, Card, List, Table, Tabs, TabsProps } from "antd";
import { Excel } from "antd-table-saveas-excel";
import { IExcelColumn } from "antd-table-saveas-excel/app";
import { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { useState } from "react";

export const ExFactoryReport = () => {
  const [pageSize, setPageSize] = useState<number>(null);
  const [page, setPage] = React.useState(1);
  const [data, setData] = useState<any[]>([]);
  const service = new OrdersService()

  useEffect(()=>{
    getData();
  },[])

  const getData =()=>{
    service.getAll().then(res =>{
      console.log(res,'res==========');
      
      setData(res)
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
          render: (text: any, record: any) => (
            <span>{record.data[0].febPcs}</span>
            )
        },
        {
          title: `In Coeff`,
          dataIndex: "janCoeff",
          render: (text: any, record: any) => (
            <span>{record.data[0].febPcs}</span>
            )
        },
      ],
      render: (text: any, record: any) => {
        return record.oldOrderQtyPcs1 != 0
          ? Number(record.oldOrderQtyPcs1).toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })
          : "-";
      },
    },
    {
      title: "February",
      dataIndex: "oldOrderQtyPcs2",
      key: "oldOrderQtyPcs2",
            children: [
        {
          title: `In PCs`,
          dataIndex: "febPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].febPcs}</span>
            ),
        },
        {
          title: `In Coeff`,
          dataIndex: "febCoeff",
          render: (text: any, record: any) => (
            <span>{record.data[1].febCoeff}</span>
            ),
        },
      ],
      render: (text: any, record: any) => {
        return record.oldOrderQtyPcs2 != 0
          ? Number(record.oldOrderQtyPcs2).toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })
          : "-";
      },
    },
    {
      title: "March",
      dataIndex: "oldOrderQtyPcs3",
      key: "oldOrderQtyPcs3",
            children: [
        {
          title: `In PCs`,
          dataIndex: "marPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].marPcs}</span>
            ),
        },
        {
          title: `In Coeff`,
          dataIndex: "marCoeff",
          render: (text: any, record: any) => (
            <span>{record.data[1].marCoeff}</span>
            ),
        },
      ],
      render: (text: any, record: any) => {
        return record.oldOrderQtyPcs3 != 0
          ? Number(record.oldOrderQtyPcs3).toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })
          : "-";
      },
    },
    {
      title: "April",
      dataIndex: "oldOrderQtyPcs4",
      key: "oldOrderQtyPcs4",
            children: [
        {
          title: `In PCs`,
          dataIndex: "aprPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].aprPcs}</span>
            ),
        },
        {
          title: `In Coeff`,
          dataIndex: "aprCoeff",
          render: (text: any, record: any) => (
            <span>{record.data[1].aprCoeff}</span>
            ),
        },
      ],
      render: (text: any, record: any) => {
        return record.oldOrderQtyPcs4 != 0
          ? Number(record.oldOrderQtyPcs4).toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })
          : "-";
      },
    },
    {
      title: "May",
      dataIndex: "oldOrderQtyPcs5",
      key: "oldOrderQtyPcs5",
            children: [
        {
          title: `In PCs`,
          dataIndex: "mayPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].mayPcs}</span>
            ),
        },
        {
          title: `In Coeff`,
          dataIndex: "mayCoeff",
          render: (text: any, record: any) => (
            <span>{record.data[1].mayCoeff}</span>
            ),
        },
      ],
      render: (text: any, record: any) => {
        return record.oldOrderQtyPcs5 != 0
          ? Number(record.oldOrderQtyPcs5).toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })
          : "-";
      },
    },
    {
      title: "June",
      dataIndex: "oldOrderQtyPcs6",
      key: "oldOrderQtyPcs6",
            children: [
        {
          title: `In PCs`,
          dataIndex: "junPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].junPcs}</span>
            ),
        },
        {
          title: `In Coeff`,
          dataIndex: "junCoeff",
          render: (text: any, record: any) => (
            <span>{record.data[1].junCoeff}</span>
            ),
        },
      ],
      render: (text: any, record: any) => {
        return record.oldOrderQtyPcs6 != 0
          ? Number(record.oldOrderQtyPcs6).toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })
          : "-";
      },
    },
    {
      title: "July",
      dataIndex: "oldOrderQtyPcs7",
      key: "oldOrderQtyPcs7",
            children: [
        {
          title: `In PCs`,
          dataIndex: "julPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].julPcs}</span>
            ),
        },
        {
          title: `In Coeff`,
          dataIndex: "julCoeff",
          render: (text: any, record: any) => (
            <span>{record.data[1].julCoeff}</span>
            ),
        },
      ],
      render: (text: any, record: any) => {
        return record.oldOrderQtyPcs7 != 0
          ? Number(record.oldOrderQtyPcs7).toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })
          : "-";
      },
    },
    {
      title: "August",
      dataIndex: "oldOrderQtyPcs8",
      key: "oldOrderQtyPcs8",
            children: [
        {
          title: `In PCs`,
          dataIndex: "augPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].augPcs}</span>
            ),
        },
        {
          title: `In Coeff`,
          dataIndex: "augCoeff",
          render: (text: any, record: any) => (
            <span>{record.data[1].augCoeff}</span>
            ),
        },
      ],
      render: (text: any, record: any) => {
        return record.oldOrderQtyPcs8 != 0
          ? Number(record.oldOrderQtyPcs8).toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })
          : "-";
      },
    },
    {
      title: "September",
      dataIndex: "oldOrderQtyPcs9",
      key: "oldOrderQtyPcs9",
            children: [
        {
          title: `In PCs`,
          dataIndex: "sepPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].sepPcs}</span>
            ),
        },
        {
          title: `In Coeff`,
          dataIndex: "sepCoeff",
          render: (text: any, record: any) => (
            <span>{record.data[1].sepCoeff}</span>
            ),
        },
      ],
      render: (text: any, record: any) => {
        return record.oldOrderQtyPcs9 != 0
          ? Number(record.oldOrderQtyPcs9).toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })
          : "-";
      },
    },
    {
      title: "October",
      dataIndex: "oldOrderQtyPcs10",
      key: "oldOrderQtyPcs10",
            children: [
        {
          title: `In PCs`,
          dataIndex: "octPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].octPcs}</span>
            ),
        },
        {
          title: `In Coeff`,
          dataIndex: "octCoeff",
          render: (text: any, record: any) => (
            <span>{record.data[1].octCoeff}</span>
            ),
        },
      ],
      render: (text: any, record: any) => {
        return record.oldOrderQtyPcs10 != 0
          ? Number(record.oldOrderQtyPcs10).toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })
          : "-";
      },
    },
    {
      title: "November",
      dataIndex: "oldOrderQtyPcs11",
      key: "oldOrderQtyPcs11",
            children: [
        {
          title: `In PCs`,
          dataIndex: "novPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].novPcs}</span>
            ),
        },
        {
          title: `In Coeff`,
          dataIndex: "novCoeff",
          render: (text: any, record: any) => (
            <span>{record.data[1].novCoeff}</span>
            ),
        },
      ],
      render: (text: any, record: any) => {
        return record.oldOrderQtyPcs11 != 0
          ? Number(record.oldOrderQtyPcs11).toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })
          : "-";
      },
    },
    {
      title: "December",
      dataIndex: "oldOrderQtyPcs12",
      key: "oldOrderQtyPcs12",
            children: [
        {
          title: `In PCs`,
          dataIndex: "decPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].decPcs !=0 ? record.data[0].decPcs:'-'}</span>
            ),
        },
        {
          title: `In Coeff`,
          dataIndex: "decCoeff",
          render: (text: any, record: any) => (
            <span>{ record.data[1].decCoeff != 0
              ? record.data[1].decCoeff:'-'}</span>
            ),
        },
      ],
      render: (text: any, record: any) => {
        return record.oldOrderQtyPcs12 != 0
          ? Number(record.oldOrderQtyPcs12).toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })
          : "-";
      },
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
    data.forEach((yearItem) => {
      excel.addSheet(yearItem.year.toString()); // Create a sheet for the year
  
      let exportingColumns: IExcelColumn[] = []
    exportingColumns = [
      
        {
          title: "Item Name",
          dataIndex: "itemName",
          render: (text: any, record: any) => {
            return record.itemName ? <span>{record.itemName}</span> : '-'
        }
        },
        {
          title: "Month Wise Data",
          dataIndex: "monthWiseData",
          children: [
            {
              title: "Production Plan Type Name",
              dataIndex: "phasetype",              
            render: (text: any, record: any) => {
              const phaseTypes = record.monthWiseData.map((item: any) => item.phasetype || '-');
             
              return (
                <>
                  {phaseTypes.map((phaseType: string, index: number) => (
                    <span key={index}>{phaseType}</span>
                  ))}
                  </>
              )
            }
                
          },
            {
              title: "January",
              dataIndex:'',
               children: [
                {
                  title: `In PCs`,
                  dataIndex: "janPcs",
               
                },
                {
                  title: `In Coeff`,
                  dataIndex: "janCoeff",
               
                },
              ],
              
            },
            {
              title: "February",
              dataIndex: "",
              children: [
                {
                  title: `In PCs`,
                  dataIndex: "febPcs",
                  
                },
                {
                  title: `In Coeff`,
                  dataIndex: "febCoeff",
                  
                },
              ],
             
            },
            {
              title: "March",
              dataIndex: '',
               children: [
                {
                  title: `In PCs`,
                  dataIndex: "marPcs",
                  
                },
                {
                  title: `In Coeff`,
                  dataIndex: "marCoeff",
                  
                },
              ],
              
            },
            {
              title: "April",
              dataIndex: '',
              children: [
                {
                  title: `In PCs`,
                  dataIndex: "aprPcs",
                  
                },
                {
                  title: `In Coeff`,
                  dataIndex: "aprCoeff",
                  
                },
              ],
              
            },
            {
              title: "May",
              dataIndex: '',
              children: [
                {
                  title: `In PCs`,
                  dataIndex: "mayPcs",
                  
                },
                {
                  title: `In Coeff`,
                  dataIndex: "mayCoeff",
                  
                },
              ],
              
            },
            {
              title: "June",
              dataIndex: '',
              children: [
                {
                  title: `In PCs`,
                  dataIndex: "junPcs",
                  
                },
                {
                  title: `In Coeff`,
                  dataIndex: "junCoeff",
                  
                },
              ],
              
            },
            {
              title: "July",
              dataIndex: '',
              children: [
                {
                  title: `In PCs`,
                  dataIndex: "julPcs",
                  
                },
                {
                  title: `In Coeff`,
                  dataIndex: "julCoeff",
                  
                },
              ],
             
            },
            {
              title: "August",
              dataIndex: '',
              children: [
                {
                  title: `In PCs`,
                  dataIndex: "augPcs",
                  
                },
                {
                  title: `In Coeff`,
                  dataIndex: "augCoeff",
                  
                },
              ],
              
            },
            {
              title: "September",
              dataIndex: '',
                                          children: [
                {
                  title: `In PCs`,
                  dataIndex: "sepPcs",
                  
                },
                {
                  title: `In Coeff`,
                  dataIndex: "sepCoeff",
                  
                },
              ],
             
            },
            {
              title: "October",
              dataIndex: "",
              children: [
                {
                  title: `In PCs`,
                  dataIndex: "octPcs",
                  
                },
                {
                  title: `In Coeff`,
                  dataIndex: "octCoeff",
                  
                },
              ],
              
            },
            {
              title: "November",
              dataIndex: "",
              children: [
                {
                  title: `In PCs`,
                  dataIndex: "novPcs",
                  
                },
                {
                  title: `In Coeff`,
                  dataIndex: "novCoeff",
                  
                },
              ],
              
            },
            {
              title: "December",
              dataIndex: "",
              children: [
                {
                  title: `In PCs`,
                  dataIndex: "decPcs",
                       },
                {
                  title: `In Coeff`,
                  dataIndex: "decCoeff",
              
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
      excel.addDataSource(yearItem.yearlyData);
    });
    excel.saveAs(`Ex-Factory-report-${currentDate}.xlsx`);

};
  return (
    <Card
    
    extra={data.length > 0 ? (<Button
        type="default"
        style={{ color: 'green' }}
        onClick={handleExport}
        icon={<FileExcelFilled />}>Download Excel</Button>) : null}>

    
    <Tabs type="card">
    {data.map((yearItem) => (
      <Tabs.TabPane key={yearItem.year.toString()} tab={yearItem.year.toString()}>
        <Table
          dataSource={yearItem.yearlyData} // Assuming 'data' contains data for each year
          columns={columns5} // Assuming 'columns5' is defined elsewhere
          size="small"
          scroll={{ x: "max-content" }}
        />
      </Tabs.TabPane>
    ))}
  </Tabs>
  </Card>
  );
};
export default ExFactoryReport