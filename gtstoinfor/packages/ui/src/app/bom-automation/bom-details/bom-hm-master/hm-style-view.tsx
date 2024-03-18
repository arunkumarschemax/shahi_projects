import { Button, Card, Table } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const HMStyleView = () => {
    const navigate=useNavigate();

    const Columns: any = [

        {
          title: "SNo",
          render: (_text: any, record: any, index: number) => <span>{index + 1}</span>,
          width:'100px'
    
        },
    
        {
    
          title: "Style Number",
          dataIndex: 'styleNumber',
          align: 'center',
          width:'150px'
    
    
        },
        {
          title: "Teflon Sheet Size",
          dataIndex: 'teflonSheetSize', 
          align: 'center',
          width:'150px'
    
        },
        {
          title: "Consumption",
          dataIndex: 'consumption',
          align: 'center',
          width:'150px'
    
        },
       
      ]

  return (
    <div>
         <Card
            extra={<span><Button type='primary' onClick={() => navigate('/bom/hm-style-creation')}>Create</Button></span>} headStyle={{  height: '40px' }}
            bodyStyle={{ paddingTop: '2px', paddingBottom: '12px' }}
            title={<h4 style={{ textAlign: 'left', padding: '20px' }}>HM STYLES</h4>}>
<Table columns={Columns}/>
            </Card>
    </div>
  )
}

export default HMStyleView