import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Tooltip } from 'antd';
import { SourceFabricsTrimsService } from '@project-management-system/shared-services';


export const SourceTrims=()=>{

const service = new SourceFabricsTrimsService
const [selectedStore, setSelectedStore] =
    useState<any>(undefined);


useEffect(()=>{
    getAllTrims()
},[])

const getAllTrims=()=>{
    service.getAllTrims().then((res)=>{
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
        title: 'Trim Code',
        dataIndex:'trimCode',
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
        //   value={record.consumption}
        //   onChange={(e) => handleInputChange(e, record.key, 'consumption')}
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
        title: 'Issued Quantity',
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
      size='small'
      />
    </div>
)
}
export default SourceTrims;
