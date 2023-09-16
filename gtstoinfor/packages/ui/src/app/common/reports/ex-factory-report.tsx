import { OrdersService } from "@project-management-system/shared-services";
import { Table, Tabs, TabsProps } from "antd";
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
      align: "right",
      children: [
        {
          title: `In PCs`,
          dataIndex: "janPcs",
          render: (text: any, record: any) => (
            <span>{record.data[0].janPcs}</span>
            ),
        },
        {
          title: `In Coeff`,
          dataIndex: "janCoeff",
          render: (text: any, record: any) => (
            <span>{record.data[0].janCoeff}</span>
            ),
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
      align: "right",
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
      align: "right",
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
      align: "right",
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
      align: "right",
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
      align: "right",
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
      align: "right",
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
      align: "right",
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
      align: "right",
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
      align: "right",
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
      align: "right",
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

  return (
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
  );
};
