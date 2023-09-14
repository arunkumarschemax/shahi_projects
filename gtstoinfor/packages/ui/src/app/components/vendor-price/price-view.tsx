import React, { useEffect, useState } from 'react';
import { Table, Button, message, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { PricesService } from "../../../../../libs/shared-services/src/price/prices-services";

export function PriceView() {
  const navigate = useNavigate();
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

  const columns = [
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
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
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
      <Card title="Vendor Price List" style={{ position: "relative", bottom: "15px" }}extra={
        <Link to="/priceform">
          <Button type='primary'>Create</Button>
        </Link>
      }>
      
      <Table 
      dataSource={formdata} columns={columns} />
      </Card>
    </div>
  );
};

export default PriceView;
