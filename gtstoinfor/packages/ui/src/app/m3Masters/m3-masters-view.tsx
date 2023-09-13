import { M3MastersService } from "@project-management-system/shared-services"
import { Button, Card, Table } from "antd"
import { ColumnProps } from "antd/es/table"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const M3MastersView = () => {
    const navigate = useNavigate()
    const [page, setPage] = React.useState(1);
    const [data,setData] = useState<any[]>([])

    const service = new M3MastersService()

    useEffect(()=> {
        getAll()
    },[])

    const getAll = () => {
        service.getAll().then(res => {
            if(res.status){
                setData(res.data)
            }
        })
    }


    const columns : ColumnProps<any>[] = [
        {
            title: 'S No',
            key: 'sno',
            // width: '70px',
            responsive: ['sm'],
            render: (text, object, index) => (page-1) * 10 +(index+1)
        },
        {
            title:'Category',
            dataIndex:'category'
        },
        {
            title:'M3 Code',
            dataIndex:'m3Code'
        },
    ]

    return(
        <Card extra={<span><Button onClick={() => navigate('/m3-masters')} type={'primary'}>New</Button></span>} className="card-header">
            <Table columns={columns} dataSource={data} size='small'/>
            
        </Card>
    )

}

export default M3MastersView