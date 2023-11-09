import React from 'react'
import { Button, Card, Table } from 'antd'
import { useNavigate } from 'react-router-dom'

const QualityView = () => {

  const navigate=useNavigate()

  const Columns: any = [
    {
        title: "Quality",
        dataIndex: "quality",
    },
  ]

  return (
    <div>
    <Card title={<span>QUALITY</span>} style={{ textAlign: 'center' }} headStyle={{ border: 0 }}
        className="card-header"
        extra={<Button
            onClick={() => navigate('/masters/quality-form')}
            type="primary"
            style={{ background: "white", color: "#3C085C" }}
        >Create</Button>
        }>
          <Table columns={Columns}/>
    </Card>
</div>
  )
}

export default QualityView