import { Button, Card } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ZFactorsView = () => {

    const navigate=useNavigate();

  return (
    <div>
        <Card title={<span style={{fontWeight: "bold"}}>Z Factors</span>}
            extra={<span><Button type='primary' onClick={() => navigate('/bom/z-factors')}>Create</Button></span>}>
            
        </Card>
    </div>
  )
}

export default ZFactorsView