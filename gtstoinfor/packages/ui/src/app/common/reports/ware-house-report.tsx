import React, { useState } from "react";
import { Card, Space, TabPaneProps, Table, Tabs, TabsProps, Tag } from "antd";
import { ColumnProps, ColumnsType } from "antd/es/table";
import { dateFormatterMap } from "@ant-design/pro-components";



const WarehouseReport = () => {
  const { Column, ColumnGroup } = Table;
  const [pageSize, setPageSize] = useState<number>(null);
  const [page, setPage] = React.useState(1);

 
 
  const columns: ColumnsType<any> = [
    {
        title: "Production Plan Type Name",
        dataIndex: "prodPlanTypeName",
        key: "prodPlanTypeName",
      },
    // {
    //   title: "sep",
    //   children: [
    //     {
    //       title: `In PC's`,
    //       dataIndex:"sep1Pcs"
    //     },
    //     {
    //       title: `In Coeff`,
    //       dataIndex:"sep1Coeff"

    //     },
    //   ],
    // },
    // {
    //   title: "Oct",
    //   children: [
    //     {
    //       title: `In PC's`,
    //       dataIndex:"oct1Pcs"

    //     },
    //     {
    //       title: `In Coeff`,
    //       dataIndex:"oct1Coeff"

    //     },
    //   ],
    // },
    // {
    //   title: "Nov",
    //   children: [
    //     {
    //       title: `In PC's`,
    //       dataIndex:"nov1Pcs"

    //     },
    //     {
    //       title: `In Coeff`,
    //       dataIndex:"nov1Coeff"

    //     },
    //   ],
    // },
    // {
    //   title: "Dec",
    //   children: [
    //     {
    //       title: `In PC's`,
    //       dataIndex:"dec1Pcs"

    //     },
    //     {
    //       title: `In Coeff`,
    //       dataIndex:"dec1Coeff"

    //     },
    //   ],
    // },
    {
      title: "Jan",
      children: [
        {
          title: `In PC's`,
          dataIndex:"jan2Pcs"

        },
        {
          title: `In Coeff`,
          dataIndex:"jan2Coeff"

        },
      ],
    },
    {
      title: "Feb",
      children: [
        {
          title: `In PC's`,
          dataIndex:"feb2Pcs"

        },
        {
          title: `In Coeff`,
          dataIndex:"feb2Coeff"

        },
      ],
    },
    {
      title: "Mar",
      children: [
        {
          title: `In PC's`,
          dataIndex:"mar2Pcs"

        },
        {
          title: `In Coeff`,
          dataIndex:"mar2Coeff"

        },
      ],
    },
    {
      title: "Apr",
      children: [
        {
          title: `In PC's`,
          dataIndex:"apr2Pcs"

        },
        {
          title: `In Coeff`,
          dataIndex:"apr2coeff"

        },
      ],
    },
    {
      title: "May",
      children: [
        {
          title: `In PC's`,
          dataIndex:"may2Pcs"

        },
        {
          title: `In Coeff`,
          dataIndex:"may2Coeff"

        },
      ],
    },
    {
      title: "Jun",
      children: [
        {
          title: `In PC's`,
          dataIndex:"jun2Pcs"

        },
        {
          title: `In Coeef`,
          dataIndex:"jun2Coeff"

        },
      ],
    },
    {
      title: "Jul",
      children: [
        {
          title: `In PC's`,
          dataIndex:"jul2Pcs"

        },
        {
          title: `In Coeff`,
          dataIndex:"jul2Coeff"

        },
      ],
    },
    {
      title: "Aug",
      children: [
        {
          title: `In PC's`,
          dataIndex:"aug2Pcs"

        },
        {
          title: `In Coeff`,
          dataIndex:"aug2Coeff"

        },
      ],
    },
    {
      title: "Sep",
      children: [
        {
          title: `In PC's`,
          dataIndex:"sep2InPcs",
          render: (text: any, record: any) => {
            return record.sep2InPcs != 0 ? Number(record.sep2InPcs).toLocaleString('en-IN', {
                maximumFractionDigits: 0
            }) : '-'
        }

        },
        {
          title: `In Coeff`,
          dataIndex:"sep2InCoeff",
          render: (text: any, record: any) => {
            return record.sep2InCoeff != 0 ? Number(record.sep2InCoeff).toLocaleString('en-IN', {
                maximumFractionDigits: 0
            }) : '-'
        }

        },
      ],
     
    },
    {
      title: "Oct",
      dataIndex:"oct",
      children: [
        {
          title: `In PC's`,
          dataIndex:"oct2InPcs"

        },
        {
          title: `In Coeff`,
          dataIndex:"oct2InCoeff"

        },
      ],
      render: (text: any, record: any) => {
        return record.oct != 0 ? Number(record.oct).toLocaleString('en-IN', {
            maximumFractionDigits: 0
        }) : '-'
    }
    },
    {
      title: "Nov",
      children: [
        {
          title: `In PC's`,
          dataIndex:"nov2Pcs"

        },
        {
          title: `In Coeff`,
          dataIndex:"nov2Coeff"

        },
      ],
    },
    {
      title: "Dec",
      children: [
        {
          title: `In PC's`,
          dataIndex:"dec2Pcs"

        },
        {
          title: `In Coeff`,
          dataIndex:"dec2Coeff"

        },
      ],
    },
    // {
    //   title: "Jan",
    //   children: [
    //     {
    //       title: `In PC's`,
    //       dataIndex:"jan3Pcs"

    //     },
    //     {
    //       title: `In Coeff`,
    //       dataIndex:"jan3coeff"

    //     },
        
    //   ],
     
    // },
    {
        title:"Total In PCs",
        dataIndex:"totalInPcs"
    },
    {
        title:"Total In Coeff",
        dataIndex:"totalInCoeff",
     
    }
    

  ];
  const columns2:ColumnsType<any>=[
    {
        title: "S No",
        key: "sno",
        render: (text, object, index) => (page - 1) * pageSize + (index + 1),
      },

    {
        title: "WH",
        dataIndex: "wh",
      },
  
      {
        title: "PH",
        dataIndex: "ph",
        width:"50px",
  
      },
      {
        title: "Item Name",
        dataIndex: "itemName",
        // ...getColumnSearchProps('itemName')
      },
      {
        title: 'Month Wise Data',
        dataIndex: 'month_wise',
        align: 'center',
        render: (text: any, record: any) => (
            <Table
                dataSource={record.monthWiseData}
                columns={columns}
                pagination={false} // Hide pagination for child table
                rowKey={record => record.itemCode}
            />
        ),
    }
  
  ]

  const items:TabsProps['items']=[
    {
        key: '1',
        label: <b>tabs1 : {} </b>,
        children: <Table bordered  columns={columns} />,
    },
    {
        key: '2',
        label: <b>tabs2 : {} </b>,
        children: <Table bordered  columns={columns} />,
    },
    {
        key: '3',
        label: <b>Tab3: {} </b>,
        children: <Table bordered   />,
    },
  ]


  const data = [
    { data: 1 },
    { data: 2 },
    { data: 3 },
    { data: 4 },
  
  ];
  return (
    <Card>
      

        <Table
        
        columns={columns2}
        dataSource={data}
        size="small"
    scroll={{ x: "max-content" }} /> 
    <>

                    </>
    </Card>
  )
};

// }
export default WarehouseReport;
