import { HMStyleSharedService } from '@project-management-system/shared-services';
import { Button, Card, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertMessages from '../../../common/common-functions/alert-messages';

const HMStyleView = () => {
    const navigate=useNavigate();
    const service = new HMStyleSharedService();
  const [hmStyle, setHMStyle] = useState([]);

  useEffect(() => {
    getHMStyleData();
}, []);

const getHMStyleData = () => {
    service.getHMStyle().then(res => {
        if (res.status) {
            setHMStyle(res.data);
        } else {
            AlertMessages.getErrorMessage(res.internalMessage);
        }
    })
}

    const Columns: any = [

        {
          title: "SNo",
          render: (_text: any, record: any, index: number) => <span>{index + 1}</span>,
    
        },
    
        {
    
          title: "Style Number",
          dataIndex: 'styleNumber',
          align: 'center',
    
    
        },
        {
          title: "Teflon Sheet Size",
          dataIndex: 'teflonSheetSize', 
          align: 'center',
    
        },
        {
          title: "Consumption",
          dataIndex: 'consumption',
          align: 'center',
    
        },
       
      ]

  return (
    <div>
         <Card
            extra={<span><Button type='primary' onClick={() => navigate('/bom/hm-style-creation')}>Create</Button></span>}
            title={<span style={{fontWeight: "bold"}}>Item Mapping</span>}>
      
      <Table columns={Columns} dataSource={hmStyle}  size='small'/>
      
            </Card>
    </div>
  )
}

export default HMStyleView