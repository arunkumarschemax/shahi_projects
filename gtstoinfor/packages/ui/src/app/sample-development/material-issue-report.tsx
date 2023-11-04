import { Card, Col, Form, Row, Table } from 'antd';
import React from 'react'


const MaterialIssueReport = () => {
  // Define the 'page' variable or use an appropriate value
  const page = 1;

  const columns:any = [
    {
      title: 'S No',
      key: 'sno',
      width: '70px',
      responsive: ['sm'],
      render: (text, object, index) => (page - 1) * 10 + (index + 1)
    },

    
      {
        title:"Request No",
        dataIndex:"requestNo",   
       },
  ];

  return (
    <div>
      <Card>
        <Table columns={columns}/>
      </Card>
    </div>
  );
};

export default MaterialIssueReport;
