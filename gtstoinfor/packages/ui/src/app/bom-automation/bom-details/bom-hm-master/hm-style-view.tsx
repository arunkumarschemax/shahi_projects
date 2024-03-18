import { HMStyleSharedService } from '@project-management-system/shared-services';
import { Button, Card, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertMessages from '../../../common/common-functions/alert-messages';

const HMStyleView = () => {
    const navigate=useNavigate();
    const service = new HMStyleSharedService();
  const [hmStyle, setHMStyle] = useState([]);

//   useEffect(() => {
//     getHMStyleData();
// }, []);

// const getHMStyleData = () => {
//     service.getHMStyle().then(res => {
//         if (res.status) {
//             setHMStyle(res.data);
//         } else {
//             AlertMessages.getErrorMessage(res.internalMessage);
//         }
//     })
// }

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
<Table columns={Columns} dataSource={hmStyle}/>
            </Card>
    </div>
  )
}

export default HMStyleView