import { FileExcelFilled } from '@ant-design/icons';
import { MaterialIssueService } from '@project-management-system/shared-services';
import { Button, Card, Col, Form, Input, Row, Select, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const MaterialIssueReport = () => {
  const service = new MaterialIssueService();
  const [data, setData] = useState<any[]>([]);
  const page = 1;

  useEffect(() => {
    getAllMaterial();
  }, []);

  const getAllMaterial = () => {
    service.getAllMaterialIssues().then((res) => {
      if (res.status) {
        setData(res.data);
      }
    });
  };

  const columns1: any = [
    {
      // title: " Code",
      dataIndex: "fabricCode",
      render: (text, record) => {
        return record.fabricCode
          
      },

    },
    {
      // title: "Description",
      dataIndex: "fbdescription",
    },
    {
      // title: "Color",
      dataIndex: "colour",
    },
    {
      // title: "Consumption",
      dataIndex: "consumption",
    },
    {
      // title: "Issued Quantity",
      dataIndex: "issuedQuantity",
    },
    {
      // title: "Operation Status",
      dataIndex: "remarks",
    },
  ];

  const columns: any = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1),
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    {
      title: "Request No",
      dataIndex: "request_no",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    {
      title: "M3 Style No",
      dataIndex: "m_style_no",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    {
      title: "Consumption Code",
      dataIndex: "consumption_code",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      width: '150px',
      fixed: 'left',
    },
    {
      title: "Sample Type",
      dataIndex: "sample_type_id",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    {
      title: "PCH",
      dataIndex: "pch_id",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      fixed: 'left',
    },
    {
      title: "Sample Indent Date",
      dataIndex: "issue_date",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      render: (text, record) => {
        return record.issue_date
          ? moment(record.issue_date).format('YYYY-MM-DD')
          : "";
      },
    },
    {
      title: "Location",
      dataIndex: "location_id",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
    },
    {
      title: "Style",
      dataIndex: "style_no",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
    },
    {
      title: " Buyer",
      dataIndex: "buyer_id",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
    },
    {
      title: "Issued Date",
      dataIndex: "issue_date",
      onCell: (record: any) => ({
        rowSpan: record.rowSpan,
      }),
      render: (text, record) => {
        return record.issue_date
          ? moment(record.issue_date).format('YYYY-MM-DD')
          : "";
      },
    },
    {
      title: "Material Type",
      dataIndex: "mi_items",
      render: (miItems, record) => {
        console.log(record,'record');
        
        return (
          <Table
            rowKey={(rec) => rec.material_fabric_id || rec.material_trim_id}
            size="small"
            columns={columns1}
            dataSource={record.mi_items}
            pagination={false}
            showHeader={false}
            bordered={false}
          />
        );
      },
    },
  ];

  return (
    <div>
      <Card>
        <div style={{ overflowX: 'auto' }}>
          <Table
            rowKey={(rec) => rec.request_no}
            size="small"
            columns={columns}
            dataSource={data}
            pagination={{
              total: data.length,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}scroll={{x:'1800'}}
          />
        </div>
      </Card>
    </div>
  );
};

export default MaterialIssueReport;
