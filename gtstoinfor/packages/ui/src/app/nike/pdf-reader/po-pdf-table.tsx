import { Table } from 'antd'
import React from 'react'

export interface IPoPdfTableProps {
    data: any[]
}

export default function PoPdfTable(props: IPoPdfTableProps) {
    const columns = [
        { title: 'Item No', dataIndex: 'itemNo' }, 
        { title: 'Material', dataIndex: 'matrial' },
        { title: 'Description', dataIndex: 'description' },
        { title: 'Acceptance date', dataIndex: 'acceptanceDate' },
        { title: 'Delivery  date', dataIndex: 'deliveryDate' },
        { title: 'Delivery  date', dataIndex: 'deliveryDate' },
        { title: 'Mode', dataIndex: 'mode' },
        {title:'Item Variants',render:(value,i) =>  <Table columns={itemVariantColumns} dataSource={value.poItemVariantDetails} />}

    ]

    const itemVariantColumns = [
        {title:'UOM',dataIndex:'uom'},
        {title:'Size',dataIndex:'size'},
        {title:'Unit PRice',dataIndex:'unitPrice'},
        {title:'Quantity',dataIndex:'qunatity'},
        {title:'Amount',dataIndex:'amount'}        
    
    ]
    return (
       <Table dataSource={props.data} columns={columns}  />
    )
}
