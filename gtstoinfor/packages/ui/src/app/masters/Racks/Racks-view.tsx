import React from 'react'
import { Button, Card, Col, Form, Input, Row, Table } from 'antd'
import { useNavigate } from 'react-router-dom'

const RackView = () => {

    const navigate=useNavigate();

    const Columns:any=[
        {
            title:"Rack Name",
            dataIndex:"rackName"
        },
        {
            title:"Rack Code",
            dataIndex:"rackCode"
        },
        {
            title:"Unit",
            dataIndex:"unit"
        },
        {
            title:"Rack Type",
            dataIndex:"rackType"
        },
    ]

  return (
    <div>
    <Card title={<span>RACKS  VIEW</span>} style={{ textAlign: 'center' }} headStyle={{ border: 0 }}
      extra={<Button
        onClick={() => navigate('/masters/rack-form')}
        type="primary"
        style={{ background: "white", color: "#3C085C" }}
      >Create</Button>
      }>
      <Table columns={Columns} 
    //    dataSource={itemGroup}
       />
            
    </Card>
  </div>
  )
}

export default RackView