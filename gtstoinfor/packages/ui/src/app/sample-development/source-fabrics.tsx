import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip } from 'antd';
import { SourceFabricsTrimsService } from '@project-management-system/shared-services';


 export const SourceFabrics=()=>{
    
    const service = new SourceFabricsTrimsService
    const [selectedStore, setSelectedStore] =
    useState<any>(undefined);

    
useEffect(()=>{
    getAllFabrics()
},[])

const getAllFabrics=()=>{
    service.getAllFabrics().then((res)=>{
        if(res){
            setSelectedStore(res)
        }
    })
}



const columns=[
    {
        title: 'S.No',
        dataIndex: 'sNo',
        render: (_, record, index) => index + 1,
      },

      {
        title: 'Fabric Code',
        dataIndex: 'fabricCode',
        width:"20%",
       
      },
      {
        title: 'Description',
        dataIndex: 'description',
        // render: (_, record) => (
        //   <Input
        //   value={record.description}
        //   onChange={(e) => handleInputChange(e, record.key, 'description')}
        //   disabled
        //   />
        // ),
      },
      {
        title: 'Color',
        dataIndex: 'color',
        // render: (_, record) => (
        //   <Input
        //   value={record.color}
        //   onChange={(e) => handleInputChange(e, record.key, 'color')}
        //   />
        // ),
      },

      {
        title: 'Consumption',
        dataIndex: 'consumption',
        // render: (_, record) => (
        //   <Input
        //   value={record.consumption}
        //   onChange={(e) => handleInputChange(e, record.key, 'consumption')}
        //   />
        // ),
      },
      {
        title: 'Issued Qty',
        dataIndex: 'issuedQty',
        // render: (_, record) => (
        //   <Input
        //   value={record.consumption}
        //   onChange={(e) => handleInputChange(e, record.key, 'consumption')}
        //   />
        // ),
      },

      
]

return (
    <div>
        <Table 
      dataSource={selectedStore} 
      className="custom-table-wrapper"
      columns={columns} 
      bordered={true}
      />
    </div>
)
}
export default SourceFabrics;
