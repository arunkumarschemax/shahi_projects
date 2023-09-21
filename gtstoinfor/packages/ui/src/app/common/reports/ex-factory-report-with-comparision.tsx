import { FileExcelFilled } from "@ant-design/icons";
import { OrdersService } from "@project-management-system/shared-services";
import { Button, Card, Table, Tabs, TabsProps } from "antd";
import { Excel } from "antd-table-saveas-excel";
import { IExcelColumn } from "antd-table-saveas-excel/app";
import { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { useState } from "react";

export const ExFactoryReportWithComparision = () => {
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
      align: "right",
      children: [
        {
          title: `Previous`,
          dataIndex: "janPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].febPcs}</span>
            )
        },
        {
          title: `Latest`,
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
      align: "right",
      children: [
        {
          title: `Previous`,
          dataIndex: "febPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].febPcs}</span>
            ),
        },
        {
          title: `Latest`,
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
      align: "right",
      children: [
        {
          title: `Previous`,
          dataIndex: "marPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].marPcs}</span>
            ),
        },
        {
          title: `Latest`,
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
      align: "right",
      children: [
        {
          title: `Previous`,
          dataIndex: "aprPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].aprPcs}</span>
            ),
        },
        {
          title: `Latest`,
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
      align: "right",
      children: [
        {
          title: `Previous`,
          dataIndex: "mayPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].mayPcs}</span>
            ),
        },
        {
          title: `Latest`,
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
      align: "right",
      children: [
        {
          title: `Previous`,
          dataIndex: "junPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].junPcs}</span>
            ),
        },
        {
          title: `Latest`,
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
      align: "right",
      children: [
        {
          title: `Previous`,
          dataIndex: "julPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].julPcs}</span>
            ),
        },
        {
          title: `Latest`,
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
      align: "right",
      children: [
        {
          title: `Previous`,
          dataIndex: "augPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].augPcs}</span>
            ),
        },
        {
          title: `Latest`,
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
      align: "right",
      children: [
        {
          title: `Previous`,
          dataIndex: "sepPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].sepPcs}</span>
            ),
        },
        {
          title: `Latest`,
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
      align: "right",
      children: [
        {
          title: `Previous`,
          dataIndex: "octPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].octPcs}</span>
            ),
        },
        {
          title: `Latest`,
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
      align: "right",
      children: [
        {
          title: `Previous`,
          dataIndex: "novPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].novPcs}</span>
            ),
        },
        {
          title: `Latest`,
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
      align: "right",
      children: [
        {
          title: `Previous`,
          dataIndex: "decPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].decPcs !=0 ? record.data[0].decPcs:'-'}</span>
            ),
        },
        {
          title: `Latest`,
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
          align: "center",
          children: [
            {
              title: "Production Plan Type Name",
              dataIndex: "phasetype",
                    },
            {
              title: "January",
              dataIndex:'',
              align: "right",
              children: [
                {
                  title: `Previous`,
                  dataIndex: "janPcs",
               
                },
                {
                  title: `Latest`,
                  dataIndex: "janCoeff",
               
                },
              ],
              
            },
            {
              title: "February",
              dataIndex: "",
              align: "right",
              children: [
                {
                  title: `Previous`,
                  dataIndex: "febPcs",
                  
                },
                {
                  title: `Latest`,
                  dataIndex: "febCoeff",
                  
                },
              ],
             
            },
            {
              title: "March",
              dataIndex: '',
                            align: "right",
              children: [
                {
                  title: `Previous`,
                  dataIndex: "marPcs",
                  
                },
                {
                  title: `Latest`,
                  dataIndex: "marCoeff",
                  
                },
              ],
              
            },
            {
              title: "April",
              dataIndex: '',
                            align: "right",
              children: [
                {
                  title: `Previous`,
                  dataIndex: "aprPcs",
                  
                },
                {
                  title: `Latest`,
                  dataIndex: "aprCoeff",
                  
                },
              ],
              
            },
            {
              title: "May",
              dataIndex: '',
                            align: "right",
              children: [
                {
                  title: `Previous`,
                  dataIndex: "mayPcs",
                  
                },
                {
                  title: `Latest`,
                  dataIndex: "mayCoeff",
                  
                },
              ],
              
            },
            {
              title: "June",
              dataIndex: '',
                            align: "right",
              children: [
                {
                  title: `Previous`,
                  dataIndex: "junPcs",
                  
                },
                {
                  title: `Latest`,
                  dataIndex: "junCoeff",
                  
                },
              ],
              
            },
            {
              title: "July",
              dataIndex: '',
                            align: "right",
              children: [
                {
                  title: `Previous`,
                  dataIndex: "julPcs",
                  
                },
                {
                  title: `Latest`,
                  dataIndex: "julCoeff",
                  
                },
              ],
             
            },
            {
              title: "August",
              dataIndex: '',
                            align: "right",
              children: [
                {
                  title: `Previous`,
                  dataIndex: "augPcs",
                  
                },
                {
                  title: `Latest`,
                  dataIndex: "augCoeff",
                  
                },
              ],
              
            },
            {
              title: "September",
              dataIndex: '',
                            align: "right",
              children: [
                {
                  title: `Previous`,
                  dataIndex: "sepPcs",
                  
                },
                {
                  title: `Latest`,
                  dataIndex: "sepCoeff",
                  
                },
              ],
             
            },
            {
              title: "October",
              dataIndex: "",
              
              align: "right",
              children: [
                {
                  title: `Previous`,
                  dataIndex: "octPcs",
                  
                },
                {
                  title: `Latest`,
                  dataIndex: "octCoeff",
                  
                },
              ],
              
            },
            {
              title: "November",
              dataIndex: "",
              
              align: "right",
              children: [
                {
                  title: `Previous`,
                  dataIndex: "novPcs",
                  
                },
                {
                  title: `Latest`,
                  dataIndex: "novCoeff",
                  
                },
              ],
              
            },
            {
              title: "December",
              dataIndex: "oldOrderQtyPcs12",
              
              align: "right",
              children: [
                {
                  title: `Previous`,
                  dataIndex: "decPcs",
                       },
                {
                  title: `Latest`,
                  dataIndex: "decCoeff",
              
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
        },
      ];
    const excel = new Excel();
    excel.addSheet("Sheet1");
    excel.addRow();
    excel.addColumns(exportingColumns);
    excel.addDataSource(data);
    excel.saveAs(`Ex-Factory-date-${currentDate}.xlsx`);
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
export default ExFactoryReportWithComparision