import React, { useEffect, useState } from 'react';
import { Table, Button, message, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { PricesService } from "../../../../../libs/shared-services/src/price/prices-services";

export function PriceView() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1)
  const services = new PricesService();
  const [formdata, setFormData] = useState<any>([]);

  // const onNew = () => {
  //   navigate('/priceform');
  // };
  useEffect(() => {
    getdata();
  }, []);


  const getdata = () => {
    services.getdata().then((res) => {
      if (res.status) {
        setFormData(res.data);
        message.success("Data Retrieved Successfully");
      } else {
        setFormData([]);
        message.error("Failed");
      }
    })
  }

  const columns: any = [


    {
      title: 'S.No',
      key: 'sno',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * pageSize + (index + 1)
    },


    {
      title: 'Vendor Name',
      dataIndex: 'vendor',
      key: 'vendor',
    },
    {
      title: 'Service Code',
      dataIndex: 'serviceCode',
      key: 'servicecode',
    },
    {
      title: 'Head Of Charges',
      dataIndex: 'headOfCharges',
      key: 'headOfCharges',
    },
    {
      title: 'Per Unit',
      dataIndex: 'perUnit',
      key: 'perUnit',
    },
    {
      title: 'Dp Logistics',
      dataIndex: 'dpLogistics',
      key: 'dpLogistics',
    },



    {
      title: 'NSH',
      dataIndex: 'nsh',
      key: 'nsh',
    },
    {
      title: 'KSR',
      dataIndex: 'ksr',
      key: 'ksr',
    },




    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
    },
  ];

  return (
    <div>
      <Card title="Vendor Price List" style={{ position: "relative", bottom: "15px" }} extra={
        <Link to="/priceform">
          <Button type='primary'>Create</Button>
        </Link>
      }>

        <Table
          dataSource={formdata} columns={columns}  size='small'/>
      </Card>
    </div>
  );
};

export default PriceView;
